---
title: "Portfolio Mathematics"
---

## Learning goals
- Calculate the expected return of a portfolio from asset weights and expected returns.
- Calculate covariance and correlation from a joint probability table.
- Calculate the variance and standard deviation of a two-asset portfolio.
- Explain how correlation below +1 produces diversification benefits.
- Apply Roy's safety-first ratio to choose between portfolios given a shortfall threshold.

## Explanation

### Expected return is a weighted average
The previous lesson gave us expected values for a single asset. For a portfolio with weights $w_i$ that sum to 1:

$$
E(R_p) = \sum_{i=1}^{n} w_i\,E(R_i)
$$

Expected return is linear: no interaction between assets matters. Risk is different.

### Covariance from a joint distribution
Covariance measures how two returns move together across scenarios. With a joint probability table:

$$
Cov(R_A, R_B) = \sum_{s} P(s)\,\big[R_{A,s} - E(R_A)\big]\big[R_{B,s} - E(R_B)\big]
$$

where $P(s)$ is the probability of scenario $s$ and $R_{A,s}$ is asset A's return in that scenario. Positive covariance means the assets tend to be above (or below) their means at the same time. Standardising gives correlation:

$$
\rho_{AB} = \frac{Cov(R_A, R_B)}{\sigma_A\,\sigma_B}
$$

which always lies between −1 and +1. Rearranged, $Cov = \rho\,\sigma_A\sigma_B$, which is how you usually get covariance in exam questions.

### Portfolio variance
For two assets:

$$
\sigma_p^2 = w_A^2\sigma_A^2 + w_B^2\sigma_B^2 + 2w_Aw_B\,\rho_{AB}\,\sigma_A\sigma_B
$$

The first two terms are each asset's own risk, scaled by the square of its weight. The third term is the interaction. For $n$ assets the formula generalises to $\sigma_p^2 = \sum_i \sum_j w_i w_j Cov(R_i,R_j)$, with $n$ variance terms and $n(n-1)$ covariance terms. As $n$ grows, covariance terms dominate: in a large portfolio, what matters is how assets move together, not how volatile each is on its own.

### Why diversification works
If $\rho = +1$, the portfolio standard deviation is simply the weighted average of the individual standard deviations; there is no benefit. Any correlation below +1 makes $\sigma_p$ *smaller* than that weighted average, while expected return is unchanged. At $\rho = -1$ a suitable combination of two assets can drive risk to zero. Diversification is therefore a free improvement in risk per unit of return, limited by how correlated the assets are. One caution: correlations estimated in calm markets often rise sharply in a crisis, exactly when diversification is needed most, so the benefit measured from historical data can overstate the protection a portfolio will actually receive in a sell-off.

### Safety-first and shortfall risk
Some investors care most about not falling below a minimum return $R_L$, such as the return needed to fund a liability. **Shortfall risk** is $P(R_p < R_L)$. Roy's **safety-first ratio** measures how many standard deviations the expected return sits above the threshold:

$$
SFRatio = \frac{E(R_p) - R_L}{\sigma_p}
$$

If returns are normal, the portfolio with the **highest** SFRatio has the lowest probability of falling short, since that probability is $N(-SFRatio)$. When $R_L$ equals the risk-free rate, the SFRatio is the Sharpe ratio.

## Worked example
A portfolio holds 60% in Asset A (expected return 10%, standard deviation 20%) and 40% in Asset B (expected return 6%, standard deviation 10%). The correlation between them is 0.30. The investor's threshold return is 3%.

**Step 1 - expected return.** $E(R_p) = 0.60(10) + 0.40(6) = 6.0 + 2.4 = 8.4\%$.

**Step 2 - covariance.** $Cov = 0.30 \times 20 \times 10 = 60$ (%²).

**Step 3 - variance terms.**
- $w_A^2\sigma_A^2 = 0.36 \times 400 = 144.0$
- $w_B^2\sigma_B^2 = 0.16 \times 100 = 16.0$
- $2w_Aw_B Cov = 2 \times 0.60 \times 0.40 \times 60 = 28.8$

Sum: $\sigma_p^2 = 188.8$.

**Step 4 - standard deviation.** $\sigma_p = \sqrt{188.8} = 13.74\%$. Compare the weighted average of standard deviations, $0.60(20) + 0.40(10) = 16.0\%$: diversification removed 2.26 percentage points of risk.

**Step 5 - safety-first ratio.** $(8.4 - 3)/13.74 = 0.39$.

**Result: expected return 8.4%, standard deviation 13.74%, SFRatio 0.39.**

## Common exam traps
- Using weights instead of squared weights on the variance terms.
- Forgetting the factor of 2 on the covariance term.
- Mixing units: if standard deviations are in percent, variance and covariance are in %², so do not mix 0.20 with 10.
- Computing covariance from a joint table with simple averages instead of scenario probabilities.
- Picking the portfolio with the *lowest* SFRatio, or with the highest expected return, when minimising shortfall risk.

## Key takeaways
- Portfolio expected return is a weighted average of asset expected returns.
- Covariance = $\rho\sigma_A\sigma_B$; correlation is covariance scaled to between −1 and +1.
- Two-asset variance = $w_A^2\sigma_A^2 + w_B^2\sigma_B^2 + 2w_Aw_B\rho\sigma_A\sigma_B$.
- Correlation below +1 reduces portfolio risk below the weighted average risk without sacrificing return.
- Roy's SFRatio = $(E(R_p) - R_L)/\sigma_p$; choose the portfolio with the highest ratio.
