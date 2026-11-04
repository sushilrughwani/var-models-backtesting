---
title: "Automating Excel Reports With Python"
---

## Learning goals
- Read Excel workbooks into pandas, including several sheets at once.
- Write multi-sheet Excel reports with `pd.ExcelWriter` and format them with openpyxl.
- Wrap a report in a reusable function and generate many reports in a loop.
- Build reconciliation checks into a report so errors are caught automatically.

## Explanation

### Why automate?
Many finance teams rebuild the same spreadsheet every month: paste in prices, drag formulas, fix formats, email it. It is slow, and every manual step is a chance for error. A Python script does the same job in seconds, identically every time, and leaves an auditable record of exactly what was calculated. Excel remains the delivery format because that is what readers use; Python does the work behind it.

### Reading Excel
`pd.read_excel(path, sheet_name=...)` reads a sheet into a DataFrame. Useful arguments:
- `sheet_name=None` reads every sheet and returns a dictionary of DataFrames keyed by sheet name.
- `index_col=0` uses the first column as the index (dates, tickers).
- `usecols` and `skiprows` handle messy layouts with titles or notes above the table.

pandas relies on the **openpyxl** package to read and write `.xlsx` files, so it must be installed alongside pandas.

### Writing Excel
`df.to_excel(writer, sheet_name=...)` writes one DataFrame. To put several tables in one workbook, open a `pd.ExcelWriter` in a `with` block; the file is saved when the block ends. Inside the block, `writer.sheets["Name"]` gives the underlying openpyxl worksheet, which you can format: number formats such as `"0.00%"`, column widths, fonts and so on. Formatting changes only how values are displayed; the stored numbers remain full precision.

### Designing a repeatable report
Good report code separates three jobs:
1. **Get data** (`make_prices` here; in practice a database query or a file drop).
2. **Calculate** (returns, volatility, monthly table) using the techniques from earlier lessons.
3. **Present** (write sheets, apply formats).

Putting steps 2 and 3 in a function with the inputs as parameters means the same code can produce a report for any desk, date or portfolio.

### Reconciliation checks
Automated reports should check themselves. Here the monthly returns must compound to the year-to-date return. If they do not, something is wrong (a missing month, a bad price) and the script can stop before anyone sees a wrong number.

### The code
Synthetic prices for three tickers over the first half of 2026, a summary sheet with percentage formats, a monthly returns sheet and the raw prices:

```python
import numpy as np
import pandas as pd
from openpyxl.utils import get_column_letter

def make_prices(seed=3):
    rng = np.random.default_rng(seed)
    dates = pd.bdate_range("2026-01-01", "2026-06-30")
    rets = rng.normal(0.0004, [0.010, 0.015, 0.020], size=(len(dates), 3))
    return pd.DataFrame(100 * np.exp(np.cumsum(rets, axis=0)),
                        index=dates, columns=["ALPHA", "BETA", "GAMMA"])

def build_report(prices, path):
    rets = prices.pct_change().dropna()
    month_end = prices.resample("ME").last()
    monthly = pd.concat([prices.iloc[:1], month_end]).pct_change().dropna()
    summary = pd.DataFrame({
        "Last price": prices.iloc[-1],
        "YTD return": prices.iloc[-1] / prices.iloc[0] - 1,
        "Ann. vol": rets.std() * np.sqrt(252),
        "Worst day": rets.min(),
    })
    with pd.ExcelWriter(path, engine="openpyxl") as xl:
        summary.to_excel(xl, sheet_name="Summary", index_label="Ticker")
        monthly.to_excel(xl, sheet_name="Monthly", index_label="Month end")
        prices.to_excel(xl, sheet_name="Prices", index_label="Date")
        ws = xl.sheets["Summary"]
        for row in ws.iter_rows(min_row=2, min_col=3, max_col=5):
            for cell in row:
                cell.number_format = "0.00%"
        for col in range(1, ws.max_column + 1):
            ws.column_dimensions[get_column_letter(col)].width = 14
    return summary

summary = build_report(make_prices(), "risk_report.xlsx")
print(summary.round(4))

back = pd.read_excel("risk_report.xlsx", sheet_name=None, index_col=0)
print(list(back.keys()))
print(back["Monthly"].shape, back["Prices"].shape)
check = (1 + back["Monthly"]).prod() - 1               # reconcile to YTD
print("Monthly compounds to YTD:", np.allclose(check, back["Summary"]["YTD return"]))
```

Output:

```
       Last price  YTD return  Ann. vol  Worst day
ALPHA    109.2389      0.0699    0.1606    -0.0275
BETA     113.3975      0.1778    0.2508    -0.0445
GAMMA    116.5412      0.1552    0.3043    -0.0442
['Summary', 'Monthly', 'Prices']
(6, 3) (129, 3)
Monthly compounds to YTD: True
```

The workbook has three sheets; reading it back with `sheet_name=None` returns all three as a dictionary. The monthly table has six rows, one for each month from January to June, and they compound exactly to the YTD figures.

### Scaling up with a loop
Because the report is a function, producing one per desk is a short loop. `pathlib.Path` builds file paths that work on any operating system, and an f-string puts the desk and date in each file name.

```python
# continues from the code above
from pathlib import Path

out = Path("reports")
out.mkdir(exist_ok=True)
for desk, seed in {"rates": 1, "equities": 2}.items():
    file = out / f"{desk}_risk_2026-06-30.xlsx"
    s = build_report(make_prices(seed), file)
    print(file, "| best YTD:", s["YTD return"].idxmax())
```

```
reports/rates_risk_2026-06-30.xlsx | best YTD: ALPHA
reports/equities_risk_2026-06-30.xlsx | best YTD: BETA
```

You can confirm the formatting by opening the file with openpyxl directly:

```python
# continues from the code above
from openpyxl import load_workbook

ws = load_workbook("risk_report.xlsx")["Summary"]
print(ws["A1"].value, ws["C1"].value, round(ws["C2"].value, 4), ws["C2"].number_format)
```

```
Ticker YTD return 0.0699 0.00%
```

The cell stores 0.0699 (full precision, shown rounded here) and Excel displays it as 6.99% because of the number format.

## Worked example
A common bug in monthly reports: the first month disappears. Prices are 100 on 2 January, 104 on 30 January, 101 on 27 February and 107 on 31 March.

```python
import pandas as pd

p = pd.Series([100.0, 104.0, 101.0, 107.0],
              index=pd.to_datetime(["2026-01-02", "2026-01-30", "2026-02-27", "2026-03-31"]))
month_end = p.resample("ME").last()
naive = month_end.pct_change().dropna()
full = pd.concat([p.iloc[:1], month_end]).pct_change().dropna()
print(naive.round(4).values)
print(full.round(4).values)
print("Q1 return:", round(p.iloc[-1] / p.iloc[0] - 1, 4), "| compounded:", round((1 + full).prod() - 1, 4))
```

```
[-0.0288  0.0594]
[ 0.04   -0.0288  0.0594]
Q1 return: 0.07 | compounded: 0.07
```

1. Month-end prices from `resample("ME").last()`: January 104, February 101, March 107.
2. Naive `pct_change()` gives February 101/104 − 1 = −2.88% and March 107/101 − 1 = +5.94%. January is lost because there is no prior month-end to compare with.
3. Fix: put the starting price (100) in front of the month-ends. January becomes 104/100 − 1 = **+4.00%**.
4. Check: (1.04)(0.9712)(1.0594) − 1 = **7.00%**, equal to the quarter's return 107/100 − 1. The naive version compounds to only 2.88%, which a reconciliation check would flag immediately.

## Common exam traps
- Forgetting that the `with pd.ExcelWriter(...)` block must close before the file is complete; reading it inside the block fails or gives stale data.
- Writing percentages as already-multiplied numbers (6.99) and then also applying a `"0.00%"` format, which displays 699.00%.
- Losing the first period when computing monthly returns from month-end prices.
- Hard-coding file names and dates inside the function instead of passing them as parameters.
- Assuming `read_excel` returns one DataFrame when `sheet_name=None` returns a dictionary.

## Key takeaways
- `pd.read_excel` and `DataFrame.to_excel` (with openpyxl underneath) move data between pandas and Excel.
- `pd.ExcelWriter` writes several sheets to one workbook; `writer.sheets` exposes openpyxl for formatting.
- Separate data, calculation and presentation, and wrap them in a function with parameters.
- Loops plus f-string file names turn one report into many.
- Build reconciliation checks into every automated report.
