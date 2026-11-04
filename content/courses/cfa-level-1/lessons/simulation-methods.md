---
title: "Simulation Methods"
---

## Learning goals
- Explain why the lognormal distribution is used to model asset prices.
- Calculate continuously compounded returns and convert them to and from holding period returns.
- Scale the mean and volatility of continuously compounded returns across time horizons.
- Describe the steps of a Monte Carlo simulation and its strengths and limitations.
- Distinguish bootstrap resampling and historical simulation from Monte Carlo simulation.

## Explanation

### Why prices are lognormal
A share price cannot fall below zero, but it can rise without limit, so price distributions are right-skewed. A normal distribution is a poor fit for prices because it allows negative values. The **lognormal** distribution solves this: if $\ln X$ is normally distributed, then $X$ is lognormal, bounded below by zero and skewed to the right. So the standard modelling choice is: *returns* measured in logs are normal, which makes *prices* lognormal.

### Continuously compounded returns
The continuously compounded (log) return between two prices is:

$$
r_{0,T} = \ln\!\left(\frac{P_T}{P_0}\right) = \ln(1 + HPR_{0,T})
$$

and to convert back, $HPR = e^{r} - 1$. A log return is always smaller than the corresponding holding period return when returns are positive ($\ln 1.08 = 7.70\%$). The key property is **additivity**: the log return over several periods is the *sum* of the single-period log returns, because

$$
\ln\!\left(\frac{P_T}{P_0}\right) = \ln\!\left(\frac{P_1}{P_0}\right) + \ln\!\left(\frac{P_2}{P_1}\right) + \dots + \ln\!\left(\frac{P_T}{P_{T-1}}\right)
$$

If single-period log returns are independent and identically distributed (i.i.d.) with mean $\mu$ and variance $\sigma^2$, then the $T$-period log return has mean $\mu T$ and variance $\sigma^2 T$, so volatility scales with the square root of time: $\sigma_T = \sigma\sqrt{T}$. Annualising a weekly volatility therefore multiplies by $\sqrt{52}$, not by 52.

Because sums of normals are normal, an i.i.d. normal log return model implies a lognormal terminal price. Its median is $P_0e^{\mu T}$, and its mean is higher, $P_0e^{\mu T + \sigma^2 T/2}$, reflecting the right skew.

### Monte Carlo simulation
Monte Carlo simulation answers questions that have no neat formula, such as the value of a path-dependent option or the distribution of a pension fund's surplus. The steps are:
1. Specify the quantity of interest and the model of the underlying variables (for example, monthly log returns that are normal with given mean and volatility).
2. Choose the number of time steps and the number of trials.
3. Use a random number generator to draw values for each variable at each step, building one complete path.
4. Compute the quantity of interest for that path (for example, the option payoff, discounted).
5. Repeat for thousands of trials and summarise the results: mean, standard deviation, percentiles.

Its strengths are flexibility and the ability to handle complex, non-linear problems. Its limitations are that results are only as good as the assumed distribution ("garbage in, garbage out"), it gives a numerical answer rather than insight into cause and effect, and precision improves only slowly with more trials.

### Bootstrap and historical simulation
**Bootstrap resampling** treats the observed sample as if it were the population and draws repeated samples *with replacement* from it, recomputing a statistic each time to see how much it varies. It requires no assumed distribution, which is its appeal, but it cannot generate outcomes more extreme than those already in the data. **Historical simulation** similarly replays past returns to generate scenarios. Both inherit whatever quirks the historical sample contains, while Monte Carlo inherits the analyst's assumptions.

## Worked example
A share's month-end prices are USD 50, 54, 51 and 56.

**Step 1 - monthly log returns.**
- $\ln(54/50) = 7.70\%$
- $\ln(51/54) = -5.72\%$
- $\ln(56/51) = 9.35\%$

**Step 2 - additivity.** Sum = 7.70 − 5.72 + 9.35 = 11.33%. Check directly: $\ln(56/50) = 11.33\%$. The holding period return is $e^{0.1133} - 1 = 12.00\%$, matching 56/50 − 1. Note that the simple monthly HPRs (8.00%, −5.56%, 9.80%) do *not* add to 12%.

**Step 3 - scaling over time.** Suppose instead that monthly log returns are i.i.d. normal with mean 0.8% and standard deviation 4%. The annual log return has mean $0.8\% \times 12 = 9.6\%$ and standard deviation $4\% \times \sqrt{12} = 13.86\%$.

**Step 4 - terminal price distribution.** For a share now at USD 100, the median price in one year is $100e^{0.096} = 110.08$ and the mean is $100e^{0.096 + 0.1386^2/2} = 111.14$.

**Annual log return: mean 9.6%, volatility 13.86%; median price USD 110.08, mean price USD 111.14.**

## Common exam traps
- Scaling volatility by $T$ instead of $\sqrt{T}$; variance scales with $T$, standard deviation with $\sqrt{T}$.
- Adding holding period returns across periods; only log returns are additive.
- Describing returns as lognormal. It is prices (or $1 + HPR$) that are lognormal; log returns are normal.
- Claiming that bootstrapping can produce outcomes beyond the historical range. It only reshuffles observed data.
- Believing Monte Carlo removes model risk; it amplifies whatever distribution you assume.

## Key takeaways
- Lognormal prices are bounded at zero and right-skewed, matching how prices behave.
- Log return $= \ln(P_T/P_0) = \ln(1+HPR)$, and $HPR = e^r - 1$.
- Log returns add across time; with i.i.d. returns, mean scales by $T$ and volatility by $\sqrt{T}$.
- Monte Carlo simulates many random paths from an assumed model to estimate a distribution of outcomes.
- Bootstrap resamples observed data with replacement and needs no distributional assumption.
