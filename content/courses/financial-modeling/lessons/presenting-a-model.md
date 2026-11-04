---
title: "Presenting a Model and Investment Recommendation"
---

## Learning goals
- Design a one-page dashboard that summarises a model's key outputs and integrity checks.
- Choose the right chart for each message: football field, sensitivity grid, operating trends, scenarios.
- Translate a valuation into a rating with transparent, formula-driven rules.
- Write a concise investment conclusion that leads with the answer and states risks and catalysts.

## Explanation

### The audience does not want your model
Nobody reading your recommendation will open the debt schedule. They want to know three things: what you recommend, why, and what could make you wrong. The model is the evidence; the presentation is the argument. Think of it as a courtroom: the model is the forensic lab, and the dashboard and write-up are the closing statement to the jury.

### The dashboard
Build a separate Dashboard sheet that contains no inputs and no calculations beyond simple links. Typical blocks:
- **Headline**: current price, target price, upside, rating.
- **Valuation**: football field and the weighting that produced the target.
- **Operating story**: revenue, EBIT margin and FCFF over the forecast.
- **Risk**: WACC by growth sensitivity grid and scenario values.
- **Integrity**: balance sheet check, cash flow check and a master error flag. A dashboard that shows a value while the balance sheet is out by 3 million destroys trust.

Link every number, for example `=Valuation!C45`, so the dashboard updates when the scenario switch changes.

### Choosing charts
Match the chart to the message. A football field for "where does value sit against the price?"; a column chart of revenue with an EBIT margin line on a secondary axis for "how does the business evolve?"; a heat-mapped data table for "how sensitive is the answer?"; three bars for downside, base and upside. Label axes and units, remove gridline clutter, and give each chart a title that states the conclusion ("Value sits above the current price in every method except the 52-week range"), not just the topic.

### Ratings by rule
A rating should follow from the numbers, not mood:

$$
\text{Upside} = \frac{\text{Target price}}{\text{Current price}} - 1
$$

With a house rule of Buy above +10%, Sell below −10% and Hold in between, the Excel cell is `=IF(C8>0.1,"Buy",IF(C8<-0.1,"Sell","Hold"))`, where C8 holds the upside. Also show the implied multiples at your target price, so a reader can judge whether the target is sensible in market terms:

$$
EV_{\text{target}} = P_{\text{target}} \times N_{\text{diluted}} + \text{Net claims}
$$

where $N_{\text{diluted}}$ is diluted shares at the target price and net claims are the bridge items.

### Writing the conclusion
Use an answer-first structure: recommendation and target in the first sentence; then two or three thesis points tied to model drivers; then valuation support; then risks with their quantified impact; then catalysts that could close the gap. Keep it to half a page. Every claim should point to a number on the dashboard.

## Worked example
Northwind Components Ltd, USD. From earlier lessons: current price 27.50; target price 31.71 (60% DCF at 32.16, 40% comps median at 31.03); scenario values 26.09, 32.16 and 37.59; bridge items 313 million; 2026E EBITDA 219 million; 2026E net income 112.5 million; revenue 1,180 million in 2025 and 1,484 million in 2030; EBIT margin 15.0% in 2030.

**Step 1 - Headline.** Upside = 31.71 / 27.50 − 1 = 15.3%, so the rule returns **Buy**.

**Step 2 - Operating KPI.** Revenue CAGR 2025-2030 = (1,484 / 1,180)^(1/5) − 1 = 4.69%.

**Step 3 - Implied multiples at target.** Diluted shares at 31.71 = 50.6 + 4.0 × (1 − 20/31.71) = 52.08 million. Equity = 31.71 × 52.08 = 1,651.5; EV = 1,651.5 + 313 = 1,964.5. EV / 2026E EBITDA = 1,964.5 / 219 = 8.97x, inside the peer quartile range of 8.4x to 9.1x. P/E = 31.71 / (112.5 / 52.08) = 14.7x, just above the peer first quartile of 14.5x. The target does not require a premium multiple.

**Step 4 - Risk-reward.** Downside scenario 26.09 is −5.1% from the current price; upside scenario 37.59 is +36.7%. Upside to the bull case is about 7.2 times the loss to the bear case.

**Step 5 - The written conclusion.**

> We initiate on Northwind Components Ltd with a **Buy** rating and a target price of USD 31.71, 15.3% above the current 27.50. Revenue compounds at 4.7% to 2030 and EBIT margin widens from 14.0% to 15.0% as volumes grow over a largely fixed cost base, lifting FCFF from 108.75 million to 145.75 million. Our target blends a DCF (9.0% WACC, 2.5% terminal growth) with peer EV/EBITDA, and implies 8.97x 2026E EBITDA, in line with peers. Key risks: a 1.5-point margin shortfall cuts value to 26.09; each 0.5-point rise in WACC costs about 2.65 per share. Catalysts: the 2026 results confirming margin progress, and deleveraging toward the 25% target debt weight.

## Common exam traps
- Presenting a target with no stated method weights or rating rule.
- Charts titled by topic ("Revenue") rather than message.
- Hard-coded numbers on the dashboard that do not update with the scenario switch.
- Hiding failed integrity checks, or omitting them from the dashboard.
- Burying the recommendation at the end of a long narrative.

## Key takeaways
- The dashboard is the argument; the model is the evidence.
- Link every dashboard figure and include integrity checks.
- Pick each chart for one message and title it with the conclusion.
- Drive the rating with a formula and show implied multiples at the target.
- Northwind: Buy, target USD 31.71, 15.3% upside, 8.97x implied 2026E EV/EBITDA.
