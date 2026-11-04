"""Tests: EWMA loop == pandas .ewm(), rolling loop == pandas, weights, positivity."""
import numpy as np
import pandas as pd

from src.models.ewma import (ewma_half_life, ewma_variance, ewma_variance_loop,
                             ewma_variance_pandas, ewma_weights)
from src.models.historical import historical_vol_forecast, rolling_std, rolling_std_loop
from tests.helpers import synthetic_returns


def test_ewma_loop_equals_pandas():
    r = synthetic_returns()
    for lam in (0.90, 0.94, 0.97):
        loop = ewma_variance_loop(r, lam)
        fast = ewma_variance_pandas(r, lam)
        assert np.allclose(loop.values, fast.values, equal_nan=True)


def test_ewma_hand_example():
    # r = [1%, -2%, 0.5%], lambda = 0.94
    r = pd.Series([0.01, -0.02, 0.005])
    s = ewma_variance_loop(r, 0.94)
    assert np.isnan(s.iloc[0])
    assert np.isclose(s.iloc[1], 0.0001)
    # 0.94*0.0001 + 0.06*0.0004 = 0.000118
    assert np.isclose(s.iloc[2], 0.000118)


def test_ewma_weights_sum_and_half_life():
    w = ewma_weights(0.94, 2000)
    assert np.isclose(w.sum(), 1.0)
    assert np.isclose(w.iloc[0], 0.06)
    assert np.isclose(ewma_half_life(0.94), 11.2, atol=0.05)


def test_ewma_variance_positive():
    r = synthetic_returns()
    assert (ewma_variance(r, 0.94).dropna() > 0).all()


def test_rolling_loop_equals_pandas_and_positive():
    r = synthetic_returns()
    for window in (20, 60, 252):
        assert np.allclose(rolling_std_loop(r, window), r.rolling(window).std(), equal_nan=True)
        assert (rolling_std(r, window).dropna() > 0).all()


def test_historical_forecast_is_lagged():
    r = synthetic_returns()
    f = historical_vol_forecast(r, 20)
    # Forecast for day 20 = std of returns 0..19
    assert np.isclose(f.iloc[20], r.iloc[:20].std())
