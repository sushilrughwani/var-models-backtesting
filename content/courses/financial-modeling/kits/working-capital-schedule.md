---
title: "The Working Capital Schedule"
duration: 20
---

## Lecture outline
- 00:00 - Hook: a profitable company that ran out of cash
- 02:00 - What net working capital is and why growth consumes it
- 04:30 - Days-based formulas for receivables, inventory and payables
- 08:00 - NWC, change in NWC and the sign rule
- 10:30 - Excel layout of the schedule
- 12:30 - Whiteboard: Northwind FY2026E schedule
- 16:30 - Whiteboard: value of two days of faster collection
- 18:30 - Recap and traps

## Slides
### Slide 1: Profit Is Not Cash
- Sales on credit create receivables
- Inventory is bought before it is sold
- Suppliers provide some credit back
### Slide 2: Net Working Capital
- NWC = AR + inventory - AP (plus other operating items)
- Excludes cash and debt
- Growing firms usually need more NWC
### Slide 3: Days-Based Forecasts
- AR = DSO / 365 x revenue
- Inventory = DIO / 365 x COGS
- AP = DPO / 365 x COGS
### Slide 4: The Sign Rule
- Asset up: cash down
- Liability up: cash up
- Cash flow line = -(NWC this year - NWC last year)
### Slide 5: Excel Formulas
- `=E40/365*E8` for receivables
- `=E41/365*E9` and `=E42/365*E9`
- `=-(E47-D47)` for the cash flow line
### Slide 6: Northwind Inputs (FY2026E)
- Revenue 545.9, COGS 312.91
- DSO 48, DIO 80, DPO 52
- FY2025A NWC 92.4
### Slide 7: Northwind Results
- AR 71.79, inventory 68.58, AP 44.58
- NWC 95.79, change +3.39
- Cash flow impact -3.39
### Slide 8: Days Are Cash
- DSO 50 instead of 48: outflow 6.39
- Two days of collection = about 3.0 of cash
### Slide 9: Key Takeaways
- Use the right denominator
- Get the sign right
- Days targets are value levers

## Whiteboard examples
**Example 1: FY2026E schedule.** AR = 48/365 x 545.9 = 71.79. Inventory = 80/365 x 312.91 = 68.58. AP = 52/365 x 312.91 = 44.58. NWC = 95.79. Prior NWC = 68.5 + 63.6 - 39.7 = 92.4. Change = +3.39; cash flow line = -3.39. Check by component: -3.29 (AR) - 4.98 (inventory) + 4.88 (AP) = -3.39.

**Example 2: Collection effort.** DSO 50: AR = 74.78, which is 2.99 higher. Cash outflow becomes 3.39 + 2.99 = 6.39. Two days of DSO are worth about 3.0 of cash in one year.

## Questions to ask students
- Payables rise by 5. Is that a cash inflow or outflow? (Inflow: the company is paying suppliers later.)
- Why is cash excluded from NWC in the schedule? (It is the output of the cash flow statement, so including it would be circular double counting.)
- If DIO rises from 80 to 90, what happens to cash? (Inventory rises, so cash falls.)
- Which number goes into the cash flow statement: NWC or its change? (The negative of the change.)
- Should you forecast receivables from COGS? (No, from revenue.)

## Analogies
- Working capital is the water held in a pipe: the longer the pipe (more days), the more water sits inside before anything comes out the end.
- Supplier credit is an interest-free loan; customer credit is a loan you give away.
- A fast-growing business is like a bucket with a hole being filled faster: you need more water in it just to keep up.

## Recording tips
- Draw the cash conversion timeline (buy, sell, collect, pay) before showing formulas.
- Repeat the sign rule several times; it is the most common error.
- Show the component check (-3.29 - 4.98 + 4.88) so students trust the net number.
