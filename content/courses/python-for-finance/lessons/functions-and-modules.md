---
title: "Functions and Modules"
---

## Learning goals
- Define functions with parameters, default values and a docstring, and call them with positional or keyword arguments.
- Build reusable time-value-of-money functions: future value, loan payment and NPV.
- Return several results from one function and unpack them.
- Import standard-library modules and organise your own functions into a module file.
- Avoid the classic function bugs: missing `return` and mutable default arguments.

## Explanation

### Why functions?
In the last lesson we wrote an NPV loop. If you need NPV for 30 projects, copying that loop 30 times invites typos and makes fixes painful. A **function** packages logic under a name so you write it once, test it once and call it everywhere. Think of it as a custom Excel formula you design yourself.

### Anatomy of a function

```python
def future_value(pv, rate, n, m=1):
    """Future value of a lump sum with m compounding periods per year."""
    return pv * (1 + rate / m) ** (n * m)

print(round(future_value(1000, 0.05, 10), 2))
print(round(future_value(1000, 0.05, 10, m=12), 2))
print(round(future_value(rate=0.05, n=10, pv=1000, m=4), 2))
```

```text
1628.89
1647.01
1643.62
```

- `def` starts the definition; `pv, rate, n, m` are **parameters**.
- `m=1` is a **default**: if the caller omits it, compounding is annual.
- The triple-quoted string is a **docstring**; `help(future_value)` displays it.
- `return` sends the result back to the caller. Without it the function returns `None`.
- Arguments can be passed by position or by **keyword** (`rate=0.05`). Keywords make calls self-documenting and let you pass them in any order.

The function implements

$$
FV = PV\left(1 + \frac{r}{m}\right)^{n m}
$$

where $r$ is the annual nominal rate, $m$ the compounding periods per year and $n$ the number of years. More frequent compounding raises the value: 1,628.89 annually, 1,643.62 quarterly, 1,647.01 monthly.

### Returning several values
A function can return a tuple, which the caller unpacks into separate names.

```python
def npv_and_pi(rate, cash_flows):
    """Return NPV and profitability index (PV of inflows / initial outlay)."""
    pv_in = sum(cf / (1 + rate) ** t for t, cf in enumerate(cash_flows) if t > 0)
    npv = cash_flows[0] + pv_in
    return npv, pv_in / -cash_flows[0]

npv, pi = npv_and_pi(0.10, [-1000, 400, 400, 400])
print(round(npv, 2), round(pi, 3))
```

```text
-5.26 0.995
```

The `sum(... for ...)` expression is a compact loop called a generator expression. A profitability index below 1 agrees with the negative NPV.

### Scope
Variables created inside a function are **local**: they exist only while the function runs and do not overwrite variables of the same name outside. Pass inputs in as parameters and get results out with `return`, rather than relying on outside variables.

### Modules
A **module** is a file of Python code you can import. The standard library ships hundreds, including `math` and `statistics`:

```python
import math
from statistics import mean, stdev

print(round(math.exp(0.05 * 2), 6))
print(round(math.log(110 / 100), 6))
print(round(mean([0.02, -0.01, 0.03]), 6), round(stdev([0.02, -0.01, 0.03]), 6))
```

```text
1.105171
0.09531
0.013333 0.020817
```

`import math` keeps the namespace (`math.exp`), while `from statistics import mean` pulls a name in directly. Avoid `from module import *`, which hides where names come from.

Your own functions become a module simply by saving them in a `.py` file:

```python
# file: tvm.py
"""tvm.py - time value of money helpers."""

def pv(fv, rate, n):
    return fv / (1 + rate) ** n

def fv(pv, rate, n):
    return pv * (1 + rate) ** n

if __name__ == "__main__":
    print("self-test:", round(pv(1000, 0.05, 3), 2))
```

A script or notebook in the same folder can now use it:

```python
import tvm

print(round(tvm.pv(1000, 0.05, 3), 2))
print(round(tvm.fv(863.84, 0.05, 3), 2))
```

```text
863.84
1000.0
```

The `if __name__ == "__main__":` block runs only when the file is executed directly (`python3 tvm.py`), not when it is imported, so it is a safe place for quick self-tests. In a notebook, restart the kernel after editing a module, because Python imports each module only once per session.

## Worked example
Write a loan-payment function and use it for a USD 250,000, 30-year mortgage at 6% annual interest paid monthly. Also compute the total interest paid.

The level payment on an amortising loan is

$$
PMT = \frac{PV \cdot i}{1 - (1+i)^{-N}}
$$

where $PV$ is the loan amount, $i$ the periodic rate and $N$ the number of payments.

```python
def annuity_payment(pv, rate, n):
    """Level end-of-period payment that repays pv over n periods."""
    if rate == 0:
        return pv / n
    return pv * rate / (1 - (1 + rate) ** -n)

loan = 250_000
monthly_rate = 0.06 / 12
months = 30 * 12
pmt = annuity_payment(loan, monthly_rate, months)
print(round(pmt, 2))
print(round(pmt * months - loan, 2))
```

```text
1498.88
289595.47
```

Step by step:
1. Periodic rate $i = 0.06 / 12 = 0.005$; $N = 30 \times 12 = 360$.
2. $(1.005)^{-360} = 0.166042$, so the denominator is $1 - 0.166042 = 0.833958$.
3. Numerator: $250{,}000 \times 0.005 = 1{,}250$.
4. $PMT = 1{,}250 / 0.833958 =$ **USD 1,498.88** per month.
5. Total interest: $1{,}498.88 \times 360 - 250{,}000 \approx$ **USD 289,595.47**.

The `if rate == 0` branch protects against division by zero for an interest-free loan, a small example of making a function robust to edge cases.

## Common exam traps
- **Forgetting `return`.** A function that computes `x * 1.1` but never returns it gives back `None`, and `print()` shows `None`.
- **Mutable default arguments.** `def add(trade, blotter=[])` creates the list once, so every call shares it:

```python
def add_trade(trade, blotter=[]):
    blotter.append(trade)
    return blotter

print(add_trade("BUY 100 ACME"))
print(add_trade("SELL 50 BETA"))
```

```text
['BUY 100 ACME']
['BUY 100 ACME', 'SELL 50 BETA']
```

  Use `blotter=None` and create the list inside the function instead.
- **Mixing annual and periodic inputs.** Passing 0.06 and 360 to a monthly function overstates the payment enormously; convert rate and periods consistently.
- **Positional mix-ups.** `future_value(0.05, 1000, 10)` silently swaps `pv` and `rate`. Keyword arguments prevent this.
- **Stale imports.** Editing `tvm.py` does not change an already-imported module until the kernel restarts.

## Key takeaways
- `def name(params):` plus `return` packages logic for reuse; docstrings explain it.
- Defaults and keyword arguments make functions flexible and calls readable.
- Return multiple values as a tuple and unpack them.
- `import module` or `from module import name` brings in library or your own code.
- Guard `if __name__ == "__main__":` keeps self-tests from running on import.
- Never use a mutable object (list, dict) as a default argument.
