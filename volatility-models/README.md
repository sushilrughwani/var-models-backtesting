# Volatility Models for Market Risk

Estimate, forecast and compare the volatility of equity returns. The project covers:

- **Data:** Nifty 50 (`^NSEI`), S&P 500 (`^GSPC`) and Reliance Industries (`RELIANCE.NS`), daily, 2015 → latest, from Yahoo Finance.
- **Part 1 — stylized facts:** fat tails, volatility clustering and the leverage effect, which together explain why constant volatility is wrong.
- **Part 2 — models:**
  - rolling 20/60/252-day volatility
  - EWMA (RiskMetrics, λ = 0.94)
  - GARCH(1,1), estimated by hand with MLE and with `arch`
  - GARCH with Student-t errors
  - GJR-GARCH (leverage effect)
  - Parkinson range-based volatility
- **Part 3 — honest out-of-sample evaluation:**
  - expanding window, with GARCH-type models refit every 20 days and no look-ahead
  - MSE and QLIKE losses against $r_t^2$
  - Mincer–Zarnowitz regressions
  - model ranking per asset
  - a zoom on the 2020 COVID crash
- **Export:** `outputs/vol_forecasts.csv` (date, asset, model, sigma_daily, sigma_annual) for downstream VaR backtesting.

Every line is meant to be explainable in an interview. See [MATH.md](MATH.md), [LEARNING.md](LEARNING.md) and [INTERVIEW_DEFENSE.md](INTERVIEW_DEFENSE.md).

---

> ## ⚠️ Status: results pending real data
>
> The cloud environment that built this project blocks Yahoo Finance at the network level (`query1/query2.finance.yahoo.com`, `fc.yahoo.com`, `guce.yahoo.com` → HTTP 403). The project rule is to **never** use synthetic data for results, so:
>
> - `data/` and `outputs/` are empty
> - the notebook is committed un-executed
> - all result numbers below are marked ⟨pending⟩
>
> The code is complete and tested: 24 tests, including an end-to-end run on synthetic CSVs in a temporary folder. Running the commands under "How to run" on a machine with internet access produces every chart and table. See [PROGRESS.md](PROGRESS.md).

---

## How to run

Install the dependencies:

```bash
cd volatility-models
pip install -r requirements.txt
```

Run the full pipeline (downloads once to `data/`, then works offline; about 2–5 minutes):

```bash
python main.py
```

Run the unit tests (synthetic inputs only):

```bash
python -m pytest -q
```

Execute the interview walkthrough notebook:

```bash
jupyter nbconvert --to notebook --execute --inplace notebooks/walkthrough.ipynb
```

Print the hand-computable examples used in MATH.md:

```bash
python -m src.worked_examples
```

If the download fails, `main.py` falls back to `data/NSEI.csv`, `data/GSPC.csv` and `data/RELIANCE_NS.csv`. If those do not exist either, it prints `STOP` and exits with code 1.

---

## Project structure

```
volatility-models/
  data/                  cached raw prices (CSV, yfinance format)
  src/
    config.py            all parameters in one @dataclass
    data_loader.py       download, cache, clean, log returns
    stylized_facts.py    summary stats, Jarque-Bera, ACF, Ljung-Box, leverage
    models/
      historical.py      rolling 20/60/252-day volatility (+ ghost effect)
      ewma.py            RiskMetrics EWMA (loop == pandas .ewm)
      garch_manual.py    GARCH(1,1) log-likelihood + scipy MLE by hand
      garch_arch.py      GARCH normal/t, GJR-GARCH, news impact, term structure
      parkinson.py       range-based volatility
    evaluation.py        rolling OOS forecasts, MSE, QLIKE, Mincer-Zarnowitz, COVID
    plots.py             all charts
    worked_examples.py   numbers used in MATH.md
  notebooks/walkthrough.ipynb   top-to-bottom interview demo
  tests/                 pytest (synthetic inputs only)
  outputs/               charts (PNG), tables (CSV), key_results.json, vol_forecasts.csv
  main.py                one command runs everything
```

---

## Outputs produced by `main.py`

| File | Content |
|------|---------|
| `data_cleaning.csv` | rows dropped per asset and per rule |
| `stylized_facts.csv`, `ljung_box.csv` | Part 1 statistics and tests |
| `01_returns_clustering.png` … `04_acf_returns_vs_squared.png` | Part 1 charts |
| `05_hist_vol_*.png` | rolling vols and the ghost effect |
| `06_ewma_weights.png`, `07_ewma_lambdas_*.png` | EWMA charts |
| `garch_manual_vs_arch.csv` | manual MLE vs `arch` |
| `garch_params.csv` | estimates, robust SE, t-stats, p-values (GARCH-N, GARCH-t, GJR) |
| `garch_summary.csv` | persistence, long-run variance/vol, half-life, ν, γ test |
| `garch_information_criteria.csv` | log-likelihood, AIC, BIC |
| `08_garch_term_structure.png`, `09_news_impact_curve.png` | GARCH charts |
| `10_parkinson_*.png` | Parkinson vs close-to-close |
| `model_ranking.csv`, `rank_summary_qlike.csv` | MSE / QLIKE and ranks |
| `13_qlike_by_model.png`, `14_mse_by_model.png` | loss charts |
| `mincer_zarnowitz.csv` | a, b, HAC SEs, R², joint p-value |
| `covid_reaction.csv`, `12_covid_zoom_*.png` | COVID reaction speed and decay |
| `11_oos_forecasts_*.png` | out-of-sample forecasts |
| `vol_forecasts.csv` | every 1-day-ahead forecast (date, asset, model, sigma_daily, sigma_annual) |
| `key_results.json` | every number quoted in the docs |

---

## Key results

⟨pending real data⟩ — to be filled from `outputs/key_results.json` after the first real run. This section will hold:

- the stylized-facts table
- GARCH persistence, long-run vol and half-life per asset
- normal vs t AIC/BIC
- the GJR γ test
- the model ranking table (QLIKE and MSE)
- COVID reaction metrics
- the charts above

---

## Summary of findings

⟨pending real data⟩

**Not completed (blocked):** real-data run, charts and tables, executed notebook, and the numeric slots in README.md and INTERVIEW_DEFENSE.md. Every code path is implemented and tested.
