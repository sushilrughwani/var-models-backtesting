"""
historical.py - rolling-window (historical) volatility.

Purpose
    The simplest volatility estimate: the standard deviation of the last N
    daily returns, with equal weight on every day in the window.

Inputs
    pandas Series of daily log returns, window length N (20, 60, 252).

Outputs
    pandas Series of daily volatility.

Formulas used
    sigma_t(N) = sqrt( 1/(N-1) * sum_{i=0..N-1} (r_{t-i} - rbar)^2 )
    1-day-ahead forecast for day t uses the window ending at t-1:
    sigma_hat_t = sigma_{t-1}(N)   (implemented with .shift(1))

Trade-off
    Short window (20d): reacts fast but noisy. Long window (252d): smooth but
    slow. "Ghost effect": one huge return keeps vol high for exactly N days
    and then vol drops abruptly when that day leaves the window, although
    nothing happened in the market on the drop day.
"""
import numpy as np
import pandas as pd


def rolling_std_loop(returns, window):
    """
    WHAT: rolling sample standard deviation computed with an explicit loop.
    WHY:  makes the equal-weight formula visible before using pandas.
    Formula: sqrt( sum (r_i - mean)^2 / (N - 1) ) over the last N returns.
    """
    x = np.asarray(returns, dtype=float)
    out = np.full(len(x), np.nan)
    for t in range(window - 1, len(x)):
        # The window holds returns t-N+1 ... t (inclusive)
        chunk = x[t - window + 1: t + 1]
        dev = chunk - chunk.mean()
        out[t] = np.sqrt(np.sum(dev ** 2) / (window - 1))
    return pd.Series(out, index=returns.index)


def rolling_std(returns, window):
    """
    WHAT: same rolling standard deviation using pandas, checked against the loop.
    WHY:  pandas is faster; the assert proves it implements the same formula.
    """
    fast = returns.rolling(window).std()
    slow = rolling_std_loop(returns, window)
    assert np.allclose(fast.values, slow.values, equal_nan=True)
    return fast


def historical_vol_forecast(returns, window):
    """
    WHAT: 1-day-ahead volatility forecast = rolling std of the PREVIOUS N days.
    WHY:  shift(1) means the forecast for day t only uses returns up to t-1,
          so there is no look-ahead bias.
    """
    return rolling_std(returns, window).shift(1)


def ghost_effect_dates(returns, window):
    """
    WHAT: date of the largest absolute return and the date it leaves the window.
    WHY:  used to annotate the 'ghost effect' on the rolling-vol chart.
    """
    position = int(np.argmax(np.abs(returns.values)))
    shock_date = returns.index[position]
    exit_position = min(position + window, len(returns) - 1)
    return shock_date, returns.index[exit_position]
