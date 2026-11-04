---
title: "Pricing and Valuation of Forward Contracts"
---

## Learning goals
- Distinguish the forward **price** (fixed in the contract) from the forward **value** (which changes over time).
- Explain why a forward's value is zero at initiation.
- Calculate the value of a long or short forward position during its life and at expiration, including assets with income.
- Apply the carry framework to currency forwards and to implied forward interest rates.

## Explanation

### Price versus value
These two words are the heart of this lesson, and they mean different things.

- The **forward price** $F_0$ is the delivery price written into the contract. Once agreed, it never changes.
- The **forward value** $V_t$ is what the contract is worth to one party at time $t$: what you could sell it for, or what you would have to pay to get out of it.

At initiation the forward price is set at its no-arbitrage level from the previous lesson, $F_0 = [S_0 - PV(I) + PV(C)](1+r)^T$. Because the price is chosen so that neither side has an advantage, the contract's **value at initiation is zero**: $V_0 = 0$. Nobody pays anyone to enter it.

### Value during the life of the contract
After initiation the spot price moves, but the delivery price stays at $F_0$. Think of the long position as "I will receive the asset at $T$ and pay $F_0$". Its value today is the value of receiving the asset minus the present value of the fixed payment:

$$
V_t(\text{long}) = S_t - PV_t(I) + PV_t(C) - \frac{F_0}{(1+r)^{T-t}}
$$

where $S_t$ is the spot price at time $t$, $PV_t(I)$ and $PV_t(C)$ are present values at $t$ of income and costs still to come before expiry, and $T - t$ is the remaining time. Equivalently, compare today's new forward price $F_t$ with the old one and discount the difference: $V_t = (F_t - F_0)/(1+r)^{T-t}$.

The short position's value is the exact negative: $V_t(\text{short}) = -V_t(\text{long})$. Forwards are zero-sum.

At expiration the discount factor is 1 and no income remains, so $V_T(\text{long}) = S_T - F_0$, which matches the payoff from the earlier lesson.

### Currency forwards
For a currency quoted as price currency per unit of base currency (for example, USD per EUR), holding the base currency earns the base-currency interest rate, which acts like income. The no-arbitrage forward rate is:

$$
F_0 = S_0 \times \frac{(1 + r_{price})^T}{(1 + r_{base})^T}
$$

where $r_{price}$ and $r_{base}$ are the risk-free rates of the two currencies. The currency with the higher interest rate trades at a forward **discount**; the lower-rate currency trades at a forward **premium**. This relationship is covered rate parity.

### Forward interest rates
A forward rate agreement (FRA) is a forward on an interest rate. Its fair fixed rate is the **implied forward rate** that makes investing for two periods equal to investing for one period and rolling over:

$$
(1 + z_2)^2 = (1 + z_1)(1 + IFR_{1,1})
$$

where $z_1$ and $z_2$ are one- and two-year spot rates and $IFR_{1,1}$ is the one-year rate starting in one year. With $z_1 = 3\%$ and $z_2 = 3.5\%$, the implied forward rate is $1.035^2/1.03 - 1 = 4.00\%$.

## Worked example
An investor enters a one-year long forward on a non-dividend-paying share when the spot price is USD 50 and the annual risk-free rate is 5%. Four months later the share trades at USD 54. Find the forward price and the value of the long and short positions at four months.

**Step 1: Forward price at initiation.** $F_0 = 50 \times 1.05 = 52.50$. Value at initiation is zero.

**Step 2: Remaining time.** $T - t = 1 - 4/12 = 0.6667$ years.

**Step 3: PV of the fixed delivery price.** $52.50 / 1.05^{0.6667} = 52.50 / 1.03306 = 50.8198$.

**Step 4: Long value.** $V_t = 54 - 50.8198 = 3.1802$.

**Step 5: Short value.** $-3.1802$.

**Answer: the forward price is USD 52.50; after four months the long position is worth USD 3.18 and the short position is worth −USD 3.18.**

Check by the alternative route: the new four-month forward price is $54 \times 1.05^{0.6667} = 55.785$; $(55.785 - 52.50)/1.03306 = 3.18$.

## Common exam traps
- Saying the forward price changes over time. The contract price is fixed; the *value* changes.
- Forgetting to discount $F_0$ when valuing a forward before expiry, which gives $S_t - F_0$ instead of $S_t - F_0/(1+r)^{T-t}$.
- Using the original maturity $T$ instead of the remaining time $T - t$ in the discount factor.
- Including income that has already been paid when valuing the contract mid-life. Only remaining income matters.
- Inverting the currency formula: the price currency's rate goes in the numerator.

## Key takeaways
- The forward price is fixed at initiation so that the contract's value is zero to both sides.
- During its life, long value = spot (adjusted for remaining carry) minus the present value of the forward price.
- Short value is the negative of long value; at expiration the value equals the payoff $S_T - F_0$.
- Currency forwards follow covered interest rate parity: the higher-rate currency trades at a forward discount.
- An FRA's fixed rate is the implied forward rate from the spot rate curve.
