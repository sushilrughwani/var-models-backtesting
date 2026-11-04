"""
garch_manual.py - GARCH(1,1) estimated by hand with maximum likelihood.

Purpose
    Show exactly what the `arch` library does: build the variance recursion,
    write the normal log-likelihood, and maximise it with scipy.

Inputs
    numpy array / Series of daily returns MULTIPLIED BY 100 (percent).
    Why scale? Daily variances are ~1e-4; omega is ~1e-6. Optimisers work
    with tolerances around 1e-8 and finite-difference steps of similar size,
    so parameters that tiny are badly conditioned. In percent, the variance
    is ~1 and omega ~0.02, so all parameters have similar magnitudes.
    (alpha, beta are unit-free and unchanged; omega scales by 100^2.)

Outputs
    GarchFit dataclass (omega, alpha, beta, log-likelihood ...), long-run
    statistics, volatility term-structure forecasts, simulated paths (tests).

Formulas used
    sigma2_t = omega + alpha * r_{t-1}^2 + beta * sigma2_{t-1}
    log L    = -1/2 * sum_t [ ln(2*pi) + ln(sigma2_t) + r_t^2 / sigma2_t ]
    persistence = alpha + beta  (must be < 1 for a finite long-run variance)
    V_L = omega / (1 - alpha - beta)
    half-life = ln(0.5) / ln(alpha + beta)
    E[sigma2_{t+h}] = V_L + (alpha+beta)^(h-1) * (sigma2_{t+1} - V_L)
"""
from dataclasses import dataclass

import numpy as np
from scipy.optimize import minimize


@dataclass
class GarchFit:
    """Result of a manual GARCH(1,1) fit (parameters in scaled units)."""
    omega: float
    alpha: float
    beta: float
    loglik: float
    converged: bool
    n_obs: int


def garch_variance(omega, alpha, beta, returns, backcast):
    """
    WHAT: conditional variance path sigma2_t for given parameters.
    WHY:  this recursion IS the model; everything else builds on it.
    Formula: sigma2_t = omega + alpha*r_{t-1}^2 + beta*sigma2_{t-1}.
    For t = 0 we need r_{-1}^2 and sigma2_{-1}: both are set to `backcast`
    (we use the sample variance; arch does the same if given backcast=).
    """
    r = np.asarray(returns, dtype=float)
    sigma2 = np.empty(len(r))
    sigma2[0] = omega + alpha * backcast + beta * backcast
    for t in range(1, len(r)):
        sigma2[t] = omega + alpha * r[t - 1] ** 2 + beta * sigma2[t - 1]
    return sigma2


def garch_neg_loglik(params, returns, backcast):
    """
    WHAT: minus the normal log-likelihood of GARCH(1,1).
    WHY:  maximum likelihood picks the parameters under which the observed
          returns were most probable; scipy minimises, so we flip the sign.
    Formula: -log L = 1/2 * sum [ ln(2 pi) + ln sigma2_t + r_t^2 / sigma2_t ]
    """
    omega, alpha, beta = params
    r = np.asarray(returns, dtype=float)
    sigma2 = garch_variance(omega, alpha, beta, r, backcast)
    # Guard: a non-positive variance makes ln() invalid -> huge penalty
    if np.any(sigma2 <= 0):
        return 1e10
    terms = np.log(2.0 * np.pi) + np.log(sigma2) + r ** 2 / sigma2
    return 0.5 * np.sum(terms)


def stationarity_margin(params):
    """
    WHAT: 1 - alpha - beta (minus a tiny buffer); scipy requires this >= 0.
    WHY:  alpha + beta < 1 is needed for a finite long-run variance.
    """
    return 1.0 - 1e-6 - params[1] - params[2]


def fit_garch_manual(returns_scaled):
    """
    WHAT: estimate omega, alpha, beta by maximising the log-likelihood.
    WHY:  same estimator as arch; doing it by hand shows every assumption.
    Constraints: omega > 0, alpha >= 0, beta >= 0, alpha + beta < 1.
    """
    r = np.asarray(returns_scaled, dtype=float)
    backcast = r.var()
    # Starting values: typical equity GARCH, omega matching the sample variance
    x0 = np.array([backcast * 0.05, 0.05, 0.90])
    bounds = [(1e-8, None), (0.0, 1.0), (0.0, 1.0)]
    # Inequality constraint g(x) >= 0  <=>  alpha + beta <= 1 - 1e-6
    stationarity = {"type": "ineq", "fun": stationarity_margin}
    result = minimize(garch_neg_loglik, x0, args=(r, backcast), method="SLSQP",
                      bounds=bounds, constraints=[stationarity],
                      options={"maxiter": 500, "ftol": 1e-10})
    omega, alpha, beta = result.x
    return GarchFit(omega=float(omega), alpha=float(alpha), beta=float(beta),
                    loglik=float(-result.fun), converged=bool(result.success),
                    n_obs=len(r))


def garch_long_run_stats(omega, alpha, beta, scale=100.0, trading_days=252):
    """
    WHAT: persistence, long-run variance/vol and half-life of shocks.
    WHY:  these are the numbers a risk manager reads off a GARCH fit:
          where vol mean-reverts to, and how fast.
    Formulas: p = alpha+beta; V_L = omega/(1-p); half-life = ln 0.5 / ln p.
    `omega` is in scaled units (returns x scale), results are converted back.
    """
    persistence = alpha + beta
    long_run_var_scaled = omega / (1.0 - persistence)
    long_run_daily_vol = np.sqrt(long_run_var_scaled) / scale
    return {"persistence": persistence,
            "long_run_var_scaled": long_run_var_scaled,
            "long_run_daily_vol": long_run_daily_vol,
            "long_run_annual_vol": long_run_daily_vol * np.sqrt(trading_days),
            "half_life_days": np.log(0.5) / np.log(persistence)}


def garch_term_structure(omega, alpha, beta, sigma2_next, horizon):
    """
    WHAT: expected variance h = 1..horizon days ahead.
    WHY:  shows mean reversion: forecasts converge to V_L at speed alpha+beta.
    Formula: E[sigma2_{t+h}] = V_L + (alpha+beta)^(h-1) * (sigma2_{t+1} - V_L)
    """
    persistence = alpha + beta
    long_run_var = omega / (1.0 - persistence)
    h = np.arange(1, horizon + 1)
    return long_run_var + persistence ** (h - 1) * (sigma2_next - long_run_var)


def simulate_garch(n, omega, alpha, beta, seed=0):
    """
    WHAT: simulate n returns from a GARCH(1,1) with normal shocks.
    WHY:  ONLY for unit tests - we know the true parameters, so we can check
          that the estimator recovers them. Never used for the main results.
    """
    rng = np.random.default_rng(seed)
    z = rng.standard_normal(n)
    r = np.empty(n)
    sigma2 = omega / (1.0 - alpha - beta)
    for t in range(n):
        r[t] = np.sqrt(sigma2) * z[t]
        sigma2 = omega + alpha * r[t] ** 2 + beta * sigma2
    return r
