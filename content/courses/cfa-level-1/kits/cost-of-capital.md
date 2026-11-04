---
title: "Cost of Capital Foundations"
duration: 28
---

## Lecture outline
- 00:00 - Hook: the one number that decides every project at a company, and how a 1% error can flip decisions
- 03:00 - What WACC is and why it is a hurdle rate for average-risk projects
- 06:00 - Weights: target, market values, fallbacks
- 09:00 - Cost of debt: YTM, matrix pricing, tax adjustment
- 13:00 - Cost of preferred stock
- 15:00 - Cost of equity: CAPM, DDM, bond yield plus risk premium
- 20:00 - Whiteboard: Tern Industries full WACC build
- 25:00 - Exam traps and recap

## Slides
### Slide 1: The Hurdle Rate
- Investors require a return for every dollar of capital
- WACC blends those required returns
- Projects must beat WACC to create value (if average risk)

### Slide 2: WACC Formula
- $\text{WACC} = w_d r_d (1-t) + w_p r_p + w_e r_e$
- Weights sum to 1
- Only debt gets the tax adjustment

### Slide 3: Choosing Weights
- Target capital structure at market values
- Fallbacks: current market-value structure, trends, peer averages
- Avoid book values

### Slide 4: Cost of Debt
- Use current YTM, not the old coupon
- Thinly traded bonds: matrix pricing from similar rating and maturity
- After-tax: $r_d(1-t)$

### Slide 5: Cost of Preferred Stock
- Perpetual fixed dividend, valued as a perpetuity
- $r_p = D_p / P_p$
- No tax deduction for preferred dividends

### Slide 6: Cost of Equity - CAPM
- $r_e = R_f + \beta[E(R_m) - R_f]$
- Inputs: risk-free rate, beta, equity risk premium
- Most widely used approach

### Slide 7: Cost of Equity - DDM
- $r_e = D_1/P_0 + g$
- Dividend yield plus growth
- Use next year's dividend, $D_1 = D_0(1+g)$

### Slide 8: Bond Yield Plus Risk Premium
- $r_e = r_d + \text{premium}$
- Premium typically 3% to 5%
- Quick sanity check on other estimates

### Slide 9: Tern Industries
- Debt 6.97% pre-tax, 5.23% after tax
- Preferred 8.00%; equity 10.10% (CAPM)
- WACC 8.43%

### Slide 10: When WACC Is the Wrong Rate
- Projects riskier or safer than the firm's average
- New divisions in different industries
- Adjust the discount rate to the project's risk

## Whiteboard examples
**Example 1 - Tern Industries WACC.** Target weights 30% debt, 10% preferred, 60% equity; tax 25%.
- Bond: N = 5, PMT = 6, FV = 100, PV = −96 gives I/Y = 6.97%; after tax 5.23%.
- Preferred: 5.00 / 62.50 = 8.00%.
- CAPM: 3.5% + 1.2 × 5.5% = 10.10%.
- WACC = 0.30 × 5.23% + 0.10 × 8.00% + 0.60 × 10.10% = 1.57% + 0.80% + 6.06% = 8.43%.
- Without tax shield: 0.30 × 6.97% + 0.80% + 6.06% = 8.95%.

**Example 2 - Triangulating the cost of equity.**
- DDM: D0 = 2.00, g = 5%, P0 = 40: D1 = 2.10; 2.10/40 + 5% = 10.25%.
- Bond yield plus 4%: 6.97% + 4% = 10.97%.
- CAPM 10.10%. Discuss: estimates span about 0.9 percentage points; judgement and consistency matter.

**Example 3 - Quick drill.** 40% debt at 7% pre-tax, 60% equity at 12%, tax 20%.
- WACC = 0.4 × 7% × 0.8 + 0.6 × 12% = 2.24% + 7.20% = 9.44%.

## Questions to ask students
- A bond's coupon is 4% but it now yields 6.5%. Which is the cost of debt? (6.5%, the current yield.)
- Why multiply only the debt component by (1 − t)? (Only interest is tax-deductible.)
- Preferred dividend 4.50, price 56.25: cost of preferred? (8.00%.)
- D0 = 1.80, g = 4%, P0 = 36: cost of equity by DDM? (1.872/36 + 4% = 9.20%.)
- Should a firm with a 9% WACC use 9% for a project in a much riskier industry? (No, use a higher, risk-adjusted rate.)

## Analogies
- WACC is the blended interest rate on a household's mortgage, car loan and money borrowed from family who expect a share of the upside.
- The tax shield is a discount coupon that only the debt aisle accepts.
- Triangulating the cost of equity is like three thermometers in one room: none is perfect, but together they tell you if one is broken.

## Recording tips
- Build the WACC as a table on screen: source, weight, cost, after-tax cost, contribution. Students can then reuse the template.
- Demonstrate the bond YTM keystrokes on the calculator, including the negative sign on PV.
- Repeat the D1 versus D0 warning when you reach the DDM; it is the most frequent mistake.
