---
title: "Stationary Time Series"
duration: 28
---

## Lecture outline
- 00:00 - Hook: why does a spike in the VIX fade within weeks, while some prices never come back?
- 02:00 - Covariance stationarity: the three conditions; ACF and PACF
- 06:00 - White noise as the benchmark
- 08:00 - AR(1): mean, variance, ACF, stationarity condition; AR(p)
- 13:00 - MA(1) and MA(q): short memory and the ACF cut-off
- 17:00 - ARMA and the identification table
- 20:00 - Ljung-Box test, AIC versus BIC
- 23:00 - Forecasting and mean reversion; whiteboard example
- 26:00 - Exam traps and recap

## Slides
### Slide 1: Stationary Time Series
- Observations are ordered and dependent
- Goal: model and forecast persistence
- Foundation for volatility models later in the course

### Slide 2: Covariance Stationarity
- Constant mean
- Constant, finite variance
- Autocovariance depends only on the lag h

### Slide 3: ACF, PACF and White Noise
- ACF: ρh = γh / γ0
- PACF: correlation at lag h net of shorter lags
- White noise: mean zero, constant variance, no autocorrelation

### Slide 4: The AR(1) Model
- Yt = δ + φ Yt-1 + εt, stationary if |φ| < 1
- Mean δ/(1 - φ), variance σ²/(1 - φ²)
- ACF = φ^h decays geometrically; PACF cuts off after lag 1

### Slide 5: The MA(1) Model
- Yt = μ + εt + θ εt-1
- ρ1 = θ/(1 + θ²), zero after lag 1
- Always stationary; memory of exactly q periods for MA(q)

### Slide 6: ARMA(p, q)
- Combines AR persistence with MA shocks
- ACF and PACF both decay
- Parsimony: few parameters, good forecasts

### Slide 7: Identification Cheat Sheet
- AR(p): ACF decays, PACF cuts off at p
- MA(q): ACF cuts off at q, PACF decays
- ARMA: both decay

### Slide 8: Testing for Autocorrelation
- Ljung-Box: Q = n(n + 2) Σ ρj² / (n - j), chi-square with h df
- Box-Pierce: n Σ ρj²; weaker in small samples
- Apply to residuals: should look like white noise

### Slide 9: Model Selection
- Lower AIC or BIC is better
- BIC penalises parameters more: picks smaller models
- Prefer the simplest model that leaves white-noise residuals

### Slide 10: Forecasting
- E[YT+h] = μ + φ^h (YT - μ)
- Gap to the mean shrinks by φ each period
- Long-horizon forecast converges to μ

### Slide 11: Recap
- Stationarity enables learning from history
- AR, MA, ARMA signatures
- Next: what happens when stationarity fails

## Whiteboard examples
**Example 1: AR(1) moments and forecasts.** Yt = 0.5 + 0.8 Yt-1 + εt, σ² = 1, YT = 4.
- Mean = 0.5/0.2 = 2.5. Variance = 1/(1 - 0.64) = 2.778. ρ2 = 0.64.
- One step: 0.5 + 3.2 = 3.70. Two steps: 0.5 + 0.8 × 3.70 = 3.46.
- Shortcut: 2.5 + 0.8² × (4 - 2.5) = 3.46.

**Example 2: Ljung-Box on residuals.** n = 100, residual autocorrelations 0.20, 0.10, 0.05.
- Q = 100 × 102 × (0.04/99 + 0.01/98 + 0.0025/97) = 5.42.
- Box-Pierce for comparison: 100 × 0.0525 = 5.25.
- Critical χ²(3) at 5% = 7.81: residuals are consistent with white noise.

**Example 3: MA(1) autocorrelation.** θ = 0.5: ρ1 = 0.5/1.25 = 0.40, ρ2 = 0.

## Questions to ask students
- An AR(1) has δ = 2 and φ = 0.5. What is its mean? (4.)
- The ACF cuts off after lag 2 and the PACF decays. Which model? (MA(2).)
- Can an MA(1) ever be non-stationary? (No, finite MA processes are always stationary.)
- Which criterion tends to choose the smaller model, AIC or BIC? (BIC.)
- What does a 100-step-ahead forecast of a stationary AR(1) look like? (Essentially the long-run mean.)

## Analogies
- AR(1): a rubber band; the further the series stretches from its mean, the harder it is pulled back, at a fixed fraction per period.
- MA(1): an echo that lasts exactly one period, then vanishes.
- White noise: radio static; no pattern to exploit.

## Recording tips
- Put the identification cheat sheet on screen as a 3 × 2 table and leave it there while discussing ACF/PACF plots.
- Show simulated paths of AR(1) with φ = 0.2, 0.8 and 0.99 side by side to make persistence visible.
- Students often forget the constant when iterating forecasts; do it slowly, step by step, before showing the shortcut.
