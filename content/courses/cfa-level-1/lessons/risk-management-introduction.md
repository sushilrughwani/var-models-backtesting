---
title: "Introduction to Risk Management"
---

## Learning goals
- Define risk management and explain why its goal is to take the right risks rather than to minimise risk.
- Describe the elements of a risk management framework, including risk governance and risk tolerance.
- Explain risk budgeting and how it allocates a total risk allowance.
- Distinguish financial from non-financial risks and give examples of each.
- Calculate simple risk measures such as parametric value at risk and expected credit loss, and describe risk modification methods.

## Explanation

### What risk management is
Risk management is the process of deciding which risks an organisation or individual will take, measuring them, and keeping exposures in line with what was decided. The aim is **not** to eliminate risk: an asset manager that takes no risk earns only the risk-free rate. Good risk management takes the risks that are rewarded and that the organisation understands, and avoids or transfers the rest. It is judged by whether outcomes stayed within tolerance, not by whether losses occurred.

### The risk management framework
A complete framework covers:
1. **Risk governance** - top-down oversight by the board: setting goals, defining risk tolerance, assigning responsibility and creating a risk management committee and often a chief risk officer. Governance should take an enterprise-wide view so risks are not managed in isolated silos.
2. **Risk identification and measurement** - finding and quantifying exposures.
3. **Risk infrastructure** - people, systems and data needed to track risk.
4. **Policies and processes** - limits, controls and procedures.
5. **Monitoring, mitigation and management** - acting when exposures drift.
6. **Communication and strategic analysis** - reporting risks clearly and using risk insight in strategic decisions.

### Risk tolerance and risk budgeting
**Risk tolerance** is how much risk the organisation is willing and able to bear. It is set by governance with an inward view (what can we survive?) and an outward view (what environment do we face?). Ideally it is set before a crisis, not during one.

**Risk budgeting** allocates the total tolerated risk across activities - for example, across asset classes, desks or managers - like a financial budget allocates money. Budgets can be expressed as VaR limits, tracking error or factor exposures. A good budget pushes risk toward activities with the best expected reward per unit of risk.

### Types of risk
- **Financial risks**: **market risk** (prices, rates, currencies, commodities), **credit risk** (a counterparty fails to pay), and **liquidity risk** (an asset cannot be sold quickly near fair value).
- **Non-financial risks**: operational risk (people, systems, processes, external events, including cyber risk), legal, regulatory and compliance risk, model risk, settlement risk, tail risk, accounting risk, and solvency risk. For individuals: mortality and longevity risk.

Risks **interact**: a market fall can trigger margin calls (liquidity risk) that force sales and default (credit risk). Interactions often make combined losses worse than the parts suggest.

### Measuring risk
Different risks need different measures: standard deviation for overall volatility, **beta** for equity market exposure, **duration** for interest-rate exposure, **delta, gamma and vega** for options. **Value at risk (VaR)** gives a minimum loss at a stated probability over a period. Under a normal assumption:

$$
\text{VaR} = z \times \sigma \times V
$$

where $z$ is the one-tailed standard normal value for the confidence level (1.645 for 95%, 2.33 for 99%), $\sigma$ is the return standard deviation for the period and $V$ is the portfolio value. VaR does not describe how large losses can be beyond that point, so it is supplemented by **conditional VaR**, scenario analysis and stress tests.

For credit risk, the expected loss is

$$
EL = PD \times LGD \times EAD
$$

where $PD$ is probability of default, $LGD$ is loss given default (1 minus the recovery rate) and $EAD$ is exposure at default.

### Modifying risk
Once a risk is measured, managers choose to **prevent or avoid** it, **accept** it (self-insure or diversify), **transfer** it (insurance, surety bonds), or **shift** it (derivatives such as forwards, futures, swaps and options that change the distribution of outcomes). The choice weighs costs against benefits.

## Worked example
A fund manages USD 50 million. Its daily return standard deviation is 1.2%. The board has set a risk tolerance of a maximum daily 95% VaR of USD 1.2 million. The fund also holds a USD 10 million loan to one counterparty with a 2% annual probability of default and a 40% recovery rate.

**Step 1 - daily 95% VaR:** $1.645 \times 0.012 \times 50{,}000{,}000 = 987{,}000$.

**Step 2 - compare with tolerance:** $1{,}200{,}000 - 987{,}000 = 213{,}000$ of unused risk budget.

**Step 3 - loss given default:** $1 - 0.40 = 0.60$.

**Step 4 - expected credit loss:** $0.02 \times 0.60 \times 10{,}000{,}000 = 120{,}000$.

**Answer: the daily 95% VaR is USD 987,000, within the USD 1.2 million limit with USD 213,000 of headroom; the expected annual credit loss on the loan is USD 120,000.** The manager might use the remaining budget for a new active strategy or transfer some credit risk by buying a credit default swap.

## Common exam traps
- Saying the goal of risk management is to minimise risk - it is to take the chosen amount of the right risks.
- Treating VaR as the maximum possible loss; it is a minimum loss at a given probability, with no information about the tail beyond it.
- Using the recovery rate instead of loss given default in the expected-loss formula.
- Classifying operational, model or legal risk as financial risk; they are non-financial.
- Ignoring risk interactions, which can make combined losses far larger than individual estimates.

## Key takeaways
- Risk management means choosing, measuring and controlling risks, not eliminating them.
- Governance sets risk tolerance from the top, ideally on an enterprise-wide basis.
- Risk budgets allocate total tolerated risk to the activities with the best reward per unit of risk.
- Financial risks are market, credit and liquidity; many important risks are non-financial.
- Parametric VaR $= z\sigma V$; expected credit loss $= PD \times LGD \times EAD$.
- Risks can be avoided, accepted, transferred or shifted.
