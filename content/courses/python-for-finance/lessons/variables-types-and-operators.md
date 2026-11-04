---
title: "Variables, Data Types and Operators"
---

## Learning goals
- Create variables and identify the four basic types: `int`, `float`, `str` and `bool`.
- Apply arithmetic operators, including `//`, `%` and `**`, and predict their results.
- Explain why floating-point numbers such as `0.1 + 0.2` are not exact, and compare floats safely.
- Format money and percentages with f-strings.
- Convert between strings and numbers when reading data.

## Explanation

### Variables are labels
A variable is a name attached to a value: `price = 42.37` creates the value 42.37 and points the label `price` at it. Names should be lowercase with underscores (`sell_price`, not `SellPrice` or `sp`), cannot start with a digit, and are case-sensitive, so `Price` and `price` are different variables. There is no need to declare a type; Python works it out from the value.

### The four basic types

```python
shares = 150            # int
price = 42.37           # float
ticker = "ACME"         # str
is_long = True          # bool
print(type(shares), type(price), type(ticker), type(is_long))
```

```text
<class 'int'> <class 'float'> <class 'str'> <class 'bool'>
```

- **int**: whole numbers of any size (share counts, days, contract quantities).
- **float**: numbers with a decimal point (prices, rates, returns).
- **str**: text in quotes (tickers, sector names, ISINs).
- **bool**: `True` or `False`, the result of comparisons such as `pnl > 0`.

Booleans behave like the integers 1 and 0 in arithmetic, so `True + True` is `2`. This turns out to be very convenient later: adding up a list of "was this day a loss?" flags counts the losing days directly. Re-assigning a variable simply moves the label to a new value, which may even be of a different type, so keep names honest about what they hold.

### Arithmetic operators
| Operator | Meaning | Example | Result |
|---|---|---|---|
| `+ - *` | add, subtract, multiply | `3 * 4` | `12` |
| `/` | true division (always a float) | `7 / 2` | `3.5` |
| `//` | floor division (rounds down) | `7 // 2` | `3` |
| `%` | remainder (modulo) | `7 % 2` | `1` |
| `**` | power | `2 ** 10` | `1024` |

Precedence follows school maths: `**` first, then `* / // %`, then `+ -`. When in doubt, add parentheses.

```python
print(7 / 2, 7 // 2, 7 % 2, 2 ** 10)
print(-7 // 2)
print(0.1 + 0.2)
print(0.1 + 0.2 == 0.3)
print(round(0.1 + 0.2, 10) == 0.3)
```

```text
3.5 3 1 1024
-4
0.30000000000000004
False
True
```

Floor division rounds towards minus infinity, so `-7 // 2` is `-4`, not `-3`. Floor division and modulo are handy in finance: `days // 30` gives whole months and `month % 12` wraps a month counter into a year.

### Floating-point precision
Computers store floats in binary, and most decimals (such as 0.1) have no exact binary form. The error is tiny (around $10^{-17}$) and harmless for analysis, but it breaks *exact equality* tests. Compare floats with `round()` or `math.isclose()`, never with `==`. For accounting systems that must balance to the cent, Python's `decimal` module stores exact decimal values.

### Comparison and logical operators
`==`, `!=`, `<`, `<=`, `>`, `>=` return booleans. Combine conditions with `and`, `or` and `not`. Note that `=` assigns while `==` compares.

### Strings and f-strings
Strings can be joined with `+` and repeated with `*`. The most useful string feature for finance is the **f-string**, which inserts values into text with a format specification after a colon:
- `{x:,.2f}` adds thousands separators and 2 decimals: `14,469.95`
- `{r:.2%}` multiplies by 100 and adds a percent sign: `11.37%`
- `{t:6s}` pads text to 6 characters for aligned columns.

### Type conversion
Data read from files or user input often arrives as text. `"300" * 2` repeats the string; you must convert first.

```python
qty = "300"
print(qty * 2)
print(int(qty) * 2)
print(float("53.75") + 1)
```

```text
300300
600
54.75
```

## Worked example
You buy 300 shares at USD 48.20 and later sell at USD 53.75, paying a USD 9.95 commission on each trade. Compute the total cost, net proceeds, profit and return, and check whether the return beat 10%.

The return on the cash invested is

$$
R = \frac{\text{Proceeds} - \text{Cost}}{\text{Cost}}
$$

where Cost is purchase value plus the buy commission and Proceeds is sale value minus the sell commission.

```python
buy_price = 48.20
sell_price = 53.75
shares = 300
commission = 9.95       # per trade, charged on buy and on sell

cost = buy_price * shares + commission
proceeds = sell_price * shares - commission
pnl = proceeds - cost
ret = pnl / cost
print(f"Cost:     {cost:,.2f}")
print(f"Proceeds: {proceeds:,.2f}")
print(f"P&L:      {pnl:,.2f}")
print(f"Return:   {ret:.2%}")
print(pnl > 0 and ret > 0.10)
```

```text
Cost:     14,469.95
Proceeds: 16,115.05
P&L:      1,645.10
Return:   11.37%
True
```

Step by step:
1. Cost = 48.20 × 300 + 9.95 = 14,460.00 + 9.95 = 14,469.95.
2. Proceeds = 53.75 × 300 − 9.95 = 16,125.00 − 9.95 = 16,115.05.
3. P&L = 16,115.05 − 14,469.95 = 1,645.10.
4. Return = 1,645.10 / 14,469.95 = 0.11369, displayed as **11.37%**, which exceeds 10%, so the final check prints `True`.

## Common exam traps
- **Formatting a percentage twice.** If `ret` is already 11.37 (a percent), `{ret:.2%}` shows `1137.00%`. Keep rates as decimals and let `%` do the scaling.
- **Testing floats with `==`.** `0.1 + 0.2 == 0.3` is `False`. Round or use `math.isclose()`.
- **Forgetting that `/` always returns a float.** `10 / 2` is `5.0`, not `5`. Use `//` only when you truly want whole units.
- **Floor division with negatives.** `-7 // 2` is `-4` because it rounds down, not towards zero.
- **Doing arithmetic on text.** `"300" * 2` gives `"300300"`. Convert with `int()` or `float()` first.

## Key takeaways
- Variables are labels; Python infers the type from the value.
- The core types are `int`, `float`, `str` and `bool`; check with `type()`.
- `/` gives a float, `//` floors, `%` gives the remainder, `**` raises to a power.
- Floats carry tiny binary errors, so compare with a tolerance, not `==`.
- f-strings such as `{x:,.2f}` and `{r:.2%}` produce report-ready numbers.
- Convert text to numbers with `int()` and `float()` before calculating.
