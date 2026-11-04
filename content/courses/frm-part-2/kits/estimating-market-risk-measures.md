---
title: "Estimating Market Risk Measures"
duration: 28
---

## Lecture outline
- 00:00 - Hook: two analysts report 99% VaR for the same book, USD 274k and USD 410k. Who is wrong? Possibly neither.
- 03:00 - Recap of VaR and ES from Part I; losses as positive numbers
- 06:00 - Historical simulation: order statistics, the tail count n(1 − α), conventions
- 10:00 - Normal VaR and ES with a non-zero mean
- 14:00 - Lognormal VaR and why it is bounded by position value
- 17:00 - Whiteboard: USD 10m portfolio, normal VaR, normal ES, lognormal VaR
- 21:00 - ES as an average of tail VaRs; coherence and subadditivity
- 25:00 - Precision of estimates, exam traps and recap

## Slides
### Slide 1: Estimating Market Risk Measures
- Part I defined VaR and ES; Part II estimates them
- Three engines: historical, normal, lognormal
- Plus: how far to trust the number

### Slide 2: Historical Simulation as Order Statistics
- Sort losses from largest to smallest
- Tail holds n(1 − α) observations
- VaR: first observation outside the tail (51st of 1,000 at 95%); ES: mean of the tail

### Slide 3: Normal VaR and ES
- VaR = −μ + σz
- ES = −μ + σφ(z)/(1 − α)
- Multipliers: 95% VaR 1.645, ES 2.063; 99% VaR 2.326, ES 2.665

### Slide 4: The Mean Matters
- Positive expected return shifts the distribution right
- Both VaR and ES fall by μ
- Ignore μ only when told to or for very short horizons

### Slide 5: Lognormal VaR
- VaR = P(1 − e^(μ − σz))
- Prices cannot go negative, so VaR is less than P
- Close to normal VaR for short horizons

### Slide 6: ES by Tail Slicing
- Split the tail into m equal probability slices
- Compute VaR at each slice and average
- Works for any distribution, including historical

### Slide 7: Coherent Risk Measures
- Monotonic, translation invariant, homogeneous, subadditive
- VaR can fail subadditivity
- ES is coherent

### Slide 8: Subadditivity Failure in Practice
- Two independent bonds, each 4% default probability
- Each alone: 95% VaR is zero
- Together: P(at least one default) = 7.84%, so 95% VaR is positive

### Slide 9: Precision of Estimates
- Quantile estimates have standard errors
- Errors grow with confidence level and shrink with sample size
- Report ranges when the tail sample is thin

### Slide 10: Exam Traps
- Subtract the mean
- φ(z)/(1 − α) for ES, not z
- Check the order-statistic convention

### Slide 11: Recap and What Comes Next
- Historical: order statistics; parametric: closed forms
- ES is the preferred, coherent measure
- Next: improving historical simulation with weights and bootstrapping

## Whiteboard examples
**Example 1: Normal and lognormal measures.** P = USD 10m, μ = 0.05% per day, σ = 1.2% per day, 99%.
- Normal VaR: 0.012 × 2.326 = 0.027912; minus 0.0005 = 0.027412; × 10m = USD 274,120.
- Normal ES: φ(2.326) = 0.026674; /0.01 = 2.6674; 0.012 × 2.6674 = 0.032009; minus 0.0005 = 0.031509; × 10m = USD 315,085.
- Lognormal VaR: e^(0.0005 − 0.027912) = e^(−0.027412) = 0.972960; 10m × 0.027040 = USD 270,397.

**Example 2: Historical VaR and ES.** 100 days, seven largest losses (USD 000): 820, 640, 515, 470, 455, 410, 388. At 95% the tail has 5 observations.
- VaR (6th largest) = USD 410k.
- ES = (820 + 640 + 515 + 470 + 455)/5 = USD 580k.

**Example 3: ES by slicing a standard normal.** VaRs at 95.5%, 96%, ..., 99.5% are 1.695, 1.751, 1.812, 1.881, 1.960, 2.054, 2.170, 2.326, 2.576. Average = 2.025 versus exact ES multiplier 2.063. More slices close the gap.

## Questions to ask students
- With 1,000 observations, which loss is the 99% VaR under the "first outside the tail" rule? (The 11th largest.)
- Does a higher expected return raise or lower VaR? (Lowers it, by μ.)
- Why can normal VaR exceed the position value but lognormal VaR cannot? (Normal returns are unbounded below; lognormal prices stay positive.)
- Which property of coherence does VaR violate? (Subadditivity.)
- Why is a 99.9% historical VaR from 250 days unreliable? (Fewer than one observation in the tail; huge standard error.)

## Analogies
- VaR is the height of the sea wall; ES is the average depth of the water when the wall is overtopped.
- Historical simulation is replaying old weather to test today's house: great if the old tapes include a hurricane, useless if they do not.
- Tail slicing is like measuring the average depth of a pool by taking readings at evenly spaced points along the deep end.

## Recording tips
- Put the normal VaR and ES multipliers in a small table on screen; students memorise tables faster than formulas.
- Slow down on the order-statistic convention and say explicitly that the exam will state the rule.
- Draw the subadditivity bond example on the board; it is the single most persuasive argument for ES.
