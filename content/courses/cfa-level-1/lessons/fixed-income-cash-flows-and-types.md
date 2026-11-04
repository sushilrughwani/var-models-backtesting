---
title: "Fixed-Income Cash Flows and Types"
---

## Learning goals
- Describe bullet, fully amortising and partially amortising principal repayment structures.
- Calculate the level payment on a fully amortising bond and split it into interest and principal.
- Explain how sinking funds, floating-rate notes, step-up, credit-linked and payment-in-kind coupons work.
- Calculate the coupon on a floating-rate note from the reference rate and quoted margin.
- Explain how callable, putable and convertible bonds alter cash flows and who bears the risk.

## Explanation

### Principal repayment: when does the money come back?
The previous lesson listed a bond's features; now we trace how the cash flows.

- **Bullet bond**: coupons only until maturity, then the whole principal in one payment. Most government and corporate bonds are bullets.
- **Fully amortising bond**: every payment contains interest plus some principal, so the balance reaches zero at maturity, just like a car loan or mortgage.
- **Partially amortising bond**: some principal is repaid along the way, and a **balloon payment** settles the remainder at maturity.

A fully amortising bond with level payments uses the annuity formula from the time value of money lesson:

$$
A = \frac{r \times P}{1 - (1+r)^{-N}}
$$

where $A$ is the level payment per period, $P$ is the original principal, $r$ is the periodic interest rate and $N$ is the number of payments. In each period, interest = $r \times$ opening balance, and principal repaid = $A$ minus interest. Because the balance shrinks, the interest share falls and the principal share rises over time.

Amortisation reduces **credit risk** (less is outstanding over time) but adds **reinvestment risk** (cash arrives earlier).

### Sinking funds
A **sinking fund** requires the issuer to retire part of the issue on a schedule. The issuer can usually either buy bonds in the market or call them by lottery at a set sinking fund price (often par). Above par, the issuer calls at par (hurting holders who are drawn); below par, it buys in the market.

### Coupon structures
- **Fixed-rate**: same coupon every period.
- **Floating-rate note (FRN)**: coupon = market reference rate (MRR) + **quoted margin**, reset each period. The price stays near par if credit quality is unchanged. Caps limit the maximum coupon (protecting the issuer); floors set a minimum (protecting the investor). An **inverse floater** pays a fixed rate minus the reference rate, so its coupon falls when rates rise.

$$
\text{FRN coupon} = \frac{(\text{MRR} + \text{quoted margin}) \times F}{m}
$$

- **Step-up coupon**: the rate rises on a schedule or after a downgrade (**credit-linked**); **sustainability-linked** bonds step up if ESG targets are missed.
- **Payment-in-kind (PIK)**: the issuer may pay interest with more bonds rather than cash. Common in leveraged deals.
- **Deferred coupon**: no coupons for the first few years, then normal payments. A **zero-coupon bond** is the extreme: no coupons at all, sold at a discount, with the return coming from the gap between price and par.
- **Index-linked** bonds adjust coupons and/or principal to an inflation index.

### Embedded options
- **Callable bond**: the issuer may redeem early, typically after a lockout period, at a call price that may step down toward par. Calls are exercised when rates fall, so investors face reinvestment at lower rates and limited price upside. A **make-whole call** pays the PV of remaining cash flows at a small spread over government yields, so it is rarely used to refinance. Exercise can be American (any time after lockout), European (one date) or Bermudan (set dates).
- **Putable bond**: investors may sell back at a set price, usually par, which protects them when rates rise or credit worsens.
- **Convertible bond**: investors may exchange each bond for a fixed number of shares (the **conversion ratio**). **Conversion price** = par ÷ conversion ratio; **conversion value** = share price × conversion ratio. A **contingent convertible** (CoCo), issued by banks, converts automatically into equity or is written down when capital falls below a trigger: the option belongs effectively to the issuer.

## Worked example
A company issues a USD 100,000, 5-year, fully amortising bond with a 6% annual rate and level annual payments. Find the payment and the first two years of the schedule.

**Step 1 - level payment.** $r = 0.06$, $P = 100{,}000$, $N = 5$:

$$
A = \frac{0.06 \times 100{,}000}{1 - 1.06^{-5}} = 23{,}739.64
$$

**Step 2 - year 1.** Interest = 0.06 × 100,000 = 6,000.00. Principal = 23,739.64 − 6,000.00 = 17,739.64. Closing balance = 82,260.36.

**Step 3 - year 2.** Interest = 0.06 × 82,260.36 = 4,935.62. Principal = 23,739.64 − 4,935.62 = 18,804.02. Closing balance = 63,456.34.

By year 5, interest is only 1,343.75 and principal 22,395.89 clears the balance.

**Answer: annual payment of USD 23,739.64**, with the principal portion rising each year.

**FRN extension.** A USD 10,000,000 FRN pays quarterly at MRR + 150 bp. If MRR is 3.20% at reset, the next coupon is (0.032 + 0.015) × 10,000,000 ÷ 4 = **USD 117,500**.

## Common exam traps
- Treating the amortising payment as equal principal plus interest; with level payments the principal portion grows each period.
- Forgetting to divide the FRN annual rate by the payment frequency, or using last period's reference rate incorrectly (the rate set at the *start* of the period determines the coupon paid at its end).
- Saying a cap protects the investor; caps protect the issuer, floors protect the investor.
- Thinking a sinking fund only lowers risk; when bonds trade above par, being called at par is a loss for the holder.
- Treating a CoCo like an ordinary convertible: conversion is forced by a capital trigger, not chosen by the investor.

## Key takeaways
- Bullet, partially amortising and fully amortising structures differ in when principal is returned.
- Level payment = $rP / (1 - (1+r)^{-N})$; interest falls and principal rises over time.
- FRN coupon = (reference rate + quoted margin) × par ÷ frequency, reset each period.
- Step-up, credit-linked, PIK and deferred coupons shift risk between issuer and investor.
- Calls and CoCo triggers favour the issuer; puts and conversion rights favour the investor.
