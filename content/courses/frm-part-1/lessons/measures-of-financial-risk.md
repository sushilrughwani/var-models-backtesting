---
title: "Measures of Financial Risk"
---

## Learning goals
- Explain why standard deviation alone is an incomplete measure of risk.
- Calculate value at risk (VaR) and expected shortfall (ES) for a normally distributed portfolio.
- Compute VaR and ES from a discrete loss distribution.
- Identify the four properties of a coherent risk measure and show why VaR can fail subadditivity.
- Describe spectral risk measures and the weights they place on tail losses.

## Explanation

### From mean-variance to tail measures
Portfolio theory treats risk as the standard deviation of returns. That works well when returns are normal (or, more generally, elliptical): the whole distribution is pinned down by its mean and variance, so two portfolios with the same volatility carry the same risk. Real returns break this. They have fat tails, skew, and losses that cluster in crises. Two portfolios can share a volatility of 10% while one hides a 1-in-100 chance of a catastrophic loss. Standard deviation also penalises upside surprises exactly as much as downside ones, which is not how a risk manager thinks. We therefore want measures that look directly at the **left tail**, the losses.

### Value at risk
VaR answers: "What loss will not be exceeded with confidence level $c$ over horizon $T$?" It is a quantile of the loss distribution. If losses are normal with mean $\mu_L$ and standard deviation $\sigma$:

$$
\text{VaR}_c = \mu_L + z_c\,\sigma
$$

where $z_c$ is the standard normal quantile (1.645 at 95%, 2.326 at 99%). Working with returns that have expected value $\mu$, the expected loss is $-\mu$, so in currency terms $\text{VaR}_c = V(z_c\sigma - \mu)$, with $V$ the portfolio value. For short horizons $\mu$ is often set to zero.

VaR is easy to communicate and to backtest, but it says nothing about **how bad** losses are once the threshold is breached.

### Expected shortfall
ES (also called conditional VaR) is the average loss given that the loss exceeds VaR. Under normality:

$$
\text{ES}_c = \mu_L + \sigma\,\frac{\phi(z_c)}{1-c}
$$

where $\phi$ is the standard normal density. At 99% the multiplier $\phi(2.326)/0.01$ is about 2.667, compared with 2.326 for VaR. For a discrete distribution, ES is the probability-weighted average of the worst $(1-c)$ of outcomes.

### Coherent risk measures
A risk measure $\rho$ is **coherent** if it satisfies:
- **Monotonicity**: if portfolio X always loses more than Y, then $\rho(X) \ge \rho(Y)$.
- **Translation invariance**: adding cash $k$ reduces risk by exactly $k$.
- **Positive homogeneity**: doubling a position doubles its risk, $\rho(\lambda X) = \lambda \rho(X)$ for $\lambda > 0$.
- **Subadditivity**: $\rho(X+Y) \le \rho(X) + \rho(Y)$, so diversification never increases risk.

ES satisfies all four. VaR satisfies the first three but can violate subadditivity when distributions are lumpy, such as loans that either repay or default. Under normality VaR is subadditive, which is why the problem hides in credit and option books.

### Spectral risk measures
A spectral measure is a weighted average of loss quantiles. VaR puts all weight on a single quantile. ES puts equal weight on every quantile beyond $c$ and zero weight below. A spectral measure is coherent when the weights are **non-decreasing** in the loss size, meaning bigger losses never receive less weight. ES passes; VaR does not, because quantiles worse than the VaR point get zero weight. Risk-averse users can choose weights that rise steeply into the tail.

## Worked example
**Part 1: normal portfolio.** A USD 50 million portfolio has a daily expected return of 0.05% and daily volatility of 1.2%. Find the 99% one-day VaR and ES.

1. VaR: $z\sigma - \mu = 2.326 \times 0.012 - 0.0005 = 0.027912 - 0.0005 = 0.027412$.
2. VaR in dollars: $0.027412 \times 50{,}000{,}000 =$ **USD 1,370,600**.
3. ES multiplier: $\phi(2.326)/0.01 = 0.026674/0.01 = 2.6674$.
4. ES: $(0.012 \times 2.6674 - 0.0005) \times 50{,}000{,}000 = 0.031508 \times 50{,}000{,}000 \approx$ **USD 1,575,400**.

ES is about 15% larger than VaR, the typical gap under normality at 99%.

**Part 2: VaR is not subadditive.** Two independent bonds each lose 100 with probability 4% and 0 otherwise. Use 95% confidence.

1. Single bond: P(loss) = 4% < 5%, so the 95% quantile is a loss of 0. VaR = 0 for each, total 0.
2. Single bond ES: the worst 5% of outcomes is 4% at 100 and 1% at 0, so ES $= (0.04 \times 100 + 0.01 \times 0)/0.05 = 80$.
3. Portfolio: P(both default) $= 0.04^2 = 0.16\%$ (loss 200); P(exactly one) $= 2 \times 0.04 \times 0.96 = 7.68\%$ (loss 100). P(any loss) = 7.84% > 5%, so portfolio VaR = **100 > 0 + 0**. Subadditivity fails.
4. Portfolio ES: worst 5% is 0.16% at 200 and 4.84% at 100: $(0.32 + 4.84)/0.05 = 103.2$, which is below $80 + 80 = 160$. ES respects diversification.

## Common exam traps
- Forgetting to subtract the expected return when the question gives a non-zero mean, or subtracting it when told to assume zero mean.
- Using the 99% quantile multiplier 2.326 for ES; the ES factor is $\phi(z)/(1-c)$, about 2.667.
- Claiming VaR is never subadditive. It is subadditive under normality; failures occur with discrete or highly skewed distributions.
- Mixing up translation invariance (adding cash lowers risk one-for-one) with positive homogeneity (scaling).
- Saying VaR is the worst possible loss. It is a quantile; losses beyond it happen with probability $1-c$.

## Key takeaways
- Standard deviation is a complete risk measure only for normal or elliptical returns.
- VaR is a loss quantile; ES is the average loss beyond that quantile.
- Normal VaR is $V(z\sigma - \mu)$; normal ES replaces $z$ with $\phi(z)/(1-c)$.
- Coherent measures satisfy monotonicity, translation invariance, homogeneity and subadditivity.
- ES is coherent; VaR can fail subadditivity for lumpy loss distributions.
- Spectral measures are coherent when weights do not fall as losses grow.
