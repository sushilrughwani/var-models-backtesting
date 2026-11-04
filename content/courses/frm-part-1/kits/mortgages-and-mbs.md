---
title: "Mortgages and Mortgage-Backed Securities"
duration: 26
---

## Lecture outline
- 00:00 - Hook: you own a bond whose borrowers repay you early exactly when you least want the money. Welcome to MBS
- 03:00 - Fixed-rate mortgage mechanics and amortisation
- 06:00 - Whiteboard part 1: payment, interest and principal split
- 09:00 - Why borrowers prepay; CPR, SMM and PSA (whiteboard part 2)
- 14:00 - Agency pass-throughs; contraction risk, extension risk, negative convexity
- 18:00 - CMOs: sequential and PAC/support tranches; IO and PO strips
- 22:00 - TBA market, dollar rolls and OAS
- 24:00 - Exam traps and recap

## Slides
### Slide 1: Mortgages and MBS
- From a single home loan to traded securities
- Prepayment is the defining risk
- Links to credit risk transfer and the financial crisis lessons

### Slide 2: Fixed-Rate Mortgage
- Level monthly payment, fully amortising
- $P = \frac{Li}{1-(1+i)^{-n}}$
- Early payments mostly interest

### Slide 3: Why Borrowers Prepay
- Refinancing when rates fall (main driver)
- Home sales, defaults, curtailments
- Mortgage = bond + borrower's call option

### Slide 4: Measuring Prepayment
- CPR: annual rate; SMM = 1 - (1 - CPR)^(1/12)
- Prepayment = SMM x balance after scheduled principal
- PSA: CPR rises 0.2% per month to 6% at month 30

### Slide 5: Pass-Through Securities
- Agency pools; investors share all principal and interest
- Agency guarantee removes most credit risk
- Servicing and guarantee fees reduce the coupon

### Slide 6: Prepayment Risk
- Contraction: rates fall, cash returns early
- Extension: rates rise, cash returns late
- Result: negative convexity

### Slide 7: CMOs
- Sequential-pay: principal to A, then B, then C
- PAC: scheduled principal within a band
- Support tranches absorb prepayment variability

### Slide 8: IO and PO Strips
- PO gains when prepayments speed up
- IO loses when prepayments speed up
- IO can rise in value when rates rise

### Slide 9: Dollar Roll and OAS
- TBA trading; sell near month, buy back later at a drop
- Attractive when the drop exceeds the carry given up
- OAS: spread after removing the prepayment option cost

### Slide 10: Recap
- Annuity payment, SMM conversion, PSA ramp
- Prepayment risk is redistributed, not removed
- Next module: valuation and risk models

## Whiteboard examples
**Example 1: Mortgage payment.** USD 300,000, 30 years, 6%.
- i = 0.005, n = 360; P = 1,798.65.
- Month 1: interest 1,500.00; scheduled principal 298.65; balance 299,701.35.

**Example 2: Prepayment.** CPR 6%.
- SMM = 1 - 0.94^(1/12) = 0.5143%.
- Prepayment = 0.005143 x 299,701.35 = 1,541.37; total principal 1,840.02; ending balance 298,159.98.

**Example 3: PSA.** 200% PSA in month 12: CPR = 2 x 0.2% x 12 = 4.8%. 200% PSA in month 40: CPR = 2 x 6% = 12%.

## Questions to ask students
- Why are early mortgage payments mostly interest? (Interest is charged on a balance that is still nearly the full loan.)
- What is the CPR at month 30 under 100% PSA? (6%.)
- Which risk hurts a pass-through investor when rates fall? (Contraction risk.)
- Which strip benefits from faster prepayments? (The PO.)
- Does a PAC tranche eliminate prepayment risk for the whole deal? (No, it shifts it to support tranches.)

## Analogies
- A mortgage investor is a landlord whose tenants can leave whenever cheaper flats appear, and stay when rents rise elsewhere.
- Sequential tranches are a queue at a ticket window: the first in line is served first, the rest wait.
- An IO strip is like collecting rent on a building that shrinks every time a tenant moves out early.

## Recording tips
- Show an amortisation chart (interest versus principal over 360 months) on screen.
- Draw the PSA ramp as a line rising to 6% at month 30 then flat; students remember shapes better than rules.
- Slow down on IO behaviour; its negative duration surprises most students.
