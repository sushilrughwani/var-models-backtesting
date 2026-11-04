---
title: "pandas Series and DataFrames"
duration: 22
---

## Lecture outline
- 00:00 - Hook: the same screen done in Excel (filters, helper columns, pivot) vs five lines of pandas
- 02:00 - Series: values + index; vectorised maths and built-in statistics; pandas std uses ddof=1
- 05:00 - DataFrames: a table of Series sharing an index; loading with `read_csv` and `index_col`
- 08:00 - Inspecting: shape, head, dtypes, info, describe; why dtypes matter
- 10:30 - Selecting: column access, `.loc` (labels, inclusive) vs `.iloc` (positions, exclusive)
- 13:30 - Filtering with `&`, `|`, `~`; calculated columns
- 16:00 - Live worked example: market cap, P/E, Tech screen, sort, groupby by sector
- 20:00 - Traps recap: `and` vs `&`, chained assignment, index not a column

## Slides
### Slide 1: pandas Series and DataFrames
- Labelled data: tickers, dates, field names
- Built on NumPy, so still vectorised
- The workhorse of financial data analysis

### Slide 2: The Series
- 1-D values plus an index
- `pe["BETA"]` looks up by label
- `.mean()`, `.std()` built in (std is sample, ddof=1)

### Slide 3: The DataFrame
- Columns are Series sharing one index
- Like a worksheet with named rows and columns
- `df.shape` excludes the index

### Slide 4: Loading Data
- `pd.read_csv("file.csv", index_col="ticker")`
- Works with files and URLs
- Check dtypes straight away

### Slide 5: Inspecting
- `head`, `tail`, `info`
- `describe()` for numeric summaries
- A text-typed price column means dirty input

### Slide 6: .loc vs .iloc
- `.loc[label, column]`: inclusive slices
- `.iloc[row_pos, col_pos]`: exclusive slices, 0-based
- `.iloc[0, 2]` → third data column

### Slide 7: Filtering
- `df[df["pe"] < 20]`
- Combine with `&`, `|`, `~`
- Parenthesise every condition

### Slide 8: Calculated Columns
- `df["mkt_cap_m"] = df["price"] * df["shares_out_m"]`
- `df["pe"] = df["price"] / df["eps"]`
- Computed for every row at once

### Slide 9: Sort and Group
- `df.sort_values("pe")`
- `df.groupby("sector")["mkt_cap_m"].sum()`
- Split → apply → combine

### Slide 10: Worked Example Results
- Tech screen: BETA (25.62), DELTA (26.67)
- Cheapest P/E: EPSI 8.00, ACME 16.81
- Tech market cap USD 35,805m

### Slide 11: Traps
- `and` instead of `&`
- Chained assignment: use `.loc[mask, col] = value`
- Counting the index as a column

## Whiteboard examples
1. **Market cap and P/E.** ACME 52.10 × 120 = **6,252.0**; P/E 52.10/3.10 = **16.81**. BETA 18.45 × 900 = 16,605.0; P/E 18.45/0.72 = **25.62**. DELTA 64.00 × 300 = 19,200.0; P/E 64.00/2.40 = **26.67**. EPSI 33.20/4.15 = **8.00**. GAMMA 101.30/5.85 = 17.32.
2. **Group totals.** Tech = BETA + DELTA = 16,605 + 19,200 = **35,805**; Energy 6,972; Industrials 6,252; Health 4,558.5.
3. **.loc vs .iloc.** Index ACME, BETA, GAMMA, DELTA, EPSI. `df.loc["BETA":"DELTA"]` → **3 rows**; `df.iloc[1:3]` → **2 rows** (BETA, GAMMA).

## Questions to ask students
- What does `df.shape` return for 5 tickers and 4 data columns with ticker as the index? ((5, 4).)
- Why does `df[(a) and (b)]` fail? (`and` needs a single boolean; Series need the element-wise `&`.)
- `df.iloc[0, 2]` with columns sector, price, shares_out_m, eps returns which field? (shares_out_m for the first row.)
- What does `pd.Series([2.0, 4.0, 6.0]).std()` give, and why does NumPy differ? (2.0; pandas uses ddof=1, NumPy ddof=0 gives 1.633.)
- How do you set a flag on filtered rows safely? (`df.loc[mask, "flag"] = 1`.)

## Analogies
- **A DataFrame is a spreadsheet where rows and columns have names, not just letters and numbers.**
- **`.loc` is calling someone by name; `.iloc` is "the third person from the left".**
- **groupby is a pivot table built from code**: split by category, aggregate, combine.

## Recording tips
- Keep the CSV visible in a side pane while loading it so students connect raw file and DataFrame.
- Show the `and` error message on screen; students will meet it in the wild and recognise it.
- When demonstrating `.iloc`, count columns out loud starting from zero and skipping the index.
