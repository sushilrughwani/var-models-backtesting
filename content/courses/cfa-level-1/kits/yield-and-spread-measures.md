---
title: "Yield and Yield Spread Measures"
duration: 28
---

## Lecture outline
- 00:00 - Hook: two bonds both "yield 6%". One pays semiannually, one annually. Are they the same? Vote, then reveal.
- 03:00 - Periodicity conversions and effective annual yield; street convention versus true yield.
- 07:00 - Current yield and its blind spots.
- 09:00 - Callable bonds: yield to call, yield to worst, option-adjusted yield; whiteboard example.
- 14:00 - FRNs: quoted margin versus discount margin.
- 16:00 - Money market quotes: discount rate, add-on rate, bond-equivalent yield; whiteboard example.
- 21:00 - Yield spreads: G-spread with interpolation, I-spread, Z-spread, OAS.
- 26:00 - Recap and preview of the term structure.

## Slides
### Slide 1: Yield and Yield Spread Measures
- A yield is meaningless without its compounding basis
- Different instruments, different quoting conventions
- Spreads separate macro from issuer-specific risk

### Slide 2: Periodicity Conversion
- (1 + APR_m/m)^m = (1 + APR_n/n)^n
- 6% semiannual = 6.09% effective annual
- More frequent compounding, lower stated rate

### Slide 3: Street Convention vs True Yield
- Street: assumes payments on scheduled dates
- True: uses actual dates (weekends, holidays)
- Semiannual bond basis: common quoting standard

### Slide 4: Current Yield
- Annual coupon ÷ flat price
- Ignores pull to par and timing
- Overstates return on premium bonds

### Slide 5: Yield to Call and Yield to Worst
- Replace maturity with call date and par with call price
- Compute a YTC for each call date
- Yield to worst = lowest of YTM and all YTCs
- Option-adjusted yield removes option value with a model

### Slide 6: FRN Margins
- Quoted margin: fixed in contract
- Discount margin: what the market requires now
- DM > QM: discount; DM < QM: premium

### Slide 7: Money Market Discount Rate
- PV = FV × (1 − Days/Year × DR)
- Rate is a % of face value
- Understates the true return

### Slide 8: Add-On Rate and Bond-Equivalent Yield
- AOR = (Year/Days) × (FV − PV)/PV
- Rate is a % of the price paid
- BEY = add-on rate on a 365-day year

### Slide 9: G-Spread and I-Spread
- G-spread: over government yield of same maturity (interpolate if needed)
- I-spread: over swap rate of same maturity
- Benchmark = macro; spread = credit, liquidity, tax

### Slide 10: Z-Spread and OAS
- Z-spread: constant spread over every spot rate that reprices the bond
- OAS = Z-spread − option value (bp)
- Callable: OAS < Z; putable: OAS > Z

### Slide 11: Recap
- Convert before comparing
- Investors assume the worst on callables
- Pick the spread that matches the benchmark and the option features

## Whiteboard examples
**Example 1 - yield to worst.** 5-year 6% annual bond, price 104, callable in 2 years at 102.
- Current yield = 6/104 = 5.77%
- YTM: N = 5, PMT = 6, FV = 100, PV = −104, CPT I/Y = 5.07%
- YTC: N = 2, PMT = 6, FV = 102, PV = −104, CPT I/Y = 4.83%
- Yield to worst = **4.83%**

**Example 2 - money market.** 90-day bill, face 100, discount rate 4%.
- PV = 100 × (1 − 0.25 × 0.04) = 99.00
- AOR (360) = 4 × 1/99 = 4.04%
- BEY (365) = (365/90) × 1/99 = **4.10%**

**Example 3 - G-spread.** Corporate 5-year yields 5.40%. Gov 4-year 3.80%, 6-year 4.20%. Interpolated 5-year = 4.00%. G-spread = **140 bp**.

**Bonus - periodicity.** Convert 4% quarterly to semiannual: (1.01)^2 − 1 = 2.01% per half-year, so 4.02% semiannual.

## Questions to ask students
- Which is higher: 5% compounded monthly or 5% compounded annually, in effective terms? (Monthly.)
- Why is the yield to worst the investor's conservative measure? (The issuer calls when it benefits the issuer, which is when it hurts the investor.)
- A bill's discount rate is 3%. Is its bond-equivalent yield higher or lower than 3%? (Higher - it divides by price and uses 365 days.)
- An FRN's discount margin rises above its quoted margin. Premium or discount? (Discount.)
- For a putable bond, is the OAS larger or smaller than the Z-spread? (Larger - the put has value to the investor, which is added back.)

## Analogies
- Periodicity is like quoting a car's fuel use in km per litre or miles per gallon: same car, different units; convert before comparing.
- Yield to worst is planning your commute assuming the worst traffic: you will not be disappointed.
- The Z-spread is a uniform "risk surcharge" stamped on every point of the government curve.

## Recording tips
- Do every yield calculation on the financial calculator on screen; YTC keystrokes are a common stumbling point.
- Draw the government curve and a parallel line above it to illustrate the Z-spread visually.
- Students confuse the discount rate with the add-on rate; put both formulas side by side and circle the denominators.
