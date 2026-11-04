---
title: "Measuring Returns, Volatility and Correlation"
duration: 24
---

## Lecture outline
- 00:00 - Hook: a stock rises 10% and then falls 10%. Did you break even?
- 02:00 - Simple versus log returns and how each aggregates
- 06:00 - Estimating volatility and the square-root-of-time rule; implied volatility
- 10:00 - Stylised facts: fat tails, skewness, volatility clustering
- 13:00 - The Jarque-Bera test
- 15:00 - Limits of Pearson correlation; Spearman and Kendall
- 19:00 - Whiteboard: rank correlation table
- 22:00 - Exam traps and recap

## Slides
### Slide 1: Measuring Returns, Volatility and Correlation
- The raw inputs to every risk model
- Choices here drive VaR, hedges and capital
- Bridge from time-series theory to risk measurement

### Slide 2: Simple vs Log Returns
- Simple: R = P1/P0 - 1; Log: r = ln(P1/P0) = ln(1 + R)
- Log return is below the simple return for any non-zero move
- Close for small moves, far apart for big moves

### Slide 3: Aggregation Rules
- Over time: log returns add; simple returns compound
- Across assets: simple returns are weighted averages
- Use log for single-asset time series, simple for portfolios

### Slide 4: Estimating Volatility
- Sample standard deviation of returns
- Daily data: assume zero mean, divide by n
- Implied volatility from options; VIX for the US equity market

### Slide 5: Square-Root-of-Time Rule
- σT = σ1 √T if returns are i.i.d.
- Annual: √252 daily, √52 weekly, √12 monthly
- Breaks with autocorrelation or changing volatility

### Slide 6: Returns Are Not Normal
- Fat tails: kurtosis above 3
- Negative skew for equities
- Volatility clustering: turbulent days follow turbulent days

### Slide 7: Jarque-Bera Test
- JB = (n/6)(S² + (K - 3)²/4)
- Chi-square with 2 df; 5% critical value 5.99
- Large samples of daily returns almost always reject normality

### Slide 8: Limits of Pearson Correlation
- Measures only linear dependence
- Sensitive to outliers; needs finite variance
- Zero correlation does not imply independence

### Slide 9: Rank Correlations
- Spearman: 1 - 6Σd² / (n(n² - 1))
- Kendall: (concordant - discordant) / (n(n - 1)/2)
- Invariant to increasing transformations, robust to outliers

### Slide 10: Recap
- Right return for the right job
- √T scaling has assumptions
- Next: simulation and bootstrapping

## Whiteboard examples
**Example 1: Up 10%, down 10%.** Prices 100, 110, 99.
- Simple: +10%, -10%, sum 0% but actual -1.00%.
- Log: 9.531% and -10.536%, sum -1.005% = ln(0.99).

**Example 2: Volatility scaling and JB.** Daily σ = 1.2% gives 1.2 × √252 = 19.05% a year. Weekly σ = 2.5% gives 2.5 × √52 = 18.03%. With n = 250, S = -0.4, K = 5: JB = 41.67 × (0.16 + 1) = 48.33 > 5.99, reject normality.

**Example 3: Rank correlation.** X = 2.1, -0.5, 1.3, 3.0, -1.2; Y = 1.8, 0.4, -0.3, 2.5, -0.9.
- Ranks X: 4, 2, 3, 5, 1. Ranks Y: 4, 3, 2, 5, 1. Σd² = 2.
- Spearman = 1 - 12/120 = 0.90.
- Pairs: 9 concordant, 1 discordant (days 2 and 3). Kendall = 8/10 = 0.80.

## Questions to ask students
- Which return type should you average across positions to get a portfolio return? (Simple returns.)
- Monthly volatility is 5%. What is annual volatility under i.i.d.? (5 × √12 = 17.32%.)
- What are the skewness and kurtosis of a normal distribution? (0 and 3.)
- Y = X³ for symmetric X. Is the Spearman correlation 1? (Yes, the relationship is perfectly monotonic.)
- Why does volatility clustering make unconditional returns look fat-tailed? (Mixing low- and high-variance periods produces more extreme observations than a single normal.)

## Analogies
- Log returns as a GPS trip log: legs add up to the journey; simple returns as a shopping basket: items add up across the basket.
- Rank correlation: judging a race by finishing order instead of finishing times; one runner collapsing at the line does not distort the result.
- Volatility clustering: weather; stormy days tend to come in runs.

## Recording tips
- Start with the 10% up, 10% down puzzle and let students answer before revealing the numbers.
- Build the rank table live, column by column, and count concordant pairs visibly.
- Remind students to check whether a question gives raw or excess kurtosis.
