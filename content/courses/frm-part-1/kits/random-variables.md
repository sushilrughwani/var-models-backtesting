---
title: "Random Variables"
duration: 24
---

## Lecture outline
- 00:00 - Hook: expected loss is USD 2.2 million, so why hold capital for USD 50 million?
- 02:00 - From events to numbers: what a random variable is
- 04:00 - Discrete versus continuous: PMF, PDF and CDF
- 07:00 - Mean, variance and the E[X²] − μ² shortcut
- 11:00 - Skewness and kurtosis: the shape of risk
- 14:00 - Linear transformations
- 17:00 - Quantiles, the median and the link to VaR
- 19:00 - Whiteboard: loan-book loss distribution
- 23:00 - Recap

## Slides
### Slide 1: Why random variables
- Turn outcomes into numbers we can average and rank
- Losses, returns and default counts are all random variables
- Today: moments and quantiles

### Slide 2: Discrete random variables
- Countable values (number of defaults)
- PMF p(x) = P(X = x), sums to 1
- CDF jumps at each possible value

### Slide 3: Continuous random variables
- Any value in an interval (returns)
- PDF f(x): probability is area under the curve
- P(X = x) = 0 for any single point

### Slide 4: Expected value
- E[X] = Σ x p(x) or ∫ x f(x) dx
- Probability-weighted centre of mass
- Expected loss for a loan book

### Slide 5: Variance and standard deviation
- σ² = E[(X − μ)²] = E[X²] − μ²
- σ in the same units as X
- Shortcut avoids computing every deviation

### Slide 6: Skewness and kurtosis
- Skewness: asymmetry; positive means long right tail
- Kurtosis: tail heaviness; normal = 3
- Excess kurtosis = kurtosis − 3

### Slide 7: Linear transformations
- E[a + bX] = a + b E[X]
- Var(a + bX) = b² Var(X)
- Shift moves the centre; scale stretches the spread

### Slide 8: Quantiles
- α-quantile: smallest q with F(q) ≥ α
- Median = 0.5 quantile
- 99% loss quantile = 99% VaR

### Slide 9: Loan-book example
- Losses 0 / 10 / 50 with probabilities 0.90 / 0.07 / 0.03
- Mean 2.2, σ 8.78
- 95% quantile 10; 99% quantile 50

### Slide 10: Exam traps
- Forgetting to subtract μ²
- Var(a + bX) is b² Var(X), not b Var(X)
- PDF height is not a probability

## Whiteboard examples
**Example 1 - Loan book.** Losses 0, 10, 50 (USD millions) with probabilities 0.90, 0.07, 0.03.
- E[X] = 0.7 + 1.5 = 2.2.
- E[X²] = 7 + 75 = 82; σ² = 82 − 4.84 = 77.16; σ = 8.78.
- CDF: 0.90, 0.97, 1.00. 95% quantile = 10; 99% quantile = 50.

**Example 2 - Continuous PDF.** f(x) = 2x on [0, 1].
- E[X] = ∫ 2x² dx = 2/3 = 0.6667.
- E[X²] = ∫ 2x³ dx = 1/2; σ² = 1/2 − 4/9 = 1/18 = 0.0556; σ = 0.2357.
- CDF F(x) = x²; median solves x² = 0.5, so median = 0.7071.

**Example 3 - Transformation.** X has mean 5 and variance 4. Y = 3 − 2X.
- E[Y] = 3 − 10 = −7.
- Var(Y) = (−2)² × 4 = 16; σ_Y = 4.

## Questions to ask students
- What is P(X = 0.02) for a continuous daily return? (Zero; only intervals have positive probability.)
- If every loss is increased by USD 1 million, what happens to the variance? (Nothing; adding a constant does not change spread.)
- A distribution has kurtosis 6. What is its excess kurtosis and what does it mean? (3; fatter tails than the normal.)
- Why can the 99% quantile be far above the mean? (Rare, very large losses barely move the mean but define the tail quantile.)
- For Y = −X, what happens to skewness? (Same magnitude, opposite sign.)

## Analogies
- The mean is the balance point of a seesaw loaded with probability weights.
- Kurtosis is about how often the "once-in-a-decade" storm actually turns up; fat tails mean storms more often than a normal predicts.
- A quantile is a height mark on a flood wall: the 99% mark is the water level exceeded only one year in a hundred.

## Recording tips
- Draw the discrete CDF as a staircase and show where the 0.95 line first hits the stairs.
- Write E[X²] − μ² in a box and reuse it all lecture; students lose marks by skipping μ².
- Preview that quantiles of loss distributions become VaR later in the course to motivate the topic.
