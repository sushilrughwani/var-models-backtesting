---
title: "Binomial Trees"
duration: 28
---

## Lecture outline
- 00:00 - Hook: "Can you price a bet without knowing the odds?" In a two-state world, yes.
- 03:00 - One-step replication: delta shares plus a bond; law of one price.
- 07:00 - Whiteboard 1: replicate the 40-strike call; derive risk-neutral p and confirm.
- 11:00 - Matching volatility: u = e^(σ√Δt), d = 1/u; convergence to BSM.
- 14:00 - Multi-step trees: build forward, roll back.
- 16:00 - Whiteboard 2: two-step European and American put on the 50 stock.
- 23:00 - Why American calls on non-dividend stocks are not exercised early; puts can be.
- 25:00 - Dividend yields, currencies and futures in p; recap and traps.

## Slides
### Slide 1: Binomial Trees
- Price options in a world with two outcomes per step
- Replication and risk-neutral valuation
- European and American options

### Slide 2: One-Step Replication
- Hold Δ shares and B in the risk-free asset
- Δ = (f_u − f_d) / (S_u − S_d)
- Option value = Δ S0 + B

### Slide 3: Risk-Neutral Valuation
- p = (e^(rΔt) − d) / (u − d)
- f = e^(−rΔt) [p f_u + (1 − p) f_d]
- p is a pricing device, not a forecast

### Slide 4: Why Risk Preferences Drop Out
- Replication pins down the price exactly
- Any investor would agree on that price
- So we can price as if everyone were risk-neutral

### Slide 5: Matching Volatility
- u = e^(σ√Δt), d = 1/u
- More steps: converges to Black-Scholes-Merton
- Scale σ and r by the step length

### Slide 6: Rolling Back a Tree
- Build stock prices forward
- Payoffs at final nodes
- Discount p-weighted values back one step at a time

### Slide 7: American Options
- At each node: max(continuation, exercise)
- American put: early exercise can be optimal
- American call on non-dividend stock: never exercise early

### Slide 8: Other Underlyings
- Dividend yield: p = (e^((r−q)Δt) − d)/(u − d)
- Currency: replace q with foreign rate
- Futures: p = (1 − d)/(u − d)

### Slide 9: Delta in the Tree
- Delta changes from node to node
- Hedge must be rebalanced each step
- Preview of dynamic hedging with the Greeks

### Slide 10: Exam Traps
- Real-world probability instead of p
- Checking early exercise only at the end
- Forgetting to scale by Δt

### Slide 11: Recap
- Replicate, then price
- Roll back with p and discount
- Compare with exercise at every American node

## Whiteboard examples
**Example 1 - one-step call.** S0 = 40, u = 1.2, d = 0.8, K = 40, r = 4%, T = 0.5, one step.
- Payoffs: f_u = 8, f_d = 0
- Δ = 8 / (48 − 32) = 0.5
- B = e^(−0.02) × (8 − 0.5 × 48) = −15.6832 (borrow)
- Value = 0.5 × 40 − 15.6832 = **4.3168**
- Risk-neutral check: p = (e^0.02 − 0.8)/0.4 = 0.5505; e^(−0.02) × 0.5505 × 8 = 4.3168

**Example 2 - two-step put.** S0 = 50, K = 52, r = 5%, σ = 30%, T = 1, Δt = 0.5.
- u = 1.236311, d = 0.808858, p = 0.506388, step discount 0.975310
- Stock: 61.8156 / 40.4429; final 76.4233 / 50.0000 / 32.7126
- Final put payoffs: 0 / 2.0000 / 19.2874
- Up node: 0.9628. Down node: continuation 10.2732 versus exercise 11.5571, exercise
- American put = 0.975310 × (0.506388 × 0.9628 + 0.493612 × 11.5571) = **6.0394**
- European put = 0.975310 × (0.506388 × 0.9628 + 0.493612 × 10.2732) = **5.4213**
- European call on the same tree = 5.9574; check parity: 5.9574 − 5.4213 = 0.5361 = 50 − 52e^(−0.05)

## Questions to ask students
- Does the real probability of an up move affect the option price in the tree? (No; only u, d, r and Δt matter.)
- Why is B negative for a call? (Replicating a call requires borrowing to buy shares.)
- At the down node in Example 2, why exercise early? (The 11.56 received now exceeds the 10.27 value of waiting; the strike earns interest.)
- What is p for an option on a futures contract with u = 1.1 and d = 0.9? (0.5.)
- What happens to the tree price as the number of steps grows? (It converges to the BSM price.)

## Analogies
- Replication is a recipe: if you can bake the same cake from flour (bonds) and eggs (shares), the cake cannot cost more than the ingredients.
- Risk-neutral probabilities are like exchange rates in a currency conversion: a tool for translating payoffs into today's money, not a statement about the future.
- Early exercise of a deep in-the-money put is like taking a guaranteed cash offer now instead of waiting for a slightly higher offer that comes without interest.

## Recording tips
- Draw the tree large and fill in stock prices in one colour and option values in another.
- Pause at every American node and say the comparison out loud; students skip it.
- Show the put-call parity check at the end of Example 2 to build confidence in the tree.
