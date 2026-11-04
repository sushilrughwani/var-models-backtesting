---
title: "Cyber Resilience and Third-Party Risk"
---

## Learning goals
- Describe the main cyber threats facing financial institutions and the confidentiality-integrity-availability lens.
- Explain operational resilience concepts: important business services, impact tolerances, mapping and scenario testing.
- Outline the third-party risk management lifecycle and the special problem of concentration risk.
- Calculate the expected annual retained loss from a cyber scenario after insurance.

## Explanation

### From protection to resilience
For years, cyber risk was treated as an IT problem: build higher walls and hope nobody gets in. Regulators and boards now assume that some attacks *will* succeed. The question becomes: can the firm keep delivering its most important services, and recover quickly, when something breaks? That shift - from preventing every incident to **withstanding and recovering** from incidents - is the core of operational resilience.

### The cyber threat landscape
Common threats include **ransomware** (encrypting systems and often stealing data for extortion), **distributed denial-of-service** attacks that flood online channels, **data breaches** of customer information, **business email compromise** and payment fraud, **insider threats**, and **supply-chain attacks** that enter through a trusted software vendor. Attackers range from criminal gangs to state-sponsored groups.

A useful lens is the **CIA triad**: attacks threaten the **confidentiality** of data (breaches), the **integrity** of data (tampering with balances or payments - arguably the most dangerous for a bank) and the **availability** of services (outages).

A cyber programme typically runs through five functions: **identify** critical assets and threats, **protect** them (access control, patching, encryption, training), **detect** intrusions quickly, **respond** to contain damage, and **recover** systems and data from clean backups. Testing includes vulnerability scanning, penetration tests and intelligence-led "red team" exercises that simulate real attackers.

### Operational resilience
The resilience approach works from the outside in:

1. Identify **important business services** - services whose disruption would harm customers or market stability (payments, cash withdrawals, securities settlement).
2. Set an **impact tolerance** for each - the maximum tolerable disruption, usually a time limit (for example, payments restored within 4 hours).
3. **Map** the people, processes, technology, facilities and third parties each service depends on.
4. **Test** the service against severe but plausible scenarios and fix the vulnerabilities found.

Impact tolerance differs from risk appetite: appetite is about the likelihood and size of losses, while tolerance assumes the disruption has already happened and asks how long the firm can be down. Related recovery metrics are the **recovery time objective** (how fast a system must be back) and the **recovery point objective** (how much data loss, measured in time, is acceptable).

### Third-party risk management
Banks rely heavily on outsourcing and other third parties: cloud providers, core banking software vendors, payment processors. The golden rule: **you can outsource the activity but not the accountability**. The lifecycle is:

- **Planning and due diligence** - business case, criticality assessment, financial strength, security controls and resilience of the provider.
- **Contracting** - service levels, audit and access rights for the bank and supervisors, data location and protection, incident notification, subcontracting limits and termination rights.
- **Ongoing monitoring** - performance against SLAs, control reports, security incidents, financial health.
- **Exit planning** - a tested plan to move the service in-house or to another provider without breaching impact tolerances.

**Concentration risk** arises when many firms depend on the same few providers (a handful of hyperscale cloud companies). One outage then hits the whole sector at once - a systemic, not just firm-level, problem. **Fourth-party risk** (your provider's providers) adds hidden dependencies that mapping must uncover.

### Insurance and quantification
Cyber insurance transfers part of the impact, but policies have deductibles, limits and exclusions (for example, state-backed attacks). If a scenario has annual frequency $\lambda$ and severity $S$, and a policy pays losses above deductible $D$ up to limit $L$:

$$
\text{Retained loss per event} = \min(S, D) + \max(0,\ S - D - L)
$$

$$
\text{Expected annual retained loss} = \lambda \times \text{Retained loss per event}
$$

## Worked example
A bank models a ransomware scenario with frequency 0.10 per year and severity USD 30 million. Its cyber policy has a USD 5 million deductible and a USD 20 million limit. Payments are an important business service with an impact tolerance of 4 hours; the scenario test shows a 10-hour restoration time.

1. Gross expected annual loss: $0.10 \times 30 = 3.0$, so USD 3.0 million.
2. Insurer pays: $\min(30 - 5,\ 20) = 20$.
3. Retained per event: $\min(30, 5) + \max(0,\ 30 - 5 - 20) = 5 + 5 = 10$.
4. Expected annual retained loss: $0.10 \times 10 = 1.0$, so **USD 1.0 million**.
5. Resilience: restoration takes 10 hours against a 4-hour tolerance, a **6-hour breach**. Insurance does nothing to fix this: the bank must invest in faster recovery (immutable backups, a pre-built clean-room environment, manual payment workarounds).

## Common exam traps
- Believing outsourcing transfers responsibility to the vendor; accountability stays with the bank and its board.
- Treating impact tolerance as the same as risk appetite; tolerance assumes disruption occurs and limits its duration.
- Forgetting the uninsured layer above the policy limit when computing retained loss.
- Focusing only on confidentiality; loss of data integrity can be the most damaging cyber outcome for a bank.
- Ignoring concentration and fourth-party risk when many firms share one provider.

## Key takeaways
- Resilience assumes incidents will happen and focuses on continuing important business services.
- Threats span ransomware, DDoS, breaches, insiders and supply-chain compromises, assessed through confidentiality, integrity and availability.
- Important business services, impact tolerances, mapping and severe-but-plausible testing form the resilience toolkit.
- Third-party management covers due diligence, contracting, monitoring and exit; accountability is never outsourced.
- Insurance reduces retained losses but not downtime; retained loss includes the deductible and any excess above the limit.
