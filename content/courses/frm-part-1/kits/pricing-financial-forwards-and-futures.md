---
title: "Determination of Forward and Futures Prices"
duration: 28
---

## Lecture outline
- 00:00 - Hook: two ways to own a share in nine months, and why they must cost the same
- 03:00 - Investment assets, short selling and the no-arbitrage assumption
- 06:00 - No-income formula and the cash-and-carry argument
- 10:00 - Known cash income and known yield (stocks, bonds, indices)
- 14:00 - Currencies and interest rate parity
- 17:00 - Whiteboard: dividend-paying stock forward plus arbitrage at a mispriced quote
- 22:00 - Valuing an existing forward contract
- 25:00 - Futures versus forward prices; exam traps and recap

## Slides
### Slide 1: Determination of Forward and Futures Prices
- One idea drives every formula: cost of carry
- Builds on continuous compounding from the interest rates lesson
- Sets up commodities, swaps and option pricing later

### Slide 2: Two Routes to the Same Asset
- Route 1: borrow today, buy the asset, hold it
- Route 2: sign a forward today, pay at delivery
- Same asset, same date, so same cost: otherwise arbitrage

### Slide 3: Assumptions
- No transaction costs, same tax rate on all profits
- Borrow and lend at the risk-free rate
- Arbitrage opportunities are exploited immediately
- Investment asset that can be short sold

### Slide 4: Asset With No Income
- $F_0 = S_0 e^{rT}$
- r continuously compounded, T in years
- Forward too high: cash-and-carry; too low: reverse cash-and-carry

### Slide 5: Asset With Known Cash Income
- $F_0 = (S_0 - I)e^{rT}$
- I = present value of income received during the life of the forward
- Forward buyer does not get the dividends or coupons

### Slide 6: Asset With a Known Yield
- $F_0 = S_0 e^{(r-q)T}$
- q = continuous income yield, e.g. index dividend yield
- Higher yield, lower forward price

### Slide 7: Currencies
- $F_0 = S_0 e^{(r - r_f)T}$, S quoted as domestic per foreign
- Foreign currency earns r_f, like a yield
- Higher-rate currency trades at a forward discount

### Slide 8: Arbitrage Recipes
- Cash-and-carry: borrow, buy asset, short forward
- Reverse: short asset, lend proceeds, long forward
- Profit = gap between quoted and fair forward, received at T

### Slide 9: Valuing an Existing Forward
- Long: $f = (F_0 - K)e^{-rT}$
- Short: $-f$
- Value at initiation is zero because K = F_0

### Slide 10: Futures vs Forwards
- Equal when interest rates are known
- Positive correlation between rates and asset: futures slightly higher
- Negative correlation: futures slightly lower

### Slide 11: Recap
- Spot plus carry minus income
- Know all four formulas and the currency quote convention
- Next: commodities, storage costs and convenience yield

## Whiteboard examples
**Example 1: Dividend stock.** S = 60, dividends of 0.80 at 3 and 6 months, r = 5% cc, T = 0.75.
- PVs: 0.80e^(-0.0125) = 0.7901, 0.80e^(-0.025) = 0.7802, so I = 1.5703.
- F = (60 - 1.5703)e^(0.0375) = 58.4297 x 1.03821 = 60.66.
- Quote of 62.00 is too high: borrow 0.7901 (3m), 0.7802 (6m), 58.4297 (9m), buy the share, short forward. Dividends repay the short loans; at 9 months receive 62.00 and repay 60.66. Profit 1.34.

**Example 2: Valuing an old contract.** Same stock, long forward with K = 58 and 9 months left. f = (60.66 - 58)e^(-0.0375) = 2.56.

**Example 3: Currency.** S = 1.0850 USD/EUR, r_USD = 4.5%, r_EUR = 2.5%, T = 0.5. F = 1.0850e^(0.01) = 1.0959. Euro at a forward premium because it has the lower interest rate.

## Questions to ask students
- Why do we subtract the PV of dividends rather than the dividends? (The dividends arrive before delivery; the comparison is in today's money before growing at r.)
- If the quoted forward is below fair value, what do you do with the asset? (Short-sell it and invest the proceeds, and go long the forward.)
- What is the value of a forward on the day it is signed? (Zero, because K equals the current forward price.)
- Which currency trades at a forward premium? (The one with the lower interest rate.)
- When are futures prices above forward prices? (When the asset price is positively correlated with interest rates.)

## Analogies
- Cost of carry is like the price of a car bought on finance versus a car ordered for later: the later price must include the interest you saved, minus any rent you could have earned by owning the car now.
- A forward buyer is a tenant-in-waiting: they do not collect the rent (dividends) until they own the asset, so they pay less.
- Interest rate parity is a see-saw: the higher-yielding currency must lose value in the forward market so that nobody earns a free interest rate spread.

## Recording tips
- Show the arbitrage as a three-column table (today, dividend dates, delivery) so students see each cash flow net to zero except the profit.
- Pause on the quote convention for currencies; most errors come from inverting the rate.
- Keep the futures-versus-forward discussion intuitive; it is tested conceptually, not numerically.
