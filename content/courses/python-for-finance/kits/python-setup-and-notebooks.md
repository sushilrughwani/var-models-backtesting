---
title: "Setting Up Python and Jupyter Notebooks"
duration: 16
---

## Lecture outline
- 00:00 - Hook: a spreadsheet with 50,000 rows that takes a minute to recalculate vs three lines of Python that finish instantly
- 02:00 - Why Python for finance: free, scriptable, reproducible; the NumPy / pandas / matplotlib stack
- 04:00 - Three ways to run code: REPL, scripts, notebooks (show each live for 30 seconds)
- 06:00 - Installing: Anaconda vs python.org + venv + pip; check the install with imports and versions
- 08:30 - Notebook mechanics: cells, Shift+Enter, execution counter, last-expression display, Markdown cells
- 11:00 - Live worked example: future value of USD 10,000 at 6% for 5 years
- 13:30 - Traps: percentages as whole numbers, `^` vs `**`, out-of-order cells, wrong kernel
- 15:00 - Recap and homework: install, run the FV cell, Restart & Run All

## Slides
### Slide 1: Setting Up Python and Jupyter Notebooks
- Goal: a working Python environment and your first finance calculation
- Everything in this course is runnable code
- Free tools only

### Slide 2: Why Python for Finance
- Handles large data sets and repeated jobs reliably
- Code is text: re-runnable, reviewable, version-controlled
- Core libraries: NumPy, pandas, matplotlib, SciPy, statsmodels

### Slide 3: Three Ways to Run Python
- REPL: `python3` then type at `>>>` (quick checks)
- Script: `python3 report.py` (repeatable jobs)
- Jupyter notebook: cells + output + notes (exploration)

### Slide 4: Installing
- Option A: Anaconda / Miniconda (batteries included)
- Option B: python.org + `python3 -m venv env` + `pip install ...`
- Option C: a hosted notebook service, same code
- One environment per project avoids version clashes

### Slide 5: Checking Your Install
- `import numpy as np`, `import pandas as pd`
- Print `np.__version__` and `pd.__version__`
- `np` and `pd` are universal aliases

### Slide 6: Notebook Mechanics
- Code cells vs Markdown cells
- Shift+Enter runs and moves on
- `In [n]` = execution order, not page order
- Last expression in a cell is displayed automatically

### Slide 7: The Kernel Holds State
- Variables live in the running process, not on the page
- Editing or deleting a cell does not erase old values
- Restart & Run All = the reproducibility test

### Slide 8: First Finance Calculation
- $FV = PV(1+r)^n$
- `principal * (1 + rate) ** years`
- USD 10,000 at 6% for 5 years = 13,382.26

### Slide 9: Good Habits From Day One
- Descriptive names: `rate`, not `x`
- Rates as decimals: `0.06`
- `10_000` for readability; `#` comments

### Slide 10: Traps
- `rate = 6` instead of `0.06`
- `^` is XOR, `**` is power
- Out-of-order cells; packages installed into another Python

## Whiteboard examples
1. **Future value.** USD 10,000 at 6% for 5 years. $1.06^2 = 1.1236$, $1.06^3 = 1.191016$, $1.06^4 = 1.26247696$, $1.06^5 = 1.3382255776$. FV = 10,000 × 1.3382255776 = **13,382.26**. Then type the same thing in a cell and show the raw output `13382.255776000004` before rounding.
2. **Sensitivity in a loop.** USD 2,500 for 10 years at 4%, 6% and 8%: 2,500 × 1.04¹⁰ = **3,700.61**, 2,500 × 1.06¹⁰ = **4,477.12**, 2,500 × 1.08¹⁰ = **5,397.31**. Point out that doubling the rate from 4% to 8% raises the gain from 1,200.61 to 2,897.31, more than double, because of compounding.
3. **Precedence.** Ask what `2 + 3 * 4` prints before running it (**14**, not 20), then what `(2 + 3) * 4` prints (**20**).

## Questions to ask students
- In a notebook, a cell's last line is `fv` (an expression). Will its value appear without `print`? (Yes, the last expression is displayed automatically.)
- What does `In [7]` above a cell tell you? (It was the seventh cell executed in this kernel session, regardless of where it sits on the page.)
- Why might `import pandas` fail right after `pip install pandas` worked? (pip installed into a different interpreter/environment from the notebook's kernel.)
- What goes wrong if you type `rate = 6` for 6%? (Growth factor becomes 7 per year, so the answer is wildly too large.)
- When would you prefer a script over a notebook? (Repeatable, scheduled jobs such as a daily report, where the code should run top to bottom unattended.)

## Analogies
- **The notebook is a lab journal, the kernel is the lab bench.** The journal records what you intended; the bench holds whatever is physically on it right now, including leftovers from experiments you crossed out.
- **A virtual environment is a separate toolbox per client.** You don't want one client's specialised tools to break another client's job.
- **Scripts are recipes, the REPL is tasting from the pot.** You taste to check, but you write the recipe down to cook it again tomorrow.

## Recording tips
- Show the install check on screen with your real version numbers and say that newer numbers are fine; students panic when their output differs slightly.
- Deliberately run cells out of order to produce a "ghost variable", then fix it with Restart & Run All. This demonstration prevents many later support questions.
- Keep the font large (at least 16 pt in the notebook) and narrate each keystroke the first time you use Shift+Enter.
