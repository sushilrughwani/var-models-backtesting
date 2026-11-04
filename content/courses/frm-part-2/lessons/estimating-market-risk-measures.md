---
title: "Estimating Market Risk Measures"
---

## Learning goals
- Estimate VaR and expected shortfall from historical data using order statistics.
- Calculate normal VaR and ES, including a non-zero mean return.
- Calculate lognormal VaR and explain why it never exceeds the position value.
- Approximate ES by averaging VaRs over slices of the tail.
- Explain why ES is coherent while VaR is not.

## Explanation

### From Part I definitions to Part II estimation
In Part I you learned that VaR is a loss quantile and expected shortfall (ES) is the average loss beyond that quantile. Part II asks a harder question: given real data, how do we *estimate* those numbers, and how much should we trust the estimate? Every method in this module is a different answer to one problem: what does the left tail of the P&L distribution look like?

Throughout, we treat losses as positive numbers. At confidence level $\alpha$ (say 95% or 99%), VaR is the loss exceeded with probability $1-\alpha$.

### Historical simulation with order statistics
Collect $n$ past P&L outcomes for today's portfolio and sort the losses from largest to smallest. The tail contains $n(1-\alpha)$ observations. A common Part II convention takes the **VaR as the first observation just outside the tail**, the $\big(n(1-\alpha)+1\big)$-th largest loss, so with 1,000 observations the 95% VaR is the 51st-largest loss. Other texts use the $n(1-\alpha)$-th largest; exam questions state which rule they want. ES is the average of the losses *inside* the tail.

Historical simulation needs no distributional assumption, but its estimate is only as good as the window: a calm sample understates risk, and a small tail sample makes ES noisy.

### Parametric normal VaR and ES
If P&L (or returns) are normal with mean $\mu$ and standard deviation $\sigma$, then

$$
\text{VaR}_\alpha = -\mu + \sigma z_\alpha, \qquad \text{ES}_\alpha = -\mu + \sigma\,\frac{\phi(z_\alpha)}{1-\alpha}
$$

where $z_\alpha$ is the standard normal quantile (1.645 at 95%, 2.326 at 99%) and $\phi(\cdot)$ is the standard normal density. A positive expected return *reduces* both measures, because the whole distribution shifts away from losses. Multiply by position value $P$ when $\mu$ and $\sigma$ are returns.

### Lognormal VaR
If geometric returns are normal, prices are lognormal and cannot fall below zero. The VaR of a position worth $P$ is

$$
\text{VaR}_\alpha = P\left(1 - e^{\mu - \sigma z_\alpha}\right)
$$

Because $e^{\mu-\sigma z}$ is always positive, lognormal VaR is always smaller than $P$, whereas normal VaR can exceed the position value at long horizons or high volatility. For short horizons the two give similar answers.

### ES as an average of tail VaRs
ES can be estimated for *any* distribution by slicing the tail into $m$ equal probability pieces, computing VaR at each slice's confidence level, and averaging. For 95% ES with $m=9$ slices you would average VaRs at 95.5%, 96%, ..., 99.5%. For a standard normal that average is 2.025, close to the exact 2.063; the approximation improves as $m$ grows.

### Why ES is preferred: coherence
A coherent risk measure is monotonic, translation invariant, positively homogeneous and **subadditive**: the risk of a combined portfolio is no larger than the sum of the parts. VaR can violate subadditivity (classic case: two independent bonds that each default with 4% probability), so merging positions can appear to *raise* risk. ES is always subadditive and also tells you how bad losses are beyond the cutoff, which VaR ignores. Its price is that it is harder to backtest and needs more tail data.

### Precision of estimates
Any quantile estimate has sampling error. Standard errors widen as the confidence level rises and as the sample shrinks, so a 99.9% historical VaR from one year of data is mostly noise. Report confidence intervals, not single numbers, when the tail sample is thin.

## Worked example
A USD 10 million equity portfolio has a daily mean return of 0.05% and a daily volatility of 1.2%. Compute the one-day 99% normal VaR, normal ES and lognormal VaR. Then estimate 95% historical VaR and ES from 100 days of data whose seven largest losses (USD thousands) are 820, 640, 515, 470, 455, 410 and 388.

**Normal VaR**
1. $\sigma z = 0.012 \times 2.326 = 0.027912$.
2. Subtract the mean: $0.027912 - 0.0005 = 0.027412$.
3. VaR $= 0.027412 \times 10{,}000{,}000 =$ **USD 274,120**.

**Normal ES**
1. $\phi(2.326) = 0.026674$, so $\phi(z)/(1-\alpha) = 0.026674/0.01 = 2.6674$.
2. $\sigma \times 2.6674 = 0.032009$; subtract the mean: $0.031509$.
3. ES $= 0.031509 \times 10{,}000{,}000 \approx$ **USD 315,085**.

**Lognormal VaR**
1. Exponent: $0.0005 - 0.027912 = -0.027412$.
2. $e^{-0.027412} = 0.972960$.
3. VaR $= 10{,}000{,}000 \times (1 - 0.972960) \approx$ **USD 270,397**, slightly below the normal figure.

**Historical simulation (100 days, 95%)**
1. Tail size: $100 \times 0.05 = 5$ observations.
2. VaR = the 6th-largest loss = **USD 410,000**.
3. ES = average of the five largest: $(820+640+515+470+455)/5 =$ **USD 580,000**.

The historical ES is far above the normal ES scaled to 95%, a hint that this portfolio has fatter tails than the normal model assumes.

## Common exam traps
- Forgetting to subtract the mean: a positive $\mu$ lowers VaR and ES.
- Using $z_\alpha$ instead of $\phi(z_\alpha)/(1-\alpha)$ for normal ES; at 99% the ES multiplier is 2.665, not 2.326.
- Mixing up the order-statistic convention: read whether VaR is the $n(1-\alpha)$-th or the next observation.
- Averaging the tail *including* the VaR observation when the question defines ES as the mean beyond VaR.
- Claiming VaR is coherent; it fails subadditivity in general.

## Key takeaways
- Historical VaR is an order statistic; historical ES is the mean of the tail observations.
- Normal VaR $= -\mu + \sigma z$; normal ES $= -\mu + \sigma\phi(z)/(1-\alpha)$.
- Lognormal VaR $= P(1-e^{\mu-\sigma z})$ is bounded by the position value.
- ES can be approximated by averaging VaRs across equal tail slices.
- ES is coherent and tail-sensitive; VaR is neither, but is easier to backtest.
