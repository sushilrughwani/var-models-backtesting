---
title: "Introduction to Risk Management"
duration: 22
---

## Lecture outline
- 00:00 - Hook: a fund that never loses money is probably not doing its job
- 02:00 - Definition and goal of risk management
- 04:00 - The framework: governance, identification, infrastructure, policies, monitoring, communication
- 08:00 - Risk tolerance and risk budgeting
- 11:00 - Financial versus non-financial risks; how risks interact
- 14:00 - Measuring risk: σ, beta, duration, Greeks, VaR, expected loss
- 18:00 - Modifying risk: avoid, accept, transfer, shift
- 20:30 - Recap and exam traps

## Slides
### Slide 1: What risk management really is
- Choose which risks to take
- Measure them and keep them within tolerance
- Goal: the right risks, not zero risk
### Slide 2: The framework
- Governance, identification and measurement, infrastructure
- Policies and processes, monitoring and mitigation
- Communication and strategic analysis
### Slide 3: Risk governance
- Board sets goals and risk tolerance
- Risk committee, chief risk officer
- Enterprise-wide view, not silos
### Slide 4: Risk tolerance and budgeting
- Tolerance: how much risk the firm can and will bear
- Budget: allocate total risk across desks, asset classes, managers
- Express as VaR limits, tracking error, factor exposures
### Slide 5: Financial risks
- Market: prices, rates, FX, commodities
- Credit: counterparty fails to pay
- Liquidity: cannot sell near fair value
### Slide 6: Non-financial risks
- Operational (including cyber), legal, compliance, regulatory
- Model, settlement, tail, accounting, solvency
- Individuals: mortality and longevity
### Slide 7: Risks interact
- Market fall → margin calls → forced sales → defaults
- Combined loss can exceed the sum of separate estimates
### Slide 8: Measuring risk
- σ, beta, duration, delta/gamma/vega
- $\text{VaR} = z\sigma V$; z = 1.645 (95%), 2.33 (99%)
- VaR is a minimum loss at a probability; add CVaR and stress tests
### Slide 9: Expected credit loss
- $EL = PD \times LGD \times EAD$
- LGD = 1 − recovery rate
### Slide 10: Modifying risk
- Prevent or avoid
- Accept: self-insure, diversify
- Transfer: insurance; Shift: derivatives
### Slide 11: Recap
- Governance sets tolerance, budgets allocate it, measures track it, tools modify it

## Whiteboard examples
1. **VaR against tolerance.** USD 50 million, daily σ 1.2%, 95% one-tailed z = 1.645. VaR = 1.645 × 0.012 × 50,000,000 = USD 987,000. Board limit USD 1.2 million, so headroom = USD 213,000. Interpretation: on 5% of days the loss is expected to be at least USD 987,000.
2. **Expected credit loss.** EAD USD 10 million, PD 2%, recovery 40%. LGD = 60%. EL = 0.02 × 0.60 × 10,000,000 = USD 120,000. Show the wrong answer using recovery: 0.02 × 0.40 × 10,000,000 = USD 80,000.
3. **Classify and modify.** List: currency exposure on a foreign bond (market - shift with forwards), fire at the data centre (operational - transfer with insurance plus backup site), counterparty default on a swap (credit - collateral or CDS), being unable to sell a small-cap block (liquidity - accept with position limits).

## Questions to ask students
- Is a fund that had no losses this year necessarily well risk-managed? (No - it may have taken too little risk or been lucky; the test is staying within chosen tolerance.)
- Who is ultimately responsible for setting risk tolerance? (The board / governing body.)
- Is model risk financial or non-financial? (Non-financial.)
- What does a 99% daily VaR of USD 2 million mean? (On 1% of days, a loss of at least USD 2 million is expected.)
- Buying a put option on a holding is which method of risk modification? (Shifting risk with a derivative.)

## Analogies
- Risk budgeting is a household budget for danger: you have a fixed amount of risk to "spend", so spend it where it buys the most expected return.
- VaR is the high-water mark painted on a riverbank: it tells you how often the water reaches that line, not how high a flood can go.
- Governance is the referee who sets the rules before the match; the risk manager is the player who keeps to them.

## Recording tips
- Stress the VaR wording ("at least this loss, this often"); the misreading as a maximum loss is the most common error.
- Keep financial and non-financial risks in two columns on screen while giving examples.
- Spend a moment on risk interactions with a real-world-style chain of events; it makes the abstract framework concrete.
