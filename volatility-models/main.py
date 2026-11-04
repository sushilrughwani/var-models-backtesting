"""
main.py - run the whole project with one command:  python main.py

Purpose
    Part 0  load real data (cache in data/), clean, log returns
    Part 1  stylized facts (fat tails, clustering, leverage)
    Part 2  models: rolling, EWMA, GARCH (manual + arch), GARCH-t,
            GJR-GARCH, Parkinson
    Part 3  out-of-sample forecast evaluation (MSE, QLIKE, Mincer-Zarnowitz,
            ranking, COVID zoom) and outputs/vol_forecasts.csv

Inputs
    Config (src/config.py); cached CSVs in data/ or a yfinance download.

Outputs
    outputs/*.png charts, outputs/*.csv tables, outputs/key_results.json
    (every number quoted in the docs comes from this file).

Synthetic data is never used here: if real data is unavailable the run
stops with an explanation (exit code 1).
"""
import json
import sys
import time

import numpy as np
import pandas as pd

from src import plots
from src.config import Config
from src.data_loader import load_all_assets
from src.evaluation import (build_forecasts, covid_reaction_table,
                            forecasts_to_long, loss_table, mincer_zarnowitz_table)
from src.models.ewma import ewma_half_life, ewma_variance, ewma_weights
from src.models.garch_arch import (arch_term_structure, fit_arch, gjr_long_run_var,
                                   information_criteria, news_impact_curve, params_table)
from src.models.garch_manual import (fit_garch_manual, garch_long_run_stats,
                                     garch_term_structure, garch_variance)
from src.models.historical import ghost_effect_dates, rolling_std
from src.models.parkinson import parkinson_vol
from src.stylized_facts import ljung_box, stylized_facts_table


def save_table(df, name, cfg):
    """Write a table to outputs/<name>.csv."""
    df.to_csv(cfg.output_dir / f"{name}.csv")


def part0_data(cfg, results):
    """Load (cache or download), clean, compute log returns; report drops."""
    data, report = load_all_assets(cfg)
    save_table(report, "data_cleaning", cfg)
    results["data"] = report.to_dict(orient="index")
    for asset, row in report.iterrows():
        print(f"  {asset}: {row['rows_clean']} rows ({row['first_date']} -> "
              f"{row['last_date']}), dropped {row['dropped_total']}, src={row['source']}")
    return data


def part1_stylized_facts(data, cfg, results):
    """Summary stats, Jarque-Bera, Ljung-Box, leverage + the four charts."""
    returns = {asset: df["ret"] for asset, df in data.items()}
    table = stylized_facts_table(returns, cfg.trading_days, cfg.ljung_box_lags)
    save_table(table, "stylized_facts", cfg)
    lb_rows = []
    for asset, r in returns.items():
        for label, series in (("returns", r), ("squared_returns", r ** 2)):
            lb = ljung_box(series, cfg.ljung_box_lags)
            lb["asset"], lb["series"] = asset, label
            lb_rows.append(lb)
    save_table(pd.concat(lb_rows), "ljung_box", cfg)
    out = cfg.output_dir
    plots.plot_returns_clustering(returns, out / "01_returns_clustering.png")
    plots.plot_hist_vs_normal(returns, out / "02_hist_vs_normal.png")
    plots.plot_qq(returns, out / "03_qq_plot.png")
    plots.plot_acf_comparison(returns, cfg.acf_lags, out / "04_acf_returns_vs_squared.png")
    results["stylized_facts"] = table.astype(float).to_dict(orient="index")
    print(table[["vol_annual", "skewness", "excess_kurtosis", "jb_pvalue",
                 "corr_r_next_r2"]].round(4).to_string())


def part2_historical(data, cfg, results):
    """Rolling 20/60/252-day vol, noise per window, ghost-effect chart."""
    results["historical"] = {}
    root = np.sqrt(cfg.trading_days)
    for asset, df in data.items():
        r = df["ret"]
        vols = pd.DataFrame({f"{w}-day": rolling_std(r, w) * root for w in cfg.hist_windows})
        # Noise = average absolute day-to-day change of the annualised vol estimate
        noise = vols.diff().abs().mean().to_dict()
        shock, _ = ghost_effect_dates(r, 60)
        notes = [(shock, "largest |return|")]
        for w in cfg.hist_windows:
            exit_date = ghost_effect_dates(r, w)[1]
            notes.append((exit_date, f"shock leaves {w}d window"))
        plots.plot_lines(vols, f"{asset}: rolling (historical) volatility and the ghost effect",
                         "Annualised volatility", cfg.output_dir / f"05_hist_vol_{asset}.png",
                         annotations=notes)
        results["historical"][asset] = {"avg_abs_daily_change": noise,
                                        "largest_shock_date": str(shock.date()),
                                        "largest_shock_return": float(r.loc[shock])}


def part2_ewma(data, cfg, results):
    """EWMA with several lambdas, weights chart, EWMA = GARCH special case."""
    root = np.sqrt(cfg.trading_days)
    results["ewma"] = {"half_life_days": {str(l): ewma_half_life(l) for l in cfg.ewma_lambdas}}
    weights = {lam: ewma_weights(lam, cfg.ewma_weight_lags) for lam in cfg.ewma_lambdas}
    plots.plot_ewma_weights(weights, cfg.output_dir / "06_ewma_weights.png")
    for asset, df in data.items():
        r = df["ret"]
        # ewma_variance asserts the loop version == pandas .ewm()
        vols = pd.DataFrame({f"λ={lam:.2f}": np.sqrt(ewma_variance(r, lam)) * root
                             for lam in cfg.ewma_lambdas})
        last3y = vols.iloc[-3 * cfg.trading_days:]
        plots.plot_lines(last3y, f"{asset}: EWMA volatility for different λ (last 3 years)",
                         "Annualised volatility", cfg.output_dir / f"07_ewma_lambdas_{asset}.png")
        # EWMA is GARCH with omega = 0, alpha = 1-lambda, beta = lambda
        lam = cfg.ewma_lambda
        as_garch = garch_variance(0.0, 1 - lam, lam, r.values, backcast=r.values[0] ** 2)
        ewma = ewma_variance(r, lam).values
        assert np.allclose(as_garch[1:], ewma[1:])
        results["ewma"][asset] = {"latest_vol_annual_0.94": float(vols.iloc[-1, 1]),
                                  "ewma_equals_garch_special_case": True}


def compare_manual_vs_arch(r_scaled):
    """Manual MLE vs arch on the same data and the same backcast."""
    manual = fit_garch_manual(r_scaled)
    lib = fit_arch(r_scaled, backcast=float(np.var(r_scaled)))
    # Our names -> arch's parameter names
    arch_names = {"omega": "omega", "alpha": "alpha[1]", "beta": "beta[1]"}
    rows = {}
    for name, arch_name in arch_names.items():
        rows[name] = {"manual": getattr(manual, name), "arch": lib.params[arch_name]}
    rows["loglik"] = {"manual": manual.loglik, "arch": lib.loglikelihood}
    table = pd.DataFrame(rows).T
    table["abs_diff"] = (table["manual"] - table["arch"]).abs()
    return table, manual.converged


def part2_garch_manual(data, cfg, results):
    """Fit GARCH(1,1) by hand and check it matches arch."""
    tables = []
    results["garch_manual_vs_arch"] = {}
    for asset, df in data.items():
        table, converged = compare_manual_vs_arch(df["ret"].values * cfg.garch_scale)
        table["asset"] = asset
        tables.append(table)
        results["garch_manual_vs_arch"][asset] = {
            "max_abs_param_diff": float(table.loc[["omega", "alpha", "beta"], "abs_diff"].max()),
            "loglik_diff": float(table.loc["loglik", "abs_diff"]), "converged": converged}
    save_table(pd.concat(tables), "garch_manual_vs_arch", cfg)


def fit_all_garch(r_scaled):
    """GARCH-normal, GARCH-t and GJR-GARCH (normal) on the full sample."""
    return {"GARCH-normal": fit_arch(r_scaled, o=0, dist="normal"),
            "GARCH-t": fit_arch(r_scaled, o=0, dist="t"),
            "GJR-GARCH": fit_arch(r_scaled, o=1, dist="normal")}


def garch_summary_row(fits, cfg):
    """Long-run statistics and GJR test for one asset."""
    p = fits["GARCH-normal"].params
    stats_n = garch_long_run_stats(p["omega"], p["alpha[1]"], p["beta[1]"],
                                   cfg.garch_scale, cfg.trading_days)
    pt = fits["GARCH-t"].params
    stats_t = garch_long_run_stats(pt["omega"], pt["alpha[1]"], pt["beta[1]"],
                                   cfg.garch_scale, cfg.trading_days)
    g = fits["GJR-GARCH"]
    gp = g.params
    gjr_vl = gjr_long_run_var(gp["omega"], gp["alpha[1]"], gp["gamma[1]"], gp["beta[1]"])
    row = {f"normal_{k}": float(v) for k, v in stats_n.items()}
    row.update({f"t_{k}": float(v) for k, v in stats_t.items()})
    row.update({"t_nu": float(pt["nu"]), "gjr_gamma": float(gp["gamma[1]"]),
                "gjr_gamma_t": float(g.tvalues["gamma[1]"]),
                "gjr_gamma_p": float(g.pvalues["gamma[1]"]),
                "gjr_alpha": float(gp["alpha[1]"]), "gjr_beta": float(gp["beta[1]"]),
                "gjr_persistence": float(gp["alpha[1]"] + gp["gamma[1]"] / 2 + gp["beta[1]"]),
                "gjr_long_run_annual_vol": float(np.sqrt(gjr_vl * cfg.trading_days) / cfg.garch_scale)})
    return row


def term_structure(fit, cfg):
    """Annualised vol forecasts 1..H days ahead; manual formula checked vs arch."""
    p = fit.params
    lib = arch_term_structure(fit, cfg.forecast_horizon)
    manual = garch_term_structure(p["omega"], p["alpha[1]"], p["beta[1]"], lib[0],
                                  cfg.forecast_horizon)
    assert np.allclose(manual, lib, rtol=1e-6)
    return np.sqrt(lib * cfg.trading_days) / cfg.garch_scale


def news_impact_curves(fits):
    """GARCH vs GJR news impact, each with yesterday's variance at its long-run level."""
    shocks = np.linspace(-5, 5, 201)
    p = fits["GARCH-normal"].params
    g = fits["GJR-GARCH"].params
    vl_garch = p["omega"] / (1 - p["alpha[1]"] - p["beta[1]"])
    vl_gjr = gjr_long_run_var(g["omega"], g["alpha[1]"], g["gamma[1]"], g["beta[1]"])
    curves = {"GARCH(1,1)": news_impact_curve(shocks, p["omega"], p["alpha[1]"],
                                              p["beta[1]"], vl_garch),
              "GJR-GARCH(1,1)": news_impact_curve(shocks, g["omega"], g["alpha[1]"],
                                                  g["beta[1]"], vl_gjr, g["gamma[1]"])}
    return shocks, curves


def part2_garch_arch(data, cfg, results):
    """arch fits, parameter tables, AIC/BIC, term structure, news impact."""
    param_rows, ic_rows, summary, curves, long_run, nic = [], [], {}, {}, {}, {}
    for asset, df in data.items():
        fits = fit_all_garch(df["ret"] * cfg.garch_scale)
        for name, fit in fits.items():
            table = params_table(fit)
            table["asset"], table["model"] = asset, name
            param_rows.append(table)
        ic = information_criteria(fits)
        ic["asset"] = asset
        ic_rows.append(ic)
        summary[asset] = garch_summary_row(fits, cfg)
        curves[asset] = term_structure(fits["GARCH-normal"], cfg)
        summary[asset]["next_day_vol_annual"] = float(curves[asset][0])
        long_run[asset] = summary[asset]["normal_long_run_annual_vol"]
        shocks, nic[asset] = news_impact_curves(fits)
    save_table(pd.concat(param_rows), "garch_params", cfg)
    ic_all = pd.concat(ic_rows)
    save_table(ic_all, "garch_information_criteria", cfg)
    save_table(pd.DataFrame(summary).T, "garch_summary", cfg)
    plots.plot_term_structure(curves, long_run, cfg.output_dir / "08_garch_term_structure.png")
    plots.plot_news_impact(shocks, nic, cfg.output_dir / "09_news_impact_curve.png")
    results["garch"] = summary
    results["garch_ic"] = {f"{row['asset']}|{name}": row.drop("asset").astype(float).to_dict()
                           for name, row in ic_all.iterrows()}
    print(pd.DataFrame(summary).T[["normal_persistence", "normal_long_run_annual_vol",
                                   "normal_half_life_days", "t_nu", "gjr_gamma_p"]].round(4).to_string())


def part2_parkinson(data, cfg, results):
    """Parkinson vs close-to-close 20-day vol; overnight-gap share of variance."""
    results["parkinson"] = {}
    root = np.sqrt(cfg.trading_days)
    w = cfg.parkinson_window
    for asset, df in data.items():
        park = parkinson_vol(df["High"], df["Low"], w) * root
        close = rolling_std(df["ret"], w) * root
        both = pd.DataFrame({f"Parkinson {w}d": park, f"Close-to-close {w}d": close}).dropna()
        plots.plot_lines(both.iloc[-3 * cfg.trading_days:],
                         f"{asset}: Parkinson vs close-to-close volatility (last 3 years)",
                         "Annualised volatility", cfg.output_dir / f"10_parkinson_{asset}.png")
        # Overnight return = ln(Open_t / Close_{t-1}); its share of total variance
        overnight = np.log(df["Open"] / df["Close"].shift(1)).dropna()
        share = float((overnight ** 2).sum() / (df["ret"].loc[overnight.index] ** 2).sum())
        ratio = both.iloc[:, 0] / both.iloc[:, 1]
        results["parkinson"][asset] = {"mean_ratio_park_to_cc": float(ratio.mean()),
                                       "mean_park_vol": float(both.iloc[:, 0].mean()),
                                       "mean_cc_vol": float(both.iloc[:, 1].mean()),
                                       "overnight_variance_share": share}


def part3_asset(asset, df, cfg):
    """Forecasts, losses, MZ, COVID metrics and long table for one asset."""
    forecasts = build_forecasts(df, cfg)
    losses = loss_table(forecasts, df["ret"])
    mz = mincer_zarnowitz_table(forecasts, df["ret"])
    sigma_annual = np.sqrt(forecasts * cfg.trading_days)
    covid = covid_reaction_table(sigma_annual, cfg)
    window = sigma_annual.loc[cfg.covid_start:cfg.covid_end]
    realized = df["ret"].abs().loc[window.index] * np.sqrt(cfg.trading_days)
    plots.plot_covid_zoom(window, realized, pd.Timestamp(cfg.covid_shock_date),
                          f"{asset}: 1-day-ahead vol forecasts during the 2020 COVID crash",
                          cfg.output_dir / f"12_covid_zoom_{asset}.png")
    shown = sigma_annual[["HIST60", "EWMA", "GARCH", "GJR-GARCH"]]
    plots.plot_lines(shown, f"{asset}: out-of-sample 1-day-ahead vol forecasts",
                     "Annualised volatility", cfg.output_dir / f"11_oos_forecasts_{asset}.png")
    return forecasts, losses, mz, covid


def tag(df, asset):
    """Add asset column and name the index 'model'."""
    df = df.copy()
    df.index.name = "model"
    df.insert(0, "asset", asset)
    return df


def part3_evaluation(data, cfg, results):
    """Out-of-sample evaluation for every asset + ranking + vol_forecasts.csv."""
    long_parts, loss_parts, mz_parts, covid_parts, losses_by_asset = [], [], [], [], {}
    for asset, df in data.items():
        start = time.time()
        forecasts, losses, mz, covid = part3_asset(asset, df, cfg)
        print(f"  {asset}: {len(forecasts)} OOS days from {forecasts.index[0].date()}, "
              f"best QLIKE={losses.index[0]}, best MSE={losses['MSE'].idxmin()} "
              f"({time.time() - start:.0f}s)")
        long_parts.append(forecasts_to_long(forecasts, asset, cfg.trading_days))
        loss_parts.append(tag(losses, asset))
        mz_parts.append(tag(mz, asset))
        covid_parts.append(tag(covid, asset))
        losses_by_asset[asset] = losses
    long = pd.concat(long_parts, ignore_index=True)
    long["date"] = pd.to_datetime(long["date"]).dt.strftime("%Y-%m-%d")
    long.to_csv(cfg.output_dir / "vol_forecasts.csv", index=False)
    ranking = pd.concat(loss_parts)
    save_table(ranking, "model_ranking", cfg)
    save_table(pd.concat(mz_parts), "mincer_zarnowitz", cfg)
    save_table(pd.concat(covid_parts), "covid_reaction", cfg)
    pivot = ranking.reset_index().pivot(index="model", columns="asset", values="rank_QLIKE")
    pivot["mean_rank"] = pivot.mean(axis=1)
    save_table(pivot.sort_values("mean_rank"), "rank_summary_qlike", cfg)
    plots.plot_loss_bars(losses_by_asset, "QLIKE", cfg.output_dir / "13_qlike_by_model.png")
    plots.plot_loss_bars(losses_by_asset, "MSE", cfg.output_dir / "14_mse_by_model.png")
    results["evaluation"] = {"ranking": json.loads(ranking.reset_index().to_json(orient="records")),
                             "mz": json.loads(pd.concat(mz_parts).reset_index().to_json(orient="records")),
                             "covid": json.loads(pd.concat(covid_parts).reset_index().to_json(orient="records", date_format="iso")),
                             "rank_summary": json.loads(pivot.reset_index().to_json(orient="records")),
                             "n_rows_vol_forecasts": len(long)}
    print(pivot.sort_values("mean_rank").to_string())


def main():
    """Run Parts 0-3 and write outputs/key_results.json."""
    cfg = Config()
    cfg.output_dir.mkdir(parents=True, exist_ok=True)
    results = {"config": {"tickers": list(cfg.tickers), "start": cfg.start,
                          "trading_days": cfg.trading_days, "initial_window": cfg.initial_window,
                          "refit_every": cfg.refit_every}}
    print("Part 0: data")
    try:
        data = part0_data(cfg, results)
    except FileNotFoundError as exc:
        print(f"STOP: {exc}")
        return 1
    steps = [("Part 1: stylized facts", part1_stylized_facts),
             ("Part 2a: historical vol", part2_historical), ("Part 2b: EWMA", part2_ewma),
             ("Part 2c: manual GARCH vs arch", part2_garch_manual),
             ("Part 2d: GARCH / GARCH-t / GJR", part2_garch_arch),
             ("Part 2e: Parkinson", part2_parkinson),
             ("Part 3: forecast evaluation", part3_evaluation)]
    for label, step in steps:
        print(label)
        step(data, cfg, results)
    with open(cfg.output_dir / "key_results.json", "w") as handle:
        json.dump(results, handle, indent=1, default=str)
    print(f"Done. Outputs in {cfg.output_dir}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
