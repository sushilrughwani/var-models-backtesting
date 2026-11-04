---
title: "Environmental, Social and Governance Considerations in Investment Analysis"
---

## Learning goals
- Explain financial materiality and why material ESG factors differ by industry.
- Distinguish ESG investment approaches such as exclusionary screening, best-in-class selection, thematic investing, engagement and full integration.
- Incorporate ESG factors into equity valuation by adjusting cash flow forecasts or the discount rate.
- Evaluate how ESG risks affect credit analysis and bond pricing, including green bonds.

## Explanation

### Materiality first
An ESG factor matters to an analyst when it is **financially material**: when it can plausibly change a company's revenues, costs, assets, liabilities or cost of capital. Materiality is industry-specific. Water use is central for beverage makers and miners but marginal for software firms; data privacy is critical for software and payments but minor for a cement producer; employee safety dominates in oil and gas. Industry materiality maps help analysts focus on the few issues that drive value instead of scoring everything equally.

Time horizon matters too. Many ESG risks, such as stricter carbon regulation, stranded assets or reputational damage, build slowly and then hit suddenly. Short-horizon models can miss them entirely.

### The three pillars
- **Environmental**: emissions and carbon pricing, energy efficiency, water, waste, biodiversity, physical climate risk to assets.
- **Social**: labour practices, health and safety, supply chain standards, product safety, data security, community relations.
- **Governance**: board independence and expertise, ownership structure (dual-class shares, controlling holders), executive pay alignment, related-party transactions, audit quality and shareholder rights.

Governance is often the most consistently material pillar because weak governance lets the other risks go unmanaged.

### ESG investment approaches
- **Exclusionary (negative) screening**: remove sectors or companies (for example, tobacco or thermal coal).
- **Best-in-class (positive) screening**: hold the highest-rated companies within each sector, keeping sector balance.
- **Thematic investing**: target themes such as clean energy or water infrastructure.
- **Impact investing**: seek measurable social or environmental outcomes alongside financial return.
- **Engagement and stewardship**: use voting and dialogue to change company behaviour.
- **ESG integration**: build material ESG factors directly into fundamental analysis and valuation. This is the focus of this lesson.

### Integrating ESG into equity valuation
There are two main levers, and analysts should avoid using both for the same risk (double counting):

1. **Adjust the cash flows**: change revenue growth (demand shifts toward cleaner products), operating costs (carbon taxes, safety spending), capital expenditure (abatement equipment), provisions (fines, remediation) or the terminal value (shorter asset lives for stranded assets).
2. **Adjust the discount rate**: add a risk premium to the cost of equity for poorly managed, hard-to-quantify ESG risks, or reduce it for strong performers.

A carbon cost, for example, enters the forecast as:

$$
\Delta NOPAT = -\,E \times P_c \times (1 - \pi) \times (1 - t)
$$

where $E$ is annual emissions in tonnes, $P_c$ the carbon price per tonne, $\pi$ the share of the cost passed through to customers and $t$ the tax rate. If the change is permanent with no growth, its value effect is $\Delta NOPAT / WACC$.

### ESG in credit analysis
Bondholders have limited upside and full downside, so credit analysts focus on ESG factors that could impair the issuer's ability to repay: litigation, environmental liabilities, regulatory fines and governance failures such as aggressive accounting. These show up as higher default probabilities, wider spreads or ratings downgrades. **Green bonds** fund designated environmental projects; their credit risk is normally that of the issuer, since bondholders usually have recourse to the whole company. Investors should check use-of-proceeds reporting to guard against **greenwashing**.

## Worked example
Norrland Steel emits 200,000 tonnes of CO₂ a year. A new carbon tax of USD 50 per tonne is expected to be permanent. The analyst believes 30% of the cost can be passed on to customers. Tax rate: 25%. WACC: 8%. Assume no growth.

Step 1: Gross carbon cost = 200,000 × 50 = USD 10.0 million per year.

Step 2: Cost absorbed = 10.0 × (1 − 0.30) = USD 7.0 million.

Step 3: After-tax NOPAT reduction = 7.0 × (1 − 0.25) = USD 5.25 million.

Step 4: Value impact = 5.25 / 0.08 = **USD 65.6 million** reduction in firm value.

Step 5: Interpretation. Because the risk is captured in cash flows, the analyst should not also add a carbon risk premium to the discount rate. Ignoring pass-through would overstate the hit at 10.0 × 0.75 / 0.08 = 93.75 million.

## Common exam traps
- Treating ESG factors as equally material across industries.
- Double counting by lowering cash flows and raising the discount rate for the same risk.
- Forgetting the tax shield on new ESG-related costs.
- Assuming green bonds carry lower credit risk than the issuer's other senior debt.
- Confusing best-in-class screening (keeps every sector) with exclusionary screening (drops sectors).

## Key takeaways
- Focus on financially material ESG factors, which vary by industry and horizon.
- Governance often determines how well environmental and social risks are managed.
- Integrate ESG through cash flows or the discount rate, but not both for the same risk.
- Credit analysts weight ESG downside risks because bondholders lack upside.
- Green bond credit risk usually equals the issuer's; verify use of proceeds.
