---
title: "Sample Moments"
duration: 24
---

## Lecture outline
- 00:00 - Hook: a fund averaged 2% a month over six months. How sure are we it is really 2%?
- 02:00 - Population versus sample; estimators are random variables
- 04:00 - Sample mean and standard error
- 08:00 - Sample variance and the n − 1 correction
- 11:00 - Sample skewness and kurtosis
- 13:00 - Unbiased, consistent, efficient and BLUE
- 16:00 - Law of large numbers and the central limit theorem
- 19:00 - Whiteboard: six monthly returns
- 23:00 - Traps and recap

## Slides
### Slide 1: Estimating what we cannot see
- True moments are unknown; we observe data
- Estimator = formula; estimate = number
- Estimators have their own sampling distributions

### Slide 2: Sample mean
- X̄ = (1/n) Σ Xi
- Unbiased: E[X̄] = μ
- Var(X̄) = σ² / n

### Slide 3: Standard error
- SE = σ / √n ≈ s / √n
- Four times the data halves the SE
- Not the same as the standard deviation of returns

### Slide 4: Sample variance
- s² = Σ (Xi − X̄)² / (n − 1)
- Divide-by-n version biased low: E = (n − 1)σ²/n
- Bias vanishes as n grows

### Slide 5: Skewness and kurtosis
- Standardised third and fourth central moments
- Equities: negative skew, kurtosis above 3
- Very noisy in small samples

### Slide 6: Estimator properties
- Unbiased: correct on average
- Consistent: converges to truth as n grows
- Efficient: lowest variance among unbiased estimators

### Slide 7: BLUE and bias-variance
- Sample mean is the best linear unbiased estimator
- A little bias can buy a lot less variance
- Judge estimators by overall accuracy

### Slide 8: Law of large numbers
- X̄ → μ as n → ∞
- Justifies using averages as estimates
- Requires iid data with finite mean

### Slide 9: Central limit theorem
- (X̄ − μ) / (σ / √n) → N(0, 1)
- Holds for non-normal data with finite variance
- Basis for confidence intervals and tests

### Slide 10: Worked results
- Mean 2.0%, s² = 9.2, s = 3.03%
- SE = 1.24%
- Skewness −0.14, kurtosis 1.73

### Slide 11: Exam traps
- n versus n − 1
- SE versus standard deviation
- CLT is about the sample mean, not the data

## Whiteboard examples
**Example 1 - Six monthly returns.** 2, −1, 4, 3, −2, 6 (%).
- X̄ = 12/6 = 2.0.
- Squared deviations 0, 9, 4, 1, 16, 16; sum 46.
- s² = 46/5 = 9.2; s = 3.03; biased σ̂² = 46/6 = 7.67.
- SE = 3.03/√6 = 1.24.
- Skewness = (−18/6)/2.77³ = −3/21.23 = −0.14; kurtosis = (610/6)/7.67² = 101.67/58.78 = 1.73.

**Example 2 - Five returns.** 5, −3, 8, 1, 4 (%).
- X̄ = 15/5 = 3.
- Squared deviations 4, 36, 25, 4, 1; sum 70.
- s² = 70/4 = 17.5; s = 4.18; biased version 70/5 = 14.0.

**Example 3 - Sample size and precision.** s = 1.2% per month.
- n = 36: SE = 1.2/6 = 0.20%.
- n = 144: SE = 1.2/12 = 0.10%. Four times the data halves the SE.

## Questions to ask students
- Why divide by n − 1? (Deviations are measured from X̄, which is fitted to the data, so one degree of freedom is used up and the n-divisor understates variance.)
- Is the divide-by-n variance consistent? (Yes; its bias (n − 1)/n tends to 1.)
- Does the CLT make daily returns normal? (No; it makes the sample mean approximately normal.)
- To cut the standard error by a factor of three, how much more data? (Nine times as much.)
- Why are kurtosis estimates unreliable in short samples? (Fourth powers let one extreme observation dominate.)

## Analogies
- An estimator is an archer: unbiased means arrows centre on the bullseye, efficient means they cluster tightly, consistent means they converge on it with practice.
- The n − 1 correction is a tax for having used the data to locate its own centre.
- The CLT is a blender: whatever lumpy ingredients go in, average enough of them and the result is smooth and bell-shaped.

## Recording tips
- Build the deviation table in columns (X, d, d², d³, d⁴) on screen; it makes all moments flow from one table.
- Show a quick simulation histogram of sample means from a skewed distribution to make the CLT visible.
- Repeat "SE divides by √n" whenever the standard error appears; this is the next lesson's key ingredient.
