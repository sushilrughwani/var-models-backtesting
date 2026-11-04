---
title: "Interest Rates"
---

## Learning goals
- Convert interest rates between compounding frequencies, including continuous compounding.
- Price a coupon bond from zero rates and compute its yield and the par yield.
- Derive forward rates from zero rates.
- Value a forward rate agreement (FRA) using forward rates and zero rates.
- Describe the main reference rates used in derivatives markets.

## Explanation

### Which rates matter?
Derivatives are priced off a **risk-free** benchmark. Treasury rates are one candidate, though they can be depressed by tax and regulatory demand. Overnight rates such as SOFR (secured, based on repos) and other overnight indexed rates have replaced LIBOR, which was an unsecured interbank rate with a credit premium and was based partly on bank submissions rather than transactions. **Repo** rates apply to collateralised borrowing: one party sells securities and agrees to buy them back slightly higher, so the loan is secured by the securities.

### Compounding frequency
A rate is meaningless until its compounding frequency is stated. USD 100 at 10% grows to 110 with annual compounding but 110.25 with semiannual compounding. If $R_m$ is compounded $m$ times a year and $R_c$ is continuously compounded, equivalent rates satisfy

$$
R_c = m \ln\left(1 + \frac{R_m}{m}\right), \qquad R_m = m\left(e^{R_c/m} - 1\right)
$$

Continuous compounding is the standard for derivatives work because discounting becomes $e^{-RT}$ and forward-rate algebra becomes additive.

### Zero rates and bond pricing
The $T$-year **zero rate** is the rate on an investment with a single payment at $T$. A coupon bond is a bundle of zero-coupon bonds, so its theoretical price discounts each cash flow at its own zero rate:

$$
B = \sum_i c_i e^{-R_i t_i}
$$

where $c_i$ is the cash flow at time $t_i$ and $R_i$ the continuously compounded zero rate for $t_i$. Zero rates are obtained from traded bonds by **bootstrapping**, which a later lesson covers in detail.

The **bond yield** $y$ is the single rate that, applied to all cash flows, reproduces the price. The **par yield** is the coupon rate that makes the bond price equal its face value. For a bond paying $m$ coupons a year with face 100:

$$
c = \frac{(100 - 100d)\,m}{A}
$$

where $d$ is the discount factor for the final maturity and $A$ is the sum of the discount factors for all coupon dates.

### Forward rates
A **forward rate** is the rate implied today for borrowing or lending between two future dates. With continuous zero rates $R_1$ for $T_1$ and $R_2$ for $T_2$:

$$
R_F = \frac{R_2 T_2 - R_1 T_1}{T_2 - T_1}
$$

When the zero curve slopes upward, forward rates exceed zero rates. The formula is exact with continuous compounding and close to exact otherwise.

### Forward rate agreements
An **FRA** fixes the rate $R_K$ on a notional $L$ for the future period $T_1$ to $T_2$. At $T_2$ the party receiving fixed gets $L(R_K - R_M)(T_2 - T_1)$, where $R_M$ is the realised market rate for the period. To value the FRA today, assume the forward rate $R_F$ will be realised and discount:

$$
V_{\text{FRA}} = L\,(R_K - R_F)(T_2 - T_1)\,e^{-R_2 T_2}
$$

where $R_K$ and $R_F$ are expressed with a compounding frequency matching the period length $T_2 - T_1$, and $R_2$ is the continuous zero rate for $T_2$.

### Term structure theories
Expectations theory says forward rates equal expected future spot rates; market segmentation says each maturity has its own supply and demand; liquidity preference says investors demand a premium for longer maturities, so forward rates tend to exceed expected spot rates and curves usually slope upward.

## Worked example
Continuous zero rates: 0.5 years 4.0%, 1.0 year 4.5%, 1.5 years 4.8%, 2.0 years 5.0%.

**Step 1: price a two-year bond, 6% coupon paid semiannually, face 100.** Cash flows are 3, 3, 3 and 103.
- 3 × e^(−0.040 × 0.5) = 2.9406
- 3 × e^(−0.045 × 1.0) = 2.8680
- 3 × e^(−0.048 × 1.5) = 2.7916
- 103 × e^(−0.050 × 2.0) = 93.1983
- Price = **101.7984**

**Step 2: yield.** Solving for $y$ such that discounting all flows at $y$ gives 101.7984 yields $y$ = 4.981% (continuous), or 5.043% with semiannual compounding.

**Step 3: par yield.** $d = e^{-0.10} = 0.904837$; $A$ = 0.980199 + 0.955997 + 0.930531 + 0.904837 = 3.771564. Par yield = (100 − 90.4837) × 2 / 3.771564 = **5.046%** per annum with semiannual compounding.

**Step 4: forward rate for 1.0 to 1.5 years.** $R_F = (0.048 \times 1.5 - 0.045 \times 1.0)/0.5 = 5.40\%$ continuous. With semiannual compounding: 2 × (e^(0.054/2) − 1) = 5.4736%.

**Step 5: value an FRA** in which we receive 6% (semiannual) on USD 10m for the period 1.0 to 1.5 years:

$V = 10{,}000{,}000 \times (0.06 - 0.054736) \times 0.5 \times e^{-0.048 \times 1.5} =$ **USD 24,493**.

## Common exam traps
- Comparing rates with different compounding frequencies without converting them first.
- Using the continuous forward rate directly in the FRA payoff when the FRA rate is semiannual.
- Discounting the FRA payoff to $T_1$ instead of $T_2$ when it is paid at the end of the period.
- Confusing the bond yield (one rate for all flows) with zero rates (one rate per date).
- Forgetting that an upward-sloping zero curve implies forward rates above zero rates.

## Key takeaways
- Always state the compounding frequency; convert with $R_c = m \ln(1 + R_m/m)$.
- Price bonds by discounting each cash flow at its own zero rate.
- Par yield $c = (100 - 100d)m/A$.
- Forward rate $R_F = (R_2T_2 - R_1T_1)/(T_2 - T_1)$ with continuous compounding.
- Value an FRA by assuming the forward rate is realised and discounting from $T_2$.
- SOFR and other overnight rates have replaced LIBOR as derivatives benchmarks.
