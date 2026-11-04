---
title: "Simple Linear Regression"
---

## Learning goals
- Estimate the slope and intercept of a simple linear regression by ordinary least squares and interpret them.
- State the assumptions of the simple linear regression model.
- Decompose total variation using an ANOVA table and calculate R², the standard error of estimate and the F-statistic.
- Test hypotheses about the slope coefficient and construct a prediction interval.
- Interpret log-lin, lin-log and log-log functional forms.

## Explanation

### The idea
Correlation, from earlier lessons, tells us *whether* two variables move together. Regression tells us *how much* one variable (the dependent variable $Y$) changes when another (the independent variable $X$) changes, and lets us forecast. The model is:

$$
Y_i = b_0 + b_1 X_i + \varepsilon_i
$$

where $b_0$ is the intercept, $b_1$ the slope and $\varepsilon_i$ the error term. Ordinary least squares (OLS) chooses the line that minimises the sum of squared residuals $\sum (Y_i - \hat{Y}_i)^2$:

$$
\hat{b}_1 = \frac{\sum (X_i - \bar{X})(Y_i - \bar{Y})}{\sum (X_i - \bar{X})^2} = \frac{Cov(X,Y)}{Var(X)} \qquad \hat{b}_0 = \bar{Y} - \hat{b}_1\bar{X}
$$

The fitted line always passes through $(\bar{X}, \bar{Y})$. The slope is the expected change in $Y$ for a one-unit change in $X$; the intercept is the predicted $Y$ when $X = 0$.

### Assumptions
1. **Linearity**: the true relationship between $Y$ and $X$ is linear in the parameters.
2. **Homoskedasticity**: the error variance is the same for all observations.
3. **Independence**: the errors are uncorrelated with one another.
4. **Normality**: the errors are normally distributed.

Residual plots are the main diagnostic: a funnel shape signals heteroskedasticity; a pattern over time signals dependence.

### ANOVA and goodness of fit
Total variation in $Y$ splits into explained and unexplained parts:

$$
\underbrace{\sum (Y_i - \bar{Y})^2}_{SST} = \underbrace{\sum (\hat{Y}_i - \bar{Y})^2}_{SSR} + \underbrace{\sum (Y_i - \hat{Y}_i)^2}_{SSE}
$$

- $R^2 = SSR/SST$: the share of variation explained. In simple regression it equals the squared correlation.
- $MSR = SSR/1$ and $MSE = SSE/(n-2)$.
- Standard error of estimate $SEE = \sqrt{MSE}$: the typical size of a residual.
- $F = MSR/MSE$ with 1 and $n-2$ degrees of freedom tests whether the slope is zero. With one regressor, $F = t^2$.

### Testing the slope
$$
t = \frac{\hat{b}_1 - B_1}{s_{\hat{b}_1}}, \qquad s_{\hat{b}_1} = \frac{SEE}{\sqrt{\sum (X_i - \bar{X})^2}}, \qquad df = n-2
$$

where $B_1$ is the hypothesised value: usually 0 (does $X$ matter?), but 1 when testing whether a stock's beta equals the market's.

### Prediction
The point forecast is $\hat{Y}_f = \hat{b}_0 + \hat{b}_1X_f$. The prediction interval is $\hat{Y}_f \pm t_c \, s_f$, where

$$
s_f = SEE\sqrt{1 + \frac{1}{n} + \frac{(X_f - \bar{X})^2}{\sum (X_i - \bar{X})^2}}
$$

The interval widens as $X_f$ moves away from $\bar{X}$.

### Functional forms
If the relationship is curved, transform variables. **Log-lin** ($\ln Y = b_0 + b_1X$): $b_1$ is the relative (percentage) change in $Y$ per unit change in $X$. **Lin-log** ($Y = b_0 + b_1\ln X$): $b_1$ is the absolute change in $Y$ per relative change in $X$. **Log-log** ($\ln Y = b_0 + b_1\ln X$): $b_1$ is an elasticity.

## Worked example
Five months of excess returns (%) on the market ($X$) and a stock ($Y$): (1, 2), (3, 4), (−2, −1), (4, 5), (2, 1).

**Step 1 - means.** $\bar{X} = 1.6$, $\bar{Y} = 2.2$.

**Step 2 - sums.** Deviation products: 0.12, 2.52, 11.52, 6.72, −0.48, summing to 20.4. Squared $X$ deviations sum to 21.2.

**Step 3 - coefficients.** $\hat{b}_1 = 20.4/21.2 = 0.962$; $\hat{b}_0 = 2.2 - 0.962(1.6) = 0.660$.

**Step 4 - ANOVA.** $SST = 22.80$; fitted values give $SSR = 19.63$ and $SSE = 3.17$. $R^2 = 19.63/22.80 = 0.861$. $MSE = 3.17/3 = 1.057$, so $SEE = 1.028$. $F = 19.63/1.057 = 18.58$.

**Step 5 - slope test.** $s_{\hat{b}_1} = 1.028/\sqrt{21.2} = 0.2232$. Testing $b_1 = 0$: $t = 0.962/0.2232 = 4.31$, above the two-tailed 5% critical value of 3.182 (3 df), so the slope is significant. Note $4.31^2 = 18.58 = F$.

**Step 6 - forecast.** For $X_f = 5$: $\hat{Y}_f = 0.660 + 0.962(5) = 5.47$. Then $s_f = 1.028\sqrt{1 + 0.2 + 11.56/21.2} = 1.358$, giving a 95% prediction interval of $5.47 \pm 3.182(1.358)$, or **1.15% to 9.79%**.

## Common exam traps
- Dividing covariance by the variance of $Y$ instead of $X$ when computing the slope.
- Using $n-1$ instead of $n-2$ degrees of freedom for MSE, the slope t-test or the F-test.
- Testing beta against 0 when the question asks whether it differs from 1.
- Confusing SEE (residual dispersion) with the standard error of the slope.
- Misreading a log-lin slope as an absolute change instead of a percentage change.

## Key takeaways
- OLS slope = Cov(X, Y)/Var(X); intercept = $\bar{Y} - \hat{b}_1\bar{X}$.
- Key assumptions: linearity, homoskedasticity, independent errors and normal errors.
- SST = SSR + SSE; $R^2 = SSR/SST$; $SEE = \sqrt{SSE/(n-2)}$.
- $F = MSR/MSE$, and in simple regression $F = t^2$ for the slope test.
- Prediction intervals widen the further the forecast $X$ is from its mean.
- Log transformations handle curvature; the slope's meaning depends on which variables are logged.
