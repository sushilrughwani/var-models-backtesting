---
title: "Regression With Multiple Explanatory Variables"
---

## Learning goals
- Interpret each slope in a multiple regression as a partial effect, holding the other regressors fixed.
- Calculate R-squared, adjusted R-squared and the standard error of the regression from an ANOVA table.
- Perform t-tests on single coefficients and F-tests on groups of coefficients.
- Explain multicollinearity, how to detect it with the variance inflation factor, and what it does (and does not) do to OLS.

## Explanation

### Why add more regressors?
In the previous lesson we explained a dependent variable $Y$ with a single regressor. Real risk questions rarely have one driver. A bank's credit-card loss rate depends on unemployment *and* interest rates; a stock's return depends on the market *and* on size and value factors. If we leave a relevant driver out, its effect leaks into the slopes we do estimate. Multiple regression lets each variable compete for explanatory power at the same time.

$$
Y_i = \alpha + \beta_1 X_{1i} + \beta_2 X_{2i} + \cdots + \beta_k X_{ki} + \varepsilon_i
$$

Here $\alpha$ is the intercept, $\beta_j$ is the slope on regressor $X_j$, $k$ is the number of slope coefficients, and $\varepsilon_i$ is the error. OLS still picks the coefficients that minimise the sum of squared residuals.

### Interpreting a slope: the partial effect
$\beta_1$ is the expected change in $Y$ for a one-unit change in $X_1$ **with all other regressors held constant**. Think of it as the effect of $X_1$ after the other regressors have been "netted out". That is why a coefficient can change sign or size when a new variable is added: the old slope was partly picking up the effect of the missing variable.

### Goodness of fit
The sum of squares decomposes exactly as in simple regression: $TSS = ESS + RSS$ (total = explained + residual).

$$
R^2 = \frac{ESS}{TSS} = 1 - \frac{RSS}{TSS}, \qquad \bar R^2 = 1 - (1-R^2)\frac{n-1}{n-k-1}
$$

$n$ is the number of observations. Ordinary $R^2$ never falls when a regressor is added, even a useless one, because OLS can always set the new slope to zero. Adjusted $\bar R^2$ charges a penalty for each extra parameter, so it can fall, and it can even be negative. The standard error of the regression is $s = \sqrt{RSS/(n-k-1)}$.

### Testing one coefficient
For $H_0: \beta_j = 0$ use $t = \hat\beta_j / SE(\hat\beta_j)$ with $n-k-1$ degrees of freedom. Reject if $|t|$ exceeds the critical value (about 2 at 5% for moderate samples).

### Testing several coefficients: the F-test
To test whether all slopes are zero together ($H_0: \beta_1 = \cdots = \beta_k = 0$):

$$
F = \frac{ESS/k}{RSS/(n-k-1)} = \frac{R^2/k}{(1-R^2)/(n-k-1)}
$$

To test a subset of $q$ restrictions, estimate an unrestricted model (all regressors) and a restricted model (with the $q$ variables dropped):

$$
F = \frac{(R^2_U - R^2_R)/q}{(1-R^2_U)/(n-k_U-1)}
$$

This has an $F_{q,\,n-k_U-1}$ distribution under the null. The F-test is one-sided: only large values reject. Joint tests matter because two coefficients can each look insignificant on their own yet be jointly significant, which is exactly what happens when regressors are correlated.

### Multicollinearity
When regressors are highly correlated with each other, OLS struggles to separate their individual effects. The estimates stay **unbiased**, but their standard errors balloon, t-statistics shrink, and coefficients can swing wildly between samples. A classic symptom is a high $R^2$ and a significant F-statistic alongside individually insignificant t-statistics. Detect it with the variance inflation factor:

$$
VIF_j = \frac{1}{1 - R_j^2}
$$

where $R_j^2$ comes from regressing $X_j$ on all the other regressors. A VIF above 10 ($R_j^2 > 0.9$) is a common warning sign. Perfect collinearity, such as including a dummy for every category plus an intercept (the dummy-variable trap), makes OLS impossible to compute at all.

## Worked example
A risk analyst regresses a portfolio's monthly excess return (%) on the market excess return ($X_1$) and a credit-spread change ($X_2$) using $n = 40$ months. The output is $\hat Y = 1.5 + 0.8X_1 - 0.3X_2$, with $SE(\hat\beta_1) = 0.25$, $SE(\hat\beta_2) = 0.20$, $TSS = 500$ and $ESS = 180$.

**Step 1 - residual sum of squares.** $RSS = 500 - 180 = 320$. Degrees of freedom $= 40 - 2 - 1 = 37$.

**Step 2 - fit.** $R^2 = 180/500 = 0.36$. Adjusted: $1 - 0.64 \times 39/37 = 0.3254$. Standard error of regression: $\sqrt{320/37} = 2.94$.

**Step 3 - t-tests.** $t_1 = 0.8/0.25 = 3.20$; $t_2 = -0.3/0.20 = -1.50$. The 5% two-sided critical value with 37 df is 2.03, so the market slope is significant and the spread slope is not.

**Step 4 - F-test of the whole regression.** $F = (180/2)/(320/37) = 90/8.649 = 10.41$, well above the 5% critical value $F_{2,37} = 3.25$. Together the regressors explain returns.

**Step 5 - prediction.** With $X_1 = 2$ and $X_2 = 3$: $1.5 + 0.8(2) - 0.3(3) = $ **2.2% predicted excess return**, with an adjusted R-squared of **0.325** and an overall F of **10.41**.

## Common exam traps
- Using $n - k$ instead of $n - k - 1$ degrees of freedom (forgetting the intercept).
- Claiming that a higher $R^2$ after adding a variable proves the variable is useful; compare adjusted $R^2$ or test it.
- Interpreting a slope without the phrase "holding the other regressors constant".
- Saying multicollinearity biases coefficients. It inflates standard errors; the estimates remain unbiased.
- Concluding that individually insignificant variables can be dropped together; test them jointly with an F-test.

## Key takeaways
- Each slope is a partial effect, net of the other regressors.
- $R^2$ never falls with extra regressors; adjusted $R^2$ penalises them and can fall.
- t-tests examine one coefficient; F-tests examine groups, using restricted versus unrestricted fit.
- Multicollinearity inflates standard errors and VIFs but leaves OLS unbiased.
- Degrees of freedom are $n - k - 1$ throughout.
