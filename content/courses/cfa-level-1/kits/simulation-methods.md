---
title: "Simulation Methods"
duration: 22
---

## Lecture outline
- 00:00 - Hook: can a share price be normally distributed? What would a price of minus 20 mean?
- 02:00 - Lognormal distribution: bounded at zero, skewed right
- 05:00 - Continuously compounded returns and conversion to HPR
- 08:00 - Additivity and scaling with time (the square-root rule)
- 12:00 - Whiteboard: log returns from a price series and annual scaling
- 15:00 - Monte Carlo simulation: the five steps and a three-trial demo
- 19:00 - Bootstrap resampling and historical simulation
- 21:00 - Recap and exam traps

## Slides
### Slide 1: Prices are not normal
- Prices cannot go below zero
- Upside is unlimited, so the distribution is right-skewed
- Solution: model log returns as normal

### Slide 2: The lognormal distribution
- If ln X is normal, X is lognormal
- Bounded below by zero, right-skewed
- Mean price > median price

### Slide 3: Continuously compounded returns
- r = ln(PT / P0) = ln(1 + HPR)
- HPR = e^r − 1
- ln(1.08) = 7.70%: log return < HPR for gains

### Slide 4: Additivity
- Multi-period log return = sum of single-period log returns
- HPRs multiply; log returns add
- Makes modelling over time simple

### Slide 5: Scaling with time
- i.i.d. log returns: mean μT, variance σ²T
- Volatility scales with √T
- Weekly 2% → annual 2% × √52 = 14.42%

### Slide 6: Terminal price
- Median = P0 e^(μT)
- Mean = P0 e^(μT + σ²T/2)
- Right skew pushes the mean above the median

### Slide 7: Monte Carlo steps
- Specify the target quantity and the model
- Choose time steps and number of trials
- Draw random values, build paths, compute, repeat, summarise

### Slide 8: Monte Carlo pros and cons
- Handles complex, path-dependent, non-linear problems
- Output only as good as the assumed distribution
- Numbers, not insight; precision improves slowly

### Slide 9: Bootstrap resampling
- Sample with replacement from the observed data
- No distributional assumption
- Cannot exceed the range of observed outcomes

### Slide 10: Choosing a method
- Monte Carlo: inherits the analyst's assumptions
- Bootstrap and historical simulation: inherit the sample's quirks
- Combine with judgment and stress tests

## Whiteboard examples
**Example 1 - Log returns from prices.** Prices 50, 54, 51, 56.
- ln(54/50) = 7.70%; ln(51/54) = −5.72%; ln(56/51) = 9.35%.
- Sum = 11.33% = ln(56/50). HPR = e^0.1133 − 1 = 12.00%.
- Simple monthly HPRs (8.00%, −5.56%, 9.80%) sum to 12.24%, not 12%.

**Example 2 - Scaling.** Monthly log returns i.i.d. normal, mean 0.8%, σ = 4%.
- Annual mean = 9.6%; annual σ = 4% × √12 = 13.86%.
- Share at USD 100: median in one year = 100e^0.096 = 110.08; mean = 100e^(0.096 + 0.1386²/2) = 111.14.

**Example 3 - Three-trial Monte Carlo of a call (strike 105, one year).** Annual log return = 9.6% + z × 13.86%.
- z = 1.2: r = 26.23%, price = 129.99, payoff = 24.99.
- z = −0.5: r = 2.67%, price = 102.71, payoff = 0.
- z = 0.3: r = 13.76%, price = 114.75, payoff = 9.75.
- Average payoff = 34.74/3 = 11.58 (before discounting). Stress that three trials is far too few; real runs use thousands.

## Questions to ask students
- Why is a normal distribution unsuitable for share prices? (It allows negative prices and is symmetric, whereas prices are bounded at zero and right-skewed.)
- Convert a continuously compounded return of 10% into a holding period return. (e^0.10 − 1 = 10.52%.)
- Daily volatility is 1%. Annual volatility using 250 trading days? (1% × √250 = 15.81%.)
- What is one thing bootstrapping cannot do that Monte Carlo can? (Generate outcomes outside the historical range.)
- If the assumed distribution in a Monte Carlo is wrong, does running more trials help? (No; it just gives a more precise wrong answer.)

## Analogies
- Log returns are like distances on a road trip: you can add each leg. HPRs are like growth multipliers: you must multiply them.
- Monte Carlo is a flight simulator: you crash the plane thousands of times on screen to learn how likely a real crash is, but only if the simulator's physics are right.
- Bootstrapping is reshuffling a deck you already own: endless new hands, but never a card that is not in the deck.

## Recording tips
- Put the √T rule on screen in large type; scaling volatility linearly is the most common error.
- Show a quick histogram (pre-made) of simulated terminal prices to make the right skew visible.
- When demonstrating Monte Carlo, show the z-draws explicitly so students see where randomness enters.
