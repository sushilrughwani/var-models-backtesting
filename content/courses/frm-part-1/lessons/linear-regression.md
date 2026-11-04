---
title: "Linear Regression"
---

## Learning goals
- Explain what a linear regression model assumes and how OLS chooses its coefficients.
- Calculate the OLS slope and intercept from sample data or from covariance and variance.
- Interpret coefficients, the coefficient of determination ($R^2$) and the standard error of the regression.
- Test hypotheses about a regression coefficient using its standard error and a t-statistic.

## Explanation

### The model
Regression explains one variable with another. Suppose a fund's return $Y$ depends on the market return $X$:

$$
Y_i = \alpha + \beta X_i + \varepsilon_i
$$

where $\alpha$ is the intercept, $\beta$ the slope (the change in $Y$ for a one-unit change in $X$) and $\varepsilon_i$ the error, everything about $Y$ that $X$ does not explain. In finance, $\beta$ is the market beta and $\alpha$ the return unexplained by market exposure. "Linear" means linear in the parameters: $X$ can be transformed (logged, squared) and the model is still linear regression.

### Ordinary least squares
OLS picks $\hat{\alpha}$ and $\hat{\beta}$ to minimise the sum of squared residuals $\sum (Y_i - \hat{\alpha} - \hat{\beta}X_i)^2$. The solution ties directly back to the covariance and variance from earlier lessons:

$$
\hat{\beta} = \frac{\sum (X_i - \bar{X})(Y_i - \bar{Y})}{\sum (X_i - \bar{X})^2} = \frac{\widehat{\operatorname{Cov}}(X, Y)}{\widehat{\operatorname{Var}}(X)}, \qquad \hat{\alpha} = \bar{Y} - \hat{\beta}\bar{X}
$$

The fitted line always passes through the point of means $(\bar{X}, \bar{Y})$. Because $\operatorname{Cov} = \rho\sigma_X\sigma_Y$, we can also write $\hat{\beta} = \hat{\rho}\,\hat{\sigma}_Y / \hat{\sigma}_X$.

### Key assumptions
OLS estimates are unbiased and well-behaved when: the errors have mean zero given $X$ (no omitted factor correlated with $X$); the observations are iid; large outliers are rare; and $X$ varies. For the simple standard-error formulas, the errors should also be **homoskedastic** (constant variance). Later lessons deal with what happens when these fail.

### Goodness of fit
Total variation in $Y$ splits into an explained part and a residual part:

$$
\underbrace{\sum (Y_i - \bar{Y})^2}_{TSS} = \underbrace{\sum (\hat{Y}_i - \bar{Y})^2}_{ESS} + \underbrace{\sum \hat{\varepsilon}_i^2}_{RSS}
$$

The coefficient of determination is $R^2 = ESS/TSS = 1 - RSS/TSS$, the share of the variation in $Y$ explained by $X$. With a single regressor, $R^2$ equals the squared correlation between $X$ and $Y$. A high $R^2$ does not prove causation, and a low $R^2$ does not make a significant slope useless.

The **standard error of the regression** $s = \sqrt{RSS/(n-2)}$ measures the typical size of a residual; we divide by $n - 2$ because two parameters were estimated.

### Inference on the slope
The slope estimate has a standard error

$$
SE(\hat{\beta}) = \frac{s}{\sqrt{\sum (X_i - \bar{X})^2}}
$$

and a test of $H_0: \beta = \beta_0$ uses $t = (\hat{\beta} - \beta_0)/SE(\hat{\beta})$, compared with a t distribution with $n - 2$ degrees of freedom (or a normal in large samples). A confidence interval is $\hat{\beta} \pm c \times SE(\hat{\beta})$. More data and more spread in $X$ both shrink the standard error.

## Worked example
Five paired observations of a market factor $X$ and a portfolio return $Y$ (%): (1, 2), (2, 3), (3, 5), (4, 4), (5, 6).

**Step 1 - means.** $\bar{X} = 3$, $\bar{Y} = 4$.

**Step 2 - cross-products and squares.** Deviations of $X$: −2, −1, 0, 1, 2; of $Y$: −2, −1, 1, 0, 2. Cross-products: 4, 1, 0, 0, 4, summing to 9. Squared $X$ deviations sum to 10.

**Step 3 - coefficients.** $\hat{\beta} = 9/10 = 0.90$; $\hat{\alpha} = 4 - 0.90 \times 3 = 1.30$.

**Step 4 - residuals.** Fitted values: 2.2, 3.1, 4.0, 4.9, 5.8. Residuals: −0.2, −0.1, 1.0, −0.9, 0.2. $RSS = 0.04 + 0.01 + 1.00 + 0.81 + 0.04 = 1.90$.

**Step 5 - fit.** $TSS = 4 + 1 + 1 + 0 + 4 = 10$, so $R^2 = 1 - 1.90/10 = 0.81$.

**Step 6 - standard errors.** $s^2 = 1.90/3 = 0.633$, $s = 0.796$. $SE(\hat{\beta}) = 0.796/\sqrt{10} = 0.252$.

**Step 7 - test.** $t = 0.90/0.252 = 3.58$. With 3 degrees of freedom the two-tailed 5% critical value is 3.182, so we reject $H_0: \beta = 0$.

**The fitted line is $\hat{Y} = 1.30 + 0.90X$ with $R^2 = 0.81$; the slope's t-statistic of 3.58 is significant at 5%.**

## Common exam traps
- Inverting the beta formula: divide the covariance by the variance of the *explanatory* variable, not of $Y$.
- Testing whether beta equals 1 but computing the t-statistic against zero; subtract the hypothesised value.
- Using $n - 1$ instead of $n - 2$ degrees of freedom for the regression standard error and the slope test.
- Reading $R^2$ as the slope or as evidence of causation.
- Forgetting that the intercept uses the slope: $\hat{\alpha} = \bar{Y} - \hat{\beta}\bar{X}$.

## Key takeaways
- OLS minimises squared residuals; the slope is $\widehat{\operatorname{Cov}}(X, Y)/\widehat{\operatorname{Var}}(X)$ and the line passes through the means.
- Unbiasedness requires errors with zero mean given $X$, which fails when a relevant variable is omitted.
- $R^2$ is the share of variation explained and equals $\rho^2$ with one regressor.
- Slope inference uses $t = (\hat{\beta} - \beta_0)/SE(\hat{\beta})$ with $n - 2$ degrees of freedom.
- Larger samples and wider spread in $X$ make slope estimates more precise.
