---
title: "Trading Comparables Analysis"
duration: 22
---

## Lecture outline
- 00:00 - Hook: estate agents value houses without a DCF; so do markets
- 02:00 - Picking peers: business, size, growth, risk
- 05:00 - Peer EV built consistently
- 08:00 - Calendarisation with the Fenwick June year end
- 11:00 - Choosing multiples and matching numerator to denominator
- 14:00 - Live Excel: Northwind comps table, median and quartiles
- 18:00 - Applying the range and bridging to per-share value
- 20:00 - Exam traps and recap

## Slides
### Slide 1: Relative Valuation
- What are investors paying for similar companies today?
- Fast, market-based, easy to explain
- Inherits sector mispricing

### Slide 2: Peer Selection
- Same end markets and business model
- Similar size, growth, margins, risk
- Five to ten peers; flag outliers

### Slide 3: Peer EV
- Diluted market cap + debt − cash + NCI + preferred
- Market price and treasury stock method shares
- Latest balance sheet

### Slide 4: Calendarisation
- CY = (m/12) × FY ending in CY + ((12 − m)/12) × next FY
- Fenwick (June): 0.5 × 150 + 0.5 × 170 = 160
- `=(C2/12)*D7+((12-C2)/12)*E7`

### Slide 5: Matching Multiples
- EV with EBITDA, EBIT, revenue
- Price with EPS
- Never market cap / EBITDA

### Slide 6: Northwind Peer Set
- Multiples: 8.4x, 9.1x, 7.6x, 10.2x, 8.8x
- Median 8.8x; quartiles 8.4x and 9.1x
- Mean 8.82x, nudged up by Halvorsen

### Slide 7: Implied EV
- 219 × 8.4 = 1,839.6
- 219 × 8.8 = 1,927.2
- 219 × 9.1 = 1,992.9

### Slide 8: Per-Share Range
- Bridge adjustments −313
- Median: (1,614.2 + 80) / 54.6 = 31.03
- Range USD 29.42 to 32.23

### Slide 9: P/E Cross-Check
- EPS 2026E = 112.5 / 51.69 = 2.18
- 14.5x to 16.0x gives USD 31.56 to 34.82
- Broadly consistent with EV/EBITDA

### Slide 10: Traps
- Numerator and denominator mismatch
- No calendarisation
- Mean versus median; forgetting the bridge

## Whiteboard examples
**Example 1 - Ashby EV.** Price USD 18.00, 70 million diluted shares, debt 320, cash 80, NCI 12.
- Market cap = 1,260; EV = 1,260 + 320 − 80 + 12 = 1,512; EV/EBITDA = 1,512 / 180 = 8.4x

**Example 2 - Calendarising a March year end.** FY ending March 2026 EBITDA 200, FY ending March 2027 EBITDA 220.
- m = 3: CY2026 = 0.25 × 200 + 0.75 × 220 = 215
- Common error: reversing the weights gives 205

**Example 3 - Northwind at the median.**
- EV = 8.8 × 219 = 1,927.2; equity = 1,927.2 − 420 + 95 − 18 + 30 = 1,614.2
- Price = (1,614.2 + 4.0 × 20) / 54.6 = 31.03

## Questions to ask students
- Why is EV/EBITDA preferred over P/E for comparing industrial peers? (It is independent of capital structure and less affected by depreciation and tax differences.)
- A peer has a September year end. What weights calendarise to December? (9/12 on the FY ending September, 3/12 on the next.)
- Why use the median? (It resists outliers like Halvorsen's 10.2x.)
- What is wrong with dividing market cap by EBITDA? (Market cap belongs to shareholders only; EBITDA belongs to all capital providers.)
- Your peers' multiples are LTM but you apply them to Northwind's forward EBITDA. Problem? (Yes, timing mismatch; forward EBITDA is higher, so value is overstated.)

## Analogies
- Comps as estate agent pricing: price per square metre of similar houses on the same street, adjusted for a better garden.
- Calendarisation as aligning race lanes: runners must start from the same line before you compare times.
- The median as a jury verdict: one loud juror (an outlier) cannot swing it alone.

## Recording tips
- Show the full comps table on screen and sort the multiple column live to reveal the median.
- Spend time on calendarisation; it is mechanical but students reverse the weights.
- End by placing 29.42 to 32.23 next to the DCF's 32.16 to preview the football field.
