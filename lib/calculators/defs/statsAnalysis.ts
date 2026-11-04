/** Calculators: hypothesis testing and DuPont analysis. */
import type { CalculatorDef } from "../types";
import { COURSES, check, num, pct, safeCompute, str } from "../helpers";
import { meanTest, type Tail, type TestKind } from "@/lib/finance/hypothesis";
import { dupont } from "@/lib/finance/analysis";

export const hypothesisCalc: CalculatorDef = {
  slug: "hypothesis-test",
  title: "Hypothesis Test for a Mean (z / t)",
  category: "Statistics",
  description: "z- or t-test of a population mean: test statistic, critical value, p-value and decision.",
  formula: String.raw`\begin{aligned}
z \text{ or } t &= \frac{\bar x - \mu_0}{s/\sqrt{n}},\qquad df = n-1 \text{ for } t\\
p\text{-value} &= \begin{cases} 2\,P(T \ge |t|) & \text{two-tailed}\\ P(T \le t) & H_1:\mu<\mu_0\\ P(T \ge t) & H_1:\mu>\mu_0 \end{cases}
\end{aligned}`,
  explanation: String.raw`The test asks whether the sample mean $\bar x$ is far enough from the hypothesised value $\mu_0$ to reject $H_0$, measured in standard errors. When the population standard deviation is unknown and has to be estimated from the sample, the statistic follows **Student's t** with $n-1$ degrees of freedom. The **z-test** applies when $\sigma$ is known, or as an approximation for large $n$.

Reject $H_0$ when the statistic falls beyond the critical value or, equivalently, when the **p-value** is below the significance level $\alpha$. The t distribution is computed exactly through the regularized incomplete beta function.`,
  inputs: [
    { key: "xbar", label: "Sample mean (x̄)", default: 103, step: 0.1 },
    { key: "mu0", label: "Hypothesised mean (μ₀)", default: 100, step: 0.1 },
    { key: "sd", label: "Standard deviation (s or σ)", default: 10, step: 0.1, min: 0 },
    { key: "n", label: "Sample size (n)", type: "integer", default: 25, step: 1, min: 2 },
    { key: "alpha", label: "Significance level (α)", default: 5, step: 0.5, suffix: "%", min: 0, max: 50 },
    { key: "kind", label: "Test", type: "select", default: "t", options: [
      { value: "t", label: "t-test (σ unknown)" },
      { value: "z", label: "z-test (σ known)" },
    ] },
    { key: "tail", label: "Alternative hypothesis", type: "select", default: "two", options: [
      { value: "two", label: "Two-tailed (μ ≠ μ₀)" },
      { value: "left", label: "Left-tailed (μ < μ₀)" },
      { value: "right", label: "Right-tailed (μ > μ₀)" },
    ] },
  ],
  compute: safeCompute((v) => {
    const sd = num(v, "sd", "Standard deviation");
    const n = Math.round(num(v, "n", "Sample size"));
    const alpha = pct(v, "alpha", "Significance level");
    check(sd > 0, "Standard deviation must be positive.");
    check(n >= 2, "Sample size must be at least 2.");
    check(alpha > 0 && alpha < 0.5, "Significance level must be between 0% and 50%.");
    const kind = (str(v, "kind", "t") === "z" ? "z" : "t") as TestKind;
    const rawTail = str(v, "tail", "two");
    const tail = (rawTail === "left" || rawTail === "right" ? rawTail : "two") as Tail;
    const res = meanTest(num(v, "xbar", "Sample mean"), num(v, "mu0", "Hypothesised mean"), sd, n, alpha, kind, tail);
    const crit = tail === "two" ? `±${res.critical.toFixed(4)}` : res.critical.toFixed(4);
    return {
      outputs: [
        { label: `${kind}-statistic`, value: res.statistic, format: "number", decimals: 4, highlight: true },
        { label: "p-value", value: res.pValue, format: "number", decimals: 6, highlight: true },
        { label: "Critical value", value: crit, format: "text" },
        { label: "Decision", value: res.reject ? `Reject H₀ at α = ${(alpha * 100).toFixed(2)}%` : `Fail to reject H₀ at α = ${(alpha * 100).toFixed(2)}%`, format: "text", highlight: true },
        { label: "Standard error", value: res.standardError, format: "number", decimals: 6 },
        { label: "Degrees of freedom", value: res.df === null ? "n/a (z-test)" : res.df, format: res.df === null ? "text" : "integer" },
      ],
    };
  }),
  courses: [COURSES.cfa1, COURSES.frm1],
};

export const dupontCalc: CalculatorDef = {
  slug: "dupont",
  title: "DuPont ROE Analysis",
  category: "Financial Analysis",
  description: "Decompose return on equity into margin, turnover and leverage (3-step) and tax and interest burdens (5-step).",
  formula: String.raw`\begin{aligned}
ROE &= \frac{NI}{\text{Sales}}\times\frac{\text{Sales}}{\text{Assets}}\times\frac{\text{Assets}}{\text{Equity}}\\
&= \frac{NI}{EBT}\times\frac{EBT}{EBIT}\times\frac{EBIT}{\text{Sales}}\times\frac{\text{Sales}}{\text{Assets}}\times\frac{\text{Assets}}{\text{Equity}}
\end{aligned}`,
  explanation: String.raw`DuPont analysis explains **why** ROE is high or low. The 3-step version splits it into profitability (net margin), efficiency (asset turnover) and financial leverage (equity multiplier). The 5-step version breaks the net margin into the **tax burden** (the share of pre-tax profit kept after tax), the **interest burden** (the share of operating profit left after interest) and the operating (EBIT) margin.

Two firms can report the same ROE for very different reasons. One may have high margins, while another relies on heavy leverage, and the leveraged one carries more risk. Use average balance-sheet figures for the period when you have them.`,
  inputs: [
    { key: "ni", label: "Net income (NI)", default: 120, step: 1 },
    { key: "ebt", label: "Earnings before tax (EBT)", default: 160, step: 1 },
    { key: "ebit", label: "EBIT (operating income)", default: 200, step: 1 },
    { key: "sales", label: "Revenue (sales)", default: 1500, step: 10 },
    { key: "assets", label: "Average total assets", default: 1000, step: 10 },
    { key: "equity", label: "Average shareholders' equity", default: 400, step: 10 },
  ],
  compute: safeCompute((v) => {
    const sales = num(v, "sales", "Revenue");
    const assets = num(v, "assets", "Assets");
    const equity = num(v, "equity", "Equity");
    const ebt = num(v, "ebt", "EBT");
    const ebit = num(v, "ebit", "EBIT");
    check(sales !== 0 && assets !== 0 && equity !== 0, "Revenue, assets and equity must be non-zero.");
    check(ebt !== 0 && ebit !== 0, "EBT and EBIT must be non-zero for the 5-step decomposition.");
    const d = dupont(num(v, "ni", "Net income"), ebt, ebit, sales, assets, equity);
    return {
      outputs: [
        { label: "Return on equity (ROE)", value: d.roe3, format: "percent", decimals: 4, highlight: true },
        { label: "Net profit margin", value: d.netMargin, format: "percent", decimals: 4 },
        { label: "Asset turnover", value: d.assetTurnover, format: "number", decimals: 4 },
        { label: "Equity multiplier (leverage)", value: d.equityMultiplier, format: "number", decimals: 4 },
        { label: "Tax burden (NI/EBT)", value: d.taxBurden, format: "number", decimals: 4 },
        { label: "Interest burden (EBT/EBIT)", value: d.interestBurden, format: "number", decimals: 4 },
        { label: "EBIT margin", value: d.ebitMargin, format: "percent", decimals: 4 },
        { label: "ROE (5-step check)", value: d.roe5, format: "percent", decimals: 4 },
        { label: "Return on assets (ROA)", value: d.roa, format: "percent", decimals: 4 },
      ],
      table: {
        title: "Decomposition",
        columns: ["Component", "Formula", "Value"],
        rows: [
          ["Tax burden", "NI / EBT", d.taxBurden.toFixed(4)],
          ["Interest burden", "EBT / EBIT", d.interestBurden.toFixed(4)],
          ["EBIT margin", "EBIT / Sales", d.ebitMargin.toFixed(4)],
          ["Asset turnover", "Sales / Assets", d.assetTurnover.toFixed(4)],
          ["Equity multiplier", "Assets / Equity", d.equityMultiplier.toFixed(4)],
          ["ROE", "Product", `${(d.roe5 * 100).toFixed(4)}%`],
        ],
      },
    };
  }),
  courses: [COURSES.cfa1, COURSES.fm],
};
