---
title: "Interest Rates: Spot, Forward and Par"
duration: 28
---

## Lecture outline
- 00:00 - Hook: three traders quote "the 18-month rate" as 3.57%, 3.58% and 4.32%. Who is wrong? (Nobody.)
- 03:00 - Discount factors as the bridge; spot rate definition and conversion formula.
- 07:00 - Bootstrapping logic; Whiteboard 1: three bonds to three discount factors and spot rates.
- 13:00 - Forward rates: no-arbitrage argument, formula from discount factors.
- 17:00 - Whiteboard 2: 6-month forwards from the bootstrapped curve.
- 20:00 - Par rates and the annuity factor; link to swap rates.
- 23:00 - Whiteboard 3: 1.5-year par rate; the ordering forward > spot > par.
- 26:00 - Recap and exam traps.

## Slides
### Slide 1: Spot, Forward and Par Rates
- Three ways to quote one curve
- Discount factors connect them all
- Today: bootstrapping, forwards, par rates, ordering

### Slide 2: Spot Rates
- Yield on a single payment at one date
- d(t) = 1 / (1 + r/2)^(2t) with semiannual compounding
- r(t) = 2[d(t)^(−1/(2t)) − 1]

### Slide 3: Bootstrapping
- Start with the shortest bond (one cash flow)
- Value earlier coupons with known factors, subtract from price
- Divide the remainder by the final cash flow

### Slide 4: Forward Rates
- Rate locked in today for a future period
- 1 + f(t)/2 = d(t − 0.5) / d(t)
- No arbitrage: invest long, or invest short and roll at the forward

### Slide 5: Spot as an Average of Forwards
- (1 + r/2)^(2t) = product of (1 + f/2) terms
- Rising spots require forwards above spot
- Forward rate = marginal rate; spot rate = average rate

### Slide 6: Par Rates
- Coupon that prices the bond at face value
- C(T) = 2[1 − d(T)] / Σ d
- Σ d is the annuity factor

### Slide 7: Why Par Rates Matter
- New bonds are typically issued near par
- Swap rates are par rates
- Par yield curve is what most screens show

### Slide 8: Ordering the Curves
- Upward slope: forward > spot > par
- Downward slope: forward < spot < par
- Flat: all equal

### Slide 9: Why Par Sits Below Spot in a Rising Curve
- Coupons arrive early, at low short rates
- Par yield is weighted toward earlier, lower rates
- The final-date spot rate sees only the long rate

### Slide 10: Exam Traps
- Bootstrapping without subtracting coupons
- Arithmetic averaging instead of compounding
- Wrong compounding frequency

### Slide 11: Recap
- One set of discount factors, three curves
- Forward = marginal, spot = average, par = coupon-weighted average
- Use discount factors as the bridge

## Whiteboard examples
**Example 1 - bootstrap.** Bonds (semiannual, face 100): 0.5-year 2.0% at 99.60; 1-year 3.0% at 99.80; 1.5-year 3.5% at 99.90.
- d(0.5) = 99.60 / 101 = 0.986139
- d(1) = (99.80 − 1.5 × 0.986139) / 101.5 = 98.320792 / 101.5 = 0.968678
- d(1.5) = (99.90 − 1.75 × 1.954817) / 101.75 = 96.479071 / 101.75 = 0.948197
- Spot rates: 2.8112%, 3.2078%, 3.5778%

**Example 2 - forwards.**
- f(0.5) = 2.8112% (first forward equals first spot)
- f(1) = 2 × (0.986139 / 0.968678 − 1) = 3.6051%
- f(1.5) = 2 × (0.968678 / 0.948197 − 1) = 4.3199%
- Check: forwards rise faster than spots, as the averaging argument predicts

**Example 3 - par rate.**
- Annuity factor = 0.986139 + 0.968678 + 0.948197 = 2.903014
- C(1.5) = 2 × (1 − 0.948197) / 2.903014 = **3.5689%**
- Ordering at 1.5 years: 4.3199% > 3.5778% > 3.5689%

## Questions to ask students
- Why is the first forward rate always equal to the first spot rate? (Both cover the same period starting today.)
- If the 1-year spot rate is 3% and the 2-year spot rate is 4% (annual compounding), is the 1-year rate one year forward above or below 4%? (Above: 1.04²/1.03 − 1 ≈ 5.01%.)
- What is the sum of discount factors called and what does it represent? (The annuity factor: value of 1 paid every period.)
- In a downward-sloping curve, which is highest: par, spot or forward? (Par.)
- Why do we subtract earlier coupons when bootstrapping? (They are discounted at shorter rates already known; only the final cash flow carries the new unknown.)

## Analogies
- Forward versus spot is like your latest exam score versus your running average: to raise the average, the newest score must be above it.
- Bootstrapping is climbing a ladder: you can only stand on rung two after securing rung one.
- The par rate is a blended price, like the average cost of a shopping basket where cheaper items (early coupons) pull the average down.

## Recording tips
- Keep the three curves on one chart on screen so students see the ordering visually.
- Students get lost converting discount factors to spot rates; show the exponent −1/(2t) explicitly for each maturity.
- Carry six decimals for discount factors; rounding early distorts forwards noticeably.
