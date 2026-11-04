---
title: "Returns, Volatility and Correlation in Excel"
---

## Learning goals
- Calculate simple and log return series from a column of prices.
- Calculate volatility with `STDEV.S` and annualise it with the square-root-of-time rule.
- Distinguish arithmetic average returns from compound growth over the whole period.
- Build a correlation matrix with `CORREL` and interpret the values.
- Explain when to use sample versus population functions.

## Explanation

### From prices to returns
Prices are not comparable across assets: is a rise from 50 to 52 bigger or smaller than a rise from 80 to 81.60? Returns answer the question by putting everything on the same scale: 4% versus 2%. With prices in column B starting in row 2, the simple return in `C3` is:

`=B3/B2-1`

Fill it down. The first price has no return, so the return column is always one row shorter than the price column. The continuously compounded (log) return is `=LN(B3/B2)`. Log returns have a useful property: they add across time, so the sum of daily log returns equals the log of the total price change. Simple returns compound instead, so summing them overstates or understates the true result.

$$
R_t = \frac{P_t}{P_{t-1}} - 1 \qquad r_t = \ln\!\left(\frac{P_t}{P_{t-1}}\right)
$$

$P_t$ is the price at the end of period $t$, $R_t$ the simple return and $r_t$ the log return. For dividend-paying assets, use adjusted prices or add the dividend to $P_t$.

### Volatility and annualisation
Volatility is the standard deviation of returns. For a historical sample, use `=STDEV.S(C3:C8)`; `STDEV.P` divides by $n$ instead of $n-1$ and treats the data as the entire population, which understates risk in small samples.

Volatility from monthly data is a monthly figure. If returns are roughly independent from period to period, variance grows in proportion to time, so standard deviation grows with its square root:

$$
\sigma_{annual} = \sigma_{period} \times \sqrt{m}
$$

$m$ is the number of periods per year: 12 for monthly, 52 for weekly, and conventionally 252 for daily trading data. In Excel: `=STDEV.S(C3:C8)*SQRT(12)`. Average returns scale linearly, so the annualised mean is approximately `=AVERAGE(C3:C8)*12`.

### Correlation and the correlation matrix
Correlation measures how closely two return series move together, from −1 to +1. `=CORREL(C3:C8, D3:D8)` returns it directly; the arrays must be the same length and aligned by date. Covariance is available as `COVARIANCE.S`, and correlation equals covariance divided by the product of the two standard deviations.

For several assets, build a square matrix with asset names across row 1 and down column A of a new block. One fill-able formula uses `INDEX` to pull whole columns from the returns block in `$C$3:$E$8`:

`=CORREL(INDEX($C$3:$E$8,0,ROWS($A$1:$A1)), INDEX($C$3:$E$8,0,COLUMNS($A$1:A$1)))`

As you fill right and down, `ROWS` and `COLUMNS` count up and select the right pair. The diagonal is 1 and the matrix is symmetric. The Analysis ToolPak's Correlation tool produces the same numbers as static values, but formulas update when data change.

## Worked example
Monthly closing prices for two stocks over six months:

| Month | Stock A | Stock B |
|---|---|---|
| 0 | 50.00 | 80.00 |
| 1 | 52.00 | 81.60 |
| 2 | 51.00 | 80.00 |
| 3 | 53.50 | 83.20 |
| 4 | 55.00 | 84.00 |
| 5 | 54.00 | 82.50 |
| 6 | 56.50 | 85.80 |

**Step 1 - returns.** Stock A: 4.00%, −1.92%, 4.90%, 2.80%, −1.82%, 4.63%. Stock B: 2.00%, −1.96%, 4.00%, 0.96%, −1.79%, 4.00%.

**Step 2 - average.** `=AVERAGE` gives 2.10% a month for A and 1.20% for B.

**Step 3 - volatility.** `=STDEV.S` gives 3.16% for A and 2.66% for B per month. Annualised: 3.16% × √12 = **10.94%** for A and **9.20%** for B.

**Step 4 - correlation.** `=CORREL` of the two return columns = **0.97**. The stocks move almost in lockstep, so holding both offers little diversification.

**Step 5 - compounding check.** Stock A's total return is 56.50/50 − 1 = 13.00%. The sum of its log returns is 12.22%, and `=EXP(0.1222)-1` recovers 13.00%. The geometric monthly return is 1.13^(1/6) − 1 = 2.06%, slightly below the 2.10% arithmetic average, as it always is when returns vary.

## Common exam traps
- Annualising volatility by multiplying by 12 (or 252) instead of the square root; for Stock A that gives 37.91% instead of 10.94%.
- Using `STDEV.P` on a sample, which understates volatility (2.88% instead of 3.16% a month here).
- Misaligned ranges in `CORREL`, for example one series starting a row later, which silently gives a wrong answer.
- Summing simple returns to get the total return; compound them or sum log returns instead.
- Computing returns from unadjusted prices across a dividend or stock split.

## Key takeaways
- Simple return: `=B3/B2-1`; log return: `=LN(B3/B2)`; log returns add over time.
- Volatility is `STDEV.S` of returns; annualise by multiplying by the square root of periods per year.
- Mean returns scale with time, volatility with the square root of time.
- `CORREL` measures co-movement; an `INDEX`-based formula builds a live correlation matrix.
- The arithmetic average return exceeds the geometric (compound) return whenever returns vary.
