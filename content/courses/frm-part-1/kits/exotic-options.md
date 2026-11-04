---
title: "Exotic Options"
duration: 22
---

## Lecture outline
- 00:00 - Hook: an exporter receives euros every month. Why would a vanilla option be the wrong tool?
- 02:00 - Why exotics exist; packages, Bermudan, gap and forward start options
- 05:00 - Compound, chooser, binary, exchange and basket options
- 09:00 - Barrier options and in-out parity
- 12:00 - Asian and lookback options; shout options
- 15:00 - Whiteboard: one price path, eight payoffs
- 19:00 - Pricing checks: in-out parity and cash-or-nothing value
- 20:00 - Exam traps and recap

## Slides
### Slide 1: Exotic Options
- Vanilla = standard European or American call or put
- Exotic = altered payoff, timing or existence
- Mostly OTC, tailored by dealers

### Slide 2: Why Use Exotics?
- Match a precise hedging need
- Cheaper than vanilla for a specific view
- Tax, accounting or regulatory fit

### Slide 3: Timing and Strike Variations
- Bermudan: exercise on set dates
- Gap: payoff strike differs from trigger strike
- Forward start and cliquet: strike set later

### Slide 4: Options on Choices
- Compound: option on an option, two strikes and dates
- Chooser: pick call or put at a future date
- Chooser is worth less than a straddle

### Slide 5: Binary Options
- Cash-or-nothing: pays Q if in the money
- Asset-or-nothing: pays S_T if in the money
- Cash-or-nothing value = $Qe^{-rT}N(d_2)$

### Slide 6: Barrier Options
- Knock-in or knock-out at barrier H; up or down
- Cheaper than vanillas
- In + out = vanilla (same K, H, T)

### Slide 7: Asian Options
- Average-price: max(avg - K, 0)
- Average-strike: max(S_T - avg, 0)
- Lower volatility, lower cost; suit repeated exposures

### Slide 8: Lookback and Shout Options
- Floating lookback call: S_T - S_min; put: S_max - S_T
- Fixed lookback call: max(S_max - K, 0)
- Shout: lock in a minimum payoff once

### Slide 9: Multi-Asset and Volatility Products
- Exchange options: swap one asset for another
- Basket options: value depends on correlation
- Volatility and variance swaps: pure volatility exposure

### Slide 10: Recap
- Cheaper than vanilla: barriers, Asians
- More expensive: lookbacks
- Next: interest rate and currency swaps

## Whiteboard examples
**Example 1: One path, many payoffs.** S0 = 100; monthly prices 104, 110, 97, 92, 101, 106.
- Vanilla call K = 100: 6.00. Average = 610 / 6 = 101.67.
- Average-price call: 1.67. Average-strike call: 4.33.
- Floating lookback call: 106 - 92 = 14.00; floating lookback put: 110 - 106 = 4.00; fixed lookback call: 10.00.
- Up-and-out call with H = 108: knocked out, 0. Up-and-in: 6.00. Sum = vanilla.

**Example 2: In-out parity.** Vanilla call 5.60, down-and-in call 2.10 (same K, H, T). Down-and-out = 3.50.

**Example 3: Cash-or-nothing.** Q = 10, r = 4%, T = 0.5, N(d2) = 0.55. Value = 10 x e^(-0.02) x 0.55 = 5.39.

## Questions to ask students
- Why is an up-and-out call cheaper than a vanilla call? (It disappears in exactly the scenarios where the vanilla pays most.)
- Which exotic suits a firm with monthly foreign currency receipts? (An Asian option on the average rate.)
- Is a lookback more or less expensive than a vanilla? (More, because it guarantees the best price.)
- What does N(d2) represent in the binary formula? (Risk-neutral probability of finishing in the money.)
- How can you build a vanilla call from binaries? (Long asset-or-nothing call minus K times a cash-or-nothing call paying 1.)

## Analogies
- A knock-out option is a parking ticket valid only until you cross a line on the road; cross it and the ticket is void, so it costs less.
- An Asian option is like grading on the semester average instead of one final exam: one bad day matters less, so the outcome is less volatile.
- A lookback option is perfect hindsight for sale: you buy at the lowest price you later discover, and you pay heavily for that crystal ball.

## Recording tips
- Put the price path on screen as a line chart with the barrier, maximum, minimum and average drawn in.
- Keep the zoo organised: path-independent first, then path-dependent.
- Stress that these are tested mainly on payoffs and relative cost, not on pricing formulas.
