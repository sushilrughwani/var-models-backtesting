---
title: "Credit Value Adjustment and XVA"
duration: 28
---

## Lecture outline
- 00:00 - Hook: two identical swaps, two different prices - because of who sits on the other side
- 03:00 - CVA as the price of counterparty risk; risky value = risk-free value minus CVA
- 06:00 - The CVA formula term by term
- 09:00 - Hazard rates from CDS spreads and marginal PDs
- 12:00 - Whiteboard: three-year CVA calculation and the EPE approximation
- 18:00 - DVA, bilateral CVA and the DVA controversy
- 21:00 - FVA, MVA, KVA and the XVA family
- 24:00 - Wrong-way and right-way risk
- 26:00 - Exam traps and recap

## Slides
### Slide 1: Why CVA exists
- Risk-free valuation ignores counterparty default
- Risky value = risk-free value - CVA
- Charged to clients, booked in accounts, capitalised
### Slide 2: The CVA formula
- CVA = LGD × Σ EE(t_i) × PD(t_i-1, t_i) × DF(t_i)
- Marginal PD, not cumulative
- Assumes exposure independent of default
### Slide 3: Spread-implied PDs
- Hazard rate λ ≈ s / LGD
- Marginal PD = e^(-λ t_i-1) - e^(-λ t_i)
- Risk-neutral, because CVA is a price
### Slide 4: Worked CVA
- EE 4, 5, 3; spread 120 bp; LGD 60%; r 3%
- Contributions 0.0461, 0.0548, 0.0313
- CVA = USD 0.1323 m
### Slide 5: Quick approximation
- CVA ≈ EPE × spread × annuity
- 4 × 1.2% × 2.826 = 0.136
- Running spread ≈ s × EPE / notional
### Slide 6: DVA and bilateral CVA
- DVA uses own PD, own LGD and ENE
- BCVA = CVA - DVA
- Own-credit gains: excluded from regulatory capital
### Slide 7: Funding value adjustment
- Hedge collateral must be funded at the bank's spread
- FCA (cost) and FBA (benefit)
- Possible double count with DVA
### Slide 8: The XVA family
- ColVA: collateral terms
- MVA: funding initial margin
- KVA: cost of capital
### Slide 9: Wrong-way risk
- Exposure rises as counterparty weakens
- CDS from a correlated seller; commodity producer swaps; sovereign FX swaps
- Raises CVA; right-way risk lowers it
### Slide 10: Exam traps
- Marginal not cumulative PD
- Spread / LGD, not spread / recovery
- ENE for DVA, EE for CVA

## Whiteboard examples
**Example 1 - Three-year CVA.** $\lambda = 0.012/0.6 = 0.02$. Marginal PDs 1.980%, 1.941%, 1.902%. DFs 0.9704, 0.9418, 0.9139. Contributions: $0.6 \times 4 \times 0.01980 \times 0.9704 = 0.04612$; $0.6 \times 5 \times 0.01941 \times 0.9418 = 0.05484$; $0.6 \times 3 \times 0.01902 \times 0.9139 = 0.03130$. CVA $= 0.1323$. As a running spread on a USD 100 m notional: $0.1323/(100 \times 2.8261) = 4.68$ bp per year.

**Example 2 - Single period.** EE 10, PD 3% over the year, LGD 60%, DF 0.97. $CVA = 0.6 \times 10 \times 0.03 \times 0.97 = 0.1746$.

**Example 3 - Marginal PD.** Spread 240 bp, LGD 60%: $\lambda = 4\%$. PD in year 2 $= e^{-0.04} - e^{-0.08} = 3.77\%$. Contrast with the cumulative two-year PD of 7.69%.

## Questions to ask students
- Why use risk-neutral rather than historical PDs in CVA? (CVA is a price that should match the cost of hedging with CDS.)
- What happens to CVA if the counterparty's spread widens? (It rises: higher hazard rate and higher marginal PDs.)
- Why is DVA controversial? (A bank books a profit when its own credit worsens, and can only realise it by defaulting.)
- Give an example of wrong-way risk. (Buying CDS protection on a bank from another bank strongly correlated with it.)
- Which exposure measure feeds DVA? (Expected negative exposure.)

## Analogies
- CVA is the insurance premium you would pay to make your counterparty as safe as a government.
- Wrong-way risk is an umbrella seller who goes bankrupt only when it rains - the protection disappears exactly when you need it.
- DVA is like celebrating that your own mortgage is worth less to the bank because you might go broke.

## Recording tips
- Build the CVA table column by column (EE, PD, DF, product) on screen; it demystifies the summation.
- Pause on marginal versus cumulative PD with a quick survival-curve sketch.
- Keep the XVA family section high level; the exam focuses on intuition and controversies, not funding mechanics.
