---
title: "Yield-Based Convexity and Portfolio Properties"
duration: 26
---

## Lecture outline
- 00:00 - Hook: last lesson's estimate missed by 0.05%. Over 200 bp the miss grows much larger. Why?
- 02:00 - The price-yield curve versus the duration tangent line
- 06:00 - Convexity formula, approximate convexity and the combined estimate
- 11:00 - Whiteboard: 10-year 5% bond at 6%, estimates at ±100 bp
- 16:00 - Drivers of convexity, its value to investors, and negative convexity in callables
- 20:00 - Portfolio duration and convexity: weighted averages and the parallel-shift assumption
- 24:00 - Recap and exam traps

## Slides
### Slide 1: Yield-Based Convexity and Portfolio Properties
- Duration gives a straight-line answer, but prices move along a curve
- Today: convexity, the two-term estimate, portfolio measures
- Prerequisite: modified and effective duration

### Slide 2: The Curve and the Tangent
- An option-free bond's price-yield curve is convex
- Duration is the slope of the tangent at today's yield
- The curve lies above the tangent, so duration is too pessimistic in both directions

### Slide 3: The Two-Term Estimate
- %ΔPV ≈ −ModDur × ΔY + ½ × Convexity × ΔY²
- ΔY in decimals: 100 bp = 0.01
- The convexity term is positive for both rises and falls

### Slide 4: Approximate Convexity
- ApproxCon = (PV− + PV+ − 2PV0) / (ΔY² × PV0)
- Same three prices as approximate duration
- Shift the benchmark curve instead and you get effective convexity

### Slide 5: Worked Bond
- 10-year, 5% coupon, 6% yield: price 92.6399
- ModDur 7.5684, convexity 72.57
- +100 bp: −7.5684% + 0.3628% = −7.2056% (actual −7.2184%)
- −100 bp: +7.9313% (actual +7.9448%)

### Slide 6: What Drives Convexity
- Longer maturity and duration: more convexity
- Dispersed cash flows: more convexity at the same duration
- Lower coupon and lower yield: more convexity

### Slide 7: Convexity Has a Price
- Same duration and yield: the more convex bond wins in both directions
- So the market charges for it with a lower yield
- Whether it is worth paying for depends on expected volatility

### Slide 8: Negative Convexity
- Callable bonds: price compressed near the call price as yields fall
- Effective convexity becomes negative at low yields
- Putable bonds: extra positive convexity as yields rise

### Slide 9: Portfolio Duration
- Weighted average of bond durations, with market-value weights
- Works with effective durations of bonds that have options
- Assumes every yield moves by the same amount

### Slide 10: Limits and Yield Curve Risk
- Cash-flow-yield method: theoretically better, but impractical with options or a non-flat curve
- Non-parallel shifts (steepening, flattening) are not captured
- Key rate durations come later in the curriculum

## Whiteboard examples
**Example 1 - approximate convexity and estimate.** 10-year, 5% annual coupon, yield 6%, price 92.6399.
- PV at 5.9% = 93.3444; PV at 6.1% = 91.9421.
- ApproxDur = (93.3444 − 91.9421)/(2 × 0.001 × 92.6399) = 7.5686.
- ApproxCon = (93.3444 + 91.9421 − 2 × 92.6399)/(0.000001 × 92.6399) = 72.57.
- +100 bp: −7.5684% + ½(72.57)(0.0001) = −7.5684% + 0.3628% = −7.2056%. Exact repricing at 7% gives 85.9528, or −7.2184%.
- +200 bp: duration alone −15.14%; with convexity −13.69%; exact −13.78% (price 79.8698). Bigger moves give bigger duration errors.

**Example 2 - portfolio.** USD 6m of Bond X (ModDur 3.0, Con 12) and USD 4m of Bond Y (ModDur 8.0, Con 80).
- Weights 0.6 and 0.4. Duration = 5.0, convexity = 39.2.
- +50 bp: −5.0(0.005) + ½(39.2)(0.000025) = −2.5% + 0.049% = −2.451%, about −USD 245,100 on USD 10m.

## Questions to ask students
- If yields fall by 100 bp, is the convexity adjustment added or subtracted? (Added; for a positively convex bond it is always positive.)
- Two bonds have equal duration; one is a zero, the other a barbell of short and long cash flows. Which is more convex? (The barbell, because its cash flows are more dispersed.)
- Why might a callable bond's price barely rise when yields fall sharply? (Negative convexity: the call caps the price.)
- Why must portfolio weights use market values, not par? (Duration measures percentage change in market value, so each bond contributes in proportion to its value.)
- What does a weighted-average portfolio duration assume about the yield curve? (A parallel shift.)

## Analogies
- Road and ramp: duration is a straight ramp touching a curved road; for short distances they match, but farther out the road curves up and away.
- Insurance policy: positive convexity is like a free option that pays off whichever way rates jump, and the market charges a premium for it through a lower yield.
- Ceiling on a balloon: a callable bond's price rises like a balloon until it hits the ceiling of the call price.

## Recording tips
- Graph the curve and the tangent on screen and shade the gap. That shaded area is convexity.
- Pause and make students write ΔY = 0.01, not 1. This is the single most common arithmetic error.
- Show the ±100 bp results together so the asymmetry is visible.
