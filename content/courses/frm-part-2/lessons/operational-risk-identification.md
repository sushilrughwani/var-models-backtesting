---
title: "Risk Identification and Assessment"
---

## Learning goals
- Explain how a risk and control self-assessment (RCSA) moves from inherent to residual risk.
- Design key risk indicators (KRIs) with sensible thresholds and distinguish leading from lagging indicators.
- Describe the role of internal loss data, external loss data and near misses.
- Calculate the expected annual loss implied by a set of scenario estimates and identify biases in scenario workshops.

## Explanation

### Why several tools are needed
No single source tells you everything about operational risk. Internal loss data is objective but backward-looking and thin in the tail. Expert judgement is forward-looking but subjective. A good framework therefore triangulates four inputs: **RCSA**, **KRIs**, **loss data** and **scenario analysis**. Where they disagree is exactly where the second line should dig.

### Risk and control self-assessment
In an RCSA, each business unit lists the risks in its processes, rates them before controls (**inherent risk**), evaluates the design and operating effectiveness of the controls, and rates what remains (**residual risk**). A common scoring grid is:

$$
\text{Risk score} = \text{Likelihood} \times \text{Impact}
$$

where likelihood and impact are each rated on a 1-5 scale, so scores run from 1 to 25. Effective preventive controls mainly reduce likelihood; detective and corrective controls (and insurance) mainly reduce impact. Residual risk is then compared with appetite: accept, add controls, transfer or exit.

RCSAs are cheap and cover every process, but they suffer from optimism: owners tend to rate their own controls as effective. That is why the second line challenges ratings using loss data, audit findings and KRI trends.

### Key risk indicators
A KRI is a metric that signals a change in risk exposure, ideally *before* losses occur. Examples: staff turnover in operations, number of unreconciled items, system downtime minutes, overdue patching, failed trades.

- **Leading** indicators move before losses (e.g. vacancy rate in a control team).
- **Lagging** indicators record what already happened (e.g. number of losses last month).

Each KRI gets thresholds - typically green, amber and red - with a named owner and a defined escalation when a threshold is crossed. Good KRIs are measurable, linked to a specific risk in the RCSA, and comparable over time.

### Loss data and near misses
**Internal loss data** records each event with date of occurrence, discovery and accounting, gross loss, recoveries and event type. A collection threshold (for example USD 20,000) keeps volumes manageable, but very low thresholds capture useful high-frequency patterns. **Near misses** (an error caught before money was lost) and **gains** from operational errors are worth recording because they reveal control weaknesses for free.

**External loss data** from consortia and public sources fills the tail: events too rare to appear in one firm's history. It must be scaled and filtered for relevance, because a loss at a much larger bank with a different business mix is not directly comparable.

### Scenario analysis
Scenario analysis asks experts to imagine severe but plausible events - a major cyberattack, a rogue trader, a failure at a critical vendor - and estimate how often they could happen and how much they would cost. If a scenario has annual frequency $\lambda$ and severity $S$:

$$
\text{Expected annual loss} = \sum_{i} \lambda_i \, S_i
$$

where $\lambda_i$ is the expected number of events per year for scenario $i$ and $S_i$ is its loss per event. A "1-in-20-year" event has $\lambda = 1/20 = 0.05$.

Workshops are vulnerable to well-known biases:
- **Anchoring** on the first number mentioned.
- **Availability** - overweighting events that were recently in the news.
- **Groupthink** and dominance by the most senior participant.
- **Overconfidence**, producing ranges that are too narrow.

Mitigants include a trained independent facilitator, collecting individual estimates before discussion, benchmarking against external loss data and documenting the rationale.

## Worked example
**Part A - RCSA.** The payments team rates the risk of a payment sent to the wrong beneficiary. Inherent likelihood 4, inherent impact 5: inherent score $4 \times 5 = 20$ (high). A four-eyes check and automated name-matching reduce likelihood to 2; impact is unchanged at 5. Residual score $2 \times 5 = 10$. If appetite allows residual scores up to 12, the risk is **within appetite at a residual score of 10**.

**Part B - Scenarios.** A workshop produces three scenarios (USD million):

| Scenario | Frequency per year | Severity | $\lambda \times S$ |
|---|---|---|---|
| Large processing error | 0.25 (1 in 4 years) | 8 | 2.0 |
| Ransomware outage | 0.05 (1 in 20 years) | 60 | 3.0 |
| Major mis-selling case | 0.02 (1 in 50 years) | 150 | 3.0 |

Expected annual loss $= 0.25 \times 8 + 0.05 \times 60 + 0.02 \times 150 = 2 + 3 + 3$, which is **USD 8 million per year**. Notice that the two tail scenarios contribute 75% of the expected loss even though they are rare - and their contribution to capital (unexpected loss) would be larger still.

## Common exam traps
- Confusing inherent risk (before controls) with residual risk (after controls).
- Calling a monthly loss count a leading indicator; it is lagging.
- Converting "1-in-20 years" into a frequency of 20 instead of 0.05.
- Assuming external loss data can be used without scaling for size and business mix.
- Ignoring near misses because no money was lost; they are valuable evidence of control gaps.

## Key takeaways
- Triangulate RCSA, KRIs, loss data and scenarios; disagreements between them flag issues.
- RCSA rates inherent risk, control effectiveness and residual risk, then compares residual risk with appetite.
- KRIs need owners, thresholds and escalation; leading indicators are the most valuable.
- Internal data is objective but thin in the tail; external data and scenarios fill the tail.
- Scenario expected loss is the sum of frequency times severity; workshop biases must be actively managed.
