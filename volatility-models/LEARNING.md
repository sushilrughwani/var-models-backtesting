# LEARNING — study the code in this order

Each step names a file, what to read in it, the key question it answers, and how to check you understood it. Keep MATH.md open alongside; section numbers (§) refer to it.

---

## Step 1 — `src/config.py`

**Read:** the `Config` dataclass.

**Key question:** where does every number come from? Here — tickers, dates, 252 trading days, windows (20/60/252), λ values, scale 100, initial window 1000, refit every 20 days, COVID dates.

**Check yourself:** what would change if `refit_every = 1`? The results would barely change and the run would take about 20 times longer.

---

## Step 2 — `src/data_loader.py`

**Read, in order:**

1. `ticker_to_filename`
2. `download_prices` (yfinance with `auto_adjust=False`)
3. `load_or_download` (cache → download → STOP)
4. `clean_prices` (three drop rules plus a report)
5. `compute_log_returns` (§1)
6. `load_all_assets`

**Key ideas:**

- Never use synthetic data for results.
- Adjusted close removes the artificial jumps caused by dividends and splits.
- Each asset keeps its own calendar.

**Check yourself:** why is `High == Low` dropped? It is a stale quote, and it would give a zero Parkinson variance.

---

## Step 3 — `src/stylized_facts.py` (Part 1)

**Read:**

- `summary_statistics` (§2–3)
- `jarque_bera_manual` and then `jarque_bera_test` (§4): manual first, then the library, asserted equal
- `tail_exceedances` (§5)
- `acf_values` and `ljung_box` (§6–7)
- `leverage_correlation` (§8)
- `stylized_facts_table`

**Key idea:** these facts are the reason the models exist.

- fat tails → Student-t errors
- clustering → EWMA/GARCH
- leverage → GJR

**Check yourself:** why test $r_t^2$ and not just $r_t$ for autocorrelation? Returns can be uncorrelated while their size is predictable.

---

## Step 4 — `src/models/historical.py`

**Read:** `rolling_std_loop` → `rolling_std` (pandas, asserted equal) → `historical_vol_forecast` (`.shift(1)`) → `ghost_effect_dates`.

**Key ideas (§9):**

- equal weights
- the window trade-off
- the ghost effect
- `.shift(1)` as the first defence against look-ahead

---

## Step 5 — `src/models/ewma.py`

**Read:** `ewma_variance_loop` → `ewma_variance_pandas` → `ewma_variance` (assert) → `ewma_weights` → `ewma_half_life`.

**Key ideas (§10–11):**

- the recursion
- initialisation with $r_0^2$
- `.ewm(alpha=1-λ, adjust=False)` followed by `.shift(1)` is the same recursion
- weights $(1-\lambda)\lambda^{k-1}$

**Check yourself:** what does `adjust=True` do? It renormalises the weights over the finite sample, which is a different initialisation.

---

## Step 6 — `src/models/garch_manual.py`

**Read:**

1. `GarchFit` dataclass
2. `garch_variance` (§12, backcast)
3. `garch_neg_loglik` (§13)
4. `stationarity_margin` (§14)
5. `fit_garch_manual` (SLSQP, bounds, constraint, starting values)
6. `garch_long_run_stats` (§15)
7. `garch_term_structure` (§16)
8. `simulate_garch` (tests only)

**Key ideas:** MLE written by hand; why returns are scaled by 100 (§18).

**Check yourself:** what happens to ω if you forget the scaling? It becomes about 1e-6 and the optimiser struggles.

---

## Step 7 — `src/models/garch_arch.py`

**Read:**

- `fit_arch` (`mean="Zero"`, `o=1` turns on GJR, `dist="t"`)
- `params_table`
- `information_criteria` (§20–21)
- `arch_term_structure`
- `gjr_long_run_var` (§22)
- `news_impact_curve` (§23)
- `fixed_params_variance` (used in Part 3)

**Key idea:** `arch` is the production tool. Its numbers are trusted because they match the manual version (`compare_manual_vs_arch` in `main.py`).

---

## Step 8 — `src/models/parkinson.py`

**Read:** `parkinson_daily_variance` → `rolling_mean_loop` → `parkinson_vol` (assert) → `parkinson_vol_forecast`.

**Key ideas (§24):** efficiency about 5 times close-to-close, but it misses overnight gaps.

---

## Step 9 — `src/evaluation.py` (Part 3)

**Read the module docstring first** — it explains look-ahead bias.

**Then read:**

1. `rolling_garch_variance` (expanding window, refit every 20 days, frozen parameters filtered forward)
2. `simple_model_forecasts`
3. `garch_model_forecasts`
4. `build_forecasts` (common evaluation days, asserts)
5. `mse_loss` and `qlike_loss` (§25–27)
6. `mincer_zarnowitz` (§28)
7. `reaction_metrics` and `covid_reaction_table`
8. `forecasts_to_long`

**Check yourself:** for a forecast of day t, which is the last return used? $r_{t-1}$.

---

## Step 10 — `src/plots.py`

Skim it. Every function saves one PNG with a title, labels, a legend and a date axis. Nothing in this file changes any number.

---

## Step 11 — `main.py`

**Read:** `main()` first (the list of steps), then each `part*` function.

**Notice:**

- the EWMA = GARCH special-case assert in `part2_ewma`
- the term-structure assert in `term_structure`
- the overnight-gap share in `part2_parkinson`
- every number is written to `outputs/key_results.json`

---

## Step 12 — `tests/`

| File | What it checks |
|------|----------------|
| `test_ewma_historical.py` | loop == pandas; hand example |
| `test_garch.py` | constraints; manual ≈ arch; parameter recovery; special case; term structure |
| `test_no_lookahead.py` | perturbing the future must not change past forecasts |
| `test_parkinson_eval_data.py` | Parkinson known example; losses; MZ; cleaning; JB |
| `test_pipeline_smoke.py` | the whole pipeline on synthetic CSVs in a temp folder; the STOP path |

---

## Step 13 — `notebooks/walkthrough.ipynb`

The interview demo: the same functions, in the same order, with explanations between cells.

---

## Step 14 — `src/worked_examples.py`

Rerun the MATH.md examples and redo two or three of them by hand:

```bash
python -m src.worked_examples
```
