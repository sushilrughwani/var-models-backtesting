---
title: "Computing Returns and Volatility"
duration: 20
---

## Lecture outline
- 00:00 - Hook: two stocks both "went up 10 dollars" - which did better? Prices vs returns
- 02:00 - Simple returns: formula, `pct_change()`, adding across assets
- 05:00 - Log returns: formula, `np.log(p).diff()`, adding across time
- 08:00 - Live worked example: five prices, both return types, compounding check
- 11:00 - Volatility and the square-root-of-time rule; `ddof` gotcha
- 14:00 - Rolling 21-day volatility on a synthetic 500-day series
- 17:00 - Exam traps
- 19:00 - Recap and homework

## Slides
### Slide 1: Computing Returns and Volatility
- Every model in this module starts from a column of returns
- Today: simple vs log returns, annualisation, rolling volatility
- All data synthetic, generated with a fixed seed

### Slide 2: Why Returns, Not Prices
- Returns scale moves by the starting price
- Comparable across assets and over time
- Inputs to optimisation, CAPM, VaR, GARCH

### Slide 3: Simple Returns
- $R_t = P_t / P_{t-1} - 1$
- pandas: `prices.pct_change()`
- Portfolio return = weighted average of asset simple returns
- Over time: compound, do not add

### Slide 4: Log Returns
- $r_t = \ln(P_t / P_{t-1}) = \ln(1 + R_t)$
- pandas: `np.log(prices).diff()`
- Sum of daily log returns = period log return
- Do not aggregate across assets

### Slide 5: Simple vs Log - Side by Side
- Small moves: nearly identical (2% vs 1.98%)
- Large moves: +50% simple = +40.5% log
- Use log for time aggregation and simulation, simple for portfolios and reporting

### Slide 6: Worked Example
- Prices 100, 102, 99, 101, 104
- Simple returns compound to 4.00%
- Log returns sum to 3.92% = ln(1.04)
- Annualised vol ≈ 42.5%

### Slide 7: Annualising
- Mean × N, volatility × √N
- N = 252 (daily), 52 (weekly), 12 (monthly)
- Variances add for independent returns, hence √N

### Slide 8: The ddof Gotcha
- pandas `.std()` → sample (ddof=1)
- NumPy `np.std()` → population (ddof=0)
- Be consistent; state which one you use

### Slide 9: Rolling Volatility
- `log_r.rolling(21).std() * np.sqrt(252)`
- First 20 values are NaN
- Synthetic constant-vol series still ranges 10%-26%: sampling noise

### Slide 10: Key Takeaways
- Simple across assets, log across time
- √N for vol, N for mean
- Drop NaNs, check ddof, use 252

## Whiteboard examples
1. **Return types.** Prices 100 → 102 → 99 → 101 → 104.
   - Simple: 0.0200, −0.029412, 0.020202, 0.029703.
   - Log: 0.019803, −0.029853, 0.020001, 0.029270.
   - Compound simple: 1.02 × 0.970588 × 1.020202 × 1.029703 − 1 = 0.0400.
   - Sum of logs = 0.039221 = ln(1.04). Sum of simple = 0.040493 (wrong answer for the period return).
   - Sample std of simple returns = 0.026743; annual = 0.026743 × √252 = 0.4245.
2. **Annualising monthly data.** Monthly mean 0.8%, monthly vol 4%.
   - Annual mean = 0.8% × 12 = 9.6%.
   - Annual vol = 4% × √12 = 4% × 3.4641 = 13.86%.

## Questions to ask students
- A stock goes from 50 to 55. What are the simple and log returns? (10.00% and ln(1.1) = 9.53%)
- Which return type should you add across 252 days to get the annual return? (Log returns)
- Daily vol is 1%. What is annual vol? (1% × √252 ≈ 15.87%)
- Why is the first value of `pct_change()` NaN? (No previous price to compare with)
- Your colleague gets a slightly different volatility from NumPy than you get from pandas. Why? (ddof: NumPy defaults to population, pandas to sample)

## Analogies
- Simple returns are like percentage discounts in a shop: two successive 10% discounts are not 20% off; you multiply. Log returns are the "adjusted" units where you can just add.
- The square-root rule is like a drunk walk: after 4 steps you are on average only 2 steps from where you started, not 4, because steps partly cancel.
- Rolling volatility is a car's speedometer; full-sample volatility is the average speed for the whole trip.

## Recording tips
- Run the five-price example live in a notebook and pause on the "sum of simple returns" line; that is where the penny drops.
- Show the rolling-volatility plot (`roll_vol.plot()`) on screen even though the notes show only numbers; the wobble is memorable.
- Say "ddof" out loud and show both `np.std(x)` and `pd.Series(x).std()` giving different results.
