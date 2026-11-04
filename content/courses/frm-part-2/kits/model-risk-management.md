---
title: "Model Risk Management"
duration: 22
---

## Lecture outline
- 00:00 - Hook: a copy-paste error in a spreadsheet halved a bank's measured trading risk - how?
- 02:00 - What is a model: inputs, processing, outputs
- 04:00 - Sources of model risk: fundamental errors versus misuse
- 07:00 - Governance roles and effective challenge
- 10:00 - Inventory and tiering
- 13:00 - Validation: conceptual soundness, ongoing monitoring, outcomes analysis
- 16:00 - Whiteboard: PD calibration z-test
- 20:00 - Exam traps and recap

## Slides
### Slide 1: Small error, big loss
- Models drive pricing, capital, provisioning, limits
- A formula slip can understate risk for months
- Without challenge, nobody notices
### Slide 2: What is a model
- Inputs: data and assumptions
- Processing: theory, statistics, code
- Outputs used for decisions - spreadsheets included
### Slide 3: Sources of model risk
- Fundamental errors: theory, assumptions, data, code, calibration
- Misuse: outside intended scope or conditions
- Risk rises with complexity, uncertainty, use and impact
### Slide 4: Roles
- Board and senior management: policy and appetite
- Owners accountable; developers build; users report issues
- Independent validators; audit reviews the framework
### Slide 5: Effective challenge
- Competence: skills to understand the model
- Independence: no stake in approval
- Influence: authority to restrict or reject
### Slide 6: Inventory and tiering
- Every model listed with owner, purpose, status, limitations
- Tier by materiality, complexity, regulatory use
- Validation depth and frequency follow the tier
### Slide 7: Validation pillar 1
- Conceptual soundness
- Theory, assumptions, data fitness
- Documented limitations
### Slide 8: Validation pillars 2 and 3
- Ongoing monitoring: process verification, benchmarking, sensitivity
- Outcomes analysis: predictions versus reality
- Backtesting PD, VaR and pricing models
### Slide 9: PD calibration test
- z = (D - nP) / sqrt(nP(1 - P))
- 5,000 loans, P = 2%, D = 130: z = 3.03
- Reject at 5%: model underestimates defaults
### Slide 10: Responses and traps
- Overlays, restrictions, remediation, retirement
- Vendor models still need validation
- Validation never ends at approval

## Whiteboard examples
**Example 1 - PD calibration.** n = 5,000, P = 2%: expected 100, standard deviation sqrt(98) = 9.899. D = 130: z = 30 / 9.899 = 3.03 > 1.96, reject. Observed rate 2.6%.

**Example 2 - Variation.** n = 1,000, P = 5%, D = 68: expected 50, sd = sqrt(47.5) = 6.892, z = 18 / 6.892 = 2.61, reject. If D = 60, z = 1.45, do not reject.

**Example 3 - Misuse scenario.** A retail mortgage PD model is used to price commercial property loans. Ask: is this a fundamental error or misuse? (Misuse - the model may be sound for its intended population.)

## Questions to ask students
- Is a judgement-based Excel provisioning tool a model? (Yes, if it turns inputs into quantitative estimates used for decisions)
- Who should validate a high-tier VaR model? (An independent validation team with competence and authority, not the developers)
- Why tier models? (To focus scarce validation resources on the most material and complex models)
- Why might the binomial test reject too often in a recession? (Defaults are correlated, so variance is larger than the independence formula assumes)
- Can a bank skip validating a vendor model because the code is proprietary? (No - use outcomes analysis, benchmarking and documentation)

## Analogies
- Model validation as a pilot's pre-flight check plus a flight recorder: check the design before take-off, monitor in flight, and review what actually happened afterwards.
- Misuse as using a city map to navigate a mountain trail: the map is accurate, just not for where you are.
- Effective challenge as a referee who knows the rules, is not on either team, and can show a red card.

## Recording tips
- Keep the three validation pillars on screen as a running framework.
- Emphasise misuse; candidates often focus only on technical errors.
- When doing the z-test, explicitly state the hypothesis and the decision rule before computing.
