---
title: "Statistical Measures of Asset Returns"
duration: 26
---

## Lecture outline
- 00:00 - Hook: two funds both averaged 1% a month. Would you be indifferent between them?
- 02:00 - Central tendency: mean, median, mode, trimmed and winsorised means, quantiles
- 06:00 - Dispersion: range, MAD, sample variance and standard deviation
- 10:00 - Downside risk: target semideviation
- 13:00 - Coefficient of variation
- 15:00 - Shape: skewness, kurtosis and what they mean for investors
- 19:00 - Covariance and correlation, and their limits
- 22:00 - Whiteboard: full summary statistics on five returns
- 25:00 - Recap and exam traps

## Slides
### Slide 1: Same mean, different experience
- Averages hide risk and shape
- We need centre, spread, shape and co-movement
- Each answers a different investor question

### Slide 2: Central tendency
- Mean: balance point, sensitive to outliers
- Median: middle value; mode: most frequent
- Trimmed mean drops extremes; winsorised mean caps them

### Slide 3: Quantiles
- Quartiles, quintiles, deciles, percentiles
- Position: L = (n + 1) × y/100, interpolate if needed
- Interquartile range = Q3 − Q1 (box plot)

### Slide 4: Dispersion basics
- Range = max − min
- MAD = average |X − mean|
- Sample variance s² = Σ(X − mean)² / (n − 1)

### Slide 5: Why n − 1?
- Deviations measured from the sample mean are too small on average
- n − 1 corrects the bias
- Standard deviation is in return units

### Slide 6: Target downside deviation
- Only observations below target B count
- Divide by n − 1 using the full sample
- Captures the risk investors actually dislike

### Slide 7: Coefficient of variation
- CV = s / mean
- Risk per unit of return; lower is better
- Breaks down when the mean is near zero or negative

### Slide 8: Skewness
- Positive skew: long right tail, mean > median > mode
- Negative skew: long left tail, mean < median < mode
- Option-selling strategies tend to be negatively skewed

### Slide 9: Kurtosis
- Normal distribution kurtosis = 3
- Excess kurtosis = kurtosis − 3
- Leptokurtic (fat tails) is typical for asset returns

### Slide 10: Covariance and correlation
- Cov = Σ(X − mean)(Y − mean) / (n − 1)
- Correlation = Cov / (sX sY), between −1 and +1
- Linear only; outliers distort; not causation

### Slide 11: Exam traps
- n versus n − 1
- Wrong divisor in downside deviation
- Order of mean, median and mode under skew

## Whiteboard examples
**Example 1 - Summary statistics.** Returns 4%, −2%, 6%, 1%, −4%.
- Mean 1.0%, median 1.0%, range 10%.
- Deviations 3, −3, 5, 0, −5; MAD = 16/5 = 3.2%.
- Squared deviations sum to 68; s² = 68/4 = 17; s = 4.12%.
- CV = 4.12/1.0 = 4.12.
- Downside deviation (target 0%): shortfalls −2, −4; (4 + 16)/4 = 5; √5 = 2.24%.
- Cubed deviations sum to 0, so skewness = 0 (mean equals median).

**Example 2 - Correlation.** X = 2, 4, −1, 3 and Y = 1, 3, −2, 4.
- Means: X̄ = 2, Ȳ = 1.5.
- Deviation products: 0 × (−0.5) = 0; 2 × 1.5 = 3; (−3) × (−3.5) = 10.5; 1 × 2.5 = 2.5; sum = 16.
- Covariance = 16/3 = 5.33.
- sX = 2.16, sY = 2.65; correlation = 5.33/(2.16 × 2.65) = 0.93.

**Example 3 - CV comparison.** Fund A: mean 8%, s = 12%. Fund B: mean 5%, s = 6%.
- CV(A) = 1.50, CV(B) = 1.20. B offers less risk per unit of return.

## Questions to ask students
- A return distribution has mean 2%, median 3%. What is the likely skew? (Negative; the mean is pulled below the median by a long left tail.)
- Why might a winsorised mean be preferred to a trimmed mean? (It keeps the sample size and the information that extremes occurred, while limiting their influence.)
- A distribution has kurtosis of 4.5. What is its excess kurtosis and what does it imply? (1.5; fatter tails than normal, more extreme outcomes.)
- Correlation between X and X² for X symmetric around zero? (Zero, even though Y depends perfectly on X; correlation captures only linear links.)
- Can CV be used to compare a fund with a mean of 0.1%? (Poorly; a tiny mean makes the CV explode.)

## Analogies
- Mean versus median: one billionaire walks into a café and the average wealth explodes, but the median customer is no richer.
- Downside deviation is like a smoke alarm that ignores sunlight and only reacts to fire.
- Kurtosis is about the tails, not the peak: think of how often the "once in a century" storm actually arrives.

## Recording tips
- Build the deviation table column by column on screen; students follow tables far better than formulas.
- Stress the n − 1 divisor in both variance and downside deviation; it is the most common lost mark.
- Sketch positively and negatively skewed curves with mean, median and mode marked; leave the sketch up for the skewness questions.
