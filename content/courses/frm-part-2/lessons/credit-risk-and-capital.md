---
title: "Credit Risk Management and Capital"
---

## Learning goals
- Calculate expected loss and unexpected loss for a single credit exposure.
- Combine stand-alone unexpected losses into portfolio unexpected loss using loss correlation.
- Allocate economic capital to individual loans through risk contributions.
- Evaluate a lending decision with RAROC against a hurdle rate.
- Distinguish expected loss (priced and provisioned) from unexpected loss (covered by capital).

## Explanation

### Why a lender needs two numbers
Every loan book loses some money every year. That predictable, average loss is the **expected loss (EL)**. A bank treats it as a cost of doing business: it is built into the loan spread and covered by provisions. Capital exists for something else - the risk that losses in a bad year are far larger than average. The volatility of losses around EL is the **unexpected loss (UL)**, and the buffer held against it is **economic capital (EC)**. Mixing these two up is the most common conceptual error in this topic.

### Expected loss
$$
EL = EAD \times PD \times LGD
$$
where $EAD$ is exposure at default, $PD$ is the probability of default over the horizon (usually one year) and $LGD$ is loss given default as a fraction of EAD ($LGD = 1 - \text{recovery rate}$).

### Unexpected loss of one loan
Default is a Bernoulli event with variance $PD(1-PD)$. If LGD is treated as known, the standard deviation of the loss is:
$$
UL = EAD \times LGD \times \sqrt{PD(1-PD)}
$$
If LGD is itself uncertain with variance $\sigma_{LGD}^2$, the general version is $UL = EAD\sqrt{PD\,\sigma_{LGD}^2 + LGD^2\,PD(1-PD)}$. Notice that UL is usually several times larger than EL for good-quality loans: low PD means a small average loss but a large relative surprise when default happens.

### From loans to a portfolio
Expected losses simply add. Unexpected losses do not, because losses are imperfectly correlated. For two loans with loss correlation $\rho$:
$$
UL_P = \sqrt{UL_A^2 + UL_B^2 + 2\rho\,UL_A UL_B}
$$
Unless $\rho = 1$, $UL_P$ is below $UL_A + UL_B$. This gap is the diversification benefit that makes portfolio lending cheaper in capital terms than lending one loan at a time.

### Risk contributions and capital allocation
To price a loan you need the capital *it* consumes inside the portfolio, not its stand-alone capital. The **risk contribution** of loan $i$ is
$$
RC_i = \frac{UL_i \sum_j \rho_{ij}\,UL_j}{UL_P}
$$
and the contributions sum exactly to $UL_P$. Economic capital is set as a multiple of portfolio UL that reflects the bank's target solvency (often linked to its desired rating):
$$
EC = CM \times UL_P, \qquad EC_i = CM \times RC_i
$$
where $CM$ is the capital multiplier. Credit loss distributions are heavily right-skewed, so $CM$ is much larger than the 2.33 a normal distribution would suggest at 99%; values of 5-8 are typical in illustrations.

### RAROC and the credit decision
Risk-adjusted return on capital compares the economic profit of a loan with the capital it ties up:
$$
RAROC = \frac{\text{Revenue} - \text{Operating costs} - EL}{EC_i}
$$
A loan creates value if RAROC exceeds the **hurdle rate** (the shareholders' required return). Because EL sits in the numerator and capital in the denominator, RAROC links pricing, provisioning and capital in one ratio.

## Worked example
A bank holds two loans and uses a capital multiplier of 6. Loss correlation is 0.25.

| | Loan A | Loan B |
|---|---|---|
| EAD (USD m) | 10 | 6 |
| PD | 1% | 2% |
| LGD | 40% | 50% |

**Step 1 - Expected losses.** $EL_A = 10 \times 0.01 \times 0.40 = 0.040$; $EL_B = 6 \times 0.02 \times 0.50 = 0.060$. Total EL = USD 0.100 m.

**Step 2 - Stand-alone UL.** $UL_A = 10 \times 0.40 \times \sqrt{0.01 \times 0.99} = 4 \times 0.0995 = 0.3980$. $UL_B = 6 \times 0.50 \times \sqrt{0.02 \times 0.98} = 3 \times 0.14 = 0.4200$.

**Step 3 - Portfolio UL.**
$$
UL_P = \sqrt{0.3980^2 + 0.4200^2 + 2(0.25)(0.3980)(0.4200)} = \sqrt{0.4184} = 0.6468
$$
The simple sum would be 0.8180, so diversification removes about 21% of UL.

**Step 4 - Risk contributions.** $RC_A = 0.3980 \times (0.3980 + 0.25 \times 0.4200)/0.6468 = 0.3095$; $RC_B = 0.4200 \times (0.4200 + 0.25 \times 0.3980)/0.6468 = 0.3373$. Check: $0.3095 + 0.3373 = 0.6468$.

**Step 5 - Capital.** Portfolio EC $= 6 \times 0.6468 = 3.881$. Loan A's allocated capital $= 6 \times 0.3095 = 1.857$.

**Step 6 - RAROC.** Loan A earns net interest income of USD 0.30 m with operating costs of 0.06 m:
$$
RAROC_A = \frac{0.30 - 0.06 - 0.04}{1.857} = 10.77\%
$$
Against a 12% hurdle, Loan A destroys value at its current price, so **RAROC = 10.77%: reprice or decline**. Using stand-alone capital ($6 \times 0.398 = 2.388$) would have given only 8.38%, unfairly penalising the loan for risk that the portfolio diversifies away.

## Common exam traps
- Holding capital against EL. EL is covered by pricing and provisions; capital covers UL.
- Adding stand-alone ULs to get portfolio UL. Only ELs add; ULs need the correlation formula.
- Forgetting to subtract EL in the RAROC numerator, which overstates the return.
- Using stand-alone UL instead of the risk contribution when allocating capital to a loan in a portfolio.
- Using $PD$ instead of $\sqrt{PD(1-PD)}$ in the UL formula.

## Key takeaways
- $EL = EAD \times PD \times LGD$ is a cost; UL is the risk.
- Single-loan UL with fixed LGD is $EAD \times LGD \times \sqrt{PD(1-PD)}$.
- Portfolio UL is below the sum of stand-alone ULs whenever correlation is below one.
- Risk contributions add up to portfolio UL and are the right basis for allocating capital.
- Economic capital is a multiple of UL reflecting skewed losses and the target solvency standard.
- Approve a loan when RAROC exceeds the hurdle rate; otherwise reprice or decline.
