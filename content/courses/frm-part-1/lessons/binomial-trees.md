---
title: "Binomial Trees"
---

## Learning goals
- Value a European option in a one-step tree by replication and by risk-neutral valuation, and show the two agree.
- Calculate up and down factors and the risk-neutral probability from volatility, the risk-free rate and the step length.
- Value European and American options in a two-step tree, checking for early exercise at every node.
- Adjust the risk-neutral probability for assets paying a continuous yield, currencies and futures.

## Explanation

### The idea: replicate, then price
Over a short period, suppose a stock can only move to one of two prices. An option on that stock then has only two possible values. With two outcomes, we can combine the stock and a risk-free bond to reproduce the option's payoff exactly. By the law of one price from earlier lessons, the option must cost the same as that replicating portfolio. No assumption about investors' risk preferences or the stock's expected return is needed.

### One-step replication
The stock is worth $S_0$ today and moves to $S_0u$ or $S_0d$. The option pays $f_u$ or $f_d$. Hold $\Delta$ shares and invest $B$ in the risk-free asset so that both states match:

$$
\Delta = \frac{f_u - f_d}{S_0 u - S_0 d}, \qquad f_0 = \Delta S_0 + B, \qquad B = e^{-rT}\,(f_u - \Delta S_0 u)
$$

$\Delta$ (the option's **delta**) is the hedge ratio: the number of shares needed per option. $B$ is negative for a call, meaning we borrow.

### Risk-neutral valuation
Rearranging the replication result gives a shortcut. Define the **risk-neutral probability**

$$
p = \frac{e^{r\Delta t} - d}{u - d}
$$

then the option value is its expected payoff under $p$, discounted at the risk-free rate:

$$
f = e^{-r\Delta t}\,\left[p f_u + (1-p) f_d\right]
$$

where $\Delta t$ is the length of one step and $r$ is the continuously compounded risk-free rate. $p$ is not a forecast of the real probability; it is the probability that makes the stock earn the risk-free rate, which is exactly what makes the replication argument work.

### Matching volatility
To link the tree to a real asset with volatility $\sigma$, the standard (Cox-Ross-Rubinstein) choice is

$$
u = e^{\sigma\sqrt{\Delta t}}, \qquad d = \frac{1}{u}
$$

As the number of steps grows, the tree's terminal distribution approaches a lognormal one and its prices converge to the Black-Scholes-Merton values covered in the next lesson.

### Multi-step trees and American options
Build the stock tree forward, compute payoffs at the final nodes, then roll back one step at a time with the risk-neutral formula. For an **American** option, at every node compare the rolled-back (continuation) value with the immediate exercise value and keep the larger. Early exercise is never optimal for an American call on a non-dividend-paying stock, but it can be optimal for an American put when the stock has fallen far, because receiving the strike early earns interest.

### Other underlyings
Only the growth rate inside $p$ changes:

- Continuous dividend yield $q$: $p = (e^{(r-q)\Delta t} - d)/(u - d)$.
- Currency with foreign rate $r_f$: replace $q$ with $r_f$.
- Futures contract (costs nothing to enter): $p = (1 - d)/(u - d)$.

## Worked example
**Part A - one step.** $S_0 = 40$, $u = 1.2$, $d = 0.8$, 6-month call with $K = 40$, $r = 4\%$. Payoffs: $f_u = 48 - 40 = 8$, $f_d = 0$.

$$
\Delta = \frac{8 - 0}{48 - 32} = 0.5, \qquad B = e^{-0.02}(8 - 0.5 \times 48) = -15.6832
$$

$$
f_0 = 0.5 \times 40 - 15.6832 = 4.3168
$$

Check: $p = (e^{0.02} - 0.8)/0.4 = 0.5505$ and $e^{-0.02}(0.5505 \times 8) = 4.3168$. Both methods give **4.3168**.

**Part B - two steps, American put.** $S_0 = 50$, $K = 52$, $r = 5\%$, $\sigma = 30\%$, $T = 1$ year, two steps ($\Delta t = 0.5$).

1. $u = e^{0.3\sqrt{0.5}} = 1.236311$, $d = 0.808858$, $p = (e^{0.025} - 0.808858)/(1.236311 - 0.808858) = 0.506388$, discount factor per step $e^{-0.025} = 0.975310$.
2. Stock tree: $S_u = 61.8156$, $S_d = 40.4429$; final nodes $76.4233$, $50.0000$, $32.7126$.
3. Final put payoffs: $0$, $2.0000$, $19.2874$.
4. Up node: $0.975310 \times (0.506388 \times 0 + 0.493612 \times 2) = 0.9628$; exercise value 0, keep 0.9628.
5. Down node: continuation $0.975310 \times (0.506388 \times 2 + 0.493612 \times 19.2874) = 10.2732$; exercise value $52 - 40.4429 = 11.5571$. Exercise, keep **11.5571**.
6. Today: $0.975310 \times (0.506388 \times 0.9628 + 0.493612 \times 11.5571) = 6.0394$, above the exercise value of 2.

The American put is worth **6.0394**. The European put (no early exercise at step 5) is worth 5.4213, so the early exercise right is worth about 0.62.

## Common exam traps
- Using the real-world probability or expected return instead of the risk-neutral $p$.
- Discounting at the wrong rate or forgetting to discount at every step.
- Checking early exercise only at the final nodes; it must be checked at every interior node.
- Using $e^{r\Delta t}$ in $p$ for a futures option, where the numerator is simply $1 - d$.
- Using the annual rate and volatility without scaling by the step length $\Delta t$.

## Key takeaways
- A two-outcome world lets a stock-plus-bond portfolio replicate any option exactly.
- Delta = change in option value / change in stock price across the two states.
- Risk-neutral valuation: discount the $p$-weighted expected payoff at the risk-free rate.
- $u = e^{\sigma\sqrt{\Delta t}}$, $d = 1/u$, $p = (e^{r\Delta t} - d)/(u - d)$.
- American options: take the larger of continuation and exercise value at every node.
- Dividend yield, foreign rate or futures change only the growth term in $p$.
