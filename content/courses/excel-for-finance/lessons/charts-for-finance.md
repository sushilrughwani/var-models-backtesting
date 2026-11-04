---
title: "Charts for Financial Analysis"
---

## Learning goals
- Choose a chart type that matches the message: trend, comparison, composition, bridge, relationship or distribution.
- Build a profit waterfall, both with Excel's native waterfall chart and with the stacked-column method.
- Add a trendline to a scatter chart and connect its slope to `SLOPE` and beta.
- Apply formatting rules that remove clutter and avoid misleading axes.
- Make charts update automatically by basing them on Excel Tables.

## Explanation

### Start with the message, not the chart menu
Before inserting anything, write the one-sentence takeaway you want the reader to get: "Revenue has grown every quarter", "Credit earns half our fees", "Costs ate most of the gross margin". The sentence tells you the chart:

- **Trend over time** (prices, revenue by quarter): line chart, time on the horizontal axis.
- **Comparison across categories** (fees by desk): column or bar chart, sorted largest to smallest.
- **Composition** (revenue mix by product): stacked column or 100% stacked column; avoid pie charts with more than three or four slices.
- **Bridge** from one total to another (revenue to net income, budget to actual): waterfall.
- **Relationship** between two variables (stock versus market returns): scatter chart.
- **Distribution** (daily returns): histogram.

### Formatting that communicates
Good finance charts look plain. Delete gridlines you do not need, remove the legend when you can label series directly, and write a title that states the conclusion rather than the topic. Column and bar charts must start at zero, because the bar's length is the data; a truncated axis turns a 3% difference into what looks like a doubling. Line charts may use a tighter axis because the reader judges slope, not length. Use one highlight colour for the series that matters and grey for context. Use a secondary axis only when two series have different units, and label both axes clearly.

### Charts that update themselves
If a chart points at a fixed range like `B2:B13`, next month's data are left out. Convert the data to a Table first (previous lesson); a chart built on a table extends automatically when rows are added. The same applies to pivot charts, which follow their pivot table.

### Scatter charts, trendlines and beta
A scatter of a stock's returns (vertical) against market returns (horizontal) shows how sensitive the stock is to the market. Right-click the points, Add Trendline, choose Linear and tick "Display Equation" and "Display R-squared". The trendline is the least-squares regression line:

$$
R_{stock} = \alpha + \beta \, R_{market}
$$

$\beta$ is the slope (the stock's sensitivity to the market) and $\alpha$ the intercept. The worksheet equivalents are `=SLOPE(stock_range, market_range)`, `=INTERCEPT(stock_range, market_range)` and `=RSQ(stock_range, market_range)`. Note the order: the dependent variable comes first.

## Worked example
**Part A - profit waterfall.** A company reports revenue 500, cost of goods sold 300, operating expenses 120, depreciation 20 and interest 10. Earnings before tax = 500 − 300 − 120 − 20 − 10 = 50. Tax at 25% = 12.5. Net income = **37.5**.

In Excel 2016 or later, list the labels and signed values (500, −300, −120, −20, −10, −12.5, 37.5), insert a Waterfall chart, then right-click the first and last bars and choose "Set as total".

For older versions, use a stacked column chart with an invisible base series. For each falling bar, the base is the running total after the step and the visible part is the size of the step:

| Bar | Base (no fill) | Visible |
|---|---|---|
| Revenue | 0 | 500 |
| COGS | 200 | 300 |
| Opex | 80 | 120 |
| D&A | 60 | 20 |
| Interest | 50 | 10 |
| Tax | 37.5 | 12.5 |
| Net income | 0 | 37.5 |

The Opex bar floats from 80 up to 200, showing that operating costs took 120 out of gross profit. With running totals in column D, the base formula for a cost row is simply `=D4` (the total after that step), and the visible part is `=ABS(C4)`.

**Part B - beta from a scatter.** Six months of returns: market 2.0%, −1.0%, 3.0%, 1.5%, −2.0%, 2.5%; stock 3.0%, −2.0%, 4.0%, 2.0%, −3.5%, 3.0%. A linear trendline on the scatter shows a slope of 1.51 and R² of 0.99. `=SLOPE(C2:C7, B2:B7)` with stock returns in column C confirms **beta = 1.51**: the stock tends to move about one and a half times as much as the market.

## Common exam traps
- Truncating the vertical axis of a column chart, which exaggerates differences.
- Using a line chart for unordered categories, implying a trend that does not exist.
- Reversing the arguments of `SLOPE`; `=SLOPE(market, stock)` gives 0.66 here instead of 1.51.
- Setting the waterfall base to the running total before a cost instead of after it, so bars float in the wrong place.
- Charting a fixed range that silently excludes new data.

## Key takeaways
- Pick the chart from the message: line for trends, bars for comparisons, waterfalls for bridges, scatters for relationships.
- Column and bar axes start at zero; titles state the conclusion.
- Native waterfalls need "Set as total" on subtotal bars; the manual method uses an invisible base series.
- A scatter trendline's slope equals `SLOPE(y, x)`, which for stock against market returns is beta.
- Build charts on Tables so they extend automatically.
