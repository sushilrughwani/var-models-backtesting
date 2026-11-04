---
title: "Multivariate Random Variables"
duration: 26
---

## Lecture outline
- 00:00 - Hook: two assets each with 20% volatility. Is the portfolio 20% volatile?
- 02:00 - Joint probability tables and marginal distributions
- 06:00 - Conditional distributions, conditional expectations and independence
- 10:00 - Covariance and correlation
- 14:00 - Zero correlation versus independence (the Y = X² example)
- 16:00 - Variance of sums, differences and two-asset portfolios
- 20:00 - Whiteboard: joint table and portfolio example
- 24:00 - Covariance matrices, traps and recap

## Slides
### Slide 1: Risk lives in combinations
- Portfolio losses depend on co-movement
- Joint distributions describe several variables at once
- Today: joint, marginal, conditional, covariance

### Slide 2: Joint probability table
- p(x, y) for every pair; all cells sum to 1
- Rows and columns are outcomes of X and Y
- Marginal = row or column total

### Slide 3: Conditional distributions
- p(y | x) = p(x, y) / pX(x)
- E[Y | X = x] = Σ y p(y | x)
- Independence: p(x, y) = pX(x) pY(y) for all cells

### Slide 4: Covariance
- Cov(X, Y) = E[XY] − μX μY
- Positive: move together; negative: move apart
- Cov(aX, bY) = ab Cov(X, Y)

### Slide 5: Correlation
- ρ = Cov / (σX σY), between −1 and 1
- Unit-free, measures linear association
- Unchanged by positive rescaling

### Slide 6: Zero correlation is not independence
- X symmetric around 0, Y = X²
- Y fully determined by X, yet ρ = 0
- Correlation misses non-linear links

### Slide 7: Variance of combinations
- Var(aX + bY) = a²σX² + b²σY² + 2ab Cov
- Var(X − Y) = σX² + σY² − 2 Cov
- Means are always linear

### Slide 8: Two-asset portfolio
- σp² = w1²σ1² + w2²σ2² + 2w1w2ρσ1σ2
- ρ < 1 ⇒ σp below weighted average σ
- That gap is diversification

### Slide 9: Many assets
- σp² = wᵀΣw
- n(n − 1)/2 distinct covariances
- Factor models reduce the burden

### Slide 10: Worked results
- Cov = 40, ρ = 0.408
- E[Y | X = 10] = 8.33 versus E[Y] = 5
- Portfolio σ = 13.74% versus 16% weighted average

### Slide 11: Exam traps
- Joint, not conditional, probabilities in E[XY]
- Missing the 2 on the covariance term
- Zero correlation ≠ independence

## Whiteboard examples
**Example 1 - Joint table.** (X, Y) = (−10, −5) 0.30; (−10, 15) 0.10; (10, −5) 0.20; (10, 15) 0.40.
- Marginals: X −10 0.40, 10 0.60; Y −5 0.50, 15 0.50.
- μX = 2, μY = 5, E[XY] = 50, Cov = 40.
- σX² = 96 (σX = 9.80), σY² = 100 (σY = 10); ρ = 0.408.
- Var(X − Y) = 96 + 100 − 80 = 116; σ(X + Y) = √(96 + 100 + 80) = 16.61.

**Example 2 - Portfolio.** w = 0.6 / 0.4, σ = 20% / 10%, ρ = 0.3.
- σp² = 0.0144 + 0.0016 + 0.00288 = 0.01888; σp = 13.74%.
- With ρ = 0: σp = √0.016 = 12.65%.
- With ρ = 1: σp = 0.6(20%) + 0.4(10%) = 16%.

**Example 3 - Independence check.** P(0,0) = 0.5, P(0,1) = 0.2, P(1,0) = 0.1, P(1,1) = 0.2.
- P(X = 1) = 0.3, P(Y = 1) = 0.4; product 0.12 ≠ 0.2, so dependent.
- Cov = 0.2 − 0.3 × 0.4 = 0.08.

## Questions to ask students
- If Cov(X, Y) = 0, are X and Y independent? (Not necessarily; only linear dependence is ruled out.)
- What is the portfolio σ of two assets with ρ = 1? (The weighted average of their σs; no diversification.)
- Does doubling X change the correlation with Y? (No; correlation is scale-free for positive scaling. Covariance doubles.)
- Var(X − Y) when σX = 3, σY = 4, ρ = 0.5? (9 + 16 − 12 = 13.)
- How many distinct covariances in a 50-asset portfolio? (50 × 49 / 2 = 1,225.)

## Analogies
- A joint table is a seating chart: the marginal is the head count per row, the conditional is who sits where within one row.
- Covariance is two dancers' synchrony; correlation is the same score rescaled so tall and short dancers are judged fairly.
- Diversification is a team of rowers whose mistakes partly cancel; only when they all err together (ρ = 1) does the boat lurch fully.

## Recording tips
- Fill in the joint table live and write the marginals in the margins, literally, so the name sticks.
- Show the ρ = 1, 0.3 and 0 portfolio results side by side to make diversification tangible.
- Warn about percentages versus decimals before the portfolio example; it is the most common arithmetic slip.
