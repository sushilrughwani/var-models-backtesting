---
title: "Forecasting Operating Costs and Margins"
duration: 20
---

## Lecture outline
- 00:00 - Hook: two companies with identical margins and opposite fortunes in a recession
- 02:00 - Why a constant margin assumption is risky
- 04:00 - Fixed versus variable costs and contribution margin
- 07:00 - Degree of operating leverage
- 10:00 - Practical drivers for COGS, SG&A and R&D; Excel formulas
- 12:30 - Whiteboard: Northwind FY2026E costs and EBITDA
- 16:30 - Whiteboard: the downside case
- 18:30 - Recap and traps

## Slides
### Slide 1: Same Margin, Different Risk
- Margin today says little about margin tomorrow
- Cost structure decides how profits react
### Slide 2: Variable and Fixed Costs
- Variable: materials, freight, commissions
- Fixed: rent, salaried staff, systems
- EBITDA = revenue - v x revenue - F
### Slide 3: Contribution Margin
- Contribution margin = 1 - v
- Share of each extra sale that covers fixed costs and profit
- Not the same as gross margin
### Slide 4: Operating Leverage
- DOL = contribution / EBITDA
- Approximately % change EBITDA / % change revenue
- High fixed costs, high DOL
### Slide 5: Northwind Cost Split (FY2025, USD m)
- COGS 290 = 46% variable + 60 fixed
- SG&A 110 = 4% variable + 90 fixed
- Contribution 250, EBITDA 100, DOL 2.5
### Slide 6: Excel Build
- Variable: `=E8*$C$30`
- Fixed: `=D31*(1+$C$32)`
- EBITDA: `=E8-E33`
### Slide 7: FY2026E Result
- COGS 312.91, SG&A 114.54
- EBITDA 118.45, margin 21.7%
- Revenue +9.18%, EBITDA +18.45%
### Slide 8: Why Not 2.5x?
- Fixed costs rose with 3% inflation
- With flat fixed costs: EBITDA 122.95, +22.95%
### Slide 9: The Downside
- Revenue -10% to 450, fixed costs flat
- EBITDA 75.0, down 25%
- Constant 20% margin would say 90.0
### Slide 10: Key Takeaways
- Split costs before forecasting
- DOL explains margin moves
- Test the downside with drivers

## Whiteboard examples
**Example 1: FY2026E EBITDA.** Revenue 545.9. COGS = 0.46 x 545.9 + 60 x 1.03 = 251.11 + 61.80 = 312.91. SG&A = 0.04 x 545.9 + 90 x 1.03 = 21.84 + 92.70 = 114.54. EBITDA = 545.9 - 312.91 - 114.54 = 118.45; margin 21.7%.

**Example 2: Operating leverage check.** DOL = 250 / 100 = 2.5. Flat fixed costs: EBITDA = 272.95 - 150 = 122.95 (+22.95% = 2.5 x 9.18%). With 3% fixed-cost inflation, EBITDA growth is 18.45%, about 2.0 times revenue growth.

**Example 3: Downside.** Revenue 450.0. Contribution 225.0. EBITDA 75.0 (-25%). Constant-margin approach: 450 x 20% = 90.0. Overstatement 15.0.

## Questions to ask students
- A business has a contribution margin of 50% and EBITDA of 100 on revenue of 500. What is its DOL? (2.5.)
- If revenue falls 10% and DOL is 2.5, roughly how much does EBITDA fall? (About 25%, with fixed costs flat.)
- Why did Northwind's EBITDA grow by less than 2.5 times revenue growth? (Fixed costs grew with inflation.)
- Is rent fixed for ever? (No; it rises with inflation and steps up when capacity is added.)
- What is the difference between gross margin and contribution margin? (Gross margin deducts all COGS including fixed plant costs; contribution margin deducts only variable costs, including variable SG&A.)

## Analogies
- Fixed costs are a gym membership: the more you use it, the cheaper each visit becomes; skip a month and you still pay.
- Operating leverage is a seesaw with the pivot near one end: a small push on revenue creates a big swing in profit.
- A constant-margin forecast is like assuming your car uses the same fuel per mile uphill and downhill.

## Recording tips
- Use a simple two-bar chart of fixed and variable costs to make the split visual.
- Stress the downside example; students tend to only model growth.
- Keep 545.9 and 118.45 on screen as anchors for later lessons.
