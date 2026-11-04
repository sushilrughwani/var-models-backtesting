---
title: "Analyzing Statements of Cash Flows II"
---

## Learning goals
- Explain what free cash flow to the firm (FCFF) and free cash flow to equity (FCFE) measure and who each belongs to.
- Calculate FCFF and FCFE starting from cash flow from operations or from net income.
- Calculate and interpret performance and coverage ratios based on operating cash flow.
- Adjust free cash flow calculations for IFRS classification choices on interest.

## Explanation

### From cash flow statement to free cash flow
In the previous lesson we built cash flow from operations (CFO). But CFO is not money the company can hand back to investors: it still has to replace and expand its equipment. **Free cash flow** is the cash left after the investment needed to keep the business running and growing. Analysts use it to value companies (discounted cash flow models) and to judge whether dividends and debt payments are sustainable.

There are two versions, defined by *who* the cash is free for.

### Free cash flow to the firm
FCFF is the cash available to **all** capital providers, both lenders and shareholders, before any payments to them. Because interest is a payment to lenders, we add it back (after tax, since the company keeps the tax saving either way):

$$
\text{FCFF} = \text{CFO} + \text{Int}(1-t) - \text{FCInv}
$$

where Int is interest paid, $t$ is the tax rate and FCInv is fixed capital investment (capital expenditure net of proceeds from asset sales). Starting from net income instead:

$$
\text{FCFF} = \text{NI} + \text{NCC} + \text{Int}(1-t) - \text{FCInv} - \text{WCInv}
$$

where NCC is non-cash charges (such as depreciation) and WCInv is the investment in working capital (the increase in operating current assets net of operating current liabilities).

**IFRS adjustment**: if interest paid was classified as financing, it was never deducted from CFO, so you do **not** add it back. Likewise, if dividends received or interest received were classified outside operating, analysts may need to move them back.

### Free cash flow to equity
FCFE is what remains for **shareholders** after paying lenders and after net new borrowing:

$$
\text{FCFE} = \text{CFO} - \text{FCInv} + \text{Net borrowing}
$$

Net borrowing is new debt issued minus debt repaid. Under US GAAP, interest is already deducted inside CFO, so no interest adjustment is needed. The link between the two measures is

$$
\text{FCFE} = \text{FCFF} - \text{Int}(1-t) + \text{Net borrowing}
$$

FCFE that is persistently below dividends signals that payouts are funded by borrowing or by running down cash.

### Cash flow ratios
**Performance ratios** compare operating cash with the scale of the business:

- Cash flow to revenue = CFO / revenue (cash generated per unit of sales).
- Cash return on assets = CFO / average total assets.
- Cash to income = CFO / operating income (a ratio well below 1 for several years can signal aggressive accruals).
- Cash flow per share = (CFO - preferred dividends) / weighted average shares.

**Coverage ratios** measure the ability to meet obligations:

$$
\text{Interest coverage} = \frac{\text{CFO} + \text{Interest paid} + \text{Taxes paid}}{\text{Interest paid}}
$$

- Debt coverage = CFO / total debt.
- Reinvestment = CFO / cash paid for long-term assets.
- Debt payment = CFO / cash long-term debt repayments.
- Dividend payment = CFO / dividends paid.

Interest and taxes are added back in the coverage numerator because they were deducted in CFO but are the very items we want to test coverage against (taxes are paid only after interest).

## Worked example
Ravel Manufacturing (US GAAP, USD millions) reports net income 300, depreciation 80, an increase in working capital of 40, interest paid 50, taxes paid 90, capital expenditure 150 and net new borrowing 30. The tax rate is 25% and total debt is 1,000.

**Step 1 - CFO.** 300 + 80 - 40 = **340**.

**Step 2 - FCFF.** After-tax interest = 50 × (1 - 0.25) = 37.5.

$$
\text{FCFF} = 340 + 37.5 - 150 = 227.5
$$

**Step 3 - FCFE.**

$$
\text{FCFE} = 340 - 150 + 30 = 220
$$

Check with the link formula: 227.5 - 37.5 + 30 = 220. ✓

**Step 4 - Coverage ratios.**

- Interest coverage = (340 + 50 + 90) / 50 = **9.6 times**.
- Reinvestment = 340 / 150 = **2.27**: operating cash covers capex more than twice.
- Debt coverage = 340 / 1,000 = **0.34**: about three years of CFO would repay all debt.

Ravel's FCFF is **USD 227.5 million** and its FCFE is **USD 220 million**.

## Common exam traps
- Adding back pre-tax interest instead of after-tax interest in FCFF.
- Adding back interest for an IFRS company that already classified interest paid in financing.
- Forgetting net borrowing in FCFE, or subtracting it when it is positive.
- Omitting the working capital investment when starting from net income.
- Using CFO alone as the numerator of interest coverage; interest and taxes paid must be added back.

## Key takeaways
- FCFF is cash available to all capital providers; FCFE is cash available to shareholders.
- From CFO: FCFF adds after-tax interest and subtracts capex; FCFE subtracts capex and adds net borrowing.
- Classification choices under IFRS change which adjustments you make.
- Performance ratios scale CFO by revenue, assets or income; coverage ratios compare CFO with obligations.
- FCFE persistently below dividends warns that payouts are not self-funded.
