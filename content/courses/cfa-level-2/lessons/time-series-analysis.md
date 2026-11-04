---
title: "Time-Series Analysis"
---

## Learning goals
- Choose between linear and log-linear trend models and explain why trend models often fail.
- Estimate the mean-reverting level of an AR(1) model and produce multi-period chained forecasts.
- Test for serial correlation in AR residuals, detect seasonality and add a seasonal lag.
- Explain unit roots, the Dickey-Fuller test, first differencing, ARCH effects and cointegration.

## Explanation

### Trend models
A **linear trend** $y_t = b_0 + b_1 t + \varepsilon_t$ adds a constant amount each period. A **log-linear trend** $\ln y_t = b_0 + b_1 t + \varepsilon_t$ grows at a constant *rate*, suiting series such as sales or prices that compound. If the data curve upward, a linear trend leaves a pattern of positive, negative, then positive residuals. Either way, trend models usually have serially correlated errors, which makes them unreliable; residuals should be checked (for example with the Durbin-Watson statistic) before trusting them.

### Autoregressive models
An AR(p) model regresses a series on its own past values. The AR(1):
$$
x_t = b_0 + b_1 x_{t-1} + \varepsilon_t
$$
OLS inference is valid only if the series is **covariance stationary**: constant mean, constant variance and covariances that depend only on the lag, not on time.

A stationary AR(1) with $|b_1| < 1$ has a **mean-reverting level**:
$$
\text{MRL} = \frac{b_0}{1 - b_1}
$$
If $x_t$ is above the MRL the model forecasts a decline, and vice versa. Multi-period forecasts are **chained**: use the one-step forecast as the input for the next step. Uncertainty grows with each step.

### Checking residuals
Fitting an AR model, you cannot use Durbin-Watson. Instead, compute residual autocorrelations at each lag and test each with
$$
t = \frac{\hat\rho_k}{1/\sqrt{T}}
$$
where $\hat\rho_k$ is the residual autocorrelation at lag $k$ and $T$ is the number of observations. If none is significant, the model is well specified. A significant autocorrelation at lag 4 in quarterly data (or lag 12 in monthly data) signals **seasonality**: add the seasonal lag, e.g. $x_t = b_0 + b_1 x_{t-1} + b_2 x_{t-4} + \varepsilon_t$.

### Unit roots and random walks
If $b_1 = 1$, the series has a **unit root**: it is a random walk ($x_t = x_{t-1} + \varepsilon_t$, or with drift if $b_0 \neq 0$). Its MRL is undefined ($b_0/0$), its variance grows without bound and it is not covariance stationary, so standard t-tests are invalid.

The **Dickey-Fuller test** subtracts $x_{t-1}$ from both sides: $x_t - x_{t-1} = b_0 + g\,x_{t-1} + \varepsilon_t$, where $g = b_1 - 1$. The null is $g = 0$ (unit root), tested against special, larger critical values. The fix is **first differencing**: model $y_t = x_t - x_{t-1}$, which is usually stationary.

### Model comparison and instability
Compare forecasting models on **out-of-sample root mean squared error** (RMSE); lower is better. In-sample fit can flatter an overfitted model. Coefficients can also drift across regimes, so a longer sample is not always better if the economy has changed.

### ARCH
Autoregressive conditional heteroskedasticity means the error variance depends on past squared errors. Test by regressing squared residuals on their lag:
$$
\hat\varepsilon_t^2 = a_0 + a_1 \hat\varepsilon_{t-1}^2 + u_t
$$
A significant $a_1$ indicates ARCH(1); standard errors are then invalid, but the model can forecast next-period variance as $a_0 + a_1 \hat\varepsilon_t^2$. Generalised least squares corrects for it.

### Regressions with two time series
- Neither series has a unit root: regression is valid.
- Only one has a unit root: invalid.
- Both have unit roots and are **not cointegrated**: invalid (spurious regression).
- Both have unit roots and **are cointegrated** (a long-run equilibrium exists, so the residuals are stationary): valid. Test with Engle-Granger, a Dickey-Fuller test on the residuals.

## Worked example
An analyst fits an AR(1) to a monthly inflation series (%): $\hat x_t = 1.2 + 0.6\,x_{t-1}$, using $T = 100$ observations. The latest value is 4.0%.

**Step 1 - Mean-reverting level.**
$$
\text{MRL} = \frac{1.2}{1 - 0.6} = 3.0\%
$$
Since 4.0% > 3.0%, the model predicts a decline.

**Step 2 - One-step forecast.** $1.2 + 0.6(4.0) = 3.60\%$.

**Step 3 - Two-step forecast (chain).** $1.2 + 0.6(3.60) = $ **3.36%**, moving toward 3.0%.

**Step 4 - Residual check.** Residual autocorrelation at lag 4 is 0.25. Standard error $= 1/\sqrt{100} = 0.10$, so $t = 0.25/0.10 = 2.5$, above the 5% critical value of about 1.98. The lag-4 autocorrelation is significant, so the analyst should **add $x_{t-4}$ as a seasonal lag** and re-test.

**Step 5 - ARCH.** Regressing squared residuals on their lag gives $a_0 = 0.5$, $a_1 = 0.3$ (significant). With the latest squared residual equal to 4.0, next month's error variance forecast is $0.5 + 0.3(4.0) = $ **1.7**.

## Common exam traps
- Forgetting to chain: the two-step forecast is not simply $b_0 + b_1^2 x_t$.
- Computing an MRL for a series with $b_1 = 1$; it is undefined.
- Using Durbin-Watson to test residuals of an AR model.
- Choosing a model on in-sample fit instead of out-of-sample RMSE.
- Concluding that two unit-root series cannot be regressed: they can if they are cointegrated.

## Key takeaways
- Log-linear trends fit compounding growth; trend models often suffer serial correlation.
- AR(1) MRL $= b_0/(1-b_1)$; forecasts are chained and revert toward it.
- Residual autocorrelation t-stat $= \hat\rho_k\sqrt{T}$; a significant seasonal lag calls for a seasonal term.
- Unit root ($b_1 = 1$) means non-stationary; test with Dickey-Fuller, fix by first differencing.
- ARCH makes variance predictable; cointegration rescues regressions between unit-root series.
