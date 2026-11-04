---
title: "Liquidity Risk Fundamentals"
---

## Learning goals
- Distinguish funding liquidity risk from market liquidity risk.
- Explain how the two interact through loss spirals and margin spirals.
- Describe the dimensions of market liquidity: tightness, depth and resiliency.
- Calculate liquidity-adjusted VaR using constant and stochastic bid-ask spreads.

## Explanation

### Two kinds of liquidity
"Liquidity" means two related but different things:

- **Funding liquidity** is the ability of an institution to meet its cash obligations when they fall due - repay depositors, roll over wholesale funding, post margin - without unacceptable cost. **Funding liquidity risk** is the risk that it cannot.
- **Market liquidity** is the ability to buy or sell an asset quickly, in size, without moving its price much. **Market liquidity risk** is the risk that this ability evaporates, so positions can only be sold at a deep discount.

Banks are in the business of **maturity and liquidity transformation**: they fund long-term, illiquid loans with short-term, liquid deposits. That is socially useful, but it means a bank is never fully liquid - it relies on depositors and lenders not all asking for their money back at once.

### Dimensions of market liquidity
- **Tightness** - the cost of a round trip, measured by the bid-ask spread.
- **Depth** - how much can be traded at current prices before the price moves.
- **Resiliency** - how quickly prices bounce back after a large trade.

A market can look tight in calm times (narrow spreads) yet be shallow, so a large order still has large price impact. Liquidity is also **endogenous**: it depends on the size of your position relative to the market. Selling 1% of daily volume is easy; selling 300% takes days and moves the price against you.

### How the two interact: liquidity spirals
Funding and market liquidity reinforce each other, especially in stress:

- **Loss spiral.** A leveraged investor suffers losses; to keep leverage stable it sells assets; the sales push prices down; lower prices cause further losses and more sales.
- **Margin (haircut) spiral.** As volatility and uncertainty rise, lenders raise haircuts and margins. Higher haircuts force borrowers to deleverage, which depresses prices, raises volatility and causes lenders to raise haircuts again.

The result: assets that were liquid become illiquid exactly when everyone needs to sell, and funding that was available disappears exactly when it is needed. This is why liquidity risk is often called a **low-probability, high-impact** risk that is invisible in normal-times data.

### Measuring the cost of liquidation: liquidity-adjusted VaR
Standard VaR assumes positions can be sold at the mid price. In reality, selling costs half the bid-ask spread. With a constant relative spread $s$:

$$
\text{LVaR} = \text{VaR} + \tfrac{1}{2} \, s \, P
$$

where $P$ is the position value and $s = (\text{ask} - \text{bid})/\text{mid}$. Because spreads widen in stress, a more prudent version uses a stressed spread:

$$
\text{LVaR} = \text{VaR} + \tfrac{1}{2} \, (\mu_s + z \, \sigma_s) \, P
$$

where $\mu_s$ and $\sigma_s$ are the mean and standard deviation of the relative spread and $z$ is the confidence multiplier (for example 2.33 for 99%). This only captures the **exogenous** cost; if the position is large relative to market depth, an extra **endogenous** price-impact cost or a longer liquidation horizon must be added.

### Funding liquidity measures
Funding liquidity is assessed with cash-flow **maturity ladders** (contractual and behavioural inflows and outflows by time bucket), **liquidity gaps**, the stock of unencumbered liquid assets and the **survival horizon** under stress - topics developed in the later lessons on Basel ratios and stress testing.

## Worked example
A trader holds a USD 50 million equity position with a 1-day 99% VaR of USD 2.1 million. The average relative bid-ask spread is 0.8%, with a standard deviation of 0.4%.

**Constant spread:**
1. Liquidation cost $= 0.5 \times 0.008 \times 50 = 0.20$.
2. LVaR $= 2.1 + 0.20 = 2.30$, so USD 2.30 million.

**Stochastic spread (99%, z = 2.33):**
1. Stressed spread $= 0.008 + 2.33 \times 0.004 = 0.01732$, or 1.732%.
2. Liquidation cost $= 0.5 \times 0.01732 \times 50 = 0.433$.
3. LVaR $= 2.1 + 0.433 = 2.533$, so **USD 2.53 million**.

The liquidity adjustment raises the risk estimate by about 21% $(0.433 / 2.1)$. If the position were also many times daily volume, the true cost would be higher still because of endogenous price impact.

## Common exam traps
- Using the full spread instead of half the spread; selling at the bid costs only half the round trip relative to mid.
- Treating funding liquidity and market liquidity as the same thing; one is about the institution's cash, the other about the asset's tradability.
- Forgetting that spreads widen in stress, so a constant average spread understates the liquidity cost.
- Ignoring position size: exogenous spread measures do not capture price impact from selling large blocks.
- Assuming liquidity risk shows up in normal-times data; it is largely a tail phenomenon.

## Key takeaways
- Funding liquidity is the ability to pay obligations; market liquidity is the ability to trade assets without large price impact.
- Market liquidity has three dimensions: tightness, depth and resiliency.
- Loss spirals and margin spirals link the two and make liquidity vanish in stress.
- LVaR adds half the (possibly stressed) spread times position value to VaR.
- Large positions also need endogenous price-impact or longer-horizon adjustments.
