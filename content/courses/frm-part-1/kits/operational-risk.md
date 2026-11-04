---
title: "Operational Risk"
duration: 22
---

## Lecture outline
- 00:00 - Hook: a single unauthorised trader wipes out a bank's annual profit. Which risk bucket is that, and how do you hold capital for it?
- 02:00 - Definition, what is included and excluded
- 04:00 - Seven event types with one real-world style example each
- 07:00 - Old approaches: BIA, TSA, AMA and why they were replaced
- 10:00 - Basel III standardised approach: BI, BIC, LC, ILM
- 14:00 - Whiteboard: capital for a EUR 12bn BI bank
- 17:00 - Frequency-severity modelling, scenarios, KRIs, insurance
- 20:00 - Exam traps and recap

## Slides
### Slide 1: Operational Risk
- Losses from processes, people, systems, external events
- Includes legal risk; excludes strategic and reputational
- Not taken deliberately for return

### Slide 2: Seven Event Types (1-4)
- Internal fraud
- External fraud
- Employment practices and workplace safety
- Clients, products and business practices

### Slide 3: Seven Event Types (5-7)
- Damage to physical assets
- Business disruption and system failures
- Execution, delivery and process management

### Slide 4: Older Basel Approaches
- BIA: 15% of average positive gross income (3 years)
- TSA: 12/15/18% by business line
- AMA: internal 99.9% model; inconsistent across banks

### Slide 5: Business Indicator Component
- BI = income-statement size measure
- Marginal coefficients: 12% to EUR 1bn, 15% to 30bn, 18% above
- Works like tax brackets

### Slide 6: Loss Component and ILM
- LC = 15 × average annual loss (10 years)
- ILM = ln(e − 1 + (LC/BIC)^0.8)
- LC = BIC gives ILM = 1

### Slide 7: Capital Formula
- ORC = BIC × ILM
- Heavy loss history raises capital
- Supervisors may set ILM = 1

### Slide 8: Modelling Operational Losses
- Frequency (Poisson) × severity (lognormal / power law)
- Monte Carlo for annual loss distribution
- Supplement with external data and scenario analysis

### Slide 9: Managing Operational Risk
- Key risk indicators for early warning
- Insurance: moral hazard, adverse selection, deductibles
- Strong controls and culture

### Slide 10: Recap
- Definition and seven event types
- Standardised approach: BIC × ILM
- Next: stress testing

## Whiteboard examples
**Example 1: Standardised approach.** BI = EUR 12bn; average annual loss EUR 150m.
- BIC = 0.12 × 1 + 0.15 × 11 = 1.77bn.
- LC = 15 × 0.15 = 2.25bn.
- LC/BIC = 1.2712; ^0.8 = 1.2116.
- ILM = ln(1.71828 + 1.2116) = ln 2.9299 = 1.0750.
- Capital = 1.77 × 1.0750 = EUR 1.903bn.

**Example 2: Basic indicator approach.** Gross income over three years: 400, −50, 500 (EUR m).
- Exclude the negative year: average = (400 + 500) / 2 = 450.
- Capital = 15% × 450 = EUR 67.5m.
- Common error: (400 − 50 + 500) / 3 × 15% = 42.5.

## Questions to ask students
- A trader hides losses with fictitious trades. Which event type? (Internal fraud.)
- A bank is fined for mis-selling insurance products. Which event type? (Clients, products and business practices.)
- Why was AMA dropped? (Internal models gave inconsistent, hard-to-compare capital across banks.)
- If a bank's LC is below its BIC, is ILM above or below 1? (Below 1.)
- Why can insurance not remove all operational risk? (Limits, deductibles, moral hazard, adverse selection, and slow claim payment.)

## Analogies
- Market and credit risk are bets you choose to place; operational risk is the chance that the casino burns down or a croupier steals the chips.
- Marginal BIC coefficients work like income tax brackets: only the income above each threshold pays the higher rate.
- The ILM is a driving record for a bank: a history of accidents raises the insurance premium.

## Recording tips
- Show a table matching each event type to a short scenario; students remember examples better than labels.
- Compute the BIC slowly and stress the marginal structure.
- Point out that the ILM formula has a natural-log anchor so that LC = BIC gives exactly 1.
