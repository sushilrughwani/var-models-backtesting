---
title: "Simulation and Bootstrapping"
---

## Learning goals
- Describe the steps of a Monte Carlo simulation and the role of pseudo-random numbers and seeds.
- Calculate the standard error of a Monte Carlo estimate, its confidence interval, and the number of replications needed for a target accuracy.
- Explain how antithetic variates and control variates reduce simulation error.
- Describe the i.i.d. and block bootstrap, and compare bootstrapping with Monte Carlo simulation, including the limitations of each.

## Explanation

### Why simulate?
Many risk quantities have no closed-form answer: the value of a path-dependent option, the 99% loss quantile of a portfolio of non-linear positions, or the distribution of a test statistic in a small sample. Simulation replaces the hard mathematics with brute force: generate many possible outcomes, compute the quantity of interest in each, and average. It is the engine behind Monte Carlo VaR, which you will meet later in the course.

### Monte Carlo simulation step by step
1. Specify the data-generating process, for example normally distributed log returns with a given mean and volatility.
2. Draw random values from that distribution.
3. Compute the outcome of interest, $g$, such as a discounted option payoff or a portfolio loss.
4. Repeat $b$ times, giving $g_1, \ldots, g_b$.
5. Estimate the expected value by the sample mean and quantify its accuracy.

Computers produce **pseudo-random numbers**: deterministic sequences that behave like random draws. Fixing the **seed** makes a simulation reproducible, which is essential for model validation and for comparing two designs on the same draws.

### How accurate is the estimate?
The Monte Carlo estimate is $\hat\mu = \frac{1}{b}\sum g_i$. By the central limit theorem its standard error is

$$
SE(\hat\mu) = \frac{s_g}{\sqrt{b}}
$$

where $s_g$ is the standard deviation of the simulated outcomes and $b$ is the number of replications. A 95% confidence interval is $\hat\mu \pm 1.96\,SE$. The key insight is the square root: to **halve** the error you need **four times** as many replications. The number of replications needed for a target standard error is

$$
b = \left(\frac{s_g}{SE_{target}}\right)^2
$$

### Variance reduction
Because extra replications are expensive, we try to reduce $s_g$ instead.

**Antithetic variates.** For every draw $z$, also use $-z$ (or $1-u$ for a uniform $u$). The pair's outcomes are negatively correlated, so their average varies less. With $b/2$ pairs and correlation $\rho$ between paired outcomes,

$$
Var(\hat\mu) = \frac{\sigma_g^2 (1 + \rho)}{b}
$$

The method helps only when $\rho < 0$, which holds when the outcome is a monotonic function of the draw.

**Control variates.** Simulate alongside the target a related quantity $X$ whose true mean $\mu_X$ is known (for example a European option priced by a formula when the target is an Asian option). Correct the estimate for the simulation error observed in $X$:

$$
\hat\mu_{CV} = \bar g - \beta(\bar X - \mu_X)
$$

$\beta$ is the regression slope of $g$ on $X$. The variance falls by the factor $(1 - \rho_{gX}^2)$, so a control with correlation 0.9 removes 81% of the variance.

### The bootstrap
The bootstrap simulates from the data rather than from an assumed distribution. The **i.i.d. bootstrap** draws observations from the historical sample **with replacement** to build many pseudo-samples of the same size, computes the statistic in each, and uses the spread of those results as its sampling distribution. Because financial returns show volatility clustering and autocorrelation, the **circular block bootstrap** resamples contiguous blocks of observations, wrapping around the end of the sample, which preserves short-run dependence.

### Monte Carlo versus bootstrap
Monte Carlo can generate scenarios never observed, but its results are only as good as the assumed model: a normal distribution understates tail risk. The bootstrap needs no distributional assumption and automatically captures fat tails present in the data, but it can never produce an outcome more extreme than the worst historical observation, and it performs poorly if the past is unrepresentative (for example a sample with no crisis) or if the data contain structural breaks.

## Worked example
A bank values an exotic equity option by Monte Carlo with $b = 10{,}000$ paths. The discounted payoffs have mean 8.40 and standard deviation 12.0.

**Step 1 - standard error.** $SE = 12.0/\sqrt{10{,}000} = 12.0/100 = 0.12$.

**Step 2 - confidence interval.** $8.40 \pm 1.96 \times 0.12 = 8.40 \pm 0.2352$, giving **[8.165, 8.635]**.

**Step 3 - required replications.** The desk wants $SE = 0.05$: $b = (12.0/0.05)^2 = 240^2 = $ **57,600 paths**.

**Step 4 - antithetic variates.** If paired payoffs have correlation $-0.6$, the variance is multiplied by $1 + \rho = 0.4$, so the standard error falls by the factor $\sqrt{0.4} = 0.632$, to about $0.12 \times 0.632 = 0.076$ for the same 10,000 paths.

**Step 5 - control variate.** A vanilla option with correlation 0.9 to the exotic would multiply the variance by $1 - 0.81 = 0.19$.

## Common exam traps
- Believing that doubling replications halves the error; it reduces it only by the factor $\sqrt{2}$.
- Dividing by $b$ rather than $\sqrt{b}$ when computing the standard error.
- Thinking antithetic variates always help; they need negatively correlated pairs.
- Claiming the bootstrap can produce losses larger than any in the sample.
- Using the i.i.d. bootstrap on data with strong time dependence instead of a block bootstrap.

## Key takeaways
- Monte Carlo: specify a model, draw, compute, repeat, average.
- Standard error $= s_g/\sqrt{b}$; four times the paths halves the error.
- Antithetic variates exploit negative correlation; control variates exploit a known mean and high correlation.
- The bootstrap resamples historical data with replacement; block bootstrap preserves dependence.
- Monte Carlo is limited by model risk; the bootstrap by the history it resamples.
