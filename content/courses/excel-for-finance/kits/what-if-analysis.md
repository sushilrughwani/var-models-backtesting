---
title: "What-If Analysis: Goal Seek, Data Tables and Scenarios"
duration: 20
---

## Lecture outline
- 00:00 - Hook: "How many units do we need to sell?" answered in five seconds
- 02:00 - Three questions, three tools: Goal Seek, data tables, scenarios
- 04:00 - Live build: the profit model and Goal Seek break-even
- 08:00 - One-variable data table on units
- 11:00 - Two-variable data table on price and units; row versus column input
- 15:00 - Scenario switch with CHOOSE; Base, Bull, Bear
- 18:00 - Calculation settings, traps and quiz preview

## Slides
### Slide 1: Turn the Model Around
- Normal question: inputs in, output out
- What-if: which input hits my target, and how sensitive is the output?
- Three built-in tools answer this
### Slide 2: Choosing the Tool
- Goal Seek: one target, one unknown input
- Data table: output across a range of inputs
- Scenarios: several inputs change together
### Slide 3: The Profit Model
- Price 25, units 5,000, variable cost 15, fixed 40,000
- Profit `=B2*(B1-B3)-B4` = 10,000
- Every input in its own labelled cell
### Slide 4: Goal Seek
- Set cell: profit; To value: 0; By changing: units
- Answer: 4,000 units
- Overwrites the input cell, so note the original
### Slide 5: One-Variable Data Table
- Units 3,000 to 7,000 down a column
- Profit: −10,000, 0, 10,000, 20,000, 30,000
- Column input cell = units input
### Slide 6: Two-Variable Data Table
- Price down the side, units across the top, `=B6` in the corner
- Row input `B2` (units), column input `B1` (price)
- Result shown as `{=TABLE(B2,B1)}`
### Slide 7: Reading the Grid
- Break-even diagonal: (23, 5,000) and (25, 4,000)
- Best case in grid: 32,000 at 27 and 6,000 units
- Worst case in grid: −8,000 at 23 and 4,000 units
### Slide 8: Scenario Switch
- Assumptions side by side in Base, Bull, Bear columns
- `=CHOOSE($B$8, C12, D12, E12)`
- Base 10,000; Bull 38,000; Bear −12,000
### Slide 9: Keep It Fast and Correct
- Data tables must sit on the same sheet as their inputs
- "Automatic Except for Data Tables" plus F9
- Prefer visible switches to Scenario Manager

## Whiteboard examples
1. **Break-even.** Unit margin 25 − 15 = 10. Break-even units = 40,000 / 10 = 4,000. Break-even price at 5,000 units = 15 + 40,000 / 5,000 = 23. Target profit 20,000 needs (40,000 + 20,000) / 10 = 6,000 units.
2. **Two-way grid.** Fill the 3 × 3 grid by hand: at price 27 and 6,000 units, 6,000 × 12 − 40,000 = 32,000; at 23 and 4,000, 4,000 × 8 − 40,000 = −8,000. Show the diagonal of zeros.
3. **Scenarios.** Bull: 6,000 × (27 − 14) − 40,000 = 38,000. Bear: 4,000 × (23 − 16) − 40,000 = −12,000. Point out that the Bear case is worse than any cell in the two-way grid because unit cost also rose.

## Questions to ask students
- Can Goal Seek change a cell that contains a formula? (No, the changing cell must be a typed input.)
- In a two-variable table with prices down the side, which cell is the column input? (The price input cell.)
- Why might a data table show old numbers? (Calculation is set to exclude data tables; press F9.)
- Price falls from 25 to 23 at 5,000 units. How much does profit change? (By 2 × 5,000 = 10,000, from 10,000 to 0.)
- Why prefer a `CHOOSE` switch to Scenario Manager? (Assumptions stay visible and auditable on the sheet.)

## Analogies
- Goal Seek is a thermostat: you set the temperature you want and it turns the dial until the room gets there.
- A data table is a flight simulator: the same model flown hundreds of times with different weather.
- A scenario switch is a TV remote: the channels (cases) already exist side by side; one button changes which one is on screen.

## Recording tips
- Show the Data Table dialog with the row and column input cells highlighted on the sheet in different colours.
- Run Goal Seek, then press Ctrl+Z to show it overwrote the input.
- Flip the scenario selector live with a chart on screen so viewers see the whole model move.
