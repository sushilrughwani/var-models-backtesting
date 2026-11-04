---
title: "Visualising Financial Data With matplotlib"
---

## Learning goals
- Create figures with the object-oriented `fig, ax = plt.subplots()` interface and save them to files.
- Draw a labelled price chart with a moving average, and a return histogram.
- Build a correlation heatmap with a diverging colour scale centred on zero.
- Plot a growth-of-1 curve and its drawdown in stacked panels that share an axis.
- Apply chart-design rules that keep financial charts honest and readable.

## Explanation

### Why chart at all?
Summary statistics can hide what a picture shows instantly: a regime change in volatility, a fat left tail, a stale price that flat-lines for a week, or two assets that stop moving together in a crisis. A chart is also the fastest data-cleaning tool you have, because errors from the previous lesson (spikes, gaps, splits) jump off the screen.

### Figures and axes
matplotlib has two styles. The quick `plt.plot(...)` style is fine for a throwaway look, but the **object-oriented** style is clearer and scales to multi-panel layouts: `fig, ax = plt.subplots()` returns a **Figure** (the whole canvas) and one or more **Axes** (individual plot areas). You then call methods on the axes: `ax.plot`, `ax.hist`, `ax.set_title`, `ax.set_xlabel`, `ax.legend`. Finally, `fig.savefig("name.png", dpi=150)` writes the image.

In Jupyter, charts appear below the cell automatically. The examples below add `matplotlib.use("Agg")` so they also run as scripts on a machine without a display; omit that line in a notebook.

### A price chart with a moving average
pandas Series with a `DatetimeIndex` plot directly against their dates. Label every axis with units, title the chart, and add a legend whenever there are two or more lines.

```python
import matplotlib
matplotlib.use("Agg")            # draw to files; omit this line in Jupyter
import matplotlib.pyplot as plt
import pandas as pd

dates = pd.date_range("2026-01-26", periods=8, freq="B")
close = pd.Series([100.0, 101.5, 100.8, 102.3, 103.0, 102.1, 104.4, 105.0], index=dates)
ma3 = close.rolling(3).mean()

fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(close.index, close, label="Close")
ax.plot(ma3.index, ma3, label="3-day MA", linestyle="--")
ax.set_title("ACME closing price")
ax.set_xlabel("Date")
ax.set_ylabel("Price (USD)")
ax.legend()
fig.autofmt_xdate()
fig.savefig("price.png", dpi=150, bbox_inches="tight")
print(len(ax.get_lines()), ax.get_title())
```

```text
2 ACME closing price
```

The moving average starts two days late because its first two values are `NaN`; matplotlib simply leaves gaps for them. `fig.autofmt_xdate()` tilts date labels so they do not collide. The dashed line style gives the second series a cue that does not depend on colour alone.

### Return histograms
A histogram groups returns into equal-width **bins** and counts how many fall in each, revealing the shape of the distribution: its centre, spread, skew and tails. `ax.hist` returns the counts and bin edges, so you can check the picture numerically.

```python
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

r = np.array([-0.031, -0.018, -0.012, -0.009, -0.006, -0.004, -0.002, -0.001,
              0.000, 0.001, 0.002, 0.003, 0.004, 0.005, 0.007, 0.009,
              0.011, 0.014, 0.019, 0.027])
fig, ax = plt.subplots()
counts, edges, _ = ax.hist(r, bins=5, edgecolor="black")
ax.axvline(r.mean(), color="red", label=f"mean = {r.mean():.4f}")
ax.set_xlabel("Daily return")
ax.set_ylabel("Number of days")
ax.legend()
fig.savefig("hist.png")
print(counts)
print(edges.round(4))
```

```text
[1. 3. 8. 6. 2.]
[-0.031  -0.0194 -0.0078  0.0038  0.0154  0.027 ]
```

The bin width is the range divided by the number of bins:

$$
w = \frac{x_{\max} - x_{\min}}{k}
$$

where $k$ is the number of bins. Too few bins hide the tails; too many make noise look like structure. With hundreds of daily returns, 30 to 50 bins is a common starting point.

### Correlation heatmaps
`DataFrame.corr()` returns the correlation matrix, and `ax.imshow` paints it as a grid. Correlation runs from −1 to +1 with a meaningful zero, so use a **diverging** colour map (two hues, neutral in the middle) and fix `vmin=-1, vmax=1` so that colours mean the same thing on every chart. Annotating each cell with its value means readers never have to decode colour alone.

```python
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd

rets = pd.DataFrame({
    "Equity": [0.010, -0.020, 0.015, 0.005, -0.010, 0.020],
    "Credit": [0.004, -0.003, 0.002, 0.006, -0.005, 0.003],
    "Govt":   [-0.002, 0.004, 0.001, -0.003, 0.002, -0.001],
})
corr = rets.corr()
print(corr.round(2))

fig, ax = plt.subplots(figsize=(4, 4))
im = ax.imshow(corr, cmap="RdBu_r", vmin=-1, vmax=1)
ax.set_xticks(range(len(corr)), corr.columns)
ax.set_yticks(range(len(corr)), corr.columns)
for i in range(len(corr)):
    for j in range(len(corr)):
        ax.text(j, i, f"{corr.iloc[i, j]:.2f}", ha="center", va="center")
fig.colorbar(im, ax=ax)
fig.savefig("corr.png", bbox_inches="tight")
```

```text
        Equity  Credit  Govt
Equity    1.00    0.75 -0.71
Credit    0.75    1.00 -0.89
Govt     -0.71   -0.89  1.00
```

Government bonds are negatively correlated with both risky assets in this sample, which shows up as the opposite colour.

### Design rules for honest charts
- One y-axis per panel. Two measures on different scales (price and volume, say) belong in separate stacked panels sharing the x-axis, not on a twin axis.
- Avoid rainbow colour maps such as `jet`: they create false boundaries. Use a single-hue sequential map for magnitudes and a diverging map for signed values.
- Start bar-chart axes at zero; line charts of prices may zoom in, but say so.
- Label axes with units and keep gridlines light.

## Worked example
A strategy earns daily returns of +1.0%, −2.0%, +1.5%, +0.5%, −1.0% and +2.0%. Plot the growth of 1 unit of currency and the drawdown beneath it, and read off the maximum drawdown.

Wealth compounds the returns, and drawdown compares wealth with its running peak:

$$
W_t = \prod_{s=1}^{t}(1 + r_s), \qquad DD_t = \frac{W_t}{\max_{s \le t} W_s} - 1
$$

```python
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd

r = pd.Series([0.010, -0.020, 0.015, 0.005, -0.010, 0.020])
wealth = (1 + r).cumprod()
drawdown = wealth / wealth.cummax() - 1
print(wealth.round(4).tolist())
print(drawdown.round(4).tolist())

fig, (ax1, ax2) = plt.subplots(2, 1, sharex=True, figsize=(7, 5))
ax1.plot(wealth); ax1.set_title("Growth of 1")
ax2.fill_between(drawdown.index, drawdown, 0, color="tab:red")
ax2.set_title("Drawdown")
fig.tight_layout()
fig.savefig("wealth.png")
```

```text
[1.01, 0.9898, 1.0046, 1.0097, 0.9996, 1.0196]
[0.0, -0.02, -0.0053, -0.0003, -0.0103, 0.0]
```

Step by step:
1. Wealth after day 1: 1 × 1.01 = 1.0100, which becomes the running peak.
2. Day 2: 1.0100 × 0.98 = 0.9898; drawdown = 0.9898 / 1.0100 − 1 = **−2.00%**, the maximum.
3. Days 3 and 4 recover to 1.0097, still just below the 1.0100 peak (drawdown −0.03%).
4. Day 5 falls to 0.9996 (drawdown −1.03%); day 6 reaches a new high of 1.0196, so drawdown returns to 0.
5. `sharex=True` keeps both panels on the same time axis, which is the honest alternative to a twin y-axis.

## Common exam traps
- **Forgetting `vmin`/`vmax` on heatmaps.** Without them the colour scale stretches to the data, so a 0.2 correlation can look as dark as 0.9 on another chart.
- **Plotting prices when the question is about returns.** Prices trend and look smooth; return histograms and volatility need returns.
- **Twin y-axes.** Two scales on one panel let the author imply any relationship; use stacked panels.
- **Mixing `plt.` and `ax.` calls carelessly.** In multi-panel figures, `plt.title` labels only the current axes; call methods on each `ax`.
- **Unlabelled axes and missing legends.** A chart without units or series names cannot be checked.

## Key takeaways
- Use `fig, ax = plt.subplots()` and call methods on `ax`; save with `fig.savefig`.
- Line charts with a moving average show trend; label axes with units and add a legend.
- Histograms reveal distribution shape; choose bins deliberately.
- Correlation heatmaps need a diverging colour map fixed at −1 to +1, with values annotated.
- Growth-of-1 and drawdown panels with `sharex=True` show path and pain together.
- One y-axis per panel, no rainbow colour maps, colour never the only cue.
