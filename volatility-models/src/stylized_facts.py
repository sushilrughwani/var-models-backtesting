"""
stylized_facts.py - the statistical properties of returns that motivate
time-varying volatility models.

Purpose
    Show with numbers and tests that daily equity returns
      (1) have fat tails (excess kurtosis, Jarque-Bera rejects normality),
      (2) show volatility clustering (squared returns are autocorrelated,
          raw returns are almost not -> Ljung-Box),
      (3) show a leverage effect (negative returns today -> higher variance
          tomorrow).

Inputs
    pandas Series of daily log returns.

Outputs
    dicts / DataFrames of statistics.

Formulas used
    skewness   S = mean((r - mu)^3) / sd^3
    ex. kurt.  K = mean((r - mu)^4) / sd^4 - 3
    Jarque-Bera JB = n/6 * (S^2 + K^2/4)            ~ chi-square(2) under normality
    ACF(k)     rho_k = cov(x_t, x_{t-k}) / var(x_t)
    Ljung-Box  Q = n(n+2) * sum_{k=1..m} rho_k^2 / (n-k)   ~ chi-square(m)
    Leverage   corr(r_t, r_{t+1}^2)
"""
import numpy as np
import pandas as pd
from scipy import stats
from statsmodels.stats.diagnostic import acorr_ljungbox
from statsmodels.tsa.stattools import acf


def summary_statistics(returns, trading_days=252):
    """
    WHAT: mean, std, skewness, excess kurtosis, min, max of daily returns.
    WHY:  a normal distribution has skew 0 and excess kurtosis 0; large
          positive kurtosis means extreme days are far more common than a
          constant-volatility normal model predicts.
    """
    return {
        "n_obs": int(returns.count()),
        "mean_daily": returns.mean(),
        "std_daily": returns.std(),
        # Annualised volatility: sigma_daily * sqrt(252)
        "vol_annual": returns.std() * np.sqrt(trading_days),
        # pandas uses bias-corrected sample skewness / excess kurtosis
        "skewness": returns.skew(),
        "excess_kurtosis": returns.kurt(),
        "min": returns.min(),
        "max": returns.max(),
    }


def jarque_bera_manual(returns):
    """
    WHAT: Jarque-Bera statistic computed by hand.
    WHY:  tests H0 "returns are normal" using skewness and kurtosis together.
    Formula: JB = n/6 * (S^2 + K^2/4), p-value from chi-square with 2 d.o.f.
    """
    x = np.asarray(returns, dtype=float)
    n = len(x)
    dev = x - x.mean()
    # Population (biased) moments, as in the original JB formula
    sd = np.sqrt(np.mean(dev ** 2))
    skew = np.mean(dev ** 3) / sd ** 3
    ex_kurt = np.mean(dev ** 4) / sd ** 4 - 3.0
    jb = n / 6.0 * (skew ** 2 + ex_kurt ** 2 / 4.0)
    p_value = stats.chi2.sf(jb, df=2)
    return {"jb_stat": jb, "p_value": p_value}


def jarque_bera_test(returns):
    """
    WHAT: Jarque-Bera with scipy, after checking it equals the manual version.
    WHY:  library shortcut is only trusted once it matches our own formula.
    """
    manual = jarque_bera_manual(returns)
    result = stats.jarque_bera(np.asarray(returns, dtype=float))
    assert np.isclose(manual["jb_stat"], result.statistic, rtol=1e-8)
    return {"jb_stat": float(result.statistic), "p_value": float(result.pvalue)}


def tail_exceedances(returns, k=4.0):
    """
    WHAT: number of days with |r - mean| > k standard deviations, observed vs
          the number a normal distribution would predict.
    WHY:  makes "fat tails" concrete: e.g. 4-sigma days should be ~1 in 15,800.
    Formula: expected = n * 2 * (1 - Phi(k)).
    """
    z = (returns - returns.mean()) / returns.std()
    observed = int((z.abs() > k).sum())
    expected = len(returns) * 2.0 * stats.norm.sf(k)
    return {"k_sigma": k, "observed": observed, "expected_normal": expected}


def acf_values(x, nlags):
    """
    WHAT: sample autocorrelations rho_1..rho_nlags.
    WHY:  returns ~ uncorrelated (no easy predictability) but squared returns
          are positively correlated for many lags = volatility clustering.
    """
    values = acf(np.asarray(x, dtype=float), nlags=nlags, fft=True)
    # Drop lag 0 (always 1)
    return values[1:]


def ljung_box(x, lags):
    """
    WHAT: Ljung-Box Q-test of H0 "no autocorrelation up to lag m".
    WHY:  formal test of clustering when applied to squared returns.
    Formula: Q = n(n+2) * sum_{k=1..m} rho_k^2/(n-k) ~ chi-square(m).
    """
    result = acorr_ljungbox(np.asarray(x, dtype=float), lags=list(lags))
    result.index.name = "lag"
    return result.rename(columns={"lb_stat": "Q_stat", "lb_pvalue": "p_value"})


def leverage_correlation(returns):
    """
    WHAT: corr(r_t, r_{t+1}^2) and corr(r_t, |r_{t+1}|).
    WHY:  a NEGATIVE value means falls today are followed by bigger moves
          tomorrow - the leverage effect that GJR-GARCH models.
    """
    # shift(-1) puts TOMORROW's value on today's row (analysis only, not a forecast)
    next_sq = returns.shift(-1) ** 2
    next_abs = returns.shift(-1).abs()
    return {"corr_r_next_r2": returns.corr(next_sq),
            "corr_r_next_absr": returns.corr(next_abs)}


def stylized_facts_table(returns_by_asset, trading_days, lb_lags):
    """
    WHAT: one row per asset with all Part-1 statistics.
    WHY:  a single table to present in the README / interview.
    """
    rows = {}
    for asset, r in returns_by_asset.items():
        row = summary_statistics(r, trading_days)
        jb = jarque_bera_test(r)
        row["jb_stat"], row["jb_pvalue"] = jb["jb_stat"], jb["p_value"]
        tails = tail_exceedances(r, 4.0)
        row["obs_4sigma_days"] = tails["observed"]
        row["exp_4sigma_days_normal"] = tails["expected_normal"]
        m = max(lb_lags)
        row[f"lb{m}_returns_p"] = ljung_box(r, [m])["p_value"].iloc[0]
        row[f"lb{m}_sq_returns_p"] = ljung_box(r ** 2, [m])["p_value"].iloc[0]
        row[f"lb{m}_returns_Q"] = ljung_box(r, [m])["Q_stat"].iloc[0]
        row[f"lb{m}_sq_returns_Q"] = ljung_box(r ** 2, [m])["Q_stat"].iloc[0]
        row.update(leverage_correlation(r))
        rows[asset] = row
    return pd.DataFrame(rows).T
