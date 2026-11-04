---
title: "Parametric and Non-Parametric Tests of Independence"
duration: 20
---

## Lecture outline
- 00:00 - Hook: does a fund's ESG rating depend on company size, or is any pattern just noise?
- 02:00 - Parametric versus non-parametric: when and why to switch
- 05:00 - t-test of a correlation coefficient
- 08:00 - Spearman rank correlation and robustness to outliers
- 11:00 - Contingency tables and expected frequencies
- 14:00 - Whiteboard: chi-square test of independence
- 18:00 - Exam traps and recap

## Slides
### Slide 1: Two families of tests
- Parametric: about a parameter, relies on distributional assumptions
- Non-parametric: few assumptions, or not about a parameter
- Parametric is more powerful when its assumptions hold

### Slide 2: When to go non-parametric
- Outliers, skew or small samples break normality
- Data are ranks or ordinal categories
- Question is about independence of classifications

### Slide 3: Testing correlation
- H0: ρ = 0 versus Ha: ρ ≠ 0
- t = r√(n − 2)/√(1 − r²)
- df = n − 2

### Slide 4: Sample size matters
- Same r, larger n → larger t
- Statistical significance is not economic significance
- r = 0.40, n = 32 → t = 2.39

### Slide 5: Spearman rank correlation
- Rank each variable, compute rank differences d
- rS = 1 − 6Σd²/[n(n² − 1)]
- Robust to outliers; captures monotonic relationships

### Slide 6: Contingency tables
- Counts cross-classified by two categorical variables
- Expected count = row total × column total / grand total
- Guideline: expected counts of at least 5

### Slide 7: Chi-square test of independence
- χ² = Σ(O − E)²/E
- df = (rows − 1)(columns − 1)
- Upper-tail test only

### Slide 8: Size versus ESG result
- χ² = 13.71, df = 2, critical 5.991
- Reject independence
- Low ratings concentrated in small firms

### Slide 9: Exam traps
- n − 2 df for the correlation test
- The 6 in Spearman; the square root in the t formula
- (r − 1)(c − 1), not cells − 1

## Whiteboard examples
**Example 1 - Chi-square.** 200 firms: Small (35 low, 40 medium, 25 high); Large (15, 40, 45). Column totals 50, 80, 70.
- Expected counts per row: 25, 40, 35.
- Contributions: 4.00, 0, 2.857 in each row; χ² = 13.71.
- df = 2; 5% critical value 5.991; reject independence.

**Example 2 - Correlation test.** r = 0.40, n = 32.
- t = 0.40 × √30/√0.84 = 2.191/0.9165 = 2.39.
- Critical t(30, two-tailed 5%) = 2.042; reject ρ = 0.

**Example 3 - Spearman.** Six managers ranked by return (1 to 6) and by Sharpe ratio (2, 1, 4, 3, 6, 5).
- Rank differences: −1, 1, −1, 1, −1, 1; Σd² = 6.
- rS = 1 − 6 × 6/(6 × 35) = 1 − 36/210 = 0.829.
- Strong agreement between the two rankings.

## Questions to ask students
- Name two situations in which you would choose a non-parametric test. (Outliers or non-normal data; data are ranks; testing independence of categories.)
- How many degrees of freedom for a chi-square test on a 3 × 4 table? ((3 − 1)(4 − 1) = 6.)
- Why is Spearman's correlation less affected by an outlier than Pearson's? (Ranks cap the outlier's influence at one rank position.)
- With 1,000 observations, r = 0.10. Is it statistically significant at 5%? (Yes: t ≈ 0.10 × √998/√0.99 ≈ 3.17 > 1.96.)
- In a contingency table, row total 60, column total 50, grand total 200. Expected count? (60 × 50/200 = 15.)

## Analogies
- Expected counts are what you would see if the two labels were assigned by independent coin flips; chi-square measures how far reality is from that coin-flip world.
- Ranks are like a race result: the winner is first whether she wins by a metre or a mile, so one freak performance cannot distort the picture.
- Parametric versus non-parametric is a precision tool versus a sturdy multi-tool: the precision tool is better when conditions are right, the multi-tool works in the rain.

## Recording tips
- Fill the expected-count table cell by cell on screen; students often mix up row and column totals.
- Highlight that the chi-square test of independence is always upper-tailed.
- Briefly contrast the variance chi-square test from the previous lesson with this one; same distribution, different purpose.
