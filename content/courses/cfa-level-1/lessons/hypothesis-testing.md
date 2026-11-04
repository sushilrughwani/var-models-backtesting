---
title: "Hypothesis Testing"
---

## Learning goals
- Describe the steps of a hypothesis test and formulate null and alternative hypotheses for one- and two-tailed tests.
- Explain Type I and Type II errors, the significance level and the power of a test.
- Interpret p-values and relate them to the decision rule.
- Calculate test statistics for a single mean, a difference in means and paired observations.
- Calculate and interpret chi-square and F statistics for tests of variances.

## Explanation

### The logic of a test
A confidence interval asks "what range of values is plausible?". A hypothesis test asks a yes-or-no question: "is this particular value plausible?". We start by assuming a claim, the **null hypothesis** $H_0$, and ask whether the sample evidence is strong enough to reject it in favour of the **alternative** $H_a$. The null always contains the equality sign. The steps are:
1. State $H_0$ and $H_a$.
2. Identify the appropriate test statistic and its distribution.
3. Specify the significance level $\alpha$.
4. State the decision rule (critical values).
5. Collect data and compute the statistic.
6. Make the statistical decision, then the economic or investment decision.

A **two-tailed** test ($H_0: \mu = \mu_0$ versus $H_a: \mu \ne \mu_0$) splits $\alpha$ between both tails. A **one-tailed** test ($H_0: \mu \le \mu_0$ versus $H_a: \mu > \mu_0$) puts all of $\alpha$ in one tail. The hypothesis you hope to show belongs in $H_a$.

### Errors, significance and power
A **Type I error** is rejecting a true null; its probability is the significance level $\alpha$. A **Type II error** is failing to reject a false null; its probability is $\beta$. The **power** of a test is $1-\beta$, the probability of correctly rejecting a false null. For a given sample size, lowering $\alpha$ raises $\beta$; the only way to reduce both is to collect more data.

### p-values
The **p-value** is the smallest significance level at which the null can be rejected. It is the probability, assuming $H_0$ is true, of a test statistic at least as extreme as the one observed. Rule: reject $H_0$ if $p < \alpha$. A p-value is *not* the probability that the null is true.

### Tests of means
For a single mean with unknown variance:

$$
t = \frac{\bar{X} - \mu_0}{s/\sqrt{n}}, \qquad df = n-1
$$

For the **difference between two independent means** with equal but unknown variances, use the pooled variance:

$$
t = \frac{(\bar{X}_1 - \bar{X}_2) - (\mu_1-\mu_2)_0}{\sqrt{\dfrac{s_p^2}{n_1} + \dfrac{s_p^2}{n_2}}}, \qquad s_p^2 = \frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1+n_2-2}
$$

with $n_1 + n_2 - 2$ degrees of freedom. When the samples are **dependent** (for example, the same funds before and after a fee change), test the mean of the paired differences $\bar{d}$ instead: $t = (\bar{d} - \mu_{d0})/(s_d/\sqrt{n})$ with $n-1$ degrees of freedom.

### Tests of variances
To test a single variance against $\sigma_0^2$ (population normal):

$$
\chi^2 = \frac{(n-1)s^2}{\sigma_0^2}, \qquad df = n-1
$$

The chi-square distribution is bounded at zero and right-skewed. To compare two variances from independent normal populations:

$$
F = \frac{s_1^2}{s_2^2}, \qquad df = (n_1-1,\; n_2-1)
$$

Put the larger variance in the numerator so only the upper critical value is needed.

## Worked example
**Part 1 - mean.** From the previous lesson, a fund has 36 monthly returns with mean 1.2% and standard deviation 4.8%. Test at 5% whether the true mean exceeds zero. The one-tailed critical t with 35 df is 1.690.

- Hypotheses: $H_0: \mu \le 0$ versus $H_a: \mu > 0$.
- Standard error: $4.8/\sqrt{36} = 0.80$.
- Test statistic: $t = (1.2 - 0)/0.80 = 1.50$.
- Decision: 1.50 < 1.690, so **fail to reject $H_0$**. The evidence is not strong enough to conclude the fund earns a positive mean return.

**Part 2 - variance.** A risk manager claims monthly volatility is 4% (variance 16). A sample of 24 months shows $s = 5\%$. Test at 5% whether the variance exceeds 16. The upper critical $\chi^2$ with 23 df is 35.172.

- Hypotheses: $H_0: \sigma^2 \le 16$ versus $H_a: \sigma^2 > 16$.
- Test statistic: $\chi^2 = (23 \times 25)/16 = 575/16 = 35.94$.
- Decision: 35.94 > 35.172, so **reject $H_0$**: volatility appears higher than claimed.

## Common exam traps
- Putting the claim you want to prove in the null. The null holds the equality; the research claim goes in $H_a$.
- Using a two-tailed critical value for a one-tailed test, or vice versa.
- Saying "accept the null". We only fail to reject it.
- Interpreting the p-value as the probability that $H_0$ is true.
- Using the independent-samples test when observations are paired, or using standard deviations instead of variances in $\chi^2$ and $F$.

## Key takeaways
- The null contains equality; the alternative holds the claim to be supported.
- $\alpha$ = P(Type I error); power = $1 - \beta$; more data is the only way to reduce both error types.
- Reject $H_0$ when the test statistic exceeds the critical value, or equivalently when $p < \alpha$.
- t-tests cover a single mean, independent differences (pooled variance) and paired differences.
- $\chi^2 = (n-1)s^2/\sigma_0^2$ tests one variance; $F = s_1^2/s_2^2$ compares two.
