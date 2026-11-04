---
title: "Building a Loan Amortization Schedule"
duration: 22
---

## Lecture outline
- 00:00 - Hook: in month 1 of a 30-year mortgage, 83% of the payment is interest
- 02:00 - What happens inside a payment: interest first, principal second
- 05:00 - Sheet layout: inputs block, payment cell, schedule headers
- 08:00 - Live build: row 1 formulas, row 2 links, fill down; check the final zero
- 13:00 - IPMT, PPMT, CUMIPMT and CUMPRINC as cross-checks
- 16:00 - Extra payments with MIN; interest saved
- 20:00 - Recap: five traps and quiz preview

## Slides
### Slide 1: Where Does Your Payment Go?
- 300,000 mortgage at 6% over 30 years: payment 1,798.65
- Month 1: 1,500.00 interest, 298.65 principal
- Schedules show the split for every month
### Slide 2: Three Lines of Logic
- Interest = opening balance × periodic rate
- Principal = payment − interest
- Closing balance = opening − principal
### Slide 3: Inputs First
- Loan, annual rate, years, extra payment in labelled cells
- Payment once: `=PMT($B$2/12, $B$3*12, -$B$1)`
- Everything else references these cells
### Slide 4: Row 1 Formulas
- Interest `=B9*$B$2/12`
- Payment `=MIN($B$5, B9+C9)`
- Principal `=D9+E9-C9`, closing `=B9-F9`
### Slide 5: Row 2 and Fill Down
- Opening balance links to previous closing: `=G9`
- Period counter `=A9+1`
- Fill down; final closing balance must be zero
### Slide 6: The Shape of Amortization
- Interest share shrinks every month
- Principal share grows by a factor of 1 + r each month
- Most interest is paid in the early years
### Slide 7: Single-Period Functions
- `=IPMT(0.5%, 12, 36, -20000)` gives 71.33
- `=PPMT(0.5%, 12, 36, -20000)` gives 537.11
- Together they equal the payment
### Slide 8: Range Functions
- `CUMIPMT` and `CUMPRINC` need positive pv and a type
- Year 1 interest on the 20,000 loan: 1,029.39
- Results come back negative
### Slide 9: Extra Payments
- Extra 100 a month on the 20,000 loan
- 31 payments instead of 36
- Interest saved: 289.25
### Slide 10: Error Checks
- Final balance zero
- Sum of principal equals the loan
- Sum of interest equals total paid minus loan

## Whiteboard examples
1. **Small loan, first rows.** 20,000 at 6%, 36 months. Payment 608.44. Row 1: interest 100.00, principal 508.44, closing 19,491.56. Row 2: interest 19,491.56 × 0.005 = 97.46, principal 510.98, closing 18,980.58. Total interest 608.44 × 36 − 20,000 = 1,903.79.
2. **Mortgage month 1 and 2.** 300,000 at 6%, 360 months. Payment 1,798.65. Month 1 interest 1,500.00 (83% of the payment), principal 298.65. Month 2 interest 1,498.51, principal 300.14. Year 1 total interest 17,899.78, principal only 3,684.04; balance after 12 months 296,315.96.
3. **Extra payment.** Add 100 a month to the small loan: `=NPER(0.5%, -708.44, 20000)` = 30.51, so 31 payments, last payment 361.39, total interest 1,614.55 versus 1,903.79, saving 289.25.

## Questions to ask students
- Why does interest fall each month even though the rate is fixed? (The balance it is charged on falls.)
- What goes wrong if the rate reference in the interest formula is relative? (It shifts down when filled, pointing at blank cells, so interest becomes zero.)
- What should the closing balance be in the final period? (Exactly zero; anything else signals an error.)
- `NPER` returns 30.51. How many payments are there? (31, with a smaller final payment.)
- Why use `MIN` in the payment column? (So the last payment does not exceed the balance plus interest when extra payments shorten the loan.)

## Analogies
- A level payment is a fixed-size bucket: interest fills it first, and whatever space remains goes to paying down the debt.
- The schedule is a relay: each row hands its closing balance to the next row as the opening balance.
- Extra payments are a shortcut through the maze: every unit of extra principal stops generating interest for all remaining months.

## Recording tips
- Build row 1 slowly and press F4 on screen to show the dollar signs appearing; this is where most students go wrong.
- After filling down, scroll to the last row and pause on the zero balance as the proof the schedule works.
- Add a quick line chart of interest versus principal by period to show the crossover visually.
