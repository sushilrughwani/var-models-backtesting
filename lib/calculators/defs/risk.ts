/** Calculators: market risk (VaR, ES, volatility models) and credit risk. */
import type { CalcInput, CalcOutput, CalcValues, CalculatorDef } from "../types";
import { COURSES, check, int, num, pct, r, safeCompute, series, str } from "../helpers";
import { ewmaVolatility, garchForecast, historicalVarES, parametricES, parametricVar, twoAssetVar } from "@/lib/finance/risk";
import { expectedLoss, hazardFromSpread } from "@/lib/finance/credit";
import { SAMPLE_DAILY_RETURNS } from "@/lib/finance/data/sampleReturns";

function confidence(v: CalcValues, key = "conf"): number {
  const c = pct(v, key, "Confidence level");
  check(c >= 0.5 && c < 1, "Confidence level must be at least 50% and below 100%.");
  return c;
}

function horizon(v: CalcValues): number {
  const h = num(v, "h", "Holding period");
  check(h > 0, "Holding period must be positive.");
  return h;
}

const confInput = (def: number): CalcInput => ({ key: "conf", label: "Confidence level", default: def, step: 0.5, suffix: "%", min: 50, max: 99.99 });
const valueInput: CalcInput = { key: "value", label: "Portfolio value", default: 1000000, step: 10000, min: 0 };
const horizonInput: CalcInput = { key: "h", label: "Holding period (days)", default: 1, step: 1, min: 1 };

/** Read the return series: the built-in sample or the user's own (percent) values. */
function readReturns(v: CalcValues): { returns: number[]; source: string } {
  if (str(v, "source", "sample") === "custom") {
    return { returns: series(v, "returns", "Return series", 10), source: "your series" };
  }
  return { returns: [...SAMPLE_DAILY_RETURNS], source: "the built-in sample of 250 synthetic daily returns" };
}

function histogram(returns: number[], bins = 20): Record<string, number | string>[] {
  const lo = Math.min(...returns);
  const hi = Math.max(...returns);
  const w = (hi - lo) / bins || 1;
  const counts = new Array(bins).fill(0) as number[];
  for (const x of returns) counts[Math.min(bins - 1, Math.floor((x - lo) / w))]++;
  return counts.map((c, i) => ({ "Return (%)": r((lo + (i + 0.5) * w) * 100, 3), Count: c }));
}

const sourceInputs: CalcInput[] = [
  { key: "source", label: "Return data", type: "select", default: "sample", options: [
    { value: "sample", label: "Built-in sample (250 synthetic daily returns)" },
    { value: "custom", label: "My own series (below)" },
  ] },
  { key: "returns", label: "Your daily returns (%)", type: "series", default: "-2.1, 0.4, 1.3, -0.8, 0.2, -1.5, 0.9, 0.3, -3.2, 1.1, 0.6, -0.4, 0.8, -1.9, 0.5, 1.4, -0.7, 0.1, -2.6, 0.9", help: "Used when 'My own series' is selected; at least 10 values." },
];

export const parametricVarCalc: CalculatorDef = {
  slug: "parametric-var",
  title: "Parametric (Normal) VaR",
  category: "Risk Management",
  description: "Delta-normal value at risk with square-root-of-time scaling and an optional expected return.",
  formula: String.raw`\begin{aligned}
VaR_{c,h} &= V\left(z_c\,\sigma\sqrt{h} - \mu\,h\right)\\
&\text{or } V\,z_c\,\sigma\sqrt{h} \text{ when the mean is ignored},\quad z_c = N^{-1}(c)
\end{aligned}`,
  explanation: String.raw`Parametric VaR assumes portfolio returns are **normally distributed**. The loss that is exceeded with probability $1-c$ then sits $z_c$ standard deviations below the mean. With independent daily returns, the variance grows in proportion to time, so volatility scales with $\sqrt{h}$ and the mean with $h$.

Over short horizons the mean is often set to zero, which is slightly conservative. VaR is a **threshold**, not a worst case: it says nothing about how large losses are once they go beyond it. Expected shortfall answers that question.`,
  inputs: [
    valueInput,
    { key: "mu", label: "Expected daily return (μ)", default: 0.05, step: 0.01, suffix: "%" },
    { key: "sigma", label: "Daily volatility (σ)", default: 1.2, step: 0.05, suffix: "%", min: 0 },
    confInput(99),
    { ...horizonInput, default: 10 },
    { key: "useMean", label: "Include expected return", type: "select", default: "no", options: [
      { value: "no", label: "No (μ = 0)" },
      { value: "yes", label: "Yes" },
    ] },
  ],
  compute: safeCompute((v) => {
    const V = num(v, "value", "Portfolio value");
    const sigma = pct(v, "sigma", "Volatility");
    check(V > 0, "Portfolio value must be positive.");
    check(sigma > 0, "Volatility must be positive.");
    const c = confidence(v);
    const h = horizon(v);
    const res = parametricVar(V, pct(v, "mu", "Mean"), sigma, c, h, str(v, "useMean", "no") === "yes");
    return {
      outputs: [
        { label: `${(c * 100).toFixed(2)}% ${h}-day VaR`, value: res.var, format: "currency", decimals: 2, highlight: true },
        { label: "VaR as % of value", value: res.varPct, format: "percent", decimals: 4, highlight: true },
        { label: "z-score", value: res.z, format: "number", decimals: 4 },
        { label: "Horizon volatility σ√h", value: res.scaledSigma, format: "percent", decimals: 4 },
        { label: "Horizon mean μh", value: res.scaledMean, format: "percent", decimals: 4 },
        { label: "1-day VaR", value: parametricVar(V, pct(v, "mu", "Mean"), sigma, c, 1, str(v, "useMean", "no") === "yes").var, format: "currency", decimals: 2 },
      ],
    };
  }),
  courses: [COURSES.frm1, COURSES.frm2],
};

export const historicalVarCalc: CalculatorDef = {
  slug: "historical-var",
  title: "Historical Simulation VaR",
  category: "Risk Management",
  description: "VaR read directly from the empirical distribution of past returns, using a built-in sample or your own series.",
  formula: String.raw`\begin{aligned}
&R_{(1)} \le R_{(2)} \le \dots \le R_{(n)} \quad\text{(sorted returns)},\qquad k = \lceil n(1-c)\rceil\\
&VaR_{c} = -V\,R_{(k)},\qquad VaR_{c,h} \approx VaR_{c}\sqrt{h}
\end{aligned}`,
  explanation: String.raw`Historical simulation makes no assumption about the shape of the return distribution. It replays past returns on today's portfolio and reads the loss quantile straight from the data. Here VaR is the $k$-th worst return with $k = \lceil n(1-c) \rceil$. For 500 observations at 99% that is the 5th worst loss, and for 250 at 95% the 13th worst. Quantile conventions differ between textbooks and software, so other tools may give slightly different numbers.

The method captures fat tails and skew, but only those present in the sample period. With few observations the estimate is noisy. Multi-day VaR uses the square-root-of-time rule. The built-in dataset is **synthetic**: 250 daily returns from a seeded, fat-tailed random generator.`,
  inputs: [...sourceInputs, valueInput, confInput(95), horizonInput],
  compute: safeCompute((v) => {
    const V = num(v, "value", "Portfolio value");
    check(V > 0, "Portfolio value must be positive.");
    const c = confidence(v);
    const h = horizon(v);
    const { returns, source } = readReturns(v);
    const res = historicalVarES(returns, c, V, h);
    return {
      outputs: [
        { label: `${(c * 100).toFixed(2)}% ${h}-day historical VaR`, value: res.var, format: "currency", decimals: 2, highlight: true },
        { label: "VaR as % of value", value: res.varPct, format: "percent", decimals: 4, highlight: true },
        { label: "Observations (n)", value: res.n, format: "integer" },
        { label: "VaR observation rank (k-th worst)", value: res.k, format: "integer" },
        { label: "Worst return in sample", value: Math.min(...returns), format: "percent", decimals: 4 },
        { label: "Average of tail (ES, same horizon)", value: res.es, format: "currency", decimals: 2 },
      ],
      table: { title: `The ${res.k} worst returns`, columns: ["Rank", "Return", "Loss on portfolio (1-day)"], rows: res.tail.map((x, i) => [i + 1, `${(x * 100).toFixed(4)}%`, r(-x * V, 2)]) },
      chart: { type: "bar", title: "Distribution of returns", xKey: "Return (%)", yKeys: ["Count"], data: histogram(returns) },
      notes: [`Using ${source}.`],
    };
  }),
  courses: [COURSES.frm1, COURSES.frm2],
};

export const expectedShortfallCalc: CalculatorDef = {
  slug: "expected-shortfall",
  title: "Expected Shortfall (CVaR)",
  category: "Risk Management",
  description: "Average loss beyond VaR, by historical simulation or under a normal distribution.",
  formula: String.raw`\begin{aligned}
ES_c^{\text{hist}} &= -\frac{V}{k}\sum_{i=1}^{k} R_{(i)},\qquad k = \lceil n(1-c)\rceil\\
ES_c^{\text{normal}} &= V\left(\sigma\sqrt{h}\,\frac{\varphi(z_c)}{1-c} - \mu h\right)
\end{aligned}`,
  explanation: String.raw`Expected shortfall answers the question VaR leaves open: **when** the loss goes past VaR, how large is it on average? ES is a coherent risk measure, because it rewards diversification, and the Basel market-risk framework uses it at 97.5% in place of 99% VaR.

The historical version averages the $k$ worst returns, the same tail that defines historical VaR. The normal version has a closed form, where $\varphi$ is the standard normal density. Under normality, ES at 97.5% is almost exactly equal to VaR at 99%.`,
  inputs: [
    { key: "method", label: "Method", type: "select", default: "historical", options: [
      { value: "historical", label: "Historical simulation" },
      { value: "normal", label: "Normal (parametric)" },
    ] },
    ...sourceInputs,
    { key: "mu", label: "Daily mean (normal method)", default: 0, step: 0.01, suffix: "%" },
    { key: "sigma", label: "Daily volatility (normal method)", default: 1.2, step: 0.05, suffix: "%", min: 0 },
    valueInput,
    confInput(97.5),
    horizonInput,
  ],
  compute: safeCompute((v) => {
    const V = num(v, "value", "Portfolio value");
    check(V > 0, "Portfolio value must be positive.");
    const c = confidence(v);
    const h = horizon(v);
    if (str(v, "method", "historical") === "normal") {
      const mu = pct(v, "mu", "Mean");
      const sigma = pct(v, "sigma", "Volatility");
      check(sigma > 0, "Volatility must be positive.");
      const es = parametricES(V, mu, sigma, c, h, true);
      const vr = parametricVar(V, mu, sigma, c, h, true);
      return {
        outputs: [
          { label: `${(c * 100).toFixed(2)}% ${h}-day ES (normal)`, value: es.es, format: "currency", decimals: 2, highlight: true },
          { label: "ES as % of value", value: es.esPct, format: "percent", decimals: 4, highlight: true },
          { label: "VaR at the same confidence", value: vr.var, format: "currency", decimals: 2 },
          { label: "ES / VaR", value: es.es / vr.var, format: "number", decimals: 4 },
        ],
      };
    }
    const { returns, source } = readReturns(v);
    const res = historicalVarES(returns, c, V, h);
    return {
      outputs: [
        { label: `${(c * 100).toFixed(2)}% ${h}-day ES (historical)`, value: res.es, format: "currency", decimals: 2, highlight: true },
        { label: "ES as % of value", value: res.esPct, format: "percent", decimals: 4, highlight: true },
        { label: "Historical VaR at the same confidence", value: res.var, format: "currency", decimals: 2 },
        { label: "ES / VaR", value: res.es / res.var, format: "number", decimals: 4 },
        { label: "Tail observations averaged (k)", value: res.k, format: "integer" },
      ],
      table: { title: "Tail returns averaged", columns: ["Rank", "Return"], rows: res.tail.map((x, i) => [i + 1, `${(x * 100).toFixed(4)}%`]) },
      notes: [`Using ${source}.`],
    };
  }),
  courses: [COURSES.frm1, COURSES.frm2],
};

export const portfolioVarCalc: CalculatorDef = {
  slug: "portfolio-var",
  title: "Two-Asset Portfolio VaR",
  category: "Risk Management",
  description: "Diversified delta-normal VaR of two positions, undiversified VaR, diversification benefit and component VaR.",
  formula: String.raw`\begin{aligned}
\sigma_P &= \sqrt{V_1^2\sigma_1^2 + V_2^2\sigma_2^2 + 2\rho V_1V_2\sigma_1\sigma_2}\\
VaR_P &= z_c\,\sigma_P\sqrt{h} = \sqrt{VaR_1^2 + VaR_2^2 + 2\rho\,VaR_1VaR_2}
\end{aligned}`,
  explanation: String.raw`Under the normal model, the VaRs of two positions combine exactly like standard deviations. Adding them gives the **undiversified** VaR, which is correct only when the correlation is 1. Any lower correlation produces a smaller portfolio VaR, and the gap is the **diversification benefit**.

**Component VaR** splits the portfolio VaR into each position's contribution. The two components add up exactly to the total, which shows where the risk comes from. Volatilities are daily, and VaR is scaled to the holding period with $\sqrt{h}$.`,
  inputs: [
    { key: "v1", label: "Position 1 value (V₁)", default: 600000, step: 10000 },
    { key: "s1", label: "Position 1 daily volatility (σ₁)", default: 1.5, step: 0.05, suffix: "%", min: 0 },
    { key: "v2", label: "Position 2 value (V₂)", default: 400000, step: 10000 },
    { key: "s2", label: "Position 2 daily volatility (σ₂)", default: 1.0, step: 0.05, suffix: "%", min: 0 },
    { key: "rho", label: "Correlation (ρ)", default: 0.3, step: 0.05, min: -1, max: 1 },
    confInput(99),
    { ...horizonInput, default: 10 },
  ],
  compute: safeCompute((v) => {
    const s1 = pct(v, "s1", "σ₁");
    const s2 = pct(v, "s2", "σ₂");
    const rho = num(v, "rho", "Correlation");
    check(s1 >= 0 && s2 >= 0, "Volatilities cannot be negative.");
    check(rho >= -1 && rho <= 1, "Correlation must be between −1 and 1.");
    const res = twoAssetVar(num(v, "v1", "V₁"), num(v, "v2", "V₂"), s1, s2, rho, confidence(v), horizon(v));
    check(res.portfolioSigma > 0, "Portfolio volatility is zero, so VaR is zero.");
    return {
      outputs: [
        { label: "Portfolio (diversified) VaR", value: res.portfolioVar, format: "currency", decimals: 2, highlight: true },
        { label: "VaR position 1", value: res.var1, format: "currency", decimals: 2 },
        { label: "VaR position 2", value: res.var2, format: "currency", decimals: 2 },
        { label: "Undiversified VaR (VaR₁ + VaR₂)", value: res.undiversifiedVar, format: "currency", decimals: 2 },
        { label: "Diversification benefit", value: res.diversificationBenefit, format: "currency", decimals: 2, highlight: true },
        { label: "Component VaR position 1", value: res.component1, format: "currency", decimals: 2 },
        { label: "Component VaR position 2", value: res.component2, format: "currency", decimals: 2 },
        { label: "Portfolio daily volatility (currency)", value: res.portfolioSigma, format: "currency", decimals: 2 },
      ],
    };
  }),
  courses: [COURSES.frm1, COURSES.frm2],
};

export const ewmaCalc: CalculatorDef = {
  slug: "ewma-volatility",
  title: "EWMA Volatility",
  category: "Risk Management",
  description: "RiskMetrics exponentially weighted moving average volatility from a return series.",
  formula: String.raw`\begin{aligned}
\sigma_n^2 &= \lambda\,\sigma_{n-1}^2 + (1-\lambda)\,u_{n-1}^2\\
&= (1-\lambda)\sum_{i\ge 1}\lambda^{i-1}u_{n-i}^2
\end{aligned}`,
  explanation: String.raw`EWMA updates the variance estimate every day. It keeps a fraction $\lambda$ of yesterday's variance and adds a weight of $1-\lambda$ on yesterday's squared return, so observations lose influence exponentially with age. RiskMetrics uses $\lambda = 0.94$ for daily data. A lower $\lambda$ reacts faster to shocks, and a higher one gives a smoother estimate.

Unlike GARCH, EWMA has no long-run level to revert to: its forecast for every future day equals today's estimate. The recursion needs a starting value, which can be the first squared return or the mean squared return of the whole series. Returns are treated as having zero mean.`,
  inputs: [
    { key: "returns", label: "Daily returns (%)", type: "series", default: "0.8, -1.2, 0.5, 1.6, -2.3, 0.4, -0.6, 1.1, -0.9, 2.4, -1.7, 0.3, 0.9, -0.4, -2.8, 1.5, 0.7, -1.1, 0.2, 1.3" },
    { key: "lambda", label: "Decay factor (λ)", default: 0.94, step: 0.01, min: 0, max: 1 },
    { key: "seed", label: "Initial variance", type: "select", default: "first", options: [
      { value: "first", label: "First squared return (u₁²)" },
      { value: "sample", label: "Mean squared return of the series" },
    ] },
    { key: "days", label: "Trading days per year (for annualising)", type: "integer", default: 252, step: 1, min: 1 },
  ],
  compute: safeCompute((v) => {
    const rs = series(v, "returns", "Return series", 2);
    const lambda = num(v, "lambda", "λ");
    check(lambda > 0 && lambda < 1, "λ must be strictly between 0 and 1.");
    const days = num(v, "days", "Days per year");
    check(days > 0, "Days per year must be positive.");
    const res = ewmaVolatility(rs, lambda, str(v, "seed", "first") === "sample" ? "sample" : "first");
    return {
      outputs: [
        { label: "EWMA daily volatility (next day)", value: res.forecastVol, format: "percent", decimals: 4, highlight: true },
        { label: "Annualised volatility", value: res.forecastVol * Math.sqrt(days), format: "percent", decimals: 4, highlight: true },
        { label: "Variance forecast", value: res.forecastVariance, format: "number", decimals: 8 },
        { label: "Equal-weight volatility (RMS, zero mean)", value: Math.sqrt(rs.reduce((a, x) => a + x * x, 0) / rs.length), format: "percent", decimals: 4 },
      ],
      table: {
        title: "EWMA recursion (estimate in force before each return)",
        columns: ["Day", "Return", "Variance σ²", "Volatility σ"],
        rows: [
          ...res.rows.map((x) => [x.t, `${(x.ret * 100).toFixed(4)}%`, r(x.varianceBefore, 8), `${(x.volBefore * 100).toFixed(4)}%`]),
          [rs.length + 1, "(forecast)", r(res.forecastVariance, 8), `${(res.forecastVol * 100).toFixed(4)}%`],
        ],
      },
      chart: {
        type: "line",
        title: "EWMA volatility (%)",
        xKey: "Day",
        yKeys: ["Volatility"],
        data: [...res.rows.map((x) => ({ Day: x.t, Volatility: r(x.volBefore * 100, 4) })), { Day: rs.length + 1, Volatility: r(res.forecastVol * 100, 4) }],
      },
    };
  }),
  courses: [COURSES.frm1, COURSES.frm2],
};

export const garchCalc: CalculatorDef = {
  slug: "garch-forecast",
  title: "GARCH(1,1) Volatility Forecast",
  category: "Risk Management",
  description: "Long-run variance, mean-reverting n-day-ahead variance forecasts and term volatility from GARCH(1,1).",
  formula: String.raw`\begin{aligned}
\sigma_n^2 &= \omega + \alpha\,u_{n-1}^2 + \beta\,\sigma_{n-1}^2,\qquad V_L = \frac{\omega}{1-\alpha-\beta}\\
E\big[\sigma_{n+t}^2\big] &= V_L + (\alpha+\beta)^t\,\big(\sigma_n^2 - V_L\big)
\end{aligned}`,
  explanation: String.raw`GARCH(1,1) extends EWMA by adding a weight on a **long-run variance** $V_L$. Forecasts therefore **mean-revert**: if today's volatility is above its long-run level, expected future variance decays towards $V_L$ at the rate $\alpha + \beta$ per day. The persistence $\alpha + \beta$ must be below 1. Its half-life, $\ln 2 / \ln\frac{1}{\alpha+\beta}$, is how many days it takes for half of a volatility shock to fade.

The variance over the next $h$ days is the **sum** of the expected daily variances. Its square root is the volatility used for an $h$-day VaR.`,
  inputs: [
    { key: "omega", label: "ω (omega)", default: 0.000002, step: 0.0000001, min: 0 },
    { key: "alpha", label: "α (alpha, weight on u²)", default: 0.13, step: 0.01, min: 0 },
    { key: "beta", label: "β (beta, weight on σ²)", default: 0.86, step: 0.01, min: 0 },
    { key: "vol", label: "Current daily volatility estimate (σₙ)", default: 1.6, step: 0.05, suffix: "%", min: 0 },
    { key: "h", label: "Forecast horizon (days)", type: "integer", default: 10, step: 1, min: 1 },
    { key: "days", label: "Trading days per year", type: "integer", default: 252, step: 1, min: 1 },
  ],
  compute: safeCompute((v) => {
    const omega = num(v, "omega", "ω");
    const alpha = num(v, "alpha", "α");
    const beta = num(v, "beta", "β");
    check(omega > 0, "ω must be positive.");
    check(alpha >= 0 && beta >= 0, "α and β cannot be negative.");
    check(alpha + beta < 1, "α + β must be below 1 for a finite long-run variance.");
    const vol = pct(v, "vol", "Current volatility");
    check(vol > 0, "Current volatility must be positive.");
    const h = int(v, "h", "Horizon", 1, 1000);
    const days = num(v, "days", "Days per year");
    check(days > 0, "Days per year must be positive.");
    const res = garchForecast(omega, alpha, beta, vol * vol, h);
    const step = Math.max(1, Math.ceil(h / 250));
    const outputs: CalcOutput[] = [
      { label: `Expected daily volatility on day n+${h}`, value: Math.sqrt(res.forecastVariance), format: "percent", decimals: 4, highlight: true },
      { label: `${h}-day volatility √(Σ E[σ²])`, value: Math.sqrt(res.cumulativeVariance), format: "percent", decimals: 4, highlight: true },
      { label: "Long-run daily volatility √V_L", value: res.longRunVol, format: "percent", decimals: 4 },
      { label: "Long-run annual volatility", value: res.longRunVol * Math.sqrt(days), format: "percent", decimals: 4 },
      { label: "Long-run variance V_L", value: res.longRunVariance, format: "number", decimals: 8 },
      { label: "Persistence (α + β)", value: res.persistence, format: "number", decimals: 4 },
      { label: "Half-life of shocks (days)", value: res.halfLife, format: "number", decimals: 2 },
      { label: `Average annualised volatility over ${h} days`, value: Math.sqrt((res.cumulativeVariance / h) * days), format: "percent", decimals: 4 },
    ];
    return {
      outputs,
      table: {
        title: "Forecast path",
        columns: ["Day ahead (t)", "E[σ²]", "Daily vol", "Annualised vol"],
        rows: res.path.filter((x) => x.t % step === 0 || x.t === h).map((x) => [x.t, r(x.variance, 10), `${(x.vol * 100).toFixed(4)}%`, `${(x.vol * Math.sqrt(days) * 100).toFixed(4)}%`]),
      },
      chart: {
        type: "line",
        title: "Expected daily volatility (%)",
        xKey: "Day",
        yKeys: ["Forecast", "Long-run"],
        data: res.path.filter((x) => x.t % step === 0 || x.t === h).map((x) => ({ Day: x.t, Forecast: r(x.vol * 100, 4), "Long-run": r(res.longRunVol * 100, 4) })),
      },
    };
  }),
  courses: [COURSES.frm1, COURSES.frm2],
};

export const expectedLossCalc: CalculatorDef = {
  slug: "expected-loss",
  title: "Expected & Unexpected Credit Loss",
  category: "Risk Management",
  description: "Expected loss PD × LGD × EAD and the unexpected loss (standard deviation of loss) for a single exposure.",
  formula: String.raw`\begin{aligned}
EL &= PD \times LGD \times EAD,\qquad LGD = 1 - RR\\
UL &= EAD\,\sqrt{PD\,\sigma_{LGD}^2 + LGD^2\,PD\,(1-PD)}
\end{aligned}`,
  explanation: String.raw`**Expected loss** is the average credit loss you should anticipate. It is covered by pricing and provisions. It multiplies three things: the probability of default, the share of the exposure lost when default happens, and the exposure at default.

**Unexpected loss** is the standard deviation of the loss, the variability around EL that capital has to absorb. For a single loan, default is either-or, so UL is large compared with EL. Uncertainty in the recovery rate, entered as $\sigma_{LGD}$, adds to it. The formula assumes the default event and the LGD are independent.`,
  inputs: [
    { key: "ead", label: "Exposure at default (EAD)", default: 1000000, step: 10000, min: 0 },
    { key: "pd", label: "Probability of default (PD)", default: 2, step: 0.1, suffix: "%", min: 0, max: 100 },
    { key: "lgd", label: "Loss given default (LGD)", default: 45, step: 1, suffix: "%", min: 0, max: 100 },
    { key: "lgdStd", label: "Std deviation of LGD (σ_LGD)", default: 0, step: 1, suffix: "%", min: 0 },
  ],
  compute: safeCompute((v) => {
    const ead = num(v, "ead", "EAD");
    const pd = pct(v, "pd", "PD");
    const lgd = pct(v, "lgd", "LGD");
    const sd = pct(v, "lgdStd", "σ_LGD");
    check(ead >= 0, "EAD cannot be negative.");
    check(pd >= 0 && pd <= 1, "PD must be between 0% and 100%.");
    check(lgd >= 0 && lgd <= 1, "LGD must be between 0% and 100%.");
    check(sd >= 0, "σ_LGD cannot be negative.");
    const res = expectedLoss(pd, lgd, ead, sd);
    return {
      outputs: [
        { label: "Expected loss (EL)", value: res.expectedLoss, format: "currency", decimals: 2, highlight: true },
        { label: "Unexpected loss (UL)", value: res.unexpectedLoss, format: "currency", decimals: 2, highlight: true },
        { label: "EL as % of EAD", value: res.elRate, format: "percent", decimals: 4 },
        { label: "Recovery rate (1 − LGD)", value: 1 - lgd, format: "percent", decimals: 2 },
        { label: "UL / EL", value: res.expectedLoss > 0 ? res.unexpectedLoss / res.expectedLoss : "n/a", format: res.expectedLoss > 0 ? "number" : "text", decimals: 4 },
      ],
    };
  }),
  courses: [COURSES.frm1, COURSES.frm2],
};

export const hazardRateCalc: CalculatorDef = {
  slug: "hazard-rate",
  title: "Hazard Rate from Credit Spread",
  category: "Risk Management",
  description: "Risk-neutral default intensity implied by a credit spread and recovery rate, with survival and default probabilities.",
  formula: String.raw`\begin{aligned}
\lambda &\approx \frac{s}{1-R}\\
Q(T) &= e^{-\lambda T},\qquad PD(0,T) = 1 - e^{-\lambda T}
\end{aligned}`,
  explanation: String.raw`A credit spread compensates investors for expected default losses. If default arrives at a constant rate $\lambda$ per year and a fraction $1-R$ of the value is lost when it does, the expected loss rate is roughly $\lambda(1-R)$, and that should equal the spread $s$. Rearranging gives the **hazard rate**, the default intensity implied by the spread.

Survival to time $T$ is $e^{-\lambda T}$. The table shows, year by year, the cumulative PD, the unconditional (marginal) PD for each year, and the PD conditional on surviving to the start of that year. The probabilities are **risk-neutral**, so they are usually higher than default rates estimated from history.`,
  inputs: [
    { key: "spread", label: "Credit spread (s)", default: 150, step: 5, suffix: "bp", min: 0 },
    { key: "recovery", label: "Recovery rate (R)", default: 40, step: 1, suffix: "%", min: 0, max: 100 },
    { key: "years", label: "Horizon (years, T)", default: 5, step: 1, min: 0 },
  ],
  compute: safeCompute((v) => {
    const s = num(v, "spread", "Spread") / 10000;
    const R = pct(v, "recovery", "Recovery");
    const T = num(v, "years", "Horizon");
    check(s >= 0, "Spread cannot be negative.");
    check(R >= 0 && R < 1, "Recovery rate must be at least 0% and below 100%.");
    check(T > 0 && T <= 100, "Horizon must be between 0 and 100 years.");
    const res = hazardFromSpread(s, R, T);
    return {
      outputs: [
        { label: "Hazard rate (λ)", value: res.hazardRate, format: "percent", decimals: 4, highlight: true },
        { label: `Survival probability to year ${T}`, value: res.survival, format: "percent", decimals: 4 },
        { label: `Cumulative PD to year ${T}`, value: res.cumulativePd, format: "percent", decimals: 4, highlight: true },
        { label: "One-year PD", value: 1 - Math.exp(-res.hazardRate), format: "percent", decimals: 4 },
      ],
      table: {
        title: "Default probability term structure",
        columns: ["Year", "Survival", "Cumulative PD", "Marginal PD in year", "Conditional PD in year"],
        rows: res.schedule.map((x) => [r(x.year, 2), `${(x.survival * 100).toFixed(4)}%`, `${(x.cumulativePd * 100).toFixed(4)}%`, `${(x.marginalPd * 100).toFixed(4)}%`, `${(x.conditionalPd * 100).toFixed(4)}%`]),
      },
    };
  }),
  courses: [COURSES.frm1, COURSES.frm2],
};
