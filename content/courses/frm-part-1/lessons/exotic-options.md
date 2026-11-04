---
title: "Exotic Options"
---

## Learning goals
- Explain why exotic options exist and who uses them.
- Describe the payoffs of barrier, Asian, lookback, binary and compound options, along with other common exotics.
- Calculate exotic option payoffs along a given price path.
- Apply in-out parity for barrier options and price a cash-or-nothing option given the risk-neutral probability term.
- Compare the cost of exotics with otherwise similar vanilla options.

## Explanation

### Why exotics?
Plain European and American calls and puts are called **vanilla** options. **Exotics** change one or more features: how the payoff is calculated, when it starts, or whether it exists at all. Dealers create them to match a client's exact exposure, to cut hedging costs, to fit tax or accounting rules, or to express a precise view more cheaply than a vanilla option would.

### Path-independent variations
- **Packages**: portfolios of vanillas, forwards and cash, such as a **range forward** (long put plus short call, often zero cost).
- **Bermudan options**: exercisable only on specific dates, between European and American.
- **Gap options**: the payoff uses one strike $K_1$, but the trigger uses another $K_2$. A gap call pays $S_T - K_1$ when $S_T > K_2$.
- **Forward start options**: the strike is set at the money at a future date, as in many employee option plans. **Cliquets** are chains of them.
- **Compound options**: options on options (a call on a call, a put on a call, and so on). Two strikes and two exercise dates.
- **Chooser options**: after a set time, the holder chooses whether the option becomes a call or a put. Worth at least as much as either alone but less than a straddle.
- **Binary (digital) options**: a **cash-or-nothing call** pays a fixed amount $Q$ if $S_T > K$; an **asset-or-nothing call** pays $S_T$ if $S_T > K$. A vanilla call equals a long asset-or-nothing call minus a cash-or-nothing call paying $K$.
- **Exchange options**: the right to swap one asset for another. **Basket options**: payoff on a weighted portfolio, so value depends on correlations.

A cash-or-nothing call under risk-neutral valuation is worth
$$
\text{Value} = Q\,e^{-rT}\,N(d_2)
$$
where $N(d_2)$ is the risk-neutral probability that the call finishes in the money (from the Black-Scholes-Merton model, studied later).

### Path-dependent options
- **Barrier options** start (knock-in) or stop (knock-out) existing when the price crosses a barrier $H$. Varieties: up-and-out, up-and-in, down-and-out, down-and-in. They are cheaper than vanillas because the holder may end up with nothing. **In-out parity**: a knock-in and a knock-out with the same barrier, strike and expiry together equal the vanilla option:
$$
c_{\text{in}} + c_{\text{out}} = c_{\text{vanilla}}
$$
- **Asian options** pay on the **average** price over the life. An average-price call pays $\max(\bar S - K, 0)$; an average-strike call pays $\max(S_T - \bar S, 0)$. Averaging reduces volatility, so they are cheaper than vanillas and suit firms with steady streams of exposure, such as monthly currency receipts.
- **Lookback options** pay on the maximum or minimum price reached. A floating lookback call pays $S_T - S_{\min}$; a floating lookback put pays $S_{\max} - S_T$. A fixed lookback call pays $\max(S_{\max} - K, 0)$. They are expensive because they guarantee the best price.
- **Shout options**: the holder can "shout" once to lock in an intrinsic value as a minimum payoff.

### Volatility and variance swaps
These pay the difference between realised volatility (or variance) and a fixed strike, giving pure exposure to volatility without delta.

## Worked example
A stock starts at USD 100. Monthly closing prices over 6 months are 104, 110, 97, 92, 101 and 106 (the final price). Compute each payoff.

1. Vanilla call, $K = 100$: $106 - 100 = 6.00$.
2. Average: $(104 + 110 + 97 + 92 + 101 + 106)/6 = 610/6 = 101.67$.
3. Average-price call, $K = 100$: $101.67 - 100 = $ **1.67**.
4. Average-strike call: $106 - 101.67 = $ **4.33**.
5. Floating lookback call: $106 - 92 = $ **14.00**. Floating lookback put: $110 - 106 = $ **4.00**.
6. Fixed lookback call, $K = 100$: $110 - 100 = $ **10.00**.
7. Up-and-out call, $K = 100$, $H = 108$: the price touched 110 in month 2, so the option was knocked out: **0**. The matching up-and-in call pays **6.00**. Together they pay 6.00, the vanilla payoff, illustrating in-out parity.
8. Cash-or-nothing call paying USD 10 if $S_T > 100$: **10.00**.

**Pricing checks.** A down-and-in call costs 2.10 and the vanilla costs 5.60, so the matching down-and-out call costs $5.60 - 2.10 = $ **3.50**. A cash-or-nothing call paying USD 10 with $r = 4\%$, $T = 0.5$ and $N(d_2) = 0.55$ is worth $10e^{-0.02}(0.55) = $ **USD 5.39**.

## Common exam traps
- Forgetting in-out parity applies only when barrier, strike and expiry all match.
- Assuming barrier options are more expensive than vanillas; they are cheaper because they can disappear.
- Mixing up average-price and average-strike payoffs.
- Using $N(d_1)$ instead of $N(d_2)$ for a cash-or-nothing option, or forgetting to discount.
- Thinking Asian options are more expensive than vanillas; averaging lowers effective volatility and cost.

## Key takeaways
- Exotics tailor payoffs to precise hedging or investment needs, usually traded over the counter.
- Barrier options are cheaper than vanillas and obey knock-in + knock-out = vanilla.
- Asian options use averages and are cheaper; lookbacks use extremes and are more expensive.
- Binary options pay a fixed cash amount or the asset if they finish in the money; cash-or-nothing value is $Qe^{-rT}N(d_2)$.
- Compound, chooser, forward start, exchange and basket options add flexibility in timing, choice or underlying.
