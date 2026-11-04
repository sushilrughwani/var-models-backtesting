---
title: "Foreign Exchange Risk and Corporate Bonds"
---

## Learning goals
- Distinguish transaction, translation and economic foreign exchange exposure.
- Calculate a firm's net currency exposure and the outcome of hedging it with a forward contract.
- Describe the main features of corporate bonds: indenture, trustee, security, covenants, call, put, sinking fund and conversion provisions.
- Explain credit ratings, default rates and recovery rates, and calculate the credit spread implied by default probability and recovery.

## Explanation

### Three kinds of FX exposure
- **Transaction exposure**: known future cash flows in a foreign currency, such as a receivable for EUR 5 million in six months. This is the easiest to measure and hedge.
- **Translation (accounting) exposure**: the effect of exchange rates on consolidated financial statements when foreign subsidiaries' assets and liabilities are converted into the reporting currency. It moves reported equity, not cash.
- **Economic exposure**: the effect of exchange rates on a firm's future competitiveness and cash flows. A domestic manufacturer with no foreign sales can still suffer if a stronger home currency makes imported rivals cheaper.

### Managing FX risk
Firms first **net** exposures: receivables and payables in the same currency and on similar dates offset each other, so only the net amount needs hedging. The remainder can be hedged with forwards (locking in the forward rate from the cost-of-carry lesson), futures, options (protection with upside retained, for a premium) or currency swaps for long-dated flows. **Operational hedges**, such as producing in the countries where you sell, address economic exposure that financial contracts cannot easily reach. Hedging does not make a firm better off on average; it reduces the variability of cash flows.

### Corporate bonds: the contract
A bond's terms are set out in its **indenture**, enforced on behalf of bondholders by a **trustee**. **Covenants** restrict the issuer: *affirmative* covenants require actions (pay interest, maintain insurance, provide accounts), *negative* covenants prohibit actions (excess borrowing, asset sales, large dividends).

By security and seniority:
- **Mortgage bonds** are secured by real property.
- **Collateral trust bonds** are secured by financial assets such as shares of subsidiaries.
- **Equipment trust certificates** are secured by specific equipment such as aircraft or rail cars.
- **Debentures** are unsecured; **subordinated debentures** rank below other debt.

### Embedded provisions
- **Call provision**: the issuer can redeem early, usually after a protection period, at a call price. It benefits the issuer when rates fall, so investors demand a higher yield.
- **Put provision**: the investor can sell back to the issuer, which lowers the yield.
- **Sinking fund**: the issuer retires part of the issue on a schedule, reducing credit risk at maturity.
- **Convertible**: the holder can exchange the bond for shares, which lowers the coupon.

### Ratings, default and recovery
Agencies rank issuers from AAA down. Bonds rated BBB−/Baa3 or above are **investment grade**; below that they are **high yield**. A bond downgraded from investment grade to high yield is a **fallen angel**. Default rates rise sharply as ratings fall, and **event risk** (such as a leveraged buyout) can cause sudden downgrades. The **recovery rate** $R$ is the fraction of face value recovered after default; it depends heavily on seniority and security.

Investors need a spread over the risk-free yield to compensate for expected default losses. Ignoring risk premiums,
$$
s \approx \lambda\,(1 - R)
$$
where $s$ is the annual credit spread, $\lambda$ is the annual default probability (hazard rate) and $1 - R$ is the loss given default. Observed spreads usually exceed this, because investors also demand compensation for liquidity and risk aversion.

## Worked example
**Part 1: Net exposure and hedge.** A US company will receive EUR 5 million and pay EUR 2 million in six months.
1. Net exposure: long EUR 3 million.
2. The 6-month forward rate is 1.0959 USD per EUR (as computed in the forward pricing lesson). Selling EUR 3 million forward locks in $3 \times 1.0959 = $ USD 3.2877 million.
3. If spot in six months is 1.0400, the unhedged amount would be $3 \times 1.04 = $ USD 3.12 million.
4. The hedge gains the company **about USD 0.168 million** relative to staying unhedged. Had the euro strengthened, the hedge would have given up the upside; that is the trade-off.

**Part 2: Implied default probability.** A BB-rated bond trades at a spread of 2.4% over Treasuries. Expected recovery is 40%.
1. Loss given default: $1 - 0.40 = 0.60$.
2. $\lambda \approx s/(1 - R) = 0.024/0.60 = $ **4.0% per year**.
This is an upper estimate of real-world default probability, since part of the spread compensates for liquidity and risk premiums.

## Common exam traps
- Hedging gross receivables and payables separately instead of netting first.
- Confusing translation exposure (accounting values) with transaction exposure (cash flows).
- Assuming a call provision lowers a bond's yield; it raises it because the option belongs to the issuer.
- Using $\lambda \times R$ instead of $\lambda \times (1 - R)$ in the spread formula.
- Treating debentures as secured bonds; they are unsecured.

## Key takeaways
- FX exposure comes in three forms: transaction (cash flows), translation (accounts) and economic (competitiveness).
- Net exposures first, then hedge the remainder with forwards, options or swaps; operational hedges tackle economic risk.
- The indenture, trustee and covenants protect bondholders; security and seniority drive recovery.
- Call provisions raise yields, put and conversion provisions lower them, sinking funds reduce credit risk.
- Credit spread is roughly default probability times loss given default, plus risk and liquidity premiums.
