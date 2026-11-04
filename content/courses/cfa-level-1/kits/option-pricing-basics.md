---
title: "Pricing and Valuation of Options"
duration: 26
---

## Lecture outline
- 00:00 - Hook: why would anyone pay 4.80 for a call that is only "worth" 2.00 if exercised today?
- 03:00 - Exercise value, time value and moneyness for calls and puts.
- 07:00 - No-arbitrage lower and upper bounds for European options.
- 11:00 - Whiteboard: the 52/50 call example.
- 15:00 - The factor table: S, X, T, r, volatility, income, carry costs.
- 20:00 - American versus European; no early exercise of calls on non-dividend stocks.
- 24:00 - Traps and recap.

## Slides
### Slide 1: Option Value Decomposed
- Option value = exercise value + time value
- Exercise value: call $\max(0, S - X)$, put $\max(0, X - S)$
- Time value decays to zero at expiry
### Slide 2: Moneyness
- Call ITM when $S > X$; put ITM when $S < X$
- At the money when $S = X$
- OTM options are pure time value
### Slide 3: European Call Bounds
- Lower: $\max(0, S_0 - X/(1+r)^T)$
- Upper: $S_0$
- Discounting $X$ raises the floor
### Slide 4: European Put Bounds
- Lower: $\max(0, X/(1+r)^T - S_0)$
- Upper: $X/(1+r)^T$
### Slide 5: Worked Example
- $S = 52$, $X = 50$, $r = 4\%$, $T = 0.5$, call = 4.80
- Exercise value 2.00, time value 2.80
- Bounds: 2.97 to 52.00
### Slide 6: Factors: S, X and r
- Higher $S$: call up, put down
- Higher $X$: call down, put up
- Higher $r$: call up, put down
### Slide 7: Factors: Volatility and Time
- Higher volatility: call up, put up
- Longer time: call up, put usually up
- Deep ITM European put can fall with longer time
### Slide 8: Factors: Income and Costs
- Dividends: call down, put up
- Carry costs: call up, put down
### Slide 9: American vs European
- American ≥ European
- No early exercise of calls on non-dividend stocks
- Early exercise can pay for deep ITM puts or calls before dividends
### Slide 10: Key Takeaways
- Know the bounds and the factor table cold
- Volatility helps both calls and puts

## Whiteboard examples
1. **Call decomposition and bounds.** $S = 52$, $X = 50$, $r = 4\%$, $T = 0.5$, call 4.80. Exercise value 2.00; time value 2.80. PV(X) $= 50/1.04^{0.5} = 49.0290$. Lower bound 2.9710; upper bound 52.
2. **Put lower bound.** $S = 55$, $X = 60$, $r = 5\%$, $T = 1$. PV(X) = 57.1429. Lower bound $= 57.1429 - 55 = 2.1429$. Upper bound 57.14. Exercise value is 5.00 (higher than the European lower bound, which is fine because a European put cannot be exercised today).
3. **Time value of an ITM put.** $S = 38$, $X = 40$, put 3.10: the put is in the money because $S < X$; exercise value $= 40 - 38 = 2.00$, time value $= 3.10 - 2.00 = 1.10$. If the stock were 42, the put would be OTM and its whole price would be time value.

## Questions to ask students
- An OTM call costs 1.50. What is its time value? (1.50, since exercise value is zero.)
- Volatility rises. What happens to put values? (They rise.)
- Higher interest rates: effect on calls and puts? (Calls up, puts down.)
- Would you exercise an American call on a non-dividend stock early? (No, sell it instead.)
- What is the upper bound of a European put? (PV of the exercise price.)

## Analogies
- Time value is the value of a lottery ticket that has not been drawn yet; once the draw happens, only the result remains.
- Volatility and an option are like a goalkeeper who only gets credit for saves: more shots (volatility) mean more chances to shine, and goals conceded are capped at the premium.
- Exercising an American call early is like cashing out a concert ticket at face value when you could resell it for more.

## Recording tips
- Put the factor table on screen and fill it column by column; ask viewers to predict each arrow before revealing it.
- Stress that European lower bounds use discounted $X$; show the numerical difference (2.97 vs 2.00).
- Mention the deep ITM put exception briefly; do not let it derail the main message.
