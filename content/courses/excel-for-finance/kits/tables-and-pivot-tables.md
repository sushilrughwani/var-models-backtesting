---
title: "Excel Tables and Pivot Tables"
duration: 22
---

## Lecture outline
- 00:00 - Hook: a month-end report that silently missed the last 40 rows of data
- 02:00 - Ranges versus Tables: Ctrl+T, naming, auto-expansion
- 05:00 - Structured references: `[@Column]` and `Table[Column]`
- 08:00 - Live build: Trades table, Fee calculated column, SUMIFS on columns
- 11:00 - Pivot tables: Rows, Columns, Values, Filters
- 15:00 - Show Values As, Refresh and GETPIVOTDATA
- 18:00 - The weighted-average trap
- 20:00 - Recap and quiz preview

## Slides
### Slide 1: The Missing Rows
- `=SUM(D2:D500)` does not see row 501
- Tables grow with the data
- Formulas, charts and pivots follow automatically
### Slide 2: Create and Name a Table
- Select data, press Ctrl+T, confirm headers
- Rename on Table Design: `Trades`, not `Table1`
- Free banding, filters and a total row
### Slide 3: Structured References
- `[@Notional]`: this row's value
- `Trades[Notional]`: the whole column
- Readable and immune to inserted rows
### Slide 4: Calculated Columns
- `=[@Notional]*[@FeeBps]/10` gives fees in thousands
- Entered once, filled for every row
- New rows inherit the formula
### Slide 5: Summary Formulas
- `=SUM(Trades[Fee])` gives 66.2
- `=SUMIFS(Trades[Notional], Trades[Desk], "Credit", Trades[Region], "Americas")` gives 19
- Same logic as before, clearer syntax
### Slide 6: Pivot Table Anatomy
- Rows, Columns, Values, Filters
- Value field settings: Sum, Count, Average
- Drag and drop, no formulas
### Slide 7: Fees by Desk and Region
- Credit 34.6, FX 8.1, Rates 23.5
- Americas 40.0, EMEA 26.2, total 66.2
- % of Grand Total: Credit 52.27%
### Slide 8: Keeping Pivots Honest
- Pivots do not auto-update: Alt+F5 or Ctrl+Alt+F5
- Use `GETPIVOTDATA` for links from other sheets
- Base pivots on tables, not fixed ranges
### Slide 9: The Average Trap
- Pivot Average of FeeBps: 9.00 bps
- Weighted fee rate: 66.2 / 78 × 10 = 8.49 bps
- Divide summed fees by summed notional
### Slide 10: Takeaways
- Tables for data, pivots for summaries
- Structured references for readable formulas
- Refresh, GETPIVOTDATA, weighted averages

## Whiteboard examples
1. **Fee arithmetic.** Notional 12 million at 8 bps: 12,000,000 × 0.0008 = 9,600 = 9.6 thousand, which matches `=[@Notional]*[@FeeBps]/10` = 12 × 8 / 10. Repeat for T8: 11 × 14 / 10 = 15.4.
2. **Pivot by hand.** From the eight trades, Credit Americas = T2 + T8 = 12.0 + 15.4 = 27.4; Rates EMEA = T1 + T7 = 9.6 + 4.9 = 14.5. Grand total 66.2; Credit share 34.6 / 66.2 = 52.27%.
3. **Weighted versus simple average.** Simple average fee = (8 + 15 + 3 + 9 + 12 + 4 + 7 + 14) / 8 = 9.00 bps. Weighted = Σ(notional × bps) / Σ notional = 662 / 78 = 8.49 bps. The difference comes from the 15 million FX trade at 3 bps.

## Questions to ask students
- What does `[@FeeBps]` refer to? (The FeeBps value in the same row as the formula.)
- You add a new trade below the table. Does `=SUM(Trades[Fee])` include it? (Yes, the table expands automatically.)
- The source data changed but the pivot did not. Why? (Pivots need a manual Refresh.)
- Why use `GETPIVOTDATA` instead of `=C5`? (The pivot layout can move; GETPIVOTDATA finds the value by field and item names.)
- A pivot shows "Average of Yield" across bonds of very different size. What is wrong? (It is an unweighted average; use summed income over summed principal.)

## Analogies
- A Table is a filing cabinet with labelled drawers; a range is a pile of paper on the desk.
- A pivot table is a sorting machine: drop in the data, choose which labels form the bins, and it totals each bin.
- `GETPIVOTDATA` is asking for a book by its title rather than by "third shelf, fifth book", which breaks as soon as someone rearranges the shelf.

## Recording tips
- Paste a new row under the table on camera and watch the totals and pivot (after refresh) pick it up.
- Use the PivotTable Fields pane slowly: drag one field at a time and narrate what changes.
- End on the weighted-average trap; it is the mistake viewers are most likely to have made in real reports.
