---
title: "Volatility Models: EWMA and GARCH"
duration: 22
---

## Lecture outline
- 00:00 - Hook: a calm market, one 3% shock - how much should tomorrow's risk estimate change?
- 02:00 - Volatility clustering and the flaws of equal-weight rolling windows
- 05:00 - EWMA recursion, λ = 0.94, hand update on the whiteboard
- 08:00 - GARCH(1,1): ω, α, β, persistence, long-run variance
- 11:00 - Live code: simulate GARCH data, run EWMA, fit GARCH by maximum likelihood
- 16:00 - Forecasting: mean reversion over 1, 10, 60, 250 days
- 19:00 - Exam traps
- 21:00 - Recap

## Slides
### Slide 1: Volatility Models: EWMA and GARCH
- Risk changes over time; models should too
- EWMA: simple exponential weighting
- GARCH: exponential weighting plus a long-run anchor

### Slide 2: Volatility Clustering
- Big moves follow big moves, calm follows calm
- Rolling windows react slowly, then jump when shocks drop out
- Solution: weight recent data more

### Slide 3: EWMA
- $\sigma_t^2 = \lambda\sigma_{t-1}^2 + (1-\lambda) r_{t-1}^2$
- λ = 0.94 for daily data (RiskMetrics)
- No long-run level → flat forecasts

### Slide 4: GARCH(1,1)
- $\sigma_t^2 = \omega + \alpha r_{t-1}^2 + \beta\sigma_{t-1}^2$
- Persistence α + β < 1
- Long-run variance VL = ω / (1 − α − β)

### Slide 5: EWMA Is a Special Case
- ω = 0, α = 1 − λ, β = λ
- Persistence exactly 1 → no reversion
- GARCH adds a pull toward VL

### Slide 6: Maximum Likelihood in Python
- Build σ² path for candidate (ω, α, β)
- Negative log-likelihood: ½ Σ [ln(2πσ²) + r²/σ²]
- `minimize(..., method="Nelder-Mead")` with penalties for invalid parameters

### Slide 7: Estimates vs Truth
- True: α = 0.08, β = 0.90 (persistence 0.98)
- Estimated: α = 0.0669, β = 0.9134 (persistence 0.9802)
- Long-run vol: 14.44% estimated vs 15.87% true

### Slide 8: Forecasting
- $E[\sigma_{t+h}^2] = V_L + (\alpha+\beta)^{h-1}(\sigma_{t+1}^2 - V_L)$
- Forecasts: 15.88% → 15.65% → 14.90% → 14.45% over 1, 10, 60, 250 days
- High persistence = slow reversion

### Slide 9: Exam Traps
- Use yesterday's return, squared
- Annualise variance × 252, volatility × √252
- EWMA does not mean-revert

### Slide 10: Key Takeaways
- Exponential weighting captures clustering
- GARCH = EWMA + long-run anchor
- Write the likelihood yourself once; then you understand any package

## Whiteboard examples
1. **One-day update.** σ(t−1) = 1.0%, r(t−1) = 3.0%.
   - EWMA: 0.94 × 0.0001 + 0.06 × 0.0009 = 0.000148 → 1.2166%.
   - GARCH (ω = 0.000002, α = 0.08, β = 0.90): 0.000002 + 0.000072 + 0.000090 = 0.000164 → 1.2806%.
2. **Long run and forecast.** Same GARCH parameters.
   - VL = 0.000002 / 0.02 = 0.0001 → 1.00% daily → 15.87% annual.
   - 10 days ahead: 0.0001 + 0.98⁹ × 0.000064 = 0.0001 + 0.8337 × 0.000064 = 0.00015336 → 1.2384%.
3. **Long run with different parameters.** ω = 0.000003, α = 0.10, β = 0.85 → VL = 0.00006 → √(0.00006 × 252) = 12.30%.

## Questions to ask students
- Why does a 21-day rolling window "jump" 21 days after a crash? (The crash day drops out of the window all at once)
- What weight does EWMA with λ = 0.94 put on yesterday's squared return? (6%)
- What does persistence of 0.98 imply? (Shocks to variance decay slowly; about 2% of the gap to the long-run level closes each day)
- If α + β = 1.02, what is wrong? (Non-stationary: no finite long-run variance; estimates are invalid)
- Today's GARCH vol is below the long-run level. Which way do forecasts move? (Up toward the long-run level)

## Analogies
- EWMA is a memory that fades: yesterday is vivid, last month is blurry, last year is almost forgotten.
- GARCH is a rubber band attached to the long-run level: shocks stretch it, and it slowly pulls volatility back.
- Persistence is the half-life of a rumour: high persistence means the market keeps talking about the shock for weeks.

## Recording tips
- Plot the true simulated variance path against the EWMA and fitted GARCH paths so students see both tracking the clusters.
- Plot `r` itself first and point out the clusters before introducing any formula.
- When fitting, print `res.success` and `res.x` and explain why the penalty value of 1e10 keeps the optimiser in the valid region.
