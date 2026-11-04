---
title: "Revenue Forecasting Methods"
duration: 22
---

## Lecture outline
- 00:00 - Hook: every line in the model hangs off revenue
- 02:00 - Top-down: market size times share
- 05:00 - Bottom-up: building from operating units
- 08:00 - Driver-based: volume times price, and why growth rates multiply
- 11:30 - Excel build of the Northwind driver block
- 14:30 - Whiteboard: three-year forecast and growth decomposition
- 18:00 - Whiteboard: top-down cross-check
- 20:30 - Recap and traps

## Slides
### Slide 1: Revenue Drives Everything
- Variable costs, working capital and capex follow revenue
- A one-point growth error compounds through the model
- Spend the most time here
### Slide 2: Top-Down
- Revenue = market size x market share
- Good for new businesses and sanity checks
- Weakness: share is hard to justify
### Slide 3: Bottom-Up
- Build from products, customers, stores or plants
- Granular and defensible
- Risk: ignores market limits
### Slide 4: Driver-Based
- Revenue = volume x average selling price
- Growth: (1 + g volume)(1 + g price) - 1
- Debate drivers, not totals
### Slide 5: Northwind Inputs
- FY2025: 2.00m units at USD 250 = 500.0
- Volume growth 6%, 5%, 4%
- Price growth 3%, 2.5%, 2%
### Slide 6: Excel Formulas
- Units `=D20*(1+E17)`
- ASP `=D21*(1+E18)`
- Revenue `=E20*E21`
### Slide 7: Forecast Results (USD m)
- FY2026E 545.9, FY2027E 587.5, FY2028E 623.2
- Growth 9.18%, 7.63%, 6.08%
- Three-year CAGR 7.62%
### Slide 8: Top-Down Cross-Check
- Market 5,000 growing 5%; share 10.0% to 10.5%
- Implied FY2026E revenue 551.25
- Gap to bottom-up 5.35, about 1%
### Slide 9: Good Practice
- Converge growth to a sustainable long-run rate
- Check implied market share
- Never hard-code forecast revenue
### Slide 10: Key Takeaways
- Pick the method the evidence supports
- Cross-check with a second method
- Compound, do not add, growth components

## Whiteboard examples
**Example 1: Driver forecast.** Units: 2.00 x 1.06 = 2.120, x 1.05 = 2.226, x 1.04 = 2.315. ASP: 250 x 1.03 = 257.50, x 1.025 = 263.94, x 1.02 = 269.22. Revenue: 545.9, 587.5, 623.2. CAGR = (623.2 / 500)^(1/3) - 1 = 7.62%.

**Example 2: Additive versus multiplicative.** Adding 6% and 3% gives 500 x 1.09 = 545.0. Compounding gives 545.9. The 0.9 difference is the cross-term (6% x 3% x 500 = 0.9).

**Example 3: Top-down check.** 5,000 x 1.05 = 5,250 market; x 10.5% = 551.25. Bottom-up 545.9. Gap 5.35, or 0.98% of the bottom-up figure: consistent.

## Questions to ask students
- Why do volume and price growth multiply rather than add? (Revenue is a product of the two, so the cross-term matters.)
- When is top-down most useful? (When the company has little history or as a sanity check.)
- What does it mean if bottom-up revenue implies a 30% market share in a fragmented industry? (The volume assumptions are probably too aggressive.)
- Where should forecast growth head by the final year? (Towards a sustainable long-run rate, often near nominal GDP growth.)
- What are natural drivers for a subscription software firm? (Customers and revenue per customer, with churn.)

## Analogies
- Top-down is estimating your slice by measuring the whole pizza; bottom-up is counting the toppings on your slice.
- Volume and price are the length and width of a rectangle: grow both by a little and the area grows by more than the sum.
- A cross-check is like two witnesses telling the same story; if they disagree, someone is wrong.

## Recording tips
- Build the driver block in Excel live and show the formulas copying across.
- Make the 545.0 versus 545.9 point explicit; it reappears in exam-style questions.
- Tell students to remember 545.9: it is Northwind's FY2026E revenue for the rest of the course.
