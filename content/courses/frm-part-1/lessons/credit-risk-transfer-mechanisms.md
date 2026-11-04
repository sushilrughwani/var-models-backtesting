---
title: "Credit Risk Transfer Mechanisms"
---

## Learning goals
- Explain why banks transfer credit risk and the main tools they use.
- Describe how a credit default swap works and calculate premium and default payments.
- Explain securitisation and the tranche structure of a CDO, and allocate pool losses to tranches.
- Evaluate how the originate-to-distribute model contributed to the 2007-2009 crisis.

## Explanation

### Why transfer credit risk?
In the previous lessons we saw that "transfer" is one of the four responses to risk. For banks, credit risk is the largest exposure. Transferring part of it lets a bank free up capital to lend again, reduce concentration to a single borrower or sector, and earn fee income from originating loans rather than only from holding them. Traditional tools include loan sales, guarantees and collateral. Modern tools are credit derivatives and securitisation.

### Credit default swaps
A **credit default swap (CDS)** is insurance-like protection on a reference entity. The protection buyer pays a regular premium (the CDS spread, quoted in basis points per year on the notional). If a **credit event** occurs (failure to pay, bankruptcy, sometimes restructuring), the protection seller pays the loss:

$$
\text{Default payment} = N \times (1 - R)
$$

where $N$ is the notional and $R$ is the recovery rate on the reference obligation. The periodic premium is

$$
\text{Premium per period} = N \times s \times \frac{1}{m}
$$

with $s$ the annual spread and $m$ the number of payments per year.

Unlike a loan sale, a CDS leaves the loan on the bank's books and the borrower relationship intact; only the credit risk moves. The bank does pick up **counterparty risk** on the protection seller, a lesson the market learned painfully when one large insurer sold enormous amounts of protection without holding enough capital or collateral.

Related instruments include **total return swaps** (one party passes all the returns of an asset, including price changes, in exchange for a floating rate) and **credit-linked notes** (funded versions where the investor's principal is reduced if a credit event occurs).

### Securitisation
In **securitisation**, a bank sells a pool of loans (mortgages, auto loans, credit-card receivables) to a **special purpose vehicle (SPV)**. The SPV funds the purchase by issuing securities backed by the pool's cash flows. The bank removes the loans from its balance sheet and receives cash it can lend again.

### Tranching and CDOs
A **collateralised debt obligation (CDO)** slices the pool's credit risk into **tranches** with different seniority. Losses hit the most junior tranche first:

- **Equity tranche**: absorbs the first losses, earns the highest spread.
- **Mezzanine tranche**: hit only after equity is wiped out.
- **Senior tranche**: hit last, often rated AAA.

A tranche with attachment point $A$ and detachment point $D$ (as percentages of the pool) loses

$$
\text{Tranche loss} = \min\big(\max(L - A, 0),\; D - A\big)
$$

where $L$ is the pool loss. Tranching manufactures highly rated paper from lower-quality loans, which is valuable but fragile: senior tranche safety depends heavily on the assumed **default correlation**. When defaults become highly correlated, as in a national housing downturn, losses can cut through all the junior tranches at once. A **CDO-squared** repackages mezzanine tranches of other CDOs, compounding this sensitivity.

### Role in the 2007-2009 crisis
Securitisation created an **originate-to-distribute** model. Lenders that sold loans quickly had weaker incentives to screen borrowers (a moral hazard problem). Investors relied on credit ratings rather than their own analysis, and ratings underestimated correlation. Banks kept large exposures through off-balance-sheet vehicles and retained super-senior tranches, so the risk had not really left the system. When house prices fell, losses, opacity and funding runs reinforced each other. Post-crisis reforms responded with **risk retention** rules (originators keep a slice, often around 5%), more disclosure, and central clearing for standardised CDS.

## Worked example
**Part A - CDS.** A bank buys five-year protection on USD 10 million notional at a spread of 150 bp, paid quarterly. Recovery is expected to be 40%.

1. Annual premium: $10{,}000{,}000 \times 0.015 = 150{,}000$.
2. Quarterly premium: $150{,}000 / 4 = 37{,}500$.
3. If the reference entity defaults: payment $= 10{,}000{,}000 \times (1 - 0.40) =$ **USD 6 million**.

**Part B - CDO tranches.** A USD 100 million loan pool is split into equity (0-5%), mezzanine (5-15%) and senior (15-100%) tranches. Pool losses are 8%, or USD 8 million.

1. Equity (0 to 5m): loses $\min(8 - 0, 5) = 5$m, a 100% loss.
2. Mezzanine (5m to 15m): loses $\min(8 - 5, 10) = 3$m, which is $3/10 =$ **30% of the tranche**.
3. Senior (15m to 100m): loses $\max(8 - 15, 0) = 0$.

An 8% pool loss wipes out equity, damages mezzanine by 30% and leaves the senior tranche untouched.

## Common exam traps
- Paying the full notional on a CDS default. The payment is notional times one minus recovery.
- Applying the annual spread to each quarterly payment without dividing by four.
- Expressing tranche loss as a share of the pool instead of as a share of the tranche's own size.
- Believing securitisation always removes risk from the banking system; retained tranches and off-balance-sheet vehicles kept much of it inside banks.
- Assuming higher default correlation hurts every tranche equally. It tends to help the equity tranche and hurt senior tranches.

## Key takeaways
- Banks transfer credit risk to free capital, cut concentrations and earn fees.
- A CDS moves credit risk without moving the loan; the seller pays $N(1-R)$ on default and the buyer takes on counterparty risk.
- Securitisation sells loans to an SPV; tranching allocates losses from junior to senior.
- Senior tranche safety rests on correlation assumptions that failed in 2007-2009.
- Originate-to-distribute weakened screening incentives; risk retention, disclosure and clearing were the main responses.
