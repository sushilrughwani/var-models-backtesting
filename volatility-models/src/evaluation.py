"""
evaluation.py - out-of-sample 1-day-ahead forecasts and their evaluation.

Purpose
    Answer "which model forecasts volatility best?" honestly, i.e. using only
    information that was available at the time of each forecast.

LOOK-AHEAD BIAS
    Look-ahead bias = using data from day t (or later) to build the forecast
    for day t. It makes a model look better than it could ever be in real
    time (e.g. fitting GARCH on 2015-2026 and then "forecasting" 2020).
    How this module avoids it:
      * rolling / EWMA / Parkinson: the value for day t uses returns or ranges
        up to t-1 only (.shift(1) / recursion on r_{t-1}).
      * GARCH-type models: expanding window. At each refit date t0, parameters
        are estimated on returns r_0..r_{t0-1} ONLY, then kept fixed for the
        next 20 days; for each of those days t the variance sigma2_t is the
        recursion on r_{t-1} and sigma2_{t-1}, i.e. past data only.
      * the first `initial_window` days are used only for estimation and are
        never scored.
    tests/test_no_lookahead.py changes all returns after a date and checks
    that no forecast up to that date changes.

Inputs
    Asset DataFrame (High, Low, ret), Config.

Outputs
    DataFrame of variance forecasts (rows = dates, columns = models),
    loss table (MSE, QLIKE, ranks), Mincer-Zarnowitz table, COVID reaction
    table, long-format forecasts for outputs/vol_forecasts.csv.

Formulas used (realized-variance proxy RV_t = r_t^2, forecast h_t = sigma2_t)
    MSE   = mean( (RV_t - h_t)^2 )
    QLIKE = mean( RV_t / h_t + ln h_t )      (Patton 2011 form; lower = better)
    Mincer-Zarnowitz: RV_t = a + b * h_t + e_t ; unbiased forecast <=> a=0, b=1
"""
import numpy as np
import pandas as pd
import statsmodels.api as sm

from src.models.ewma import ewma_variance
from src.models.garch_arch import fit_arch, fixed_params_variance
from src.models.historical import historical_vol_forecast
from src.models.parkinson import parkinson_vol_forecast

# name -> (number of asymmetric terms o, error distribution)
GARCH_SPECS = {"GARCH": (0, "normal"), "GARCH-t": (0, "t"), "GJR-GARCH": (1, "normal")}

# Variances are compared in percent^2 units (x 1e4) so losses are readable
PCT2 = 1e4


def rolling_garch_variance(returns_scaled, o, dist, initial_window, refit_every):
    """
    WHAT: out-of-sample 1-day-ahead variance from a GARCH-type model,
          re-estimated every `refit_every` days on an expanding window.
    WHY:  mimics what a risk desk can do in real time (no look-ahead).
    Returns a Series in scaled units (percent^2), NaN before initial_window.
    """
    r = returns_scaled
    out = np.full(len(r), np.nan)
    for t0 in range(initial_window, len(r), refit_every):
        t1 = min(t0 + refit_every, len(r))
        # Estimation sample = r_0 ... r_{t0-1}: strictly before the first forecast day
        fit = fit_arch(r.iloc[:t0], o=o, dist=dist)
        # Filter r_0..r_{t1-1} with the frozen parameters; sigma2_t uses r_{t-1}
        path = fixed_params_variance(r.iloc[:t1], fit.params, o=o, dist=dist)
        out[t0:t1] = path[t0:t1]
    return pd.Series(out, index=r.index)


def simple_model_forecasts(df, cfg):
    """
    WHAT: 1-day-ahead variance forecasts of the models without parameters
          to estimate (rolling windows, EWMA, Parkinson), in decimal units.
    WHY:  each value already uses only data up to t-1, so computing them
          on the whole sample at once creates no look-ahead.
    """
    r = df["ret"]
    out = {}
    for window in cfg.hist_windows:
        out[f"HIST{window}"] = historical_vol_forecast(r, window) ** 2
    out["EWMA"] = ewma_variance(r, cfg.ewma_lambda)
    park = parkinson_vol_forecast(df["High"], df["Low"], cfg.parkinson_window)
    out[f"PARK{cfg.parkinson_window}"] = park ** 2
    return out


def garch_model_forecasts(df, cfg):
    """
    WHAT: rolling out-of-sample forecasts for GARCH, GARCH-t, GJR-GARCH.
    Returns {name: variance Series in decimal units}.
    """
    r_scaled = df["ret"] * cfg.garch_scale
    out = {}
    for name, (o, dist) in GARCH_SPECS.items():
        var_scaled = rolling_garch_variance(r_scaled, o, dist,
                                            cfg.initial_window, cfg.refit_every)
        # Undo the x100 scaling: variance scales by 100^2
        out[name] = var_scaled / cfg.garch_scale ** 2
    return out


def build_forecasts(df, cfg):
    """
    WHAT: all models' 1-day-ahead variance forecasts on the evaluation period.
    WHY:  every model is scored on exactly the same days.
    Evaluation period = every day after the first `initial_window` returns.
    """
    forecasts = simple_model_forecasts(df, cfg)
    forecasts.update(garch_model_forecasts(df, cfg))
    table = pd.DataFrame(forecasts)
    table = table.iloc[cfg.initial_window:]
    assert not table.isna().any().any(), "missing forecasts in evaluation period"
    assert (table > 0).all().all(), "non-positive variance forecast"
    return table


def mse_loss(realized_var, forecast_var):
    """MSE = mean((RV - h)^2). Penalises errors symmetrically, in variance units."""
    return float(np.mean((realized_var - forecast_var) ** 2))


def qlike_loss(realized_var, forecast_var):
    """
    QLIKE = mean(RV/h + ln h). Depends on the RATIO RV/h, so a single crash
    day does not dominate; penalises under-prediction more than over-prediction.
    """
    return float(np.mean(realized_var / forecast_var + np.log(forecast_var)))


def loss_table(forecasts_var, returns):
    """
    WHAT: MSE and QLIKE of each model against RV_t = r_t^2, with ranks.
    WHY:  the core model-comparison table (rank 1 = best).
    """
    realized = (returns.loc[forecasts_var.index] ** 2) * PCT2
    rows = {}
    for model in forecasts_var.columns:
        forecast = forecasts_var[model] * PCT2
        rows[model] = {"MSE": mse_loss(realized, forecast),
                       "QLIKE": qlike_loss(realized, forecast)}
    table = pd.DataFrame(rows).T
    table["rank_QLIKE"] = table["QLIKE"].rank().astype(int)
    table["rank_MSE"] = table["MSE"].rank().astype(int)
    return table.sort_values("QLIKE")


def mincer_zarnowitz(realized_var, forecast_var):
    """
    WHAT: OLS of realized variance on the forecast: RV_t = a + b*h_t + e_t.
    WHY:  a good forecast is unbiased (a = 0, b = 1); R^2 shows how much of
          the variation in RV it explains. HAC (Newey-West) standard errors
          because the errors are heteroskedastic and autocorrelated.
    """
    exog = sm.add_constant(pd.DataFrame({"forecast": forecast_var}))
    fit = sm.OLS(realized_var, exog).fit(cov_type="HAC", cov_kwds={"maxlags": 5})
    joint = fit.f_test("const = 0, forecast = 1")
    return {"a": fit.params["const"], "b": fit.params["forecast"],
            "se_a": fit.bse["const"], "se_b": fit.bse["forecast"],
            "r2": fit.rsquared, "p_joint_a0_b1": float(joint.pvalue)}


def mincer_zarnowitz_table(forecasts_var, returns):
    """WHAT: Mincer-Zarnowitz results for every model (percent^2 units)."""
    realized = (returns.loc[forecasts_var.index] ** 2) * PCT2
    rows = {}
    for model in forecasts_var.columns:
        rows[model] = mincer_zarnowitz(realized, forecasts_var[model] * PCT2)
    return pd.DataFrame(rows).T


def reaction_metrics(vol, shock_date):
    """
    WHAT: how fast one model's vol reacts to a shock and how fast it decays.
    pre = vol on the last day before the shock; peak = max after the shock;
    half-decay = first day after the peak where vol is back halfway to pre.
    Days are counted in trading days.
    """
    before = vol[vol.index < shock_date]
    after = vol[vol.index >= shock_date]
    pre = before.iloc[-1]
    peak_date = after.idxmax()
    peak = after.max()
    days_to_peak = after.index.get_loc(peak_date)
    post_peak = after[after.index > peak_date]
    halfway = pre + 0.5 * (peak - pre)
    recovered = post_peak[post_peak <= halfway]
    days_to_half = np.nan
    if len(recovered) > 0:
        days_to_half = post_peak.index.get_loc(recovered.index[0]) + 1
    return {"pre_shock_vol": pre, "peak_vol": peak, "peak_date": peak_date.date(),
            "days_to_peak": days_to_peak, "days_peak_to_half_decay": days_to_half}


def covid_reaction_table(sigma_annual, cfg):
    """
    WHAT: reaction metrics of every model during the 2020 COVID crash.
    WHY:  quantifies 'responsiveness vs smoothness' on the most extreme
          volatility event in the sample.
    """
    window = sigma_annual.loc[cfg.covid_start:cfg.covid_end]
    shock = pd.Timestamp(cfg.covid_shock_date)
    rows = {}
    for model in window.columns:
        rows[model] = reaction_metrics(window[model], shock)
    return pd.DataFrame(rows).T


def forecasts_to_long(forecasts_var, asset, trading_days):
    """
    WHAT: reshape to columns date, asset, model, sigma_daily, sigma_annual.
    WHY:  tidy format that another project (e.g. VaR backtesting) can load.
    """
    long = forecasts_var.stack().reset_index()
    long.columns = ["date", "model", "variance_daily"]
    long["asset"] = asset
    long["sigma_daily"] = np.sqrt(long["variance_daily"])
    long["sigma_annual"] = long["sigma_daily"] * np.sqrt(trading_days)
    return long[["date", "asset", "model", "sigma_daily", "sigma_annual"]]
