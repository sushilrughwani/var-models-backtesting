---
title: "Digital Assets and Decentralised Finance Risks"
duration: 20
---

## Lecture outline
- 00:00 - Hook: a "stable" coin lost almost all its value in a week in 2022. How can something designed to be stable collapse?
- 02:00 - The landscape: unbacked crypto, tokenised assets, stablecoins
- 05:00 - Stablecoin designs and run risk; Whiteboard 2
- 08:00 - DeFi lending: health factor, liquidation price, cascades; Whiteboard 1 Part A
- 12:00 - AMMs: constant product and slippage; Whiteboard 1 Part B
- 15:00 - Oracles, bridges, custody, legal risk and contagion
- 17:00 - Basel prudential treatment, traps and recap

## Slides
### Slide 1: Digital Assets and DeFi Risks
- What backs the token determines the risk
- Stablecoins, lending protocols, AMMs
- Prudential treatment for banks

### Slide 2: The Landscape
- Unbacked crypto: no issuer, demand-driven value
- Tokenised traditional assets: underlying plus technology risk
- Stablecoins: target a fixed value

### Slide 3: Stablecoin Designs
- Fiat-backed: reserve quality and redemption
- Crypto-collateralised: overcollateralised, auto-liquidated
- Algorithmic: mint/burn mechanism, death spiral risk

### Slide 4: Why Stablecoins Run
- Fixed redemption value, assets sold at a discount
- First movers get par, so everyone moves first
- Same logic as uninsured deposits and money funds

### Slide 5: DeFi Lending
- HF = collateral × LT / debt
- Liquidation price = debt / (units × LT)
- Shared thresholds can trigger liquidation cascades

### Slide 6: Automated Market Makers
- Pool rule: x × y = k
- Price moves against every trade
- Slippage rises with trade size; impermanent loss for providers

### Slide 7: Plumbing Risks
- Oracles: manipulable price feeds
- Bridges: frequent hacking targets
- Smart-contract bugs and lost keys are irreversible

### Slide 8: Counterparty, Legal and Contagion
- Exchanges commingling client assets
- Unclear insolvency rights; sanctions and AML exposure
- Links to banks via reserves, custody and lending

### Slide 9: Basel Treatment
- Group 1a: tokenised traditional assets
- Group 1b: qualifying stablecoins
- Group 2: riskiest subset at 1,250% risk weight, exposure capped

### Slide 10: Traps and Takeaways
- Not all stablecoins are equal
- Include the liquidation threshold
- AMM trades do not execute at the quoted price

## Whiteboard examples
**Example 1 - Part A: DeFi loan.** 10 ETH at USD 3,000, borrow USD 20,000, liquidation threshold 80%.
- HF = 30,000 × 0.8 / 20,000 = 1.20.
- Liquidation price = 20,000 / (10 × 0.8) = USD 2,500, a 16.7% fall.
- After a 10% fall to USD 2,700: HF = 27,000 × 0.8 / 20,000 = 1.08.

**Example 1 - Part B: AMM.** Pool of 100 ETH and 300,000 USDC; buy 10 ETH.
- k = 30,000,000; new USDC = 30,000,000 / 90 = 333,333.33.
- Cost = USD 33,333.33; average price 3,333.33 (11.1% above 3,000).
- New marginal price = 333,333.33 / 90 = 3,703.70.

**Example 2 - Stablecoin reserves under a run.** Reserves: 70% cash, 30% bonds that can only be sold at a 10% discount in a fire sale.
- Value per coin if everyone redeems = 0.70 × 1 + 0.30 × 0.90 = USD 0.97.
- Early redeemers get USD 1.00; late redeemers absorb the shortfall, so the incentive is to redeem first.

## Questions to ask students
- Which stablecoin design is most exposed to a death spiral? (Algorithmic.)
- A position's health factor is 1.05. Is it safe? (Technically yes, but a roughly 5% collateral fall triggers liquidation.)
- Why does a large AMM trade get a worse price than a small one? (The constant-product rule moves the price more as a bigger share of the pool is removed.)
- How can a flash loan harm a lending protocol? (By manipulating a thin pool used as a price oracle, triggering wrongful liquidations or underpriced borrowing.)
- What risk weight applies to the riskiest bank crypto exposures under Basel rules? (1,250%.)

## Analogies
- An algorithmic stablecoin is a bridge held up by people's belief that it will hold: once enough people doubt it, it falls.
- A DeFi liquidation threshold is a trapdoor: nothing happens until the price touches the line, then the floor drops instantly.
- An AMM is a seesaw with two weights: take some off one side and the balance point (price) shifts sharply.

## Recording tips
- Put the health factor and liquidation price formulas side by side; students forget the threshold in the denominator.
- Animate the AMM pool before and after the trade to make slippage visible.
- Keep crypto-market history brief and factual; focus on the risk mechanisms, which are what exams test.
