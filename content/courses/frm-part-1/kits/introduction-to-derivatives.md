---
title: "Introduction to Derivatives"
duration: 24
---

## Lecture outline
- 00:00 - Hook: with USD 10,000, one trader makes USD 3,000 and another USD 40,000 on the same stock move
- 02:00 - What a derivative is; underlyings; exchange vs OTC (preview)
- 04:00 - Forwards: delivery price, zero initial value, long and short payoffs
- 07:00 - Futures in one minute: standardised, exchange-traded, marked to market
- 08:00 - Options: calls and puts, European vs American, payoff and profit diagrams
- 13:00 - Hedgers: exporter selling currency forward; investor buying puts
- 16:00 - Speculators: shares vs calls and the leverage effect
- 19:00 - Arbitrageurs: cross-listed share example
- 21:00 - Hedger-turned-speculator risk, recap and traps

## Slides
### Slide 1: What Is a Derivative?
- Value derived from an underlying variable
- Underlyings: stocks, indices, FX, rates, commodities, credit, weather
- Transfers risk without transferring the asset
### Slide 2: Forward Contracts
- Agree today to trade at delivery price K on date T
- Worth zero at inception; no upfront payment
- Long payoff $S_T - K$; short payoff $K - S_T$
### Slide 3: Futures vs Forwards
- Futures: exchange-traded, standardised, daily settlement
- Forwards: OTC, customised, settled at maturity
- Full mechanics in the futures lesson
### Slide 4: Options Basics
- Call: right to buy at K; put: right to sell at K
- European: exercise at maturity; American: any time
- Holder pays a premium; writer takes the obligation
### Slide 5: Option Payoffs
- Long call: $\max(S_T - K, 0)$
- Long put: $\max(K - S_T, 0)$
- Profit = payoff - premium; short positions are mirror images
### Slide 6: Forward vs Option Hedge
- Forward: locks in a price, removes upside and downside
- Option: floor (or cap) with upside retained
- Option costs a premium; forward costs nothing upfront
### Slide 7: Hedgers
- Exporter sells GBP 10m forward at 1.2850: locks in USD 12.85m
- Investor buys index puts as portfolio insurance
- Goal: reduce variability, not maximise profit
### Slide 8: Speculators and Leverage
- 200 shares vs 5,000 calls for USD 10,000
- Stock to 65: +3,000 vs +40,000
- Stock to 45: -1,000 vs -10,000
### Slide 9: Arbitrageurs
- London GBP 100 × 1.30 = USD 130 vs New York USD 128
- Buy cheap, sell dear: USD 2 per share riskless
- Arbitrage closes gaps quickly
### Slide 10: When Roles Drift
- Hedging or arbitrage desks can turn into speculation
- Limits, independent risk monitoring, segregation of duties
- Many famous losses began this way
### Slide 11: Takeaways
- Linear payoffs (forwards/futures) vs asymmetric payoffs (options)
- Always distinguish payoff from profit
- Hedgers, speculators, arbitrageurs: same instruments, different purposes

## Whiteboard examples
**1. Exporter hedge.** Receive GBP 10m in 3 months; forward 1.2850.
- Locked-in proceeds: 10m × 1.2850 = USD 12.85m.
- Spot 1.2500: forward gain = 10m × 0.0350 = USD 350,000; receipt worth USD 12.50m; total USD 12.85m.
- Spot 1.3200: forward loss = USD 350,000; receipt worth USD 13.20m; total USD 12.85m.

**2. Shares vs calls.** S = 50, K = 55, c = 2, budget USD 10,000.
- 200 shares or 5,000 calls.
- S_T = 65: shares +3,000; calls 5,000 × (10 - 2) = +40,000.
- S_T = 45: shares -1,000; calls -10,000.
- Call breakeven: 55 + 2 = 57.

**3. Put profit.** 1,000 puts, K = 40, p = 3, S_T = 32.
- Payoff 8 per put; profit 5 per put; total USD 5,000.

## Questions to ask students
- What is the value of a forward contract on the day it is agreed? (Zero, because K is set to make it fair.)
- What is the maximum loss for the writer of a call? (Unlimited, as the stock price has no upper bound.)
- What is the breakeven stock price for a long put with K = 40 and p = 3? (37.)
- Does hedging guarantee a better outcome? (No; it reduces uncertainty and may produce a worse result ex post.)
- What stops arbitrage opportunities from persisting? (Arbitrageurs' trades push prices back into line.)

## Analogies
- A forward is a restaurant reservation at a fixed price: you must turn up and pay it, even if the menu gets cheaper.
- An option is a refundable deposit you never get back: you pay a fee for the right to walk away.
- Arbitrageurs are like water finding its level: any price gap is quickly drained.

## Recording tips
- Draw all four payoff diagrams (long/short call, long/short put) on one screen; label the kink at K and the premium offset.
- Run the speculator example as a two-column table so the leverage contrast jumps out.
- Pause on payoff vs profit; it is the most common mistake on exam questions.
