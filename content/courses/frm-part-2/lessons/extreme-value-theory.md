---
title: "Parametric Approaches: Extreme Value"
---

## Learning goals
- Explain why extreme value theory models the tail separately from the rest of the distribution.
- Describe the generalised extreme value distribution and interpret its shape parameter.
- Calculate a high quantile from a GEV fitted to block maxima.
- Calculate VaR and ES with the peaks-over-threshold method and the generalised Pareto distribution.
- Discuss threshold choice and the limits of EVT.

## Explanation

### Why a separate theory for the tail?
Every method so far either assumed a distribution for the whole P&L (normal, lognormal) or relied on the handful of extreme observations in a historical sample. Both struggle at 99.5% or 99.9%: the normal tail is too thin, and historical data contain too few extreme points. Extreme value theory (EVT) offers a middle path. Just as the central limit theorem says sums of many variables look normal regardless of their parent distribution, EVT says the **extremes** of many variables converge to a small family of limiting distributions. We can then fit only the tail and extrapolate beyond the data with a theoretical justification.

### Block maxima and the GEV distribution
Split the data into blocks (for example months) and keep the largest loss in each block. As block size grows, the standardised maxima follow the **generalised extreme value** (GEV) distribution

$$
H(x) = \exp\!\left[-\left(1 + \xi\,\frac{x-\mu}{\sigma}\right)^{-1/\xi}\right]
$$

where $\mu$ is a location parameter, $\sigma > 0$ a scale parameter and $\xi$ the **shape** (tail index) parameter. The shape determines the family:

- $\xi > 0$: **Fréchet**, a heavy power-law tail; the relevant case for most financial returns.
- $\xi = 0$: **Gumbel**, $H(x) = \exp[-e^{-(x-\mu)/\sigma}]$, a thin exponential tail like the normal's.
- $\xi < 0$: **Weibull**, a tail with a finite upper end point.

Inverting $H$ gives the loss that the block maximum exceeds with probability $1-p$:

$$
x_p = \mu + \frac{\sigma}{\xi}\left[(-\ln p)^{-\xi} - 1\right]
$$

with the Gumbel limit $x_p = \mu - \sigma\ln(-\ln p)$. Block maxima waste data, since only one observation per block is used, which motivates the next approach.

### Peaks over threshold and the GPD
The **peaks-over-threshold** (POT) method keeps every loss above a high threshold $u$. For large $u$ the excess $y = X - u$ follows the **generalised Pareto distribution**

$$
G(y) = 1 - \left(1 + \frac{\xi y}{\beta}\right)^{-1/\xi}
$$

with scale $\beta > 0$ and the same shape $\xi$ as the GEV. If $N_u$ of $n$ observations exceed $u$, VaR and ES at confidence level $\alpha$ are

$$
\text{VaR}_\alpha = u + \frac{\beta}{\xi}\left[\left(\frac{n}{N_u}(1-\alpha)\right)^{-\xi} - 1\right], \qquad \text{ES}_\alpha = \frac{\text{VaR}_\alpha}{1-\xi} + \frac{\beta - \xi u}{1-\xi}
$$

The ES formula requires $\xi < 1$; otherwise the mean of the tail is infinite. The ratio $n/N_u$ rescales the tail probability to the fraction of the sample above the threshold.

### Choosing the threshold and estimating parameters
Threshold choice is a bias-variance trade-off. A threshold set too low includes non-tail observations, so the GPD approximation is poor (bias). A threshold set too high leaves too few exceedances, so the estimates are noisy (variance). Practitioners inspect a mean-excess plot, which becomes roughly linear in $u$ once the GPD fits, and check that $\xi$ is stable across nearby thresholds. Parameters are usually estimated by maximum likelihood; the Hill estimator is a simple alternative for $\xi$ when the tail is heavy.

### Limits of EVT
EVT assumes the extremes are i.i.d., yet financial losses cluster; a common fix is to apply EVT to GARCH residuals, as in filtered HS. Multivariate EVT is possible but suffers from the curse of dimensionality, so it is used for a few risk factors rather than whole portfolios. Finally, extrapolation is only as good as the few tail points behind it, so parameter uncertainty is large.

## Worked example
**POT.** From $n = 1{,}000$ daily losses (in %), $N_u = 50$ exceed the threshold $u = 2\%$. A GPD fit gives $\beta = 0.6$ and $\xi = 0.25$. Find the 99% VaR and ES.

1. Scaled tail probability: $\frac{n}{N_u}(1-\alpha) = \frac{1000}{50} \times 0.01 = 0.2$.
2. Raise to $-\xi$: $0.2^{-0.25} = 1.49535$; subtract 1: $0.49535$.
3. Multiply by $\beta/\xi = 0.6/0.25 = 2.4$: $1.18884$.
4. VaR $= 2 + 1.18884 =$ **3.19%**.
5. ES: $3.18884/0.75 = 4.25178$, plus $(0.6 - 0.25 \times 2)/0.75 = 0.13333$, so ES $=$ **4.39%**.

**GEV.** Monthly maximum losses are fitted with $\mu = 2\%$, $\sigma = 0.7\%$, $\xi = 0.3$. Find the monthly-maximum loss exceeded with 1% probability ($p = 0.99$).

1. $-\ln(0.99) = 0.0100503$.
2. $(0.0100503)^{-0.3} = 3.97508$; subtract 1: $2.97508$.
3. Multiply by $\sigma/\xi = 0.7/0.3 = 2.3333$: $6.94185$.
4. $x_{0.99} = 2 + 6.94185 =$ **8.94%**.

A Gumbel fit with the same $\mu$ and $\sigma$ gives $2 - 0.7\ln(0.0100503) = 2 + 0.7 \times 4.60015 = 5.22\%$: ignoring the heavy tail understates the extreme loss by more than 40%.

## Common exam traps
- Confusing the families: positive $\xi$ is Fréchet (fat tail), not Weibull.
- Inverting $n/N_u$ in the POT VaR formula.
- Forgetting to add the threshold $u$ back to the excess.
- Using EVT for central quantiles; it is designed only for the far tail.
- Assuming a higher threshold is always better; it raises estimation variance.

## Key takeaways
- EVT models extremes directly, with a limit theorem behind the extrapolation.
- GEV fits block maxima; its shape $\xi$ classifies tails as Fréchet, Gumbel or Weibull.
- POT fits a GPD to exceedances over a threshold and uses data more efficiently.
- POT VaR and ES have closed forms in $u$, $\beta$, $\xi$, $n$ and $N_u$.
- Threshold choice trades bias against variance; EVT assumes i.i.d. extremes.
