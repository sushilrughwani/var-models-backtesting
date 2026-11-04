---
title: "The Black-Scholes-Merton Model"
duration: 30
---

## Lecture outline
- 00:00 - Hook: in the last lesson we added steps to a tree. What happens with infinitely many steps? A Nobel-winning formula.
- 03:00 - Assumptions and the lognormal distribution.
- 07:00 - The formula, term by term: "what you get minus what you pay".
- 11:00 - Whiteboard 1: price the 95-strike call and put step by step.
- 18:00 - Put-call parity check; interpretation of N(d1) and N(d2).
- 20:00 - Dividends: continuous yield and discrete dividends; Whiteboard 2.
- 25:00 - Implied volatility, the smile and what it says about the model.
- 28:00 - Recap and traps.

## Slides
### Slide 1: The Black-Scholes-Merton Model
- The limit of the binomial tree
- Closed-form prices for European options
- Dividends and implied volatility

### Slide 2: Assumptions
- Geometric Brownian motion: lognormal prices
- Constant σ and r
- Frictionless, continuous trading; no arbitrage
- European exercise; no dividends in the base case

### Slide 3: The Lognormal Distribution
- ln S_T is normal
- Mean ln S0 + (μ − σ²/2)T, variance σ²T
- In pricing, μ is replaced by r

### Slide 4: The Formula
- c = S0 N(d1) − K e^(−rT) N(d2)
- p = K e^(−rT) N(−d2) − S0 N(−d1)
- d1 = [ln(S0/K) + (r + σ²/2)T] / (σ√T); d2 = d1 − σ√T

### Slide 5: Reading the Formula
- N(d2): risk-neutral probability of exercise
- K e^(−rT) N(d2): PV of expected strike payment
- S0 N(d1): PV of stock received on exercise
- N(d1): the call's delta

### Slide 6: Put-Call Parity
- c − p = S0 − K e^(−rT)
- Check every BSM answer with it
- Get the put from the call in one line

### Slide 7: Continuous Dividend Yield
- Replace S0 with S0 e^(−qT)
- d1 uses r − q
- Indices (q = dividend yield), currencies (q = foreign rate)

### Slide 8: Discrete Dividends
- Subtract PV of dividends before expiry from S0
- Calls fall, puts rise
- American calls: Black's approximation

### Slide 9: Implied Volatility
- The σ that matches the market price
- Found by iteration
- Market convention: quote options in vol

### Slide 10: The Volatility Smile
- Implied vol varies by strike
- Equity skew: low strikes carry higher vol
- Evidence of fat tails and crash risk

### Slide 11: Recap
- Five inputs, one unobservable (σ)
- Price, check parity, adjust for dividends
- Implied vol is how the market speaks

## Whiteboard examples
**Example 1 - no dividends.** S0 = 100, K = 95, r = 4%, σ = 25%, T = 0.75.
- ln(100/95) = 0.051293; (0.04 + 0.03125) × 0.75 = 0.053438; σ√T = 0.216506
- d1 = 0.104731 / 0.216506 = 0.48373; d2 = 0.26722
- N(d1) = 0.68571; N(d2) = 0.60535; K e^(−rT) = 92.1923
- c = 68.5712 − 55.8086 = **12.76**
- p = 12.7624 − 100 + 92.1923 = **4.95**

**Example 2 - 2% dividend yield, same inputs.**
- d1 = [0.051293 + (0.04 − 0.02 + 0.03125) × 0.75] / 0.216506 = 0.089731 / 0.216506 = 0.41445; d2 = 0.19794
- N(d1) = 0.66073; N(d2) = 0.57845; S0 e^(−qT) = 98.5112
- c ≈ 98.5112 × 0.66073 − 92.1923 × 0.57845 = **11.76**; p = **5.44**

**Example 3 - discrete dividend.** S0 = 40, K = 42, r = 5%, σ = 30%, T = 0.5, dividend 0.80 in 3 months.
- Adjusted S0 = 40 − 0.80 e^(−0.05 × 0.25) = 39.2099
- Plug into BSM: call ≈ **2.58** (versus 2.96 with no dividend)

## Questions to ask students
- Which BSM input is not directly observable? (Volatility.)
- What does N(d2) represent? (The risk-neutral probability that the call finishes in the money.)
- If dividends rise, what happens to call and put values? (Calls fall, puts rise.)
- A call trades above its BSM price at 20% volatility. Is implied vol above or below 20%? (Above.)
- Why might implied vol be higher for low-strike equity puts? (Markets price crash risk and fat left tails.)

## Analogies
- The BSM formula is a receipt: you receive the stock (worth S0 N(d1)) and pay the strike (worth K e^(−rT) N(d2)); the call is the difference.
- Implied volatility is like the yield on a bond: a single number that translates a price into a comparable quote.
- The smile is the model's "check engine" light: the market is telling you an assumption is wrong.

## Recording tips
- Show a calculator or spreadsheet computing N(d1) live; students worry most about the normal table step.
- Always finish a call calculation with a parity check on screen.
- Draw the lognormal distribution next to a normal one to explain why prices cannot go negative.
