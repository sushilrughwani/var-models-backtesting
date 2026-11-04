---
title: "Estimation and Inference"
---

## Learning goals
- Compare probability and non-probability sampling methods and identify when each is appropriate.
- Explain sampling error and state what the central limit theorem implies about the sample mean.
- Calculate the standard error of the sample mean.
- Construct and interpret confidence intervals for a population mean using z or t reliability factors.
- Describe how bootstrap and jackknife resampling estimate a standard error.

## Explanation

### Why sample at all?
We almost never observe a whole population: every possible future return of a fund, or every bond in a large index. Instead we draw a sample and use a **statistic** (such as the sample mean $\bar{X}$) to estimate a **parameter** (the population mean $\mu$). The difference between them is **sampling error**, and because each new sample gives a different $\bar{X}$, the statistic has its own probability distribution, the **sampling distribution**.

### Sampling methods
**Probability sampling** gives every member a known chance of selection, which supports valid inference:
- **Simple random sampling**: every member equally likely to be chosen.
- **Systematic sampling**: pick every $k$-th member from a list, a practical substitute for simple random sampling.
- **Stratified random sampling**: divide the population into subgroups (strata) by a characteristic such as sector or credit rating, then sample randomly from each in proportion to its size. Bond index funds use this to mimic an index without buying every bond. It produces more precise estimates than simple random sampling of the same size.
- **Cluster sampling**: divide the population into clusters that each resemble the population (such as cities), randomly choose some clusters and sample within them. It is cheaper but usually less precise.

**Non-probability sampling** relies on judgment or convenience. **Convenience sampling** uses whatever data is easy to get; **judgmental sampling** uses an expert's choice. These are fast and cheap but risk bias and are not suitable for formal inference.

### Central limit theorem
The central limit theorem (CLT) is why the rest of this course works. For a population with mean $\mu$ and finite variance $\sigma^2$, when the sample size $n$ is large (a common rule is $n \ge 30$), the sampling distribution of $\bar{X}$ is approximately normal, *whatever the shape of the population*, with mean $\mu$ and variance $\sigma^2/n$.

### Standard error
The standard deviation of the sample mean is its **standard error**:

$$
\sigma_{\bar{X}} = \frac{\sigma}{\sqrt{n}} \qquad s_{\bar{X}} = \frac{s}{\sqrt{n}}
$$

where $\sigma$ is the population standard deviation and $s$ the sample standard deviation, used when $\sigma$ is unknown. Quadrupling the sample size halves the standard error.

### Confidence intervals
A confidence interval gives a range that, under repeated sampling, would contain the true parameter a stated percentage of the time:

$$
\bar{X} \pm \text{reliability factor} \times \text{standard error}
$$

Use a **z** reliability factor when the population variance is known (1.645 for 90%, 1.96 for 95%, 2.576 for 99%). Use a **t** factor with $n-1$ degrees of freedom when the variance is unknown and estimated by $s$, which is the usual real-world case. The t-distribution has fatter tails than the normal, so its intervals are wider, especially with small samples; as $n$ grows, t converges to z. For a small sample from a non-normal population, neither interval is reliable.

### Resampling
When there is no simple formula for a standard error, resampling helps. The **bootstrap** (introduced in the previous lesson) draws many samples of size $n$ with replacement from the observed data and uses the standard deviation of the resulting statistics as the standard error. The **jackknife** recomputes the statistic $n$ times, each time leaving out one observation, and uses the variation across those estimates. The jackknife is deterministic (same result every time), while the bootstrap relies on random draws but is generally more flexible.

## Worked example
An analyst collects 36 monthly returns for a fund. The sample mean is 1.2% and the sample standard deviation is 4.8%. Construct a 95% confidence interval for the true mean monthly return. The t reliability factor with 35 degrees of freedom is 2.030.

**Step 1 - choose the distribution.** The population variance is unknown, so use t with $n - 1 = 35$ degrees of freedom.

**Step 2 - standard error.** $s_{\bar{X}} = 4.8/\sqrt{36} = 4.8/6 = 0.80\%$.

**Step 3 - margin of error.** $2.030 \times 0.80 = 1.624\%$.

**Step 4 - interval.** $1.2 \pm 1.624$ gives **−0.42% to 2.82%**.

**Step 5 - interpret.** We are 95% confident that the true mean lies in this range. Because the interval includes zero, the data are consistent with the fund having no positive average return; the next lesson formalises this as a hypothesis test. For comparison, the z-based interval (1.96) would be slightly narrower at −0.37% to 2.77%.

## Common exam traps
- Dividing by $n$ instead of $\sqrt{n}$ when computing a standard error.
- Using the standard deviation of the data instead of the standard error to build the interval.
- Using z when the variance is unknown and the sample is small; t is required.
- Confusing stratified sampling (sample from *every* subgroup) with cluster sampling (sample from *some* clusters).
- Thinking the CLT makes the *population* normal. It makes the *sample mean* approximately normal.

## Key takeaways
- A statistic estimates a parameter; sampling error is the gap between them.
- Stratified sampling improves precision; cluster sampling is cheaper; non-probability samples risk bias.
- The CLT: for large $n$, $\bar{X}$ is approximately normal with mean $\mu$ and variance $\sigma^2/n$.
- Standard error $= s/\sqrt{n}$; it shrinks with the square root of sample size.
- Confidence interval = point estimate ± reliability factor × standard error; use t when variance is unknown.
- Bootstrap and jackknife estimate standard errors when no formula is available.
