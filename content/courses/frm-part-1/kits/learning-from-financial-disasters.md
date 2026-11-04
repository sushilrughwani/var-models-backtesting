---
title: "Learning From Financial Disasters"
duration: 26
---

## Lecture outline
- 00:00 - Hook: the treasurer whose strategy was praised for years until one year of rate hikes bankrupted a county
- 02:00 - Framework: classify disasters by risk type and by failed defence
- 04:00 - Orange County: leverage plus duration
- 08:00 - Metallgesellschaft: a sound hedge that failed on funding
- 12:00 - LTCM: model risk, leverage and crowded trades
- 16:00 - Rogue traders: Barings, Sumitomo, Société Générale, London Whale
- 20:00 - Bankers Trust and conduct risk
- 22:00 - Whiteboard: leverage and equity loss; recap of lessons

## Slides
### Slide 1: The disaster pattern
- Strategy works for years and grows
- Leverage or position size rises
- Controls exist on paper, not in practice
- A shock exposes everything at once
### Slide 2: Orange County (1994)
- Pool of about USD 7.5bn levered to about USD 20bn via reverse repos
- Rate hikes in 1994: loss about USD 1.6bn
- County bankruptcy in December 1994
### Slide 3: Metallgesellschaft (1993)
- Long-term fixed-price supply contracts
- Hedged with rolled short-dated futures
- Falling prices plus contango: margin calls now, gains later
- Loss about USD 1.3bn when unwound
### Slide 4: LTCM (1998)
- Convergence trades, about 25:1 balance-sheet leverage
- Russian default: flight to liquidity, spreads widen
- About USD 3.6bn bank-funded recapitalization
### Slide 5: Model risk lessons
- Calm-period correlations fail in crises
- Crowded trades are illiquid at exit
- Stress tests over VaR for tail events
### Slide 6: Barings (1995)
- One trader ran front and back office
- Losses hidden in an error account
- Kobe earthquake; about GBP 830m loss, bank collapsed
### Slide 7: More rogue trading
- Sumitomo copper: about USD 2.6bn
- Société Générale: about EUR 4.9bn
- London Whale: about USD 6.2bn, VaR model change
### Slide 8: Bankers Trust (1994)
- Leveraged swaps sold to corporate clients
- Lawsuits and reputational damage
- Conduct and suitability risk
### Slide 9: Leverage arithmetic
- Equity return ≈ leverage × asset return
- 26.6x leverage: 2% asset fall costs 53% of equity
- Duration × leverage drives rate losses
### Slide 10: Cross-cutting lessons
- Segregation of duties and reconciliations
- Investigate unexplained profits
- Plan funding liquidity for hedges
- Culture: can risk managers say no?

## Whiteboard examples
**Example 1 - Orange County stylized.** Equity 7.5, assets 20.5 (USD bn), duration 2.8, rates +3%. Loss $= 2.8 \times 20.5 \times 0.03 = 1.722$. Share of equity $= 1.722/7.5 = 22.96\%$. Unlevered loss would be $2.8 \times 3\% = 8.4\%$; leverage 2.73x explains the gap.

**Example 2 - LTCM stylized.** Equity 4.7, assets 125. Leverage $= 26.6$. A 2% asset fall costs 2.5, or 53.2% of equity. Ask: what fall wipes out equity? $4.7/125 = 3.76\%$.

**Example 3 - Metallgesellschaft cash-flow logic.** Short forward supply contracts of 100 million barrels hedged with 100 million barrels of long near-month futures. Oil falls USD 5 per barrel: futures lose USD 500 million in margin now; customer contracts gain roughly the same in value but are paid over up to ten years. Net economic value about zero, but a USD 500 million cash need today.

## Questions to ask students
- Which disaster is the clearest example of funding liquidity risk? (Metallgesellschaft.)
- What single control would most likely have stopped Leeson? (Segregation of trading and settlement duties.)
- Why did LTCM's diversification fail? (Correlations across trades rose sharply in the flight to liquidity.)
- With leverage of 10x, what equity loss follows a 4% asset fall? (40%.)
- What warning sign is common to many rogue-trading cases? (Profits far larger than the stated low-risk strategy could produce.)

## Analogies
- Leverage is a magnifying glass: it makes gains look brilliant and focuses losses until something burns.
- Metallgesellschaft is a homeowner who insured the house perfectly but must pay premiums upfront and cannot - the cover is sound, the cash is not.
- A trader controlling both trading and settlement is a student marking their own exam.

## Recording tips
- Show a simple timeline graphic with year, firm, loss and risk type; it doubles as a revision sheet.
- Stress that the figures are approximate public estimates; exams test lessons and risk types, not exact amounts.
- Work the leverage arithmetic slowly - it is the one numeric skill this lesson tests.
