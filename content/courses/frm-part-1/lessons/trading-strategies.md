---
title: "Trading Strategies"
---

## Learning goals
- Describe the payoff and profit of covered calls and protective puts, and link them to put-call parity.
- Construct bull, bear, butterfly and box spreads and calculate their maximum profit, maximum loss and breakeven points.
- Construct straddles, strangles, strips and straps and explain the view on volatility each expresses.
- Choose an appropriate strategy for a given view on direction and volatility.

## Explanation

### Thinking in payoff diagrams
Every strategy in this lesson is a combination of the building blocks from the options markets lesson: long or short calls, puts and the stock. Two rules make the analysis mechanical:
- **Payoff** at expiry is the sum of the individual payoffs; **profit** is payoff minus the net premium paid (or plus net premium received).
- The diagram is a set of straight lines that change slope only at the strikes. Evaluate the payoff below, between and above the strikes and you have the whole picture.

### A single option plus the stock
- **Covered call**: long stock + short call. You give up upside above $K$ in exchange for the premium. By put-call parity ($S_0 - c = Ke^{-rT} - p$), it has the same profile as a **short put** plus cash.
- **Protective put**: long stock + long put. Downside is floored at $K$; it behaves like a **long call** plus cash. It is portfolio insurance.

### Spreads: two or more options of the same type
- **Bull call spread**: buy a call with strike $K_1$, sell a call with higher strike $K_2$. Net debit. Profits if the price rises, but the gain is capped.
$$
\text{Max profit} = (K_2 - K_1) - \text{net debit}, \quad \text{Max loss} = \text{net debit}, \quad \text{Breakeven} = K_1 + \text{net debit}
$$
A bull spread can also be built with puts (buy low-strike put, sell high-strike put) for a net credit.
- **Bear put spread**: buy a put with strike $K_2$, sell a put with lower strike $K_1$. Profits if the price falls, with the same capped structure: max profit $= (K_2 - K_1) - $ net debit.
- **Butterfly spread**: buy one call at $K_1$, sell two calls at $K_2$, buy one call at $K_3$ (equally spaced). Cheap, with maximum payoff $K_2 - K_1$ when $S_T = K_2$. A bet that the price stays near $K_2$, that is, low volatility.
- **Box spread**: a bull call spread plus a bear put spread with the same strikes. The payoff is always $K_2 - K_1$, so its value must be $(K_2 - K_1)e^{-rT}$ for European options.
- **Calendar spread**: sell a short-dated option, buy a longer-dated option at the same strike. Profits if the price stays near the strike as the short option decays faster.

### Combinations: calls and puts together
- **Long straddle**: buy a call and a put with the same strike and expiry. Profits from a large move in either direction. Breakevens: $K \pm$ total premium.
- **Long strangle**: buy an out-of-the-money put ($K_1$) and an out-of-the-money call ($K_2 > K_1$). Cheaper than a straddle, but needs a bigger move. Breakevens: $K_1 -$ premium and $K_2 +$ premium.
- **Strip**: one call plus two puts (volatility view tilted bearish). **Strap**: two calls plus one put (tilted bullish).
- Selling a straddle or strangle is a bet on low volatility with potentially unlimited loss.

| View | Strategy |
|---|---|
| Moderately bullish, cheaply | Bull spread |
| Moderately bearish | Bear spread |
| Big move, direction unknown | Straddle or strangle |
| Price stays put | Butterfly, short straddle |

## Worked example
A stock trades at USD 47. Options expire in 3 months.

**Bull call spread.** Buy the 45 call at USD 4.00 and sell the 50 call at USD 1.50.
1. Net debit: $4.00 - 1.50 = 2.50$.
2. Max profit (when $S_T \ge 50$): $(50 - 45) - 2.50 = $ **USD 2.50**.
3. Max loss (when $S_T \le 45$): **USD 2.50**.
4. Breakeven: $45 + 2.50 = $ **USD 47.50**.
5. Spot checks: at $S_T = 46$, profit $= 1 - 2.50 = -1.50$; at $S_T = 48$, profit $= 3 - 2.50 = 0.50$.

**Straddle.** Buy the 50 call at USD 3.00 and the 50 put at USD 2.50.
1. Total premium: 5.50.
2. Breakevens: $50 - 5.50 = $ **USD 44.50** and $50 + 5.50 = $ **USD 55.50**.
3. At $S_T = 60$: profit $= 10 - 5.50 = 4.50$. At $S_T = 50$: the full 5.50 is lost.

**Box spread.** With strikes 45 and 55, $r = 5\%$ and $T = 0.5$, a European box must be worth $10e^{-0.025} = $ **USD 9.75**. Any other price is an arbitrage.

## Common exam traps
- Forgetting to subtract the net premium when converting payoff into profit.
- Mixing up which strike is bought in a bull call spread (the lower one) versus a bear put spread (the higher one).
- Using only one premium for straddle breakevens; both premiums move each breakeven.
- Thinking a butterfly is a big-move strategy; it profits when the price stays near the middle strike.
- Forgetting that the middle leg of a butterfly is two options, which changes the slope twice.

## Key takeaways
- Covered call is equivalent to a short put; protective put is equivalent to a long call (plus cash in each case).
- Spreads cap both profit and loss; bull spreads gain from rises, bear spreads from falls.
- Straddles and strangles are long-volatility strategies; their sellers are short volatility.
- A box spread pays $K_2 - K_1$ for certain and is worth its present value.
- Always build profit tables by evaluating payoffs below, between and above the strikes, then subtracting net premium.
