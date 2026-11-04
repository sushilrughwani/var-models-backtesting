---
title: "Cell References and Named Ranges"
---

## Learning goals
- Explain how relative references shift when a formula is copied.
- Use absolute and mixed references to lock a column, a row or both.
- Build a two-way sensitivity grid with one formula copied across and down.
- Create and use named ranges to make inputs readable and harder to break.

## Explanation

### References are directions, not addresses
When you type `=A1*2` into B1, Excel does not store "cell A1". It stores a direction: "the cell one column to my left, same row". Copy that formula to B7 and the same direction now points at A7: the formula moved down six rows and the direction moved with it. This is a **relative reference**, and it is why a single formula can be filled down a column of 2,000 rows.

### Locking with the dollar sign
Sometimes a direction is wrong and you want a fixed address, such as a tax rate stored in one cell. A dollar sign in front of the column letter, the row number or both "pins" that part:

| Written as | Column on copy | Row on copy | Name |
|---|---|---|---|
| `B2` | moves | moves | relative |
| `$B$2` | fixed | fixed | absolute |
| `B$2` | moves | fixed | mixed (row locked) |
| `$B2` | fixed | moves | mixed (column locked) |

Read the dollar sign as "do not move the thing right after me". While editing a reference, press `F4` to cycle through the four forms in the order `B2` → `$B$2` → `B$2` → `$B2` → back to `B2`.

### Mixed references and two-way tables
Mixed references shine when one formula must fill a grid where the row headers and column headers are both inputs. The rule of thumb: whatever sits in a **header row**, lock its row; whatever sits in a **header column**, lock its column; a single input cell, lock both.

### Named ranges
A name is a label attached to a cell or range. Select B1, click in the Name Box, type `BaseRevenue` and press Enter. Now `=BaseRevenue*1.05` means the same as `=$B$1*1.05`, and a reviewer reads it in plain English. Names behave as absolute references, appear in formula autocomplete, and are listed and edited in the Name Manager (`Ctrl+F3`).

Name rules: start with a letter or underscore, no spaces (use `Base_Revenue` or `BaseRevenue`), and the name must not look like a cell address. `TAX2025` is rejected because TAX is a valid column in modern Excel, so `TAX2025` already is a cell. Names have a **scope**: workbook (usable anywhere) or a single sheet.

Use names for the handful of key inputs (tax rate, base year, discount rate). Naming every cell makes a model harder, not easier, to audit.

### References to other sheets
`=Inputs!B2` points to B2 on the sheet called Inputs; sheet names with spaces need quotes, as in `='Rate Inputs'!B2`. Locking works the same way: `=Inputs!$B$2`.

## Worked example
Build a revenue projection grid. Inputs: base revenue of 1,000 (USD thousands) in B1; growth scenarios 3%, 5% and 7% in C3:E3; years 1 to 5 in A4:A8.

Projected revenue is

$$
R_{t} = R_0 \times (1+g)^{t}
$$

where $R_0$ is base revenue, $g$ the annual growth rate and $t$ the number of years.

**Step 1 - decide what to lock.** $R_0$ is a single cell, so lock both parts: `$B$1`. Growth rates sit in header row 3, so lock the row: `C$3`. Years sit in header column A, so lock the column: `$A4`.

**Step 2 - write one formula in C4:**
`=$B$1*(1+C$3)^$A4`

**Step 3 - copy C4 to C4:E8** (copy, select the grid, paste). Check two cells:
- E8 becomes `=$B$1*(1+E$3)^$A8` = 1,000 × 1.07^5 = 1,402.55.
- C8 becomes `=$B$1*(1+C$3)^$A8` = 1,000 × 1.03^5 = 1,159.27.

The corners of the finished grid:

| Year | 3% | 5% | 7% |
|---|---|---|---|
| 1 | 1,030.00 | 1,050.00 | 1,070.00 |
| 5 | 1,159.27 | 1,276.28 | **1,402.55** |

**Step 4 - what goes wrong without locks.** Had C4 been `=B1*(1+C3)^A4`, copying it to D5 would give `=C2*(1+D4)^B5`: every piece points to the wrong place, and the result is meaningless.

**Step 5 - add a name.** Name B1 `BaseRevenue` and rewrite C4 as `=BaseRevenue*(1+C$3)^$A4`. The grid is identical but the formula now explains itself.

## Common exam traps
- Locking both parts of a header reference (`$C$3`) so every column uses the same growth rate after copying.
- Putting the dollar sign on the wrong side: `C$3` locks the row, `$C3` locks the column.
- Pressing `F4` the wrong number of times: from `B2`, three presses gives `$B2`, column locked only.
- Choosing a name that looks like a cell address, such as `FY2024` or `TAX1`, which Excel refuses.
- Assuming cut-and-paste behaves like copy: cutting a cell moves it without changing its references, while copying adjusts relative ones.

## Key takeaways
- Relative references store directions that move with the formula.
- A dollar sign fixes the column letter or row number immediately after it.
- For grids: lock the row of header-row inputs and the column of header-column inputs.
- `F4` cycles relative → absolute → row locked → column locked.
- Named ranges act as absolute references and make key inputs self-documenting.
- Use names sparingly, for the inputs a reviewer most needs to understand.
