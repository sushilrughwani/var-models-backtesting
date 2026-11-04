---
title: "Exchanges and OTC Markets"
---

## Learning goals
- Compare exchange-traded and over-the-counter (OTC) derivatives markets in terms of standardisation, transparency and counterparty risk.
- Explain how netting under a master agreement reduces credit exposure and calculate the netting benefit.
- Describe collateral arrangements: variation margin, initial margin, thresholds, minimum transfer amounts and haircuts.
- Summarise the post-2008 reforms to OTC derivatives markets.

## Explanation

### Two ways to trade a derivative
On an **exchange**, contracts are standardised (size, maturity, delivery terms) and traders do not face each other directly. A clearing house stands between buyer and seller, positions are marked to market daily and margin is collected. Trading moved from open-outcry pits to electronic order books, and liquidity is supported by market makers who quote two-way prices and earn the bid-ask spread.

In the **OTC market**, two parties (typically a dealer bank and a client, or two dealers) agree a bilateral contract by phone or electronic platform. Terms can be tailored: any notional, any maturity, any underlying. The OTC market is far larger by notional than the exchange market, with interest rate swaps the biggest product. The price of flexibility is **counterparty credit risk**: if your counterparty defaults when the contract has positive value to you, you lose that value.

| Feature | Exchange | OTC |
|---|---|---|
| Contracts | Standardised | Customised |
| Counterparty | Clearing house | Bilateral (or a CCP if cleared) |
| Transparency | Public prices | Historically opaque |
| Margin | Daily, mandatory | Negotiated (now regulated) |

### Netting
Dealers document all trades with a counterparty under one **ISDA Master Agreement**. If the counterparty defaults, all transactions are treated as one contract: values are added, and only the net amount is owed. Without netting, a liquidator could "cherry-pick", demanding payment on contracts that favour the defaulter while leaving the surviving party as an unsecured creditor on the rest.

$$
\text{Exposure without netting} = \sum_i \max(V_i, 0), \qquad \text{Exposure with netting} = \max\left(\sum_i V_i, 0\right)
$$

where $V_i$ is the value of trade $i$ to the surviving party. Netting can never increase exposure, and it usually reduces it substantially.

### Collateral
A **credit support annex (CSA)** to the master agreement sets collateral rules:
- **Variation margin (VM)** tracks the current mark-to-market value of the portfolio, so the party out of the money posts collateral as values move.
- **Initial margin (IM)** is an extra buffer covering the potential change in value over the time needed to close out a defaulted portfolio (the margin period of risk).
- A **threshold** is an exposure level below which no collateral is required; a **minimum transfer amount** avoids small, frequent transfers.
- **Haircuts** reduce the credit given for non-cash collateral to allow for its own price volatility. A 4% haircut means a bond worth 100 counts as 96 of collateral.

Collateral converts credit risk into liquidity risk: a firm that must suddenly post large amounts of cash after a market move or a rating downgrade can face a funding crisis, which is what happened to a major insurer in 2008 through its credit default swap book.

### Other risk-reduction tools
Downgrade triggers allow a party to terminate or demand extra collateral if the counterparty's rating falls, though they can accelerate a crisis. Some dealers historically used highly rated special-purpose subsidiaries to trade derivatives.

### Post-crisis reforms
After 2008, G20 regulators required that standardised OTC derivatives be cleared through central counterparties, traded on electronic platforms (swap execution facilities in the US) where possible, and reported to trade repositories. Non-centrally cleared derivatives between financial firms must carry both VM and IM, with IM held by a third party so it is protected if the collecting firm fails. Central clearing is the subject of the next lesson.

## Worked example
Ridge Bank has three OTC trades with Delta Fund under one ISDA Master Agreement. Values to Ridge Bank: trade 1 = +10m, trade 2 = −6m, trade 3 = +3m (USD).

**Step 1: exposure without netting.** Sum of positive values = 10 + 3 = 13m. Ridge would still have to pay the 6m it owes on trade 2.

**Step 2: exposure with netting.** Net value = 10 − 6 + 3 = **7m**. Netting cuts exposure by 6m.

**Step 3: loss if Delta defaults with 40% recovery.** Without netting: 13 × 0.6 = 7.8m. With netting: 7 × 0.6 = 4.2m.

**Step 4: collateral.** The CSA has a threshold of 2m for Delta. Collateral required = 7 − 2 = 5m. Delta posts government bonds subject to a 4% haircut, so the market value needed is 5 / 0.96 = **USD 5.208m**.

**Step 5: residual exposure.** After collateral, Ridge's uncollateralised exposure equals the 2m threshold, plus any move in values before the next margin call.

## Common exam traps
- Adding negative trade values into the no-netting exposure; without netting, only positive values count.
- Dividing by (1 + haircut) instead of (1 − haircut) when computing the collateral required.
- Believing collateral removes all risk: thresholds, margin call lags and collateral value changes leave residual exposure, and liquidity risk rises.
- Confusing variation margin (current exposure) with initial margin (potential future exposure).
- Assuming all OTC trades are now centrally cleared; non-standard products remain bilateral.

## Key takeaways
- Exchanges offer standardisation, transparency and clearing; OTC markets offer customisation with counterparty risk.
- Netting under a master agreement replaces gross positive exposure with net exposure.
- VM covers current value; IM covers potential moves during close-out.
- Haircuts, thresholds and minimum transfer amounts shape how much collateral changes hands.
- Collateral reduces credit risk but creates liquidity risk.
- Reforms push standardised OTC trades into clearing and impose margin on uncleared trades.
