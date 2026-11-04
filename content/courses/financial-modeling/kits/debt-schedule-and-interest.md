---
title: "The Debt Schedule and Interest"
duration: 24
---

## Lecture outline
- 00:00 - Hook: the one formula that makes Excel complain about a circular reference
- 02:00 - Role of the debt schedule in the three statements
- 04:00 - Term loans: amortisation and cash sweeps
- 07:00 - The revolver as the cash balancing tool; minimum cash
- 10:30 - Excel formula for draws and repayments
- 13:00 - Interest on average balances and the circularity loop
- 16:00 - Iterative calculation and the circuit breaker
- 18:00 - Whiteboard: Northwind FY2026E debt schedule with iterations
- 22:30 - Recap and traps

## Slides
### Slide 1: Financing Closes the Loop
- Interest to the income statement
- Balances to the balance sheet
- Draws and repayments to financing cash flow
### Slide 2: Term Loans
- Closing = opening - mandatory repayment
- Optional cash sweep of excess cash
- Fixed or floating rate
### Slide 3: The Revolver
- Overdraft-like facility with a limit
- Repays with surplus cash, draws on shortfalls
- Never negative, never above the limit
### Slide 4: Cash Available
- Opening cash + CFO - capex - mandatory repayments - dividends - minimum cash
- Positive: repay; negative: draw
### Slide 5: Excel Revolver Formula
- `=MIN(MAX(-E58,-D60),$C$61-D60)`
- Positive result = draw, negative = repay
- Caps at the balance and the limit
### Slide 6: Average-Balance Interest
- Interest = rate x (opening + closing) / 2
- More accurate when debt moves during the year
- Creates a circular reference
### Slide 7: The Circularity Loop
- Interest to net income to cash available
- Cash available to revolver balance
- Revolver balance back to interest
### Slide 8: Managing Circularity
- Enable iterative calculation
- Circuit breaker: `=IF($C$4=1,AVERAGE(D60,E60),D60)*$C$62`
- Flip to 0 to clear errors
### Slide 9: Northwind Inputs (USD m)
- Term loan 100.0 at 6%, repay 12.0 per year
- Revolver 35.0 at 7%, limit 60.0
- Opening cash 30.0, minimum cash 20.0
### Slide 10: Northwind Results
- Interest 5.64 + 1.77 = 7.41
- Net income 66.63, CFO 85.44
- Revolver repaid 19.45 to 15.55; cash 20.0
### Slide 11: Opening Versus Average
- Opening-balance interest 8.45, revolver 16.10
- Average method: interest 7.41, revolver 15.55
### Slide 12: Key Takeaways
- Revolver balances cash
- Average interest needs controlled circularity
- Always include a circuit breaker

## Whiteboard examples
**Example 1: Iterations.** Pass 1: interest 5.64 + 2.45 = 8.09; NI = (96.25 - 8.09) x 0.75 = 66.12; dividends 19.84; CFO 84.93; cash available = 30 + 84.93 - 44 - 12 - 19.84 - 20 = 19.09; revolver 15.91. Pass 2: interest 5.64 + 0.07 x (35 + 15.91)/2 = 7.42; revolver 15.56. Pass 3: interest 7.41; revolver 15.55. Converged.

**Example 2: A shortfall year.** Opening revolver 10.0, cash available after minimum cash -6.0. Draw 6.0; closing revolver 16.0; cash stays at the minimum.

**Example 3: Over-repayment trap.** Cash available 50.0 but revolver only 35.0. Repay 35.0 (not 50.0); the remaining 15.0 stays in cash above the minimum.

## Questions to ask students
- Why does average-balance interest create a circular reference? (Interest affects net income, cash and therefore the closing debt balance used to calculate interest.)
- What does the minimum cash input do? (Keeps an operating buffer so not all cash is swept to repay debt.)
- What happens if cash available exceeds the revolver balance? (Repay the whole balance; the excess accumulates as cash.)
- What is a circuit breaker? (A switch that breaks the loop, for example by using opening balances, to clear errors.)
- Is a mandatory repayment an expense? (No; it is a financing cash outflow that reduces debt.)

## Analogies
- The revolver is a shock absorber: it soaks up the bumps in cash so the rest of the model rides smoothly.
- Circularity is like adjusting a shower: turning the tap changes the temperature, which makes you turn the tap again until it settles.
- The circuit breaker is exactly that: a fuse that trips before the whole house goes dark.

## Recording tips
- Show Excel's circular reference warning live, then enable iterations so students are not alarmed when they see it.
- Walk through the three passes slowly; seeing the numbers converge demystifies circularity.
- Demonstrate breaking the model with a `#REF!` error and fixing it with the circuit breaker.
