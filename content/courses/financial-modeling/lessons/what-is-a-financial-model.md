---
title: "What Is a Financial Model?"
---

## Learning goals
- Define a financial model and explain what decisions it is built to support.
- Distinguish the main model types: three-statement, DCF, LBO, merger and budget models.
- Describe the anatomy of a three-statement model and the role of each supporting schedule.
- Trace a single assumption change through the income statement, cash flow statement and balance sheet.

## Explanation

### A model is a decision tool, not a spreadsheet
A financial model is a structured set of calculations that turns assumptions about a business into forecast financial statements, and then into an answer to a question. The question is what matters: "Can this company afford a new factory?", "What is the share worth?", "How much debt can a buyer put on it?" A good model makes the link between assumptions and answer visible, so that anyone can change an input and see the consequence.

Throughout this course we model one fictional company, **Northwind Components Ltd**, a maker of precision industrial parts. All figures are in USD millions unless stated otherwise. In FY2025 Northwind reported revenue of 500.0, cost of goods sold (COGS) of 290.0, selling, general and administrative expenses (SG&A) of 110.0, a one-off restructuring charge of 6.0, depreciation and amortisation (D&A) of 25.0, interest expense of 9.0 and a 25% tax rate.

### The main types of model
- **Three-statement model**: forecasts the income statement, balance sheet and cash flow statement together. It is the engine underneath almost every other model.
- **DCF (discounted cash flow) model**: takes forecast free cash flows from the three-statement model and discounts them to estimate intrinsic value.
- **LBO (leveraged buyout) model**: tests how much debt a business can carry and what return a financial sponsor earns.
- **Merger (accretion/dilution) model**: combines two companies to see the effect of a deal on earnings per share.
- **Budget and operating models**: used inside companies for planning, often monthly and more granular.

### Anatomy of a three-statement model
A standard model has a clear flow:

1. **Inputs and assumptions**: growth rates, margins, working capital days, capex, interest rates.
2. **Historical statements**: the last three to five years of cleaned actuals.
3. **Supporting schedules**: revenue build, operating costs, working capital, capex and depreciation, debt and interest, equity.
4. **Forecast statements**: the income statement, balance sheet and cash flow statement, fed by the schedules.
5. **Checks and outputs**: a balance check, ratio summaries, valuation and charts.

The three statements are tied together by a few critical links. Net income flows from the income statement into retained earnings and into the top of the cash flow statement. Non-cash items such as D&A are added back. Changes in balance sheet items (receivables, inventory, payables, fixed assets, debt) become cash flows. The closing cash from the cash flow statement becomes cash on the balance sheet. If every link is right, the balance sheet balances:

$$
\text{Total assets} = \text{Total liabilities} + \text{Equity}
$$

The retained earnings roll-forward is the single most important link:

$$
RE_{t} = RE_{t-1} + NI_{t} - Div_{t}
$$

where $RE$ is retained earnings, $NI$ is net income and $Div$ is dividends declared in period $t$.

## Worked example
**Part 1: FY2025 net income and retained earnings for Northwind.**

1. EBITDA before the one-off = 500.0 − 290.0 − 110.0 = 100.0.
2. EBIT = 100.0 − 6.0 (restructuring) − 25.0 (D&A) = 69.0.
3. Pre-tax income = 69.0 − 9.0 = 60.0.
4. Tax at 25% = 15.0, so net income = 45.0.
5. Northwind pays out 30% of net income: dividends = 13.5.
6. Opening retained earnings were 105.9, so closing retained earnings = 105.9 + 45.0 − 13.5 = **137.4**.

**Part 2: trace a change.** Suppose D&A had been 10.0 higher (35.0 instead of 25.0), with nothing else changing.

- Income statement: EBIT falls by 10.0; tax falls by 10.0 × 25% = 2.5; net income falls by 7.5.
- Cash flow statement: net income is 7.5 lower, but D&A added back is 10.0 higher, so operating cash flow rises by 2.5 (the tax saving).
- Balance sheet: net PP&E is 10.0 lower; cash is 2.5 higher; total assets fall by 7.5. Retained earnings fall by 7.5.

Both sides fall by 7.5, so the balance sheet still balances. **Net income −7.5, cash +2.5, assets and equity each −7.5.** This "flex one line and follow it" test is the fastest way to understand, and later to audit, any three-statement model.

## Common exam traps
- Thinking depreciation reduces cash. It reduces net income, but cash only changes by the tax effect, which is a saving.
- Forgetting dividends in the retained earnings roll-forward, or adding them instead of subtracting them.
- Treating a DCF or LBO as separate from the three-statement model; both are built on top of it.
- Using reported figures that include one-off items as the base for forecasting margins.
- Believing a balance sheet that balances must be correct; a model can balance and still use poor assumptions.

## Key takeaways
- A model exists to answer a specific business question; design it around that question.
- The three-statement model is the foundation for DCF, LBO and merger analysis.
- Supporting schedules feed the statements; inputs stay separate from calculations.
- Net income links to retained earnings and the cash flow statement; closing cash links back to the balance sheet.
- Flexing one assumption and following it through all three statements is the core modelling skill.
