/**
 * Calculator definition contract. Each calculator is a pure, config-driven definition rendered by
 * components/calculators/CalculatorView.tsx. Maths lives in /lib/finance and is unit-tested.
 */

export type CalcCategory =
  | "Time Value & Returns"
  | "Portfolio & Performance"
  | "Corporate Finance & Valuation"
  | "Fixed Income"
  | "Derivatives"
  | "Risk Management"
  | "Statistics"
  | "Financial Analysis";

export interface CalcInput {
  key: string;
  label: string;
  /**
   * number  - numeric input (percent inputs are entered as e.g. 5 for 5% and use suffix "%")
   * integer - whole number input
   * select  - dropdown; value is the option's `value` string
   * series  - comma/space/newline separated list of numbers, passed to compute as a string
   */
  type?: "number" | "integer" | "select" | "series";
  default: number | string;
  step?: number;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
  help?: string;
  options?: { value: string; label: string }[];
}

export type CalcValues = Record<string, number | string>;

export interface CalcOutput {
  label: string;
  value: number | string;
  /** percent: value is a fraction (0.05) and is displayed as 5.00% */
  format?: "number" | "percent" | "currency" | "integer" | "text";
  decimals?: number;
  highlight?: boolean;
}

export interface CalcResult {
  outputs: CalcOutput[];
  table?: { title?: string; columns: string[]; rows: (string | number)[][] };
  chart?: { type: "line" | "bar"; title?: string; xKey: string; yKeys: string[]; data: Record<string, number | string>[] };
  notes?: string[];
  /** If set, the UI shows this message instead of outputs (e.g. invalid input). */
  error?: string;
}

export interface CalculatorDef {
  slug: string;
  title: string;
  category: CalcCategory;
  /** One-sentence description for cards. */
  description: string;
  /** KaTeX formula(s). Use \begin{aligned} ... \end{aligned} for several lines. */
  formula: string;
  /** Short Markdown explanation (may include $...$ math). */
  explanation: string;
  inputs: CalcInput[];
  compute: (values: CalcValues) => CalcResult;
  /** Related course slugs. */
  courses: string[];
}

/** Parse a "series" input string into numbers. */
export function parseSeries(s: string | number): number[] {
  if (typeof s === "number") return [s];
  return s
    .split(/[\s,;]+/)
    .map((x) => x.trim())
    .filter(Boolean)
    .map(Number)
    .filter((x) => Number.isFinite(x));
}

export const CALCULATOR_SLUGS = [
  "tvm",
  "npv-irr",
  "holding-period-return",
  "arithmetic-geometric-mean",
  "two-asset-portfolio",
  "risk-adjusted-performance",
  "capm",
  "wacc",
  "fcff-dcf",
  "gordon-growth",
  "bond-price-ytm",
  "duration-convexity",
  "forward-rates",
  "forward-pricing-cost-of-carry",
  "fra-valuation",
  "black-scholes",
  "binomial-option",
  "put-call-parity",
  "parametric-var",
  "historical-var",
  "expected-shortfall",
  "portfolio-var",
  "ewma-volatility",
  "garch-forecast",
  "expected-loss",
  "hazard-rate",
  "hypothesis-test",
  "dupont",
  "loan-amortization",
  "covered-interest-parity",
] as const;

export type CalculatorSlug = (typeof CALCULATOR_SLUGS)[number];
