---
title: "Time Value of Money and Bond Pricing in Python"
duration: 22
---

## Lecture outline
- 00:00 - Hook: "a calculator does one bond; a function does ten thousand" - pricing a whole bond book in one loop
- 02:00 - The single discounted-sum idea and `np.arange` exponents
- 05:00 - `npv()` and `irr()` with `scipy.optimize.brentq`
- 09:00 - `bond_price()` with a `freq` argument
- 12:00 - `bond_ytm()` and the price → yield → price round trip
- 15:00 - Duration: Macaulay, modified, and the convexity gap
- 19:00 - Exam traps
- 21:00 - Recap and homework

## Slides
### Slide 1: TVM and Bond Pricing in Python
- Turn formulas into tested, reusable functions
- NPV, IRR, bond price, YTM, duration
- NumPy for the sums, SciPy for the solving

### Slide 2: One Formula to Rule Them All
- $PV = \sum CF_t / (1+r)^t$
- `t = np.arange(len(cfs))` → exponents 0, 1, 2, ...
- Vectorised: no explicit loop needed

### Slide 3: NPV and IRR
- `npv(rate, cfs)` - first cash flow at t = 0
- IRR: rate where NPV = 0, no closed form
- `brentq(f, lo, hi)` needs f(lo) and f(hi) of opposite sign

### Slide 4: Example Project
- Cash flows −1,000, 300, 400, 500
- NPV at 8% = 17.63 → accept
- IRR = 8.8963% > 8% hurdle

### Slide 5: Bond Price Function
- Coupon per period = face × coupon rate / freq
- Periods n = years × freq; yield per period = y / freq
- Face added to the last cash flow

### Slide 6: Premium, Par, Discount
- 5-year 6% bond at 5% YTM → 104.3295 (premium)
- Same bond at 6% → 100 (par)
- Coupon > yield ⇔ price > par

### Slide 7: Solving for Yield
- `brentq(lambda y: bond_price(...) - price, -0.5, 1.0)`
- Round trip: price at 5%, solve → 5.0000%
- Use round trips as unit tests

### Slide 8: Duration
- Macaulay: PV-weighted average time (years) = 4.4778
- Modified = Macaulay / (1 + y/m) = 4.2645
- ΔP ≈ −D_mod × Δy × P

### Slide 9: The Convexity Gap
- Estimate for +1%: −4.4492
- Actual repricing: −4.3295
- Duration overstates losses and understates gains

### Slide 10: Exam Traps
- t starts at 0 for NPV, at 1 for bonds
- Semiannual: divide coupon and yield, double periods
- Bad bracket → ValueError

### Slide 11: Key Takeaways
- Everything is a discounted sum
- Root finders replace trial and error
- Duration is a linear approximation

## Whiteboard examples
1. **NPV.** Cash flows −500, 200, 200, 200 at 10%.
   - PVs: 181.8182, 165.2893, 150.2630; total 497.3704.
   - NPV = 497.3704 − 500 = −2.63. Reject. (IRR is therefore just below 10%.)
2. **Semiannual bond.** 2 years, 4% coupon, face 100, YTM 6%.
   - Coupon per half-year = 2; yield per half-year = 3%; n = 4.
   - Price = 2/1.03 + 2/1.03² + 2/1.03³ + 102/1.03⁴ = 96.2829.
   - In code: `bond_price(100, 0.04, 0.06, 2, freq=2)`.
3. **Duration estimate.** Modified duration 7.2, price 95, yields rise 0.5%.
   - ΔP ≈ −7.2 × 0.005 × 95 = −3.42; new price ≈ 91.58.

## Questions to ask students
- Why does `npv` use `np.arange(len(cfs))` but `bond_price` uses `np.arange(1, n + 1)`? (The project's first cash flow is today, t = 0; a bond's first coupon arrives after one period)
- What happens if you call `brentq` with a bracket where NPV is positive at both ends? (It raises a ValueError)
- A bond's coupon is 3% and its yield is 4%. Above or below par? (Below par, a discount bond)
- What units is modified duration in? (Percentage price change per unit change in yield, not years)
- Does duration over- or under-estimate the price fall when yields rise? (Overestimates, because of positive convexity)

## Analogies
- Discounting is like converting foreign currency: a cash flow in year 5 is "year-5 money" and the discount factor is the exchange rate into today's money.
- `brentq` is a game of "higher or lower" with a guarantee: as long as one end is too high and the other too low, it will always home in on the answer.
- Macaulay duration is the balance point of a seesaw where each cash flow's present value is a weight sitting at its payment date.

## Recording tips
- Build the functions incrementally on screen and run the round-trip YTM test immediately; students love seeing 5.0000% come back.
- Plot price against yield (`np.linspace(0.01, 0.10, 50)`) to show convexity visually after the duration segment.
- Emphasise the `freq` argument; most student bugs in this lesson are semiannual conversions.
