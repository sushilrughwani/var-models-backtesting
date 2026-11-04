---
title: "The Football Field and Valuation Summary"
duration: 16
---

## Lecture outline
- 00:00 - Hook: a managing director gives you five seconds; show them the whole valuation in one chart
- 02:00 - What each bar represents and how its range is set
- 05:00 - Live Excel: the stacked-bar trick, invisible series and price line
- 09:00 - Reading the Northwind chart: overlap, outliers, current price
- 12:00 - Weighting methods and concluding a value
- 14:00 - Exam traps and recap

## Slides
### Slide 1: One Chart, Every Method
- Horizontal bars on one per-share axis
- Current price as a vertical line
- Agreement and disagreement at a glance

### Slide 2: Four Questions, Four Lenses
- DCF: intrinsic value
- Comps: market value of a minority stake
- Precedents: control value; 52-week: where the stock has traded

### Slide 3: Range Rules
- DCF: WACC ±0.5 points; exit multiple ±1.0x
- Multiples: first to third quartile
- State the rule in a footnote

### Slide 4: Excel Construction
- Helper column: `=C5-B5`
- Stacked bar with lows formatted as no fill
- Price line via a scatter series; reverse category order

### Slide 5: Northwind Ranges (USD per share)
- 52-week 22.40-30.10; comps 29.42-32.23
- Precedents 31.63-35.66
- DCF growth 29.51-35.26; DCF exit 30.99-37.54

### Slide 6: The Overlap
- Comps and both DCFs overlap at 30.99-32.23
- Midpoint 31.61
- Current price 27.50 sits below every valuation bar

### Slide 7: Interpreting Precedents
- Higher, as a control premium should be
- Relevant for takeover value
- Not part of a minority target price

### Slide 8: Concluding a Value
- 60% DCF base (32.16) + 40% comps median (31.03)
- = 31.71 per share
- Upside 15.3% versus 27.50

### Slide 9: Traps
- Blind averaging including precedents
- Bars without rules
- Upside divided by the target instead of the price

## Whiteboard examples
**Example 1 - Bar lengths for the chart.**
- 52-week: 30.10 − 22.40 = 7.70; comps: 32.23 − 29.42 = 2.81; precedents: 35.66 − 31.63 = 4.03
- DCF growth: 35.26 − 29.51 = 5.75; DCF exit: 37.54 − 30.99 = 6.55

**Example 2 - Overlap.**
- Lower bound = max(29.42, 29.51, 30.99) = 30.99; upper bound = min(32.23, 35.26, 37.54) = 32.23
- Midpoint = 31.61

**Example 3 - Point estimate and upside.**
- 0.6 × 32.16 + 0.4 × 31.03 = 31.71; upside = 31.71 / 27.50 − 1 = 15.3%
- Wrong formula: (31.71 − 27.50) / 31.71 = 13.3%

## Questions to ask students
- Why is the DCF exit bar wider than the comps bar? (A ±1.0x exit multiple on 2030 EBITDA moves value more than the narrow 8.4x-9.1x quartile range on 2026 EBITDA.)
- Should precedents feed a target price for a stock recommendation? (Generally no; they embed a control premium.)
- What does it mean if the current price sits inside every bar? (The market price looks fair on all lenses.)
- How do you make bars start at their lows in Excel? (Stack them on an invisible series of low values.)
- Your comps and DCF bars do not overlap at all. What next? (Investigate assumptions: growth, margins or peer selection, before concluding.)

## Analogies
- A weather forecast from several models: when the models cluster, you trust the forecast; when one is far off, you ask why.
- A football pitch: the bars are players spread across the field, the price line is the ball.
- A jury of witnesses with different vantage points: precedents saw the event from the buyer's box, so their testimony is about a different question.

## Recording tips
- Build the chart live from the table; the invisible-series moment is the one students remember.
- Keep the five ranges table visible beside the chart while discussing the overlap.
- Make the weighting decision explicit and defend it out loud; this is what reviewers challenge.
