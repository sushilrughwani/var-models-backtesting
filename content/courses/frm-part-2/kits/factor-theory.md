---
title: "Factor Theory and Factor Investing"
duration: 24
---

## Lecture outline
- 00:00 - Hook: why would anyone accept a lower average return for an asset? (Fire insurance on your house)
- 02:00 - Assets as bundles of factors; diversifiable versus priced risk
- 05:00 - Bad times and the discount factor; CAPM as the one-factor special case
- 09:00 - Macro factors: growth, inflation, volatility
- 12:00 - Style factors: value, size, momentum, low volatility; Fama-French model
- 16:00 - Whiteboard: three-factor expected return and alpha
- 19:00 - Rational versus behavioural explanations
- 21:00 - Implementation, exam traps and recap

## Slides
### Slide 1: Factors are to assets what nutrients are to food
- Investors want the underlying return drivers, not individual securities
- Each asset = bundle of factor exposures + idiosyncratic noise
- Noise diversifies away and earns nothing; factors cannot and are paid
### Slide 2: The bad-times principle
- A premium compensates for losing money when investors can least afford it
- Bad times: recessions, crashes, volatility spikes
- $E(R_i) - R_f = -R_f\,\text{cov}(m, R_i)$
### Slide 3: Insurance assets earn little
- Assets that pay off in crashes have negative premiums
- Long puts, long volatility, safe government bonds in a crisis
- Sellers of crash protection earn the premium
### Slide 4: CAPM as a one-factor model
- Only bad time: low market return
- Beta is the only priced risk
- Empirical failures motivate more factors
### Slide 5: Macroeconomic factors
- Growth: equities fall when growth slows
- Inflation: hurts nominal bonds and many equities
- Volatility: stocks fall as volatility rises; short-volatility earns a premium
### Slide 6: Style factors
- Size (SMB), value (HML), momentum (UMD)
- Low volatility / low beta anomaly
- Quality, term and credit factors in bonds
### Slide 7: Fama-French three-factor model
- $E(R_i) = R_f + \beta_i\,\text{MRP} + s_i\,E(SMB) + h_i\,E(HML)$
- Loadings come from time-series regressions
- Add momentum for the four-factor version
### Slide 8: Alpha after factors
- Alpha = realised return minus factor-implied return
- Large CAPM alpha can vanish after size and value
- Pay active fees only for true factor-adjusted alpha
### Slide 9: Why do premiums exist?
- Risk story: value firms are distressed and fragile in recessions
- Behavioural story: overextrapolation, glamour overpricing, limits to arbitrage
- Risk premiums persist; mispricings may be arbitraged away
### Slide 10: Implementing factor strategies
- Long-only tilt versus long-short pure factor
- Costs, turnover, shorting constraints, capacity and crowding
- Must survive long drawdowns: momentum crashes, value's lost decade

## Whiteboard examples
**Example 1: Three-factor expected return.** Risk-free 3%, MRP 6%, E(SMB) 2%, E(HML) 3%. Loadings β = 1.1, s = 0.4, h = -0.3.
- Market: 1.1 × 6% = 6.6%
- Size: 0.4 × 2% = 0.8%
- Value: -0.3 × 3% = -0.9%
- E(R) = 3% + 6.6% + 0.8% - 0.9% = 9.5%
- Realised 12% → three-factor alpha 2.5%; CAPM benchmark 9.6% → CAPM alpha 2.4%.

**Example 2: CAPM alpha that disappears.** Fund return 15%, risk-free 2%, market excess return 8%, β = 1.1, s = 0.6 with SMB = 4%, h = 0.7 with HML = 3%.
- CAPM required: 2% + 1.1 × 8% = 10.8% → CAPM alpha 4.2%
- Add size 0.6 × 4% = 2.4% and value 0.7 × 3% = 2.1% → required 15.3%
- Three-factor alpha = 15% - 15.3% = -0.3%. The "skill" was a small-value tilt.

## Questions to ask students
- Why does idiosyncratic risk earn no premium? (It can be diversified away at no cost, so no one needs to be paid to bear it.)
- Should a long put on the index have a high or low expected return? (Low or negative: it pays off in bad times, like insurance.)
- What does a negative HML loading mean? (The fund behaves like growth stocks and gives up the value premium.)
- If the value premium is behavioural, what might happen after it becomes widely known? (It may shrink as arbitrage capital moves in.)
- Why is momentum expensive to implement? (High turnover and transaction costs, plus crash risk.)

## Analogies
- Nutrients and food: you can get vitamin C from oranges or peppers; you care about the nutrient, not the fruit. Factors are the nutrients of returns.
- Insurance: a homeowner happily pays a premium (negative expected return) for a policy that pays out in disaster. Assets that pay off in bad times work the same way.
- Selling earthquake cover: you collect steady income for years, then pay out huge sums in one event. Short volatility and value strategies feel like this.

## Recording tips
- Spend real time on the bad-times principle; every other result in the lesson follows from it.
- Draw the regression of fund excess return on factor returns so students see loadings as slopes and alpha as the intercept.
- Show Example 2 on screen side by side with Example 1 to make the "CAPM alpha is often factor beta" point stick.
