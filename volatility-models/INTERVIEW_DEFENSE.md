# INTERVIEW DEFENSE

> **Status:** answers that depend on this project's real results contain **⟨pending⟩** slots. Yahoo Finance was blocked in the environment where the code was built, so no real-data run exists yet. Fill each slot from `outputs/key_results.json` and the CSV named in brackets after running `python main.py`. Numbers already shown come from executed code (tests or `src/worked_examples.py`).

---

## A. Data and stylized facts

**1. Why log returns rather than simple returns?**

Log returns add up over time ($\sum r_t = \ln(P_T/P_0)$). They are approximately equal to simple returns for daily moves, and they are the standard input of volatility models. The gap is about $r^2/2$: for a 1% day, the simple return is 1.005% and the log return is 1.000%.

---

**2. Why adjusted close?**

Dividends and splits create price jumps that are not investment returns. Adjusted close removes them, so $r_t$ is the total return.

---

**3. How did you clean the data, and how many rows were dropped?**

Rows with missing or non-positive prices, or with `High == Low` (stale quotes), are dropped.

- Dropped per asset: NIFTY50 ⟨pending⟩, SP500 ⟨pending⟩, RELIANCE ⟨pending⟩ [`data_cleaning.csv`]

---

**4. What are the stylized facts, and what did you find?**

- **Fat tails:** excess kurtosis ⟨pending⟩ / ⟨pending⟩ / ⟨pending⟩; Jarque–Bera p ≈ ⟨pending⟩.
- **Clustering:** Ljung–Box(20) on $r^2$ has Q = ⟨pending⟩ against ⟨pending⟩ for $r$.
- **Leverage:** corr($r_t$, $r_{t+1}^2$) = ⟨pending⟩.

[`stylized_facts.csv`, `ljung_box.csv`]

---

**5. Make "fat tails" concrete.**

Under a normal distribution, a 4σ day happens once in about 15,787 days (about 63 years). The data show ⟨pending⟩ such days for SP500 against ⟨pending⟩ expected [`stylized_facts.csv`: `obs_4sigma_days`, `exp_4sigma_days_normal`].

---

**6. Why are returns nearly uncorrelated while squared returns are strongly correlated?**

Markets are close to efficient in the direction of moves, but not in their size. Information arrives in bursts, and uncertainty regimes persist. So the size of moves (volatility) is forecastable even though the sign is not.

---

**7. What is the Ljung–Box test?**

$Q = n(n+2)\sum_{k\le m}\rho_k^2/(n-k) \sim \chi^2_m$. It jointly tests that the first m autocorrelations are zero. Applied to $r^2$ it is a test for ARCH effects.

---

**8. What is the leverage effect, and why does it exist?**

Negative returns raise future volatility more than positive returns of the same size. There are two explanations:

- **Financial leverage:** a lower share price means a higher debt/equity ratio, so riskier equity.
- **Volatility feedback:** expected higher risk forces prices down.

Measured as a negative corr($r_t$, $r_{t+1}^2$).

---

**9. So why is constant volatility wrong for risk?**

A single σ under-states risk exactly when it matters (turbulent regimes) and over-states it in calm ones. VaR breaches then cluster in crises, and capital is misallocated in calm periods.

---

## B. Historical and EWMA

**10. What is the trade-off in the rolling-window length?**

- **Short (20d):** reacts fast, but has few observations, so it is noisy.
- **Long (252d):** smooth, but slow to react.

Measured as the average absolute daily change of annualised vol: 20d ⟨pending⟩ vs 252d ⟨pending⟩ for SP500 [`key_results.json → historical`].

---

**11. What is the ghost effect?**

With equal weights, one extreme day keeps the estimate high for exactly N days. The estimate then drops abruptly when that day leaves the window, although nothing happened in the market on the drop day. In the data, the largest shock (SP500 on ⟨pending⟩, return ⟨pending⟩) exits the 60-day window 60 trading days later (chart `05_hist_vol_SP500.png`).

---

**12. Explain EWMA in one line.**

$\sigma_t^2 = \lambda\sigma_{t-1}^2 + (1-\lambda)r_{t-1}^2$. It is a weighted average of past squared returns with geometrically decaying weights $(1-\lambda)\lambda^{k-1}$.

---

**13. Why λ = 0.94?**

RiskMetrics (J.P. Morgan, 1994) chose it to minimise variance-forecast error across many daily series. It gives a half-life of $\ln0.5/\ln0.94 = 11.2$ days.

- λ = 0.90 (half-life 6.6 days) is more reactive.
- λ = 0.97 (half-life 22.8 days) is smoother.

Chart `07_ewma_lambdas_*.png` compares them.

---

**14. How do you initialise EWMA?**

We set $\sigma_1^2 = r_0^2$. This uses no future data, and its weight $0.94^t$ is negligible after the 1000-day burn-in. The common alternative is the sample variance of the first ~30 days. That alternative uses data later than $t=1$ inside the warm-up, so it must be excluded from evaluation.

---

**15. How did you verify the pandas `.ewm` call?**

The explicit loop and `(r**2).ewm(alpha=1-λ, adjust=False).mean().shift(1)` are asserted equal, both in the code and in a test. `adjust=False` is essential: `adjust=True` renormalises the weights over a finite sample.

---

**16. What are EWMA's weaknesses?**

- No mean reversion: the multi-step forecast is flat.
- No long-run level.
- λ is fixed rather than estimated.
- Symmetric response to shocks.
- Normality is often assumed for VaR.

---

## C. GARCH

**17. Write GARCH(1,1) and interpret each parameter.**

$\sigma_t^2 = \omega + \alpha r_{t-1}^2 + \beta\sigma_{t-1}^2$.

- **α:** reaction to news.
- **β:** memory.
- **ω:** sets the long-run level, $V_L = \omega/(1-\alpha-\beta)$.

---

**18. How is it estimated?**

By maximum likelihood. Under normal errors, $\ln L = -\frac12\sum[\ln2\pi + \ln\sigma_t^2 + r_t^2/\sigma_t^2]$. I coded this by hand and maximised it with `scipy.optimize.minimize` (SLSQP) under ω > 0, α ≥ 0, β ≥ 0, α + β < 1.

With the same backcast, `arch` matches the manual version:

- max parameter difference ⟨pending⟩
- log-likelihood difference ⟨pending⟩

[`garch_manual_vs_arch.csv`]. On simulated data the difference is below 5e-3 (test).

---

**19. Why scale returns by 100?**

Daily variance is about 1e-4 and ω about 1e-6. Optimiser tolerances and finite-difference steps around 1e-8 are then badly conditioned. In percent, the variance is about 1 and ω about 0.02. α and β are unit-free; ω scales by $100^2$.

---

**20. Why must α + β < 1?**

Taking expectations, $V = \omega + (\alpha+\beta)V$, so $V = \omega/(1-\alpha-\beta)$. That is positive and finite only if α + β < 1. Otherwise shocks never die out and there is no long-run variance (covariance stationarity fails).

---

**21. What persistence did you find, and what does it mean?**

α + β = ⟨pending⟩ (NIFTY50), ⟨pending⟩ (SP500), ⟨pending⟩ (RELIANCE) [`garch_summary.csv`: `normal_persistence`]. Close to 1 means volatility shocks decay slowly.

---

**22. What is the half-life?**

$\ln0.5/\ln(\alpha+\beta)$ = ⟨pending⟩ / ⟨pending⟩ / ⟨pending⟩ trading days. It is the time for half of a variance shock (relative to $V_L$) to disappear.

---

**23. What are the long-run variance and vol?**

$V_L = \omega/(1-\alpha-\beta)$. Annualised long-run vol is ⟨pending⟩ / ⟨pending⟩ / ⟨pending⟩ [`normal_long_run_annual_vol`]. Compare it with the sample vol ⟨pending⟩ [`stylized_facts.csv`: `vol_annual`]: they should be close if the model fits well.

---

**24. Show that EWMA is a special case of GARCH.**

Set ω = 0, α = 1 − λ and β = λ: persistence is 1 and there is no constant. `main.py` asserts that `garch_variance(0, 0.06, 0.94, …)` reproduces the EWMA path exactly on the real data.

The implication: EWMA is an integrated GARCH (IGARCH) with no long-run level, so its forecasts never mean-revert.

---

**25. What does the term-structure chart show?**

$E[\sigma^2_{t+h}] = V_L + (\alpha+\beta)^{h-1}(\sigma^2_{t+1}-V_L)$. The next-day vol of ⟨pending⟩ converges towards the long-run ⟨pending⟩ over 252 days (`08_garch_term_structure.png`). The manual formula is asserted equal to `arch.forecast`.

This matters for risk because a 10-day VaR uses the sum of the variances over the next 10 days, not $\sqrt{10}\,\sigma_{1d}$, when vol is far from its long-run level.

---

**26. Normal vs Student-t errors: which won?**

[`garch_information_criteria.csv`]

- Log-likelihood: GARCH-t ⟨pending⟩ vs normal ⟨pending⟩.
- AIC/BIC: ⟨pending⟩.
- Estimated ν: ⟨pending⟩ / ⟨pending⟩ / ⟨pending⟩.

A small ν means standardised residuals are still fat-tailed: GARCH explains part of the kurtosis (clustering), but not all of it.

---

**27. If you assume normal errors and they are not normal, are the estimates wrong?**

The normal MLE is a quasi-MLE (QMLE). The variance parameters are still consistent if the variance equation is correct. Standard errors must then be robust, which is why I report `arch`'s Bollerslev–Wooldridge robust SEs. Tail quantiles for VaR, however, would be wrong.

---

**28. How do you read the standard errors and t-stats?**

t = estimate / SE, and |t| > 1.96 is significant at 5%. For SP500: α t = ⟨pending⟩, β t = ⟨pending⟩ [`garch_params.csv`].

---

## D. GJR-GARCH and the leverage effect

**29. Write GJR-GARCH and interpret γ.**

$\sigma_t^2 = \omega + (\alpha + \gamma I_{t-1})r_{t-1}^2 + \beta\sigma_{t-1}^2$, with $I = 1$ if $r_{t-1} < 0$. γ is the extra reaction to bad news.

---

**30. Is γ significant?**

γ = ⟨pending⟩ (t = ⟨pending⟩, p = ⟨pending⟩) for SP500; ⟨pending⟩ for NIFTY50; ⟨pending⟩ for RELIANCE [`garch_summary.csv`: `gjr_gamma`, `gjr_gamma_t`, `gjr_gamma_p`]. A frequent finding is that α drops towards 0 in GJR: positive shocks barely raise vol at all.

---

**31. What is the news impact curve?**

Tomorrow's variance as a function of today's return, holding yesterday's variance at the long-run level.

- GARCH gives a symmetric parabola.
- GJR is steeper on the negative side (`09_news_impact_curve.png`).

Toy example: after −2% the GJR variance is 1.64, against 1.24 after +2% (MATH §22).

---

**32. GJR persistence?**

α + γ/2 + β, because the indicator is on about half the time. Our values are ⟨pending⟩. The long-run variance is $\omega/(1-\alpha-\gamma/2-\beta)$.

---

## E. Parkinson

**33. Why is Parkinson more efficient than close-to-close?**

The high–low range uses the whole intraday path, not just two points. For a driftless continuous random walk, its estimator variance is about 1/5.2 of the squared-return estimator's, so 20 days of ranges carry about as much information as 100 days of closes.

---

**34. What are its limitations, and did you see them?**

It ignores overnight gaps, assumes no drift, is biased down by discrete trading, and needs clean High/Low data.

- Mean ratio Parkinson / close-to-close: ⟨pending⟩ (NIFTY50), ⟨pending⟩ (SP500), ⟨pending⟩ (RELIANCE).
- Overnight share of return variance: ⟨pending⟩ / ⟨pending⟩ / ⟨pending⟩ [`key_results.json → parkinson`].

The larger the overnight share, the more Parkinson under-states total vol.

---

**35. How did Parkinson rank as a forecaster?**

QLIKE rank: ⟨pending⟩ [`model_ranking.csv`]. If it ranks low, the overnight bias is the likely reason: the forecast is systematically too small. QLIKE punishes under-prediction more than over-prediction.

---

## F. Forecast evaluation

**36. What is look-ahead bias, and how do you avoid it?**

Look-ahead bias is using information from day t or later to forecast day t, for example fitting GARCH on 2015–2026 and then "forecasting" 2020. I avoid it as follows:

- Rolling, EWMA and Parkinson use `.shift(1)` or a lagged recursion.
- GARCH-type models are estimated on an expanding window that ends the day before each refit date, then refit every 20 days, with frozen parameters filtered forward on past returns only.
- The first 1000 days are never scored.

A unit test changes all returns after day k and checks that no forecast up to day k changes.

---

**37. Why use $r_t^2$ as realised variance, and what is the problem with it?**

It is the only proxy available from daily data, and it is unbiased ($E[r_t^2] = \sigma_t^2$). But it is extremely noisy: $r_t^2 = \sigma_t^2 z_t^2$, and the variance of $z^2$ is 2 even under normality. Intraday realised variance (sum of 5-minute squared returns) would be far better.

---

**38. MSE vs QLIKE — why prefer QLIKE?**

Both rank forecasts consistently with an unbiased noisy proxy (Patton, 2011). But MSE works on squared variance errors, so a handful of crash days dominate it. QLIKE ($RV/h + \ln h$) depends on the ratio $RV/h$, so it is scale-free and much more stable across samples. It also penalises under-prediction more than over-prediction, which suits risk management.

---

**39. Which model won?**

[`rank_summary_qlike.csv`, `model_ranking.csv`]

- By QLIKE: ⟨pending⟩ for NIFTY50, ⟨pending⟩ for SP500, ⟨pending⟩ for RELIANCE.
- By MSE: ⟨pending⟩.
- Mean QLIKE rank across assets: ⟨pending⟩.

---

**40. What does Mincer–Zarnowitz tell you?**

Regress $RV_t = a + b h_t + e_t$.

- Unbiased forecasts have a = 0 and b = 1.
- b < 1 means the forecast over-reacts (too volatile); b > 1 means it under-reacts.
- $R^2$ is low for every model (⟨pending⟩) because $r^2$ is so noisy. That does not mean the models are bad.

For SP500 GARCH: b = ⟨pending⟩, joint p = ⟨pending⟩ [`mincer_zarnowitz.csv`].

---

**41. Why HAC standard errors in Mincer–Zarnowitz?**

The residuals are heteroskedastic (bigger when vol is high) and autocorrelated. OLS standard errors would overstate significance. Newey–West with 5 lags corrects this.

---

**42. What happened during COVID?**

[`covid_reaction.csv`]

- Pre-shock (19-Feb-2020) vol versus peak, SP500: GARCH ⟨pending⟩ → ⟨pending⟩, EWMA ⟨pending⟩ → ⟨pending⟩, HIST252 ⟨pending⟩ → ⟨pending⟩.
- Trading days to peak: GARCH ⟨pending⟩, EWMA ⟨pending⟩, HIST60 ⟨pending⟩.
- Days from peak back to halfway: ⟨pending⟩.

The usual pattern is that EWMA and GARCH react within days and decay smoothly, while HIST252 barely moves and then shows a ghost drop a year later.

---

**43. Why refit every 20 days and not every day?**

Parameters estimated on 1000+ days barely move in one day. Refitting every 20 days cuts the number of fits 20-fold: one fit per 20 out-of-sample days per model and asset, instead of one per day. The variance itself is still updated daily with the latest return.

---

**44. Why an expanding rather than a rolling estimation window?**

GARCH needs long samples to pin down β and ω, and the expanding window uses all available history. A rolling window (e.g. 1000 days) adapts better to structural change. That is a reasonable extension to test.

---

**45. Is the difference between the top models statistically significant?**

The ranking alone does not say. I would add a Diebold–Mariano test on the QLIKE loss differences, or a Model Confidence Set (Hansen, Lunde and Nason, 2011). This is listed under improvements.

---

## G. Limitations of each model (summary)

| Model | Main limitation |
|-------|-----------------|
| Historical | Equal weights; ghost effect; arbitrary window; slow (long window) or noisy (short window); no mean reversion. |
| EWMA | λ fixed, not estimated; no long-run level; flat multi-step forecast; symmetric. |
| GARCH(1,1) | Symmetric; normal QMLE tails; parameters assumed constant over time; only one lag. |
| GARCH-t | Fat tails but still symmetric; one ν for the whole sample. |
| GJR | Asymmetry only through the sign of yesterday's return; needs a positivity condition; normal tails in my specification. |
| Parkinson | Misses overnight gaps; zero-drift assumption; discrete-trading downward bias; needs clean High/Low; equal-weighted 20-day window. |
| All | Univariate (no correlations); daily proxy is noisy; no regime switching; no use of implied vol. |

---

## Design decisions I made and why

1. **Zero-mean models.** The daily mean (about 0.05%) is noise relative to vol (about 1%). Zero mean makes EWMA, manual GARCH and `arch` the same model and keeps $r^2$ as the proxy.
2. **Manual first, library second, assert equal.** This applies to the rolling std, EWMA (`.ewm`), Jarque–Bera, the GARCH likelihood (matched to `arch` with the same backcast), the term structure and the Parkinson rolling mean. Library results are trusted only after they reproduce the formula.
3. **Backcast = sample variance**, passed to `arch` too, so manual and library agree. Explaining "exponentially weighted first 75 observations" is harder in an interview.
4. **Returns × 100** for GARCH, for numerical conditioning.
5. **Robust (sandwich) standard errors.** Normality is rejected in Part 1, so classic MLE standard errors would be misleading.
6. **QLIKE as the primary loss**, MSE as secondary, with the reasons given in Q38.
7. **Expanding window, 1000-day burn-in, refit every 20 days.** This balances realism, stability and run time, and keeps COVID out of sample.
8. **Same evaluation days for every model**, enforced by `build_forecasts`, so the losses are comparable.
9. **Cache raw CSVs and stop without data.** Results are reproducible, and synthetic data never leaks into results.
10. **One config dataclass** holds every parameter, so nothing is hard-coded inside the models.

---

## Limitations and what I would improve next

- **EGARCH (Nelson, 1991).** It models $\ln\sigma^2$, so it needs no positivity constraints, and its asymmetry is continuous. Compare it with GJR.
- **Multivariate DCC-GARCH (Engle, 2002).** Time-varying correlations between NIFTY, S&P 500 and Reliance, for portfolio VaR and for measuring contagion in crises.
- **Intraday realised volatility.** Use 5-minute returns as the proxy (much less noisy than $r^2$), and HAR-RV models (Corsi, 2009) as forecasters.
- **Implied volatility comparison.** Compare against India VIX and VIX: do option-implied vols forecast better? Do they add information in a Mincer–Zarnowitz encompassing regression?
- **Statistical tests of the ranking:** Diebold–Mariano and the Model Confidence Set.
- **Feed the forecasts into VaR backtesting** (Kupiec and Christoffersen tests). This is the sibling project in this repository, and `outputs/vol_forecasts.csv` is built for it.
- **Garman–Klass / Yang–Zhang** range estimators, which include the open and the overnight gap.
- **Rolling vs expanding window** sensitivity, and **λ estimated** by maximum likelihood instead of fixed.

---

## 2-minute pitch (memorise)

> "I built a volatility-forecasting project on real daily data for the Nifty 50, the S&P 500 and Reliance, from 2015 to today.
>
> First, I showed why constant volatility is wrong. Returns have excess kurtosis of ⟨pending⟩ and Jarque–Bera rejects normality. Squared returns are strongly autocorrelated, with a Ljung–Box Q of ⟨pending⟩, so volatility clusters. There is also a leverage effect: a negative correlation of ⟨pending⟩ between today's return and tomorrow's squared return.
>
> Then I implemented five model families. Rolling windows show the responsiveness–noise trade-off and the ghost effect. EWMA uses λ = 0.94, written as a loop first and checked against pandas. GARCH(1,1) I estimated by writing the log-likelihood myself and maximising it with scipy, and it matches the `arch` library. Persistence is about ⟨pending⟩, so the half-life of a shock is ⟨pending⟩ days, and the long-run vol is ⟨pending⟩. I also fitted Student-t errors, which win on AIC with ν ≈ ⟨pending⟩, and GJR-GARCH, where the leverage term γ is significant with t = ⟨pending⟩. Finally, Parkinson range-based vol, which turned out to be biased down because of overnight gaps.
>
> The core of the project is an honest out-of-sample test. Models are re-estimated every 20 days on past data only, with a unit test that proves there is no look-ahead. Forecasts are scored against squared returns with MSE and QLIKE, plus Mincer–Zarnowitz regressions. ⟨pending: winner⟩ ranked first on QLIKE across assets, and the COVID zoom shows EWMA and GARCH reacting within days while the one-year window barely moved.
>
> Every forecast is exported to a CSV that feeds my VaR backtesting project. Next I would add EGARCH, DCC-GARCH for correlations, intraday realised volatility and a comparison with implied vol."
