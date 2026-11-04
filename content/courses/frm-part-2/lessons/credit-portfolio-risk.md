---
title: "Portfolio Credit Risk"
---

## Learning goals
- Calculate the default correlation between two obligors from their individual and joint default probabilities.
- Explain why default correlation drives the tail of a credit loss distribution.
- Apply the Vasicek one-factor model to compute the worst-case default rate.
- Calculate credit VaR as worst-case loss minus expected loss.
- Describe how granularity and concentration affect portfolio credit risk.

## Explanation

### Why correlation is the whole story
In the capital lesson we combined loans with a loss correlation. Now we look under the hood. If defaults were independent, a large portfolio of 1%-PD loans would lose almost exactly 1% every year - the law of large numbers would remove nearly all risk. Real portfolios do not behave that way, because borrowers share exposure to the economy. In a recession many default together. **Default correlation** leaves expected loss unchanged but fattens the right tail, which is exactly what capital must cover.

### Default correlation between two names
Treat default of each obligor as a 0/1 variable. The covariance and correlation are:
$$
\text{Cov}_{AB} = P(A \cap B) - p_A p_B, \qquad \rho_{AB} = \frac{P(A \cap B) - p_A p_B}{\sqrt{p_A(1-p_A)\,p_B(1-p_B)}}
$$
where $p_A, p_B$ are the individual PDs and $P(A \cap B)$ is the joint default probability. Default correlations look small (often 0.01-0.10) but have large effects, because joint default is a rare event to begin with.

### The single-factor (Vasicek) model
Directly estimating pairwise default correlations for thousands of borrowers is hopeless. The Vasicek model instead says each borrower's creditworthiness depends on one common factor $M$ (the economy) and an idiosyncratic shock $Z_i$:
$$
U_i = \sqrt{\rho}\,M + \sqrt{1-\rho}\,Z_i
$$
where $M, Z_i$ are independent standard normals and $\rho$ is the **asset correlation** between any two borrowers. Borrower $i$ defaults when $U_i < N^{-1}(PD)$. Conditional on the economy, defaults are independent, so in a large, granular portfolio the default rate equals the conditional PD. Choosing a bad state of the economy at confidence level $X$ gives the **worst-case default rate**:
$$
WCDR(X) = N\!\left(\frac{N^{-1}(PD) + \sqrt{\rho}\,N^{-1}(X)}{\sqrt{1-\rho}}\right)
$$
where $N$ is the standard normal CDF and $N^{-1}$ its inverse. This is the formula underlying the Basel IRB capital requirement.

### Credit VaR
With exposure $EAD$ and loss given default $LGD$:
$$
\text{Worst-case loss} = EAD \times LGD \times WCDR(X), \qquad \text{Credit VaR} = EAD \times LGD \times \left(WCDR(X) - PD\right)
$$
Credit VaR is the loss in excess of expected loss, consistent with the idea that EL is priced and provisioned while capital covers the unexpected part.

### Granularity and concentration
The Vasicek formula assumes an infinitely granular portfolio, so all idiosyncratic risk diversifies away. A portfolio with a few large exposures carries extra **name concentration** risk, and one tilted to a single industry or region carries **sector concentration** risk (in effect, a higher $\rho$). Both push true risk above the formula's answer, which is why supervisors add concentration charges and stress tests.

### Model families
Industry portfolio models differ mainly in how they generate correlated defaults: asset-value factor models (like Vasicek and its multi-factor extensions), Gaussian copula simulations, actuarial default-rate models in which a common factor shifts default intensity, and macro-econometric models that link default rates to GDP and unemployment.

## Worked example
**Part A - Default correlation.** Obligor A has PD 5%, obligor B has PD 8%, and their joint default probability is 1.2%.
- Covariance: $0.012 - 0.05 \times 0.08 = 0.012 - 0.004 = 0.008$.
- Denominator: $\sqrt{0.05 \times 0.95 \times 0.08 \times 0.92} = \sqrt{0.003496} = 0.05913$.
- $\rho_{AB} = 0.008 / 0.05913 = \mathbf{0.135}$.

**Part B - Vasicek credit VaR.** A granular loan portfolio has EAD USD 100 m, PD 1%, LGD 40% and asset correlation 0.15. Find 99.9% credit VaR.

1. $N^{-1}(0.01) = -2.3263$ and $N^{-1}(0.999) = 3.0902$.
2. Numerator: $-2.3263 + \sqrt{0.15} \times 3.0902 = -2.3263 + 0.3873 \times 3.0902 = -2.3263 + 1.1968 = -1.1295$.
3. Divide by $\sqrt{0.85} = 0.9220$: $-1.1295 / 0.9220 = -1.2251$.
4. $WCDR = N(-1.2251) = 11.03\%$.
5. Worst-case loss $= 100 \times 0.40 \times 0.1103 = 4.41$. Expected loss $= 100 \times 0.40 \times 0.01 = 0.40$.
6. Credit VaR $= 4.41 - 0.40 =$ **USD 4.01 m**.

Sensitivity: with $\rho = 0.05$ the WCDR drops to 4.67%; with $\rho = 0.30$ it rises to 22.44%. Same PD, same EL - very different tails.

## Common exam traps
- Confusing asset correlation $\rho$ in the Vasicek formula with default correlation; asset correlations are much larger.
- Using $\rho$ instead of $\sqrt{\rho}$ in the numerator, or forgetting to divide by $\sqrt{1-\rho}$.
- Reporting worst-case loss as credit VaR without subtracting expected loss.
- Believing correlation changes expected loss. It changes only the shape (tail) of the distribution.
- Applying the Vasicek result to a concentrated portfolio without adjusting for name concentration.

## Key takeaways
- Default correlation = (joint PD - product of PDs) / product of Bernoulli standard deviations.
- Correlation leaves EL unchanged but fattens the loss tail.
- Vasicek: $WCDR = N\big[(N^{-1}(PD) + \sqrt{\rho}N^{-1}(X))/\sqrt{1-\rho}\big]$.
- Credit VaR = EAD × LGD × (WCDR - PD).
- Concentrated portfolios are riskier than the granular formula implies.
