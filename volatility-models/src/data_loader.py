"""
data_loader.py - download, cache, clean and convert prices to log returns.

Purpose
    Get REAL daily OHLC + adjusted close prices from Yahoo Finance (yfinance),
    store them as CSV in data/ so the project runs offline afterwards, clean
    obviously bad rows and compute daily log returns.

Inputs
    Config (tickers, start/end dates, data_dir).

Outputs
    dict {asset_name: DataFrame} with columns
    Open, High, Low, Close, Adj Close, Volume, ret   (ret = log return)
    and a cleaning report (rows dropped per asset).

Formulas used
    Log return: r_t = ln(P_t / P_{t-1}),  P = adjusted close.

Rule: synthetic data is NEVER used here. If the download fails and no cached
CSV exists, a FileNotFoundError is raised and the pipeline stops.
"""
import logging

import numpy as np
import pandas as pd

PRICE_COLUMNS = ["Open", "High", "Low", "Close", "Adj Close"]


def ticker_to_filename(ticker):
    """Turn a ticker such as '^NSEI' or 'RELIANCE.NS' into a safe CSV name."""
    return ticker.replace("^", "").replace(".", "_") + ".csv"


def download_prices(ticker, start, end=None):
    """
    WHAT: download daily OHLC + Adj Close for one ticker from Yahoo Finance.
    WHY:  risk models must be fitted on real market data.
    Returns an empty DataFrame if the download fails.
    """
    import yfinance as yf

    # yfinance logs every failed request in full - keep the console short
    logging.getLogger("yfinance").setLevel(logging.CRITICAL)
    try:
        # auto_adjust=False keeps both Close and Adj Close columns
        df = yf.download(ticker, start=start, end=end, auto_adjust=False,
                         progress=False, multi_level_index=False)
    except Exception as exc:
        print(f"  download failed for {ticker}: {type(exc).__name__}")
        return pd.DataFrame()
    if df is None or df.empty:
        print(f"  download returned no rows for {ticker}")
        return pd.DataFrame()
    df.index.name = "Date"
    return df


def read_cached_prices(path):
    """Read a cached price CSV (Date index, OHLC columns)."""
    df = pd.read_csv(path, index_col="Date", parse_dates=True)
    return df.sort_index()


def load_or_download(ticker, cfg, refresh=False):
    """
    WHAT: return raw prices for a ticker, using the cached CSV if present.
    WHY:  download once, reuse forever (reproducible + works offline).
    Order: cache -> download (then save) -> stop with an explanation.
    """
    path = cfg.data_dir / ticker_to_filename(ticker)
    if path.exists() and not refresh:
        return read_cached_prices(path), "cache"
    df = download_prices(ticker, cfg.start, cfg.end)
    if not df.empty:
        cfg.data_dir.mkdir(parents=True, exist_ok=True)
        df.to_csv(path)
        return read_cached_prices(path), "download"
    if path.exists():
        return read_cached_prices(path), "cache (download failed)"
    raise FileNotFoundError(
        f"No real data for {ticker}: download failed and {path} does not exist. "
        "Synthetic data is not allowed for the main results - stopping.")


def clean_prices(df):
    """
    WHAT: drop rows with missing/zero/negative prices or High == Low.
    WHY:  a zero price gives ln(0) = -inf; High == Low usually means a stale
          or placeholder quote (no trading), which would fake a zero range.
    Returns (clean DataFrame, dict with number of rows dropped per reason).
    """
    df = df.sort_index()
    df = df[~df.index.duplicated(keep="first")]
    n_start = len(df)
    # Rule 1: any missing price
    missing = df[PRICE_COLUMNS].isna().any(axis=1)
    df = df[~missing]
    # Rule 2: any price <= 0
    non_positive = (df[PRICE_COLUMNS] <= 0).any(axis=1)
    df = df[~non_positive]
    # Rule 3: High == Low (no intraday range -> stale quote)
    flat = df["High"] == df["Low"]
    df = df[~flat]
    report = {"rows_raw": n_start, "dropped_missing": int(missing.sum()),
              "dropped_non_positive": int(non_positive.sum()),
              "dropped_high_eq_low": int(flat.sum()),
              "dropped_total": n_start - len(df), "rows_clean": len(df)}
    return df, report


def compute_log_returns(prices):
    """
    WHAT: daily log returns r_t = ln(P_t / P_{t-1}).
    WHY:  log returns add up over time and are the standard input of
          volatility models; the first day has no return and is dropped.
    """
    ratio = prices / prices.shift(1)
    return np.log(ratio).dropna()


def load_all_assets(cfg, refresh=False):
    """
    WHAT: load, clean and add log returns for every asset in the config.
    Returns (dict {asset: DataFrame with 'ret' column}, cleaning report DataFrame).
    Each asset keeps its own trading calendar (NSE and NYSE holidays differ).
    """
    data = {}
    reports = []
    for asset, ticker in cfg.asset_map().items():
        raw, source = load_or_download(ticker, cfg, refresh)
        clean, report = clean_prices(raw)
        # Returns use the dividend/split adjusted close
        clean["ret"] = compute_log_returns(clean["Adj Close"])
        # The first row has no return -> drop it so every row has a return
        data[asset] = clean.dropna(subset=["ret"])
        report.update({"asset": asset, "ticker": ticker, "source": source,
                       "first_date": str(clean.index[0].date()),
                       "last_date": str(clean.index[-1].date())})
        reports.append(report)
    report_df = pd.DataFrame(reports).set_index("asset")
    return data, report_df
