---
title: "Pricing Conventions, Discounting and Arbitrage"
duration: 24
---

## Lecture outline
- 00:00 - Hook: "What would you pay today for a guaranteed 100 dollars in a year?" That number is a discount factor.
- 02:30 - Discount factors defined; pricing any bond as a sum of cash flows times discount factors.
- 06:00 - Extracting discount factors from traded bonds, shortest maturity first.
- 09:00 - Whiteboard 1: d(0.5) and d(1) from Bonds A and B; price Bond C.
- 13:00 - Law of one price, replication from the last cash flow backwards.
- 16:30 - Whiteboard 2: replicate Bond C and run the arbitrage at 104.30.
- 19:30 - Why arbitrage gaps persist: costs, liquidity, repo specials; STRIPS.
- 21:00 - Clean versus dirty prices, accrued interest and day counts; Whiteboard 3.
- 23:00 - Recap and exam traps.

## Slides
### Slide 1: Pricing Conventions, Discounting and Arbitrage
- Discount factors: the atoms of fixed income
- Law of one price and replication
- How bonds are quoted and settled

### Slide 2: What Is a Discount Factor?
- d(t) = price today of 1 unit received for certain at time t
- Below 1 when rates are positive; falls with maturity
- Zero rates and discount factors carry the same information

### Slide 3: Pricing Any Fixed Cash Flows
- P = Σ CF_i × d(t_i)
- No yield or compounding choice needed
- Result is the full (dirty) price

### Slide 4: Extracting Discount Factors
- Shortest bond: d(t1) = price / final cash flow
- Next bond: value known cash flows, solve for the new d
- Repeat along the six-month grid

### Slide 5: The Law of One Price
- Same cash flows in every state means same price
- Otherwise buy cheap, sell rich, lock in profit today
- That riskless profit is arbitrage

### Slide 6: Building a Replicating Portfolio
- Match the final cash flow with the longest bond
- Work backwards, filling earlier dates with shorter bonds
- Replication cost should equal the discount-factor price

### Slide 7: Running the Arbitrage
- Bond rich: sell bond, buy replicating portfolio
- Bond cheap: buy bond, sell replicating portfolio
- Future cash flows net to zero; profit is upfront

### Slide 8: Why Gaps Survive in Practice
- Bid-ask spreads and financing costs
- Liquidity premia, taxes, repo specialness
- STRIPS trading keeps prices close to fair value

### Slide 9: Clean Versus Dirty Price
- Dirty = clean + accrued interest
- AI = (c/2) × days since last coupon / days in period
- Screens show clean; buyers pay dirty

### Slide 10: Day-Count Conventions
- Actual/actual: US Treasuries
- 30/360: many corporate bonds
- Actual/360: money-market instruments

### Slide 11: Recap
- Discount factors price everything
- Replicate from the back, trade the gap
- Always know which price (clean or dirty) you are using

## Whiteboard examples
**Example 1 - discount factors and pricing.** Bond A: 6 months, 2% semiannual coupon, price 99.50 (pays 101 at 0.5). Bond B: 1 year, 4% coupon, price 100.20 (pays 2, then 102).
- d(0.5) = 99.50 / 101 = 0.985149
- d(1) = (100.20 − 2 × 0.985149) / 102 = 0.963036
- Bond C (8% coupon, 1 year: pays 4, 104): 4 × 0.985149 + 104 × 0.963036 = **104.0964**

**Example 2 - replication and arbitrage.**
- Units of B to match 104 at year 1: 104 / 102 = 1.019608
- B also pays 2 × 1.019608 = 2.039216 at 0.5; need 4 − 2.039216 = 1.960784 more
- Units of A: 1.960784 / 101 = 0.019414
- Cost: 0.019414 × 99.50 + 1.019608 × 100.20 = 104.0964
- Market price 104.30: sell C, buy portfolio, profit **0.2036 per 100 face** today

**Example 3 - accrued interest.** A 4% semiannual Treasury is quoted at a clean price of 101.25. Settlement is 61 days into a 182-day coupon period.
- AI = 2 × 61 / 182 = 0.6703
- Dirty price = 101.25 + 0.6703 = **101.9203**

## Questions to ask students
- If d(2) = 0.92, what is a guaranteed 500 dollars in two years worth today? (460 dollars.)
- Why do we start extracting discount factors with the shortest bond? (It has only one cash flow, so one equation gives one unknown.)
- A replicating portfolio costs 99.10 and the bond trades at 98.70. What is the trade? (Buy the bond, sell the replicating portfolio; profit 0.40 per 100.)
- Does the discount-factor formula give the clean or the dirty price? (Dirty.)
- Name two reasons a small arbitrage gap might not be worth trading. (Transaction costs, financing costs, illiquidity, repo specialness, taxes.)

## Analogies
- Discount factors are like a price list at a market: once you know the price of each item (each date's 1 unit), any basket (bond) is priced by adding up.
- Replication is building the same Lego model from different bricks; if the finished models are identical, they must cost the same.
- Accrued interest is like splitting a monthly rent when a tenant moves out mid-month: the outgoing owner gets paid for the days they held it.

## Recording tips
- Put the cash-flow timeline on screen for every bond; students lose track of which payment is which.
- Emphasise the direction of the arbitrage slowly, with arrows for "buy" and "sell" on the timeline.
- Keep six decimal places for discount factors on the board so the replication cost matches exactly.
