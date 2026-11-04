---
title: "Credit Risk"
---

## Learning goals
- Define probability of default, loss given default, exposure at default and expected loss, and calculate expected loss.
- Distinguish default risk from spread risk, including downgrade risk and market liquidity risk.
- Explain how credit ratings work, including issuer versus issue ratings, notching and the limits of relying on ratings.
- Identify the macro and market factors that drive credit spreads.
- Estimate the price impact of a change in credit spread using spread duration and convexity.

## Explanation

### Two ways a lender loses money
Interest rate risk, covered in the last two lessons, affects every bond. Credit risk is specific to the borrower, and it comes in two forms:
1. **Default risk** - the borrower fails to pay interest or principal in full and on time.
2. **Spread risk** - the borrower keeps paying, but the market demands a wider spread, so the bond's price falls. Spread risk includes **credit migration (downgrade) risk** and **market liquidity risk**, which is the cost of trading a thinly traded bond, visible in wide bid-ask spreads.

Investment-grade investors usually lose money through spread risk long before any default.

### The building blocks of default loss
Three quantities describe default risk:
- **Probability of default (PD):** the chance that the issuer defaults over a given period, usually one year.
- **Exposure at default (EAD):** the amount owed at the moment of default.
- **Loss given default (LGD):** the amount you actually lose once the recovery is collected. With recovery rate $RR$:

$$
\text{LGD} = \text{EAD} \times (1 - RR)
\qquad
\text{Expected loss} = PD \times \text{LGD}
$$

Expected loss in percentage terms, $PD \times (1-RR)$, is roughly the **minimum credit spread** a risk-neutral investor would need just to break even on defaults. Actual spreads are wider, because investors also want compensation for uncertainty, downgrade risk and illiquidity.

Recovery depends on **priority of claims**. Secured debt is paid first from its collateral, then senior unsecured, then subordinated debt, and equity comes last. In practice bankruptcy settlements do not always follow strict priority, because senior creditors may concede value to speed things up.

### Credit ratings
Rating agencies summarise default risk with letter grades. Bonds rated BBB−/Baa3 or higher are **investment grade**; anything lower is **high yield** (also called speculative or "junk"). Two distinctions matter:
- **Issuer rating vs issue rating.** The issuer rating usually reflects senior unsecured debt. Individual issues are then **notched** up or down: secured debt may be rated above the issuer, while subordinated debt, or debt issued by a holding company whose cash sits in subsidiaries (**structural subordination**), is rated lower. Notching gaps are wider for high-yield issuers, where recovery matters more.
- **Ratings lag the market.** Spreads move every day, while ratings change infrequently. Agencies have made mistakes, and ratings cannot easily capture event risk such as litigation, fraud, natural disasters or leveraged buyouts.

Ratings are a starting point, not a substitute for analysis.

### What moves credit spreads
Credit spread = yield on the risky bond − yield on a comparable default-free benchmark. Spreads widen when:
- the **credit cycle** turns down and defaults are expected to rise;
- the economy weakens, profits fall and leverage rises;
- **market liquidity** dries up and dealers hold less inventory;
- **supply** is heavy, with lots of new issuance, or demand from investors falls.

Lower-quality spreads are far more volatile.

### Price impact of a spread change
Spread changes affect price in the same way yield changes do:

$$
\%\Delta PV \approx -(\text{SpreadDur} \times \Delta \text{Spread}) + \tfrac{1}{2} \times \text{SpreadCon} \times (\Delta\text{Spread})^2
$$

where SpreadDur and SpreadCon are the bond's sensitivities to its spread (for fixed-rate bonds, close to modified duration and convexity) and $\Delta\text{Spread}$ is in decimals. Longer-duration credit bonds therefore lose more when spreads widen.

## Worked example
An investor holds USD 1,000,000 face of a senior unsecured bond. The one-year PD is 2% and the expected recovery rate is 40%. The bond has a spread duration of 5.0 and spread convexity of 30.

**Step 1 - LGD.** LGD = 1,000,000 × (1 − 0.40) = USD 600,000.

**Step 2 - expected loss.** EL = 0.02 × 600,000 = **USD 12,000**, which is 1.20% of exposure per year.

**Step 3 - break-even spread.** As a rough guide, the bond needs a spread of at least about 1.20% (120 bp) just to cover expected default losses. If the market spread is 215 bp (for example, a 6.25% yield against a 4.10% government yield), the extra 95 bp is compensation for uncertainty and liquidity risk.

**Step 4 - spread widening.** Suppose the issuer is put on negative watch and its spread widens by 50 bp. %ΔPV ≈ −5.0 × 0.005 + ½ × 30 × 0.005² = −2.50% + 0.0375% = **−2.46%**, a mark-to-market loss of roughly USD 24,600 even though no payment was missed.

**Step 5 - tightening.** If the spread tightens by 25 bp instead: +1.25% + 0.0094% = +1.26%.

## Common exam traps
- Multiplying PD by the recovery rate instead of by (1 − recovery rate).
- Treating the credit spread as equal to expected loss. Spreads also price uncertainty, downgrade risk and liquidity.
- Assuming an issue's rating always equals the issuer's rating. Secured issues are notched up, and subordinated or structurally subordinated issues are notched down.
- Thinking ratings react quickly. Market spreads usually move before rating changes.
- Assuming strict priority always holds in bankruptcy. Negotiated settlements often deviate from it.

## Key takeaways
- Credit risk = default risk + spread risk (downgrade and liquidity).
- Expected loss = PD × LGD, and LGD = EAD × (1 − recovery rate).
- Recovery rates depend on seniority and collateral; higher priority means lower loss severity.
- The investment-grade cut-off is BBB−/Baa3; notching adjusts issue ratings for seniority and structure.
- Spreads widen with the credit cycle, weak economic conditions, poor liquidity and heavy supply.
- Spread changes hit price through spread duration: %ΔP ≈ −SpreadDur × ΔSpread.
