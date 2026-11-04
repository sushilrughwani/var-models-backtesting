---
title: "Estimation and Inference"
duration: 24
---

## Lecture outline
- 00:00 - Hook: a pollster asks 1,000 people and predicts an election of millions. Why does that work?
- 02:00 - Populations, samples, statistics, parameters and sampling error
- 05:00 - Probability sampling methods: simple random, systematic, stratified, cluster
- 08:00 - Non-probability sampling and its risks
- 10:00 - Central limit theorem
- 13:00 - Standard error of the mean
- 15:00 - Confidence intervals: z versus t
- 19:00 - Whiteboard: 95% and 99% intervals for a fund's mean return
- 21:00 - Bootstrap and jackknife; recap

## Slides
### Slide 1: From sample to population
- Parameter: true population value (μ, σ)
- Statistic: computed from a sample (X̄, s)
- Sampling error = statistic − parameter

### Slide 2: Probability sampling
- Simple random: equal chance for every member
- Systematic: every k-th member
- Known selection chances allow valid inference

### Slide 3: Stratified versus cluster
- Stratified: sample from every subgroup, proportionally; more precise
- Cluster: randomly pick some clusters; cheaper, less precise
- Index funds use stratified sampling to track bond indexes

### Slide 4: Non-probability sampling
- Convenience: easiest data to get
- Judgmental: expert picks the sample
- Fast and cheap, but prone to bias

### Slide 5: Central limit theorem
- Large n (≥ 30): X̄ approximately normal
- Mean μ, variance σ²/n
- Holds whatever the population shape (finite variance)

### Slide 6: Standard error
- σ/√n (known σ) or s/√n (estimated)
- Four times the data halves the standard error
- Measures precision of the estimate, not dispersion of the data

### Slide 7: Confidence interval
- Point estimate ± reliability factor × standard error
- z: 1.645 (90%), 1.96 (95%), 2.576 (99%)
- Higher confidence → wider interval

### Slide 8: z or t?
- Known variance → z
- Unknown variance → t with n − 1 df
- Small sample from non-normal population → neither is reliable

### Slide 9: Resampling
- Bootstrap: draw with replacement many times
- Jackknife: leave one out, n times
- Both estimate standard errors without a formula

### Slide 10: Recap
- Sample well, then quantify the uncertainty
- SE = s/√n drives every interval and test
- Next lesson: turning intervals into decisions

## Whiteboard examples
**Example 1 - 95% interval.** n = 36, X̄ = 1.2%, s = 4.8%, t(35, 2.5%) = 2.030.
- SE = 4.8/6 = 0.80%.
- Margin = 2.030 × 0.80 = 1.624%.
- Interval: −0.42% to 2.82%; includes zero.

**Example 2 - 99% interval and sample size.** Same data, t(35, 0.5%) = 2.724.
- Margin = 2.724 × 0.80 = 2.18%; interval −0.98% to 3.38% (wider for more confidence).
- To halve the standard error to 0.40%, the sample must grow fourfold to 144 months.

**Example 3 - Jackknife on a tiny sample.** Data 2, 4, 9.
- Leave-one-out means: 6.5, 5.5, 3.0; their average is 5.0.
- Jackknife SE = √[(n − 1)/n × Σ(θi − θ̄)²] = √[(2/3)(2.25 + 0.25 + 4.00)] = √4.333 = 2.08.
- Classical s/√n: s = √13 = 3.606; 3.606/√3 = 2.08. The same, which reassures students that the method works.

## Questions to ask students
- An analyst picks bonds from each rating bucket in proportion to index weights. Which method? (Stratified random sampling.)
- Does the CLT require the population to be normal? (No; it requires a large sample and finite variance.)
- σ = 20%, n = 64. Standard error? (20/8 = 2.5%.)
- Why is a t-interval wider than a z-interval with the same data? (Estimating σ adds uncertainty; t has fatter tails.)
- A 95% interval is 2% to 6%. Is there a 95% probability that μ lies in it? (Strictly, no: μ is fixed; 95% of intervals built this way would contain μ.)

## Analogies
- Tasting soup: one spoonful of a well-stirred pot (random sample) tells you about the whole pot; a spoonful from the top of an unstirred pot (convenience sample) can mislead.
- Standard error is the wobble of your estimate; more spoonfuls mean less wobble, but with diminishing returns (√n).
- A confidence interval is a fishing net: the fish (μ) does not move; your net lands in a different place each time you cast.

## Recording tips
- Show the √n effect with a quick table: n = 9, 36, 144 and SE = 1.6, 0.8, 0.4 for s = 4.8.
- Keep a decision box on screen: variance known? sample large? population normal? Then z or t.
- Make the interpretation of a confidence interval explicit; it is a frequent conceptual question.
