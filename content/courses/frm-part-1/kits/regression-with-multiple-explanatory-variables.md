---
title: "Regression With Multiple Explanatory Variables"
duration: 26
---

## Lecture outline
- 00:00 - Hook: a fund manager's "alpha" disappears once a second factor is added. What happened?
- 02:00 - The multiple regression model and the partial-effect interpretation
- 06:00 - TSS = ESS + RSS, R-squared and why it never falls; adjusted R-squared
- 10:00 - t-tests on single coefficients and degrees of freedom n - k - 1
- 13:00 - The F-test of overall significance and the restricted-versus-unrestricted F-test
- 18:00 - Multicollinearity: symptoms, VIF, dummy-variable trap
- 22:00 - Whiteboard: full ANOVA-table example
- 24:00 - Exam traps and recap

## Slides
### Slide 1: Regression With Multiple Explanatory Variables
- One driver is rarely enough in risk management
- Goal: estimate, interpret and test models with k regressors
- Builds directly on simple linear regression

### Slide 2: The Model
- Y = α + β1 X1 + ... + βk Xk + ε
- OLS still minimises the sum of squared residuals
- k slopes plus one intercept: k + 1 parameters

### Slide 3: Partial Effects
- βj = change in Y for a one-unit change in Xj, others held fixed
- Slopes can change when a regressor is added or removed
- The old slope was absorbing the missing variable's effect

### Slide 4: Measuring Fit
- TSS = ESS + RSS
- R² = ESS / TSS = 1 - RSS / TSS
- R² never decreases when you add a regressor

### Slide 5: Adjusted R-squared
- Adj R² = 1 - (1 - R²)(n - 1)/(n - k - 1)
- Penalises extra parameters; can fall, can be negative
- Use it to compare models with different numbers of regressors

### Slide 6: Testing One Coefficient
- t = βj-hat / SE(βj-hat), df = n - k - 1
- Reject H0: βj = 0 if |t| > critical value (about 2 at 5%)
- Standard error of regression s = √(RSS / (n - k - 1))

### Slide 7: The Overall F-test
- H0: all slopes equal zero
- F = (ESS / k) / (RSS / (n - k - 1)) = (R²/k) / ((1 - R²)/(n - k - 1))
- One-sided: only large F rejects

### Slide 8: Testing a Subset of Coefficients
- Fit unrestricted and restricted models
- F = ((R²U - R²R)/q) / ((1 - R²U)/(n - kU - 1))
- Variables can be jointly significant but individually insignificant

### Slide 9: Multicollinearity
- Regressors highly correlated with each other
- OLS still unbiased; standard errors inflate
- Symptom: high R² and F, low individual t-stats

### Slide 10: Detecting and Handling It
- VIFj = 1 / (1 - Rj²); above 10 is a warning
- Perfect collinearity: dummy-variable trap, OLS fails
- Remedies: drop a variable, combine variables, collect more data

### Slide 11: Recap
- Partial effects, adjusted R², t vs F, VIF
- Always use n - k - 1 degrees of freedom
- Next: what happens when OLS assumptions fail

## Whiteboard examples
**Example 1: Reading an ANOVA table.** n = 40, two regressors, TSS = 500, ESS = 180, slopes 0.8 (SE 0.25) and -0.3 (SE 0.20).
- RSS = 320, df = 37. R² = 0.36. Adj R² = 1 - 0.64 × 39/37 = 0.3254.
- s = √(320/37) = 2.94.
- t1 = 3.20 (significant vs 2.03), t2 = -1.50 (not significant).
- F = (180/2)/(320/37) = 10.41 vs critical F(2,37) = 3.25: reject that both slopes are zero.

**Example 2: Joint test of two factors.** n = 60. Unrestricted model with 4 regressors has R² = 0.42. Dropping two of them (q = 2) gives R² = 0.35.
- Denominator df = 60 - 4 - 1 = 55.
- F = ((0.42 - 0.35)/2) / ((1 - 0.42)/55) = 0.035 / 0.010545 = 3.32.
- Critical F(2,55) at 5% = 3.16, so reject: the two factors are jointly significant.

**Example 3: VIF.** Regressing X1 on the other regressors gives R² = 0.90. VIF = 1/(1 - 0.90) = 10: the variance of β1-hat is ten times what it would be with uncorrelated regressors.

## Questions to ask students
- If I add a random noise variable to a regression, what happens to R² and to adjusted R²? (R² rises or stays the same; adjusted R² usually falls.)
- With n = 30 and 3 regressors, how many degrees of freedom does the t-test have? (26.)
- Does multicollinearity make OLS estimates biased? (No, it inflates their standard errors.)
- Two variables each have t = 1.2 but the F-test on both is 8.5. What is going on? (They are correlated: jointly significant, individually imprecise.)
- Why does a quarterly model with an intercept use only three seasonal dummies? (Four plus an intercept is perfect collinearity, the dummy-variable trap.)

## Analogies
- Partial effect: judging a striker's goals after controlling for the quality of the team around him.
- Multicollinearity: two singers always performing together; you know the duet sounds good but cannot tell who has the better voice.
- Adjusted R²: a restaurant bill with a cover charge per guest; inviting a useless guest raises the cost without adding to the conversation.

## Recording tips
- Write the degrees-of-freedom formula n - k - 1 in a corner of the board and point at it every time you use it.
- Show the regression output table on screen and map each number (coefficients, SE, t, F, R²) to the formulas.
- Spend extra time on the restricted-versus-unrestricted F-test; students mix up which R² goes in the denominator.
