---
title: "Evaluating Regression Model Fit and Interpreting Model Results"
---

## Learning goals
- Calculate R-squared, adjusted R-squared and the overall F-statistic from an ANOVA table.
- Compare competing models using adjusted R-squared, AIC and BIC.
- Conduct a joint F-test of whether a subset of coefficients equals zero.
- Explain how a regression forecast and its interval are built, and why forecast uncertainty exceeds the standard error of estimate.

## Explanation

### The ANOVA decomposition
Total variation in the dependent variable splits into what the model explains and what it does not:
$$
\text{SST} = \text{SSR} + \text{SSE}
$$
where SST is the total sum of squares $\sum (Y_i - \bar Y)^2$, SSR is the regression (explained) sum of squares $\sum (\hat Y_i - \bar Y)^2$ and SSE is the sum of squared errors $\sum (Y_i - \hat Y_i)^2$. Dividing by degrees of freedom gives mean squares: $\text{MSR} = \text{SSR}/k$ and $\text{MSE} = \text{SSE}/(n-k-1)$. The standard error of estimate is $\text{SEE} = \sqrt{\text{MSE}}$.

### R-squared and its flaw
$$
R^2 = \frac{\text{SSR}}{\text{SST}}
$$
is the share of variation explained. The problem: adding *any* variable, even random noise, never lowers $R^2$. A model stuffed with junk looks better than it is.

### Adjusted R-squared
$$
\bar R^2 = 1 - \left[\frac{n-1}{n-k-1}\right](1 - R^2)
$$
penalises extra variables. It rises when a new variable is added only if that variable's t-statistic exceeds 1 in absolute value. It can be negative and is no longer "percent explained". It is a comparison tool for models with the same dependent variable.

### AIC and BIC
Information criteria trade fit against complexity; **lower is better**:
$$
\text{AIC} = n \ln\!\left(\frac{\text{SSE}}{n}\right) + 2(k+1)
$$
$$
\text{BIC} = n \ln\!\left(\frac{\text{SSE}}{n}\right) + \ln(n)(k+1)
$$
Because $\ln(n) > 2$ once $n \geq 8$, BIC punishes extra parameters more heavily. Rule of thumb: AIC is preferred when the goal is **prediction**, BIC when the goal is the best **goodness of fit** (the most parsimonious true model).

### The overall F-test
Is the model useful at all? Test $H_0: b_1 = b_2 = \dots = b_k = 0$:
$$
F = \frac{\text{MSR}}{\text{MSE}} = \frac{\text{SSR}/k}{\text{SSE}/(n-k-1)}
$$
with $k$ and $n-k-1$ degrees of freedom. It is a one-tailed test: reject when $F$ exceeds the upper critical value.

### Joint test of a subset
To test whether $q$ variables can be dropped together, estimate the unrestricted model (all variables) and the restricted model (without the $q$ variables):
$$
F = \frac{(\text{SSE}_R - \text{SSE}_U)/q}{\text{SSE}_U/(n-k-1)}
$$
where $k$ is the number of variables in the unrestricted model. Dropping variables always raises SSE; the question is whether it rises *significantly*. A joint test can find a group significant even when each member alone has a weak t-statistic, which is common with correlated regressors.

### Forecasting
A point forecast substitutes forecast values of the $X$s into the fitted equation. The forecast interval is $\hat Y_f \pm t_c \, s_f$, where the standard error of the forecast $s_f$ combines the model's error variance (captured by SEE) with sampling error in the estimated coefficients. So $s_f$ is always larger than SEE, and it grows as the forecast $X$ values move away from their sample means.

## Worked example
An analyst models quarterly earnings surprises with $k = 4$ variables and $n = 40$ quarters. ANOVA output: SST = 500, SSE = 180.

**Step 1 - Fit measures.** SSR = 500 - 180 = 320.
$$
R^2 = 320/500 = 0.640, \quad \bar R^2 = 1 - \frac{39}{35}(0.36) = 0.599
$$

**Step 2 - Overall F.** MSR = 320/4 = 80; MSE = 180/35 = 5.143.
$$
F = 80 / 5.143 = 15.56
$$
The 5% critical F(4, 35) is about 2.64, so the model is significant overall. SEE $= \sqrt{5.143} = 2.27$.

**Step 3 - Joint test.** The analyst drops two variables; the restricted model's SSE is 210.
$$
F = \frac{(210 - 180)/2}{180/35} = \frac{15}{5.143} = 2.92
$$
The 5% critical F(2, 35) is about 3.27. Since 2.92 < 3.27, **fail to reject**: the two variables are not jointly significant.

**Step 4 - Information criteria.**

| Model | k | SSE | Adjusted R² | AIC | BIC |
|---|---|---|---|---|---|
| Full | 4 | 180 | 0.599 | 70.16 | 78.61 |
| Restricted | 2 | 210 | 0.557 | 72.33 | 77.40 |

AIC (and adjusted R²) favour the full model; BIC favours the restricted model. For forecasting, choose the **full model (lower AIC)**; for the most parsimonious explanatory model, choose the **restricted model (lower BIC)**, consistent with the joint F-test.

## Common exam traps
- Treating a higher $R^2$ as proof that an added variable belongs in the model.
- Choosing the model with the *higher* AIC or BIC; lower is better for both.
- Using $n - k - 1$ of the *restricted* model in the joint test's denominator; use the unrestricted model.
- Reading adjusted $R^2$ as a percentage of variation explained.
- Assuming the forecast interval uses SEE alone; it uses the larger standard error of forecast.

## Key takeaways
- $R^2$ never falls when variables are added; adjusted $R^2$ penalises complexity.
- AIC suits prediction, BIC suits parsimony; both prefer lower values, and BIC penalises parameters more.
- The overall F-test asks whether all slopes are jointly zero.
- The restricted-versus-unrestricted F-test decides whether a group of variables can be dropped.
- Forecast intervals widen with coefficient uncertainty and with distance from the sample means.
