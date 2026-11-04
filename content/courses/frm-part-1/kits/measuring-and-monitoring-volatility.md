---
title: "Measuring and Monitoring Volatility"
duration: 26
---

## Lecture outline
- 00:00 - Hook: plot of daily index returns; point out the calm and stormy clusters
- 03:00 - Problem with equal-weighted windows: stale shocks and cliff effects
- 06:00 - EWMA: formula, decay factor, what λ = 0.94 means
- 10:00 - GARCH(1,1): adding the long-run anchor, persistence, stability condition
- 14:00 - Whiteboard: EWMA and GARCH update from the same inputs
- 18:00 - Forecasting with GARCH, half-life and the volatility term structure
- 22:00 - EWMA covariance and correlation updating
- 24:00 - Exam traps and recap

## Slides
### Slide 1: Measuring and Monitoring Volatility
- Volatility is the key input to every VaR model
- It changes over time and clusters
- EWMA, GARCH, term structure, correlation

### Slide 2: Problems With Equal Weights
- A crash 249 days ago counts as much as yesterday
- Estimate drops abruptly when the shock leaves the window
- Responds slowly to new regimes

### Slide 3: EWMA
- σ²ₙ = λσ²ₙ₋₁ + (1 − λ)u²ₙ₋₁
- Weights decay geometrically; only two inputs stored
- RiskMetrics daily λ = 0.94; no mean reversion

### Slide 4: GARCH(1,1)
- σ²ₙ = ω + αu²ₙ₋₁ + βσ²ₙ₋₁
- Long-run variance V_L = ω / (1 − α − β)
- Requires α + β < 1; persistence = α + β

### Slide 5: EWMA Versus GARCH
- EWMA = GARCH with ω = 0, α = 1 − λ, β = λ
- GARCH forecasts revert to V_L; EWMA forecasts stay flat
- GARCH has more parameters to estimate (maximum likelihood)

### Slide 6: Forecasting With GARCH
- E[σ²ₙ₊ₜ] = V_L + (α + β)ᵗ(σ²ₙ − V_L)
- Gap to long-run shrinks by (α + β) per day
- Half-life = ln 0.5 / ln(α + β)

### Slide 7: Volatility Term Structure
- Current vol above V_L: downward-sloping term structure
- Current vol below V_L: upward-sloping term structure
- Short-dated implied vols move more than long-dated

### Slide 8: Correlation Updating
- covₙ = λcovₙ₋₁ + (1 − λ)xₙ₋₁yₙ₋₁
- ρ = cov / (σₓσᵧ)
- Same λ everywhere keeps the matrix consistent

### Slide 9: Exam Traps
- Square volatilities before combining
- ω is not V_L
- Annualise volatility with √252, variance with 252

### Slide 10: Recap
- Weight recent data more heavily
- GARCH adds mean reversion and a term structure
- Next: credit ratings and the start of credit risk

## Whiteboard examples
**Example 1: EWMA and GARCH update.** Yesterday σ = 1.5%, u = −2%.
- EWMA (λ = 0.94): 0.94 × 0.000225 + 0.06 × 0.0004 = 0.0002355, σ = 1.5346%.
- GARCH (ω = 0.000002, α = 0.08, β = 0.90): V_L = 0.000002 / 0.02 = 0.0001 (1.0% daily).
- σ²ₙ = 0.000002 + 0.000032 + 0.0002025 = 0.0002365, σ = 1.5379%.
- 10 days ahead: 0.0001 + 0.98¹⁰ × 0.0001365 = 0.0001 + 0.81707 × 0.0001365 = 0.00021153, σ = 1.4544%.
- Half-life = ln 0.5 / ln 0.98 ≈ 34.3 days.

**Example 2: Covariance update.** λ = 0.94, yesterday's covariance 0.00006, yesterday's returns x = −1%, y = +2%.
- covₙ = 0.94 × 0.00006 + 0.06 × (−0.01 × 0.02) = 0.0000564 − 0.000012 = 0.0000444.
- Opposite-sign returns pull the covariance down.

## Questions to ask students
- If λ were 0.99 instead of 0.94, how would EWMA behave? (Smoother, slower to react to shocks.)
- What happens to a GARCH model if α + β = 1? (No finite long-run variance; it behaves like EWMA, with no mean reversion.)
- Current GARCH vol is 2% daily, long-run 1.2%. Is the term structure upward or downward sloping? (Downward.)
- Why should variances and covariances use the same λ? (To keep the covariance matrix positive semi-definite.)
- What is the 10-day forecast under EWMA if today's vol is 1.5%? (1.5% per day; no mean reversion.)

## Analogies
- EWMA is memory that fades: yesterday is vivid, last month is blurry, last year is almost gone.
- GARCH is a rubber band tied to the long-run level: shocks stretch volatility away, and the band slowly pulls it back.
- Persistence is like the echo in a canyon: the closer α + β is to 1, the longer the echo of a shock lasts.

## Recording tips
- Do both updates side by side with identical inputs so students see that the only structural difference is ω.
- Plot the GARCH forecast path decaying to V_L; it makes the term structure intuitive.
- Remind students repeatedly to work in variances, not volatilities.
