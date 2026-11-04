---
title: "Non-Stationary Time Series"
duration: 24
---

## Lecture outline
- 00:00 - Hook: two unrelated series, cumulative rainfall in one city and a stock index, regress with R² = 0.85. How?
- 02:00 - Why non-stationarity breaks the tools from the last lesson
- 04:00 - Linear and log-linear trends; the σ²/2 adjustment
- 08:00 - Seasonal dummies and the dummy-variable trap
- 11:00 - Random walks, unit roots and differencing
- 15:00 - The augmented Dickey-Fuller test and its critical values
- 19:00 - Spurious regression and cointegration
- 21:00 - Whiteboard examples, exam traps and recap

## Slides
### Slide 1: Non-Stationary Time Series
- Many financial series trend, cycle or wander
- Stationary tools fail on non-stationary data
- Goal: identify the type and transform correctly

### Slide 2: Three Sources
- Deterministic time trend
- Deterministic seasonality
- Stochastic trend (unit root)

### Slide 3: Linear and Log-Linear Trends
- Linear: Yt = β0 + β1 t + εt (constant change)
- Log-linear: ln Yt = β0 + β1 t + εt (constant growth rate)
- Forecast in levels: exp(fitted + σ²/2)

### Slide 4: Seasonal Dummies
- s seasons with intercept: use s - 1 dummies
- Coefficients measure each season relative to the base
- All s dummies plus intercept: perfect collinearity

### Slide 5: Random Walk
- Yt = Yt-1 + εt, shocks are permanent
- Var(Yt) = tσ², grows with time
- Forecast = today's value (plus any drift)

### Slide 6: Differencing
- ΔYt = Yt - Yt-1 removes a unit root
- Detrending removes a deterministic trend
- Using the wrong fix leaves problems behind

### Slide 7: Augmented Dickey-Fuller Test
- ΔYt = α + γ Yt-1 + lagged differences + εt
- H0: γ = 0 (unit root) vs H1: γ < 0
- Critical values: about -2.86 at 5% with constant

### Slide 8: Low Power
- Hard to distinguish φ = 1 from φ = 0.97 in finite samples
- Failing to reject does not prove a unit root
- Include a trend term if the series trends

### Slide 9: Spurious Regression
- Independent random walks show high R² and big t-stats
- Residuals are non-stationary, inference invalid
- Remedy: difference, or test for cointegration

### Slide 10: Recap
- Trend: detrend; season: dummies; unit root: difference
- ADF uses Dickey-Fuller critical values
- Next: measuring returns, volatility and correlation

## Whiteboard examples
**Example 1: Log-linear trend forecast.** ln Yt = 4.6 + 0.02 t, σ² = 0.01, forecast t = 50.
- Fitted log: 4.6 + 1.0 = 5.60.
- Forecast: exp(5.60 + 0.005) = 271.78 (vs 270.43 unadjusted).
- Growth per quarter: e^0.02 - 1 = 2.02%.

**Example 2: ADF decision.** γ-hat = -0.06, SE = 0.025.
- t = -2.40. Dickey-Fuller 5% critical value -2.86.
- -2.40 is not below -2.86: fail to reject the unit root; difference the data.
- A second series with γ-hat = -0.045, SE = 0.02 gives t = -2.25: also fail to reject.

**Example 3: Seasonal means.** Quarterly sales: Y = 10 + 2 D1 - 1 D2 + 0.5 D3, Q4 is the base.
- Q1 mean 12, Q2 mean 9, Q3 mean 10.5, Q4 mean 10.

## Questions to ask students
- Monthly data with an intercept: how many seasonal dummies? (Eleven.)
- What is the null hypothesis of the ADF test? (A unit root, γ = 0.)
- Why can we not use -1.96 as the ADF critical value? (Under the null the statistic follows the non-standard Dickey-Fuller distribution, which is shifted left.)
- What happens to the variance of a random walk as time passes? (It grows linearly, tσ².)
- Two trending price series show R² = 0.9. What should you check before believing the relationship? (Unit roots in each series and whether the residuals are stationary, that is cointegration.)

## Analogies
- Random walk: a drunk leaving a bar; you can predict nothing better than "where he is now", and his likely distance from the door keeps growing.
- Cointegration: the drunk and his dog on a leash; both wander, but never far apart.
- Deterministic trend vs unit root: a train on rails versus a hiker without a map.

## Recording tips
- Show a simulated random walk and a trend-stationary series that look similar, then show their first differences.
- Draw the Dickey-Fuller distribution next to the normal to show why its critical values are more negative.
- Emphasise the direction of the ADF decision rule: reject only if the statistic is more negative than the critical value.
