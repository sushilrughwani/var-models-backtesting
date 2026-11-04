---
title: "Portfolio Optimisation"
---

## Learning goals
- Compute portfolio expected return and volatility with matrix algebra in NumPy.
- Find the minimum-variance and maximum-Sharpe portfolios with `scipy.optimize.minimize`.
- Trace an efficient frontier by minimising variance for a range of target returns.
- Explain why optimised weights are highly sensitive to the inputs.

## Explanation

### The idea
Mean-variance optimisation, introduced by Markowitz, asks a simple question: for a given level of expected return, which mix of assets has the lowest risk? Because assets are not perfectly correlated, combining them reduces risk below the weighted average of their volatilities. The optimiser's job is to exploit that diversification as efficiently as possible.

### Portfolio maths in matrix form
With a weight vector $w$, expected-return vector $\mu$ and covariance matrix $\Sigma$:

$$
\mu_p = w^\top \mu, \qquad \sigma_p = \sqrt{w^\top \Sigma\, w}, \qquad SR = \frac{\mu_p - r_f}{\sigma_p}
$$

Here $\mu_p$ is portfolio expected return, $\sigma_p$ portfolio volatility, $r_f$ the risk-free rate and $SR$ the Sharpe ratio. In NumPy these are one-liners: `w @ mu` and `np.sqrt(w @ cov @ w)`. The covariance matrix is built from volatilities and correlations as $\Sigma_{ij} = \rho_{ij}\sigma_i\sigma_j$, which is `np.outer(vols, vols) * corr`.

### Three portfolios that matter
- **Minimum variance (GMV):** the lowest-risk fully invested portfolio. It needs no return forecasts at all, only $\Sigma$.
- **Maximum Sharpe (tangency):** the highest excess return per unit of risk. Combined with cash it dominates every other risky portfolio.
- **Efficient frontier:** for each target return, the minimum-variance portfolio. Everything below the frontier is inefficient.

### Two-asset closed form
For two assets the minimum-variance weight in asset 1 is

$$
w_1^{*} = \frac{\sigma_2^2 - \sigma_{12}}{\sigma_1^2 + \sigma_2^2 - 2\sigma_{12}}
$$

where $\sigma_{12} = \rho\,\sigma_1\sigma_2$ is the covariance. With more assets and constraints such as "no short selling", we use a numerical optimiser.

### The code
`minimize` takes an objective, a starting guess, bounds (here 0 to 1 for long-only) and constraints (weights sum to 1). To maximise the Sharpe ratio we minimise its negative.

```python
import numpy as np
from scipy.optimize import minimize

mu = np.array([0.04, 0.08, 0.11])           # expected annual returns
vols = np.array([0.06, 0.16, 0.24])         # annual volatilities
corr = np.array([[1.0, 0.2, 0.1],
                 [0.2, 1.0, 0.7],
                 [0.1, 0.7, 1.0]])
cov = np.outer(vols, vols) * corr           # covariance matrix
rf = 0.02

def port_stats(w):
    r = w @ mu
    v = np.sqrt(w @ cov @ w)
    return r, v, (r - rf) / v

n = len(mu)
bounds = [(0, 1)] * n                         # long-only
budget = {"type": "eq", "fun": lambda w: w.sum() - 1}
w0 = np.full(n, 1 / n)

min_var = minimize(lambda w: w @ cov @ w, w0, bounds=bounds, constraints=[budget], tol=1e-12)
max_sr = minimize(lambda w: -port_stats(w)[2], w0, bounds=bounds, constraints=[budget], tol=1e-12)

for name, res in [("Min variance", min_var), ("Max Sharpe", max_sr)]:
    r, v, s = port_stats(res.x)
    print(f"{name:12s} w={np.round(res.x, 3)} ret={r:.4f} vol={v:.4f} SR={s:.3f}")

# Efficient frontier: minimum variance for each target return
for tgt in np.linspace(min_var.x @ mu, mu.max(), 5):
    cons = [budget, {"type": "eq", "fun": lambda w, t=tgt: w @ mu - t}]
    res = minimize(lambda w: w @ cov @ w, w0, bounds=bounds, constraints=cons, tol=1e-12)
    print(f"target {tgt:.4f} -> vol {np.sqrt(res.fun):.4f}")
```

Output:

```
Min variance w=[0.935 0.053 0.012] ret=0.0430 vol=0.0590 SR=0.389
Max Sharpe   w=[0.705 0.142 0.153] ret=0.0564 vol=0.0743 SR=0.490
target 0.0430 -> vol 0.0590
target 0.0597 -> vol 0.0816
target 0.0765 -> vol 0.1272
target 0.0932 -> vol 0.1791
target 0.1100 -> vol 0.2400
```

### Reading the results
The GMV portfolio is 93.5% bonds with a volatility of 5.90%, below even the bond asset's 6% on its own: that is diversification at work. The tangency portfolio adds more equity and emerging markets because their extra return compensates for their risk; its Sharpe ratio of 0.490 is the best available. Along the frontier, each step up in return costs more and more volatility, and the top end is 100% in the highest-return asset (24% volatility). The `t=tgt` default argument in the lambda freezes each target value; without it every constraint would use the last loop value.

### Estimation error
Optimisers treat $\mu$ and $\Sigma$ as known truths, but in practice they are estimates from noisy data (for example `rets.mean() * 252` and `rets.cov() * 252` from the earlier returns lesson). Small changes in expected returns can swing weights dramatically, and the optimiser tends to pile into assets whose returns happen to be overestimated. Practitioners respond with weight limits, shrinkage of the inputs, or simply favouring the GMV portfolio, which does not need return forecasts.

## Worked example
Two assets: A has expected return 6% and volatility 10%; B has 12% and 20%; correlation 0.25. Find the minimum-variance portfolio.

```python
import numpy as np

s1, s2, rho = 0.10, 0.20, 0.25
mu = np.array([0.06, 0.12])
cov12 = rho * s1 * s2
w1 = (s2**2 - cov12) / (s1**2 + s2**2 - 2 * cov12)
w = np.array([w1, 1 - w1])
cov = np.array([[s1**2, cov12], [cov12, s2**2]])
print(f"cov12={cov12:.4f}  w1={w1:.4f}  w2={1 - w1:.4f}")
print(f"return={w @ mu:.4f}  vol={np.sqrt(w @ cov @ w):.4f}")
```

```
cov12=0.0050  w1=0.8750  w2=0.1250
return=0.0675  vol=0.0968
```

1. Covariance: 0.25 × 0.10 × 0.20 = 0.0050.
2. Numerator: 0.20² − 0.0050 = 0.0400 − 0.0050 = 0.0350.
3. Denominator: 0.0100 + 0.0400 − 2 × 0.0050 = 0.0400.
4. $w_1$ = 0.0350 / 0.0400 = 0.875, so $w_2$ = 0.125.
5. Return = 0.875 × 6% + 0.125 × 12% = 6.75%.
6. Variance = 0.875² × 0.01 + 0.125² × 0.04 + 2 × 0.875 × 0.125 × 0.005 = 0.009375, so volatility = **9.68%**, lower than asset A alone.

## Common exam traps
- Writing `w * cov * w` (element-wise) instead of `w @ cov @ w` (matrix product).
- Maximising the Sharpe ratio by passing it straight to `minimize`; you must minimise the negative.
- Forgetting the budget constraint, so weights do not sum to 1.
- Mixing daily covariance with annual expected returns; annualise both consistently.
- Believing optimised weights are precise; they are only as good as the inputs.

## Key takeaways
- Portfolio return is $w^\top\mu$; portfolio volatility is $\sqrt{w^\top\Sigma w}$.
- `scipy.optimize.minimize` with bounds and an equality constraint handles long-only optimisation.
- The GMV portfolio needs only the covariance matrix; the tangency portfolio maximises the Sharpe ratio.
- The efficient frontier is a loop of constrained minimisations over target returns.
- Estimation error is the biggest practical weakness of mean-variance optimisation.
