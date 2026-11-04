---
title: "Simulation and Bootstrapping"
duration: 22
---

## Lecture outline
- 00:00 - Hook: estimating pi by throwing darts at a square; the idea behind Monte Carlo
- 02:00 - Why simulate in risk management; Monte Carlo steps; seeds and pseudo-random numbers
- 05:00 - Standard error, confidence intervals and the square-root law
- 09:00 - Antithetic variates
- 11:00 - Control variates
- 14:00 - The i.i.d. and circular block bootstrap
- 17:00 - Monte Carlo versus bootstrap: strengths and limitations
- 19:00 - Whiteboard example, exam traps and recap

## Slides
### Slide 1: Simulation and Bootstrapping
- When formulas run out, simulate
- Used for exotic pricing, Monte Carlo VaR and small-sample inference
- Two families: model-based (Monte Carlo) and data-based (bootstrap)

### Slide 2: Monte Carlo Steps
- Specify the data-generating process
- Draw random inputs, compute the outcome
- Repeat b times and average
- Fix the seed for reproducibility

### Slide 3: Accuracy of the Estimate
- SE = s / √b
- 95% CI: estimate ± 1.96 × SE
- Halving the error needs four times the replications

### Slide 4: How Many Paths?
- b = (s / target SE)²
- Cost grows with the square of the accuracy you want
- Motivation for variance reduction

### Slide 5: Antithetic Variates
- Pair each draw z with -z
- Variance = σ²(1 + ρ)/b
- Works only when paired outcomes are negatively correlated

### Slide 6: Control Variates
- Simulate a related quantity X with known mean
- Adjusted estimate: mean of g - β(mean of X - true mean of X)
- Variance shrinks by the factor 1 - ρ²

### Slide 7: The Bootstrap
- Resample the historical data with replacement
- Recompute the statistic in each pseudo-sample
- No distributional assumption needed

### Slide 8: Block Bootstrap
- i.i.d. resampling destroys volatility clustering
- Circular block bootstrap resamples contiguous blocks
- Preserves short-run dependence

### Slide 9: Monte Carlo vs Bootstrap
- Monte Carlo: can create unseen scenarios; exposed to model risk
- Bootstrap: real fat tails; cannot exceed historical extremes
- Both fail if inputs are unrepresentative

### Slide 10: Recap
- SE = s/√b, variance reduction, bootstrap types
- Know the limitations of each
- Next: machine learning methods

## Whiteboard examples
**Example 1: Exotic option.** b = 10,000, mean 8.40, s = 12.0.
- SE = 12/100 = 0.12. CI: 8.40 ± 0.2352 = [8.165, 8.635].
- Target SE = 0.05: b = (12/0.05)² = 57,600.
- Antithetic with ρ = -0.6: SE × √0.4 = 0.12 × 0.632 = 0.076.

**Example 2: Scaling replications.** b = 2,500, s = 20: SE = 0.40, 95% half-width 0.784. To cut SE to 0.10 (a factor of 4), b must rise by 16 to 40,000.

**Example 3: Bootstrap by hand.** Sample of returns: -3%, 1%, 2%, 4%. Draw indices (with replacement) 2, 2, 4, 1: pseudo-sample 1%, 1%, 4%, -3%, mean 0.75%. Repeat thousands of times; the spread of the means estimates the standard error of the mean.

## Questions to ask students
- If you double the number of paths, by how much does the standard error fall? (By the factor 1/√2, about 29%.)
- When would antithetic variates fail to help? (When the outcome is not monotonic in the draw, e.g. a straddle payoff, so the pairs are not negatively correlated.)
- What property makes a good control variate? (High correlation with the target and a known true mean.)
- Can a historical bootstrap generate a loss worse than the worst day in the sample? (No.)
- Why use a block bootstrap for daily returns? (To preserve volatility clustering and autocorrelation.)

## Analogies
- Monte Carlo: tasting a soup many spoonfuls at a time; the more spoonfuls, the better your estimate, but each extra digit of precision costs a hundred times more spoons.
- Antithetic variates: hiring an optimist and a pessimist so their average forecast is steadier.
- Bootstrap: reshuffling a deck of the cards history dealt you; you get new hands, but never a card that was not in the deck.

## Recording tips
- Show a live simulation (spreadsheet or Python) where the estimate settles as paths increase; overlay the ± 1.96 SE band.
- Stress the square-root law with a table: 100, 400, 1,600, 6,400 paths and the halving errors.
- Contrast Monte Carlo and bootstrap limitations side by side on one slide; it is a favourite conceptual exam question.
