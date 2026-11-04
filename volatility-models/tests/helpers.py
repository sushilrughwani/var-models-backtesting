"""
helpers.py - small SYNTHETIC inputs for unit tests only.

Synthetic data is allowed in tests (we know the true answer) but never used
for the project's main results.
"""
import numpy as np
import pandas as pd

from src.models.garch_manual import simulate_garch


def synthetic_returns(n=600, seed=1):
    """GARCH(1,1) returns (decimal) on a business-day index."""
    r = simulate_garch(n, omega=2e-6, alpha=0.08, beta=0.90, seed=seed)
    dates = pd.bdate_range("2015-01-01", periods=n)
    return pd.Series(r, index=dates, name="ret")


def synthetic_ohlc(n=600, seed=1, start="2015-01-01"):
    """
    Price DataFrame with Open/High/Low/Close/Adj Close/Volume built from
    simulated GARCH returns, with High >= max(Open, Close), Low <= min(...).
    """
    rng = np.random.default_rng(seed + 100)
    r = simulate_garch(n, omega=2e-6, alpha=0.08, beta=0.90, seed=seed)
    close = 100.0 * np.exp(np.cumsum(r))
    open_ = close * np.exp(rng.normal(0, 0.002, n))
    spread = np.abs(rng.normal(0, 0.006, n)) + 0.001
    high = np.maximum(open_, close) * np.exp(spread)
    low = np.minimum(open_, close) * np.exp(-spread)
    dates = pd.bdate_range(start, periods=n)
    df = pd.DataFrame({"Open": open_, "High": high, "Low": low, "Close": close,
                       "Adj Close": close, "Volume": 1000}, index=dates)
    df.index.name = "Date"
    return df
