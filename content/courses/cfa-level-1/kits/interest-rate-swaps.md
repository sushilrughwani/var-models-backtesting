---
title: "Pricing and Valuation of Interest Rate Swaps"
duration: 26
---

## Lecture outline
- 00:00 - Hook: a company with a floating-rate loan loses sleep over rate hikes. One phone call to a dealer fixes its rate.
- 02:00 - Mechanics: notional, fixed payer, floating payer, net settlement.
- 05:00 - A swap as a portfolio of FRAs; single fixed rate versus a strip of forward rates.
- 09:00 - Bond view: pay-fixed = short fixed bond + long floating bond; why the floater is at par.
- 12:00 - Par swap rate formula and whiteboard computation.
- 17:00 - Valuation after rates change: formula, sign intuition and bond check.
- 23:00 - Traps and recap.

## Slides
### Slide 1: Plain-Vanilla Swap
- Exchange fixed for floating interest on a notional
- Notional is never exchanged
- Only net payments change hands
### Slide 2: Who Uses Swaps?
- Floating-rate borrower fixes its cost (pay fixed)
- Fixed-rate issuer converts to floating (receive fixed)
- Banks manage asset-liability mismatches
### Slide 3: Swap = Portfolio of FRAs
- Each settlement is a forward on the floating rate
- Single fixed rate across all periods
- Individual pieces non-zero, total zero at start
### Slide 4: The Bond View
- Pay fixed = short fixed-rate bond + long floating-rate bond
- Floating bond trades at par on reset dates
- Swap worth zero when fixed bond is at par
### Slide 5: Par Swap Rate
- $s_N = (1 - DF_N)/\sum DF_i$
- $DF_i = 1/(1+z_i)^i$
- Example: 3.0%, 3.5%, 4.0% spot rates give 3.97%
### Slide 6: Valuing an Existing Swap
- $V_{\text{pay-fixed}} = (s_{\text{new}} - s_0) \times \sum DF \times N$
- Use remaining periods and current DFs
- Receiver's value is the negative
### Slide 7: Worked Example Result
- One year later: 4.0% and 4.5% spot rates
- New two-year par rate 4.49%
- Value to fixed payer about USD 96,710 on 10 million
### Slide 8: Sign Intuition
- Rates up: fixed payer locked in below market, gains
- Rates down: fixed receiver gains
### Slide 9: Exam Traps
- Do not average spot rates
- Numerator uses the last discount factor
- Only remaining periods count
### Slide 10: Key Takeaways
- Swap value zero at initiation via par rate
- Value later = PV of rate difference
- Equivalent bond and FRA views

## Whiteboard examples
1. **Par swap rate.** $z_1 = 3.0\%$, $z_2 = 3.5\%$, $z_3 = 4.0\%$. $DF = 0.970874, 0.933511, 0.888996$; sum 2.793381. $s_3 = (1 - 0.888996)/2.793381 = 3.9738\%$.
2. **Valuation after a rate rise.** One year on, $z_1 = 4.0\%$, $z_2 = 4.5\%$: $DF = 0.961538, 0.915730$; sum 1.877268. New par rate $= 0.084270/1.877268 = 4.4890\%$. Value to payer on 10 million $= (0.044890 - 0.039738) \times 1.877268 \times 10{,}000{,}000 = 96{,}710$. Bond check: fixed bond PV $= 397{,}381 \times 0.961538 + 10{,}397{,}381 \times 0.915730 = 9{,}903{,}290$; $10{,}000{,}000 - 9{,}903{,}290 = 96{,}710$.
3. **Rate fall.** Fixed payer at 3% on 50 million, two years left, DFs 0.98 and 0.955 (sum 1.935). New par $= 0.045/1.935 = 2.3256\%$. Payer value $= (0.023256 - 0.03) \times 1.935 \times 50{,}000{,}000 = -652{,}500$.

## Questions to ask students
- Is the notional exchanged in a plain-vanilla interest rate swap? (No.)
- Why does the floating leg price at par on a reset date? (Its coupon resets to the market rate, so it is worth par.)
- Rates fall after you entered a receive-fixed swap. Gain or loss? (Gain.)
- DFs 0.97 and 0.93: two-year par swap rate? (0.07/1.90 = 3.68%.)
- What is a swap worth at initiation? (Zero.)

## Analogies
- A pay-fixed swap is a fixed-price mobile plan: if data prices rise, your locked-in plan becomes valuable.
- A swap as FRAs is a season ticket: one price for every match, even though some matches are worth more than others.
- The floating bond at par is like a savings account that always pays the current rate: it is always worth what you put in.

## Recording tips
- Draw the cash-flow arrows (fixed one way, floating the other) before any formulas.
- Show the bond check every time; it builds intuition and catches sign errors.
- Keep six-decimal discount factors on screen; rounding too early shifts the swap value noticeably.
