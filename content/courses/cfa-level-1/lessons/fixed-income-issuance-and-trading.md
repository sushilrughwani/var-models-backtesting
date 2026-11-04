---
title: "Fixed-Income Issuance and Trading"
---

## Learning goals
- Distinguish primary from secondary bond markets and compare underwritten, best-efforts, auction and private placement issuance.
- Explain why most bonds trade over the counter and what that implies for liquidity and transparency.
- Describe how sovereign, non-sovereign government, and corporate issuers raise debt and the role of shelf registration.
- Explain the main short-term funding sources for banks and companies, including commercial paper and repurchase agreements.
- Calculate repo interest and the cash lent against collateral after a haircut.

## Explanation

### Classifying bond markets
Bond markets are classified by issuer type, credit quality (investment grade versus high yield), maturity (money versus capital market), currency and geography, and coupon type, so analysts can compare like with like.

### Primary markets: how bonds are born
In the **primary market**, issuers sell newly created bonds and receive the cash.
- **Underwritten offering** (firm commitment): an investment bank buys the whole issue and resells it, bearing the risk that it cannot sell at the planned price. The bank gauges demand first through **book-building**.
- **Best-efforts offering**: the bank acts only as a broker and sells what it can; the issuer bears the unsold risk. Common for smaller or riskier issuers.
- **Auction**: standard for sovereign debt. Bidders submit yields; in a common **single-price** design, all winning bidders pay the same price set by the highest accepted yield. Primary dealers are expected to bid in every auction.
- **Shelf registration**: a single disclosure document lets the issuer sell bonds in tranches over a period (often up to three years) whenever conditions are attractive. Usually reserved for well-known, frequent issuers.
- **Private placement**: sold directly to a small group of qualified institutions, with less disclosure, often customised terms and little or no secondary trading.

### Secondary markets: how bonds change hands
In the **secondary market**, investors trade existing bonds among themselves; the issuer receives nothing. Most bonds trade **over the counter** through dealers, because there are many distinct issues, each trading thinly. Dealers quote **bid** (price they pay) and **ask** (price they sell); the **bid-ask spread** is a key measure of liquidity. On-the-run government bonds have very tight spreads; small corporate issues can have wide ones.

### Sovereign and non-sovereign government debt
National governments issue in their own currency to fund deficits and set the benchmark curve. Short bills, medium notes and long bonds are issued on a regular calendar, and the most recently issued bond of each maturity is **on-the-run** (most liquid). Local governments issue **general obligation** bonds backed by taxing power and **revenue** bonds backed by a specific project such as a toll road.

### Corporate debt
Companies borrow through bank loans, syndicated loans (a group of banks shares one loan) and bonds. Investment-grade firms tap the bond market directly and may run **medium-term note** programmes, issuing small amounts across many maturities on demand. Firms match maturity to the assets financed and stagger refinancing.

### Short-term funding
**Companies** use bank credit lines, **commercial paper** (CP) and receivables financing. CP is short-term unsecured debt, usually under 270 days in the US market, issued at a discount by high-quality firms. Because a firm rolls CP over continuously, rating agencies expect it to hold a **backup line of credit** in case investors stop buying, the so-called rollover risk.

**Banks** fund themselves with retail deposits (sticky and cheap), wholesale funds such as interbank deposits and **certificates of deposit**, central bank funds, and **repurchase agreements**.

### Repurchase agreements
In a **repo**, one party sells a security and agrees to buy it back later at a slightly higher price. Economically it is a collateralised loan: the seller borrows cash, the buyer lends cash and holds the security as protection. The difference between repurchase and sale prices is the interest, set by the **repo rate**:

$$
\text{Repo interest} = \text{Cash lent} \times \text{Repo rate} \times \frac{\text{Days}}{360}
$$

The lender advances less than the collateral's market value. The gap is the **haircut** (or margin):

$$
\text{Cash lent} = \text{Collateral value} \times (1 - h)
$$

where $h$ is the haircut percentage. Repo rates and haircuts rise with riskier or less liquid collateral, longer repo terms and weaker counterparties. A **reverse repo** is the same trade seen from the cash lender's side.

## Worked example
A dealer needs funding for one month. It delivers government bonds with a market value of USD 20,000,000 to a money market fund. The haircut is 2% and the 30-day repo rate is 2.80% (actual/360 convention). The repo runs for 30 days.

**Step 1 - cash lent.**

$$
20{,}000{,}000 \times (1 - 0.02) = 19{,}600{,}000
$$

**Step 2 - repo interest.**

$$
19{,}600{,}000 \times 0.028 \times \frac{30}{360} = 45{,}733.33
$$

**Step 3 - repurchase price.** 19,600,000 + 45,733.33 = **USD 19,645,733.33**, which the dealer pays to get its bonds back after 30 days.

If the dealer defaults, the fund holds collateral worth 2% more than the loan.

## Common exam traps
- Applying the repo rate to the collateral value instead of the cash actually lent after the haircut.
- Using a 365-day year when the question specifies a 360-day money market convention.
- Mixing up best-efforts and underwritten offerings: in a firm commitment, the bank (not the issuer) bears the risk of unsold bonds.
- Assuming the issuer receives cash from secondary-market trades; only primary sales raise money.
- Forgetting that repo rates and haircuts rise with collateral risk, longer terms and weaker counterparty credit.

## Key takeaways
- Primary market: issuer raises cash via underwriting, best efforts, auction, shelf registration or private placement.
- Secondary market: mostly OTC dealer markets; bid-ask spread measures liquidity.
- Sovereigns auction regularly and set the benchmark curve; on-the-run issues are most liquid.
- Companies fund short-term with credit lines and commercial paper backed by liquidity lines.
- A repo is a collateralised loan: cash lent = collateral × (1 − haircut); interest = cash × rate × days/360.
