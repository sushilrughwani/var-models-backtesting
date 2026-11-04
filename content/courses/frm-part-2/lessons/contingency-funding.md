---
title: "Liquidity Stress Testing and Contingency Funding"
---

## Learning goals
- Design liquidity stress scenarios (idiosyncratic, market-wide and combined) and choose realistic behavioural assumptions.
- Calculate counterbalancing capacity after haircuts and the survival horizon under stress.
- Describe the components of a contingency funding plan (CFP), including early warning indicators and escalation.
- Explain why CFPs must be tested and how reverse stress testing complements standard scenarios.

## Explanation

### Beyond the regulatory ratio
The LCR is one standardised 30-day scenario with fixed run-off rates. A bank's own liquidity risk can look very different: its depositors may be more concentrated, its collateral more exposed to downgrades, its funding more reliant on one currency. Internal **liquidity stress testing** tailors scenarios to the bank's actual vulnerabilities and feeds directly into the **contingency funding plan** - the playbook for what to do when stress arrives.

### Building stress scenarios
Scenarios usually include:
- **Idiosyncratic** - a bank-specific shock: a rating downgrade, a large fraud or loss, negative press.
- **Market-wide** - a systemic event: a market freeze, a sovereign crisis, a sharp rate shock.
- **Combined** - both at once, typically the most severe.

Each is run over several horizons (overnight, one week, one month, three months and longer) because different funding sources run at different speeds. Key behavioural assumptions:
- Run-off of retail and corporate deposits, higher for uninsured and concentrated balances (social media and mobile banking can make runs much faster than historical data suggest).
- Non-rollover of maturing wholesale funding and commercial paper.
- Drawdowns on committed credit and liquidity lines given to customers.
- **Collateral calls** from derivatives margin and rating-downgrade triggers.
- Wider haircuts and lower prices on assets the bank plans to sell or repo.
- Intraday liquidity needs and trapped liquidity in other legal entities or currencies.

### Counterbalancing capacity and survival horizon
The bank's **counterbalancing capacity (CBC)** is the cash it can raise from unencumbered assets after stressed haircuts, plus any reliable committed funding:

$$
\text{CBC} = \text{Cash} + \sum_j \text{MV}_j \times (1 - h_j)
$$

where $\text{MV}_j$ is the market value of asset $j$ and $h_j$ its stressed haircut. The stress test builds a **cumulative net cash flow** profile over time and compares it with the CBC. The **survival horizon** is the time until cumulative net outflows exhaust the CBC:

$$
\text{Survival horizon} = \min\{\,t : \text{CBC} - \text{Cumulative net outflow}(t) < 0\,\}
$$

Boards set a minimum survival horizon in the risk appetite, for example at least 30 days in a combined scenario and 90 days in an idiosyncratic one.

**Reverse stress testing** works backwards: what scenario would exhaust the buffer in, say, two weeks? This uncovers vulnerabilities (a single large depositor, a margin call cluster) that forward scenarios might miss.

### The contingency funding plan
A CFP sets out in advance how the bank will respond to a liquidity stress. Core components:

- **Governance** - who declares a liquidity event, who sits on the crisis team (treasury, risk, finance, communications, business heads), and decision rights.
- **Early warning indicators (EWIs)** - internal (deposit outflows, rising funding costs, drawdowns, concentration) and external (CDS spread, share price, rating outlook, market spreads), each with thresholds.
- **Escalation stages** - for example normal, heightened monitoring, and crisis, with defined actions at each stage.
- **Funding actions** - a ranked menu of sources and actions with size, timing and cost: repo of HQLA, sale of liquid assets, drawing committed lines, slowing asset growth, raising deposit rates, securitisation, and central bank facilities as a last line. Actions are ranked by speed, certainty and reputational impact.
- **Communication** - consistent messages to staff, clients, markets, rating agencies and supervisors; poor communication can itself trigger a run.
- **Testing and maintenance** - regular simulations and test transactions (for example, actually repoing collateral or test-drawing central bank facilities) to confirm the plan works operationally.

## Worked example
A bank has HQLA-equivalent counterbalancing capacity of USD 1,200 million after stressed haircuts. In a combined scenario, week 1 outflows are wholesale non-rollover of 40% on USD 500 million (200) plus retail run-off of 3% on USD 5,000 million (150) = 350. Weekly net outflows then slow: 250, 200, 180, 150 and 120 in weeks 2-6.

| Week | Net outflow | Cumulative | CBC remaining |
|---|---|---|---|
| 1 | 350 | 350 | 850 |
| 2 | 250 | 600 | 600 |
| 3 | 200 | 800 | 400 |
| 4 | 180 | 980 | 220 |
| 5 | 150 | 1,130 | 70 |
| 6 | 120 | 1,250 | -50 |

The buffer is exhausted during week 6; by linear interpolation $5 + 70/120 = 5.58$ weeks. The **survival horizon is about 5 weeks (roughly 39 days)**. If the board's appetite requires 8 weeks, the bank must enlarge its buffer, lengthen wholesale funding or reduce concentration - and its CFP should list actions (repo of additional collateral, slowing loan growth) that could extend survival while the stress unfolds.

## Common exam traps
- Valuing the counterbalancing capacity at market value without stressed haircuts, or including encumbered assets.
- Using a single horizon; liquidity stress plays out differently over days, weeks and months.
- Forgetting off-balance-sheet drains: committed line drawdowns and downgrade-triggered collateral calls.
- Treating central bank borrowing as the first funding action; it is usually a last resort with stigma.
- Assuming a CFP is complete on paper; untested plans often fail operationally.

## Key takeaways
- Internal stress tests tailor idiosyncratic, market-wide and combined scenarios to the bank's own vulnerabilities over multiple horizons.
- Counterbalancing capacity is cash plus unencumbered assets after stressed haircuts.
- The survival horizon is when cumulative net outflows exhaust the CBC; boards set a minimum.
- A CFP covers governance, early warning indicators, escalation stages, ranked funding actions, communication and testing.
- Reverse stress testing reveals the scenarios that would break the bank.
