---
title: "Probability Trees and Conditional Expectations"
---

## Learning goals
- Calculate the expected value, variance and standard deviation of a random variable from a probability distribution.
- Build a probability tree and compute conditional expectations for each scenario.
- Apply the total probability rule for probabilities and for expected values.
- Use Bayes' formula to update a prior probability after new information arrives.

## Explanation

### From data to forecasts
The previous lesson summarised *historical* returns. Investment decisions are forward-looking, so we now describe possible future outcomes with probabilities. A few basic rules carry most of the weight. For any events $A$ and $B$, the joint probability is $P(AB) = P(A \mid B)\,P(B)$, where $P(A \mid B)$ is the conditional probability of $A$ given that $B$ has occurred. Events are **independent** when $P(A \mid B) = P(A)$, in which case $P(AB) = P(A)P(B)$. Do not confuse independence with **mutually exclusive** events, which cannot happen together, so $P(AB) = 0$.

### Expected value and variance
For a random variable $X$ taking values $X_i$ with probabilities $P(X_i)$:

$$
E(X) = \sum_{i} P(X_i)\,X_i \qquad \sigma^2(X) = \sum_{i} P(X_i)\,\big[X_i - E(X)\big]^2
$$

Here the weights are probabilities, not $1/n$, and there is no $n-1$ correction because we are describing a full distribution, not estimating from a sample. The standard deviation is the square root of the variance.

### Conditional expectations and the tree
An analyst often believes the outcome depends on a scenario, such as the state of the economy. A **probability tree** lays this out: the first set of branches gives scenario probabilities, the second set gives outcome probabilities *conditional* on each scenario. The **conditional expected value** $E(X \mid S)$ is the probability-weighted average of outcomes on the branches that follow scenario $S$.

### Total probability rule
If scenarios $S_1, \dots, S_n$ are mutually exclusive and exhaustive, an unconditional probability or expectation is the weighted average of the conditional ones:

$$
P(A) = \sum_{i} P(A \mid S_i)\,P(S_i) \qquad E(X) = \sum_{i} E(X \mid S_i)\,P(S_i)
$$

On a tree, multiply along each path to get the joint probability of reaching that final node, and add across paths.

### Bayes' formula
Bayes' formula reverses the direction of conditioning. Given a prior belief $P(S)$ and new information $I$:

$$
P(S \mid I) = \frac{P(I \mid S)}{P(I)}\,P(S)
$$

where $P(I)$ comes from the total probability rule. The updated probability $P(S \mid I)$ is called the **posterior**. The ratio $P(I \mid S)/P(I)$ tells you how much the information should move your belief: if the information is more likely when $S$ is true than in general, the posterior rises above the prior.

### Odds
Probabilities are sometimes quoted as odds. Odds *for* an event are $P/(1-P)$; a probability of 0.20 corresponds to odds of 1 to 4 for, or 4 to 1 against.

## Worked example
An analyst forecasts a company's EPS. The economy will expand with probability 0.60 or contract with probability 0.40. In an expansion EPS is USD 3.00 (probability 0.70) or USD 2.50 (0.30). In a contraction EPS is USD 2.00 (0.50) or USD 1.50 (0.50).

**Step 1 - conditional expectations.**
$E(EPS \mid \text{expansion}) = 0.70(3.00) + 0.30(2.50) = 2.85$.
$E(EPS \mid \text{contraction}) = 0.50(2.00) + 0.50(1.50) = 1.75$.

**Step 2 - total probability rule.** $E(EPS) = 0.60(2.85) + 0.40(1.75) = 1.71 + 0.70 = 2.41$.

**Step 3 - joint probabilities of the four end nodes.** 0.60 × 0.70 = 0.42; 0.60 × 0.30 = 0.18; 0.40 × 0.50 = 0.20; 0.40 × 0.50 = 0.20. They sum to 1.

**Step 4 - variance.** Deviations from 2.41 are 0.59, 0.09, −0.41 and −0.91; squared they are 0.3481, 0.0081, 0.1681 and 0.8281.

$$
\sigma^2 = 0.42(0.3481) + 0.18(0.0081) + 0.20(0.1681) + 0.20(0.8281) = 0.3469
$$

Standard deviation = √0.3469 = 0.589.

**Step 5 - Bayes.** Separately, suppose 30% of firms outperform. An analyst rates 80% of eventual outperformers "buy" but also rates 25% of other firms "buy". $P(\text{buy}) = 0.30(0.80) + 0.70(0.25) = 0.24 + 0.175 = 0.415$. Then $P(\text{outperform} \mid \text{buy}) = 0.24/0.415 = 0.578$.

**Expected EPS = USD 2.41 with a standard deviation of USD 0.59; a buy rating lifts the probability of outperformance from 30% to 57.8%.**

## Common exam traps
- Using conditional probabilities directly as weights in the variance instead of the joint (path) probabilities.
- Dividing by $n$ or $n-1$ when the question gives probabilities; the weights are the probabilities.
- Forgetting to compute $P(I)$ with the total probability rule before applying Bayes.
- Treating mutually exclusive events as independent. Mutually exclusive events with non-zero probabilities are always dependent.
- Converting odds incorrectly: odds of 1 to 4 mean a probability of 1/5, not 1/4.

## Key takeaways
- Expected value and variance are probability-weighted; no sample-size correction applies.
- A probability tree organises scenarios first and conditional outcomes second; multiply along paths.
- The total probability rule turns conditional probabilities or expectations into unconditional ones.
- Bayes' formula updates a prior into a posterior using how likely the new information is under each scenario.
- Independence means $P(A \mid B) = P(A)$; mutually exclusive means $P(AB) = 0$.
