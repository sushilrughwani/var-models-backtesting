---
title: "Market Organization and Structure"
duration: 30
---

## Lecture outline
- 00:00 - Hook: "Your broker will happily lend you half the price of a stock. What could go wrong?"
- 02:00 - Functions of the financial system and the three kinds of efficiency
- 06:00 - Classifying markets: money vs capital, primary vs secondary, spot vs derivative
- 09:00 - Long, short and leveraged positions; mechanics of a short sale
- 13:00 - Leverage ratio and the leveraged return (whiteboard example 1)
- 19:00 - Maintenance margin and the margin call price (whiteboard example 2)
- 23:00 - Order instructions: execution, validity, clearing
- 27:00 - Quote-driven, order-driven and brokered markets
- 29:00 - Recap and exam traps

## Slides
### Slide 1: Why Markets Exist
- Move money across time (saving, borrowing)
- Move risk to those willing to bear it (hedging)
- Discover prices and allocate capital
### Slide 2: Three Kinds of Market Efficiency
- Operational: low trading costs
- Informational: prices reflect information fast
- Allocational: capital flows to the best projects
### Slide 3: Classifying Markets
- Money market (< 1 year) vs capital market
- Primary (new issues) vs secondary (resale)
- Spot vs derivative; public vs private
### Slide 4: Long vs Short
- Long: own the asset, gain if price rises
- Short: borrow, sell, buy back later
- Short seller pays dividends to the lender; losses uncapped
### Slide 5: Buying on Margin
- Initial margin = your equity share at purchase
- Leverage ratio = 1 / initial margin
- 50% margin means 2x leverage
### Slide 6: Leveraged Return Recipe
- Ending equity = proceeds - loan - interest + dividends - commissions
- Starting equity = margin + buying commission
- Return = ending / starting - 1
### Slide 7: Margin Calls
- Equity must stay above maintenance margin x position value
- Call price = P0 x (1 - IM) / (1 - MM)
- Below this price: deposit cash or be liquidated
### Slide 8: Order Instructions
- Execution: market vs limit
- Validity: day, GTC, IOC, stop
- Clearing: settlement details, short-sale flag
### Slide 9: Liquidity Makers and Takers
- Standing limit orders provide liquidity
- Market and marketable limit orders take liquidity
- Stop-loss sell: triggers a market order below the stop
### Slide 10: Market Structures
- Quote-driven: trade with dealers' bid and ask
- Order-driven: central order book, price then time priority
- Brokered: brokers find counterparties for unique assets
### Slide 11: Exam Traps
- Include interest and commissions in leveraged returns
- Leverage uses initial, not maintenance, margin
- Shorts pay dividends

## Whiteboard examples
**Example 1 - leveraged return.** Buy 500 shares at USD 40, 50% initial margin, 5% loan rate, USD 0.80 dividend, commission USD 0.02 per share each way, sell at USD 48 after one year.
- Position 20,000; equity 10,000; loan 10,000; buying commission 10 so initial investment 10,010.
- Ending equity = 24,000 - 10,000 - 500 + 400 - 10 = 13,890.
- Return = 13,890 / 10,010 - 1 = 38.76%. Unleveraged return = (48 + 0.80)/40 - 1 = 22.00%.

**Example 2 - margin call price.** Same trade, maintenance margin 25%.
- Loan per share = 40 x 0.5 = 20. Call when (P - 20)/P = 0.25, so 0.75P = 20 and P = 26.67.
- Formula check: 40 x 0.5 / 0.75 = USD 26.67.

**Example 3 - short sale.** Short 200 shares at USD 60, a USD 1.00 dividend is paid, cover at USD 51.
- Profit = 200 x (60 - 51 - 1.00) = USD 1,600.

## Questions to ask students
- With 40% initial margin, what is the leverage ratio? (2.5)
- If the stock falls 10% and you used 50% margin, roughly how much does your equity fall, ignoring interest? (About 20%)
- Why does a market order carry price risk? (It fills at whatever the best available price is when it arrives.)
- Who receives the dividend when a stock you sold short pays one? (The share lender; the short seller pays it.)
- Does a buy limit order below the best bid add or remove liquidity? (Adds liquidity.)

## Analogies
- Margin is like a house deposit: put down 20% and a 10% fall in house prices wipes out half your equity.
- A market order is ordering "whatever is on special" - fast, but you accept the price; a limit order is a reservation for a specific price that may never come.
- Short selling is borrowing a friend's concert ticket, selling it, and hoping to buy one back cheaper before the show.

## Recording tips
- Build the leveraged return as a T-account on screen: what you put in, what you take out. Students stop forgetting interest once they see it as a cash outflow.
- Derive the margin call formula once from the equity condition rather than just stating it; it makes the formula hard to forget.
- Spend extra time on stop orders - students routinely confuse stop and limit prices.
