---
title: "Properties of Options"
---

## Learning goals
- Explain how the six inputs (stock price, strike, time, volatility, interest rate, dividends) affect call and put values.
- Calculate upper and lower bounds for European calls and puts, with and without dividends.
- Apply put-call parity to price an option and to construct an arbitrage when parity is violated.
- Explain why an American call on a non-dividend-paying stock should never be exercised early, and why an American put might be.

## Explanation

### What moves an option's value
Before any model, pure logic tells us the direction of each effect (stock options, other inputs held fixed):

| Increase in | Call | Put |
|---|---|---|
| Stock price $S_0$ | up | down |
| Strike $K$ | down | up |
| Time to expiry $T$ | up (American) | up (American) |
| Volatility $\sigma$ | up | up |
| Risk-free rate $r$ | up | down |
| Dividends | down | up |

Volatility raises both because the holder enjoys big moves in the favourable direction while losses are capped at the premium. A higher rate lowers the present value of the strike, which helps the call buyer (pays $K$ later) and hurts the put buyer (receives $K$ later). Longer time always helps an American option, since the holder keeps every choice of the shorter option; a European option can occasionally lose value with time, for example if a large dividend falls in the longer window.

### Upper bounds
A call can never be worth more than the stock: $c \le S_0$. A European put can never be worth more than the present value of the strike, the most it can ever pay: $p \le Ke^{-rT}$. (For an American put, $P \le K$.)

### Lower bounds (no dividends)
Compare a call plus cash of $Ke^{-rT}$ with one share. At expiry the first portfolio is worth $\max(S_T, K)$, never less than the share. So
$$
c \ge \max\left(S_0 - Ke^{-rT},\; 0\right)
$$
Similarly, a put plus a share is worth at least $K$ at expiry, giving
$$
p \ge \max\left(Ke^{-rT} - S_0,\; 0\right)
$$
With known dividends of present value $D$, replace $S_0$ by $S_0 - D$.

### Put-call parity
A European call plus cash $Ke^{-rT}$ (a **fiduciary call**) and a European put plus one share (a **protective put**) both pay $\max(S_T, K)$ at expiry. Same payoff, same price:
$$
c + Ke^{-rT} = p + S_0
$$
where $c$ and $p$ have the same strike $K$ and expiry $T$. With dividends, use $S_0 - D$. Parity lets you price one option from the other, and any violation is an arbitrage: buy the cheap side, sell the expensive side, and the payoffs cancel at expiry.

### Early exercise
**American calls, no dividends.** Exercising early pays $S - K$, but the call is worth at least $S - Ke^{-rT}$, which is larger. Exercising also throws away the insurance value of waiting. So it is never optimal; $C = c$. With dividends, exercising just before an ex-dividend date can be optimal.

**American puts.** Early exercise can be optimal when the put is deep in the money: receiving $K$ now and earning interest on it can beat waiting, because the stock cannot fall below zero. So $P > p$ in general. For American options without dividends,
$$
S_0 - K \le C - P \le S_0 - Ke^{-rT}
$$

## Worked example
A non-dividend-paying stock trades at USD 50. European options with strike USD 48 expire in 6 months. The risk-free rate is 6% (continuous). The call trades at USD 4.20.

1. PV of strike: $48e^{-0.06 \times 0.5} = 46.5814$.
2. Call lower bound: $50 - 46.5814 = 3.42$. The call at 4.20 respects it.
3. Put lower bound: $\max(46.5814 - 50, 0) = 0$.
4. Parity put price: $p = c + Ke^{-rT} - S_0 = 4.20 + 46.5814 - 50 = $ **USD 0.78**.

**Arbitrage.** The put is quoted at USD 2.40, so the protective-put side ($p + S_0$) is too expensive. Sell the expensive side and buy the cheap side:
- Write the put: +2.40
- Short-sell the share: +50.00
- Buy the call: −4.20
- Lend $46.5814$ for 6 months: −46.5814
- Net cash today: $2.40 + 50 - 4.20 - 46.5814 = $ **+USD 1.62**

At expiry the loan returns 48. If $S_T > 48$ you exercise the call; if $S_T < 48$ the put is exercised against you. Either way you buy one share for 48 and close the short. The 1.62 is riskless profit.

**With a dividend.** If the stock instead paid USD 1 in 3 months, $D = e^{-0.015} = 0.9851$ and the call lower bound falls to $50 - 0.9851 - 46.5814 = 2.43$.

## Common exam traps
- Using $S_0 - K$ instead of $S_0 - Ke^{-rT}$ for the European call lower bound.
- Forgetting to subtract the present value of dividends from $S_0$ in bounds and parity.
- Saying higher rates raise put values; they lower them.
- Applying put-call parity as an equality to American options. It only gives the bounds above.
- Claiming American calls on dividend-paying stocks are never exercised early; the "never" result needs no dividends.

## Key takeaways
- Volatility and (for American options) time increase both call and put values; rates and dividends push calls and puts in opposite directions.
- Bounds: $\max(S_0 - Ke^{-rT}, 0) \le c \le S_0$ and $\max(Ke^{-rT} - S_0, 0) \le p \le Ke^{-rT}$.
- Put-call parity, $c + Ke^{-rT} = p + S_0$, prices one European option from the other.
- A parity violation is exploited by buying the cheap portfolio and selling the expensive one.
- Never exercise an American call early without dividends; early exercise of a deep in-the-money put can be optimal.
