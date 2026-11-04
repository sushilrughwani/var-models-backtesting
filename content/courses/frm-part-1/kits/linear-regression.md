---
title: "Linear Regression"
duration: 28
---

## Lecture outline
- 00:00 - Hook: what is this fund's beta, and is it really different from 1?
- 03:00 - The regression model and what each term means
- 06:00 - OLS: minimising squared residuals; slope = Cov / Var
- 10:00 - Assumptions behind OLS
- 13:00 - TSS = ESS + RSS, R² and the standard error of the regression
- 17:00 - Standard error of the slope, t-tests and confidence intervals
- 20:00 - Whiteboard: five-point regression by hand
- 25:00 - Traps and recap

## Slides
### Slide 1: Explaining one variable with another
- Fund returns versus market returns
- Y = α + βX + ε
- β: sensitivity; α: unexplained return; ε: noise

### Slide 2: Ordinary least squares
- Choose α̂, β̂ to minimise Σ residual²
- β̂ = Cov(X, Y) / Var(X)
- α̂ = Ȳ − β̂X̄; line passes through the means

### Slide 3: Beta from correlation
- β̂ = ρ̂ × σ̂Y / σ̂X
- Same sign as the correlation
- Steeper when Y is more volatile

### Slide 4: Assumptions
- E[ε | X] = 0: no omitted correlated factor
- iid observations, rare large outliers, X varies
- Homoskedastic errors for the simple SE formula

### Slide 5: Decomposing variation
- TSS = ESS + RSS
- R² = ESS / TSS = 1 − RSS / TSS
- One regressor: R² = ρ²

### Slide 6: Standard error of the regression
- s = √(RSS / (n − 2))
- Typical size of a residual
- n − 2 because two parameters are estimated

### Slide 7: Inference on β
- SE(β̂) = s / √Σ(X − X̄)²
- t = (β̂ − β0) / SE(β̂), df = n − 2
- CI: β̂ ± c × SE(β̂)

### Slide 8: Worked results
- Ŷ = 1.30 + 0.90X
- R² = 0.81, s = 0.796
- SE(β̂) = 0.252, t = 3.58 > 3.182

### Slide 9: Testing beta = 1
- Subtract the hypothesised value
- β̂ = 1.2, SE 0.4 ⇒ t = 0.5
- Significantly different from 0, not from 1

### Slide 10: Exam traps
- Divide by Var(X), not Var(Y)
- n − 2 degrees of freedom
- R² is not causation

## Whiteboard examples
**Example 1 - Five-point regression.** (1, 2), (2, 3), (3, 5), (4, 4), (5, 6).
- X̄ = 3, Ȳ = 4; Σ dx dy = 9; Σ dx² = 10.
- β̂ = 0.90; α̂ = 1.30.
- Residuals −0.2, −0.1, 1.0, −0.9, 0.2; RSS = 1.90; TSS = 10; R² = 0.81.
- s² = 1.90/3 = 0.633; SE(β̂) = 0.796/√10 = 0.252; t = 3.58, reject β = 0 at 5% (critical 3.182 with 3 df).

**Example 2 - Beta from summary statistics.** Cov(fund, market) = 0.0012; σ_market = 4% (variance 0.0016); σ_fund = 5%.
- β̂ = 0.0012 / 0.0016 = 0.75.
- ρ = 0.0012 / (0.04 × 0.05) = 0.60; R² = 0.36.
- If means are Ȳ = 1.0% and X̄ = 0.8% with β̂ = 1.2, then α̂ = 1.0 − 0.96 = 0.04%.

**Example 3 - Testing beta = 1.** β̂ = 1.2, SE = 0.4, large sample.
- Against 0: t = 3.0, significant.
- Against 1: t = (1.2 − 1)/0.4 = 0.5, not significant.

## Questions to ask students
- Through which point does every OLS line pass? (The point of means, (X̄, Ȳ).)
- If the correlation is −0.5, what is R² in a simple regression? (0.25.)
- Why n − 2 degrees of freedom? (Two parameters, α and β, are estimated.)
- How can you shrink SE(β̂) without changing the noise level? (More observations or more spread in X.)
- A slope is significant but R² is 0.05. Is the model useless? (Not necessarily; X has a real effect but explains little of Y's total variation.)

## Analogies
- OLS is stretching a rubber band through a cloud of points: each point pulls with a force proportional to its squared distance, and the band settles where the pulls balance.
- R² is the share of the song you can hear through the wall: the explained part versus the static.
- Beta is a gear ratio: for every 1% the market turns, the fund turns β%.

## Recording tips
- Build the deviation table (dx, dy, dx dy, dx²) on screen and keep it visible while computing every statistic.
- Plot the five points with the fitted line and draw the residuals as vertical segments.
- Stress the "test against the hypothesised value" trap with the beta = 1 example; it is a favourite exam twist.
