# Progress

Last update: 2026-11-04

---

## Status: code complete, BLOCKED on real data

Yahoo Finance hosts are blocked by this cloud environment's network policy: `query1.finance.yahoo.com`, `query2.finance.yahoo.com`, `fc.yahoo.com` and `guce.yahoo.com` all returned HTTP 403 from the egress proxy. `data/` is empty, so per the hard rules:

- no results were produced
- `outputs/` holds no charts or tables
- the notebook is committed un-executed
- the docs contain no market-data numbers

Every numeric slot that depends on real data is marked **⟨pending⟩** in README.md and INTERVIEW_DEFENSE.md.

---

## Done

| Part | Item | Verified by |
|------|------|-------------|
| Code | `src/config.py`, `src/data_loader.py` (download → cache → clean → log returns; STOP if no real data) | tests + smoke test |
| Part 1 | `src/stylized_facts.py`: summary stats, JB (manual == scipy), 4σ counts, ACF, Ljung–Box, leverage correlation | tests |
| Part 2 | `models/historical.py` (loop == pandas), `models/ewma.py` (loop == `.ewm`), `models/garch_manual.py` (manual MLE), `models/garch_arch.py` (GARCH-N/t, GJR, NIC, term structure), `models/parkinson.py` | tests |
| Part 3 | `src/evaluation.py`: expanding-window forecasts with refit every 20 days, MSE, QLIKE, Mincer–Zarnowitz, ranking, COVID metrics, long-format export | tests (incl. no-look-ahead) |
| Plots | `src/plots.py`: 14 chart types | smoke test |
| Pipeline | `main.py` runs Parts 0–3 and writes `outputs/*.png`, `outputs/*.csv`, `outputs/vol_forecasts.csv`, `outputs/key_results.json` | smoke test on synthetic CSVs in a temp folder; real run pending |
| Notebook | `notebooks/walkthrough.ipynb` (45 cells) | executed once on synthetic data in a scratch folder, no errors; NOT committed executed |
| Tests | 24 pytest tests, all passing (`python -m pytest -q`) | — |
| Docs | ASSUMPTIONS.md, MATH.md (worked examples from `python -m src.worked_examples`), LEARNING.md, INTERVIEW_DEFENSE.md (questions/answers, project numbers pending), README.md | — |

---

## Next (to finish the project)

1. Allow Yahoo Finance in the environment's network settings: `query1.finance.yahoo.com`, `query2.finance.yahoo.com`, `fc.yahoo.com`, `guce.yahoo.com`. Alternatively, run locally, or drop yfinance-format CSVs named `NSEI.csv`, `GSPC.csv`, `RELIANCE_NS.csv` (columns `Date, Open, High, Low, Close, Adj Close, Volume`) into `data/`.
2. Run the pipeline from `volatility-models/` (about 2–5 minutes):

   ```bash
   python main.py
   ```

3. Run the tests:

   ```bash
   python -m pytest -q
   ```

4. Execute the notebook once:

   ```bash
   jupyter nbconvert --to notebook --execute --inplace notebooks/walkthrough.ipynb
   ```

5. Fill every ⟨pending⟩ in README.md and INTERVIEW_DEFENSE.md from `outputs/key_results.json` and the CSVs. Add the results summary and chart embeds to README.
6. Commit `data/*.csv`, `outputs/*` and the executed notebook, then update this file.

---

## Key numbers

⟨pending real data⟩

Code-only checks that did execute:

- manual GARCH vs `arch` (same backcast) agree to < 5e-3 on simulated data (test)
- EWMA(0.94) half-life = $\ln 0.5/\ln 0.94 = 11.2$ days
