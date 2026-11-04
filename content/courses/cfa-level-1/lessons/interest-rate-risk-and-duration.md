---
title: "Interest Rate Risk and Return"
---

## Learning goals
- Identify the three sources of return on a fixed-rate bond and explain how a change in yield affects each one.
- Calculate Macaulay duration, modified duration and money duration for an option-free bond.
- Estimate effective duration from prices at shifted yields and explain when it is the right measure.
- Explain why a bondholder whose investment horizon equals Macaulay duration is approximately immunised against a one-time yield shift.

## Explanation

### Where bond returns come from
Buy a fixed-rate bond and hold it for some horizon, and your return comes from three sources:
1. **Coupon and principal payments** promised by the issuer.
2. **Reinvestment income** earned on coupons between receipt and the end of your horizon.
3. **Capital gain or loss** when you sell before maturity at a price that may differ from its carrying value (the price implied by the original yield).

When yields rise, sources 2 and 3 pull in opposite directions: reinvested coupons earn more, but the bond sells for less. A short-horizon investor feels mostly the price hit (**market price risk**). A long-horizon investor feels mostly the reinvestment boost, while falling yields hurt them through lower reinvestment income (**coupon reinvestment risk**). Duration tells you where these two forces balance.

### Macaulay duration: a time measure
Macaulay duration is the weighted-average time until you receive the bond's cash flows, where each weight is that cash flow's share of the bond's price:

$$
\text{MacDur} = \sum_{t=1}^{N} t \times \frac{CF_t/(1+r)^t}{PV}
$$

where $CF_t$ is the cash flow in period $t$, $r$ is the yield per period, $N$ is the number of periods and $PV$ is the bond's price. The answer is in periods; divide by the number of periods per year to annualise. A zero-coupon bond's Macaulay duration equals its maturity, while a coupon bond's is shorter because some cash arrives early.

### Modified duration: a sensitivity measure
Divide Macaulay duration by one plus the periodic yield to turn time into price sensitivity:

$$
\text{ModDur} = \frac{\text{MacDur}}{1+r}
\qquad
\%\Delta PV \approx -\text{ModDur} \times \Delta\text{Yield}
$$

Modified duration is the approximate percentage change in price for a 1-unit (100%) change in yield, so a ModDur of 2.70 means roughly a 2.70% price fall for a 100 bp rise. Two related measures express the same idea in currency:

$$
\text{MoneyDur} = \text{ModDur} \times PV^{\text{full}}
\qquad
\text{PVBP} \approx \frac{PV_{-} - PV_{+}}{2}
$$

where money duration gives the currency price change per 1.00 change in yield, and the price value of a basis point (PVBP) is the price change for a 1 bp move, with $PV_{-}$ and $PV_{+}$ the prices after a 1 bp fall and rise.

### Effective duration: when cash flows can change
Callable bonds, putable bonds and mortgage-backed securities have cash flows that depend on future rates, so a yield-based formula breaks down. Instead, reprice the bond with a model after shifting the benchmark curve up and down by $\Delta\text{Curve}$:

$$
\text{EffDur} = \frac{PV_{-} - PV_{+}}{2 \times \Delta\text{Curve} \times PV_0}
$$

For an option-free bond, effective duration is almost the same as modified duration. For a callable bond it is lower, because the call caps the price when rates fall.

### What drives duration
Holding other things equal, duration is **higher** for longer maturity, a lower coupon and a lower yield. A floating-rate note's duration is close to the time to its next coupon reset.

### Duration and the investment horizon
If your horizon equals the bond's Macaulay duration, a one-time parallel yield shift right after purchase leaves your horizon yield approximately equal to the original yield: the price loss and the reinvestment gain roughly cancel. The **duration gap** is Macaulay duration minus the horizon. A positive gap (horizon shorter than duration) means price risk dominates, so rising yields hurt; a negative gap means reinvestment risk dominates, so rising yields help.

## Worked example
A 3-year bond pays a 6% annual coupon, par 100, and yields 5%.

**Step 1 - price.** Present values of the cash flows: 6/1.05 = 5.7143; 6/1.05² = 5.4422; 106/1.05³ = 91.5668. Price = 102.7232.

**Step 2 - weights.** 5.7143/102.7232 = 0.0556; 5.4422/102.7232 = 0.0530; 91.5668/102.7232 = 0.8914.

**Step 3 - Macaulay duration.** 1(0.0556) + 2(0.0530) + 3(0.8914) = 2.8358 years.

**Step 4 - modified duration.** 2.8358/1.05 = 2.7007.

**Step 5 - estimate a 100 bp rise.** %ΔPV ≈ −2.7007 × 0.01 = −2.70%. Repricing the bond exactly at 6% gives 100.0000, a change of −2.65%. The gap between the two is convexity, which is the next lesson.

**Step 6 - effective duration check.** At 4.5% the price is 104.1234; at 5.5% it is 101.3490. EffDur = (104.1234 − 101.3490)/(2 × 0.005 × 102.7232) = 2.7009, essentially equal to ModDur, as expected for an option-free bond.

**Answer: Macaulay duration ≈ 2.84 years, modified duration ≈ 2.70, money duration ≈ 277.43 per 100 par.**

## Common exam traps
- Using Macaulay duration directly in the price-change formula. Always convert to modified duration first.
- Forgetting to annualise: with semiannual periods, divide periodic Macaulay duration by 2, and use the periodic yield when dividing by $1+r$.
- Calling a callable bond's modified duration its "risk". When cash flows depend on rates, only effective duration is meaningful.
- Mixing up the duration gap sign. When the horizon is shorter than Macaulay duration, rising rates are bad news.
- Treating duration as exact for big moves; it is only a straight-line estimate.

## Key takeaways
- Bond return = coupons + reinvestment income ± capital gain or loss; rate changes move the last two in opposite directions.
- Macaulay duration is a weighted-average time; modified duration converts it into percentage price sensitivity.
- Money duration and PVBP express interest rate risk in currency, which is what traders and hedgers use.
- Effective duration is calculated by repricing with a model and is required for bonds with embedded options.
- Duration rises with maturity and falls with coupon and yield.
- Matching your horizon to Macaulay duration roughly immunises you against a single parallel shift.
