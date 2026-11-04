---
title: "Stationary Time Series"
---

## Learning goals
- Define covariance stationarity, autocovariance, autocorrelation and white noise.
- Calculate the long-run mean, variance and autocorrelations of an AR(1) process and the first autocorrelation of an MA(1).
- Distinguish AR, MA and ARMA models using the ACF and PACF.
- Apply the Ljung-Box test and produce multi-step forecasts that revert to the mean.

## Explanation

### From cross-sections to time series
Regression so far treated observations as independent. Time series data, such as daily returns, monthly default rates or interest-rate changes, are ordered, and today's value often depends on yesterday's. To use a past sample to say something about the future, we need the statistical properties of the series to be stable over time. That stability is **covariance stationarity**.

A series $Y_t$ is covariance stationary if:
1. its mean $E[Y_t] = \mu$ is constant over time,
2. its variance $Var(Y_t) = \gamma_0$ is constant and finite,
3. its autocovariance $\gamma_h = Cov(Y_t, Y_{t-h})$ depends only on the lag $h$, not on $t$.

The **autocorrelation function (ACF)** is $\rho_h = \gamma_h / \gamma_0$. The **partial autocorrelation function (PACF)** measures the correlation between $Y_t$ and $Y_{t-h}$ after removing the effect of the intermediate lags.

### White noise
White noise $\varepsilon_t$ has mean zero, constant variance $\sigma^2$ and zero autocorrelation at every lag. It is the building block of every model below and the benchmark for residuals: a good model leaves residuals that look like white noise.

### Autoregressive models
An AR(1) says today's value is a fraction of yesterday's plus a shock:

$$
Y_t = \delta + \phi Y_{t-1} + \varepsilon_t
$$

$\delta$ is a constant, $\phi$ the persistence parameter and $\varepsilon_t$ white noise. It is stationary only if $|\phi| < 1$. Its key moments are

$$
\mu = \frac{\delta}{1-\phi}, \qquad \gamma_0 = \frac{\sigma^2}{1-\phi^2}, \qquad \rho_h = \phi^{h}
$$

The ACF decays geometrically, while the PACF is non-zero at lag 1 and zero afterwards. An AR(p) generalises this with $p$ lags: its ACF decays and its PACF cuts off after lag $p$.

### Moving-average models
An MA(1) says today's value reflects today's shock and part of yesterday's:

$$
Y_t = \mu + \varepsilon_t + \theta \varepsilon_{t-1}, \qquad \rho_1 = \frac{\theta}{1+\theta^2}, \quad \rho_h = 0 \text{ for } h \geq 2
$$

An MA(q) has a short memory: its ACF **cuts off** after lag $q$, while its PACF decays. MA processes are always stationary.

### ARMA models
An ARMA(p, q) combines both, for example $Y_t = \delta + \phi Y_{t-1} + \varepsilon_t + \theta\varepsilon_{t-1}$. Both the ACF and PACF decay gradually. ARMA models capture rich dynamics with few parameters, which matters because parsimonious models tend to forecast better.

### Testing for autocorrelation and choosing a model
To test whether the first $h$ autocorrelations are jointly zero, use the Ljung-Box statistic:

$$
Q_{LB} = n(n+2)\sum_{j=1}^{h} \frac{\hat\rho_j^{\,2}}{n-j} \sim \chi^2_h
$$

$n$ is the sample size. The simpler Box-Pierce version is $n\sum \hat\rho_j^2$; Ljung-Box performs better in small samples. Among candidate models, choose the one with the lowest information criterion. The **BIC** penalises extra parameters more heavily than the **AIC** and so tends to select smaller models.

### Forecasting
The best forecast is the conditional expectation. For an AR(1), the $h$-step-ahead forecast is

$$
E_T[Y_{T+h}] = \mu + \phi^{h}(Y_T - \mu)
$$

The gap from the long-run mean shrinks by the factor $\phi$ each period: stationary series are **mean-reverting**, and long-horizon forecasts converge to $\mu$.

## Worked example
A risk analyst models the monthly change in a credit index as $Y_t = 0.5 + 0.8Y_{t-1} + \varepsilon_t$ with $\sigma^2 = 1$. The latest value is $Y_T = 4$.

**Step 1 - stationarity.** $|\phi| = 0.8 < 1$, so the process is stationary.

**Step 2 - long-run mean.** $\mu = 0.5/(1 - 0.8) = 2.5$.

**Step 3 - variance.** $\gamma_0 = 1/(1 - 0.64) = 2.778$.

**Step 4 - autocorrelations.** $\rho_1 = 0.8$, $\rho_2 = 0.8^2 = 0.64$.

**Step 5 - forecasts.** One step: $0.5 + 0.8 \times 4 = 3.70$. Two steps: $0.5 + 0.8 \times 3.70 = 3.46$. Check with the shortcut: $2.5 + 0.64 \times 1.5 = 3.46$. The two-month-ahead forecast is **3.46**, moving towards 2.5.

**Step 6 - residual check.** After fitting, the first three residual autocorrelations from $n = 100$ months are 0.20, 0.10 and 0.05. Ljung-Box: $100 \times 102 \times (0.04/99 + 0.01/98 + 0.0025/97) = 5.42$. The 5% critical value of $\chi^2_3$ is 7.81, so we **do not reject** that the residuals are white noise.

## Common exam traps
- Confusing the constant $\delta$ with the mean: the mean of an AR(1) is $\delta/(1-\phi)$.
- Mixing up the signatures: AR has a cutting-off PACF, MA has a cutting-off ACF.
- Writing $\rho_1 = \theta$ for an MA(1); the correct value is $\theta/(1+\theta^2)$.
- Forgetting to add the constant at each step when iterating multi-step forecasts.
- Assuming AR models are always stationary; they need $|\phi| < 1$ (for AR(1)).

## Key takeaways
- Covariance stationarity: constant mean, constant variance, autocovariance depending only on lag.
- AR(1): mean $\delta/(1-\phi)$, variance $\sigma^2/(1-\phi^2)$, ACF $\phi^h$.
- MA(q): ACF cuts off after $q$; AR(p): PACF cuts off after $p$; ARMA: both decay.
- Ljung-Box tests joint autocorrelation; BIC prefers smaller models than AIC.
- Stationary forecasts revert geometrically to the long-run mean.
