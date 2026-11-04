"""
parkinson.py - Parkinson (1980) range-based volatility.

Purpose
    Use the daily High-Low range instead of only the close-to-close return.
    The range "sees" the whole intraday path, so each day carries more
    information about volatility.

Inputs
    Daily High and Low prices (Series), window N (20).

Outputs
    Daily Parkinson variance, rolling N-day volatility, 1-day-ahead forecast.

Formulas used
    sigma2_P(day) = (1 / (4 ln 2)) * (ln(High / Low))^2
    sigma_P,t(N)  = sqrt( mean of the last N daily sigma2_P )

Why more efficient: for a driftless random walk observed continuously, the
Parkinson estimator has about 1/5 of the variance of the squared close-to-
close return (efficiency ~5.2), so a 20-day Parkinson estimate is as precise
as a ~100-day close-to-close estimate.
Limitations: (1) ignores the overnight gap (close -> next open), so it is
biased DOWN for markets that gap (e.g. single stocks, non-US indices
reacting to the US overnight); (2) assumes zero drift; (3) discrete
sampling of the true high/low biases it down slightly; (4) needs reliable
High/Low data (stale quotes give High == Low -> zero variance).
"""
import numpy as np
import pandas as pd

# 1 / (4 ln 2) ~ 0.3607: makes E[sigma2_P] equal the true daily variance
PARKINSON_CONSTANT = 1.0 / (4.0 * np.log(2.0))


def parkinson_daily_variance(high, low):
    """
    WHAT: one-day Parkinson variance estimate.
    WHY:  the log range ln(H/L) of a random walk is proportional to its vol.
    Formula: (ln(H/L))^2 / (4 ln 2)
    """
    log_range = np.log(high / low)
    return PARKINSON_CONSTANT * log_range ** 2


def rolling_mean_loop(values, window):
    """
    WHAT: rolling mean with an explicit loop (check for pandas .rolling()).
    """
    x = np.asarray(values, dtype=float)
    out = np.full(len(x), np.nan)
    for t in range(window - 1, len(x)):
        out[t] = x[t - window + 1: t + 1].mean()
    return pd.Series(out, index=values.index)


def parkinson_vol(high, low, window=20):
    """
    WHAT: N-day Parkinson volatility (daily units), pandas checked against loop.
    Formula: sqrt( (1/N) * sum of the last N daily Parkinson variances )
    """
    daily_var = parkinson_daily_variance(high, low)
    fast = daily_var.rolling(window).mean()
    slow = rolling_mean_loop(daily_var, window)
    assert np.allclose(fast.values, slow.values, equal_nan=True)
    return np.sqrt(fast)


def parkinson_vol_forecast(high, low, window=20):
    """
    WHAT: 1-day-ahead forecast = Parkinson vol of the previous N days.
    WHY:  shift(1) -> the forecast for day t uses ranges up to day t-1 only.
    """
    return parkinson_vol(high, low, window).shift(1)
