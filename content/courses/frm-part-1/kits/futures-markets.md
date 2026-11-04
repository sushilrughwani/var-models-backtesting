---
title: "Futures Markets"
duration: 24
---

## Lecture outline
- 00:00 - Hook: you were right about gold over the month, but you still had to wire cash on day 3. Why?
- 02:00 - From forward to futures: standardisation and contract specifications
- 06:00 - Price limits, position limits, delivery vs cash settlement, closing out
- 08:00 - Convergence of futures to spot
- 10:00 - Daily settlement, initial and maintenance margin, variation margin
- 13:00 - Whiteboard: two gold contracts over five days and the trigger price
- 18:00 - Volume and open interest
- 20:00 - Futures vs forwards; order types
- 22:30 - Recap and traps

## Slides
### Slide 1: Futures Are Standardised Forwards
- Exchange-traded, standardised, cleared
- Gains and losses settled daily
- Most positions closed out before maturity
### Slide 2: Contract Specifications
- Asset and acceptable grades
- Contract size, delivery location and months
- Price quotes, tick size, daily and position limits
### Slide 3: Delivery
- Physical delivery: short chooses timing and often grade
- Cash settlement for indices and some others
- Offsetting trades are the usual exit
### Slide 4: Convergence
- Futures approach spot as delivery nears
- Futures above spot: sell futures, buy spot, deliver
- Futures below spot: buy futures, take delivery
### Slide 5: Margin Mechanics
- Initial margin at entry; maintenance margin is the floor
- Below maintenance: margin call
- Variation margin restores initial margin
### Slide 6: Trigger Price
- Long: $F_0 - (IM - MM)/Q$
- Short: $F_0 + (IM - MM)/Q$
- Use per-contract margins with per-contract size
### Slide 7: Gold Example
- Long 2 × 100 oz at 1,950; IM 12,000, MM 9,000
- Day 3 settle 1,926: balance 7,200, call of 4,800
- Trigger price 1,935
### Slide 8: Volume and Open Interest
- Volume: contracts traded today
- Open interest: contracts outstanding
- Open/open +1; close/close -1; open/close unchanged
### Slide 9: Futures vs Forwards
- Exchange vs OTC; standardised vs custom
- Daily vs maturity settlement
- Clearing house vs bilateral credit risk
### Slide 10: Order Types
- Market, limit, stop, stop-limit
- Fill-or-kill, time-of-day orders
- Stops cap losses but do not guarantee the price
### Slide 11: Takeaways
- Margin turns futures into a daily cash game
- Restore to initial, not maintenance
- Arbitrage forces convergence

## Whiteboard examples
**1. Gold margin account.** Long 2 contracts × 100 oz at 1,950; IM 6,000, MM 4,500 per contract. Each USD 1 = USD 200.
- Day 1 (1,941): -1,800 → 10,200.
- Day 2 (1,938): -600 → 9,600.
- Day 3 (1,926): -2,400 → 7,200 < 9,000; call 4,800 → 12,000.
- Day 4 (1,931): +1,000 → 13,000.
- Day 5 (1,915): -3,200 → 9,800; no call.
- Check: -35 × 200 = -7,000; 12,000 + 4,800 - 7,000 = 9,800.
- Trigger: 1,950 - 1,500/100 = 1,935.

**2. Short crude.** Short 1 × 1,000 bbl at 80; IM 6,000, MM 4,500.
- Trigger: 80 + 1,500/1,000 = 81.50.

**3. Wheat.** Long 2 × 5,000 bu at 6.00; IM 3,000, MM 2,500 each; settle 5.85.
- Loss 1,500; balance 4,500 < 5,000; deposit 1,500.

## Questions to ask students
- Why does the exchange restore balances to the initial margin rather than the maintenance margin? (To rebuild a full buffer against further losses.)
- Who chooses the delivery date within the delivery month? (The short.)
- Two traders both open new positions. What happens to open interest? (It rises by one.)
- Why is a futures contract worth zero after each daily settlement? (Gains and losses have been paid, and the contract is effectively re-struck at the new settlement price.)
- What prevents futures from staying above spot in the delivery period? (Arbitrage: sell futures, buy spot, deliver.)

## Analogies
- Daily settlement is like paying your restaurant tab every evening instead of at the end of a month-long trip: nobody can run up a huge bill.
- Maintenance margin is the low-fuel warning light: when it comes on, you fill the tank back to full, not just above the light.
- Open interest is the number of people seated at the poker table; volume is how many hands were played.

## Recording tips
- Build the margin table live, one row at a time, asking students for each balance before revealing it.
- Show both trigger formulas side by side and flip the sign for shorts explicitly.
- Do a quick open-interest drill with three trades; it is quick and highly testable.
