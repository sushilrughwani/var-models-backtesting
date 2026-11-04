---
title: "Common Univariate Random Variables"
---

## Learning goals
- Calculate probabilities for Bernoulli, binomial and Poisson random variables.
- Standardise a normal variable and use z-values to find probabilities and quantiles.
- Explain why asset prices are often modelled as lognormal and compute the lognormal median and mean.
- Describe the Student's t, chi-square and F distributions and where each is used in risk management.

## Explanation

### Counting distributions
A **Bernoulli** variable is a single yes/no trial: $X = 1$ (for example, default) with probability $p$ and $X = 0$ otherwise. Its mean is $p$ and variance $p(1-p)$.

Add up $n$ independent Bernoulli trials with the same $p$ and you get a **binomial** count:

$$
P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}, \qquad E[X] = np, \quad \operatorname{Var}(X) = np(1-p)
$$

where $\binom{n}{k} = \frac{n!}{k!(n-k)!}$ counts the ways to choose which $k$ trials succeed. Backtesting a VaR model uses exactly this: each day is an exceedance or not.

When events arrive randomly at an average rate $\lambda$ per period (operational losses, defaults in a very large pool), the **Poisson** distribution applies:

$$
P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}, \qquad E[X] = \operatorname{Var}(X) = \lambda
$$

### The normal distribution
The **normal** $N(\mu, \sigma^2)$ is symmetric with skewness 0 and kurtosis 3. Any normal variable can be converted to the standard normal $Z \sim N(0,1)$:

$$
Z = \frac{X - \mu}{\sigma}
$$

Key values: about 68% of probability lies within one standard deviation, 95% within 1.96 and 99% within 2.58. One-tailed, the 5% and 1% critical values are 1.645 and 2.326. A linear combination of jointly normal variables is normal, which makes the normal convenient for portfolios. Its weakness is thin tails relative to real returns.

### The lognormal distribution
If $\ln S$ is normal, $S$ is **lognormal**. Prices cannot fall below zero and compound multiplicatively, so a normal log return implies a lognormal price. If $\ln(S_T / S_0) \sim N(m, s^2)$:

$$
\text{median}(S_T) = S_0 e^{m}, \qquad E[S_T] = S_0 e^{m + s^2/2}
$$

The lognormal is right-skewed, so its mean exceeds its median.

### Distributions built from normals
- **Chi-square** with $k$ degrees of freedom, $\chi^2_k$, is the sum of $k$ squared independent standard normals. It is non-negative and right-skewed, with mean $k$ and variance $2k$. It is used to test variances.
- **Student's t** with $\nu$ degrees of freedom is $Z / \sqrt{\chi^2_\nu / \nu}$. It is symmetric but has fatter tails than the normal; its variance is $\nu/(\nu - 2)$ for $\nu > 2$. As $\nu$ grows it converges to the standard normal. It is used for tests on means when the variance is estimated, and as a fat-tailed return model.
- **F** with $(k_1, k_2)$ degrees of freedom is the ratio of two independent chi-squares, each divided by its degrees of freedom. It is used to compare variances and for joint tests in regression.

Other distributions you should recognise: the **uniform**, where every value in $[a, b]$ is equally likely (mean $(a+b)/2$), and the **exponential**, which models the waiting time between Poisson events.

## Worked example
**Part 1 - binomial.** A portfolio holds 10 bonds, each defaulting independently with probability 0.05.
$P(X = 0) = 0.95^{10} = 0.5987$.
$P(X = 1) = 10(0.05)(0.95^9) = 0.3151$.
$P(X \ge 2) = 1 - 0.5987 - 0.3151 = 0.0861$.

**Part 2 - Poisson.** A bank experiences on average 2 large operational losses per year.
$P(X = 3) = 2^3 e^{-2} / 3! = 8(0.13534)/6 = 0.1804$.

**Part 3 - normal.** Monthly returns are $N(1\%, 4\%^2)$. The probability of a return below −5% uses $z = (-5 - 1)/4 = -1.5$, and $N(-1.5) = 0.0668$.

**Part 4 - lognormal.** A stock trades at 100 and its one-year log return is normal with mean 0.05 and standard deviation 0.20. Median price $= 100e^{0.05} = 105.13$. Mean price $= 100e^{0.05 + 0.02} = 107.25$.

**Results: P(two or more defaults) = 0.0861, P(three operational losses) = 0.1804, P(return below −5%) = 0.0668, and the lognormal median and mean prices are 105.13 and 107.25.**

## Common exam traps
- Forgetting the $\binom{n}{k}$ term in the binomial, which counts the orderings.
- Computing "at least one" as $p$ times $n$ instead of $1 - (1-p)^n$.
- Mixing up one-tailed (1.645, 2.326) and two-tailed (1.96, 2.58) critical values.
- Assuming the lognormal mean equals $S_0 e^{m}$; that is the median. The mean adds $s^2/2$.
- Thinking the t distribution has thinner tails than the normal. It has fatter tails, converging to the normal as degrees of freedom rise.

## Key takeaways
- Bernoulli is one trial, binomial counts successes in $n$ trials, and Poisson counts random arrivals at rate $\lambda$ with mean equal to variance.
- Standardise any normal with $z = (x - \mu)/\sigma$ and memorise the key critical values.
- Normal log returns imply lognormal prices; the lognormal mean exceeds its median.
- Chi-square tests variances, t tests means with estimated variance, and F compares variances or tests joint restrictions.
- The t distribution's fatter tails make it a useful alternative to the normal for returns.
