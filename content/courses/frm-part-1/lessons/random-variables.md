---
title: "Random Variables"
---

## Learning goals
- Distinguish discrete from continuous random variables and describe them with a PMF, PDF or CDF.
- Calculate the mean, variance and standard deviation of a random variable.
- Interpret skewness and kurtosis as measures of asymmetry and tail heaviness.
- Apply the rules for the mean and variance of a linear transformation.
- Find quantiles of a distribution and connect them to Value-at-Risk.

## Explanation

### From events to numbers
The previous lesson worked with events such as "the loan defaults". A **random variable** attaches a number to every outcome, for example the loss in USD on the loan. Once outcomes are numbers we can average them, measure their spread and ask how bad the worst 1% of cases might be.

### Discrete and continuous
A **discrete** random variable takes a countable set of values, such as the number of defaults in a portfolio. It is described by a **probability mass function** (PMF) $p(x) = P(X = x)$, with all probabilities non-negative and summing to 1.

A **continuous** random variable, such as a daily return, can take any value in an interval. Any single point has probability zero, so we use a **probability density function** (PDF) $f(x)$ and measure probability as area: $P(a \le X \le b) = \int_a^b f(x)\,dx$.

Both types share the **cumulative distribution function** (CDF) $F(x) = P(X \le x)$, which rises from 0 to 1 and never decreases.

### Moments
The **expected value** (mean) is the probability-weighted average outcome:

$$
E[X] = \sum_x x\,p(x) \quad \text{or} \quad E[X] = \int x\,f(x)\,dx
$$

The **variance** measures dispersion around the mean, and a convenient shortcut is often faster:

$$
\sigma^2 = E\big[(X - \mu)^2\big] = E[X^2] - \mu^2
$$

where $\mu = E[X]$. The **standard deviation** $\sigma$ is its square root, in the same units as $X$.

Two higher moments describe shape. **Skewness** $E[(X-\mu)^3]/\sigma^3$ is zero for symmetric distributions; positive skew means a long right tail. **Kurtosis** $E[(X-\mu)^4]/\sigma^4$ measures tail heaviness. A normal distribution has kurtosis 3, so **excess kurtosis** is kurtosis minus 3. Credit and operational losses typically show strong positive skew and high kurtosis: many small outcomes and rare, very large ones.

### Linear transformations
If $Y = a + bX$ for constants $a$ and $b$:

$$
E[Y] = a + b\,E[X], \qquad \operatorname{Var}(Y) = b^2 \operatorname{Var}(X)
$$

Adding a constant shifts the mean but leaves spread unchanged; scaling by $b$ multiplies the standard deviation by $|b|$. Skewness keeps its size but flips sign if $b < 0$; kurtosis is unaffected.

### Quantiles and the median
The $\alpha$-**quantile** is the smallest value $q$ with $F(q) \ge \alpha$. The median is the 0.5 quantile. For a loss distribution, the 99% quantile is the 99% VaR: the loss that is exceeded with only 1% probability. For discrete distributions the CDF jumps, so a quantile is read off at the jump where the CDF first reaches $\alpha$.

## Worked example
A small loan book produces a one-year loss $X$ (USD millions) with the following PMF: loss 0 with probability 0.90, loss 10 with probability 0.07 and loss 50 with probability 0.03.

**Step 1 - mean.** $E[X] = 0(0.90) + 10(0.07) + 50(0.03) = 0 + 0.7 + 1.5 = 2.2$.

**Step 2 - second moment.** $E[X^2] = 0(0.90) + 100(0.07) + 2500(0.03) = 7 + 75 = 82$.

**Step 3 - variance and standard deviation.** $\sigma^2 = 82 - 2.2^2 = 82 - 4.84 = 77.16$, so $\sigma = \sqrt{77.16} = 8.78$.

**Step 4 - shape.** Computing the third and fourth central moments gives skewness of about 4.87 and kurtosis of about 26.4: a strongly right-skewed, fat-tailed loss profile.

**Step 5 - quantiles.** The CDF is 0.90 at a loss of 0, 0.97 at 10 and 1.00 at 50. The 95% quantile is the first value where the CDF reaches 0.95, which is 10. The 99% quantile is 50.

**Step 6 - transformation.** If the bank's after-tax loss is $Y = 0.75X$, then $E[Y] = 1.65$ and $\sigma_Y = 0.75 \times 8.78 = 6.59$.

**Expected loss is USD 2.2 million with a standard deviation of USD 8.78 million; the 95% and 99% loss quantiles are USD 10 million and USD 50 million.** The mean is far below the 99% quantile, which is why risk managers never rely on the mean alone.

## Common exam traps
- Computing $E[X^2]$ and forgetting to subtract $\mu^2$, or subtracting $E[X]$ instead of its square.
- Writing $\operatorname{Var}(a + bX) = b\operatorname{Var}(X)$ or adding $a$ to the variance; the constant drops out and $b$ is squared.
- Treating a PDF value as a probability. For a continuous variable, only areas under the PDF are probabilities.
- Interpolating a quantile of a discrete distribution; the quantile sits at the jump where the CDF first reaches the level.
- Confusing kurtosis with excess kurtosis. A normal has kurtosis 3 and excess kurtosis 0.

## Key takeaways
- A random variable maps outcomes to numbers; PMFs serve discrete variables, PDFs continuous ones, and CDFs both.
- Mean and variance are probability-weighted; use $\sigma^2 = E[X^2] - \mu^2$ to save time.
- Skewness captures asymmetry; kurtosis above 3 signals fat tails, common in loss data.
- For $Y = a + bX$, the mean is $a + b\mu$ and the variance is $b^2\sigma^2$.
- Quantiles of the loss distribution are VaR figures, and they can sit far above the mean.
