---
title: "Hypothesis Testing"
duration: 30
---

## Lecture outline
- 00:00 - Hook: a fund claims skill after a good year. How would a court of statistics judge it?
- 03:00 - The six steps; null and alternative; one- versus two-tailed
- 08:00 - Type I and Type II errors, significance and power
- 12:00 - p-values and the decision rule
- 15:00 - t-test of a single mean (whiteboard part 1)
- 18:00 - Difference in means: independent (pooled) versus paired
- 22:00 - Chi-square test of a variance and F-test of two variances (whiteboard part 2)
- 27:00 - Exam traps and recap

## Slides
### Slide 1: Innocent until proven guilty
- H0 is presumed true until evidence is strong
- We reject or fail to reject, never "accept"
- The claim we want to support goes in Ha

### Slide 2: The six steps
- State hypotheses; choose the test statistic
- Set α; state the decision rule
- Compute; decide statistically, then economically

### Slide 3: One- versus two-tailed
- Two-tailed: H0 μ = μ0, α split across both tails
- One-tailed: H0 μ ≤ μ0 versus Ha μ > μ0
- 5% critical z: 1.96 two-tailed, 1.645 one-tailed

### Slide 4: Errors and power
- Type I: reject a true H0, probability α
- Type II: fail to reject a false H0, probability β
- Power = 1 − β; more data lowers both errors

### Slide 5: p-values
- Smallest α at which H0 is rejected
- Reject if p < α
- Not the probability that H0 is true

### Slide 6: Single mean
- t = (X̄ − μ0)/(s/√n), df = n − 1
- Fund example: t = 1.50 versus 1.690
- Fail to reject: no proof of positive mean

### Slide 7: Two independent means
- Pooled variance sp² = [(n1 − 1)s1² + (n2 − 1)s2²]/(n1 + n2 − 2)
- t = (X̄1 − X̄2)/√(sp²/n1 + sp²/n2)
- df = n1 + n2 − 2

### Slide 8: Paired comparisons
- Same subjects measured twice → dependent samples
- Test the mean difference: t = d̄/(sd/√n)
- Removes common variation, increasing power

### Slide 9: Chi-square test of a variance
- χ² = (n − 1)s²/σ0², df = n − 1
- Requires a normal population
- Bounded at zero, right-skewed

### Slide 10: F-test of two variances
- F = s1²/s2², larger variance on top
- df = (n1 − 1, n2 − 1)
- Requires independent normal populations

### Slide 11: Which test?
- One mean → t; two independent means → pooled t; paired → t on differences
- One variance → χ²; two variances → F
- Always check df and number of tails

### Slide 12: Exam traps
- Claim in the null
- Wrong tail critical value
- Standard deviations instead of variances in χ² and F

## Whiteboard examples
**Example 1 - Single mean.** n = 36, X̄ = 1.2%, s = 4.8%; H0: μ ≤ 0; α = 5%; critical t(35) = 1.690.
- SE = 0.80; t = 1.50; fail to reject H0.

**Example 2 - Variance.** n = 24, s = 5%, H0: σ² ≤ 16; critical χ²(23, 5% upper) = 35.172.
- χ² = 23 × 25/16 = 35.94; reject H0. Volatility exceeds 4%.

**Example 3 - Paired test.** Five funds' return improvements after a fee cut: 1.2, −0.4, 0.8, 2.0, 0.6 (percent).
- d̄ = 0.84; sd = 0.876; SE = 0.876/√5 = 0.392; t = 2.14 with 4 df.
- Two-tailed 5% critical value 2.776: fail to reject. One-tailed 5% critical value 2.132: reject.
- Lesson: the choice of tails, made before seeing the data, can flip the conclusion.

**Example 4 (optional) - Pooled test.** n1 = n2 = 20; X̄1 = 1.5, s1 = 3; X̄2 = 0.5, s2 = 4.
- sp² = (19 × 9 + 19 × 16)/38 = 12.5; SE = √(12.5/20 + 12.5/20) = 1.118; t = 1.0/1.118 = 0.89; fail to reject at 5% (critical about 2.02).

## Questions to ask students
- A researcher wants to show a strategy beats 2%. Write the hypotheses. (H0: μ ≤ 2%; Ha: μ > 2%.)
- If we move α from 5% to 1%, what happens to β? (It rises, holding sample size constant.)
- A test gives p = 0.03. Reject at 5%? At 1%? (Yes at 5%; no at 1%.)
- Monthly returns of the same 30 funds before and after a regulation change: independent or paired test? (Paired.)
- Two sample variances: 36 and 16. F-statistic? (36/16 = 2.25.)

## Analogies
- A criminal trial: H0 is "innocent". A Type I error convicts an innocent person; a Type II error frees a guilty one. Demanding stronger proof (lower α) frees more guilty people.
- The p-value is a surprise meter: how surprised you would be by this data if the null were true.
- Paired testing is like weighing yourself on the same scale before and after a diet; the scale's own error cancels out.

## Recording tips
- Keep a "which test" decision table on screen in the second half of the lecture.
- Sketch the rejection region for each example; students struggle to see one-tailed versus two-tailed without a picture.
- Repeat the phrase "fail to reject" deliberately; examiners use "accept" as a trap.
