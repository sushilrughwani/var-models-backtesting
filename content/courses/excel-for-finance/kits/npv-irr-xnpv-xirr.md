---
title: "NPV, IRR, XNPV and XIRR"
duration: 22
---

## Lecture outline
- 00:00 - Hook: the same project is worth 11,557 or 18,458 depending on one function choice
- 02:00 - NPV intuition: today's value of everything the project gives back, minus what it costs
- 05:00 - Excel's NPV assumption: first value is one period away; the `+C2` pattern
- 09:00 - IRR: the break-even discount rate; accept/reject rule
- 12:00 - Live build: four-year project, NPV, IRR and the classic mistake
- 15:00 - Irregular dates: XNPV and XIRR on the same cash flows
- 19:00 - When NPV and IRR disagree; multiple IRRs
- 21:00 - Recap and quiz preview

## Slides
### Slide 1: One Project, Two Answers
- Same cash flows, same 10% rate
- `NPV`: 11,556.59; `XNPV`: 18,458.22
- Timing is value
### Slide 2: NPV in One Sentence
- Discount every cash flow to today, then add them up
- Positive NPV: the project earns more than the hurdle rate
- Measured in currency, so it shows how much value is created
### Slide 3: The NPV Function Trap
- `NPV` assumes the first value arrives in one period
- Correct: `=NPV(B1, C3:C6) + C2`
- Wrong: `=NPV(B1, C2:C6)` is too small by a factor of 1 + r
### Slide 4: IRR
- The rate that sets NPV to zero
- `=IRR(C2:C6)` includes the time-0 flow
- Accept if IRR is above the hurdle rate
### Slide 5: Worked Numbers
- PV of inflows 111,556.59
- NPV 11,556.59; IRR 15.32%
- Mistaken NPV 10,505.99
### Slide 6: Irregular Dates
- Real cash flows do not land on anniversaries
- `=XNPV(rate, values, dates)` and `=XIRR(values, dates)`
- Discount by actual days divided by 365 from the first date
### Slide 7: Same Flows, Real Dates
- Days: 0, 258, 531, 806, 1,081
- XNPV 18,458.22; XIRR 21.52%
- Faster cash means more value
### Slide 8: When NPV and IRR Disagree
- Scale and timing differences can flip IRR rankings
- More than one sign change can mean several IRRs
- NPV wins conflicts because it measures value directly
### Slide 9: Error Checklist
- Time-0 flow outside `NPV`, inside `IRR` and `XNPV`
- Dates must be real dates, not text
- Rate in `XNPV` is annual
### Slide 10: Takeaways
- Discount, sum, compare
- Know where each function expects the first cash flow
- Use X-functions whenever timing is irregular

## Whiteboard examples
1. **Three-year project.** Cash flows −50,000, 15,000, 20,000, 25,000 at 8%. PVs: 13,888.89, 17,146.78, 19,845.81; sum 50,881.47. NPV = 881.47. IRR = 8.90%, just above 8%. Show that `=NPV(8%, B2:B5)` gives 816.18 = 881.47 / 1.08.
2. **Short holding XIRR.** Invest 10,000 on 1 Jan 2026, receive 11,000 on 1 Jul 2026 (181 days). XIRR = 1.1^(365/181) − 1 = 21.19%. Contrast with the 10% holding-period return and the simple annualised 20.17%.
3. **Dates matter.** Re-run the lesson project with real dates: XNPV 18,458.22 versus NPV 11,556.59. Ask the class to explain the difference before revealing it.

## Questions to ask students
- Where does the time-0 investment go in `NPV`? (Outside the function, added separately.)
- And in `IRR` and `XNPV`? (Inside the range, as the first value.)
- A project has NPV of zero at 12%. What is its IRR? (12%.)
- What day-count does `XNPV` use? (Actual days divided by 365, measured from the first date.)
- Project A has higher IRR, Project B higher NPV; they are mutually exclusive. Which do you choose? (B, the higher NPV.)
- Why can a mine with a large closure cost at the end have two IRRs? (Cash flows change sign twice.)

## Analogies
- NPV is a price tag: it tells you what the project is worth today in currency after paying for it.
- IRR is the project's break-even interest rate, like the highest rate at which you could borrow to fund it and still not lose money.
- Using `NPV` on irregular cash flows is like assuming every train arrives on the hour: tidy, but wrong whenever the timetable says otherwise.

## Recording tips
- Show the PV of each cash flow in a helper column first, then reveal that `NPV` matches the sum; students trust the function once they see it.
- Put the right and wrong NPV formulas side by side and divide one by the other on screen to prove the 1 + r factor.
- Format dates as dates and show what happens to `XIRR` when one date is text.
