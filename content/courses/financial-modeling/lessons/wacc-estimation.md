---
title: "Estimating WACC in Practice"
---

## Learning goals
- Estimate the cost of equity with CAPM using a peer-based, relevered beta.
- Unlever and relever betas consistently with a target capital structure.
- Choose a market-based pre-tax cost of debt and convert it to an after-tax rate.
- Combine the components into WACC and lay out the calculation in Excel.

## Explanation

### Why WACC matches FCFF
FCFF from the previous lesson belongs to lenders and shareholders together, so the discount rate must be the return both groups require, weighted by how much each funds the business. That blended rate is the **weighted average cost of capital**:

$$
\text{WACC} = \frac{E}{D+E}\,k_e + \frac{D}{D+E}\,k_d\,(1-t)
$$

- $E$, $D$: market (or target) values of equity and debt.
- $k_e$: cost of equity.
- $k_d$: pre-tax cost of debt; $(1-t)$ reflects the tax deductibility of interest.

The weights should be **target** weights at market values: the capital structure the company will hold over the forecast, not today's book values. If management has no stated target, look at the current market-value mix and at peers.

### Cost of equity: CAPM

$$
k_e = r_f + \beta_L \times \text{ERP}
$$

- $r_f$: yield on a long-dated government bond in the same currency as the cash flows.
- $\text{ERP}$: equity risk premium, the extra return investors demand for holding equities over government bonds. House views differ; what matters is using one figure consistently.
- $\beta_L$: levered (equity) beta.

### Why bother unlevering?
A company's own regression beta is noisy and reflects its current leverage. Practitioners take betas from a peer group, strip out each peer's leverage, take the median and relever at the target structure. The common (Hamada-style) relationship, assuming debt carries no market risk, is:

$$
\beta_U = \frac{\beta_L}{1+(1-t)\,D/E}
\qquad
\beta_L = \beta_U\left[1+(1-t)\,D/E\right]
$$

where $\beta_U$ is the asset (unlevered) beta and $D/E$ is debt divided by equity, not debt divided by total capital.

### Cost of debt
Use the rate the company would pay to borrow long-term today: the yield to maturity on its traded bonds, or the risk-free rate plus a credit spread for its rating. The coupon on old debt is a historical number and is the wrong input.

### Excel layout
Put each input in a labelled cell on the Inputs sheet. With peer levered betas in B5:B7, peer D/E in C5:C7 and the tax rate in `$C$2`:
- Unlevered beta: `=B5/(1+(1-$C$2)*C5)`, filled down to row 7
- Median: `=MEDIAN(D5:D7)`
- Relevered beta: `=D8*(1+(1-$C$2)*C9)` where C9 holds the target D/E
- Cost of equity: `=C3+D10*C4` (risk-free rate in C3, ERP in C4)
- WACC: `=C12*D11+C13*C14*(1-$C$2)`

## Worked example
Northwind Components Ltd inputs: risk-free rate 4.2%, ERP 5.6%, tax rate 25%, target debt weight 25% of capital, and pre-tax cost of debt 6.0% (its BBB-rated notes trade at a 1.8% spread over the 4.2% government yield).

**Step 1 - Unlever peer betas.**

| Peer | Levered beta | D/E | Unlevered beta |
|---|---|---|---|
| Ashby Precision | 1.035 | 0.20 | 1.035 / 1.15 = 0.900 |
| Calder Motion | 1.209 | 0.40 | 1.209 / 1.30 = 0.930 |
| Fenwick Drives | 0.903 | 0.10 | 0.903 / 1.075 = 0.840 |

Median unlevered beta = 0.90.

**Step 2 - Target D/E.** A 25% debt weight means 75% equity, so D/E = 25 / 75 = 0.3333.

**Step 3 - Relever.** $\beta_L$ = 0.90 × (1 + 0.75 × 0.3333) = 0.90 × 1.25 = 1.125.

**Step 4 - Cost of equity.** 4.2% + 1.125 × 5.6% = 4.2% + 6.3% = 10.5%.

**Step 5 - After-tax cost of debt.** 6.0% × (1 − 0.25) = 4.5%.

**Step 6 - WACC.** 0.75 × 10.5% + 0.25 × 4.5% = 7.875% + 1.125% = **9.00%**.

**Sanity check.** At a share price of USD 27.50 and 50 million shares, market capitalisation is 1,375 million; with debt of 420 million the current market debt weight is 420 / 1,795 = 23.4%, close to the 25% target. Northwind's DCF will use 9.0%.

## Common exam traps
- Relevering with $D/(D+E)$ instead of $D/E$; for Northwind that gives a beta of 1.069 and a cost of equity near 10.19%.
- Averaging peers' levered betas directly, which imports their leverage instead of Northwind's.
- Using book-value weights or the coupon rate on old debt rather than market values and current yields.
- Forgetting the $(1-t)$ on debt, or applying it to the cost of equity.
- Mixing currencies: a USD cash flow forecast needs a USD risk-free rate.

## Key takeaways
- WACC is the discount rate for FCFF because both reflect all capital providers.
- Use target, market-value weights.
- Unlever peer betas, take the median and relever at the target D/E.
- Cost of debt is today's borrowing rate, after tax.
- Northwind: relevered beta 1.125, cost of equity 10.5%, after-tax cost of debt 4.5%, WACC 9.00%.
