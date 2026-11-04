---
title: "Regression Diagnostics"
---

## Learning goals
- Explain the consequences of heteroskedasticity for OLS and perform White's test.
- Calculate the omitted variable bias and contrast it with the cost of including an irrelevant variable.
- Identify outliers and influential observations using Cook's distance.
- Describe practical approaches to model specification, including general-to-specific and cross-validation.

## Explanation

### Why diagnostics?
OLS is the best linear unbiased estimator only when its assumptions hold: the errors have mean zero given the regressors, constant variance, no extreme outliers, and the model includes the right variables. Diagnostics are the checks a careful analyst runs *after* estimating a regression to see whether those assumptions are credible. Think of them as the post-flight inspection: the plane landed, but is anything about to fall off?

### Heteroskedasticity
Errors are **homoskedastic** when $Var(\varepsilon_i \mid X_i) = \sigma^2$ for every observation, and **heteroskedastic** when the variance changes with the regressors. Financial data are often heteroskedastic: loss rates on larger loan books, or returns in turbulent months, are more dispersed.

The consequences are specific. OLS coefficients remain **unbiased and consistent**, but the usual standard errors are wrong, so t-tests, F-tests and confidence intervals are unreliable, and OLS is no longer the most efficient estimator. The standard fix is to keep the OLS coefficients and use **heteroskedasticity-robust (White) standard errors**. If the form of the variance is known, weighted least squares restores efficiency.

**White's test** regresses the squared residuals on the original regressors, their squares and their cross-products. With two regressors the auxiliary regression is

$$
\hat\varepsilon_i^2 = \gamma_0 + \gamma_1 X_{1i} + \gamma_2 X_{2i} + \gamma_3 X_{1i}^2 + \gamma_4 X_{2i}^2 + \gamma_5 X_{1i}X_{2i} + \eta_i
$$

Under the null of homoskedasticity, the test statistic is

$$
LM = nR^2_{aux} \sim \chi^2_{p}
$$

where $n$ is the sample size, $R^2_{aux}$ is from the auxiliary regression and $p$ is the number of its slope terms. With $k$ original regressors, $p = k + k + k(k-1)/2$ (levels, squares and cross-products).

### Omitted variables
Suppose the true model is $Y = \alpha + \beta_1 X_1 + \beta_2 X_2 + \varepsilon$ but we regress $Y$ on $X_1$ alone. If $X_2$ matters ($\beta_2 \neq 0$) and is correlated with $X_1$, the estimated slope is biased:

$$
\hat\beta_1 \to \beta_1 + \beta_2 \delta, \qquad \delta = \frac{Cov(X_1, X_2)}{Var(X_1)}
$$

$\delta$ is the slope from regressing $X_2$ on $X_1$. The bias does not vanish with more data, so the estimator is inconsistent. If the omitted variable is uncorrelated with the included one ($\delta = 0$), there is no bias, only a larger error variance.

### Extraneous variables and the bias-variance trade-off
Including a variable that does not belong ($\beta = 0$) leaves the other coefficients unbiased but reduces precision, especially when the extra variable is correlated with the useful ones; adjusted $R^2$ also falls. So omitting a relevant variable causes **bias**, while adding an irrelevant one costs **variance**. Model selection balances the two.

### Choosing a specification
In **general-to-specific** modelling you start with all plausible regressors and remove the least significant one at a time until every remaining variable is significant. In **m-fold cross-validation** you split the data into $m$ blocks, estimate on $m-1$ of them, measure the forecast error on the held-out block, rotate, and choose the model with the lowest average out-of-sample error. Cross-validation guards against picking a model that merely fits the noise in one sample.

### Outliers and influential observations
An outlier is an observation with a large residual; it matters when it is also influential, meaning that dropping it changes the fitted line substantially. **Cook's distance** measures this:

$$
D_j = \frac{\sum_{i=1}^{n}\left(\hat Y_i^{(-j)} - \hat Y_i\right)^2}{p\, s^2}
$$

$\hat Y_i^{(-j)}$ is the fitted value for observation $i$ when observation $j$ is excluded from estimation, $p$ is the number of estimated coefficients (including the intercept) and $s^2$ is the residual variance from the full sample. A value above 1 flags an influential point that deserves investigation: a data error, a crisis month, or a genuine but rare event.

## Worked example
An analyst regresses monthly credit-card charge-off rates on unemployment ($X_1$) and the policy rate ($X_2$), with $n = 200$.

**Part 1 - White's test.** The auxiliary regression of squared residuals on $X_1$, $X_2$, $X_1^2$, $X_2^2$ and $X_1X_2$ has $R^2 = 0.12$.
- Number of slope terms: $p = 2 + 2 + 1 = 5$.
- $LM = 200 \times 0.12 = 24.0$.
- The 5% critical value of $\chi^2_5$ is 11.07. Since 24.0 > 11.07, **reject homoskedasticity**: keep the coefficients but report White standard errors.

**Part 2 - omitted variable bias.** Suppose the true slopes are $\beta_1 = 1.0$ and $\beta_2 = 0.5$, and a regression of $X_2$ on $X_1$ has slope $\delta = 0.6$. A colleague drops $X_2$.
- Bias $= \beta_2 \delta = 0.5 \times 0.6 = 0.30$.
- Expected estimated slope $= 1.0 + 0.30 = $ **1.30**, overstating the unemployment effect by 30%.

**Part 3 - Cook's distance.** For one crisis month, the squared changes in fitted values when that month is removed sum to 2.4. With $p = 3$ coefficients and $s^2 = 0.5$:
- $D = 2.4 / (3 \times 0.5) = $ **1.60**, above 1, so the month is influential and should be examined.

## Common exam traps
- Saying heteroskedasticity biases the OLS coefficients. It does not; it invalidates the standard errors.
- Miscounting the White-test degrees of freedom by forgetting the squared or cross-product terms.
- Believing omitted variable bias always exists. It requires the omitted variable to matter **and** to be correlated with an included regressor.
- Thinking an irrelevant regressor causes bias. It costs precision, not unbiasedness.
- Deleting every outlier automatically; investigate it first, because extreme events are exactly what risk managers must model.

## Key takeaways
- Heteroskedasticity: unbiased coefficients, wrong standard errors; fix with White robust standard errors.
- White's test: $nR^2$ from the auxiliary regression versus a chi-square with one df per slope term.
- Omitted variable bias $= \beta_2\delta$ and does not disappear in large samples.
- Omitting relevant variables creates bias; adding irrelevant ones inflates variance.
- Cook's distance above 1 signals an influential observation.
