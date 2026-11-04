---
title: "Lists, Dictionaries and Tuples"
---

## Learning goals
- Store ordered data such as cash flows and returns in lists, and index and slice them correctly.
- Use dictionaries as lookup tables (ticker to price, rating to spread) and loop over their items.
- Use tuples for fixed records such as a trade, and unpack them into variables.
- Write list and dictionary comprehensions to transform data in one line.
- Explain the difference between aliasing and copying a list.

## Explanation

### Lists: ordered and changeable
A list holds items in order inside square brackets. It is the natural home for a cash-flow schedule or a return series. Python indexes from **0**, and negative indexes count from the end.

```python
cash_flows = [-1000, 250, 300, 350, 400]
print(cash_flows[0], cash_flows[-1])
print(cash_flows[1:3])
print(len(cash_flows), sum(cash_flows))
cash_flows.append(450)
print(cash_flows)
```

```text
-1000 400
[250, 300]
5 300
[-1000, 250, 300, 350, 400, 450]
```

A slice `start:stop` includes `start` but **excludes** `stop`, so `cash_flows[1:3]` returns items 1 and 2. This half-open rule means `x[:k]` and `x[k:]` split a list cleanly with no overlap. Lists are **mutable**: `append`, `insert`, `pop` and assignment such as `cash_flows[2] = 320` change them in place.

### Comprehensions
A list comprehension builds a new list from an old one, optionally with a filter. It replaces a three-line loop with a readable one-liner.

```python
returns = [0.012, -0.034, 0.005, -0.021, 0.018]
growth = [1 + r for r in returns]
gains = [r for r in returns if r > 0]
print(growth)
print(gains)
```

```text
[1.012, 0.966, 1.005, 0.979, 1.018]
[0.012, 0.005, 0.018]
```

Growth factors $1 + r_t$ are exactly what you multiply together to compound returns over several periods.

### Dictionaries: lookup by key
A dictionary maps **keys** to **values**, like a two-column lookup table. Keys must be unique and immutable (strings and numbers are typical). Looking up a key is fast no matter how large the dictionary is.

```python
ratings_spread = {"AAA": 0.0045, "AA": 0.0060, "A": 0.0085, "BBB": 0.0130}
print(ratings_spread["A"])
print(ratings_spread.get("BB", "not found"))
print("BBB" in ratings_spread)
```

```text
0.0085
not found
True
```

Square brackets raise a `KeyError` if the key is missing; `.get(key, default)` returns a fallback instead. Loop over pairs with `.items()`, keys with `.keys()` and values with `.values()`. Since Python 3.7, dictionaries remember insertion order.

### Tuples: fixed records
A tuple is like a list in round brackets but **immutable**: once created it cannot change. That makes it ideal for records that should not be edited by accident, such as an executed trade, and for returning several values from a function (Lesson 4). Unpacking assigns each element to a name in one line.

```python
trade = ("ACME", "BUY", 200, 52.10)
ticker, side, qty, px = trade
print(ticker, qty * px)
try:
    trade[2] = 300
except TypeError as e:
    print("TypeError:", e)
```

```text
ACME 10420.0
TypeError: 'tuple' object does not support item assignment
```

### Choosing the right structure
| Need | Structure |
|---|---|
| Ordered series you will add to | list |
| Look up a value by name | dict |
| Fixed record or multiple return values | tuple |

### Aliasing versus copying
Assignment does not copy a list; it attaches a second label to the **same** list. Changing it through one name changes it for both.

```python
original = [0.40, 0.35, 0.25]
alias = original
copy = original.copy()
alias[0] = 0.50
print(original)
print(copy)
```

```text
[0.5, 0.35, 0.25]
[0.4, 0.35, 0.25]
```

Use `.copy()` (or `list(x)`) when you want to experiment with a scenario without overwriting the base case.

## Worked example
A portfolio holds 200 ACME at USD 52.10, 1,000 BETA at USD 18.45 and 50 GAMMA at USD 101.30. Compute each position's market value, the total and the portfolio weights.

The weight of asset $i$ is

$$
w_i = \frac{P_i \, Q_i}{\sum_j P_j \, Q_j}
$$

where $P_i$ is the price and $Q_i$ the number of shares held.

```python
prices = {"ACME": 52.10, "BETA": 18.45, "GAMMA": 101.30}
shares = {"ACME": 200, "BETA": 1000, "GAMMA": 50}

values = {t: prices[t] * shares[t] for t in prices}
total = sum(values.values())
weights = {t: v / total for t, v in values.items()}

print(values)
print(round(total, 2))
for t, w in weights.items():
    print(f"{t:6s} {w:.2%}")
```

```text
{'ACME': 10420.0, 'BETA': 18450.0, 'GAMMA': 5065.0}
33935.0
ACME   30.71%
BETA   54.37%
GAMMA  14.93%
```

Step by step:
1. ACME: 52.10 × 200 = 10,420.00; BETA: 18.45 × 1,000 = 18,450.00; GAMMA: 101.30 × 50 = 5,065.00.
2. Total = 10,420 + 18,450 + 5,065 = **USD 33,935.00**.
3. Weights: 10,420 / 33,935 = 30.71%; 18,450 / 33,935 = **54.37%**; 5,065 / 33,935 = 14.93%.
4. The displayed weights add to 100.01% only because of rounding; the unrounded weights sum to exactly 1.

Keeping prices and holdings in two dictionaries keyed by ticker means a new price feed simply replaces `prices` and the same code recomputes everything.

## Common exam traps
- **Off-by-one slicing.** `x[1:3]` returns two items (positions 1 and 2), not three.
- **Forgetting zero-based indexing.** The first cash flow is `cash_flows[0]`; `cash_flows[1]` is the year-1 flow.
- **Aliasing.** `b = a` does not copy; editing `b` edits `a`. Use `a.copy()`.
- **Missing keys.** `d["BB"]` raises `KeyError`; use `.get()` or test with `in`.
- **Trying to change a tuple.** Tuples are immutable; build a new tuple instead.

## Key takeaways
- Lists are ordered and mutable: ideal for cash flows and return series.
- Indexing starts at 0; slices include the start and exclude the stop.
- Dictionaries map keys to values for fast lookups such as ticker to price.
- Tuples are immutable records and support one-line unpacking.
- Comprehensions transform and filter collections concisely.
- Assignment creates an alias; call `.copy()` to get an independent list.
