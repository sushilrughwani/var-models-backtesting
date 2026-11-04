---
title: "Measuring Credit Risk"
---

## Learning goals
- Calculate expected loss from probability of default, loss given default and exposure at default.
- Calculate unexpected loss for a single loan, with and without uncertainty in LGD.
- Explain how default correlation drives the unexpected loss of a portfolio.
- Compute the Vasicek worst-case default rate and the resulting credit capital.
- Explain why banks hold capital against unexpected loss and price or provision for expected loss.

## Explanation

### Expected loss
The ratings lesson gave us default probabilities. To turn them into money, we need three ingredients: the **probability of default (PD)** over the horizon, the **loss given default (LGD)**, which is one minus the recovery rate, and the **exposure at default (EAD)**. Expected loss is

$$
\text{EL} = \text{EAD} \times \text{PD} \times \text{LGD}
$$

EL is a cost of doing business. A bank covers it through loan pricing (the credit spread) and provisions. It is not what capital is for.

### Unexpected loss
Actual losses scatter around EL. **Unexpected loss (UL)** is the standard deviation of the loss. Default is a Bernoulli event with variance $\text{PD}(1-\text{PD})$. If LGD is known:

$$
\text{UL} = \text{EAD} \times \text{LGD} \times \sqrt{\text{PD}(1-\text{PD})}
$$

If LGD is itself uncertain with standard deviation $\sigma_{\text{LGD}}$ and independent of default:

$$
\text{UL} = \text{EAD}\sqrt{\text{PD}\,\sigma_{\text{LGD}}^2 + \text{LGD}^2\,\text{PD}(1-\text{PD})}
$$

### Portfolios and correlation
EL is additive: the portfolio EL is the sum of loan ELs. UL is not. For loans $i$ and $j$ with default correlation $\rho_{ij}$:

$$
\text{UL}_P = \sqrt{\sum_i\sum_j \rho_{ij}\,\text{UL}_i\,\text{UL}_j}
$$

With zero correlation, diversification shrinks UL dramatically as the number of loans grows. With positive correlation, defaults cluster in recessions and UL stays stubbornly high. Credit loss distributions are therefore strongly right-skewed: most years bring losses near or below EL, and occasional years bring very large losses.

### Economic capital and the Vasicek model
Capital must absorb losses up to a high confidence level, say 99.9% over one year, beyond EL. The **Vasicek one-factor model** gives a convenient answer for a large, granular portfolio. Each borrower's credit quality depends on a common factor (the economy) with correlation $\rho$ and an idiosyncratic factor. The default rate that will not be exceeded with probability $X$ is the **worst-case default rate**:

$$
\text{WCDR} = N\!\left(\frac{N^{-1}(\text{PD}) + \sqrt{\rho}\,N^{-1}(X)}{\sqrt{1-\rho}}\right)
$$

where $N$ is the standard normal CDF and $N^{-1}$ its inverse. Credit capital is then

$$
\text{Capital} = \text{EAD} \times \text{LGD} \times (\text{WCDR} - \text{PD})
$$

The minus PD removes expected loss, which is already priced. This is the intuition behind the Basel internal ratings-based formula, which uses $X = 99.9\%$, prescribes $\rho$ by asset class (typically lower for higher-PD borrowers), and adds a maturity adjustment.

## Worked example
A bank lends USD 10 million (EAD) to a borrower with PD 2% and LGD 45%. Assume LGD is known, $\rho = 0.15$, and use $N^{-1}(0.02) = -2.054$ and $N^{-1}(0.999) = 3.090$.

1. EL: $10{,}000{,}000 \times 0.02 \times 0.45 =$ **USD 90,000**.
2. Bernoulli standard deviation: $\sqrt{0.02 \times 0.98} = \sqrt{0.0196} = 0.14$.
3. UL: $10{,}000{,}000 \times 0.45 \times 0.14 =$ **USD 630,000**.
4. Vasicek numerator: $-2.054 + \sqrt{0.15} \times 3.090 = -2.054 + 0.3873 \times 3.090 = -2.054 + 1.1968 = -0.857$.
5. Divide by $\sqrt{0.85} = 0.9220$: $-0.857 / 0.9220 = -0.930$.
6. WCDR: $N(-0.930) \approx 0.1762$, or 17.62%. In a 1-in-1,000 bad year, almost nine times the average default rate occurs.
7. Capital: $10{,}000{,}000 \times 0.45 \times (0.17623 - 0.02) = 10{,}000{,}000 \times 0.45 \times 0.15623 \approx$ **USD 703,000**.

If LGD had a standard deviation of 20%, UL would rise to $10{,}000{,}000 \times \sqrt{0.02 \times 0.04 + 0.2025 \times 0.0196} = $ USD 690,579.

Notice that UL is seven times EL. Credit losses are rare but large, which is why capital, not pricing, has to absorb the tail.

## Common exam traps
- Using the recovery rate instead of LGD in the EL formula.
- Forgetting the square root in UL, or omitting LGD and EAD from it.
- Adding ULs across loans; only ELs add. Portfolio UL depends on correlation.
- Using $\rho$ instead of $\sqrt{\rho}$ in the Vasicek numerator, or dividing by $1-\rho$ instead of $\sqrt{1-\rho}$.
- Setting capital equal to EAD × LGD × WCDR; expected loss (the PD part) must be subtracted.

## Key takeaways
- EL = EAD × PD × LGD; it is covered by pricing and provisions.
- UL is the standard deviation of loss; capital covers losses beyond EL.
- EL adds across loans; UL depends on default correlation.
- Credit loss distributions are right-skewed with fat tails.
- Vasicek WCDR gives the default rate at a high confidence level; capital = EAD × LGD × (WCDR − PD).
