---
title: "Properties of Options"
duration: 26
---

## Lecture outline
- 00:00 - Hook: without any model at all, can we say an option must be worth at least 3.42? Yes, with pure arbitrage logic
- 03:00 - The six inputs and the direction of each effect
- 07:00 - Upper bounds for calls and puts
- 10:00 - Lower bounds via portfolio comparison, and the dividend adjustment
- 14:00 - Put-call parity: fiduciary call versus protective put
- 18:00 - Whiteboard: pricing a put by parity and arbitraging a mispriced quote
- 22:00 - Early exercise: American calls and puts; American parity bounds
- 24:00 - Exam traps and recap

## Slides
### Slide 1: Properties of Options
- What arbitrage alone tells us about option prices
- Bounds, put-call parity, early exercise
- No pricing model needed (that comes with binomial trees and Black-Scholes-Merton)

### Slide 2: Six Inputs
- S up: call up, put down; K up: call down, put up
- Volatility up: both up
- r up: call up, put down; dividends up: call down, put up
- Time up: both up for American options

### Slide 3: Upper Bounds
- $c \le S_0$ and $C \le S_0$
- $p \le Ke^{-rT}$ (European), $P \le K$ (American)
- A put cannot pay more than the strike

### Slide 4: Lower Bound for a Call
- Call + cash $Ke^{-rT}$ is worth $\max(S_T, K) \ge S_T$
- $c \ge \max(S_0 - Ke^{-rT}, 0)$
- Dividends: replace $S_0$ with $S_0 - D$

### Slide 5: Lower Bound for a Put
- Put + share is worth $\max(S_T, K) \ge K$
- $p \ge \max(Ke^{-rT} - S_0, 0)$
- Same dividend adjustment

### Slide 6: Put-Call Parity
- $c + Ke^{-rT} = p + S_0$
- Fiduciary call = protective put
- Same strike, same expiry, European options

### Slide 7: Exploiting a Violation
- Identify the expensive side
- Sell it, buy the cheap side, pocket the difference today
- Payoffs cancel at expiry whatever the stock price

### Slide 8: Early Exercise of Calls
- No dividends: never exercise early, C = c
- Exercise gives S - K, but the call is worth at least $S - Ke^{-rT}$
- Dividends: exercise just before ex-date may be optimal

### Slide 9: Early Exercise of Puts
- Deep ITM put: take K now and earn interest
- So P > p generally
- $S_0 - K \le C - P \le S_0 - Ke^{-rT}$

### Slide 10: Recap
- Bounds, parity, early exercise
- Always discount the strike
- Next: trading strategies with options

## Whiteboard examples
**Example 1: Bounds and parity.** S = 50, K = 48, r = 6%, T = 0.5, c = 4.20.
- PV(K) = 48e^(-0.03) = 46.5814; call lower bound = 3.42; put lower bound = 0.
- Parity put: 4.20 + 46.5814 - 50 = 0.78.

**Example 2: Arbitrage.** Put quoted at 2.40 (too high).
- Write put +2.40, short share +50, buy call -4.20, lend -46.5814. Net +1.62 today.
- At expiry the loan pays 48, and you end up buying the share at 48 through whichever option is exercised, closing the short. Zero net cash at expiry.

**Example 3: American bounds.** S = 50, K = 50, r = 5%, T = 1, no dividends.
- Lower: S - K = 0. Upper: 50 - 50e^(-0.05) = 2.44.
- So 0 <= C - P <= 2.44.

## Questions to ask students
- Why does volatility increase the value of a put as well as a call? (Downside of the option is capped at the premium; extra spread only adds upside.)
- What happens to put values when interest rates rise? (They fall: the strike received later is worth less today.)
- If the call is overpriced relative to parity, what do you do? (Sell the call, buy the put and the share, borrow PV of K.)
- Why can a European option lose value as maturity lengthens? (A dividend in the longer window can lower the expected stock price at expiry.)
- When might you exercise an American put early? (When it is deep in the money and the interest on K exceeds the remaining option value.)

## Analogies
- Put-call parity is two recipes for the same cake: call plus cash, or put plus stock. If one recipe costs less, buy its ingredients and sell the other cake.
- Exercising an American call early is like cashing in a concert ticket for its face value the morning of the show: you get money, but lose the experience you paid for.
- Option bounds are like floor and ceiling of a room: the price can move around inside, but arbitrage nails down the walls.

## Recording tips
- Build the parity payoff table (S_T below K, above K) on screen; seeing both portfolios equal max(S_T, K) is the key moment.
- Use a cash-flow ledger for the arbitrage with today and expiry columns.
- Spend time on the dividend adjustment; it is a frequent exam twist.
