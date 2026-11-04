---
title: "Cost of Capital Foundations"
---

## Learning goals
- Calculate a company's weighted average cost of capital (WACC) and explain the role of the tax shield on debt.
- Estimate the after-tax cost of debt using the yield to maturity on existing bonds.
- Calculate the cost of preferred stock.
- Estimate the cost of equity using the CAPM, the dividend discount model and the bond-yield-plus-risk-premium approach.
- Explain which weights to use and how WACC serves as a hurdle rate for projects of average risk.

## Explanation

### What WACC represents
The cost of capital is the return investors require for supplying funds. A company is financed by a mix of debt, preferred stock and common equity, each with its own required return. The **WACC** blends them using the target capital structure:

$$
\text{WACC} = w_d\, r_d (1 - t) + w_p\, r_p + w_e\, r_e
$$

where $w_d$, $w_p$, $w_e$ are the weights of debt, preferred and common equity (summing to 1), $r_d$ is the before-tax cost of debt, $t$ is the marginal tax rate, $r_p$ is the cost of preferred stock and $r_e$ is the cost of common equity. Debt is multiplied by $(1-t)$ because interest is tax-deductible; preferred dividends and common dividends are not.

WACC is the **hurdle rate** for projects with the same risk as the firm's existing business. Projects that are riskier (or safer) need an adjusted rate.

### Weights
Use the **target** capital structure, measured at **market values**. If no target is disclosed, analysts use the current market-value structure, trends in the firm's structure, or peer averages. Book values are a poor substitute because they do not reflect what investors would pay today.

### Cost of debt
The cost of debt is the rate at which the firm could borrow **now**, not the coupon on old debt. The standard estimate is the **yield to maturity** on the firm's existing bonds; if the bonds trade rarely, use **matrix pricing** (yields on bonds with similar rating and maturity). The after-tax cost is $r_d(1-t)$.

### Cost of preferred stock
Fixed-rate perpetual preferred stock is valued like a perpetuity, so

$$
r_p = \frac{D_p}{P_p}
$$

where $D_p$ is the annual preferred dividend and $P_p$ is the current preferred share price.

### Cost of common equity
Equity has no promised cash flow, so its cost must be estimated. Three common approaches:

**CAPM:**

$$
r_e = R_f + \beta\,[E(R_m) - R_f]
$$

where $R_f$ is the risk-free rate, $\beta$ is the stock's beta and $E(R_m) - R_f$ is the equity risk premium.

**Dividend discount model (constant growth):**

$$
r_e = \frac{D_1}{P_0} + g
$$

where $D_1$ is next year's expected dividend, $P_0$ is the current share price and $g$ is the long-run dividend growth rate.

**Bond yield plus risk premium:** $r_e = r_d + \text{risk premium}$, where the premium (typically 3% to 5%) compensates for equity's extra risk over the firm's own debt.

Analysts often compute all three and use judgement to settle on one estimate.

## Worked example
Tern Industries has a target structure of 30% debt, 10% preferred stock and 60% common equity. Its marginal tax rate is 25%.

- **Debt**: 5-year bonds with a 6% annual coupon trade at 96.00 per 100 of par.
- **Preferred**: annual dividend of 5.00, share price 62.50.
- **Equity**: risk-free rate 3.5%, beta 1.2, equity risk premium 5.5%.

**Step 1 - Before-tax cost of debt.** Solve for the yield that sets the bond price to 96: N = 5, PMT = 6, FV = 100, PV = -96, CPT I/Y = 6.97%. So $r_d$ = 6.97%.

**Step 2 - After-tax cost of debt.** 6.97% × (1 - 0.25) = 5.23%.

**Step 3 - Cost of preferred.** $r_p$ = 5.00 / 62.50 = 8.00%.

**Step 4 - Cost of equity (CAPM).** $r_e$ = 3.5% + 1.2 × 5.5% = 3.5% + 6.6% = 10.10%.

Cross-checks: if the stock trades at 40 with a just-paid dividend of 2.00 growing at 5%, the DDM gives 2.10/40 + 5% = 10.25%. Bond yield plus a 4% premium gives 6.97% + 4% = 10.97%. The CAPM estimate sits in a sensible range, so we use 10.10%.

**Step 5 - WACC.**

$$
\begin{aligned}
\text{WACC} &= 0.30(5.23\%) + 0.10(8.00\%) + 0.60(10.10\%) \\
&= 1.57\% + 0.80\% + 6.06\% = 8.43\%
\end{aligned}
$$

Tern's WACC is **8.43%**. Forgetting the tax shield would overstate it at 8.95%.

## Common exam traps
- Using the coupon rate instead of the current yield to maturity as the cost of debt.
- Applying $(1-t)$ to preferred stock or equity; only interest is deductible.
- Using $D_0$ instead of $D_1 = D_0(1+g)$ in the dividend discount model.
- Using book-value weights when market values or a target structure are available.
- Using the firm's WACC for a project that is much riskier than the firm's typical business.

## Key takeaways
- WACC = $w_d r_d(1-t) + w_p r_p + w_e r_e$, using target market-value weights.
- Cost of debt is the current YTM (or matrix-priced yield), adjusted for tax.
- Cost of perpetual preferred = dividend / price.
- Cost of equity can be estimated with CAPM, the DDM or bond yield plus a risk premium; compare the results.
- WACC is the hurdle rate for average-risk projects only.
