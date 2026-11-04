---
title: "Measures of Financial Risk"
duration: 28
---

## Lecture outline
- 00:00 - Hook: two funds, both 10% volatility. One sells deep out-of-the-money puts. Which would you rather own?
- 03:00 - Why mean-variance fails: fat tails, skew, symmetric penalty on upside
- 06:00 - VaR definition, normal VaR formula, role of the mean
- 10:00 - Expected shortfall: what VaR ignores, normal ES multiplier
- 14:00 - Whiteboard 1: USD 50m portfolio, VaR and ES at 99%
- 18:00 - Coherence: the four properties explained with everyday examples
- 21:00 - Whiteboard 2: two-bond example where VaR fails subadditivity
- 25:00 - Spectral risk measures and the weighting picture; recap and traps

## Slides
### Slide 1: Measures of Financial Risk
- What does "risk" mean for a risk manager?
- From standard deviation to tail-focused measures
- VaR, expected shortfall, coherence, spectral measures

### Slide 2: Limits of Standard Deviation
- Fully describes risk only for normal / elliptical returns
- Real returns: fat tails, skew, crisis clustering
- Treats upside surprises as risk, same as losses

### Slide 3: Value at Risk
- Loss not exceeded with confidence c over horizon T
- A quantile of the loss distribution
- Normal: VaR = V(zσ − μ); z = 1.645 (95%), 2.326 (99%)

### Slide 4: What VaR Does Not Tell You
- Silent on the size of losses beyond the threshold
- Two books with equal VaR can have very different tails
- Encourages "tail stuffing": hiding risk past the quantile

### Slide 5: Expected Shortfall
- Average loss given loss exceeds VaR
- Normal: ES = V(σ·φ(z)/(1 − c) − μ)
- 99% ES multiplier ≈ 2.667 versus 2.326 for VaR

### Slide 6: Coherent Risk Measures
- Monotonicity: worse portfolio, higher risk
- Translation invariance: add cash k, risk falls by k
- Positive homogeneity: double the position, double the risk
- Subadditivity: ρ(X + Y) ≤ ρ(X) + ρ(Y)

### Slide 7: VaR and Subadditivity
- VaR is subadditive under normality
- Can fail for lumpy distributions: loans, short options
- ES is always subadditive

### Slide 8: Two-Bond Counterexample
- Each bond: lose 100 with 4% probability
- Alone: 95% VaR = 0; together: 95% VaR = 100
- ES: 80 each, 103.2 combined (subadditive)

### Slide 9: Spectral Risk Measures
- Weighted average of loss quantiles
- VaR: all weight on one point; ES: flat weight over the tail
- Coherent if weights are non-decreasing in loss size

### Slide 10: Exam Traps
- Mean: subtract it only when given and not told to ignore it
- ES multiplier is φ(z)/(1 − c), not z
- VaR is a threshold, not the maximum loss

### Slide 11: Recap
- SD → VaR → ES → spectral: increasing focus on the tail
- ES is coherent; VaR is not in general
- Next: how to actually compute VaR for real portfolios

## Whiteboard examples
**Example 1: Normal VaR and ES.** Portfolio USD 50m, daily mean 0.05%, daily volatility 1.2%, 99% confidence.
- VaR = (2.326 × 0.012 − 0.0005) × 50m = 0.027412 × 50m = USD 1,370,600.
- φ(2.326) = 0.026674, so the ES factor = 0.026674 / 0.01 = 2.6674.
- ES = (0.012 × 2.6674 − 0.0005) × 50m = 0.031508 × 50m ≈ USD 1,575,400.
- ES / VaR ≈ 1.15.

**Example 2: Subadditivity failure.** Two independent bonds, each loses 100 with probability 4%.
- Alone: P(loss) = 4% < 5%, so 95% VaR = 0. Sum of VaRs = 0.
- Together: P(both) = 0.16% (loss 200), P(exactly one) = 7.68% (loss 100), P(no loss) = 92.16%.
- P(loss ≥ 100) = 7.84% > 5%, so portfolio 95% VaR = 100 > 0.
- ES alone = (4% × 100 + 1% × 0) / 5% = 80. ES together = (0.16% × 200 + 4.84% × 100) / 5% = 103.2 ≤ 160.

## Questions to ask students
- If returns were exactly normal, would ES tell you anything VaR does not? (Not new information, since both are multiples of σ, but ES is still larger and coherent.)
- A desk adds USD 10m of cash to its portfolio. What happens to a coherent risk measure? (It falls by exactly USD 10m: translation invariance.)
- Why is the two-bond example so relevant to banks? (Loan books have lumpy default-or-not losses, exactly where VaR can penalise diversification.)
- Which spectral weighting corresponds to ES? (Flat weight on all quantiles beyond c, zero below.)
- Is a 99% VaR of USD 1m the largest loss you can suffer? (No; on about 1 day in 100 the loss exceeds it, by an unknown amount.)

## Analogies
- VaR is the height of the flood wall: it tells you how high the water usually stays, not how deep the flood is when it overtops. ES is the average flood depth on the days the wall fails.
- Subadditivity is the "two umbrellas" rule: merging two businesses should never make the combined firm riskier than the two separately.
- Spectral weights are like a pessimist's grading scheme: the worse the outcome, the more marks it carries.

## Recording tips
- Draw the loss distribution with a shaded right tail (losses as positive) and mark VaR as a vertical line and ES as the centre of mass of the shaded region.
- Slow down on the two-bond example; build the probability table row by row on screen.
- Be explicit about sign conventions: losses positive, so VaR = zσ − μ.
