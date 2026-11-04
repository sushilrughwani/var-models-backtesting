---
title: "Sample Moments"
---

## Learning goals
- Calculate the sample mean, sample variance, standard deviation and standard error of the mean.
- Estimate skewness and kurtosis from data and interpret the results.
- Distinguish unbiased, consistent and efficient estimators.
- Explain the law of large numbers and the central limit theorem and why they matter for inference.

## Explanation

### From population to sample
Earlier lessons treated distributions as known: we were told the probabilities and computed moments. In practice we only see data, such as 60 months of fund returns, and must **estimate** the true (population) moments. An **estimator** is a formula applied to data; an **estimate** is the number it produces. Because the data are random, every estimator is itself a random variable with its own mean and variance.

### Estimating the mean
The sample mean of $n$ observations is

$$
\hat{\mu} = \bar{X} = \frac{1}{n}\sum_{i=1}^{n} X_i
$$

If the observations are independent and identically distributed (iid) with mean $\mu$ and variance $\sigma^2$, then $E[\bar{X}] = \mu$ and $\operatorname{Var}(\bar{X}) = \sigma^2/n$. The standard deviation of the sample mean is the **standard error**:

$$
SE(\bar{X}) = \frac{\sigma}{\sqrt{n}} \approx \frac{s}{\sqrt{n}}
$$

Precision improves only with the square root of the sample size: to halve the standard error you need four times as much data.

### Estimating the variance
The natural estimator divides by $n$, but it is biased downward because deviations are measured from $\bar{X}$, which is itself fitted to the data. Dividing by $n - 1$ removes the bias:

$$
s^2 = \frac{1}{n-1}\sum_{i=1}^{n}(X_i - \bar{X})^2, \qquad E[s^2] = \sigma^2
$$

The divide-by-$n$ version $\hat{\sigma}^2$ has expectation $\frac{n-1}{n}\sigma^2$; its bias shrinks to zero as $n$ grows.

### Higher moments
Sample skewness and kurtosis standardise the third and fourth central moments:

$$
\hat{S} = \frac{\frac{1}{n}\sum (X_i - \bar{X})^3}{\hat{\sigma}^3}, \qquad \hat{K} = \frac{\frac{1}{n}\sum (X_i - \bar{X})^4}{\hat{\sigma}^4}
$$

Equity returns typically show negative skewness and kurtosis well above 3. These estimates are very noisy in small samples because a single extreme observation dominates a cubed or fourth-power sum.

### Properties of estimators
- **Unbiased**: the estimator's expected value equals the true parameter.
- **Consistent**: the estimator converges to the true value as $n \to \infty$. The divide-by-$n$ variance is biased but consistent.
- **Efficient**: among unbiased estimators, it has the smallest variance. The sample mean is the **BLUE** (best linear unbiased estimator) of $\mu$ for iid data.

There is often a bias-variance trade-off: a slightly biased estimator with much lower variance can be closer to the truth on average.

### The law of large numbers and the CLT
The **law of large numbers** says $\bar{X}$ converges to $\mu$ as $n$ grows. The **central limit theorem** goes further: for iid data with finite variance, the distribution of the standardised sample mean approaches a standard normal, whatever the shape of the underlying data:

$$
\frac{\bar{X} - \mu}{\sigma/\sqrt{n}} \xrightarrow{d} N(0, 1)
$$

This is what lets us build confidence intervals and run hypothesis tests on means even when returns are not normal. Other useful sample statistics include the **median** and other quantiles, which are robust to outliers, and the sample covariance and correlation, which use $n - 1$ in the same way as the variance.

## Worked example
A fund reports six monthly returns (%): 2, −1, 4, 3, −2, 6.

**Step 1 - sample mean.** $\bar{X} = (2 - 1 + 4 + 3 - 2 + 6)/6 = 12/6 = 2.0\%$.

**Step 2 - deviations and squares.** Deviations: 0, −3, 2, 1, −4, 4. Squares: 0, 9, 4, 1, 16, 16. Sum = 46.

**Step 3 - sample variance and standard deviation.** $s^2 = 46/5 = 9.2$, so $s = \sqrt{9.2} = 3.03\%$. The divide-by-$n$ estimate would be $46/6 = 7.67$, smaller as expected.

**Step 4 - standard error.** $SE = 3.03/\sqrt{6} = 1.24\%$.

**Step 5 - skewness.** Cubed deviations: 0, −27, 8, 1, −64, 64, summing to −18; divided by 6 gives −3. With $\hat{\sigma} = \sqrt{7.67} = 2.77$, $\hat{\sigma}^3 = 21.23$, so $\hat{S} = -3/21.23 = -0.14$.

**Step 6 - kurtosis.** Fourth powers: 0, 81, 16, 1, 256, 256, summing to 610; divided by 6 gives 101.67. $\hat{\sigma}^4 = 58.78$, so $\hat{K} = 1.73$.

**The mean is 2.0% per month with a sample standard deviation of 3.03% and a standard error of 1.24%; skewness is −0.14 and kurtosis 1.73.** With only six data points the standard error is large relative to the mean, and the higher moments are too noisy to trust.

## Common exam traps
- Dividing by $n$ instead of $n - 1$ when the question asks for the unbiased sample variance.
- Confusing the standard deviation of returns with the standard error of the mean; the latter divides by $\sqrt{n}$.
- Thinking the CLT makes the data normal. It is the distribution of the sample mean that becomes normal.
- Believing a biased estimator cannot be consistent, or that unbiased implies consistent.
- Reporting kurtosis when excess kurtosis (kurtosis minus 3) is asked, or vice versa.

## Key takeaways
- The sample mean is unbiased with standard error $\sigma/\sqrt{n}$; precision grows with the square root of $n$.
- Use $n - 1$ for an unbiased sample variance; the divide-by-$n$ version is biased but consistent.
- Sample skewness and kurtosis describe shape but are noisy, especially in small samples.
- Unbiasedness, consistency and efficiency are distinct properties of estimators.
- The CLT makes the sample mean approximately normal for large $n$, enabling inference on non-normal data.
