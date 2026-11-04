---
title: "Derivative Instrument and Market Features"
---

## Learning goals
- Define a derivative and identify the underlying asset or reference variable it depends on.
- Distinguish exchange-traded derivatives from over-the-counter (OTC) derivatives on standardisation, counterparty risk, transparency and flexibility.
- Explain how central clearing reduces counterparty risk in both markets.
- Describe the main benefits of derivatives (risk transfer, price discovery, lower transaction costs, operational efficiency) and the main risks (leverage, complexity, basis and counterparty risk).

## Explanation

### What a derivative is
A derivative is a contract between two parties whose value comes from something else: the **underlying**. That can be an asset (a share, a bond, oil, a currency), a rate (an interest rate or inflation index), or an event such as a company defaulting. A derivative does not create value from thin air; it re-arranges who bears the gains and losses on the underlying.

Every contract specifies the underlying, the size of the exposure (the **notional amount**), the settlement date(s), and the rule that turns the underlying's value into a payment. Settlement is **physical** (the asset is delivered) or **cash** (only the gain or loss is paid).

### Two places to trade: exchanges and OTC
**Exchange-traded derivatives** (for example, equity index futures or listed options) are standardised: the exchange fixes contract size, expiry dates and settlement rules. Interchangeable contracts concentrate liquidity and make positions easy to close, and public prices and volumes give transparency. Every trade is routed through a **central counterparty (CCP)**, a clearinghouse that becomes the buyer to every seller and the seller to every buyer. Traders post margin to the CCP, and gains and losses are settled daily.

**OTC derivatives** (for example, most interest rate swaps and currency forwards) are negotiated privately, usually with a dealer bank, and can be customised to the exact amount, date and underlying needed. The cost is less transparency, lower liquidity, and **counterparty credit risk**: the risk that the other side fails to pay.

### Central clearing in the OTC market
Since the global financial crisis, regulators have pushed standardised OTC contracts (such as plain-vanilla interest rate swaps) into central clearing. The trade is agreed bilaterally, then novated to a CCP that collects margin from both sides, keeping OTC flexibility while sharply cutting counterparty risk. Contracts too bespoke to clear are usually covered by collateral agreements.

### Why derivatives exist: the benefits
- **Risk transfer.** A wheat farmer fearing falling prices and a baker fearing rising prices can both lock in a price; risk moves to whoever is most able to bear it.
- **Price discovery.** Liquid, cheap futures markets often reflect new information first.
- **Lower transaction costs and capital needs.** Gaining exposure to a whole equity index through futures costs far less than buying hundreds of shares.
- **Operational advantages and efficiency.** Shorting and adjusting exposure are easy, and cheap trading lets arbitrageurs correct mispricings quickly.

### The risks
- **Leverage.** A small margin deposit controls a large notional exposure, so gains and losses are magnified relative to the cash committed.
- **Complexity and model risk.** Some contracts are hard to value or understand.
- **Basis risk.** A hedge may use an underlying or date that does not match the exposure exactly.
- **Counterparty and liquidity risk.** Mainly OTC, though cleared positions still need cash for margin calls.
- **Systemic risk.** Losses can spread across interconnected institutions.

Derivatives are **zero-sum** between counterparties before costs, but they are not mere gambling: the hedger gives up upside to remove downside, and the speculator is paid for absorbing that risk.

## Worked example
A portfolio manager wants exposure to an equity index for three months. She can buy index futures with a notional value of USD 500,000 by posting an initial margin of USD 25,000. Compare the outcome of a 2% rise in the index with a cash purchase, and choose the venue.

**Step 1: Gain on the futures position.** Notional × index change = 500,000 × 0.02 = USD 10,000.

**Step 2: Return on cash committed.** Futures: 10,000 / 25,000 = 40%. Buying the shares outright for USD 500,000 would earn 10,000 / 500,000 = 2%.

**Step 3: Leverage ratio.** 500,000 / 25,000 = 20 times. A 2% fall would therefore wipe out 40% of the margin, and a 5% fall would wipe out all of it.

**Step 4: Exchange or OTC?** A standard index over a common horizon suits the exchange-traded future: liquid, transparent and centrally cleared. A custom basket for an odd date would call for an OTC contract with a dealer, at the cost of more counterparty risk.

**Conclusion: a 2% index move produces a 40% return (or loss) on the margin posted, reflecting 20 times leverage.**

## Common exam traps
- Saying OTC markets have no counterparty risk management at all. Many standard OTC contracts are now centrally cleared or collateralised.
- Treating the CCP as taking market risk. Its positions offset; it manages credit risk with margin.
- Confusing standardisation (an exchange feature) with customisation (an OTC feature).
- Calling derivatives "value-creating" by themselves. They redistribute risk between counterparties; the benefits come from better risk allocation and lower costs.
- Forgetting that leverage magnifies losses as much as gains.

## Key takeaways
- A derivative's value depends on an underlying asset, rate or event; settlement can be physical or cash.
- Exchange-traded contracts are standardised, liquid, transparent and cleared through a CCP with daily margining.
- OTC contracts are customisable but less transparent and expose users to counterparty risk, reduced by central clearing and collateral.
- Benefits: risk transfer, price discovery, low transaction costs, easy shorting and market efficiency.
- Risks: leverage, complexity, basis risk, counterparty and liquidity risk, and potential systemic spillovers.
