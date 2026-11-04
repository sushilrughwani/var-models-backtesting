---
title: "Trading Strategies"
duration: 24
---

## Lecture outline
- 00:00 - Hook: earnings tomorrow, you have no idea which way the stock will jump. Can you still profit?
- 02:00 - Payoff versus profit; the "evaluate at each strike" method
- 05:00 - Covered calls and protective puts; the parity link
- 08:00 - Bull and bear spreads (whiteboard example 1)
- 12:00 - Butterfly, box and calendar spreads
- 16:00 - Straddles, strangles, strips and straps (whiteboard example 2)
- 20:00 - Matching strategies to views on direction and volatility
- 22:00 - Exam traps and recap

## Slides
### Slide 1: Trading Strategies
- Combining options and stock to express a view
- Direction views and volatility views
- Builds on payoffs and put-call parity

### Slide 2: Payoff vs Profit
- Payoff: value at expiry
- Profit: payoff minus net premium
- Slopes change only at strikes: check below, between, above

### Slide 3: Covered Call and Protective Put
- Covered call = long stock + short call = short put + cash
- Protective put = long stock + long put = long call + cash
- Income versus insurance

### Slide 4: Bull Call Spread
- Buy K1 call, sell K2 call (K1 < K2)
- Max profit = (K2 - K1) - debit; max loss = debit
- Breakeven = K1 + debit

### Slide 5: Bear Put Spread
- Buy K2 put, sell K1 put
- Max profit = (K2 - K1) - debit
- Profits from moderate declines

### Slide 6: Butterfly Spread
- Long K1 call, short 2 K2 calls, long K3 call
- Max payoff K2 - K1 at S_T = K2
- Low-volatility bet with small cost

### Slide 7: Box and Calendar Spreads
- Box = bull call + bear put, same strikes; pays K2 - K1 for sure
- Box value = $(K_2 - K_1)e^{-rT}$
- Calendar: short near-dated, long far-dated, same strike

### Slide 8: Straddle and Strangle
- Straddle: long call + long put, same K; breakevens K plus or minus total premium
- Strangle: OTM put + OTM call; cheaper, needs a bigger move
- Short versions: bet on calm, unlimited risk

### Slide 9: Strips and Straps
- Strip: 1 call + 2 puts (bearish tilt)
- Strap: 2 calls + 1 put (bullish tilt)
- Still long volatility

### Slide 10: Strategy Map
- Bullish: bull spread; bearish: bear spread
- Big move: straddle or strangle
- Calm: butterfly, short straddle

### Slide 11: Recap
- Build profit tables strike by strike
- Watch net premium and the number of contracts in each leg
- Next: exotic options

## Whiteboard examples
**Example 1: Bull call spread.** Buy 45 call at 4.00, sell 50 call at 1.50.
- Debit 2.50. Max profit 5 - 2.50 = 2.50 above 50; max loss 2.50 below 45; breakeven 47.50.
- Profit table: S_T = 40: -2.50; 46: -1.50; 48: +0.50; 55: +2.50.

**Example 2: Straddle.** Buy 50 call at 3.00 and 50 put at 2.50.
- Cost 5.50; breakevens 44.50 and 55.50.
- S_T = 40: 10 - 5.50 = 4.50; S_T = 50: -5.50; S_T = 60: 4.50.

**Example 3: Butterfly.** Buy 40 call at 7.00, sell two 45 calls at 4.00, buy 50 call at 2.00. Net cost 1.00.
- S_T = 38: -1.00; S_T = 45: 5 - 1 = 4.00; S_T = 47: 7 - 4 - 1 = 2.00; S_T = 52: -1.00.

## Questions to ask students
- Which single-option position has the same profile as a covered call? (A short put.)
- What is the maximum loss of a long strangle? (The two premiums paid.)
- Why is a strangle cheaper than a straddle? (Both options are out of the money.)
- In a butterfly, where is the maximum profit? (At the middle strike.)
- A box spread on strikes 45 and 55 trades at 10.20 with six months left and r = 5%. What do you do? (Sell it; fair value is 9.75, so collect 10.20 and owe 10 at expiry.)

## Analogies
- A spread is like buying a lottery ticket and selling part of the jackpot: cheaper ticket, smaller prize.
- A straddle is an umbrella and sunglasses in the same bag: you are paid if the weather turns dramatic either way, and you lose the cost if it stays mild.
- A butterfly is a bet the ball lands in the centre of the dartboard: cheap to play, best payoff on a bullseye.

## Recording tips
- Draw every payoff diagram on screen as you build it leg by leg; students learn faster from seeing slopes add.
- Insist on a three-region table (below, between, above strikes) for every spread question.
- Highlight the factor of two in the butterfly's middle leg; it is the most common slip.
