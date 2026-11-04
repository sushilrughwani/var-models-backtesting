---
title: "Auditing Formulas and Spreadsheet Best Practice"
---

## Learning goals
- Use Trace Precedents, Trace Dependents, Show Formulas, Evaluate Formula and the Watch Window to follow a calculation.
- Find hard-coded numbers and inconsistent formulas with Go To Special and Excel's error checking.
- Build check cells, such as a balance check and a master error flag, that alert you when the model breaks.
- Lay out a workbook so that inputs, calculations and outputs are separated and formulas are consistent across rows.
- Explain why blanket `IFERROR` wrappers and hard-coded constants make models dangerous.

## Explanation

### Why auditing matters
Spreadsheet errors are rarely dramatic. A growth rate typed into a formula, a range that stops one row short, or a pasted value over a formula can survive for months because the output still looks reasonable. Everything in this course so far, from loan schedules to data tables, assumes formulas reference inputs correctly. This lesson is about proving that they do and designing workbooks where mistakes are hard to make.

### The auditing toolkit
All of these sit on the Formulas tab in the Formula Auditing group:

- **Trace Precedents** (Alt, M, P) draws arrows from the cells that feed the selected cell. Press it again to go another level back.
- **Trace Dependents** (Alt, M, D) draws arrows to the cells that use the selected cell. A key input with no dependents is a red flag: nothing is using it.
- **Remove Arrows** (Alt, M, A, A) clears the display.
- **Show Formulas** (Ctrl plus the grave-accent key, left of 1) toggles every cell between value and formula, so a row of supposedly identical formulas can be scanned in seconds.
- **Evaluate Formula** steps through a long formula one operation at a time.
- **Watch Window** keeps chosen cells, like the final NPV or a check cell, visible while you edit elsewhere.
- **Ctrl+[** jumps to a formula's direct precedents, even on another sheet.

Two more tools hunt hard-codes. **Go To Special** (F5, Special) with "Constants" and "Numbers" selected highlights every typed number; in a calculation block there should be none. And the small green triangle of **inconsistent formula** error checking flags a cell whose formula differs from its neighbours, which often means someone overwrote it.

### Check cells
Build tests into the model. A balance sheet check, `=ROUND(B20-B35,2)`, should be zero when total assets equal liabilities plus equity. A loan schedule's final balance should be zero. Cross-foot checks compare a row total with a column total, for example `=SUM(B5:F5)-SUM(G2:G10)`. Gather all checks on one sheet and summarise them with a master flag, `=IF(SUMPRODUCT(ABS(Checks!C2:C20))<0.01,"OK","ERROR")`, linked to the top of every output sheet.

Beware of `IFERROR`. Wrapping every formula as `=IFERROR(calc,0)` does not remove errors; it hides them, turning a broken lookup into a silent zero. Use it only where an error is expected and a substitute is genuinely correct.

### Structure that prevents mistakes
The best audit is a layout that makes errors visible:

- Inputs on one sheet or block, formatted as inputs (the colour convention from the formatting lesson); calculations elsewhere; outputs separate.
- One formula per row, copied across all periods, so Show Formulas reveals any exception.
- No numbers inside formulas except true constants such as 12 months or 100%.
- Calculations flow left to right and top to bottom; avoid circular references unless deliberate and controlled with a switch.
- No merged cells in calculation areas, short formulas over giant nested ones, and a cover sheet that documents purpose, sources and version.

## Worked example
A five-year revenue forecast has base revenue of 1,000 in `B5`, a growth input of 8% in `B2`, and years 1 to 5 in `C5:G5`. The forecast looks fine, but the year 5 figure seems low.

**Step 1 - trace.** Select `C5` and press Trace Precedents. An arrow comes from `B5` but none from `B2`. The growth input is not connected.

**Step 2 - show formulas.** Ctrl plus grave accent reveals `=B5*1.05` in `C5`, copied across to `=F5*1.05` in `G5`. Someone typed a 5% growth rate into the formula.

**Step 3 - quantify.** Correct revenue at 8%: 1,080.00, 1,166.40, 1,259.71, 1,360.49, 1,469.33. Hard-coded at 5%: 1,050.00, 1,102.50, 1,157.63, 1,215.51, 1,276.28. Year 3 is understated by **102.09**, year 5 by 193.05, and five-year cumulative revenue by **534.02**.

**Step 4 - fix and protect.** Replace `C5` with `=B5*(1+$B$2)` and fill right. Trace Dependents on `B2` now shows arrows to all five years. Add a check cell, `=ROUND(G5-B5*(1+B2)^5,2)`, which returns 0 when the row is consistent with the input.

**Step 5 - a second hard-code.** Go To Special, Constants, Numbers inside the forecast row finds nothing now. Had someone pasted the value 1,150 into year 3, it would light up, and the inconsistent-formula triangle would flag it too.

## Common exam traps
- Assuming a plausible output means a correct model; trace the logic, do not eyeball totals.
- Hiding errors with blanket `IFERROR(…,0)` wrappers.
- Typing assumptions inside formulas, so changing the input cell changes nothing.
- Pasting values over formulas in one period, breaking the consistency of the row.
- Building check cells but placing them where nobody looks; link a master flag to every output.

## Key takeaways
- Trace Precedents and Dependents show how cells connect; an input with no dependents is a warning.
- Show Formulas and the inconsistent-formula flag expose rows that are not uniform.
- Go To Special, Constants finds typed numbers that should be formulas.
- Check cells and a master flag turn silent errors into visible alerts.
- Separate inputs, calculations and outputs, use one formula per row, and keep numbers out of formulas.
