---
title: "CAPM and Regression With statsmodels"
duration: 22
---

## Lecture outline
- 00:00 - Hook: a fund manager claims 5% alpha - how would you check it with ten lines of Python?
- 02:00 - The CAPM regression: excess returns, alpha as intercept, beta as slope
- 05:00 - Beta = Cov / Var: five-month hand calculation on the whiteboard
- 09:00 - statsmodels workflow: `add_constant`, `OLS`, `fit`
- 12:00 - Live code on 120 months of synthetic data; read params, bse, tvalues, R²
- 16:00 - Hypothesis tests: beta = 1, alpha = 0; why alpha is hard to detect
- 19:00 - Exam traps
- 21:00 - Recap

## Slides
### Slide 1: CAPM and Regression With statsmodels
- Estimate beta and alpha from return data
- Interpret coefficients, standard errors, t-stats, R²
- Synthetic data with a known true beta

### Slide 2: The Regression
- $R_i - R_f = \alpha + \beta (R_m - R_f) + \varepsilon$
- Slope = beta (market sensitivity)
- Intercept = Jensen's alpha (abnormal return)

### Slide 3: Beta by Formula
- β = Cov(stock, market) / Var(market)
- α = mean(stock) − β × mean(market)
- Use the same ddof in both

### Slide 4: statsmodels in Four Lines
- `X = sm.add_constant(df["mkt_ex"])`
- `model = sm.OLS(df["stk_ex"], X).fit()`
- `model.params`, `model.bse`, `model.tvalues`, `model.rsquared`

### Slide 5: Our Synthetic Stock
- True beta 1.3, true alpha 0.1% per month, 120 months
- Estimated beta 1.1608 (SE 0.0675)
- Estimated alpha 0.0004 (SE 0.0028)

### Slide 6: Reading t-Statistics
- t = estimate / SE tests "coefficient = 0"
- Beta t = 17.20 → highly significant
- Alpha t = 0.13 → not distinguishable from zero

### Slide 7: Testing Beta = 1
- t = (1.1608 − 1) / 0.0675 = 2.38
- 95% CI for beta: 1.0272 to 1.2944
- Stock is significantly more aggressive than the market

### Slide 8: R-Squared
- 0.7150 → 72% of variance is systematic
- 1 − R² = idiosyncratic risk
- R² = correlation² in a one-factor model

### Slide 9: Why Alpha Is Hard to Find
- True alpha 1.2% a year, yet t = 0.13
- Alpha CI: −0.52% to +0.60% per month
- Needs long histories and low residual noise

### Slide 10: Exam Traps
- Missing `add_constant`
- Raw returns vs excess returns
- Default t-stat tests β = 0, not β = 1

### Slide 11: Key Takeaways
- Regression gives beta, alpha and their uncertainty
- Cov / Var as a sanity check
- Be sceptical of small t-statistics

## Whiteboard examples
1. **Beta by hand.** Market excess: 2%, −1%, 3%, 0%, 1%. Stock excess: 3%, −2%, 4%, 1%, 2%.
   - Means 1.0% and 1.6%.
   - Cross-products of deviations: 0.00014, 0.00072, 0.00048, 0.00006, 0 → sum 0.0014.
   - Squared market deviations: 0.0001, 0.0004, 0.0004, 0.0001, 0 → sum 0.0010.
   - Beta = 1.40; alpha = 0.016 − 1.4 × 0.010 = 0.002 (0.20% per month).
2. **R² from inputs.** β = 0.9, σs = 24%, σm = 16%.
   - Correlation = 0.9 × 0.16 / 0.24 = 0.60; R² = 0.36; idiosyncratic share = 0.64.

## Questions to ask students
- What does a beta of 1.16 mean in words? (If the market's excess return is 1% higher, the stock's excess return is expected to be about 1.16% higher)
- Why do we subtract the risk-free rate before regressing? (So the intercept measures return beyond what CAPM predicts, i.e. Jensen's alpha)
- The alpha t-statistic is 0.13. Does the manager have skill? (No evidence either way; alpha is not statistically different from zero)
- How would you test whether beta equals 1? (t = (β̂ − 1) / SE(β̂); here 2.38)
- What does R² of 0.715 say about diversification? (About 28% of the stock's variance is idiosyncratic and could be diversified away)

## Analogies
- Beta is the gear ratio between the market and the stock: a 1.16 gear means the stock wheel turns 1.16 times for every market turn.
- Searching for alpha in noisy returns is like trying to hear a whisper at a rock concert: the signal may be there, but you need a very long recording to pick it out.
- R² is the share of a song you can hear through the wall from next door - the market's tune - versus the stock's own private melody.

## Recording tips
- Show `print(model.summary())` on screen and circle the four numbers that matter: coefficient, std err, t, R-squared.
- Emphasise that the estimated beta (1.16) is not the true 1.3; rerun with a different seed to show estimates move around.
- Draw the scatter plot with the fitted line (`plt.scatter` plus `model.params`) to make slope and intercept visual.
