---
title: "Volatility Models: EWMA and GARCH"
---

## Learning goals
- Explain volatility clustering and why equal-weighted historical volatility reacts poorly to it.
- Implement the EWMA variance recursion in NumPy.
- Estimate a GARCH(1,1) model by maximum likelihood with `scipy.optimize.minimize`.
- Forecast volatility over multiple horizons using mean reversion to the long-run variance.

## Explanation

### Why time-varying volatility?
In the returns lesson the 21-day rolling volatility wandered around even for a constant-volatility series. Real markets add a stronger pattern: **volatility clustering**. Large moves tend to be followed by large moves, calm by calm. A rolling window gives every day in the window the same weight and then drops it abruptly, so its estimate reacts slowly to shocks and jumps when an old shock leaves the window. EWMA and GARCH fix this by weighting recent information more heavily.

### EWMA
The exponentially weighted moving average updates variance each day:

$$
\sigma_t^2 = \lambda\,\sigma_{t-1}^2 + (1 - \lambda)\,r_{t-1}^2
$$

where $\sigma_t^2$ is today's variance estimate, $r_{t-1}$ is yesterday's return (mean assumed zero) and $\lambda$ is the decay factor. RiskMetrics popularised $\lambda = 0.94$ for daily data: yesterday's squared return gets 6% weight and the weights on older returns decay geometrically. EWMA has no long-run anchor, so its forecast for every future day is simply today's estimate.

### GARCH(1,1)
GARCH adds a constant that pulls variance back toward a long-run level:

$$
\sigma_t^2 = \omega + \alpha\, r_{t-1}^2 + \beta\, \sigma_{t-1}^2, \qquad V_L = \frac{\omega}{1 - \alpha - \beta}
$$

where $\omega > 0$ is a constant, $\alpha$ the weight on yesterday's shock, $\beta$ the weight on yesterday's variance and $V_L$ the long-run variance. Stationarity requires $\alpha + \beta < 1$; the sum is called **persistence**. EWMA is the special case $\omega = 0$, $\alpha = 1 - \lambda$, $\beta = \lambda$.

### Forecasting
GARCH forecasts revert geometrically to the long-run level:

$$
E[\sigma_{t+h}^2] = V_L + (\alpha + \beta)^{h-1}\left(\sigma_{t+1}^2 - V_L\right)
$$

where $\sigma_{t+1}^2$ is the one-step-ahead variance. High persistence means slow reversion.

### Estimation by maximum likelihood
Assuming normal shocks, the negative log-likelihood is

$$
-\ln L = \tfrac{1}{2}\sum_t \left[\ln(2\pi\sigma_t^2) + \frac{r_t^2}{\sigma_t^2}\right]
$$

We compute the variance path for candidate parameters and let `minimize` find the parameters with the lowest value. Invalid parameters (negative values or $\alpha + \beta \ge 1$) return a huge penalty. Dedicated packages exist, but writing it yourself shows exactly what they do.

### The code
We simulate 2,000 days from a GARCH(1,1) with known parameters (ω = 2e-6, α = 0.08, β = 0.90, long-run volatility 15.87%), then estimate EWMA and GARCH on the simulated data.

```python
import numpy as np
from scipy.optimize import minimize

# Simulate 2,000 daily returns from a known GARCH(1,1)
rng = np.random.default_rng(5)
omega, alpha, beta = 2e-6, 0.08, 0.90
n = 2000
r = np.empty(n); var = np.empty(n)
var[0] = omega / (1 - alpha - beta)
for t in range(n):
    if t > 0:
        var[t] = omega + alpha * r[t - 1]**2 + beta * var[t - 1]
    r[t] = np.sqrt(var[t]) * rng.standard_normal()

# EWMA (RiskMetrics, lambda = 0.94)
lam = 0.94
ewma = np.empty(n); ewma[0] = r.var()
for t in range(1, n):
    ewma[t] = lam * ewma[t - 1] + (1 - lam) * r[t - 1]**2
print(f"EWMA vol today (annualised): {np.sqrt(ewma[-1] * 252):.4f}")

# GARCH(1,1) by maximum likelihood
def neg_loglik(params, r):
    w, a, b = params
    if w <= 0 or a < 0 or b < 0 or a + b >= 1:
        return 1e10
    s2 = np.empty(len(r)); s2[0] = r.var()
    for t in range(1, len(r)):
        s2[t] = w + a * r[t - 1]**2 + b * s2[t - 1]
    return 0.5 * np.sum(np.log(2 * np.pi * s2) + r**2 / s2)

res = minimize(neg_loglik, x0=[1e-6, 0.05, 0.90], args=(r,), method="Nelder-Mead",
               options={"xatol": 1e-10, "fatol": 1e-10, "maxiter": 5000})
w, a, b = res.x
print(f"omega={w:.2e} alpha={a:.4f} beta={b:.4f} persistence={a + b:.4f}")
long_run = w / (1 - a - b)
print(f"Long-run vol (annualised): {np.sqrt(long_run * 252):.4f}")

# Forecast variance h days ahead: VL + (a+b)^(h-1) * (sigma2_{t+1} - VL)
s2 = np.empty(n); s2[0] = r.var()
for t in range(1, n):
    s2[t] = w + a * r[t - 1]**2 + b * s2[t - 1]
next_var = w + a * r[-1]**2 + b * s2[-1]
for h in (1, 10, 60, 250):
    f = long_run + (a + b)**(h - 1) * (next_var - long_run)
    print(f"h={h:3d} forecast vol (annualised): {np.sqrt(f * 252):.4f}")
```

Output:

```
EWMA vol today (annualised): 0.1662
omega=1.63e-06 alpha=0.0669 beta=0.9134 persistence=0.9802
Long-run vol (annualised): 0.1444
h=  1 forecast vol (annualised): 0.1588
h= 10 forecast vol (annualised): 0.1565
h= 60 forecast vol (annualised): 0.1490
h=250 forecast vol (annualised): 0.1445
```

### Reading the results
The estimates (α = 0.067, β = 0.913) are close to the true values (0.08 and 0.90), and persistence of 0.980 matches the true 0.98 almost exactly. Today's one-day forecast (15.88% annualised) is above the estimated long-run level (14.44%), so the forecasts drift down toward it: after 250 days they have almost fully reverted. The EWMA estimate (16.62%) is different because it uses a fixed λ and has no long-run anchor; its forecast would stay at 16.62% for every horizon.

## Worked example
Yesterday's volatility estimate was 1.0% and yesterday's return was 3.0%. Update EWMA (λ = 0.94) and GARCH(1,1) with ω = 0.000002, α = 0.08, β = 0.90, then forecast.

```python
import numpy as np

r_prev, s_prev = 0.03, 0.01           # yesterday's return and volatility
ewma_var = 0.94 * s_prev**2 + 0.06 * r_prev**2
print(f"EWMA:  var={ewma_var:.6f} vol={np.sqrt(ewma_var):.4%}")

w, a, b = 0.000002, 0.08, 0.90
garch_var = w + a * r_prev**2 + b * s_prev**2
VL = w / (1 - a - b)
print(f"GARCH: var={garch_var:.6f} vol={np.sqrt(garch_var):.4%}")
print(f"Long-run: var={VL:.6f} daily vol={np.sqrt(VL):.4%} annual={np.sqrt(252 * VL):.4%}")
f10 = VL + (a + b)**9 * (garch_var - VL)
print(f"10-day-ahead daily vol: {np.sqrt(f10):.4%}")
```

```
EWMA:  var=0.000148 vol=1.2166%
GARCH: var=0.000164 vol=1.2806%
Long-run: var=0.000100 daily vol=1.0000% annual=15.8745%
10-day-ahead daily vol: 1.2384%
```

1. EWMA: 0.94 × 0.0001 + 0.06 × 0.0009 = 0.000094 + 0.000054 = 0.000148, so volatility = √0.000148 = **1.2166%**.
2. GARCH: 0.000002 + 0.08 × 0.0009 + 0.90 × 0.0001 = 0.000002 + 0.000072 + 0.000090 = 0.000164, so volatility = **1.2806%**.
3. Long-run variance: 0.000002 / (1 − 0.98) = 0.0001, i.e. 1.00% daily or 1.00% × √252 = 15.87% annual.
4. 10-day-ahead variance: 0.0001 + 0.98⁹ × (0.000164 − 0.0001) = 0.0001 + 0.8337 × 0.000064 = 0.00015336, so daily volatility = **1.2384%**, partway back toward 1.00%.

## Common exam traps
- Using today's return in today's variance; the recursion uses yesterday's return $r_{t-1}$.
- Forgetting to square the return (or the previous volatility) before plugging in.
- Annualising variance with √252 instead of multiplying variance by 252 (or volatility by √252).
- Claiming EWMA mean-reverts; it does not, because it has no ω term.
- Accepting GARCH estimates with α + β ≥ 1, which imply no finite long-run variance.

## Key takeaways
- EWMA and GARCH weight recent shocks more, capturing volatility clustering.
- EWMA: one parameter λ, no long-run level, flat forecasts.
- GARCH(1,1): ω, α, β; long-run variance $\omega/(1-\alpha-\beta)$; forecasts revert at speed $\alpha+\beta$.
- Maximum likelihood estimation is a short loop plus `scipy.optimize.minimize`.
- Always sanity-check estimates: positive parameters and persistence below 1.
