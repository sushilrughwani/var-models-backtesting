---
title: "Forecasting Operating Costs and Margins"
---

## Learning goals
- Separate operating costs into fixed and variable components.
- Calculate contribution margin and the degree of operating leverage.
- Forecast COGS, SG&A and EBITDA from cost drivers rather than a single margin.
- Explain why margins expand or contract as revenue changes.

## Explanation

### Why not just forecast a margin?
The simplest approach is to hold EBITDA margin at its historical level: if Northwind earned 20% in FY2025, assume 20% forever. That is quick, but it hides how the business actually behaves. Some costs (materials, freight, sales commissions) move with volume; others (factory rent, salaried staff, IT systems) barely move at all. When revenue grows, fixed costs are spread over more sales and margins expand. When revenue falls, the reverse happens, often painfully. A cost forecast that respects this split gives far more realistic downside cases.

### Fixed and variable costs

$$
\text{EBITDA} = \text{Revenue} - v \times \text{Revenue} - F
$$

where $v$ is the variable cost ratio (variable costs as a share of revenue) and $F$ is fixed costs. The **contribution margin** is $1 - v$: the share of each extra unit of revenue that is left over to cover fixed costs and profit.

Fixed costs are not frozen for ever. They usually grow with inflation, and they step up when capacity is added (a new shift, a new warehouse). In a model, forecast variable costs as a percentage of revenue and fixed costs as a prior-year amount grown at an inflation input.

### Operating leverage
The degree of operating leverage (DOL) measures how sensitive profit is to revenue:

$$
DOL = \frac{\text{Contribution}}{\text{EBITDA}} = \frac{(1-v)\times \text{Revenue}}{\text{EBITDA}} \approx \frac{\%\Delta \text{EBITDA}}{\%\Delta \text{Revenue}}
$$

A DOL of 2.5 means a 10% rise in revenue lifts EBITDA by about 25%, if fixed costs stay flat. High fixed costs mean high operating leverage: great in a boom, dangerous in a downturn.

### Practical cost drivers
- **COGS**: materials as a percentage of revenue (or per unit, if you have a volume driver), plus fixed plant overhead grown at inflation.
- **SG&A**: commissions and freight as a percentage of revenue; salaries, rent and IT as fixed amounts with inflation and headcount drivers.
- **R&D**: often a percentage of revenue set by management policy.

In Excel, with revenue on row 8, the variable ratio input in C30, fixed costs on row 31 and the inflation input in C32, the formulas are `=E8*$C$30` for variable costs, `=D31*(1+$C$32)` for fixed costs and `=E8-E33` for EBITDA, where row 33 sums variable and fixed costs.

## Worked example
Northwind's FY2025 costs (USD m), based on the cleaned historicals:

- COGS 290.0 = variable 230.0 (46% of revenue) + fixed 60.0.
- SG&A 110.0 = variable 20.0 (4% of revenue) + fixed 90.0.
- Total variable costs 250.0 (50% of revenue); fixed costs 150.0; EBITDA 100.0.

**Step 1: contribution and DOL.** Contribution = 500.0 × 50% = 250.0. DOL = 250.0 / 100.0 = 2.5.

**Step 2: FY2026E costs.** Revenue is 545.9 (from the revenue lesson). Fixed costs grow with 3% inflation.
- COGS = 0.46 × 545.9 + 60.0 × 1.03 = 251.11 + 61.80 = 312.91.
- SG&A = 0.04 × 545.9 + 90.0 × 1.03 = 21.84 + 92.70 = 114.54.

**Step 3: EBITDA.** 545.9 − 312.91 − 114.54 = **118.45**, a margin of 21.7% (up from 20.0%).

**Step 4: interpret operating leverage.** Revenue grew 9.18% and EBITDA grew 18.45%, a ratio of about 2.0. It is below the DOL of 2.5 because fixed costs also rose 3%. With fixed costs held flat, EBITDA would have been 545.9 × 0.5 − 150.0 = 122.95, up 22.95%, which is exactly 2.5 × 9.18%.

**Step 5: downside check.** If revenue instead fell 10% to 450.0 with fixed costs flat, EBITDA = 225.0 − 150.0 = 75.0, a fall of 25%. A simple 20% margin assumption would have predicted 90.0, overstating downside profit by 15.0.

## Common exam traps
- Holding EBITDA margin constant in a downturn, which ignores operating leverage and flatters the downside.
- Treating fixed costs as permanently fixed; they grow with inflation and step up with capacity.
- Confusing contribution margin (revenue minus variable costs) with gross margin (revenue minus COGS).
- Calculating DOL with EBIT in one place and EBITDA in another without noting the difference.
- Assuming operating leverage applies symmetrically only on the upside.

## Key takeaways
- Forecast variable costs as a percentage of revenue and fixed costs as a growing amount.
- Contribution margin is the profit kept from each extra unit of revenue.
- DOL = contribution / EBITDA; higher fixed costs mean more volatile profits.
- Northwind's FY2026E EBITDA is 118.45 (USD m), a 21.7% margin.
- Margin expansion should be explained by drivers, not assumed.
