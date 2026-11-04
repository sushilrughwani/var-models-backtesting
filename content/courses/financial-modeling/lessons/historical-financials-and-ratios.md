---
title: "Setting Up Historical Financials and Ratios"
---

## Learning goals
- Lay out historical financial statements in a consistent, model-ready format.
- Adjust reported figures for non-recurring items to find underlying performance.
- Calculate growth, margin, working capital and investment ratios from historical data.
- Explain how historical ratios become forecast drivers.

## Explanation

### Why history comes first
Every forecast assumption should be anchored in evidence. Before you predict Northwind's FY2026 margin, you need to know what its margins have actually been and why. The historical section of a model does two jobs: it gives you a clean base year to forecast from, and it produces the ratios ("drivers") that you will carry forward. Following the structure standards from the last lesson, historical figures are typed in blue and placed in the same columns and rows as the forecast so that every driver row runs continuously from actual to estimate.

### Cleaning the data
Company reports rarely arrive in model-ready form. Typical cleaning steps:

- **Standardise line items**: map the company's labels onto your template (for example, combine "distribution costs" and "administrative expenses" into SG&A).
- **Strip out non-recurring items**: restructuring charges, asset impairments, litigation settlements and gains on asset sales distort margins. Show them on a separate line so you can forecast "underlying" EBITDA and still reconcile to reported profit.
- **Check that statements tie**: total assets must equal liabilities plus equity in every historical year, and net income must match between statements.
- **Keep consistent units and fiscal year ends**: restate if the company changed its year end or reporting currency.

### The core driver ratios
**Growth**

$$
g_t = \frac{\text{Revenue}_t}{\text{Revenue}_{t-1}} - 1 \qquad \text{CAGR} = \left(\frac{\text{Revenue}_{end}}{\text{Revenue}_{start}}\right)^{1/n} - 1
$$

where $n$ is the number of years between the start and end values.

**Margins**: gross margin = gross profit / revenue; EBITDA margin = EBITDA / revenue; SG&A as a percentage of revenue.

**Working capital days**

$$
DSO = \frac{AR}{\text{Revenue}} \times 365 \qquad DIO = \frac{\text{Inventory}}{COGS} \times 365 \qquad DPO = \frac{AP}{COGS} \times 365
$$

where $AR$ is accounts receivable and $AP$ is accounts payable. Inventory and payables are measured against COGS because they are carried at cost. The cash conversion cycle is $DSO + DIO - DPO$.

**Investment and tax**: capex as a percentage of revenue, D&A as a percentage of revenue or of opening PP&E, and the effective tax rate = tax expense / pre-tax income.

In Excel, with FY2024A in column C and FY2025A in column D, growth is `=D5/C5-1`, gross margin is `=D7/D5` and DSO is `=D20/D5*365`. Copy each formula across all historical columns.

## Worked example
Northwind Components Ltd, USD millions.

| Item | FY2023A | FY2024A | FY2025A |
|---|---|---|---|
| Revenue | 412.0 | 452.0 | 500.0 |
| COGS |  | 266.7 | 290.0 |
| SG&A |  | 103.0 | 110.0 |
| Restructuring (one-off) |  | 0.0 | 6.0 |
| Accounts receivable |  | 64.0 | 68.5 |
| Inventory |  | 60.0 | 63.6 |
| Accounts payable |  | 36.0 | 39.7 |

**Step 1: growth.** FY2024 = 452.0 / 412.0 − 1 = 9.71%. FY2025 = 500.0 / 452.0 − 1 = 10.62%. Two-year CAGR = (500.0 / 412.0)^(1/2) − 1 = 10.16%.

**Step 2: margins.** Gross margin FY2024 = (452.0 − 266.7) / 452.0 = 41.0%; FY2025 = 210.0 / 500.0 = 42.0%. Underlying EBITDA FY2024 = 452.0 − 266.7 − 103.0 = 82.3 (margin 18.2%); FY2025 = 500.0 − 290.0 − 110.0 = 100.0 (margin 20.0%). Reported FY2025 EBITDA after the 6.0 restructuring charge is 94.0, a margin of only 18.8%, which would understate the base year.

**Step 3: working capital days.**
- FY2024: DSO = 64.0 / 452.0 × 365 = 51.7; DIO = 60.0 / 266.7 × 365 = 82.1; DPO = 36.0 / 266.7 × 365 = 49.3.
- FY2025: DSO = 68.5 / 500.0 × 365 = 50.0; DIO = 63.6 / 290.0 × 365 = 80.0; DPO = 39.7 / 290.0 × 365 = 50.0.
- Cash conversion cycle fell from 84.5 days to **80.1 days**.

**Step 4: tax and D&A.** FY2025 tax was 15.0 on pre-tax income of 60.0, an effective rate of 25.0%. D&A of 25.0 was 5.0% of revenue.

**Interpretation.** Northwind grew about 10% a year, expanded underlying EBITDA margin by about 1.8 points and collected cash faster. These trends become the starting point for the forecast drivers in the next module.

## Common exam traps
- Measuring DIO or DPO against revenue instead of COGS, which understates the days.
- Leaving one-off charges in the base year, so forecast margins are anchored too low (or too high, for one-off gains).
- Confusing cumulative growth with annual growth: 21.4% over two years is not 21.4% a year.
- Averaging growth rates when the question asks for a compound annual growth rate.
- Typing ratios as hard-codes instead of calculating them from the historical statements.

## Key takeaways
- Historical data is typed in blue in the same layout as the forecast.
- Separate non-recurring items so underlying margins form the forecast base.
- Growth, margins, working capital days, capex and tax rates are the core drivers.
- Inventory and payables days use COGS; receivables days use revenue.
- Always check that historical statements balance before forecasting.
