---
title: "Capex and Depreciation Schedule"
duration: 20
---

## Lecture outline
- 00:00 - Hook: why a company can buy a 100 million factory and report almost no expense
- 02:00 - Capex versus depreciation: cash timing versus expense timing
- 04:30 - Forecasting capex: % of revenue, maintenance plus growth, project plans
- 07:00 - The depreciation waterfall and the half-year convention
- 10:00 - Excel formula for a waterfall cell
- 12:00 - Whiteboard: Northwind three-year waterfall and PP&E roll-forward
- 16:30 - Links to the three statements
- 18:30 - Recap and traps

## Slides
### Slide 1: Cash Now, Expense Later
- Capex capitalised as PP&E
- Depreciation expenses it over the useful life
- Schedule keeps both consistent
### Slide 2: Forecasting Capex
- Percentage of revenue
- Maintenance (about D&A) plus growth
- Explicit project plan
### Slide 3: Sanity Check
- Growing company: capex above D&A
- Capex below D&A for years: shrinking asset base
### Slide 4: Waterfall Structure
- Existing assets depreciate separately
- One row per capex vintage
- Total = column sum
### Slide 5: Half-Year Convention
- Year-of-spend charge = capex / life / 2
- Assumes spending spread through the year
- Full charge from the next year
### Slide 6: Excel Waterfall Cell
- `=IF(F$3<$C10,0,IF(F$3=$C10,$D10/$E10/2,$D10/$E10))`
- Mixed references let one formula fill the triangle
- Add a cap for fully depreciated vintages
### Slide 7: Northwind Inputs (USD m)
- Opening PP&E 200.0; existing depreciation 20.0 per year
- Capex 44.0, 47.0, 50.0; life 10 years
### Slide 8: Northwind Waterfall
- D&A 22.20, 26.75, 31.60
- PP&E 221.80, 242.05, 260.45
### Slide 9: Links
- D&A to the income statement: EBIT 96.25 in FY2026E
- Capex to investing cash flow
- PP&E to the balance sheet
### Slide 10: Key Takeaways
- Vintages, half-year, roll-forward
- Check capex against D&A

## Whiteboard examples
**Example 1: Waterfall.** FY2026E: 20 + 44/10/2 = 22.20. FY2027E: 20 + 4.40 + 47/10/2 = 26.75. FY2028E: 20 + 4.40 + 4.70 + 50/10/2 = 31.60.

**Example 2: Roll-forward.** 200.0 + 44.0 - 22.20 = 221.80; + 47.0 - 26.75 = 242.05; + 50.0 - 31.60 = 260.45.

**Example 3: Common mistake.** Full-year depreciation on 2027 capex in 2027 gives 20 + 4.40 + 4.70 = 29.10 instead of 26.75: D&A overstated by 2.35.

## Questions to ask students
- Where does capex appear in the three statements? (Investing cash outflow and an increase in PP&E; never directly on the income statement.)
- Why use the half-year convention? (Capex is spread through the year, so on average assets are in service for half of it.)
- What does capex consistently below D&A suggest? (The asset base is shrinking or the company is under-investing.)
- If PP&E is rolled forward without depreciation, what happens? (Assets are overstated and the balance sheet will not balance.)
- What is FY2027E depreciation on the FY2026 vintage? (A full year: 4.40.)

## Analogies
- Capex is buying a season pass; depreciation is the cost of each match you attend.
- The waterfall is a set of stacked layers of paint: each year adds a new layer that wears away slowly.
- Maintenance capex is like replacing tyres; growth capex is buying a second car.

## Recording tips
- Build the triangle visually one row at a time; students grasp the staircase quickly when they see it grow.
- Highlight the mixed references in the waterfall formula with colour.
- Close by linking 22.20 back to the income statement so students see the model knitting together.
