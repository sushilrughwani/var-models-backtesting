---
title: "Interest Rates: Spot, Forward and Par"
---

## Learning goals
- Bootstrap discount factors and spot rates from the prices of coupon bonds.
- Calculate forward rates from spot rates or discount factors and interpret them as break-even future rates.
- Calculate par rates and explain why a par bond's coupon equals its yield.
- Explain how spot, forward and par curves are ordered when the term structure slopes up or down.

## Explanation

### Three views of the same curve
The previous lesson showed that discount factors price every fixed cash flow. Traders rarely quote discount factors, though. They quote rates, and there are three common ways to express the same information:

- **Spot (zero) rates**: the yield on a single payment at one date.
- **Forward rates**: the rate locked in today for borrowing or lending over a future period.
- **Par rates**: the coupon that makes a bond price exactly at face value.

If you know any one of these curves completely, you can derive the other two. On the exam, the discount factor is the safest bridge between them.

### Spot rates and bootstrapping
With semiannual compounding, the spot rate $r(t)$ for maturity $t$ (in years) satisfies

$$
d(t) = \frac{1}{\left(1 + \frac{r(t)}{2}\right)^{2t}}
$$

where $d(t)$ is the discount factor. **Bootstrapping** recovers discount factors one maturity at a time from coupon bonds: value the earlier cash flows with the factors already found, subtract that value from the bond price, and divide what remains by the final cash flow. Then convert each factor into a spot rate:

$$
r(t) = 2\left[d(t)^{-1/(2t)} - 1\right]
$$

### Forward rates
A forward rate is the rate implied today for a period that starts in the future. The 6-month forward rate $f(t)$ covering the period from $t - 0.5$ to $t$ satisfies

$$
1 + \frac{f(t)}{2} = \frac{d(t - 0.5)}{d(t)}
$$

The intuition is a no-arbitrage argument. Investing for $t$ years at the spot rate must give the same result as investing to $t - 0.5$ and then rolling over at the forward rate; otherwise one route dominates the other. Equivalently, the spot rate is a kind of average of the forwards up to that maturity:

$$
\left(1 + \frac{r(t)}{2}\right)^{2t} = \prod_{k=1}^{2t}\left(1 + \frac{f(k/2)}{2}\right)
$$

Because the spot rate averages the forwards, when spot rates rise with maturity the newest forward must be above the spot rate to pull the average up.

### Par rates
A **par rate** $C(T)$ is the annual coupon (paid semiannually) that makes a $T$-year bond worth exactly 1 per unit of face:

$$
\frac{C(T)}{2}\sum_{i=1}^{2T} d\left(\tfrac{i}{2}\right) + d(T) = 1
\quad\Rightarrow\quad
C(T) = \frac{2\,[1 - d(T)]}{\sum_{i=1}^{2T} d\left(\tfrac{i}{2}\right)}
$$

The sum of discount factors is the value of an annuity paying 1 every period (sometimes called the annuity factor). Swap rates are par rates of this kind, which is why this formula reappears when we value swaps.

### How the curves line up
For an **upward-sloping** term structure: forward > spot > par. Par rates sit below spot rates because a coupon bond pays part of its value early, at the lower short-maturity rates, so its single yield is an average weighted toward earlier, lower rates. For a downward-sloping curve the order reverses: forward < spot < par. For a flat curve all three are equal.

## Worked example
Three Treasuries (face 100, semiannual coupons) trade as follows: 0.5-year 2.0% at 99.60; 1-year 3.0% at 99.80; 1.5-year 3.5% at 99.90.

**Step 1 - bootstrap discount factors.**

$$
d(0.5) = \frac{99.60}{101} = 0.986139
$$

$$
d(1) = \frac{99.80 - 1.5 \times 0.986139}{101.5} = \frac{98.320792}{101.5} = 0.968678
$$

$$
d(1.5) = \frac{99.90 - 1.75 \times (0.986139 + 0.968678)}{101.75} = \frac{96.479071}{101.75} = 0.948197
$$

**Step 2 - spot rates.** $r(0.5) = 2(1/0.986139 - 1) = 2.8112\%$; $r(1) = 2(0.968678^{-1/2} - 1) = 3.2078\%$; $r(1.5) = 2(0.948197^{-1/3} - 1) = 3.5778\%$.

**Step 3 - forward rates.** $f(0.5) = 2.8112\%$; $f(1) = 2(0.986139/0.968678 - 1) = 3.6051\%$; $f(1.5) = 2(0.968678/0.948197 - 1) = 4.3199\%$.

**Step 4 - 1.5-year par rate.** The annuity factor is $0.986139 + 0.968678 + 0.948197 = 2.903014$, so

$$
C(1.5) = \frac{2 \times (1 - 0.948197)}{2.903014} = \frac{0.103605}{2.903014} = 3.5689\%
$$

The 1.5-year rates line up as expected for a rising curve: forward 4.3199% > spot 3.5778% > **par 3.5689%**.

## Common exam traps
- Forgetting to subtract the value of earlier coupons when bootstrapping, which treats a coupon bond as a zero.
- Averaging spot rates arithmetically to get a forward; forwards come from ratios of compound growth factors.
- Mixing compounding conventions: semiannual rates need the factor $(1 + r/2)^{2t}$, not $(1 + r)^t$.
- Calling the par rate the spot rate; they are equal only for the first period or a flat curve.
- Reversing the ordering: when the curve slopes up, par is lowest and forward is highest.

## Key takeaways
- Spot, forward and par curves are three views of the same discount factors.
- Bootstrapping solves for one discount factor at a time, shortest maturity first.
- Forward rates are break-even future rates implied by no arbitrage: $1 + f/2 = d(t-0.5)/d(t)$.
- Par rate = $2[1 - d(T)]$ divided by the sum of discount factors.
- Upward-sloping curve: forward > spot > par; downward-sloping: the order flips.
