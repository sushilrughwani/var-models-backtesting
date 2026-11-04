---
title: "Time Value of Money Functions: PV, FV, PMT, NPER and RATE"
duration: 22
---

## Lecture outline
- 00:00 - Hook: the same car loan quoted as "4.8% a year" and "600 a month" - which is cheaper?
- 02:00 - One equation, five variables: rate, nper, pmt, pv, fv (plus type)
- 05:00 - The sign convention: cash in positive, cash out negative; why `#NUM!` appears
- 08:00 - Period matching: dividing the rate and multiplying nper
- 11:00 - Live build: car loan with PMT, NPER and RATE
- 15:00 - Savings plan with FV; ordinary annuity versus annuity due
- 18:00 - Error gallery: four broken formulas and how to spot them
- 20:00 - Recap and quiz preview

## Slides
### Slide 1: Which Loan Is Cheaper?
- Bank: 30,000 at 4.8% a year for 5 years
- Dealer: 30,000 repaid at 600 a month for 60 months
- By the end of this lesson you can answer in one formula
### Slide 2: The TVM Family
- `PV`, `FV`, `PMT`, `NPER`, `RATE`
- Same arguments, different unknown
- Optional arguments default to zero
### Slide 3: The Underlying Equation
- Present amount + payments + future amount balance to zero
- Rate is per period; nper counts periods
- type = 0 end of period, type = 1 start
### Slide 4: Sign Convention
- Money received is positive, money paid is negative
- Borrowing 30,000: pv positive, payments negative
- Use `-B1` to display payments as positive
### Slide 5: Period Matching
- Monthly problem: rate `B2/12`, nper `B3*12`
- Quarterly: divide by 4, multiply by 4
- RATE returns a periodic rate: multiply by 12 to annualise
### Slide 6: PMT in Action
- `=PMT(B2/12, B3*12, -B1)` gives 563.39
- 60 monthly payments on 30,000 at 4.8%
### Slide 7: NPER and RATE
- `=NPER(B2/12, -700, B1)` gives 47.11 months
- `=RATE(60, -600, 30000)*12` gives 7.42% a year
- Dealer offer costs far more than the bank loan
### Slide 8: FV and Annuity Due
- `=FV(7%/12, 300, -500)` gives 405,035.85
- With type 1: 407,398.56
- Start-of-period payments earn one extra period of interest
### Slide 9: Error Gallery
- Annual rate with monthly nper: 1,531.95
- Monthly rate with yearly nper: 6,072.19
- Same signs in RATE: `#NUM!`
### Slide 10: Takeaways
- One equation, solve for the missing piece
- Signs tell the cash-flow story
- Period consistency first, every time

## Whiteboard examples
1. **Mortgage payment.** Loan 250,000 at 6% a year for 30 years, monthly. `=PMT(6%/12, 360, -250000)` = 1,498.88 per month. Total paid = 1,498.88 × 360 = 539,595.47, so interest is about 289,595 over the life of the loan.
2. **Doubling time.** 10,000 grows to 20,000 in 8 years. `=RATE(8, 0, -10000, 20000)` = 9.05% a year. Point out that pmt is 0 and pv and fv have opposite signs.
3. **Credit card payoff.** Balance 15,000, 18% a year, paying 400 a month. `=NPER(18%/12, -400, 15000)` = 55.52 months, so 56 payments (about 4 years 8 months). Ask: what happens if the payment is 200? (Interest alone is 225 a month, so the balance grows forever and NPER returns `#NUM!`.)

## Questions to ask students
- If you borrow money, should `pv` be positive or negative in `PMT`? (Positive - you receive the cash; the payment comes back negative.)
- What two adjustments are needed for a monthly problem quoted in annual terms? (Divide the rate by 12 and multiply years by 12.)
- Why does `=RATE(60, 600, 30000)` return `#NUM!`? (Both cash flows are positive, so no rate can balance them.)
- Which is larger, the FV of an ordinary annuity or an annuity due with the same inputs? (Annuity due, by a factor of 1 + r.)
- `RATE` on monthly data returns 0.6%. What annual rate do you quote? (7.2% APR, 0.6% × 12.)

## Analogies
- The TVM equation is a seesaw: money today on one side, payments and the final lump sum on the other; Excel finds the missing weight that levels it.
- The sign convention is your bank statement: deposits and withdrawals have opposite signs, and a statement full of deposits only makes no sense for a loan.
- Annuity due versus ordinary annuity is paying rent at the start versus the end of the month: start-of-month money spends one extra month working.

## Recording tips
- Build every formula live with inputs in labelled cells; show the Function Arguments dialog (Shift+F3) once so students see the argument names.
- Deliberately break the formulas on the error-gallery slide and leave the wrong answers on screen next to the right ones.
- Keep returning to the hook: reveal the 7.42% dealer rate as the payoff moment.
