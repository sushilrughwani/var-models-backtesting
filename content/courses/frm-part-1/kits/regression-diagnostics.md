---
title: "Regression Diagnostics"
duration: 24
---

## Lecture outline
- 00:00 - Hook: a model of loan losses looks great in calm years and falls apart in a crisis. Which assumption broke?
- 02:00 - What diagnostics are for: OLS assumptions recap
- 04:00 - Heteroskedasticity: definition, consequences, White robust standard errors
- 08:00 - White's test: auxiliary regression, counting terms, nR²
- 11:00 - Omitted variable bias formula and when it is zero
- 14:00 - Extraneous variables, bias-variance trade-off, general-to-specific and cross-validation
- 18:00 - Outliers and Cook's distance
- 21:00 - Whiteboard recap problem and exam traps

## Slides
### Slide 1: Regression Diagnostics
- Estimation is step one; checking the assumptions is step two
- Four themes: heteroskedasticity, omitted variables, specification, outliers
- Each failure has a distinct consequence

### Slide 2: Homoskedastic vs Heteroskedastic
- Homoskedastic: constant error variance
- Heteroskedastic: variance changes with the regressors
- Common in finance: volatility clusters, firm-size effects

### Slide 3: Consequences of Heteroskedasticity
- Coefficients: still unbiased and consistent
- Standard errors: wrong, so tests and intervals unreliable
- OLS no longer efficient; fix with White robust SEs or WLS

### Slide 4: White's Test
- Regress squared residuals on levels, squares and cross-products
- LM = n × R² of auxiliary regression
- Chi-square with p = number of auxiliary slope terms

### Slide 5: Omitted Variable Bias
- True slope β1, omitted variable with slope β2
- Estimated slope tends to β1 + β2 δ, δ = Cov(X1, X2)/Var(X1)
- Needs both β2 ≠ 0 and correlation; does not shrink with n

### Slide 6: Extraneous Variables
- Irrelevant regressor: no bias, but larger standard errors
- Adjusted R² falls
- Omit = bias; include junk = variance

### Slide 7: Choosing the Model
- General-to-specific: drop least significant variable one at a time
- m-fold cross-validation: estimate on m - 1 blocks, test on the held-out block
- Choose the lowest out-of-sample error

### Slide 8: Outliers vs Influential Points
- Outlier: large residual
- Influential: removing it moves the fitted line
- Investigate before deleting

### Slide 9: Cook's Distance
- D = Σ(Ŷ without j - Ŷ)² / (p s²)
- p = number of coefficients, s² = residual variance
- D > 1: influential observation

### Slide 10: Recap
- Hetero: SEs, not coefficients
- OVB: bias = β2 δ
- Next: time series, where errors can also be correlated over time

## Whiteboard examples
**Example 1: White's test with three regressors.** n = 150, auxiliary R² = 0.09.
- Slope terms: 3 levels + 3 squares + 3 cross-products = 9.
- LM = 150 × 0.09 = 13.5.
- Critical χ²(9) at 5% = 16.92. 13.5 < 16.92, so do not reject homoskedasticity.
- Contrast: with n = 200, two regressors (p = 5) and R² = 0.12, LM = 24.0 > 11.07, reject.

**Example 2: Omitted variable bias with opposite signs.** True β1 = 0.6, omitted β2 = -0.8, δ = 0.5.
- Bias = -0.8 × 0.5 = -0.40.
- Estimated slope tends to 0.6 - 0.40 = 0.20: the effect of X1 looks much weaker than it is.

**Example 3: Cook's distance.** Sum of squared fitted-value changes = 2.4, p = 3, s² = 0.5.
- D = 2.4 / 1.5 = 1.60 > 1: influential.

## Questions to ask students
- Heteroskedasticity is present. Are the coefficient estimates biased? (No, only the standard errors are wrong.)
- With two regressors, how many slope terms does White's auxiliary regression have? (Five.)
- When is there no omitted variable bias even though a relevant variable is left out? (When it is uncorrelated with the included regressors.)
- What is the cost of including an irrelevant variable? (Less precise estimates, higher standard errors; no bias.)
- Why not delete every observation with a large residual? (It may be a genuine extreme event, the very risk you need to model.)

## Analogies
- Heteroskedasticity: a bathroom scale that is right on average but whose jitter grows with your weight; your average reading is fine, but you cannot trust how confident you are.
- Omitted variable bias: crediting umbrellas for wet pavements because you never recorded the rain.
- Cook's distance: removing one guest from a group photo and checking whether everyone else had to rearrange.

## Recording tips
- Draw a fan-shaped residual plot by hand; it makes heteroskedasticity instantly visual.
- Repeat the phrase "biased coefficients versus wrong standard errors" several times; it is the most tested distinction.
- When counting White-test terms, list them explicitly on screen rather than using the formula only.
