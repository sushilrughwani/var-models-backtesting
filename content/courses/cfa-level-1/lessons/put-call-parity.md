---
title: "Option Replication Using Put-Call Parity"
---

## Learning goals
- Derive put-call parity for European options from two portfolios with identical payoffs.
- Use put-call parity to calculate the price of a call or put and to build synthetic positions.
- Identify and exploit a parity violation with an arbitrage trade.
- Apply put-call-forward parity, replacing the underlying with a forward contract.

## Explanation

### Two portfolios, one payoff
Put-call parity is the law of one price applied to options. Consider two portfolios built today, using European options with the same underlying, exercise price $X$ and expiry $T$:

- **Fiduciary call:** buy a call and buy a risk-free zero-coupon bond paying $X$ at $T$.
- **Protective put:** buy the underlying and buy a put.

At expiration, if $S_T \ge X$: the fiduciary call is worth $(S_T - X) + X = S_T$; the protective put is worth $S_T + 0 = S_T$. If $S_T < X$: the fiduciary call is worth $0 + X = X$; the protective put is worth $S_T + (X - S_T) = X$. Both portfolios pay $\max(S_T, X)$ in every state, so they must cost the same today:

$$
c_0 + \frac{X}{(1+r)^T} = S_0 + p_0
$$

where $c_0$ and $p_0$ are European call and put prices, $S_0$ is the underlying price, $r$ is the annual risk-free rate and $T$ is time to expiry in years. The relationship holds for European options on a non-dividend-paying asset; with income, replace $S_0$ by $S_0 - PV(I)$.

### Synthetic positions
Rearranging the equation lets you create any one instrument from the other three. Plus means buy, minus means sell:

$$
\begin{aligned}
c_0 &= S_0 + p_0 - \frac{X}{(1+r)^T} &&\text{(synthetic call)}\\
p_0 &= c_0 - S_0 + \frac{X}{(1+r)^T} &&\text{(synthetic put)}\\
S_0 &= c_0 - p_0 + \frac{X}{(1+r)^T} &&\text{(synthetic stock)}
\end{aligned}
$$

So a synthetic put is: buy a call, short the underlying, lend the PV of $X$. A synthetic underlying is: buy a call, write a put, lend the PV of $X$. These are used when the real instrument is hard to trade, or to exploit mispricing.

### Arbitrage when parity fails
If the market price of a put exceeds the parity value, the put is expensive relative to the call-stock-bond combination. Sell the expensive side (write the put) and buy the cheap side (the synthetic put: long call, short stock, long bond). The positions offset at expiry in every state, so the difference in price today is riskless profit. The rule is always: **sell what is overpriced, buy its replica**.

### Put-call-forward parity
A long forward plus a bond paying $F_0$ at $T$ replicates the underlying (from the forward lessons, $S_0 = F_0/(1+r)^T$ for a non-income asset). Substituting into put-call parity:

$$
\frac{F_0}{(1+r)^T} + p_0 = c_0 + \frac{X}{(1+r)^T}
$$

where $F_0$ is the forward price for delivery at $T$. Rearranged, $c_0 - p_0 = (F_0 - X)/(1+r)^T$: the difference between call and put prices equals the present value of how far the forward price is above the strike. When $X = F_0$, calls and puts cost the same.

### Why it matters beyond the formula
Parity shows that a long call plus a short put with the same strike behaves exactly like a long forward. That link between options and forward commitments is the bridge to the binomial model in the next lesson.

## Worked example
A non-dividend-paying share trades at USD 40. A one-year European call with an exercise price of USD 40 costs USD 4.50, and the risk-free rate is 5% (annual compounding). (a) Find the parity value of the put. (b) The market put trades at USD 3.20. Describe the arbitrage and the profit.

**Step 1: PV of the exercise price.** $40 / 1.05 = 38.0952$.

**Step 2: Parity put value.** $p_0 = c_0 - S_0 + PV(X) = 4.50 - 40 + 38.0952 = 2.5952$.

**Step 3: Compare.** The market put at 3.20 is above 2.5952, so the put is overpriced.

**Step 4: Trade today.** Write the put: +3.20. Buy the call: −4.50. Short the share: +40.00. Lend the PV of $X$: −38.0952. Net cash today $= 3.20 - 4.50 + 40 - 38.0952 = 0.6048$.

**Step 5: Check expiry.** If $S_T = 50$: call pays 10, put expires, buy back share at −50, bond pays 40: net 0. If $S_T = 30$: call expires, put assigned (pay 40, receive share worth 30, use it to close the short), bond pays 40: net 0.

**Answer: the parity put value is USD 2.60, and writing the market put while buying the synthetic put locks in about USD 0.60 per share today with no risk.**

## Common exam traps
- Forgetting to discount $X$; the bond in the fiduciary call is worth $X/(1+r)^T$ today.
- Applying put-call parity to American options. It holds exactly only for European options.
- Mixing up signs in synthetic positions: a synthetic put requires **shorting** the underlying.
- Buying the overpriced instrument in an arbitrage. Sell the expensive side, buy its replica.
- Using $S_0$ instead of $F_0/(1+r)^T$ in put-call-forward parity.

## Key takeaways
- Fiduciary call (call + bond) and protective put (stock + put) both pay $\max(S_T, X)$, so $c_0 + X/(1+r)^T = S_0 + p_0$.
- Any one of call, put, underlying and bond can be synthesised from the other three.
- A parity violation is exploited by selling the overpriced side and buying its replica.
- Put-call-forward parity: $F_0/(1+r)^T + p_0 = c_0 + X/(1+r)^T$.
- Long call plus short put with the same strike equals a long forward at that strike.
