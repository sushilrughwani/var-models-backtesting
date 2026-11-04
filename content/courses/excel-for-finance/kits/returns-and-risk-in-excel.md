---
title: "Returns, Volatility and Correlation in Excel"
duration: 20
---

## Lecture outline
- 00:00 - Hook: two stocks, both "up a bit" - which was riskier, and do they diversify each other?
- 02:00 - Prices to returns: simple `=B3/B2-1` and log `=LN(B3/B2)`
- 05:00 - Average return, arithmetic versus geometric
- 08:00 - Volatility with STDEV.S; sample versus population
- 11:00 - Annualising: the square-root-of-time rule
- 14:00 - Correlation with CORREL and a live correlation matrix
- 18:00 - Recap, traps and quiz preview

## Slides
### Slide 1: Prices Lie, Returns Compare
- A 2-unit rise on 50 is 4%; a 1.60 rise on 80 is 2%
- Returns put every asset on one scale
- First step of every risk analysis
### Slide 2: Two Kinds of Return
- Simple: `=B3/B2-1`
- Log: `=LN(B3/B2)`
- Log returns add over time; simple returns compound
### Slide 3: Average Return
- Arithmetic mean: `=AVERAGE(C3:C8)`
- Geometric: `=(B8/B2)^(1/6)-1`
- Arithmetic is always at least as large as geometric
### Slide 4: Volatility
- Standard deviation of returns
- `=STDEV.S` for a sample (divides by n − 1)
- `STDEV.P` understates risk for short histories
### Slide 5: Square-Root-of-Time
- Variance scales with time, so volatility scales with its square root
- Monthly × √12, weekly × √52, daily × √252
- Mean return scales linearly: × 12
### Slide 6: Worked Numbers
- Stock A monthly vol 3.16%, annual 10.94%
- Stock B monthly vol 2.66%, annual 9.20%
- Correlation 0.97
### Slide 7: Correlation
- `=CORREL(C3:C8, D3:D8)`
- Ranges must be equal length and date-aligned
- Correlation = covariance / (σ1 × σ2)
### Slide 8: Correlation Matrix
- `INDEX` with `ROWS` and `COLUMNS` picks column pairs
- Diagonal equals 1, matrix is symmetric
- Live formulas beat static ToolPak output
### Slide 9: Traps
- Multiplying vol by 12 instead of √12
- Population instead of sample function
- Misaligned ranges and unadjusted prices

## Whiteboard examples
1. **Returns and volatility.** Stock A prices 50, 52, 51, 53.50, 55, 54, 56.50. Returns 4.00%, −1.92%, 4.90%, 2.80%, −1.82%, 4.63%. Mean 2.10%, sample standard deviation 3.16%, annualised 3.16% × 3.464 = 10.94%. Wrong method × 12 gives 37.91%.
2. **Daily to annual.** Daily volatility 1.2%. Annual = 1.2% × √252 = 1.2% × 15.87 = 19.05%. Ask for the monthly equivalent: 1.2% × √21 ≈ 5.50%.
3. **Log returns add.** Prices 100, 110, 99. Simple returns +10% and −10% sum to 0%, yet the price is down 1%. Log returns 9.53% and −10.54% sum to −1.01% = ln(0.99), which converts back to exactly −1%.

## Questions to ask students
- Why is the return column one row shorter than the price column? (The first price has no previous price to compare with.)
- Monthly volatility is 4%. What is annual volatility? (4% × √12 = 13.86%.)
- Why prefer `STDEV.S` over `STDEV.P` for historical returns? (The data are a sample; dividing by n − 1 corrects the downward bias.)
- Two assets have correlation 0.97. Does combining them reduce risk much? (No, they move almost together.)
- If simple returns are +50% then −50%, what is the total return? (−25%, not 0%.)

## Analogies
- Returns are exchange rates for price moves: they convert every asset's move into the same currency, percent.
- Volatility grows like a random walker's distance from the start: doubling the time does not double the expected distance, it multiplies it by about 1.41.
- Correlation is a dance partnership score: +1 means perfectly in step, 0 means dancing to different songs, −1 means mirror image.

## Recording tips
- Keep the price and return columns side by side and colour the first blank return cell to make the off-by-one row obvious.
- Show `STDEV.S × 12` and `STDEV.S × SQRT(12)` next to each other to burn in the right rule.
- When building the matrix, fill one cell, then drag right and down slowly while showing the formula bar change.
