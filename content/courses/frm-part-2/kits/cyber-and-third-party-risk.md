---
title: "Cyber Resilience and Third-Party Risk"
duration: 22
---

## Lecture outline
- 00:00 - Hook: if your cloud provider went dark for a day, which customers would notice first?
- 02:00 - From protection to resilience: assume breach
- 04:00 - Cyber threats and the CIA triad; identify-protect-detect-respond-recover
- 08:00 - Operational resilience: important business services, impact tolerances, mapping, testing
- 12:00 - Third-party lifecycle and concentration risk
- 16:00 - Whiteboard: retained cyber loss and an impact tolerance breach
- 20:00 - Exam traps and recap

## Slides
### Slide 1: Assume breach
- Some attacks will succeed
- Goal: keep critical services running and recover fast
- Resilience, not just protection
### Slide 2: Threat landscape
- Ransomware and data extortion
- DDoS, data breaches, payment fraud
- Insiders and supply-chain attacks
### Slide 3: CIA triad
- Confidentiality: data breaches
- Integrity: tampered balances and payments
- Availability: outages
### Slide 4: Five cyber functions
- Identify, protect, detect, respond, recover
- Testing: scans, penetration tests, red teaming
- Clean, immutable backups are the last line
### Slide 5: Important business services
- Services whose disruption harms customers or markets
- Impact tolerance: maximum tolerable disruption
- Map people, processes, technology, facilities, third parties
### Slide 6: Tolerance versus appetite
- Appetite: how much loss we accept
- Tolerance: how long we can be down once disrupted
- RTO and RPO support tolerances
### Slide 7: Third-party lifecycle
- Due diligence and criticality assessment
- Contract: SLAs, audit rights, data, exit, subcontracting
- Monitoring and tested exit plans
### Slide 8: Concentration and fourth parties
- Many banks on few cloud providers
- One outage becomes systemic
- Hidden dependencies through subcontractors
### Slide 9: Retained loss arithmetic
- Retained = min(S, D) + max(0, S - D - L)
- 30m loss, 5m deductible, 20m limit: retain 10m
- Expected retained = 0.10 x 10 = 1.0m
### Slide 10: Exam traps
- Accountability is never outsourced
- Insurance does not cut downtime
- Do not forget the layer above the limit

## Whiteboard examples
**Example 1 - Retained cyber loss.** Frequency 0.10, severity 30, deductible 5, limit 20. Insurer pays min(25, 20) = 20. Retained = 5 + (30 - 25) = 10. Expected retained 1.0 per year versus gross 3.0.

**Example 2 - Smaller event.** Severity 4 with the same policy: below the deductible, so retained = 4 and the insurer pays nothing. Shows why frequent small events stay on the balance sheet.

**Example 3 - Impact tolerance.** Payments tolerance 4 hours; test shows 10 hours. Breach of 6 hours. Remediation options: faster failover, manual workaround for high-value payments, pre-agreed alternative processor.

## Questions to ask students
- Who is accountable if an outsourced payment processor fails? (The bank and its board)
- Which CIA element is threatened if an attacker silently changes account balances? (Integrity)
- What is the retained loss on a USD 12m event with a 2m deductible and 8m limit? (2 + 2 = USD 4m)
- Why is cloud concentration a regulator's worry and not just the bank's? (A single outage can disrupt many firms simultaneously - systemic risk)
- Does buying more insurance help meet an impact tolerance? (No - it reduces losses, not downtime)

## Analogies
- Resilience as a hospital's backup generator: you still prevent power cuts, but you plan for the day one happens.
- Outsourcing as hiring a babysitter: the babysitter does the work, but you remain the parent.
- Concentration risk as everyone parking in the same multi-storey car park - one fire and the whole town is stranded.

## Recording tips
- Use a simple diagram of a payments service mapped to its dependencies, including a cloud provider and its subcontractor.
- Stress the difference between impact tolerance and risk appetite; exam questions love it.
- Work the insurance layering on a horizontal bar: retained, insured, retained.
