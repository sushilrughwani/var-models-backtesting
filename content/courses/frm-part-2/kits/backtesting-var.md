---
title: "Backtesting VaR"
duration: 26
---

## Lecture outline
- 00:00 - Hook: a weather forecaster says 1% chance of rain, and it rains seven times in a year. Fire the forecaster?
- 03:00 - Exceptions, clean versus actual P&L, coverage and independence
- 06:00 - The binomial z-test for unconditional coverage
- 09:00 - Kupiec's likelihood-ratio test
- 13:00 - Whiteboard: 7 exceptions in 250 days, z-test and LR
- 17:00 - Type I and Type II errors; why 99% backtests have low power
- 20:00 - Christoffersen independence and conditional coverage
- 23:00 - Basel traffic light, capital multiplier, traps and recap

## Slides
### Slide 1: Backtesting VaR
- Does the model's VaR match reality?
- Count exceptions; check their timing
- Regulatory consequences through the traffic light

### Slide 2: Exceptions
- Exception: loss larger than the previous day's VaR
- Use clean (hypothetical) P&L for a fair test
- Correct 99% model: about 1% exception rate, randomly spaced

### Slide 3: The z-Test
- N ~ Binomial(T, p): mean pT, variance p(1 − p)T
- z = (N − pT)/√(p(1 − p)T)
- Reject if |z| > 1.96 at 95%

### Slide 4: Kupiec's LR Test
- Compares likelihood at p with likelihood at N/T
- LR_uc ~ χ² with 1 degree of freedom
- Reject if LR_uc > 3.84

### Slide 5: Type I versus Type II
- Type I: reject a good model
- Type II: accept a bad model
- Higher confidence level means fewer exceptions and lower power

### Slide 6: Clustering Matters
- Right count, wrong timing still fails
- Clusters signal slow reaction to volatility
- Typical culprit: equal-weight historical simulation

### Slide 7: Christoffersen Tests
- Compare exception probability after quiet days and after exception days
- LR_ind ~ χ²(1), critical value 3.84
- LR_cc = LR_uc + LR_ind ~ χ²(2), critical value 5.99

### Slide 8: Basel Traffic Light
- 99% one-day VaR, last 250 days
- Green 0-4 (3.00), yellow 5-9 (3.40 to 3.85), red 10+ (4.00)
- Yellow exceptions may be excused for bad luck events

### Slide 9: Market Risk Capital
- Capital = max(VaR yesterday, k × average VaR over 60 days)
- k from the traffic light
- Multiplier applies to the average, not yesterday's VaR

### Slide 10: Exam Traps
- p(1 − p) in the denominator
- Too few exceptions also rejects
- χ²(2) critical value for the joint test

### Slide 11: Recap
- Coverage and independence are separate tests
- Know the zones and multipliers cold
- Next: mapping real portfolios onto risk factors

## Whiteboard examples
**Example 1: 99% VaR, 250 days, 7 exceptions.**
- Expected = 2.5; sd = √2.475 = 1.5732; z = 4.5/1.5732 = 2.86 > 1.96, reject.
- Kupiec: ln L(p) = 243 ln 0.99 + 7 ln 0.01 = −34.678; ln L(p̂) = 243 ln 0.972 + 7 ln 0.028 = −31.930; LR = 5.50 > 3.84, reject.
- Basel: yellow zone, k = 3.65. With 60-day average VaR USD 20m and yesterday's VaR USD 25m, capital = max(25, 73) = USD 73m.

**Example 2: 95% VaR, 500 days, 36 exceptions.**
- Expected = 25; sd = √(500 × 0.05 × 0.95) = √23.75 = 4.873.
- z = 11/4.873 = 2.26 > 1.96, reject. Point out that 95% backtests have far more exceptions to work with.

**Example 3: Clustering.** Write a 20-day exception string 00000000000000011100. Count: 3 exceptions, but two follow an exception day. Ask whether π₁ (2 of 3) looks like π₀ (1 of 16). It does not, so independence fails even though coverage looks fine for a 95% model.

## Questions to ask students
- How many exceptions does a correct 99% model expect in 250 days? (2.5.)
- Is zero exceptions in 250 days good news? (Not necessarily; it may indicate an overly conservative model, though Basel puts it in green.)
- What is the critical value for the conditional coverage test at 95%? (5.99, chi-squared with two degrees of freedom.)
- Which error is regulators' main worry? (Type II: accepting a model that understates risk.)
- Why might a bank backtest a 95% VaR as well as a 99% VaR? (More exceptions give the test more power.)

## Analogies
- A VaR model is a weather forecaster: one wrong call proves nothing, but seven "1% rain" days with rain in a year is damning.
- Independence is about buses: the average arrival rate can be right while three still turn up together.
- The traffic light is a probation system: green is a clean record, yellow is a warning with a fine, red is a licence review.

## Recording tips
- Put the traffic-light table on screen and leave it there during the capital example.
- Show the log-likelihood arithmetic one term at a time; students lose track of signs in the LR formula.
- Stress that coverage and independence answer different questions; draw two exception timelines with the same count.
