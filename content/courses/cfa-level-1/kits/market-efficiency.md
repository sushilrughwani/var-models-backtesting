---
title: "Market Efficiency"
duration: 22
---

## Lecture outline
- 00:00 - Hook: "If markets are efficient, why do analysts exist? And if they aren't, why do most funds lose to the index?"
- 02:00 - Definition of informational efficiency; market vs intrinsic value
- 05:00 - Factors that make markets more or less efficient
- 07:00 - Weak, semi-strong and strong forms and what each rules out
- 11:00 - Event studies: abnormal and cumulative abnormal returns (whiteboard example 1)
- 15:00 - Anomalies and why they are hard to exploit
- 18:00 - Behavioural finance and limits to arbitrage
- 21:00 - Recap and exam traps

## Slides
### Slide 1: The Efficiency Paradox
- Markets are efficient because people try to beat them
- If everyone indexed, prices would drift from value
- Efficiency = no consistent abnormal returns after costs
### Slide 2: Market Value vs Intrinsic Value
- Market value: the price you can trade at
- Intrinsic value: value with full understanding of the asset
- Efficient market: the two are close and gaps are unpredictable
### Slide 3: What Drives Efficiency
- Many active, informed participants
- Timely disclosure and low trading costs
- Few limits on trading (e.g. short-sale bans hurt)
### Slide 4: Three Forms
- Weak: past prices and volume
- Semi-strong: all public information
- Strong: public and private information
### Slide 5: Implications
- Weak form: technical analysis does not pay
- Semi-strong: fundamental analysis of public data does not pay on average
- Strong form fails: insiders profit (illegally)
### Slide 6: Abnormal Returns
- AR = actual return - expected return
- Expected return from CAPM: Rf + beta x (Rm - Rf)
- CAR = sum of ARs over the event window
### Slide 7: Reading an Event Study
- Efficient: jump on day 0, flat afterwards
- Drift before day 0: possible leakage
- Drift after day 0: slow adjustment
### Slide 8: Anomalies
- Calendar: January effect
- Momentum and overreaction
- Size and value effects; closed-end fund discounts
### Slide 9: Why Anomalies Fade
- Transaction costs and risk not captured by the model
- Data mining and publication
- Arbitrage once the anomaly is known
### Slide 10: Behavioural Finance
- Loss aversion, overconfidence, herding, information cascades
- Limits to arbitrage let errors persist
- Biases explain some anomalies

## Whiteboard examples
**Example 1 - event study.** Beta 1.2, daily risk-free 0.01%. Stock / market returns: day -1 0.50 / 0.40, day 0 6.80 / 1.00, day +1 0.90 / -0.50 (all %).
- Expected returns: 0.478, 1.198, -0.602.
- ARs: 0.022, 5.602, 1.502. CAR = 7.13%.
- Discussion: the day +1 abnormal return suggests some delayed reaction for this event.

**Example 2 - single-period abnormal return.** Stock return 7.2%, risk-free 0.3%, beta 1.3, market 4.0%.
- Expected = 0.3 + 1.3 x 3.7 = 5.11%. AR = 7.2 - 5.11 = 2.09%.
- Market-adjusted (wrong if beta is given): 7.2 - 4.0 = 3.20%.

## Questions to ask students
- A trader earns abnormal returns using moving-average crossovers. Which form of efficiency does that contradict? (Weak form.)
- If a market is semi-strong efficient, is it weak-form efficient? (Yes, public information includes past prices.)
- A stock rises 5% on a day the market rises 5% and its beta is 1. Is that abnormal? (No, roughly zero abnormal return.)
- Why might the size effect vanish after costs? (Small stocks have wider spreads and lower liquidity.)
- Name one reason mispricing caused by herding may persist. (Short-sale constraints or the risk and cost of arbitrage.)

## Analogies
- A crowded supermarket queue: if one checkout were much faster, shoppers would rush to it until all queues moved at about the same speed. That is efficiency - the edge disappears because people chase it.
- The three forms are like three levels of a spoiler: the weak form means the trailer is already known, semi-strong means the reviews are known, strong form means even the script is known.
- Data mining is like flipping 1,000 coins and announcing that coin 417 is "lucky" because it landed heads ten times in a row.

## Recording tips
- Draw the three event-study shapes (efficient jump, leakage, slow drift) on one chart; students recall pictures better than definitions.
- Stress repeatedly that efficiency is about expected abnormal returns after costs, not about prices being perfect.
- Keep behavioural finance brief here and point ahead to the portfolio management lesson on biases.
