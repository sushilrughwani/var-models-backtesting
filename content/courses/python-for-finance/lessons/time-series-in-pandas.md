---
title: "Working With Time Series in pandas"
---

## Learning goals
- Build and parse date indexes with `pd.date_range` and `pd.to_datetime`, and select data by date.
- Compute returns with `pct_change()` and lagged values with `shift()`, and explain how lagging prevents look-ahead bias.
- Convert daily data to weekly, monthly or quarterly frequency with `resample()`.
- Compute rolling statistics such as moving averages and rolling volatility.

## Explanation

### The DatetimeIndex
When a Series or DataFrame is indexed by dates, pandas understands calendar logic: weekdays, month ends, quarters, and how far apart two observations are. Dates usually arrive as text in a CSV, so convert them with `pd.to_datetime()` or pass `parse_dates=["date"]` to `read_csv`. To generate dates, use `pd.date_range(start, periods=..., freq=...)`. Common frequency codes are `"D"` (calendar day), `"B"` (business day), `"W-FRI"` (weeks ending Friday), `"ME"` (month end) and `"QE"` (quarter end).

```python
import pandas as pd

dates = pd.date_range("2026-01-26", periods=8, freq="B")   # business days
prices = pd.Series([100.0, 101.5, 100.8, 102.3, 103.0, 102.1, 104.4, 105.0],
                   index=dates, name="close")
print(prices)
```

```text
2026-01-26    100.0
2026-01-27    101.5
2026-01-28    100.8
2026-01-29    102.3
2026-01-30    103.0
2026-02-02    102.1
2026-02-03    104.4
2026-02-04    105.0
Freq: B, Name: close, dtype: float64
```

Notice that the weekend of 31 January and 1 February is skipped automatically.

### Selecting by date, shifting and returns
A date index allows **partial-string selection**: `prices.loc["2026-02"]` returns every February row, and `prices.loc["2026-01-28":"2026-02-02"]` slices a date range (inclusive, like all label slices).

`shift(1)` moves every value down one row, so each date sees the **previous** observation. `pct_change()` is simply `prices / prices.shift(1) - 1`:

$$
r_t = \frac{P_t}{P_{t-1}} - 1
$$

where $P_t$ is the price on date $t$ and $P_{t-1}$ the price on the previous row. The first return is `NaN` because there is no earlier price.

```python
import pandas as pd

dates = pd.date_range("2026-01-26", periods=8, freq="B")
prices = pd.Series([100.0, 101.5, 100.8, 102.3, 103.0, 102.1, 104.4, 105.0],
                   index=dates, name="close")

print(prices.loc["2026-02"])                      # partial-string selection
print(prices.shift(1).head(3))
ret = prices.pct_change()
print(ret.round(4).head(3))
print(round(ret.iloc[1], 6), round(prices.iloc[1] / prices.iloc[0] - 1, 6))
```

```text
2026-02-02    102.1
2026-02-03    104.4
2026-02-04    105.0
Freq: B, Name: close, dtype: float64
2026-01-26      NaN
2026-01-27    100.0
2026-01-28    101.5
Freq: B, Name: close, dtype: float64
2026-01-26       NaN
2026-01-27    0.0150
2026-01-28   -0.0069
Freq: B, Name: close, dtype: float64
0.015 0.015
```

Shifting is also the key defence against **look-ahead bias**. If a trading signal is computed from today's close, you can only act on it tomorrow, so the position used to earn tomorrow's return must be `signal.shift(1)`. Forgetting this lets a backtest "see" prices it could not have known, which inflates performance. A negative shift (`shift(-1)`) pulls *future* values back, which is legitimate only when building a forecast target.

### Resampling: changing frequency
`resample(rule)` groups observations into time buckets and then needs an aggregation telling pandas what one value per bucket means. For prices, the natural choice is `.last()` (the closing price of the period); for returns or volumes you would sum or compound them; for OHLC bars you take first, max, min and last.

```python
import pandas as pd

dates = pd.date_range("2026-01-26", periods=8, freq="B")
prices = pd.Series([100.0, 101.5, 100.8, 102.3, 103.0, 102.1, 104.4, 105.0],
                   index=dates, name="close")

weekly = prices.resample("W-FRI").last()
print(weekly)
print(weekly.pct_change().round(4))
print(prices.resample("W-FRI").agg(["first", "max", "min", "last"]))
```

```text
2026-01-30    103.0
2026-02-06    105.0
Freq: W-FRI, Name: close, dtype: float64
2026-01-30       NaN
2026-02-06    0.0194
Freq: W-FRI, Name: close, dtype: float64
            first    max    min   last
2026-01-30  100.0  103.0  100.0  103.0
2026-02-06  102.1  105.0  102.1  105.0
```

Two details to notice. The second week is labelled with its period end, Friday 6 February, even though the data stop on Wednesday 4 February, so its "close" is really a partial-week value. And the weekly return 105.0 / 103.0 − 1 = 1.94% is a return on week-end prices, not the sum of the daily returns.

Monthly data work the same way with `"ME"`; summing six monthly values into quarters is `resample("QE").sum()`.

### Rolling windows
`rolling(window=n)` creates a window that moves one row at a time, and an aggregation such as `.mean()` or `.std()` is applied to each window. The first $n-1$ results are `NaN` because the window is not yet full. A rolling mean of prices is the classic moving average; a rolling standard deviation of returns is a simple, time-varying volatility estimate.

## Worked example
Compute a 3-day moving average of the closing price and a 3-day rolling volatility (sample standard deviation of daily returns) for the eight prices above, and interpret the first valid values.

The moving average on day $t$ is

$$
MA_t = \frac{P_t + P_{t-1} + P_{t-2}}{3}
$$

and the rolling volatility is the sample standard deviation of $r_t, r_{t-1}, r_{t-2}$.

```python
import pandas as pd

dates = pd.date_range("2026-01-26", periods=8, freq="B")
prices = pd.Series([100.0, 101.5, 100.8, 102.3, 103.0, 102.1, 104.4, 105.0],
                   index=dates, name="close")

ma3 = prices.rolling(window=3).mean()
vol3 = prices.pct_change().rolling(3).std()
out = pd.DataFrame({"close": prices, "ma3": ma3.round(2), "vol3": vol3.round(4)})
print(out)
```

```text
            close     ma3    vol3
2026-01-26  100.0     NaN     NaN
2026-01-27  101.5     NaN     NaN
2026-01-28  100.8  100.77     NaN
2026-01-29  102.3  101.53  0.0126
2026-01-30  103.0  102.03  0.0110
2026-02-02  102.1  102.47  0.0120
2026-02-03  104.4  103.17  0.0156
2026-02-04  105.0  103.83  0.0156
```

Step by step:
1. First full price window (26 to 28 January): (100.0 + 101.5 + 100.8) / 3 = 302.3 / 3 = **100.77**.
2. Next window drops 100.0 and adds 102.3: 304.6 / 3 = 101.53.
3. Returns start one day later, so the first full window of three returns ends on 29 January: returns 1.50%, −0.69% and 1.49%.
4. Their mean is 0.766%; the sample standard deviation (dividing by 2, since pandas uses `ddof=1`) is **1.26%** per day.
5. Volatility rises to 1.56% at the end of the sample as the large 2.25% jump on 3 February enters the window.

## Common exam traps
- **Forgetting the aggregation after `resample`.** `prices.resample("ME")` alone is just a grouping object; add `.last()`, `.mean()` or similar.
- **Using `.mean()` to resample prices.** The monthly average price is not the month-end price; returns computed from averages are smoothed and understate volatility.
- **Look-ahead from missing `shift(1)`.** Signals must be lagged before they are multiplied by returns.
- **Misreading rolling `NaN`s.** A 20-day window produces 19 leading `NaN`s on prices and 20 on returns.
- **Dates stored as text.** Partial-string selection and resampling need a real `DatetimeIndex`; convert with `pd.to_datetime`.

## Key takeaways
- A `DatetimeIndex` unlocks calendar-aware selection, resampling and rolling.
- `shift(1)` lags data; `pct_change()` equals `x / x.shift(1) - 1`.
- Lag signals by one period to avoid look-ahead bias.
- `resample(rule)` plus an aggregation changes frequency; use `.last()` for prices.
- `rolling(n)` gives moving averages and rolling volatility, with $n-1$ leading `NaN`s.
- Period labels such as `W-FRI` mark the end of each bucket, even a partial one.
