---
title: "Revenue Forecasting Methods"
---

## Learning goals
- Distinguish top-down, bottom-up and driver-based revenue forecasts.
- Build a volume times price revenue forecast in Excel.
- Decompose revenue growth into volume and price effects.
- Cross-check a bottom-up forecast against a top-down market view.

## Explanation

### Why revenue deserves the most care
Revenue sits at the top of the model, and almost every other line depends on it: variable costs, working capital, capex and ultimately cash and valuation. A one-point error in revenue growth flows through every schedule. The historical analysis from the last lesson told us Northwind grew at about 10% a year. The question now is whether that will continue, and why.

### Top-down forecasting
Start from the size of the market and work down to the company:

$$
\text{Revenue} = \text{Market size} \times \text{Market share}
$$

Top-down is useful when good industry data exists, for new businesses with little history, and as a sanity check. Its weakness is that market share is hard to justify without understanding the company's capacity, products and customers.

### Bottom-up forecasting
Build revenue from the company's own operating units: products, customers, stores, contracts or plants. A retailer might use stores × sales per store; a software firm, customers × revenue per customer. Bottom-up forecasts are more granular and easier to defend, but they can drift away from what the market can absorb.

### Driver-based forecasting
The most common practical approach links revenue to a small number of measurable drivers. For a manufacturer such as Northwind, the natural drivers are units sold and average selling price (ASP):

$$
\text{Revenue}_t = Q_t \times P_t, \qquad Q_t = Q_{t-1}(1+g_Q), \qquad P_t = P_{t-1}(1+g_P)
$$

where $Q$ is volume (units), $P$ is ASP, $g_Q$ is volume growth and $g_P$ is price growth. Total revenue growth is:

$$
1 + g_{Rev} = (1+g_Q)(1+g_P)
$$

so growth rates multiply rather than add. In Excel, with units on row 20, ASP on row 21 and their growth inputs on rows 17 and 18, the formulas are `=D20*(1+E17)` for units, `=D21*(1+E18)` for price and `=E20*E21` for revenue.

Separating volume from price makes the forecast discussable: management can debate whether 6% volume growth is achievable given plant capacity, or whether 3% price increases will stick with customers.

### Choosing and combining methods
Use the method that matches the available evidence, then cross-check with another. If a bottom-up forecast implies a jump in market share that no competitor would allow, revisit it. Keep growth converging towards a sustainable long-run rate (often near nominal GDP growth) by the end of the forecast.

## Worked example
Northwind sold 2.00 million units in FY2025 at an ASP of USD 250, giving revenue of 2.00 × 250 = 500.0 (USD m). The forecast inputs are:

| | FY2026E | FY2027E | FY2028E |
|---|---|---|---|
| Volume growth | 6.0% | 5.0% | 4.0% |
| Price growth | 3.0% | 2.5% | 2.0% |

**Step 1: units.** 2.00 × 1.06 = 2.120; × 1.05 = 2.226; × 1.04 = 2.315 million.

**Step 2: ASP.** 250 × 1.03 = 257.50; × 1.025 = 263.94; × 1.02 = 269.22.

**Step 3: revenue.** FY2026E = 2.120 × 257.50 = **545.9**. FY2027E = 2.226 × 263.94 = 587.5. FY2028E = 2.315 × 269.22 = 623.2.

**Step 4: growth decomposition.** FY2026E growth = 1.06 × 1.03 − 1 = 9.18%, not 9.0%. Later years slow to 7.63% and 6.08%. Three-year CAGR = (623.2 / 500.0)^(1/3) − 1 = 7.62%.

**Step 5: top-down cross-check.** Northwind's addressable market was 5,000 in FY2025, so its share was 500 / 5,000 = 10.0%. If the market grows 5% and Northwind gains half a point of share, FY2026E revenue = 5,000 × 1.05 × 10.5% = 551.25. The bottom-up figure of 545.9 is 5.35 (about 1.0%) below it, so the two views are consistent. A gap of 10% or more would signal that one set of assumptions needs rethinking.

## Common exam traps
- Adding volume and price growth (6% + 3% = 9%) instead of compounding them (9.18%).
- Projecting historical growth forever without asking what drives it or whether capacity allows it.
- Forgetting to check implied market share, which can exceed what is plausible.
- Hard-coding revenue figures for forecast years instead of building them from drivers.
- Using nominal price growth in one segment and real growth in another.

## Key takeaways
- Top-down uses market size times share; bottom-up builds from operating units.
- Driver-based forecasts (volume × price) are transparent and debatable.
- Growth rates multiply: (1 + volume growth)(1 + price growth) − 1.
- Always cross-check one method against another.
- Northwind's base-case FY2026E revenue is 545.9 (USD m), used throughout the rest of the course.
