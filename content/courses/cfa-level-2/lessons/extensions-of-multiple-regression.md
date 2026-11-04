---
title: "Extensions of Multiple Regression"
---

## Learning goals
- Distinguish high-leverage points, outliers and influential observations, and apply the standard detection thresholds.
- Specify and interpret intercept dummies, slope dummies and interaction terms.
- Explain why logistic regression is used for a binary dependent variable and interpret its coefficients as log-odds.
- Convert a logistic regression output into an event probability and test joint significance with a likelihood ratio test.

## Explanation

### Influential observations
OLS squares residuals, so a handful of unusual points can drag the fitted line. Separate three ideas:
- A **high-leverage point** has an extreme value of the *independent* variables.
- An **outlier** has an extreme value of the *dependent* variable given its $X$s (a large residual).
- An **influential observation** is one whose removal materially changes the estimated coefficients. Influence usually needs both leverage and a large residual.

**Leverage** $h_{ii}$ is between 0 and 1 and measures how far observation $i$'s $X$ values are from the sample means. Flag it as high when
$$
h_{ii} > 3\left(\frac{k+1}{n}\right)
$$
where $k$ is the number of independent variables and $n$ the number of observations.

**Studentized residuals** rescale each residual using a model estimated without that observation. Compare to a t critical value with $n - k - 2$ degrees of freedom; a larger absolute value marks an outlier.

**Cook's distance** combines both: it measures how much all fitted values shift when observation $i$ is deleted. Values above 0.5 merit a look, values above 1 are likely influential, and above $2\sqrt{k/n}$ is another common cut-off.

Finding an influential point is a prompt to investigate, not to delete automatically: it may be a data error, or it may be the most informative observation you have.

### Dummy variables
Qualitative effects (a quarter, a sector, a policy regime) enter through 0/1 dummy variables. With $n$ categories, use $n - 1$ dummies; including all $n$ alongside an intercept creates perfect collinearity (the dummy variable trap). The omitted category is the base, and each dummy coefficient is measured relative to it.

An **intercept dummy** shifts the line up or down. A **slope dummy** (an interaction $D \times X$) lets the slope differ between groups:
$$
Y_i = b_0 + d_0 D_i + b_1 X_i + d_1 (D_i X_i) + \varepsilon_i
$$
where $D_i = 1$ for the group of interest. For the base group ($D = 0$) the line is $b_0 + b_1 X$; for the other group it is $(b_0 + d_0) + (b_1 + d_1)X$. A t-test on $d_0$ asks whether the intercepts differ; on $d_1$, whether the slopes differ.

### Logistic regression
When the dependent variable is binary (default or not, takeover target or not), a linear model can predict probabilities below 0 or above 1. Logistic regression models the log of the odds:
$$
\ln\!\left(\frac{P}{1-P}\right) = b_0 + b_1 X_1 + \dots + b_k X_k
$$
where $P$ is the probability of the event. Solving for $P$:
$$
P = \frac{1}{1 + e^{-(b_0 + b_1 X_1 + \dots + b_k X_k)}}
$$
which always lies between 0 and 1. Coefficients are estimated by maximum likelihood, not OLS.

Interpretation: $b_j$ is the change in the **log-odds** for a one-unit change in $X_j$; $e^{b_j}$ is the **odds ratio**, the factor by which the odds are multiplied. Fit is judged with a **likelihood ratio (LR) test**,
$$
\text{LR} = -2(\ln L_{\text{restricted}} - \ln L_{\text{unrestricted}}) \sim \chi^2_q
$$
where $q$ is the number of restrictions, and with a **pseudo R-squared**, which can be compared only across models of the same dependent variable.

## Worked example
A credit analyst fits a logistic model of default: log-odds $= -2.5 + 0.8\,\text{LEV} - 1.2\,\text{COV}$, where LEV is debt/EBITDA and COV is a profitability score. Sample: $n = 50$ issuers.

**Step 1 - Log-odds** for an issuer with LEV = 3.0 and COV = 0.5:
$$
-2.5 + 0.8(3.0) - 1.2(0.5) = -2.5 + 2.4 - 0.6 = -0.70
$$

**Step 2 - Odds and probability.** Odds $= e^{-0.70} = 0.497$.
$$
P = \frac{1}{1 + e^{0.70}} = \frac{1}{1 + 2.014} = 0.332
$$
The issuer's default probability is **about 33.2%**.

**Step 3 - Odds ratio.** $e^{0.8} = 2.23$: one extra turn of leverage multiplies the default odds by **2.23**, holding COV constant. Note it multiplies the odds, not the probability.

**Step 4 - LR test.** Log-likelihood with both variables is -135.1; with intercept only it is -142.6.
$$
\text{LR} = -2(-142.6 - (-135.1)) = 15.0
$$
The 5% critical $\chi^2$ with 2 df is 5.99, so the two variables are **jointly significant**.

**Step 5 - Leverage screen.** With $k = 2$ the threshold is $3(3/50) = 0.18$. An issuer with $h_{ii} = 0.25$ has high leverage and should be checked with Cook's distance.

## Common exam traps
- Calling every extreme point an outlier: leverage concerns $X$, outliers concern $Y$, influence concerns the estimates.
- Using $n$ dummies for $n$ categories, which triggers perfect collinearity.
- Forgetting to add the slope-dummy coefficient to the base slope when predicting for $D = 1$.
- Reporting the odds, or the log-odds, as if they were the probability.
- Reading a logistic coefficient as a change in probability rather than in log-odds.

## Key takeaways
- High leverage: $h_{ii} > 3(k+1)/n$; outliers: large studentized residuals; influence: large Cook's distance.
- Use $n - 1$ dummies; each coefficient is relative to the omitted base category.
- Slope dummies let the effect of $X$ differ by group; intercept dummies shift the level.
- Logistic regression models log-odds; probability $= 1/(1 + e^{-z})$.
- $e^{b}$ is the odds ratio; the LR test plays the role of the F-test.
