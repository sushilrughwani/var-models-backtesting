"""
Test: no look-ahead bias in the 1-day-ahead forecasts.

Idea: replace every return from day k onward with garbage. A forecast for
day t <= k may only use returns up to t-1 <= k-1, so it must not change.
"""
import numpy as np

from src.config import Config
from src.evaluation import rolling_garch_variance, simple_model_forecasts
from tests.helpers import synthetic_ohlc


def perturb_from(df, k):
    """Copy of df with returns (and ranges) from row k onward changed."""
    out = df.copy()
    out.iloc[k:, out.columns.get_loc("ret")] *= 5.0
    out.iloc[k:, out.columns.get_loc("High")] *= 1.05
    return out


def make_data(n=500):
    df = synthetic_ohlc(n)
    df["ret"] = np.log(df["Adj Close"] / df["Adj Close"].shift(1))
    return df.dropna()


def test_simple_models_no_lookahead():
    cfg = Config()
    df = make_data()
    k = 400
    base = simple_model_forecasts(df, cfg)
    changed = simple_model_forecasts(perturb_from(df, k), cfg)
    for name in base:
        a, b = base[name].values[: k + 1], changed[name].values[: k + 1]
        assert np.allclose(a, b, equal_nan=True), name
        # ...and the forecast for day k+1 DOES react to the change on day k
        assert not np.isclose(base[name].values[k + 1], changed[name].values[k + 1]), name


def test_rolling_garch_no_lookahead():
    df = make_data()
    r = df["ret"] * 100
    k = 330
    base = rolling_garch_variance(r, 0, "normal", initial_window=300, refit_every=20)
    r_changed = r.copy()
    r_changed.iloc[k:] *= 5.0
    changed = rolling_garch_variance(r_changed, 0, "normal", initial_window=300, refit_every=20)
    assert np.isnan(base.values[:300]).all()
    assert np.allclose(base.values[300: k + 1], changed.values[300: k + 1])
    assert not np.allclose(base.values[k + 1:], changed.values[k + 1:])
