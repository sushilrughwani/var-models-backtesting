---
title: "Modern Portfolio Theory and the CAPM"
---

## Learning goals
- Calculate the expected return and standard deviation of a two-asset portfolio.
- Explain the efficient frontier and why diversification reduces risk.
- Derive the capital market line and use it to price efficient portfolios.
- Calculate beta and apply the CAPM to find a required return.
- Distinguish the capital market line from the security market line.

## Explanation

### Diversification: the only free lunch
Modern portfolio theory (MPT) starts from investors who care about two things: expected return (good) and variance (bad). Combining assets that do not move in lockstep lowers portfolio risk without lowering expected return proportionally. For two assets:

$$
E(R_p) = w_A E(R_A) + w_B E(R_B)
$$

$$
\sigma_p^2 = w_A^2\sigma_A^2 + w_B^2\sigma_B^2 + 2 w_A w_B \rho_{AB}\sigma_A\sigma_B
$$

where $w$ are portfolio weights (summing to 1), $\sigma$ are standard deviations and $\rho_{AB}$ is the correlation. Expected return is a simple weighted average, but risk is not: unless $\rho = 1$, portfolio standard deviation is below the weighted average of the individual standard deviations.

### The efficient frontier
Plot every possible portfolio of risky assets in risk-return space. The upper edge of that region, starting at the minimum-variance portfolio, is the **efficient frontier**: for each level of risk, no portfolio offers a higher expected return. Rational investors hold only frontier portfolios.

### Adding a risk-free asset: the capital market line
When investors can lend and borrow at the risk-free rate $R_f$, the best risky portfolio is the one where a straight line from $R_f$ is tangent to the frontier. Under the assumption that everyone has the same expectations, this tangency portfolio is the **market portfolio** $M$. Combining $M$ with the risk-free asset gives the **capital market line (CML)**:

$$
E(R_p) = R_f + \frac{E(R_M) - R_f}{\sigma_M}\,\sigma_p
$$

The slope is the market's reward per unit of total risk (its Sharpe ratio). Every investor holds the same risky portfolio and simply chooses how much to lend or borrow. This is the **separation theorem**: the investment decision (hold $M$) is separate from the financing decision (how much risk to take).

### Systematic versus idiosyncratic risk
Total risk splits into **systematic** risk (market-wide, cannot be diversified away) and **idiosyncratic** risk (firm-specific, removed by diversification). Because investors can eliminate idiosyncratic risk for free, the market rewards only systematic risk. The measure of systematic risk is **beta**:

$$
\beta_i = \frac{\text{Cov}(R_i, R_M)}{\sigma_M^2} = \rho_{iM}\frac{\sigma_i}{\sigma_M}
$$

### The CAPM and the security market line
The **capital asset pricing model** gives the required return on any asset:

$$
E(R_i) = R_f + \beta_i\,[E(R_M) - R_f]
$$

where $E(R_M) - R_f$ is the market risk premium. Plotting $E(R_i)$ against $\beta_i$ gives the **security market line (SML)**. An asset whose forecast return lies above the SML is undervalued (positive alpha); below it, overvalued.

Key CAPM assumptions: investors are mean-variance optimisers with identical expectations and a single period horizon; they can borrow and lend unlimited amounts at $R_f$; there are no taxes or transaction costs; assets are infinitely divisible. These are unrealistic, which is why later lessons extend the model with multiple factors.

## Worked example
**Part A - Two-asset portfolio.** Asset A: $E(R) = 8\%$, $\sigma = 12\%$. Asset B: $E(R) = 14\%$, $\sigma = 25\%$. Correlation 0.3. Weights 60% A, 40% B.

1. $E(R_p) = 0.6(8\%) + 0.4(14\%) = 4.8\% + 5.6\% = 10.4\%$.
2. $\sigma_p^2 = 0.36(0.0144) + 0.16(0.0625) + 2(0.6)(0.4)(0.3)(0.12)(0.25) = 0.005184 + 0.01 + 0.00432 = 0.019504$.
3. $\sigma_p = \sqrt{0.019504} =$ **13.97%**, well below the weighted average of 17.2%.

**Part B - CML.** $R_f = 3\%$, $E(R_M) = 9\%$, $\sigma_M = 15\%$. Slope $= 6/15 = 0.40$. An efficient portfolio with $\sigma_p = 10\%$ should earn $3\% + 0.40 \times 10\% =$ **7.0%**, achieved by putting $10/15 = 66.7\%$ in $M$ and 33.3% in the risk-free asset.

**Part C - Beta and CAPM.** A stock's covariance with the market is 0.024, so $\beta = 0.024 / 0.15^2 = 0.024/0.0225 = 1.067$. A second stock with $\beta = 1.3$ has required return $3\% + 1.3(6\%) = 10.8\%$. An analyst forecasts 12%, so alpha is $12\% - 10.8\% =$ **+1.2%**: the stock plots above the SML and looks undervalued.

## Common exam traps
- Averaging standard deviations. Only expected returns average linearly; risk needs the full variance formula.
- Forgetting the factor of 2 in the covariance term, or using correlation where covariance is needed.
- Computing beta as covariance over standard deviation rather than over variance.
- Putting $\beta \times E(R_M)$ in the CAPM instead of $\beta \times [E(R_M) - R_f]$.
- Mixing up the lines: the CML uses total risk ($\sigma$) and applies only to efficient portfolios; the SML uses beta and applies to every asset.

## Key takeaways
- Diversification lowers risk whenever correlation is below 1.
- The efficient frontier is the set of best risk-return portfolios; with a risk-free asset everyone holds the tangency (market) portfolio.
- The CML prices efficient portfolios using total risk; its slope is the market Sharpe ratio.
- Only systematic risk is rewarded; beta measures it.
- The CAPM: $E(R_i) = R_f + \beta_i[E(R_M) - R_f]$; assets above the SML have positive alpha.
