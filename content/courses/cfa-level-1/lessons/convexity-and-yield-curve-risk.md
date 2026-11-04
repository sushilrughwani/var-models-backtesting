---
title: "Yield-Based Convexity and Portfolio Properties"
---

## Learning goals
- Explain why duration alone misestimates bond price changes and how convexity corrects the error.
- Calculate approximate convexity from prices at shifted yields.
- Estimate a bond's percentage price change using the duration-plus-convexity approximation.
- Calculate portfolio duration and convexity as market-value-weighted averages and state the limits of that approach.
- Distinguish positive convexity in option-free bonds from negative effective convexity in callable bonds.

## Explanation

### Why duration is not enough
In the last lesson, modified duration predicted a 2.70% price drop for a 100 bp yield rise, but the true drop was only 2.65%. The reason is that the price-yield relationship of an option-free bond is a **curve that bows toward the origin** (it is convex), while duration draws a straight tangent line through today's price. The curve always lies above that tangent line, so duration overstates losses when yields rise and understates gains when yields fall. Convexity measures how strongly the curve bends, and it supplies the second-order correction.

### The convexity-adjusted estimate

$$
\%\Delta PV \approx -\text{ModDur}\times\Delta\text{Yield} + \tfrac{1}{2}\times\text{Convexity}\times(\Delta\text{Yield})^2
$$

where $\Delta\text{Yield}$ is in decimals (100 bp = 0.01). The convexity term is squared, so it is **positive whichever way yields move** for a positively convex bond. Its size grows with the square of the move, so it is negligible for 5 bp and material for 200 bp.

Annual convexity for an annual-pay bond can be calculated from its cash flows:

$$
\text{Convexity} = \frac{1}{PV}\sum_{t=1}^{N}\frac{t(t+1)\,CF_t}{(1+r)^{t+2}}
$$

On the exam you will usually use the **approximate convexity** instead, which uses the same three prices as approximate duration:

$$
\text{ApproxCon} = \frac{PV_{-} + PV_{+} - 2PV_0}{(\Delta\text{Yield})^2 \times PV_0}
$$

where $PV_{-}$ and $PV_{+}$ are prices after the yield falls and rises by $\Delta\text{Yield}$, and $PV_0$ is today's price. If you shift the benchmark curve instead of the bond's own yield, the result is called **effective convexity**. The currency version is **money convexity** = convexity × full price.

### What drives convexity
Convexity rises with maturity and duration, and it is higher when cash flows are more **dispersed** over time. For two bonds with the same duration, the one whose payments are more spread out is more convex. Holding other things equal, a lower coupon and a lower yield also increase convexity. Investors pay for convexity: if two bonds share a duration and yield, the more convex one gains more and loses less, so it typically trades at a lower yield.

### Negative convexity
A callable bond's price is capped near the call price when yields fall, because the issuer is likely to refinance. At low yields its price-yield curve bends the wrong way, so its **effective convexity is negative**: price rises less than duration predicts when yields fall. A putable bond has extra positive convexity when yields rise, because the put sets a floor under the price.

### Portfolio duration and convexity
The practical approach is to take the weighted average of each bond's duration (and convexity), using market values as weights:

$$
D_P = \sum_{i} w_i D_i,\qquad w_i = \frac{MV_i}{\sum_j MV_j}
$$

This is easy to calculate and works even when bonds have embedded options (use effective durations), but it assumes that **all yields change by the same amount**, which is a parallel shift. The theoretically better alternative calculates duration from the portfolio's aggregate cash flows and its cash-flow yield. That method cannot handle bonds with options and breaks down once the yield curve is not flat. A weighted-average duration therefore measures exposure to parallel shifts only. Steepening, flattening or twisting of the curve, known as **yield curve risk**, requires key rate (partial) durations, which you will meet at later levels.

## Worked example
A 10-year bond pays a 5% annual coupon and yields 6%. Its price is 92.6399, its modified duration is 7.5684, and its annual convexity is 72.57.

**Step 1 - approximate convexity check.** At 5.9% the price is 93.3444; at 6.1% it is 91.9421. ApproxCon = (93.3444 + 91.9421 − 2 × 92.6399)/(0.001² × 92.6399) = 0.006723 / 0.0000926399 = 72.57.

**Step 2 - duration effect of a 100 bp rise.** −7.5684 × 0.01 = −7.5684%.

**Step 3 - convexity effect.** ½ × 72.57 × 0.01² = +0.3628%.

**Step 4 - combined estimate.** −7.5684% + 0.3628% = **−7.2056%**. Repricing at 7% gives 85.9528, an actual change of −7.2184%. The error falls from about 0.35 percentage points to about 0.01.

**Step 5 - a 100 bp fall.** +7.5684% + 0.3628% = +7.9313% against an actual +7.9448%. Notice the asymmetry: the gain is larger than the loss for the same size of move.

**Step 6 - portfolio.** You hold USD 6 million of Bond X (ModDur 3.0, convexity 12) and USD 4 million of Bond Y (ModDur 8.0, convexity 80). Weights are 0.6 and 0.4. Portfolio duration = 0.6(3.0) + 0.4(8.0) = 5.0, and portfolio convexity = 0.6(12) + 0.4(80) = 39.2. For a parallel rise of 50 bp: −5.0 × 0.005 + ½ × 39.2 × 0.005² = **−2.451%**, a loss of about USD 245,100.

## Common exam traps
- Forgetting the ½ in front of convexity, or forgetting to square the yield change.
- Entering the yield change in percent (1.0) instead of decimals (0.01), which blows up the convexity term.
- Giving the convexity term a negative sign when yields fall. For positive convexity it always adds to the estimate.
- Assuming a callable bond benefits from convexity at low yields. Its effective convexity there is negative.
- Weighting portfolio duration by par value. The weights must be market values.

## Key takeaways
- Duration is a tangent line; convexity captures the curvature it misses.
- %ΔPV ≈ −ModDur × ΔY + ½ × Convexity × ΔY², with ΔY in decimals.
- Approximate convexity = (PV− + PV+ − 2PV0)/(ΔY² × PV0).
- Positive convexity is valuable: bigger gains, smaller losses. Callable bonds can have negative convexity.
- Portfolio duration is the market-value-weighted average of bond durations and assumes parallel yield shifts.
