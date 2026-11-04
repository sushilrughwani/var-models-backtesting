---
title: "Simple Linear Regression"
duration: 32
---

## Lecture outline
- 00:00 - Hook: if the market rises 1%, how much should this stock rise? Correlation cannot answer; regression can.
- 03:00 - The model, OLS and the formulas for slope and intercept
- 08:00 - The four assumptions and residual plots
- 12:00 - ANOVA: SST, SSR, SSE, R², SEE and F
- 17:00 - Whiteboard: estimate and evaluate a five-point regression
- 23:00 - Hypothesis tests on the slope (0 and 1) and F = t²
- 26:00 - Prediction intervals
- 29:00 - Functional forms, exam traps and recap

## Slides
### Slide 1: From correlation to regression
- Correlation: do they move together?
- Regression: by how much, and can we forecast?
- Y = b0 + b1X + ε

### Slide 2: Ordinary least squares
- Minimise Σ(Y − Ŷ)²
- b1 = Cov(X, Y)/Var(X)
- b0 = Ȳ − b1X̄; line passes through the means

### Slide 3: Interpreting coefficients
- Slope: change in Y for a one-unit change in X
- Intercept: predicted Y when X = 0
- Market model: slope = beta, intercept = alpha

### Slide 4: Assumptions
- Linearity
- Homoskedastic, independent, normal errors
- Diagnose with residual plots

### Slide 5: ANOVA decomposition
- SST = SSR + SSE
- R² = SSR/SST (= r² in simple regression)
- SEE = √[SSE/(n − 2)]

### Slide 6: The F-test
- F = MSR/MSE, df (1, n − 2)
- Tests H0: b1 = 0
- Simple regression: F = t²

### Slide 7: Worked example results
- b1 = 0.962, b0 = 0.660
- R² = 0.861, SEE = 1.028
- F = 18.58, t = 4.31

### Slide 8: Testing the slope
- t = (b1 − B1)/s_b1, df = n − 2
- s_b1 = SEE/√Σ(X − X̄)²
- B1 = 0 for significance; B1 = 1 for "beta equals one"

### Slide 9: Prediction intervals
- Ŷf = b0 + b1Xf
- sf = SEE√[1 + 1/n + (Xf − X̄)²/Σ(X − X̄)²]
- Wider for Xf far from X̄

### Slide 10: Functional forms
- Log-lin: slope = % change in Y per unit X
- Lin-log: slope = change in Y per % change in X
- Log-log: slope = elasticity

### Slide 11: Exam traps
- Var(X), not Var(Y), in the slope
- n − 2 everywhere
- SEE versus standard error of the slope

## Whiteboard examples
**Example 1 - Full regression.** (X, Y): (1, 2), (3, 4), (−2, −1), (4, 5), (2, 1).
- X̄ = 1.6, Ȳ = 2.2; Σ(dx·dy) = 20.4; Σdx² = 21.2.
- b1 = 0.962; b0 = 0.660.
- Fitted values 1.623, 3.547, −1.264, 4.509, 2.585; residuals 0.377, 0.453, 0.264, 0.491, −1.585 (sum to zero).
- SST = 22.80, SSE = 3.17, SSR = 19.63; R² = 0.861; MSE = 1.057; SEE = 1.028; F = 18.58.
- s_b1 = 1.028/√21.2 = 0.2232; t = 4.31 > 3.182, slope significant.
- Forecast at X = 5: Ŷ = 5.47; sf = 1.358; 95% interval 1.15% to 9.79%.

**Example 2 - Is beta different from 1?** Same regression.
- t = (0.962 − 1)/0.2232 = −0.17; |t| < 3.182, so we cannot reject beta = 1.
- Message: a slope can be significantly different from 0 but not from 1.

**Example 3 - ANOVA from partial information.** n = 22, SSR = 60, SSE = 40.
- SST = 100; R² = 0.60.
- MSE = 40/20 = 2; SEE = 1.414; F = 60/2 = 30.

## Questions to ask students
- Cov(X, Y) = 18, Var(X) = 24, X̄ = 5, Ȳ = 9. Slope and intercept? (0.75 and 5.25.)
- What does a funnel-shaped residual plot suggest? (Heteroskedasticity.)
- Correlation is −0.6. What is R²? (0.36.)
- t-statistic on the slope is 3. What is the F-statistic? (9.)
- In ln(Sales) = 2 + 0.05 × Advertising, what does 0.05 mean? (Each extra unit of advertising raises sales by about 5%.)

## Analogies
- OLS is a tug-of-war: every point pulls the line toward itself, with a force that grows with the square of its distance, so the line settles where the pulls balance.
- R² is the share of the story X can tell; SEE is the size of the plot holes that remain.
- A prediction interval is like a torch beam: bright and narrow near the centre of your data, wide and dim at the edges.

## Recording tips
- Build the regression table column by column (dx, dy, dx·dy, dx², Ŷ, e, e²) on screen; it is the backbone of the lecture.
- Emphasise n − 2 every time it appears; say why (two estimated coefficients).
- Show a scatter plot with the fitted line and residuals drawn as vertical segments to make "least squares" visual.
