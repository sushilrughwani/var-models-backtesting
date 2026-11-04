---
title: "Portfolio Mathematics"
duration: 24
---

## Lecture outline
- 00:00 - Hook: combine two risky assets and get a portfolio less risky than either average. Free lunch?
- 02:00 - Portfolio expected return as a weighted average
- 04:00 - Covariance and correlation from a joint probability table
- 08:00 - Two-asset portfolio variance, term by term
- 12:00 - Whiteboard: 60/40 portfolio risk and return
- 15:00 - Diversification: the role of correlation, from +1 to −1
- 18:00 - Shortfall risk and Roy's safety-first ratio
- 21:00 - Exam traps and recap

## Slides
### Slide 1: The only free lunch
- Return adds up linearly; risk does not
- Correlation is the lever
- Today: the maths behind diversification

### Slide 2: Expected portfolio return
- E(Rp) = Σ wi E(Ri)
- Weights sum to 1
- No interaction terms

### Slide 3: Covariance from a joint table
- Cov = Σ P(s)[RA,s − E(RA)][RB,s − E(RB)]
- Positive: assets above or below their means together
- Units are %², hard to interpret

### Slide 4: Correlation
- ρ = Cov / (σA σB), between −1 and +1
- Cov = ρ σA σB in most exam questions
- Linear co-movement only

### Slide 5: Two-asset variance
- σp² = wA²σA² + wB²σB² + 2wAwBρσAσB
- Squared weights on own risks
- Factor 2 on the interaction term

### Slide 6: Many assets
- σp² = Σi Σj wi wj Cov(i, j)
- n variances, n(n − 1) covariance terms
- In big portfolios, covariances dominate

### Slide 7: Correlation and diversification
- ρ = +1: σp = weighted average σ (no benefit)
- ρ < +1: σp below the weighted average
- ρ = −1: a zero-risk combination exists

### Slide 8: Worked example results
- E(Rp) = 8.4%
- σp = 13.74% versus 16.0% weighted average
- Diversification saves 2.26 percentage points

### Slide 9: Safety-first
- Shortfall risk = P(Rp < RL)
- SFRatio = (E(Rp) − RL) / σp
- Choose the highest SFRatio; if RL = rf it is the Sharpe ratio

### Slide 10: Exam traps
- Weights not squared; missing the 2
- Mixing decimals and percents
- Lowest instead of highest SFRatio

## Whiteboard examples
**Example 1 - 60/40 portfolio.** A: E = 10%, σ = 20%; B: E = 6%, σ = 10%; ρ = 0.30; weights 60/40; threshold 3%.
- E(Rp) = 6.0 + 2.4 = 8.4%.
- Cov = 0.30 × 20 × 10 = 60.
- σp² = 0.36(400) + 0.16(100) + 2(0.6)(0.4)(60) = 144 + 16 + 28.8 = 188.8; σp = 13.74%.
- SFRatio = (8.4 − 3)/13.74 = 0.39.

**Example 2 - Covariance from a joint table.** Scenarios: P = 0.3 (RA = 20, RB = 10); P = 0.5 (RA = 10, RB = 6); P = 0.2 (RA = −10, RB = 2).
- E(RA) = 6 + 5 − 2 = 9%; E(RB) = 3 + 3 + 0.4 = 6.4%.
- Deviation products: 11 × 3.6 = 39.6; 1 × (−0.4) = −0.4; (−19) × (−4.4) = 83.6.
- Cov = 0.3(39.6) + 0.5(−0.4) + 0.2(83.6) = 11.88 − 0.20 + 16.72 = 28.4.
- σA = 10.44, σB = 2.80; ρ = 28.4/(10.44 × 2.80) = 0.97.

**Example 3 - Perfect negative correlation.** Same A and B as Example 1 but ρ = −1.
- Zero risk when wA σA = wB σB: wA = 10/(20 + 10) = 1/3, wB = 2/3.
- Check: (1/3)(20) − (2/3)(10) = 0. Expected return = 7.33% with zero risk.

## Questions to ask students
- Two assets have ρ = +1. Is there any diversification benefit? (No; portfolio σ equals the weighted average σ.)
- Does adding a low-correlation asset change expected return? (Only through the weights; correlation affects risk, not expected return.)
- In a 50-asset equally weighted portfolio, which matters more: individual variances or covariances? (Covariances; there are 2,450 of them versus 50 variances.)
- Portfolio X has E = 9%, σ = 12%; Portfolio Y has E = 7%, σ = 6%. Threshold 3%. Which minimises shortfall risk? (Y: SFR 0.67 versus 0.50.)
- If ρ = 0, what is the covariance term? (Zero; variance is just the two weighted own-risk terms.)

## Analogies
- An umbrella seller and a sunscreen seller: each has volatile sales, but together the business is steady because the weather pushes them in opposite directions.
- Correlation is the "how much do they move together" dial: at +1 they march in lockstep, at −1 they are on a seesaw.
- The safety-first ratio is a cushion measured in standard deviations: how many bad days you can absorb before hitting the floor.

## Recording tips
- Write the three variance terms on separate lines and label them; most mistakes are in the cross term.
- Animate or sketch σp against correlation for fixed weights to show the risk falling as ρ drops.
- Keep everything in percent throughout one example and say so explicitly.
