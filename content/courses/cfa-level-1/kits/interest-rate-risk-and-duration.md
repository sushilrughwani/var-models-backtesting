---
title: "Interest Rate Risk and Return"
duration: 32
---

## Lecture outline
- 00:00 - Hook: "Rates just rose 1%. Did you lose money?" The answer depends on when you need the cash.
- 03:00 - Three sources of return and the tug-of-war between price risk and reinvestment risk
- 08:00 - Macaulay duration as a balance point on a timeline of cash flows
- 13:00 - Modified duration, money duration and PVBP: turning time into sensitivity
- 18:00 - Whiteboard: full duration calculation for the 3-year 6% bond at 5%
- 23:00 - Effective duration and why bonds with options need it
- 27:00 - What drives duration, and the horizon-matching idea (duration gap)
- 30:00 - Recap, exam traps and preview of convexity

## Slides
### Slide 1: Interest Rate Risk and Return
- When yields change, every bondholder is affected, but not in the same way
- Today: sources of return, Macaulay, modified, money and effective duration
- Builds on: pricing with a single yield (earlier Fixed Income lesson)

### Slide 2: Three Sources of Return
- Promised coupons and principal
- Reinvestment income on coupons received before the horizon
- Capital gain or loss if sold before maturity
- Higher yields: reinvestment goes up, sale price goes down

### Slide 3: Two Opposing Risks
- Market price risk: dominates for short horizons
- Coupon reinvestment risk: dominates for long horizons
- Duration is the horizon at which they roughly offset

### Slide 4: Macaulay Duration
- Weighted-average time to receipt of cash flows
- Weight = PV of the cash flow / bond price
- Zero-coupon bond: Macaulay duration = maturity
- Units: periods; divide by periods per year

### Slide 5: Modified Duration
- ModDur = MacDur / (1 + r), where r is the periodic yield
- %ΔPV ≈ −ModDur × ΔYield
- ModDur of 2.70 means a 100 bp rise causes about a 2.70% fall

### Slide 6: Money Duration and PVBP
- Money duration = ModDur × full price
- PVBP = (PV at −1 bp − PV at +1 bp) / 2
- Hedgers think in currency, not percentages

### Slide 7: Worked Bond Numbers
- 3-year, 6% annual coupon, yield 5%: price 102.7232
- MacDur 2.8358, ModDur 2.7007
- +100 bp estimate −2.70% vs exact −2.65%

### Slide 8: Effective Duration
- EffDur = (PV− − PV+) / (2 × ΔCurve × PV0)
- Shift the benchmark curve and reprice with a model
- Required for callables, putables and MBS
- Option-free bond: EffDur ≈ ModDur

### Slide 9: What Drives Duration
- Longer maturity: higher duration
- Higher coupon: lower duration
- Higher yield: lower duration
- Floater: about the time to its next reset

### Slide 10: Duration Gap and Horizon
- Duration gap = MacDur − investment horizon
- Positive gap: price risk dominates, so rising rates hurt
- Negative gap: reinvestment risk dominates, so rising rates help
- Gap of zero: roughly immunised against one parallel shift

### Slide 11: Exam Traps
- Do not use MacDur in the price formula
- Annualise semiannual durations
- Duration is a linear estimate, with a bigger error for bigger moves

## Whiteboard examples
**Example 1 - full duration table.** 3-year, 6% annual coupon, par 100, yield 5%.
- PVs: 5.7143, 5.4422, 91.5668; price 102.7232.
- Weights: 0.0556, 0.0530, 0.8914.
- MacDur = 1(0.0556) + 2(0.0530) + 3(0.8914) = 2.8358.
- ModDur = 2.8358 / 1.05 = 2.7007. Money duration = 2.7007 × 102.7232 = 277.43.
- PVBP ≈ 0.0277 per 100 par.
- Yield to 6%: estimate −2.70%; exact price 100.0000, so −2.65%.

**Example 2 - effective duration.** Same bond, ±50 bp: PV− = 104.1234 (at 4.5%), PV+ = 101.3490 (at 5.5%).
- EffDur = (104.1234 − 101.3490) / (2 × 0.005 × 102.7232) = 2.7009.

**Example 3 - horizon yield.** Buy the bond at 102.7232 (5%). Yield jumps immediately to 6% and stays there.
- Hold 1 year and sell: coupon 6 + sale price 100.0000 (2-year 6% bond at 6%), so return = 106/102.7232 − 1 = 3.19%. That is below 5%: price risk dominates because the horizon of 1 is less than 2.84.
- Hold 3 years: coupons reinvested at 6% give 6(1.06)² + 6(1.06) + 106 = 119.1016. Horizon yield = (119.1016/102.7232)^(1/3) − 1 = 5.05%. That is slightly above 5%: reinvestment gain dominates because 3 is greater than 2.84.

## Questions to ask students
- What is the Macaulay duration of a 7-year zero-coupon bond? (7 years.)
- A bond has MacDur 6.3 and yield 5% annual. What is ModDur? (6.3/1.05 = 6.0.)
- Which has the higher duration: a 10-year 2% coupon bond or a 10-year 8% coupon bond? (The 2% bond, because more of its value comes at maturity.)
- Why can you not use modified duration for a callable bond? (Its cash flows change with rates, so you need effective duration from a model.)
- Your horizon is 2 years and the bond's MacDur is 5. Do rising rates help or hurt? (Hurt, because the duration gap is positive and price risk dominates.)

## Analogies
- Seesaw: the cash flows are weights on a plank laid along a timeline, and Macaulay duration is where you place the pivot so it balances.
- Tug-of-war: reinvestment income and price change pull in opposite directions when rates move, and the horizon decides who wins.
- Speedometer versus odometer: Macaulay duration is a distance in time; modified duration is the speed at which price reacts.

## Recording tips
- Draw the cash-flow timeline with bars sized by PV before writing any formula. Students remember the picture.
- Pause on "ModDur = MacDur / (1 + r)" and say "periodic yield" clearly; semiannual mistakes are common.
- Show the estimate versus the exact price side by side to set up the convexity lesson.
