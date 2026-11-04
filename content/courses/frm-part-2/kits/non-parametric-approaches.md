---
title: "Non-Parametric Approaches"
duration: 24
---

## Lecture outline
- 00:00 - Hook: VaR fell 20% overnight and nothing happened in the market. A crisis day simply dropped out of the window.
- 02:00 - Limits of equal-weight HS: no precision measure, ghost effects, stale volatility
- 05:00 - Bootstrapping: resampling with replacement and confidence intervals
- 08:00 - Age-weighted HS: the weight formula and cumulative-weight VaR
- 12:00 - Whiteboard: λ = 0.98, 250 days, seven largest losses
- 16:00 - Volatility-weighted and correlation-weighted HS
- 19:00 - Filtered historical simulation step by step
- 22:00 - Strengths, weaknesses, traps and recap

## Slides
### Slide 1: Non-Parametric Approaches
- Keep the data-driven tail of historical simulation
- Fix its precision, weighting and volatility problems
- Bootstrap, age weights, volatility weights, filtered HS

### Slide 2: What Is Wrong with Plain HS
- Every day weighted 1/n, older days weighted zero
- Ghost effects when big days leave the window
- Ignores whether today is calm or turbulent

### Slide 3: Bootstrapping
- Resample n observations with replacement, many times
- Compute VaR or ES in each resample
- Average = estimate; percentiles = confidence interval

### Slide 4: Age-Weighted HS
- w(i) = λ^(i−1)(1 − λ)/(1 − λ^n)
- Newest observation gets the largest weight
- λ → 1 recovers equal weights

### Slide 5: Reading VaR from Weights
- Sort losses from largest to smallest
- Accumulate weights
- VaR where cumulative weight first reaches 1 − α

### Slide 6: Volatility-Weighted HS
- r* = r × σ_today/σ_then
- Calm-period losses scaled up in turbulent markets
- VaR can exceed the worst historical loss

### Slide 7: Correlation Weighting
- Adjust past returns so their correlations match today's
- Extends volatility weighting to the full covariance matrix
- Useful when correlations spike in stress

### Slide 8: Filtered Historical Simulation
- Fit GARCH; compute standardised residuals
- Bootstrap residuals; rescale by current volatility
- Build multi-day paths; read VaR and ES

### Slide 9: Strengths and Weaknesses
- No distribution assumed; fat tails and skew captured
- Hostage to the sample: cannot invent unseen crises
- FHS adds model risk from the GARCH fit

### Slide 10: Exam Traps
- Exponent i − 1, not i
- Normalise by 1 − λ^n
- Scale by current over past volatility

### Slide 11: Recap
- Bootstrapping measures precision
- Weighting makes HS responsive to current conditions
- Next: checking whether any of these VaR models actually work

## Whiteboard examples
**Example 1: Age-weighted VaR.** λ = 0.98, n = 250, 95% confidence. Normaliser 1 − 0.98^250 = 0.99359.
- Weights: loss 6.0% (age 120) 0.00182; 5.2% (age 5) 0.01857; 4.8% (age 180) 0.00054; 4.1% (age 2) 0.01973; 3.9% (age 60) 0.00611; 3.6% (age 10) 0.01678.
- Cumulative: 0.00182, 0.02038, 0.02093, 0.04065, 0.04676, 0.06355.
- First exceeds 0.05 at 3.6%, so VaR = 3.6%. Equal-weight would need about 13 observations, so the VaR would be lower.

**Example 2: Age weight with different inputs.** λ = 0.96, n = 100, observation 3 days old.
- w(3) = 0.96² × 0.04/(1 − 0.96^100) = 0.036864/0.98313 = 0.0375, or 3.75%, versus 1% under equal weights.

**Example 3: Volatility weighting.** Past return −2.4% when σ was 1.2%; today σ = 1.8%. Scaled scenario = −2.4% × 1.5 = −3.6%. A past gain of 0.9% becomes 1.35%.

## Questions to ask students
- What happens to age weights as λ approaches 1? (They converge to 1/n, which is plain HS.)
- Can age-weighted HS produce a VaR larger than the largest historical loss? (No; it only reweights existing observations.)
- Can volatility-weighted HS? (Yes, if current volatility exceeds the volatility on the worst day.)
- What assumption does a plain bootstrap make? (Observations are independent and identically distributed.)
- Why does FHS bootstrap residuals instead of raw returns? (Residuals are closer to i.i.d., so resampling is valid, while GARCH restores clustering.)

## Analogies
- Age weighting is memory: yesterday's argument stings more than one from last year, but last year's has not vanished.
- Volatility weighting is converting old prices for inflation: a past move is restated in today's volatility units.
- The bootstrap is reshuffling a deck of cards thousands of times to see how much the hand you drew depended on luck.

## Recording tips
- Build the cumulative-weight table live, row by row; students learn the procedure from watching it fill.
- Emphasise the λ^(i−1) exponent with a single number check: the newest day uses λ^0.
- Show a chart of plain HS VaR with a visible ghost-effect jump, then the smoother age-weighted line.
