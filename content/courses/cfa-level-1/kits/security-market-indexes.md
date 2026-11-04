---
title: "Security Market Indexes"
duration: 26
---

## Lecture outline
- 00:00 - Hook: same three stocks, three different "market returns" - which one is right?
- 02:00 - What an index is; price return vs total return
- 05:00 - Five construction decisions: target, selection, weighting, rebalancing, reconstitution
- 08:00 - Price weighting and the divisor (whiteboard example 1)
- 13:00 - Equal and market-cap weighting (whiteboard example 1 continued)
- 18:00 - Float adjustment, fundamental weighting and the biases of each method
- 21:00 - Divisor after a split (whiteboard example 2)
- 23:00 - Uses of indexes
- 25:00 - Recap and exam traps

## Slides
### Slide 1: What Is an Index?
- A rule-based summary of a group of securities
- The level is arbitrary; changes are what matter
- Price return vs total return (income reinvested)
### Slide 2: Building an Index
- Target market and constituent selection
- Weighting method
- Rebalancing and reconstitution schedule
### Slide 3: Price Weighting
- Index = sum of prices / divisor
- Weight = price / sum of prices
- High-priced stocks dominate; splits shift weights
### Slide 4: Equal Weighting
- Every stock gets 1/N
- Index return = simple average return
- Small-cap tilt; heavy rebalancing
### Slide 5: Market-Cap Weighting
- Weight = market value / total market value
- Float-adjusted: only shares available to the public
- Self-rebalancing; large-cap and momentum tilt
### Slide 6: Fundamental Weighting
- Weights from sales, earnings, book value or dividends
- Breaks the link between price and weight
- Value tilt
### Slide 7: The Universal Return Formula
- Index return = sum of w_i x R_i
- Use beginning-of-period weights
- Total return adds the weighted income yield
### Slide 8: Splits and the Divisor
- A split must not change the index level
- New divisor = new sum of prices / old index level
- Only needed for price-weighted indexes
### Slide 9: Uses of Indexes
- Market sentiment gauge and market proxy for beta
- Benchmark for active managers
- Model for index funds, ETFs and derivatives
### Slide 10: Exam Traps
- Price weighting ignores shares outstanding
- Equal weighting, not cap weighting, needs frequent rebalancing
- Price and total return indexes start at the same value

## Whiteboard examples
**Example 1 - three weightings.** Alder 50 to 55 (10m shares, dividend 1.00), Birch 20 to 18 (50m, 0.40), Cedar 100 to 104 (4m, 2.00).
- Price-weighted: 170/3 = 56.67 to 177/3 = 59.00, return = 4.12%. Total return = (177 + 3.40)/170 - 1 = 6.12%.
- Equal-weighted: (10% - 10% + 4%)/3 = 1.33%.
- Cap-weighted: 1,900 to 1,866, return = -1.79%. Weights 26.3% / 52.6% / 21.1%.

**Example 2 - divisor after a split.** End prices 55, 18, 104, index 59.00. Cedar splits 2-for-1 to 52.
- New sum = 125. New divisor = 125/59.00 = 2.1186. Check: 125/2.1186 = 59.00.

**Example 3 - total return.** Price index goes from 1,250 to 1,290 and constituents pay income worth 18 index points.
- Price return = 3.20%; total return = (1,290 + 18)/1,250 - 1 = 4.64%.

## Questions to ask students
- In a price-weighted index, which stock has the biggest influence? (The one with the highest price.)
- Why does an equal-weighted index need regular rebalancing? (Winners drift above 1/N and losers below.)
- After a 3-for-1 split in a price-weighted index, does the divisor go up or down? (Down, because the sum of prices falls.)
- Which weighting has a built-in value tilt? (Fundamental weighting.)
- Why might a pension fund prefer a float-adjusted benchmark? (It reflects shares it can actually buy.)

## Analogies
- Price weighting is like ranking football players by shirt number: the number says nothing about how important they are.
- Equal weighting is a democracy - one stock, one vote; cap weighting is a shareholder meeting - votes in proportion to size.
- The divisor is a currency converter: when a split changes the "units" of a price, the divisor changes so the index keeps measuring the same thing.

## Recording tips
- Show all three weightings of the same table side by side; the contrast (+4.12%, +1.33%, -1.79%) is the most memorable moment of the lesson.
- Emphasise that the same return formula (weighted average) works for every scheme; only the weights change.
- Pause on the split adjustment and verify that the index value is unchanged - students like seeing the check.
