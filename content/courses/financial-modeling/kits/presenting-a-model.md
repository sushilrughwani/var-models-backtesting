---
title: "Presenting a Model and Investment Recommendation"
duration: 16
---

## Lecture outline
- 00:00 - Hook: a brilliant model with a confusing page loses to a simple model with a clear answer
- 02:00 - What the audience wants: recommendation, reasons, risks
- 04:00 - Live Excel: the Northwind dashboard and integrity checks
- 07:00 - Chart choice and message titles
- 09:00 - Rating rules and implied multiples at the target
- 12:00 - Writing the answer-first investment conclusion
- 14:00 - Exam traps and recap

## Slides
### Slide 1: The Model Is Evidence
- Readers want the answer, the reasons and the risks
- The dashboard is the argument
- Every claim points to a number

### Slide 2: Dashboard Blocks
- Headline: price, target, upside, rating
- Valuation, operating story, risk
- Integrity checks with a master error flag

### Slide 3: Linking, Not Typing
- `=Valuation!C45` style links only
- Updates with the scenario switch
- No inputs on the dashboard

### Slide 4: Chart for the Message
- Football field: value against price
- Revenue columns with margin line: operating story
- Heat-mapped grid and scenario bars: risk

### Slide 5: Titles That Conclude
- Not "Revenue" but "Revenue compounds at 4.7% to 2030"
- Units and axes labelled
- Remove clutter

### Slide 6: Rating by Rule
- Upside = target / price − 1
- `=IF(C8>0.1,"Buy",IF(C8<-0.1,"Sell","Hold"))`
- Northwind: 15.3% upside, Buy

### Slide 7: Implied Multiples at Target
- 52.08 m diluted shares at 31.71
- EV 1,964.5; 8.97x 2026E EBITDA
- P/E 14.7x: target does not need a premium multiple

### Slide 8: Risk-Reward
- Bear 26.09 (−5.1%)
- Bull 37.59 (+36.7%)
- Asymmetry supports the rating

### Slide 9: Answer-First Conclusion
- Rating and target in sentence one
- Thesis tied to drivers; valuation support
- Quantified risks and catalysts

### Slide 10: Traps
- No stated weights or rules
- Hard-coded dashboard numbers
- Hidden checks; buried recommendation

## Whiteboard examples
**Example 1 - Headline and rating.**
- Upside = 31.71 / 27.50 − 1 = 15.3%; rule gives Buy
- If the price rose to 30.00: 31.71 / 30.00 − 1 = 5.7%, rating Hold

**Example 2 - Implied multiples at target.**
- Diluted shares = 50.6 + 4.0 × (1 − 20/31.71) = 52.08 million
- Equity 1,651.5; EV = 1,651.5 + 313 = 1,964.5; EV/EBITDA = 1,964.5 / 219 = 8.97x
- EPS = 112.5 / 52.08 = 2.16; P/E = 31.71 / 2.16 = 14.7x

**Example 3 - KPI for the operating chart.**
- Revenue CAGR 2025-2030 = (1,484 / 1,180)^(1/5) − 1 = 4.69%
- EBIT margin 14.0% in 2026 to 15.0% in 2030

## Questions to ask students
- Why keep inputs off the dashboard? (To keep one source of truth and prevent accidental overwrites.)
- What should the first sentence of the conclusion contain? (The rating and target price.)
- Your target implies 12x EBITDA when peers trade at 9x. What do you do? (Revisit assumptions or justify the premium explicitly.)
- The balance check shows 3 million. Can you send the dashboard? (No, fix the model first.)
- Why quantify risks in per-share terms? (Readers can weigh them directly against the upside.)

## Analogies
- Courtroom: the model is the forensic lab; the dashboard and conclusion are the closing statement.
- A car dashboard: speed, fuel and warning lights, not the engine schematics.
- Newspaper headline: the reader should get the story even if they stop after the first line.

## Recording tips
- Show a cluttered dashboard first, then the cleaned version; the contrast teaches more than rules.
- Read the written conclusion aloud and point at each dashboard number it cites.
- Remind students the integrity flag is the first thing a reviewer looks at.
