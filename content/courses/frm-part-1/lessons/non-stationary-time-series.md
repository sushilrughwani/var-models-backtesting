---
title: "Non-Stationary Time Series"
---

## Learning goals
- Describe the three main sources of non-stationarity: time trends, seasonality and unit roots.
- Estimate and forecast linear and log-linear trend models, including the variance adjustment for log forecasts.
- Model deterministic seasonality with dummy variables without falling into the dummy-variable trap.
- Explain random walks, perform an augmented Dickey-Fuller test and explain why spurious regression arises.

## Explanation

### Why non-stationarity matters
The previous lesson relied on a constant mean, a constant variance and stable autocovariances. Many economic and financial series break these conditions: GDP grows, retail sales spike every December, and asset prices wander without any tendency to return to a fixed level. Applying stationary tools to such data produces misleading inference and poor forecasts. The cure is to identify *which* type of non-stationarity is present and transform the data accordingly.

### Time trends
A **deterministic trend** makes the mean a function of time:

$$
Y_t = \beta_0 + \beta_1 t + \varepsilon_t
$$

$t$ is the time index and $\beta_1$ is the change per period. Series that grow at a roughly constant *percentage* rate are better described by a **log-linear trend**:

$$
\ln Y_t = \beta_0 + \beta_1 t + \varepsilon_t, \qquad E[Y_{T+h}] = \exp\left(\beta_0 + \beta_1 (T+h) + \tfrac{\sigma^2}{2}\right)
$$

Here $\beta_1$ is approximately the growth rate per period (exactly $e^{\beta_1} - 1$), and $\sigma^2$ is the residual variance. The $\sigma^2/2$ term appears because the exponential of a normal variable has a mean above the exponential of its mean. Trend-stationary series become stationary once the trend is removed.

### Seasonality
**Deterministic seasonality** means the mean shifts in a regular calendar pattern. Model it with dummy variables: for quarterly data with an intercept, include three dummies and leave one quarter as the base. Each dummy coefficient measures that quarter's mean relative to the base. Including all four dummies plus an intercept creates perfect collinearity. Trends and seasonal dummies can be combined in one regression.

### Random walks and unit roots
A **random walk** is an AR(1) with $\phi = 1$:

$$
Y_t = Y_{t-1} + \varepsilon_t \quad \Rightarrow \quad Y_t = Y_0 + \sum_{s=1}^{t}\varepsilon_s, \qquad Var(Y_t \mid Y_0) = t\sigma^2
$$

Every shock is permanent and the variance grows without bound, so the series is not stationary. Adding a constant gives a random walk with drift. Such a series is said to have a **unit root**. Its ACF decays extremely slowly, and its forecasts do not revert: the best forecast of any future value is today's value (plus drift). A random walk becomes stationary after **first differencing**: $\Delta Y_t = Y_t - Y_{t-1} = \varepsilon_t$.

### Testing for a unit root
The augmented Dickey-Fuller (ADF) test estimates

$$
\Delta Y_t = \alpha + \gamma Y_{t-1} + \lambda_1 \Delta Y_{t-1} + \cdots + \lambda_p \Delta Y_{t-p} + \varepsilon_t
$$

with $\gamma = \phi - 1$. The null is $H_0: \gamma = 0$ (unit root) against $H_1: \gamma < 0$ (stationary). The lagged differences soak up autocorrelation. The t-statistic on $\gamma$ does **not** follow a normal or t distribution under the null; it uses Dickey-Fuller critical values, which are more negative. With a constant, the approximate 5% value is $-2.86$ (1%: $-3.43$). A time trend can be added if the series trends, which pushes the critical values further out. The test has low power: it often fails to reject a unit root when the series is merely very persistent.

### Spurious regression
Regress one random walk on another, independent one, and you will frequently find a large $R^2$ and highly significant t-statistics even though the series are unrelated. This **spurious regression** occurs because both series wander, and the residuals themselves contain a unit root, so the usual test statistics are invalid. Remedies: difference both series before regressing, or test whether they are cointegrated (share a common stochastic trend so that a combination of them is stationary).

## Worked example
**Part 1 - log-linear trend.** An analyst fits $\ln Y_t = 4.6 + 0.02t$ to quarterly revenue of a payments firm, with residual variance $\sigma^2 = 0.01$. Forecast revenue at $t = 50$.
- Fitted log value: $4.6 + 0.02 \times 50 = 5.60$.
- Variance adjustment: $\sigma^2/2 = 0.005$.
- Forecast: $e^{5.605} = $ **271.78** (versus 270.43 without the adjustment).
- Quarterly growth: $e^{0.02} - 1 = 2.02\%$.

**Part 2 - ADF test.** For the log of an exchange rate the analyst estimates $\Delta Y_t = 0.3 - 0.06Y_{t-1} + 0.2\Delta Y_{t-1}$ with $SE(\hat\gamma) = 0.025$.
- Test statistic: $-0.06/0.025 = -2.40$.
- Compare with the Dickey-Fuller 5% critical value $-2.86$. Since $-2.40 > -2.86$, the statistic is not negative enough.
- **Fail to reject the unit root**: model the first difference of the series, not its level. Using the standard normal value $-1.96$ would have wrongly rejected.

## Common exam traps
- Using normal or t critical values for the ADF statistic instead of the more negative Dickey-Fuller values.
- Reversing the ADF hypotheses: the null is a unit root (non-stationarity).
- Including one dummy per season plus an intercept (dummy-variable trap).
- Forgetting the $\sigma^2/2$ adjustment when converting a log-linear forecast back into levels.
- Trusting a high $R^2$ between two trending series; it may be spurious.

## Key takeaways
- Three sources of non-stationarity: trends, seasonality, unit roots.
- Trends and seasonality are deterministic and handled with time indices and dummies.
- A unit root makes shocks permanent and variance grow with time; difference the series.
- ADF tests $\gamma = 0$ against $\gamma < 0$ using Dickey-Fuller critical values.
- Regressing one random walk on another can produce spurious significance.
