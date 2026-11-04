---
title: "Portfolio Risk: Analytical Methods"
---

## Learning goals
- Calculate diversified and undiversified parametric VaR for a portfolio of positions.
- Define and calculate marginal VaR, incremental VaR and component VaR.
- Explain why component VaRs add up exactly to portfolio VaR and how to read them as risk contributions.
- Use marginal VaR to decide which positions to cut or add and to identify the risk-minimising hedge.

## Explanation

### From stand-alone risk to portfolio risk
Earlier lessons estimated VaR for a single portfolio. A risk manager also needs to know *where* the risk comes from. Under the delta-normal approach, portfolio VaR is a multiple of the portfolio's standard deviation:

$$
\text{VaR}_p = z_\alpha\,\sigma_p\,W, \qquad \sigma_p^2 = \mathbf{w}^\top \Sigma\, \mathbf{w}
$$

where $z_\alpha$ is the normal quantile (1.645 at 95%), $W$ the portfolio value, $\mathbf{w}$ the vector of weights and $\Sigma$ the covariance matrix of returns. **Individual VaR** for position $i$ is $z_\alpha \sigma_i |x_i|$, with $x_i$ the amount invested. **Undiversified VaR** is the sum of individual VaRs, which equals diversified VaR only when all correlations are +1. The gap between the two is the diversification benefit.

### Marginal VaR
Marginal VaR answers: "If I add one more dollar to position $i$, how much does portfolio VaR rise?" It is the partial derivative of VaR with respect to $x_i$:

$$
\Delta\text{VaR}_i = \frac{\partial \text{VaR}_p}{\partial x_i} = z_\alpha\,\frac{\text{cov}(R_i, R_p)}{\sigma_p} = \beta_i\,\frac{\text{VaR}_p}{W}
$$

where $\beta_i = \text{cov}(R_i, R_p)/\sigma_p^2$ is the beta of asset $i$ *relative to the portfolio itself* (not the market). An asset with a beta above 1 adds more than average risk at the margin.

### Incremental VaR
Incremental VaR is the change in portfolio VaR from a whole proposed trade $\mathbf{a}$ (not just one dollar). The exact method revalues the portfolio with and without the trade: $\text{IVaR} = \text{VaR}_{p+a} - \text{VaR}_p$. For small trades, a first-order approximation is much faster:

$$
\text{IVaR} \approx (\Delta\text{VaR})^\top \mathbf{a}
$$

The approximation degrades as the trade becomes large relative to the portfolio.

### Component VaR
Component VaR allocates total VaR to each position:

$$
\text{CVaR}_i = \Delta\text{VaR}_i \times x_i = w_i\,\beta_i\,\text{VaR}_p
$$

Because the weighted betas sum to 1 ($\sum_i w_i \beta_i = 1$), the components add up *exactly* to diversified portfolio VaR. A component can be negative: a position that hedges the rest of the portfolio reduces total risk. The percentage contribution is simply $w_i \beta_i$. Do not confuse this "component VaR" with conditional VaR (expected shortfall), which shares the acronym.

### Using the tools
At the optimal risk-return portfolio, the ratio of excess return to marginal VaR is the same for every asset. If one asset offers more excess return per unit of marginal VaR, shift money toward it. The **best hedge** is the position size in a hedging asset that minimises portfolio variance; at that point the hedge asset's marginal VaR is zero. For a two-asset case, the variance-minimising holding of asset 2 against asset 1 is $x_2^* = -\rho\,\sigma_1 x_1/\sigma_2$.

## Worked example
A USD 100 million portfolio holds USD 60 million in asset 1 ($\sigma_1 = 20\%$) and USD 40 million in asset 2 ($\sigma_2 = 12\%$), correlation 0.30. Use 95% VaR, $z = 1.645$.

**Step 1: dollar volatilities.** $60 \times 0.20 = 12$; $40 \times 0.12 = 4.8$.

**Step 2: portfolio standard deviation.**

$$
\sigma_p = \sqrt{12^2 + 4.8^2 + 2(0.30)(12)(4.8)} = \sqrt{144 + 23.04 + 34.56} = \sqrt{201.6} = 14.199
$$

so $\sigma_p = 14.20\%$ of the portfolio.

**Step 3: VaRs.** Diversified VaR $= 1.645 \times 14.199 = 23.36$ million. Individual VaRs: $1.645 \times 12 = 19.74$ and $1.645 \times 4.8 = 7.90$. Undiversified VaR $= 27.64$ million, so diversification saves 4.28 million.

**Step 4: betas to the portfolio.** $\text{cov}(R_1,R_p) = 0.6(0.04) + 0.4(0.3)(0.2)(0.12) = 0.02688$; $\sigma_p^2 = 0.02016$; $\beta_1 = 1.333$. Similarly $\text{cov}(R_2,R_p) = 0.4(0.0144) + 0.6(0.0072) = 0.01008$, so $\beta_2 = 0.50$. Check: $0.6(1.333) + 0.4(0.5) = 1$.

**Step 5: marginal VaR.** $\Delta\text{VaR}_1 = 1.333 \times 23.36/100 = 0.3114$; $\Delta\text{VaR}_2 = 0.5 \times 0.2336 = 0.1168$ per dollar.

**Step 6: component VaR.** $\text{CVaR}_1 = 0.3114 \times 60 = 18.69$ million (80%); $\text{CVaR}_2 = 0.1168 \times 40 = 4.67$ million (20%). Sum: **23.36 million = portfolio VaR**.

**Step 7: incremental VaR.** Adding USD 5 million to asset 2: approximation $0.1168 \times 5 = 0.584$ million; exact revaluation gives 0.597 million.

## Common exam traps
- Using the market beta instead of the beta to the portfolio in marginal and component VaR.
- Adding individual VaRs and calling it portfolio VaR; that is undiversified VaR.
- Confusing marginal VaR (per dollar), incremental VaR (whole trade) and component VaR (allocation of the total).
- Forgetting that component VaRs sum exactly to diversified VaR and can be negative for hedges.
- Applying the linear incremental VaR approximation to a large trade.

## Key takeaways
- Diversified VaR is below undiversified VaR unless all correlations equal +1.
- Marginal VaR = beta to the portfolio × VaR / W.
- Component VaR = weight × beta × VaR, and components sum to total VaR.
- Incremental VaR measures a full trade; use exact revaluation for large trades.
- Optimal portfolios equalise excess return per unit of marginal VaR; the best hedge sets marginal VaR to zero.
