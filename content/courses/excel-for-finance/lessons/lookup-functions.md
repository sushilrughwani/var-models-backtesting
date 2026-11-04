---
title: "Lookup Functions: XLOOKUP, INDEX and MATCH"
---

## Learning goals
- Retrieve values from a table with XLOOKUP using exact and approximate matching.
- Build the INDEX and MATCH combination and explain why it is robust.
- Perform two-way lookups by row and column headers.
- Recognise the weaknesses of VLOOKUP and the errors that lookups produce.

## Explanation

### What a lookup does
A lookup answers "find this key in one list and give me the matching item from another list": the price for a ticker, the yield for a rating, the fee rate for an account size. Hard-coding those values is fragile; looking them up from a single source table means one change updates every formula.

### Why not VLOOKUP?
`=VLOOKUP(key, table, col_index, FALSE)` still works, but it has three weaknesses. It can only look to the right of the key column. Its column number is a hard-coded count, so inserting a column inside the table silently returns the wrong field. And its default (if you omit the last argument) is approximate match, which on unsorted data returns plausible but wrong answers.

### XLOOKUP (Microsoft 365 and Excel 2021)
`=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])`

- `lookup_array` and `return_array` are separate ranges, so the return column can be anywhere, including to the left.
- Default matching is **exact**. A missing key returns #N/A unless you supply `if_not_found`, for example `"Not found"`.
- `match_mode`: `0` exact (default), `-1` exact or next smaller, `1` exact or next larger, `2` wildcard (`*` and `?`).
- `search_mode`: `1` first to last (default), `-1` last to first, useful for finding the most recent entry.

### INDEX and MATCH (works in every version)
`MATCH(lookup_value, lookup_range, 0)` returns the **position** of the key in a one-row or one-column range. `INDEX(range, row_num, [col_num])` returns the item at a given position. Combined:

`=INDEX(return_range, MATCH(key, lookup_range, 0))`

Because both ranges are referenced directly, inserting columns does not break the formula. The third argument of MATCH matters: `0` is exact match; `1` (the default) finds the largest value less than or equal to the key and requires ascending order; `-1` requires descending order.

### Two-way lookups
To pick a value at the intersection of a row header and a column header, use two MATCHes inside INDEX:

`=INDEX(data, MATCH(row_key, row_headers, 0), MATCH(col_key, col_headers, 0))`

or nest XLOOKUPs: the inner one returns a whole column, and the outer one picks the row from it.

### Approximate matching for tiers
Tax brackets, fee schedules and rating bands are stored as lower thresholds. An exact match would fail for most values, so use XLOOKUP with `match_mode` `-1`, or MATCH type `1` on a sorted list, to find the band whose threshold is the largest one not exceeding the value.

## Worked example
**Part 1 - two-way yield lookup.** A yield grid (in %) has ratings in A2:A5 and maturities in years in B1:E1:

| Rating | 2 | 5 | 7 | 10 |
|---|---|---|---|---|
| AAA | 3.10 | 3.45 | 3.70 | 3.95 |
| AA | 3.30 | 3.70 | 3.95 | 4.20 |
| A | 3.55 | 3.95 | 4.25 | 4.50 |
| BBB | 4.05 | 4.55 | 4.85 | 5.20 |

Find the yield for an A-rated, 7-year bond. Rating in H1 ("A"), maturity in H2 (7).

`=INDEX(B2:E5, MATCH(H1, A2:A5, 0), MATCH(H2, B1:E1, 0))`

- `MATCH("A", A2:A5, 0)` = 3 (third rating).
- `MATCH(7, B1:E1, 0)` = 3 (third maturity).
- `INDEX(B2:E5, 3, 3)` = **4.25%**.

The XLOOKUP equivalent is `=XLOOKUP(H1, A2:A5, XLOOKUP(H2, B1:E1, B2:E5))`: the inner XLOOKUP returns the 7-year column D2:D5, and the outer one picks the A row from it.

**Part 2 - tiered fee.** A fee table lists lower AUM thresholds in A9:A12 (0; 1,000,000; 5,000,000; 20,000,000) and flat annual rates in B9:B12 (1.00%, 0.80%, 0.60%, 0.40%). A client has AUM of 7,500,000 in H4.

`=XLOOKUP(H4, A9:A12, B9:B12, , -1)`

- No threshold equals 7,500,000 exactly, so mode `-1` takes the next smaller threshold, 5,000,000, and returns 0.60%.
- Fee = 7,500,000 × 0.60% = **45,000**.

With exact matching (the default), the same formula would return #N/A.

## Common exam traps
- Forgetting the `0` in MATCH: the default type 1 performs approximate matching and can return the wrong row on unsorted data.
- Leaving VLOOKUP's last argument blank, which also defaults to approximate match.
- Using exact match on a threshold table, which returns #N/A for every value between thresholds.
- Return and lookup ranges of different sizes in XLOOKUP, which produces #VALUE!.
- Trailing spaces or numbers stored as text in the key column, making an apparently present key "not found".

## Key takeaways
- XLOOKUP defaults to exact match and can return from any column, left or right.
- INDEX/MATCH works in every Excel version and survives inserted columns.
- Two MATCHes inside INDEX give a two-way lookup.
- Tier tables need approximate matching: XLOOKUP mode -1 or MATCH type 1 on sorted data.
- Use `if_not_found` or IFNA to handle missing keys deliberately.
