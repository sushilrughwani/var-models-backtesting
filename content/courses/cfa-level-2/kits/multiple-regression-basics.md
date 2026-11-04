---
title: "Basics of Multiple Regression and Underlying Assumptions"
duration: 26
---

## Lecture outline
- 00:00 - Hook: a fund manager claims "pure stock-picking alpha". How would you check whether it is really just factor exposure?
- 03:00 - From simple to multiple regression: why omitting a driver distorts the slope
- 06:00 - The model, OLS and the meaning of a partial slope
- 10:00 - Prediction by substitution (whiteboard 1)
- 13:00 - t-tests and confidence intervals for one coefficient, df = n - k - 1
- 17:00 - Whiteboard 2: testing SMB and HML, including testing a beta against 1
- 21:00 - The five assumptions and what residual and Q-Q plots look like when they fail
- 24:00 - Exam traps and recap

## Slides
### Slide 1: Basics of Multiple Regression
- One dependent variable, several explanatory variables
- Goal: isolate each driver's effect
- Foundation for the whole quant module at Level II

### Slide 2: Why Not Simple Regression?
- Real outcomes have several drivers
- Leaving one out pushes its effect onto the variables you kept
- Result: biased, misleading slopes

### Slide 3: The Model
- $Y_i = b_0 + b_1X_{1i} + \dots + b_kX_{ki} + \varepsilon_i$
- OLS minimises the sum of squared residuals
- k slopes + 1 intercept = k + 1 parameters

### Slide 4: Partial Slopes
- Change in Y for a one-unit change in $X_j$, others held constant
- Sign and size both matter
- Intercept = expected Y when all X are zero

### Slide 5: Making a Prediction
- Plug forecast X values into the fitted equation
- Watch the signs of negative coefficients and negative inputs
- Prediction is only as good as the X forecasts

### Slide 6: Testing One Coefficient
- $t = (\hat b_j - B_j)/s_{\hat b_j}$
- df = n - k - 1
- Reject if |t| > critical t, or p-value < α

### Slide 7: Confidence Intervals
- $\hat b_j \pm t_c \, s_{\hat b_j}$
- Interval excludes hypothesised value ⇒ reject
- Same decision as the t-test, every time

### Slide 8: The Assumptions
- Linearity in parameters
- Homoskedastic, uncorrelated, normal errors
- No exact linear relation among the X variables

### Slide 9: Residual Plot Diagnostics
- Shapeless cloud = good
- Fan shape = heteroskedasticity; curve = non-linearity
- Runs of same sign over time = serial correlation

### Slide 10: Q-Q Plots and Scatterplot Matrices
- Q-Q points on the 45° line = normal errors
- Bending tails = fat tails
- Scatterplot matrix flags strongly related X variables

### Slide 11: Exam Traps
- df uses k, not 2
- Test the hypothesised value, not always zero
- "Holding others constant" in every interpretation

## Whiteboard examples
**Example 1 - Prediction.** Fitted model (60 months): excess return = 1.20 + 0.85 MKT - 0.40 SMB + 0.30 HML. Forecasts: MKT = 2.0, SMB = 1.5, HML = -0.5.
Solution: 1.20 + 1.70 - 0.60 - 0.15 = 2.15%.

**Example 2 - Significance.** Standard errors: MKT 0.12, SMB 0.15, HML 0.20. df = 60 - 3 - 1 = 56, critical t (5%, two-tailed) ≈ 2.003.
- SMB: t = -0.40/0.15 = -2.67 → significant; 95% CI = -0.40 ± 0.30 = [-0.70, -0.10].
- HML: t = 0.30/0.20 = 1.50 → not significant.
- MKT vs 1 (is the fund less risky than the market?): t = (0.85 - 1)/0.12 = -1.25 → cannot reject a market beta of 1, even though MKT is highly significant versus zero (t = 7.08).

**Example 3 - Read the plots.** Sketch three residual plots: a cloud, a fan widening to the right, and a U-shape. Ask students to label them (fine; heteroskedasticity; non-linearity, perhaps a missing squared term).

## Questions to ask students
- What does "partial" mean in partial slope coefficient? (The effect of one X with all other X variables held constant.)
- With 48 observations and 5 independent variables, how many degrees of freedom for the t-test? (48 - 5 - 1 = 42.)
- A 95% interval for a slope is 0.05 to 0.65. Is the slope significant at 5%? (Yes, the interval excludes zero.)
- A residual plot shows the spread growing with fitted values. Which assumption fails? (Homoskedasticity.)
- Can a coefficient be highly significant versus 0 but not significantly different from 1? (Yes; it depends on the null value.)

## Analogies
- Partial slope as a controlled experiment: change one dial on the mixing desk, keep every other dial fixed, and listen to the difference.
- Omitted variable as a stowaway: its weight is still on the ship, it just gets blamed on the passengers you counted.
- Residual plot as a doctor's ECG: a calm random line is healthy; any pattern is a symptom worth investigating.

## Recording tips
- Say "holding the other variables constant" out loud every time you interpret a coefficient; students copy the habit.
- Show the regression output table on screen and circle where coefficient, standard error, t and p live; Level II vignettes print exactly this kind of table.
- Spend extra time on testing against 1, because candidates default to zero.
