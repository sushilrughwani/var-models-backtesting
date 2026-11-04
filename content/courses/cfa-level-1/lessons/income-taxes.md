---
title: "Topics in Long-Term Liabilities and Equity: Income Taxes"
---

## Learning goals
- Distinguish accounting profit from taxable income, and income tax expense from taxes payable.
- Calculate the carrying amount and tax base of an asset or liability and the resulting deferred tax asset (DTA) or liability (DTL).
- Classify differences as temporary or permanent and explain how each affects the effective tax rate.
- Explain how a valuation allowance and tax-rate changes affect reported deferred tax balances.

## Explanation

### Two sets of rules, one company
A company keeps its financial statements under IFRS or US GAAP, but it pays tax under the tax code. Financial reporting produces **accounting profit** (pre-tax income); the tax return produces **taxable income**. Applying the tax rate to taxable income gives **taxes payable** (the cash the company owes now). The income statement, however, shows **income tax expense**, which also includes the tax effect of differences that will reverse later.

$$
\text{Income tax expense} = \text{Taxes payable} + \Delta \text{DTL} - \Delta \text{DTA}
$$

where $\Delta \text{DTL}$ and $\Delta \text{DTA}$ are the changes in deferred tax liabilities and assets during the period.

### Carrying amount versus tax base
Every balance sheet item has a **carrying amount** (its value in the financial statements) and a **tax base** (its value for tax purposes). The difference between the two is a **temporary difference**, because it will unwind over time.

$$
\text{Deferred tax} = (\text{Carrying amount} - \text{Tax base}) \times t
$$

where $t$ is the tax rate expected to apply when the difference reverses.

- **Assets:** carrying amount above tax base creates a **DTL**. Classic case: accelerated tax depreciation. The company has already taken bigger deductions than the books show, so it will pay *more* tax later.
- **Assets:** carrying amount below tax base creates a **DTA**.
- **Liabilities:** carrying amount above tax base creates a **DTA**. Classic case: a warranty provision expensed on the books today but deductible only when paid. The company has prepaid tax and will get the deduction later.

### Permanent differences
Some items never reverse: fines that are never deductible, or tax-exempt interest income. These create **no deferred tax**. They make the **effective tax rate** (income tax expense ÷ pre-tax income) differ from the statutory rate. A non-deductible expense pushes the effective rate above statutory; tax-exempt income pushes it below.

### Valuation allowance and rate changes
A DTA is only worth something if the company will earn enough future taxable income to use it. Under US GAAP, a **valuation allowance** reduces a DTA when it is more likely than not that part of it will not be realised; IFRS reaches a similar result by recognising the DTA only to the extent it is probable it can be used. Increasing the allowance raises tax expense and lowers net income and makes it a potential earnings lever.

When the enacted tax rate changes, existing DTL and DTA balances are remeasured at the new rate, and the adjustment flows through income tax expense in the period of the change. A rate cut shrinks a DTL (a gain) and shrinks a DTA (a loss).

### Analyst view of a DTL
If a DTL is expected to reverse, treat it as a liability. If it is unlikely to reverse (for example, a growing company that keeps buying assets with accelerated depreciation), many analysts treat it as equity. If timing and amount are uncertain, they may exclude it from both debt and equity.

## Worked example
A company starts Year 1 with new equipment costing 900,000. Book depreciation is straight-line over 3 years (300,000 per year); tax depreciation is 450,000 in Year 1. It also books a warranty expense of 40,000 that is deductible only when claims are paid (none paid in Year 1), and a 20,000 regulatory fine that is never deductible. Pre-tax accounting profit is 1,000,000 and the tax rate is 25%.

**Step 1 - Taxable income.** Start from accounting profit and reverse the book-tax differences:
1,000,000 + 300,000 (add back book depreciation) − 450,000 (tax depreciation) + 40,000 (warranty not yet deductible) + 20,000 (fine) = 910,000.

**Step 2 - Taxes payable.** 910,000 × 25% = 227,500.

**Step 3 - DTL on equipment.** Carrying amount = 900,000 − 300,000 = 600,000. Tax base = 900,000 − 450,000 = 450,000. Difference 150,000 × 25% = 37,500 DTL.

**Step 4 - DTA on warranty.** Carrying amount of the provision 40,000, tax base 0. Difference 40,000 × 25% = 10,000 DTA.

**Step 5 - Income tax expense.** 227,500 + 37,500 − 10,000 = 255,000.

**Step 6 - Effective tax rate.** 255,000 ÷ 1,000,000 = 25.5%. The extra 0.5 percentage point is exactly the fine: 20,000 × 25% = 5,000, and 5,000 ÷ 1,000,000 = 0.5%.

**Income tax expense = 255,000; effective tax rate = 25.5%.**

## Common exam traps
- Mixing up the direction: for an **asset**, carrying amount > tax base means DTL; for a **liability**, carrying amount > tax base means DTA.
- Creating deferred tax for permanent differences. Fines and tax-exempt income never produce a DTA or DTL; they only move the effective rate.
- Using the current rate after a rate change has been enacted. Deferred balances are measured at the rate expected when they reverse.
- Forgetting that an increase in a DTA *reduces* tax expense, while an increase in a DTL *increases* it.
- Treating every DTL as debt. If reversal is unlikely, it behaves more like equity.

## Key takeaways
- Income tax expense = taxes payable + change in DTL − change in DTA.
- Temporary differences come from carrying amount versus tax base and create deferred taxes; permanent differences do not.
- Accelerated tax depreciation is the textbook source of a DTL; accrued expenses deductible later (warranties, bad debts) are the textbook source of a DTA.
- A valuation allowance reduces a DTA when future taxable income is doubtful, and changes in it hit net income.
- Rate changes remeasure all deferred balances and flow through current-period tax expense.
