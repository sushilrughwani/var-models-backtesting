---
title: "One-Factor Risk Metrics and Hedges"
duration: 30
---

## Lecture outline
- 00:00 - Hook: your desk holds USD 10 million of a 10-year bond. Rates jump 100 bp overnight. How much did you lose, and what should you have sold yesterday?
- 03:00 - One-factor assumption: parallel shifts; bump-and-reprice idea.
- 06:00 - DV01 definition, units and additivity.
- 09:00 - Effective, Macaulay and modified duration; link DV01 = D × P / 10,000.
- 13:00 - Whiteboard 1: DV01 and duration of the 10-year 5% bond.
- 17:00 - Convexity: why the straight line fails; formula and second-order approximation.
- 21:00 - Whiteboard 2: convexity and the 100 bp shock versus full repricing.
- 24:00 - DV01 hedging; Whiteboard 3: hedge face in the 5-year bond.
- 28:00 - Limits of one-factor hedges, negative convexity, recap.

## Slides
### Slide 1: One-Factor Risk Metrics and Hedges
- How much does price move when rates move?
- DV01, duration, convexity
- Hedging a parallel shift

### Slide 2: The One-Factor Assumption
- All rates shift by the same amount
- Bump rates down and up, reprice
- Simple, but ignores twists (next lesson)

### Slide 3: DV01
- Price change for a 1 bp fall in rates
- DV01 ≈ (P− − P+) / (2 × 10,000 × Δy)
- Per 100 face or in currency; adds across positions

### Slide 4: Effective Duration
- D = (P− − P+) / (2 P Δy)
- Percentage price change per 100 bp
- DV01 = D × P / 10,000

### Slide 5: Macaulay and Modified Duration
- Macaulay: PV-weighted average time to cash flows
- Modified = Macaulay / (1 + y/k)
- Effective needed when cash flows depend on rates

### Slide 6: Convexity
- C = (P+ + P− − 2P) / (P Δy²)
- Captures curvature of price-yield curve
- Positive for option-free bonds

### Slide 7: Second-Order Approximation
- ΔP/P ≈ −D Δy + ½ C Δy²
- Convexity term always adds when C > 0
- Matters most for large moves

### Slide 8: Negative Convexity
- Callable bonds and MBS at low rates
- Prepayment options cap price gains
- Holder loses more on rises than gains on falls

### Slide 9: DV01 Hedging
- Hedge face = position face × DV01_P / DV01_H
- Opposite sign: long bond, short hedge
- Protects against small parallel moves

### Slide 10: What a DV01 Hedge Misses
- Curve twists and steepening
- Convexity mismatch on large moves
- Basis risk between the bonds

### Slide 11: Recap
- DV01 for currency risk, duration for percentage risk
- Add convexity for big moves
- Match DV01s to hedge

## Whiteboard examples
**Example 1 - DV01 and duration.** 10-year, 5% semiannual bond at 6%. Prices: 5.9% → 93.274083; 6.0% → 92.561263; 6.1% → 91.855087.
- DV01 = (93.274083 − 91.855087) / 20 = **0.070950** per 100
- D = 1.418996 / (2 × 92.561263 × 0.001) = **7.6652**
- Check: 7.6652 × 92.5613 / 10,000 = 0.070950

**Example 2 - convexity and a 100 bp rise.**
- C = (91.855087 + 93.274083 − 185.122526) / (92.561263 × 0.000001) = 0.006644 / 0.00009256 ≈ **71.78**
- Duration only: −7.6652 × 0.01 × 92.5613 = −7.0950
- Convexity: +½ × 71.78 × 0.0001 × 92.5613 = +0.3322
- Estimate −6.7628 versus actual −6.7737 (new price 85.7876)

**Example 3 - hedge.** Long USD 10 million face (DV01 0.070950 per 100). Hedge with a 5-year 4% semiannual bond at 5.5% (price 93.5199, DV01 0.041537 per 100).
- Position DV01 = USD 7,095 per bp
- Hedge face = 10,000,000 × 0.070950 / 0.041537 = **USD 17.08 million short**

## Questions to ask students
- A position has DV01 of USD 4,000. Rates rise 15 bp. Approximate P&L? (Loss of about USD 60,000.)
- Why is the hedge face larger than the position face in Example 3? (The 5-year bond has a smaller DV01 per 100, so more of it is needed.)
- Is the convexity term positive or negative when rates rise for an option-free bond? (Positive: it reduces the loss.)
- When must you use effective rather than modified duration? (When cash flows depend on rates, e.g. callable bonds or MBS.)
- After a DV01 hedge, what risk is left? (Non-parallel curve moves, convexity differences on large moves, basis risk.)

## Analogies
- Duration is the slope of a hill under your feet; convexity tells you the hill curves, so walking far in either direction the slope estimate drifts.
- DV01 hedging is balancing a seesaw: a heavy child close to the pivot can be balanced by a lighter child farther out; you match the turning effect, not the weight.
- Positive convexity is like a car with better brakes than acceleration risk: gains accelerate, losses slow down.

## Recording tips
- Draw the curved price-yield graph with the tangent line before introducing convexity; the gap is the whole story.
- Students often mix up DV01 per 100 face and position DV01; write units next to every number.
- Show the full-repricing check at the end to build trust in the approximation.
