---
title: "Cell References and Named Ranges"
duration: 18
---

## Lecture outline
- 00:00 - Hook: copy a tax formula down 10 rows and watch it return zeros. Why?
- 02:00 - Relative references as directions ("one column left, same row")
- 04:30 - Absolute references and the dollar sign; the F4 cycle
- 07:00 - Mixed references: lock the row of header rows, the column of header columns
- 09:00 - Live build: revenue sensitivity grid from one formula
- 12:30 - Named ranges: creating, rules, scope, Name Manager
- 15:00 - Other-sheet references and cut vs copy
- 16:30 - Traps and recap

## Slides
### Slide 1: Cell References and Named Ranges
- Why formulas break when copied
- Relative, absolute and mixed references
- Naming the inputs that matter

### Slide 2: Relative = Directions
- =A1*2 in B1 means "one column left, same row"
- Copy to B7: now points at A7
- This is what makes fill-down work

### Slide 3: The Dollar Sign
- Locks whatever comes right after it
- `B2` relative, `$B$2` absolute
- `B$2` row locked, `$B2` column locked

### Slide 4: The F4 Cycle
- Press F4 while the cursor is in a reference
- `B2` → `$B$2` → `B$2` → `$B2` → `B2`
- Three presses from B2: column locked only

### Slide 5: The Grid Rule
- Single input cell: lock both
- Inputs across a header row: lock the row
- Inputs down a header column: lock the column

### Slide 6: Building the Revenue Grid
- Base revenue 1,000 in B1; growth 3%, 5%, 7% in C3:E3; years 1-5 in A4:A8
- C4: `=$B$1*(1+C$3)^$A4`
- Copy to C4:E8

### Slide 7: Checking the Grid
- E8 = 1,000 × 1.07^5 = 1,402.55
- C8 = 1,000 × 1.03^5 = 1,159.27
- Spot-check corners, not every cell

### Slide 8: Named Ranges
- Select cell, type name in Name Box, Enter
- `=BaseRevenue*(1+C$3)^$A4` reads like English
- Names behave as absolute references

### Slide 9: Naming Rules and Scope
- Start with a letter or underscore, no spaces
- Cannot look like a cell address (TAX2025, FY2024)
- Workbook vs sheet scope; manage with Ctrl+F3

### Slide 10: Other Sheets, Cut vs Copy
- =Inputs!B2 and ='Rate Inputs'!B2
- Copy adjusts relative references
- Cut moves a formula with references unchanged

### Slide 11: Traps Recap
- Over-locking header references
- Dollar sign on the wrong side
- Naming everything instead of key inputs

## Whiteboard examples
**Example 1 - Tax formula.** Pre-tax profits in B5:B14, tax rate 25% in B2. In C5 write `=B5*B2` and copy down: C6 becomes `=B6*B3`, and B3 is blank, so tax shows 0. Fix: `=B5*$B$2`. With pre-tax profit 400 in B5, tax = 400 × 0.25 = 100.

**Example 2 - Revenue grid.** Base 1,000 in B1, growth 3%/5%/7% in C3:E3, years 1-5 in A4:A8. C4: `=$B$1*(1+C$3)^$A4`. Copied values: C4 = 1,030.00; D4 = 1,050.00; E4 = 1,070.00; C8 = 1,159.27; D8 = 1,276.28; E8 = 1,402.55. Ask students to predict the formula in D6 before revealing: `=$B$1*(1+D$3)^$A6` = 1,000 × 1.05^3 = 1,157.63.

**Example 3 - Multiplication check.** Units 10, 20, 30 in A2:A4, prices 1.1, 1.2, 1.3 in C1:E1. In C2: `=$A2*C$1`, copied to C2:E4. E4 = 30 × 1.3 = 39; C3 = 20 × 1.1 = 22.

## Questions to ask students
- What does the dollar sign in `B$2` lock? (The row, 2; the column can move.)
- From B2, how many F4 presses give a reference with only the column locked? (Three.)
- In a grid with growth rates across row 3, how should the growth reference be written in C4? (`C$3`.)
- Why does Excel reject the name TAX2025? (It is a valid cell address: column TAX, row 2025.)
- If you cut C4 and paste it in H10, do its references change? (No; cut moves the formula unchanged.)

## Analogies
- A relative reference is "the house next door": it depends on where you stand. An absolute reference is a street address: it is the same wherever you are.
- The dollar sign is a pin stuck through the letter or number right after it.
- A named range is a contact in your phone: you call "BaseRevenue", not 07700 900123.

## Recording tips
- Use Show Formulas (Ctrl+backtick) after copying the grid so viewers see each formula's references shift.
- Say the F4 cycle out loud while pressing, and show the reference changing in the formula bar.
- Students often confuse which side of the dollar sign is locked; repeat the "locks what comes right after it" rule each time.
