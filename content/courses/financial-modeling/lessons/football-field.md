---
title: "The Football Field and Valuation Summary"
---

## Learning goals
- Assemble the per-share ranges from each valuation method into one summary table.
- Build a football field chart in Excel with a floating stacked bar and a current-price line.
- Interpret overlaps, outliers and the meaning of each bar (intrinsic, market, control, historical).
- Conclude a defensible valuation range and point estimate with clear weighting.

## Explanation

### One picture, many methods
Each method so far answers a slightly different question. The DCF asks what the cash flows are worth; trading comps ask what the market pays for peers; precedents ask what an acquirer has paid for control; the 52-week range shows where the stock itself has traded. A **football field** stacks these ranges as horizontal bars on one price axis, so the reader sees in five seconds where they agree, where they diverge and where the current price sits. The name comes from the look: bars running across a pitch with yard lines underneath.

### Choosing each bar's range
Every bar should come from a sensitivity a reader can trace:
- **DCF (perpetuity growth)**: WACC ±0.5 points around the base case at the base growth rate.
- **DCF (exit multiple)**: exit multiple ±1.0x at the base WACC.
- **Trading comps**: first to third quartile of peer multiples.
- **Precedents**: first to third quartile of deal multiples.
- **52-week range**: low and high closing price.

State the range rule in a footnote under the chart. Ranges that are arbitrarily wide or narrow destroy credibility.

### Building the chart in Excel
Excel has no football field chart type, so you fake one with a stacked bar:
1. Lay out a table with method names in A5:A9, low values in B5:B9 and high values in C5:C9.
2. Add a helper column D for the bar length: `=C5-B5`, filled down.
3. Select A5:B9 and D5:D9 and insert a **stacked bar** chart.
4. Format the first series (the lows) with no fill and no border, so the visible series floats from low to high.
5. Add data labels: the low and high values, using `=TEXT(B5,"0.00")` helper cells if needed.
6. Add the current price as a vertical line, for example a scatter series with two points at x = 27.50 and y spanning the chart, or an error bar.
7. Reverse the category order so the table and chart read in the same order.

### Reading the chart
Ask three questions. Where do the intrinsic and market methods overlap? That zone is the strongest evidence. Which bars sit apart, and is there a reason? Precedents should sit higher because of the control premium, so they inform a takeover value rather than a share price target. Where is the current price relative to the overlap? A price well below the overlap suggests undervaluation, if you trust the inputs.

### Concluding a value
Do not average every bar blindly. Choose the methods that answer your question (for a minority share price target, DCF and trading comps; for a sale process, precedents too), state weights and round sensibly:

$$
\text{Point estimate} = \sum_i w_i \, V_i
$$

where $w_i$ is the weight on method $i$ (weights sum to 1) and $V_i$ its central value per share.

## Worked example
Northwind Components Ltd, USD per share, current price 27.50. Ranges from the previous lessons:

| Method | Range rule | Low | High | Bar length |
|---|---|---|---|---|
| 52-week trading range | Closing low and high | 22.40 | 30.10 | 7.70 |
| Trading comps | 8.4x to 9.1x CY2026E EBITDA | 29.42 | 32.23 | 2.81 |
| Precedent transactions | 9.8x to 10.9x LTM EBITDA | 31.63 | 35.66 | 4.03 |
| DCF, perpetuity growth | WACC 8.5% to 9.5%, g 2.5% | 29.51 | 35.26 | 5.75 |
| DCF, exit multiple | 8.0x to 10.0x, WACC 9.0% | 30.99 | 37.54 | 6.55 |

**Step 1 - Overlap.** The three methods that value a minority stake (comps and both DCFs) overlap from max(29.42, 29.51, 30.99) = 30.99 to min(32.23, 35.26, 37.54) = 32.23. Midpoint (30.99 + 32.23) / 2 = 31.61.

**Step 2 - Context.** Precedents (31.63 to 35.66) sit above the comps bar, as a control premium should. The whole 52-week range lies below or at the bottom of the valuation bars except for its top.

**Step 3 - Weighting.** For a share price target, weight the base-case DCF at 60% (32.16) and the comps median at 40% (31.03): 0.6 × 32.16 + 0.4 × 31.03 = 19.296 + 12.412 = 31.708, rounded to 31.71.

**Step 4 - Upside.** 31.71 / 27.50 − 1 = 15.3%.

**Concluded fair value: USD 31.71 per share (range about 31 to 32), 15.3% above the current price.** The point estimate sits inside the overlap, which is the consistency check you want.

## Common exam traps
- Averaging precedents into a minority share price target without acknowledging the control premium.
- Bars with no stated range rule, or ranges chosen to reach a desired answer.
- Forgetting to format the first stacked series as invisible, so bars start at zero.
- Mixing per-share and enterprise value bars on the same axis.
- Computing upside as (target − price) / target instead of dividing by the current price.

## Key takeaways
- A football field shows every method's per-share range on one axis with the current price.
- Each bar needs a traceable range rule, such as WACC ±0.5 points or quartile multiples.
- Build it in Excel as a stacked bar with an invisible first series of lows.
- The overlap of relevant methods is the strongest evidence; precedents indicate takeover value.
- Northwind: overlap 30.99 to 32.23, concluded value USD 31.71, 15.3% upside.
