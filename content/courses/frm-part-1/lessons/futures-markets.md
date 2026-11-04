---
title: "Futures Markets"
---

## Learning goals
- Describe the main elements of a futures contract specification and the role of the exchange and clearing house.
- Calculate daily gains and losses, margin account balances and variation margin calls.
- Find the futures price at which a margin call is triggered for long and short positions.
- Explain convergence, delivery, open interest and the differences between futures and forwards.

## Explanation

### Contract specifications
A futures contract is a standardised, exchange-traded forward. To make contracts interchangeable, the exchange specifies:
- **The asset**, including acceptable grades (for commodities) and any price adjustments for alternative grades.
- **Contract size** (for example 100 troy ounces of gold or 1,000 barrels of oil).
- **Delivery arrangements**: location, delivery months and the delivery period.
- **Price quotation, minimum tick, daily price limits and position limits** (limits curb speculative excess and manipulation).

Most futures are closed out before maturity by taking an offsetting position. Some, such as stock index futures, are **cash-settled**; others allow physical delivery, where the short party chooses when (within the period) and often what grade to deliver.

### Convergence
As the delivery period approaches, the futures price converges to the spot price. If futures were above spot during delivery, traders would buy spot, sell futures and deliver for a riskless profit; if below, buyers would take delivery cheaply. Arbitrage forces the two together.

### Daily settlement and margin
Futures positions are **marked to market** every day using the exchange's settlement price. Gains are credited to, and losses debited from, each trader's margin account, so the contract is effectively re-struck each day.

- **Initial margin** is deposited when the position is opened.
- **Maintenance margin** is a lower floor. If the balance falls below it, the trader receives a **margin call** and must deposit **variation margin** to bring the balance back to the *initial* margin level (not merely to maintenance).
- Balances above initial margin can be withdrawn.

For a single contract, a margin call is triggered when the cumulative loss exceeds initial minus maintenance margin:

$$
F_{\text{call, long}} = F_0 - \frac{IM - MM}{Q}, \qquad F_{\text{call, short}} = F_0 + \frac{IM - MM}{Q}
$$

where $F_0$ is the entry price, $IM$ and $MM$ are initial and maintenance margin per contract, and $Q$ is the contract size in units.

Brokers collect margin from clients; clearing members post margin with the exchange clearing house, which stands between all trades (exactly the CCP structure from the previous lesson).

### Volume and open interest
**Trading volume** counts contracts traded in a day. **Open interest** counts contracts outstanding (long positions, which equal short positions). A trade between two parties both opening positions raises open interest by one; a trade where both are closing reduces it by one; if one opens and the other closes, it is unchanged.

### Futures vs forwards

| Feature | Forward | Futures |
|---|---|---|
| Venue | OTC | Exchange |
| Terms | Customised | Standardised |
| Settlement | At maturity | Daily |
| Credit risk | Bilateral | Clearing house |
| Usual outcome | Delivery or cash at end | Closed out early |

### Orders
Common order types include market orders (execute now at the best price), limit orders (at a stated price or better), stop orders (become market orders once a price is touched, used to cap losses), stop-limit orders and fill-or-kill orders.

## Worked example
A trader buys two gold futures at USD 1,950 per ounce. Each contract covers 100 ounces. Initial margin is USD 6,000 and maintenance margin USD 4,500 per contract, so 12,000 and 9,000 for the position. Each USD 1 move changes the position's value by 2 × 100 = USD 200.

| Day | Settle | Daily gain | Balance before call | Margin call |
|---|---|---|---|---|
| 0 | 1,950 | | 12,000 | |
| 1 | 1,941 | −1,800 | 10,200 | 0 |
| 2 | 1,938 | −600 | 9,600 | 0 |
| 3 | 1,926 | −2,400 | 7,200 | 4,800 |
| 4 | 1,931 | +1,000 | 13,000 | 0 |
| 5 | 1,915 | −3,200 | 9,800 | 0 |

Steps:
1. Day 3: balance 7,200 < 9,000, so the trader must deposit 12,000 − 7,200 = **USD 4,800**, restoring 12,000.
2. Day 4: 12,000 + 1,000 = 13,000 (1,000 could be withdrawn).
3. Day 5: 13,000 − 3,200 = 9,800, still above 9,000, so no call.
4. Check: total loss = (1,915 − 1,950) × 200 = −7,000; ending balance = 12,000 + 4,800 − 7,000 = 9,800.

Trigger price: $1{,}950 - (6{,}000 - 4{,}500)/100 = 1{,}935$. Day 3 (1,926) is the first settlement below **USD 1,935**, consistent with the table.

## Common exam traps
- Topping up only to the maintenance level; variation margin restores the initial margin.
- Using the total position margin with the size of a single contract (or vice versa) in the trigger formula.
- Forgetting that a short position loses when futures prices rise.
- Thinking open interest rises with every trade; it depends on whether traders are opening or closing.
- Believing most futures end in delivery; most are closed out.

## Key takeaways
- Standardised specifications make futures liquid and interchangeable.
- Daily settlement converts gains and losses into cash each day.
- A margin call occurs below maintenance margin and must restore initial margin.
- Futures converge to spot as delivery approaches because of arbitrage.
- Open interest measures outstanding contracts; volume measures trading activity.
- The clearing house removes bilateral credit risk from futures trading.
