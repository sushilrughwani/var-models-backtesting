---
title: "Correlation Basics and Empirical Properties"
---

## Learning goals
- Explain what correlation risk is and where it shows up in trading books, credit portfolios and risk measures.
- Calculate the payoff of a correlation swap from realised pairwise correlations.
- Quantify how a change in correlation moves the VaR of a two-asset portfolio.
- Describe the main empirical properties of equity correlations, including mean reversion and behaviour in downturns.
- Explain how a copula builds a joint distribution from marginal distributions and why the Gaussian copula understates joint extremes.

## Explanation

### Correlation is a risk factor, not a constant
Earlier lessons treated correlation as an input you plug into the VaR formula. In practice correlation moves, often violently, and positions gain or lose money when it does. **Correlation risk** is the exposure of a portfolio's value or risk to changes in the co-movement of two or more variables. Three places it bites:

- **Diversified portfolios:** if correlations jump towards one, diversification evaporates exactly when it is needed.
- **Credit:** default correlation drives the loss distribution of a loan book or a CDO tranche. Senior tranches lose value when default correlation rises; equity tranches can gain.
- **Wrong-way risk:** a counterparty's default probability is positively correlated with your exposure to it (for example, buying protection on a bank from a closely linked bank).

### Trading correlation: the correlation swap
A **correlation swap** lets an investor take a direct view on realised correlation. The buyer receives realised correlation and pays a fixed correlation:

$$
\text{Payoff} = N\,(\rho_{\text{realised}} - \rho_{\text{fixed}}), \qquad \rho_{\text{realised}} = \frac{2}{n(n-1)}\sum_{i<j}\rho_{ij}
$$

where $N$ is the notional per unit of correlation, $n$ is the number of assets in the basket and $\rho_{ij}$ is the realised correlation between the returns of assets $i$ and $j$ over the life of the swap. With $n$ assets there are $n(n-1)/2$ distinct pairs, so the realised leg is a simple average of pairwise correlations.

### Correlation and VaR
For two positions with dollar volatilities $\sigma_1 V_1$ and $\sigma_2 V_2$:

$$
\text{VaR}_P = z_c\sqrt{(\sigma_1V_1)^2 + (\sigma_2V_2)^2 + 2\rho\,\sigma_1V_1\,\sigma_2V_2}
$$

where $z_c$ is the standard normal quantile for confidence level $c$ and $\rho$ is the return correlation. VaR rises with $\rho$ for two long positions and reaches the simple sum of stand-alone VaRs at $\rho = 1$. A risk manager who calibrated $\rho$ in calm markets understates crisis VaR.

### Empirical properties of equity correlations
Studies of daily returns on large stocks find a consistent pattern:

- **Correlations rise in downturns.** Average pairwise correlation is noticeably higher in recessions and crashes than in expansions. Diversification is weakest when markets fall.
- **Strong mean reversion.** Correlation tends to drift back to a long-run level. Model this with $\rho_t - \rho_{t-1} = a(\mu_\rho - \rho_{t-1}) + \varepsilon_t$, where $a$ is the speed of mean reversion and $\mu_\rho$ the long-run mean. Because the change depends on the gap to the mean, the autocorrelation of correlation levels equals $1 - a$.
- **Correlation is itself volatile**, and its distribution is not normal, so point estimates deserve wide error bands.

### Copulas: joining marginals into a joint distribution
Often we know each variable's own (marginal) distribution well, say a fat-tailed loss for one borrower and a skewed loss for another, but there is no tidy joint distribution. A **copula** solves this. Each variable is mapped to a uniform percentile through its own cumulative distribution, and the percentiles are then linked through a chosen dependence structure.

In the **Gaussian copula**, each percentile is converted into a standard normal value and those values are assumed to be jointly normal with correlation $\rho$. It is easy to use, but it has no **tail dependence**: as you move further into the tail, joint extremes become relatively rarer than they really are. The Student-t copula adds tail dependence, and other copulas (such as Clayton or Gumbel) concentrate dependence in one tail. The pre-2008 reliance on Gaussian copulas to price CDO tranches is the classic warning.

## Worked example
A desk buys a three-stock correlation swap with notional USD 1,000,000 per unit of correlation and a fixed rate of 0.30. Over the year the realised pairwise correlations are 0.50, 0.30 and 0.40.

**Step 1 - realised correlation.** There are $3 \times 2 / 2 = 3$ pairs. Average $= (0.50 + 0.30 + 0.40)/3 = 0.40$.

**Step 2 - payoff.** $1{,}000{,}000 \times (0.40 - 0.30) = 100{,}000$. The buyer receives **USD 100,000**.

Now the VaR impact. The same desk holds USD 10 million in stock A (daily volatility 2%) and USD 5 million in stock B (daily volatility 1%). Dollar volatilities are 200,000 and 50,000.

**Step 3 - ρ = 0.5.** Variance $= 200{,}000^2 + 50{,}000^2 + 2(0.5)(200{,}000)(50{,}000) = 5.25\times10^{10}$; $\sigma_P = 229{,}129$. At 99% ($z = 2.326$), VaR $\approx$ USD 532,954.

**Step 4 - ρ = 0.9 (a stress).** Variance $= 6.05\times10^{10}$; $\sigma_P = 245{,}967$; VaR $\approx$ USD 572,120.

**Step 5 - interpret.** The correlation shock alone raises one-day 99% VaR by **about USD 39,166**, with no change in positions or volatilities.

## Common exam traps
- Summing pairwise correlations instead of averaging them for the realised leg of a correlation swap.
- Reversing the swap direction: the buyer receives realised and pays fixed, so a rise in correlation benefits the buyer.
- Assuming higher correlation always increases risk: for a long-short pair, higher correlation reduces VaR.
- Treating the mean-reversion rate $a$ as the autocorrelation; autocorrelation is $1 - a$.
- Believing the Gaussian copula captures joint crashes; it has zero tail dependence.

## Key takeaways
- Correlation changes over time and is a priced risk factor in its own right.
- A correlation swap pays notional times realised average correlation minus fixed correlation.
- Higher correlation between long positions raises portfolio VaR towards the sum of stand-alone VaRs.
- Equity correlations rise in downturns, mean-revert strongly and are themselves volatile.
- Copulas separate marginal behaviour from dependence; the Gaussian copula lacks tail dependence.
