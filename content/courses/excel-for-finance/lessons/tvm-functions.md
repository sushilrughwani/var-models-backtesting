---
title: "Time Value of Money Functions: PV, FV, PMT, NPER and RATE"
---

## Learning goals
- Identify the five TVM arguments (rate, nper, pmt, pv, fv) and the optional type argument in every Excel TVM function.
- Apply the cash-flow sign convention so that results come out with the sign you expect.
- Calculate loan payments, future values, terms and implied interest rates with `PMT`, `FV`, `NPER` and `RATE`.
- Convert annual inputs to periodic inputs for monthly or quarterly problems.
- Distinguish ordinary annuities from annuities due using the type argument.

## Explanation

### One equation, five unknowns
Every TVM problem in Excel is the same equation viewed from a different angle. Money today (`pv`), a stream of equal payments (`pmt`) and a lump sum at the end (`fv`) must balance once each is moved to the same date at the periodic rate. Excel solves for whichever variable you leave out:

$$
PV(1+r)^n + PMT \cdot (1+r\cdot t)\,\frac{(1+r)^n - 1}{r} + FV = 0
$$

Here $r$ is the rate per period, $n$ the number of periods, $PMT$ the level payment per period, $PV$ the present amount, $FV$ the future amount and $t$ the timing flag (0 if payments arrive at the end of each period, 1 if at the start). Because the equation is set to zero, at least one cash flow must be negative.

The five functions share the same argument names:

- `=PV(rate, nper, pmt, [fv], [type])`
- `=FV(rate, nper, pmt, [pv], [type])`
- `=PMT(rate, nper, pv, [fv], [type])`
- `=NPER(rate, pmt, pv, [fv], [type])`
- `=RATE(nper, pmt, pv, [fv], [type], [guess])`

Arguments in square brackets default to zero when omitted.

### The sign convention
Excel thinks like a bank account: money you receive is positive, money you pay out is negative. If you borrow 30,000, the loan is cash in (`pv` positive) and each repayment is cash out, so `PMT` returns a negative number. Many analysts prefer to enter the loan as `-B1` so that the payment displays as a positive figure. Either is fine, but the signs of `pv`, `pmt` and `fv` must be consistent with the story. For `NPER` and `RATE`, mixing up signs does not just flip the answer; it returns `#NUM!` because no solution exists when every cash flow points the same way.

### Matching rate and nper to the period
The rate must be per period, and nper must count the same periods. For a monthly loan quoted at 4.8% a year over 5 years, use `B2/12` for rate and `B3*12` for nper. Forgetting either conversion is the most common TVM error in spreadsheets. `RATE` likewise returns a periodic rate, so multiply a monthly answer by 12 to quote an annual percentage rate.

### Ordinary annuity versus annuity due
Loans and most bonds pay at the end of each period (type 0). Rent, insurance premiums and savings deposits made on payday often occur at the start (type 1). An annuity due earns one extra period of interest on every payment, so its present and future values are larger by a factor of $(1+r)$.

## Worked example
A buyer finances a car: loan 30,000 in `B1`, annual rate 4.8% in `B2`, term 5 years in `B3`, monthly payments.

**Step 1 - payment.** `=PMT(B2/12, B3*12, -B1)`. The periodic rate is 0.048/12 = 0.004 and nper is 60. The payment is **563.39 per month**. Without the minus sign in front of `B1`, Excel would show -563.39.

**Step 2 - pay it off faster.** The buyer can afford 700 a month. `=NPER(B2/12, -700, B1)` returns 47.11 months, so the loan is gone in **48 payments**, the last one smaller than 700.

**Step 3 - check the dealer's quote.** A dealer offers 600 a month for 60 months on the same 30,000. The implied rate is `=RATE(60, -600, 30000)*12` = **7.42% per year**, far above the 4.8% bank rate, so the dealer offer is expensive.

**Step 4 - a savings plan.** Saving 500 at the end of every month for 25 years at 7% a year: `=FV(7%/12, 25*12, -500)` = **405,035.85**. Making the deposits at the start of each month (`type` = 1) gives `=FV(7%/12, 300, -500, 0, 1)` = 407,398.56, about 2,363 more for exactly the same contributions.

**Step 5 - a lump sum.** 10,000 invested today at 6% for 5 years: `=FV(6%, 5, 0, -10000)` = **13,382.26**. Note the 0 for pmt; there are no intermediate deposits.

## Common exam traps
- Using the annual rate with monthly periods: `=PMT(4.8%, 60, -30000)` gives 1,531.95, almost three times the true payment.
- Converting the rate but not nper: `=PMT(4.8%/12, 5, -30000)` gives 6,072.19 because the loan is treated as five months long.
- Entering `pv` and `pmt` with the same sign in `RATE` or `NPER`, which produces `#NUM!`.
- Quoting the output of `RATE` on monthly data as an annual rate without multiplying by 12.
- Leaving type at its default of 0 when cash flows actually occur at the start of each period.

## Key takeaways
- All five TVM functions solve one equation; supply four of rate, nper, pmt, pv, fv and Excel finds the fifth.
- Cash in is positive, cash out is negative; a minus sign in front of the loan amount makes payments display as positive numbers.
- Always express rate and nper in the same period length.
- `RATE` and `NPER` need cash flows of opposite signs or they return `#NUM!`.
- Type 1 (annuity due) adds one period of compounding to every payment.
- Keep inputs in labelled cells and reference them; never type numbers directly into the function.
