# Progress

Last update: 2026-11-04

---

## Status: COMPLETE

The project was run on real Yahoo Finance data (2015-01-01 → 2026-11-04):

- all 24 tests pass
- the notebook is executed and committed
- every number in the docs comes from `outputs/`

---

## Done

| Part | Item |
|------|------|
| 0 | Data downloaded and cached in `data/`. Rows dropped: NIFTY50 0, SP500 0, RELIANCE 2 (High = Low). |
| 1 | Stylized facts: tables, tests, charts 01–04. |
| 2 | Rolling, EWMA, manual GARCH ≈ `arch` (difference 4×10⁻⁶), GARCH-N/t, GJR, Parkinson: tables and charts 05–10. |
| 3 | Out-of-sample forecasts (expanding window, refit every 20 days), MSE, QLIKE, Mincer–Zarnowitz, ranking, COVID zoom; charts 11–14; `vol_forecasts.csv` (46,488 rows). |
| Docs | README (results and charts), MATH, LEARNING, INTERVIEW_DEFENSE (45 Q&As with real numbers), ASSUMPTIONS. |

---

## Key numbers

Order is NIFTY50 / SP500 / RELIANCE.

| Quantity | Value |
|----------|-------|
| Excess kurtosis | 19.6 / 15.9 / 8.5 |
| Ljung–Box Q(20) on $r^2$ | 2,009 / 3,706 / 1,468 |
| GARCH persistence | 0.976 / 0.964 / 0.948 |
| Half-life (days) | 28.6 / 18.9 / 13.1 |
| Long-run annual vol | 15.8% / 16.6% / 26.6% |
| Student-t ν | 7.0 / 5.8 / 5.2 (t wins on AIC/BIC for all) |
| GJR γ t-stat | 4.24 / 4.98 / 2.42 (significant for all) |

**Out-of-sample QLIKE winner:** GJR-GARCH for all 3 assets.

**Mean QLIKE rank:** GJR 1.0, GARCH 2.3, GARCH-t 2.7, EWMA 4, HIST20 5, HIST60 6, PARK20 7, HIST252 8.

**COVID, SP500:** GARCH reached its peak (128.5%) in 18 days and was back halfway 10 days later; EWMA took 30 days to get back halfway; HIST252 peaked 112 days after the shock.

---

## Next (optional extensions)

- EGARCH
- DCC-GARCH
- intraday realised volatility
- comparison with implied volatility (India VIX / VIX)
- Diebold–Mariano tests on the ranking
- feed `vol_forecasts.csv` into the VaR backtesting notebook
