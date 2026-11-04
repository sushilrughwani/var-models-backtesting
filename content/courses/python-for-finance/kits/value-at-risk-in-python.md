---
title: "Value at Risk in Python"
duration: 24
---

## Lecture outline
- 00:00 - Hook: "the risk report says we lose no more than 26,000 on 99 days out of 100 - what about day 100?"
- 02:00 - VaR and expected shortfall defined; sign conventions
- 05:00 - Parametric VaR and ES with `norm.ppf` and `norm.pdf`; whiteboard on a 5,000,000 portfolio
- 10:00 - Historical VaR with `np.quantile`; interpolation gotcha
- 13:00 - Monte Carlo VaR with simulated normal returns
- 16:00 - Live comparison on fat-tailed synthetic data; why historical is higher
- 20:00 - Horizon scaling and its assumptions
- 22:00 - Exam traps and recap

## Slides
### Slide 1: Value at Risk in Python
- Three methods: parametric, historical, Monte Carlo
- Plus expected shortfall, the tail average
- Same data, different answers - and why

### Slide 2: Definitions
- 99% one-day VaR: loss exceeded on only 1% of days
- ES: average loss on those worst days
- Both reported as positive amounts of money

### Slide 3: Parametric VaR and ES
- VaR = (z σ − μ) × V, with z = `norm.ppf(c)`
- ES = (σ φ(z)/(1 − c) − μ) × V
- z: 1.6449 (95%), 2.3263 (99%)

### Slide 4: Worked Numbers
- V = 5,000,000, σ = 1.5%, μ = 0
- 95% VaR 123,364; 99% VaR 174,476
- 99% ES 199,891; 10-day 99% VaR 551,742

### Slide 5: Historical VaR
- `cut = np.quantile(r, 1 - c)`; VaR = −cut × V
- ES = −mean of returns ≤ cut, × V
- No distribution assumed; limited to the sample window

### Slide 6: Monte Carlo VaR
- Simulate returns from a model (here normal)
- Apply the same quantile logic
- Flexible: any model you can simulate

### Slide 7: Comparison on Fat-Tailed Data
- Parametric 26,461 / ES 30,420
- Historical 31,475 / ES 38,239
- Monte Carlo 26,422 / ES 30,383

### Slide 8: Why the Gap?
- Data drawn from Student t (4 df): fat tails
- Normal models understate extreme losses
- Historical VaR ~19% higher, ES ~26% higher

### Slide 9: Horizon Scaling
- VaR_T = VaR_1 × √T
- Assumes independent, zero-mean returns
- 26,461 × √10 = 83,678

### Slide 10: Exam Traps
- Sign errors with `norm.ppf(0.01)`
- `np.quantile` interpolates
- ES is an average, not a maximum

### Slide 11: Key Takeaways
- VaR = threshold; ES = tail average
- Normal VaR is easy but fragile in the tails
- One quantile function powers historical and MC VaR

## Whiteboard examples
1. **Parametric.** V = 5,000,000, σ = 1.5% daily, μ = 0.
   - 95%: 1.6449 × 0.015 × 5,000,000 = 123,364.
   - 99%: 2.3263 × 0.015 × 5,000,000 = 174,476.
   - 99% ES: φ(2.3263) = 0.026652; 0.015 × 0.026652 / 0.01 × 5,000,000 = 199,891.
   - 10-day 99%: 174,476 × 3.1623 = 551,742.
2. **Historical with interpolation.** Ten returns (%): 1.2, −3.0, 0.5, −4.0, 2.1, −0.7, 0.9, −1.5, 1.8, 0.3.
   - Sorted worst two: −4.0, −3.0. Position = 0.05 × (10 − 1) = 0.45.
   - Quantile = −4.0 + 0.45 × 1.0 = −3.55 → 95% VaR = 3.55%.
   - ES at 95% with this tiny sample is essentially the worst value, 4.0%; stress that 10 points are far too few.

## Questions to ask students
- If 99% one-day VaR is 1,000,000, how many days a year (252) do you expect to lose more? (About 2.5 days)
- Why is ES always at least as large as VaR at the same confidence? (It averages losses beyond the VaR threshold)
- Our historical VaR is higher than parametric VaR. What does that tell you about the data? (Fat tails: big losses more frequent than normal)
- When would Monte Carlo VaR beat parametric VaR? (Non-linear positions like options or non-normal models)
- What assumption breaks the √T rule? (Autocorrelation or volatility clustering)

## Analogies
- VaR is the height of a flood wall built for a "1-in-100-day" flood; ES is the average depth of water when the wall is overtopped.
- Historical VaR is driving using only the rear-view mirror: accurate about the road you have travelled, blind to curves you have not seen.
- Parametric VaR is a ready-made suit in a standard size: quick and cheap, but it fits fat-tailed portfolios badly.

## Recording tips
- Plot a histogram of `r` with the normal density overlaid and mark both VaR lines; the fat tail beyond the normal line makes the comparison instant.
- Pause on the sign convention: write `-(mu - z*sigma)*V` slowly and explain each minus.
- Show `np.quantile(r, 0.05, method="lower")` vs the default to demonstrate interpolation differences.
