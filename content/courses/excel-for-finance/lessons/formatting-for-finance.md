---
title: "Formatting Conventions for Financial Work"
---

## Learning goals
- Apply consistent number formats for amounts, percentages, multiples and dates.
- Use the standard colour convention to separate inputs, formulas and links.
- Write custom number formats with positive, negative, zero and text sections.
- Distinguish a cell's displayed value from its stored value and avoid rounding surprises.

## Explanation

### Formatting is communication, not decoration
A reader of a financial model needs to answer three questions about every number in seconds: what unit is it in, is it an input or a calculation, and is it positive or negative? Good formatting answers all three without anyone opening the formula bar. Bad formatting (eight decimals here, none there, inputs buried among formulas) makes errors invisible.

### Number format conventions
- **Amounts**: thousands separators, no decimals for large values, and the unit stated once in the row or column header ("USD thousands"), not repeated in every cell.
- **Negatives in parentheses**: (7,890) is easier to spot than −7,890 and is standard in financial statements.
- **Percentages**: one decimal is usually enough, `0.0%`. Remember that 7.5% is stored as 0.075; typing 7.5 into a percent-formatted cell gives 750%.
- **Multiples**: valuation ratios read best as `0.0x`, so 8.25 displays as 8.3x.
- **Dates and periods**: a consistent format such as `dd-mmm-yy`, and column headers like 2025A and 2026E for actual and estimated years.
- **Alignment**: numbers right-aligned so decimal places line up; avoid merged cells (use Center Across Selection instead), because merges break selection and copying.

### Colour conventions
The most widely used convention in banking and corporate finance:

| Font colour | Meaning |
|---|---|
| Blue | Hard-coded input or historical data typed in |
| Black | Formula calculated on the same sheet |
| Green | Formula linking to another sheet |
| Red (or flagged) | Link to another file, or a check that has failed |

Many teams also give input cells a light fill. The convention matters more than the exact palette: pick one, document it on a cover sheet and apply it everywhere. A blue number in a formula row instantly tells a reviewer that someone has overwritten a calculation.

### Custom number formats
Open Format Cells with `Ctrl+1`, choose Custom, and type a code. A custom format can have up to four sections separated by semicolons:

`positive ; negative ; zero ; text`

Useful building blocks:
- `0` forces a digit, `#` shows a digit only if needed, `,` between digits adds a thousands separator.
- A **trailing comma scales by 1,000**: `#,##0,` shows 12,456,700 as 12,457; two trailing commas scale by a million.
- Text in quotes is displayed literally: `0.0"x"` gives 8.3x; `0"E"` turns 2026 into 2026E.
- A typical finance amount format: `#,##0;(#,##0);"-"`, which shows negatives in parentheses and zeros as a dash.

### Displayed vs stored value
Formatting changes only what you see. A cell holding 2.4 formatted with no decimals displays 2, but every formula still uses 2.4. Three such cells sum to 7.2, displayed as 7, so the column appears to add 2 + 2 + 2 = 7. If displayed figures must add up exactly (for example in a published table), round deliberately with `=ROUND(A1,0)` rather than relying on formatting.

## Worked example
An income statement extract arrives in raw units: Revenue 12,456,700 in B2, cost of goods sold −7,890,250 in B3, gross profit `=B2+B3` in B4, and gross margin `=B4/B2` in B5. Present it in USD thousands.

**Step 1 - inputs vs formulas.** B2 and B3 are typed historical figures: blue font. B4 and B5 are formulas: black font.

**Step 2 - amount format.** Apply `#,##0,;(#,##0,);"-"` to B2:B4 and write "USD thousands" in the header. Display:
- Revenue: 12,456,700 / 1,000 = 12,456.7, shown as **12,457**
- COGS: −7,890.25 thousand, shown as **(7,890)**
- Gross profit: 12,456,700 − 7,890,250 = 4,566,450, i.e. 4,566.45 thousand, shown as **4,566**

**Step 3 - margin.** Gross margin = 4,566,450 / 12,456,700 = 0.36659. Format `0.0%` displays **36.7%**.

**Step 4 - spot the footing issue.** A reader adding the displayed numbers gets 12,457 − 7,890 = 4,567, yet the sheet shows 4,566. Nothing is wrong: the stored values are exact and each display is rounded separately. Either add a note that figures may not sum due to rounding, or, for a published table, base the displayed lines on `ROUND` so they foot.

**Step 5 - switch to millions.** Changing the format to `#,##0.0,,;(#,##0.0,,)` shows 12.5, (7.9) and 4.6, with no formula changes at all.

## Common exam traps
- Typing 7.5 into a cell already formatted as a percentage and getting 750%, or treating a displayed 7.5% as the number 7.5 in a formula.
- Dividing source data by 1,000 with formulas to show thousands, when a trailing comma in the format does it without altering stored values.
- Mixing up the section order: positive comes first, then negative, then zero, then text.
- Assuming a column of rounded displays must add up exactly; display rounding is applied cell by cell.
- Colouring formulas blue: blue signals a hard-coded input, so a blue formula misleads every reviewer.

## Key takeaways
- State units once in headers and keep decimals consistent within a block.
- Blue for inputs, black for formulas, green for links to other sheets.
- Custom formats have up to four sections: positive; negative; zero; text.
- A trailing comma scales the display by 1,000 without changing the value.
- Formatting changes the display only; use `ROUND` when the stored value itself must change.
