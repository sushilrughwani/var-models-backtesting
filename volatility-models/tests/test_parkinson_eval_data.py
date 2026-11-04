"""Tests: Parkinson known example, losses, Mincer-Zarnowitz, cleaning, JB."""
import numpy as np
import pandas as pd

from src.data_loader import clean_prices, compute_log_returns
from src.evaluation import mincer_zarnowitz, mse_loss, qlike_loss
from src.models.parkinson import (parkinson_daily_variance, parkinson_vol,
                                  parkinson_vol_forecast)
from src.stylized_facts import jarque_bera_manual, jarque_bera_test
from tests.helpers import synthetic_ohlc, synthetic_returns


def test_parkinson_known_example():
    # High 105, Low 100: ln(1.05)^2 / (4 ln 2) = 0.0023805 / 2.7726 = 0.00085858
    value = parkinson_daily_variance(np.array([105.0]), np.array([100.0]))[0]
    assert np.isclose(value, np.log(1.05) ** 2 / (4 * np.log(2)))
    assert np.isclose(value, 0.00085858, atol=1e-8)


def test_parkinson_rolling_and_forecast():
    high = pd.Series([105.0, 102.0, 110.0, 101.0])
    low = pd.Series([100.0, 100.0, 100.0, 100.0])
    vol = parkinson_vol(high, low, window=2)
    daily = parkinson_daily_variance(high, low)
    assert np.isclose(vol.iloc[1], np.sqrt((daily.iloc[0] + daily.iloc[1]) / 2))
    fc = parkinson_vol_forecast(high, low, window=2)
    assert np.isclose(fc.iloc[2], vol.iloc[1])
    assert (vol.dropna() > 0).all()


def test_qlike_minimised_at_true_variance():
    rv = synthetic_returns().values ** 2
    candidates = np.linspace(0.5, 2.0, 31) * rv.mean()
    losses = [qlike_loss(rv, np.full(len(rv), c)) for c in candidates]
    # QLIKE with a constant forecast is minimised at c = mean(RV)
    assert abs(candidates[int(np.argmin(losses))] / rv.mean() - 1) < 0.051
    assert np.isclose(mse_loss(np.array([1.0, 3.0]), np.array([2.0, 2.0])), 1.0)


def test_mincer_zarnowitz_perfect_forecast():
    rng = np.random.default_rng(0)
    h = pd.Series(rng.uniform(0.5, 3.0, 4000))
    rv = h * rng.chisquare(1, 4000)
    mz = mincer_zarnowitz(rv, h)
    assert abs(mz["b"] - 1) < 0.15 and abs(mz["a"]) < 0.25
    assert mz["p_joint_a0_b1"] > 0.01


def test_clean_prices_counts_drops():
    df = synthetic_ohlc(10)
    df.iloc[2, df.columns.get_loc("Close")] = np.nan
    df.iloc[4, df.columns.get_loc("Low")] = 0.0
    df.iloc[6, df.columns.get_loc("Low")] = df.iloc[6]["High"]
    clean, report = clean_prices(df)
    assert report["dropped_missing"] == 1
    assert report["dropped_non_positive"] == 1
    assert report["dropped_high_eq_low"] == 1
    assert len(clean) == 7 and report["dropped_total"] == 3


def test_log_returns_and_jb():
    prices = pd.Series([100.0, 110.0, 99.0])
    r = compute_log_returns(prices)
    assert np.allclose(r.values, [np.log(1.1), np.log(0.9)])
    x = synthetic_returns(1000)
    assert np.isclose(jarque_bera_manual(x)["jb_stat"], jarque_bera_test(x)["jb_stat"])
