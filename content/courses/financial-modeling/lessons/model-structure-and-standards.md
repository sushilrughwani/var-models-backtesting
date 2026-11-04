---
title: "Model Structure and Design Standards"
---

## Learning goals
- Explain why a model separates inputs, calculations and outputs.
- Apply standard formatting conventions for inputs, formulas and links.
- Build a forecast row that references input cells instead of hard-coded numbers.
- Identify structural flaws that make a model hard to audit or easy to break.

## Explanation

### Why structure matters
A model is read far more often than it is written. Your manager, a lender's analyst or you in six months must be able to follow it quickly. In the previous lesson we saw that one assumption ripples through all three statements; good structure is what makes those ripples traceable. Poor structure is the main source of spreadsheet errors: hidden hard-codes, inconsistent formulas across a row and inputs scattered across many sheets.

### Inputs, calculations, outputs
The core principle is a one-way flow:

1. **Inputs** (assumptions): every number you type in, such as growth rates, margins, days, tax rate and interest rates. Keep them together on an assumptions sheet or in a clearly marked block.
2. **Calculations**: schedules and statements built only from formulas that point to inputs or to other calculations.
3. **Outputs**: summary tables, ratios, valuation results, charts and checks.

Data should flow from inputs to outputs, and formulas should generally read left to right and top to bottom. If you want to change an assumption, there must be exactly one cell to change.

### Formatting conventions
The most common convention, used across banks and research teams:

- **Blue font**: hard-coded inputs and historical data.
- **Black font**: formulas calculated on the same sheet.
- **Green font**: formulas that link to another sheet.
- A light yellow fill or border for key assumption cells is also common.

Other standards: one consistent timeline across every sheet (the same year in the same column everywhere), a units label on every row (USD m, %, days), historical and forecast columns visibly separated (often an "A" or "E" suffix: FY2025A, FY2026E) and a consistent sign convention (for example, costs shown as positive numbers and subtracted, or shown as negatives and summed; never a mixture).

### One formula per row
Within a forecast row, every column should contain the same formula, copied across. That makes the row easy to audit: check one cell and you have checked them all. It also makes absolute and relative references matter. For Northwind, with FY2025 revenue in column D, forecast years in E to G and growth inputs on row 5, the revenue formula in E8 is `=D8*(1+E5)`, copied across to G8. If a single growth rate applied to all years in cell C5, you would anchor it: `=D8*(1+$C$5)`.

Avoid formulas such as `=D8*1.08`. The 8% is invisible, cannot be flexed from the assumptions sheet and will be forgotten when assumptions change.

### Scenarios and switches
A scenario switch lets you flip between cases without rewriting formulas. Put the case number in one input cell (say `C3`, where 1 = base, 2 = upside, 3 = downside) and choose the live assumption with `=CHOOSE($C$3,E20,E21,E22)`. Every downstream calculation then uses the live row.

### Keep it simple
Prefer short formulas you can read aloud. Split long nested formulas into helper rows. Avoid merged cells, hidden rows and links to external workbooks. Use named ranges sparingly and consistently. Put all checks (balance check, cash check) on one checks summary so a single cell tells you whether the model is healthy.

## Worked example
**Scenario.** You inherit a Northwind revenue row. FY2025A revenue is 500.0 (USD m) in D8. The forecast cells contain `=D8*1.092`, `=E8*1.08` and `=F8*1.07`.

**Step 1: diagnose.** The growth rates are buried inside formulas, so the row cannot be flexed from the assumptions block. Each cell has a different formula, so auditing one cell tells you nothing about the others.

**Step 2: restructure.** Type the growth inputs in blue on row 5: E5 = 9.2%, F5 = 8.0%, G5 = 7.0%. Replace the forecast with one formula in E8, `=D8*(1+E5)`, copied to G8.

**Step 3: verify the numbers.**
- FY2026E = 500.0 × 1.092 = 546.0
- FY2027E = 546.0 × 1.080 = 589.68, shown as 589.7
- FY2028E = 589.68 × 1.070 = 630.96, shown as **631.0**

**Step 4: add a scenario.** Put downside growth of 4% for every year on row 22 and set the switch to 3. FY2028E revenue becomes 500.0 × 1.04³ = 562.4, recalculated instantly with no formula edits.

The output is identical to the original in the base case, but now the model is transparent, consistent and flexible.

## Common exam traps
- Hard-coding a number inside a formula. It produces the right answer today and the wrong answer after the next assumption change.
- Using a different formula in one column of a forecast row (a "broken row"), often to force a desired result.
- Forgetting to anchor a single assumption with absolute references, so the reference drifts when copied.
- Mixing sign conventions, so that some costs are subtracted twice.
- Mixing units, such as thousands on one sheet and millions on another, or growth typed as 8 instead of 8%.

## Key takeaways
- Data flows one way: inputs, then calculations, then outputs.
- Blue for inputs, black for formulas, green for links to other sheets.
- Every assumption lives in exactly one cell; formulas reference it.
- Use one consistent formula per row and one timeline across all sheets.
- A scenario switch and a central checks summary make a model flexible and trustworthy.
