"""
config.py - every tunable parameter of the project in ONE place.

Purpose
    Keep all choices (tickers, dates, windows, lambdas, refit frequency ...)
    in a single @dataclass so that nothing is hard-coded inside the models.
    Changing a number here changes it everywhere.

Inputs
    Optional environment variables VOLMODELS_DATA_DIR / VOLMODELS_OUTPUT_DIR
    (only used by the smoke test to point the pipeline at a temp folder).

Outputs
    A Config object.

Formulas used
    Annualisation: sigma_annual = sigma_daily * sqrt(trading_days), with
    trading_days = 252 (the usual market convention).
"""
import os
from dataclasses import dataclass, field
from pathlib import Path

# Project root = the folder that contains src/, data/, outputs/ ...
PROJECT_ROOT = Path(__file__).resolve().parent.parent


def _default_data_dir():
    """Return data/ (or the folder given by VOLMODELS_DATA_DIR)."""
    return Path(os.environ.get("VOLMODELS_DATA_DIR", PROJECT_ROOT / "data"))


def _default_output_dir():
    """Return outputs/ (or the folder given by VOLMODELS_OUTPUT_DIR)."""
    return Path(os.environ.get("VOLMODELS_OUTPUT_DIR", PROJECT_ROOT / "outputs"))


@dataclass
class Config:
    """All parameters of the project."""

    # --- Data -------------------------------------------------------------
    tickers: tuple = ("^NSEI", "^GSPC", "RELIANCE.NS")
    # Short names used in tables / charts, same order as tickers
    asset_names: tuple = ("NIFTY50", "SP500", "RELIANCE")
    start: str = "2015-01-01"
    # None means "up to the latest available date"
    end: str = None
    data_dir: Path = field(default_factory=_default_data_dir)
    output_dir: Path = field(default_factory=_default_output_dir)

    # --- Conventions ------------------------------------------------------
    # Trading days per year used to annualise: sigma_annual = sigma_daily*sqrt(252)
    trading_days: int = 252
    # GARCH optimisers work better on returns in percent (see garch_manual.py)
    garch_scale: float = 100.0

    # --- Part 1: stylized facts --------------------------------------------
    acf_lags: int = 30
    ljung_box_lags: tuple = (10, 20)

    # --- Part 2: models -----------------------------------------------------
    hist_windows: tuple = (20, 60, 252)
    ewma_lambda: float = 0.94
    ewma_lambdas: tuple = (0.90, 0.94, 0.97)
    ewma_weight_lags: int = 100
    parkinson_window: int = 20
    forecast_horizon: int = 252

    # --- Part 3: forecast evaluation ----------------------------------------
    # First 1000 returns (~4 years) are the initial estimation sample
    initial_window: int = 1000
    # GARCH-type models are re-estimated every 20 trading days
    refit_every: int = 20
    # COVID zoom window and the day the sell-off started (S&P 500 peak 19-Feb-2020)
    covid_start: str = "2020-01-01"
    covid_end: str = "2020-08-31"
    covid_shock_date: str = "2020-02-20"

    def asset_map(self):
        """Return {asset_name: ticker}."""
        return dict(zip(self.asset_names, self.tickers))
