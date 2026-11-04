---
title: "Building Unlevered Free Cash Flow"
duration: 20
---

## Lecture outline
- 00:00 - Hook: two companies with identical operations but different debt have the same FCFF, so why do their net incomes differ?
- 02:00 - Whose cash is it: FCFF versus net income versus levered cash flow
- 05:00 - The formula from EBIT, line by line, and why interest is excluded
- 08:00 - Northwind 2026 build live in Excel (NOPAT, D&A, capex, NWC)
- 12:00 - Filling across 2027-2030 and checking the pattern
- 14:00 - The net income route and the reconciliation row
- 17:00 - Exam traps and recap

## Slides
### Slide 1: What We Are Valuing
- The operating business, before financing
- Cash available to lenders and shareholders together
- Discount at WACC to get enterprise value

### Slide 2: FCFF From EBIT
- $\text{FCFF} = \text{EBIT}(1-t) + \text{D\&A} - \text{Capex} - \Delta\text{NWC}$
- $\text{EBIT}(1-t)$ is NOPAT: tax as if debt-free
- Every input comes from a schedule you already built

### Slide 3: Why No Interest?
- Interest is a payment to one capital provider
- Its tax shield lives in the after-tax cost of debt in WACC
- Deducting it here counts financing twice

### Slide 4: Working Capital Sign
- NWC up: cash tied up, subtract
- NWC down: cash released, add
- Use the change, not the level

### Slide 5: Northwind Inputs (USD m)
- 2026E: EBIT 175, D&A 44, capex 56, NWC increase 10.5
- Tax rate 25%
- Year end 31 December

### Slide 6: Northwind 2026 FCFF
- NOPAT 131.25
- + 44 − 56 − 10.5
- FCFF = 108.75

### Slide 7: Five-Year FCFF
- 108.75, 119.75, 132.00, 138.50, 145.75
- Growth slows as revenue growth fades and NWC investment shrinks
- These feed the DCF in the next lessons

### Slide 8: From Net Income
- $\text{FCFF} = \text{NI} + \text{Int}(1-t) + \text{D\&A} - \text{Capex} - \Delta\text{NWC}$
- Add back after-tax interest only
- Build a reconciliation row: both routes must match

### Slide 9: Excel Pattern
- NOPAT: `=E10*(1-Inputs!$C$5)`
- FCFF: `=E11+E12-E13-E14`
- One sign convention, labelled

### Slide 10: Traps
- Taxing EBT instead of EBIT
- Full interest add-back
- Wrong NWC sign; financing flows inside FCFF

## Whiteboard examples
**Example 1 - Northwind 2026 FCFF (USD m).** EBIT 175, tax 25%, D&A 44, capex 56, NWC increase 10.5.
- NOPAT = 175 × 0.75 = 131.25
- FCFF = 131.25 + 44 − 56 − 10.5 = 108.75

**Example 2 - Northwind 2028 from EBITDA.** EBITDA 256, D&A 48, capex 62, NWC increase 10, tax 25%.
- EBIT = 256 − 48 = 208; NOPAT = 208 × 0.75 = 156.00
- FCFF = 156 + 48 − 62 − 10 = 132.00
- Show the wrong version: taxing EBITDA, 256 × 0.75 − 62 − 10 = 120.00, understates FCFF because D&A is a tax-deductible expense.

**Example 3 - Net income reconciliation, 2026.** Interest 25.0. EBT = 150; NI = 112.5.
- FCFF = 112.5 + 25 × 0.75 + 44 − 56 − 10.5 = 112.5 + 18.75 − 22.5 = 108.75, matching Example 1.

## Questions to ask students
- If Northwind doubled its debt tomorrow, what happens to FCFF? (Nothing, operations are unchanged; net income falls and the cost of capital changes instead.)
- Receivables rise by 8 in a year. Effect on FCFF? (Reduces it by 8, holding everything else constant.)
- Why add back only 75% of interest when starting from net income? (The other 25% came back already as lower tax.)
- Is a dividend payment deducted in FCFF? (No, it is a distribution to shareholders, a financing flow.)
- Which line would you check first if FCFF from EBIT and from net income differ? (Non-operating items inside net income, e.g. interest income or one-off gains.)

## Analogies
- Rental property: FCFF is rent minus costs, maintenance and tax, before the mortgage. The mortgage changes who gets the cash, not how much the building produces.
- Pizza before slicing: FCFF is the whole pizza; lenders and shareholders decide later how to cut it.
- Working capital as a sponge: a growing business soaks up cash in stock and receivables; when growth slows, the sponge stops absorbing.

## Recording tips
- Keep the Excel sheet on screen with the 2026 column highlighted, and type each formula live rather than revealing a finished block.
- Pause on the interest question; students who studied net income-based ratios find its absence counterintuitive.
- Show the reconciliation row turning to zero; it builds the habit of checks that the next lessons rely on.
