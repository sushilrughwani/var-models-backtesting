---
title: "Setting Up Historical Financials and Ratios"
duration: 22
---

## Lecture outline
- 00:00 - Hook: "the forecast is only as good as the history it stands on"
- 02:00 - Laying out historicals in the model template
- 05:00 - Cleaning: mapping line items, non-recurring items, tie-outs
- 08:30 - Growth and CAGR
- 11:00 - Margins and underlying EBITDA
- 13:30 - Working capital days and the cash conversion cycle
- 17:00 - Whiteboard: Northwind FY2024 to FY2025 ratio analysis
- 20:30 - Recap and traps

## Slides
### Slide 1: History Anchors the Forecast
- Clean base year to forecast from
- Ratios become drivers
- Same rows and columns as the forecast
### Slide 2: Cleaning Checklist
- Map company labels to your template
- Separate non-recurring items
- Confirm statements balance and tie every year
### Slide 3: Non-Recurring Items
- Restructuring, impairments, litigation, disposal gains
- Show on a separate line
- Forecast underlying, reconcile to reported
### Slide 4: Growth Measures
- Annual growth = current / prior - 1
- CAGR = (end / start)^(1/n) - 1
- Cumulative growth is not annual growth
### Slide 5: Margin Drivers
- Gross margin, EBITDA margin
- SG&A as % of revenue
- Northwind underlying EBITDA margin: 18.2% to 20.0%
### Slide 6: Working Capital Days
- DSO = AR / revenue x 365
- DIO = inventory / COGS x 365
- DPO = AP / COGS x 365
### Slide 7: Cash Conversion Cycle
- CCC = DSO + DIO - DPO
- Northwind: 84.5 days to 80.1 days
- Fewer days means less cash tied up
### Slide 8: Investment and Tax Ratios
- Capex % revenue, D&A % revenue or PP&E
- Effective tax = tax / pre-tax income (Northwind 25.0%)
### Slide 9: Excel Layout
- Growth `=D5/C5-1`, gross margin `=D7/D5`
- DSO `=D20/D5*365`
- Same formula copied across every year
### Slide 10: Key Takeaways
- Clean first, then calculate
- Use COGS for inventory and payables days
- History tells you which drivers matter

## Whiteboard examples
**Example 1: Growth.** Revenue 412.0, 452.0, 500.0. FY2024 growth 9.71%, FY2025 growth 10.62%. CAGR = (500 / 412)^(0.5) - 1 = 10.16%. Point out that cumulative growth is 21.36%, and dividing that by two (10.68%) is wrong.

**Example 2: Underlying margin.** FY2025 reported EBITDA after restructuring = 94.0 (18.8%). Add back 6.0: underlying EBITDA 100.0 (20.0%). Forecasting from 18.8% would understate every future year.

**Example 3: Working capital days.** FY2025: DSO = 68.5 / 500 x 365 = 50.0; DIO = 63.6 / 290 x 365 = 80.0; DPO = 39.7 / 290 x 365 = 50.0; CCC = 80.1 days. FY2024 CCC = 51.7 + 82.1 - 49.3 = 84.5 days.

## Questions to ask students
- Why is DIO measured against COGS rather than revenue? (Inventory is carried at cost, so the denominator must also be at cost.)
- A company booked a large gain on selling a building. Should it be in your base-year margin? (No; it is non-recurring and should be shown separately.)
- Revenue grew 21% over two years. Is annual growth 10.5%? (No; the CAGR is slightly lower, found with the root formula.)
- What does a falling cash conversion cycle mean? (The company converts sales into cash faster and ties up less working capital.)
- What must you check before forecasting from the historicals? (That every historical balance sheet balances and statements tie.)

## Analogies
- Historical ratios are a patient's medical history: a doctor would not prescribe without it.
- Non-recurring items are like a one-time lottery win in a salary history; you would not budget next year on it.
- The cash conversion cycle is the time your money spends "on holiday" between paying suppliers and collecting from customers.

## Recording tips
- Build the ratio block live in Excel so students see the same formula copied across.
- Pause on DIO and DPO denominators; it is the most frequent error.
- Show the reported versus underlying margin side by side to make the adjustment concrete.
