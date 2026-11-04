---
title: "Market Efficiency"
---

## Learning goals
- Explain what an informationally efficient market is and distinguish market value from intrinsic value.
- Distinguish the weak, semi-strong and strong forms of efficiency and what each implies for technical analysis, fundamental analysis and insider information.
- Calculate abnormal and cumulative abnormal returns around an information event.
- Describe common market anomalies and explain why many may not be exploitable.
- Explain how behavioural finance challenges the assumption of fully rational investors.

## Explanation

### What efficiency means
A market is **informationally efficient** when prices adjust quickly and without bias to new information. In such a market the **market value** of a security (its traded price) is a good estimate of its **intrinsic value** (the value a well-informed investor with a full understanding of the asset would assign). You cannot consistently earn returns above what is fair for the risk taken, after costs, by trading on information that is already reflected in prices.

Efficiency does not mean prices are always right, or that nobody makes money. It means mispricings are unpredictable and too small, after trading costs, to exploit reliably. Paradoxically, markets become efficient *because* many analysts hunt for mispricings; if everyone gave up, prices would drift from value.

Factors that support efficiency include many active participants, rich and timely information disclosure, low trading costs and few limits on trading such as short-sale restrictions.

### The three forms
- **Weak form:** prices reflect all past market data (prices and volume). Technical analysis based on past prices should not earn abnormal returns.
- **Semi-strong form:** prices reflect all *public* information, including financial statements, news and announcements. Fundamental analysis of public data should not earn abnormal returns on average.
- **Strong form:** prices reflect all information, public *and private*. Even insiders could not profit. Evidence rejects this form: insiders who trade on material nonpublic information do earn abnormal returns (and doing so is illegal in most markets).

Each form nests the earlier one: semi-strong efficiency implies weak-form efficiency.

### Measuring abnormal returns
Tests of semi-strong efficiency use **event studies**. The abnormal return strips out the return the stock should have earned given its risk and the market's move:

$$
AR_t = R_t - E(R_t), \qquad E(R_t) = R_f + \beta\,(R_{m,t} - R_f)
$$

where $R_t$ is the stock's actual return, $R_f$ the risk-free rate, $\beta$ the stock's beta and $R_{m,t}$ the market return. Summing abnormal returns over an event window gives the **cumulative abnormal return** (CAR). In an efficient market, the price jumps on the announcement day and there is no predictable drift afterwards.

### Anomalies
Anomalies are patterns that appear to contradict efficiency:
- **Time-series:** calendar effects such as the January effect; momentum (recent winners keep winning) and overreaction (extreme losers rebound).
- **Cross-sectional:** the size effect (small firms outperforming) and the value effect (low P/E or low price-to-book stocks outperforming).
- **Other:** closed-end fund discounts and slow drift after earnings surprises.

Many anomalies fade once published, disappear after transaction costs, or reflect risk the model ignored. Finding a pattern by searching through many data sets (**data mining**) also produces false discoveries.

### Behavioural finance
Behavioural finance studies how psychological biases affect decisions. **Loss aversion** (losses hurt more than equal gains please), **overconfidence**, **herding** and **information cascades** can push prices away from value. Markets can still be efficient if rational arbitrageurs correct these errors, but limits to arbitrage (costs, risk and short-sale constraints) can let mispricing persist.

## Worked example
A firm with beta 1.2 announces surprise earnings. The daily risk-free rate is 0.01%. Returns (in %) around the announcement:

| Day | Stock | Market |
|---|---|---|
| −1 | 0.50 | 0.40 |
| 0 | 6.80 | 1.00 |
| +1 | 0.90 | −0.50 |

**Day −1:** $E(R) = 0.01 + 1.2(0.40 - 0.01) = 0.478\%$. $AR = 0.50 - 0.478 = 0.022\%$.

**Day 0:** $E(R) = 0.01 + 1.2(1.00 - 0.01) = 1.198\%$. $AR = 6.80 - 1.198 = 5.602\%$.

**Day +1:** $E(R) = 0.01 + 1.2(-0.50 - 0.01) = -0.602\%$. $AR = 0.90 - (-0.602) = 1.502\%$.

**CAR** $= 0.022 + 5.602 + 1.502 =$ **7.13%**.

Interpretation: almost nothing happens before the news (no sign of leakage), there is a large reaction on day 0, but a further 1.50% abnormal return on day +1. If such follow-through were systematic across many events, it would suggest prices adjust slowly, which conflicts with semi-strong efficiency. One event alone proves little.

## Common exam traps
- Saying that efficient markets mean prices never change or that active managers never outperform. Outperformance can happen by chance; it just cannot be expected consistently after costs.
- Mixing up the forms: past prices are weak form, public information is semi-strong, private information is strong.
- Forgetting that semi-strong efficiency implies weak-form efficiency, not the other way round.
- Computing abnormal return as stock return minus market return when a beta is given. Use the risk-adjusted expected return.
- Treating every anomaly as a profit opportunity; costs, risk and data mining often explain it.

## Key takeaways
- In an efficient market, prices quickly and fully reflect available information, so market value approximates intrinsic value.
- Weak form rules out profiting from past prices, semi-strong rules out profiting from public information, strong form rules out all information.
- Abnormal return = actual return − risk-adjusted expected return; event studies sum them into a CAR.
- Anomalies exist but are often small, unstable or explained by risk, costs and data mining.
- Behavioural biases can move prices, but arbitrage tends to limit how far and how long.
