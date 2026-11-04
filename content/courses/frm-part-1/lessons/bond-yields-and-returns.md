---
title: "Returns, Spreads and Yields"
---

## Learning goals
- Calculate the realized gross and net return on a bond over a holding period, including coupon reinvestment.
- Explain spreads as the constant added to benchmark rates that reprices a bond to its market price.
- Calculate and interpret yield to maturity and its assumptions.
- Decompose bond P&L into carry roll-down, rate changes and spread changes under different expected-path scenarios.

## Explanation

### Realized return: what you actually earned
Yields are promises; returns are outcomes. The **realized gross return** over one period is

$$
R = \frac{P_1 + C - P_0}{P_0}
$$

where $P_0$ is the full purchase price, $P_1$ the full price at the end, and $C$ the coupon received. Over several periods, coupons received early are reinvested, and the multi-period return is the product of the single-period gross returns: $(1+R_1)(1+R_2)\cdots - 1$. The **net return** subtracts financing costs (for example repo interest on a leveraged position) and any fees. A bond bought with borrowed money earns the bond's return minus the funding rate on the borrowed amount.

### Spreads: pricing relative to a benchmark
A corporate bond pays more than a Treasury because of credit and liquidity risk. A clean way to measure that extra compensation is the **spread** $s$: the constant added to every benchmark spot (or forward) rate so that discounted cash flows equal the market price:

$$
P = \sum_{i=1}^{n} \frac{CF_i}{\left(1 + r(t_i) + s\right)^{t_i}}
$$

where $r(t_i)$ is the benchmark spot rate for each date. A bond that is cheap relative to the benchmark curve has a positive spread. Because the spread is applied to the whole curve, it is more precise than simply subtracting one benchmark yield from the bond's yield.

### Yield to maturity
The **yield to maturity** $y$ is the single rate that discounts all cash flows to the market price:

$$
P = \sum_{i=1}^{n} \frac{CF_i}{(1+y)^{t_i}}
$$

YTM is a convenient summary, but the investor realizes it only if the bond is held to maturity, every payment is made, and every coupon is reinvested at $y$ itself. If rates fall, reinvestment income falls short (reinvestment risk). Two bonds with the same maturity but different coupons can have different yields on the same spot curve; this is the **coupon effect**, because each yield is a different weighted average of the same spot rates.

### Carry roll-down and P&L decomposition
Risk managers split a bond's return over a period into pieces:

$$
\text{P\&L} = \text{carry roll-down} + \text{rate changes} + \text{spread changes}
$$

**Carry roll-down** is the return earned if rates follow an assumed expected path. The choice of path matters:

- **Realized forwards**: the future spot curve turns out to equal today's forward curve. Then every bond earns the same one-period return, equal to the current one-period spot rate.
- **Unchanged term structure**: the spot curve stays exactly where it is. As the bond ages, its cash flows are discounted at shorter, lower rates (on an upward-sloping curve), so its price "rolls down" the curve and its return exceeds the short rate.
- **Unchanged yields**: the bond's own YTM stays fixed, and the one-period return equals the YTM.

Rate and spread changes then capture everything that differs from the assumed path.

## Worked example
A 3-year bond pays a 6% annual coupon on 100 face. Spot rates (annual compounding) are 3%, 4% and 5% for 1, 2 and 3 years.

**Step 1 - price and YTM.**

$$
P_0 = \frac{6}{1.03} + \frac{6}{1.04^2} + \frac{106}{1.05^3} = 5.8252 + 5.5473 + 91.5668 = 102.9394
$$

Solving for the single rate that gives 102.9394: $y = 4.9222\%$, a blend weighted toward the 3-year rate.

**Step 2 - forward rates.** $f_{1,2} = 1.04^2/1.03 - 1 = 5.0097\%$ and $f_{2,3} = 1.05^3/1.04^2 - 1 = 7.0289\%$.

**Step 3 - return if forwards are realized.** In one year the bond has two years left, and the new 1- and 2-year rates come from today's forwards:

$$
P_1 = \frac{6}{1.050097} + \frac{106}{1.050097 \times 1.070289} = 5.7138 + 94.3138 = 100.0275
$$

$$
R = \frac{100.0275 + 6 - 102.9394}{102.9394} = 3.00\%
$$

exactly the 1-year spot rate, as theory predicts.

**Step 4 - return if the term structure is unchanged.** The spot curve stays at 3% and 4%:

$$
P_1 = \frac{6}{1.03} + \frac{106}{1.04^2} = 5.8252 + 98.0030 = 103.8282
$$

$$
R = \frac{103.8282 + 6 - 102.9394}{102.9394} = 6.69\%
$$

**Step 5 - interpret.** The extra $103.8282 - 100.0275 = 3.80$ of price is roll-down: the bond's cash flows slid to shorter maturities with lower rates. Under unchanged yields the return would be the YTM of 4.92%. The expected return is **3.00%, 4.92% or 6.69%** depending on the assumed path, which is why a carry roll-down figure is meaningless without its scenario.

## Common exam traps
- Leaving the coupon out of the realized return, or dividing by the ending price instead of the starting price.
- Assuming YTM equals realized return even when reinvestment rates or exit prices differ.
- Measuring a spread against a single benchmark yield when the question defines it relative to the spot curve.
- Thinking roll-down is free money: if forwards are realized, every bond earns only the short rate.
- Forgetting to subtract financing costs when asked for the net return on a leveraged position.

## Key takeaways
- Realized return = (ending price + coupon − starting price) / starting price.
- A spread is the constant added to benchmark rates that reprices a bond to its market price.
- YTM is realized only if held to maturity with coupons reinvested at the YTM.
- If forwards are realized, all bonds earn the one-period spot rate.
- Unchanged term structure on an upward-sloping curve produces roll-down gains.
- Bond P&L = carry roll-down + rate changes + spread changes.
