---
title: "Capex and Depreciation Schedule"
---

## Learning goals
- Forecast capital expenditure using revenue-linked or explicit project assumptions.
- Build a depreciation waterfall that separates existing assets from new capex vintages.
- Apply the half-year convention and explain why it is used.
- Roll forward net PP&E and link the schedule to all three statements.

## Explanation

### Why a separate schedule?
Capital expenditure (capex) is cash spent on long-lived assets such as machines and buildings. It does not hit the income statement when spent; instead it is capitalised on the balance sheet as property, plant and equipment (PP&E) and expensed gradually through depreciation. Because the timing of cash (capex) and expense (depreciation) differs, a dedicated schedule keeps them consistent. It feeds D&A to the income statement (which we left below EBITDA in the costs lesson), capex to the investing section of the cash flow statement and net PP&E to the balance sheet.

### Forecasting capex
Common approaches:

- **Percentage of revenue**: anchored on the historical ratio. Simple, but can understate lumpy investment.
- **Maintenance plus growth**: maintenance capex roughly equal to depreciation keeps the asset base intact; growth capex funds extra capacity, sometimes linked to the increase in revenue.
- **Explicit project plan**: management guidance for specific plants or programmes.

A useful sanity check: a growing company should have capex above depreciation; capex persistently below depreciation implies a shrinking asset base.

### The depreciation waterfall
Depreciation comes from two sources:

1. **Existing assets**: the opening net PP&E depreciated over its remaining useful life (or a disclosed schedule).
2. **New capex**: each year's capex (each "vintage") depreciated over its own useful life, starting in the year it is spent.

For straight-line depreciation with useful life $L$:

$$
D_{\text{vintage}} = \frac{\text{Capex}}{L} \text{ per full year}
$$

Under the **half-year convention**, assets bought during the year are assumed to be in service for half of it on average, so first-year depreciation is $\frac{\text{Capex}}{2L}$.

The waterfall is a triangle: one row per vintage, one column per year. Total depreciation is the column sum. In Excel, with the vintage year in column C, the capex amount in column D, the life in column E and the forecast years across row 3, a waterfall cell can be written `=IF(F$3<$C10,0,IF(F$3=$C10,$D10/$E10/2,$D10/$E10))`, copied across and down. In a long model, add a cap so a vintage stops depreciating once it is fully written off.

### PP&E roll-forward

$$
\text{PP\&E}_{t} = \text{PP\&E}_{t-1} + \text{Capex}_t - D_t
$$

where $D_t$ is total depreciation in year $t$ (and disposals would also be deducted if any).

## Worked example
Northwind (USD m). Opening net PP&E at the end of FY2025 is 200.0. Existing assets depreciate at 20.0 per year. Planned capex is 44.0, 47.0 and 50.0 in FY2026E to FY2028E, with a 10-year useful life and the half-year convention.

**Step 1: annual charge per vintage.** 44.0 / 10 = 4.40; 47.0 / 10 = 4.70; 50.0 / 10 = 5.00.

**Step 2: waterfall.**

| Depreciation | FY2026E | FY2027E | FY2028E |
|---|---|---|---|
| Existing assets | 20.00 | 20.00 | 20.00 |
| FY2026 capex | 2.20 | 4.40 | 4.40 |
| FY2027 capex | | 2.35 | 4.70 |
| FY2028 capex | | | 2.50 |
| **Total** | **22.20** | **26.75** | **31.60** |

**Step 3: PP&E roll-forward.**
- FY2026E: 200.0 + 44.0 − 22.20 = 221.80
- FY2027E: 221.80 + 47.0 − 26.75 = 242.05
- FY2028E: 242.05 + 50.0 − 31.60 = **260.45**

**Step 4: sanity checks.** Capex exceeds depreciation every year, consistent with a growing business. FY2026E capex is 44.0 / 545.9 = 8.1% of revenue.

**Step 5: link.** FY2026E D&A of 22.20 reduces EBITDA of 118.45 to EBIT of 96.25. Capex of 44.0 is an investing outflow. Net PP&E of 221.80 goes to the balance sheet.

## Common exam traps
- Taking a full year of depreciation on new capex when the model uses the half-year convention (or vice versa).
- Forgetting to depreciate earlier vintages in later years, so D&A is understated.
- Deducting capex on the income statement; it belongs in investing cash flows.
- Rolling PP&E forward without deducting depreciation, which inflates assets and breaks the balance sheet.
- Letting vintages keep depreciating after they are fully written off.

## Key takeaways
- Capex is capitalised; depreciation spreads its cost over the useful life.
- Separate existing-asset depreciation from each new capex vintage.
- The half-year convention gives half a year's charge in the year of spend.
- PP&E closing = opening + capex − depreciation.
- Northwind's FY2026E D&A is 22.20 and EBIT is 96.25 (USD m).
