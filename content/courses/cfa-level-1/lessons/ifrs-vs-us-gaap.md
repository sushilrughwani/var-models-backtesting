---
title: "IFRS and US GAAP: Key Differences for Analysts"
---

## Learning goals
- Identify the major IFRS and US GAAP differences in inventory, long-lived assets, impairment, leases, provisions and cash flow classification.
- Explain how each difference changes reported profit, assets, operating cash flow and key ratios.
- Adjust a US GAAP company's LIFO figures to FIFO and restate an IFRS company's operating cash flow for comparability.
- Recommend which adjustments an analyst should make before comparing companies across frameworks.

## Explanation

### Why this matters
Most of the differences between IFRS and US GAAP are about *choices* and *timing*, not about the economics. But a ratio comparison between a European and a US company can be badly distorted if you ignore them. This lesson collects the differences from the whole financial statement analysis module that most often move the numbers.

### Inventory
- **LIFO** is permitted under US GAAP and **prohibited** under IFRS. When prices rise, LIFO gives higher COGS, lower profit, lower inventory and lower taxes.
- **Write-down reversals:** IFRS allows a reversal of an inventory write-down (up to the original cost) if value recovers; US GAAP does not.

To compare a LIFO user with a FIFO user, use the **LIFO reserve** (FIFO inventory − LIFO inventory), disclosed in the notes:

$$
\text{Inv}_{\text{FIFO}} = \text{Inv}_{\text{LIFO}} + \text{LR}, \qquad \text{COGS}_{\text{FIFO}} = \text{COGS}_{\text{LIFO}} - \Delta \text{LR}
$$

where LR is the LIFO reserve and $\Delta \text{LR}$ its change during the year. The extra inventory also raises equity by $\text{LR} \times (1-t)$, with the rest going to a tax liability.

### Long-lived assets
- **Revaluation:** IFRS permits the revaluation model for property, plant and equipment, and a fair value model for investment property. US GAAP requires historical cost. Revaluation raises assets and equity and usually depresses ROA and asset turnover.
- **Development costs:** IFRS capitalises development costs once technical and commercial feasibility criteria are met; US GAAP generally expenses research and development (with exceptions such as certain software costs). Capitalisation raises current profit and moves the outflow from operating to investing cash flow.

### Impairment
- IFRS uses one step: impair if the carrying amount exceeds the **recoverable amount** (higher of fair value less costs to sell and value in use). Reversals are allowed for assets other than goodwill.
- US GAAP tests held-for-use assets first for recoverability using **undiscounted** cash flows, then measures the loss against fair value. Reversals are prohibited.

The result: IFRS impairments can occur earlier, and IFRS earnings can later benefit from reversals.

### Leases and provisions
- **Lessees:** IFRS has a single model (depreciation + interest). US GAAP keeps finance and operating leases, the latter with a single straight-line cost. IFRS reporters therefore show higher EBITDA and operating cash flow (see the long-term liabilities lesson).
- **Contingencies:** IFRS recognises a provision when an outflow is *more likely than not*; US GAAP's "probable" threshold is generally interpreted as higher. When a range of equally likely outcomes exists, IFRS uses the midpoint while US GAAP uses the low end of the range.

### Cash flow classification
| Item | IFRS | US GAAP |
|---|---|---|
| Interest paid | Operating or financing | Operating |
| Interest received | Operating or investing | Operating |
| Dividends received | Operating or investing | Operating |
| Dividends paid | Operating or financing | Financing |

An IFRS company that puts interest paid in financing will show a higher CFO than an otherwise identical US GAAP company.

## Worked example
You are comparing Alder plc (IFRS, FIFO) with Birch Inc. (US GAAP, LIFO). Tax rate 25%.

**Alder plc:** reported CFO 900, with interest paid of 60 classified as financing.
**Birch Inc.:** LIFO inventory 400; LIFO reserve 120 at the start of the year and 150 at the end; LIFO COGS 2,000.

**Step 1 - Put Alder's CFO on a US GAAP basis.** Move interest paid back into operating: 900 − 60 = **840**.

**Step 2 - Birch's FIFO inventory.** 400 + 150 = **550**.

**Step 3 - Birch's FIFO COGS.** Change in LIFO reserve = 150 − 120 = 30. FIFO COGS = 2,000 − 30 = **1,970**.

**Step 4 - Profit effect.** Pre-tax income rises by 30; after tax, net income rises by 30 × (1 − 0.25) = **22.5**.

**Step 5 - Balance sheet effect.** Equity rises by 150 × 0.75 = **112.5**, and a tax liability of 150 × 0.25 = **37.5** is added.

After these adjustments, Alder's and Birch's operating cash flow, gross margins, inventory turnover and equity can be compared on a like-for-like basis.

## Common exam traps
- Adding the *ending* LIFO reserve to COGS instead of subtracting the *change* in the reserve.
- Forgetting the tax effect when restating equity for the LIFO reserve.
- Believing US GAAP allows reversals of impairments or inventory write-downs; only IFRS does (never for goodwill).
- Assuming interest paid is always operating. Under IFRS it may be financing, which inflates CFO relative to US GAAP peers.
- Thinking IFRS forbids capitalising development costs; it requires capitalisation once the criteria are met.

## Key takeaways
- LIFO exists only under US GAAP; use the LIFO reserve to convert to FIFO for comparisons.
- IFRS allows PP&E revaluation, development cost capitalisation and reversals of impairments and inventory write-downs.
- IFRS uses a single lessee lease model, which raises EBITDA and CFO relative to US GAAP operating leases.
- IFRS offers flexibility in classifying interest and dividends in the cash flow statement; check the policy before comparing CFO.
- Before comparing companies across frameworks, adjust the items that drive the ratios you care about.
