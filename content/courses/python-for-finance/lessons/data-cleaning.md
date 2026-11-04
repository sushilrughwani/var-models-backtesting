---
title: "Cleaning Financial Data"
---

## Learning goals
- Detect and handle missing prices with `isna`, `ffill` and `dropna`, and judge when each is appropriate.
- Remove duplicate timestamps from a price series.
- Adjust a price history for a stock split so that returns are not distorted.
- Flag outliers with standard and robust z-scores, and explain why the robust version is preferred.
- Align series from different markets or calendars before combining them.

## Explanation

### Why cleaning comes first
Every model in this course, from volatility to VaR to backtests, is only as good as its input data. Real feeds contain gaps (holidays, illiquid days, vendor outages), duplicated rows, unadjusted corporate actions, fat-finger prints and mismatched calendars. A single bad price can create two enormous fake returns (one in, one out) and dominate a risk estimate. Cleaning is not cosmetic: it is part of the model.

### Missing values
pandas represents missing numbers as `NaN`. Count them with `isna().sum()`, then choose a treatment:
- **Forward fill (`ffill`)** carries the last known price forward. This is the standard choice for prices, because if an asset did not trade, its last price is the best available mark. Use `limit=` to stop it filling long gaps that probably signal a real problem.
- **Drop (`dropna`)** removes rows. Reasonable when the gap is a non-trading day in a single series.
- **Never fill returns with the mean** or interpolate prices across a long gap for risk work: both invent smooth data and understate volatility.

```python
import numpy as np
import pandas as pd

idx = pd.to_datetime(["2026-03-02", "2026-03-03", "2026-03-04", "2026-03-05",
                      "2026-03-06", "2026-03-09", "2026-03-10"])
px = pd.Series([50.0, 50.6, np.nan, 51.2, np.nan, np.nan, 52.0], index=idx)
print(px.isna().sum())
print(px.ffill().tolist())
print(px.ffill(limit=1).tolist())
print(px.dropna().pct_change().round(4).tolist())
```

```text
3
[50.0, 50.6, 50.6, 51.2, 51.2, 51.2, 52.0]
[50.0, 50.6, 50.6, 51.2, 51.2, nan, 52.0]
[nan, 0.012, 0.0119, 0.0156]
```

Forward filling creates zero returns on filled days; dropping creates multi-day returns. Both are defensible, but be consistent and know which you chose. Note that `pct_change()` in current pandas does not fill gaps for you, so clean first, then compute returns.

### Duplicates
Vendor files sometimes repeat a timestamp (a correction appended to the original). Find them with `index.duplicated()` and keep one, usually the last, which is the correction.

```python
import pandas as pd

idx = pd.to_datetime(["2026-05-11", "2026-05-12", "2026-05-12", "2026-05-13", "2026-05-14"])
px = pd.Series([80.0, 81.2, 81.2, 80.5, 82.0], index=idx)
print(px.index.duplicated().tolist())
clean = px[~px.index.duplicated(keep="last")]
print(len(px), len(clean))
```

```text
[False, False, True, False, False]
5 4
```

### Outliers: standard vs robust z-scores
A z-score measures how many standard deviations a value sits from the mean:

$$
z_i = \frac{x_i - \bar{x}}{s}
$$

where $\bar x$ is the mean and $s$ the standard deviation. The problem is that a huge outlier inflates both $\bar x$ and $s$, so it can hide itself. A **robust z-score** replaces them with the median and the median absolute deviation (MAD), which a few extreme values barely move:

$$
z_i^{\text{robust}} = \frac{x_i - \text{median}(x)}{1.4826 \times \text{MAD}}, \qquad \text{MAD} = \text{median}\left(|x_i - \text{median}(x)|\right)
$$

The constant 1.4826 scales the MAD to match the standard deviation for normally distributed data.

```python
import pandas as pd

r = pd.Series([0.004, -0.006, 0.003, 0.250, -0.002, 0.005, -0.004, 0.001])
z = (r - r.mean()) / r.std()
print(z.round(2).tolist())

med = r.median()
mad = (r - med).abs().median()
robust_z = (r - med) / (1.4826 * mad)
print(robust_z.round(1).tolist())
print(r[robust_z.abs() > 5].index.tolist())
```

```text
[-0.31, -0.42, -0.32, 2.47, -0.38, -0.3, -0.4, -0.34]
[0.4, -1.5, 0.2, 47.8, -0.8, 0.6, -1.2, -0.2]
[3]
```

The 25% "return" has an ordinary z-score of only 2.47, below a typical threshold of 3, yet its robust z-score is 47.8. Flagged points should be **investigated**, not deleted automatically: a genuine crash day is exactly what a risk model must keep.

### Aligning series
Arithmetic between Series aligns on the index. Different holiday calendars therefore create `NaN`s wherever one market was closed. Combine series into one DataFrame (here with `pd.concat`), inspect, and then decide whether to drop or forward-fill the unmatched dates.

```python
import pandas as pd

us = pd.Series([4500.0, 4520.0, 4510.0, 4535.0],
               index=pd.to_datetime(["2026-07-01", "2026-07-02", "2026-07-06", "2026-07-07"]))
uk = pd.Series([7600.0, 7580.0, 7610.0, 7625.0],
               index=pd.to_datetime(["2026-07-01", "2026-07-02", "2026-07-03", "2026-07-07"]))

print((us + uk).tolist())                       # auto-alignment creates NaN
both = pd.concat({"us": us, "uk": uk}, axis=1, sort=True)
print(both)
print(both.dropna().index.strftime("%m-%d").tolist())
```

```text
[12100.0, 12100.0, nan, nan, 12160.0]
                us      uk
2026-07-01  4500.0  7600.0
2026-07-02  4520.0  7580.0
2026-07-03     NaN  7610.0
2026-07-06  4510.0     NaN
2026-07-07  4535.0  7625.0
['07-01', '07-02', '07-07']
```

## Worked example
A stock closes at 120.00, 121.50 and 122.00, then undergoes a 2-for-1 split effective 4 June and closes at 61.40, 62.00 and 61.70. The raw data show a −49.67% "return" on the split date. Adjust the history and recompute returns.

For a $k$-for-1 split, every price **before** the effective date is divided by $k$:

$$
P^{\text{adj}}_t = \frac{P_t}{k} \quad \text{for } t < \text{split date}
$$

```python
import pandas as pd

idx = pd.date_range("2026-06-01", periods=6, freq="B")
raw = pd.Series([120.0, 121.5, 122.0, 61.4, 62.0, 61.7], index=idx)  # 2-for-1 split on day 4
print(raw.pct_change().round(4).tolist())

split_date, ratio = pd.Timestamp("2026-06-04"), 2.0
adj = raw.copy()
adj[adj.index < split_date] = adj[adj.index < split_date] / ratio
print(adj.tolist())
print(adj.pct_change().round(4).tolist())
```

```text
[nan, 0.0125, 0.0041, -0.4967, 0.0098, -0.0048]
[60.0, 60.75, 61.0, 61.4, 62.0, 61.7]
[nan, 0.0125, 0.0041, 0.0066, 0.0098, -0.0048]
```

Step by step:
1. Raw split-day return: 61.40 / 122.00 − 1 = −49.67%, an artefact, not a loss.
2. Adjusted earlier prices: 120.00 / 2 = 60.00, 121.50 / 2 = 60.75, 122.00 / 2 = 61.00.
3. Adjusted split-day return: 61.40 / 61.00 − 1 = **+0.66%**.
4. All other returns are unchanged, because dividing both prices in a ratio by 2 cancels out.

Dividends work the same way in principle: a total-return series scales earlier prices by a factor that removes the drop on the ex-dividend date.

## Common exam traps
- **Computing returns before adjusting for splits.** One unadjusted split creates a −50% day that dwarfs everything else in a VaR estimate.
- **Trusting ordinary z-scores to catch big outliers.** The outlier inflates the standard deviation and masks itself; use median and MAD.
- **Deleting genuine extreme returns.** Investigate flagged points; remove only confirmed errors.
- **Unlimited forward filling.** Filling weeks of stale prices produces fake zero volatility; use `limit=`.
- **Ignoring calendar mismatches.** Adding two markets' series silently creates `NaN`s on each market's holidays.

## Key takeaways
- Clean before you compute: bad inputs create pairs of fake extreme returns.
- Forward-fill prices (with a limit) or drop gaps; never invent smooth data for risk work.
- Remove duplicate timestamps, typically keeping the last (corrected) record.
- Divide pre-split prices by the split ratio so returns reflect economics, not mechanics.
- Robust z-scores (median and MAD) expose outliers that ordinary z-scores hide.
- Align multi-market data explicitly and decide how to treat unmatched dates.
