---
title: "Currency Exchange Rates: Understanding Equilibrium Value"
duration: 32
---

## Lecture outline
- 00:00 - Hook: a trader earned steady carry for six years, then lost it all in two weeks. Why?
- 03:00 - Quote conventions (price/base), bid-offer, and building cross rates.
- 08:00 - Covered interest rate parity: derivation, forward points, forward premium/discount.
- 13:00 - Whiteboard: covered parity arbitrage when the market forward is mispriced.
- 18:00 - UIP, PPP, international Fisher, real rate parity: the parity web.
- 22:00 - Carry trade mechanics, return calculation and crash risk.
- 26:00 - Fundamentals: balance of payments, Mundell-Fleming, portfolio balance, monetary approach, overshooting.
- 30:00 - Recap and exam traps.

## Slides
### Slide 1: Reading a Quote
- Price currency / base currency: USD/EUR 1.1000 = USD per EUR
- Bid: dealer buys the base; offer: dealer sells the base
- You always transact on the side that is worse for you
### Slide 2: Cross Rates With Spreads
- Chain quotes so the middle currency cancels
- Cross bid = bid × bid; cross offer = offer × offer
- Inverting: new bid = 1/offer, new offer = 1/bid
### Slide 3: Covered Interest Rate Parity
- $F = S \times \frac{1 + i_P(\tau/360)}{1 + i_B(\tau/360)}$
- Enforced by arbitrage
- Higher-yield currency trades at a forward discount
### Slide 4: Forward Points
- Points = (F − S) × 10,000
- Positive points: base currency at a forward premium
- Example: USD/EUR 1.1000 spot, 180-day forward 1.1086 (+108.6 points)
### Slide 5: Uncovered Interest Parity
- Expected spot = forward rate
- No arbitrage enforces it; fails in short run
- Its failure is the source of carry returns
### Slide 6: The Parity Web
- Relative PPP: spot change ≈ inflation differential
- International Fisher: nominal differential ≈ inflation differential
- Real rate parity links the two
- All hold: forward is unbiased predictor of future spot
### Slide 7: Carry Trade
- Borrow low-yield, invest high-yield
- Return = (1 + i_H)(1 + %ΔS_H) − (1 + i_L)
- Negatively skewed: steady gains, sudden crashes
### Slide 8: Balance of Payments and Capital Flows
- Current account deficits: slow-moving, long-run pressure
- Capital flows: fast, dominate short-run moves
- Emerging markets: inflow surges and sudden stops
### Slide 9: Mundell-Fleming Policy Mix
- High mobility: fiscal expansion + monetary tightening = strong appreciation
- Monetary expansion + fiscal tightening = depreciation
- Low mobility: fiscal expansion worsens trade balance, currency weakens
### Slide 10: Long-Run Views
- Portfolio balance: persistent deficits eventually weaken currency
- Monetary approach: money growth leads to inflation and depreciation
- Dornbusch overshooting with sticky prices
### Slide 11: Key Takeaways
- Only covered parity is arbitrage
- Respect bid-offer sides and the numerator/denominator rule
- Policy effects depend on capital mobility and horizon

## Whiteboard examples
**Example 1: cross rate with spreads.** USD/GBP = 1.2650 - 1.2654 and CHF/USD = 0.8810 - 0.8814. Find CHF/GBP.
- Bid = 1.2650 × 0.8810 = 1.11446
- Offer = 1.2654 × 0.8814 = 1.11532
- Answer: CHF/GBP 1.1145 - 1.1153.

**Example 2: covered parity arbitrage.** Spot USD/EUR 1.1000, 180-day USD rate 4.5%, EUR rate 2.5%. Fair forward is 1.10864, but a dealer quotes 1.1150 (the euro is too expensive forward). Sell euros forward at the rich price.
1. Borrow USD 1,086,419.75 at 4.5% for 180 days; repay 1,086,419.75 × 1.0225 = USD 1,110,864.20.
2. Convert at spot to EUR 987,654.32 and invest at 2.5%: grows to EUR 1,000,000.
3. Sell EUR 1,000,000 forward at 1.1150: receive USD 1,115,000.
4. Profit = 1,115,000 − 1,110,864.20 = **USD 4,135.80**, riskless.

**Example 3: carry trade.** Borrow JPY at 0.5%, invest in AUD at 4.5%, AUD falls 2% vs JPY. Return = 1.045 × 0.98 − 1.005 = **1.91%**.

## Questions to ask students
- Which currency trades at a forward discount, the high-yield or the low-yield one? (The high-yield currency.)
- Is UIP enforced by arbitrage? (No; only covered parity is. UIP is an expectations condition.)
- Why are carry trade returns negatively skewed? (Gains accrue slowly; unwinds in risk-off episodes are sudden and crowded.)
- With high capital mobility, what does fiscal expansion plus monetary tightening do to the currency? (Strong appreciation.)
- If you invert a quote of 1.2650 - 1.2654, what is the new bid? (1/1.2654 = 0.7903.)

## Analogies
- Covered parity is like two toll roads to the same city: if one is cheaper, everyone switches until tolls equalise.
- The carry trade is picking up coins in front of a steamroller: small, steady gains with rare, crushing losses.
- Overshooting is a rubber band: the exchange rate stretches past its resting point because goods prices are slow to follow.

## Recording tips
- Put "price/base" on screen every time a quote appears; most errors come from flipped conventions.
- Show the numerator/denominator rule for covered parity in colour, and point at it when doing the arbitrage example.
- Emphasise that Mundell-Fleming answers depend on capital mobility; draw a 2×2 grid of policy mixes.
