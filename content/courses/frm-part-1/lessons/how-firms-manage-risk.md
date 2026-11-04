---
title: "How Do Firms Manage Financial Risk?"
---

## Learning goals
- Describe the four basic responses to a risk: retain, avoid, mitigate and transfer.
- Explain why hedging can add value even though shareholders could diversify on their own.
- Calculate the expected tax saving that hedging produces under a convex tax schedule.
- Explain the role and contents of a risk appetite statement.
- Evaluate practical pitfalls of hedging programmes, including accounting and operational issues.

## Explanation

### Four ways to respond to a risk
Once a risk has been identified and measured (see the previous lesson), management chooses a response:

- **Retain (accept)**: keep the risk because it is small, cheap to absorb or part of the firm's core business. A bank retains credit risk on its loan book because earning a spread on it is its business.
- **Avoid**: do not take the exposure at all, for example by exiting a country or refusing a product line.
- **Mitigate**: reduce the probability or size of loss with controls, collateral, limits or diversification.
- **Transfer**: pass the risk to someone else through insurance, derivatives (forwards, futures, swaps, options) or securitisation.

The choice is not binary. A firm may retain the first slice of a risk, transfer the middle and avoid the extreme.

### Should a firm hedge at all?
In a perfect market with no taxes, no bankruptcy costs and no information gaps, hedging cannot create value. Shareholders can diversify or hedge in their own portfolios, so a firm spending money to do it for them adds nothing. This is the Modigliani-Miller style argument.

Real markets have frictions, and these give hedging its value:

1. **Convex taxes**: with progressive tax rates or loss-carryforward limits, volatile profits pay more tax on average than stable profits with the same mean.
2. **Costs of financial distress**: hedging lowers the chance of hitting a bad state where the firm loses customers, pays high borrowing costs or goes bankrupt. It can also raise debt capacity.
3. **Underinvestment**: a firm that hedges keeps internal cash available for good projects in bad years instead of relying on expensive external finance.
4. **Managerial and informational reasons**: earnings driven by commodity prices or FX are noisy signals of management quality; hedging makes performance easier to judge.

Against this, hedging costs money (spreads, option premiums, staff and systems), can create liquidity strains through margin calls on futures, may cause accounting volatility if hedge accounting is not achieved, and can turn into speculation if poorly governed.

### Tax convexity in one formula
If tax $T(\cdot)$ is a convex function of earnings $X$, Jensen's inequality gives

$$
E[T(X)] \ge T(E[X])
$$

so locking earnings at their expected value (perfect hedging) reduces expected tax. The saving is $E[T(X)] - T(E[X])$.

### The risk appetite statement
Hedging decisions need an anchor. The **risk appetite statement (RAS)** is a board-approved document that sets how much and what kind of risk the firm is willing to take in pursuit of its strategy. A good RAS:

- links to strategy and capital (for example, a target credit rating or a minimum capital ratio);
- mixes quantitative limits (earnings-at-risk, VaR, concentration limits) with qualitative statements (zero tolerance for regulatory breaches);
- cascades into business-line limits that traders and managers can monitor;
- is reviewed regularly and tied to escalation when limits are breached.

**Risk capacity** is the maximum risk the firm could bear before failing; **risk appetite** is the smaller amount it chooses to take; **limits** translate appetite into day-to-day controls.

### Choosing instruments
Forwards and swaps lock in a price but give up upside. Options protect the downside while keeping upside, at the cost of a premium. Static hedges are set and left; dynamic hedges are rebalanced and require more monitoring. Firms must also decide whether to hedge accounting exposure, cash flows or economic value, and these can point in different directions.

## Worked example
**Part A - Tax convexity.** A company will earn either USD 20 million or USD 80 million next year, each with probability 50%. Tax is 20% on earnings up to 50 million and 40% on earnings above that. A perfect hedge would fix earnings at the expected 50 million.

1. Tax if earnings are 20m: $0.20 \times 20 = 4$m.
2. Tax if earnings are 80m: $0.20 \times 50 + 0.40 \times 30 = 10 + 12 = 22$m.
3. Expected tax unhedged: $(4 + 22)/2 = 13$m.
4. Tax hedged at 50m: $0.20 \times 50 = 10$m.
5. Expected tax saving: $13 - 10 =$ **USD 3 million**, so expected after-tax earnings rise from 37m to 40m.

**Part B - Transfer with a forward.** A US exporter will receive EUR 5 million in six months. The six-month forward rate is 1.10 USD per EUR. If it sells EUR forward, it receives $5{,}000{,}000 \times 1.10 =$ **USD 5.5 million** regardless of the future spot rate. Unhedged, it would receive 5.1m at a spot of 1.02 or 5.9m at a spot of 1.18. The hedge removes both the downside and the upside.

## Common exam traps
- Claiming hedging always adds value. In frictionless markets it does not; value comes from taxes, distress costs and underinvestment.
- Judging a hedge by whether the derivative made money. A forward that loses money while the underlying exposure gains is working as intended.
- Ignoring the liquidity cost of futures hedges: daily margin calls can drain cash even if the hedge is economically sound.
- Confusing risk capacity (maximum bearable) with risk appetite (amount chosen).
- Forgetting the probability weighting when computing the expected tax saving.

## Key takeaways
- The four responses are retain, avoid, mitigate and transfer; most firms combine them.
- Hedging adds value only because of market frictions: convex taxes, distress costs, underinvestment and information problems.
- With convex taxes, expected tax falls when earnings are stabilised.
- The board-approved risk appetite statement links strategy, capital and limits.
- Hedges have costs: premiums, margin liquidity, accounting effects and governance risk.
