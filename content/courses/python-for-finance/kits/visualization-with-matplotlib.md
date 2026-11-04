---
title: "Visualising Financial Data With matplotlib"
duration: 18
---

## Lecture outline
- 00:00 - Hook: two return series with the same mean and volatility; one histogram reveals a fat left tail
- 02:00 - Figure and Axes: `fig, ax = plt.subplots()`, methods on `ax`, `savefig`, Jupyter vs scripts
- 04:00 - Price chart with a 3-day moving average: labels, units, legend, date formatting
- 06:30 - Return histograms: bins, bin width, reading shape and tails
- 09:00 - Correlation heatmap: `corr()`, `imshow`, diverging colours fixed at -1 to +1, annotations
- 12:00 - Live worked example: growth of 1 and drawdown panels with `sharex=True`
- 15:00 - Design rules: one y-axis per panel, no rainbow maps, colour never the only cue
- 17:00 - Recap and homework: chart your own price series and its drawdown

## Slides
### Slide 1: Visualising Financial Data With matplotlib
- Charts reveal regimes, tails and data errors
- Fastest sanity check on any data set

### Slide 2: Figure and Axes
- `fig, ax = plt.subplots()`
- Call `ax.plot`, `ax.set_title`, `ax.legend`
- `fig.savefig("chart.png", dpi=150)`

### Slide 3: Price Chart
- Plot Series against its DatetimeIndex
- Add a moving average with a dashed line
- Axis labels with units; legend for 2+ lines

### Slide 4: Return Histograms
- Bin width = range / number of bins
- Shows centre, spread, skew, tails
- 30-50 bins for a few hundred daily returns

### Slide 5: Histogram Check
- 20 returns, 5 bins: counts 1, 3, 8, 6, 2
- Edges from -0.031 to 0.027
- Mean line with `ax.axvline`

### Slide 6: Correlation Heatmap
- `rets.corr()` then `ax.imshow(corr, cmap="RdBu_r", vmin=-1, vmax=1)`
- Annotate each cell with its value
- Equity-Credit 0.75; Credit-Govt -0.89

### Slide 7: Growth of 1 and Drawdown
- $W_t = \prod (1 + r_s)$
- $DD_t = W_t / \max W - 1$
- Max drawdown here: -2.00%

### Slide 8: Multi-Panel Layouts
- `plt.subplots(2, 1, sharex=True)`
- Same time axis, separate y-scales
- The honest alternative to twin axes

### Slide 9: Design Rules
- One y-axis per panel
- Diverging map for signed data, sequential for magnitude, never jet
- Colour never the only cue: line styles, labels

### Slide 10: Traps
- No `vmin`/`vmax` on heatmaps
- Prices where returns are needed
- `plt.` vs `ax.` in multi-panel figures

## Whiteboard examples
1. **Drawdown by hand.** Returns +1.0%, −2.0%, +1.5%, +0.5%, −1.0%, +2.0%. Wealth: 1.0100, 0.9898, 1.0046, 1.0097, 0.9996, 1.0196. Running peak: 1.0100 until day 6. Drawdowns: 0, **−2.00%**, −0.53%, −0.03%, −1.03%, 0. Maximum drawdown = **−2.00%**.
2. **Bin edges.** 20 returns from −0.031 to 0.027 with 5 bins. Width = 0.058/5 = **0.0116**. Edges: −0.031, −0.0194, −0.0078, 0.0038, 0.0154, 0.027. Counts: 1, 3, 8, 6, 2 (total 20).
3. **Max drawdown with a recovery.** Returns +5%, −10%, +4%, −3%, +8%. Wealth 1.05, 0.945, 0.9828, 0.9533, 1.0296. Deepest point vs peak 1.05: 0.945/1.05 − 1 = **−10.00%** (not −13%, the sum of the losses).

## Questions to ask students
- Why fix `vmin=-1, vmax=1` on a correlation heatmap? (So the same colour always means the same correlation, across charts.)
- What does `fig, ax = plt.subplots(2, 1)` return for `ax`? (An array of two Axes objects, one per panel.)
- Why is a twin y-axis discouraged? (Rescaling either axis can make two series appear to move together or diverge at will.)
- What happens to the tails if you use only 3 bins? (They are merged into wide outer bins and become invisible.)
- What is the drawdown on a day that sets a new wealth high? (Zero.)

## Analogies
- **The Figure is the picture frame; each Axes is a photo inside it.** You style each photo separately.
- **Drawdown is the distance below your personal best.** A runner's slowest lap doesn't matter; how far they fell from their best time does.
- **A diverging colour map is a thermometer with zero marked in white.** Warm above, cool below, and you instantly see which side you are on.

## Recording tips
- Build the price chart one line at a time, re-running after each addition, so students see what each call changes.
- Show the heatmap first without `vmin`/`vmax` and then with them; the colour shift makes the point.
- Keep the generated PNG files visible in the file browser to reinforce that `savefig` writes real files for reports.
