---
title: "Risk Budgeting and Monitoring"
---

## Learning goals
- Explain the risk budgeting process: risk planning, risk budgeting and risk monitoring.
- Distinguish absolute risk (VaR, surplus at risk) from relative risk (tracking error) and choose the right one for each mandate.
- Calculate the optimal allocation of active risk across managers using information ratios.
- Calculate surplus at risk for a pension fund.
- Describe what an independent risk monitoring unit checks and the warning signs it looks for.

## Explanation

### Why budget risk instead of capital?
A traditional asset allocation says "40% to equities, 10% to hedge funds". Capital weights hide how much risk each piece carries: a 10% allocation to a leveraged strategy can consume a third of total risk. **Risk budgeting** turns the question around: decide how much total risk the fund can bear, then allocate that risk to asset classes and managers where it earns the most return. The tools come straight from the previous lesson: component VaR tells you how much of the budget each position uses, and marginal VaR tells you what an extra dollar costs in risk.

### Three stages
1. **Risk planning**: set the expected return and the acceptable volatility or VaR, define what counts as a loss severe enough to trigger action, and agree on governance (who can change limits, how breaches are escalated).
2. **Risk budgeting**: translate the total budget into limits per asset class, manager and strategy so that expected return per unit of risk is maximised.
3. **Risk monitoring**: measure actual risk against the budget, investigate deviations and enforce limits.

### Absolute versus relative risk
A hedge fund or total-return fund cares about **absolute risk**, such as VaR of the portfolio value. A pension fund cares about assets *relative to liabilities*. Its key measure is **surplus at risk**:

$$
\sigma_S = \sqrt{\sigma_A^2 + \sigma_L^2 - 2\rho_{AL}\,\sigma_A\sigma_L}, \qquad \text{SaR} = z_\alpha\,\sigma_S
$$

where $\sigma_A$ and $\sigma_L$ are the dollar volatilities of assets and liabilities and $\rho_{AL}$ their correlation. The minus sign matters: assets that move with liabilities (such as long-duration bonds) *reduce* surplus risk. A manager benchmarked to an index cares about **relative risk**, measured by tracking error $\omega$, the volatility of active return $R_P - R_B$.

### Allocating active risk across managers
Each active manager $i$ has an information ratio $IR_i = \alpha_i/\omega_i$, the alpha earned per unit of tracking error. If manager alphas are uncorrelated, the sponsor maximises total alpha for a given total tracking-error budget $\omega_P$ by giving each manager active risk proportional to its IR:

$$
\omega_i^* = \frac{IR_i}{IR_P}\,\omega_P, \qquad IR_P = \sqrt{\sum_i IR_i^2}
$$

where $IR_P$ is the information ratio of the combined active portfolio. The total active risk is $\sqrt{\sum \omega_i^2} = \omega_P$, and expected total alpha is $IR_P \times \omega_P$. If a manager naturally runs tracking error $\omega_i^{own}$, the fund's weight in that manager is $\omega_i^*/\omega_i^{own}$, with the rest held passively in the benchmark.

### Risk monitoring
An independent **risk management unit** (separate from portfolio managers) checks:
- Compliance with mandates and limits, including leverage, concentration and liquidity.
- Realised versus budgeted tracking error. Risk far above budget suggests unauthorised bets; risk far *below* budget suggests closet indexing, so the fund is paying active fees for passive exposure.
- **Style drift**: a value manager quietly buying growth stocks.
- Valuation of illiquid positions and the quality of risk models.
- Return attribution, so that profits are explained by the bets the manager says it is taking.

Large unexpected gains deserve the same scrutiny as losses; they often reveal risks nobody budgeted for.

## Worked example
A sponsor has a total active-risk budget of 3% and two managers with uncorrelated alphas: manager 1 has $IR_1 = 0.5$ and runs 5% tracking error on its own; manager 2 has $IR_2 = 0.3$ and runs 4%.

**Step 1: combined IR.** $IR_P = \sqrt{0.5^2 + 0.3^2} = \sqrt{0.34} = 0.5831$.

**Step 2: active-risk allocations.**
$\omega_1^* = (0.5/0.5831) \times 3\% = 2.572\%$; $\omega_2^* = (0.3/0.5831) \times 3\% = 1.543\%$.
Check: $\sqrt{2.572^2 + 1.543^2} = 3.00\%$.

**Step 3: expected alpha.** $0.5 \times 2.572\% + 0.3 \times 1.543\% = 1.749\%$, which equals $0.5831 \times 3\%$. Splitting the budget equally (2.121% each) would give only 1.697%.

**Step 4: fund weights.** Manager 1: $2.572/5 = 51.4\%$; manager 2: $1.543/4 = 38.6\%$; the remaining **10.0%** goes to a passive index fund.

## Common exam traps
- Allocating active risk proportionally to IR but adding tracking errors linearly; uncorrelated risks add in squares.
- Using a plus sign for the asset-liability covariance in surplus at risk.
- Treating very low realised tracking error as good news; it may signal closet indexing.
- Confusing the manager's active-risk allocation with the fund's capital weight in that manager.
- Letting the portfolio managers monitor their own risk; the unit must be independent.

## Key takeaways
- Risk budgeting allocates a total risk budget, not capital, to where it earns the most return.
- The process runs through planning, budgeting and monitoring.
- Pension funds use surplus at risk; benchmarked mandates use tracking error.
- With uncorrelated alphas, active risk should be proportional to each manager's IR, and $IR_P = \sqrt{\sum IR_i^2}$.
- Independent monitoring checks limits, realised versus budgeted risk, style drift and valuation.
