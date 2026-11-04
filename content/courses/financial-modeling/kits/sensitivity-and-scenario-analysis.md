---
title: "Sensitivity and Scenario Analysis"
duration: 20
---

## Lecture outline
- 00:00 - Hook: USD 32.16 per share, or anywhere from 24 to 47? The same model gives both
- 02:00 - Sensitivity versus scenario analysis
- 04:00 - Live Excel: building the WACC by growth data table
- 09:00 - Reading the grid and hand-checking one cell
- 12:00 - Scenario switch with CHOOSE and INDEX
- 15:00 - Northwind downside, base, upside and probability weighting
- 18:00 - Exam traps and recap

## Slides
### Slide 1: How Fragile Is the Answer?
- Every DCF input is an estimate
- Decision makers need a range, not a point
- Two tools: sensitivities and scenarios

### Slide 2: Sensitivity vs Scenario
- Sensitivity: flex one or two inputs, hold others
- Scenario: change a coherent story together
- Use both

### Slide 3: Data Table Setup
- Output link in the top-left corner
- Growth across the top, WACC down the side
- Row input = growth cell; column input = WACC cell

### Slide 4: Data Table Gotchas
- `{=TABLE(C5,C4)}` cannot be edited cell by cell
- Inputs must be on the same sheet
- "Automatic except tables": press F9

### Slide 5: Northwind Grid
- Base 32.16 at 9.0% and 2.5%
- 24.35 (10.0%, 1.5%) to 46.84 (8.0%, 3.5%)
- Market price 27.50 needs WACC near 10%

### Slide 6: Hand-Check a Cell
- WACC 8.5%, g 2.5%: EV 2,158.06
- Equity 1,845.06
- (1,845.06 + 80) / 54.6 = 35.26

### Slide 7: Scenario Switch
- Selector in `$C$3` with data validation
- `=CHOOSE($C$3,E8,F8,G8)` or `=INDEX(E8:G8,$C$3)`
- Everything downstream reads the live column

### Slide 8: Northwind Scenarios
- Downside: margin −1.5 pts, g 2.0%: 26.09
- Base: 32.16
- Upside: margin +1.0 pt, g 3.0%: 37.59

### Slide 9: Probability Weighting
- 25% / 50% / 25% gives 32.00
- Probabilities are judgement: disclose them
- Useful when risks are asymmetric

### Slide 10: Traps
- Swapped input cells
- Stale tables
- One-variable "scenarios"; hard-coded cases

## Whiteboard examples
**Example 1 - Hand-check the grid at 8.5% and 2.5%.**
- PV of FCFF at 8.5% = 502.16
- TV = 145.75 × 1.025 / 0.06 = 2,489.90; PV = 2,489.90 / 1.085^5 = 1,655.89
- EV = 2,158.06; equity = 1,845.06; price = 1,925.06 / 54.6 = 35.26

**Example 2 - Downside 2026 FCFF.**
- EBIT = 175 − 1.5% × 1,250 = 156.25; NOPAT = 117.19
- FCFF = 117.19 + 44 − 56 − 10.5 = 94.69 (base 108.75)
- Common error: deducting the full 18.75 margin loss from FCFF gives 90.00; the loss is only 14.06 after tax

**Example 3 - Weighted values.**
- 25/50/25: 0.25 × 26.09 + 0.5 × 32.16 + 0.25 × 37.59 = 32.00
- 20/50/30: 5.22 + 16.08 + 11.28 = 32.58

## Questions to ask students
- Growth rates run across the top of the grid. Which input cell goes in "row input cell"? (The terminal growth input.)
- Why does the grid get more extreme toward the top-right? (WACC minus g shrinks, so TV explodes.)
- Why not run scenarios with a data table instead of a switch? (A switch changes many inputs coherently and lets the whole model, charts included, show one case.)
- Your downside has higher revenue growth than base but lower margins. Is that coherent? (Only if there is a story, e.g. price cuts to win volume; otherwise no.)
- What WACC makes Northwind worth its market price at 2.5% growth? (Roughly 10%, from the grid: 27.21.)

## Analogies
- Pilot training: sensitivities test single instruments; scenarios rehearse a full emergency.
- A stress test at the doctor's: the treadmill speed (WACC) and incline (growth) are raised together to see where the heart (value) strains.
- The scenario switch as a TV remote: one button changes the whole channel, not just the volume.

## Recording tips
- Build the data table from scratch on screen, then deliberately swap the input cells once to show the wrong table.
- Highlight the base-case cell in the grid so students can anchor on 32.16.
- Flip the scenario switch live and let the equity value and price cells change on screen.
