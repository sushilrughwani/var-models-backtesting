---
title: "Statistical Functions for Finance"
---

## Learning goals
- Calculate the mean, median and sample standard deviation of a return series in Excel.
- Choose correctly between STDEV.S and STDEV.P, and between PERCENTILE.INC and PERCENTILE.EXC.
- Measure co-movement between two series with CORREL.
- Summarise subsets of data with COUNTIFS, SUMIFS and AVERAGEIFS.

## Explanation

### Centre: AVERAGE and MEDIAN
`AVERAGE(range)` is the arithmetic mean; `MEDIAN(range)` is the middle value once sorted. Returns are often skewed by a few extreme months, so comparing the two is a quick check: a median well above the mean hints at a handful of large losses dragging the mean down. Both functions skip blank cells and text but **include zeros**, so a missing month entered as 0 is treated as a flat month.

### Dispersion: STDEV.S vs STDEV.P
Standard deviation measures how spread out returns are around their mean, the most common measure of volatility.

$$
s = \sqrt{\frac{\sum_{i=1}^{n} (x_i - \bar{x})^2}{n-1}}
$$

where $x_i$ is each observation, $\bar{x}$ the mean and $n$ the number of observations. `STDEV.S` uses $n-1$ (a **sample**, the normal case for historical returns that stand in for an unknown future), while `STDEV.P` divides by $n$ (the data is the entire **population**). `VAR.S` and `VAR.P` return the squared versions. With small samples the difference matters; with thousands of observations it is negligible.

### Co-movement: CORREL
`CORREL(range1, range2)` returns the correlation coefficient between two equally sized series, from −1 (perfectly opposite) to +1 (perfectly together). The two ranges must be aligned row by row: January with January.

### Tails: PERCENTILE and QUARTILE
`PERCENTILE.INC(range, k)` returns the value below which a fraction $k$ of the data falls, interpolating between sorted observations. It locates the value at position

$$
\text{rank} = k(n-1) + 1
$$

in the sorted list. `PERCENTILE.EXC` uses position $k(n+1)$ and cannot return the minimum or maximum, so the two versions give different answers on small data sets. `QUARTILE.INC(range, 1)` equals `PERCENTILE.INC(range, 0.25)`. Low percentiles of returns are the starting point for historical risk measures you will meet later.

### Conditional aggregates
- `COUNTIFS(range1, criteria1, ...)` counts rows meeting every condition.
- `SUMIFS(sum_range, range1, criteria1, ...)` sums those rows.
- `AVERAGEIFS(avg_range, range1, criteria1, ...)` averages them.

Criteria are written as text, such as `">0"` or `"<"&H1` to use a threshold stored in a cell. Note that the range being summed or averaged comes **first** in SUMIFS and AVERAGEIFS.

## Worked example
Six monthly returns (%) for a fund (B2:B7) and the market (C2:C7):

| Month | Fund | Market |
|---|---|---|
| Jan | 2.1 | 1.2 |
| Feb | −1.4 | −0.6 |
| Mar | 3.0 | 1.8 |
| Apr | 0.8 | −0.4 |
| May | −2.5 | −1.9 |
| Jun | 1.6 | 0.3 |

**Mean.** `=AVERAGE(B2:B7)`: sum = 2.1 − 1.4 + 3.0 + 0.8 − 2.5 + 1.6 = 3.6, so mean = 3.6 / 6 = **0.60%**.

**Median.** Sorted: −2.5, −1.4, 0.8, 1.6, 2.1, 3.0. `=MEDIAN(B2:B7)` = (0.8 + 1.6) / 2 = **1.20%**, above the mean because of the two losing months.

**Sample standard deviation.** Deviations from 0.60: 1.5, −2.0, 2.4, 0.2, −3.1, 1.0. Squares: 2.25, 4.00, 5.76, 0.04, 9.61, 1.00, summing to 22.66.
- `=STDEV.S(B2:B7)` = √(22.66 / 5) = √4.532 = **2.13%**.
- `=STDEV.P(B2:B7)` = √(22.66 / 6) = 1.94%, smaller because it divides by 6.

**Correlation.** `=CORREL(B2:B7, C2:C7)` = **0.95**: the fund moves closely with the market.

**10th percentile.** `=PERCENTILE.INC(B2:B7, 0.1)`: rank = 0.1 × (6 − 1) + 1 = 1.5, halfway between the 1st (−2.5) and 2nd (−1.4) sorted values: −2.5 + 0.5 × 1.1 = **−1.95%**.

**Conditional statistics.**
- Positive months: `=COUNTIF(B2:B7, ">0")` = **4**.
- Fund return when the market fell: `=AVERAGEIFS(B2:B7, C2:C7, "<0")` picks Feb, Apr and May: (−1.4 + 0.8 − 2.5) / 3 = −3.1 / 3 = **−1.03%**.

## Common exam traps
- Using STDEV.P on a sample of historical returns, which understates volatility.
- Putting the criteria range first in AVERAGEIFS or SUMIFS; the range to average or sum comes first (COUNTIFS has no such range).
- Treating PERCENTILE.INC and PERCENTILE.EXC as interchangeable on small samples.
- Feeding CORREL two ranges that are misaligned by a row, which produces a meaningless coefficient without any error.
- Forgetting that zeros are included in AVERAGE while blanks are not.

## Key takeaways
- AVERAGE and MEDIAN together reveal skew in a return series.
- STDEV.S (divide by n − 1) is the default for historical return samples.
- CORREL needs two aligned, equally sized ranges and returns a value from −1 to +1.
- PERCENTILE.INC interpolates at position k(n − 1) + 1 in the sorted data.
- COUNTIFS, SUMIFS and AVERAGEIFS answer "what happened when..." questions in one formula.
