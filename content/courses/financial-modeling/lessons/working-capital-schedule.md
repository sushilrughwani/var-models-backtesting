---
title: "The Working Capital Schedule"
---

## Learning goals
- Forecast receivables, inventory and payables using days-based drivers.
- Calculate net working capital and its year-on-year change.
- Explain the sign of the working capital adjustment in the cash flow statement.
- Assess how changes in DSO, DIO and DPO affect cash generation.

## Explanation

### Why working capital matters
Profit is not cash. When Northwind sells a part on 50-day credit terms, revenue is booked today but cash arrives later; meanwhile it must hold inventory and it gets some credit from its own suppliers. The net amount of cash tied up in this operating cycle is **net working capital (NWC)**. A growing business usually needs more working capital every year, which absorbs cash even while profits rise. The working capital schedule turns the days ratios we calculated from the historicals into forecast balance sheet items and a cash flow line.

### The days-based method
Rearranging the ratios from the historical lesson:

$$
AR_t = \frac{DSO_t}{365} \times \text{Revenue}_t \qquad \text{Inv}_t = \frac{DIO_t}{365} \times COGS_t \qquad AP_t = \frac{DPO_t}{365} \times COGS_t
$$

where $AR$ is accounts receivable, $\text{Inv}$ is inventory and $AP$ is accounts payable. DSO, DIO and DPO are inputs (in blue), usually set by reference to recent history and any management targets.

$$
NWC_t = AR_t + \text{Inv}_t - AP_t \qquad \Delta NWC_t = NWC_t - NWC_{t-1}
$$

In a fuller model NWC also includes prepaid expenses and accrued liabilities, often forecast as a percentage of revenue or operating costs. Cash and debt are excluded, because they are handled in the cash and debt schedules.

### The sign rule
An increase in an operating asset (receivables, inventory) uses cash. An increase in an operating liability (payables) provides cash. So in the cash flow statement:

$$
\text{Cash impact} = -\Delta NWC
$$

A rising NWC is a cash outflow; a falling NWC is a cash inflow.

### Excel layout
With FY2026E in column E, revenue on row 8, COGS on row 9 and the day inputs on rows 40 to 42:

- Receivables: `=E40/365*E8`
- Inventory: `=E41/365*E9`
- Payables: `=E42/365*E9`
- NWC: `=E44+E45-E46`
- Cash flow line: `=-(E47-D47)`

Some modellers use 360 days; whichever you choose, use it consistently for history and forecast.

## Worked example
Northwind (USD m). FY2025A balances: AR 68.5, inventory 63.6, payables 39.7, so NWC = 68.5 + 63.6 − 39.7 = 92.4. FY2026E revenue is 545.9 and COGS is 312.91 (from the previous two lessons). Management targets faster collection, so the inputs are DSO 48, DIO 80 and DPO 52.

**Step 1: receivables.** 48 / 365 × 545.9 = 71.79.

**Step 2: inventory.** 80 / 365 × 312.91 = 68.58.

**Step 3: payables.** 52 / 365 × 312.91 = 44.58.

**Step 4: NWC.** 71.79 + 68.58 − 44.58 = 95.79.

**Step 5: change and cash impact.** ΔNWC = 95.79 − 92.40 = 3.39. The cash flow statement shows **−3.39**: working capital absorbs 3.39 of cash.

**Breaking it down.** Receivables rose 3.29 (cash use), inventory rose 4.98 (cash use) and payables rose 4.88 (cash source): −3.29 − 4.98 + 4.88 = −3.39.

**What if DSO had stayed at 50?** Receivables would be 50 / 365 × 545.9 = 74.78, so NWC would be 2.99 higher and the cash outflow 6.38. Two days of faster collection released about 3.0 of cash. This is why management teams focus on credit control.

## Common exam traps
- Getting the cash flow sign backwards: an increase in receivables or inventory reduces cash.
- Applying DIO or DPO to revenue instead of COGS.
- Including cash or short-term debt in NWC, which double counts items handled elsewhere.
- Switching between 360 and 365 days between history and forecast.
- Using the NWC level, rather than its change, in the cash flow statement.

## Key takeaways
- Forecast AR from revenue and DSO; inventory and payables from COGS, DIO and DPO.
- NWC = receivables + inventory − payables (plus other operating items).
- The cash flow impact is the negative of the change in NWC.
- Northwind's FY2026E NWC rises by 3.39 (USD m), a cash outflow.
- Small changes in days can move cash materially.
