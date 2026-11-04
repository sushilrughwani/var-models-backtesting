---
title: "The Term Structure of Interest Rates"
---

## Learning goals
- Define the spot curve, par curve and forward curve and explain how each is constructed.
- Calculate implied forward rates from spot rates, and spot rates from forward rates.
- Derive par rates from spot rates and show that a bond is priced identically with spot or forward rates.
- Explain the shapes of the yield curve and how forward rates relate to spot rates.
- Compare the expectations, liquidity preference, segmented markets and preferred habitat theories.

## Explanation

### Three ways to describe the same market
The term structure is the relationship between interest rates and maturity for bonds of the same credit quality, usually government bonds. In the previous lessons we priced bonds with spot rates and quoted yields. The term structure can be drawn in three linked ways:

- **Spot curve** (zero curve): the yield on a zero-coupon bond for each maturity. It is the purest curve because each rate applies to a single cash flow.
- **Par curve**: the coupon rate at which a bond of each maturity would trade at exactly par. Newly issued government bonds are close to par, so this curve is often what is observed first; spot rates are then **bootstrapped** from it.
- **Forward curve**: rates agreed today for borrowing or lending over a future period.

A yield-to-maturity curve built from coupon bonds is less precise because each YTM is a blend of several spot rates (the coupon effect).

### Forward rates
Notation: $f_{A,B-A}$ (or "$A$y$B-A$y") is the rate for a loan starting in $A$ years and lasting $B - A$ years. No arbitrage requires that investing for $B$ years at the spot rate earns the same as investing for $A$ years and then rolling into the forward:

$$
(1 + z_B)^B = (1 + z_A)^A \times (1 + f_{A,B-A})^{B-A}
$$

where $z_A$ and $z_B$ are the spot rates for $A$ and $B$ years. Solve for the forward:

$$
f_{A,B-A} = \left[\frac{(1+z_B)^B}{(1+z_A)^A}\right]^{1/(B-A)} - 1
$$

Equivalently, a spot rate is the geometric mean of the one-period forward rates: $(1+z_3)^3 = (1+z_1)(1+f_{1,1})(1+f_{2,1})$. A quick approximation is $f \approx (B z_B - A z_A)/(B - A)$.

**Key relationship:** when the spot curve is upward sloping, forward rates lie *above* spot rates; when it is downward sloping, forwards lie *below*. Think of the spot rate as an average and the forward as the marginal rate that pulls the average up or down.

### Par rates from spot rates
A par bond's price equals 100, so for an $N$-year par rate $p_N$ with discount factors $DF_t = (1+z_t)^{-t}$:

$$
p_N = \frac{1 - DF_N}{DF_1 + DF_2 + \cdots + DF_N}
$$

Par rates sit slightly below spot rates on an upward-sloping curve, because the early coupons are discounted at lower rates.

### Shapes of the yield curve
- **Upward sloping (normal)**: long rates above short rates.
- **Flat**: similar rates across maturities.
- **Inverted**: short rates above long rates, often seen before recessions when markets expect central banks to cut.
- **Humped**: medium-term rates highest.

### Theories of the term structure
- **Unbiased (pure) expectations theory**: forward rates equal expected future spot rates. Investors are risk neutral, so all maturities offer the same expected return over any horizon. An upward slope means rates are expected to rise.
- **Local expectations theory**: a narrower version saying that over a *short* holding period, all bonds earn the risk-free rate; it allows risk premiums for longer horizons.
- **Liquidity preference theory**: investors demand a **liquidity premium** for holding longer bonds, so forward rates are biased estimates (expected future spot rate plus a premium). The curve can slope upward even if rates are expected to stay flat.
- **Segmented markets theory**: lenders and borrowers stick to their own maturity segments (banks short, pension funds long), so each segment's rate is set by its own supply and demand.
- **Preferred habitat theory**: investors favour particular maturities but will move to others if offered enough extra yield, blending segmentation with expectations.

## Worked example
Government spot rates (annual compounding): 1-year 3.0%, 2-year 3.5%, 3-year 4.0%.

**Step 1 - 1y1y forward.**

$$
f_{1,1} = \frac{1.035^2}{1.03} - 1 = 4.00\%
$$

**Step 2 - 2y1y forward.**

$$
f_{2,1} = \frac{1.04^3}{1.035^2} - 1 = 5.01\%
$$

**Step 3 - 1y2y forward.**

$$
f_{1,2} = \left(\frac{1.04^3}{1.03}\right)^{1/2} - 1 = 4.50\%
$$

Forwards exceed spots, as expected for an upward-sloping curve.

**Step 4 - par rates.** Discount factors: $DF_1 = 0.970874$, $DF_2 = 0.933511$, $DF_3 = 0.888996$. The 2-year par rate is $(1 - 0.933511)/(0.970874 + 0.933511) = 3.49\%$, and the 3-year par rate is $(1 - 0.888996)/(0.970874 + 0.933511 + 0.888996) =$ **3.97%**, just below the 4.0% spot rate.

**Step 5 - consistency check.** A 3-year 5% annual bond priced with spot rates: $5/1.03 + 5/1.035^2 + 105/1.04^3 = 102.87$. Priced with the forwards: $5/1.03 + 5/(1.03 \times 1.04) + 105/(1.03 \times 1.04 \times 1.0501) = 102.87$. Same answer, as no arbitrage requires.

## Common exam traps
- Taking the arithmetic difference of spot rates as the forward rate instead of compounding (the approximation is close but not exact).
- Forgetting to annualise a multi-year forward by taking the $1/(B-A)$ root.
- Assuming par rates equal spot rates; they are equal only when the curve is flat.
- Claiming liquidity preference theory implies rates are expected to rise whenever the curve slopes up; the slope may be entirely a liquidity premium.
- Confusing segmented markets (no switching between maturities) with preferred habitat (switching if paid enough).

## Key takeaways
- Spot, par and forward curves are three views of the same no-arbitrage structure.
- Forward: $(1+z_B)^B = (1+z_A)^A(1+f_{A,B-A})^{B-A}$.
- Upward-sloping spot curve means forwards above spots and par rates slightly below spots.
- A bond has the same price whether discounted with spot rates or with chained forwards.
- Expectations theories treat forwards as forecasts; liquidity preference adds a term premium; segmentation and preferred habitat emphasise supply and demand by maturity.
