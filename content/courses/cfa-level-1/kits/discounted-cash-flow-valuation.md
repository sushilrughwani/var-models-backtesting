---
title: "Equity Valuation: Concepts and Dividend Discount Models"
duration: 30
---

## Lecture outline
- 00:00 - Hook: "A share is a claim on cash you will receive in the future. So what is that worth today?"
- 02:00 - Intrinsic value vs market price; three model families
- 06:00 - The general DDM and when to use dividends vs free cash flow to equity
- 10:00 - Preferred share valuation (whiteboard example 2)
- 13:00 - Gordon growth model and its sensitivity to r - g
- 17:00 - Sustainable growth: g = b x ROE
- 20:00 - Two-stage DDM (whiteboard example 1)
- 27:00 - Recap and exam traps

## Slides
### Slide 1: Intrinsic Value vs Price
- Intrinsic value > price: undervalued
- Intrinsic value < price: overvalued
- Small gaps are within estimation error
### Slide 2: Three Model Families
- Present value models: dividends or FCFE
- Multiplier models: P/E, P/B, EV/EBITDA
- Asset-based models: assets minus liabilities
### Slide 3: The Dividend Discount Model
- Value = sum of D_t / (1 + r)^t
- r = required return on equity
- Best for mature, dividend-paying firms
### Slide 4: When to Use FCFE
- Firm pays no or erratic dividends
- Dividends unrelated to earning power
- Valuing from a controlling owner's viewpoint
### Slide 5: Preferred Shares
- Fixed dividend forever: a perpetuity
- Value = Dp / rp
- Higher required return, lower value
### Slide 6: Gordon Growth Model
- V0 = D1 / (r - g)
- Requires r > g and g sustainable for ever
- Highly sensitive to the spread r - g
### Slide 7: Sustainable Growth
- g = b x ROE
- b = retention ratio = 1 - payout
- Reinvested earnings at ROE grow future dividends
### Slide 8: Two-Stage DDM
- Explicit dividends during high growth
- Terminal value Vn = D(n+1) / (r - gL)
- Discount Vn by n years, not n + 1
### Slide 9: Terminal Value Dominates
- Often 70-90% of total value
- Long-run growth and r drive the answer
- Always run a sensitivity table
### Slide 10: Exam Traps
- D1 not D0
- D(n+1) for terminal value; discount n periods
- Retention, not payout, in g = b x ROE

## Whiteboard examples
**Example 1 - two-stage DDM.** D0 = 2.00, 12% growth for three years, then 4%, r = 10%.
- D1 2.2400, D2 2.5088, D3 2.8099, D4 2.9223.
- V3 = 2.9223/0.06 = 48.7042; PV = 36.5922.
- PV of D1-D3 = 2.0364 + 2.0734 + 2.1111 = 6.2208. Value = USD 42.81.
- Constant 4% from today: 2.08/0.06 = 34.67.

**Example 2 - preferred and Gordon.** Preferred: par 100, 6% dividend, required return 7.5%: value = 6/0.075 = 80.00. Gordon: D0 = 1.50, g = 5%, r = 9%: D1 = 1.575; value = 1.575/0.04 = 39.38.

**Example 3 - sensitivity.** Same Gordon stock, r = 8%: 1.575/0.03 = 52.50. A one-point drop in r raises value by a third.

## Questions to ask students
- ROE 15%, payout 40%: sustainable growth? (0.60 x 15% = 9%.)
- Why can't the Gordon model be used if g exceeds r? (The formula gives a negative or infinite value; no firm can outgrow its discount rate for ever.)
- What happens to a preferred share's value if required returns rise? (It falls.)
- In a two-stage model, why use D(n+1) for the terminal value? (The Gordon formula values dividends starting one period after the valuation date.)
- When would you prefer FCFE to dividends? (When dividends are absent or not linked to earning power.)

## Analogies
- A share is an orchard: today's value is what all the future harvests are worth now, discounted for waiting and risk.
- r - g is a fragile denominator, like a seesaw balanced on a narrow point: a small nudge produces a large swing in value.
- The two-stage model is a sprint followed by a marathon: count each sprint stride, then use a formula for the steady marathon pace.

## Recording tips
- Draw a timeline with dividends above and the terminal value at year 3; most errors come from putting V3 in the wrong year.
- Show a quick sensitivity grid of value across r and g to make the r - g point visual.
- Link back to the cost of equity from the equity securities lesson: the r here is that same required return.
