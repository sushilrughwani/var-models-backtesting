"""
plots.py - every chart of the project, saved as PNG in outputs/.

Purpose
    Slide-ready figures: clear titles, axis labels, legends, dates on x-axis.

Inputs
    pandas Series / DataFrames produced by the other modules, an output path.

Outputs
    PNG files (the functions return the path they wrote).

Formulas used
    Normal density for the histogram overlay:
    f(x) = 1/(sigma*sqrt(2 pi)) * exp(-(x-mu)^2 / (2 sigma^2))
"""
import matplotlib

# Non-interactive backend: charts are written to files, no window needed
matplotlib.use("Agg")
import matplotlib.dates as mdates
import matplotlib.pyplot as plt
import numpy as np
from scipy import stats

from src.stylized_facts import acf_values

plt.rcParams.update({"figure.dpi": 110, "savefig.dpi": 130, "font.size": 11,
                     "axes.titlesize": 13, "axes.labelsize": 11,
                     "legend.fontsize": 9, "axes.grid": True, "grid.alpha": 0.3})


def _format_date_axis(ax):
    """Readable dates on the x-axis."""
    locator = mdates.AutoDateLocator()
    ax.xaxis.set_major_locator(locator)
    ax.xaxis.set_major_formatter(mdates.ConciseDateFormatter(locator))


def _save(fig, path):
    """Tight layout, save, close (frees memory), return path."""
    fig.tight_layout()
    fig.savefig(path, bbox_inches="tight")
    plt.close(fig)
    return path


def plot_returns_clustering(returns_by_asset, path):
    """Daily returns and absolute returns over time: volatility clustering."""
    n = len(returns_by_asset)
    fig, axes = plt.subplots(n, 2, figsize=(14, 3.2 * n), squeeze=False)
    for i, (asset, r) in enumerate(returns_by_asset.items()):
        axes[i, 0].plot(r.index, r * 100, lw=0.5, color="tab:blue")
        axes[i, 0].set_title(f"{asset}: daily log return")
        axes[i, 0].set_ylabel("Return (%)")
        axes[i, 1].plot(r.index, r.abs() * 100, lw=0.5, color="tab:red")
        axes[i, 1].set_title(f"{asset}: absolute return |r| (clusters = calm/turbulent regimes)")
        axes[i, 1].set_ylabel("|Return| (%)")
        _format_date_axis(axes[i, 0])
        _format_date_axis(axes[i, 1])
    return _save(fig, path)


def plot_hist_vs_normal(returns_by_asset, path):
    """Histogram of returns against a normal density with the same mean/std."""
    n = len(returns_by_asset)
    fig, axes = plt.subplots(1, n, figsize=(5.5 * n, 4.2), squeeze=False)
    for i, (asset, r) in enumerate(returns_by_asset.items()):
        ax = axes[0, i]
        x = r.values * 100
        ax.hist(x, bins=120, density=True, alpha=0.6, label="Empirical")
        grid = np.linspace(x.min(), x.max(), 400)
        ax.plot(grid, stats.norm.pdf(grid, x.mean(), x.std()), "r-", lw=1.5,
                label="Normal (same mean, std)")
        ax.set_yscale("log")
        ax.set_title(f"{asset}: fat tails (log density)")
        ax.set_xlabel("Daily return (%)")
        ax.set_ylabel("Density (log scale)")
        ax.legend()
    return _save(fig, path)


def plot_qq(returns_by_asset, path):
    """QQ-plot of standardised returns against normal quantiles."""
    n = len(returns_by_asset)
    fig, axes = plt.subplots(1, n, figsize=(5 * n, 4.5), squeeze=False)
    for i, (asset, r) in enumerate(returns_by_asset.items()):
        ax = axes[0, i]
        z = np.sort(((r - r.mean()) / r.std()).values)
        # Theoretical normal quantiles at plotting positions (i - 0.5)/n
        probs = (np.arange(1, len(z) + 1) - 0.5) / len(z)
        theo = stats.norm.ppf(probs)
        ax.scatter(theo, z, s=4, alpha=0.6, label="Data")
        ax.plot(theo, theo, "r--", lw=1.2, label="Normal line")
        ax.set_title(f"{asset}: QQ-plot vs normal")
        ax.set_xlabel("Normal quantile (z)")
        ax.set_ylabel("Standardised return quantile")
        ax.legend()
    return _save(fig, path)


def plot_acf_comparison(returns_by_asset, nlags, path):
    """ACF of returns vs ACF of squared returns with 95% bands."""
    n = len(returns_by_asset)
    fig, axes = plt.subplots(1, n, figsize=(5.5 * n, 4.2), squeeze=False)
    lags = np.arange(1, nlags + 1)
    for i, (asset, r) in enumerate(returns_by_asset.items()):
        ax = axes[0, i]
        ax.bar(lags - 0.2, acf_values(r, nlags), width=0.4, label="Returns r")
        ax.bar(lags + 0.2, acf_values(r ** 2, nlags), width=0.4, label="Squared returns r²")
        # Under H0 (no autocorrelation) rho_k ~ N(0, 1/n): 95% band = +-1.96/sqrt(n)
        band = 1.96 / np.sqrt(len(r))
        ax.axhline(band, color="k", ls="--", lw=0.8, label="95% band")
        ax.axhline(-band, color="k", ls="--", lw=0.8)
        ax.set_title(f"{asset}: autocorrelation")
        ax.set_xlabel("Lag (days)")
        ax.set_ylabel("ACF")
        ax.legend()
    return _save(fig, path)


def plot_lines(df, title, ylabel, path, annotations=None, figsize=(13, 5)):
    """
    Generic time-series line chart (one line per column).
    annotations: optional list of (date, label) drawn as vertical lines.
    """
    fig, ax = plt.subplots(figsize=figsize)
    for column in df.columns:
        ax.plot(df.index, df[column], lw=1.1, label=column)
    # Vertical marker lines go in the legend (no overlapping text labels)
    styles = [":", "--", "-.", (0, (1, 4))]
    for i, (date, label) in enumerate(annotations or []):
        ax.axvline(date, color="black", ls=styles[i % len(styles)], lw=1.0,
                   alpha=0.7, label=f"{label} ({date.date()})")
    ax.set_title(title)
    ax.set_xlabel("Date")
    ax.set_ylabel(ylabel)
    ax.legend(loc="upper left")
    _format_date_axis(ax)
    return _save(fig, path)


def plot_ewma_weights(weights_by_lambda, path):
    """Weight on the squared return k days ago for several lambdas."""
    fig, ax = plt.subplots(figsize=(10, 4.5))
    for lam, w in weights_by_lambda.items():
        ax.plot(w.index, w.values, lw=1.8, label=f"λ = {lam:.2f}")
    ax.set_title("EWMA weights decay geometrically: w_k = (1-λ)·λ^(k-1)")
    ax.set_xlabel("Lag k (days ago)")
    ax.set_ylabel("Weight on r²(t-k)")
    ax.legend()
    return _save(fig, path)


def plot_term_structure(curves, long_run_annual, path):
    """GARCH volatility forecasts 1..H days ahead and the long-run level."""
    n = len(curves)
    fig, axes = plt.subplots(1, n, figsize=(5.5 * n, 4.2), squeeze=False)
    for i, (asset, curve) in enumerate(curves.items()):
        ax = axes[0, i]
        horizon = np.arange(1, len(curve) + 1)
        ax.plot(horizon, curve, lw=2, label="GARCH forecast")
        ax.axhline(long_run_annual[asset], color="r", ls="--",
                   label=f"Long-run vol {long_run_annual[asset]:.1%}")
        ax.set_title(f"{asset}: vol term structure")
        ax.set_xlabel("Horizon (trading days ahead)")
        ax.set_ylabel("Annualised vol")
        ax.yaxis.set_major_formatter(matplotlib.ticker.PercentFormatter(1.0))
        ax.legend()
    return _save(fig, path)


def plot_news_impact(shocks, curves_by_asset, path):
    """News impact curves: next-day variance vs today's return."""
    n = len(curves_by_asset)
    fig, axes = plt.subplots(1, n, figsize=(5.5 * n, 4.2), squeeze=False)
    for i, (asset, curves) in enumerate(curves_by_asset.items()):
        ax = axes[0, i]
        for name, values in curves.items():
            ax.plot(shocks, values, lw=2, label=name)
        ax.set_title(f"{asset}: news impact curve")
        ax.set_xlabel("Today's return r(t-1) (%)")
        ax.set_ylabel("Tomorrow's variance σ²(t) (%²)")
        ax.legend()
    return _save(fig, path)


def plot_loss_bars(loss_by_asset, metric, path):
    """Bar chart of one loss metric per model, one panel per asset."""
    n = len(loss_by_asset)
    fig, axes = plt.subplots(1, n, figsize=(5.5 * n, 4.5), squeeze=False)
    for i, (asset, table) in enumerate(loss_by_asset.items()):
        ax = axes[0, i]
        ordered = table[metric].sort_values()
        ax.barh(ordered.index, ordered.values, color="tab:blue")
        # Zoom the axis on the range of values so differences are visible
        span = ordered.max() - ordered.min()
        ax.set_xlim(ordered.min() - 0.3 * span, ordered.max() + 0.1 * span)
        ax.invert_yaxis()
        ax.set_title(f"{asset}: {metric} (lower = better)")
        ax.set_xlabel(metric)
    return _save(fig, path)


def plot_covid_zoom(sigma_annual, abs_return_annual, shock_date, title, path):
    """
    COVID crash zoom: each model's annualised vol forecast, with the realised
    |r_t|*sqrt(252) as grey dots to show what actually happened each day.
    """
    fig, ax = plt.subplots(figsize=(13, 5.5))
    ax.scatter(abs_return_annual.index, abs_return_annual.values, s=10,
               color="grey", alpha=0.5, label="|r|·√252 (realised proxy)")
    for column in sigma_annual.columns:
        ax.plot(sigma_annual.index, sigma_annual[column], lw=1.5, label=column)
    ax.axvline(shock_date, color="k", ls=":", lw=1.2)
    ax.annotate("sell-off starts", (shock_date, ax.get_ylim()[1] * 0.95),
                rotation=90, fontsize=9, ha="right", va="top")
    ax.set_title(title)
    ax.set_xlabel("Date")
    ax.set_ylabel("Annualised volatility")
    ax.yaxis.set_major_formatter(matplotlib.ticker.PercentFormatter(1.0))
    ax.legend(loc="upper right", ncol=2)
    _format_date_axis(ax)
    return _save(fig, path)
