---
title: "One-Factor Risk Metrics and Hedges"
---

## Learning goals
- Calculate DV01, effective duration and effective convexity from bumped bond prices.
- Estimate a bond's price change for a parallel yield shift using duration alone and duration plus convexity.
- Distinguish Macaulay, modified and effective duration and explain when each applies.
- Calculate the face amount of a hedging instrument that neutralizes a position's DV01.

## Explanation

### One factor, one number
In this lesson we assume the whole term structure moves by the same amount: a single risk factor, usually a parallel shift in yields or spot rates. The question is simple: if rates move by $\Delta y$, how much does the bond's price change? Building on the pricing tools from the previous lessons, we answer by repricing the bond with rates bumped up and down.

### DV01
**DV01** (dollar value of an 01) is the price change for a one basis point decline in rates:

$$
DV01 = -\frac{\Delta P}{10{,}000 \times \Delta y} \approx \frac{P_{-} - P_{+}}{2 \times 10{,}000 \times \Delta y}
$$

where $P_{-}$ and $P_{+}$ are the prices after shifting rates down and up by $\Delta y$ (in decimal). DV01 is quoted per 100 face or in currency for a position, and it is positive for a normal bond. Traders like DV01 because it adds across positions: the DV01 of a portfolio is the sum of the DV01s.

### Duration
**Effective duration** expresses the same sensitivity as a percentage of price:

$$
D = \frac{P_{-} - P_{+}}{2 P \, \Delta y}
$$

A duration of 7.7 means the price falls about 7.7% for a 100 basis point rise in rates. The two measures are linked by $DV01 = D \times P / 10{,}000$.

**Macaulay duration** is the present-value-weighted average time to the cash flows. **Modified duration** equals Macaulay duration divided by $(1 + y/k)$, where $k$ is the number of payments per year; it measures sensitivity to the bond's own yield. Effective duration is computed by bumping the curve and repricing, so it also works when cash flows change with rates, as for callable bonds and mortgage-backed securities. For an option-free bond with a flat curve, modified and effective duration coincide.

### Convexity
The price-yield curve is not a straight line, so duration underestimates gains when rates fall and overestimates losses when rates rise. **Effective convexity** captures the curvature:

$$
C = \frac{P_{+} + P_{-} - 2P}{P \, (\Delta y)^2}
$$

The second-order price approximation is

$$
\frac{\Delta P}{P} \approx -D\,\Delta y + \frac{1}{2} C \,(\Delta y)^2
$$

For option-free bonds convexity is positive, which benefits the holder for moves in either direction. Callable bonds and MBS can show **negative convexity** at low rates, because the issuer's or borrower's prepayment option caps price gains.

### Hedging with DV01
To hedge a position against parallel shifts, choose a hedge that has the same DV01 with the opposite sign:

$$
F_H = F_P \times \frac{DV01_P}{DV01_H}
$$

where $F_P$ and $F_H$ are the face amounts of the position and the hedge, and the DV01s are per 100 face. The hedge protects only against small parallel moves; a curve twist or a large move (where convexities differ) leaves residual risk.

## Worked example
A 10-year bond pays a 5% coupon semiannually and yields 6%. Repricing at 5.9%, 6.0% and 6.1% gives $P_{-} = 93.274083$, $P = 92.561263$ and $P_{+} = 91.855087$ ($\Delta y = 0.001$).

**Step 1 - DV01.**

$$
DV01 = \frac{93.274083 - 91.855087}{2 \times 10{,}000 \times 0.001} = \frac{1.418996}{20} = 0.070950
$$

**Step 2 - duration.**

$$
D = \frac{1.418996}{2 \times 92.561263 \times 0.001} = 7.6652
$$

(Macaulay duration is 7.8950 and modified duration $7.8950/1.03 = 7.6650$, matching.)

**Step 3 - convexity.**

$$
C = \frac{91.855087 + 93.274083 - 2 \times 92.561263}{92.561263 \times 0.001^2} = \frac{0.006644}{0.00009256} \approx 71.78
$$

**Step 4 - a 100 bp rise.** Duration alone: $-7.6652 \times 0.01 \times 92.5613 = -7.0950$. Convexity adds $\tfrac12 \times 71.78 \times 0.0001 \times 92.5613 = +0.3322$. Estimate: $-6.7628$. Full repricing at 7% gives 85.7876, a change of $-6.7737$, so duration plus convexity is far closer.

**Step 5 - hedge.** You hold USD 10 million face. Position DV01 $= 0.070950/100 \times 10{,}000{,}000 =$ USD 7,095 per bp. The hedge is a 5-year 4% semiannual bond yielding 5.5%, DV01 0.041537 per 100. Hedge face $= 10{,}000{,}000 \times 0.070950 / 0.041537 =$ **USD 17.08 million, sold short**.

## Common exam traps
- Forgetting the factor of 2 in the central-difference formulas for DV01 and duration.
- Dropping the $\tfrac12$ in the convexity term, or applying it with the wrong sign.
- Using modified duration for a callable bond; effective duration is required when cash flows depend on rates.
- Hedging by matching face amounts or durations instead of DV01s.
- Treating DV01 hedges as complete protection; they ignore non-parallel shifts.

## Key takeaways
- DV01 is the price change per basis point; it adds across positions.
- Effective duration = $(P_{-} - P_{+}) / (2P\Delta y)$; $DV01 = D \times P / 10{,}000$.
- Convexity corrects duration's straight-line error and is positive for option-free bonds.
- Price change ≈ $-D\Delta y + \tfrac12 C (\Delta y)^2$, times price.
- Hedge face = position face × DV01 of position / DV01 of hedge.
