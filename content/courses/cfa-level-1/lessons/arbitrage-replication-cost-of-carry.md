---
title: "Arbitrage, Replication and the Cost of Carry"
---

## Learning goals
- Explain the no-arbitrage principle and the law of one price.
- Show how a forward contract can be replicated with the underlying asset and borrowing or lending.
- Calculate a no-arbitrage forward price that includes income, storage costs and convenience yield.
- Construct a cash-and-carry or reverse cash-and-carry arbitrage when a forward is mispriced.

## Explanation

### The no-arbitrage principle
An **arbitrage** is a set of trades that costs nothing (or less than nothing) today and produces a profit with no risk of loss. In well-functioning markets such free lunches cannot last: traders would pile in until prices adjust. The **law of one price** follows directly: two portfolios that produce identical future cash flows in every state of the world must cost the same today.

This simple idea is the engine of derivative pricing. We do not need to know investors' risk preferences or forecast the underlying. We only need to find a portfolio of things we can already price that **replicates** the derivative's payoff.

### Replicating a forward
Suppose you want to own a non-dividend-paying share at time $T$. You can do it two ways:

1. Enter a long forward at price $F_0$. At $T$ you pay $F_0$ and receive the share.
2. Borrow $S_0$ at the risk-free rate, buy the share today, and hold it. At $T$ you own the share and repay $S_0(1+r)^T$.

Both strategies cost nothing today and end with the share in hand, so the amounts paid at $T$ must be equal:

$$
F_0 = S_0(1+r)^T
$$

where $S_0$ is the spot price, $r$ is the annual risk-free rate (annual compounding) and $T$ is time to expiration in years. The forward price is simply the spot price **carried forward** at the financing rate.

### Cost of carry: benefits and costs
Holding the asset may produce benefits or impose costs, and these change the carry:

- **Income** ($I$): dividends, coupons or interest received while holding the asset *reduce* the forward price, because the forward buyer does not receive them.
- **Costs** ($C$): storage and insurance for physical commodities *increase* the forward price, because the forward buyer avoids paying them.
- **Convenience yield**: a non-cash benefit of physically holding a commodity (for example, keeping a factory running during a shortage). It acts like income and lowers the forward price.

The general discrete-time formula is:

$$
F_0 = \left[S_0 - PV(I) + PV(C)\right](1+r)^T
$$

where $PV(I)$ and $PV(C)$ are the present values at the risk-free rate of income and costs during the contract's life. With continuous compounding and benefits or costs expressed as continuous yields:

$$
F_0 = S_0\,e^{(r + c - i)T}
$$

where $c$ is the cost yield and $i$ is the income or convenience yield.

### Exploiting mispricing
If the market forward price $F^{mkt}$ is **above** the no-arbitrage price, the forward is too expensive. Perform a **cash-and-carry**: borrow, buy the asset, sell (go short) the forward. At expiration, deliver the asset at $F^{mkt}$ and repay the loan; the difference is riskless profit.

If $F^{mkt}$ is **below** the no-arbitrage price, perform a **reverse cash-and-carry**: short-sell the asset, lend the proceeds, go long the forward. At expiration, buy the asset through the forward to close the short.

In both cases, buy what is cheap and sell what is expensive. The profit at expiration equals $F^{mkt} - F_0$ (or $F_0 - F^{mkt}$).

### Why risk-free discounting is right
The replicating portfolio is riskless once the forward is in place: its payoff does not depend on where the asset ends up. A riskless position must earn the risk-free rate. That is why forward prices use $r$, not the asset's expected return.

## Worked example
A share trades at USD 100 and will pay a dividend of USD 2 in three months. The risk-free rate is 4% per year (annual compounding). A dealer quotes a six-month forward at USD 103. Find the no-arbitrage forward price and the arbitrage profit.

**Step 1: PV of the dividend.** $PV(I) = 2 / 1.04^{0.25} = 1.9805$.

**Step 2: No-arbitrage forward price.** $F_0 = (100 - 1.9805) \times 1.04^{0.5} = 98.0195 \times 1.0198 = 99.9607$.

**Step 3: Compare.** The dealer's 103 exceeds 99.96, so the forward is overpriced: do a cash-and-carry.

**Step 4: Execute.** Today: borrow 100, buy the share, short the forward at 103. In three months: receive the dividend of 2 and invest it to month six: $2 \times 1.04^{0.25} = 2.0197$. At month six: deliver the share for 103 and repay the loan $100 \times 1.04^{0.5} = 101.9804$.

**Step 5: Profit at expiration.** $103 + 2.0197 - 101.9804 = 3.0393$, which equals $103 - 99.9607$.

**Answer: the no-arbitrage forward price is USD 99.96 and the cash-and-carry earns a riskless USD 3.04 per share at expiration.**

## Common exam traps
- Adding income to the forward price. Income lowers it; storage costs raise it.
- Discounting at the asset's expected return instead of the risk-free rate.
- Going long the forward when it is overpriced. If the forward is too expensive, sell it.
- Forgetting to take the present value of income or costs before subtracting or adding them to $S_0$.
- Mixing compounding conventions: use $(1+r)^T$ with annual rates and $e^{rT}$ with continuous rates.

## Key takeaways
- Two portfolios with identical future payoffs must have the same price today (law of one price).
- A long forward is replicated by borrowing to buy the underlying, so $F_0 = S_0(1+r)^T$ with no carry.
- Income and convenience yield reduce the forward price; storage and insurance costs increase it.
- Overpriced forward: cash-and-carry. Underpriced forward: reverse cash-and-carry.
- Forward prices are driven by financing and carry, not by forecasts of the spot price.
