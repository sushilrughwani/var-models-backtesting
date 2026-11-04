---
title: "Computing Returns and Volatility"
---

## Learning goals
- Calculate simple and log returns from a price series with pandas and NumPy.
- Explain when each return type is the right tool and how they aggregate over time.
- Annualise mean returns and volatility using the square-root-of-time rule.
- Compute and interpret a rolling volatility series.

## Explanation

### Why returns, not prices
Prices are not comparable across assets: a 2-dollar move means a lot for a 20-dollar stock and very little for a 2,000-dollar stock. Returns scale every move by the starting price, so they can be compared, averaged and fed into risk models. Almost every model in the rest of this module (portfolio optimisation, CAPM, VaR, GARCH) starts from a column of returns.

### Simple returns
The simple (arithmetic) return over one period is

$$
R_t = \frac{P_t - P_{t-1}}{P_{t-1}} = \frac{P_t}{P_{t-1}} - 1
$$

where $P_t$ is the price at the end of period $t$ and $P_{t-1}$ the price one period earlier. Simple returns add up across assets: a portfolio's simple return is the weighted average of its holdings' simple returns. Over time, however, they compound by multiplication: $1 + R_{0,T} = \prod_{t=1}^{T}(1 + R_t)$.

### Log returns
The log (continuously compounded) return is

$$
r_t = \ln\left(\frac{P_t}{P_{t-1}}\right) = \ln(1 + R_t)
$$

Log returns add up over time: the sum of daily log returns equals the log return for the whole period. That makes multi-period maths and simulation easy, which is why the Monte Carlo and volatility lessons use them. The cost is that log returns do not aggregate across assets. For small moves the two are almost identical; the gap widens for big moves (a +50% simple return is only a +40.5% log return).

### Volatility and annualisation
Volatility is the standard deviation of returns. If daily returns are independent with mean $\mu_d$ and standard deviation $\sigma_d$, then over $N$ trading days

$$
\mu_{\text{ann}} = N\,\mu_d, \qquad \sigma_{\text{ann}} = \sigma_d \sqrt{N}
$$

Here $N$ is the number of periods per year: 252 for trading days, 52 for weeks, 12 for months. The mean scales with $N$ but volatility only with $\sqrt{N}$, because variances (not standard deviations) add for independent returns.

### In code
pandas does the heavy lifting. `pct_change()` gives simple returns; `np.log(p).diff()` or `np.log(p / p.shift(1))` gives log returns. The first row is always `NaN` because there is no prior price, so call `dropna()`. Note that `Series.std()` in pandas uses the sample formula (`ddof=1`) while `np.std()` defaults to the population formula (`ddof=0`).

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(42)
dates = pd.bdate_range("2025-01-01", periods=500)
daily_r = rng.normal(0.0004, 0.012, size=500)
prices = pd.Series(100 * np.exp(np.cumsum(daily_r)), index=dates)

log_r = np.log(prices).diff().dropna()
ann_mean = log_r.mean() * 252
ann_vol = log_r.std() * np.sqrt(252)
roll_vol = log_r.rolling(21).std() * np.sqrt(252)

print(f"Annualised mean log return: {ann_mean:.4f}")
print(f"Annualised volatility:      {ann_vol:.4f}")
print(f"Rolling 21d vol min/max:    {roll_vol.min():.4f} / {roll_vol.max():.4f}")
print(roll_vol.dropna().head(3).round(4))
```

Output:

```
Annualised mean log return: 0.0592
Annualised volatility:      0.1830
Rolling 21d vol min/max:    0.0982 / 0.2640
2025-01-30    0.1631
2025-01-31    0.1662
2025-02-03    0.1632
Freq: B, dtype: float64
```

### Rolling volatility
A single full-sample volatility hides the fact that risk changes over time. `rolling(21).std()` computes the standard deviation over the last 21 trading days (roughly one month) at every date. Even in this synthetic series, generated with a constant true volatility of about 19%, the 21-day estimate swings between about 10% and 26%. Some of that is pure sampling noise in a short window. In real markets volatility also clusters, which is what EWMA and GARCH models capture later in the module. The first 20 values of a 21-day window are `NaN`.

## Worked example
A stock closes at 100, 102, 99, 101 and 104 over five days. Compute daily simple and log returns, check the multi-period links, and annualise volatility.

```python
import numpy as np
import pandas as pd

prices = pd.Series([100.0, 102.0, 99.0, 101.0, 104.0])
simple = prices.pct_change().dropna()
log_r = np.log(prices / prices.shift(1)).dropna()
print(simple.round(6).tolist())
print(log_r.round(6).tolist())
print("total simple:", round(prices.iloc[-1] / prices.iloc[0] - 1, 6))
print("sum of logs :", round(log_r.sum(), 6))
print("compounded  :", round((1 + simple).prod() - 1, 6))
sd = simple.std()          # sample std, ddof=1
print("daily sd    :", round(sd, 6))
print("annual sd   :", round(sd * np.sqrt(252), 6))
```

```
[0.02, -0.029412, 0.020202, 0.029703]
[0.019803, -0.029853, 0.020001, 0.02927]
total simple: 0.04
sum of logs : 0.039221
compounded  : 0.04
daily sd    : 0.026743
annual sd   : 0.424527
```

Step by step:
1. Day 1 simple return: 102/100 − 1 = 0.0200. Day 2: 99/102 − 1 = −0.029412. Day 3: 101/99 − 1 = 0.020202. Day 4: 104/101 − 1 = 0.029703.
2. Log returns: ln(1.02) = 0.019803, ln(99/102) = −0.029853, and so on.
3. Compounding the simple returns, (1.02)(0.970588)(1.020202)(1.029703) − 1 = 0.04, which matches 104/100 − 1.
4. Adding the log returns gives 0.039221 = ln(1.04). Adding the simple returns would give 0.040493, which is wrong.
5. The sample standard deviation of the four simple returns is 0.026743. Annualised: 0.026743 × √252 = **0.4245, or about 42.5% annual volatility**.

## Common exam traps
- Adding simple returns over time instead of compounding them. Only log returns add across periods.
- Multiplying volatility by 252 instead of √252, which overstates annual risk about 16-fold.
- Mixing `np.std` (population, `ddof=0`) with pandas `.std()` (sample, `ddof=1`) and then wondering why the numbers differ.
- Forgetting the leading `NaN` from `pct_change()` or a rolling window, which then breaks later calculations.
- Using 365 to annualise daily trading-day returns; use 252 unless the data really includes weekends.

## Key takeaways
- Simple returns aggregate across assets; log returns aggregate across time.
- `pct_change()` and `np.log(p).diff()` are the two one-liners you will reuse everywhere.
- Annualise the mean by $N$ and volatility by $\sqrt{N}$.
- Rolling volatility shows how risk changes; short windows are noisy.
- Always check `ddof` and drop the warm-up `NaN` rows.
