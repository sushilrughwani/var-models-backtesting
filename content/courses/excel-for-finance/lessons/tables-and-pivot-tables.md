---
title: "Excel Tables and Pivot Tables"
---

## Learning goals
- Convert a data range into an Excel Table and explain why tables make formulas more robust.
- Write structured references such as `Trades[Fee]` and `[@Notional]` in calculated columns and summary formulas.
- Build a pivot table that summarises data by two dimensions, and show values as a percentage of the total.
- Retrieve pivot results safely with `GETPIVOTDATA` and keep pivots up to date with Refresh.
- Recognise when a pivot's built-in average gives a misleading answer for rates.

## Explanation

### Why Tables beat plain ranges
A plain range is just cells. An Excel Table (select the data and press Ctrl+T) is an object with a name, headers and rules. Four benefits matter in finance work. First, tables expand automatically: paste a new row underneath and every formula, chart and pivot that points at the table includes it. Second, formulas entered in a column fill down instantly as a calculated column, so no row is left with a stale formula. Third, references use names instead of coordinates, which makes formulas readable. Fourth, banded rows and a filter row come for free.

Name every table on the Table Design tab. A name like `Trades` beats the default `Table1` when you read formulas months later.

### Structured references
Inside the table, `[@Notional]` means "the Notional value on this row". Outside it, `Trades[Notional]` means "the whole Notional column". Some examples:

- Calculated column: `=[@Notional]*[@FeeBps]/10`
- Column total: `=SUM(Trades[Fee])`
- Conditional total: `=SUMIFS(Trades[Notional], Trades[Desk], "Credit", Trades[Region], "Americas")`
- Count of rows: `=ROWS(Trades)`

Because the references point at columns rather than fixed cell ranges like `D2:D9`, they never miss new rows, and the earlier lessons' worries about absolute versus relative references largely disappear.

### Pivot tables
A pivot table summarises a table without a single formula. Click inside the table, choose Insert, PivotTable, and drag fields into four areas: Rows (categories down the side), Columns (categories across the top), Values (the numbers to aggregate) and Filters (a page-level selector). Each value field has a summary function (Sum, Count, Average, Max) and a display option. "Show Values As, % of Grand Total" turns amounts into shares without any extra column.

Two practical rules. Pivots do not recalculate automatically when source data change; press Alt+F5 (Refresh) or Ctrl+Alt+F5 (Refresh All). And when another sheet needs a pivot number, use `GETPIVOTDATA` rather than a plain cell link, because the pivot layout can shift when data change:

`=GETPIVOTDATA("Fee", $A$3, "Desk", "Credit", "Region", "EMEA")`

The second argument is any cell inside the pivot; the remaining pairs name the field and item you want.

## Worked example
A trading desk logs eight trades in a table named `Trades` with columns Trade, Desk, Region, Notional (USD m) and FeeBps:

| Trade | Desk | Region | Notional | FeeBps |
|---|---|---|---|---|
| T1 | Rates | EMEA | 12 | 8 |
| T2 | Credit | Americas | 8 | 15 |
| T3 | FX | EMEA | 15 | 3 |
| T4 | Rates | Americas | 10 | 9 |
| T5 | Credit | EMEA | 6 | 12 |
| T6 | FX | Americas | 9 | 4 |
| T7 | Rates | EMEA | 7 | 7 |
| T8 | Credit | Americas | 11 | 14 |

**Step 1 - calculated column.** Add a column Fee (USD thousands). One basis point is 1/10,000, so the fee in millions is Notional × FeeBps / 10,000, and in thousands it is Notional × FeeBps / 10. Type `=[@Notional]*[@FeeBps]/10` once; the table fills it for all rows: 9.6, 12.0, 4.5, 9.0, 7.2, 3.6, 4.9, 15.4.

**Step 2 - totals.** `=SUM(Trades[Fee])` = 66.2 thousand. `=SUM(Trades[Notional])` = 78 million. `=SUMIFS(Trades[Notional], Trades[Desk], "Credit", Trades[Region], "Americas")` = 19.

**Step 3 - pivot.** Desk in Rows, Region in Columns, Sum of Fee in Values:

| Desk | Americas | EMEA | Total |
|---|---|---|---|
| Credit | 27.4 | 7.2 | 34.6 |
| FX | 3.6 | 4.5 | 8.1 |
| Rates | 9.0 | 14.5 | 23.5 |
| Total | 40.0 | 26.2 | 66.2 |

**Step 4 - shares.** Add Fee to Values a second time and show it as % of Grand Total: Credit **52.27%**, FX 12.24%, Rates 35.50%. Credit earns over half the fees on only 25 of 78 million of notional.

**Step 5 - the average trap.** Adding "Average of FeeBps" shows 9.00 bps, a simple average of eight rates. The fee actually earned per unit of notional is 66.2 / 78 × 10 = **8.49 bps**, because the large FX trades carry low fees. Weighted rates need a calculated ratio, not a pivot average.

## Common exam traps
- Forgetting to refresh a pivot after editing the source, then reporting stale totals.
- Linking to pivot cells with `=C5` instead of `GETPIVOTDATA`; the link breaks when the layout changes.
- Using "Average of" a rate field when a weighted average is required.
- Pointing a pivot at a fixed range such as `A1:E9` instead of the table, so new rows are ignored.
- Mixing text and numbers in a column (for example "12m"), which makes the pivot count rather than sum.

## Key takeaways
- Ctrl+T turns a range into a named, self-expanding table.
- `[@Column]` refers to the current row; `Table[Column]` refers to the whole column.
- Pivot tables summarise by Rows, Columns, Values and Filters, with no formulas required.
- Show Values As converts totals into shares of the grand, row or column total.
- Refresh pivots after data changes and fetch their numbers with `GETPIVOTDATA`.
- Compute weighted rates from summed numerators and denominators, not with a pivot average.
