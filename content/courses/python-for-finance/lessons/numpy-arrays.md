---
title: "NumPy Arrays and Vectorised Calculations"
---

## Learning goals
- Create NumPy arrays and describe their shape and data type.
- Compute returns, discount factors and NPV with vectorised expressions instead of loops.
- Calculate means and standard deviations, choosing correctly between `ddof=0` and `ddof=1`.
- Filter data with boolean masks and `np.where`.
- Use two-dimensional arrays, `axis` and broadcasting for multi-asset calculations.

## Explanation

### Why arrays?
A Python list is a flexible container, but arithmetic on it is clumsy: `[1, 2] * 2` repeats the list instead of doubling the numbers, and loops over millions of items are slow. A **NumPy array** stores numbers of one type in a contiguous block of memory and applies operations to every element at once. This *vectorisation* makes code shorter, closer to the maths, and typically many times faster than an equivalent Python loop.

```python
import numpy as np
a = np.array([1, 2, 3])
b = a
b[0] = 99
print(a)
c = np.array([1, 2, 3]) / 2
print(np.array([1, 2, 3]).dtype, c.dtype)
print([1, 2] * 2, np.array([1, 2]) * 2)
```

```text
[99  2  3]
int64 float64
[1, 2, 1, 2] [2 4]
```

Two lessons from this block: array arithmetic is element-wise, and, just as with lists, `b = a` makes an alias, not a copy (use `a.copy()`).

### Vectorised returns
The simple return between consecutive prices is

$$
r_t = \frac{P_t}{P_{t-1}} - 1
$$

where $P_t$ is the price at time $t$. With arrays, "all prices except the first" is `prices[1:]` and "all prices except the last" is `prices[:-1]`. Dividing the two lines them up so each price is divided by the one before it.

```python
import numpy as np

prices = np.array([100.0, 102.0, 99.5, 101.0, 104.5])
returns = prices[1:] / prices[:-1] - 1
print(returns.round(4))
print(prices.shape, returns.shape, prices.dtype)
```

```text
[ 0.02   -0.0245  0.0151  0.0347]
(5,) (4,) float64
```

Five prices give four returns, which the shapes confirm.

### Discounting without a loop
In Lesson 3 we discounted cash flows with a `for` loop. With NumPy, build the time index with `np.arange`, compute every discount factor at once, and take the **dot product** (`@`) of cash flows and discount factors:

$$
NPV = \sum_{t} CF_t \, d_t, \qquad d_t = (1+r)^{-t}
$$

```python
import numpy as np

rate = 0.08
cash_flows = np.array([-1000, 300, 400, 500])
t = np.arange(len(cash_flows))
discount = (1 + rate) ** -t
print(t)
print(discount.round(4))
print(round(cash_flows @ discount, 2))
```

```text
[0 1 2 3]
[1.     0.9259 0.8573 0.7938]
17.63
```

The answer matches the loop version exactly, in three lines.

### Boolean masks
A comparison on an array returns an array of `True`/`False`. Using it inside square brackets keeps only the `True` positions, and summing it counts them (booleans act as 1 and 0).

```python
import numpy as np

r = np.array([0.012, -0.034, 0.005, -0.021, 0.018, -0.002])
mask = r < 0
print(mask)
print(r[mask], mask.sum())
print(np.where(r < 0, 0.0, r))
```

```text
[False  True False  True False  True]
[-0.034 -0.021 -0.002] 3
[0.012 0.    0.005 0.    0.018 0.   ]
```

`np.where(condition, a, b)` is the vectorised version of an if/else: here it floors losses at zero.

### Two dimensions, axis and broadcasting
Store daily returns for several assets as a 2-D array with rows as days and columns as assets. `axis=0` aggregates *down* the rows (one result per column); `axis=1` aggregates across columns. Matrix multiplication by a weight vector gives the portfolio return for each day, and **broadcasting** lets you subtract a one-row array of column means from every row automatically.

```python
import numpy as np

# rows = days, columns = assets
R = np.array([[ 0.010, 0.002, -0.004],
              [-0.006, 0.001,  0.008],
              [ 0.004, 0.003,  0.002]])
w = np.array([0.5, 0.3, 0.2])
print(R.mean(axis=0).round(4))     # per asset
print(R @ w)                       # portfolio return each day
print((R - R.mean(axis=0)).round(4))  # broadcasting: demean each column
```

```text
[0.0027 0.002  0.002 ]
[ 0.0048 -0.0011  0.0033]
[[ 0.0073  0.     -0.006 ]
 [-0.0087 -0.001   0.006 ]
 [ 0.0013  0.001   0.    ]]
```

Day 1 portfolio return: $0.5(0.010) + 0.3(0.002) + 0.2(-0.004) = 0.0048$.

## Worked example
Using the five prices above (100, 102, 99.5, 101, 104.5), compute the mean daily return, the population and sample standard deviations, the cumulative return and an annualised volatility assuming 252 trading days.

The sample standard deviation divides by $n-1$:

$$
s = \sqrt{\frac{1}{n-1}\sum_{t=1}^{n}(r_t - \bar r)^2}
$$

where $\bar r$ is the mean return and $n$ the number of returns. NumPy's `std()` divides by $n$ unless you pass `ddof=1` ("delta degrees of freedom").

```python
import numpy as np

prices = np.array([100.0, 102.0, 99.5, 101.0, 104.5])
r = prices[1:] / prices[:-1] - 1

print(round(r.mean(), 6))
print(round(r.std(), 6), round(r.std(ddof=1), 6))
print(round(np.prod(1 + r) - 1, 6), round(prices[-1] / prices[0] - 1, 6))
print(round(r.std(ddof=1) * np.sqrt(252), 4))
```

```text
0.011305
0.021896 0.025283
0.045 0.045
0.4014
```

Step by step:
1. Returns: 2.00%, −2.45%, 1.51%, 3.47%; mean = **1.1305%** per day.
2. Population std (divide by 4) = 2.1896%; sample std (divide by 3) = **2.5283%**. With only four observations the difference is large.
3. Cumulative return: compounding the growth factors gives 4.5%, identical to 104.5 / 100 − 1, a useful check.
4. Annualised volatility ≈ 0.025283 × √252 = **40.14%**, using the square-root-of-time rule for independent daily returns.

## Common exam traps
- **Using the default `ddof=0` for a sample.** NumPy's `std()` is the population formula; pandas (next lesson) defaults to `ddof=1`. Be explicit.
- **Misaligned slices.** `prices[1:] / prices[:-1]` is correct; `prices / prices[:-1]` fails because the shapes (5,) and (4,) do not match.
- **Wrong axis.** On a days × assets array, `axis=0` gives per-asset statistics; `axis=1` gives per-day statistics.
- **Aliasing.** `b = a` shares memory; slices are also views, so edit a `.copy()` when you need independence.
- **Integer arrays.** Arrays created from whole numbers have an integer dtype; assigning `0.5` into one silently truncates to 0. Create with floats when values may be fractional.

## Key takeaways
- NumPy arrays apply arithmetic element-wise, giving fast, loop-free code.
- `prices[1:] / prices[:-1] - 1` produces a full return series in one line.
- Discount factors from `np.arange` plus a dot product (`@`) compute NPV.
- Boolean masks filter and count; `np.where` is a vectorised if/else.
- `axis=0` aggregates down columns; broadcasting stretches smaller arrays to fit.
- Pass `ddof=1` for a sample standard deviation.
