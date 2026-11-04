---
title: "Setting Up Python and Jupyter Notebooks"
---

## Learning goals
- Install a working Python 3 environment with the core finance libraries (NumPy, pandas, matplotlib).
- Explain the difference between running a script, using the interactive interpreter and working in a Jupyter notebook.
- Run, edit and re-run notebook cells, and predict what a cell displays.
- Write and run a first finance calculation: the future value of a lump sum.

## Explanation

### Why Python for finance?
Spreadsheets are excellent for small, visible models, but they become fragile when the data has 50,000 rows, when the same analysis must be repeated every morning, or when you need a simulation with a million paths. Python is a free, general-purpose language with a huge ecosystem of finance-friendly libraries: NumPy for fast arithmetic on arrays, pandas for tables and time series, matplotlib for charts, and SciPy and statsmodels for statistics. Everything you build in this course is plain text that can be re-run, checked and shared.

### Three ways to run Python
1. **The interactive interpreter (REPL).** Type `python3` (or `python` on Windows) in a terminal and you get a `>>>` prompt. Each line runs immediately. Great for quick checks, poor for saving work.
2. **Scripts.** Save code in a file such as `fv.py` and run `python3 fv.py`. The file runs from top to bottom every time, which makes scripts ideal for repeatable jobs such as a daily risk report.
3. **Jupyter notebooks.** A notebook (`.ipynb`) is a document made of *cells*. Code cells run Python; Markdown cells hold notes and headings. Output (numbers, tables, charts) appears directly below each cell. Notebooks are the standard tool for exploratory analysis, and most lessons in this course are best followed in one.

### Installing
There are two common routes:
- **Anaconda / Miniconda**: a distribution that bundles Python, Jupyter and the scientific libraries. The simplest choice for beginners.
- **python.org plus pip**: install Python 3, then add libraries from a terminal. Using a *virtual environment* keeps each project's packages separate:

```bash
python3 -m venv finance-env
source finance-env/bin/activate        # Windows: finance-env\Scripts\activate
pip install numpy pandas matplotlib jupyterlab
jupyter lab
```

A free hosted notebook service also works if you cannot install software; the code is identical.

### Checking the installation
Run this in a cell or script. The version numbers you see will depend on when you installed; anything recent is fine.

```python
import sys
import numpy as np
import pandas as pd
print(sys.version_info >= (3, 10))
print("numpy", np.__version__)
print("pandas", pd.__version__)
```

```text
True
numpy 2.5.4
pandas 3.1.0
```

The `import ... as np` line loads a library and gives it a short alias. `np` and `pd` are universal conventions, so you will see them in every tutorial and code base.

### Your first code
`print()` writes a value to the output. Python follows normal operator precedence, so multiplication happens before addition.

```python
print("Hello, markets!")
print(2 + 3 * 4)
```

```text
Hello, markets!
14
```

### How notebook cells behave
- Press **Shift+Enter** to run a cell and move to the next one.
- The number in `In [5]` shows the *order* in which cells were executed, not their position on the page.
- If the **last line** of a cell is an expression (not an assignment), the notebook displays its value automatically, even without `print()`.
- Variables live in the notebook's *kernel* (the running Python process). If you run cells out of order, a variable can hold a value from a cell you later deleted or edited. **Kernel → Restart & Run All** is the honest test that your notebook works from top to bottom.

## Worked example
You invest USD 10,000 today at 6% per year, compounded annually, for 5 years. What is it worth at the end?

The future value formula is

$$
FV = PV \times (1 + r)^n
$$

where $PV$ is the amount invested today, $r$ is the annual rate and $n$ is the number of years. In Python, `**` is the power operator:

```python
principal = 10_000      # amount invested today
rate = 0.06             # 6% annual return
years = 5

future_value = principal * (1 + rate) ** years
print(future_value)
print(round(future_value, 2))
```

```text
13382.255776000004
13382.26
```

Step by step: $1.06^5 = 1.3382255776$, and $10{,}000 \times 1.3382255776 = 13{,}382.26$. The long tail of digits in the first line is normal floating-point noise (covered next lesson); rounding for display gives **USD 13,382.26**.

Note the habits that make this readable: descriptive variable names, the rate entered as a decimal (`0.06`, not `6`), underscores in `10_000` to make large numbers easy to read, and comments after `#`.

Change one input and re-run the cell to see sensitivity instantly. A loop (Lesson 3) can do several rates at once:

```python
deposit = 2_500
for r in [0.04, 0.06, 0.08]:
    print(r, round(deposit * (1 + r) ** 10, 2))
```

```text
0.04 3700.61
0.06 4477.12
0.08 5397.31
```

## Common exam traps
- **Entering percentages as whole numbers.** `rate = 6` gives a future value of 10,000 × 7⁵, which is nonsense. Always use decimals.
- **Using `^` for powers.** In Python `^` is bitwise XOR, not exponentiation; use `**`.
- **Trusting out-of-order notebook state.** A notebook that works only because cells were run in a particular hidden order will fail for a colleague. Restart and run all before sharing.
- **Expecting a display from a middle line.** Only the last expression in a cell is shown automatically; use `print()` for anything else.
- **Installing packages into the wrong Python.** If `import pandas` fails right after installing, the notebook kernel is probably a different interpreter from the one `pip` used. Activate the environment first.

## Key takeaways
- Python is free, scriptable and backed by NumPy, pandas and matplotlib, the core stack for this course.
- Use scripts for repeatable jobs and notebooks for exploration and teaching.
- A virtual environment (or Anaconda) keeps libraries organised per project.
- Shift+Enter runs a cell; the last expression in a cell is displayed automatically.
- `**` is the power operator, so `pv * (1 + r) ** n` computes compound growth.
- Restart the kernel and run all cells to prove a notebook is reproducible.
