---
title: "Time Value of Money and Bond Pricing in Python"
---

## Learning goals
- Write reusable Python functions for NPV and IRR.
- Price a fixed-coupon bond for any coupon frequency with NumPy.
- Solve for yield to maturity with a numerical root finder from SciPy.
- Calculate Macaulay and modified duration and use them to estimate price changes.

## Explanation

### One idea behind everything
A cash flow received at time $t$ is worth less today because money can earn interest in the meantime. Discounting at rate $r$ gives its present value, and every valuation in this lesson is just a sum of present values:

$$
PV = \sum_{t=0}^{T} \frac{CF_t}{(1 + r)^t}
$$

where $CF_t$ is the cash flow at the end of period $t$ and $r$ is the discount rate per period. In the earlier functions lesson you wrote a single-cash-flow TVM calculator; here you vectorise it with NumPy so one line handles any number of cash flows.

### NPV and IRR
**NPV** applies the formula with $CF_0$ usually negative (the investment). **IRR** is the rate that makes NPV exactly zero. There is no closed-form solution for IRR, so we hand the NPV function to `scipy.optimize.brentq`, which searches an interval where the function changes sign. Brent's method is robust: it always converges if you give it a bracket with opposite signs at the ends.

### Bond price
A bond with face value $F$, annual coupon rate $c$, $m$ payments per year, $n$ total periods and annual yield $y$ is priced as

$$
P = \sum_{k=1}^{n} \frac{cF/m}{(1 + y/m)^k} + \frac{F}{(1 + y/m)^n}
$$

Each coupon is $cF/m$; the face value is repaid with the last coupon. The yield to maturity (YTM) is the single rate $y$ that makes this price equal to the market price, and again we find it with `brentq`.

### Duration
Macaulay duration is the present-value-weighted average time to receive the cash flows (in years):

$$
D_{\text{Mac}} = \frac{\sum_k (k/m)\, PV_k}{P}, \qquad D_{\text{mod}} = \frac{D_{\text{Mac}}}{1 + y/m}
$$

where $PV_k$ is the present value of the $k$-th cash flow. Modified duration $D_{\text{mod}}$ gives the approximate percentage price change for a change in yield: $\Delta P \approx -D_{\text{mod}} \times \Delta y \times P$.

### The code
```python
import numpy as np
from scipy.optimize import brentq

def npv(rate, cfs):
    t = np.arange(len(cfs))
    return np.sum(np.asarray(cfs) / (1 + rate) ** t)

def irr(cfs):
    return brentq(lambda r: npv(r, cfs), -0.99, 1.0)

def bond_price(face, coupon_rate, ytm, years, freq=1):
    n = int(years * freq)
    c = face * coupon_rate / freq
    t = np.arange(1, n + 1)
    cfs = np.full(n, c)
    cfs[-1] += face
    return np.sum(cfs / (1 + ytm / freq) ** t)

def bond_ytm(price, face, coupon_rate, years, freq=1):
    return brentq(lambda y: bond_price(face, coupon_rate, y, years, freq) - price, -0.5, 1.0)

def durations(face, coupon_rate, ytm, years, freq=1):
    n = int(years * freq)
    c = face * coupon_rate / freq
    t = np.arange(1, n + 1)
    cfs = np.full(n, c)
    cfs[-1] += face
    pv = cfs / (1 + ytm / freq) ** t
    mac = np.sum(t / freq * pv) / pv.sum()
    return mac, mac / (1 + ytm / freq)

cfs = [-1000, 300, 400, 500]
print(f"NPV at 8%: {npv(0.08, cfs):.2f}")
print(f"IRR:       {irr(cfs):.4%}")

p = bond_price(100, 0.06, 0.05, 5)
print(f"Price:     {p:.4f}")
print(f"YTM back:  {bond_ytm(p, 100, 0.06, 5):.4%}")
mac, mod = durations(100, 0.06, 0.05, 5)
print(f"Macaulay:  {mac:.4f}  Modified: {mod:.4f}")
dp_est = -mod * 0.01 * p
print(f"Est. change for +1%: {dp_est:.4f}  Actual: {bond_price(100,0.06,0.06,5)-p:.4f}")
print(f"Semiannual price: {bond_price(100, 0.06, 0.05, 5, freq=2):.4f}")
```

Output:

```
NPV at 8%: 17.63
IRR:       8.8963%
Price:     104.3295
YTM back:  5.0000%
Macaulay:  4.4778  Modified: 4.2645
Est. change for +1%: -4.4492  Actual: -4.3295
Semiannual price: 104.3760
```

Notice the round trip: pricing at 5% and then solving for YTM recovers exactly 5%. That is a cheap unit test you should always run on your own functions.

## Worked example
**Part 1: project NPV and IRR.** A project costs 1,000 today and returns 300, 400 and 500 at the end of years 1-3. Discount rate 8%.
1. PV of year 1: 300 / 1.08 = 277.7778.
2. PV of year 2: 400 / 1.08² = 342.9355.
3. PV of year 3: 500 / 1.08³ = 396.9161.
4. NPV = −1,000 + 277.7778 + 342.9355 + 396.9161 = **17.63**. Positive, so accept.
5. `brentq` finds the IRR at **8.8963%**, above the 8% hurdle, which agrees with the positive NPV.

**Part 2: bond price and duration.** 5-year annual-pay bond, face 100, 6% coupon, YTM 5%.
1. Coupons of 6 discounted: 5.7143, 5.4422, 5.1830, 4.9362.
2. Final payment 106 / 1.05⁵ = 83.0538.
3. Price = sum = **104.3295**. The bond trades above par because its coupon (6%) beats the yield (5%).
4. Macaulay duration is 4.47775 years; modified duration = 4.47775 / 1.05 = 4.2645.
5. Duration estimate for a +1% yield move: −4.2645 × 0.01 × 104.3295 = −4.4492. Full repricing at 6% gives exactly 100, a change of −4.3295. The estimate is too pessimistic because of convexity: the true price-yield curve bends upward.

## Common exam traps
- Starting the discounting exponent at 1 for `npv` when the first cash flow is at time 0. Note `np.arange(len(cfs))` starts at 0, while the bond uses `np.arange(1, n + 1)`.
- Forgetting to divide both coupon and yield by the frequency for semiannual bonds, or forgetting to double the number of periods.
- Giving `brentq` a bracket where the function has the same sign at both ends; it raises a `ValueError` instead of guessing.
- Reading modified duration as years. Macaulay duration is in years; modified duration is a price sensitivity.
- Treating the duration estimate as exact. For large yield moves add a convexity term or simply reprice.

## Key takeaways
- NPV, bond price and duration are all variations of one discounted sum, vectorised with `np.arange`.
- IRR and YTM have no closed form; `scipy.optimize.brentq` solves them reliably given a sign-changing bracket.
- A bond priced above par has a coupon above its yield.
- Modified duration ≈ percentage price change per 1.00 change in yield; convexity explains the gap from full repricing.
- Test pricing functions with round trips (price → yield → price).
