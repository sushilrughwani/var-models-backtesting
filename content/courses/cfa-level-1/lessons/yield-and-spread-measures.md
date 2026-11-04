---
title: "Yield and Yield Spread Measures"
---

## Learning goals
- Convert a yield between different compounding periodicities and calculate the effective annual yield.
- Calculate current yield, yield to call and yield to worst for a callable bond.
- Calculate the price, add-on rate and bond-equivalent yield of a money market instrument quoted on a discount basis.
- Distinguish the G-spread, I-spread, Z-spread and option-adjusted spread, and calculate a G-spread using interpolation.

## Explanation

### Periodicity: the same yield, written differently
The previous lesson priced bonds with a yield per period. Yields are quoted as annual rates *for a stated periodicity*: a 6% semiannual yield means 3% every six months. To compare bonds that pay at different frequencies, convert them to a common basis:

$$
\left(1 + \frac{APR_m}{m}\right)^m = \left(1 + \frac{APR_n}{n}\right)^n
$$

where $APR_m$ is the annual yield compounded $m$ times a year. The **effective annual yield** is the case $n = 1$. For example, 6% semiannual equals $1.03^2 - 1 = 6.09\%$ effective annual. More frequent compounding means a *lower* stated rate for the same effective return. The **street convention** yield assumes scheduled payment dates; the **true yield** uses actual dates, including weekends and holidays.

### Current yield: a quick but incomplete measure

$$
\text{Current yield} = \frac{\text{Annual coupon}}{\text{Flat price}}
$$

It ignores capital gains or losses toward par and the timing of cash flows, so it overstates a premium bond's return and understates a discount bond's.

### Callable bonds: yield to call and yield to worst
For a callable bond, compute a **yield to call** for each possible call date by replacing the maturity with the call date and the par value with the call price. The **yield to worst** is the lowest of all yields to call and the YTM, a conservative measure because the issuer will call when it is best for the issuer, which is worst for the investor. For bonds with options, a more rigorous measure is the **option-adjusted yield**, which strips out the value of the option using a model.

### Floating-rate notes
An FRN's **quoted margin** is fixed in the contract. Its **discount margin** (required margin) is the spread over the reference rate that the market currently demands. If the discount margin exceeds the quoted margin, the FRN trades at a discount; if it is lower, at a premium.

### Money market yields
Money market instruments (one year or less) use simple interest and often a 360-day year. Some are quoted on a **discount rate** basis, where the rate is a percentage of face value:

$$
PV = FV \times \left(1 - \frac{\text{Days}}{\text{Year}} \times DR\right)
$$

Others are quoted as an **add-on rate**, a percentage of the price paid:

$$
AOR = \frac{\text{Year}}{\text{Days}} \times \frac{FV - PV}{PV}
$$

Here $FV$ is face value, $PV$ is the price, $DR$ is the discount rate, Days is the days to maturity and Year is 360 or 365. The discount rate *understates* the investor's true return because it divides by face rather than the smaller price. The **bond-equivalent yield** is an add-on rate on a 365-day year, which makes money market returns comparable with bond yields.

### Yield spreads
A **yield spread** is the extra yield over a benchmark, reflecting credit risk, liquidity risk and tax differences.
- **G-spread**: spread over an actual or interpolated government bond yield of the same maturity.
- **I-spread**: spread over the swap rate of the same maturity (common for bank and corporate issuers).
- **Z-spread** (zero-volatility spread): the constant spread that, added to *every* government spot rate, makes the discounted cash flows equal the bond's price. It is more precise than the G-spread because it uses the whole spot curve.
- **Option-adjusted spread (OAS)**: Z-spread minus the option value in basis points. For a callable bond, OAS < Z-spread; for a putable bond, OAS > Z-spread.

The benchmark yield captures macro factors (expected inflation, real rates); the spread captures issuer-specific and micro factors.

## Worked example
**Part A - yield to worst.** A 5-year, 6% annual-pay bond trades at 104 (par 100) and is callable in 2 years at 102.

1. Current yield = 6 / 104 = **5.77%**.
2. YTM: solve $104 = \sum_{t=1}^{5} 6/(1+y)^t + 100/(1+y)^5$, giving $y = 5.07\%$.
3. Yield to call: solve $104 = 6/(1+y) + 108/(1+y)^2$, giving $y = 4.83\%$.
4. Yield to worst = min(5.07%, 4.83%) = **4.83%**.

**Part B - money market.** A 90-day bill with face 100 is quoted at a 4.00% discount rate (360-day year).

1. Price: $100 \times (1 - 90/360 \times 0.04) = 99.00$.
2. Add-on rate (360): $(360/90) \times (1.00/99.00) = 4.04\%$.
3. Bond-equivalent yield (365): $(365/90) \times (1.00/99.00) =$ **4.10%**.

**Part C - G-spread.** A 5-year corporate bond yields 5.40%. Government 4-year and 6-year yields are 3.80% and 4.20%. Interpolated 5-year yield = 3.80% + (4.20% − 3.80%) × (5 − 4)/(6 − 4) = 4.00%. G-spread = 5.40% − 4.00% = **140 bp**.

For comparison, a 3-year, 5% annual corporate priced at 98.50 against government spot rates of 3%, 3.5% and 4% has a Z-spread of about 159 bp, found by trial and error.

## Common exam traps
- Comparing yields with different periodicities without converting them first.
- Using par instead of the call price as the final cash flow when computing yield to call.
- Treating the discount rate as the investor's return; it divides by face value and uses 360 days, so it understates the true yield.
- Mixing up G-spread (government benchmark) and I-spread (swap benchmark).
- Saying OAS exceeds Z-spread for a callable bond; the call option costs the investor, so OAS is smaller.

## Key takeaways
- Convert yields with $(1 + APR_m/m)^m = (1 + APR_n/n)^n$; more compounding means a lower stated rate.
- Current yield ignores price changes and timing; use it only as a rough guide.
- Yield to worst is the lowest of the YTM and all yields to call.
- Discount-basis rates use face value; add-on and bond-equivalent yields use price.
- G-, I-, Z-spreads and OAS measure extra yield over different benchmarks; OAS removes the option effect.
