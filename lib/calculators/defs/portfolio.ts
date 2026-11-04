/** Calculators: portfolio risk/return, performance measures and the CAPM. */
import type { CalculatorDef } from "../types";
import { COURSES, check, num, pct, r, safeCompute, series } from "../helpers";
import { capmRequiredReturn, twoAssetPortfolio } from "@/lib/finance/portfolio";
import { seriesPerformance } from "@/lib/finance/performance";

export const twoAssetCalc: CalculatorDef = {
  slug: "two-asset-portfolio",
  title: "Two-Asset Portfolio Return & Risk",
  category: "Portfolio & Performance",
  description: "Expected return, standard deviation and minimum-variance mix of a portfolio of two risky assets.",
  formula: String.raw`\begin{aligned}
E(R_p) &= w_1E(R_1) + w_2E(R_2),\qquad w_2 = 1-w_1\\
\sigma_p^2 &= w_1^2\sigma_1^2 + w_2^2\sigma_2^2 + 2w_1w_2\rho_{12}\sigma_1\sigma_2\\
w_1^{\min} &= \frac{\sigma_2^2 - \rho_{12}\sigma_1\sigma_2}{\sigma_1^2+\sigma_2^2-2\rho_{12}\sigma_1\sigma_2}
\end{aligned}`,
  explanation: String.raw`A portfolio's expected return is just the weighted average of the assets' expected returns. Its risk is lower than the weighted average of their risks whenever the correlation $\rho$ is below 1, because part of each asset's movement offsets the other's. That reduction is the **diversification** effect. With $\rho = -1$ there is a mix with zero risk.

The chart traces every mix from 0% to 100% in asset 1 and shows the curved risk–return trade-off. Its left-most point is the **global minimum-variance portfolio**. Weights outside 0–100% represent short positions.`,
  inputs: [
    { key: "w1", label: "Weight in asset 1 (w₁)", default: 60, step: 5, suffix: "%" },
    { key: "r1", label: "Expected return asset 1", default: 10, step: 0.5, suffix: "%" },
    { key: "r2", label: "Expected return asset 2", default: 6, step: 0.5, suffix: "%" },
    { key: "s1", label: "Standard deviation asset 1", default: 20, step: 0.5, suffix: "%", min: 0 },
    { key: "s2", label: "Standard deviation asset 2", default: 10, step: 0.5, suffix: "%", min: 0 },
    { key: "rho", label: "Correlation (ρ)", default: 0.3, step: 0.05, min: -1, max: 1 },
  ],
  compute: safeCompute((v) => {
    const w1 = pct(v, "w1", "Weight");
    const r1 = pct(v, "r1", "Return 1");
    const r2 = pct(v, "r2", "Return 2");
    const s1 = pct(v, "s1", "Std dev 1");
    const s2 = pct(v, "s2", "Std dev 2");
    const rho = num(v, "rho", "Correlation");
    check(s1 >= 0 && s2 >= 0, "Standard deviations cannot be negative.");
    check(rho >= -1 && rho <= 1, "Correlation must be between −1 and 1.");
    const res = twoAssetPortfolio(w1, r1, r2, s1, s2, rho);
    const data = Array.from({ length: 21 }, (_, i) => {
      const w = i / 20;
      const q = twoAssetPortfolio(w, r1, r2, s1, s2, rho);
      return { "Weight in asset 1 (%)": w * 100, "Expected return (%)": r(q.expectedReturn * 100, 4), "Std deviation (%)": r(q.stdDev * 100, 4) };
    });
    const hasMin = Number.isFinite(res.minVarianceWeight1);
    return {
      outputs: [
        { label: "Portfolio expected return", value: res.expectedReturn, format: "percent", decimals: 4, highlight: true },
        { label: "Portfolio standard deviation", value: res.stdDev, format: "percent", decimals: 4, highlight: true },
        { label: "Portfolio variance", value: res.variance, format: "number", decimals: 6 },
        { label: "Covariance", value: res.covariance, format: "number", decimals: 6 },
        { label: "Weighted-average std deviation (no diversification)", value: w1 * s1 + (1 - w1) * s2, format: "percent", decimals: 4 },
        { label: "Min-variance weight in asset 1", value: hasMin ? res.minVarianceWeight1 : "n/a", format: hasMin ? "percent" : "text", decimals: 2 },
        { label: "Min-variance std deviation", value: hasMin ? res.minVarianceStdDev : "n/a", format: hasMin ? "percent" : "text", decimals: 4 },
      ],
      chart: { type: "line", title: "Risk and return by weight in asset 1", xKey: "Weight in asset 1 (%)", yKeys: ["Expected return (%)", "Std deviation (%)"], data },
    };
  }),
  courses: [COURSES.cfa1, COURSES.frm1],
};

export const riskAdjustedCalc: CalculatorDef = {
  slug: "risk-adjusted-performance",
  title: "Risk-Adjusted Performance (Sharpe, Treynor, Sortino, Alpha, IR)",
  category: "Portfolio & Performance",
  description: "Sharpe, Treynor and Sortino ratios, Jensen's alpha and the information ratio from portfolio and benchmark return series.",
  formula: String.raw`\begin{aligned}
\text{Sharpe} &= \frac{\bar R_p - R_f}{\sigma_p},\qquad \text{Treynor} = \frac{\bar R_p - R_f}{\beta_p},\qquad \beta_p = \frac{\operatorname{Cov}(R_p,R_b)}{\operatorname{Var}(R_b)}\\
\text{Sortino} &= \frac{\bar R_p - MAR}{DD},\qquad DD = \sqrt{\tfrac{1}{n}\textstyle\sum_i \min(R_i - MAR,0)^2}\\
\alpha_J &= \bar R_p - [R_f + \beta_p(\bar R_b - R_f)],\qquad IR = \frac{\overline{R_p - R_b}}{\sigma(R_p - R_b)}
\end{aligned}`,
  explanation: String.raw`All five measures relate return to the risk taken, but each defines risk differently.

- **Sharpe** divides excess return by total volatility. Use it when the portfolio is the investor's whole holding.
- **Treynor** divides excess return by beta, which is only the systematic risk. Use it for a portfolio that is one part of a diversified whole.
- **Sortino** penalises only returns below the minimum acceptable return (MAR), measured by the downside deviation.
- **Jensen's alpha** is the return earned above what the CAPM predicts for the portfolio's beta.
- The **information ratio** is the average active return per unit of tracking error.

Beta is estimated from the two series. The measures are per period, matching the frequency of your data, and are not annualised. Sample ($n-1$) statistics are used, except in the downside deviation, which divides by $n$.`,
  inputs: [
    { key: "portfolio", label: "Portfolio returns (%)", type: "series", default: "2.1, -1.3, 3.4, 0.8, -2.2, 1.9, 2.7, -0.5, 1.2, 3.1, -1.8, 2.4", help: "One return per period (e.g. monthly)." },
    { key: "benchmark", label: "Benchmark returns (%)", type: "series", default: "1.8, -1.0, 2.9, 0.5, -2.5, 1.6, 2.2, -0.9, 1.0, 2.6, -1.5, 2.0", help: "Same number of periods as the portfolio." },
    { key: "rf", label: "Risk-free rate per period", default: 0.25, step: 0.05, suffix: "%" },
    { key: "mar", label: "Minimum acceptable return per period (MAR)", default: 0, step: 0.1, suffix: "%" },
  ],
  compute: safeCompute((v) => {
    const p = series(v, "portfolio", "Portfolio returns", 3);
    const b = series(v, "benchmark", "Benchmark returns", 3);
    check(p.length === b.length, `Portfolio and benchmark need the same number of returns (you entered ${p.length} and ${b.length}).`);
    const rf = pct(v, "rf", "Risk-free rate");
    const mar = pct(v, "mar", "MAR");
    const s = seriesPerformance(p, b, rf, mar);
    check(s.stdDev > 0, "Portfolio returns have zero volatility.");
    check(s.downsideDeviation > 0, "No returns fall below the MAR, so the downside deviation is zero and Sortino is undefined.");
    check(s.trackingError > 0, "Portfolio and benchmark are identical in active terms (zero tracking error).");
    return {
      outputs: [
        { label: "Sharpe ratio", value: s.sharpe, format: "number", decimals: 4, highlight: true },
        { label: "Treynor ratio", value: s.treynor, format: "percent", decimals: 4 },
        { label: "Sortino ratio", value: s.sortino, format: "number", decimals: 4, highlight: true },
        { label: "Jensen's alpha (per period)", value: s.jensensAlpha, format: "percent", decimals: 4, highlight: true },
        { label: "Information ratio", value: s.informationRatio, format: "number", decimals: 4 },
        { label: "Mean portfolio return", value: s.meanReturn, format: "percent", decimals: 4 },
        { label: "Portfolio std deviation", value: s.stdDev, format: "percent", decimals: 4 },
        { label: "Beta (vs benchmark)", value: s.beta, format: "number", decimals: 4 },
        { label: "Downside deviation", value: s.downsideDeviation, format: "percent", decimals: 4 },
        { label: "Tracking error", value: s.trackingError, format: "percent", decimals: 4 },
        { label: "Mean benchmark return", value: s.benchmarkMean, format: "percent", decimals: 4 },
      ],
      notes: ["Ratios are per period and not annualised. Multiply Sharpe and IR by √(periods per year) to annualise approximately."],
    };
  }),
  courses: [COURSES.cfa1, COURSES.cfa3, COURSES.frm1],
};

export const capmCalc: CalculatorDef = {
  slug: "capm",
  title: "CAPM Required Return",
  category: "Portfolio & Performance",
  description: "Required return from the capital asset pricing model and the alpha of a return forecast.",
  formula: String.raw`\begin{aligned}
E(R_i) &= R_f + \beta_i\,[E(R_m) - R_f]\\
\alpha_i &= \text{Forecast return} - E(R_i)
\end{aligned}`,
  explanation: String.raw`The CAPM says investors are paid only for **systematic** risk, the part that cannot be diversified away, and beta measures it. The required return is the risk-free rate plus beta times the **market risk premium**. Plotting required return against beta gives the security market line (SML).

If your forecast return for the asset is above its CAPM required return, the asset plots above the SML. It has positive alpha and looks undervalued. A forecast below the line suggests the asset is overvalued.`,
  inputs: [
    { key: "rf", label: "Risk-free rate (R_f)", default: 3, step: 0.1, suffix: "%" },
    { key: "beta", label: "Beta (β)", default: 1.2, step: 0.05 },
    { key: "rm", label: "Expected market return E(R_m)", default: 8, step: 0.1, suffix: "%" },
    { key: "forecast", label: "Your forecast return for the asset", default: 10, step: 0.1, suffix: "%" },
  ],
  compute: safeCompute((v) => {
    const rf = pct(v, "rf", "Risk-free rate");
    const beta = num(v, "beta", "Beta");
    const rm = pct(v, "rm", "Market return");
    const f = pct(v, "forecast", "Forecast return");
    const req = capmRequiredReturn(rf, beta, rm);
    const alpha = f - req;
    return {
      outputs: [
        { label: "Required return E(R)", value: req, format: "percent", decimals: 4, highlight: true },
        { label: "Market risk premium", value: rm - rf, format: "percent", decimals: 4 },
        { label: "Asset risk premium β(E(R_m) − R_f)", value: beta * (rm - rf), format: "percent", decimals: 4 },
        { label: "Alpha (forecast − required)", value: alpha, format: "percent", decimals: 4, highlight: true },
        { label: "Verdict", value: Math.abs(alpha) < 1e-12 ? "Fairly valued (on the SML)" : alpha > 0 ? "Undervalued (above the SML)" : "Overvalued (below the SML)", format: "text" },
      ],
    };
  }),
  courses: [COURSES.cfa1, COURSES.frm1],
};
