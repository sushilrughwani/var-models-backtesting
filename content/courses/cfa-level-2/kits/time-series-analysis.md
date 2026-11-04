---
title: "Time-Series Analysis"
duration: 32
---

## Lecture outline
- 00:00 - Hook: regress one random walk on another and you will often find a "significant" relationship that is pure nonsense
- 03:00 - Trend models: linear vs log-linear, and why residuals are usually correlated
- 07:00 - Stationarity and AR(1); mean-reverting level
- 11:00 - Whiteboard 1: MRL and chained forecasts
- 15:00 - Testing AR residuals; seasonality and seasonal lags
- 19:00 - Unit roots, random walks, Dickey-Fuller and first differencing
- 24:00 - RMSE, instability and ARCH (whiteboard 2)
- 28:00 - Two-series regressions and cointegration decision tree; traps and recap

## Slides
### Slide 1: Time-Series Analysis
- Using a variable's own past to forecast its future
- Trend models, AR models, unit roots, ARCH, cointegration
- Core skill: knowing when OLS output can be trusted

### Slide 2: Trend Models
- Linear: constant amount per period
- Log-linear: constant growth rate
- Check residuals: serial correlation is common

### Slide 3: Covariance Stationarity
- Constant mean and variance
- Covariance depends only on the lag
- Required for valid AR inference

### Slide 4: AR(1) and Mean Reversion
- $x_t = b_0 + b_1x_{t-1} + \varepsilon_t$
- MRL = $b_0/(1 - b_1)$, needs $|b_1| < 1$
- Above MRL → forecast falls; below → rises

### Slide 5: Chained Forecasts
- Step 1 output becomes step 2 input
- Forecasts converge to the MRL
- Uncertainty widens with horizon

### Slide 6: Testing AR Residuals
- Not Durbin-Watson
- t = residual autocorrelation / (1/√T)
- All insignificant → model adequate

### Slide 7: Seasonality
- Significant lag 4 (quarterly) or lag 12 (monthly)
- Add the seasonal lag as a regressor
- Re-test the residuals

### Slide 8: Unit Roots
- $b_1 = 1$: random walk, MRL undefined
- Variance unbounded, not stationary
- t-tests invalid

### Slide 9: Dickey-Fuller and Differencing
- Regress Δx on $x_{t-1}$; test g = b1 - 1 = 0
- Special (larger) critical values
- Fix: model first differences

### Slide 10: Comparing Models
- Out-of-sample RMSE, lower is better
- In-sample fit can mislead
- Watch for regime change (instability)

### Slide 11: ARCH
- Regress squared residuals on lagged squared residuals
- Significant a1 → ARCH; standard errors invalid
- Variance forecast: $a_0 + a_1\hat\varepsilon_t^2$

### Slide 12: Two Series and Cointegration
- Neither unit root → OK; one unit root → not OK
- Both unit roots, not cointegrated → spurious
- Both unit roots, cointegrated → OK (Engle-Granger test)

## Whiteboard examples
**Example 1 - AR(1).** $\hat x_t = 1.2 + 0.6x_{t-1}$, latest x = 4.0, T = 100.
- MRL = 1.2/0.4 = 3.0.
- One step: 1.2 + 2.4 = 3.60. Two steps: 1.2 + 0.6(3.60) = 3.36.
- Wrong shortcut: 1.2 + 0.36(4.0) = 2.64 (forgets the intercept enters twice).

**Example 2 - Seasonality.** Residual autocorrelations at lags 1-4: 0.05, -0.08, 0.06, 0.25. SE = 1/√100 = 0.10. t-stats: 0.5, -0.8, 0.6, 2.5. Only lag 4 exceeds 1.98 → add $x_{t-4}$.

**Example 3 - ARCH forecast.** $\hat\varepsilon_t^2 = 0.5 + 0.3\hat\varepsilon_{t-1}^2$; latest squared residual 4.0 → forecast variance 0.5 + 1.2 = 1.7.

## Questions to ask students
- AR(1) with b0 = 2 and b1 = 0.5: what is the MRL? (4.)
- Why can't you compute an MRL for a random walk? (b1 = 1 makes the denominator zero.)
- What is the null hypothesis in a Dickey-Fuller test? (g = 0, i.e. a unit root.)
- Monthly data show a significant residual autocorrelation at lag 12. What do you do? (Add a lag-12 term.)
- Two series both have unit roots. Is the regression valid? (Only if they are cointegrated.)
- Model A has lower in-sample error, model B lower out-of-sample RMSE. Which is preferred for forecasting? (Model B.)

## Analogies
- Mean reversion as a rubber band: the further the series stretches from its MRL, the harder it is pulled back.
- Random walk as a drunk leaving a bar: no home to return to, so the distance from the start keeps growing.
- Cointegration as a dog on a leash with its owner: both wander randomly, but the gap between them stays bounded.

## Recording tips
- Draw the two-series decision tree on screen; item sets regularly test which combination is valid.
- Do the chained forecast step by step and show the wrong shortcut explicitly.
- Keep unit-root intuition visual: plot a stationary AR(1) next to a random walk.
