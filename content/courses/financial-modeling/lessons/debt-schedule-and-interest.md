---
title: "The Debt Schedule and Interest"
---

## Learning goals
- Build a term loan schedule with mandatory amortisation.
- Model a revolving credit facility that draws and repays from available cash.
- Calculate interest on average balances and explain the circularity it creates.
- Manage circular references safely with iterative calculation and a circuit breaker.

## Explanation

### Why a debt schedule?
By this point the model forecasts revenue, costs, working capital and capex. What remains is financing: how much the company borrows or repays, and what interest it pays. Interest sits between EBIT and pre-tax income, so it affects net income; debt balances sit on the balance sheet; repayments and drawings sit in financing cash flows. The debt schedule connects all three.

### Term loans
A term loan has a fixed repayment profile. Each year:

$$
\text{Closing}_t = \text{Opening}_t - \text{Mandatory repayment}_t
$$

Some loans also have a **cash sweep**, where a share of excess cash must be used for extra (optional) prepayment. Interest uses the loan's rate (fixed, or a floating benchmark plus a margin).

### The revolver
A revolving credit facility (revolver) works like a corporate overdraft with a limit. It is the model's balancing tool for cash: if the company generates more cash than it needs, it repays the revolver; if it runs short, it draws. First compute the cash available after all other flows:

$$
\text{Cash available} = \text{Opening cash} + \text{CFO} - \text{Capex} - \text{Mandatory repayments} - \text{Dividends} - \text{Minimum cash}
$$

where CFO is cash flow from operations and minimum cash is the operating buffer management wants to keep. If cash available is positive, repay the revolver (up to its balance); if negative, draw (up to the limit). In Excel, with cash available in E58, the opening revolver in D60 and the limit in C61, the drawing (positive) or repayment (negative) is `=MIN(MAX(-E58,-D60),$C$61-D60)`.

### Interest and circularity
Interest calculated on the opening balance is simple but ignores repayments made during the year. Interest on the **average** balance is more accurate:

$$
\text{Interest}_t = r \times \frac{\text{Opening}_t + \text{Closing}_t}{2}
$$

where $r$ is the interest rate. This creates a loop: interest depends on the closing revolver, which depends on cash available, which depends on net income, which depends on interest. Excel flags this as a circular reference.

The standard solution is to enable iterative calculation (File, Options, Formulas) and add a **circuit breaker**: an input switch that cuts the loop if errors start feeding round. For example `=IF($C$4=1,AVERAGE(D60,E60),D60)*$C$62` uses the average balance when the switch is 1 and the opening balance when it is 0. Errors such as `#REF!` can lock a circular model; flipping the switch to 0 clears them.

## Worked example
Northwind (USD m), FY2026E. Inputs: term loan opening 100.0 at 6% with mandatory repayment of 12.0; revolver opening 35.0 at 7% with a limit of 60.0; opening cash 30.0; minimum cash 20.0; dividends 30% of net income; tax 25%. From earlier lessons: EBIT 96.25, D&A 22.20, change in NWC 3.39 (outflow), capex 44.0.

**Step 1: term loan.** Closing = 100.0 − 12.0 = 88.0. Interest = 6% × (100.0 + 88.0) / 2 = 5.64.

**Step 2: first pass (revolver interest on the opening balance).** Revolver interest = 7% × 35.0 = 2.45; total interest 8.09. Net income = (96.25 − 8.09) × 0.75 = 66.12. Cash available = 19.09, so the revolver closes at 15.91.

**Step 3: iterate.** Using the average of 35.0 and 15.91, total interest becomes 7.42 and the revolver closes at 15.56. One more pass settles the values:

- Total interest = 5.64 + 7% × (35.0 + 15.55) / 2 = 5.64 + 1.77 = 7.41
- Net income = (96.25 − 7.41) × 0.75 = 66.63; dividends = 19.99
- CFO = 66.63 + 22.20 − 3.39 = 85.44
- Cash available = 30.0 + 85.44 − 44.0 − 12.0 − 19.99 − 20.0 = 19.45
- Revolver repayment 19.45, closing revolver **15.55**, closing cash 20.0

**Step 4: compare.** Using opening balances only, interest would be 6.00 + 2.45 = 8.45 and the revolver would close at 16.10. The average-balance method gives lower interest because debt was repaid during the year.

## Common exam traps
- Repaying more revolver than is outstanding, producing a negative debt balance.
- Forgetting the minimum cash buffer, so all cash sweeps to debt and the balance sheet shows zero cash.
- Leaving a circular model without a circuit breaker; one error can propagate and freeze the file.
- Treating mandatory repayments as optional, or deducting them from net income instead of financing cash flow.
- Mixing opening-balance and average-balance interest across different debt tranches without a reason.

## Key takeaways
- Term loans follow a fixed amortisation; the revolver absorbs cash surpluses and shortfalls.
- Cash available after the minimum cash buffer decides the revolver movement.
- Average-balance interest is more accurate but creates a deliberate circular reference.
- Use iterative calculation plus a circuit breaker switch.
- Northwind's FY2026E interest is 7.41 and the revolver closes at 15.55 (USD m).
