---
title: "Statistical Functions for Finance"
duration: 20
---

## Lecture outline
- 00:00 - Hook: two funds with the same average return. Which would you rather own? Show their monthly bars
- 02:00 - Centre: AVERAGE vs MEDIAN, and how blanks and zeros are treated
- 04:30 - Dispersion: standard deviation, STDEV.S vs STDEV.P, VAR.S
- 08:00 - Co-movement: CORREL and the alignment requirement
- 10:00 - Tails: PERCENTILE.INC vs PERCENTILE.EXC, QUARTILE
- 12:30 - Conditional aggregates: COUNTIFS, SUMIFS, AVERAGEIFS
- 14:30 - Live build: fund vs market statistics dashboard
- 18:30 - Traps and recap

## Slides
### Slide 1: Statistical Functions for Finance
- Describe a return series in one block of formulas
- Centre, spread, co-movement, tails
- Conditional "what happened when" questions

### Slide 2: AVERAGE and MEDIAN
- Mean vs middle value
- Median above mean hints at large losses
- Blanks skipped, zeros counted

### Slide 3: Standard Deviation
- Average distance of returns from their mean
- STDEV.S divides by n − 1 (sample)
- STDEV.P divides by n (population)
- VAR.S / VAR.P are the squares

### Slide 4: Which One?
- Historical returns = a sample: STDEV.S
- Difference matters most for small n
- STDEV.P understates sample volatility

### Slide 5: CORREL
- Range −1 to +1
- Ranges must be equal size and aligned row by row
- Misalignment gives a wrong number, no error

### Slide 6: Percentiles
- PERCENTILE.INC: position k(n − 1) + 1, interpolated
- PERCENTILE.EXC: position k(n + 1); never returns min or max
- QUARTILE.INC(range,1) = PERCENTILE.INC(range,0.25)

### Slide 7: Conditional Aggregates
- COUNTIFS(range, criteria, ...)
- SUMIFS / AVERAGEIFS: the range to aggregate comes first
- Criteria as text: ">0", "<"&H1

### Slide 8: Live Data
- Fund: 2.1, −1.4, 3.0, 0.8, −2.5, 1.6
- Market: 1.2, −0.6, 1.8, −0.4, −1.9, 0.3
- Mean 0.60%, median 1.20%

### Slide 9: Spread and Correlation Results
- STDEV.S = 2.13%; STDEV.P = 1.94%
- CORREL = 0.95
- 10th percentile (INC) = −1.95%

### Slide 10: Conditional Results
- Positive months: COUNTIF = 4
- Fund in down-market months: AVERAGEIFS = −1.03%
- Down-capture insight in one formula

### Slide 11: Traps Recap
- STDEV.P on samples
- Argument order in SUMIFS / AVERAGEIFS
- INC vs EXC; misaligned CORREL ranges

## Whiteboard examples
**Example 1 - Standard deviation by hand.** Fund returns 2.1, −1.4, 3.0, 0.8, −2.5, 1.6. Mean = 3.6/6 = 0.60. Deviations: 1.5, −2.0, 2.4, 0.2, −3.1, 1.0. Squares: 2.25, 4.00, 5.76, 0.04, 9.61, 1.00; sum 22.66. Sample variance = 22.66/5 = 4.532; STDEV.S = √4.532 = 2.13. Population variance = 22.66/6 = 3.777; STDEV.P = 1.94. Then confirm both in Excel.

**Example 2 - Percentile interpolation.** Sorted: −2.5, −1.4, 0.8, 1.6, 2.1, 3.0. PERCENTILE.INC at 0.1: rank = 0.1 × 5 + 1 = 1.5 → −2.5 + 0.5 × (−1.4 − (−2.5)) = −1.95. PERCENTILE.EXC at 0.2: rank = 0.2 × 7 = 1.4 → −2.5 + 0.4 × 1.1 = −2.06. Same data, different answers.

**Example 3 - Down-market average.** Market negative in Feb (−0.6), Apr (−0.4), May (−1.9). Fund in those months: −1.4, 0.8, −2.5. `=AVERAGEIFS(B2:B7,C2:C7,"<0")` = −3.1/3 = −1.03. Contrast with averaging the fund's own negative months: (−1.4 − 2.5)/2 = −1.95, a different question.

## Questions to ask students
- Why is STDEV.S the default for historical returns? (They are a sample used to estimate unknown future variability, so we divide by n − 1.)
- If a missing month is typed as 0, how does AVERAGE treat it? (As a real 0% return; it is included.)
- What is the first argument of AVERAGEIFS? (The range to average.)
- Can PERCENTILE.EXC return the smallest observation? (No; it excludes the endpoints.)
- What does a CORREL of 0.95 tell you about a fund? (It moves very closely with the market, so it offers little diversification against it.)

## Analogies
- The mean is the balance point of a seesaw loaded with returns; the median is the person standing in the middle of the queue.
- Standard deviation is the "wobble" of a return series: how far, on average, each month strays from home.
- AVERAGEIFS is a filter and a calculator in one: first decide which rows qualify, then average them.

## Recording tips
- Do the standard deviation by hand once, then let Excel confirm it; the n − 1 vs n distinction lands far better after seeing the arithmetic.
- Show the function tooltip for SUMIFS and AVERAGEIFS while typing, pointing at the argument order.
- Keep the six-month data on screen throughout so every result can be traced back to visible numbers.
