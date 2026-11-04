---
title: "Pricing and Valuation of Futures Contracts"
---

## Learning goals
- Explain how daily mark-to-market and margin accounts work in futures trading.
- Calculate margin balances, variation margin and cumulative gains on a futures position.
- Explain why a futures contract's value resets to zero after each daily settlement.
- Describe when futures prices differ from forward prices and in which direction.

## Explanation

### Same idea, different plumbing
A futures contract is economically close to a forward: both lock in a price today for a transaction later, and both are priced by the same carry formula from earlier lessons, $F_0 = [S_0 - PV(I) + PV(C)](1+r)^T$. The differences are institutional. Futures are standardised, trade on an exchange and are cleared through a central counterparty, and, most importantly, **gains and losses are settled every day** instead of only at expiration.

### Mark-to-market and margin
To open a position, a trader deposits **initial margin** with the clearing member. This is a performance bond, not a down payment on the asset. At the end of each trading day, the exchange sets a **settlement price**, and every account is credited or debited:

$$
\text{Daily gain (long)} = (F_t - F_{t-1}) \times \text{contract size} \times \text{number of contracts}
$$

where $F_t$ is today's settlement price and $F_{t-1}$ is yesterday's. The short receives the mirror-image amount.

If the account falls **below the maintenance margin**, the trader receives a **margin call** and must deposit **variation margin** to bring the account back up to the **initial** margin level (not just to maintenance). Failure to pay leads the broker to close the position.

### Why futures value resets to zero
A forward accumulates value over its life: if the spot rises, the long's contract becomes more valuable until it is settled at $T$. A futures position realises that gain in cash each evening. After the daily settlement, the contract is effectively re-struck at the new settlement price, so its **value returns to zero**. Between settlements, the value is the gain since the last settlement price: $V_t = (F_t - F_{t-1}) \times \text{size}$.

This is also why counterparty risk is so low: no one can build up a large unpaid obligation, because losses are collected daily.

### Convergence
As expiration approaches, the futures price converges to the spot price. On the last day, a futures contract for immediate delivery must trade at the spot price, or an obvious arbitrage would exist.

### When futures and forward prices differ
Daily settlement creates cash flows that must be reinvested or financed at interest rates that change over time. That matters only if those cash flows are correlated with interest rates:

- **Interest rates constant, or uncorrelated with the futures price:** futures and forward prices are equal.
- **Positive correlation** between the futures price and interest rates: a long futures position receives cash when rates are high (invested at high rates) and pays cash when rates are low (financed cheaply). That is an advantage, so the **futures price is higher** than the forward price.
- **Negative correlation** (typical for interest rate futures, whose prices fall when rates rise): the long receives cash when rates are low and pays when rates are high, so the **futures price is lower** than the forward price.

For exam purposes at this level, futures and forward prices are usually treated as equal unless the question signals a correlation.

### Other futures features
Exchanges can set **price limits** (maximum daily moves). If a limit is hit, trading may stop, which can prevent a trader from exiting. Most futures are closed out before expiry by taking an offsetting position rather than by delivery.

## Worked example
A trader buys one gold futures contract (100 ounces) at USD 1,900 per ounce. Initial margin is USD 8,000 and maintenance margin is USD 6,000. Settlement prices on the next three days are 1,885, 1,870 and 1,905. Track the margin account.

**Day 1.** Change = $(1{,}885 - 1{,}900) \times 100 = -1{,}500$. Balance $= 8{,}000 - 1{,}500 = 6{,}500$. Above 6,000, so no call.

**Day 2.** Change = $(1{,}870 - 1{,}885) \times 100 = -1{,}500$. Balance $= 6{,}500 - 1{,}500 = 5{,}000$. Below 6,000, so a margin call: deposit $8{,}000 - 5{,}000 = 3{,}000$ of variation margin. Balance after deposit: 8,000.

**Day 3.** Change = $(1{,}905 - 1{,}870) \times 100 = +3{,}500$. Balance $= 8{,}000 + 3{,}500 = 11{,}500$.

**Check.** Cumulative gain $= (1{,}905 - 1{,}900) \times 100 = 500$. Total deposited $= 8{,}000 + 3{,}000 = 11{,}000$; $11{,}500 - 11{,}000 = 500$.

**Answer: the trader must post USD 3,000 of variation margin on Day 2, and ends Day 3 with a balance of USD 11,500 and a cumulative gain of USD 500.**

## Common exam traps
- Topping the account up only to the maintenance margin. Variation margin restores the **initial** margin.
- Treating initial margin as a partial payment for the asset. It is collateral.
- Saying a futures contract accumulates value like a forward. Its value resets to zero after each settlement.
- Reversing the correlation rule. Positive correlation with rates makes futures **more** valuable, so futures prices exceed forward prices.
- Forgetting to multiply the price change by the contract size and the number of contracts.

## Key takeaways
- Futures are standardised, exchange-traded, cleared forwards settled daily through mark-to-market.
- A margin call is triggered below maintenance margin and requires a deposit back to initial margin.
- After each daily settlement, a futures position's value is zero; between settlements it equals the gain since the last settlement.
- Futures and forward prices are equal when rates are constant; positive correlation with rates makes futures prices higher, negative correlation makes them lower.
- Futures prices converge to the spot price at expiration.
