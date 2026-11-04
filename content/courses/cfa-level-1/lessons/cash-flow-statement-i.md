---
title: "Analyzing Statements of Cash Flows I"
---

## Learning goals
- Classify cash flows as operating, investing or financing, including the IFRS and US GAAP differences for interest and dividends.
- Explain why non-cash investing and financing transactions are excluded from the main sections.
- Calculate cash flow from operations using the indirect method.
- Calculate key direct-method lines such as cash collected from customers and cash paid to suppliers.

## Explanation

### Why a cash flow statement?
Accrual accounting tells us what a company *earned*; the cash flow statement tells us what it actually *collected and spent*. A company can report rising profits while its cash drains away into receivables and inventory. Lenders and equity analysts look here first to check whether profits are turning into cash.

### The three sections
- **Operating activities (CFO)**: cash from the core business: collections from customers, payments to suppliers and employees, taxes paid.
- **Investing activities (CFI)**: buying and selling long-term assets and investments: capital expenditure, proceeds from selling equipment, purchases of other companies' securities.
- **Financing activities (CFF)**: transactions with the providers of capital: issuing or repaying debt, issuing or buying back shares, paying dividends.

The two frameworks differ on interest and dividends:

| Item | US GAAP | IFRS |
|---|---|---|
| Interest paid | Operating | Operating or financing |
| Interest received | Operating | Operating or investing |
| Dividends paid | Financing | Operating or financing |
| Dividends received | Operating | Operating or investing |

Under IFRS taxes paid are operating unless linked to a specific investing or financing item. Transactions with no cash movement, such as buying a building by issuing a note to the seller or converting debt into shares, are **not** in the three sections; they are disclosed separately as non-cash activities.

### The indirect method
Most companies present CFO with the indirect method, starting from net income and reversing everything that is not cash:

$$
\text{CFO} = \text{NI} + \text{Non-cash charges} - \text{Gains} + \text{Losses} - \Delta\text{Operating assets} + \Delta\text{Operating liabilities}
$$

where non-cash charges are items like depreciation and amortisation, gains and losses are on asset disposals (the cash proceeds belong in investing), and the $\Delta$ terms are changes in working capital accounts such as receivables, inventory, payables and accrued liabilities.

The sign logic: an **increase in an operating asset** (more receivables) means cash was tied up, so subtract it. An **increase in an operating liability** (more payables) means the company kept cash it has not paid yet, so add it.

### The direct method
The direct method lists the actual cash lines. IFRS and US GAAP both encourage it; US GAAP then requires an indirect reconciliation as well. Two core formulas:

$$
\text{Cash from customers} = \text{Revenue} - \Delta\text{Accounts receivable}
$$

$$
\text{Cash paid to suppliers} = \text{COGS} + \Delta\text{Inventory} - \Delta\text{Accounts payable}
$$

Here $\Delta$ is ending minus beginning balance. An unearned-revenue increase would be added to customer cash. The direct method shows where cash comes from, which helps forecasting; the indirect method shows why profit and cash differ, which helps spot earnings quality problems.

## Worked example
Corvin Industries reports for the year (USD thousands): net income 200; depreciation 50; loss on sale of equipment 10; receivables up 30; inventory down 15; accounts payable up 20; wages payable down 5. It bought equipment for 120 and sold old equipment for proceeds of 25. It borrowed 60, paid dividends of 40 and repurchased shares for 30. It reports under US GAAP.

**Step 1 - CFO (indirect).**

$$
200 + 50 + 10 - 30 + 15 + 20 - 5 = 260
$$

Depreciation and the loss are added back because they reduced profit without using cash. The receivables increase is subtracted, the inventory decrease added, the payables increase added and the wages decrease subtracted. CFO is **260**.

**Step 2 - CFI.** Capital expenditure -120 plus sale proceeds +25 = **-95**. Note that the full 25 of proceeds goes here, not the loss.

**Step 3 - CFF.** Borrowing +60, dividends -40 (financing under US GAAP), buyback -30 = **-10**.

**Step 4 - Net change in cash.** 260 - 95 - 10 = **155 thousand**, which must equal the change in the balance-sheet cash account.

**Step 5 - Direct-method check on two lines.** If revenue was 1,000 and COGS 600, cash from customers = 1,000 - 30 = 970, and cash paid to suppliers = 600 + (-15) - 20 = 565.

## Common exam traps
- Adding a gain on sale back to net income instead of subtracting it, which double counts the cash proceeds already in investing.
- Reversing the working-capital signs: asset increases reduce CFO; liability increases raise CFO.
- Putting dividends paid in operating under US GAAP; it is always financing there.
- Including non-cash transactions (debt-for-asset swaps, conversions) in investing or financing.
- Forgetting that the indirect and direct methods give the **same** CFO; the choice changes only how the operating section is presented, and investing and financing are identical under both.

## Key takeaways
- CFO, CFI and CFF together explain the change in cash on the balance sheet.
- US GAAP fixes interest and dividends received and interest paid in operating; IFRS gives choices.
- The indirect method starts from net income, removes non-cash items and adjusts for working capital.
- The direct method reports actual cash lines and is built from revenue, COGS and balance-sheet changes.
- Non-cash investing and financing activities are disclosed, not included in the totals.
