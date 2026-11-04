---
title: "CAPM and Regression With statsmodels"
---

## Learning goals
- Estimate a stock's alpha and beta by regressing excess returns on market excess returns.
- Fit an OLS model with statsmodels and extract coefficients, standard errors, t-statistics and R².
- Test whether beta differs from 1 and whether alpha differs from 0.
- Verify the regression beta with the covariance-over-variance formula.

## Explanation

### The model
The CAPM says a stock's expected excess return is proportional to the market's expected excess return, with beta as the constant of proportionality. To estimate beta from data we run the time-series regression

$$
R_{i,t} - R_{f,t} = \alpha_i + \beta_i \,(R_{m,t} - R_{f,t}) + \varepsilon_{i,t}
$$

where $R_{i,t}$ is the stock return in period $t$, $R_{f,t}$ the risk-free rate, $R_{m,t}$ the market return, $\alpha_i$ the intercept (Jensen's alpha), $\beta_i$ the slope and $\varepsilon_{i,t}$ the residual. If the CAPM holds, alpha should be zero: any return is explained by market exposure.

### Beta without regression
The OLS slope in a one-variable regression equals

$$
\beta_i = \frac{\operatorname{Cov}(R_i - R_f,\; R_m - R_f)}{\operatorname{Var}(R_m - R_f)}, \qquad \alpha_i = \bar{y} - \beta_i \bar{x}
$$

where $\bar{y}$ and $\bar{x}$ are the mean stock and market excess returns. This gives a quick sanity check on any regression output.

### Reading the statsmodels output
statsmodels does not add an intercept automatically, so `sm.add_constant()` inserts a column of ones named `const`. After `.fit()`, the results object holds:
- `params`: alpha (`const`) and beta.
- `bse`: standard errors, measuring how precisely each coefficient is estimated.
- `tvalues`: coefficient divided by its standard error, which tests the null hypothesis that the coefficient is zero. A rule of thumb: |t| above about 2 is significant at the 5% level.
- `rsquared`: the share of the stock's variance explained by the market (systematic risk). The rest, $1 - R^2$, is idiosyncratic risk.
- `conf_int()`: 95% confidence intervals for each coefficient.

The printed t-statistic for beta tests $\beta = 0$, which is rarely interesting. To test $\beta = 1$ (does the stock move one-for-one with the market?) compute $t = (\hat\beta - 1)/SE(\hat\beta)$ yourself.

### The code
We simulate ten years of monthly data with a true beta of 1.3 and a true alpha of 0.1% per month, then see what the regression recovers.

```python
import numpy as np
import pandas as pd
import statsmodels.api as sm

rng = np.random.default_rng(2024)
n = 120                                   # 10 years of monthly data
rf = np.full(n, 0.002)                    # 0.2% per month risk-free rate
mkt = rng.normal(0.007, 0.045, n)         # market return
stock = rf + 0.001 + 1.3 * (mkt - rf) + rng.normal(0, 0.03, n)

df = pd.DataFrame({"mkt_ex": mkt - rf, "stk_ex": stock - rf})
X = sm.add_constant(df["mkt_ex"])         # adds the intercept column
model = sm.OLS(df["stk_ex"], X).fit()

print(model.params.round(4))
print(model.bse.round(4))
print(model.tvalues.round(2))
print(f"R-squared: {model.rsquared:.4f}")
print(model.conf_int(alpha=0.05).round(4))
t_beta1 = (model.params["mkt_ex"] - 1) / model.bse["mkt_ex"]
print(f"t-stat for H0 beta = 1: {t_beta1:.2f}")
print(f"Annualised alpha: {model.params['const'] * 12:.4f}")
```

Output:

```
const     0.0004
mkt_ex    1.1608
dtype: float64
const     0.0028
mkt_ex    0.0675
dtype: float64
const      0.13
mkt_ex    17.20
dtype: float64
R-squared: 0.7150
             0       1
const  -0.0052  0.0060
mkt_ex  1.0272  1.2944
t-stat for H0 beta = 1: 2.38
Annualised alpha: 0.0043
```

### Interpreting the results
- **Beta = 1.16**, with a t-statistic of 17.2: strongly significant exposure to the market. Its 95% interval (1.03 to 1.29) excludes 1, and the test of $\beta = 1$ gives t = 2.38, so the stock is significantly more aggressive than the market.
- **Alpha = 0.04% per month** (about 0.43% a year) with t = 0.13: statistically indistinguishable from zero. Notice the confidence interval spans −0.52% to +0.60% per month. Even though we built in a true alpha of 0.1% per month, 120 months of noisy data cannot detect it. Alpha is notoriously hard to measure.
- **R² = 0.715**: about 72% of the stock's return variance is market-driven; 28% is stock-specific.
- The estimated beta (1.16) differs from the true 1.3, but 1.3 lies just outside the confidence interval's upper end of 1.29. That is a reminder that even a 10-year estimate carries sampling error, and that one sample can be unlucky.

You can also call `print(model.summary())` for the full table, which adds the F-statistic, Durbin-Watson and other diagnostics.

## Worked example
Five months of excess returns. Market: 2%, −1%, 3%, 0%, 1%. Stock: 3%, −2%, 4%, 1%, 2%. Estimate beta and alpha by hand, then confirm with statsmodels.

```python
import numpy as np
import statsmodels.api as sm

m = np.array([0.02, -0.01, 0.03, 0.00, 0.01])   # market excess returns
s = np.array([0.03, -0.02, 0.04, 0.01, 0.02])   # stock excess returns
beta = np.cov(s, m, ddof=1)[0, 1] / np.var(m, ddof=1)
alpha = s.mean() - beta * m.mean()
print(f"beta={beta:.4f} alpha={alpha:.4f}")
print(sm.OLS(s, sm.add_constant(m)).fit().params.round(4))
```

```
beta=1.4000 alpha=0.0020
[0.002 1.4  ]
```

1. Means: market 1.0%, stock 1.6%.
2. Market deviations: 0.01, −0.02, 0.02, −0.01, 0.00. Stock deviations: 0.014, −0.036, 0.024, −0.006, 0.004.
3. Sum of cross-products: 0.00014 + 0.00072 + 0.00048 + 0.00006 + 0 = 0.0014.
4. Sum of squared market deviations: 0.0001 + 0.0004 + 0.0004 + 0.0001 + 0 = 0.0010.
5. Beta = 0.0014 / 0.0010 = **1.40** (the n − 1 divisors cancel).
6. Alpha = 1.6% − 1.40 × 1.0% = **0.20% per month**, matching statsmodels.

## Common exam traps
- Forgetting `sm.add_constant`, which forces the line through the origin and biases beta.
- Regressing raw returns instead of excess returns when the question asks for Jensen's alpha.
- Reading the default beta t-statistic as a test of $\beta = 1$; it tests $\beta = 0$.
- Mixing `ddof` in the covariance and variance when computing beta by hand; use the same in both.
- Treating a positive but insignificant alpha as evidence of skill.

## Key takeaways
- Beta is the slope and alpha the intercept of an excess-return regression.
- `sm.OLS(y, sm.add_constant(x)).fit()` gives `params`, `bse`, `tvalues`, `rsquared` and `conf_int()`.
- Beta = Cov / Var is a quick check on the regression.
- R² splits risk into systematic and idiosyncratic parts.
- Alpha estimates are noisy; demand a large t-statistic before believing them.
