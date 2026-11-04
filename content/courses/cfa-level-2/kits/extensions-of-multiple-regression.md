---
title: "Extensions of Multiple Regression"
duration: 24
---

## Lecture outline
- 00:00 - Hook: one bad data point flips the sign of a slope. How do we find it before it embarrasses us?
- 02:00 - Leverage, outliers and influence: three different things
- 06:00 - Thresholds: leverage, studentized residuals, Cook's distance
- 09:00 - Dummy variables: n - 1 rule, intercept dummies, slope dummies
- 13:00 - Whiteboard 1: predicting with intercept and slope dummies
- 15:00 - Logistic regression: why, log-odds, probability, odds ratio
- 19:00 - Whiteboard 2: default probability and LR test
- 22:00 - Exam traps and recap

## Slides
### Slide 1: Extensions of Multiple Regression
- Unusual observations
- Qualitative variables via dummies
- Binary outcomes via logistic regression

### Slide 2: Leverage vs Outlier vs Influence
- Leverage: extreme X values
- Outlier: extreme Y given X (big residual)
- Influential: removing it changes the coefficients

### Slide 3: Detection Thresholds
- Leverage: $h_{ii} > 3(k+1)/n$
- Studentized residual vs t critical (n - k - 2 df)
- Cook's D: > 0.5 look, > 1 likely influential, or > $2\sqrt{k/n}$

### Slide 4: What To Do With Them
- Check for data errors first
- Do not delete automatically
- Report results with and without

### Slide 5: Dummy Variables
- 0/1 indicator for a category
- n categories → n - 1 dummies
- Coefficients measured against the base category

### Slide 6: Intercept and Slope Dummies
- $Y = b_0 + d_0D + b_1X + d_1(DX)$
- D = 0: $b_0 + b_1X$
- D = 1: $(b_0 + d_0) + (b_1 + d_1)X$

### Slide 7: Why Logistic Regression?
- Binary dependent variable
- Linear model can predict P < 0 or P > 1
- Model log-odds instead, estimated by maximum likelihood

### Slide 8: From Log-Odds to Probability
- $\ln[P/(1-P)] = z$
- $P = 1/(1 + e^{-z})$
- Odds ratio = $e^{b_j}$

### Slide 9: Judging a Logistic Model
- LR = -2(ln L_restricted - ln L_unrestricted), chi-square with q df
- Pseudo R² for comparing models of the same Y
- No ordinary R² or F-test

### Slide 10: Exam Traps
- Odds ≠ probability
- Add slope dummy to the base slope
- n - 1 dummies

## Whiteboard examples
**Example 1 - Dummies.** Analyst coverage model: Y = 2.0 + 1.5 D + 0.6 X + 0.4 (D × X), where D = 1 for tech firms. For a tech firm with X = 5: 2.0 + 1.5 + 3.0 + 2.0 = 8.5. For a non-tech firm with X = 5: 2.0 + 3.0 = 5.0. Tech slope = 0.6 + 0.4 = 1.0.

**Example 2 - Logistic default model.** Log-odds = -2.5 + 0.8 LEV - 1.2 COV; LEV = 3.0, COV = 0.5.
- z = -0.70; odds = e^-0.70 = 0.497; P = 1/(1 + e^0.70) = 0.332.
- Odds ratio for LEV = e^0.8 = 2.23.
- LR test: ln L full = -135.1, intercept-only = -142.6 → LR = 15.0 > 5.99 (chi-square, 2 df) → jointly significant.

**Example 3 - Leverage.** n = 50, k = 3 → threshold 3 × 4/50 = 0.24. Observation with h = 0.30 is high leverage; if its studentized residual is small, it is not an outlier and may not be influential - check Cook's D.

## Questions to ask students
- Can a point have high leverage without being an outlier? (Yes; extreme X but on the fitted line.)
- How many dummies to capture 12 months with an intercept in the model? (11.)
- What does a slope dummy coefficient test? (Whether the slope on X differs between the two groups.)
- If z = 0 in a logistic model, what is P? (0.5.)
- A logistic coefficient is 0.693. What is the odds ratio? (About 2: the odds double.)

## Analogies
- Leverage as sitting at the end of a seesaw: you have the potential to tip it, but only if you push (a large residual).
- Dummy variables as switches: an intercept dummy lifts the whole line, a slope dummy changes how steep it is.
- Logistic curve as a dimmer switch that can never go below off or above fully on.

## Recording tips
- Draw a scatter with three highlighted points (high leverage only, outlier only, both) and ask which is influential.
- Do the odds-to-probability conversion slowly on screen; candidates routinely stop at the odds.
- Emphasise "log-odds" in every interpretation of a logistic coefficient.
