---
title: "Value at Risk in Python"
---

## Learning goals
- Calculate parametric (normal) VaR and expected shortfall with `scipy.stats.norm`.
- Calculate historical VaR and expected shortfall from a return series with NumPy.
- Simulate Monte Carlo VaR and compare the three methods.
- Scale one-day VaR to longer horizons and explain the assumptions behind the square-root rule.

## Explanation

### What VaR answers
Value at Risk is a threshold loss: "over the next day, we are 99% confident we will not lose more than X". Equivalently, X is the loss that is exceeded only 1% of the time. VaR says nothing about how bad losses are beyond that point, which is why risk managers pair it with **expected shortfall (ES)**, the average loss in the worst tail. Both are reported as positive numbers in currency.

### Parametric (normal) VaR
If portfolio returns are normal with mean $\mu$ and standard deviation $\sigma$, then for confidence level $c$ and portfolio value $V$:

$$
\text{VaR}_c = -(\mu - z_c\,\sigma)\,V, \qquad \text{ES}_c = -\left(\mu - \sigma\,\frac{\phi(z_c)}{1 - c}\right)V
$$

where $z_c$ is the standard normal quantile (`norm.ppf(c)`, 1.6449 at 95% and 2.3263 at 99%) and $\phi$ is the normal density (`norm.pdf`). For daily horizons the mean is tiny and is often set to zero.

### Historical VaR
Historical simulation makes no distributional assumption: take the empirical $(1-c)$ quantile of past returns and flip the sign. ES is the average of the returns at or below that quantile. It captures fat tails and skew automatically, but it can only "see" the losses that happened in the sample window.

### Monte Carlo VaR
Simulate many returns from a model, then read off the quantile exactly as in historical VaR. With a normal model it reproduces parametric VaR (up to simulation noise), but the same code works for any model you can simulate: fat-tailed distributions, option portfolios or multi-asset positions. The next lesson develops simulation in depth.

### Horizon scaling
If daily returns are independent with zero mean, $\text{VaR}_{T} = \text{VaR}_{1}\sqrt{T}$. This is the same square-root-of-time rule used for volatility in the returns lesson, and it is only an approximation when returns are autocorrelated or volatility clusters.

### The code
We generate 1,000 days of fat-tailed returns (Student t with 4 degrees of freedom, scaled to 1.2% daily volatility) for a 1,000,000 portfolio and apply all three methods at 99%.

```python
import numpy as np
from scipy.stats import norm

rng = np.random.default_rng(11)
# 1,000 days of fat-tailed daily returns (Student t with 4 df, scaled to 1.2% vol)
r = 0.0003 + 0.012 * rng.standard_t(4, size=1000) / np.sqrt(4 / (4 - 2))
V = 1_000_000          # portfolio value
cl = 0.99              # confidence level

# 1) Parametric (normal) VaR and ES
mu, sigma = r.mean(), r.std(ddof=1)
z = norm.ppf(cl)
var_p = -(mu - z * sigma) * V
es_p = -(mu - sigma * norm.pdf(z) / (1 - cl)) * V

# 2) Historical VaR and ES
cut = np.quantile(r, 1 - cl)
var_h = -cut * V
es_h = -r[r <= cut].mean() * V

# 3) Monte Carlo VaR and ES (normal model, 100,000 draws)
sims = rng.normal(mu, sigma, 100_000)
cut_mc = np.quantile(sims, 1 - cl)
var_mc = -cut_mc * V
es_mc = -sims[sims <= cut_mc].mean() * V

print(f"mu={mu:.5f} sigma={sigma:.5f} z={z:.4f}")
for name, v, e in [("Parametric", var_p, es_p), ("Historical", var_h, es_h),
                   ("Monte Carlo", var_mc, es_mc)]:
    print(f"{name:12s} VaR={v:10,.0f}  ES={e:10,.0f}")
print(f"10-day parametric VaR (sqrt rule): {var_p * np.sqrt(10):,.0f}")
```

Output:

```
mu=0.00072 sigma=0.01168 z=2.3263
Parametric   VaR=    26,461  ES=    30,420
Historical   VaR=    31,475  ES=    38,239
Monte Carlo  VaR=    26,422  ES=    30,383
10-day parametric VaR (sqrt rule): 83,678
```

### Interpreting the comparison
Parametric and Monte Carlo agree closely because both assume normality. Historical VaR is about 19% higher and historical ES about 26% higher, because the true data are fat-tailed: extreme losses occur more often than a normal distribution allows. This is the classic weakness of normal VaR: it is most wrong exactly where it matters. Notice also that ES is always larger than VaR at the same confidence level, since it averages the losses beyond the VaR point.

## Worked example
A 5,000,000 portfolio has a daily volatility of 1.5% and an assumed mean of zero. Compute 95% and 99% one-day VaR and ES, the 10-day 99% VaR, and a historical VaR from a small sample.

```python
import numpy as np
from scipy.stats import norm

V, sigma = 5_000_000, 0.015
for cl in (0.95, 0.99):
    z = norm.ppf(cl)
    var = z * sigma * V
    es = sigma * norm.pdf(z) / (1 - cl) * V
    print(f"{cl:.0%}: z={z:.4f} VaR={var:,.0f} ES={es:,.0f}")
print(f"10-day 99% VaR: {norm.ppf(0.99) * sigma * np.sqrt(10) * V:,.0f}")

rets = np.array([-3.1, -2.4, -2.2, -1.9, -1.5, -1.2, -0.8, -0.5, 0.1, 0.4,
                 0.6, 0.9, 1.0, 1.3, 1.5, 1.8, 2.0, 2.2, 2.6, 3.0])  # % returns
print("Historical 90% VaR (%):", -np.quantile(rets, 0.10))
print("Worst 2 average (ES, %):", -np.sort(rets)[:2].mean())
```

```
95%: z=1.6449 VaR=123,364 ES=154,703
99%: z=2.3263 VaR=174,476 ES=199,891
10-day 99% VaR: 551,742
Historical 90% VaR (%): 2.22
Worst 2 average (ES, %): 2.75
```

1. 95% VaR = 1.6449 × 0.015 × 5,000,000 = **123,364**.
2. 99% VaR = 2.3263 × 0.015 × 5,000,000 = **174,476**.
3. 99% ES = 0.015 × φ(2.3263) / 0.01 × 5,000,000 = 199,891, about 15% above the 99% VaR.
4. 10-day 99% VaR = 174,476 × √10 = **551,742**.
5. Historical 90% VaR from 20 returns: `np.quantile` interpolates between the 2nd and 3rd worst values (−2.4% and −2.2%) and returns −2.22%, so VaR = 2.22%. ES averages the two worst returns: (3.1% + 2.4%) / 2 = 2.75%.

## Common exam traps
- Reporting VaR as a negative number or forgetting to multiply by the portfolio value.
- Using `norm.ppf(0.01)` (negative, −2.3263) and then subtracting it again, which flips the sign.
- Expecting `np.quantile` to return an actual observation; by default it interpolates linearly between neighbours.
- Applying the √T rule without remembering it assumes independent, zero-mean returns.
- Calling ES "the maximum loss"; it is the average loss beyond VaR, and losses can be larger still.

## Key takeaways
- Parametric VaR is $z_c\,\sigma\,V$ (less the mean); ES uses $\phi(z_c)/(1-c)$ in place of $z_c$.
- Historical VaR is `-np.quantile(r, 1 - c) * V`; ES averages the tail beyond it.
- Monte Carlo VaR applies the same quantile logic to simulated returns.
- Fat tails make normal VaR understate risk; historical VaR and ES reveal this.
- Scale to longer horizons with √T only under independence.
