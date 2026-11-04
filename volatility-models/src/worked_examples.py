"""
worked_examples.py - the tiny hand-computable examples used in MATH.md.

Purpose
    Every formula in MATH.md has a worked numeric example on a few days of
    returns. This script computes those numbers so the document only quotes
    executed results.  Run:  python -m src.worked_examples

Inputs
    5 illustrative prices (100, 102, 99, 100, 103) -> 4 log returns, plus
    illustrative High/Low values and illustrative GARCH parameters. These are
    teaching numbers, NOT market data and NOT project results.

Outputs
    Printed numbers (one block per formula).
"""
import numpy as np
import pandas as pd
from scipy import stats

from src.evaluation import mincer_zarnowitz, mse_loss, qlike_loss
from src.models.ewma import ewma_variance_loop, ewma_weights
from src.models.garch_manual import garch_long_run_stats, garch_term_structure, garch_variance
from src.models.parkinson import parkinson_daily_variance

PRICES = pd.Series([100.0, 102.0, 99.0, 100.0, 103.0])
HIGH = np.array([102.5, 101.0, 100.5, 103.5])
LOW = np.array([100.0, 98.5, 98.8, 99.8])


def show(title, **values):
    """Print one example block with 6 significant digits."""
    parts = [f"{k}={np.round(v, 6) if not isinstance(v, str) else v}" for k, v in values.items()]
    print(f"[{title}] " + "; ".join(parts))


def moments_examples(r):
    """Log returns, mean/variance, skew/kurtosis, JB, annualisation, leverage."""
    show("log returns (%)", r=r.values * 100)
    show("mean, sample var, std (%)", mean=r.mean() * 100, var=r.var() * 1e4,
         std=r.std() * 100, annual_vol=r.std() * np.sqrt(252) * 100)
    dev = r - r.mean()
    sd = np.sqrt(np.mean(dev ** 2))
    skew = np.mean(dev ** 3) / sd ** 3
    kurt = np.mean(dev ** 4) / sd ** 4 - 3
    jb = len(r) / 6 * (skew ** 2 + kurt ** 2 / 4)
    show("population skew, excess kurt, JB, p", skew=skew, kurt=kurt, jb=jb,
         p=stats.chi2.sf(jb, 2))
    show("leverage corr(r_t, r_t+1^2) on 3 pairs",
         corr=np.corrcoef(r.values[:-1], r.values[1:] ** 2)[0, 1])
    rho1 = np.sum(dev.values[1:] * dev.values[:-1]) / np.sum(dev.values ** 2)
    n = len(r)
    show("ACF lag1 and Ljung-Box Q(1)", rho1=rho1, Q=n * (n + 2) * rho1 ** 2 / (n - 1),
         p=stats.chi2.sf(n * (n + 2) * rho1 ** 2 / (n - 1), 1))
    show("4-sigma tail prob normal (two-sided)", p=2 * stats.norm.sf(4),
         one_in_days=1 / (2 * stats.norm.sf(4)))


def ewma_examples(r):
    """Rolling std (window 3), EWMA recursion and weights."""
    show("rolling std window 3 (%)", last=r.iloc[1:4].std() * 100)
    s = ewma_variance_loop(r, 0.94)
    show("EWMA lambda=0.94 variance (%^2)", sigma2=s.values * 1e4,
         sigma_annual=np.sqrt(s.values[-1] * 252) * 100)
    show("EWMA weights k=1,2,3 lambda=0.94", w=ewma_weights(0.94, 3).values,
         half_life=np.log(0.5) / np.log(0.94))


def garch_examples(r):
    """GARCH recursion, log-likelihood terms, long-run stats, term structure."""
    x = r.values * 100
    omega, alpha, beta = 0.02, 0.08, 0.90
    backcast = np.var(x)
    s2 = garch_variance(omega, alpha, beta, x, backcast)
    show("GARCH backcast and sigma2 (%^2)", backcast=backcast, sigma2=s2)
    terms = -0.5 * (np.log(2 * np.pi) + np.log(s2) + x ** 2 / s2)
    show("log-lik terms and total", terms=terms, logL=terms.sum())
    k, n = 3, len(x)
    show("AIC, BIC with k=3", aic=2 * k - 2 * terms.sum(), bic=k * np.log(n) - 2 * terms.sum())
    show("long-run stats", **garch_long_run_stats(omega, alpha, beta))
    curve = garch_term_structure(omega, alpha, beta, sigma2_next=4.0, horizon=60)
    show("term structure from sigma2_next=4", h1=curve[0], h2=curve[1], h10=curve[9],
         h60=curve[59])
    gamma = 0.10
    show("GJR one step after r=-2%, sigma2_prev=1", gjr=omega + (alpha + gamma) * 4 + beta * 1,
         garch=omega + alpha * 4 + beta * 1,
         gjr_after_plus2=omega + alpha * 4 + beta * 1)
    show("GJR long-run var (alpha=.05,gamma=.1,beta=.88)",
         vl=0.02 / (1 - 0.05 - 0.05 - 0.88))


def other_examples(r):
    """Parkinson, Student-t quantile, losses, Mincer-Zarnowitz, t-stat."""
    pk = parkinson_daily_variance(HIGH, LOW)
    show("Parkinson daily var (%^2) and 4-day vol (%)", pk=pk * 1e4,
         vol=np.sqrt(pk.mean()) * 100, cc_vol=np.sqrt(np.mean(r.values ** 2)) * 100)
    show("1% quantile: normal vs unit-variance t(5)", normal=stats.norm.ppf(0.01),
         t5=stats.t.ppf(0.01, 5) * np.sqrt(3 / 5))
    rv = (r.values * 100) ** 2
    h = np.array([2.0, 3.0, 4.0, 3.5])
    show("RV (%^2) vs forecast h", rv=rv, h=h)
    show("MSE, QLIKE", mse=mse_loss(rv, h), qlike=qlike_loss(rv, h))
    show("QLIKE under/over by factor 2 when RV=2",
         under=qlike_loss(np.array([2.0]), np.array([1.0])),
         over=qlike_loss(np.array([2.0]), np.array([4.0])),
         best=qlike_loss(np.array([2.0]), np.array([2.0])))
    mz = mincer_zarnowitz(pd.Series(rv), pd.Series(h))
    show("Mincer-Zarnowitz on 4 points", a=mz["a"], b=mz["b"], r2=mz["r2"])
    show("t-stat example", t=0.08 / 0.02)


def main():
    """Print every worked example."""
    r = np.log(PRICES / PRICES.shift(1)).dropna().reset_index(drop=True)
    moments_examples(r)
    ewma_examples(r)
    garch_examples(r)
    other_examples(r)


if __name__ == "__main__":
    main()
