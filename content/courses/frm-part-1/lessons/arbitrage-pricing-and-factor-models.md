---
title: "The Arbitrage Pricing Theory and Multifactor Models"
---

## Learning goals
- Explain how a multifactor model splits a return into expected return, factor surprises and firm-specific noise.
- Calculate an expected return with the arbitrage pricing theory (APT) and a realized return from factor surprises.
- Distinguish the APT from the CAPM in assumptions and in what each says about pricing.
- Construct a hedge that removes an unwanted factor exposure using factor portfolios.
- Identify an arbitrage opportunity when a well-diversified portfolio is mispriced.

## Explanation

### Why go beyond one factor?
The CAPM from the previous lesson says that only one risk is priced: exposure to the market portfolio. In practice, stock returns react to several broad economic forces at once - growth surprises, inflation surprises, changes in credit spreads, oil prices. A multifactor model lets each of these drive returns separately, and the APT tells us which of those exposures should earn a premium.

### The multifactor return-generating model
Returns are modelled as an expected part plus reactions to *news*:

$$
R_i = E(R_i) + \beta_{i1} F_1 + \beta_{i2} F_2 + \dots + \beta_{ik} F_k + e_i
$$

where $R_i$ is the realized return on asset $i$, $E(R_i)$ is its expected return, $F_j$ is the **surprise** in factor $j$ (actual minus expected value, so its mean is zero), $\beta_{ij}$ is the asset's sensitivity (factor loading) to factor $j$, and $e_i$ is the firm-specific shock with mean zero. Only the unexpected part of a factor moves prices: if everyone already expected 2% GDP growth, a 2% print is not news.

### The APT pricing equation
The APT, developed by Stephen Ross, rests on three ideas: returns follow a factor model, there are enough assets that firm-specific risk can be diversified away, and well-diversified portfolios cannot offer riskless profits. Under these conditions, expected returns must be linear in factor sensitivities:

$$
E(R_i) = R_f + \beta_{i1}\lambda_1 + \beta_{i2}\lambda_2 + \dots + \beta_{ik}\lambda_k
$$

where $R_f$ is the risk-free rate and $\lambda_j$ is the **risk premium** for factor $j$ - the extra expected return on a portfolio with a sensitivity of 1 to factor $j$ and 0 to all other factors. A factor premium can be negative if exposure to that factor acts like insurance.

### APT versus CAPM
The CAPM needs strong assumptions (mean-variance investors, a single period, a true market portfolio) and identifies a single factor. The APT needs only no-arbitrage and diversification, but it does not tell you *which* factors matter or how many there are; that is an empirical question. Models such as Fama-French (market, size, value) are popular factor choices. The CAPM can be viewed as a special case of the APT with one factor, the market.

### Hedging factor exposures
A **factor portfolio** has a sensitivity of 1 to one factor and 0 to the others. Because sensitivities of a portfolio are value-weighted averages, a manager can neutralize factor $j$ by shorting a position in factor portfolio $j$ equal to $\beta_{pj} \times$ portfolio value. What remains is exposure to the other factors plus residual (alpha) risk. This is how a manager who likes a stock-picking view but fears an inflation shock keeps the view and removes the shock.

### Arbitrage when pricing is off
If a well-diversified portfolio offers more than its APT return, investors buy it and short a replicating portfolio with the same factor sensitivities. The combined position has zero factor risk and zero net investment, yet earns a positive return - a riskless arbitrage that pushes prices back into line.

## Worked example
Two factors drive returns: GDP surprise (premium $\lambda_1 = 5\%$) and inflation surprise (premium $\lambda_2 = 2\%$). The risk-free rate is 3%. Portfolio P has $\beta_1 = 1.2$ and $\beta_2 = 0.5$ and is worth USD 10 million.

**Step 1 - APT expected return.**
$$
E(R_P) = 3\% + 1.2(5\%) + 0.5(2\%) = 3\% + 6\% + 1\% = 10\%
$$

**Step 2 - Realized return.** Analysts expected 3% GDP growth and 2% inflation. Actual GDP growth was 2% (surprise $-1\%$) and inflation was 3% (surprise $+1\%$). The firm-specific shock was $+0.5\%$.
$$
R_P = 10\% + 1.2(-1\%) + 0.5(+1\%) + 0.5\% = 10\% - 1.2\% + 0.5\% + 0.5\% = 9.8\%
$$

**Step 3 - Hedge the GDP factor.** Short $1.2 \times 10 = $ USD 12 million of the GDP factor portfolio. To also remove inflation exposure, short $0.5 \times 10 = $ USD 5 million of the inflation factor portfolio.

**Step 4 - Spot a mispricing.** If a broker claims P is expected to return 11.5%, the excess over the APT return is $11.5\% - 10\% = 1.5\%$. Buying P and shorting a replicating mix of the factor portfolios and the risk-free asset locks in **1.5% per year with no factor risk**.

## Common exam traps
- Plugging factor *levels* (actual inflation of 3%) into the return equation instead of factor *surprises* (actual minus expected).
- Forgetting to add the risk-free rate in the APT equation, or adding it to the premiums when they are already stated as total factor returns.
- Thinking the APT names the factors - it does not; it only says sensitivities to priced factors determine expected returns.
- Hedging with the wrong amount: the short in a factor portfolio equals sensitivity times portfolio value, not portfolio value.
- Assuming a negative sensitivity always lowers expected return - it depends on the sign of the factor premium too.

## Key takeaways
- A multifactor model separates expected return, factor surprises and firm-specific noise.
- APT: $E(R) = R_f + \sum \beta_j \lambda_j$, derived from no-arbitrage rather than equilibrium.
- The APT is more flexible than the CAPM but silent on which factors to use.
- Factor portfolios let managers strip out unwanted exposures by shorting $\beta_j \times$ value.
- Mispriced well-diversified portfolios create riskless arbitrage that drives prices back to the APT line.
