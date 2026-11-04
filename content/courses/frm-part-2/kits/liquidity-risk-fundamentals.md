---
title: "Liquidity Risk Fundamentals"
duration: 22
---

## Lecture outline
- 00:00 - Hook: banks rarely fail from losses alone - they fail because they run out of cash
- 02:00 - Funding liquidity versus market liquidity
- 05:00 - Maturity transformation and why banks are never fully liquid
- 07:00 - Tightness, depth, resiliency and endogenous liquidity
- 10:00 - Loss spirals and margin spirals
- 13:00 - Liquidity-adjusted VaR: constant and stochastic spreads
- 16:00 - Whiteboard: LVaR example
- 20:00 - Exam traps and recap

## Slides
### Slide 1: Cash is king
- Solvent banks can still fail for lack of cash
- Liquidity problems arrive fast
- Liquidity risk is a tail risk
### Slide 2: Two meanings of liquidity
- Funding liquidity: meet obligations as they fall due
- Market liquidity: trade assets quickly without price impact
- Related but distinct
### Slide 3: Maturity transformation
- Long illiquid loans funded by short liquid deposits
- Valuable to the economy
- Relies on depositors not all leaving at once
### Slide 4: Market liquidity dimensions
- Tightness: bid-ask spread
- Depth: size tradable without moving price
- Resiliency: speed of price recovery
### Slide 5: Endogenous liquidity
- Cost depends on position size versus market volume
- Large blocks move the price
- Longer liquidation horizons needed
### Slide 6: Loss spiral
- Losses force sales to keep leverage stable
- Sales depress prices
- Lower prices cause more losses
### Slide 7: Margin spiral
- Volatility rises, lenders raise haircuts
- Forced deleveraging pushes prices down
- Higher volatility, higher haircuts again
### Slide 8: Liquidity-adjusted VaR
- LVaR = VaR + 0.5 x s x P
- Stressed: s replaced by mu + z x sigma
- Captures exogenous cost only
### Slide 9: Worked numbers
- P = 50m, VaR = 2.1m, spread 0.8%, sd 0.4%
- Constant: LVaR = 2.30m
- Stochastic at 99%: LVaR = 2.53m
### Slide 10: Exam traps
- Half the spread, not the full spread
- Spreads widen in stress
- Exogenous measures miss price impact

## Whiteboard examples
**Example 1 - LVaR.** P = 50, VaR = 2.1, mean spread 0.8%, sd 0.4%. Constant: 0.5 x 0.008 x 50 = 0.20; LVaR = 2.30. Stochastic: stressed spread = 0.008 + 2.33 x 0.004 = 1.732%; cost = 0.5 x 0.01732 x 50 = 0.433; LVaR = 2.533.

**Example 2 - From quotes.** Bid 49.80, ask 50.20: mid 50.00, relative spread 0.40/50 = 0.8%. Position USD 40m: cost = 0.5 x 0.008 x 40 = USD 0.16m.

**Example 3 - Margin spiral sketch.** Equity 10, haircut 5% supports assets of 200; haircut rises to 10%: assets 100, forced sales 100. Draw the arrow loop: haircut up, sales, prices down, volatility up, haircut up.

## Questions to ask students
- A bank has ample capital but cannot roll over its commercial paper. Which liquidity risk is this? (Funding liquidity risk)
- Why use half the spread in LVaR? (Positions are valued at mid; selling at the bid costs half the spread)
- What does depth measure? (The size that can be traded without moving the price much)
- Why is a constant spread LVaR optimistic? (Spreads widen in stress, exactly when you need to sell)
- What does an exogenous spread adjustment miss? (Price impact from the trader's own large position)

## Analogies
- Market liquidity as selling a house: a quick sale means a discount; a large estate takes longer and moves local prices.
- Funding liquidity as a household's overdraft: you can be rich in property and still bounce a cheque if the bank pulls the overdraft.
- Liquidity spirals as a crowded theatre fire exit: every individual rushing for the door makes it harder for everyone to get out.

## Recording tips
- Draw the two spirals as loops on the whiteboard; they stick better visually.
- Stress the half-spread logic with a mid, bid and ask number line.
- Flag that the next lessons build directly on funding liquidity measures.
