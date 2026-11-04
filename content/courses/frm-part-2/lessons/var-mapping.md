---
title: "VaR Mapping"
---

## Learning goals
- Explain why positions are mapped onto a limited set of risk factors and what mapping error is.
- Distinguish principal, duration and cash-flow mapping for fixed-income portfolios.
- Calculate undiversified and diversified VaR for a bond mapped onto vertices.
- Decompose forwards, FRAs and swaps into building-block positions.
- Map equity and option positions using beta and delta.

## Explanation

### Why map at all?
A large bank holds hundreds of thousands of positions: bonds of every maturity, swaps, forwards, options, single stocks. Modelling each instrument's price as its own random variable would require an impossibly large covariance matrix. **Mapping** replaces each position with exposures to a manageable set of **risk factors** (primitive securities) such as zero-coupon rates at standard maturities ("vertices"), equity indices and exchange rates. VaR is then computed from the factor exposures and the factors' volatilities and correlations, using the delta-normal machinery from earlier lessons. The price is **mapping error** (risk the factors do not capture), such as specific risk of a single stock or basis between a bond and the rate curve.

### Three ways to map a bond portfolio
- **Principal mapping** puts the whole market value at the average maturity of the principal repayments, ignoring coupons. It is the crudest choice and tends to overstate risk, because coupons arrive earlier and earlier cash flows are less volatile.
- **Duration mapping** puts the whole market value at a single vertex matching the portfolio's duration. It captures first-order rate sensitivity but assumes a parallel shift of the curve.
- **Cash-flow mapping** discounts each cash flow at the zero rate for its date and places its present value at the matching vertex (splitting it between the two nearest vertices when it falls between them). It is the most accurate because it lets each part of the curve move with its own volatility and correlation.

### VaR of a mapped portfolio
Let $x_i$ be the present value mapped to vertex $i$ and $V_i$ the VaR of one dollar at that vertex (often published as a percentage, already including the $z$-value). The individual VaRs are $x_iV_i$. Then

$$
\text{Undiversified VaR} = \sum_i x_i V_i, \qquad \text{Diversified VaR} = \sqrt{\sum_i\sum_j x_iV_i\, x_jV_j\,\rho_{ij}}
$$

where $\rho_{ij}$ is the correlation between vertex returns. Undiversified VaR assumes perfect correlation. Because neighbouring points on a yield curve are very highly correlated, the diversification benefit inside a single bond is usually small.

### Linear derivatives as building blocks
- **Currency forward:** a long forward on foreign currency equals a long foreign-currency zero-coupon bond, a short domestic zero-coupon bond, and a long spot FX exposure. It therefore maps onto two interest-rate vertices and one exchange rate.
- **Forward rate agreement:** a 6x12 FRA that profits when rates rise (pay fixed) behaves like a long 6-month zero and a short 12-month zero, with equal present values.
- **Interest rate swap:** a pay-fixed swap is a long floating-rate note (which reprices to par at the next reset, so it maps to the reset date) and a short fixed-coupon bond, mapped cash flow by cash flow.

### Equities and options
For a stock portfolio, mapping each holding to a market index through its beta gives systematic VaR

$$
\text{VaR} = z\,\sigma_m \sum_i \beta_i x_i
$$

where $\sigma_m$ is index volatility and $x_i$ the dollar holding. This ignores specific risk, which is acceptable only for well-diversified portfolios. Options are mapped to their **delta-equivalent** position in the underlying, $\delta \times$ number of options $\times$ price, possibly supplemented by gamma; the Part I option VaR results apply directly.

## Worked example
A bank holds a 3-year, 8% annual-coupon bond with face value USD 100 million. Zero rates are 4%, 4.5% and 5% for 1, 2 and 3 years. Monthly 95% VaR per dollar at those vertices is 0.3%, 0.6% and 0.9%. Correlations are 0.95 (1y-2y), 0.90 (1y-3y) and 0.97 (2y-3y). Compute cash-flow-mapped VaR.

1. Present values (USD millions): $8/1.04 = 7.6923$; $8/1.045^2 = 7.3258$; $108/1.05^3 = 93.2945$. Total = 108.3126.
2. Individual VaRs: $7.6923 \times 0.003 = 0.02308$; $7.3258 \times 0.006 = 0.04396$; $93.2945 \times 0.009 = 0.83965$.
3. Undiversified VaR: $0.02308 + 0.04396 + 0.83965 = 0.90668$, about **USD 906,682**.
4. Diversified VaR: the square root of the correlation-weighted sum of products of individual VaRs equals $0.90326$, about **USD 903,261**.
5. Diversification benefit: $906{,}682 - 903{,}261 \approx$ USD 3,421, tiny because the vertices are almost perfectly correlated and the 3-year cash flow dominates.

For comparison, principal mapping would place the full USD 108.31 million at the 3-year vertex: $108.3126 \times 0.009 =$ USD 974,813, overstating risk by roughly 8% because it treats the early coupons as if they had 3-year volatility.

## Common exam traps
- Mapping face values instead of present values to the vertices.
- Multiplying by $z$ again when vertex VaRs are already quoted as VaR percentages.
- Getting the FRA or swap direction backwards: pay-fixed is short the fixed-rate bond.
- Treating undiversified VaR as the realistic number; it is an upper bound under perfect correlation.
- Forgetting that beta mapping drops specific risk.

## Key takeaways
- Mapping replaces instruments with exposures to a small set of risk factors.
- Cash-flow mapping is most accurate; principal mapping is crudest and tends to overstate risk.
- Diversified VaR uses the vertex correlation matrix; undiversified VaR simply adds individual VaRs.
- Forwards, FRAs and swaps decompose into zero-coupon bonds and spot positions.
- Equities map through beta and options through delta, each with its own mapping error.
