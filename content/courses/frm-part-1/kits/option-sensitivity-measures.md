---
title: "Option Sensitivity Measures: The Greeks"
duration: 28
---

## Lecture outline
- 00:00 - Hook: you just sold 10,000 calls to a client. The stock jumps 5%. What do you do, and what should you have done already?
- 03:00 - Delta: formula, ranges, delta-neutral hedging and rebalancing.
- 07:00 - Gamma: curvature, where it peaks, delta-gamma approximation.
- 11:00 - Vega, theta and rho; the gamma-theta trade-off.
- 15:00 - Whiteboard 1: all five Greeks for the 95-strike call.
- 20:00 - Whiteboard 2: delta-gamma approximation for a 3-point move.
- 22:00 - Delta-gamma hedging: options first, stock second; Whiteboard 3.
- 26:00 - Recap and traps.

## Slides
### Slide 1: Option Sensitivity Measures: The Greeks
- How option value responds to each input
- Delta, gamma, vega, theta, rho
- Building delta- and gamma-neutral hedges

### Slide 2: Delta
- Call: N(d1), between 0 and 1
- Put: N(d1) − 1, between −1 and 0
- Hedge: hold −delta shares per option

### Slide 3: Dynamic Hedging
- Delta changes as the stock moves
- Rebalance to stay neutral
- Rebalancing cost depends on gamma

### Slide 4: Gamma
- Γ = N'(d1) / (S0 σ √T)
- Same for calls and puts
- Peaks at the money near expiry

### Slide 5: Delta-Gamma Approximation
- ΔV ≈ Δ ΔS + ½ Γ ΔS²
- Same idea as duration plus convexity
- Long options: positive gamma helps on big moves

### Slide 6: Vega
- V = S0 √T N'(d1)
- Positive for long calls and puts
- Largest at the money and for long maturities

### Slide 7: Theta
- Usually negative for long options: time decay
- Per year; divide by 365 for per day
- Θ + ½σ²S²Γ = rΠ for a delta-neutral book

### Slide 8: Rho
- Call: K T e^(−rT) N(d2), positive
- Put: negative
- Minor for short-dated equity options

### Slide 9: Delta-Gamma Hedging
- Step 1: trade options to zero gamma
- Step 2: trade stock to zero the new delta
- Stock has delta 1 and gamma 0

### Slide 10: Exam Traps
- Fixing delta before gamma
- Wrong put delta
- Unit mistakes for vega and theta

### Slide 11: Recap
- Greeks = derivatives of value
- Gamma and theta are two sides of one coin
- Options for gamma, stock for delta

## Whiteboard examples
**Example 1 - Greeks of one call.** S0 = 100, K = 95, r = 4%, σ = 25%, T = 0.75. From BSM: d1 = 0.48373, N(d1) = 0.68571, N(d2) = 0.60535, N'(d1) = 0.354894.
- Delta = **0.68571**; put delta = −0.31429
- Gamma = 0.354894 / (100 × 0.25 × 0.866025) = **0.016392**
- Vega = 100 × 0.866025 × 0.354894 = **30.7347** (0.31 per vol point)
- Theta = −5.1225 − 2.2323 = **−7.3548** per year (−0.0202 per day)
- Rho = 95 × 0.75 × e^(−0.03) × 0.60535 = **41.8566** (0.42 per 1%)

**Example 2 - delta-gamma approximation.** Stock rises 3.
- Delta only: 0.68571 × 3 = 2.0571
- Gamma term: 0.5 × 0.016392 × 9 = 0.0738
- Estimate **2.1309** versus full repricing 2.1285

**Example 3 - delta-gamma hedge.** Book delta +1,200, gamma −500. Traded option: delta 0.60, gamma 0.04.
- Buy 500 / 0.04 = **12,500 options**
- New delta: 1,200 + 12,500 × 0.60 = 8,700
- Sell **8,700 shares**

## Questions to ask students
- A call has delta 0.62. What is the delta of the matching put on a non-dividend stock? (−0.38.)
- Why can't you fix gamma with the stock? (The stock's gamma is zero.)
- Which option has more gamma: at the money with one week left, or at the money with one year left? (One week left.)
- A delta-neutral trader is long gamma. What does she hope for? (Large stock moves; quiet markets cost her theta.)
- You are short 1,000 calls with delta 0.5. How many shares do you buy to be delta-neutral? (500.)

## Analogies
- Delta is your car's speed, gamma is the acceleration: knowing only speed is fine for short distances, but on curves you need acceleration too.
- Theta is rent on an insurance policy: long options pay rent every day for protection against big moves (gamma).
- Delta-gamma hedging is tuning a guitar: tighten the string that affects two notes first, then adjust the one that affects only one note.

## Recording tips
- Show charts of delta and gamma against the stock price for short and long maturities; the shapes stick.
- Insist on the order "gamma first, delta second" and repeat it at the end.
- Write units next to every Greek (per 1.00 of vol, per year) to prevent the most common marking errors.
