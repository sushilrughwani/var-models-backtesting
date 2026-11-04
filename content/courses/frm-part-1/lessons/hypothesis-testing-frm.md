---
title: "Hypothesis Testing"
---

## Learning goals
- Formulate null and alternative hypotheses and choose between one-tailed and two-tailed tests.
- Calculate a test statistic for a population mean and compare it with a critical value.
- Interpret a p-value and construct a confidence interval, and explain how the two are linked.
- Distinguish Type I and Type II errors and explain what determines the power of a test.

## Explanation

### The logic of a test
The previous lesson showed that a sample mean is a noisy estimate with standard error $s/\sqrt{n}$. A hypothesis test asks: is the estimate far enough from a hypothesised value that noise alone is an unlikely explanation? It is a proof by contradiction. We assume the **null hypothesis** $H_0$ is true (for example, a manager's true alpha is zero), work out how surprising our data would be under that assumption, and reject $H_0$ only if the data would be very surprising.

The **alternative hypothesis** $H_1$ is what we accept if we reject the null. A **two-tailed** test uses $H_1: \mu \neq \mu_0$; a **one-tailed** test uses $H_1: \mu > \mu_0$ (or $<$) when only one direction matters, such as testing whether a strategy beats zero.

### The test statistic
For a mean, the test statistic measures the distance from the hypothesised value in standard-error units:

$$
t = \frac{\bar{X} - \mu_0}{s / \sqrt{n}}
$$

where $\bar{X}$ is the sample mean, $\mu_0$ the value under the null, $s$ the sample standard deviation and $n$ the sample size. In small samples from normal data it follows a Student's t distribution with $n - 1$ degrees of freedom; in large samples the central limit theorem makes it approximately standard normal, so we use z critical values.

### Significance level and critical values
The **significance level** $\alpha$ is the probability of rejecting a true null that we are willing to accept, commonly 5%. It sets the **critical value**: for a two-tailed 5% test with a normal statistic, reject if $|t| > 1.96$; for a one-tailed 5% test, reject if $t > 1.645$. The set of values that lead to rejection is the **rejection region**.

### p-values
The **p-value** is the probability, assuming $H_0$ is true, of a test statistic at least as extreme as the one observed. Reject $H_0$ when the p-value is below $\alpha$. A p-value is not the probability that the null is true; it is a statement about the data given the null.

### Confidence intervals
A $(1 - \alpha)$ confidence interval collects every value of $\mu_0$ that would *not* be rejected by a two-tailed test at level $\alpha$:

$$
\bar{X} \pm c_{\alpha/2} \times \frac{s}{\sqrt{n}}
$$

where $c_{\alpha/2}$ is the critical value (1.96 for 95%). If the hypothesised value lies outside the interval, the two-tailed test rejects it.

### Errors and power
A **Type I error** rejects a true null; its probability is $\alpha$. A **Type II error** fails to reject a false null; its probability is $\beta$. The **power** of a test, $1 - \beta$, is the probability of correctly rejecting a false null. Power rises with a larger sample, a larger true effect, lower data volatility and a higher $\alpha$. Lowering $\alpha$ to guard against false positives therefore costs power unless you collect more data.

### Testing many hypotheses
If you test 20 independent strategies at 5%, you expect one false "discovery" even if none has skill. Corrections such as Bonferroni (use $\alpha/m$ for $m$ tests) control this multiple-testing problem. The same framework extends to differences in means, where the standard error combines both samples' variances.

## Worked example
A risk team evaluates a trading desk's monthly excess return over 64 months. The sample mean is 0.5% and the sample standard deviation is 1.6%. Test $H_0: \mu = 0$ against $H_1: \mu \neq 0$ at 5%.

**Step 1 - standard error.** $SE = 1.6/\sqrt{64} = 1.6/8 = 0.20\%$.

**Step 2 - test statistic.** $t = (0.5 - 0)/0.20 = 2.50$.

**Step 3 - decision.** With 64 observations use the normal approximation: $|2.50| > 1.96$, so reject $H_0$.

**Step 4 - p-value.** Two-tailed $p = 2 \times [1 - N(2.50)] = 2 \times 0.0062 = 0.0124$, below 0.05.

**Step 5 - confidence interval.** $0.5 \pm 1.96 \times 0.20 = 0.5 \pm 0.392$, giving $[0.108\%, 0.892\%]$. Zero lies outside, consistent with rejection.

**Step 6 - power.** If the true mean really were 0.5%, the test would reject with probability about $N(2.50 - 1.96) = N(0.54) = 0.705$, so power is roughly 70.5%.

**The t-statistic is 2.50 with a p-value of 0.0124; we reject the null of zero excess return, and the 95% confidence interval is 0.108% to 0.892%.**

## Common exam traps
- Dividing by $s$ instead of $s/\sqrt{n}$, producing a tiny test statistic.
- Using the two-tailed critical value (1.96) for a one-tailed test, or the reverse (1.645).
- Interpreting the p-value as the probability that the null hypothesis is true.
- Saying "accept the null" rather than "fail to reject"; absence of evidence is not proof.
- Thinking a lower significance level increases power. It reduces Type I risk but raises Type II risk.

## Key takeaways
- A test assumes the null is true and asks whether the data are too surprising to be noise.
- The test statistic is (estimate − hypothesised value) / standard error.
- Reject when the statistic exceeds the critical value, or equivalently when the p-value is below α.
- A confidence interval contains exactly the null values a two-tailed test would not reject.
- Type I error probability is α; power is 1 − β and grows with sample size and effect size.
