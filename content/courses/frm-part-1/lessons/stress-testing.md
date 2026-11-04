---
title: "Stress Testing"
---

## Learning goals
- Explain why stress testing complements VaR and expected shortfall.
- Distinguish sensitivity analysis, historical scenarios, hypothetical scenarios and reverse stress tests.
- Calculate the effect of a stress scenario on a bank's capital ratio.
- Perform a simple reverse stress test to find the loss that breaches a capital threshold.
- Describe the governance of a stress-testing programme, including the roles of the board, senior management and independent review.

## Explanation

### Why stress test?
VaR and ES, from earlier lessons, are estimated from recent data and a model. They tell us about losses on a fairly bad day, given that the future resembles the past. Stress testing asks a different question: **what happens to us if something severe, but plausible, occurs?** It looks beyond the data window, can include events that have never happened, and captures effects that statistical models miss, such as correlations jumping towards one, liquidity drying up and several risks hitting at once. Regulators use supervisory stress tests to set capital buffers; banks use their own stress tests for capital planning, risk appetite and contingency plans.

Stressed VaR, required for trading books, is a related idea: it calculates VaR on data from a 12-month period of significant financial stress instead of the most recent year.

### Types of stress test
- **Sensitivity analysis** shocks one risk factor at a time, for example a 200 basis point parallel rate rise. It is simple but ignores how factors move together.
- **Historical scenarios** replay a past crisis, such as 2008 or a sovereign debt crisis, on today's portfolio. They are credible because they happened, but the next crisis rarely looks the same.
- **Hypothetical scenarios** are forward-looking stories built by experts: a deep recession with falling house prices and rising unemployment, or a cyberattack that disables payments. They can be tailored to current vulnerabilities but rely on judgement.
- **Reverse stress tests** start from the outcome rather than the cause: what scenario would make the firm fail or breach its minimum capital? This uncovers hidden vulnerabilities and challenges complacency.

Good scenarios are **severe yet plausible**, cover all material risks (credit, market, liquidity, operational), allow for second-round effects such as fire sales and funding runs, and run over a multi-year horizon for capital planning.

### Measuring impact on capital
A typical bank stress test projects losses and income through the scenario and then measures the capital ratio:

$$
\text{Post-stress ratio} = \frac{\text{CET1}_0 - \text{losses} + \text{pre-provision net revenue}}{\text{stressed RWA}}
$$

where $\text{CET1}_0$ is starting common equity tier 1 capital, losses include credit and trading losses, pre-provision net revenue (PPNR) is income before credit losses, and stressed RWA are risk-weighted assets, which usually **rise** in a downturn as borrowers are downgraded.

### Governance
Stress testing is only useful if its results change decisions.
- The **board** sets risk appetite, approves the programme and key scenarios, challenges the results and ensures they inform strategy and capital decisions.
- **Senior management** runs the programme, makes sure all material risks and business lines are included and turns results into actions such as limits, hedges or capital raising.
- **Independent review** (internal audit, model validation) checks methods, data and assumptions.
- Policies and procedures must be documented, scenarios refreshed regularly and results reported clearly, with limitations disclosed.
- Stress testing should be integrated with capital planning (for example the ICAAP), liquidity planning and recovery plans, not run as a box-ticking exercise.

## Worked example
A bank starts with CET1 capital of USD 50 billion and RWA of USD 400 billion. A severe recession scenario projects credit losses of USD 18 billion, trading losses of USD 4 billion and PPNR of USD 6 billion. RWA rise by 10%. The bank's internal minimum CET1 ratio including buffers is 7%.

1. Starting ratio: $50 / 400 = 12.5\%$.
2. Post-stress CET1: $50 - 18 - 4 + 6 = 34$ billion.
3. Stressed RWA: $400 \times 1.10 = 440$ billion.
4. Post-stress ratio: $34 / 440 =$ **7.73%**, just above the 7% threshold.

**Reverse stress test**: what credit loss would push the ratio down to the 4.5% regulatory minimum, holding the other assumptions fixed?

5. Required CET1: $0.045 \times 440 = 19.8$ billion.
6. Solve $50 - 4 + 6 - L = 19.8$, so $L = 52 - 19.8 =$ **USD 32.2 billion**.

Management now knows that credit losses of about 1.8 times the recession scenario would breach the minimum. They can ask which portfolios could generate such losses and whether to reduce concentrations.

## Common exam traps
- Forgetting that RWA increase under stress; dividing by starting RWA overstates the post-stress ratio.
- Ignoring pre-provision revenue, which offsets part of the losses.
- Confusing a reverse stress test (start from failure, work backwards) with a historical scenario.
- Treating sensitivity analysis as a full scenario; it moves one factor and ignores joint movements.
- Assigning day-to-day operation of stress tests to the board; the board approves, oversees and challenges, while management runs the programme.

## Key takeaways
- Stress tests explore severe but plausible events that VaR models miss.
- Sensitivity, historical, hypothetical and reverse stress tests answer different questions.
- Post-stress ratio = (CET1 − losses + PPNR) / stressed RWA.
- Reverse stress tests identify the scenarios that would break the firm.
- Strong governance (board oversight, management ownership, independent review) makes results drive decisions.
