---
title: "Fixed-Income Bond Valuation: Prices and Yields"
---

## Learning goals
- Calculate a bond's price by discounting its cash flows at a single market discount rate (yield to maturity).
- Explain why a bond trades at a premium, discount or par, and how price moves as yield changes and time passes.
- Price a bond using a sequence of spot rates and back out the equivalent yield to maturity.
- Calculate accrued interest, the full (dirty) price and the flat (clean) price between coupon dates.
- Describe matrix pricing for bonds that rarely trade.

## Explanation

### Price = present value of promised cash flows
A bond is just a bundle of future payments. Its price is what those payments are worth today, using the time value of money tools from Quantitative Methods. If one discount rate $r$ (per period) is used for every cash flow:

$$
PV = \frac{PMT}{(1+r)^1} + \frac{PMT}{(1+r)^2} + \cdots + \frac{PMT + FV}{(1+r)^N}
$$

where $PMT$ is the coupon per period, $FV$ is par, $N$ is the number of periods and $r$ is the market discount rate per period. When this $r$ makes $PV$ equal to the observed price, it is the bond's **yield to maturity** (YTM), stated annually by multiplying by the periods per year.

For a semiannual bond, halve the annual coupon and the annual yield, and double the number of years.

### Premium, discount and par
- Coupon rate = yield: the bond trades at **par**.
- Coupon rate > yield: the coupons are generous relative to the market, so investors pay a **premium**.
- Coupon rate < yield: a **discount**.

Price and yield move in **opposite** directions, and the relationship is curved (convex): a yield fall raises the price by more than an equal yield rise lowers it. Longer maturity and lower coupon mean greater price sensitivity. As time passes with yield unchanged, a premium or discount bond's price is **pulled to par** at maturity.

YTM assumes the investor holds to maturity, receives every payment on time and reinvests coupons at the YTM itself.

### Pricing with spot rates
A **spot rate** is the yield on a zero-coupon bond for one specific maturity. Each cash flow is a mini zero-coupon bond, so it is more precise to discount each one at its own spot rate:

$$
PV = \frac{PMT}{(1+z_1)^1} + \frac{PMT}{(1+z_2)^2} + \cdots + \frac{PMT + FV}{(1+z_N)^N}
$$

where $z_t$ is the spot rate for period $t$. Pricing with spot rates ensures no arbitrage: the bond cannot be worth more or less than the sum of its stripped cash flows. The single YTM that reproduces this price is a weighted blend of the spot rates.

### Between coupon dates: full price, flat price, accrued interest
Bonds usually settle between coupon dates. The seller has earned part of the next coupon, so the buyer must compensate them. The **full price** (dirty price, invoice price) is the PV of future cash flows at the settlement date:

$$
PV^{\text{Full}} = PV \times (1+r)^{t/T}
$$

where $PV$ is the price on the last coupon date, $t$ is the days from the last coupon to settlement and $T$ is the days in the coupon period. **Accrued interest** is the seller's share of the coupon:

$$
AI = \frac{t}{T} \times PMT
$$

and the **flat price** (clean price, the one quoted on screens) is

$$
PV^{\text{Flat}} = PV^{\text{Full}} - AI
$$

Quoting the flat price avoids a saw-tooth pattern where the price would jump on every coupon date. Day count: government bonds commonly use **actual/actual**; corporate bonds often use **30/360**.

### Matrix pricing
For a bond that rarely trades, an analyst estimates its yield from comparable liquid bonds with similar credit quality, interpolating linearly across maturities, then prices the bond at that estimated yield. The same idea helps set the coupon on a new issue.

## Worked example
**Part A - single yield.** A 3-year, 6% semiannual-pay bond, par 100, yields 5%. Use $PMT = 3$, $r = 2.5\%$, $N = 6$:

$$
PV = \sum_{t=1}^{6}\frac{3}{1.025^t} + \frac{100}{1.025^6} = 102.75
$$

Coupon above yield, so it trades at a premium: **102.75**. At a 7% yield the price would be 97.34 (discount).

**Part B - spot rates.** A 3-year, 5% annual bond with spot rates 3%, 4% and 4.5%:

$$
\frac{5}{1.03} + \frac{5}{1.04^2} + \frac{105}{1.045^3} = 4.8544 + 4.6228 + 92.0111 = 101.49
$$

Solving for the single rate that gives 101.49 yields a YTM of about **4.46%**, between the 4% and 4.5% spot rates and close to the 3-year rate because the final cash flow dominates.

**Part C - full and flat price.** A 4% semiannual bond, par 100, has 5 years (10 periods) left at its last coupon date. YTM = 5%. Settlement is 62 days into a 180-day period (30/360).

1. Price at last coupon: $PMT = 2$, $r = 2.5\%$, $N = 10$ gives $PV = 95.6240$.
2. Full price: $95.6240 \times 1.025^{62/180} = 96.4407$.
3. Accrued interest: $(62/180) \times 2 = 0.6889$.
4. Flat price: $96.4407 - 0.6889 =$ **95.75**.

## Common exam traps
- Using the annual coupon and annual yield with semiannual periods; divide both by 2 and double N.
- Computing the full price with simple interest, $PV(1 + r \cdot t/T)$, instead of compounding $(1+r)^{t/T}$.
- Quoting the full price when the question asks for the flat (quoted) price, or vice versa.
- Discounting all cash flows at the longest spot rate; each cash flow uses its own spot rate.
- Forgetting the inverse price-yield link when asked about a premium bond's price as maturity approaches (it falls toward par).

## Key takeaways
- Bond price = PV of coupons and principal; YTM is the single rate that equates PV to price.
- Coupon above yield means premium; below means discount; prices pull to par over time.
- Spot-rate pricing discounts each cash flow at its own zero rate and rules out arbitrage.
- Full price = PV at last coupon × $(1+r)^{t/T}$; flat price = full price − accrued interest.
- Matrix pricing estimates yields for illiquid bonds from comparable issues.
