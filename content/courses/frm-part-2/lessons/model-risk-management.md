---
title: "Model Risk Management"
---

## Learning goals
- Define a model and identify the two main sources of model risk: fundamental errors and misuse.
- Describe the governance roles of the board, model owners, developers, users, validators and internal audit.
- Explain the purpose of a model inventory and risk-based model tiering.
- Apply the three core elements of validation, including a simple statistical backtest of a credit model.

## Explanation

### What counts as a model
A model is a quantitative method that turns inputs (data and assumptions) into estimates through a processing component (theory, statistics, code), and produces outputs that people use for decisions. VaR engines, PD scorecards, pricing libraries, prepayment models, stress-testing tools and, increasingly, machine-learning systems all qualify. A spreadsheet that applies judgemental assumptions to forecast losses can be a model too: the label depends on what it does, not how sophisticated it looks.

### Where model risk comes from
Model risk is the potential for loss or bad decisions from using models. It has two main sources:

- **Fundamental errors** - the model is wrong for its purpose: flawed theory, inappropriate assumptions (such as normality in a fat-tailed market), poor or unrepresentative data, coding mistakes, or calibration that no longer fits current conditions.
- **Misuse** - a sound model is used outside its intended scope: a retail mortgage PD model applied to commercial property, or a model built in a low-rate world used without review after rates rise.

Model risk grows with **complexity**, **uncertainty in inputs**, **breadth of use** and **financial impact**. Famous failures - from mispriced structured credit to a correlation spreadsheet with a copy-paste error that understated trading risk - show that small technical slips can cause large losses when nobody challenges them.

### Governance and roles
- The **board and senior management** set the model risk policy and appetite and receive aggregate model risk reports.
- **Model owners** are accountable for each model's performance and appropriate use.
- **Developers** build and document models; **users** apply them and report problems.
- **Validators** provide independent, competent **effective challenge** - they must have the skills, authority and incentives to say no.
- **Internal audit** checks that the whole framework works, including that validation is genuinely independent.

### Inventory and tiering
A firm cannot manage what it has not listed. The **model inventory** records every model with its purpose, owner, inputs, users, validation status, known limitations and approval date. Models are then **tiered** by materiality (exposure, financial impact), complexity and regulatory use. High-tier models get deeper and more frequent validation; low-tier ones get lighter review. This risk-based allocation of scarce validation resources is central to an efficient programme.

### The three pillars of validation
1. **Conceptual soundness** - is the theory appropriate, are assumptions justified, is the data fit for purpose, are limitations documented?
2. **Ongoing monitoring** - is the model implemented as designed (process verification), are inputs and outputs stable, and how does it compare with **benchmark** or challenger models? Sensitivity analysis shows how outputs react to changes in key inputs.
3. **Outcomes analysis** - compare predictions with what actually happened. For a PD model, test whether observed defaults are consistent with predicted defaults:

$$
z = \frac{D - nP}{\sqrt{nP(1-P)}}
$$

where $D$ is the observed number of defaults, $n$ is the number of obligors and $P$ is the predicted default probability. A $|z|$ above 1.96 rejects calibration at the 5% two-sided level. (The test assumes independent defaults; correlation makes it too quick to reject, so treat it as a warning signal.)

When validation finds weaknesses, outcomes include restrictions on use, conservative **overlays** or adjustments, remediation deadlines, or retirement. **Vendor models** need the same scrutiny - lack of access to code is not an excuse for no validation; firms use outcomes analysis, benchmarking and vendor documentation instead.

## Worked example
A bank's retail PD model predicts a 2% one-year default rate for a portfolio of 5,000 borrowers. One year later, 130 have defaulted.

1. Expected defaults: $nP = 5{,}000 \times 0.02 = 100$.
2. Standard deviation: $\sqrt{5{,}000 \times 0.02 \times 0.98} = \sqrt{98} = 9.899$.
3. Test statistic: $z = (130 - 100) / 9.899 = 3.03$.
4. Compare with 1.96: $3.03 > 1.96$.

Conclusion: **reject the hypothesis that the model is well calibrated (z = 3.03); it underestimates default risk**. The observed default rate is $130 / 5{,}000 = 2.6\%$. The validator should ask whether the economy has deteriorated (a cycle effect the model was not built to capture), whether the portfolio mix has drifted (misuse), or whether the model is mis-specified. Short-term, an overlay could raise PDs; longer-term, the model may need recalibration. Because defaults are correlated in a downturn, the true significance is weaker than 3.03 suggests - but the signal is too strong to ignore.

## Common exam traps
- Thinking only complex code counts as a model; judgement-based spreadsheets used for decisions can also be models.
- Ignoring misuse: a well-built model used outside its scope is still model risk.
- Letting developers validate their own models; validation must be independent with effective challenge.
- Treating validation as a one-off approval; ongoing monitoring and outcomes analysis continue throughout the model's life.
- Assuming vendor models are exempt from validation.

## Key takeaways
- Model risk arises from fundamental errors and from misuse, and rises with complexity, uncertainty, breadth of use and impact.
- Clear roles - owners, developers, users, independent validators, audit - and board oversight are essential.
- A complete inventory and risk-based tiering direct validation effort where it matters most.
- Validation covers conceptual soundness, ongoing monitoring with benchmarking, and outcomes analysis.
- Findings lead to overlays, use restrictions, remediation or retirement, and apply to vendor models too.
