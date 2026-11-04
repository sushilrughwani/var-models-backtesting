---
title: "LBO Model Basics"
duration: 26
---

## Lecture outline
- 00:00 - Hook: a sponsor more than doubles its money on Northwind without changing the exit multiple; how?
- 03:00 - The LBO idea: leverage, cash sweep, exit
- 06:00 - Sources and uses for Northwind
- 10:00 - Live Excel: debt schedule, CFADS and the cash sweep
- 15:00 - Interest circularity: opening balance versus average balance
- 17:00 - Exit, MOIC and IRR
- 21:00 - Returns attribution and exit multiple sensitivity
- 24:00 - Exam traps and recap

## Slides
### Slide 1: What an LBO Is
- Buy with mostly borrowed money
- Company cash flow repays the debt
- Sell after about five years; equity keeps the rest

### Slide 2: Sources and Uses
- Uses: equity purchase, refinancing, fees
- Sources: debt tranches sized on EBITDA, sponsor equity as plug
- Totals must match

### Slide 3: Northwind Deal
- Entry 9.5x × 200 = 1,900 EV; fees 40
- Senior 800 at 7%, notes 200 at 10%
- Sponsor equity 940 (48.5% of uses)

### Slide 4: Offer Price per Share
- Equity purchase 1,587
- (1,587 + 80) / 54.6 = USD 30.53
- 11.0% premium to 27.50

### Slide 5: CFADS
- EBITDA − interest − cash taxes − capex − ΔNWC
- Taxes on EBIT minus interest
- 2026: 219 − 76 − 24.75 − 56 − 10.5 = 51.75

### Slide 6: Cash Sweep
- All CFADS repays the senior loan
- Senior falls from 800 to 405.72 by 2030
- Interest on opening balance avoids circularity

### Slide 7: Exit
- 9.5 × 275 = 2,612.50
- Net debt 605.72
- Exit equity 2,006.78

### Slide 8: Returns
- MOIC = 2,006.78 / 940 = 2.13x
- IRR = 2.1349^(1/5) − 1 = 16.4%
- `=IRR(B50:G50)` and `=(G50/-B50)^(1/5)-1`

### Slide 9: Attribution
- EBITDA growth 712.50
- Debt paydown 394.28; fees −40
- Total gain 1,066.78

### Slide 10: Exit Multiple Sensitivity
- 8.5x: IRR 13.0%
- 9.5x: 16.4%
- 10.5x: 19.4%

### Slide 11: Traps
- Missing fees; FCFF instead of CFADS
- Simple-average IRR
- Forgetting the subordinated notes at exit

## Whiteboard examples
**Example 1 - Sources and uses.**
- Uses: 1,587 + 313 + 40 = 1,940
- Debt: 4.0 × 200 + 1.0 × 200 = 1,000; equity plug = 940

**Example 2 - Years 1 and 2 of the sweep.**
- 2026: interest 76.00; tax (175 − 76) × 0.25 = 24.75; CFADS 51.75; senior closes 748.25
- 2027: interest 748.25 × 7% + 20 = 72.38; tax (191 − 72.38) × 0.25 = 29.66; CFADS = 237 − 72.38 − 29.66 − 59 − 10.5 = 65.47; senior closes 682.78

**Example 3 - Returns and the wrong shortcut.**
- Exit equity 2,612.50 − 605.72 = 2,006.78; MOIC 2.13x; IRR 16.4%
- Wrong: (2.13 − 1) / 5 = 22.7%, ignores compounding
- Wrong: ignoring debt paydown, (2,612.50 − 1,000) / 940 = 1.72x, IRR 11.4%

## Questions to ask students
- Why is sponsor equity called the plug? (It fills whatever the debt does not fund.)
- Why does CFADS deduct interest when FCFF did not? (In an LBO we track lender claims explicitly; interest must be paid before principal.)
- If the exit multiple equals the entry multiple, where do returns come from? (EBITDA growth and debt paydown.)
- Would more debt raise or lower IRR, all else equal? (Raise it, as long as the business can service the debt, but risk rises.)
- Why might IRR and MOIC rank two deals differently? (IRR rewards speed; MOIC rewards absolute multiple of money.)

## Analogies
- Buying a rental flat with a mortgage: tenants' rent repays the loan, and on sale you keep the equity you built.
- The cash sweep as a snowball: each year's lower interest frees more cash for repayment, so paydown accelerates.
- Leverage as a magnifying glass: it enlarges gains on equity, and losses too.

## Recording tips
- Keep the sources and uses table visible while building the debt schedule; students lose the thread otherwise.
- Show the circular reference warning once, then fix it with opening-balance interest.
- Finish with the attribution bar so students see that debt paydown is a real, not magical, source of return.
