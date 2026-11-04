---
title: "Hedge Funds and Digital Assets"
---

## Learning goals
- Classify hedge fund strategies into equity, event-driven, relative value, opportunistic and multi-manager groups.
- Calculate the expected payoff of a merger arbitrage trade and identify its main risk.
- Explain how fund-of-funds structures layer fees and affect net returns.
- Describe distributed ledger technology, consensus mechanisms and the main types of digital assets.
- Compare the ways investors can gain exposure to digital assets and the risks involved.

## Explanation

### What is a hedge fund?
A hedge fund is a privately offered, lightly regulated pooled vehicle that can go long and short, use leverage and derivatives, and trade almost any market. Investors pay management and incentive fees, accept lockups and get limited transparency. The goal is usually an absolute return that depends more on manager skill than on market direction.

### Strategy groups
- **Equity hedge**: long/short equity (long undervalued, short overvalued stocks, with some net market exposure), market neutral (beta close to zero), short bias and sector-specific funds.
- **Event-driven**: profits from corporate events. **Merger arbitrage** buys the target and, in stock deals, shorts the acquirer to capture the deal spread. **Distressed** funds buy securities of firms in or near bankruptcy. **Activist** funds take stakes to push for change.
- **Relative value**: exploits pricing gaps between related securities, such as **convertible bond arbitrage** (long the convertible, short the stock) or **fixed income arbitrage**. Returns are small per trade, so leverage is common.
- **Opportunistic**: **global macro** bets on economy-wide trends in rates, currencies and commodities; **managed futures** (often trend-following) trade futures systematically.
- **Multi-manager**: **multi-strategy** funds allocate across internal teams; **funds of funds** allocate across external hedge funds.

Typical risks: leverage, liquidity mismatches, short squeezes, model risk, crowded trades and, for event-driven funds, deal failure.

### Merger arbitrage payoff
For a stock-for-stock deal with exchange ratio $k$, the arbitrageur buys one target share and shorts $k$ acquirer shares. If the deal closes, the target converges to $k \times P_{\text{acq}}$ and the hedged position earns the spread:

$$
\text{Spread} = k \times P_{\text{acq}} - P_{\text{target}}
$$

where $P_{\text{acq}}$ and $P_{\text{target}}$ are current share prices. If the deal breaks, the target usually falls sharply, which is the dominant risk.

### Fund-of-funds fee layering
A fund of funds offers diversification across managers, manager selection and due diligence, and access to closed funds. The cost is a **second layer of fees** on top of each underlying fund's fees, and **netting risk**: an investor can pay incentive fees to winning underlying managers even when the overall portfolio is flat.

### Digital assets
Digital assets are records of value created, stored and transferred on a **distributed ledger**, a database copied across many participants. A **blockchain** is a type of distributed ledger where transactions are grouped into blocks linked by cryptographic hashes, making past records very hard to alter.

- **Permissionless** networks let anyone join and validate (most cryptocurrencies); **permissioned** networks restrict who can participate (often used by banks).
- Consensus mechanisms: **proof of work** (miners spend computing power to add blocks, energy intensive) and **proof of stake** (validators lock up holdings as collateral, far less energy).

Types of digital assets:
- **Cryptocurrencies**: native coins of a network, used for payments or as a store of value.
- **Stablecoins**: tokens designed to hold a fixed value, usually backed by fiat currency reserves.
- **Tokens**: utility tokens grant access to a platform; security tokens represent ownership claims.
- **Non-fungible tokens (NFTs)**: unique tokens representing ownership of a specific item.
- **Decentralised finance (DeFi)**: lending and trading run by smart contracts without intermediaries.

Investors can hold digital assets directly through exchanges and wallets, or indirectly through futures, exchange-traded products, trusts, hedge funds, or shares of related companies. Risks include extreme volatility, lack of intrinsic cash flows, fraud and hacking, custody (loss of private keys), uncertain regulation and limited historical data.

## Worked example
Delta Corp offers 0.8 of its shares for each share of Target Ltd. Delta trades at USD 60.00 and Target at USD 45.00. An event-driven fund buys 1 Target share and shorts 0.8 Delta shares.

1. Implied offer value: $0.8 \times 60.00 = 48.00$.
2. Spread: $48.00 - 45.00 = 3.00$ per Target share.
3. Return if the deal closes: $3.00 / 45.00 = 6.67\%$ (hedged against moves in Delta's price).

Now suppose the fund estimates an 85% chance of completion. If the deal fails, Target falls to 38.00 and Delta rises to 62.00.

4. Loss if the deal fails: long Target $38 - 45 = -7.00$; short Delta $-0.8 \times (62 - 60) = -1.60$; total $-8.60$.
5. Expected profit: $0.85 \times 3.00 + 0.15 \times (-8.60) = 2.55 - 1.29 =$ **USD 1.26 per Target share**.

Small upside, large downside: merger arbitrage resembles selling insurance against deal failure.

## Common exam traps
- Calling market neutral and long/short equity the same; long/short usually keeps some net market exposure.
- Forgetting the short acquirer leg in a stock-for-stock deal; a cash deal needs no short.
- Assuming a fund of funds charges fees only once; it adds its own fees on top of the underlying funds' fees.
- Confusing proof of work (computing power, energy intensive) with proof of stake (staked holdings as collateral).
- Treating stablecoins as risk-free; their value depends on the quality of the reserves backing them.

## Key takeaways
- Hedge funds use leverage, shorting and derivatives to pursue absolute returns, with high fees and limited liquidity.
- The five strategy groups are equity hedge, event-driven, relative value, opportunistic and multi-manager.
- Merger arbitrage earns a small spread if the deal closes and suffers a large loss if it breaks.
- Funds of funds add diversification and due diligence, but also a second layer of fees.
- Digital assets run on distributed ledgers; they include cryptocurrencies, stablecoins, tokens and NFTs, and are highly volatile and lightly regulated.
