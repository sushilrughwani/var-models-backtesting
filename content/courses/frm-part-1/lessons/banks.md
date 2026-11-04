---
title: "Banks"
---

## Learning goals
- Describe the main bank business lines: commercial banking, investment banking and trading.
- Identify the key risks a bank faces and explain why capital is the buffer against unexpected loss.
- Calculate net interest income, net interest margin and return on equity from a simplified bank balance sheet.
- Explain deposit insurance, moral hazard and the originate-to-distribute model.
- Distinguish firm-commitment and best-efforts underwriting and identify conflicts of interest inside a bank.

## Explanation

### What a bank actually does
A bank is a maturity and liquidity transformer. It borrows short (demand deposits, wholesale funding) and lends long (mortgages, corporate loans). The bank earns the spread but risks depositors leaving before the loans repay.

**Commercial banking** covers retail banking (households, small firms) and wholesale banking (large corporates, often with larger and thinner-margin loans). **Investment banking** helps firms raise capital (underwriting debt and equity), advises on mergers and acquisitions, and restructures balance sheets. **Trading** (securities and derivatives desks) makes markets and takes positions.

### How a bank earns money
The core profit engine is net interest income:

$$
\text{NII} = \text{Interest income} - \text{Interest expense}, \qquad \text{NIM} = \frac{\text{NII}}{\text{Assets (or earning assets)}}
$$

On top of NII come non-interest income (fees, commissions, trading gains) and deductions for non-interest expense (staff, IT, premises) and **loan-loss provisions** (expected credit losses set aside).

$$
\text{ROE} = \frac{\text{Net income}}{\text{Equity}}
$$

Because equity is a small slice of assets, small changes in asset returns produce large changes in ROE. That is leverage working both ways.

### Risks and capital
- **Credit risk**: borrowers or counterparties fail to pay.
- **Market risk**: trading-book positions lose value as prices move.
- **Liquidity risk**: funding dries up or assets cannot be sold without large discounts.
- **Operational risk**: losses from failed processes, people, systems or external events.

Expected losses are a cost of doing business and are priced into loans and provisions. **Capital** (mainly equity, plus some subordinated debt) absorbs *unexpected* losses. Regulators set minimum capital in proportion to risk-weighted assets, and banks hold **economic capital** based on their own estimate of the loss they could suffer over one year at a high confidence level.

The **banking book** holds loans held to maturity, typically at amortised cost less provisions. The **trading book** holds assets for trading and is marked to market daily.

### Deposit insurance and moral hazard
Governments insure deposits up to a limit to prevent bank runs. The downside is **moral hazard**: insured depositors stop monitoring their bank, so a bank can take more risk without paying higher deposit rates. Risk-based insurance premiums and capital requirements counter this.

### Originate-to-distribute
Instead of holding loans (originate-to-hold), banks may originate loans and sell them into securitisations. This frees capital and spreads risk, but it weakens the originator's incentive to screen borrowers. Before 2007, lax US mortgage underwriting was partly a consequence of this model.

### Investment banking: underwriting
In a **firm commitment** the bank buys the whole issue at an agreed price and resells it, bearing the risk that it cannot sell at a higher price. In a **best efforts** deal the bank sells what it can for a fee and bears no price risk. IPOs may also be run as **Dutch auctions**, where investors bid and the issue is priced at the highest price that clears all the shares.

### Conflicts of interest
A bank that lends, advises, underwrites, manages client money and researches stocks has obvious conflicts: it could push unsold securities into client portfolios, or share confidential lending information with traders. Banks use internal information barriers (often called Chinese walls) and compliance rules to separate these activities.

## Worked example
Harbour Bank has assets of USD 100bn: loans 70bn yielding 6%, securities 20bn yielding 3%, cash 10bn earning nothing. Funding: deposits 75bn at 1.5%, wholesale debt 15bn at 4%, and the remaining 10bn is split into 2bn of subordinated debt and 8bn of common equity. Non-interest income is 1.0bn, non-interest expense 2.2bn, loan-loss provisions 0.6bn, tax rate 25%. Ignore interest on the subordinated debt for simplicity.

**Step 1: interest income.** 70 × 0.06 + 20 × 0.03 = 4.2 + 0.6 = 4.8bn.

**Step 2: interest expense.** 75 × 0.015 + 15 × 0.04 = 1.125 + 0.6 = 1.725bn.

**Step 3: NII and NIM.** NII = 4.8 − 1.725 = 3.075bn. NIM on total assets = 3.075 / 100 = 3.075%.

**Step 4: pre-tax income.** 3.075 + 1.0 − 2.2 − 0.6 = 1.275bn.

**Step 5: net income and ROE.** 1.275 × 0.75 = 0.956bn. ROE = 0.956 / 8 = **11.95%**, while return on assets is only 0.96%.

**Step 6: stress.** Suppose unexpected loan losses hit 5% of the loan book: 0.05 × 70 = 3.5bn. Equity falls from 8.0 to **4.5bn**, a 44% drop, from a loss equal to 3.5% of assets. Leverage of 12.5× turns a modest asset loss into a severe capital hit.

## Common exam traps
- Confusing expected loss (covered by provisions and pricing) with unexpected loss (covered by capital).
- Thinking deposit insurance removes risk: it shifts monitoring incentives and creates moral hazard.
- Mixing up firm commitment (bank bears price risk) and best efforts (bank bears none).
- Forgetting that trading-book assets are marked to market while banking-book loans are not.
- Computing ROE with total assets in the denominator instead of equity.

## Key takeaways
- Banks earn a spread by transforming short, liquid liabilities into long, illiquid assets.
- NII and NIM measure the core engine; ROE is magnified by leverage.
- Capital exists to absorb unexpected losses; provisions cover expected ones.
- Deposit insurance prevents runs but creates moral hazard.
- Originate-to-distribute frees capital but can erode lending standards.
- Combining lending, advice, underwriting and asset management creates conflicts of interest that need information barriers.
