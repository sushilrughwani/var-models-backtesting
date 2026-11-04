/** Calculators: time value of money, NPV/IRR, returns and loan amortization. */
import type { CalculatorDef } from "../types";
import { COURSES, check, num, pct, r, safeCompute, series, str } from "../helpers";
import { amortize, discountedPayback, irr, npv, profitabilityIndex, tvmFV, tvmN, tvmPMT, tvmPV, tvmRate, type PaymentTiming } from "@/lib/finance/tvm";
import { annualizeReturn, arithmeticMeanReturn, geometricMeanReturn, holdingPeriodReturn, logReturn } from "@/lib/finance/returns";
import { stdev } from "@/lib/finance/stats";

export const tvmCalc: CalculatorDef = {
  slug: "tvm",
  title: "Time Value of Money Solver",
  category: "Time Value & Returns",
  description: "Solve for PV, FV, PMT, N or the periodic rate, with ordinary annuity or annuity due timing.",
  formula: String.raw`\begin{aligned}
&PV(1+r)^N + PMT\,(1+r\cdot\text{type})\,\frac{(1+r)^N-1}{r} + FV = 0\\
&\text{type}=0 \text{ (end of period)},\quad \text{type}=1 \text{ (beginning of period)}
\end{aligned}`,
  explanation: String.raw`The five time-value variables are linked by one equation, so any four determine the fifth. The solver uses the financial-calculator **sign convention**: money you pay out is negative and money you receive is positive. A deposit of 1,000 today is therefore entered as $PV = -1000$, and the future value comes back positive.

$N$, $PV$, $PMT$ and $FV$ each have closed-form solutions. The rate does not, so it is found numerically: Newton's method first, then a bracketing bisection search if Newton fails. Choose **beginning of period** for an annuity due, such as rent paid in advance. Each payment then earns one extra period of interest, which multiplies the annuity part by $(1+r)$.`,
  inputs: [
    { key: "solveFor", label: "Solve for", type: "select", default: "fv", options: [
      { value: "fv", label: "Future value (FV)" },
      { value: "pv", label: "Present value (PV)" },
      { value: "pmt", label: "Payment (PMT)" },
      { value: "n", label: "Number of periods (N)" },
      { value: "rate", label: "Rate per period (I/Y)" },
    ] },
    { key: "n", label: "Number of periods (N)", default: 10, step: 1, min: 0 },
    { key: "rate", label: "Rate per period (I/Y)", default: 5, step: 0.1, suffix: "%" },
    { key: "pv", label: "Present value (PV)", default: -1000, step: 100 },
    { key: "pmt", label: "Payment per period (PMT)", default: -100, step: 10 },
    { key: "fv", label: "Future value (FV)", default: 0, step: 100 },
    { key: "timing", label: "Payment timing", type: "select", default: "end", options: [
      { value: "end", label: "End of period (ordinary annuity)" },
      { value: "begin", label: "Beginning of period (annuity due)" },
    ] },
  ],
  compute: safeCompute((v) => {
    const solveFor = str(v, "solveFor", "fv");
    const type: PaymentTiming = str(v, "timing") === "begin" ? 1 : 0;
    let n = num(v, "n", "N");
    let rate = pct(v, "rate", "Rate");
    let pv = num(v, "pv", "PV");
    let pmt = num(v, "pmt", "PMT");
    let fv = num(v, "fv", "FV");
    if (solveFor !== "rate") check(rate > -1, "The rate per period must be greater than −100%.");
    if (solveFor !== "n") check(n > 0, "N must be positive.");
    if (solveFor === "fv") fv = tvmFV(rate, n, pv, pmt, type);
    else if (solveFor === "pv") pv = tvmPV(rate, n, pmt, fv, type);
    else if (solveFor === "pmt") pmt = tvmPMT(rate, n, pv, fv, type);
    else if (solveFor === "n") {
      const res = tvmN(rate, pv, pmt, fv, type);
      check(res !== null, "No positive number of periods solves this problem. Check the signs of PV, PMT and FV (at least one must differ in sign).");
      n = res;
    } else {
      const res = tvmRate(n, pv, pmt, fv, type);
      check(res !== null, "No interest rate solves this problem. Check the signs of PV, PMT and FV (cash must flow in both directions).");
      rate = res;
    }
    const hl = (k: string) => solveFor === k;
    return {
      outputs: [
        { label: "Future value (FV)", value: fv, format: "currency", decimals: 2, highlight: hl("fv") },
        { label: "Present value (PV)", value: pv, format: "currency", decimals: 2, highlight: hl("pv") },
        { label: "Payment (PMT)", value: pmt, format: "currency", decimals: 2, highlight: hl("pmt") },
        { label: "Number of periods (N)", value: n, format: "number", decimals: 4, highlight: hl("n") },
        { label: "Rate per period (I/Y)", value: rate, format: "percent", decimals: 4, highlight: hl("rate") },
      ],
      notes: [type === 1 ? "Payments at the beginning of each period (annuity due)." : "Payments at the end of each period (ordinary annuity)."],
    };
  }),
  courses: [COURSES.cfa1, COURSES.excel, COURSES.fm],
};

export const npvIrrCalc: CalculatorDef = {
  slug: "npv-irr",
  title: "NPV & IRR",
  category: "Time Value & Returns",
  description: "Net present value, internal rate of return, profitability index and discounted payback of a cash-flow stream.",
  formula: String.raw`\begin{aligned}
NPV &= \sum_{t=0}^{N}\frac{CF_t}{(1+r)^t}\\
0 &= \sum_{t=0}^{N}\frac{CF_t}{(1+IRR)^t}
\end{aligned}`,
  explanation: String.raw`**NPV** discounts every cash flow back to today at the required return $r$ and adds them up. A positive NPV means the project earns more than its cost of capital, so it adds value. The **IRR** is the discount rate at which NPV is exactly zero. For a conventional project (one outflow followed by inflows), accepting when IRR exceeds $r$ gives the same decision as accepting when NPV is positive.

There is no formula for the IRR. The calculator scans a wide range of rates for every point where NPV changes sign and then refines each one by bisection. A cash-flow stream whose signs change more than once can have **several IRRs, or none**, and the calculator tells you when that happens. Enter $CF_0$ first, usually as a negative number for the investment.`,
  inputs: [
    { key: "rate", label: "Discount rate (r)", default: 10, step: 0.25, suffix: "%" },
    { key: "cashFlows", label: "Cash flows CF₀, CF₁, …", type: "series", default: "-1000, 300, 400, 500, 200", help: "Separate with commas or spaces; CF₀ first." },
  ],
  compute: safeCompute((v) => {
    const rate = pct(v, "rate", "Discount rate");
    check(rate > -1, "The discount rate must be greater than −100%.");
    const cfs = series(v, "cashFlows", "Cash flows", 2, false);
    const value = npv(rate, cfs);
    const res = irr(cfs, rate);
    const pi = profitabilityIndex(rate, cfs);
    const payback = discountedPayback(rate, cfs);
    const notes: string[] = [];
    if (res.irr === null) notes.push("No IRR exists: NPV never crosses zero for rates above −100%.");
    if (res.all.length > 1) notes.push(`Multiple IRRs found: ${res.all.map((x) => (x * 100).toFixed(4) + "%").join(", ")}. Use NPV for the decision.`);
    notes.push(value >= 0 ? "NPV ≥ 0: the project earns at least the required return." : "NPV < 0: the project earns less than the required return.");
    let cum = 0;
    const rows = cfs.map((cf, t) => {
      const df = 1 / Math.pow(1 + rate, t);
      cum += cf * df;
      return [t, r(cf, 2), r(df, 6), r(cf * df, 2), r(cum, 2)];
    });
    return {
      outputs: [
        { label: "NPV", value, format: "currency", decimals: 2, highlight: true },
        { label: "IRR", value: res.irr === null ? "No IRR" : res.irr, format: res.irr === null ? "text" : "percent", decimals: 4, highlight: true },
        { label: "Profitability index", value: Number.isFinite(pi) ? pi : "n/a", format: Number.isFinite(pi) ? "number" : "text", decimals: 4 },
        { label: "Discounted payback (periods)", value: payback === null ? "Not paid back" : payback, format: payback === null ? "text" : "number", decimals: 2 },
        { label: "Sign changes in cash flows", value: res.signChanges, format: "integer" },
      ],
      table: { title: "Discounted cash flows", columns: ["t", "Cash flow", "Discount factor", "PV", "Cumulative PV"], rows },
      notes,
    };
  }),
  courses: [COURSES.cfa1, COURSES.fm, COURSES.excel],
};

export const hprCalc: CalculatorDef = {
  slug: "holding-period-return",
  title: "Holding Period & Annualised Return",
  category: "Time Value & Returns",
  description: "Total return over a holding period, its annualised equivalent and the continuously compounded return.",
  formula: String.raw`\begin{aligned}
HPR &= \frac{P_1 - P_0 + D}{P_0}\\
R_{\text{annual}} &= (1+HPR)^{1/T} - 1\\
r_{\text{cc}} &= \ln(1+HPR)
\end{aligned}`,
  explanation: String.raw`The **holding period return** measures the total gain over the whole time you held the investment: the price change plus any income received, divided by the starting value. Holding periods of different lengths are hard to compare directly, so the HPR is **annualised** by compounding: $(1+HPR)^{1/T}-1$ for $T$ years. For holding periods shorter than a year the same formula scales the return up, which assumes it could be repeated at the same rate.

The **continuously compounded** return $\ln(1+HPR)$ is additive over time. Dividing it by $T$ gives the annual continuously compounded rate.`,
  inputs: [
    { key: "begin", label: "Beginning value (P₀)", default: 100, step: 1 },
    { key: "end", label: "Ending value (P₁)", default: 112, step: 1 },
    { key: "income", label: "Income received (D)", default: 3, step: 0.5, help: "Dividends, coupons or other cash distributions." },
    { key: "years", label: "Holding period (years)", default: 2, step: 0.25, min: 0 },
  ],
  compute: safeCompute((v) => {
    const p0 = num(v, "begin", "Beginning value");
    const p1 = num(v, "end", "Ending value");
    const d = num(v, "income", "Income");
    const T = num(v, "years", "Holding period");
    check(p0 > 0, "Beginning value must be positive.");
    check(T > 0, "Holding period must be positive.");
    const h = holdingPeriodReturn(p0, p1, d);
    check(h > -1, "The holding period return must be greater than −100% to annualise.");
    const ann = annualizeReturn(h, T);
    const cc = logReturn(h);
    return {
      outputs: [
        { label: "Holding period return", value: h, format: "percent", decimals: 4, highlight: true },
        { label: "Annualised return", value: ann, format: "percent", decimals: 4, highlight: true },
        { label: "Continuously compounded HPR", value: cc, format: "percent", decimals: 4 },
        { label: "Annual continuously compounded rate", value: cc / T, format: "percent", decimals: 4 },
        { label: "Price return", value: (p1 - p0) / p0, format: "percent", decimals: 4 },
        { label: "Income return", value: d / p0, format: "percent", decimals: 4 },
      ],
    };
  }),
  courses: [COURSES.cfa1],
};

export const meansCalc: CalculatorDef = {
  slug: "arithmetic-geometric-mean",
  title: "Arithmetic vs Geometric Mean Return",
  category: "Time Value & Returns",
  description: "Compare the arithmetic and geometric (compound) average of a series of periodic returns.",
  formula: String.raw`\begin{aligned}
\bar R_A &= \frac{1}{n}\sum_{i=1}^{n} R_i\\
\bar R_G &= \Big[\prod_{i=1}^{n}(1+R_i)\Big]^{1/n} - 1 \;\approx\; \bar R_A - \tfrac{1}{2}\sigma^2
\end{aligned}`,
  explanation: String.raw`The **arithmetic mean** is the simple average of the period returns. It is the best estimate of the return for a single future period. The **geometric mean** is the constant rate that would have produced the same ending wealth. It is the right measure of past compound growth.

The geometric mean is never above the arithmetic mean. The gap widens as returns become more volatile, and roughly equals half the variance. A gain of 50% followed by a loss of 50% shows why: the arithmetic mean is 0%, but you end with 75% of your starting money, a geometric mean of about −13.4% per period.`,
  inputs: [
    { key: "returns", label: "Periodic returns (%)", type: "series", default: "10, -5, 20, 8, -12", help: "E.g. annual returns in percent." },
  ],
  compute: safeCompute((v) => {
    const rs = series(v, "returns", "Returns", 1);
    check(rs.every((x) => x > -1), "Every return must be greater than −100% for the geometric mean.");
    const a = arithmeticMeanReturn(rs);
    const g = geometricMeanReturn(rs);
    const sd = rs.length > 1 ? stdev(rs, false) : 0;
    const wealth = rs.reduce((w, x) => w * (1 + x), 1);
    return {
      outputs: [
        { label: "Arithmetic mean", value: a, format: "percent", decimals: 4, highlight: true },
        { label: "Geometric mean", value: g, format: "percent", decimals: 4, highlight: true },
        { label: "Difference (arithmetic − geometric)", value: a - g, format: "percent", decimals: 4 },
        { label: "Approximation  R_A − σ²/2 (population σ)", value: a - (sd * sd) / 2, format: "percent", decimals: 4 },
        { label: "Ending wealth per 1 invested", value: wealth, format: "number", decimals: 4 },
        { label: "Number of periods", value: rs.length, format: "integer" },
      ],
    };
  }),
  courses: [COURSES.cfa1],
};

export const loanCalc: CalculatorDef = {
  slug: "loan-amortization",
  title: "Loan Amortization Schedule",
  category: "Time Value & Returns",
  description: "Level payment, total interest and the full period-by-period amortization schedule of a loan.",
  formula: String.raw`\begin{aligned}
PMT &= \frac{L\, i}{1-(1+i)^{-n}},\qquad i = \frac{r}{m},\; n = m\,T\\
\text{Interest}_k &= i\,B_{k-1},\quad \text{Principal}_k = PMT - \text{Interest}_k,\quad B_k = B_{k-1} - \text{Principal}_k
\end{aligned}`,
  explanation: String.raw`A fully amortizing loan is repaid in equal payments. Each payment first covers the interest due on the outstanding balance, and the rest reduces the principal. Early payments are therefore mostly interest. As the balance falls, the interest share shrinks and more of each payment goes to principal, until the balance reaches **zero** with the final payment.

The level payment is the annuity whose present value at the periodic rate $i = r/m$ equals the amount borrowed. The schedule rounds nothing internally, so the last payment clears the loan exactly.`,
  inputs: [
    { key: "principal", label: "Loan amount (L)", default: 250000, step: 1000, min: 0 },
    { key: "rate", label: "Annual interest rate (r)", default: 6, step: 0.125, suffix: "%" },
    { key: "years", label: "Term (years, T)", default: 30, step: 1, min: 0 },
    { key: "perYear", label: "Payments per year (m)", type: "select", default: "12", options: [
      { value: "12", label: "Monthly (12)" },
      { value: "4", label: "Quarterly (4)" },
      { value: "2", label: "Semi-annual (2)" },
      { value: "1", label: "Annual (1)" },
      { value: "26", label: "Bi-weekly (26)" },
      { value: "52", label: "Weekly (52)" },
    ] },
  ],
  compute: safeCompute((v) => {
    const L = num(v, "principal", "Loan amount");
    const rate = pct(v, "rate", "Interest rate");
    const T = num(v, "years", "Term");
    const m = num(v, "perYear", "Payments per year");
    check(L > 0, "Loan amount must be positive.");
    check(rate >= 0, "Interest rate cannot be negative.");
    check(T > 0 && m > 0, "Term and payment frequency must be positive.");
    check(Math.round(T * m) <= 3000, "The schedule is limited to 3,000 payments.");
    const res = amortize(L, rate, T, m);
    const yearly: Record<string, number | string>[] = [];
    res.schedule.forEach((row) => {
      if (row.period % m === 0 || row.period === res.schedule.length) yearly.push({ Year: r(row.period / m, 2), Balance: r(row.balance, 2) });
    });
    return {
      outputs: [
        { label: "Payment per period", value: res.payment, format: "currency", decimals: 2, highlight: true },
        { label: "Number of payments", value: res.schedule.length, format: "integer" },
        { label: "Total paid", value: res.totalPaid, format: "currency", decimals: 2 },
        { label: "Total interest", value: res.totalInterest, format: "currency", decimals: 2, highlight: true },
        { label: "Ending balance", value: res.schedule[res.schedule.length - 1].balance, format: "currency", decimals: 2 },
      ],
      table: {
        title: "Amortization schedule",
        columns: ["Period", "Payment", "Interest", "Principal", "Balance"],
        rows: res.schedule.map((x) => [x.period, r(x.payment, 2), r(x.interest, 2), r(x.principal, 2), r(x.balance, 2)]),
      },
      chart: { type: "line", title: "Outstanding balance", xKey: "Year", yKeys: ["Balance"], data: [{ Year: 0, Balance: L }, ...yearly] },
    };
  }),
  courses: [COURSES.cfa1, COURSES.excel, COURSES.fm],
};

