---
title: "Control Flow: Conditions and Loops"
---

## Learning goals
- Write `if` / `elif` / `else` blocks that classify values, such as bucketing companies by leverage.
- Use `for` loops with `enumerate()` to discount a series of cash flows.
- Use `while` loops to solve "how long until..." problems such as doubling time.
- Control loops with `break`, `continue` and the loop `else` clause.
- Recognise indentation and off-by-one errors before they corrupt results.

## Explanation

### Code blocks and indentation
Python groups statements by indentation, not by braces. A line ending in a colon (`if ...:`, `for ...:`) opens a block, and every line indented underneath (conventionally 4 spaces) belongs to it. The block ends when indentation returns to the previous level. Indentation is therefore *meaning*, not decoration: moving a line in or out changes what the program does.

### Conditions: if, elif, else
Python checks each condition from the top and runs the **first** block whose condition is true, then skips the rest. Order matters: put the narrowest condition first.

```python
debt_to_ebitda = 3.4

if debt_to_ebitda < 2:
    bucket = "low leverage"
elif debt_to_ebitda < 4:
    bucket = "moderate leverage"
else:
    bucket = "high leverage"
print(bucket)
```

```text
moderate leverage
```

The ratio 3.4 fails the first test (not below 2), passes the second (below 4), and the `else` is never reached. Because the first branch already caught everything below 2, the second branch effectively means "between 2 and 4".

### for loops
A `for` loop runs its block once for each item of a sequence. Finance is full of sequences: cash flows by period, daily returns, tickers in a portfolio. `enumerate()` hands you both the position and the item, which is exactly what discounting needs, because the position is the time index $t$.

The net present value of cash flows $CF_0, CF_1, \dots, CF_N$ at discount rate $r$ is

$$
NPV = \sum_{t=0}^{N} \frac{CF_t}{(1+r)^t}
$$

where $CF_t$ is the cash flow at the end of period $t$ (with $CF_0$ today, usually negative).

### while loops
A `while` loop repeats *as long as* a condition stays true. Use it when you do not know the number of iterations in advance, such as counting the years until an investment doubles. Always make sure something inside the loop moves you towards ending it, otherwise the loop never stops (interrupt a runaway notebook cell with the stop button).

```python
balance = 1000.0
rate = 0.07
years = 0
while balance < 2000:
    balance *= 1 + rate
    years += 1
print(years, round(balance, 2))
```

```text
11 2104.85
```

After 10 years the balance is below 2,000, so the loop runs an 11th time. The rule-of-72 estimate is 72 / 7 ≈ 10.3 years, consistent with doubling during year 11. `balance *= 1 + rate` is shorthand for `balance = balance * (1 + rate)`.

### break, continue and loop-else
- `break` exits the loop immediately.
- `continue` skips the rest of the current iteration and moves to the next item.
- A loop's `else` block runs only if the loop finished **without** a `break`. It is a neat way to report "not found".

A payback-period check uses all three ideas:

```python
cash_flows = [-5000, 1200, 1500, 1800, 2000]
cumulative = 0
for year, cf in enumerate(cash_flows):
    cumulative += cf
    if cumulative >= 0:
        print("Payback in year", year)
        break
else:
    print("Never pays back")
```

```text
Payback in year 4
```

Cumulative cash is −5,000, −3,800, −2,300, −500 and then +1,500, so it turns positive in year 4 and the loop stops. Counting losing days shows `continue`:

```python
returns = [0.012, -0.034, 0.005, -0.021, 0.018, -0.002]
losses = 0
for r in returns:
    if r >= 0:
        continue
    losses += 1
print(losses)
```

```text
3
```

## Worked example
A project costs USD 1,000 today and returns USD 300, 400 and 500 at the end of years 1 to 3. The discount rate is 8%. Compute each present value and the NPV with a loop.

```python
rate = 0.08
cash_flows = [-1000, 300, 400, 500]   # t = 0, 1, 2, 3

npv = 0.0
for t, cf in enumerate(cash_flows):
    pv = cf / (1 + rate) ** t
    npv += pv
    print(t, cf, round(pv, 2))
print("NPV:", round(npv, 2))
```

```text
0 -1000 -1000.0
1 300 277.78
2 400 342.94
3 500 396.92
NPV: 17.63
```

Step by step:
1. $t=0$: $-1000 / 1.08^0 = -1000.00$.
2. $t=1$: $300 / 1.08 = 277.78$.
3. $t=2$: $400 / 1.1664 = 342.94$.
4. $t=3$: $500 / 1.259712 = 396.92$.
5. Sum: $-1000 + 277.78 + 342.94 + 396.92 =$ **17.63**, positive, so the project adds value at 8%.

Notice that `npv = 0.0` is set *before* the loop. Putting it inside the loop would reset the running total on every pass.

## Common exam traps
- **Resetting an accumulator inside the loop.** Initialise totals before the `for` line, update them inside.
- **Wrong `elif` order.** Testing `< 4` before `< 2` would label a ratio of 1.5 as "moderate", because the first true branch wins.
- **Off-by-one time indices.** Starting $t$ at 1 for a time-0 cash flow discounts the initial outlay by mistake; `enumerate()` starts at 0 by default.
- **Infinite `while` loops.** If the balance never changes (for example a rate of 0), `while balance < 2000` never ends. Guard with a maximum number of iterations.
- **Misreading loop-else.** The `else` after a loop runs when *no* `break` happened, not when the condition was false on the last item.

## Key takeaways
- Indentation defines blocks; a colon opens one.
- `if/elif/else` runs only the first true branch, so order conditions carefully.
- `for` loops walk through sequences; `enumerate()` supplies the time index for discounting.
- `while` loops solve open-ended questions like doubling time but need a guaranteed exit.
- `break` stops a loop, `continue` skips an item, and loop-`else` runs only if no `break` occurred.
- Initialise accumulators such as `npv = 0.0` before the loop.
