---
title: "Insurance Companies and Pension Plans"
duration: 24
---

## Lecture outline
- 00:00 - Hook: an insurer that loses money on every policy it writes can still be profitable. How?
- 02:00 - Life products: term, whole, variable, universal life and annuities; mortality vs longevity risk
- 06:00 - Mortality tables: survival and death probabilities over several years
- 09:00 - Whiteboard: breakeven premium for a two-year term policy
- 13:00 - Property-casualty insurance, reinsurance and catastrophe risk
- 15:00 - Loss, expense, combined and operating ratios with worked numbers
- 18:00 - Moral hazard vs adverse selection; regulation and guaranty funds
- 20:00 - Pension plans: defined benefit vs defined contribution and funding status
- 23:00 - Recap and exam traps

## Slides
### Slide 1: The Insurance Business Model
- Premiums collected first, claims paid later
- The float is invested in bonds and other assets
- Profit = underwriting result + investment income
### Slide 2: Life Products
- Term: pure death cover for a fixed period
- Whole, variable and universal life: cover plus savings
- Annuities: income for as long as the person lives
### Slide 3: Mortality vs Longevity Risk
- Life insurance loses if people die sooner than expected
- Annuities lose if people live longer than expected
- Writing both gives a partial natural hedge
### Slide 4: Reading a Mortality Table
- $q_x$ = probability a person aged x dies within one year
- Survival to later years multiplies $(1-q)$ terms
- Death in year 2 = $(1-q_x) q_{x+1}$
### Slide 5: Breakeven Premium
- PV of expected premiums = PV of expected payouts
- Deaths assumed mid-year; premiums at start of year by survivors
- Example result: USD 10,284.02 per year
### Slide 6: Property-Casualty
- Property: damage to own assets; casualty: liability to others
- Long-tail liability claims and correlated catastrophe losses
- Reinsurance and catastrophe bonds transfer peak risk
### Slide 7: The Key Ratios
- Combined ratio = loss ratio + expense ratio
- Add policyholder dividends for combined ratio after dividends
- Operating ratio = combined after dividends - investment income
### Slide 8: Moral Hazard vs Adverse Selection
- Moral hazard: insured behave less carefully; fix with deductibles, co-insurance, limits
- Adverse selection: high risks buy more cover; fix with underwriting and risk pricing
### Slide 9: Regulation
- Reserves for expected claims, capital for unexpected losses
- Solvency II: three pillars, SCR and MCR
- US: state regulation and state guaranty funds
### Slide 10: Pension Plans
- DB: employer promises a formula-based pension and bears the risks
- DC: individual account; employee bears the risks
- Lower interest rates increase DB liabilities and deficits
### Slide 11: Takeaways
- Mortality probabilities drive life pricing
- Combined ratio above 100% is not automatically a loss
- Know who bears the risk in every product

## Whiteboard examples
**1. Two-year term policy.** Age 60, cover USD 1,000,000, $q_{60}=0.010$, $q_{61}=0.011$, interest 4% annual, deaths mid-year, premiums at start of year.
- P(death in year 1) = 0.010; P(death in year 2) = 0.990 × 0.011 = 0.01089.
- PV payout = 1,000,000 × (0.010/1.04^0.5 + 0.01089/1.04^1.5) = 9,805.81 + 10,267.81 = 20,073.62.
- PV of premiums per unit = 1 + 0.990/1.04 = 1.95192.
- Premium = 20,073.62 / 1.95192 = USD 10,284.02.

**2. Ratios.** Loss ratio 72%, expense ratio 27%, dividends 1%, investment income 3%.
- Combined = 99%; after dividends = 100%; operating ratio = 97%. Pre-tax profit = 3% of premiums.

**3. Quick check.** Age 45, one-year cover USD 500,000, $q_{45}=0.004$, rate 5%, death mid-year.
- Premium = 500,000 × 0.004 / 1.05^0.5 = USD 1,951.80.

## Questions to ask students
- Who bears longevity risk in a life annuity? (The insurer, because payments continue as long as the annuitant lives.)
- Why is a deductible effective against moral hazard? (The policyholder still bears part of the loss, so keeps an incentive to take care.)
- A P&C insurer has a combined ratio of 103% and investment income of 6% of premiums. Profitable? (Yes, operating ratio 97%, ignoring dividends.)
- What happens to a DB plan's funding when interest rates fall? (Liability PV rises, so the funding ratio usually falls.)
- What is the probability that a 60-year-old survives two years if q60 = 0.010 and q61 = 0.011? (0.990 × 0.989 = 0.97911.)

## Analogies
- An annuity is a life insurance policy turned inside out: one pays when you die, the other pays while you live.
- The float is like a restaurant that collects payment when you book and serves the meal months later; it can invest your money in the meantime.
- Adverse selection is the all-you-can-eat buffet problem: price for the average eater and the hungriest customers queue first.

## Recording tips
- Draw a timeline for the term policy showing premiums at times 0 and 1 and death payouts at 0.5 and 1.5; it prevents most discounting errors.
- Show a small mortality table extract on screen and highlight how $(1-q)$ terms chain together.
- Stress who bears risk in DB vs DC; it is a favourite conceptual question.
