---
title: "Commodity Forwards and Futures"
duration: 22
---

## Lecture outline
- 00:00 - Hook: why was oil for delivery next year once cheaper than oil today, when storage costs money?
- 02:00 - Investment versus consumption commodities
- 05:00 - Storage costs as negative income: cash and proportional versions
- 08:00 - Why arbitrage only works one way for consumption commodities
- 11:00 - Convenience yield and the general cost-of-carry formula
- 14:00 - Whiteboard: oil storage costs and implied convenience yield
- 18:00 - Contango, backwardation and gold lease rates
- 20:00 - Exam traps and recap

## Slides
### Slide 1: Commodity Forwards and Futures
- Extends the cost-of-carry model from the previous lesson
- New ingredients: storage costs and convenience yield
- Explains the shape of commodity futures curves

### Slide 2: Two Kinds of Commodity
- Investment commodities: gold, silver; held as stores of value
- Consumption commodities: oil, copper, grains; held as inputs
- Only investment commodity holders lend or sell freely for arbitrage

### Slide 3: Storage Costs
- Cash amounts: $F_0 = (S_0 + U)e^{rT}$
- Proportional: $F_0 = S_0e^{(r+u)T}$
- Storage behaves like negative income and raises the forward price

### Slide 4: One-Way Arbitrage
- Forward too high: buy, store, sell forward (works for any commodity)
- Forward too low: requires holders to sell inventory (only investors will)
- Consumption commodities: $F_0 \le (S_0 + U)e^{rT}$

### Slide 5: Convenience Yield
- Benefit of physically holding the commodity
- $F_0 = S_0e^{(r+u-y)T}$
- High when inventories are low and shortages feared

### Slide 6: Cost of Carry
- c = interest + storage - income
- $F_0 = S_0e^{(c-y)T}$
- Investment commodities: y = 0

### Slide 7: Contango and Backwardation
- Contango: futures above spot, curve slopes up
- Backwardation: futures below spot, convenience yield exceeds r + u
- Normal backwardation is a different idea: futures below expected spot

### Slide 8: Gold Lease Rates
- Gold can be lent out for a lease rate l
- $F_0 = S_0e^{(r-l)T}$, like a dividend yield
- Keeps gold forwards below pure interest carry

### Slide 9: Recap
- Classify the commodity first
- Storage up, convenience yield down
- Next: options markets

## Whiteboard examples
**Example 1: Oil with storage.** S = 80, storage 0.50 per quarter paid in arrears, r = 4% cc, T = 1, observed F = 81.50.
- U = 0.50(e^(-0.01) + e^(-0.02) + e^(-0.03) + e^(-0.04)) = 1.9507.
- Upper bound = 81.9507 x e^(0.04) = 85.30 (versus 83.26 with no storage).
- Market at 81.50 is below the bound; no arbitrage for a consumption good.
- y = 0.04 - ln(81.50 / 81.9507) = 4.55%.

**Example 2: Proportional storage and convenience yield.** S = 100, r = 5%, u = 2%, y = 3%, T = 0.5.
- F = 100 x e^((0.05 + 0.02 - 0.03) x 0.5) = 100 x e^(0.02) = 102.02.
- Ask: what happens if y rises to 8%? F = 100 x e^(-0.005) = 99.50, the market flips into backwardation.

## Questions to ask students
- Why does storage raise the forward price? (The buyer avoids paying it, so the seller who carries the asset must be compensated.)
- If oil futures sit below full carry, can a trader arbitrage it? (Not reliably: it needs inventory holders to sell, and they hold oil for production.)
- What does a high convenience yield signal? (Scarce inventory and fear of shortage.)
- Is gold more likely to be in contango or backwardation? (Contango, since its lease rate is usually below the interest rate.)
- What is the difference between backwardation and normal backwardation? (Futures versus spot, versus futures versus expected future spot.)

## Analogies
- Convenience yield is like keeping spare printer cartridges in the office: storing them costs space, but running out before a deadline would cost far more.
- A consumption commodity holder is like a restaurant with flour in its pantry: it will not sell its flour just because bakery futures look cheap.
- The cost-of-carry formula is a balance: interest and storage push the forward up, income and convenience push it down.

## Recording tips
- Draw two futures curves side by side, one upward (contango) and one downward (backwardation), and label what drives each.
- Stress the classification step; it decides whether an inequality or an equality applies.
- Show the convenience-yield algebra slowly; students often mis-sign the log term.
