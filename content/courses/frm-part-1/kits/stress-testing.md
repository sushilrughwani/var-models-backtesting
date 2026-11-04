---
title: "Stress Testing"
duration: 22
---

## Lecture outline
- 00:00 - Hook: in 2007 many banks' VaR looked comfortable weeks before the crisis. What question were they not asking?
- 02:00 - Why stress test: limits of VaR and ES, stressed VaR
- 05:00 - Four types: sensitivity, historical, hypothetical, reverse
- 09:00 - Designing good scenarios: severe but plausible, all risks, second-round effects
- 11:00 - Capital impact formula: losses, PPNR, stressed RWA
- 13:00 - Whiteboard: post-stress CET1 ratio and reverse stress test
- 17:00 - Governance: board, senior management, independent review, integration
- 20:00 - Exam traps and recap

## Slides
### Slide 1: Stress Testing
- What if something severe but plausible happens?
- Complements VaR and expected shortfall
- Types, capital impact, governance

### Slide 2: Why VaR Is Not Enough
- Based on recent data and a model
- Misses correlation breakdowns and liquidity spirals
- Stressed VaR: VaR on a 12-month stress period

### Slide 3: Sensitivity Analysis and Historical Scenarios
- Sensitivity: one factor at a time (e.g. +200bp)
- Historical: replay a past crisis on today's book
- Simple and credible, but limited

### Slide 4: Hypothetical and Reverse Stress Tests
- Hypothetical: expert-built forward-looking stories
- Reverse: start from failure, find the scenario
- Reveal hidden vulnerabilities

### Slide 5: Designing Scenarios
- Severe yet plausible
- All material risks: credit, market, liquidity, operational
- Second-round effects; multi-year horizon

### Slide 6: Capital Impact
- Post-stress ratio = (CET1 − losses + PPNR) / stressed RWA
- RWA usually rise under stress
- Compare with minimum plus buffers

### Slide 7: Governance Roles
- Board: approves, challenges, uses results
- Senior management: runs programme, acts on results
- Independent review: validation and audit

### Slide 8: Making It Count
- Integrate with capital and liquidity planning
- Document, refresh scenarios, report limitations
- Avoid box-ticking

### Slide 9: Exam Traps
- Use stressed RWA, include PPNR
- Reverse stress test works backwards from failure
- Board oversees; management operates

### Slide 10: Recap
- Stress tests ask "what if" beyond the data
- Four types, one capital formula
- Governance turns results into decisions

## Whiteboard examples
**Example 1: Post-stress ratio.** CET1 = USD 50bn, RWA = 400bn. Credit losses 18bn, trading losses 4bn, PPNR 6bn, RWA +10%.
- Starting ratio = 12.5%.
- Post-stress CET1 = 50 − 18 − 4 + 6 = 34bn.
- Stressed RWA = 440bn. Ratio = 34 / 440 = 7.73%.
- Common error: 34 / 400 = 8.5% (forgets RWA inflation).

**Example 2: Reverse stress test.** Same bank; which credit loss pushes CET1 to 4.5%?
- Required CET1 = 0.045 × 440 = 19.8bn.
- 50 − 4 + 6 − L = 19.8, so L = 32.2bn.
- That is about 1.8 times the recession scenario's credit losses.

## Questions to ask students
- Why might a historical scenario understate risk today? (The portfolio and the next crisis differ from the past.)
- What makes reverse stress testing useful? (It forces the firm to identify what would break it, exposing blind spots.)
- Why do RWA rise in a downturn? (Downgrades and higher PDs raise risk weights.)
- Who should approve the key stress scenarios? (The board, after management proposes them.)
- What is stressed VaR? (VaR calculated on data from a 12-month stress period.)

## Analogies
- VaR is the weather forecast; stress testing is the hurricane drill.
- A reverse stress test is like a structural engineer asking how much weight would collapse the bridge, rather than checking it holds today's traffic.
- Governance is the fire safety plan: a drill is worthless if nobody changes anything after discovering the exits are blocked.

## Recording tips
- Build the capital waterfall as a bar chart: starting CET1, minus losses, plus PPNR, ending CET1.
- Emphasise the denominator: stressed RWA is the most commonly missed adjustment.
- Use the reverse test to show how stress results lead to concrete management actions.
