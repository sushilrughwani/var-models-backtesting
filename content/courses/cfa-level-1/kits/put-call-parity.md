---
title: "Option Replication Using Put-Call Parity"
duration: 24
---

## Lecture outline
- 00:00 - Hook: two investors build completely different portfolios and end up with exactly the same money in every scenario.
- 02:00 - Fiduciary call versus protective put; payoff table at expiry.
- 06:00 - Put-call parity equation and conditions (European, no income or adjust for PV of income).
- 09:00 - Synthetic call, put and underlying; sign conventions.
- 13:00 - Whiteboard: parity put value and arbitrage when the put is overpriced.
- 18:00 - Put-call-forward parity and the "call minus put equals forward" insight.
- 22:00 - Traps and recap.

## Slides
### Slide 1: Two Portfolios
- Fiduciary call: call + bond paying $X$
- Protective put: underlying + put
- Both pay $\max(S_T, X)$ at expiry
### Slide 2: Payoff Table
- $S_T \ge X$: both portfolios worth $S_T$
- $S_T < X$: both portfolios worth $X$
- Same payoff, so same price today
### Slide 3: Put-Call Parity
- $c_0 + X/(1+r)^T = S_0 + p_0$
- European options, same $X$ and $T$
- With income: use $S_0 - PV(I)$
### Slide 4: Synthetic Positions
- Synthetic call: $S_0 + p_0 - PV(X)$
- Synthetic put: $c_0 - S_0 + PV(X)$
- Synthetic stock: $c_0 - p_0 + PV(X)$
### Slide 5: Reading the Signs
- Plus = buy, minus = sell
- PV(X) positive = lend; negative = borrow
### Slide 6: Arbitrage Rule
- Compare market price with parity value
- Sell the overpriced side, buy its replica
- Profit today, zero net payoff at expiry
### Slide 7: Worked Example
- $S_0 = X = 40$, $r = 5\%$, $T = 1$, $c_0 = 4.50$
- Parity put = 2.60; market put = 3.20
- Write put, buy synthetic put: +0.60 today
### Slide 8: Put-Call-Forward Parity
- $F_0/(1+r)^T + p_0 = c_0 + X/(1+r)^T$
- $c_0 - p_0 = (F_0 - X)/(1+r)^T$
- At $X = F_0$, call and put prices are equal
### Slide 9: Key Takeaways
- Parity is the law of one price for options
- Long call + short put = long forward
- Only exact for European options

## Whiteboard examples
1. **Parity put and arbitrage.** $S_0 = 40$, $X = 40$, $r = 5\%$, $T = 1$, $c_0 = 4.50$. PV(X) $= 38.0952$. $p_0 = 4.50 - 40 + 38.0952 = 2.5952$. Market put 3.20 is overpriced. Write put (+3.20), buy call (−4.50), short share (+40), lend 38.0952: net +0.6048 today. Check $S_T = 50$ and $S_T = 30$: net payoff zero both times.
2. **Call from parity.** $S_0 = 75$, $X = 70$, $r = 4\%$, $T = 0.5$, $p_0 = 2.10$. PV(X) $= 70/1.04^{0.5} = 68.6406$. $c_0 = 75 + 2.10 - 68.6406 = 8.4594$.
3. **Put-call-forward parity.** $F_0 = 105$, $X = 100$, $r = 3\%$, $T = 1$, $c_0 = 9.00$. $p_0 = c_0 - (F_0 - X)/(1+r)^T = 9.00 - 5/1.03 = 4.1456$.

## Questions to ask students
- What two portfolios underpin put-call parity? (Fiduciary call and protective put.)
- How do you create a synthetic put? (Buy a call, short the underlying, lend the PV of the strike.)
- The call is overpriced relative to parity. What do you do? (Write the call and buy the synthetic call: stock + put − borrow PV(X).)
- Does put-call parity hold exactly for American options? (No, only European.)
- If the strike equals the forward price, how do call and put prices compare? (They are equal.)

## Analogies
- Put-call parity is a recipe swap: call + bond and stock + put are two recipes for the same cake, so the ingredients must cost the same.
- A synthetic position is a "build it yourself" kit: if the store's ready-made version is too expensive, assemble it from parts.
- Long call plus short put is a forward wearing an option costume.

## Recording tips
- Build the payoff table cell by cell; the moment both columns match is the "aha".
- Practise the arbitrage sign check live at two expiry prices; it convinces students the profit really is riskless.
- Write the parity equation in the same order every time to help students memorise it.
