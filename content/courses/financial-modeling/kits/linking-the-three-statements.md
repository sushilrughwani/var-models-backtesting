---
title: "Linking the Three Statements"
duration: 26
---

## Lecture outline
- 00:00 - Hook: "if you need a plug, you have a bug"
- 02:30 - The goal: a balance sheet that balances because every movement is explained
- 05:00 - Order of linking: income statement, cash flow, balance sheet
- 08:00 - CFO by the indirect method; CFI; CFF
- 11:30 - The mapping rule and Excel links between sheets
- 14:00 - Whiteboard: Northwind FY2026E income statement and cash flow
- 19:00 - Whiteboard: Northwind FY2026E balance sheet and proof of balance
- 23:30 - Recap and traps

## Slides
### Slide 1: No Plugs
- Every balance sheet line has a source
- Cash comes from the cash flow statement
- Balancing proves internal consistency
### Slide 2: Order of Linking
- Income statement from the schedules
- Cash flow from net income and balance sheet changes
- Balance sheet from schedules, cash flow and equity
### Slide 3: Cash Flow from Operations
- CFO = net income + D&A - increase in NWC
- Indirect method: start from profit, adjust to cash
### Slide 4: Investing and Financing
- CFI: capex (and disposals, acquisitions)
- CFF: repayments, draws, issuance, dividends
- Change in cash = CFO + CFI + CFF
### Slide 5: The Mapping Rule
- Each balance sheet line maps to one source
- Each change appears once in the cash flow
- Unchanged items carried forward
### Slide 6: Excel Links
- Cash `=CF!E40`
- Retained earnings `=D75+IS!E30-CF!E36`
- Share capital `=D74`
### Slide 7: Northwind FY2026E Income Statement
- Revenue 545.90, EBITDA 118.45, EBIT 96.25
- Interest 7.41, tax 22.21
- Net income 66.63
### Slide 8: Northwind FY2026E Cash Flow
- CFO 85.44, CFI -44.00, CFF -51.44
- Net change -10.00; cash 30.00 to 20.00
### Slide 9: Northwind FY2026E Balance Sheet
- Assets: 20.00 + 71.79 + 68.58 + 221.80 = 382.17
- Liabilities and equity: 44.58 + 15.55 + 88.00 + 50.00 + 184.04 = 382.17
### Slide 10: Proof of Balance
- Assets up 20.07
- Payables +4.88, debt -31.45, retained earnings +46.64 = 20.07
### Slide 11: Key Takeaways
- Link in order, never plug
- Cash is the result, not an input
- Every movement once and only once

## Whiteboard examples
**Example 1: Income statement and cash flow.** EBIT 96.25 - interest 7.41 = 88.84; tax 22.21; net income 66.63. CFO = 66.63 + 22.20 - 3.39 = 85.44. CFI = -44.00. CFF = -12.00 - 19.45 - 19.99 = -51.44. Net change = -10.00. Cash 30.00 to 20.00.

**Example 2: Balance sheet.** Retained earnings 137.40 + 66.63 - 19.99 = 184.04. Assets 382.17; liabilities and equity 382.17.

**Example 3: Walk the change.** Assets +20.07 (cash -10.00, receivables +3.29, inventory +4.98, PP&E +21.80). Liabilities and equity +20.07 (payables +4.88, revolver -19.45, term loan -12.00, retained earnings +46.64).

## Questions to ask students
- Where does balance sheet cash come from in a forecast? (The closing cash on the cash flow statement.)
- Dividends of 19.99 are paid. Which two places do they appear? (A deduction in retained earnings and an outflow in financing cash flow.)
- Why is interest not shown again in financing cash flow? (It is already deducted within net income, which starts CFO.)
- Which schedule supplies net PP&E? (The capex and depreciation schedule.)
- What does it mean if you need a hard-coded number to make the balance sheet balance? (There is an error somewhere in the links.)

## Analogies
- Linking the statements is double-entry bookkeeping at scale: every debit has a credit somewhere.
- The cash flow statement is the bridge between two balance sheets; if the bridge is built right, you land exactly on the other side.
- A plug is like taping over a warning light on your car dashboard.

## Recording tips
- Use split screen: schedules on the left, statements on the right, with arrows as you link each line.
- Build the balance sheet last and pause before revealing the balance check for impact.
- Walk the change in assets and liabilities explicitly; it trains students for the error-check lesson.
