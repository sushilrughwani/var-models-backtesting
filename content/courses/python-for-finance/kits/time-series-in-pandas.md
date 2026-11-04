---
title: "Working With Time Series in pandas"
duration: 22
---

## Lecture outline
- 00:00 - Hook: a backtest that looks brilliant until one missing `shift(1)` is added
- 02:00 - DatetimeIndex: `pd.to_datetime`, `parse_dates`, `pd.date_range` and frequency codes (B, W-FRI, ME, QE)
- 05:00 - Date selection: partial strings and inclusive date slices
- 07:00 - `shift` and `pct_change`; look-ahead bias and why signals are lagged
- 10:30 - Resampling: daily to weekly/monthly with `.last()`, OHLC via `.agg`, period-end labels
- 14:00 - Rolling windows: moving averages, rolling volatility, leading NaNs
- 16:30 - Live worked example: 3-day MA and 3-day rolling volatility table
- 20:00 - Traps recap

## Slides
### Slide 1: Working With Time Series in pandas
- Dates as the index unlock calendar logic
- Resample, roll and shift in one line each
- Foundation for returns, volatility and backtests

### Slide 2: Building a DatetimeIndex
- `pd.to_datetime(df["date"])` or `read_csv(..., parse_dates=["date"])`
- `pd.date_range("2026-01-26", periods=8, freq="B")`
- Codes: D, B, W-FRI, ME, QE

### Slide 3: Selecting by Date
- `prices.loc["2026-02"]` → all of February
- `prices.loc["2026-01-28":"2026-02-02"]` inclusive
- Requires a real DatetimeIndex, not text

### Slide 4: shift and pct_change
- `shift(1)` = yesterday's value on today's row
- `pct_change()` = `x / x.shift(1) - 1`
- First value is NaN

### Slide 5: Look-Ahead Bias
- A signal from today's close is tradable tomorrow
- Use `signal.shift(1) * ret`
- `shift(-1)` = future data: targets only

### Slide 6: Resampling
- `resample(rule)` + aggregation
- Prices → `.last()`; OHLC → first/max/min/last
- Labels mark period end (even partial periods)

### Slide 7: Resample Example
- Weekly closes 103.0 and 105.0
- Weekly return 1.94%
- Second week labelled 6 Feb though data end 4 Feb

### Slide 8: Rolling Windows
- `rolling(n).mean()` moving average
- `pct_change().rolling(n).std()` rolling vol
- n − 1 leading NaNs (n on returns)

### Slide 9: Worked Example Results
- First 3-day MA: 100.77
- First 3-day vol: 1.26% per day
- Vol rises to 1.56% after a 2.25% jump

### Slide 10: Traps
- No aggregation after resample
- Averaging prices instead of taking month-end
- Missing shift(1); dates stored as text

## Whiteboard examples
1. **Rolling mean by hand.** Prices 100.0, 101.5, 100.8, 102.3, 103.0. MA on day 3 = 302.3/3 = **100.77**; day 4 = (101.5 + 100.8 + 102.3)/3 = 304.6/3 = **101.53**; day 5 = (100.8 + 102.3 + 103.0)/3 = 306.1/3 = **102.03**.
2. **Rolling volatility.** Returns: 101.5/100 − 1 = 1.50%; 100.8/101.5 − 1 = −0.69%; 102.3/100.8 − 1 = 1.49%. Mean = 0.766%. Deviations 0.734%, −1.456%, 0.722%; squares sum ≈ 0.0003179; divide by 2 → 0.00015896; square root = **1.26%**.
3. **Weekly vs mean resampling.** Week closes 48, 49, 50, 49.5, 50 then 51, 52, 51.5, 53, 52.5. `.last()` gives 50.0 → 52.5: **5.00%**. `.mean()` gives 49.3 → 52.0: 5.48%, a different (and wrong) "return".

## Questions to ask students
- What is `pct_change()` in terms of `shift`? (`x / x.shift(1) - 1`.)
- Why must a moving-average signal be shifted before multiplying by returns? (It uses today's close, which is only known after today's return has happened.)
- What does `prices.resample("ME")` return without an aggregation? (A resampler object, not data.)
- How many NaNs does a 3-day rolling std of returns have at the start? (3: one from pct_change plus two while the window fills.)
- Why might the last weekly bar be misleading? (It can be a partial week labelled with a future Friday.)

## Analogies
- **shift(1) is reading yesterday's newspaper.** It is all you actually knew when you placed today's trade.
- **Resampling is zooming out on a chart.** You decide what one bar represents: the close, the average or the full OHLC.
- **A rolling window is a train window.** The view slides forward one station at a time, always showing the last n stops.

## Recording tips
- Run the backtest with and without `shift(1)` on screen; the dramatic difference makes look-ahead bias unforgettable.
- Print the resampled index next to the daily data so students see period-end labels.
- Highlight the leading NaNs in the rolling output and count them aloud.
