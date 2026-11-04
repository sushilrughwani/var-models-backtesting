---
title: "Portfolio Performance Evaluation and Attribution"
---

## Learning goals
- Calculate and interpret the Sharpe ratio, Treynor ratio, Jensen's alpha, M-squared and the information ratio.
- Choose the appropriate performance measure for the investor's situation.
- Explain how regression tests detect market-timing ability.
- Describe returns-based style analysis and what it reveals about a manager.
- Decompose active return into allocation, selection and interaction effects.

## Explanation

### Measuring return correctly
Performance evaluation starts with the right return. The **time-weighted return** links sub-period returns and removes the effect of client deposits and withdrawals, so it is the standard for judging a manager who does not control cash flows. The **dollar-weighted return** (an IRR) reflects the timing of flows and suits an investor judging their own experience.

### Risk-adjusted measures
Raw returns reward risk-taking, so we scale by risk:

$$
S_P = \frac{R_P - R_f}{\sigma_P}, \qquad T_P = \frac{R_P - R_f}{\beta_P}, \qquad \alpha_P = R_P - [R_f + \beta_P(R_M - R_f)]
$$

where $R_P$ is the portfolio return, $R_f$ the risk-free rate, $\sigma_P$ total volatility, $\beta_P$ market beta and $R_M$ the market return. **M-squared** restates the Sharpe ratio in return units: lever or de-lever the portfolio with cash until its volatility equals the market's, then compare returns:

$$
M^2 = R_f + S_P\,\sigma_M - R_M
$$

The **information ratio** $IR = (R_P - R_B)/\omega$ divides active return by tracking error.

Which to use? If the portfolio is the investor's entire wealth, total risk matters: use Sharpe or M-squared. If it is one of many holdings in a diversified fund, only systematic risk matters: use Treynor or Jensen's alpha. For a manager hired to beat a benchmark, use the information ratio.

### Market timing
A good market timer raises beta before rallies and cuts it before declines, which makes the portfolio's characteristic line convex. Two regression tests:

$$
R_P - R_f = a + b(R_M - R_f) + c(R_M - R_f)^2 + e
$$

(Treynor-Mazuy), and the Henriksson-Merton version, which replaces the squared term with $c\,D(R_M - R_f)$, where $D = 1$ when the market beats cash. A significantly positive $c$ indicates timing ability.

### Style analysis
Returns-based style analysis regresses fund returns on a set of style index returns (large value, small growth, bonds, cash) with the constraints that coefficients are non-negative and sum to 1. The coefficients reveal the fund's *effective* asset mix; the unexplained part ($1 - R^2$) measures selection. It needs only returns, so it works for funds that disclose no holdings, and it flags **style drift** when rolling-window weights change. Its limits: results depend on the indices chosen, and it describes the average past exposure, not today's.

### Attribution
Brinson-style attribution explains active return $R_P - R_B$ sector by sector. With portfolio weights $w_{P,i}$, benchmark weights $w_{B,i}$, portfolio sector returns $R_{P,i}$, benchmark sector returns $R_{B,i}$ and total benchmark return $R_B$:

$$
\begin{aligned}
\text{Allocation}_i &= (w_{P,i} - w_{B,i})(R_{B,i} - R_B) \\
\text{Selection}_i &= w_{B,i}(R_{P,i} - R_{B,i}) \\
\text{Interaction}_i &= (w_{P,i} - w_{B,i})(R_{P,i} - R_{B,i})
\end{aligned}
$$

Allocation rewards overweighting sectors that beat the overall benchmark; selection rewards picking better securities within a sector; interaction captures overweighting sectors where selection was also good. The three sum exactly to active return.

## Worked example
Benchmark: 60% equities returning 10%, 40% bonds returning 4%. Portfolio: 70% equities returning 12%, 30% bonds returning 3.5%.

**Step 1: totals.** $R_B = 0.6(10) + 0.4(4) = 7.6\%$; $R_P = 0.7(12) + 0.3(3.5) = 9.45\%$. Active return $= 1.85\%$.

**Step 2: allocation.** Equities: $0.10 \times (10 - 7.6) = 0.24\%$. Bonds: $-0.10 \times (4 - 7.6) = 0.36\%$. Total $0.60\%$.

**Step 3: selection.** Equities: $0.6 \times 2 = 1.20\%$. Bonds: $0.4 \times (-0.5) = -0.20\%$. Total $1.00\%$.

**Step 4: interaction.** Equities: $0.10 \times 2 = 0.20\%$. Bonds: $-0.10 \times -0.5 = 0.05\%$. Total $0.25\%$.

**Step 5: check.** $0.60 + 1.00 + 0.25 = 1.85\%$. The manager added **1.85%**, mostly through security selection in equities.

A quick risk-adjusted check: if the portfolio's return is 11% with 18% volatility and beta 1.2, the market returns 9% with 15% volatility, and the risk-free rate is 3%, then Sharpe $= 8/18 = 0.444$ (market 0.400), Treynor $= 8/1.2 = 6.67\%$, Jensen's alpha $= 11 - (3 + 1.2 \times 6) = 0.80\%$ and $M^2 = 3 + 0.444 \times 15 - 9 = 0.67\%$.

## Common exam traps
- Using Treynor or Jensen's alpha for an undiversified investor whose entire wealth is in the fund.
- Computing selection with portfolio weights; that mixes in the interaction effect.
- Forgetting to subtract total benchmark return in allocation; the total is unchanged but sector-level effects are wrong.
- Reading a positive Treynor-Mazuy intercept as timing skill; timing is the squared-term coefficient.
- Judging a manager on dollar-weighted returns when the client controlled the cash flows.

## Key takeaways
- Use time-weighted returns to evaluate managers.
- Sharpe and M-squared use total risk; Treynor and Jensen use beta; the IR uses tracking error.
- A convex characteristic line (positive squared or dummy term) indicates market-timing ability.
- Style analysis infers effective exposures from returns alone under non-negativity and sum-to-one constraints.
- Allocation, selection and interaction effects sum exactly to active return.
