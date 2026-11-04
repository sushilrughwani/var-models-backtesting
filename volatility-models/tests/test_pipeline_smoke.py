"""
End-to-end smoke test: run main.py on SYNTHETIC CSVs in a temporary folder.

Checks that the whole pipeline runs and writes the expected files. The
synthetic data and its outputs live only in pytest's tmp_path; they are
never written to data/ or outputs/.
"""
import os
import subprocess
import sys
from pathlib import Path

import pandas as pd

from src.config import Config
from src.data_loader import ticker_to_filename
from tests.helpers import synthetic_ohlc

PROJECT_ROOT = Path(__file__).resolve().parent.parent


def test_main_runs_end_to_end(tmp_path):
    data_dir, out_dir = tmp_path / "data", tmp_path / "outputs"
    data_dir.mkdir()
    # 1700 business days from 2015 covers the 2020 COVID window
    for seed, ticker in enumerate(Config().tickers):
        synthetic_ohlc(1700, seed=seed).to_csv(data_dir / ticker_to_filename(ticker))
    env = dict(os.environ, VOLMODELS_DATA_DIR=str(data_dir), VOLMODELS_OUTPUT_DIR=str(out_dir))
    run = subprocess.run([sys.executable, "main.py"], cwd=PROJECT_ROOT, env=env,
                         capture_output=True, text=True, timeout=900)
    assert run.returncode == 0, run.stderr[-2000:]
    forecasts = pd.read_csv(out_dir / "vol_forecasts.csv")
    assert list(forecasts.columns) == ["date", "asset", "model", "sigma_daily", "sigma_annual"]
    assert forecasts["model"].nunique() == 8
    assert (forecasts["sigma_daily"] > 0).all()
    for name in ("model_ranking.csv", "mincer_zarnowitz.csv", "covid_reaction.csv",
                 "key_results.json", "12_covid_zoom_SP500.png"):
        assert (out_dir / name).exists(), name


def test_main_stops_without_real_data(tmp_path):
    env = dict(os.environ, VOLMODELS_DATA_DIR=str(tmp_path / "empty"),
               VOLMODELS_OUTPUT_DIR=str(tmp_path / "out"))
    # Block network access for yfinance by pointing the proxy at a dead port
    env["HTTPS_PROXY"] = env["HTTP_PROXY"] = "http://127.0.0.1:9"
    run = subprocess.run([sys.executable, "main.py"], cwd=PROJECT_ROOT, env=env,
                         capture_output=True, text=True, timeout=300)
    assert run.returncode == 1
    assert "STOP" in run.stdout
