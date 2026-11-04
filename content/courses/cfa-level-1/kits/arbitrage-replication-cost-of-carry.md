---
title: "Arbitrage, Replication and the Cost of Carry"
duration: 26
---

## Lecture outline
- 00:00 - Hook: two shops sell the same phone for different prices on the same street. What happens next?
- 02:00 - Arbitrage defined; law of one price; why we never need risk preferences.
- 05:00 - Replication: long forward versus borrow-and-buy; derive $F_0 = S_0(1+r)^T$.
- 09:00 - Cost of carry: income, storage costs, convenience yield; general formula.
- 13:00 - Continuous-compounding version.
- 15:00 - Cash-and-carry and reverse cash-and-carry rules.
- 18:00 - Whiteboard: dividend-paying share with a mispriced forward.
- 23:00 - Second example: gold with storage costs; recap.

## Slides
### Slide 1: What Is Arbitrage?
- Zero cost today, riskless profit later
- Cannot persist in liquid markets
- Law of one price: same payoff, same price
### Slide 2: Replicating a Long Forward
- Strategy 1: long forward at $F_0$
- Strategy 2: borrow $S_0$, buy asset, repay $S_0(1+r)^T$
- Same outcome, so $F_0 = S_0(1+r)^T$
### Slide 3: Why the Risk-Free Rate?
- Replicating portfolio plus forward is riskless
- Riskless positions earn $r$
- No need to forecast the asset's return
### Slide 4: Carry Benefits and Costs
- Income (dividends, coupons) lowers $F_0$
- Storage and insurance raise $F_0$
- Convenience yield acts like income
### Slide 5: General Forward Price Formula
- $F_0 = [S_0 - PV(I) + PV(C)](1+r)^T$
- Continuous: $F_0 = S_0 e^{(r + c - i)T}$
- Discount income and costs at $r$
### Slide 6: Cash-and-Carry
- Use when market forward is too high
- Borrow, buy asset, short forward
- Profit at $T$ = $F^{mkt} - F_0$
### Slide 7: Reverse Cash-and-Carry
- Use when market forward is too low
- Short asset, lend proceeds, long forward
- Profit at $T$ = $F_0 - F^{mkt}$
### Slide 8: Worked Example Summary
- $S_0 = 100$, dividend 2 in 3 months, $r = 4\%$, $T = 0.5$
- $F_0 = 99.96$; market 103 is too high
- Cash-and-carry profit USD 3.04 at expiry
### Slide 9: Key Takeaways
- Price derivatives by replication
- Benefits lower, costs raise the forward price
- Buy cheap, sell expensive

## Whiteboard examples
1. **Dividend-paying share.** $S_0 = 100$, dividend 2 in three months, $r = 4\%$, $T = 0.5$, market forward 103. $PV(I) = 2/1.04^{0.25} = 1.9805$. $F_0 = (100 - 1.9805)(1.04^{0.5}) = 99.9607$. Overpriced, so: borrow 100, buy share, short forward. Dividend reinvested to $T$: $2 \times 1.04^{0.25} = 2.0197$. Loan repayment: $100 \times 1.04^{0.5} = 101.9804$. Profit = $103 + 2.0197 - 101.9804 = 3.0393$.
2. **Gold with storage.** $S_0 = 1{,}800$, PV of storage = 30, $r = 5\%$, $T = 1$. $F_0 = 1{,}830 \times 1.05 = 1{,}921.50$. If a dealer quotes 1,900, the forward is cheap: short gold (lend it from inventory), invest the proceeds and saved storage, go long the forward; profit at $T$ = 21.50.
3. **Continuous version.** $S_0 = 100$, $r = 4\%$, dividend yield 1.5%, $T = 0.5$: $F_0 = 100e^{(0.04 - 0.015)(0.5)} = 101.26$.

## Questions to ask students
- If storage costs rise, what happens to the forward price? (It rises.)
- A forward is quoted below its no-arbitrage price. Which strategy? (Reverse cash-and-carry: short asset, lend, long forward.)
- Why don't we use the stock's expected return to price a forward? (The hedged position is riskless, so it earns the risk-free rate.)
- What is a convenience yield? (The non-cash benefit of physically holding a commodity; it lowers the forward price.)
- Non-dividend share at 60, $r = 3\%$, one year: forward price? (61.80.)

## Analogies
- The forward price is the spot price "carried" on a trolley to the future: the trolley charges interest and storage, but you collect any dividends that fall off along the way.
- Arbitrage is like finding the same concert ticket listed at two prices: buy the cheap one, sell the dear one, pocket the gap before others notice.
- Convenience yield is the value of having milk in your fridge at 2 a.m. rather than a promise of milk tomorrow.

## Recording tips
- Show the two replication strategies side by side in a timeline (today vs expiry) to make the "same payoff, same price" logic visual.
- Students often reverse the arbitrage direction; drill "overpriced forward: sell it" with a quick quiz.
- Use a calculator on screen for $1.04^{0.25}$ and $1.04^{0.5}$ so viewers see the fractional exponents.
