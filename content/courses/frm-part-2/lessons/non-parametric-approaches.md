---
title: "Non-Parametric Approaches"
---

## Learning goals
- Explain how bootstrapping produces a VaR estimate and a confidence interval for it.
- Calculate age-weighted historical simulation weights and read VaR from cumulative weights.
- Rescale historical returns with volatility weighting and explain why it helps.
- Describe the steps of filtered historical simulation.
- Evaluate the strengths and weaknesses of non-parametric methods.

## Explanation

### Why go beyond basic historical simulation?
The previous lesson treated historical simulation (HS) as a simple order statistic: every one of the last $n$ days gets weight $1/n$, and any day older than $n$ gets zero. Two problems follow. First, a single estimate tells you nothing about its precision. Second, equal weights ignore the fact that today's market may be much calmer or much more volatile than the window average, and they create *ghost effects*: VaR jumps the day a crisis observation drops out of the window, even though nothing changed in the market. Non-parametric refinements fix these problems while still letting the data, not a distribution, shape the tail.

### Bootstrapping
The bootstrap resamples the historical data **with replacement** to create many artificial samples of the same size. Compute VaR (or ES) in each resample, then:

- the average across resamples is the bootstrapped estimate, and
- the spread of the resampled estimates gives a confidence interval, for example the 5th and 95th percentiles of the 1,000 bootstrapped VaRs.

The bootstrap assumes observations are independent. Volatility clustering violates that, so practitioners often resample blocks of consecutive days or resample standardised residuals instead of raw returns.

### Age-weighted HS
Age weighting gives recent observations more influence using a decay factor $\lambda$ between 0 and 1. The observation that is $i$ days old receives

$$
w(i) = \frac{\lambda^{i-1}(1-\lambda)}{1-\lambda^{n}}
$$

where $n$ is the window length; the denominator makes the weights sum to one. To read VaR, sort losses from largest to smallest, accumulate their weights, and stop where the cumulative weight first reaches $1-\alpha$. As $\lambda \to 1$ the weights approach $1/n$ and plain HS returns. Age weighting removes ghost effects because old observations fade gradually instead of falling off a cliff, and it can be applied to longer windows without letting stale data dominate.

### Volatility-weighted HS
Volatility weighting rescales each historical return by the ratio of today's volatility to the volatility on that day:

$$
r^{*}_{t} = r_t \times \frac{\sigma_{T}}{\sigma_t}
$$

where $r_t$ is the historical return on day $t$, $\sigma_t$ is the volatility estimate (often EWMA or GARCH) on that day, and $\sigma_T$ is today's estimate. A 2% drop during a calm period becomes a larger scenario today if markets are turbulent. Unlike plain HS, the resulting VaR can exceed the largest loss in the sample. A related idea, correlation weighting, adjusts historical returns so that their correlation matrix matches today's.

### Filtered historical simulation
Filtered HS (FHS) combines a parametric volatility model with non-parametric residuals:

1. Fit a GARCH-type model to returns and compute standardised residuals $z_t = r_t/\sigma_t$.
2. Bootstrap the residuals with replacement.
3. Multiply the drawn residuals by the model's current (and forecast) volatility to build scenarios, path by path for multi-day horizons.
4. Read VaR and ES from the simulated P&L.

FHS captures volatility clustering and fat-tailed residuals, handles multi-day horizons naturally and can be extended to many assets. Its cost is model dependence: if the GARCH model is wrong, so are the scenarios.

### Strengths and weaknesses overall
Non-parametric methods are intuitive, need no distributional assumption, capture fat tails and asymmetry in the data, and are easy to explain to management. They remain hostage to the data: if the sample contains no stress event, no reweighting can invent one (volatility scaling helps only partly), and large windows are needed to see extreme quantiles at all.

## Worked example
A desk uses age-weighted HS with $\lambda = 0.98$ and a 250-day window. Its seven largest losses, with the age of each observation in days, are listed below. Find the 95% VaR.

1. Normalising constant: $1 - 0.98^{250} = 0.99359$, so $w(i) = 0.98^{i-1} \times 0.02/0.99359$.
2. Newest weight: $w(1) = 0.02013$, five times the equal weight of $1/250 = 0.004$.
3. Weights and running totals:

| Loss | Age | Weight | Cumulative |
|---|---|---|---|
| 6.0% | 120 | 0.00182 | 0.00182 |
| 5.2% | 5 | 0.01857 | 0.02038 |
| 4.8% | 180 | 0.00054 | 0.02093 |
| 4.1% | 2 | 0.01973 | 0.04065 |
| 3.9% | 60 | 0.00611 | 0.04676 |
| 3.6% | 10 | 0.01678 | 0.06355 |

4. The cumulative weight first exceeds 5% at the 3.6% loss, so the age-weighted 95% VaR is **3.6%**.

Under equal weights these six losses carry only $6 \times 0.004 = 2.4\%$ of probability, so the equal-weight VaR would sit much lower, near the 13th-largest loss. The recent large losses (ages 2, 5, 10) dominate the age-weighted tail.

**Volatility weighting.** On one past day the return was $-2.4\%$ when EWMA volatility was 1.2%. Today's volatility is 1.8%, so the rescaled scenario is $-2.4\% \times 1.8/1.2 =$ **$-3.6\%$**.

## Common exam traps
- Using $\lambda^{i}$ instead of $\lambda^{i-1}$: the newest observation has exponent zero.
- Forgetting the $1-\lambda^n$ denominator, which makes weights sum to one over a finite window.
- Inverting the volatility ratio: scale by current over historical, not historical over current.
- Assuming the bootstrap fixes dependence; plain resampling assumes independent observations.
- Thinking weighted HS can generate losses larger than any in the sample: age weighting cannot, volatility weighting can.

## Key takeaways
- Bootstrapping gives both an estimate and a confidence interval for VaR or ES.
- Age weights $\lambda^{i-1}(1-\lambda)/(1-\lambda^n)$ favour recent data and remove ghost effects.
- Volatility weighting scales past returns by $\sigma_T/\sigma_t$ so scenarios reflect today's conditions.
- Filtered HS bootstraps GARCH residuals and rescales them by current volatility.
- All non-parametric methods are limited by what the historical sample contains.
