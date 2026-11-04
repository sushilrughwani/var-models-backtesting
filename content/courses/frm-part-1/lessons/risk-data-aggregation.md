---
title: "Principles for Effective Data Aggregation and Risk Reporting"
---

## Learning goals
- Explain why weak risk data aggregation amplified losses during the 2007-2009 crisis.
- Describe the four groups of principles for risk data aggregation and risk reporting.
- Distinguish the aggregation capabilities (accuracy, completeness, timeliness, adaptability) from the reporting principles.
- Evaluate trade-offs, such as accuracy versus timeliness, in a stress scenario.
- Calculate a consolidated exposure correctly from several source systems.

## Explanation

### Why this topic exists
When the crisis hit in 2008, many large banks could not answer a basic question quickly: *how much do we have at risk with this counterparty, across the whole group?* Exposures sat in separate systems for loans, derivatives and securities, in different legal entities, currencies and data formats. Producing a group-wide number took days of spreadsheet work, by which time the answer was stale. Poor data did not create the bad loans, but it slowed and blurred decisions exactly when speed mattered. In response, the Basel Committee issued a set of principles in 2013 (often called BCBS 239), applying first to globally systemically important banks.

**Risk data aggregation** means defining, gathering and processing risk data so that the bank can measure its risk against its risk appetite. **Risk reporting** means turning that data into accurate, clear and timely information for decision-makers.

### Group 1: Overarching governance and infrastructure
- **Governance:** the board and senior management own the data framework. Data quality is part of the risk management framework, with independent validation, not an IT side project.
- **Data architecture and IT infrastructure:** the bank should design systems that can aggregate data in normal times *and* under stress, using consistent definitions, a common data dictionary and clear ownership of each data element.

### Group 2: Risk data aggregation capabilities
- **Accuracy and integrity:** data should be reconciled with source and accounting records and be largely automated. Manual workarounds must be documented and controlled.
- **Completeness:** all material risk data across business lines, legal entities and risk types should be captured, so exposures can be viewed by counterparty, industry, region or asset class.
- **Timeliness:** aggregated data must be available fast enough to be useful, especially in a crisis when frequency needs rise.
- **Adaptability:** the bank should produce ad hoc reports on request, such as a new stress scenario or a sudden question from a supervisor.

### Group 3: Risk reporting practices
- **Accuracy:** reports reflect the data precisely and are reconciled and validated.
- **Comprehensiveness:** reports cover all material risks, including forward-looking assessments.
- **Clarity and usefulness:** reports are tailored to the audience - a board needs a concise summary with interpretation, a desk head needs detail.
- **Frequency:** set by the nature of the risk and the recipient; liquidity reports may be needed daily or intraday in stress.
- **Distribution:** reports reach the right people quickly while preserving confidentiality.

### Group 4: Supervisory review, tools and cooperation
Supervisors periodically review compliance, require remedial action when banks fall short (for example, capital add-ons or limits on new business), and cooperate across home and host jurisdictions.

### Trade-offs and connections
The principles interact. Under stress, a slightly less precise number delivered in hours beats a perfect one delivered next week - but the bank must know and disclose the tolerance. Good data also underpins the risk appetite framework and the three lines of defence covered earlier: limits are meaningless if exposures against them cannot be measured.

## Worked example
A bank's limit for Counterparty X is USD 400 million. Three systems hold exposure:

- Loan system: USD 250 million.
- Derivatives system (net replacement cost): USD 120 million.
- European subsidiary: EUR 70 million, with EUR/USD at 1.10.

A data reconciliation reveals that a USD 30 million loan is booked in *both* the loan system and the subsidiary's books.

**Step 1 - Convert currencies.** $70 \times 1.10 = 77$, so USD 77 million.

**Step 2 - Add all sources.** $250 + 120 + 77 = 447$, so USD 447 million.

**Step 3 - Remove double counting.** $447 - 30 = 417$, so **USD 417 million**.

**Step 4 - Compare with the limit.** $417 > 400$, so the limit is breached by USD 17 million.

Note what each siloed view showed: the loan desk saw 250, the derivatives desk 120, the subsidiary 70 (in euros). None was alarming alone. Only a complete, accurate, reconciled aggregation reveals the breach - which is exactly the point of the principles.

## Common exam traps
- Treating data aggregation as purely an IT issue; the principles place ultimate responsibility on the board and senior management.
- Mixing up the groups: accuracy appears both as an *aggregation* capability (data) and as a *reporting* practice (reports).
- Assuming every report must be produced at maximum frequency; frequency should fit the risk and the recipient, and rise in stress.
- Believing manual processes are forbidden; they are allowed but must be documented, controlled and minimized.
- Forgetting that supervisors (not banks) carry the final group of principles.

## Key takeaways
- The crisis showed banks could not aggregate exposures quickly across systems and entities.
- Fourteen principles fall into four groups: governance and infrastructure, aggregation capabilities, reporting practices and supervisory review.
- Aggregation must be accurate, complete, timely and adaptable; reports must be accurate, comprehensive, clear, appropriately frequent and well distributed.
- Board ownership, a common data dictionary and reconciliation to source are the foundations.
- Accuracy and timeliness trade off, especially in stress, and the bank must understand that tolerance.
