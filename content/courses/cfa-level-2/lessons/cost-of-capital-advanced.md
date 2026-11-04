---
title: "Cost of Capital: Advanced Topics"
---

## Learning goals
- Compare historical, forward-looking and macroeconomic methods of estimating the equity risk premium.
- Calculate a country risk premium using the sovereign yield spread scaled by relative volatility.
- Estimate a beta for a private or thinly traded company by unlevering and relevering a comparable's beta.
- Apply the build-up approach with size and company-specific premiums, and explain its limitations.

## Explanation

### Where this fits
At Level I you used CAPM with a given beta and equity risk premium (ERP). In practice every input is an estimate, and the hardest cases are emerging-market companies, small firms and private firms with no traded share price. This lesson covers the adjustments analysts make for those cases.

### Estimating the equity risk premium
- **Historical**: average excess return of equities over government bonds across a long sample. Choices that matter: arithmetic versus geometric mean (arithmetic is higher), bills versus long bonds as the benchmark, and survivorship bias in markets that did not collapse.
- **Forward-looking (Gordon growth)**: infer the premium from current prices.

$$
ERP = \frac{D_1}{P_0} + g - r_{LT}
$$

where $D_1/P_0$ is the forward dividend yield on the index, $g$ the long-term expected earnings growth rate and $r_{LT}$ the long-term government bond yield.
- **Macroeconomic (supply-side)**: build the premium from expected inflation, real earnings growth, changes in valuation multiples and the income yield, then subtract the risk-free rate.
- **Surveys**: ask practitioners or academics; quick but subjective.

### Country risk premium
Investors in emerging markets face extra risks: political instability, capital controls and currency crises. A common estimate scales the sovereign default spread by how much more volatile equities are than sovereign bonds in that market:

$$
CRP = \text{Sovereign yield spread} \times \frac{\sigma_{equity}}{\sigma_{sovereign\ bond}}
$$

The spread is the yield on the country's USD-denominated government debt minus a developed-market government bond of similar maturity. The CRP is usually added to the developed-market ERP, giving:

$$
r_e = r_f + \beta \left(ERP + CRP\right)
$$

Some analysts instead add the CRP outside the beta term ($r_f + \beta \cdot ERP + CRP$), which assumes every company has the same exposure to country risk. Be consistent and state which you use.

### Beta for private or thinly traded companies
A private firm has no return history, so borrow the beta of a publicly traded **comparable** (pure-play) and adjust for differences in leverage:

$$
\beta_A = \frac{\beta_E}{1 + (1 - t)\frac{D}{E}}, \qquad \beta_{E,\text{target}} = \beta_A \left[1 + (1 - t_{\text{target}})\frac{D_{\text{target}}}{E_{\text{target}}}\right]
$$

where $\beta_E$ is the comparable's observed equity beta, $\beta_A$ its asset (unlevered) beta, $t$ the tax rate and $D/E$ the market debt-to-equity ratio. Unlever with the comparable's own leverage and tax rate; relever with the target's. For thinly traded stocks, regression betas are biased toward zero, so analysts use longer windows, lagged returns or the comparable approach. Many services also adjust raw betas toward 1 (for example, two-thirds raw beta plus one-third × 1).

### The build-up approach
When no reliable beta exists, small private firm valuers often skip beta entirely:

$$
r_e = r_f + ERP + SP + IP + SCRP
$$

where $SP$ is a size premium, $IP$ an industry adjustment and $SCRP$ a company-specific risk premium. This implicitly assumes a beta of 1 before adjustments. Size premiums estimated from historical returns of the smallest listed stocks may overstate the effect, because those returns partly reflect illiquidity and data quirks. Company-specific premiums are highly subjective.

## Worked example
An analyst values a private packaging firm in an emerging market. A listed comparable has an equity beta of 1.20, a D/E ratio of 0.50 and a 25% tax rate. The target will have a D/E of 0.80 and a 30% tax rate. The developed-market ERP is 5.5% and the risk-free rate is 4.0%. The country's sovereign spread is 3.0%, with equity volatility 30% and sovereign bond volatility 20%.

Step 1: Asset beta = 1.20 / (1 + 0.75 × 0.50) = 1.20 / 1.375 = 0.8727.

Step 2: Relevered beta = 0.8727 × (1 + 0.70 × 0.80) = 0.8727 × 1.56 = 1.3615.

Step 3: CRP = 3.0% × 30% / 20% = 4.5%.

Step 4: Cost of equity = 4.0% + 1.3615 × (5.5% + 4.5%) = 4.0% + 13.61% = **17.61%**.

Step 5: Sensitivity. Adding the CRP outside the beta term gives 4.0% + 1.3615 × 5.5% + 4.5% = 15.99%, so the choice of method moves the estimate by about 1.6 percentage points.

## Common exam traps
- Relevering with the comparable's tax rate or leverage instead of the target's.
- Inverting the volatility ratio in the CRP formula (equity volatility goes on top).
- Forgetting to subtract the government bond yield in the Gordon ERP estimate.
- Using book rather than market D/E without noting the inconsistency.
- Forgetting that the build-up method assumes a beta of 1.

## Key takeaways
- ERP can be estimated historically, from current prices, from macro drivers or by survey; each has biases.
- The CRP scales the sovereign spread by relative equity-to-bond volatility.
- Unlever comparable betas with their own capital structure; relever with the target's.
- Build-up models add size and specific premiums to a beta-of-one base.
- State your method: small choices produce large differences in the cost of equity.
