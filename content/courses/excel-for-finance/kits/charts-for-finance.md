---
title: "Charts for Financial Analysis"
duration: 18
---

## Lecture outline
- 00:00 - Hook: the same numbers shown as a misleading chart and an honest one
- 02:00 - Message first: six messages, six chart types
- 05:00 - Formatting rules: zero baselines, direct labels, conclusion titles
- 08:00 - Live build: native waterfall from revenue to net income
- 11:00 - Manual waterfall with an invisible base series
- 13:00 - Scatter, trendline and beta with SLOPE
- 16:00 - Dynamic charts on Tables; recap and quiz preview

## Slides
### Slide 1: Same Data, Different Story
- Fees of 102 versus 105 on an axis starting at 100
- Looks like a 150% gap; real gap is about 3%
- Charts persuade, so they must be honest
### Slide 2: Message Decides the Chart
- Trend: line; comparison: sorted bar or column
- Composition: stacked column; bridge: waterfall
- Relationship: scatter; distribution: histogram
### Slide 3: Formatting Rules
- Title states the conclusion
- Bars start at zero; lines may zoom
- One highlight colour, the rest grey
### Slide 4: Secondary Axis
- Only for different units, such as revenue and margin %
- Label both axes
- Consider two charts instead
### Slide 5: The Profit Bridge
- 500 revenue to 37.5 net income
- COGS 300, Opex 120, D&A 20, interest 10, tax 12.5
- Waterfall shows where the money went
### Slide 6: Native Waterfall
- Insert, Waterfall (Excel 2016+)
- Enter costs as negatives
- Set first and last bars as totals
### Slide 7: Manual Waterfall
- Stacked column with an invisible base
- Base = running total after the step
- Opex bar: base 80, visible 120
### Slide 8: Scatter and Beta
- Stock returns on the vertical axis, market on the horizontal
- Linear trendline with equation and R²
- `=SLOPE(stock, market)` gives 1.51
### Slide 9: Charts That Grow
- Fixed ranges miss new rows
- Build on a Table or a pivot
- Check the series ranges before publishing

## Whiteboard examples
1. **Waterfall bases.** Revenue 500; after COGS 200; after Opex 80; after D&A 60; after interest 50 (EBT); tax 25% × 50 = 12.5, leaving 37.5. Each cost bar's invisible base equals the running total after it; its visible height equals the cost.
2. **Misleading axis.** Desk A fees 102, desk B 105. On an axis from 100, bars are 2 and 5 units tall, so B looks 2.5 times A. From zero they are 102 and 105, a 2.9% difference.
3. **Beta.** Market returns 2.0, −1.0, 3.0, 1.5, −2.0, 2.5 (%); stock 3.0, −2.0, 4.0, 2.0, −3.5, 3.0 (%). Means 1.25% and 0.75%. Covariance 0.00062, market variance 0.00041, beta = 0.00062 / 0.00041 = 1.51. R² = 0.99.

## Questions to ask students
- Which chart shows a company's quarterly revenue over five years? (Line chart.)
- Why must a bar chart's axis start at zero? (Bar length encodes the value; truncation distorts the comparison.)
- In a manual waterfall, what is the base of the Opex bar if gross profit is 200 and Opex is 120? (80, the running total after Opex.)
- What does a trendline slope of 1.51 on a stock-versus-market scatter mean? (Beta of 1.51: the stock moves about 1.5 times the market on average.)
- What happens if you swap the ranges in `SLOPE`? (You regress the market on the stock and get 0.66, not beta.)

## Analogies
- A chart title is a newspaper headline: say what happened, not just which page you are on.
- A waterfall is a bank statement drawn as a staircase: start with what came in, step down for every outflow, land on what is left.
- A truncated bar axis is a funhouse mirror: the shape is real but the proportions lie.

## Recording tips
- Open with the misleading chart full-screen and let viewers react before fixing the axis.
- For the manual waterfall, show the base series filled in colour first, then set it to No Fill so students see the trick.
- Display `SLOPE` in a cell next to the trendline equation to prove they match.
