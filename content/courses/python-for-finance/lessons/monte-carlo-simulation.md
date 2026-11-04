---
title: "Monte Carlo Simulation"
---

## Learning goals
- Simulate geometric Brownian motion (GBM) price paths with vectorised NumPy code.
- Compare simulated statistics with their theoretical values and compute a Monte Carlo standard error.
- Estimate probabilities and percentiles of future outcomes from simulated paths.
- Simulate a portfolio with withdrawals to estimate the probability of running out of money.

## Explanation

### Why simulate?
Many finance questions have no tidy formula: "what is the chance my retirement pot lasts 20 years?" or "what is the distribution of a portfolio with path-dependent rules?". Monte Carlo simulation answers them by brute force: generate thousands of possible futures from a model, apply the rules to each, and summarise the results. The law of large numbers guarantees that averages across simulations converge to the true expected values.

### Geometric Brownian motion
The standard model for a stock price assumes log returns are normal and independent. Over a step of length $\Delta t$ years, the exact update is

$$
S_{t+\Delta t} = S_t \exp\left[\left(\mu - \tfrac{1}{2}\sigma^2\right)\Delta t + \sigma\sqrt{\Delta t}\,Z\right], \qquad Z \sim N(0,1)
$$

where $S_t$ is the price, $\mu$ the expected (arithmetic) annual return, $\sigma$ the annual volatility and $Z$ a standard normal draw. The $-\tfrac{1}{2}\sigma^2$ term is the volatility drag: it makes the median outcome grow at $\mu - \tfrac{1}{2}\sigma^2$, while the mean grows at $\mu$:

$$
E[S_T] = S_0 e^{\mu T}, \qquad \text{median}(S_T) = S_0 e^{(\mu - \sigma^2/2)T}
$$

Because log returns add over time (from the returns lesson), we can build a whole path with `np.cumsum` of the log increments and exponentiate once.

### Monte Carlo error
A simulated mean is itself an estimate. Its standard error is

$$
SE = \frac{s}{\sqrt{N}}
$$

where $s$ is the sample standard deviation of the simulated outcomes and $N$ the number of paths. Halving the error requires four times as many paths.

### The code
One year of daily steps for 10,000 paths, all generated in a single array without Python loops:

```python
import numpy as np

rng = np.random.default_rng(123)
S0, mu, sigma, T = 100.0, 0.08, 0.20, 1.0
n_steps, n_paths = 252, 10_000
dt = T / n_steps

Z = rng.standard_normal((n_paths, n_steps))
increments = (mu - 0.5 * sigma**2) * dt + sigma * np.sqrt(dt) * Z
paths = S0 * np.exp(np.cumsum(increments, axis=1))   # shape (10000, 252)
ST = paths[:, -1]

print(f"Mean S_T:   {ST.mean():.2f}  (theory {S0 * np.exp(mu * T):.2f})")
print(f"Median S_T: {np.median(ST):.2f}  (theory {S0 * np.exp((mu - 0.5 * sigma**2) * T):.2f})")
print(f"Std error of mean: {ST.std(ddof=1) / np.sqrt(n_paths):.3f}")
print(f"P(S_T < 90): {(ST < 90).mean():.4f}")
print(f"5th / 95th percentile: {np.percentile(ST, 5):.2f} / {np.percentile(ST, 95):.2f}")
```

Output:

```
Mean S_T:   108.73  (theory 108.33)
Median S_T: 106.69  (theory 106.18)
Std error of mean: 0.217
P(S_T < 90): 0.1971
5th / 95th percentile: 76.76 / 147.83
```

The simulated mean of 108.73 is within two standard errors (2 × 0.217 = 0.43) of the theoretical 108.33, which is exactly what we should expect from random sampling. The probability of ending below 90 is the fraction of paths where the condition is `True`; averaging a Boolean array is a neat NumPy idiom for counting.

### Portfolio outcomes with rules
Simulation shines when the rules make formulas impossible. Below, a 500,000 portfolio earns normal annual returns (mean 6%, volatility 12%) and pays out 30,000 at the end of each year for 20 years. Once wealth hits zero it stays there.

```python
import numpy as np

rng = np.random.default_rng(99)
start, years, n_paths = 500_000, 20, 20_000
withdraw = 30_000                         # taken at the end of each year
annual = rng.normal(0.06, 0.12, size=(n_paths, years))

wealth = np.full(n_paths, float(start))
for y in range(years):
    wealth = np.maximum(wealth * (1 + annual[:, y]) - withdraw, 0.0)

print(f"P(money runs out): {(wealth == 0).mean():.3f}")
print(f"Median ending wealth: {np.median(wealth):,.0f}")
```

Output:

```
P(money runs out): 0.141
Median ending wealth: 364,660
```

The loop runs over years, not paths; each year updates all 20,000 portfolios at once. A 6% withdrawal rate matched by a 6% expected return still fails in about 14% of scenarios, because bad returns early on (sequence risk) shrink the base before the good years arrive.

## Worked example
Using the GBM inputs above ($S_0$ = 100, $\mu$ = 8%, $\sigma$ = 20%, $T$ = 1), calculate the theoretical benchmarks that the simulation should match, and one single-step outcome.

1. Drift of log returns: $\mu - \tfrac{1}{2}\sigma^2$ = 0.08 − 0.02 = 0.06.
2. Expected price: 100 × e^0.08 = **108.33**.
3. Median price: 100 × e^0.06 = **106.18**. The mean exceeds the median because the lognormal distribution is right-skewed.
4. Probability of ending below 90: ln(90/100) = −0.10536. Standardise: (−0.10536 − 0.06) / 0.20 = −0.8268. N(−0.8268) = **0.2042**. The simulation gave 0.1971, close given sampling error.
5. One-step outcome with a single annual step and a draw of Z = −0.5: 100 × exp(0.06 + 0.20 × (−0.5)) = 100 × e^−0.04 = **96.08**. With Z = +1.5 the same formula gives 143.33.

## Common exam traps
- Dropping the $-\tfrac{1}{2}\sigma^2$ correction, which makes the simulated mean drift too high.
- Using $\sigma\,\Delta t$ instead of $\sigma\sqrt{\Delta t}$ for the shock term.
- Forgetting a fixed seed, so results change every run and cannot be reproduced or checked.
- Confusing the mean and median of a lognormal outcome.
- Reporting a simulated number without its standard error; 10,000 paths still leave noise.

## Key takeaways
- GBM paths: cumulate normal log increments, then exponentiate.
- Vectorise over paths with a 2-D array; loop only where rules depend on the previous step.
- Check simulations against known theory before trusting them on unknown problems.
- Monte Carlo error shrinks with $1/\sqrt{N}$.
- Boolean averages such as `(ST < 90).mean()` estimate probabilities directly.
