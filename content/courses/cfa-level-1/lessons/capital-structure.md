---
title: "Capital Structure"
---

## Learning goals
- State the Modigliani-Miller (MM) propositions with and without corporate taxes and explain their assumptions.
- Calculate the value of a levered firm, its cost of equity and its weighted average cost of capital (WACC) under MM with taxes.
- Explain the static trade-off theory, the pecking order theory and the role of agency costs and signalling.
- Identify the internal and external factors that drive a company's leverage, including its stage in the life cycle.

## Explanation

### The MM world without taxes
Imagine perfect capital markets: no taxes, no bankruptcy costs, no transaction costs, symmetric information and investors who can borrow at the same rate as firms. In that world:

**Proposition I (no taxes):** the value of a firm does not depend on how it is financed.

$$
V_L = V_U
$$

where $V_L$ is the value of the levered firm and $V_U$ the value of the identical unlevered firm. Slicing a pizza differently does not make it bigger.

**Proposition II (no taxes):** the cost of equity rises linearly with leverage.

$$
r_e = r_0 + (r_0 - r_d)\frac{D}{E}
$$

where $r_e$ is the cost of equity, $r_0$ the cost of capital of an all-equity firm, $r_d$ the cost of debt and $D/E$ the debt-to-equity ratio (market values). Debt is cheaper than equity, but adding it makes the remaining equity riskier by exactly enough to keep the WACC constant at $r_0$.

### Adding corporate taxes
Interest is tax-deductible, so debt creates a **tax shield** that the government effectively pays to the firm's investors.

**Proposition I (with taxes):**

$$
V_L = V_U + tD
$$

**Proposition II (with taxes):**

$$
r_e = r_0 + (r_0 - r_d)(1 - t)\frac{D}{E}
$$

where $t$ is the marginal corporate tax rate and $tD$ is the present value of a perpetual tax shield. Now the WACC falls as debt rises, and taken literally MM implies an all-debt firm is optimal. Reality says otherwise, because debt has costs.

### Costs of debt: distress and agency
**Costs of financial distress** include direct costs (legal and administrative fees in bankruptcy) and indirect costs (lost customers and suppliers, managers forgoing good projects, employees leaving). Their expected value grows with leverage and is higher for firms with intangible assets or volatile cash flows.

**Agency costs** also matter. Debt can reduce the agency cost of equity by forcing managers to pay out free cash flow rather than waste it, but too much debt brings shareholder-creditor conflicts such as risk shifting.

### Static trade-off theory
The firm adds debt until the marginal tax benefit equals the marginal expected cost of distress:

$$
V_L = V_U + tD - \text{PV(costs of financial distress)}
$$

This gives an **optimal (target) capital structure** at which firm value is maximised and WACC is minimised. Firms drift around their target as markets move and use it when deciding how to finance new investment.

### Pecking order and signalling
Managers know more than investors. Issuing equity can signal that managers think the shares are overvalued, so the market reacts negatively. The **pecking order theory** says firms prefer **internal funds first, then debt, and new equity last**. Taking on debt can also be a positive signal of confidence that cash flows will cover interest.

### What drives leverage in practice?
- **Business risk and asset tangibility**: stable cash flows and collateral-friendly assets support more debt.
- **Life cycle**: start-ups rely on equity (negative cash flow, few tangible assets); growth firms add some secured or convertible debt; mature firms with steady cash flows carry the most debt.
- **Taxes, credit ratings, covenants and market conditions**, including the current level of interest rates.
- **Management preferences** and peer-group norms.

## Worked example
Gannet Corp has an unlevered value of 500 million, an unlevered cost of capital of 10% and a 25% tax rate. It issues 200 million of perpetual debt at 6% and uses the proceeds to repurchase shares. Assume MM with corporate taxes.

**Step 1 - Firm value.** $V_L = 500 + 0.25 \times 200 = 550$ million.

**Step 2 - Equity value.** $E = 550 - 200 = 350$ million, so $D/E = 200/350 = 0.5714$.

**Step 3 - Cost of equity.**

$$
r_e = 0.10 + (0.10 - 0.06)(0.75)(0.5714) = 0.10 + 0.01714 = 0.11714
$$

So $r_e$ = **11.71%**.

**Step 4 - WACC.**

$$
\text{WACC} = \frac{200}{550}(0.06)(0.75) + \frac{350}{550}(0.11714) = 0.01636 + 0.07455 = 0.09091
$$

WACC = **9.09%**, down from 10% when unlevered. The tax shield worth 50 million is exactly why value rose and WACC fell.

**Comparison without taxes:** value stays 500, equity is 300, $r_e = 0.10 + 0.04 \times 200/300 = 12.67\%$, and WACC stays 10%.

## Common exam traps
- Forgetting the $(1-t)$ term in Proposition II with taxes, or wrongly adding it in the no-tax version.
- Using book values for $D/E$; MM uses market values.
- Concluding that because the cost of debt is lower, adding debt always lowers WACC. Without taxes it does not; with distress costs it eventually rises.
- Reversing the pecking order: new equity is the last resort, not the first.
- Assuming start-ups should borrow heavily because debt is cheap; unstable cash flows make distress costs prohibitive.

## Key takeaways
- MM without taxes: capital structure is irrelevant; the cost of equity rises to offset cheaper debt.
- MM with taxes: $V_L = V_U + tD$, and WACC falls with leverage.
- Trade-off theory balances tax shields against distress costs to give an optimal target structure.
- Pecking order: internal funds, then debt, then equity, because of information asymmetry.
- Leverage depends on business risk, asset tangibility, life-cycle stage, taxes and market conditions.
