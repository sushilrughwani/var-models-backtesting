---
title: "Asset-Backed and Mortgage-Backed Securities"
duration: 28
---

## Lecture outline
- 00:00 - Hook: you lend money for 30 years, but the borrower can hand it back whenever they like. What does that cost you?
- 03:00 - The prepayment option: contraction risk, extension risk and negative convexity
- 07:00 - Measuring speed: SMM, CPR, the PSA benchmark and WAL
- 11:00 - Whiteboard: mortgage payment, and a month of pass-through prepayments
- 16:00 - Pass-throughs, agency versus non-agency, and the pass-through rate versus WAC
- 18:00 - CMOs: sequential-pay, PAC/support and floaters
- 22:00 - CMBS: non-recourse loans, call protection and balloon risk
- 25:00 - Non-mortgage ABS: auto loans and credit cards; recap

## Slides
### Slide 1: Asset-Backed and Mortgage-Backed Securities
- Builds on securitisation: pools, SPEs and tranches
- New ingredient: the borrower's prepayment option
- Today: MBS, CMOs, CMBS, auto ABS and credit card ABS

### Slide 2: Prepayment Is a Call Option
- Borrowers prepay when they move or refinance
- Falling rates: contraction risk
- Rising rates: extension risk
- Result: negative convexity

### Slide 3: SMM and CPR
- SMM = prepayment / (beginning balance − scheduled principal)
- SMM = 1 − (1 − CPR)^(1/12)
- Do not divide CPR by 12

### Slide 4: The PSA Benchmark
- 100 PSA: CPR 0.2% in month 1, +0.2% per month, 6% from month 30
- 150 PSA: 1.5 times the path, so 9% from month 30
- Faster speed means shorter weighted average life

### Slide 5: Pass-Through Mechanics
- Investors share interest, scheduled principal and prepayments pro rata
- Pass-through rate = WAC − servicing and guarantee fees
- Agency deals: little credit risk, mostly prepayment risk

### Slide 6: One Month of Cash Flow
- Balance 250m, scheduled principal 0.4m, CPR 6%
- SMM 0.5143%, prepayment 1.284m
- Total principal 1.684m

### Slide 7: Sequential-Pay CMOs
- All principal goes to tranche A until it is retired, then B, and so on
- Short tranches: more contraction risk
- Long tranches: more extension risk

### Slide 8: PAC and Support Tranches
- PAC follows a schedule within a PSA band
- Support absorbs prepayment surprises
- Support tranches are riskier and offer higher yields

### Slide 9: Commercial MBS
- Non-recourse loans: focus on DSCR and LTV
- Call protection: lockouts, defeasance, penalties, yield maintenance
- Main risk: balloon risk at maturity

### Slide 10: Non-Mortgage ABS
- Auto ABS: amortising, with some prepayment
- Credit card ABS: non-amortising, with a lockout (revolving) period
- Early amortisation triggers protect investors

### Slide 11: Exam Traps
- Subtract scheduled principal before applying SMM
- CMOs redistribute risk; they do not remove it
- Falling rates mean contraction; rising rates mean extension

## Whiteboard examples
**Example 1 - mortgage payment.** USD 300,000, 30 years, 6% annual rate, monthly payments.
- r = 0.005, n = 360. Payment = 300,000 × 0.005 / (1 − 1.005^−360) = 1,798.65.
- Month 1 interest = 1,500.00; scheduled principal = 298.65.

**Example 2 - pass-through month.** Balance USD 250m, scheduled principal USD 0.4m, CPR 6%.
- SMM = 1 − 0.94^(1/12) = 0.5143%.
- Prepayment = 0.005143 × 249.6m = USD 1,283,696.
- Total principal = USD 1,683,696, all of which goes to tranche A in a sequential structure.
- If CPR rises to 9% (150 PSA, mature pool): SMM = 0.7828% and prepayment = USD 1,953,974.

**Example 3 - PSA.** 150 PSA in month 12: CPR = 1.5 × 2.4% = 3.6%, SMM = 0.3051%. 200 PSA in month 15: CPR = 2 × 3.0% = 6.0%.

## Questions to ask students
- Rates fall 2%. Which risk does a pass-through investor face? (Contraction risk: faster prepayments and reinvestment at lower yields.)
- What is the CPR at 100 PSA in month 45? (6%.)
- Why is SMM not simply CPR/12? (Prepayments compound on a declining balance, so the conversion is geometric.)
- In a PAC/support structure, which tranche is more exposed if prepayments surge? (The support tranche.)
- Why is prepayment risk smaller in CMBS than in residential MBS? (Call protection such as lockouts, defeasance and yield maintenance.)

## Analogies
- Lending to a friend who can repay any time: they repay early only when they can borrow more cheaply elsewhere, which is exactly when you would rather keep earning the old rate.
- Queue at a ticket counter: in a sequential CMO, tranche A gets served first, B waits, and C waits longest.
- Shock absorber: the support tranche is the spring that lets the PAC tranche ride smoothly over bumpy prepayments.

## Recording tips
- Show the PSA ramp as a simple chart (CPR against month), then overlay 50, 100 and 150 PSA.
- Do the SMM calculation slowly on screen, emphasising the subtraction of scheduled principal.
- Link back to negative convexity from the convexity lesson so students see the same idea in a new setting.
