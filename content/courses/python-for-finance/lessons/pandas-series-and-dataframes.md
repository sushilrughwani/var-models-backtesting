---
title: "pandas Series and DataFrames"
---

## Learning goals
- Explain how a pandas Series and DataFrame combine NumPy arrays with labels.
- Load tabular data from CSV and inspect it with `shape`, `head`, `dtypes` and `describe`.
- Select data by label with `.loc` and by position with `.iloc`.
- Filter rows with boolean conditions and add calculated columns.
- Sort and group data to answer typical screening questions.

## Explanation

### From arrays to labelled data
NumPy arrays are fast but anonymous: position 3 has no name. Financial data almost always comes with labels, such as tickers, dates and field names. **pandas** adds them. A **Series** is a one-dimensional array with an **index** (row labels). A **DataFrame** is a table of Series that share the same index, one per column, much like a worksheet where every row and column has a name.

```python
import pandas as pd

pe = pd.Series([18.2, 25.4, 11.7], index=["ACME", "BETA", "GAMMA"], name="pe")
print(pe)
print(pe["BETA"], pe.mean().round(2))
```

```text
ACME     18.2
BETA     25.4
GAMMA    11.7
Name: pe, dtype: float64
25.4 18.43
```

Everything you learned about vectorisation carries over: `pe * 2` doubles every value, and statistics such as `.mean()` and `.std()` are built in. One important difference: pandas' `.std()` uses the **sample** formula (`ddof=1`) by default, unlike NumPy.

### Loading data
`pd.read_csv()` reads a file (or a URL) into a DataFrame. The `index_col` argument promotes a column to row labels. Below, `io.StringIO` lets us treat a string as a file so the example is self-contained; with a real file you would write `pd.read_csv("universe.csv", index_col="ticker")`.

```python
import io
import pandas as pd

csv = """ticker,sector,price,shares_out_m,eps
ACME,Industrials,52.10,120,3.10
BETA,Tech,18.45,900,0.72
GAMMA,Health,101.30,45,5.85
DELTA,Tech,64.00,300,2.40
EPSI,Energy,33.20,210,4.15
"""
df = pd.read_csv(io.StringIO(csv), index_col="ticker")
print(df.shape)
print(df.head(3))
print(df.dtypes)
```

```text
(5, 4)
             sector   price  shares_out_m   eps
ticker
ACME    Industrials   52.10           120  3.10
BETA           Tech   18.45           900  0.72
GAMMA        Health  101.30            45  5.85
sector              str
price           float64
shares_out_m      int64
eps             float64
dtype: object
```

The shape is (5 rows, 4 columns): the index is not counted as a column. Always check `dtypes` after loading. Here pandas recognised numbers correctly; if a price column showed a text type, something in the file (a comma, a currency symbol, "n/a") stopped the conversion. Recent pandas versions report text columns as `str`; older versions show `object`.

### Inspecting
- `df.head(n)` / `df.tail(n)`: first or last rows.
- `df.info()`: column types and non-missing counts.
- `df.describe()`: count, mean, std, min, quartiles and max for numeric columns.

### Selecting with .loc and .iloc
- `df["price"]` returns one column as a Series; `df[["price", "eps"]]` returns a DataFrame.
- `df.loc[row_label, column_label]` selects **by label**. Label slices include both ends.
- `df.iloc[row_pos, col_pos]` selects **by integer position**, counting from 0 and excluding the stop of a slice, exactly like lists.

### Filtering, new columns, sorting and grouping
A comparison on a column produces a boolean Series; passing it inside `df[...]` keeps the matching rows. Combine conditions with `&` (and), `|` (or) and `~` (not), wrapping **each** condition in parentheses because these operators bind more tightly than comparisons. New columns are created by assignment and computed row by row automatically. `sort_values()` orders rows, and `groupby()` splits the table by a key, applies a function and combines the results.

## Worked example
Using the five-stock universe above: (1) look up GAMMA's price by label and the first row's third column by position, (2) add market capitalisation and P/E, (3) screen for Tech stocks with P/E below 30, (4) find the two cheapest stocks by P/E, and (5) total market cap by sector.

Market capitalisation and the price-to-earnings ratio are

$$
\text{MktCap} = P \times \text{Shares}, \qquad \text{P/E} = \frac{P}{\text{EPS}}
$$

where $P$ is the share price, Shares the shares outstanding (millions here) and EPS earnings per share.

```python
import io
import pandas as pd

csv = """ticker,sector,price,shares_out_m,eps
ACME,Industrials,52.10,120,3.10
BETA,Tech,18.45,900,0.72
GAMMA,Health,101.30,45,5.85
DELTA,Tech,64.00,300,2.40
EPSI,Energy,33.20,210,4.15
"""
df = pd.read_csv(io.StringIO(csv), index_col="ticker")

print(df.loc["GAMMA", "price"])          # label-based
print(df.iloc[0, 2])                     # position-based: row 0, column 2
print(df.loc[["ACME", "EPSI"], ["sector", "eps"]])

df["mkt_cap_m"] = df["price"] * df["shares_out_m"]
df["pe"] = (df["price"] / df["eps"]).round(2)
print(df[["mkt_cap_m", "pe"]])

cheap_tech = df[(df["sector"] == "Tech") & (df["pe"] < 30)]
print(cheap_tech.index.tolist())
print(df.sort_values("pe").head(2)[["pe"]])
print(df.groupby("sector")["mkt_cap_m"].sum())
```

```text
101.3
120
             sector   eps
ticker
ACME    Industrials  3.10
EPSI         Energy  4.15
        mkt_cap_m     pe
ticker
ACME       6252.0  16.81
BETA      16605.0  25.62
GAMMA      4558.5  17.32
DELTA     19200.0  26.67
EPSI       6972.0   8.00
['BETA', 'DELTA']
           pe
ticker
EPSI     8.00
ACME    16.81
sector
Energy          6972.0
Health          4558.5
Industrials     6252.0
Tech           35805.0
Name: mkt_cap_m, dtype: float64
```

Step by step:
1. `.loc["GAMMA", "price"]` returns 101.3. `.iloc[0, 2]` is row 0 (ACME) and column position 2, which is `shares_out_m` (sector is 0, price is 1), giving 120.
2. ACME: market cap = 52.10 × 120 = 6,252.0 million; P/E = 52.10 / 3.10 = 16.81.
3. Both Tech names pass the P/E filter: BETA (18.45 / 0.72 = 25.62) and DELTA (64.00 / 2.40 = 26.67).
4. Sorted by P/E, the cheapest are **EPSI (8.00)** and ACME (16.81).
5. Tech market cap = 16,605 + 19,200 = **USD 35,805 million**, the largest sector.

## Common exam traps
- **Using `and` instead of `&`.** `df[(a) and (b)]` raises an error; use `&`, and parenthesise each condition.
- **Counting the index as a column in `.iloc`.** Positions start at the first data column.
- **Label slices are inclusive.** `df.loc["ACME":"GAMMA"]` includes GAMMA, while `df.iloc[0:2]` excludes position 2.
- **Ignoring dtypes.** A price column read as text makes arithmetic fail or concatenate strings.
- **Chained assignment.** `df[df.pe < 10]["flag"] = 1` modifies a temporary copy; use `df.loc[df.pe < 10, "flag"] = 1`.

## Key takeaways
- A Series is a labelled 1-D array; a DataFrame is a table of Series sharing an index.
- `read_csv` loads data; check `shape`, `head`, `dtypes` and `describe` immediately.
- `.loc` selects by label (inclusive slices); `.iloc` by position (exclusive slices).
- Boolean filters with `&`, `|`, `~` screen rows; assignment creates calculated columns.
- `sort_values` ranks and `groupby` aggregates by category.
- pandas' `.std()` defaults to the sample formula (`ddof=1`).
