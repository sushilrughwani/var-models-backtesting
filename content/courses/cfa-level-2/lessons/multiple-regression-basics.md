---
title: "Basics of Multiple Regression and Underlying Assumptions"
---

## Learning goals
- Specify a multiple regression model and explain what each partial slope coefficient measures.
- Calculate a predicted value of the dependent variable from estimated coefficients.
- Test the significance of an individual coefficient with a t-test and build its confidence interval.
- Explain the assumptions behind multiple regression and how residual plots reveal violations.

## Explanation

### Why add more than one variable?
At Level I you regressed one variable on one other. Real questions are rarely that tidy. A fund's excess return depends on market exposure, size tilt and value tilt at the same time. If you leave a relevant driver out, its effect gets loaded onto whichever variable you kept, and your coefficient tells a misleading story. Multiple regression lets you measure the effect of each driver *while holding the others constant*.

### The model
$$
Y_i = b_0 + b_1 X_{1i} + b_2 X_{2i} + \dots + b_k X_{ki} + \varepsilon_i, \quad i = 1, \dots, n
$$
where $Y_i$ is the dependent variable for observation $i$, $X_{ji}$ are the $k$ independent variables, $b_0$ is the intercept, $b_1, \dots, b_k$ are the slope coefficients and $\varepsilon_i$ is the error term. Ordinary least squares (OLS) chooses the estimates $\hat b_j$ that minimise the sum of squared residuals.

### Interpreting a partial slope
Each $\hat b_j$ is a **partial** slope: the expected change in $Y$ for a one-unit increase in $X_j$, holding all other independent variables constant. This is the single most tested interpretation point. A coefficient of 0.85 on market excess return means a 1 percentage point rise in the market, with size and value factors unchanged, is associated with a 0.85 point rise in the fund's excess return. The intercept is the expected $Y$ when every $X$ equals zero, which may or may not have economic meaning.

### Testing a single coefficient
To ask whether $X_j$ matters, test $H_0: b_j = 0$ (or any hypothesised value $B_j$):
$$
t = \frac{\hat b_j - B_j}{s_{\hat b_j}}, \qquad df = n - k - 1
$$
where $s_{\hat b_j}$ is the standard error of the estimate. Reject $H_0$ if $|t|$ exceeds the critical value. A p-value below the significance level gives the same conclusion. The confidence interval is
$$
\hat b_j \pm t_c \times s_{\hat b_j}
$$
and if it excludes zero, the coefficient is significant at that level.

### The assumptions
OLS inference is reliable only if these hold:
1. **Linearity**: the relationship between $Y$ and the $X$s is linear in the parameters.
2. **Homoskedasticity**: the error variance is the same for every observation.
3. **Independence of errors**: residuals are not correlated with each other (no serial correlation).
4. **Normality**: errors are normally distributed (matters most for small samples).
5. **Independence of the independent variables**: no exact linear relationship among the $X$s, and the $X$s are not random variables correlated with the error.

### Reading residual plots
Plot residuals against predicted values or against each $X$. A healthy plot is a shapeless cloud around zero. A fan shape signals heteroskedasticity; a curve signals non-linearity; long runs of same-signed residuals over time signal serial correlation; isolated far-away points suggest outliers. A normal Q-Q plot checks normality: points should hug the 45-degree line, and fat tails bend away at both ends. Scatterplot matrices of the $X$s show whether independent variables are strongly related to each other.

## Worked example
An analyst regresses a fund's monthly excess return (%) on three factors using $n = 60$ months:

| Variable | Coefficient | Standard error |
|---|---|---|
| Intercept | 1.20 | 0.40 |
| Market excess return (MKT) | 0.85 | 0.12 |
| Size factor (SMB) | -0.40 | 0.15 |
| Value factor (HML) | 0.30 | 0.20 |

**Step 1 - Predict.** Next month the analyst expects MKT = 2.0, SMB = 1.5, HML = -0.5:
$$
\hat Y = 1.20 + 0.85(2.0) - 0.40(1.5) + 0.30(-0.5) = 1.20 + 1.70 - 0.60 - 0.15 = 2.15
$$
Predicted excess return: **2.15%**.

**Step 2 - Test SMB.** Degrees of freedom $= 60 - 3 - 1 = 56$; two-tailed 5% critical t is about 2.003.
$$
t = \frac{-0.40 - 0}{0.15} = -2.67
$$
Since $|-2.67| > 2.003$, reject $H_0$: the fund has a **significant negative size loading** (it tilts toward large caps).

**Step 3 - Confidence interval for SMB.** $-0.40 \pm 2.003 \times 0.15 = -0.40 \pm 0.30$, giving **-0.70 to -0.10**, which excludes zero, consistent with Step 2.

**Step 4 - Check HML.** $t = 0.30 / 0.20 = 1.50 < 2.003$, so the value loading is not significant at 5%. MKT has $t = 0.85/0.12 = 7.08$, clearly significant.

## Common exam traps
- Forgetting "holding other variables constant" when interpreting a slope, or reading a simple-regression slope as if it were partial.
- Using $n - 2$ (simple regression) instead of $n - k - 1$ for degrees of freedom.
- Dropping the sign of a negative coefficient when plugging values into the prediction.
- Testing against zero when the vignette asks whether a beta differs from 1: the numerator is $\hat b_j - 1$.
- Confusing a fan-shaped residual plot (heteroskedasticity) with a curved one (non-linearity).

## Key takeaways
- Multiple regression isolates each variable's effect by holding the others constant.
- Prediction is just substitution: intercept plus each coefficient times its forecast $X$.
- The t-statistic for a coefficient uses $n - k - 1$ degrees of freedom.
- A confidence interval that excludes the hypothesised value means rejection at that level.
- Valid inference needs linearity, homoskedastic and independent normal errors, and no exact collinearity.
- Residual and Q-Q plots are the first diagnostic tool before trusting any output.
