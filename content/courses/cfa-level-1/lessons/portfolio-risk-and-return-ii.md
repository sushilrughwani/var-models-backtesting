---
title: "Portfolio Risk and Return: Part II"
---

## Learning goals
- Explain the capital market line and how it relates to the market portfolio.
- Distinguish systematic from unsystematic risk and explain why only systematic risk is priced.
- Calculate beta from correlation and standard deviations.
- Apply the CAPM and the security market line to find required returns and identify mispriced securities.
- Calculate and interpret the Sharpe ratio, Treynor ratio, M-squared and Jensen's alpha.

## Explanation

### From CAL to CML
In Part I, each investor drew a capital allocation line from the risk-free rate to the tangency portfolio. If everyone has the same expectations, everyone finds the same tangency portfolio - and since all risky assets must be held by someone, that portfolio must be the **market portfolio** of all risky assets. The resulting line is the **capital market line (CML)**:

$$
E(R_p) = R_f + \frac{E(R_m) - R_f}{\sigma_m}\,\sigma_p
$$

where $R_f$ is the risk-free rate, $E(R_m)$ and $\sigma_m$ are the market's expected return and standard deviation, and $\sigma_p$ is the portfolio's total risk. Points left of the market involve lending at $R_f$; points right of it involve borrowing. If borrowing costs exceed the lending rate, the line kinks at M and is flatter beyond it.

### Systematic versus unsystematic risk
Total variance splits into **systematic** risk (market-wide, cannot be diversified) and **unsystematic** risk (firm-specific, diversifiable). Because investors can eliminate unsystematic risk for free by diversifying, the market does not reward bearing it. Only systematic risk earns a premium.

### Beta
Beta measures a security's systematic risk - its sensitivity to market movements:

$$
\beta_i = \frac{\text{Cov}(R_i, R_m)}{\sigma_m^2} = \frac{\rho_{i,m}\,\sigma_i}{\sigma_m}
$$

where $\rho_{i,m}$ is the correlation with the market and $\sigma_i$ is the security's standard deviation. The market's beta is 1; the risk-free asset's beta is 0. Beta is usually estimated as the slope of a regression of the security's returns on market returns (the **market model**).

### CAPM and the SML
The capital asset pricing model gives the required return for any asset:

$$
E(R_i) = R_f + \beta_i\,[E(R_m) - R_f]
$$

Plotting $E(R_i)$ against beta gives the **security market line (SML)**. Key contrast: the CML uses total risk ($\sigma$) and applies only to efficient portfolios; the SML uses beta and applies to every asset and portfolio. A security whose forecast return plots **above** the SML is **undervalued** (it offers more than its required return); below the SML is overvalued.

CAPM assumptions include risk-averse, utility-maximising investors; frictionless markets with no taxes or transaction costs; unlimited borrowing and lending at $R_f$; homogeneous expectations; and a single holding period.

### Performance measures

$$
\text{Sharpe} = \frac{R_p - R_f}{\sigma_p} \qquad \text{Treynor} = \frac{R_p - R_f}{\beta_p}
$$

$$
M^2 = R_f + (R_p - R_f)\frac{\sigma_m}{\sigma_p} - R_m \qquad \alpha_p = R_p - [R_f + \beta_p(R_m - R_f)]
$$

Sharpe and M² use total risk, so they suit a portfolio that is the investor's entire wealth. Treynor and Jensen's alpha use beta, so they suit a portfolio that is one part of a diversified whole. M² rescales the portfolio to market risk and expresses the result as a return difference versus the market.

## Worked example
Risk-free rate 3%, market expected return 9%, market standard deviation 16%.

**Step 1 - CML.** An efficient portfolio with σ = 12% should earn $3\% + (6/16)(12\%) = 3\% + 4.5\% = 7.5\%$.

**Step 2 - beta.** Stock Z has σ = 32% and correlation 0.60 with the market: $\beta = 0.60 \times 32 / 16 = 1.2$.

**Step 3 - CAPM.** Required return $= 3\% + 1.2(6\%) = 10.2\%$. An analyst forecasts 11.5%, which plots 1.3 percentage points above the SML, so Z is **undervalued** - buy.

**Step 4 - evaluating a manager.** A fund earned 12% with σ = 20% and β = 1.1; the market actually returned 9%.
- Sharpe $= (12 - 3)/20 = 0.45$ versus the market's $6/16 = 0.375$.
- Treynor $= 9/1.1 = 8.18\%$ versus the market's 6%.
- Jensen's alpha $= 12\% - [3\% + 1.1(6\%)] = 12\% - 9.6\% = 2.4\%$.
- M² $= 3\% + 0.45 \times 16\% - 9\% = 1.2\%$.

**The fund beat the market on every measure: Sharpe 0.45, Treynor 8.18%, alpha 2.4%, M² 1.2%.**

## Common exam traps
- Using σ in the CAPM or β in the CML - the CML uses total risk, the SML uses beta.
- Reversing the valuation rule: above the SML means undervalued, not overvalued.
- Using covariance divided by σ_m instead of σ_m² when computing beta.
- Recommending Sharpe for a sub-portfolio of a diversified fund; Treynor or alpha is appropriate there.
- Forgetting to subtract R_m at the end of M², which makes it a return rather than a difference.

## Key takeaways
- The CML runs from $R_f$ through the market portfolio; its slope is the market Sharpe ratio.
- Only systematic risk is rewarded because unsystematic risk can be diversified away for free.
- $\beta = \rho\sigma_i/\sigma_m$; the market has β = 1.
- CAPM: $E(R_i) = R_f + \beta_i[E(R_m) - R_f]$; above the SML = undervalued.
- Sharpe and M² use total risk; Treynor and Jensen's alpha use beta.
