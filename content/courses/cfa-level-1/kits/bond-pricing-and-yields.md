---
title: "Fixed-Income Bond Valuation: Prices and Yields"
duration: 32
---

## Lecture outline
- 00:00 - Hook: "Would you pay more than 100 for a bond that only repays 100?" Use it to motivate premium bonds.
- 03:00 - Price as PV of cash flows; YTM definition; semiannual adjustments.
- 08:00 - Whiteboard: price the 3-year 6% semiannual bond at 5% and at 7%.
- 12:00 - Premium, discount, par; inverse and convex price-yield relationship; pull to par.
- 16:00 - Spot rates and arbitrage-free pricing; whiteboard spot-rate example and implied YTM.
- 21:00 - Settlement between coupon dates: accrued interest, full and flat price, day counts.
- 27:00 - Whiteboard: full and flat price for the 4% bond.
- 29:30 - Matrix pricing for illiquid bonds.
- 31:00 - Recap.

## Slides
### Slide 1: Bond Valuation - Prices and Yields
- A bond is a bundle of future cash flows
- Price = present value of those cash flows
- Today: single-yield pricing, spot rates, full vs flat price

### Slide 2: The Pricing Formula
- PV = Σ PMT/(1 + r)^t + FV/(1 + r)^N
- r per period, N periods, PMT coupon per period
- Semiannual: halve coupon and yield, double years

### Slide 3: Yield to Maturity
- The single discount rate that equates PV to price
- Assumes hold to maturity, no default
- Assumes coupons reinvested at the YTM

### Slide 4: Premium, Discount, Par
- Coupon = yield: par
- Coupon > yield: premium
- Coupon < yield: discount

### Slide 5: Price-Yield Behaviour
- Inverse relationship
- Convex: price gains from yield falls exceed losses from equal rises
- Longer maturity and lower coupon: more sensitive
- Pull to par as maturity approaches

### Slide 6: Spot Rates
- Spot rate = yield on a zero for one maturity
- Discount each cash flow at its own spot rate
- Prevents arbitrage between bond and its strips
- YTM is a blend of the spot rates

### Slide 7: Why Accrued Interest Exists
- Settlement usually falls between coupons
- Seller earned part of the next coupon
- Buyer pays it in the invoice price

### Slide 8: Full Price
- PV_full = PV_last coupon × (1 + r)^(t/T)
- t = days since last coupon; T = days in period
- Compounded, not simple interest

### Slide 9: Accrued Interest and Flat Price
- AI = (t/T) × coupon per period
- Flat (clean, quoted) = full − AI
- Day count: actual/actual (governments), 30/360 (many corporates)

### Slide 10: Matrix Pricing
- Illiquid bond: no recent trades
- Use yields of comparable bonds, interpolate by maturity
- Price at the estimated yield; also used to set new-issue coupons

### Slide 11: Recap
- Discount the cash flows, mind the periodicity
- Spot rates for precision; YTM for summary
- Screens show flat price; you pay full price

## Whiteboard examples
**Example 1 - single yield.** 3-year, 6% semiannual, par 100, YTM 5%. PMT = 3, r = 2.5%, N = 6. PV = **102.75**. Repeat at 7% (r = 3.5%): PV = **97.34**. Highlight the asymmetry: +2.75 versus −2.66 for an equal 1% move, the first hint of convexity.

**Example 2 - spot rates.** 3-year, 5% annual bond; spot rates 3%, 4%, 4.5%.
- 5 / 1.03 = 4.8544
- 5 / 1.04² = 4.6228
- 105 / 1.045³ = 92.0111
- Price = **101.49**; implied YTM ≈ **4.46%**.

**Example 3 - full and flat price.** 4% semiannual, 10 periods left, YTM 5%, settlement 62 days into 180-day period.
- PV at last coupon = 95.6240
- Full = 95.6240 × 1.025^(62/180) = 96.4407
- AI = 62/180 × 2 = 0.6889
- Flat = **95.75**

## Questions to ask students
- A bond has a 3% coupon and the market yield is 4%. Premium or discount? (Discount.)
- If yields stay constant, what happens to a premium bond's price over time? (It falls toward par.)
- Why do we compound when moving the price forward to the settlement date? (Consistency with the yield's compounding; the PV grows at the periodic rate.)
- Which price is shown on a dealer screen, full or flat? (Flat.)
- A 10-year zero and a 10-year 8% coupon bond have the same yield. Which is more price sensitive? (The zero - lower coupon, more weight on the distant cash flow.)

## Analogies
- A bond is a box of cheques post-dated to different days; its price is what you would pay today for the whole box.
- Accrued interest is like splitting the rent when you move out mid-month: the new tenant reimburses you for the days you already covered.
- Spot rates are price tags for each individual cheque; the YTM is the single average price tag that gives the same total.

## Recording tips
- Show the calculator keystrokes (N, I/Y, PMT, FV, CPT PV) on screen for each pricing example.
- Students often forget to convert to semiannual; put "÷2, ÷2, ×2" in a corner of every slide that uses semiannual bonds.
- When doing full price, explicitly contrast compounding with the simple-interest shortcut and show the small but exam-relevant difference.
