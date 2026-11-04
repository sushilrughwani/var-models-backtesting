---
title: "Automating Excel Reports With Python"
duration: 18
---

## Lecture outline
- 00:00 - Hook: the monthly risk pack that takes half a day by hand and 3 seconds as a script
- 02:00 - Reading Excel: `read_excel`, `sheet_name=None`, `index_col`
- 04:00 - Writing Excel: `ExcelWriter`, multiple sheets, openpyxl formatting
- 07:00 - Live code: `make_prices` → `build_report` → three-sheet workbook
- 10:00 - Reconciliation check and the missing-January bug (whiteboard)
- 13:00 - One function, many reports: loop with `pathlib` and f-strings
- 15:30 - Exam traps
- 17:00 - Recap and homework

## Slides
### Slide 1: Automating Excel Reports With Python
- Python does the work; Excel is the delivery format
- Same output every time, in seconds
- Auditable: the script is the documentation

### Slide 2: Reading Excel
- `pd.read_excel("file.xlsx", sheet_name="Prices", index_col=0)`
- `sheet_name=None` → dict of all sheets
- `usecols`, `skiprows` for messy layouts

### Slide 3: Writing Several Sheets
- `with pd.ExcelWriter(path, engine="openpyxl") as xl:`
- `df.to_excel(xl, sheet_name="Summary")`
- File is saved when the `with` block ends

### Slide 4: Formatting With openpyxl
- `ws = xl.sheets["Summary"]`
- `cell.number_format = "0.00%"`
- `ws.column_dimensions["A"].width = 14`

### Slide 5: Report Structure
- Get data → calculate → present
- Inputs as function parameters
- Return the summary for logging or testing

### Slide 6: Our Report
- Summary: last price, YTD return, annual vol, worst day
- Monthly: six monthly returns per ticker
- Prices: raw data for audit

### Slide 7: Reconciliation
- Monthly returns must compound to YTD
- `np.allclose((1 + monthly).prod() - 1, ytd)`
- Fail loudly before anyone sees bad numbers

### Slide 8: The Missing-First-Month Bug
- `resample("ME").last().pct_change()` drops January
- Fix: `pd.concat([prices.iloc[:1], month_end])`
- Reconciliation would catch it

### Slide 9: Many Reports in a Loop
- `for desk, seed in {...}.items():`
- `Path("reports") / f"{desk}_risk_2026-06-30.xlsx"`
- One function, unlimited reports

### Slide 10: Key Takeaways
- read_excel / to_excel / ExcelWriter
- Format with openpyxl; values stay full precision
- Parameterise, loop, reconcile

## Whiteboard examples
1. **Missing January.** Prices: 100 (2 Jan), 104 (30 Jan), 101 (27 Feb), 107 (31 Mar).
   - Naive monthly returns: Feb 101/104 − 1 = −2.88%, Mar 107/101 − 1 = +5.94%; compounding gives only 2.88%.
   - With the start price: Jan 104/100 − 1 = +4.00%.
   - Check: 1.04 × 0.9712 × 1.0594 − 1 = 7.00% = 107/100 − 1.
2. **Percent format trap.** Stored 0.0699 with `"0.00%"` → shows 6.99%. Stored 7.25 with `"0.00%"` → shows 725.00%.
3. **Quarter reconciliation.** Monthly 4%, −2%, 3% → 1.04 × 0.98 × 1.03 − 1 = 4.98% (not 5.00%).

## Questions to ask students
- What type does `read_excel(..., sheet_name=None)` return? (A dictionary of DataFrames keyed by sheet name)
- When is the Excel file actually written? (When the `with pd.ExcelWriter(...)` block exits)
- Does setting `number_format` round the stored number? (No, it only changes the display)
- Why pass the file path into `build_report` rather than hard-coding it? (So the same function can create reports for any desk or date)
- What check would catch a missing month? (Compounding monthly returns and comparing with the period return)

## Analogies
- The script is a recipe and the workbook is the dish: anyone can cook it again and get the same result.
- Number formats are like a currency display setting on a banking app: the balance does not change, only how it is shown.
- A reconciliation check is a smoke alarm: silent when all is well, loud the moment something burns.

## Recording tips
- Open the generated workbook in Excel on screen right after running the script so students see the formatted Summary sheet.
- Demonstrate the missing-January bug live, then the failed reconciliation, then the fix.
- Mention that pandas needs openpyxl installed to read and write `.xlsx`; show the error message students get if it is missing.
