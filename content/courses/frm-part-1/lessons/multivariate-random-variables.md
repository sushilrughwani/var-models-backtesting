---
title: "Multivariate Random Variables"
---

## Learning goals
- Read a joint probability table and derive marginal and conditional distributions.
- Calculate covariance and correlation from a joint distribution.
- Explain why zero correlation does not imply independence.
- Compute the mean and variance of a portfolio of two random variables.
- Apply the variance rules for sums and differences of correlated variables.

## Explanation

### Why we need more than one variable at a time
Risk lives in combinations. A bank's loss depends on how many loans default together; a portfolio's return depends on how its assets move together. The previous lesson described one random variable; now we describe two (or more) jointly.

### Joint, marginal and conditional distributions
For discrete $X$ and $Y$, the **joint PMF** $p(x, y) = P(X = x, Y = y)$ lists the probability of every pair, and all entries sum to 1. Summing a row or column gives a **marginal** distribution, the distribution of one variable ignoring the other:

$$
p_X(x) = \sum_y p(x, y)
$$

A **conditional** distribution fixes one variable and rescales:

$$
p(y \mid x) = \frac{p(x, y)}{p_X(x)}
$$

From it we get the conditional expectation $E[Y \mid X = x] = \sum_y y\,p(y \mid x)$. $X$ and $Y$ are **independent** when $p(x, y) = p_X(x)\,p_Y(y)$ for every pair, equivalently when every conditional distribution equals the marginal.

### Covariance and correlation
**Covariance** measures how two variables move together:

$$
\operatorname{Cov}(X, Y) = E\big[(X - \mu_X)(Y - \mu_Y)\big] = E[XY] - \mu_X \mu_Y
$$

Its units are awkward (units of $X$ times units of $Y$), so we scale it to get **correlation**:

$$
\rho_{XY} = \frac{\operatorname{Cov}(X, Y)}{\sigma_X \sigma_Y}, \qquad -1 \le \rho \le 1
$$

Correlation measures only *linear* association. Independence implies zero correlation, but the reverse fails: if $X$ is symmetric around zero and $Y = X^2$, then $Y$ is completely determined by $X$ yet their correlation is zero. Covariance scales with the variables, $\operatorname{Cov}(aX, bY) = ab\operatorname{Cov}(X, Y)$, while correlation is unchanged by positive scaling.

### Sums, differences and portfolios
For any constants $a$ and $b$:

$$
\operatorname{Var}(aX + bY) = a^2\sigma_X^2 + b^2\sigma_Y^2 + 2ab\operatorname{Cov}(X, Y)
$$

For a difference, $\operatorname{Var}(X - Y) = \sigma_X^2 + \sigma_Y^2 - 2\operatorname{Cov}(X, Y)$. The mean is always linear: $E[aX + bY] = a\mu_X + b\mu_Y$.

For a portfolio with weights $w_1$ and $w_2$ in two assets, write the covariance as $\rho\sigma_1\sigma_2$:

$$
\sigma_p^2 = w_1^2\sigma_1^2 + w_2^2\sigma_2^2 + 2w_1w_2\rho\,\sigma_1\sigma_2
$$

Unless $\rho = 1$, the portfolio standard deviation is below the weighted average of the individual standard deviations. That gap is diversification, and it is the reason correlation sits at the heart of portfolio risk, VaR aggregation and credit portfolio models.

### More than two variables
With $n$ assets the same logic uses a covariance matrix $\Sigma$ and weight vector $w$: $\sigma_p^2 = w^\top \Sigma w$. The number of covariances grows as $n(n-1)/2$, which is why factor models are used to simplify large portfolios.

## Worked example
Stock X returns −10% or +10%; stock Y returns −5% or +15%. The joint probabilities are: (−10, −5) 0.30; (−10, +15) 0.10; (+10, −5) 0.20; (+10, +15) 0.40.

**Step 1 - marginals.** $P(X = -10) = 0.40$, $P(X = 10) = 0.60$; $P(Y = -5) = 0.50$, $P(Y = 15) = 0.50$.

**Step 2 - means.** $\mu_X = -10(0.40) + 10(0.60) = 2$. $\mu_Y = -5(0.50) + 15(0.50) = 5$.

**Step 3 - E[XY].** $0.30(50) + 0.10(-150) + 0.20(-50) + 0.40(150) = 15 - 15 - 10 + 60 = 50$.

**Step 4 - covariance.** $50 - 2 \times 5 = 40$.

**Step 5 - variances.** $E[X^2] = 100$, so $\sigma_X^2 = 100 - 4 = 96$ and $\sigma_X = 9.80$. $E[Y^2] = 0.5(25) + 0.5(225) = 125$, so $\sigma_Y^2 = 100$ and $\sigma_Y = 10$.

**Step 6 - correlation.** $\rho = 40 / (9.80 \times 10) = 0.408$.

**Step 7 - conditional view.** $P(Y = 15 \mid X = 10) = 0.40/0.60 = 0.667$, so $E[Y \mid X = 10] = (-5 \times 0.20 + 15 \times 0.40)/0.60 = 8.33$, above the unconditional mean of 5. The variables are dependent.

**Step 8 - a portfolio.** Separately, put 60% in an asset with $\sigma = 20\%$ and 40% in one with $\sigma = 10\%$, with $\rho = 0.3$:
$\sigma_p^2 = 0.36(0.04) + 0.16(0.01) + 2(0.6)(0.4)(0.3)(0.20)(0.10) = 0.0144 + 0.0016 + 0.00288 = 0.01888$.

**Covariance is 40, correlation is 0.408, and the portfolio standard deviation is √0.01888 = 13.74%, below the 16% weighted average of the two volatilities.**

## Common exam traps
- Using conditional probabilities instead of joint probabilities when computing $E[XY]$.
- Forgetting the factor 2 on the covariance term, or using a plus sign for $\operatorname{Var}(X - Y)$.
- Concluding independence from zero correlation; only linear dependence is ruled out.
- Mixing percentages and decimals within the portfolio variance formula.
- Forgetting to divide by the marginal probability when forming a conditional distribution.

## Key takeaways
- Marginals come from summing the joint table; conditionals come from dividing by a marginal.
- Covariance is $E[XY] - \mu_X\mu_Y$; correlation rescales it to lie between −1 and 1.
- Independence implies zero correlation, never the other way round.
- $\operatorname{Var}(aX + bY) = a^2\sigma_X^2 + b^2\sigma_Y^2 + 2ab\operatorname{Cov}(X, Y)$ underpins portfolio risk.
- Correlation below 1 makes portfolio volatility smaller than the weighted average volatility.
