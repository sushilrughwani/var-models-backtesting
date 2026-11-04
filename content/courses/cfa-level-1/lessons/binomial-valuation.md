---
title: "Valuing a Derivative Using a One-Period Binomial Model"
---

## Learning goals
- Build a one-period binomial tree for the underlying and calculate option payoffs at each node.
- Calculate the risk-neutral probability of an up move and use it to value calls and puts.
- Calculate the hedge ratio and construct a riskless portfolio that replicates an option.
- Explain why real-world probabilities and investors' risk preferences do not affect the option's no-arbitrage value.

## Explanation

### The simplest model that works
The binomial model assumes that over one period the underlying can move to only two prices: up to $S^+ = uS_0$ or down to $S^- = dS_0$, where $u > 1 + r > d$ are the up and down factors. That sounds unrealistic, but it captures the key insight of option pricing: if we can **replicate** the option with the underlying and a risk-free bond, the option's price follows from no-arbitrage, exactly as forwards did earlier in this module.

The condition $d < 1 + r < u$ is required. If the risk-free return were above $u$, everyone would lend and short the asset; if it were below $d$, everyone would borrow and buy it.

### Step 1: Payoffs at the end of the period
For a call with exercise price $X$: $c^+ = \max(0, S^+ - X)$ and $c^- = \max(0, S^- - X)$. For a put: $p^+ = \max(0, X - S^+)$ and $p^- = \max(0, X - S^-)$.

### Step 2: The hedge ratio
Combine a short call with $h$ shares so that the portfolio is worth the same in both states:

$$
h = \frac{c^+ - c^-}{S^+ - S^-}
$$

where $h$ is the number of shares per option (the option's delta over this period). Because the hedged portfolio is riskless, it must earn the risk-free rate. Equivalently, the option equals $h$ shares financed partly by borrowing:

$$
c_0 = hS_0 - \frac{hS^- - c^-}{1+r}
$$

For a put, $h$ is negative: you replicate a put by shorting shares and lending.

### Step 3: The risk-neutral shortcut
Rearranging the replication algebra gives a much faster formula:

$$
\pi = \frac{1 + r - d}{u - d}, \qquad c_0 = \frac{\pi c^+ + (1 - \pi)c^-}{1+r}
$$

where $\pi$ is the **risk-neutral probability** of an up move and $r$ is the risk-free rate per period. The same formula values a put using $p^+$ and $p^-$. The option is the expected payoff under $\pi$, discounted at the risk-free rate.

### Why real-world probabilities do not matter
Nowhere did we use the actual probability of an up move or the stock's expected return. Those are already reflected in today's price $S_0$. Since the option can be replicated, any investor, whatever their attitude to risk, must agree on its price. The risk-neutral probability is not a forecast; it is the probability that makes the underlying itself earn the risk-free rate in expectation: $\pi S^+ + (1 - \pi)S^- = S_0(1+r)$.

### Arbitrage if the price is wrong
If the market call price exceeds the model value, write the call and buy the replicating portfolio ($h$ shares, financed by borrowing). If it is below, buy the call and short the replica. The hedge ratio tells you exactly how many shares to trade.

## Worked example
A share trades at USD 50. Over one year it will either rise by a factor of 1.25 or fall by a factor of 0.80. The annual risk-free rate is 5%. Value a one-year European call and put, each with an exercise price of USD 50.

**Step 1: Tree.** $S^+ = 50 \times 1.25 = 62.50$; $S^- = 50 \times 0.80 = 40.00$.

**Step 2: Payoffs.** Call: $c^+ = 12.50$, $c^- = 0$. Put: $p^+ = 0$, $p^- = 10.00$.

**Step 3: Risk-neutral probability.** $\pi = (1.05 - 0.80)/(1.25 - 0.80) = 0.25/0.45 = 0.5556$.

**Step 4: Call value.** $c_0 = (0.5556 \times 12.50 + 0.4444 \times 0)/1.05 = 6.9444/1.05 = 6.6138$.

**Step 5: Check by replication.** $h = (12.50 - 0)/(62.50 - 40) = 0.5556$. Cost of shares $= 0.5556 \times 50 = 27.7778$. Borrow $(0.5556 \times 40 - 0)/1.05 = 21.1640$. Call $= 27.7778 - 21.1640 = 6.6138$.

**Step 6: Put value.** $p_0 = (0.5556 \times 0 + 0.4444 \times 10)/1.05 = 4.2328$. Hedge ratio for the put $= (0 - 10)/22.50 = -0.4444$.

**Step 7: Parity check.** $c_0 - p_0 = 2.3810$ and $S_0 - X/1.05 = 50 - 47.6190 = 2.3810$.

**Answer: the call is worth USD 6.61, the put USD 4.23, and the call's hedge ratio is 0.556 shares per option.**

## Common exam traps
- Using the real-world probability of an up move instead of the risk-neutral probability.
- Forgetting to discount the expected payoff at the risk-free rate.
- Inverting the hedge ratio: it is change in option value divided by change in share price, not the reverse.
- Writing $\pi = (u - 1 - r)/(u - d)$, which is the down-move probability $1 - \pi$.
- Thinking a higher expected return on the stock raises the call's value in this model. It does not.

## Key takeaways
- A one-period tree has two terminal prices, $uS_0$ and $dS_0$, with $d < 1 + r < u$.
- Hedge ratio $h = (c^+ - c^-)/(S^+ - S^-)$ makes a share-option portfolio riskless.
- Risk-neutral probability $\pi = (1 + r - d)/(u - d)$; option value = $\pi$-weighted payoff discounted at $r$.
- Replication and risk-neutral valuation give the same answer, and the result satisfies put-call parity.
- Real-world probabilities and risk preferences do not enter the no-arbitrage option price.
