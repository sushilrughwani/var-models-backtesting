---
title: "Pricing and Valuation of Futures Contracts"
duration: 22
---

## Lecture outline
- 00:00 - Hook: a forward settles once like a final exam; futures settle daily like weekly quizzes.
- 02:00 - Futures versus forwards: standardisation, exchange, CCP, daily settlement.
- 05:00 - Margin mechanics: initial, maintenance, variation margin.
- 08:00 - Whiteboard: three-day gold margin account.
- 13:00 - Value resets to zero after each settlement; convergence at expiry.
- 16:00 - Futures versus forward prices and interest rate correlation.
- 19:00 - Price limits, offsetting positions; recap.

## Slides
### Slide 1: Futures in One Sentence
- A standardised, exchange-traded forward
- Cleared by a CCP
- Gains and losses settled every day
### Slide 2: Same Pricing Formula
- $F_0 = [S_0 - PV(I) + PV(C)](1+r)^T$
- Differences are institutional, not conceptual
### Slide 3: Margin Vocabulary
- Initial margin: performance bond to open
- Maintenance margin: floor that triggers a call
- Variation margin: deposit back to initial
### Slide 4: Daily Mark-to-Market
- Gain = (today's settle − yesterday's settle) × size × contracts
- Long gains when price rises; short gains when it falls
- Losses collected daily, so credit risk is small
### Slide 5: Gold Margin Example
- 100 oz at 1,900; IM 8,000; MM 6,000
- Day 1: 6,500; Day 2: 5,000, call for 3,000
- Day 3: 11,500; cumulative gain 500
### Slide 6: Value of a Futures Position
- Resets to zero after each settlement
- Between settlements: gain since last settle
- Forwards, by contrast, accumulate value until $T$
### Slide 7: Convergence
- Futures price converges to spot at expiry
- Otherwise an immediate arbitrage exists
### Slide 8: Futures vs Forward Prices
- Constant or uncorrelated rates: equal
- Positive correlation with rates: futures price higher
- Negative correlation: futures price lower
### Slide 9: Practical Features
- Price limits can halt trading
- Most positions closed by offsetting trade
### Slide 10: Key Takeaways
- Variation margin restores initial margin
- Futures value resets daily
- Correlation with rates decides futures vs forward price

## Whiteboard examples
1. **Gold margin account.** Long 1 contract, 100 oz, at 1,900; IM 8,000; MM 6,000. Day 1 settle 1,885: −1,500, balance 6,500. Day 2 settle 1,870: −1,500, balance 5,000 < 6,000, deposit 3,000, balance 8,000. Day 3 settle 1,905: +3,500, balance 11,500. Cumulative gain = 5 × 100 = 500 = 11,500 − 11,000 deposited.
2. **Margin call size.** Long 1 contract of 50 units at 400; IM 2,000; MM 1,500. Next settle 388: loss = 12 × 50 = 600, balance 1,400 < 1,500. Variation margin = 2,000 − 1,400 = 600.
3. **Short index futures.** Short 4 contracts, multiplier 250, index from 4,000 to 3,960. Gain = 4 × 250 × 40 = 40,000 credited to the short.

## Questions to ask students
- To what level must a margin call restore the account? (The initial margin.)
- What is a futures position worth right after daily settlement? (Zero.)
- Futures prices are positively correlated with rates. Is the futures price above or below the forward price? (Above.)
- What happens to the futures price as expiry nears? (It converges to the spot price.)
- Why is counterparty risk lower in futures than in forwards? (Losses are collected daily and the CCP stands in the middle.)

## Analogies
- Daily settlement is like a restaurant tab settled every night instead of at the end of the month: nobody runs up a big debt.
- Initial margin is a security deposit on a flat, not rent: you get it back if you meet your obligations.
- The correlation effect is like getting your paycheque on days when savings accounts pay the most interest: same total, but more valuable.

## Recording tips
- Build the margin table row by row on screen; students lose track of whether deposits are included in the balance.
- Emphasise "back to INITIAL" with a visual cue; it is the most tested margin detail.
- Keep the correlation discussion intuitive (when do you receive cash, and what rate can you earn on it?).
