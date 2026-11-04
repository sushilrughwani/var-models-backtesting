---
title: "Backtesting VaR"
---

## Learning goals
- Count VaR exceptions and test unconditional coverage with the binomial z-test.
- Calculate the Kupiec likelihood-ratio statistic and compare it with a chi-squared critical value.
- Explain Type I and Type II errors and how confidence level and sample size affect them.
- Describe the Christoffersen independence and conditional coverage tests.
- Apply the Basel traffic-light zones and capital multipliers.

## Explanation

### What backtesting asks
The earlier lessons produced VaR estimates by several methods. Backtesting asks whether those estimates are any good. Each day we compare actual P&L with the VaR reported the day before. A loss larger than VaR is an **exception** (or exceedance). If a 99% VaR model is correct, exceptions occur on about 1% of days, and they arrive randomly rather than in bunches. These two requirements are called **unconditional coverage** and **independence**.

A practical detail: compare VaR with P&L that excludes fees, intraday trading and other items unrelated to the overnight positions ("clean" or hypothetical P&L); actual P&L is also monitored.

### Unconditional coverage: the z-test
With $T$ days and exception probability $p = 1-\alpha$, the number of exceptions $N$ is binomial with mean $pT$ and variance $p(1-p)T$. For large $T$,

$$
z = \frac{N - pT}{\sqrt{p(1-p)T}}
$$

is approximately standard normal. Reject the model at the 95% two-tailed level if $|z| > 1.96$. Too many exceptions mean risk is understated; too few suggest an overly conservative model, which wastes capital.

### Unconditional coverage: Kupiec's likelihood ratio
The proportion-of-failures test compares the likelihood of the data under the model's $p$ with the likelihood under the observed rate $\hat p = N/T$:

$$
LR_{uc} = -2\ln\!\left[(1-p)^{T-N}p^{N}\right] + 2\ln\!\left[(1-\hat p)^{T-N}\hat p^{\,N}\right]
$$

$LR_{uc}$ is chi-squared with one degree of freedom; reject if it exceeds 3.84 (95% confidence).

### Type I and Type II errors
A **Type I error** rejects a correct model; a **Type II error** accepts a bad one. The cut-off for "too many exceptions" trades one against the other. Backtests have low power at high confidence levels: with a 99% VaR and 250 days, only 2.5 exceptions are expected, so a model that is truly a 98% model is hard to distinguish from a good one. Lowering the backtest confidence level (for example to 95%) or lengthening the sample raises power, which is why some banks backtest a lower-confidence VaR alongside the regulatory one.

### Independence and conditional coverage
A model with the right *number* of exceptions can still fail if they cluster, for instance five exceptions in one stressed week. Christoffersen's test tracks transitions between "no exception" (0) and "exception" (1) days. Let $\pi_0$ be the probability of an exception after a quiet day and $\pi_1$ after an exception day. Under independence $\pi_0 = \pi_1$. The likelihood-ratio statistic $LR_{ind}$ is chi-squared with one degree of freedom (critical value 3.84). The joint **conditional coverage** test is

$$
LR_{cc} = LR_{uc} + LR_{ind}
$$

which is chi-squared with two degrees of freedom (critical value 5.99). Clustering usually signals that the model reacts too slowly to volatility, a common problem with equal-weight historical simulation.

### The Basel traffic light
Regulators backtest 99% one-day VaR over the most recent 250 trading days and sort banks into zones:

| Zone | Exceptions | Multiplier |
|---|---|---|
| Green | 0-4 | 3.00 |
| Yellow | 5, 6, 7, 8, 9 | 3.40, 3.50, 3.65, 3.75, 3.85 |
| Red | 10 or more | 4.00 |

Market risk capital is the larger of yesterday's VaR and the multiplier times the 60-day average VaR (both 10-day, 99%). Yellow-zone exceptions may be excused if caused by events such as a sudden market crash rather than model flaws; a red zone usually forces model changes. The green cut-off at four is chosen so that a correct model lands outside green only about 11% of the time.

## Worked example
A bank backtests its 99% one-day VaR over 250 days and records 7 exceptions. Test unconditional coverage and find its Basel zone.

**z-test**
1. Expected exceptions: $pT = 0.01 \times 250 = 2.5$.
2. Standard deviation: $\sqrt{0.01 \times 0.99 \times 250} = \sqrt{2.475} = 1.5732$.
3. $z = (7 - 2.5)/1.5732 = 2.86$, which exceeds 1.96: reject.

**Kupiec LR**
1. $\hat p = 7/250 = 0.028$.
2. Log-likelihood under the model: $243\ln(0.99) + 7\ln(0.01) = -34.678$.
3. Log-likelihood at $\hat p$: $243\ln(0.972) + 7\ln(0.028) = -31.930$.
4. $LR_{uc} = -2(-34.678 + 31.930) = 5.50 > 3.84$: **reject the model at 95% confidence**.

**Basel zone**
Seven exceptions fall in the **yellow zone, multiplier 3.65**. If the 60-day average VaR is USD 20 million and yesterday's VaR is USD 25 million, capital is $\max(25,\ 3.65 \times 20) =$ USD 73 million.

## Common exam traps
- Using $\sqrt{pT}$ instead of $\sqrt{p(1-p)T}$ in the z-test denominator.
- Forgetting that too *few* exceptions is also a rejection in a two-tailed test.
- Comparing $LR_{cc}$ with 3.84; the joint test has two degrees of freedom, so the critical value is 5.99.
- Applying the multiplier to yesterday's VaR rather than to the 60-day average.
- Believing a higher VaR confidence level makes backtesting easier; it makes it harder because exceptions are rarer.

## Key takeaways
- A good VaR model has the right exception frequency and independent exceptions.
- The z-test and Kupiec LR test unconditional coverage; Christoffersen's test checks clustering.
- Type I errors reject good models, Type II errors accept bad ones; power is low at 99%.
- Basel zones: green 0-4, yellow 5-9, red 10+, with multipliers from 3 to 4.
- Capital = max(yesterday's VaR, multiplier × 60-day average VaR).
