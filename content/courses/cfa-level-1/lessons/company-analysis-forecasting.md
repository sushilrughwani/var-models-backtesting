---
title: "Company Analysis: Forecasting"
---

## Learning goals
- Distinguish top-down, bottom-up and hybrid approaches to forecasting revenue.
- Forecast operating costs by separating fixed and variable components.
- Forecast working capital using days ratios and capital expenditure using maintenance and growth components.
- Explain how to choose an explicit forecast horizon and when to use scenarios.

## Explanation

### From history to forecast
The previous lesson explained what drove a company's past results. Forecasting turns those drivers into assumptions about the future. A good model is driven by a small number of explicit, defensible assumptions, each linked to the business model, rather than by mechanically extending past growth rates.

### Forecasting revenue
- **Top-down:** start from the market. Forecast the size of the market (often from GDP or industry growth) and multiply by the company's expected market share:
$$
\text{Revenue}_{t+1} = \text{Market size}_t (1 + g_{\text{market}}) \times \text{Share}_{t+1}
$$
- **Bottom-up:** build from company-level drivers such as stores × sales per store, subscribers × ARPU, or capacity × utilisation × price.
- **Hybrid:** combine both, using bottom-up detail cross-checked against a top-down sanity check on implied market share.

Growth-relative-to-GDP is a quick top-down approach: a firm expected to grow 2 percentage points faster than nominal GDP, for example.

### Forecasting costs
Split costs by behaviour. **Variable costs** (materials, sales commissions) scale with revenue and are forecast as a percentage of sales. **Fixed costs** (rent, head office) change in steps and are forecast in currency amounts. The mix determines operating leverage: higher fixed costs mean margins expand faster in good years and shrink faster in bad ones. Check gross margin assumptions against input-price trends and competitive pressure; check operating expense ratios against peers and management guidance.

### Forecasting working capital
Working capital items scale with activity, so forecast them using days ratios:

$$
\text{AR} = \text{Revenue} \times \frac{\text{DSO}}{365}, \quad
\text{Inventory} = \text{COGS} \times \frac{\text{DIO}}{365}, \quad
\text{AP} = \text{COGS} \times \frac{\text{DPO}}{365}
$$

where DSO, DIO and DPO are days of sales outstanding, days of inventory on hand and days of payables. Net working capital (here AR + inventory − AP) grows with sales, and the **increase** is a cash outflow.

### Forecasting capital spending
Split capex into **maintenance capex** (replacing worn-out assets, often approximated by depreciation) and **growth capex** (new capacity), often modelled as a capital-intensity ratio times the increase in revenue:

$$
\text{Capex} \approx \text{Depreciation} + k \times \Delta\text{Revenue}
$$

where $k$ is the investment needed per unit of extra revenue.

### Horizon and scenarios
Choose an explicit forecast horizon long enough to reach a "steady state" in which growth, margins and returns have normalised, so a terminal value can take over. Horizons are typically longer for young, fast-growing firms or firms in the middle of a turnaround, acquisition or business-cycle swing; mature firms may need only a few years. Because forecasts are uncertain, analysts build base, bull and bear scenarios and test sensitivity to the key drivers. Forecasts are also prone to behavioural traps such as anchoring on management guidance and overconfidence.

## Worked example
Market size this year is USD 5,000 million and grows 6%. The company's share rises from 12% to 13%. Cost of goods sold is 58% of revenue; SG&A is USD 90 million fixed plus 8% of revenue. DSO = 45, DIO = 60, DPO = 40 (inventory and payables on COGS). Depreciation is USD 30 million; growth capex is 0.25 per unit of extra revenue.

1. This year's revenue $= 5{,}000 \times 0.12 = 600$. Next year's market $= 5{,}000 \times 1.06 = 5{,}300$.
2. Revenue forecast $= 5{,}300 \times 0.13 = 689.0$ (growth 14.83%).
3. COGS $= 0.58 \times 689 = 399.62$. SG&A $= 90 + 0.08 \times 689 = 145.12$.
4. EBIT $= 689 - 399.62 - 145.12 = 144.26$; EBIT margin $= 20.94\%$.
5. AR $= 689 \times 45/365 = 84.95$. Inventory $= 399.62 \times 60/365 = 65.69$. AP $= 399.62 \times 40/365 = 43.79$.
6. Net working capital $= 84.95 + 65.69 - 43.79 = 106.84$. On this year's revenue (COGS = 348) the same days give 93.04, so the **increase in NWC is 13.80**.
7. Capex $= 30 + 0.25 \times (689 - 600) = 30 + 22.25 =$ **52.25**.

The model shows that growing revenue by 89 requires about 13.80 of extra working capital and 22.25 of growth capex, cash that will not be available to shareholders.

## Common exam traps
- Extrapolating past growth without asking whether market growth or share gains can continue.
- Forecasting all costs as a fixed percentage of sales, which assumes zero operating leverage.
- Applying DIO and DPO to revenue instead of COGS.
- Treating the level of working capital, rather than its change, as the cash flow.
- Ignoring growth capex; depreciation alone only maintains existing capacity.

## Key takeaways
- Revenue forecasts can be top-down (market × share), bottom-up (company drivers) or a hybrid.
- Separate fixed and variable costs to capture operating leverage.
- Days ratios translate revenue and COGS forecasts into working capital; the increase in NWC uses cash.
- Capex = maintenance (≈ depreciation) + growth (capital intensity × revenue increase).
- Forecast until the business reaches a steady state, and test scenarios around key drivers.
