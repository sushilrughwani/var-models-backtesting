---
title: "Pricing and Valuation of Options"
---

## Learning goals
- Classify options as in, at or out of the money and calculate exercise (intrinsic) value and time value.
- Calculate the lower and upper no-arbitrage bounds for European calls and puts.
- Explain how the underlying price, exercise price, time to expiry, risk-free rate, volatility, income and carry costs affect option values.
- Compare American and European options and explain when early exercise is never optimal.

## Explanation

### Exercise value and time value
Unlike forwards, options have positive value at initiation, because the holder has a right with no obligation. An option's price splits into two parts:

$$
\text{Option value} = \text{Exercise value} + \text{Time value}
$$

The **exercise value** (often called intrinsic value) is what you would receive by exercising immediately: $\max(0, S - X)$ for a call and $\max(0, X - S)$ for a put, where $S$ is the current underlying price and $X$ the exercise price. **Time value** is the extra amount investors pay for the chance that the option becomes more valuable before expiry. It shrinks to zero at expiration, a process called **time decay**.

**Moneyness** describes the exercise value. A call is **in the money** when $S > X$, **at the money** when $S = X$ and **out of the money** when $S < X$. A put is the reverse: in the money when $S < X$.

### No-arbitrage bounds for European options
Using the replication logic from the earlier lessons, a European call must be worth at least the value of a long forward-style position "receive the stock, pay $X$ later":

$$
\max\left(0,\ S_0 - \frac{X}{(1+r)^T}\right) \le c_0 \le S_0
$$

$$
\max\left(0,\ \frac{X}{(1+r)^T} - S_0\right) \le p_0 \le \frac{X}{(1+r)^T}
$$

where $c_0$ and $p_0$ are European call and put prices, $r$ is the risk-free rate and $T$ the time to expiry. The upper bounds are intuitive: a call can never be worth more than the stock it lets you buy, and a European put can never be worth more than the present value of the most it can pay, $X$.

Notice the lower bounds discount $X$. For a call, paying $X$ later instead of today is a benefit, so the call's floor is higher than plain exercise value.

### What moves option prices
| Increase in | Call value | Put value | Why |
|---|---|---|---|
| Underlying price $S$ | Up | Down | Call pays when $S$ is high |
| Exercise price $X$ | Down | Up | Put pays when $X$ is high |
| Time to expiry $T$ | Up | Usually up | More time for favourable moves |
| Risk-free rate $r$ | Up | Down | Lowers PV of $X$ |
| Volatility $\sigma$ | Up | Up | Bigger upside, downside capped |
| Income (dividends) | Down | Up | Income lowers the forward price |
| Carry costs | Up | Down | Costs raise the forward price |

Volatility is the most important driver of time value. Because the option holder's loss is capped at the premium, wider swings add to the upside without adding to the downside, so **both** calls and puts gain value when volatility rises.

The put's response to time is "usually up" because a deep in-the-money European put can lose value with longer maturity: the holder must wait longer to receive $X$, and its present value falls.

### American versus European
An American option can be exercised at any time, so it is worth at least as much as an otherwise identical European option: $C_0 \ge c_0$ and $P_0 \ge p_0$. For a call on a **non-dividend-paying** stock, early exercise is never optimal: the call's lower bound $S_0 - X/(1+r)^T$ already exceeds the exercise value $S_0 - X$, so selling the option beats exercising it. American and European calls on such stocks therefore have the same value. Early exercise of a call can make sense just before a large dividend, and early exercise of a deep in-the-money American put can make sense because receiving $X$ sooner earns interest.

## Worked example
A share trades at USD 52. A six-month European call with an exercise price of USD 50 is priced at USD 4.80, and the risk-free rate is 4% (annual compounding). Find the moneyness, exercise value, time value and the no-arbitrage bounds.

**Step 1: Moneyness.** $S = 52 > X = 50$, so the call is in the money.

**Step 2: Exercise value.** $\max(0, 52 - 50) = 2.00$.

**Step 3: Time value.** $4.80 - 2.00 = 2.80$.

**Step 4: PV of the exercise price.** $50 / 1.04^{0.5} = 50 / 1.019804 = 49.0290$.

**Step 5: Lower bound.** $\max(0, 52 - 49.0290) = 2.9710$.

**Step 6: Upper bound.** $S_0 = 52$.

**Answer: the call is in the money with exercise value USD 2.00 and time value USD 2.80; its no-arbitrage range is USD 2.97 to USD 52.00, and USD 4.80 lies within it.** If the call traded below 2.97, buying the call and shorting the share while lending the PV of $X$ would be an arbitrage.

## Common exam traps
- Using undiscounted $X$ in the European lower bounds. The bound is $S_0 - X/(1+r)^T$ for a call.
- Thinking higher volatility helps calls but hurts puts. It raises the value of both.
- Saying a higher risk-free rate raises put values. It lowers them by reducing the PV of $X$.
- Exercising an American call on a non-dividend stock early. Selling it is always better.
- Confusing put moneyness: a put is in the money when $S < X$.

## Key takeaways
- Option value = exercise value + time value; time value decays to zero at expiry.
- European call bounds: $\max(0, S_0 - X/(1+r)^T)$ to $S_0$; put bounds: $\max(0, X/(1+r)^T - S_0)$ to $X/(1+r)^T$.
- Volatility and time raise both call and put values; the rate, $S$, $X$, income and costs push calls and puts in opposite directions.
- American options are worth at least as much as European ones.
- An American call on a non-dividend-paying stock should never be exercised early.
