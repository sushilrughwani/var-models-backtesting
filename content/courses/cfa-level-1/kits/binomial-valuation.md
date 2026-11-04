---
title: "Valuing a Derivative Using a One-Period Binomial Model"
duration: 28
---

## Lecture outline
- 00:00 - Hook: you and a friend disagree completely about whether a stock will rise. Can you still agree on the price of an option on it?
- 03:00 - The one-period tree: $u$, $d$, the condition $d < 1 + r < u$.
- 06:00 - Payoffs at each node for a call and a put.
- 09:00 - Hedge ratio and the riskless portfolio; replication formula.
- 14:00 - Risk-neutral probability and the shortcut valuation formula.
- 18:00 - Whiteboard: the 50 / 1.25 / 0.80 example, both methods, plus the put and parity check.
- 24:00 - Why real-world probabilities do not matter; arbitrage when price is wrong.
- 26:00 - Traps and recap.

## Slides
### Slide 1: The Binomial Idea
- Underlying moves to $uS_0$ or $dS_0$ in one period
- Replicate the option with shares and a bond
- No-arbitrage gives the price
### Slide 2: No-Arbitrage Condition
- Require $d < 1 + r < u$
- Otherwise the share or the bond dominates
### Slide 3: Terminal Payoffs
- Call: $\max(0, S^\pm - X)$
- Put: $\max(0, X - S^\pm)$
### Slide 4: Hedge Ratio
- $h = (c^+ - c^-)/(S^+ - S^-)$
- Short 1 call + long $h$ shares is riskless
- Put hedge ratio is negative
### Slide 5: Replication Formula
- $c_0 = hS_0 - (hS^- - c^-)/(1+r)$
- Buy $h$ shares, borrow the rest
### Slide 6: Risk-Neutral Probability
- $\pi = (1 + r - d)/(u - d)$
- $c_0 = [\pi c^+ + (1 - \pi)c^-]/(1+r)$
- Not a forecast of the real world
### Slide 7: Worked Example: Call
- $S_0 = 50$, $u = 1.25$, $d = 0.80$, $r = 5\%$, $X = 50$
- $\pi = 0.5556$, $c_0 = 6.61$
- $h = 0.556$; replication gives the same 6.61
### Slide 8: Worked Example: Put and Parity
- $p^- = 10$, $p_0 = 4.23$, put $h = -0.444$
- $c_0 - p_0 = 2.38 = S_0 - X/1.05$
### Slide 9: Why Risk Preferences Drop Out
- Real probabilities already priced into $S_0$
- Replication forces one price for everyone
- Under $\pi$, the stock earns $r$
### Slide 10: Exploiting Mispricing
- Call too expensive: write call, buy $h$ shares, borrow
- Call too cheap: buy call, short $h$ shares, lend
### Slide 11: Key Takeaways
- Two methods, one answer
- Discount at $r$ with risk-neutral probabilities
- Bridge to multi-period trees and Black-Scholes-Merton later

## Whiteboard examples
1. **Call and put.** $S_0 = 50$, $u = 1.25$, $d = 0.80$, $r = 5\%$, $X = 50$. $S^+ = 62.50$, $S^- = 40$. $c^+ = 12.50$, $c^- = 0$; $p^+ = 0$, $p^- = 10$. $\pi = 0.25/0.45 = 0.5556$. $c_0 = 0.5556 \times 12.50/1.05 = 6.6138$. $h = 12.50/22.50 = 0.5556$; shares cost 27.7778, borrow $22.2222/1.05 = 21.1640$, call $= 6.6138$. $p_0 = 0.4444 \times 10/1.05 = 4.2328$. Parity: $6.6138 - 4.2328 = 2.3810 = 50 - 47.6190$.
2. **Second tree.** $S_0 = 100$, $u = 1.20$, $d = 0.90$, $r = 4\%$, $X = 100$. $\pi = (1.04 - 0.90)/0.30 = 0.4667$. $c^+ = 20$, $c^- = 0$. $c_0 = 0.4667 \times 20/1.04 = 8.9744$. $h = 20/30 = 0.6667$.
3. **Arbitrage.** In example 2, if the call trades at 10.00: write the call (+10), buy 0.6667 shares (−66.67), borrow PV of $0.6667 \times 90 = 60/1.04 = 57.69$. Net today $= 10 - 66.67 + 57.69 = 1.03$ (equal to $10 - 8.97$). At expiry the share position pays exactly the call payoff plus the loan repayment in both states.

## Questions to ask students
- $u = 1.15$, $d = 0.90$, $r = 3\%$: risk-neutral up probability? (0.13/0.25 = 0.52.)
- Does the actual probability of an up move affect the option value? (No.)
- What is the sign of a put's hedge ratio? (Negative.)
- Why must $d < 1 + r < u$? (Otherwise there is an arbitrage between the share and the bond.)
- What rate do we discount the expected payoff at? (The risk-free rate.)

## Analogies
- The hedge ratio is a seesaw balance: put exactly enough share weight on one side that the option's swings cannot tip the portfolio.
- Risk-neutral probabilities are like exchange rates for uncertainty: a conversion tool, not a weather forecast.
- Two forecasters who disagree about rain can still agree on the price of an umbrella if they can both build one from the same parts.

## Recording tips
- Draw the tree large and keep it on screen; annotate each node with share price and option payoff.
- Do the replication method first, then reveal the risk-neutral shortcut; the "same answer" moment builds trust.
- Close with the parity check to link back to the previous lesson.
