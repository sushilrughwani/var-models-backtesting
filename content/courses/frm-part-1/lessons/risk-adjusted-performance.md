---
title: "Risk-Adjusted Performance Measures"
---

## Learning goals
- Calculate the Sharpe ratio, Treynor ratio, Jensen's alpha, information ratio and Sortino ratio.
- Explain which risk measure each ratio uses and when each is appropriate.
- Compare two managers on a risk-adjusted basis and explain why the rankings can differ across measures.
- Interpret M-squared as a Sharpe ratio expressed in return units.

## Explanation

### Why raw returns mislead
A manager who returned 12% is not necessarily better than one who returned 10%. The first may have taken far more risk. Risk-adjusted measures divide or adjust return by the risk taken. They differ in which risk they use, and that choice depends on how the portfolio fits into the investor's total wealth. These measures build directly on the CML and CAPM from the previous lesson.

### Sharpe ratio: reward per unit of total risk
$$
\text{Sharpe} = \frac{R_p - R_f}{\sigma_p}
$$

where $R_p$ is the portfolio return, $R_f$ the risk-free rate and $\sigma_p$ the portfolio's standard deviation. It is the slope of a line from the risk-free asset through the portfolio, so it compares directly with the CML slope. Use it when the portfolio is the investor's **entire** wealth, because then all of its volatility matters.

**M-squared** rescales the Sharpe ratio into a return: $M^2 = R_f + \text{Sharpe}_p \times \sigma_M$. It is the return the portfolio would have earned if levered or de-levered to the market's volatility, so it can be compared directly with the market return.

### Treynor ratio: reward per unit of systematic risk
$$
\text{Treynor} = \frac{R_p - R_f}{\beta_p}
$$

It uses beta, so it ignores idiosyncratic risk. Appropriate when the portfolio is **one of many** in a well-diversified plan, where idiosyncratic risk will be diversified away. Compare with the market's Treynor ratio, $R_M - R_f$.

### Jensen's alpha: return above the CAPM
$$
\alpha_p = R_p - \big[R_f + \beta_p(R_M - R_f)\big]
$$

A positive alpha means the portfolio beat the return the CAPM required for its beta: it plots above the SML. Alpha is in percentage points, which makes it intuitive, but it does not scale for the amount of risk taken.

### Information ratio: active return per unit of active risk
$$
IR = \frac{R_p - R_B}{TE}, \qquad TE = \sigma(R_p - R_B)
$$

where $R_B$ is the benchmark return and $TE$ is tracking error, the standard deviation of the return difference. The IR measures how consistently a manager beats the benchmark. It suits investors who hire active managers against a mandate benchmark.

### Sortino ratio: penalising only bad volatility
$$
\text{Sortino} = \frac{R_p - MAR}{DD}
$$

where $MAR$ is the minimum acceptable return (often the risk-free rate or zero) and $DD$ is the downside deviation, computed only from returns below the MAR. Investors usually do not mind upside volatility, and Sortino respects that, which matters for strategies with skewed returns such as option-selling.

### Why rankings disagree
A concentrated fund with high idiosyncratic risk can look good on Treynor (low beta) but poor on Sharpe (high total volatility). Always ask which risk the investor actually bears.

## Worked example
Risk-free rate 3%, market return 10%, market standard deviation 15%.

| | Fund A | Fund B |
|---|---|---|
| Return | 12% | 10% |
| Std dev | 18% | 12% |
| Beta | 1.2 | 0.8 |

Fund A also has a benchmark return of 10%, tracking error 4% and downside deviation 10% (MAR = 3%).

**Sharpe.** A: $(12 - 3)/18 = 0.500$. B: $(10 - 3)/12 = 0.583$. Market: $7/15 = 0.467$.

**Treynor.** A: $9/1.2 = 7.5\%$. B: $7/0.8 = 8.75\%$. Market: 7.0%.

**Jensen's alpha.** A: $12 - [3 + 1.2(7)] = 12 - 11.4 = 0.6\%$. B: $10 - [3 + 0.8(7)] = 10 - 8.6 = 1.4\%$.

**M-squared.** A: $3 + 0.500(15) = 10.5\%$. B: $3 + 0.583(15) = 11.75\%$. Both beat the market's 10%.

**Information ratio (A).** $(12 - 10)/4 = 0.50$.

**Sortino (A).** $(12 - 3)/10 = 0.90$.

**Conclusion: despite its lower raw return, Fund B is better on every risk-adjusted measure computed for both funds (Sharpe 0.583 vs 0.500, Treynor 8.75% vs 7.5%, alpha 1.4% vs 0.6%).**

## Common exam traps
- Using total standard deviation in the Treynor ratio or beta in the Sharpe ratio.
- Using standard deviation of returns in the information ratio instead of tracking error, or subtracting the risk-free rate instead of the benchmark.
- Writing alpha as $R_p - \beta R_M$ and forgetting the risk-free rate.
- Choosing Sharpe for a sleeve within a diversified plan; Treynor or alpha is more appropriate there.
- Computing Sortino with full standard deviation, or forgetting to subtract the MAR.

## Key takeaways
- Sharpe uses total risk; best when the portfolio is all the investor holds.
- Treynor and Jensen's alpha use beta; best for one portfolio among many.
- The information ratio measures active return per unit of tracking error.
- Sortino penalises only downside deviation below a minimum acceptable return.
- Different measures can rank managers differently; match the measure to the risk the investor actually bears.
