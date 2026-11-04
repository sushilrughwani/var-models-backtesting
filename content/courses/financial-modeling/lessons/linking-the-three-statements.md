---
title: "Linking the Three Statements"
---

## Learning goals
- Assemble the forecast income statement, cash flow statement and balance sheet from the supporting schedules.
- Link every balance sheet line to its source: a schedule, the cash flow statement or the equity roll-forward.
- Derive cash flow from operations, investing and financing using the indirect method.
- Confirm that the forecast balance sheet balances without any plug.

## Explanation

### The goal: no plugs
A properly linked model never forces the balance sheet to balance with a hard-coded number. Instead every line on the balance sheet is either carried from a schedule or explained by a cash flow. When each change in a non-cash balance appears once in the cash flow statement, the closing cash figure is exactly the number needed for assets to equal liabilities plus equity. That is why a balanced model is such a powerful integrity check.

### The order of linking
Build in this order, using green-font links between sheets as set out in the structure lesson:

1. **Income statement**: revenue (revenue build), COGS and SG&A (cost schedule), D&A (capex schedule), interest (debt schedule), tax at the input rate, net income.
2. **Cash flow from operations (CFO)**: start from net income, add back non-cash D&A, then subtract the change in net working capital from the working capital schedule.
3. **Cash flow from investing (CFI)**: minus capex from the capex schedule.
4. **Cash flow from financing (CFF)**: mandatory repayments, revolver draws or repayments, new issuance, dividends.
5. **Balance sheet**: cash from the cash flow statement; receivables, inventory and payables from the working capital schedule; PP&E from the capex schedule; debt from the debt schedule; retained earnings from the equity roll-forward.

$$
\Delta \text{Cash} = CFO + CFI + CFF, \qquad \text{Cash}_t = \text{Cash}_{t-1} + \Delta \text{Cash}
$$

$$
CFO = NI + D\&A - \Delta NWC
$$

where $NI$ is net income and $\Delta NWC$ is the increase in net working capital.

### The mapping rule
Every balance sheet line except cash must map to exactly one source, and every change in it must appear exactly once in the cash flow statement (or be a non-cash movement explained elsewhere, such as retained earnings via net income). In Excel, balance sheet cash is simply `=CF!E40` (closing cash on the cash flow sheet) and retained earnings is `=D75+IS!E30-CF!E36` (opening plus net income minus dividends, with dividends entered as a positive number on that row). Items that do not change in the forecast, such as share capital, are carried forward with `=D74`.

## Worked example
Northwind FY2026E (USD m), pulling together every earlier schedule.

**Income statement.** Revenue 545.90; COGS 312.91; SG&A 114.54; EBITDA 118.45; D&A 22.20; EBIT 96.25; interest 7.41; pre-tax income 88.84; tax at 25% 22.21; **net income 66.63**.

**Cash flow statement.**
- CFO = 66.63 + 22.20 − 3.39 = 85.44
- CFI = −44.00
- CFF = −12.00 (term loan) − 19.45 (revolver) − 19.99 (dividends) = −51.44
- Net change in cash = 85.44 − 44.00 − 51.44 = −10.00; cash moves from 30.00 to 20.00, exactly the minimum cash level set in the debt schedule.

**Equity.** Retained earnings = 137.40 + 66.63 − 19.99 = 184.04. Share capital is unchanged at 50.00.

**Balance sheet.**

| Assets | FY2025A | FY2026E | Liabilities and equity | FY2025A | FY2026E |
|---|---|---|---|---|---|
| Cash | 30.00 | 20.00 | Payables | 39.70 | 44.58 |
| Receivables | 68.50 | 71.79 | Revolver | 35.00 | 15.55 |
| Inventory | 63.60 | 68.58 | Term loan | 100.00 | 88.00 |
| Net PP&E | 200.00 | 221.80 | Share capital | 50.00 | 50.00 |
| | | | Retained earnings | 137.40 | 184.04 |
| **Total** | **362.10** | **382.17** | **Total** | **362.10** | **382.17** |

**Check.** Assets 382.17 equal liabilities plus equity 382.17. **The balance sheet balances with no plug.**

**Why it works.** Assets rose 20.07 in total. On the other side, payables rose 4.88, debt fell 31.45 and retained earnings rose 46.64: 4.88 − 31.45 + 46.64 = 20.07. Every movement is accounted for once in the cash flow statement.

## Common exam traps
- Plugging cash or equity with a hard-code to force a balance; it hides errors instead of fixing them.
- Adding back D&A in CFO but forgetting to deduct it in the PP&E roll-forward, or the reverse.
- Deducting dividends from retained earnings but not from financing cash flow.
- Double counting interest by deducting it in net income and again in financing cash flow.
- Linking balance sheet cash to a cash calculation other than the cash flow statement's closing balance.

## Key takeaways
- Build in order: income statement, cash flow statement, balance sheet.
- CFO = net income + D&A − increase in NWC; capex is investing; debt and dividends are financing.
- Balance sheet cash comes only from the cash flow statement's closing cash.
- Every balance sheet change must appear once in the cash flow statement.
- Northwind's FY2026E balance sheet totals 382.17 (USD m) on both sides.
