---
title: "Forward Commitment and Contingent Claim Features"
---

## Learning goals
- Distinguish forward commitments (forwards, futures, swaps) from contingent claims (options, credit derivatives).
- Calculate the payoff and profit of long and short forward, call and put positions at expiration.
- Compare forwards, futures and swaps on trading venue, settlement and credit risk.
- Explain how a credit default swap transfers default risk and why it is a contingent claim.

## Explanation

### Two families of derivatives
Building on the previous lesson, every derivative falls into one of two families.

A **forward commitment** obliges both parties to transact in the future at terms fixed today. Neither side can walk away, so the payoff is **symmetric**: whatever one side gains, the other loses, and the payoff moves one-for-one with the underlying in both directions.

A **contingent claim** gives one party a *right*, not an obligation. The payoff happens only if some condition is met (the underlying finishing above or below a strike price, or a credit event occurring). Because the holder has a choice, the payoff is **asymmetric**, and the holder pays an upfront price, the **premium**, for that right.

### Forwards
A forward is an OTC agreement to buy (long) or sell (short) an underlying at a **forward price** $F_0$ on a future date $T$. No money changes hands at the start. At expiration:

$$
\text{Long payoff} = S_T - F_0, \qquad \text{Short payoff} = F_0 - S_T
$$

where $S_T$ is the underlying's price at $T$. The forward price is chosen so that the contract is worth zero to both sides at initiation; how it is set is the subject of the next lesson.

### Futures
A futures contract has the same basic payoff as a forward but is standardised, exchange-traded and cleared by a CCP. Gains and losses are settled every day through **mark-to-market**, and margin must be maintained. Daily settlement nearly eliminates counterparty risk.

### Swaps
A swap is an OTC agreement to exchange a series of cash flows over time. In a plain-vanilla interest rate swap, one side pays a fixed rate and the other pays a floating rate on the same notional. Because each exchange date works like a small forward contract, a swap is best thought of as a **portfolio of forwards**. Like forwards, swaps have zero value at initiation and symmetric payoffs.

### Options
A **call** gives the holder the right to buy the underlying at the **exercise (strike) price** $X$; a **put** gives the right to sell at $X$. European options can be exercised only at expiration; American options at any time up to expiration. At expiration:

$$
c_T = \max(0,\ S_T - X), \qquad p_T = \max(0,\ X - S_T)
$$

where $c_T$ and $p_T$ are the call and put payoffs. Profit subtracts the premium paid ($c_0$ or $p_0$): call profit $= \max(0, S_T - X) - c_0$. The writer (short) receives the premium and has the mirror-image profit. Break-even prices are $X + c_0$ for a call buyer and $X - p_0$ for a put buyer.

The buyer's loss is capped at the premium, while the writer's potential loss is large (unlimited for a short call); the premium pays for that asymmetry.

### Credit derivatives
A **credit default swap (CDS)** lets the protection buyer pay a periodic premium (the CDS spread) to a protection seller. If a defined **credit event** occurs on a reference entity, such as bankruptcy or failure to pay, the seller compensates the buyer for the loss. Despite the word "swap", a CDS is a **contingent claim**: the large payment happens only if the credit event occurs. It works like insurance on a bond.

### Summary comparison
| Feature | Forward | Futures | Swap | Option | CDS |
|---|---|---|---|---|---|
| Family | Commitment | Commitment | Commitment | Contingent | Contingent |
| Venue | OTC | Exchange | Mostly OTC | Both | OTC |
| Upfront payment | None | Margin only | None | Premium | Spread/fee |
| Payoff | Symmetric | Symmetric | Symmetric | Asymmetric | Asymmetric |

## Worked example
A stock's forward price for delivery in six months is USD 50. A six-month call and a six-month put, both with strike USD 50, cost USD 3.00 and USD 2.50. Find the payoff and profit of a long forward, a long call and a long put if the stock ends at USD 56 or at USD 44.

**Step 1: Long forward.** Payoff $= S_T - F_0$. At 56: $56 - 50 = 6$. At 44: $44 - 50 = -6$. No premium, so profit equals payoff.

**Step 2: Long call.** At 56: payoff $\max(0, 56 - 50) = 6$, profit $6 - 3 = 3$. At 44: payoff 0, profit $-3$ (the premium is lost).

**Step 3: Long put.** At 56: payoff 0, profit $-2.50$. At 44: payoff $\max(0, 50 - 44) = 6$, profit $6 - 2.50 = 3.50$.

**Step 4: Break-evens.** Call: $50 + 3 = 53$. Put: $50 - 2.50 = 47.50$.

**Result: at USD 56 the profits are forward +6, call +3, put −2.50; at USD 44 they are forward −6, call −3, put +3.50.** The forward wins or loses fully in both directions; each option limits the downside to its premium.

## Common exam traps
- Confusing payoff with profit. Payoff ignores the premium; profit subtracts it (for buyers) or adds it (for writers).
- Calling a CDS a forward commitment because of its name. Its payout is contingent on a credit event.
- Thinking a forward requires an upfront payment. Its value at initiation is zero; only options require a premium.
- Mixing up the put buyer's break-even ($X - p_0$) with the call buyer's ($X + c_0$).
- Assuming the option writer's loss is limited. Only the buyer's loss is capped at the premium.

## Key takeaways
- Forward commitments (forwards, futures, swaps) oblige both parties and have symmetric, linear payoffs.
- Contingent claims (options, CDS) give one party a right, have asymmetric payoffs and require a premium.
- Long forward payoff is $S_T - F_0$; call payoff is $\max(0, S_T - X)$; put payoff is $\max(0, X - S_T)$.
- Futures are standardised, exchange-traded forwards settled daily; swaps are portfolios of forwards.
- A CDS is insurance-like protection against default on a reference entity.
