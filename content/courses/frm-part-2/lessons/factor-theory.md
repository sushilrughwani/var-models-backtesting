---
title: "Factor Theory and Factor Investing"
---

## Learning goals
- Explain why factors earn risk premiums by paying off poorly in bad times.
- Distinguish macroeconomic factors from investment-style factors such as value, size, momentum and low volatility.
- Calculate expected returns and factor-adjusted alpha with a multifactor model.
- Compare risk-based and behavioural explanations of factor premiums and what each implies for persistence.
- Evaluate practical choices in implementing factor strategies: long-only tilts, long-short portfolios, costs and capacity.

## Explanation

### Assets are bundles of factors
Think of a factor the way a nutritionist thinks of nutrients. Investors do not really want "a stock"; they want exposure to the underlying drivers of return. A bank share is a bundle of market risk, interest-rate risk, value exposure and some idiosyncratic noise. Idiosyncratic noise can be diversified away for free, so it should earn no premium. Factor exposures cannot be diversified away, so they must be paid for.

### Why factors earn premiums: bad times
The central idea of factor theory is that a factor earns a premium only if it tends to lose money when investors can least afford losses: recessions, market crashes, spikes in volatility or unemployment. Formally, asset pricing uses a stochastic discount factor $m$ that is high in bad times. The expected excess return on any asset satisfies

$$
E(R_i) - R_f = -R_f \cdot \text{cov}(m, R_i)
$$

where $R_i$ is the asset return, $R_f$ the risk-free rate and $m$ the discount factor (marginal utility). An asset that pays off when $m$ is high (bad times) has negative covariance with $m$ and so a *low* or negative premium; it behaves like insurance. An asset that crashes in bad times must offer a high average return to persuade anyone to hold it. Under the CAPM the only bad time is a low market return, so $m$ is linear in the market and beta is the only priced risk.

### Two families of factors
**Macroeconomic factors** are the deep sources of bad times: economic growth, inflation, and volatility. Assets that fall when growth slows or when inflation surprises upward should earn premiums. Volatility is a distinctive factor: equities do badly when volatility rises, so investors who sell volatility protection (for example, by writing put options) earn a premium for bearing that crash risk.

**Investment-style (dynamic) factors** are tradable long-short portfolios:
- **Market**: equities over cash.
- **Size (SMB)**: small minus big stocks; the premium has been weak since its discovery.
- **Value (HML)**: cheap stocks (high book-to-market) minus expensive ones.
- **Momentum (UMD)**: recent winners minus recent losers; prone to sudden crashes after market rebounds.
- **Low volatility / low beta**: low-risk stocks have historically delivered risk-adjusted returns that are too high relative to the CAPM.
- **Quality and credit/term factors** in bonds.

The Fama-French three-factor model is the workhorse:

$$
E(R_i) = R_f + \beta_i\,[E(R_M) - R_f] + s_i\,E(SMB) + h_i\,E(HML)
$$

where $\beta_i$, $s_i$ and $h_i$ are the asset's loadings (regression slopes) on the market excess return, the size factor and the value factor. Adding momentum gives a four-factor model. A manager's **alpha** is the realised return minus the return explained by the factor loadings, so the same fund can show a large CAPM alpha and zero factor-adjusted alpha.

### Rational versus behavioural stories
Risk-based explanations say value stocks are distressed firms with inflexible capital that do badly in recessions, so the value premium is compensation. Behavioural explanations say investors overextrapolate past growth, overpaying for glamour stocks, and that limits to arbitrage stop smart money from correcting this. Momentum is usually explained behaviourally (under-reaction, then over-reaction). The distinction matters: a risk premium should persist, while a mispricing may be arbitraged away once widely known and cheaply traded.

### Implementation
A long-only investor can only tilt toward factors; a long-short portfolio captures the pure factor but needs shorting, leverage and higher costs. Factor premiums are volatile and can underperform for a decade, so the investor must be able to bear the bad times that justify the premium. Factor timing is hard, crowding can compress premiums, and turnover-heavy factors such as momentum are costly to run at scale.

## Worked example
A fund has estimated loadings $\beta = 1.1$, $s = 0.4$ and $h = -0.3$ (a growth tilt). The risk-free rate is 3%, the expected market risk premium 6%, the expected SMB premium 2% and the expected HML premium 3%.

**Step 1: market contribution.** $1.1 \times 6\% = 6.6\%$.

**Step 2: size contribution.** $0.4 \times 2\% = 0.8\%$.

**Step 3: value contribution.** $-0.3 \times 3\% = -0.9\%$. The negative loading means the fund gives up the value premium.

**Step 4: add up.**

$$
E(R) = 3\% + 6.6\% + 0.8\% - 0.9\% = 9.5\%
$$

The fund's required (factor-implied) return is **9.5%**. If it actually earned 12%, its three-factor alpha would be $12\% - 9.5\% = 2.5\%$. Under the CAPM alone the benchmark would be $3\% + 6.6\% = 9.6\%$, giving an alpha of 2.4%: here the size and value loadings almost cancel, but for a small-value fund the CAPM alpha would be heavily overstated.

## Common exam traps
- Saying a factor earns a premium because it is volatile; it earns a premium because it does badly in bad times.
- Treating an asset that pays off in crashes (such as a long put or long volatility) as risky; it is insurance and should have a low or negative expected excess return.
- Forgetting the sign of a loading: a negative HML loading subtracts the value premium.
- Confusing CAPM alpha with factor-adjusted alpha; much "alpha" is just cheap factor beta.
- Assuming a behavioural premium is as durable as a risk premium.

## Key takeaways
- Factors are the deep, non-diversifiable sources of risk; assets are bundles of factor exposures.
- A factor premium is compensation for losing money in bad times, captured by covariance with the discount factor.
- Macro factors (growth, inflation, volatility) underpin tradable style factors (value, size, momentum, low volatility).
- Multifactor expected return = risk-free rate plus the sum of loadings times factor premiums.
- Alpha should be measured after controlling for factor exposures.
- Implementation requires tolerance for long periods of factor underperformance, plus attention to costs, shorting and crowding.
