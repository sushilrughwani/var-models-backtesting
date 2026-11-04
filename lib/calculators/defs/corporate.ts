/** Calculators: cost of capital and equity valuation. */
import type { CalcOutput, CalculatorDef } from "../types";
import { COURSES, check, num, pct, r, safeCompute, series } from "../helpers";
import { wacc } from "@/lib/finance/corporate";
import { fcffDcf, gordonGrowth, gordonImpliedReturn } from "@/lib/finance/valuation";

export const waccCalc: CalculatorDef = {
  slug: "wacc",
  title: "Weighted Average Cost of Capital",
  category: "Corporate Finance & Valuation",
  description: "WACC from market values of equity, debt and preferred stock and their component costs.",
  formula: String.raw`\begin{aligned}
WACC &= w_d\,r_d(1-t) + w_p\,r_p + w_e\,r_e\\
w_d &= \tfrac{D}{V},\; w_p = \tfrac{P}{V},\; w_e = \tfrac{E}{V},\qquad V = D + P + E
\end{aligned}`,
  explanation: String.raw`The WACC is the return the firm must earn on its assets to satisfy all its providers of capital together. It is the hurdle rate for projects of average risk, and the discount rate applied to free cash flow to the firm.

Each source of capital is weighted by its **market value**, using target weights where they are known. Interest is tax-deductible, so debt enters at its **after-tax** cost $r_d(1-t)$. Preferred dividends and equity returns are not deductible and enter at their full cost.`,
  inputs: [
    { key: "E", label: "Market value of equity (E)", default: 600, step: 10, min: 0 },
    { key: "D", label: "Market value of debt (D)", default: 400, step: 10, min: 0 },
    { key: "P", label: "Market value of preferred (P)", default: 0, step: 10, min: 0 },
    { key: "re", label: "Cost of equity (r_e)", default: 10, step: 0.1, suffix: "%" },
    { key: "rd", label: "Pre-tax cost of debt (r_d)", default: 6, step: 0.1, suffix: "%" },
    { key: "rp", label: "Cost of preferred (r_p)", default: 7, step: 0.1, suffix: "%" },
    { key: "tax", label: "Marginal tax rate (t)", default: 25, step: 1, suffix: "%", min: 0, max: 100 },
  ],
  compute: safeCompute((v) => {
    const E = num(v, "E", "Equity");
    const D = num(v, "D", "Debt");
    const P = num(v, "P", "Preferred");
    check(E >= 0 && D >= 0 && P >= 0, "Capital values cannot be negative.");
    check(E + D + P > 0, "Total capital must be positive.");
    const t = pct(v, "tax", "Tax rate");
    check(t >= 0 && t <= 1, "Tax rate must be between 0% and 100%.");
    const res = wacc(E, D, P, pct(v, "re", "Cost of equity"), pct(v, "rd", "Cost of debt"), pct(v, "rp", "Cost of preferred"), t);
    return {
      outputs: [
        { label: "WACC", value: res.wacc, format: "percent", decimals: 4, highlight: true },
        { label: "Weight of equity", value: res.weightEquity, format: "percent", decimals: 2 },
        { label: "Weight of debt", value: res.weightDebt, format: "percent", decimals: 2 },
        { label: "Weight of preferred", value: res.weightPreferred, format: "percent", decimals: 2 },
        { label: "After-tax cost of debt", value: res.afterTaxCostOfDebt, format: "percent", decimals: 4 },
        { label: "Total capital (V)", value: res.totalCapital, format: "currency", decimals: 2 },
      ],
    };
  }),
  courses: [COURSES.cfa1, COURSES.cfa2, COURSES.fm],
};

export const fcffDcfCalc: CalculatorDef = {
  slug: "fcff-dcf",
  title: "FCFF Discounted Cash Flow",
  category: "Corporate Finance & Valuation",
  description: "Enterprise value, equity value and value per share from explicit FCFF forecasts and a terminal growth rate.",
  formula: String.raw`\begin{aligned}
EV &= \sum_{t=1}^{N}\frac{FCFF_t}{(1+WACC)^t} + \frac{TV_N}{(1+WACC)^N},\qquad TV_N = \frac{FCFF_N(1+g)}{WACC-g}\\
\text{Equity} &= EV - \text{Debt} + \text{Cash},\qquad \text{Value per share} = \frac{\text{Equity}}{\text{Shares}}
\end{aligned}`,
  explanation: String.raw`Free cash flow to the firm is the cash available to **all** capital providers, so it is discounted at the WACC. The forecast has two stages. Explicit FCFFs are discounted year by year. After year $N$ the cash flows are assumed to grow at a constant rate $g$ forever, and the **terminal value** captures them with the Gordon growth formula.

Subtracting debt and adding cash (that is, subtracting net debt) turns enterprise value into equity value. The terminal value often makes up most of the total, so check how sensitive the result is to $g$ and the WACC. The growth rate must stay below the WACC.`,
  inputs: [
    { key: "fcff", label: "Explicit FCFF forecasts (years 1…N)", type: "series", default: "100, 110, 120, 130, 140" },
    { key: "wacc", label: "WACC", default: 9, step: 0.1, suffix: "%" },
    { key: "g", label: "Terminal growth rate (g)", default: 2.5, step: 0.1, suffix: "%" },
    { key: "debt", label: "Market value of debt", default: 500, step: 10, min: 0 },
    { key: "cash", label: "Cash and equivalents", default: 100, step: 10, min: 0 },
    { key: "shares", label: "Shares outstanding", default: 50, step: 1, min: 0 },
  ],
  compute: safeCompute((v) => {
    const fcff = series(v, "fcff", "FCFF forecasts", 1, false);
    const w = pct(v, "wacc", "WACC");
    const g = pct(v, "g", "Growth rate");
    const shares = num(v, "shares", "Shares");
    check(w > -1, "WACC must be greater than −100%.");
    check(w > g, "WACC must exceed the terminal growth rate.");
    check(shares > 0, "Shares outstanding must be positive.");
    const res = fcffDcf(fcff, w, g, num(v, "debt", "Debt"), num(v, "cash", "Cash"), shares);
    return {
      outputs: [
        { label: "Enterprise value", value: res.enterpriseValue, format: "currency", decimals: 2, highlight: true },
        { label: "Equity value", value: res.equityValue, format: "currency", decimals: 2, highlight: true },
        { label: "Value per share", value: res.valuePerShare, format: "currency", decimals: 2, highlight: true },
        { label: "PV of explicit FCFF", value: res.pvExplicit, format: "currency", decimals: 2 },
        { label: "Terminal value (at year N)", value: res.terminalValue, format: "currency", decimals: 2 },
        { label: "PV of terminal value", value: res.pvTerminal, format: "currency", decimals: 2 },
        { label: "Terminal value share of EV", value: res.terminalShare, format: "percent", decimals: 2 },
      ],
      table: {
        title: "Discounted FCFF",
        columns: ["Year", "FCFF", "Discount factor", "PV"],
        rows: fcff.map((c, i) => [i + 1, r(c, 2), r(1 / Math.pow(1 + w, i + 1), 6), r(res.pvByYear[i], 2)]),
      },
    };
  }),
  courses: [COURSES.cfa2, COURSES.fm],
};

export const gordonCalc: CalculatorDef = {
  slug: "gordon-growth",
  title: "Gordon Growth Model",
  category: "Corporate Finance & Valuation",
  description: "Intrinsic value of a stock with dividends growing at a constant rate, and the return implied by a market price.",
  formula: String.raw`\begin{aligned}
V_0 &= \frac{D_1}{r-g} = \frac{D_0(1+g)}{r-g}\\
r &= \frac{D_1}{P_0} + g
\end{aligned}`,
  explanation: String.raw`If dividends grow at a constant rate $g$ forever, the present value of the infinite dividend stream collapses to next year's dividend divided by $r - g$. The formula only makes sense when the required return $r$ is above $g$, and the value is very sensitive to the gap between them.

Rearranging the formula with the market price in place of value gives the return the market **implies**: the dividend yield plus growth. If that implied return is above your required return, the stock looks undervalued.`,
  inputs: [
    { key: "d0", label: "Current dividend (D₀)", default: 2, step: 0.05, min: 0 },
    { key: "g", label: "Constant growth rate (g)", default: 4, step: 0.1, suffix: "%" },
    { key: "r", label: "Required return (r)", default: 9, step: 0.1, suffix: "%" },
    { key: "price", label: "Market price (P₀, optional)", default: 40, step: 0.5, min: 0, help: "Set to 0 to skip the implied-return calculation." },
  ],
  compute: safeCompute((v) => {
    const d0 = num(v, "d0", "Dividend");
    const g = pct(v, "g", "Growth rate");
    const req = pct(v, "r", "Required return");
    const price = num(v, "price", "Market price");
    check(d0 >= 0, "Dividend cannot be negative.");
    check(req > g, "Required return must exceed the growth rate.");
    const res = gordonGrowth(d0, g, req);
    const outputs: CalcOutput[] = [
      { label: "Intrinsic value (V₀)", value: res.value, format: "currency", decimals: 2, highlight: true },
      { label: "Next dividend (D₁)", value: res.nextDividend, format: "currency", decimals: 4 },
      { label: "Dividend yield at value (D₁/V₀)", value: res.dividendYield, format: "percent", decimals: 4 },
    ];
    if (price > 0) {
      const implied = gordonImpliedReturn(d0, g, price);
      outputs.push({ label: "Implied required return at market price", value: implied, format: "percent", decimals: 4 });
      outputs.push({ label: "Verdict", value: res.value > price ? "Undervalued (V₀ > P₀)" : res.value < price ? "Overvalued (V₀ < P₀)" : "Fairly valued", format: "text" });
    }
    return { outputs };
  }),
  courses: [COURSES.cfa1, COURSES.cfa2],
};
