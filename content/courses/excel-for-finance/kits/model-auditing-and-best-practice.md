---
title: "Auditing Formulas and Spreadsheet Best Practice"
duration: 18
---

## Lecture outline
- 00:00 - Hook: a forecast that ignores its own growth assumption, and nobody noticed
- 02:00 - Why errors survive: plausible outputs, hidden logic
- 04:00 - Toolkit tour: precedents, dependents, Show Formulas, Evaluate Formula, Watch Window
- 08:00 - Live audit: finding and quantifying the hard-coded growth rate
- 11:00 - Hunting hard-codes: Go To Special and inconsistent-formula flags
- 13:00 - Check cells, master flag and the IFERROR trap
- 15:00 - Structure checklist: inputs, calculations, outputs
- 17:00 - Recap and quiz preview

## Slides
### Slide 1: The Model Looked Fine
- Growth input says 8%; the forecast grows at 5%
- Year 5 revenue understated by 193
- Plausible is not the same as correct
### Slide 2: Trace Precedents and Dependents
- Alt, M, P: arrows from the cells feeding this one
- Alt, M, D: arrows to the cells using this one
- An input with no dependents is a red flag
### Slide 3: See the Formulas
- Show Formulas: Ctrl plus grave accent
- Scan a row for the one formula that differs
- Evaluate Formula steps through long calculations
### Slide 4: Watch Window and Navigation
- Pin key outputs and checks while editing elsewhere
- Ctrl+[ jumps to precedents, even across sheets
- F5 returns you to where you were
### Slide 5: The Live Audit
- `C5` shows `=B5*1.05`: growth typed into the formula
- Correct year 3: 1,259.71; model: 1,157.63
- Fix: `=B5*(1+$B$2)` and fill right
### Slide 6: Hunting Hard-Codes
- F5, Special, Constants, Numbers highlights typed values
- Green triangle flags inconsistent formulas
- Calculation blocks should contain no constants
### Slide 7: Check Cells
- Balance check `=ROUND(B20-B35,2)` should be 0
- Loan schedule ends at zero; cross-foot totals agree
- Master flag shows OK or ERROR on every output
### Slide 8: The IFERROR Trap
- `=IFERROR(calc,0)` hides broken logic as zeros
- Use only where an error is expected and a substitute is correct
- Prefer to fix the cause
### Slide 9: Structure Checklist
- Inputs, calculations, outputs separated
- One formula per row, copied across
- No numbers in formulas; no merged cells in calculations
### Slide 10: Takeaways
- Trace, show, hunt, check
- Design so that errors are visible
- Audit before you present

## Whiteboard examples
1. **Hard-coded growth.** Base 1,000, input 8%, formula uses 1.05. Correct: 1,080.00, 1,166.40, 1,259.71, 1,360.49, 1,469.33. Model: 1,050.00, 1,102.50, 1,157.63, 1,215.51, 1,276.28. Differences: year 3 102.09, year 5 193.05, cumulative 534.02.
2. **Pasted value over a formula.** Growth input 6%, but year 3 has the typed value 1,150. Year 4 = 1,150 × 1.06 = 1,219.00 against the correct 1,000 × 1.06⁴ = 1,262.48, a gap of 43.48. Change the input to 10%: year 4 shows 1,265.00 against the correct 1,464.10, a gap of 199.10. The hard-code gets more wrong as inputs move.
3. **Balance check.** Total assets 1,250; liabilities 700; equity 548. Check `=ROUND(1250-(700+548),2)` = 2, so the master flag shows ERROR. Trace the equity line to find the missing 2 (for example, a dividend not deducted from retained earnings).

## Questions to ask students
- You select an input and Trace Dependents shows no arrows. What does that tell you? (No formula uses it; the model may be ignoring the assumption.)
- How do you find every typed number in a calculation block? (F5, Special, Constants, Numbers.)
- Why is `=IFERROR(VLOOKUP(...),0)` on every row risky? (It turns genuine lookup failures into silent zeros.)
- What should the balance check equal? (Zero, after rounding.)
- Why use one formula per row across all periods? (Any exception stands out with Show Formulas and the inconsistent-formula flag.)

## Analogies
- Trace Precedents is following the pipes back to the water source; if a pipe is missing, the tap is not connected to the tank you think it is.
- Check cells are smoke detectors: cheap to install, silent when all is well, loud when something burns.
- A hard-coded number in a formula is a stopped clock: right once, and increasingly wrong as everything around it moves.

## Recording tips
- Use a pre-built faulty workbook and audit it live; do not reveal the bug until the precedents arrows expose it.
- Zoom in on the formula bar and arrows; at normal zoom the trace arrows are hard to see on video.
- Finish by changing the growth input and showing the fixed model respond while the broken copy stays flat.
