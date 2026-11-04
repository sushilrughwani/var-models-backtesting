---
title: "What-If Analysis: Goal Seek, Data Tables and Scenarios"
---

## Learning goals
- Use Goal Seek to find the input value that delivers a target output, such as break-even volume.
- Build one-variable and two-variable data tables to show how an output responds to changing inputs.
- Build a scenario switch with `CHOOSE` so one cell flips the whole model between Base, Bull and Bear cases.
- Explain the set-up rules and calculation settings that make data tables reliable.
- Choose the right what-if tool for a given question.

## Explanation

### Three questions, three tools
Every model answers "what is the output, given these inputs?". What-if analysis turns the question around or widens it:

- **Goal Seek** answers "what input do I need to hit this output?" (What sales volume breaks even?)
- **Data tables** answer "how does the output change across a range of inputs?" (Profit for every price from 23 to 27.)
- **Scenarios** answer "what happens if several inputs change together in a coherent story?" (A recession means lower price, lower volume and higher unit cost at the same time.)

All three rely on the discipline from earlier lessons: inputs in clearly labelled cells, and every calculation referencing those cells rather than hard-coded numbers. A model that types 25 inside a formula cannot be flexed.

### Goal Seek
Data, What-If Analysis, Goal Seek asks for three things: the **Set cell** (must contain a formula, usually the output), the **To value** (the target) and the **By changing cell** (must be a typed input that the output depends on). Excel iterates until the output hits the target and writes the answer into the input cell, replacing what was there. It solves one equation in one unknown, so for anything more complex use Solver.

### Data tables
A one-variable data table lists input values down a column, with a formula pointing at the output one row above and one column to the right of the first value. Select the whole block, choose What-If Analysis, Data Table, and enter the model's input cell as the **Column input cell**. Excel substitutes each value into the model and records the output.

A two-variable table puts one input across the top row, the other down the first column, and a link to the output (for example `=B6`) in the top-left corner. In the dialog, the **Row input cell** is the model input that the top-row values replace, and the **Column input cell** is the one the left-column values replace. Excel fills the body with an array formula shown as `{=TABLE(B2,B1)}`, which cannot be edited cell by cell.

Two rules prevent most problems. The input cells must be on the same sheet as the data table. And large data tables slow the workbook, so many analysts switch to Formulas, Calculation Options, "Automatic Except for Data Tables" and press F9 when they want the tables refreshed.

### Scenario switches
Put each scenario's assumptions side by side (Base, Bull, Bear in columns C, D and E), add a selector cell holding 1, 2 or 3, and make the live input pull the chosen column:

`=CHOOSE($B$8, C12, D12, E12)`

`INDEX` works too: `=INDEX(C12:E12, $B$8)`. Change the selector and the whole model, including charts, moves to the new case. Excel's Scenario Manager does something similar but stores values in a dialog where reviewers cannot see them, so a visible switch is usually preferred.

## Worked example
A product sells at price 25 (`B1`), volume 5,000 units (`B2`), variable cost 15 per unit (`B3`), and fixed costs of 40,000 (`B4`). Profit in `B6` is `=B2*(B1-B3)-B4`.

**Step 1 - base profit.** 5,000 × (25 − 15) − 40,000 = **10,000**.

**Step 2 - Goal Seek break-even.** Set `B6` to 0 by changing `B2`. Excel returns **4,000 units**, matching fixed cost divided by unit margin: 40,000 / 10. Goal Seek on price instead (units back at 5,000) gives 23.00, since 15 + 40,000 / 5,000 = 23.

**Step 3 - two-variable data table.** Prices 23, 25 and 27 down `D3:D5`, units 4,000, 5,000 and 6,000 across `E2:G2`, `=B6` in `D2`. Row input cell `B2`, column input cell `B1`:

| Price \ Units | 4,000 | 5,000 | 6,000 |
|---|---|---|---|
| 23 | −8,000 | 0 | 8,000 |
| 25 | 0 | 10,000 | 20,000 |
| 27 | 8,000 | 20,000 | 32,000 |

Each step of 2 in price moves profit by 2 × units, while each step of 1,000 units moves profit by 1,000 × margin.

**Step 4 - scenarios.** Base (25, 5,000, 15), Bull (27, 6,000, 14), Bear (23, 4,000, 16). With the inputs driven by `CHOOSE`, profit is 10,000 in Base, **38,000** in Bull and **−12,000** in Bear. The Bear case loses money even though no single input moved more than 20%, because the changes compound.

## Common exam traps
- Swapping the row and column input cells in a two-variable table; the table fills with plausible but wrong numbers.
- Pointing Goal Seek's By changing cell at a formula instead of a typed input, which Excel rejects.
- Forgetting that Goal Seek overwrites the input cell; note the original value or undo afterwards.
- Placing a data table on a different sheet from its input cells, which Excel does not allow.
- Leaving calculation on "Automatic Except for Data Tables" and reading stale tables without pressing F9.

## Key takeaways
- Goal Seek finds the single input that produces a target output.
- Data tables show an output across one or two ranges of input values in a single grid.
- Row input cell matches values across the top; column input cell matches values down the side.
- A `CHOOSE` or `INDEX` scenario switch keeps all cases visible and flips the model with one cell.
- What-if tools only work when inputs live in their own cells and formulas reference them.
