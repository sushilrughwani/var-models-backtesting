---
title: "Model Misspecification"
---

## Learning goals
- Identify the main forms of model misspecification and their consequences.
- Explain the effects of heteroskedasticity, serial correlation and multicollinearity on coefficients and standard errors.
- Conduct the Breusch-Pagan test for conditional heteroskedasticity and interpret a variance inflation factor.
- Select the appropriate remedy for each violation.

## Explanation

### Misspecification in functional form
A model is misspecified when its structure does not match the data-generating process. Four common forms:
- **Omitted variable**: a relevant variable is left out. If it is correlated with included variables, their coefficients are biased and inconsistent, and the error term absorbs the omitted effect.
- **Inappropriate form of variables**: the true relationship is non-linear (for example, the dependent variable should be in logs, or a squared term is needed).
- **Inappropriate scaling**: mixing variables in very different units or not normalising when the theory calls for ratios (such as using raw size instead of a per-share or per-asset figure).
- **Inappropriate pooling**: combining data from different regimes or populations (pre- and post-crisis, emerging and developed markets) into one regression.

Each of these often shows up downstream as heteroskedasticity, serial correlation or multicollinearity.

### Heteroskedasticity
The error variance differs across observations. **Unconditional** heteroskedasticity (unrelated to the $X$s) causes no major problems. **Conditional** heteroskedasticity, where the variance changes with the $X$s, is the dangerous kind. Coefficients stay unbiased, but standard errors are usually **understated**, so t-statistics are inflated and you reject true nulls too often (Type I errors). The F-test also becomes unreliable.

**Breusch-Pagan test**: regress the squared residuals on the original independent variables and compute
$$
\text{BP} = n \times R^2_{\text{resid}} \sim \chi^2_k
$$
where $n$ is the number of observations, $R^2_{\text{resid}}$ is the R-squared of the auxiliary regression and $k$ is the number of independent variables. It is a one-tailed test; a large value means the $X$s explain the squared residuals, so conditional heteroskedasticity is present.

**Remedy**: use robust (White-corrected, heteroskedasticity-consistent) standard errors. Generalised least squares is an alternative.

### Serial correlation
Errors are correlated across observations, typical in time-series data. With **positive** serial correlation and no lagged dependent variable among the regressors, coefficients remain consistent but standard errors are understated, again producing too many Type I errors. If a **lagged value of the dependent variable** is a regressor, serial correlation makes the coefficient estimates themselves **inconsistent**.

Detection: the Breusch-Godfrey test regresses residuals on the original $X$s and lagged residuals and tests whether the lag coefficients are jointly zero, and it handles several lags. The older Durbin-Watson statistic is approximately $\text{DW} \approx 2(1 - r)$, where $r$ is the first-order residual autocorrelation; values well below 2 indicate positive serial correlation.

**Remedy**: Newey-West standard errors, which correct for both serial correlation and heteroskedasticity, or modify the model (for example, add the missing dynamic term).

### Multicollinearity
Two or more independent variables are highly, but not perfectly, correlated. OLS still runs and coefficients are unbiased, but standard errors are **inflated**, so t-statistics are too small (Type II errors) and coefficients become unstable. The classic symptom: high $R^2$ and a significant F-statistic, yet few individually significant coefficients.

The variance inflation factor for variable $j$ is
$$
\text{VIF}_j = \frac{1}{1 - R^2_j}
$$
where $R^2_j$ comes from regressing $X_j$ on all the other independent variables. VIF above 5 warrants investigation; above 10 indicates serious multicollinearity.

**Remedy**: drop one of the correlated variables, use a different proxy, or gather more data.

### Summary of effects

| Problem | Coefficients | Standard errors | Typical error |
|---|---|---|---|
| Conditional heteroskedasticity | Unbiased | Too small | Type I |
| Positive serial correlation (no lagged Y) | Consistent | Too small | Type I |
| Serial correlation with lagged Y | Inconsistent | Unreliable | Both |
| Multicollinearity | Unbiased | Too large | Type II |

## Worked example
A 3-variable regression of bank stock returns uses $n = 60$ months.

**Step 1 - Breusch-Pagan.** Regressing squared residuals on the three variables gives $R^2 = 0.15$.
$$
\text{BP} = 60 \times 0.15 = 9.0
$$
The 5% critical $\chi^2$ with 3 df is 7.815. Since 9.0 > 7.815, **reject homoskedasticity**: conditional heteroskedasticity is present. Had the auxiliary $R^2$ been 0.12, BP = 7.2 and we would fail to reject.

**Step 2 - Consequence and fix.** The reported standard errors are probably too small. Re-estimate with robust standard errors; the coefficients do not change, but t-statistics shrink.

**Step 3 - Multicollinearity check.** Regressing the loan-growth variable on the other two gives $R^2_j = 0.85$:
$$
\text{VIF} = \frac{1}{1 - 0.85} = 6.67
$$
This exceeds 5, so **multicollinearity deserves attention**; it may explain why loan growth looks insignificant.

**Step 4 - Serial correlation.** First-order residual autocorrelation is 0.40, so DW ≈ 2(1 − 0.40) = **1.20**, well below 2, pointing to positive serial correlation. Newey-West standard errors would address both problems found so far.

## Common exam traps
- Saying heteroskedasticity or multicollinearity biases the coefficients; neither does.
- Mixing up directions: heteroskedasticity and serial correlation shrink standard errors, multicollinearity inflates them.
- Using $n - k - 1$ instead of $n$ in the Breusch-Pagan statistic, or using $n-1$ degrees of freedom for the chi-square.
- Forgetting that a lagged dependent variable makes serial correlation a consistency problem, not just a standard-error problem.
- Applying White standard errors to fix serial correlation; Newey-West is the tool for that.

## Key takeaways
- Omitted variables correlated with included ones bias coefficients; most other problems distort standard errors.
- Breusch-Pagan uses $nR^2$ from regressing squared residuals on the $X$s, with $k$ degrees of freedom.
- Robust standard errors fix heteroskedasticity; Newey-West fixes serial correlation and heteroskedasticity.
- High $R^2$, significant F and insignificant t-statistics signal multicollinearity; VIF above 5 is a warning.
- Always ask: are the coefficients wrong, or just the standard errors?
