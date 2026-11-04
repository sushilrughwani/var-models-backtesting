"""
ewma.py - Exponentially Weighted Moving Average volatility (RiskMetrics, 1994).

Purpose
    Give recent returns more weight than old ones, so volatility reacts fast
    to new shocks and old shocks fade smoothly (no ghost effect).

Inputs
    pandas Series of daily log returns, decay factor lambda (0.94 for daily
    data in RiskMetrics).

Outputs
    pandas Series of 1-day-ahead variance forecasts sigma2_t.

Formulas used
    sigma2_t = lambda * sigma2_{t-1} + (1 - lambda) * r_{t-1}^2
    Unrolled: sigma2_t = (1-lambda) * sum_{k>=1} lambda^(k-1) * r_{t-k}^2
    Weight on the return k days ago: w_k = (1-lambda) * lambda^(k-1)
    Half-life of a shock: ln(0.5) / ln(lambda)

Initialisation
    sigma2 at the first date is unknown (NaN). We set sigma2_1 = r_0^2 (the
    first squared return). Its weight decays like lambda^t (0.94^250 ~ 2e-7),
    so after a burn-in it is irrelevant; and it uses no future data.
    (A common alternative is the sample variance of the first ~30 days.)
"""
import numpy as np
import pandas as pd


def ewma_variance_loop(returns, lam):
    """
    WHAT: EWMA variance with an explicit for-loop.
    WHY:  shows the recursion exactly as written in RiskMetrics.
    Formula: sigma2_t = lam * sigma2_{t-1} + (1 - lam) * r_{t-1}^2
    sigma2_t is the forecast for day t made at the close of day t-1.
    """
    r = np.asarray(returns, dtype=float)
    sigma2 = np.full(len(r), np.nan)
    if len(r) < 2:
        return pd.Series(sigma2, index=returns.index)
    # Initialisation: forecast for day 1 = first squared return (no future data)
    sigma2[1] = r[0] ** 2
    for t in range(2, len(r)):
        sigma2[t] = lam * sigma2[t - 1] + (1.0 - lam) * r[t - 1] ** 2
    return pd.Series(sigma2, index=returns.index)


def ewma_variance_pandas(returns, lam):
    """
    WHAT: the same EWMA variance with pandas .ewm().
    WHY:  .ewm(alpha=1-lam, adjust=False) computes s_t = lam*s_{t-1} + (1-lam)*x_t
          with s_0 = x_0. Applied to x = r^2 this is the variance known at the
          close of day t; shift(1) turns it into the forecast for day t+1.
    """
    smoothed = (returns ** 2).ewm(alpha=1.0 - lam, adjust=False).mean()
    return smoothed.shift(1)


def ewma_variance(returns, lam=0.94):
    """
    WHAT: EWMA variance forecast, with the pandas result checked against the loop.
    WHY:  guarantees the shortcut is the textbook formula.
    """
    fast = ewma_variance_pandas(returns, lam)
    slow = ewma_variance_loop(returns, lam)
    assert np.allclose(fast.values, slow.values, equal_nan=True)
    return fast


def ewma_weights(lam, n_lags):
    """
    WHAT: weight given to the squared return k = 1..n_lags days ago.
    WHY:  visualises how fast EWMA 'forgets'; weights sum to 1 as n -> inf.
    Formula: w_k = (1 - lam) * lam^(k-1)
    """
    k = np.arange(1, n_lags + 1)
    return pd.Series((1.0 - lam) * lam ** (k - 1), index=k)


def ewma_half_life(lam):
    """
    WHAT: number of days after which a shock's weight has halved.
    Formula: lam^h = 0.5  ->  h = ln(0.5) / ln(lam)
    """
    return np.log(0.5) / np.log(lam)
