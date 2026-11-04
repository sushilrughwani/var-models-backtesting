---
title: "Calculating and Applying VaR"
---

## Learning goals
- Compute VaR by historical simulation from a set of scenario losses.
- Calculate delta-normal VaR for a linear position and for an option using its delta.
- Apply the delta-gamma approximation and explain how gamma changes option VaR.
- Describe Monte Carlo full revaluation and when it beats local approximations.
- Scale a one-day VaR to a longer horizon and state the assumptions behind the square-root rule.

## Explanation

### Three families of methods
The previous lesson defined VaR as a loss quantile. The practical question is how to get that quantile for a real book. There are three approaches.

**Historical simulation** takes the last, say, 500 days of risk-factor changes, applies each one to today's portfolio, and reads off the empirical loss distribution. No distribution is assumed, so fat tails and non-linear payoffs come through naturally. With 500 scenarios, the 99% VaR is usually taken as the 5th-worst loss (some texts use the 6th, or an average of the two) and ES as the average of the worst five. Weaknesses: the result depends entirely on whether the window contains a crisis, and VaR can jump when a big day enters or leaves the window.

**Delta-normal (model-building)** assumes risk-factor changes are normal and the portfolio value is linear in them. Then VaR is a multiple of the portfolio standard deviation. It is fast and analytic, but it misses fat tails and option convexity.

**Monte Carlo simulation** draws thousands of risk-factor paths from a chosen model, revalues the full portfolio on each path, and reads the quantile. It handles non-linearity and any distribution but is slow and only as good as its model.

### Delta-normal VaR for linear positions
For a single position of value $V$ with return volatility $\sigma$:

$$
\text{VaR} = V\,\sigma\,z_c
$$

For two positions with dollar volatilities $\sigma_1 V_1$ and $\sigma_2 V_2$ and correlation $\rho$, combine variances: $\sigma_P^2 = (\sigma_1 V_1)^2 + (\sigma_2 V_2)^2 + 2\rho\,\sigma_1 V_1\,\sigma_2 V_2$, then $\text{VaR} = z_c\sigma_P$.

### Options: delta and delta-gamma
An option's value changes non-linearly with the underlying price $S$. A Taylor expansion gives

$$
\Delta P \approx \delta\,\Delta S + \tfrac{1}{2}\,\Gamma\,(\Delta S)^2
$$

where $\delta$ is the option delta and $\Gamma$ its gamma. The **delta approximation** keeps only the first term, so option VaR is $|\delta|$ times the VaR of one unit of the underlying:

$$
\text{VaR}_{\text{option}} \approx |\delta|\, S\,\sigma\, z_c
$$

The **delta-gamma approximation** adds curvature. For a long option (positive gamma), convexity cushions losses, so

$$
\text{VaR} \approx |\delta|\,S\sigma z_c - \tfrac{1}{2}\Gamma\,(S\sigma z_c)^2
$$

For a short option (negative gamma) the sign flips and the gamma term **adds** to VaR. Delta-gamma works for modest moves, but for large moves or complex payoffs, full revaluation (historical or Monte Carlo) is preferred.

### Scaling across horizons
If daily returns are independent with zero mean, variance grows linearly with time, so

$$
\text{VaR}_T = \text{VaR}_1\sqrt{T}
$$

The rule fails with autocorrelation, volatility clustering, or when the mean matters over long horizons.

## Worked example
A trader is long 1,000 call options on a stock priced at USD 100. Daily volatility is 2%. Each call has delta 0.6 and gamma 0.04. Compute 99% one-day VaR ($z = 2.326$) using the delta and delta-gamma approximations, then scale to 10 days.

1. Underlying move at the 99% level: $\Delta S = 100 \times 0.02 \times 2.326 = 4.652$.
2. Stock VaR for 1,000 shares (for comparison): $1{,}000 \times 4.652 = 4{,}652$.
3. Delta VaR per option: $0.6 \times 4.652 = 2.7912$. For 1,000 options: **USD 2,791.20**.
4. Gamma adjustment per option: $\tfrac{1}{2} \times 0.04 \times 4.652^2 = 0.02 \times 21.641 = 0.4328$.
5. Delta-gamma VaR per option: $2.7912 - 0.4328 = 2.3584$. For 1,000 options: **USD 2,358.38**.
6. Ten-day VaR (delta-gamma, square-root rule): $2{,}358.38 \times \sqrt{10} = 2{,}358.38 \times 3.1623 \approx$ **USD 7,457.85**.

Positive gamma lowers VaR by about 15.5% relative to delta alone. Had the trader been **short** these calls, the delta-gamma VaR would be $2.7912 + 0.4328 = 3.2240$ per option, or USD 3,224.00.

A caution on step 6: the gamma term does not scale with $\sqrt{T}$ (it grows with $T$), so for long horizons it is better to revalue at the 10-day move directly.

## Common exam traps
- Forgetting the absolute value of delta for puts; a long put has negative delta but still has positive VaR.
- Getting the gamma sign wrong: long options (positive gamma) reduce VaR; short options increase it.
- Using a historical window with no stress period and concluding the portfolio is safe.
- Applying the square-root rule when returns are autocorrelated or when the question says the mean is not zero.
- Confusing the 5th-worst loss (VaR) with the average of the worst five (ES) in a 500-scenario historical simulation.

## Key takeaways
- Historical simulation is assumption-light but window-dependent.
- Delta-normal VaR is $V\sigma z$ for linear positions and $|\delta|S\sigma z$ per option.
- Delta-gamma adds curvature: subtract the gamma term for long options, add it for short options.
- Monte Carlo full revaluation handles non-linearity and any distribution at a computing cost.
- Square-root-of-time scaling assumes i.i.d. zero-mean returns.
