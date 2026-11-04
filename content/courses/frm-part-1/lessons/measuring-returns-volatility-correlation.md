---
title: "Measuring Returns, Volatility and Correlation"
---

## Learning goals
- Calculate simple and log returns and explain when each one aggregates correctly.
- Estimate volatility from return data and scale it across horizons with the square-root-of-time rule.
- Describe how financial returns depart from normality and apply the Jarque-Bera test.
- Calculate and interpret Spearman's rank correlation and Kendall's tau, and contrast them with Pearson correlation.

## Explanation

### Two ways to measure a return
The **simple return** over one period is $R_t = (P_t - P_{t-1})/P_{t-1}$, including any dividend in the numerator. The **log (continuously compounded) return** is

$$
r_t = \ln\left(\frac{P_t}{P_{t-1}}\right) = \ln(1 + R_t)
$$

The two are close for small moves, but the log return is always below the simple return unless the price is unchanged. Their key difference is how they add up:
- **Over time**, log returns add: a multi-period log return is the sum of the single-period log returns. Simple returns must be compounded: $1 + R_{0,T} = \prod (1 + R_t)$.
- **Across assets**, simple returns add: a portfolio's simple return is the weighted average of its holdings' simple returns. Log returns do not aggregate this way.

So time-series models of a single asset often use log returns, while portfolio calculations use simple returns.

### Estimating and scaling volatility
Volatility is the standard deviation of returns. With $n$ observations and mean $\hat\mu$,

$$
\hat\sigma^2 = \frac{1}{n-1}\sum_{t=1}^{n}(r_t - \hat\mu)^2
$$

For daily data the mean is tiny relative to the dispersion, so practitioners often set $\hat\mu = 0$ and divide by $n$. If returns are independent and identically distributed, variance grows linearly with the horizon, so volatility scales with the square root of time:

$$
\sigma_{T} = \sigma_{1}\sqrt{T}
$$

With about 252 trading days a year, annual volatility is $\sigma_{daily}\sqrt{252}$; weekly data use $\sqrt{52}$ and monthly data $\sqrt{12}$. The rule fails when returns are autocorrelated or volatility changes over time. Volatility can also be read from option prices as **implied volatility**; the VIX index is a market-wide measure of 30-day implied volatility on US equities.

### Returns are not normal
Real return distributions show three regular features:
1. **Fat tails**: kurtosis above 3, so extreme moves are far more common than a normal distribution predicts.
2. **Skewness**: equity returns are usually negatively skewed, with large crashes more frequent than large rallies.
3. **Volatility clustering**: calm and turbulent periods persist, so the variance itself is time-varying. Mixing calm and stressed regimes is one reason unconditional returns look fat-tailed.

The **Jarque-Bera test** checks whether sample skewness $S$ and kurtosis $K$ are consistent with normality (where $S = 0$ and $K = 3$):

$$
JB = \frac{n}{6}\left(S^2 + \frac{(K-3)^2}{4}\right) \sim \chi^2_2
$$

The 5% critical value is 5.99.

### Correlation beyond Pearson
Pearson correlation measures **linear** association. It can miss strong non-linear dependence, is sensitive to outliers, and is undefined if variances are infinite. Rank correlations use only the ordering of the data:

$$
\rho_S = 1 - \frac{6\sum_{i=1}^{n} d_i^2}{n(n^2-1)}, \qquad \tau = \frac{n_c - n_d}{n(n-1)/2}
$$

For **Spearman's** $\rho_S$, $d_i$ is the difference between the ranks of $X_i$ and $Y_i$. For **Kendall's** $\tau$, $n_c$ and $n_d$ are the numbers of concordant pairs (both variables move in the same direction between two observations) and discordant pairs (they move in opposite directions). Both are unchanged by any strictly increasing transformation of the data and are robust to outliers. Kendall's tau is usually smaller in magnitude than Spearman's.

## Worked example
**Part 1 - returns.** A stock moves from 100 to 110 and then to 99.
- Simple returns: $+10.00\%$ and $-10.00\%$. Their sum is 0%, but the true two-day simple return is $99/100 - 1 = -1.00\%$.
- Log returns: $\ln(1.10) = 9.531\%$ and $\ln(0.90) = -10.536\%$. Sum: $-1.005\%$, which equals $\ln(0.99)$ exactly.

**Part 2 - volatility and normality.** Daily volatility is 1.2%. Annualised: $1.2\% \times \sqrt{252} = $ **19.05%**. Over 250 days the sample skewness is $-0.4$ and kurtosis is 5.0: $JB = (250/6)(0.16 + 4/4) = 48.33 > 5.99$, so normality is **rejected**.

**Part 3 - rank correlation.** Five daily returns (%) for two banks:

| Day | X | Y | Rank X | Rank Y | d |
|---|---|---|---|---|---|
| 1 | 2.1 | 1.8 | 4 | 4 | 0 |
| 2 | -0.5 | 0.4 | 2 | 3 | -1 |
| 3 | 1.3 | -0.3 | 3 | 2 | 1 |
| 4 | 3.0 | 2.5 | 5 | 5 | 0 |
| 5 | -1.2 | -0.9 | 1 | 1 | 0 |

$\sum d^2 = 2$, so $\rho_S = 1 - 12/120 = $ **0.90**. Of the 10 pairs, 9 are concordant and 1 (days 2 and 3) is discordant: $\tau = (9-1)/10 = $ **0.80**. Pearson correlation is 0.85.

## Common exam traps
- Adding simple returns over time or averaging log returns across assets in a portfolio.
- Scaling volatility by $T$ instead of $\sqrt{T}$, or using 365 instead of the stated trading-day count.
- Comparing kurtosis with 0 when the formula uses raw kurtosis (normal = 3), or vice versa with excess kurtosis.
- Forgetting the denominator $n(n^2-1)$ in Spearman's formula or $n(n-1)/2$ in Kendall's.
- Assuming zero Pearson correlation means independence.

## Key takeaways
- Log returns add over time; simple returns add across assets.
- Volatility scales with $\sqrt{T}$ only if returns are i.i.d.
- Returns are fat-tailed, often negatively skewed and show volatility clustering.
- Jarque-Bera compares skewness and kurtosis with 0 and 3 using a $\chi^2_2$ distribution.
- Spearman and Kendall rank correlations capture monotonic dependence and resist outliers.
