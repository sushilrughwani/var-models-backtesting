---
title: "Portfolio Risk and Return: Part I"
---

## Learning goals
- Explain risk aversion and how it differs from risk neutrality and risk seeking.
- Calculate investor utility from expected return, variance and a risk-aversion coefficient.
- Calculate the expected return and standard deviation of a two-asset portfolio.
- Describe the minimum-variance frontier, the global minimum-variance portfolio and the efficient frontier.
- Determine an investor's optimal allocation between a risk-free asset and a risky portfolio.

## Explanation

### Attitudes to risk
Offer someone a sure USD 50 or a coin flip paying USD 100 or nothing. A **risk-averse** investor takes the sure 50 dollars; a **risk-neutral** investor is indifferent because both have the same expected value; a **risk seeker** prefers the gamble. Portfolio theory assumes investors are risk averse: they accept more risk only if paid with more expected return. Risk aversion does not mean refusing all risk.

### Utility
We turn the trade-off into a single score:

$$
U = E(r) - \tfrac{1}{2} A \sigma^2
$$

where $U$ is utility, $E(r)$ is expected return, $\sigma^2$ is variance of return and $A$ is the risk-aversion coefficient. Returns must be entered as **decimals**. $A > 0$ for risk-averse investors (larger means more averse), $A = 0$ for risk-neutral and $A < 0$ for risk seekers. A risk-free asset has $\sigma = 0$, so its utility equals its return. The investor picks the portfolio with the highest $U$.

**Indifference curves** plot all combinations of risk and return giving the same utility. For a risk-averse investor they slope upward and are convex: each extra unit of risk requires a larger extra return. A more risk-averse investor has steeper curves.

### Two-asset portfolios
With weights $w_1$ and $w_2 = 1 - w_1$:

$$
E(R_p) = w_1 E(R_1) + w_2 E(R_2)
$$

$$
\sigma_p^2 = w_1^2\sigma_1^2 + w_2^2\sigma_2^2 + 2w_1w_2\rho_{12}\sigma_1\sigma_2
$$

where $\rho_{12}$ is the correlation and $\rho_{12}\sigma_1\sigma_2$ is the covariance. Expected return is always a weighted average; risk is below the weighted average whenever $\rho < 1$. With $\rho = -1$, a combination with zero risk exists.

### Frontiers
Combining many risky assets in every possible way produces a cloud of portfolios. The **minimum-variance frontier** is the left edge: for each expected return, the lowest-risk portfolio. Its leftmost point is the **global minimum-variance portfolio**. The part of the frontier above that point is the **efficient frontier** - no other portfolio gives more return for the same risk. Points below it are dominated.

### Adding a risk-free asset
Combining a risk-free asset with a risky portfolio P gives a straight **capital allocation line (CAL)**:

$$
E(R_C) = R_f + \frac{E(R_P) - R_f}{\sigma_P}\,\sigma_C
$$

The slope is P's Sharpe ratio. The best CAL is the one tangent to the efficient frontier. Each investor then picks a point on that line according to risk aversion. The optimal weight in the risky portfolio is

$$
y^* = \frac{E(R_P) - R_f}{A\,\sigma_P^2}
$$

This is where the CAL touches the investor's highest attainable indifference curve. Separating the choice of risky portfolio (same for all) from the choice of how much to hold (personal) is called **two-fund separation**.

## Worked example
**Part 1 - utility.** An investor with $A = 4$ compares three portfolios:

| Portfolio | E(r) | σ |
|---|---|---|
| 1 | 8% | 10% |
| 2 | 12% | 20% |
| 3 | 15% | 28% |

$U_1 = 0.08 - 0.5(4)(0.10^2) = 0.08 - 0.02 = 0.0600$.
$U_2 = 0.12 - 0.5(4)(0.04) = 0.12 - 0.08 = 0.0400$.
$U_3 = 0.15 - 0.5(4)(0.0784) = 0.15 - 0.1568 = -0.0068$.
The investor chooses **Portfolio 1** (utility 0.0600).

**Part 2 - two-asset portfolio.** Stocks: E = 10%, σ = 20%. Bonds: E = 5%, σ = 8%. Correlation 0.30. Weights 60/40.
Expected return: $0.6(10\%) + 0.4(5\%) = 8\%$.
Variance: $0.36(0.04) + 0.16(0.0064) + 2(0.6)(0.4)(0.30)(0.20)(0.08) = 0.0144 + 0.001024 + 0.002304 = 0.017728$.
Standard deviation: $\sqrt{0.017728} = 13.31\%$, well below the weighted average of 15.2%.

**Part 3 - optimal allocation.** Risk-free rate 3%; the risky portfolio is the stock fund (E = 10%, σ = 20%); $A = 4$.
$y^* = (0.10 - 0.03) / (4 \times 0.04) = 0.07 / 0.16 = 0.4375$.
**Put 43.75% in the risky fund and 56.25% in the risk-free asset.**

## Common exam traps
- Plugging percentages into the utility formula (writing 10 instead of 0.10) - this inflates the penalty a hundredfold.
- Forgetting the 1/2 in the utility function or squaring σ twice.
- Thinking risk-averse means "avoids all risk"; it means "demands compensation for risk".
- Treating the whole minimum-variance frontier as efficient - only the part above the global minimum-variance portfolio is.
- Assuming the optimal risky portfolio depends on risk aversion; under two-fund separation it does not - only the mix with the risk-free asset does.

## Key takeaways
- Utility $U = E(r) - 0.5A\sigma^2$ ranks portfolios for a given investor.
- Higher $A$ means steeper indifference curves and less risky holdings.
- Portfolio risk falls below the weighted average whenever correlation is below +1.
- The efficient frontier is the upper part of the minimum-variance frontier.
- The CAL is a straight line from the risk-free rate; its slope is the Sharpe ratio.
- Optimal risky weight: $y^* = [E(R_P) - R_f] / (A\sigma_P^2)$.
