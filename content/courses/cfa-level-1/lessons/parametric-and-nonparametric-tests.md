---
title: "Parametric and Non-Parametric Tests of Independence"
---

## Learning goals
- Distinguish parametric from non-parametric tests and explain when a non-parametric test is preferred.
- Test whether a population correlation coefficient is zero using a t-statistic.
- Calculate the Spearman rank correlation coefficient and explain why it is robust to outliers.
- Construct a contingency table, compute expected frequencies and test for independence with a chi-square statistic.

## Explanation

### Parametric versus non-parametric
The tests in the previous lesson are **parametric**: they concern a parameter (a mean or variance) and rely on assumptions about the distribution, usually normality. A **non-parametric** test either makes few distributional assumptions or tests something other than a parameter. Prefer a non-parametric test when:
- the data clearly violate the assumptions (heavy outliers, strong skew, small sample);
- the data are ranks or ordinal categories rather than measurements;
- the question is not about a parameter at all, such as whether two classifications are independent.

The trade-off: when the parametric assumptions *do* hold, parametric tests are more powerful, because ranks throw away some information.

### Testing a correlation coefficient
Sample correlation $r$ measures linear association. To test $H_0: \rho = 0$ against $H_a: \rho \ne 0$, assuming both variables are normally distributed:

$$
t = \frac{r\sqrt{n-2}}{\sqrt{1-r^2}}, \qquad df = n-2
$$

where $n$ is the number of paired observations. Two degrees of freedom are lost because two means are estimated. Notice that the same $r$ becomes more significant as $n$ grows: with enough data, even a weak correlation can be statistically (if not economically) significant.

### Spearman rank correlation
When the data are not normal or contain outliers, rank each variable from 1 to $n$ and compute:

$$
r_S = 1 - \frac{6\sum d_i^2}{n(n^2-1)}
$$

where $d_i$ is the difference between the two ranks of observation $i$. $r_S$ ranges from −1 to +1. Because it uses ranks, a single extreme value cannot dominate it, and it captures any *monotonic* relationship, not only a linear one. For large samples (roughly $n > 30$), test $r_S$ with the same t-statistic as above; for small samples, use special tables.

### Chi-square test of independence
Often the data are counts in categories: firms classified by size and by ESG rating, or funds by style and by whether they beat their benchmark. A **contingency table** cross-tabulates the counts. Under $H_0$ that the two classifications are independent, the expected count in each cell is:

$$
E_{ij} = \frac{(\text{row } i \text{ total}) \times (\text{column } j \text{ total})}{\text{grand total}}
$$

The test statistic compares observed ($O_{ij}$) and expected counts:

$$
\chi^2 = \sum_{i}\sum_{j}\frac{(O_{ij} - E_{ij})^2}{E_{ij}}, \qquad df = (r-1)(c-1)
$$

where $r$ and $c$ are the numbers of rows and columns. Large values mean observed counts stray far from what independence predicts, so it is always a one-tailed (upper-tail) test. Each expected count should be reasonably large (a common guideline is at least 5).

## Worked example
**Part 1 - chi-square.** An analyst classifies 200 firms by size and ESG rating.

| | Low | Medium | High | Total |
|---|---|---|---|---|
| Small | 35 | 40 | 25 | 100 |
| Large | 15 | 40 | 45 | 100 |
| Total | 50 | 80 | 70 | 200 |

Step 1 - expected counts. For small firms with a low rating: $100 \times 50/200 = 25$. Similarly, the expected counts are 25, 40 and 35 in each row.

Step 2 - cell contributions. Low: $(35-25)^2/25 = 4.00$ and $(15-25)^2/25 = 4.00$. Medium: both 0. High: $(25-35)^2/35 = 2.857$ and $(45-35)^2/35 = 2.857$.

Step 3 - statistic. $\chi^2 = 4 + 4 + 0 + 0 + 2.857 + 2.857 = 13.71$.

Step 4 - decision. $df = (2-1)(3-1) = 2$; the 5% critical value is 5.991. Since 13.71 > 5.991, **reject independence**: ESG rating is related to firm size.

**Part 2 - correlation.** For 32 months, the correlation between a stock's return and oil price changes is 0.40. Then $t = 0.40\sqrt{30}/\sqrt{1 - 0.16} = 2.191/0.9165 = 2.39$. With 30 df the two-tailed 5% critical value is 2.042, so **reject $\rho = 0$**.

## Common exam traps
- Using $n-1$ instead of $n-2$ degrees of freedom for the correlation test.
- Forgetting the square root in $\sqrt{1-r^2}$.
- Dropping the 6 in the Spearman formula, or using the raw values instead of rank differences.
- Computing chi-square degrees of freedom as (number of cells − 1) instead of $(r-1)(c-1)$.
- Treating the chi-square independence test as two-tailed; only large values lead to rejection.

## Key takeaways
- Non-parametric tests suit violated assumptions, ranked data and questions that are not about parameters.
- Correlation test: $t = r\sqrt{n-2}/\sqrt{1-r^2}$ with $n-2$ df.
- Spearman's $r_S$ uses ranks, resists outliers and captures monotonic relationships.
- Expected count = row total × column total / grand total.
- $\chi^2 = \sum (O-E)^2/E$ with $(r-1)(c-1)$ df; reject independence when it exceeds the upper critical value.
