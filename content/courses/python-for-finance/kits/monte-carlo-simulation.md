---
title: "Monte Carlo Simulation"
duration: 22
---

## Lecture outline
- 00:00 - Hook: "will my 500,000 last 20 years at 30,000 a year?" - no formula, but 20,000 futures can answer it
- 02:00 - The Monte Carlo recipe: model → simulate → apply rules → summarise
- 04:00 - GBM: exact update, volatility drag, mean vs median
- 08:00 - Live code: 10,000 paths × 252 steps in one array; `cumsum` and `exp`
- 12:00 - Checking against theory; Monte Carlo standard error
- 15:00 - Retirement withdrawal simulation and sequence risk
- 19:00 - Exam traps
- 21:00 - Recap

## Slides
### Slide 1: Monte Carlo Simulation
- Generate many possible futures from a model
- Apply the rules to each future
- Summarise: means, probabilities, percentiles

### Slide 2: The Recipe
- Fix a seed: `rng = np.random.default_rng(123)`
- Draw shocks as a 2-D array (paths × steps)
- Build outcomes, then summarise

### Slide 3: Geometric Brownian Motion
- $S_{t+\Delta t} = S_t \exp[(\mu - \sigma^2/2)\Delta t + \sigma\sqrt{\Delta t} Z]$
- Log returns normal and independent
- Prices stay positive

### Slide 4: Volatility Drag
- Mean grows at μ: 100 e^0.08 = 108.33
- Median grows at μ − σ²/2: 100 e^0.06 = 106.18
- Lognormal: right-skewed, mean > median

### Slide 5: Vectorised Paths
- `increments = drift*dt + sigma*np.sqrt(dt)*Z`
- `paths = S0 * np.exp(np.cumsum(increments, axis=1))`
- No Python loop over paths

### Slide 6: Results vs Theory
- Mean 108.73 vs 108.33; median 106.69 vs 106.18
- SE of mean 0.217 → difference within 2 SE
- P(S_T < 90) = 0.1971 vs 0.2042 theory

### Slide 7: Monte Carlo Error
- SE = s / √N
- 4× more paths → half the error
- Always report the SE

### Slide 8: Simulating Rules - Withdrawals
- 500,000 start, 30,000 a year, 20 years
- Returns ~ N(6%, 12%) per year
- `np.maximum(..., 0)` stops wealth going negative

### Slide 9: Sequence Risk
- P(ruin) = 14.1%; median ending wealth 364,660
- Early losses hurt more when you are withdrawing
- Average return alone hides this risk

### Slide 10: Exam Traps
- Missing −σ²/2
- σΔt instead of σ√Δt
- No seed, no SE, mean/median confusion

### Slide 11: Key Takeaways
- Cumsum log increments, exponentiate once
- Validate against theory first
- Boolean `.mean()` = probability estimate

## Whiteboard examples
1. **Theory benchmarks.** S0 = 100, μ = 8%, σ = 20%, T = 1.
   - Log drift = 0.08 − 0.02 = 0.06.
   - Mean = 100 e^0.08 = 108.33; median = 100 e^0.06 = 106.18.
   - P(S_T < 90): z = (ln 0.9 − 0.06) / 0.2 = (−0.10536 − 0.06) / 0.2 = −0.8268 → N(z) = 0.2042.
2. **Single steps.** Same inputs, one annual step.
   - Z = −0.5: 100 × exp(0.06 − 0.10) = 96.08.
   - Z = +1.5: 100 × exp(0.06 + 0.30) = 143.33.
3. **Paths needed.** SE = 0.20 with 10,000 paths; target 0.05 → factor 4 → 16 × 10,000 = 160,000 paths.

## Questions to ask students
- Why do we subtract σ²/2 in the drift? (So that the expected price grows at μ; the lognormal's mean exceeds its median by that convexity effect)
- What shape is the `Z` array and why? (paths × steps, so every path and step gets its own shock in one call)
- The simulated mean differs from theory by 0.40 and the SE is 0.217. Is something wrong? (No; it is within about 2 standard errors)
- How would you estimate the 5% worst outcome? (`np.percentile(ST, 5)`)
- Why can the retirement plan fail even though expected return equals the withdrawal rate? (Volatility and sequence risk: early losses permanently shrink the base)

## Analogies
- Monte Carlo is like a flight simulator: you fly the same route thousands of times in different weather to see how often you land safely.
- Volatility drag is a see-saw of percentages: losing 20% then gaining 20% leaves you at 96, not 100.
- The standard error is the "wobble" in your estimate; quadrupling the crowd you poll halves the wobble.

## Recording tips
- Plot the first 50 paths with `plt.plot(paths[:50].T)` - the fan of paths makes GBM tangible.
- Run the simulation with two different seeds to show results change slightly but stay within a couple of standard errors.
- Emphasise that the withdrawal loop is over years, not paths; beginners often write a double loop.
