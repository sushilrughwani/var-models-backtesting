---
title: "Functions and Modules"
duration: 20
---

## Lecture outline
- 00:00 - Hook: the NPV loop copied 30 times, with one typo hiding in copy 17
- 02:00 - Anatomy of a function: def, parameters, return, docstring
- 05:00 - Defaults and keyword arguments: `future_value` with m = 1, 4, 12
- 08:00 - Returning several values: `npv_and_pi` and tuple unpacking; local scope
- 10:30 - Live worked example: mortgage payment function and total interest
- 13:30 - Modules: `math`, `statistics`, import styles, writing `tvm.py`, the `__main__` guard
- 16:30 - Bugs to avoid: missing return, mutable defaults, positional mix-ups, stale imports
- 19:00 - Recap and homework: build a `tvm.py` with pv, fv and pmt

## Slides
### Slide 1: Functions and Modules
- Write logic once, call it everywhere
- Today: a mini time-value-of-money library

### Slide 2: Anatomy of a Function
- `def future_value(pv, rate, n, m=1):`
- Docstring explains purpose and inputs
- `return` hands back the result (otherwise `None`)

### Slide 3: Defaults and Keywords
- `m=1` means annual unless told otherwise
- Keyword calls: `future_value(rate=0.05, n=10, pv=1000)`
- USD 1,000 at 5% for 10 years: 1,628.89 / 1,643.62 / 1,647.01 (m = 1 / 4 / 12)

### Slide 4: Returning Several Values
- `return npv, pi` returns a tuple
- `npv, pi = npv_and_pi(...)` unpacks it
- Example: NPV -5.26, PI 0.995

### Slide 5: Local Scope
- Variables inside a function vanish when it ends
- Inputs in via parameters, outputs out via return
- Avoid relying on outside variables

### Slide 6: The Loan Payment Formula
- $PMT = PV \cdot i / (1 - (1+i)^{-N})$
- Convert to periodic: i = annual / 12, N = years × 12
- Guard the zero-rate case

### Slide 7: Mortgage Example
- USD 250,000, 30 years, 6%, monthly
- Payment USD 1,498.88
- Total interest USD 289,595.47

### Slide 8: Standard-Library Modules
- `import math` then `math.exp`, `math.log`
- `from statistics import mean, stdev`
- Avoid `from x import *`

### Slide 9: Your Own Module
- Save functions in `tvm.py`; `import tvm`
- `if __name__ == "__main__":` for self-tests
- Restart the kernel after editing

### Slide 10: Classic Bugs
- Missing `return` gives `None`
- Mutable default `[]` shared across calls
- Annual vs periodic inputs; swapped positional arguments

## Whiteboard examples
1. **Mortgage payment.** USD 250,000, 6% annual, 30 years monthly. i = 0.005, N = 360. (1.005)^−360 = 0.166042; denominator 1 − 0.166042 = 0.833958; numerator 250,000 × 0.005 = 1,250. PMT = 1,250 / 0.833958 = **1,498.88**. Total paid (unrounded payment × 360) = 539,595.47; interest = **289,595.47**.
2. **Compounding frequency.** USD 1,000 at 5% for 10 years. Annual: 1.05¹⁰ = 1.628895 → **1,628.89**. Quarterly: 1.0125⁴⁰ = 1.643619 → **1,643.62**. Monthly: (1 + 0.05/12)¹²⁰ = 1.647009 → **1,647.01**.
3. **NPV and PI.** -1,000 then 400 for 3 years at 10%. PV of inflows = 400/1.1 + 400/1.21 + 400/1.331 = 363.64 + 330.58 + 300.53 = 994.74. NPV = **-5.26**; PI = 994.74 / 1,000 = **0.995**.

## Questions to ask students
- What does a function return if it has no `return` statement? (`None`.)
- Why is `future_value(rate=0.05, n=10, pv=1000)` safer than positional arguments? (Names make the mapping explicit, so inputs can't be silently swapped.)
- What is wrong with `def add(trade, blotter=[])`? (The list is created once and shared, so trades accumulate across calls.)
- When does code under `if __name__ == "__main__":` run? (Only when the file is executed directly, not when imported.)
- You edited `tvm.py` but the notebook still uses the old version. Why? (Modules are imported once per session; restart the kernel or reload.)

## Analogies
- **A function is a custom spreadsheet formula.** Inputs go in the brackets, one answer comes out, and you can reuse it anywhere.
- **A module is a toolbox you carry between projects.** Write `tvm.py` once and every future notebook can open it.
- **A mutable default is a shared office notepad.** Everyone who "gets a fresh pad" is actually writing on the same one.

## Recording tips
- Type the function live, call it with a bad positional order to produce a silly answer, then fix it with keywords.
- Show the `tvm.py` file and the notebook side by side so students see the import connection.
- Run the mutable-default bug on screen; it is far more memorable seen than described.
