---
title: "Fixed-Income Cash Flows and Types"
duration: 22
---

## Lecture outline
- 00:00 - Hook: draw three timelines (bullet, mortgage-style, balloon) and ask which one a nervous lender would prefer.
- 02:30 - Principal repayment structures: bullet, fully amortising, partially amortising with balloon.
- 05:00 - Amortising payment formula and live schedule for the 5-year, 6% example.
- 09:00 - Sinking funds: market purchase versus lottery call, and when each hurts holders.
- 11:00 - Coupon structures: FRNs (with live coupon calculation), caps, floors, inverse floaters.
- 14:00 - Step-up, credit-linked, sustainability-linked, PIK, deferred, zero and index-linked.
- 17:00 - Embedded options: callable (styles, make-whole), putable, convertible, CoCos.
- 20:30 - Recap and preview of issuance and trading.

## Slides
### Slide 1: Fixed-Income Cash Flows and Types
- Features tell us what the bond is
- Cash flow structures tell us when money moves
- Three questions: principal timing, coupon type, embedded options

### Slide 2: Principal Repayment Structures
- Bullet: all principal at maturity
- Fully amortising: balance reaches zero by maturity
- Partially amortising: some principal along the way, balloon at end
- Earlier principal = less credit risk, more reinvestment risk

### Slide 3: The Level-Payment Formula
- A = rP / (1 − (1 + r)^−N)
- Interest = r × opening balance
- Principal = payment − interest
- Interest share falls, principal share rises

### Slide 4: Sinking Funds
- Issuer retires part of the issue on a schedule
- Buys in the market if bonds trade below par
- Calls at sinking fund price (often par) if bonds trade above par
- Lower credit risk, but call-at-par risk for holders

### Slide 5: Floating-Rate Notes
- Coupon = MRR + quoted margin, reset each period
- Price stays near par if credit is unchanged
- Cap protects issuer; floor protects investor
- Inverse floater: coupon moves opposite to rates

### Slide 6: Contingent and Special Coupons
- Step-up and credit-linked: coupon rises on schedule or downgrade
- Sustainability-linked: coupon rises if targets missed
- PIK: pay interest with more bonds
- Deferred and zero-coupon: return comes later or only from discount

### Slide 7: Index-Linked Bonds
- Coupons and/or principal adjust with an inflation index
- Protect real purchasing power
- Investor still bears real-rate risk

### Slide 8: Callable Bonds
- Issuer redeems early, usually after rates fall
- Lockout period, call schedule stepping down to par
- American, European, Bermudan exercise
- Make-whole call: expensive for the issuer, rarely a refinancing tool

### Slide 9: Putable and Convertible Bonds
- Put: investor sells back at set price when rates rise
- Convertible: exchange for shares; conversion ratio fixed
- Conversion price = par ÷ conversion ratio
- Conversion value = share price × conversion ratio

### Slide 10: Contingent Convertibles
- Bank-issued; convert or write down at a capital trigger
- Conversion is forced, not chosen
- Higher yield for bearing loss-absorption risk

### Slide 11: Recap
- Timing of principal shapes credit and reinvestment risk
- Coupon design shifts rate and credit risk
- Options belong to someone: identify who and price it

## Whiteboard examples
**Example 1 - amortising schedule.** USD 100,000, 5 years, 6% annual, level payments.
A = 0.06 × 100,000 / (1 − 1.06^−5) = **23,739.64**.

| Year | Interest | Principal | Closing balance |
|---|---|---|---|
| 1 | 6,000.00 | 17,739.64 | 82,260.36 |
| 2 | 4,935.62 | 18,804.02 | 63,456.34 |
| 3 | 3,807.38 | 19,932.26 | 43,524.08 |
| 4 | 2,611.44 | 21,128.20 | 22,395.89 |
| 5 | 1,343.75 | 22,395.89 | 0.00 |

Point out that the principal column sums to 100,000.

**Example 2 - FRN coupon.** USD 10,000,000 FRN, quarterly, MRR + 150 bp, MRR at reset = 3.20%. Coupon = (3.20% + 1.50%) × 10,000,000 ÷ 4 = **USD 117,500**. Follow-up: with a 4.50% cap, the annual rate would be capped at 4.50% and the coupon would be 0.045 × 10,000,000 ÷ 4 = USD 112,500.

**Example 3 - convertible.** Par USD 1,000, conversion ratio 25, share price USD 44. Conversion price = 1,000 ÷ 25 = USD 40. Conversion value = 44 × 25 = **USD 1,100**, so the bond is worth at least 1,100 (in the money).

## Questions to ask students
- In a level-payment amortising bond, does the interest portion rise or fall over time? (Falls, because the outstanding balance shrinks.)
- If interest rates fall sharply, would the issuer satisfy a sinking fund by buying in the market or calling at par? (Calling at par, because market prices are above par.)
- Who benefits from a floor on an FRN? (The investor.)
- Why does an FRN trade close to par on reset dates? (Its coupon resets to current market rates, so only changes in credit spread move the price.)
- Is a CoCo's conversion option held by the investor? (No; conversion is triggered by bank capital levels, effectively favouring the issuer.)

## Analogies
- Bullet versus amortising: paying back a friend all at once at year-end versus a bit every month like a phone instalment plan.
- The FRN is a thermostat: the coupon automatically adjusts to market temperature, so the price stays comfortable near par.
- A PIK coupon is an IOU paid with more IOUs; fine if the borrower thrives, painful if it does not.

## Recording tips
- Build the amortisation table in a spreadsheet on screen and show the principal column summing to par.
- Students confuse caps and floors; state "cap protects the payer, floor protects the receiver" and repeat it.
- Use one consistent colour for issuer-favourable features and another for investor-favourable features throughout the slides.
