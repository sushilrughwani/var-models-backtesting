---
title: "Measuring and Monitoring Volatility"
---

## Learning goals
- Explain why equal-weighted historical volatility responds poorly to changing market conditions.
- Update a volatility estimate with the EWMA model.
- Calculate the GARCH(1,1) variance, its long-run variance and multi-day forecasts.
- Describe how volatility forecasts create a volatility term structure.
- Update covariance and correlation estimates with EWMA.

## Explanation

### Why volatility needs monitoring
Every VaR number in the last two lessons used a volatility $\sigma$ as an input. Volatility is not constant: it clusters, with calm periods followed by turbulent ones, and big moves tend to be followed by more big moves. A simple standard deviation over the last 250 days gives every observation equal weight, so a crash 249 days ago counts as much as yesterday's move, and then drops out abruptly when it leaves the window. Better estimators give **more weight to recent data**. Throughout, $u_i$ is the daily return on day $i$, and for daily data its mean is assumed to be zero, so variance is just the average of $u^2$.

### EWMA
The exponentially weighted moving average puts weights on past squared returns that decay geometrically:

$$
\sigma_n^2 = \lambda\,\sigma_{n-1}^2 + (1-\lambda)\,u_{n-1}^2
$$

where $\sigma_n^2$ is the variance estimate for day $n$, $\lambda$ is the decay factor (RiskMetrics used 0.94 for daily data) and $u_{n-1}$ is the most recent return. Only two numbers need storing: yesterday's variance and yesterday's return. A low $\lambda$ reacts quickly to news; a high $\lambda$ produces smoother estimates. EWMA has **no mean reversion**: the best forecast of future variance is simply today's estimate.

### GARCH(1,1)
GARCH adds a pull towards a long-run variance $V_L$:

$$
\sigma_n^2 = \omega + \alpha\,u_{n-1}^2 + \beta\,\sigma_{n-1}^2
$$

with $\omega = \gamma V_L$ and weights $\gamma + \alpha + \beta = 1$. So

$$
V_L = \frac{\omega}{1-\alpha-\beta}
$$

The model is stable only if $\alpha + \beta < 1$. The sum $\alpha + \beta$ is the **persistence**: close to 1 means shocks fade slowly. EWMA is the special case $\omega = 0$, $\alpha = 1-\lambda$, $\beta = \lambda$.

### Forecasting and the term structure
The expected variance $t$ days ahead is

$$
E[\sigma_{n+t}^2] = V_L + (\alpha+\beta)^t\,(\sigma_n^2 - V_L)
$$

The gap between today's variance and the long-run level shrinks by a factor of $(\alpha+\beta)$ each day. The half-life of a shock is $\ln 0.5 / \ln(\alpha+\beta)$. Averaging these forecasts over different horizons gives a **volatility term structure**: when current volatility is above $V_L$, longer-dated volatility is lower (downward-sloping), and vice versa. This is why implied volatilities of short-dated options react more strongly to news than long-dated ones.

### Correlation
The same weighting applies to covariances. With returns $x$ and $y$:

$$
\text{cov}_n = \lambda\,\text{cov}_{n-1} + (1-\lambda)\,x_{n-1}y_{n-1}
$$

and $\rho_n = \text{cov}_n / (\sigma_{x,n}\sigma_{y,n})$. Using the same $\lambda$ for variances and covariances keeps the covariance matrix internally consistent (positive semi-definite).

## Worked example
Yesterday's volatility estimate was 1.5% per day and yesterday's return was −2.0%.

**EWMA with $\lambda = 0.94$**
1. $\sigma_{n-1}^2 = 0.015^2 = 0.000225$; $u_{n-1}^2 = 0.02^2 = 0.0004$.
2. $\sigma_n^2 = 0.94 \times 0.000225 + 0.06 \times 0.0004 = 0.0002115 + 0.000024 = 0.0002355$.
3. $\sigma_n = \sqrt{0.0002355} =$ **1.5346%**.

**GARCH(1,1) with $\omega = 0.000002$, $\alpha = 0.08$, $\beta = 0.90$**
4. Long-run variance: $V_L = 0.000002 / (1 - 0.98) = 0.0001$, a long-run volatility of 1.0% per day.
5. $\sigma_n^2 = 0.000002 + 0.08 \times 0.0004 + 0.90 \times 0.000225 = 0.000002 + 0.000032 + 0.0002025 = 0.0002365$.
6. $\sigma_n = \sqrt{0.0002365} =$ **1.5379%**.
7. Ten-day-ahead variance: $0.0001 + 0.98^{10} \times (0.0002365 - 0.0001) = 0.0001 + 0.81707 \times 0.0001365 = 0.00021153$, so the expected daily volatility on day 10 is **1.4544%**.
8. Half-life: $\ln 0.5 / \ln 0.98 \approx 34.3$ days.

Current volatility (1.54%) sits well above the long-run 1.0%, so GARCH forecasts a gradual decline, whereas EWMA would forecast 1.5346% for every future day.

## Common exam traps
- Plugging in volatilities instead of variances: square first, combine, then take the square root.
- Mixing up which weight goes with which term: in EWMA $\lambda$ multiplies the old variance, $(1-\lambda)$ the new squared return.
- Forgetting that $\omega$ is not the long-run variance; $V_L = \omega/(1-\alpha-\beta)$.
- Assuming EWMA mean-reverts. Only GARCH (with $\omega > 0$) pulls forecasts towards $V_L$.
- Annualising daily variance with 252 but forgetting to take the square root of 252 when annualising volatility.

## Key takeaways
- Volatility clusters, so recent returns deserve more weight than old ones.
- EWMA: $\sigma_n^2 = \lambda\sigma_{n-1}^2 + (1-\lambda)u_{n-1}^2$, no mean reversion.
- GARCH(1,1) adds $\omega$, giving a long-run variance $\omega/(1-\alpha-\beta)$ and mean reversion.
- Forecast gaps to $V_L$ shrink by $(\alpha+\beta)$ per day, shaping the volatility term structure.
- Covariances update the same way; use one $\lambda$ for a consistent matrix.
