---
title: "Sensitivity and Scenario Analysis"
---

## Learning goals
- Build a two-way Excel data table of value per share against WACC and terminal growth.
- Distinguish sensitivity analysis (one or two inputs) from scenario analysis (a consistent set of inputs).
- Implement a scenario switch with `CHOOSE` or `INDEX` that drives the whole model.
- Interpret sensitivity outputs and compute a probability-weighted value.

## Explanation

### Why a single number is not enough
Northwind's DCF says USD 32.16 per share, but that number rests on a WACC of 9.0% and terminal growth of 2.5%, both of which are estimates. A decision maker needs to know how fragile the answer is. **Sensitivity analysis** flexes one or two inputs while holding the rest constant. **Scenario analysis** changes a whole coherent story at once: in a downturn, revenue, margins and growth all fall together.

A pilot's pre-flight checklist is a good mental model: sensitivity tests each instrument on its own; scenarios rehearse a full emergency where several things go wrong together.

### Two-way data tables
Excel's data table recalculates the model for every combination of two inputs:
1. Put the output link in the top-left corner of the grid, for example `=C45` (value per share).
2. Enter terminal growth rates across the top row and WACC values down the left column.
3. Select the whole grid, then Data > What-If Analysis > Data Table.
4. **Row input cell**: the cell holding the input listed across the top (growth). **Column input cell**: the cell holding the input listed down the side (WACC).

Excel fills the grid with `{=TABLE(C5,C4)}`. The input cells must be on the same sheet as the table, so keep the table on the Inputs or valuation sheet. Large models often set calculation to "automatic except for data tables"; remember to press F9 before you read the output.

### Scenario switches
Store each scenario's assumptions side by side and pick one with a single selector cell:

$$
x_{\text{live}} = \text{CHOOSE}(s,\ x_{\text{down}},\ x_{\text{base}},\ x_{\text{up}})
$$

where $s$ is 1, 2 or 3. In Excel, with the selector in `$C$3` and the three cases in E8:G8: `=CHOOSE($C$3,E8,F8,G8)` or equivalently `=INDEX(E8:G8,$C$3)`. Every downstream formula references the live column only, so the entire model, including the equity bridge, updates in one keystroke. Add data validation to the selector so only 1 to 3 can be entered.

### Probability weighting
If you can attach probabilities to scenarios:

$$
\text{Expected value} = \sum_s p_s V_s
$$

where $p_s$ is the probability of scenario $s$ and $V_s$ its value per share. This is useful for an asymmetric story, but the probabilities are judgements and should be disclosed.

## Worked example
Northwind Components Ltd, base case from the previous lessons: FCFF 108.75, 119.75, 132.00, 138.50, 145.75 (USD millions, 2026-2030), WACC 9.0%, g 2.5%, bridge adjustments −313, closed-form dilution with 54.6 million shares and option proceeds of 80.

**Part A - Two-way table (USD per share).**

| WACC (rows) / g (columns) | 1.5% | 2.0% | 2.5% | 3.0% | 3.5% |
|---|---|---|---|---|---|
| 8.0% | 33.43 | 35.94 | 38.92 | 42.48 | 46.84 |
| 8.5% | 30.67 | 32.79 | 35.26 | 38.18 | 41.68 |
| 9.0% | 28.28 | 30.09 | **32.16** | 34.59 | 37.45 |
| 9.5% | 26.20 | 27.74 | 29.51 | 31.55 | 33.93 |
| 10.0% | 24.35 | 25.70 | 27.21 | 28.95 | 30.95 |

Check one cell by hand: at WACC 8.5% and g 2.5%, PV of forecast FCFF = 502.16 and TV = 145.75 × 1.025 / 0.06 = 2,489.90, with PV 1,655.89; EV = 2,158.06. Equity = 2,158.06 − 313 = 1,845.06; price = (1,845.06 + 80) / 54.6 = 35.26. Value becomes most sensitive toward the top-right corner, where WACC minus g is smallest, and the market price of 27.50 is only reached at a WACC near 10%.

**Part B - Scenarios.**

| | Downside | Base | Upside |
|---|---|---|---|
| EBIT margin shift (all years) | −1.5 pts | 0 | +1.0 pt |
| Terminal growth | 2.0% | 2.5% | 3.0% |

Revenue, D&A, capex and NWC are unchanged. Downside 2026 FCFF: EBIT = 175 − 0.015 × 1,250 = 156.25; NOPAT = 117.19; FCFF = 117.19 + 44 − 56 − 10.5 = 94.69. Running all five years through the switch gives EV of 1,657.76 (downside), 1,989.11 (base) and 2,285.52 (upside), or **USD 26.09, 32.16 and 37.59 per share**.

**Part C - Probability-weighted value.** With 25% / 50% / 25%: 0.25 × 26.09 + 0.50 × 32.16 + 0.25 × 37.59 = **USD 32.00**.

## Common exam traps
- Swapping the row and column input cells, which silently produces a transposed, wrong table.
- Placing the data table on a different sheet from its input cells (Excel will not allow it).
- Reading a stale table when calculation is set to exclude data tables.
- Building "scenarios" that flex one input only, or mixing inconsistent assumptions (high growth with collapsing margins and no reason).
- Hard-coding scenario values inside formulas instead of a visible assumptions block.

## Key takeaways
- Sensitivities flex one or two inputs; scenarios change a coherent set.
- A two-way data table needs the output link in the corner and the correct row and column input cells.
- One selector cell with `CHOOSE` or `INDEX` should drive the whole model.
- Northwind ranges from USD 24.35 to 46.84 across the WACC-growth grid, and 26.09 to 37.59 across scenarios.
- Probability-weighted value is only as good as the disclosed probabilities.
