---
title: "Hypothesis Testing"
duration: 26
---

## Lecture outline
- 00:00 - Hook: a desk earned 0.5% a month. Skill or luck?
- 02:00 - The logic: assume the null, look for contradiction
- 05:00 - Null and alternative; one-tailed versus two-tailed
- 08:00 - The test statistic and critical values
- 12:00 - p-values and what they do not mean
- 15:00 - Confidence intervals and their link to tests
- 18:00 - Type I, Type II errors and power
- 21:00 - Whiteboard: the trading desk test
- 24:00 - Multiple testing, traps and recap

## Slides
### Slide 1: Skill or luck?
- Sample means are noisy estimates
- Testing asks whether noise alone explains the result
- Today: statistics, p-values, intervals, power

### Slide 2: Null and alternative
- H0: the "nothing special" claim (μ = μ0)
- H1: two-tailed μ ≠ μ0, or one-tailed μ > μ0
- We reject or fail to reject H0, never prove it

### Slide 3: Test statistic
- t = (X̄ − μ0) / (s / √n)
- Distance from the null in standard errors
- t with n − 1 df in small samples; normal in large

### Slide 4: Critical values
- Two-tailed 5%: |t| > 1.96
- One-tailed 5%: t > 1.645
- Two-tailed 1%: |t| > 2.58

### Slide 5: p-values
- Probability of a result at least this extreme if H0 is true
- Reject when p < α
- Not the probability that H0 is true

### Slide 6: Confidence intervals
- X̄ ± c × s / √n
- Contains every μ0 a two-tailed test would not reject
- Null outside the interval ⇒ reject

### Slide 7: Two kinds of error
- Type I: reject a true null, probability α
- Type II: miss a false null, probability β
- Power = 1 − β

### Slide 8: What drives power
- Larger n, larger true effect, lower volatility
- Higher α (at the cost of more false positives)
- Lower α reduces power for fixed n

### Slide 9: Worked results
- SE = 0.20%, t = 2.50, p = 0.0124
- 95% CI: 0.108% to 0.892%
- Power at true mean 0.5% ≈ 70.5%

### Slide 10: Multiple testing
- 20 tests at 5% ⇒ about one false discovery expected
- Bonferroni: use α / m
- Beware back-tested strategy mining

### Slide 11: Exam traps
- s versus s / √n
- One-tailed versus two-tailed critical values
- "Fail to reject", not "accept"

## Whiteboard examples
**Example 1 - Trading desk.** n = 64, X̄ = 0.5%, s = 1.6%, H0: μ = 0, two-tailed 5%.
- SE = 1.6/8 = 0.20.
- t = 2.50 > 1.96 ⇒ reject.
- p = 2 × 0.0062 = 0.0124.
- CI = 0.5 ± 0.392 = [0.108, 0.892].
- One-tailed: 2.50 > 1.645, also reject; one-tailed p = 0.0062.

**Example 2 - Power.** Same SE = 0.20; suppose true μ = 0.5.
- Two-tailed 5% power ≈ N(2.50 − 1.96) = N(0.54) = 0.705.
- One-tailed 5% power ≈ N(2.50 − 1.645) = N(0.855) = 0.804. One-tailed tests have more power in the stated direction.

**Example 3 - Confidence interval.** n = 100, X̄ = 1.2%, s = 3%.
- SE = 0.30; 95% CI = 1.2 ± 0.588 = [0.612, 1.788].
- 90% CI = 1.2 ± 1.645 × 0.30 = [0.7065, 1.6935].

## Questions to ask students
- A p-value is 0.03. Reject at 5%? At 1%? (Yes at 5%; no at 1%.)
- What happens to the confidence interval width if n quadruples? (It halves.)
- Which error is more serious for a bank approving a new risk model, and why? (Usually accepting a bad model, a Type II error if H0 is "the model is wrong"; framing matters.)
- If a 95% CI for alpha is [−0.1%, 0.9%], what does a two-tailed 5% test of zero conclude? (Fail to reject; zero lies inside.)
- How can you raise power without raising α? (Collect more data, or reduce noise in the measurement.)

## Analogies
- A hypothesis test is a criminal trial: the null is "innocent", the evidence must be beyond reasonable doubt, and "not guilty" is not the same as "innocent".
- Type I error is convicting an innocent person; Type II is letting a guilty one go. Tightening the standard of proof trades one for the other.
- A confidence interval is a fishing net: the method catches the true value 95% of the time, but any one cast either caught it or did not.

## Recording tips
- Draw the normal curve with shaded rejection regions for both one- and two-tailed tests side by side.
- Insist on the phrase "fail to reject" every time you state a non-rejection.
- Show that the CI and the two-tailed test give the same verdict on the worked example; students find this reassuring.
