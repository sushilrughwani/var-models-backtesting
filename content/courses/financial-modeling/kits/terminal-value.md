---
title: "Terminal Value: Perpetuity Growth and Exit Multiple"
duration: 20
---

## Lecture outline
- 00:00 - Hook: three-quarters of Northwind's value comes from years nobody forecast
- 02:00 - Why a terminal value; steady-state requirements for the final year
- 05:00 - Perpetuity growth method and choosing g
- 08:00 - Exit multiple method
- 10:00 - Live Excel: discounting both TVs and building EV
- 14:00 - Cross-checks: implied multiple and implied growth
- 17:00 - Exam traps and recap

## Slides
### Slide 1: Beyond the Forecast
- The business keeps running after 2030
- TV compresses all later cash flows into one number
- Typically 60-80% of EV

### Slide 2: Perpetuity Growth
- $TV_N = \text{FCFF}_N(1+g)/(\text{WACC}-g)$
- g below WACC and near long-run nominal GDP
- Final year must be steady state

### Slide 3: Exit Multiple
- $TV_N = \text{Multiple} \times \text{EBITDA}_N$
- Multiple from trading comps
- Market-anchored, but imports today's mood

### Slide 4: Discount N Years
- Both TVs sit at the end of year N
- $PV = TV_N/(1+\text{WACC})^N$
- `=F22/(1+$C$4)^5`

### Slide 5: Northwind Inputs (USD m)
- FCFF 108.75 to 145.75; WACC 9.0%
- g 2.5%; 2030 EBITDA 275; exit 9.0x
- PV of forecast FCFF = 495.33

### Slide 6: Growth Method Result
- TV = 149.39 / 0.065 = 2,298.37
- PV = 1,493.78
- EV = 1,989.11 (TV is 75.1%)

### Slide 7: Exit Method Result
- TV = 9.0 × 275 = 2,475.00
- PV = 1,608.58
- EV = 2,103.91

### Slide 8: Cross-Checks
- Growth TV implies 8.36x EBITDA
- Exit TV implies 2.94% perpetual growth
- Both plausible: methods corroborate

### Slide 9: Steady-State Checklist
- Normalised margins
- Capex at or slightly above D&A
- NWC growing with g

### Slide 10: Traps
- Missing $(1+g)$
- Wrong discount period
- g too close to WACC; wrong year's EBITDA

## Whiteboard examples
**Example 1 - Perpetuity TV for Northwind.**
- FCFF 2031 = 145.75 × 1.025 = 149.39
- TV = 149.39 / 0.065 = 2,298.37; PV = 2,298.37 / 1.5386 = 1,493.78
- EV = 495.33 + 1,493.78 = 1,989.11

**Example 2 - Exit multiple and implied growth.**
- TV = 9.0 × 275 = 2,475.00; PV = 1,608.58; EV = 2,103.91
- Implied g = (2,475 × 0.09 − 145.75) / (2,475 + 145.75) = 77.00 / 2,620.75 = 2.94%

**Example 3 - Sensitivity of TV to g.**
- g = 3.0%: TV = 145.75 × 1.03 / 0.06 = 2,502.04 (up 203.68 from 2,298.37)
- g = 2.5% but forgetting $(1+g)$: 145.75 / 0.065 = 2,242.31
- Discounting four years by mistake: 2,298.37 / 1.09^4 = 1,628.22 instead of 1,493.78

## Questions to ask students
- Why must g be below WACC? (Otherwise the formula gives a negative or infinite value; no firm can outgrow the economy forever.)
- Northwind plans a new factory in 2030 with capex double D&A. Is 2030 a good terminal base year? (No, normalise capex or extend the forecast.)
- The exit multiple implies 5% perpetual growth. What do you conclude? (The multiple is too high for a mature business.)
- Why discount the exit TV five years, not six? (It is a value at the end of 2030, year five.)
- What share of EV coming from TV would make you uncomfortable? (Above about 80% deserves scrutiny of the forecast length and steady-state assumptions.)

## Analogies
- TV as the resale value of a house you plan to rent out for five years: the rental income is the forecast, the sale price is the TV.
- The perpetuity formula as a lever: g sits next to the fulcrum in the denominator, so tiny moves create big swings.
- Two methods as two witnesses: when their stories (implied growth and implied multiple) agree, you trust the verdict more.

## Recording tips
- Show the TV share of EV in a big font; it makes students take g seriously.
- Type the implied growth formula in Excel live and explain each term before it returns 2.94%.
- Flag clearly that these EV figures carry into the next lesson's bridge to share price.
