---
title: "Probability Trees and Conditional Expectations"
duration: 24
---

## Lecture outline
- 00:00 - Hook: an analyst says "buy". How much should that change your view?
- 02:00 - Core rules: joint and conditional probability, independence versus mutually exclusive
- 05:00 - Expected value, variance and standard deviation of a forecast
- 08:00 - Building a probability tree and conditional expectations
- 12:00 - Total probability rule for probabilities and expected values
- 15:00 - Whiteboard: EPS tree with variance
- 18:00 - Bayes' formula and the analyst-rating example
- 22:00 - Odds, exam traps and recap

## Slides
### Slide 1: Forecasting with probabilities
- History describes the past; probabilities describe possible futures
- Analysts think in scenarios
- Tools: trees, conditional expectations, Bayes

### Slide 2: Core rules
- Joint: P(AB) = P(A | B) P(B)
- Independent: P(A | B) = P(A)
- Mutually exclusive: P(AB) = 0 (and therefore dependent)

### Slide 3: Expected value and variance
- E(X) = Σ P(Xi) Xi
- σ² = Σ P(Xi)[Xi − E(X)]²
- Weights are probabilities; no n − 1

### Slide 4: Probability trees
- First branches: scenarios and their probabilities
- Second branches: outcomes conditional on each scenario
- Multiply along a path for the joint probability

### Slide 5: Conditional expectation
- E(X | S) = probability-weighted outcomes after scenario S
- Expansion EPS 2.85; contraction EPS 1.75
- Lets analysts update forecasts as scenarios unfold

### Slide 6: Total probability rule
- P(A) = Σ P(A | Si) P(Si)
- E(X) = Σ E(X | Si) P(Si)
- Scenarios must be mutually exclusive and exhaustive

### Slide 7: Variance from a tree
- Use the end-node joint probabilities as weights
- Deviations from the unconditional mean
- EPS example: σ² = 0.3469, σ = 0.59

### Slide 8: Bayes' formula
- P(S | I) = [P(I | S) / P(I)] × P(S)
- Prior → information → posterior
- P(I) from the total probability rule

### Slide 9: Analyst rating example
- Prior 30% outperform; P(buy | out) = 0.80; P(buy | not) = 0.25
- P(buy) = 0.415
- Posterior 0.578

### Slide 10: Odds
- Odds for = P/(1 − P)
- P = 0.20 → 1 to 4 for, 4 to 1 against
- Convert back: odds a to b for → P = a/(a + b)

### Slide 11: Exam traps
- Conditional versus joint weights
- Forgetting P(I) in Bayes
- Independent is not the same as mutually exclusive

## Whiteboard examples
**Example 1 - EPS tree.** P(expansion) = 0.60: EPS 3.00 (0.70) or 2.50 (0.30). P(contraction) = 0.40: EPS 2.00 (0.50) or 1.50 (0.50).
- E(EPS | exp) = 2.85; E(EPS | con) = 1.75.
- E(EPS) = 0.60(2.85) + 0.40(1.75) = 2.41.
- Joint probabilities 0.42, 0.18, 0.20, 0.20.
- σ² = 0.42(0.59²) + 0.18(0.09²) + 0.20(0.41²) + 0.20(0.91²) = 0.3469; σ = 0.589.

**Example 2 - Analyst rating (Bayes).** P(out) = 0.30, P(buy | out) = 0.80, P(buy | not out) = 0.25.
- P(buy) = 0.24 + 0.175 = 0.415.
- P(out | buy) = 0.24/0.415 = 0.578.

**Example 3 - Credit and the economy.** P(recession) = 0.30, P(default | recession) = 0.10, P(default | expansion) = 0.03.
- P(default) = 0.30(0.10) + 0.70(0.03) = 0.051.
- Given a default, P(recession | default) = 0.030/0.051 = 0.588.

## Questions to ask students
- If P(A) = 0.4, P(B) = 0.5 and P(AB) = 0.2, are A and B independent? (Yes, 0.4 × 0.5 = 0.2.)
- Two events are mutually exclusive with positive probabilities. Can they be independent? (No; knowing one occurred tells you the other did not.)
- Why is there no n − 1 in a probability-weighted variance? (We describe a known distribution rather than estimate from a sample.)
- In Bayes, what happens to the posterior if the information is equally likely in every scenario? (It equals the prior; the information is uninformative.)
- A horse has odds of 3 to 1 against winning. Probability of winning? (1/4 = 0.25.)

## Analogies
- A probability tree is a road map: multiply the chances of each turn to know how likely you are to arrive at a destination.
- Bayes is a detective updating suspicion with each clue: a clue that is far more likely if the suspect is guilty raises suspicion a lot.
- Total probability is a weighted vote: each scenario votes with its own forecast, weighted by how likely it is.

## Recording tips
- Draw the tree live, writing joint probabilities at the end nodes; students should see they sum to 1.
- Emphasise the denominator in Bayes; build P(I) explicitly every time before dividing.
- Use a two-row table (scenario, prior, likelihood, joint, posterior) as an alternative layout for Bayes problems.
