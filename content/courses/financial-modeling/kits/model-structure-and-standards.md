---
title: "Model Structure and Design Standards"
duration: 18
---

## Lecture outline
- 00:00 - Hook: a famous-style story of a spreadsheet error caused by one hard-coded cell (keep it generic)
- 02:00 - Why structure: models are read more than written
- 04:00 - Inputs, calculations, outputs and one-way flow
- 06:30 - Formatting conventions: blue, black, green; units; timeline; signs
- 09:00 - One formula per row; relative versus absolute references
- 11:00 - Whiteboard: fixing Northwind's broken revenue row
- 14:30 - Scenario switches with CHOOSE and a checks summary
- 16:30 - Recap and traps

## Slides
### Slide 1: Models Are Read, Not Just Written
- Reviewers, lenders, your future self
- Structure prevents errors and speeds audits
- Most spreadsheet errors are structural
### Slide 2: Inputs, Calculations, Outputs
- Inputs: every typed number, in one place
- Calculations: formulas only
- Outputs: summaries, valuation, charts, checks
### Slide 3: Formatting Conventions
- Blue font: hard-coded inputs and historicals
- Black font: formulas on the same sheet
- Green font: links to other sheets
### Slide 4: Timeline, Units and Signs
- Same year in the same column on every sheet
- FY2025A versus FY2026E labels
- Units on every row; one sign convention
### Slide 5: One Formula per Row
- Same formula copied across all forecast columns
- Check one cell, check the whole row
- No "broken" columns
### Slide 6: References
- Relative: `=D8*(1+E5)` moves with the column
- Absolute: `=D8*(1+$C$5)` stays locked on one input
- Never `=D8*1.08`
### Slide 7: Fixing the Northwind Revenue Row
- Growth inputs 9.2%, 8.0%, 7.0% moved to row 5
- One formula copied across
- FY2028E revenue 631.0 (USD m)
### Slide 8: Scenario Switch
- Case selector in one cell: 1 base, 2 upside, 3 downside
- `=CHOOSE($C$3,E20,E21,E22)` feeds the live row
- Downside 4% growth: FY2028E 562.4
### Slide 9: Checks Summary
- Balance check, cash check, debt checks
- One master cell: zero means healthy
### Slide 10: Key Takeaways
- One-way flow, one cell per assumption
- Consistent formatting, timeline and formulas
- Switches and checks build trust

## Whiteboard examples
**Example 1: Restructure the revenue row.** Original: `=D8*1.092`, `=E8*1.08`, `=F8*1.07`. Move growth to E5:G5 (blue). New formula in E8 `=D8*(1+E5)` copied right. Values: 500.0 × 1.092 = 546.0; × 1.08 = 589.68; × 1.07 = 630.96, about 631.0.

**Example 2: Reference drift.** A single growth input of 6% sits in C5. An analyst writes `=D8*(1+C5)` in E8 and copies it right. In F8 the formula becomes `=E8*(1+D5)`, pointing at an empty or wrong cell, so FY2027E growth is zero. Fix: `=D8*(1+$C$5)`.

**Example 3: Scenario switch.** Base growth row 20, upside row 21, downside row 22 (4% each year). Set C3 = 3. FY2028E = 500.0 × 1.04³ = 562.4.

## Questions to ask students
- What colour font should a typed historical revenue figure have? (Blue: it is a hard-coded input.)
- Why is `=D8*1.08` dangerous? (The 8% is hidden and will not update when assumptions change.)
- When do you need a dollar sign in a cell reference? (When the formula must keep pointing at one fixed input cell while being copied.)
- If the case selector is 2 and the options are base, upside, downside, which row is live? (Upside.)
- Where should all checks be gathered? (On one checks summary feeding a single master check.)

## Analogies
- Inputs, calculations and outputs are like a kitchen: the pantry (inputs), the stove (calculations) and the plate (outputs). You never cook inside the pantry.
- A hard-coded number in a formula is a sticky note hidden inside a machine; nobody knows it is there until something breaks.
- A scenario switch is a railway points lever: one movement sends the whole train down a different track.

## Recording tips
- Show the broken and the fixed row side by side in Excel with formula view on (Ctrl + backtick).
- Emphasise the colour convention visually; students remember colours better than rules.
- Demonstrate reference drift live by copying a formula without the dollar signs.
