---
title: "Introduction to Financial Statement Modeling"
---

## Learning goals
- Build a revenue forecast using growth-rate and driver-based approaches.
- Forecast cost of goods sold, operating expenses and operating margins, separating fixed from variable costs.
- Forecast working capital balances from days ratios and calculate the change in net working capital.
- Estimate capital expenditures and combine the pieces into a simple free cash flow forecast.

## Explanation

### What a model is for
A financial statement model turns your view of a business into numbers: next year's revenue, margins, investment needs and cash flow. It feeds valuation (covered in equity lessons) and credit analysis. The ratios from the previous lesson are now used in reverse: instead of measuring the past, you assume them for the future.

### Revenue: the engine of the model
Almost every line in the model is linked to revenue, so this is where most effort belongs. Common approaches:
- **Growth relative to GDP or the industry:** for example, the market grows 4% and the company gains share, so revenue grows 6%.
- **Market share × market size.**
- **Drivers:** volume × price, stores × sales per store, subscribers × average revenue per user.

A **top-down** forecast starts from the economy or market; a **bottom-up** forecast starts from company-specific units. Good analysts do both and reconcile them.

$$
\text{Revenue}_{t+1} = \text{Revenue}_t \times (1+g)
$$

where $g$ is the forecast growth rate.

### Costs and operating leverage
COGS is usually forecast through the **gross margin**, adjusted for input prices, pricing power and mix. Operating expenses are better split into **fixed** and **variable** parts:

$$
\text{SG\&A}_{t+1} = \text{Fixed} + v \times \text{Revenue}_{t+1}
$$

where $v$ is the variable cost per unit of revenue. Fixed costs create **operating leverage**: when revenue grows, operating profit grows faster and margins expand; when revenue falls, margins compress. Economies of scale and competitive pressure should be thought through explicitly, not left to a flat percentage.

Depreciation is linked to the asset base and capex plans; interest to the debt schedule; taxes to the effective rate, which should be reconciled with the statutory rate and any permanent differences (see the income taxes lesson).

### Working capital from days ratios
Balance sheet items tied to operations are forecast with activity ratios:

$$
\text{AR} = \text{Revenue} \times \frac{\text{DSO}}{365}, \quad \text{Inventory} = \text{COGS} \times \frac{\text{DOH}}{365}, \quad \text{AP} = \text{COGS} \times \frac{\text{DPO}}{365}
$$

Net working capital (NWC) = AR + inventory − AP. A growing company with stable days ratios needs more NWC each year, and that **increase** is a use of cash.

### Capital expenditures
Split capex into **maintenance capex** (replacing worn-out assets, often approximated by depreciation, adjusted for inflation) and **growth capex** (expanding capacity, often linked to the expected increase in revenue). A growing firm normally spends more than its depreciation.

### Pulling it together
A simple free cash flow to the firm (FCFF) forecast:

$$
\text{FCFF} = \text{EBIT}(1-t) + \text{D\&A} - \text{Capex} - \Delta\text{NWC}
$$

where $t$ is the tax rate and D&A is depreciation and amortisation. Always run **scenarios** (base, bull, bear) and sensitivity checks on the key drivers, because forecasts are uncertain and small changes in growth or margin compound.

## Worked example
Base year (Year 0): revenue 2,000; COGS 1,200 (60% of revenue). Assumptions for Year 1: revenue growth 8%; COGS stays at 60% of revenue; SG&A = 150 fixed + 8% of revenue; depreciation 100; tax rate 25%; DSO 45, DOH 60, DPO 40 (unchanged); capex = depreciation + 10% of the revenue increase.

**Step 1 - Revenue.** 2,000 × 1.08 = 2,160.

**Step 2 - Gross profit.** COGS = 0.60 × 2,160 = 1,296; gross profit = 864.

**Step 3 - Operating costs.** SG&A = 150 + 0.08 × 2,160 = 322.8. EBIT = 864 − 322.8 − 100 = 441.2 (EBIT margin 20.4%).

**Step 4 - After-tax operating profit.** 441.2 × (1 − 0.25) = 330.9.

**Step 5 - Working capital.**
- Year 0: AR = 2,000 × 45/365 = 246.58; inventory = 1,200 × 60/365 = 197.26; AP = 1,200 × 40/365 = 131.51; NWC = 312.33.
- Year 1: AR = 266.30; inventory = 213.04; AP = 142.03; NWC = 337.32.
- ΔNWC = 337.32 − 312.33 = 24.99.

**Step 6 - Capex.** 100 + 0.10 × (2,160 − 2,000) = 116.

**Step 7 - FCFF.** 330.9 + 100 − 116 − 24.99 = **289.91**.

Notice the operating leverage: revenue grew 8%, but because 150 of SG&A is fixed, EBIT grew faster than revenue.

## Common exam traps
- Forecasting inventory and payables off revenue when the days ratios are defined using COGS.
- Subtracting the *level* of working capital instead of the *change* in working capital.
- Assuming every cost is a fixed percentage of revenue, which ignores operating leverage.
- Setting capex equal to depreciation for a company that is expected to grow.
- Treating a single-point forecast as certain; scenario and sensitivity analysis are essential.

## Key takeaways
- Revenue drives almost every other line, so it deserves the most analysis; combine top-down and bottom-up views.
- Gross margin and a fixed/variable split for operating costs capture pricing power and operating leverage.
- Working capital comes from days ratios; the increase in NWC is a cash outflow for a growing firm.
- Capex = maintenance (≈ depreciation) + growth (linked to revenue increase).
- FCFF = EBIT(1 − t) + D&A − capex − ΔNWC ties the forecast together for valuation.
