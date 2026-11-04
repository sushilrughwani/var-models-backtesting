---
title: "Statistical Measures of Asset Returns"
---

## Learning goals
- Calculate and interpret measures of central tendency, including trimmed and winsorised means.
- Calculate range, mean absolute deviation, sample variance, sample standard deviation and target downside deviation.
- Interpret the coefficient of variation as risk per unit of return.
- Explain skewness and kurtosis and their relationship to the mean, median and tail risk.
- Interpret covariance and correlation between two return series.

## Explanation

### Where is the centre?
The previous lessons showed how to measure a single return. Now we summarise a whole distribution of them. The **arithmetic mean** is the balance point of the data, but a single extreme month can drag it. The **median** (the middle value once sorted) ignores outliers, and the **mode** is the most frequent value. Two compromises are common: a **trimmed mean** drops a fixed percentage of the highest and lowest observations, and a **winsorised mean** replaces those extremes with the nearest remaining values instead of dropping them.

Location can also be described with **quantiles**: quartiles, quintiles, deciles and percentiles. The position of the $y$-th percentile in a sorted sample of $n$ is $L_y = (n+1)\,y/100$, interpolating when $L_y$ is not a whole number. The interquartile range (Q3 − Q1) is a robust spread measure shown in box plots.

### How spread out?
The **range** is maximum minus minimum. The **mean absolute deviation** averages the absolute distances from the mean, $MAD = \frac{1}{n}\sum |X_i - \bar{X}|$. The workhorse is the **sample variance** and its square root, the **sample standard deviation**:

$$
s^2 = \frac{\sum_{i=1}^{n}(X_i - \bar{X})^2}{n-1} \qquad s = \sqrt{s^2}
$$

Dividing by $n-1$ rather than $n$ corrects the downward bias that comes from measuring deviations around the sample mean instead of the unknown true mean.

Investors usually fear only bad outcomes, so the **target downside deviation** (target semideviation) counts only observations below a target $B$:

$$
s_{target} = \sqrt{\frac{\sum_{X_i < B}(X_i - B)^2}{n-1}}
$$

The sum is over below-target observations only, but the divisor is still $n-1$ using the full sample size.

### Risk per unit of return
The **coefficient of variation** $CV = s/\bar{X}$ scales dispersion by the mean, so assets with very different return levels can be compared. A lower CV means less risk per unit of return. It is unreliable when the mean is close to zero or negative.

### Shape: skewness and kurtosis
**Skewness** measures asymmetry. A sample estimate is approximately $\frac{1}{n}\sum (X_i-\bar{X})^3 / s^3$. With positive skew (a long right tail) the mean is pulled above the median, which sits above the mode. Negative skew reverses the order: mean < median < mode. Investors generally prefer positive skew, yet many strategies, such as selling options, produce negative skew: frequent small gains and rare large losses.

**Kurtosis** measures tail weight, $\frac{1}{n}\sum (X_i-\bar{X})^4 / s^4$. A normal distribution has kurtosis 3, so **excess kurtosis** = kurtosis − 3. Positive excess kurtosis (leptokurtic) means fatter tails and more extreme outcomes than a normal model predicts; this is typical of asset returns.

### Moving together
**Covariance** measures whether two series move together: $s_{XY} = \sum (X_i-\bar{X})(Y_i-\bar{Y})/(n-1)$. Its units are awkward, so we standardise it into the **correlation** $r_{XY} = s_{XY}/(s_X s_Y)$, which lies between −1 and +1. Correlation measures only *linear* association, can be distorted by outliers, and never proves causation; spurious correlation between unrelated series is common.

## Worked example
A fund's monthly returns are 4%, −2%, 6%, 1% and −4%.

**Step 1 - centre.** Mean = (4 − 2 + 6 + 1 − 4)/5 = 5/5 = 1.0%. Sorted: −4, −2, 1, 4, 6, so the median is 1.0%.

**Step 2 - deviations.** From the mean: 3, −3, 5, 0, −5. Range = 6 − (−4) = 10%. MAD = (3 + 3 + 5 + 0 + 5)/5 = 3.2%.

**Step 3 - variance and standard deviation.** Squared deviations: 9, 9, 25, 0, 25, summing to 68. Sample variance = 68/4 = 17.0 (%²). Sample standard deviation = √17 = 4.12%.

**Step 4 - CV.** CV = 4.12/1.0 = 4.12: the fund carries 4.12 units of risk per unit of mean return.

**Step 5 - downside deviation with a 0% target.** Below-target returns are −2 and −4, with squared shortfalls 4 and 16. Sum = 20; divide by $n - 1 = 4$ to get 5; square root gives 2.24%.

**Step 6 - shape.** The cubed deviations (27, −27, 125, 0, −125) sum to zero, so sample skewness is 0, consistent with mean = median.

**Results: mean 1.0%, s = 4.12%, CV = 4.12, target downside deviation 2.24%.**

## Common exam traps
- Dividing by $n$ instead of $n-1$ for a sample variance.
- In the downside deviation, dividing by the number of below-target observations instead of $n-1$.
- Reversing the order for skewed distributions: positive skew means mean > median > mode.
- Confusing kurtosis with excess kurtosis; a normal distribution has kurtosis 3 and excess kurtosis 0.
- Reading a high correlation as evidence of causation, or a zero correlation as proof of independence (the relationship may be non-linear).

## Key takeaways
- Mean, median and mode describe the centre; trimmed and winsorised means reduce the influence of outliers.
- Sample variance divides by $n-1$; standard deviation is in the same units as returns.
- Target downside deviation measures only harmful dispersion below a chosen threshold.
- CV = standard deviation / mean, a measure of risk per unit of return.
- Positive skew: mean > median; fat tails show up as positive excess kurtosis.
- Correlation standardises covariance into the range −1 to +1 and captures only linear association.
