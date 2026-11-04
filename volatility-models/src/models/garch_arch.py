"""
garch_arch.py - GARCH(1,1) (normal and Student-t errors) and GJR-GARCH(1,1)
with the `arch` library.

Purpose
    Production-grade estimation with standard errors, information criteria
    and multi-step forecasts, after garch_manual.py has shown the mechanics.

Inputs
    Daily returns x 100 (percent), see garch_manual.py for why.

Outputs
    arch result objects and tidy DataFrames (parameters, std errors, t-stats,
    log-likelihood, AIC, BIC), news impact curves, variance term structures.

Formulas used
    GARCH:  sigma2_t = omega + alpha*r_{t-1}^2 + beta*sigma2_{t-1}
    GJR:    sigma2_t = omega + (alpha + gamma*I_{t-1})*r_{t-1}^2 + beta*sigma2_{t-1}
            I_{t-1} = 1 if r_{t-1} < 0 else 0
    GJR long-run variance (symmetric shocks): omega / (1 - alpha - gamma/2 - beta)
    AIC = 2k - 2 lnL ;  BIC = k ln(n) - 2 lnL   (lower is better)
    t-stat = estimate / standard error
    Student-t errors: z_t ~ t(nu) rescaled to unit variance; nu small = fat tails.

Mean model: zero mean (daily mean ~0.05% is negligible versus ~1% daily vol),
which keeps arch identical to the manual model and to EWMA.
Standard errors: arch's default 'robust' (Bollerslev-Wooldridge) sandwich
errors, which stay valid if the error distribution is mis-specified.
"""
import numpy as np
import pandas as pd
from arch import arch_model


def fit_arch(returns_scaled, o=0, dist="normal", backcast=None):
    """
    WHAT: fit GARCH(1,1) (o=0) or GJR-GARCH(1,1) (o=1) with zero mean.
    WHY:  one function for every GARCH-type model used in the project.
    `o` = number of asymmetric (leverage) terms; dist = 'normal' or 't'.
    """
    model = arch_model(returns_scaled, mean="Zero", vol="GARCH", p=1, o=o, q=1,
                       dist=dist, rescale=False)
    return model.fit(disp="off", show_warning=False, backcast=backcast)


def params_table(result):
    """
    WHAT: estimates, standard errors, t-stats and p-values in one table.
    WHY:  a parameter is 'significant' if |t| > ~1.96 (p < 0.05).
    """
    return pd.DataFrame({"estimate": result.params, "std_err": result.std_err,
                         "t_stat": result.tvalues, "p_value": result.pvalues})


def information_criteria(results_by_name):
    """
    WHAT: log-likelihood, number of parameters, AIC, BIC per model.
    WHY:  compares normal vs Student-t errors: more parameters must buy
          enough extra likelihood to lower AIC/BIC.
    """
    rows = {}
    for name, res in results_by_name.items():
        rows[name] = {"loglik": res.loglikelihood, "n_params": len(res.params),
                      "aic": res.aic, "bic": res.bic}
    return pd.DataFrame(rows).T


def arch_term_structure(result, horizon):
    """
    WHAT: arch's analytic variance forecasts 1..horizon days after the last date.
    WHY:  cross-check of the manual mean-reversion formula.
    """
    forecast = result.forecast(horizon=horizon, reindex=False)
    return forecast.variance.iloc[-1].values


def gjr_long_run_var(omega, alpha, gamma, beta):
    """
    WHAT: long-run variance of GJR-GARCH.
    WHY:  the leverage term fires on ~half the days, so it adds gamma/2
          to persistence. Formula: V_L = omega / (1 - alpha - gamma/2 - beta)
    """
    return omega / (1.0 - alpha - 0.5 * gamma - beta)


def news_impact_curve(shocks, omega, alpha, beta, sigma2_prev, gamma=0.0):
    """
    WHAT: tomorrow's variance as a function of today's return (shock),
          holding yesterday's variance fixed at sigma2_prev.
    WHY:  GARCH gives a symmetric parabola; GJR makes the left (negative
          return) side steeper = leverage effect.
    Formula: omega + (alpha + gamma*1[shock<0]) * shock^2 + beta * sigma2_prev
    """
    negative = (shocks < 0).astype(float)
    return omega + (alpha + gamma * negative) * shocks ** 2 + beta * sigma2_prev


def fixed_params_variance(returns_scaled, params, o=0, dist="normal"):
    """
    WHAT: conditional variance path for GIVEN (already estimated) parameters.
    WHY:  in the rolling evaluation, parameters are estimated on past data
          only and then just 'filtered' forward through new days.
          sigma2_t depends on r_{t-1}, sigma2_{t-1}: only past information.
    """
    model = arch_model(returns_scaled, mean="Zero", vol="GARCH", p=1, o=o, q=1,
                       dist=dist, rescale=False)
    fixed = model.fix(np.asarray(params, dtype=float))
    return np.asarray(fixed.conditional_volatility, dtype=float) ** 2
