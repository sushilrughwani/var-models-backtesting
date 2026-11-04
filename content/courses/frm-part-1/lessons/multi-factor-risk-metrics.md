---
title: "Multi-Factor Risk Metrics and Hedges"
---

## Learning goals
- Describe key-rate shifts and calculate key-rate 01s and key-rate durations for a bond or portfolio.
- Explain partial 01s and forward-bucket 01s as alternative ways to slice curve risk.
- Calculate the face amounts of several hedging instruments that neutralize a portfolio's key-rate exposures.
- Explain why a single DV01 hedge leaves a portfolio exposed to changes in the shape of the curve.

## Explanation

### Why one factor is not enough
The previous lesson assumed every rate moves by the same amount. Real curves steepen, flatten and twist: 2-year rates can rise while 30-year rates fall. A portfolio long 30-year bonds and short 2-year bonds can have zero DV01 yet lose heavily if the curve steepens. To capture this, we measure sensitivity to **several points** on the curve separately.

### Key-rate shifts
Choose a small set of **key rates**, for example the 2-, 5-, 10- and 30-year spot (or par) yields. A **key-rate shift** moves one key rate by 1 basis point and spreads the effect linearly to the neighbouring key rates:

- At the chosen key rate, the shift is 1 bp.
- Between it and the adjacent key rates, the shift declines linearly to zero.
- Before the first key rate and after the last, the shift stays flat at the full amount.

For example, a 1 bp shift in the 5-year key rate moves the 7-year rate by $1 \times (10 - 7)/(10 - 5) = 0.6$ bp and leaves the 10-year rate unchanged. A useful property: adding all the key-rate shifts together produces exactly a 1 bp parallel shift.

### Key-rate 01s and durations
The **key-rate 01** for key rate $k$ is the price change from a 1 bp decline in that key rate alone:

$$
KR01_k = -\frac{1}{10{,}000}\,\frac{\Delta P_k}{\Delta y_k}
$$

and the **key-rate duration** expresses it as a percentage of price:

$$
D_k = -\frac{1}{P}\,\frac{\Delta P_k}{\Delta y_k}
$$

where $\Delta P_k$ is the price change when only key rate $k$ moves by $\Delta y_k$. Because the shifts add to a parallel shift, the key-rate 01s sum (approximately) to the bond's overall DV01, and key-rate durations sum to effective duration. A zero-coupon bond maturing exactly at a key rate has all its exposure at that key rate; a coupon bond spreads exposure across several.

### Partial 01s and forward-bucket 01s
Two related approaches are widely used on trading desks:

- **Partial 01s**: the curve is built from a set of liquid par instruments (typically swaps). Bump one instrument's quoted rate by 1 bp, rebuild the curve with all other quotes unchanged, and reprice. This ties risk directly to instruments a trader can actually hedge with.
- **Forward-bucket 01s**: divide the curve into maturity buckets (for example 0-2, 2-5, 5-10 years) and shift all **forward rates** in one bucket by 1 bp. This shows where along the forward curve the exposure sits and avoids the kinks that spot-rate shifts can create in the forward curve.

### Hedging several factors
To hedge, choose as many hedging instruments as there are key rates and solve for face amounts $F_j$ so that, at every key rate, the hedges offset the portfolio:

$$
\sum_{j} \frac{F_j}{100} \, KR01_{j,k} = KR01_{\text{portfolio},k} \quad \text{for every key rate } k
$$

where $KR01_{j,k}$ is instrument $j$'s exposure to key rate $k$ per 100 face. When each hedge instrument matures at a key rate, its exposures sit at that key rate and the shorter ones, so the system is triangular: solve from the longest key rate backwards.

## Worked example
A portfolio has key-rate 01s (USD per bp) of 1,200 at 2 years, 3,500 at 5 years and 6,800 at 10 years. Three bonds are available, with KR01s per 100 face:

| Hedge bond | 2-year | 5-year | 10-year |
|---|---|---|---|
| 2-year | 0.0190 | 0 | 0 |
| 5-year | 0.0010 | 0.0460 | 0 |
| 10-year | 0.0015 | 0.0030 | 0.0830 |

**Step 1 - 10-year key rate.** Only the 10-year bond has 10-year exposure:

$$
F_{10} = \frac{6{,}800}{0.0830/100} = 8{,}192{,}771
$$

**Step 2 - 5-year key rate.** The 10-year hedge already covers $8{,}192{,}771 \times 0.0030/100 = 245.78$. Remaining: $3{,}500 - 245.78 = 3{,}254.22$, so

$$
F_{5} = \frac{3{,}254.22}{0.0460/100} = 7{,}074{,}384
$$

**Step 3 - 2-year key rate.** Already covered: $8{,}192{,}771 \times 0.0015/100 + 7{,}074{,}384 \times 0.0010/100 = 122.89 + 70.74 = 193.64$. Remaining: $1{,}200 - 193.64 = 1{,}006.36$, so

$$
F_{2} = \frac{1{,}006.36}{0.0190/100} = 5{,}296{,}656
$$

**Answer:** sell about **USD 8.19 million of the 10-year, USD 7.07 million of the 5-year and USD 5.30 million of the 2-year bond**. The portfolio is now hedged against each key-rate shift and therefore against any curve change that can be built from them, including a parallel shift.

## Common exam traps
- Assuming a key-rate shift moves only one maturity; it moves the whole region between neighbouring key rates.
- Solving the hedge from the shortest key rate first and ignoring that longer bonds also carry short key-rate exposure.
- Forgetting that key-rate 01s sum to DV01 because the shifts sum to a parallel shift.
- Confusing partial 01s (bump par instrument quotes) with forward-bucket 01s (bump forward rates in a region).
- Believing a zero-DV01 portfolio has no rate risk; it can still lose on steepening or flattening.

## Key takeaways
- Real curves twist, so one DV01 cannot describe a portfolio's rate risk.
- A key-rate shift is 1 bp at the key rate, fading linearly to zero at its neighbours.
- Key-rate 01s add up to DV01; key-rate durations add up to effective duration.
- Partial 01s bump par quotes; forward-bucket 01s bump forward rates in a bucket.
- Hedge with one instrument per key rate, solving from the longest maturity backwards.
