---
title: "Building Unlevered Free Cash Flow"
---

## Learning goals
- Explain why a DCF of the whole business discounts unlevered free cash flow (FCFF) rather than net income.
- Build FCFF from EBIT line by line: taxes on EBIT, D&A, capex and the change in net working capital.
- Reconcile FCFF built from EBIT with FCFF built from net income.
- Lay out the FCFF block in Excel with clear, auditable formulas.

## Explanation

### Whose cash is it?
Your three-statement model now produces a balanced forecast. Valuation asks a different question: how much cash does the operating business throw off each year, before anyone who financed it is paid? That cash belongs jointly to lenders and shareholders, so it is called **unlevered free cash flow** or **free cash flow to the firm (FCFF)**. Because it ignores how the company is financed, we later discount it at the blended cost of all capital (WACC) and get **enterprise value**.

Think of the business as a rental property. FCFF is the rent minus running costs, maintenance and tax, before the mortgage payment. Whether you bought with cash or a large mortgage does not change the rent; it changes who gets it.

### The build from EBIT

$$
\text{FCFF} = \text{EBIT}\times(1-t) + \text{D\&A} - \text{Capex} - \Delta\text{NWC}
$$

- $\text{EBIT}$: operating profit from the income statement forecast.
- $t$: the marginal (or normalised cash) tax rate, applied to EBIT, not to pre-tax profit.
- $\text{EBIT}\times(1-t)$: **NOPAT**, the tax the company would pay if it had no debt.
- $\text{D\&A}$: depreciation and amortisation, non-cash charges added back.
- $\text{Capex}$: cash spent on property, plant and equipment from the capex schedule.
- $\Delta\text{NWC}$: this year's net working capital minus last year's. An increase consumes cash; a decrease releases it.

Interest expense never appears. Its benefit (the interest tax shield) is captured in the after-tax cost of debt inside WACC, so deducting interest here would count financing twice.

### The build from net income
If you start from net income you must undo the financing:

$$
\text{FCFF} = \text{NI} + \text{Int}\times(1-t) + \text{D\&A} - \text{Capex} - \Delta\text{NWC}
$$

where $\text{NI}$ is net income and $\text{Int}$ is interest expense. Only the after-tax interest is added back, because the tax saving from interest has already lowered the tax line.

### Excel layout
Keep the FCFF block on the valuation sheet, linked to the model, one row per item and one column per forecast year. With EBIT in row 10, the tax rate in `Inputs!C5`, D&A in row 12, capex in row 13 and the change in NWC in row 14:
- NOPAT: `=E10*(1-Inputs!$C$5)`
- FCFF: `=E11+E12-E13-E14`

Enter capex and the NWC increase as positive numbers and subtract them, or store them as negatives and add everything; pick one sign convention and label it.

## Worked example
Northwind Components Ltd makes precision motion components. All figures are USD millions, the fiscal year ends 31 December, and the tax rate is 25%. The forecast from the earlier schedules is:

| | 2026E | 2027E | 2028E | 2029E | 2030E |
|---|---|---|---|---|---|
| Revenue | 1,250 | 1,320 | 1,386 | 1,441 | 1,484 |
| EBIT | 175 | 191 | 208 | 216 | 223 |
| D&A | 44 | 46 | 48 | 50 | 52 |
| Capex | 56 | 59 | 62 | 65 | 67 |
| Increase in NWC | 10.5 | 10.5 | 10.0 | 8.5 | 6.5 |

**Step 1 - NOPAT for 2026.** 175 × (1 − 0.25) = 131.25.

**Step 2 - Add back D&A.** 131.25 + 44 = 175.25.

**Step 3 - Deduct capex.** 175.25 − 56 = 119.25.

**Step 4 - Deduct the NWC increase.** 119.25 − 10.5 = **108.75**.

Repeating across the years:

| | 2026E | 2027E | 2028E | 2029E | 2030E |
|---|---|---|---|---|---|
| NOPAT | 131.25 | 143.25 | 156.00 | 162.00 | 167.25 |
| FCFF | 108.75 | 119.75 | 132.00 | 138.50 | 145.75 |

**Cross-check from net income (2026).** Interest expense in 2026 is 25.0, so profit before tax is 175 − 25 = 150 and net income is 150 × 0.75 = 112.5. Then FCFF = 112.5 + 25.0 × 0.75 + 44 − 56 − 10.5 = 112.5 + 18.75 − 22.5 = 108.75, the same answer. If the two routes ever disagree, net income contains something non-operating (interest earned on cash, a one-off gain) that must be stripped out. A reconciliation row like this catches inconsistencies before they reach the valuation.

**FCFF for 2026 is USD 108.75 million.** These five FCFF figures feed the next three lessons.

## Common exam traps
- Applying the tax rate to EBT (profit after interest) instead of EBIT, which quietly lets the interest tax shield into FCFF.
- Adding back the full interest expense when starting from net income; only $\text{Int}\times(1-t)$ goes back.
- Getting the NWC sign wrong: an increase in working capital reduces FCFF.
- Adding back D&A that was never deducted, for example when starting from EBITDA.
- Mixing in financing flows such as debt repayments or dividends; they belong in levered cash flow, not FCFF.

## Key takeaways
- FCFF is the cash available to all capital providers, so it is discounted at WACC to give enterprise value.
- Build it as NOPAT plus D&A minus capex minus the increase in NWC.
- Interest is excluded because its tax benefit sits in the after-tax cost of debt.
- Starting from net income, add back interest after tax only.
- Northwind's FCFF rises from 108.75 in 2026 to 145.75 in 2030 (USD millions).
