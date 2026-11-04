---
title: "Time Value of Money in Finance"
duration: 30
---

## Lecture outline
- 00:00 - Hook: would you take USD 1,000 today or USD 1,300 in five years? It depends on one number.
- 03:00 - Compounding and discounting single sums; the timeline habit
- 07:00 - Compounding frequency, EAR and continuous compounding
- 11:00 - Ordinary annuities versus annuities due
- 15:00 - Perpetuities, growing perpetuities and the dividend model
- 19:00 - Deferred cash flows and cash-flow additivity
- 22:00 - Implied returns and growth rates
- 25:00 - Whiteboard: retirement savings problem end to end
- 28:00 - Exam traps and recap

## Slides
### Slide 1: The core idea
- A dollar today can earn r, so it beats a dollar tomorrow
- Compounding moves value forward; discounting moves it back
- Always draw the timeline first

### Slide 2: Single sums
- FV = PV(1+r)^N
- PV = FV / (1+r)^N
- Rate and N must use the same period length

### Slide 3: Compounding frequency
- Per-period rate = stated rate / m; periods = m × N
- EAR = (1 + rs/m)^m − 1
- Continuous: EAR = e^rs − 1

### Slide 4: 8% stated, three ways
- Quarterly: EAR 8.24%
- Monthly: EAR 8.30%
- Continuous: EAR 8.33%

### Slide 5: Ordinary annuity
- Level payment at the end of each period
- PV = A[1 − (1+r)^−N]/r
- FV = A[(1+r)^N − 1]/r

### Slide 6: Annuity due
- Payments at the start of each period
- Value = ordinary annuity value × (1+r)
- Calculator: BGN mode (remember to reset)

### Slide 7: Perpetuities
- Level: PV = A/r
- Growing: PV = C1/(r − g), requires g < r
- Value sits one period before the first payment

### Slide 8: Dividend discount application
- P0 = D1/(r − g), with D1 = D0(1+g)
- Preferred share = level perpetuity
- Deferred perpetuity: discount A/r back t − 1 periods

### Slide 9: Implied rates
- Single sum: r = (FV/PV)^(1/N) − 1
- Growing perpetuity: r = D1/P0 + g
- Annuity: solve with I/Y on the calculator

### Slide 10: Cash-flow additivity
- PVs at the same date can be added
- Bond = annuity of coupons + single principal payment
- Break messy streams into known pieces

### Slide 11: Exam traps
- Ordinary vs due
- t versus t − 1 for deferred perpetuities
- D0 versus D1

## Whiteboard examples
**Example 1 - Retirement plan.** Withdraw USD 40,000 a year for 20 years, first withdrawal at 65; 25 year-end deposits from 41 to 65; r = 6%.
- Value at 65 (annuity due): 40,000 × [1 − 1.06^−20]/0.06 = 458,796.85; × 1.06 = 486,324.66.
- FV factor for 25 deposits: (1.06^25 − 1)/0.06 = 54.8645.
- Deposit = 486,324.66 / 54.8645 = USD 8,864.10.

**Example 2 - Deferred preferred dividend.** A preferred share pays USD 5 a year forever, first payment at the end of year 4; r = 8%.
- Value at t = 3: 5/0.08 = 62.50.
- Value today: 62.50/1.08^3 = USD 49.61.
- Common error: dividing by 1.08^4 gives 45.94.

**Example 3 - Implied return.** Pay USD 750 today for USD 1,000 in 5 years.
- r = (1,000/750)^(1/5) − 1 = 5.92% per year.

## Questions to ask students
- Which is worth more: 10% compounded annually or 9.6% compounded monthly? (9.6% monthly: EAR = 10.03%.)
- A lease requires five payments with the first today. What kind of annuity is this? (Annuity due.)
- What is the value of a USD 3 dividend next year growing at 3% forever if r = 8%? (3/0.05 = USD 60.)
- Why does the growing perpetuity formula fail if g ≥ r? (The PV of the cash flows does not converge; value would be infinite or negative.)
- Stock price 50, D1 = 2.08, g = 4%. Implied required return? (2.08/50 + 4% = 8.16%.)

## Analogies
- The timeline is a conveyor belt: every cash flow must be carried to the same station before you add them.
- An annuity due is an ordinary annuity that showed up one period early, so it earns one extra period of interest.
- A perpetuity is a bank deposit that pays you only the interest forever: deposit A/r and withdraw A each year.

## Recording tips
- Draw the timeline on screen for every example and mark t = 0 clearly; most errors are timing errors.
- Show both formula and calculator keystrokes, including BGN mode and clearing the TVM registers.
- Slow down on the deferred perpetuity: show that A/r lands one period before the first payment.
