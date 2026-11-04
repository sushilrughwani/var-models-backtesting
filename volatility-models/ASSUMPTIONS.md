# Assumptions and choices

Choices made without asking (the brief said to work non-interactively). Each one is set in `src/config.py` or explained in the code.

---

## Data

| # | Choice | Why |
|---|--------|-----|
| D1 | Tickers `^NSEI`, `^GSPC`, `RELIANCE.NS`, daily, start 2015-01-01, end = latest available date (`end=None`). | As specified. |
| D2 | `yfinance.download(..., auto_adjust=False)` so both `Close` and `Adj Close` are kept. Returns use **Adj Close**. | Adjusted prices remove the artificial jumps caused by dividends and splits. For the two indices, Adj Close = Close. |
| D3 | Download once, cache to `data/<ticker>.csv`. A cached file is always reused (no re-download) unless `load_or_download(..., refresh=True)`. | Reproducible results and offline runs. |
| D4 | If the download fails and no CSV exists, the pipeline prints `STOP` and exits with code 1. | Hard rule: no synthetic data for the main results. |
| D5 | Cleaning drops rows with any missing price, any price ≤ 0, or `High == Low`. Duplicated dates keep the first row. Counts per rule and per asset go to `outputs/data_cleaning.csv`. | As specified. `High == Low` usually means a stale/placeholder quote. |
| D6 | Each asset keeps its own trading calendar. No cross-asset date alignment. | All models are univariate; aligning NSE and NYSE calendars would delete valid days. |
| D7 | When a row is dropped, the next return spans two trading days. | Simpler and more honest than interpolating a price. The number of dropped rows is reported. |
| D8 | High and Low for Parkinson are the raw (unadjusted) values from Yahoo. | Parkinson only uses the ratio High/Low, which a proportional adjustment does not change. |

---

## Conventions

| # | Choice | Why |
|---|--------|-----|
| C1 | Log returns $r_t = \ln(P_t/P_{t-1})$. | As specified; they add over time. |
| C2 | Annualisation $\sigma_{annual} = \sigma_{daily}\sqrt{252}$. | Market convention: about 252 trading days per year. It assumes returns are uncorrelated across days, which Part 1 shows is approximately true for returns (not for squared returns). NSE has about 245–250 trading days per year; we keep 252 for every asset so numbers are comparable. |
| C3 | **Zero-mean** returns in every variance model: EWMA, GARCH and GJR use `mean="Zero"` in `arch`. | The daily mean (about 0.05%) is tiny next to daily vol (about 1%). With zero mean, the manual GARCH, `arch` and EWMA are the same model, and $r_t^2$ is the natural variance proxy. |
| C4 | Rolling (historical) volatility uses the sample standard deviation with `ddof = 1` (pandas default), so it subtracts the window mean. | The textbook "historical volatility". The difference from zero-mean is negligible at daily frequency. |
| C5 | GARCH-type models are estimated on returns × 100. Results are converted back: ω by 100², volatility by 100. | Numerical conditioning (see MATH.md §18). |

---

## Models

| # | Choice | Why |
|---|--------|-----|
| M1 | EWMA starts from $\sigma^2_1 = r_0^2$ (the first squared return). | Uses no future data. Its weight decays like $\lambda^t$, and it is irrelevant once the 1000-day burn-in is over. |
| M2 | Manual GARCH backcast: $r_{-1}^2 = \sigma_{-1}^2 =$ the sample variance of the estimation sample. | Simple to explain. `arch` gives identical estimates when passed the same `backcast`. Its default is an exponentially weighted average of the first 75 squared returns. |
| M3 | Manual MLE optimiser: SLSQP with bounds ω ≥ 1e-8 and α, β ∈ [0, 1], plus the inequality α + β ≤ 1 − 1e-6. Starting point (0.05·var, 0.05, 0.90). | SLSQP handles the linear stationarity constraint directly. |
| M4 | `arch` standard errors are its default `cov_type="robust"` (Bollerslev–Wooldridge sandwich). | Still valid when the normality assumption is wrong, which Part 1 shows it is. |
| M5 | GJR-GARCH uses normal errors. | Isolates the leverage effect from the fat-tail effect, which GARCH-t captures. |
| M6 | GJR long-run variance $\omega/(1-\alpha-\gamma/2-\beta)$. | Assumes a symmetric shock distribution, so $P(r<0)=0.5$. |
| M7 | News impact curves hold yesterday's variance at each model's own long-run variance. | The standard way to draw the curve (Engle & Ng, 1993). |
| M8 | Parkinson window = 20 days. The forecast for day t uses days t−20 … t−1. | As specified. Same window as the shortest rolling model, so the two can be compared. |
| M9 | Term structure is drawn from the full-sample GARCH(1,1)-normal fit, starting at the last date in the data. | Shows mean reversion from today's level. |

---

## Forecast evaluation

| # | Choice | Why |
|---|--------|-----|
| E1 | Expanding window. The first 1000 returns (about 4 years, 2015–2018) are used only for estimation. Every later day is forecast and scored. | Enough data for a stable first GARCH fit, while keeping the COVID crash and about 7 years out of sample. |
| E2 | GARCH, GARCH-t and GJR-GARCH are refit every 20 trading days. Between refits, parameters are frozen and the variance is filtered forward with `arch`'s `fix()`. | As specified. Parameters move slowly, so refitting daily would cost 20 times more for almost no change. |
| E3 | Models scored: HIST20, HIST60, HIST252, EWMA (λ = 0.94), GARCH (normal), GARCH-t, GJR-GARCH (normal), PARK20. The manual GARCH is not scored separately because it is the same model as `arch`'s GARCH-normal. | Avoids a duplicate model. |
| E4 | Realised-variance proxy $RV_t = r_t^2$. | Intraday data is not available from Yahoo. $r_t^2$ is unbiased but very noisy. |
| E5 | Losses are computed on variances in %² units. QLIKE uses the form $RV/h + \ln h$. | Readable numbers. Patton's other form, $RV/h - \ln(RV/h) - 1$, differs only by a term that does not depend on the forecast, and it is undefined when $r_t = 0$. |
| E6 | Ranking uses QLIKE (primary) and MSE (secondary). | QLIKE is less dominated by a few extreme days (see MATH.md §27). |
| E7 | Mincer–Zarnowitz uses OLS with HAC (Newey–West, 5 lags) standard errors. The joint test of a = 0, b = 1 is an F-test. | Regression errors are heteroskedastic and autocorrelated. |
| E8 | COVID window runs from 2020-01-01 to 2020-08-31. The shock date is 2020-02-20 (the first trading day after the S&P 500's 19-Feb-2020 peak), and the same date is used for all assets. Reaction metrics: vol before the shock, peak vol, trading days to peak, and trading days from peak until vol is back halfway to the pre-shock level. | One common event date makes the models comparable. |

---

## Tooling

| # | Choice | Why |
|---|--------|-----|
| T1 | The project lives in `volatility-models/` inside the existing `var-models-backtesting` repository. | That is the repository the session was given. |
| T2 | `src/worked_examples.py` was added (not in the requested structure). | It generates every hand-example number in MATH.md, so the docs quote executed code only. |
| T3 | `VOLMODELS_DATA_DIR` / `VOLMODELS_OUTPUT_DIR` environment variables can redirect data and outputs. | Used only by the end-to-end smoke test, which runs on synthetic CSVs in a temporary folder and never touches `data/` or `outputs/`. |
| T4 | Tests use synthetic inputs only (simulated GARCH paths and hand-built OHLC). | As specified. |

---

## Environment limitation (this session)

The cloud environment that built this project blocks Yahoo Finance at the network level: `query1.finance.yahoo.com`, `query2.finance.yahoo.com`, `fc.yahoo.com` and `guce.yahoo.com` all returned HTTP 403 from the egress proxy. No real data could be downloaded and `data/` is empty. Following the hard rule, **no results were produced and no numbers from real data appear in the docs**. See PROGRESS.md for how to finish.
