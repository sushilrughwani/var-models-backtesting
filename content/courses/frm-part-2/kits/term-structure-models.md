---
title: "Term Structure Models of Interest Rates"
duration: 28
---

## Lecture outline
- 00:00 - Hook: how do you price a callable bond when you do not know where rates will be in five years?
- 03:00 - Short-rate models: drift plus volatility, and how a binomial tree encodes them
- 07:00 - Model 1 (no drift): tree step, normal rates, negative-rate problem
- 10:00 - Model 2 and Ho-Lee: drift as expectations plus risk premium; fitting today's curve
- 14:00 - Whiteboard 1: monthly tree for Model 1 and Model 2
- 17:00 - Vasicek: mean reversion, expected rate, half-life; Whiteboard 2
- 22:00 - Volatility choices: time-dependent, CIR, lognormal
- 25:00 - Convexity effect, traps and recap

## Slides
### Slide 1: Term Structure Models of Interest Rates
- Model the short rate; derive the whole curve
- Two levers: drift and volatility
- Applications: callable bonds, caps, swaptions

### Slide 2: The Binomial Short-Rate Tree
- Each step: rate + drift × dt ± σ√dt
- Probability one-half on each branch
- Discount along every path to price bonds

### Slide 3: Model 1 - No Drift
- dr = σ dw
- Normally distributed rates; can go negative
- Implied curve bends down at long maturities

### Slide 4: Model 2 and Ho-Lee
- dr = λ dt + σ dw
- λ = expected rate change + risk premium
- Ho-Lee: λ(t) varies by period to fit today's curve exactly

### Slide 5: Vasicek - Mean Reversion
- dr = k(θ − r) dt + σ dw
- Below θ: positive drift; above θ: negative drift
- Long yields less volatile than short yields

### Slide 6: Vasicek Formulas
- E[r_T] = θ + (r₀ − θ)e^(−kT)
- Half-life = ln 2 / k
- k = 0.10 gives a half-life of 6.93 years

### Slide 7: Volatility Specifications
- Normal: basis-point vol constant
- Time-dependent σ(t): fit cap volatilities
- CIR: σ√r; lognormal: vol proportional to r; both avoid negative rates

### Slide 8: The Convexity Effect
- Convex prices: uncertainty lowers yields
- Model 1: yield reduction = σ²T²/6
- 1.2% vol: 24 bp at 10 years, 216 bp at 30 years

### Slide 9: Choosing a Model
- Arbitrage-free fit (Ho-Lee) versus realistic dynamics (Vasicek)
- Non-negativity matters when rates are low
- Calibrate drift to the curve, volatility to options

### Slide 10: Traps and Takeaways
- σ√dt for the shock, dt for the drift
- Half-life is ln 2 / k, not k
- Convexity grows with T squared

## Whiteboard examples
**Example 1 - Model 1 and Model 2 trees.** r₀ = 5%, σ = 1.2%, dt = 1/12.
- Shock = 0.012 × √(1/12) = 0.3464%.
- Model 1: up 5.3464%, down 4.6536%.
- Model 2 with λ = 0.24%: drift per step = 0.02%. Up 5.3664%, down 4.6736%.
- Second step of Model 1: 5.6928%, 5.0000%, 4.3072% (recombining).

**Example 2 - Vasicek.** r₀ = 4%, θ = 6%, k = 0.10, σ = 1%, dt = 1/12.
- Drift per step = 0.10 × 2% / 12 = 0.0167%; shock = 0.2887%.
- Up 4.3053%, down 3.7280%.
- Expected rate: 1 year 4.1903%, 5 years 4.7869%, 10 years 5.2642%.
- Half-life = 0.6931 / 0.10 = 6.93 years.

**Example 3 - Convexity.** σ = 1.2%.
- T = 5: 0.012² × 25 / 6 = 6 bp. T = 10: 24 bp. T = 30: 216 bp.

## Questions to ask students
- In Model 1, if the short rate is 0.5% and σ√dt is 0.6%, what happens at the down node? (It goes negative, to −0.1%.)
- What two components make up the drift in Model 2? (Expected change in rates and a risk premium.)
- Vasicek with k = 0.35: what is the half-life? (0.693 / 0.35 ≈ 1.98 years.)
- Why does CIR keep rates non-negative? (Volatility σ√r shrinks to zero as r approaches zero, while the drift stays positive.)
- Does doubling volatility double the convexity effect? (No, it quadruples it, since it depends on σ².)

## Analogies
- Mean reversion is a dog on a leash: it wanders, but the further it goes from its owner (θ), the harder the leash pulls.
- The drift is the river current and the volatility is the wind: a boat's path depends on both.
- Convexity is like an asymmetric bet: you gain more from a rate fall than you lose from an equal rise, so uncertainty is worth something to the bondholder.

## Recording tips
- Draw the tree once and re-use it, changing only the drift, so students see each model as one modification of the previous one.
- Pause on √dt: many errors come from scaling the shock by dt.
- Show the convexity numbers for 5, 10 and 30 years together to make the T² effect memorable.
