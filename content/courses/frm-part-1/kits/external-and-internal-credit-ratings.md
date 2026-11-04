---
title: "External and Internal Credit Ratings"
duration: 24
---

## Lecture outline
- 00:00 - Hook: a company is cut from BBB− to BB+ overnight and its bonds drop sharply, though nothing in its accounts changed. Why?
- 03:00 - Rating scales, notches, investment-grade boundary, outlooks and watches
- 07:00 - Transition matrices: reading a row, absorbing default, Markov assumption
- 10:00 - Whiteboard: two-year default and upgrade probabilities
- 15:00 - Through-the-cycle versus point-in-time ratings
- 18:00 - Internal ratings: scoring models, mapping to PD, IRB use
- 21:00 - Weaknesses: momentum, cycle dependence, conflicts; recap

## Slides
### Slide 1: External and Internal Credit Ratings
- From market risk to credit risk
- Ratings as ordinal opinions of creditworthiness
- Scales, transitions, TTC versus PIT, internal systems

### Slide 2: Rating Scales
- S&P/Fitch: AAA to C; Moody's: Aaa to C
- Notches: +/− or 1/2/3
- Lowest investment grade: BBB− / Baa3

### Slide 3: Outlooks and Watches
- Outlook: likely direction over 1-2 years
- Watch: change under active review, short horizon
- Fallen angels: forced selling by investment-grade-only mandates

### Slide 4: Transition Matrix
- Rows: starting rating; columns: rating one year later
- Each row sums to 1; default is absorbing
- Markov assumption: next move depends only on current rating

### Slide 5: Multi-Year Probabilities
- Two-year matrix = one-year matrix squared
- Sum over all paths ending in the target state
- Include year-1 default staying in default

### Slide 6: Through-the-Cycle Ratings
- Look past the business cycle
- Stable, change only for durable shifts
- Lag market information

### Slide 7: Point-in-Time Measures
- Equity- or CDS-based, reflect current conditions
- Better short-horizon default prediction
- Volatile and procyclical

### Slide 8: Internal Ratings
- Cover unrated borrowers (SMEs, private firms)
- Ratio scoring (e.g. Z-score) plus judgement
- Grades mapped to PDs; feed IRB capital; must be validated

### Slide 9: Weaknesses of Ratings
- Rating momentum breaks the Markov assumption
- Transition matrices worsen in recessions
- Issuer-pays conflicts; ratings lag spreads

### Slide 10: Recap
- Ratings rank, matrices quantify migration
- Multi-year PD > naive compounding
- Next: country risk and sovereign ratings

## Whiteboard examples
**Example 1: Two-year PD.** Use the lesson matrix. Start in A.
- A→A→D: 0.90 × 0.005 = 0.0045.
- A→B→D: 0.08 × 0.02 = 0.0016.
- A→C→D: 0.015 × 0.10 = 0.0015.
- A→D→D: 0.005 × 1 = 0.005.
- Total = 0.0126 = 1.26%, versus naive 1 − 0.995² = 0.9975%.

**Example 2: Upgrade probability.** Start in B; probability of being rated A at the end of year 2.
- B→A→A: 0.05 × 0.90 = 0.045.
- B→B→A: 0.85 × 0.05 = 0.0425.
- B→C→A: 0.08 × 0.01 = 0.0008.
- B→D→A: 0.02 × 0 = 0.
- Total = 0.0883 = 8.83%.

## Questions to ask students
- Is BBB− investment grade? (Yes, it is the lowest investment-grade notch.)
- Why does the two-year PD exceed simple compounding? (Issuers can be downgraded in year 1 to grades with higher PDs.)
- Which reacts faster to a sudden profit warning, an agency rating or a CDS spread? (The CDS spread, a point-in-time measure.)
- What does rating momentum do to the Markov assumption? (Violates it: past moves predict future moves.)
- Why might a regulator prefer TTC inputs for capital? (They reduce procyclicality of capital requirements.)

## Analogies
- A TTC rating is a climate report; a PIT measure is today's weather forecast.
- A transition matrix is a board game: each year every borrower rolls a die that decides which square it moves to, and default is the square you never leave.
- Rating momentum is like a car sliding downhill: once it starts moving it tends to keep going.

## Recording tips
- Put the matrix on screen and highlight each path with a different colour as you sum it.
- Emphasise the A→D→D path; it is the most commonly forgotten term.
- Avoid going deep on Basel IRB formulas here; they come in the credit risk lesson.
