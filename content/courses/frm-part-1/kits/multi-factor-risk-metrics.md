---
title: "Multi-Factor Risk Metrics and Hedges"
duration: 22
---

## Lecture outline
- 00:00 - Hook: a desk is long 30-year bonds and short 2-year bonds with zero DV01. The curve steepens 40 bp. Did they lose money? (Yes.)
- 02:30 - Why one factor fails: steepening, flattening, twists.
- 04:30 - Key-rate shifts: shape of the triangle, flat ends, sum to parallel.
- 07:30 - Key-rate 01s and key-rate durations; zero versus coupon bond profiles.
- 10:00 - Partial 01s and forward-bucket 01s.
- 13:00 - Hedging system: one instrument per key rate, solve from the back.
- 15:00 - Whiteboard 1: three-bond hedge of the 1,200 / 3,500 / 6,800 portfolio.
- 19:30 - Whiteboard 2: interpolating a key-rate shift; recap and traps.

## Slides
### Slide 1: Multi-Factor Risk Metrics and Hedges
- Curves do not just shift; they twist
- Measure risk at several points on the curve
- Hedge each point separately

### Slide 2: The Problem With One DV01
- Zero DV01 can hide large curve exposure
- Long end and short end can move in opposite directions
- Need a risk profile, not a single number

### Slide 3: Key-Rate Shifts
- 1 bp at the chosen key rate
- Fades linearly to zero at neighbouring key rates
- Flat before the first and after the last key rate

### Slide 4: Shifts Add Up
- Sum of all key-rate shifts = 1 bp parallel shift
- So key-rate 01s sum to DV01
- Key-rate durations sum to effective duration

### Slide 5: Key-Rate 01 and Duration
- KR01_k = −ΔP_k / (10,000 Δy_k)
- D_k = −ΔP_k / (P Δy_k)
- Zero at a key rate: all exposure in one bucket

### Slide 6: Partial 01s
- Curve built from liquid par instruments (swaps)
- Bump one quote, rebuild curve, reprice
- Risk expressed in tradeable instruments

### Slide 7: Forward-Bucket 01s
- Shift all forward rates within a maturity bucket
- Shows where on the forward curve the risk sits
- Avoids artificial kinks in forwards

### Slide 8: The Hedging System
- One hedge instrument per key rate
- Σ (F_j/100) × KR01_j,k = portfolio KR01_k
- Triangular: solve longest first

### Slide 9: After the Hedge
- Neutral to each key-rate shift
- Therefore neutral to any combination of them
- Residual risk between key rates and from large moves

### Slide 10: Recap
- Profile of exposures across maturities
- Choose key rates, partial 01s or buckets to fit the desk
- Hedge from the back of the curve

## Whiteboard examples
**Example 1 - three-instrument hedge.** Portfolio KR01s (USD/bp): 2y 1,200; 5y 3,500; 10y 6,800. Hedge KR01s per 100 face: 2-year bond (0.0190, 0, 0); 5-year bond (0.0010, 0.0460, 0); 10-year bond (0.0015, 0.0030, 0.0830).
- F10 = 6,800 / 0.000830 = **8,192,771**
- 5-year residual: 3,500 − 8,192,771 × 0.000030 = 3,500 − 245.78 = 3,254.22; F5 = 3,254.22 / 0.000460 = **7,074,384**
- 2-year residual: 1,200 − 122.89 − 70.74 = 1,006.36; F2 = 1,006.36 / 0.000190 = **5,296,656**
- Sell all three; check that each key rate nets to zero

**Example 2 - interpolating a key-rate shift.** Key rates at 5 and 10 years. The 5-year key rate rises 10 bp.
- 7-year rate change = 10 × (10 − 7)/(10 − 5) = **6 bp**
- 10-year rate change = 0; 3-year rate change (with a 2-year key rate below) = 10 × (3 − 2)/(5 − 2) = **3.33 bp**

## Questions to ask students
- A bond has KR01s of 0.010, 0.025 and 0.040 at three key rates. What is its approximate DV01? (0.075.)
- Why solve the hedge from the 10-year key rate first? (Only the 10-year bond has 10-year exposure, so that equation has one unknown.)
- A 5-year zero-coupon bond: at which key rate is its exposure? (Entirely at the 5-year key rate, if 5 years is a key rate.)
- What does a partial 01 bump that a key-rate 01 does not? (A quoted par instrument, with the curve rebuilt.)
- Can a portfolio with zero DV01 lose money? (Yes, from non-parallel moves.)

## Analogies
- A single DV01 is like weighing a suitcase; key-rate 01s are like checking how the weight is distributed, which matters when the trolley tilts.
- Key-rate shifts are tent poles: lift one pole and the fabric rises most there, sloping down to the neighbouring poles.
- Hedging from the back of the curve is like paying off debts in order: settle the item only one creditor can claim, then move to the next.

## Recording tips
- Draw the triangular key-rate shifts on one chart and stack them to show they sum to a flat line.
- Put the hedge matrix on screen as a table; the triangular structure is easier to see than to hear.
- Pause after Step 1 of the hedge to ask what happens at the 5-year point; this is where students get lost.
