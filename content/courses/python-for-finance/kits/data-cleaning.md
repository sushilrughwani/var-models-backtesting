---
title: "Cleaning Financial Data"
duration: 20
---

## Lecture outline
- 00:00 - Hook: a stock "falls 50%" overnight in the data, but nobody lost money. What happened?
- 02:00 - Why cleaning is part of the model: one bad price means two fake extreme returns
- 03:30 - Missing values: `isna`, `ffill` (with `limit`), `dropna`, and what not to do
- 07:00 - Duplicate timestamps: `index.duplicated`, keep the last correction
- 08:30 - Outliers: ordinary z-scores vs robust z-scores (median and MAD), masking
- 12:00 - Live worked example: adjusting a 2-for-1 split and recomputing returns
- 15:30 - Aligning series across calendars with `concat`, then drop or fill
- 18:30 - Traps recap and a cleaning checklist

## Slides
### Slide 1: Cleaning Financial Data
- Garbage in, garbage risk numbers out
- Gaps, duplicates, corporate actions, bad prints, calendars

### Slide 2: One Bad Price, Two Bad Returns
- A spike creates a huge return in and out
- Dominates volatility and VaR
- Clean before computing returns

### Slide 3: Missing Values
- Count: `px.isna().sum()`
- Prices: `ffill(limit=n)` or `dropna()`
- Never fill returns with the mean for risk work

### Slide 4: Duplicates
- `px.index.duplicated()`
- `px[~px.index.duplicated(keep="last")]`
- Last record is usually the vendor's correction

### Slide 5: Ordinary z-Scores
- $z = (x - \bar x)/s$
- Outliers inflate $\bar x$ and $s$
- Example: a 25% bad print scores only 2.47

### Slide 6: Robust z-Scores
- Median and MAD replace mean and std
- Scale MAD by 1.4826
- Same bad print scores 47.8

### Slide 7: Investigate, Don't Auto-Delete
- Real crashes must stay in risk data
- Remove only confirmed errors
- Log every change

### Slide 8: Stock Splits
- k-for-1: divide pre-split prices by k
- Raw split day: −49.67%
- Adjusted: +0.66%

### Slide 9: Aligning Calendars
- Series arithmetic aligns on the index
- Holidays produce NaN
- `pd.concat(..., axis=1, sort=True)` then decide

### Slide 10: Cleaning Checklist
- Types and dates parsed
- Duplicates removed; gaps treated consistently
- Corporate actions adjusted; outliers reviewed; calendars aligned

## Whiteboard examples
1. **Split adjustment.** Closes 120.00, 121.50, 122.00, then 2-for-1, then 61.40, 62.00, 61.70. Raw split-day return: 61.40/122.00 − 1 = **−49.67%**. Adjusted history: 60.00, 60.75, 61.00. Adjusted return: 61.40/61.00 − 1 = **+0.66%**. Other returns unchanged (e.g. 60.75/60.00 − 1 = 121.50/120.00 − 1 = 1.25%).
2. **Robust z-score.** Returns 0.4%, −0.6%, 0.3%, 25%, −0.2%, 0.5%, −0.4%, 0.1%. Median = (0.1% + 0.3%)/2 = **0.2%**. Absolute deviations: 0.2, 0.8, 0.1, 24.8, 0.4, 0.3, 0.6, 0.1 (in %); their median = (0.3 + 0.4)/2 = **0.35%**. Scaled MAD = 1.4826 × 0.35% = 0.519%. Robust z of the 25% print = (25 − 0.2)/0.519 = **47.8**.
3. **Forward fill with a limit.** Prices 50.0, 50.6, NaN, 51.2, NaN, NaN, 52.0. `ffill()` → 50.0, 50.6, 50.6, 51.2, 51.2, 51.2, 52.0. `ffill(limit=1)` leaves the second NaN of the two-day gap: 50.0, 50.6, 50.6, 51.2, 51.2, **NaN**, 52.0.

## Questions to ask students
- Why does one bad price corrupt two returns? (The return into the bad price and the return out of it are both distorted.)
- After a 3-for-1 split, what do you do to prices before the split date? (Divide them by 3.)
- Why can a huge outlier have an ordinary z-score below 3? (It inflates the standard deviation and the mean, masking itself.)
- Should you delete every return with a robust z-score above 5? (No; investigate. Genuine extreme days belong in risk data.)
- What happens if you add a US and a UK index series directly? (Dates where either market was closed produce NaN.)

## Analogies
- **Cleaning data is like checking a scale before weighing gold.** Weighing perfectly on a miscalibrated scale still gives the wrong answer.
- **An outlier in a standard deviation is a loud person in a quiet room.** They raise the "average volume" so much that they no longer seem loud by comparison; the median listener isn't fooled.
- **A split is cutting a pizza into more slices.** You have more pieces, each smaller, but the same amount of pizza.

## Recording tips
- Open the hook with the raw −49.67% chart before explaining the split; let students guess the cause.
- Show the ordinary vs robust z-score output side by side on screen; the 2.47 vs 47.8 contrast does the teaching.
- Emphasise "investigate, don't delete" twice; it is the most common real-world mistake.
