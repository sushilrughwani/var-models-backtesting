---
title: "Digital Assets and Decentralised Finance Risks"
---

## Learning goals
- Distinguish unbacked crypto assets, tokenised traditional assets and the main types of stablecoin.
- Explain why stablecoins are exposed to run risk and how reserve design affects that risk.
- Calculate the health factor and liquidation price of an overcollateralised DeFi loan.
- Calculate the price impact of a trade in a constant-product automated market maker.
- Identify the operational, counterparty, legal and contagion risks of digital assets and outline their prudential treatment.

## Explanation

### The asset landscape
**Digital assets** are claims recorded on a distributed ledger (blockchain). Risk depends heavily on what, if anything, stands behind the token.
- **Unbacked crypto assets** such as bitcoin have no issuer or cash-flow claim; value depends entirely on demand. Daily moves of 5-10% are common.
- **Tokenised traditional assets** represent bonds, fund units or deposits on a ledger; their risk is mostly that of the underlying plus technology risk.
- **Stablecoins** aim to hold a fixed value, usually one US dollar.

### Stablecoins and run risk
- **Fiat-backed:** reserves of cash, bank deposits and short-dated government bills. Stability depends on reserve quality, segregation and reliable redemption.
- **Crypto-collateralised:** backed by other crypto assets, overcollateralised (for example USD 150 of collateral per USD 100 issued) and liquidated automatically if collateral falls.
- **Algorithmic:** a stabilisation mechanism, usually minting and burning a companion token, with little or no external collateral. These are prone to **death spirals**: falling confidence prompts redemptions, more companion tokens are minted, their price collapses and confidence falls further. The 2022 collapse of a major algorithmic stablecoin wiped out tens of billions of dollars within days.

Stablecoins resemble money market funds or uninsured deposits: a fixed redemption value backed by assets that may be sold at a discount. If holders doubt the reserves, the first to redeem get par, so everyone rushes to redeem. That is a classic **run**.

### Decentralised finance (DeFi)
DeFi replaces intermediaries with **smart contracts**, code that runs on a blockchain.

**Lending protocols** accept crypto collateral and lend stablecoins. A position is safe while its health factor exceeds one:

$$
HF = \frac{C \times LT}{D}, \qquad P_{\text{liq}} = \frac{D}{Q \times LT}
$$

where $C$ is the collateral's market value, $LT$ the liquidation threshold (the maximum debt-to-collateral ratio before liquidation), $D$ the debt, $Q$ the number of collateral units and $P_{\text{liq}}$ the collateral price at which $HF = 1$. Below that price, liquidators repay debt and seize collateral at a discount. Because many positions share similar thresholds, forced sales can trigger **liquidation cascades**.

**Automated market makers (AMMs)** replace order books with pools. In a constant-product pool holding $x$ units of token X and $y$ units of token Y:

$$
x \times y = k
$$

A buyer of X must leave $xy = k$ unchanged, so the price moves against the trade, and large trades in thin pools suffer heavy slippage. Liquidity providers face **impermanent loss** when prices move.

**Oracles** feed external prices into contracts. Manipulating an oracle (for example with a flash loan that moves a thin pool) can trigger wrongful liquidations or drain a protocol. **Bridges** that move tokens between chains have been among the most frequently hacked components.

### Risk map
- **Market and liquidity:** extreme volatility, fragmented and shallow markets.
- **Operational and cyber:** smart-contract bugs, hacks, lost private keys, irreversible transactions.
- **Counterparty and custody:** exchanges that commingle client assets, as seen in the 2022 failure of a large exchange.
- **Legal and compliance:** unclear property rights in insolvency, sanctions and anti-money-laundering exposure.
- **Contagion:** links to banks through stablecoin reserves, custody and lending.

### Prudential treatment
The Basel framework sorts bank crypto exposures into groups. **Group 1a** (tokenised traditional assets) and **Group 1b** (stablecoins meeting strict stabilisation and redemption tests) are treated broadly like their underlying exposures, with add-ons for infrastructure risk. **Group 2** covers everything else; the riskiest subset receives a **1,250% risk weight**, so capital roughly equals exposure, and total Group 2 exposure is capped as a small share of Tier 1 capital.

## Worked example
**Part A - DeFi loan.** A trader deposits 10 ETH at USD 3,000 (collateral USD 30,000) and borrows USD 20,000 of stablecoins. The liquidation threshold is 80%.

**Step 1 - health factor.** $HF = 30{,}000 \times 0.80 / 20{,}000 = 1.20$.

**Step 2 - liquidation price.** $P_{\text{liq}} = 20{,}000 / (10 \times 0.80) = $ USD 2,500.

**Step 3 - buffer.** $1 - 2{,}500/3{,}000 = 16.7\%$. A fall of only **16.7%**, routine for ETH, triggers liquidation.

**Part B - AMM trade.** A pool holds 100 ETH and 300,000 USDC (price USD 3,000). A trader buys 10 ETH, ignoring fees.

**Step 4 - constant.** $k = 100 \times 300{,}000 = 30{,}000{,}000$.

**Step 5 - new USDC balance.** With 90 ETH left, $y = 30{,}000{,}000/90 = 333{,}333.33$, so the trader pays USD 33,333.33.

**Step 6 - price impact.** Average price $= 3{,}333.33$, which is **11.1% above** the pre-trade price; the pool's marginal price is now $333{,}333.33/90 = 3{,}703.70$.

## Common exam traps
- Treating all stablecoins as equally safe; algorithmic designs are the most fragile.
- Dividing debt by collateral units without the liquidation threshold when computing the liquidation price.
- Assuming AMM trades execute at the pre-trade price; slippage grows with trade size relative to the pool.
- Thinking decentralisation removes operational risk; it shifts it into code, keys, oracles and bridges.
- Assuming unbacked crypto exposures get ordinary risk weights; the riskiest group gets 1,250%.

## Key takeaways
- Risk depends on backing: unbacked tokens, tokenised assets and stablecoins behave very differently.
- Stablecoins are run-prone, much like uninsured deposits; reserve quality and redemption rights are key.
- DeFi loans liquidate when the health factor falls below one, which can trigger cascades.
- Constant-product AMMs impose slippage that rises with trade size.
- Smart-contract, oracle, bridge, custody and legal risks sit alongside market risk.
- Basel rules treat qualifying tokenised assets and stablecoins like their underlying but apply punitive capital to the riskiest crypto.
