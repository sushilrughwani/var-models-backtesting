---
title: "Interest Rates, Returns and Their Measurement"
duration: 26
---

## Lecture outline
- 00:00 - Hook: two investors hold the same fund over the same two years yet report very different returns. How?
- 02:00 - Interest rates as real risk-free rate plus inflation and risk premiums
- 05:00 - Holding period return and linking returns across periods
- 08:00 - Arithmetic, geometric and harmonic means; volatility drag
- 12:00 - Money-weighted return as the IRR of investor cash flows
- 16:00 - Time-weighted return: split, compute, chain-link
- 20:00 - Whiteboard: same cash flows, MWR versus TWR
- 23:00 - Annualising returns and exam traps
- 25:00 - Recap and preview of time value of money

## Slides
### Slide 1: Why measuring return is not trivial
- Same fund, same period, different reported returns
- The answer depends on whose decisions you are measuring
- Goal: pick the right return measure for the right question

### Slide 2: Anatomy of an interest rate
- r ≈ real risk-free + expected inflation + default + liquidity + maturity premiums
- Real risk-free + inflation = nominal risk-free (T-bill proxy)
- Each premium pays for a specific risk the lender bears

### Slide 3: Holding period return
- HPR = (P1 − P0 + D1) / P0
- Works for any interval: a day, a quarter, five years
- Link periods: (1+R1)(1+R2)…(1+RT) − 1

### Slide 4: Arithmetic mean
- Simple average of period returns
- Best single-period forecast
- Overstates compound growth when returns are volatile

### Slide 5: Geometric mean
- [Π(1+Rt)]^(1/T) − 1
- The constant rate that reproduces actual ending wealth
- Always ≤ arithmetic mean; gap grows with volatility

### Slide 6: Harmonic mean
- n / Σ(1/Xi)
- Average cost per share under cost averaging
- Harmonic ≤ geometric ≤ arithmetic (positive values)

### Slide 7: Money-weighted return
- IRR of the investor's cash flows
- Deposits negative, withdrawals and ending value positive
- Rewards or penalises the timing of contributions

### Slide 8: Time-weighted return
- Break the horizon at every external cash flow
- Compute each sub-period HPR, chain-link, then annualise
- Removes the effect of client cash flows: the manager-evaluation standard

### Slide 9: Side by side
- TWR 7.24% vs MWR 3.10% on the same fund
- More money invested before the weak year drags MWR down
- Manager skill → TWR; investor experience → MWR

### Slide 10: Annualising
- R_annual = (1 + R_period)^(1/t) − 1, t in years
- Quarterly: (1+Rq)^4 − 1; 18 months: (1+R)^(1/1.5) − 1
- Do not multiply or divide unless asked for a simple rate

### Slide 11: Exam traps
- Arithmetic mean for compound growth
- Wrong signs in the MWR
- Forgetting to split TWR at withdrawals

## Whiteboard examples
**Example 1 - MWR versus TWR.** Buy 10 shares at USD 100 at t = 0. At t = 1 price is USD 120; buy 10 more. At t = 2 price is USD 115; sell all 20.
- Sub-period returns: 120/100 − 1 = 20.00%; 115/120 − 1 = −4.17%.
- TWR: (1.20 × 0.95833)^(1/2) − 1 = 1.15^(0.5) − 1 = 7.24%.
- MWR: solve −1,000 − 1,200/(1+r) + 2,300/(1+r)^2 = 0. CF0 = −1,000, CF1 = −1,200, CF2 = 2,300, IRR = 3.10%.
- Interpretation: the second purchase doubled exposure just before the weaker year.

**Example 2 - Means of returns.** Returns of 15%, −10% and 8%.
- Arithmetic: (15 − 10 + 8)/3 = 4.33%.
- Geometric: (1.15 × 0.90 × 1.08)^(1/3) − 1 = 1.1178^(1/3) − 1 = 3.78%.
- Point out the 0.55 percentage-point volatility drag.

**Example 3 - Harmonic mean and cost averaging.** Invest USD 1,000 at a price of 40 and USD 1,000 at a price of 50.
- Shares bought: 25 + 20 = 45. Average cost = 2,000/45 = USD 44.44.
- Harmonic mean of 40 and 50: 2/(1/40 + 1/50) = 44.44, below the arithmetic average of 45.

## Questions to ask students
- If a fund's returns are +50% then −50%, what is the arithmetic mean and what happened to your money? (Arithmetic 0%; wealth fell 25%; geometric mean is about −13.4%.)
- Which return measure should a pension board use to judge an external manager? (Time-weighted, because the manager does not control contributions.)
- When will MWR exceed TWR? (When the investor adds money before strong periods or withdraws before weak periods.)
- How do you annualise a 6-month return of 3%? ((1.03)^2 − 1 = 6.09%.)
- Which premium compensates for the risk of selling quickly at a discount? (Liquidity premium.)

## Analogies
- TWR is the manager's report card; MWR is the investor's bank statement. Same fund, different authors.
- Volatility drag: a 50% loss needs a 100% gain to recover, so up-and-down returns compound to less than their average.
- The interest rate is a layered cake: real rate at the bottom, inflation next, then a layer for each risk the lender takes.

## Recording tips
- Put the cash-flow timeline on screen for the MWR/TWR example; students lose track of signs without it.
- Demonstrate the IRR keystrokes on a financial calculator, slowly, then repeat once at exam speed.
- Emphasise the decision rule "who controls the cash flows?" - it answers most MWR-versus-TWR questions.
