---
title: "Forward Commitment and Contingent Claim Features"
duration: 24
---

## Lecture outline
- 00:00 - Hook: "an obligation versus a right" - booking a non-refundable hotel versus paying for a refundable one.
- 02:00 - Two families: forward commitments and contingent claims; symmetric versus asymmetric payoffs.
- 04:00 - Forwards: long and short payoff, zero value at initiation.
- 07:00 - Futures and swaps as variations on the forward idea.
- 10:00 - Options: calls, puts, European versus American, payoff and profit formulas.
- 15:00 - Whiteboard: forward, call and put payoffs at 56 and 44.
- 19:00 - Credit default swaps as contingent claims.
- 22:00 - Comparison table and recap.

## Slides
### Slide 1: Obligation or Right?
- Forward commitment: both sides must transact
- Contingent claim: one side may choose
- Rights cost a premium; obligations do not
### Slide 2: Forward Contracts
- OTC agreement to buy/sell at $F_0$ on date $T$
- Long payoff $S_T - F_0$; short payoff $F_0 - S_T$
- Zero value to both sides at initiation
### Slide 3: Futures Contracts
- Standardised, exchange-traded forwards
- Cleared by a CCP, margin required
- Gains and losses settled daily (mark-to-market)
### Slide 4: Swaps
- Exchange of a series of cash flows
- Fixed-for-floating interest rate swap is the classic example
- Equivalent to a portfolio of forwards
### Slide 5: Options Basics
- Call: right to buy at $X$; put: right to sell at $X$
- European: exercise at expiry only; American: any time
- Buyer pays premium; writer receives it
### Slide 6: Option Payoffs and Profits
- Call payoff $\max(0, S_T - X)$, put payoff $\max(0, X - S_T)$
- Profit = payoff minus premium (buyer)
- Break-even: call $X + c_0$, put $X - p_0$
### Slide 7: Worked Example Results
- $F_0 = X = 50$, $c_0 = 3$, $p_0 = 2.50$
- At 56: forward +6, call +3, put −2.50
- At 44: forward −6, call −3, put +3.50
### Slide 8: Credit Default Swaps
- Buyer pays periodic spread for protection
- Seller pays if a credit event hits the reference entity
- Contingent claim despite the name "swap"
### Slide 9: Comparison Table
- Commitments: forward, futures, swap (symmetric, no premium)
- Contingent: option, CDS (asymmetric, premium)
- Venue: exchange for futures; OTC for forwards, most swaps, CDS
### Slide 10: Key Takeaways
- Know which family each instrument belongs to
- Payoff vs profit: the premium is the difference
- Option buyer's loss is capped; writer's is not

## Whiteboard examples
1. **Payoff grid.** $F_0 = 50$, call and put strike 50, $c_0 = 3$, $p_0 = 2.50$. At $S_T = 56$: forward $56 - 50 = 6$; call payoff 6, profit 3; put payoff 0, profit −2.50. At $S_T = 44$: forward −6; call payoff 0, profit −3; put payoff 6, profit 3.50. Break-evens: call 53, put 47.50. Draw the hockey-stick diagrams with the forward line through 50.
2. **Writer's view.** A trader writes a put with strike 40 for a premium of 1.80. At expiry the stock is 35. Payoff to writer = −max(0, 40 − 35) = −5; profit = −5 + 1.80 = −3.20. If the stock is 42, the put expires worthless and the writer keeps 1.80.

## Questions to ask students
- Does a long forward need an upfront payment? (No, its value at initiation is zero.)
- Is a CDS a forward commitment or a contingent claim? (Contingent claim; it pays only on a credit event.)
- What is the most a call buyer can lose? (The premium.)
- What is the break-even for a put with strike 60 and premium 4? (56.)
- Why can a swap be viewed as a series of forwards? (Each settlement date is a fixed-versus-floating exchange agreed today.)

## Analogies
- A forward is a pre-ordered meal at a fixed price: you must pay and eat whether or not the menu price changes.
- A call option is a refundable deposit on a car at a fixed price: walk away and you lose only the deposit.
- A CDS is fire insurance on someone else's bond: you pay premiums and get a large cheque only if the "fire" (default) happens.

## Recording tips
- Draw payoff diagrams live; the visual of a straight line versus a hockey stick makes symmetry versus asymmetry obvious.
- Repeat "payoff ignores premium, profit includes it" at least twice; it is the most common error.
- Keep the comparison table on screen at the end so students can screenshot it.
