---
title: "Common Univariate Random Variables"
duration: 28
---

## Lecture outline
- 00:00 - Hook: your VaR model had 5 exceedances in 250 days. Which distribution tells you if that is bad luck?
- 03:00 - Bernoulli and binomial: counting defaults and exceedances
- 08:00 - Poisson: random arrivals of operational losses
- 11:00 - Normal distribution, standardising and critical values
- 15:00 - Lognormal prices: median versus mean
- 18:00 - Chi-square, Student's t and F: the testing family
- 22:00 - Whiteboard: four-part worked example
- 26:00 - Traps and recap

## Slides
### Slide 1: A toolkit of distributions
- Counting: Bernoulli, binomial, Poisson
- Continuous: normal, lognormal, uniform, exponential
- Testing: chi-square, t, F

### Slide 2: Bernoulli and binomial
- Bernoulli: one trial, mean p, variance p(1 − p)
- Binomial: P(X = k) = C(n, k) p^k (1 − p)^(n − k)
- Mean np, variance np(1 − p)

### Slide 3: Poisson
- Random arrivals at average rate λ
- P(X = k) = λ^k e^(−λ) / k!
- Mean = variance = λ

### Slide 4: The normal distribution
- Symmetric, skewness 0, kurtosis 3
- z = (x − μ) / σ
- Critical values: 1.645, 1.96, 2.326, 2.58

### Slide 5: Lognormal prices
- ln S normal ⇒ S lognormal, never negative
- Median = S0 e^m
- Mean = S0 e^(m + s²/2) > median

### Slide 6: Chi-square
- Sum of k squared standard normals
- Mean k, variance 2k, right-skewed
- Tests on a variance

### Slide 7: Student's t
- Z divided by √(χ²/ν)
- Fatter tails; variance ν / (ν − 2)
- Converges to normal as ν grows

### Slide 8: F distribution
- Ratio of two chi-squares, each over its df
- Compares variances; joint regression tests
- Always non-negative

### Slide 9: Worked results
- Binomial: P(≥ 2 defaults of 10) = 0.0861
- Poisson λ = 2: P(3) = 0.1804
- Normal: P(R < −5%) = 0.0668; lognormal median 105.13, mean 107.25

### Slide 10: Exam traps
- Missing C(n, k)
- One-tailed versus two-tailed z
- Lognormal median is not the mean

## Whiteboard examples
**Example 1 - Binomial defaults.** n = 10, p = 0.05.
- P(0) = 0.95^10 = 0.5987; P(1) = 10 × 0.05 × 0.95^9 = 0.3151.
- P(≥ 2) = 1 − 0.9139 = 0.0861.
- Mean defaults = 0.5; variance = 0.475.

**Example 2 - Poisson operational losses.** λ = 2 per year.
- P(0) = e^(−2) = 0.1353.
- P(3) = 8 × 0.1353 / 6 = 0.1804.
- P(at most 3) = 0.1353 + 0.2707 + 0.2707 + 0.1804 = 0.8571.

**Example 3 - Normal and lognormal.**
- Monthly return N(1%, 4%²): z for −5% is −1.5, probability 0.0668.
- 5% one-tailed quantile: 1% − 1.645 × 4% = −5.58%.
- Stock at 100, log return N(0.05, 0.20²): median 105.13, mean 100e^0.07 = 107.25.

## Questions to ask students
- Which distribution counts VaR exceedances over 250 days? (Binomial with n = 250, p = 1 − confidence level.)
- A Poisson process has mean 4. What is its variance? (4.)
- Why is the lognormal mean above its median? (Right skew: large upside outcomes pull the mean up.)
- What happens to the t distribution as degrees of freedom go to infinity? (It converges to the standard normal.)
- What is the mean of a chi-square with 10 degrees of freedom? (10, with variance 20.)

## Analogies
- Binomial is a coin tossed n times; Poisson is raindrops landing on a paving stone at a steady average rate.
- The t distribution is the normal wearing a heavier coat in the tails to admit it is unsure about the variance.
- Lognormal growth is like compound interest: percentage moves stack, so the upside stretches further than the downside.

## Recording tips
- Keep a "critical values" box on screen throughout the normal section; students confuse 1.645 and 1.96 constantly.
- Show a plot of normal versus t (ν = 4) to make "fat tails" visual.
- Link the binomial explicitly to VaR backtesting so students see why it matters for risk management.
