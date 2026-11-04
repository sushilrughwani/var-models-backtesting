"""Tests: GARCH constraints, manual MLE ~= arch, parameter recovery, special cases."""
import numpy as np

from src.models.ewma import ewma_variance_loop
from src.models.garch_arch import (arch_term_structure, fit_arch, gjr_long_run_var,
                                   news_impact_curve)
from src.models.garch_manual import (fit_garch_manual, garch_long_run_stats,
                                     garch_term_structure, garch_variance, simulate_garch)
from tests.helpers import synthetic_returns

TRUE = {"omega": 0.02, "alpha": 0.08, "beta": 0.90}


def simulated_scaled(n=3000, seed=7):
    """Returns in percent from known parameters."""
    return simulate_garch(n, TRUE["omega"], TRUE["alpha"], TRUE["beta"], seed=seed)


def test_manual_fit_respects_constraints():
    fit = fit_garch_manual(simulated_scaled(1500))
    assert fit.converged
    assert fit.omega > 0 and fit.alpha >= 0 and fit.beta >= 0
    assert fit.alpha + fit.beta < 1


def test_manual_matches_arch_same_backcast():
    r = simulated_scaled()
    manual = fit_garch_manual(r)
    lib = fit_arch(r, backcast=float(np.var(r)))
    assert abs(manual.alpha - lib.params["alpha[1]"]) < 5e-3
    assert abs(manual.beta - lib.params["beta[1]"]) < 5e-3
    assert abs(manual.omega - lib.params["omega"]) < 5e-3
    assert abs(manual.loglik - lib.loglikelihood) < 0.05


def test_manual_recovers_true_parameters():
    fit = fit_garch_manual(simulated_scaled(5000, seed=3))
    assert abs(fit.alpha - TRUE["alpha"]) < 0.03
    assert abs(fit.beta - TRUE["beta"]) < 0.04


def test_garch_variance_positive():
    r = simulated_scaled(800)
    sigma2 = garch_variance(0.02, 0.08, 0.90, r, backcast=r.var())
    assert (sigma2 > 0).all()


def test_ewma_is_garch_special_case():
    r = synthetic_returns().values
    lam = 0.94
    as_garch = garch_variance(0.0, 1 - lam, lam, r, backcast=r[0] ** 2)
    ewma = ewma_variance_loop(synthetic_returns(), lam).values
    assert np.allclose(as_garch[1:], ewma[1:])


def test_long_run_stats_hand_example():
    stats = garch_long_run_stats(0.02, 0.08, 0.90, scale=100, trading_days=252)
    assert np.isclose(stats["persistence"], 0.98)
    assert np.isclose(stats["long_run_var_scaled"], 1.0)
    assert np.isclose(stats["long_run_annual_vol"], np.sqrt(252) / 100)
    assert np.isclose(stats["half_life_days"], np.log(0.5) / np.log(0.98))


def test_term_structure_mean_reverts_and_matches_arch():
    curve = garch_term_structure(0.02, 0.08, 0.90, sigma2_next=4.0, horizon=2000)
    assert np.isclose(curve[0], 4.0)
    assert abs(curve[-1] - 1.0) < 1e-6
    fit = fit_arch(simulated_scaled(1500))
    p = fit.params
    lib = arch_term_structure(fit, 50)
    manual = garch_term_structure(p["omega"], p["alpha[1]"], p["beta[1]"], lib[0], 50)
    assert np.allclose(manual, lib, rtol=1e-6)


def test_gjr_and_t_fits_and_news_impact():
    r = simulated_scaled(1500)
    gjr = fit_arch(r, o=1)
    g = gjr.params
    assert g["alpha[1]"] + g["gamma[1]"] / 2 + g["beta[1]"] < 1
    assert gjr_long_run_var(g["omega"], g["alpha[1]"], g["gamma[1]"], g["beta[1]"]) > 0
    t_fit = fit_arch(r, dist="t")
    assert t_fit.params["nu"] > 2
    shocks = np.array([-2.0, 2.0])
    nic = news_impact_curve(shocks, 0.02, 0.05, 0.9, 1.0, gamma=0.1)
    # Negative shock of the same size raises variance more (gamma * 4 = 0.4)
    assert np.isclose(nic[0] - nic[1], 0.4)
