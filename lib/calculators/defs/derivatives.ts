/** Calculators: forwards, FRAs, options and covered interest parity. */
import type { CalcOutput, CalculatorDef } from "../types";
import { COURSES, check, int, num, pct, r, safeCompute, str } from "../helpers";
import { forwardPrice, putCallParity, type CarryCompounding } from "@/lib/finance/derivatives";
import { cipForward, fraValue, type ParityConvention } from "@/lib/finance/rates";
import { binomialOption, blackScholes, type OptionType } from "@/lib/finance/options";

export const forwardCarryCalc: CalculatorDef = {
  slug: "forward-pricing-cost-of-carry",
  title: "Forward & Futures Price (Cost of Carry)",
  category: "Derivatives",
  description: "No-arbitrage forward price with income yield, storage costs and discrete cash flows, plus a mispricing check.",
  formula: String.raw`\begin{aligned}
F_0 &= \big(S_0 - PV(I) + PV(U)\big)\,e^{(r + u - q)T} &&\text{(continuous)}\\
F_0 &= \big(S_0 - PV(I) + PV(U)\big)\left[\frac{(1+r)(1+u)}{1+q}\right]^{T} &&\text{(discrete)}
\end{aligned}`,
  explanation: String.raw`A forward price is the spot price carried forward to delivery. The holder of the underlying pays financing at $r$ and any **storage** costs ($u$, or a lump sum $U$). In return it receives any **income** ($q$ as a yield, or a lump sum $I$ such as dividends or coupons). If the forward price differed from this cost of carry, there would be an arbitrage.

- Forward **too high**: borrow, buy the asset, sell the forward (cash-and-carry).
- Forward **too low**: short the asset, lend the proceeds, buy the forward (reverse cash-and-carry).

For a currency forward, $q$ is the foreign interest rate. For a commodity, $q$ can stand for the convenience yield.`,
  inputs: [
    { key: "S", label: "Spot price (S₀)", default: 100, step: 1, min: 0 },
    { key: "r", label: "Risk-free rate (r)", default: 5, step: 0.1, suffix: "%" },
    { key: "T", label: "Time to delivery (years, T)", default: 1, step: 0.25, min: 0 },
    { key: "q", label: "Income / dividend yield (q)", default: 2, step: 0.1, suffix: "%" },
    { key: "u", label: "Storage cost yield (u)", default: 0, step: 0.1, suffix: "%" },
    { key: "I", label: "PV of discrete income (I)", default: 0, step: 0.5, min: 0 },
    { key: "U", label: "PV of discrete storage costs (U)", default: 0, step: 0.5, min: 0 },
    { key: "comp", label: "Compounding", type: "select", default: "continuous", options: [
      { value: "continuous", label: "Continuous" },
      { value: "discrete", label: "Discrete (annual)" },
    ] },
    { key: "market", label: "Quoted forward/futures price (optional)", default: 104, step: 0.5, min: 0, help: "Set to 0 to skip the arbitrage check." },
  ],
  compute: safeCompute((v) => {
    const S = num(v, "S", "Spot");
    const T = num(v, "T", "Time");
    check(S > 0, "Spot price must be positive.");
    check(T >= 0, "Time to delivery cannot be negative.");
    const comp = (str(v, "comp", "continuous") === "discrete" ? "discrete" : "continuous") as CarryCompounding;
    const rr = pct(v, "r", "Rate");
    const q = pct(v, "q", "Income yield");
    const u = pct(v, "u", "Storage yield");
    if (comp === "discrete") check(rr > -1 && q > -1 && u > -1, "Rates must be greater than −100%.");
    const I = num(v, "I", "Income");
    const U = num(v, "U", "Storage costs");
    check(S - I + U > 0, "PV of income cannot exceed the spot price plus storage costs.");
    const F = forwardPrice({ spot: S, r: rr, T, q, u, pvIncome: I, pvStorage: U, compounding: comp });
    const market = num(v, "market", "Quoted price");
    const outputs: CalcOutput[] = [
      { label: "No-arbitrage forward price (F₀)", value: F, format: "currency", decimals: 4, highlight: true },
      { label: "Net cost of carry (F₀ − S₀)", value: F - S, format: "currency", decimals: 4 },
      { label: "Basis (S₀ − F₀)", value: S - F, format: "currency", decimals: 4 },
    ];
    const notes: string[] = [];
    if (market > 0) {
      const diff = market - F;
      outputs.push({ label: "Quoted − fair value", value: diff, format: "currency", decimals: 4, highlight: true });
      const pvDiff = comp === "continuous" ? diff * Math.exp(-rr * T) : diff / Math.pow(1 + rr, T);
      outputs.push({ label: "Arbitrage profit per unit (PV)", value: Math.abs(pvDiff), format: "currency", decimals: 4 });
      notes.push(
        Math.abs(diff) < 1e-6
          ? "Quoted price equals the fair value: no arbitrage."
          : diff > 0
            ? "Quoted forward is too high: cash-and-carry. Borrow, buy the underlying, sell the forward."
            : "Quoted forward is too low: reverse cash-and-carry. Short the underlying, lend the proceeds, buy the forward.",
      );
    }
    return { outputs, notes };
  }),
  courses: [COURSES.cfa1, COURSES.cfa2, COURSES.frm1],
};

export const fraCalc: CalculatorDef = {
  slug: "fra-valuation",
  title: "Forward Rate Agreement (FRA) Valuation",
  category: "Derivatives",
  description: "Implied FRA rate from money-market spot rates and the mark-to-market value of an existing FRA.",
  formula: String.raw`\begin{aligned}
F &= \left[\frac{1 + L_2\frac{d_2}{B}}{1 + L_1\frac{d_1}{B}} - 1\right]\frac{B}{d_2-d_1}\\
V_{\text{long}} &= N\,\frac{(F - K)\frac{d_2-d_1}{B}}{1 + L_2\frac{d_2}{B}}
\end{aligned}`,
  explanation: String.raw`An FRA fixes today the simple interest rate $K$ that applies to a future period running from day $d_1$ to day $d_2$. The **long** side pays the fixed rate and receives the floating rate, so it gains when rates rise.

The fair FRA rate $F$ is the forward rate implied by the current money-market rates to $d_1$ and to $d_2$. An existing FRA is worth the difference between the current forward rate and the contract rate, multiplied by the notional and the period fraction, and discounted from $d_2$ back to today. Rates use simple interest on an actual/$B$ day count.`,
  inputs: [
    { key: "notional", label: "Notional (N)", default: 10000000, step: 100000, min: 0 },
    { key: "K", label: "Contract FRA rate (K)", default: 3, step: 0.01, suffix: "%" },
    { key: "d1", label: "Days to FRA start (d₁)", type: "integer", default: 90, step: 1, min: 0 },
    { key: "L1", label: "Spot rate to d₁ (L₁)", default: 2.8, step: 0.01, suffix: "%" },
    { key: "d2", label: "Days to FRA end (d₂)", type: "integer", default: 270, step: 1, min: 1 },
    { key: "L2", label: "Spot rate to d₂ (L₂)", default: 3.2, step: 0.01, suffix: "%" },
    { key: "basis", label: "Day-count basis (B)", type: "select", default: "360", options: [
      { value: "360", label: "Actual/360" },
      { value: "365", label: "Actual/365" },
    ] },
    { key: "position", label: "Position", type: "select", default: "long", options: [
      { value: "long", label: "Long (pay fixed, receive floating)" },
      { value: "short", label: "Short (receive fixed, pay floating)" },
    ] },
  ],
  compute: safeCompute((v) => {
    const N = num(v, "notional", "Notional");
    const d1 = num(v, "d1", "d₁");
    const d2 = num(v, "d2", "d₂");
    const basis = num(v, "basis", "Basis");
    check(N > 0, "Notional must be positive.");
    check(d1 >= 0 && d2 > d1, "Require 0 ≤ d₁ < d₂.");
    check(basis > 0, "Basis must be positive.");
    const res = fraValue(N, pct(v, "K", "Contract rate"), pct(v, "L1", "L₁"), d1, pct(v, "L2", "L₂"), d2, basis);
    const sign = str(v, "position", "long") === "short" ? -1 : 1;
    return {
      outputs: [
        { label: "Implied forward (fair FRA) rate", value: res.forwardRate, format: "percent", decimals: 4, highlight: true },
        { label: `Value to the ${sign === 1 ? "long" : "short"}`, value: sign * res.valueLong, format: "currency", decimals: 2, highlight: true },
        { label: "FRA period fraction (d₂ − d₁)/B", value: res.periodFraction, format: "number", decimals: 6 },
        { label: "Quote", value: `${Math.round(d1 / 30)}×${Math.round(d2 / 30)} FRA`, format: "text" },
      ],
    };
  }),
  courses: [COURSES.cfa2, COURSES.frm1],
};

export const bsmCalc: CalculatorDef = {
  slug: "black-scholes",
  title: "Black–Scholes–Merton Option Pricing & Greeks",
  category: "Derivatives",
  description: "European call and put prices with continuous dividend yield, plus delta, gamma, vega, theta and rho.",
  formula: String.raw`\begin{aligned}
d_1 &= \frac{\ln(S/K) + (r - q + \sigma^2/2)T}{\sigma\sqrt{T}},\qquad d_2 = d_1 - \sigma\sqrt{T}\\
C &= S e^{-qT}N(d_1) - K e^{-rT}N(d_2)\\
P &= K e^{-rT}N(-d_2) - S e^{-qT}N(-d_1)
\end{aligned}`,
  explanation: String.raw`The BSM model prices European options by assuming the underlying follows geometric Brownian motion with constant volatility and constant rates. The asset may pay a continuous yield $q$, which covers a dividend yield, a foreign interest rate, or a futures price using $q = r$. $N(\cdot)$ is the standard normal CDF, evaluated here to about 15 significant digits.

The **Greeks** measure how the option price responds to its inputs:

- **Delta**: change in option price per 1 unit change in the underlying price.
- **Gamma**: change in delta per 1 unit change in the underlying price.
- **Vega**: change in price for a 1 percentage-point rise in volatility.
- **Theta**: change in price for each calendar day that passes.
- **Rho**: change in price for a 1 percentage-point rise in the interest rate.`,
  inputs: [
    { key: "S", label: "Underlying price (S)", default: 100, step: 1, min: 0 },
    { key: "K", label: "Strike price (K)", default: 100, step: 1, min: 0 },
    { key: "r", label: "Risk-free rate (r, continuous)", default: 5, step: 0.1, suffix: "%" },
    { key: "sigma", label: "Volatility (σ)", default: 20, step: 0.5, suffix: "%", min: 0 },
    { key: "T", label: "Time to expiry (years, T)", default: 1, step: 0.05, min: 0 },
    { key: "q", label: "Dividend yield (q, continuous)", default: 0, step: 0.1, suffix: "%" },
  ],
  compute: safeCompute((v) => {
    const S = num(v, "S", "S");
    const K = num(v, "K", "K");
    const sigma = pct(v, "sigma", "Volatility");
    const T = num(v, "T", "T");
    check(S > 0 && K > 0, "Underlying and strike prices must be positive.");
    check(sigma > 0, "Volatility must be positive.");
    check(T > 0, "Time to expiry must be positive.");
    const res = blackScholes(S, K, pct(v, "r", "r"), sigma, T, pct(v, "q", "q"));
    const c = res.callGreeks;
    const p = res.putGreeks;
    return {
      outputs: [
        { label: "Call price", value: res.call, format: "currency", decimals: 4, highlight: true },
        { label: "Put price", value: res.put, format: "currency", decimals: 4, highlight: true },
        { label: "d₁", value: res.d1, format: "number", decimals: 6 },
        { label: "d₂", value: res.d2, format: "number", decimals: 6 },
        { label: "Call delta", value: c.delta, format: "number", decimals: 4 },
        { label: "Put delta", value: p.delta, format: "number", decimals: 4 },
        { label: "Gamma", value: c.gamma, format: "number", decimals: 6 },
        { label: "Vega (per 1% vol)", value: c.vega / 100, format: "number", decimals: 4 },
      ],
      table: {
        title: "Greeks",
        columns: ["Greek", "Call", "Put", "Units"],
        rows: [
          ["Delta", r(c.delta, 6), r(p.delta, 6), "per 1 unit of S"],
          ["Gamma", r(c.gamma, 6), r(p.gamma, 6), "per 1 unit of S"],
          ["Vega", r(c.vega / 100, 6), r(p.vega / 100, 6), "per 1% volatility"],
          ["Theta (per year)", r(c.theta, 6), r(p.theta, 6), "per year"],
          ["Theta (per day)", r(c.theta / 365, 6), r(p.theta / 365, 6), "per calendar day"],
          ["Rho", r(c.rho / 100, 6), r(p.rho / 100, 6), "per 1% rate"],
        ],
      },
    };
  }),
  courses: [COURSES.cfa2, COURSES.frm1, COURSES.frm2],
};

export const binomialCalc: CalculatorDef = {
  slug: "binomial-option",
  title: "Binomial Option Pricing (CRR)",
  category: "Derivatives",
  description: "n-step Cox–Ross–Rubinstein tree for European and American calls and puts, compared with Black–Scholes.",
  formula: String.raw`\begin{aligned}
u &= e^{\sigma\sqrt{\Delta t}},\quad d = \frac{1}{u},\quad p = \frac{e^{(r-q)\Delta t} - d}{u-d},\quad \Delta t = \frac{T}{n}\\
V_{i,j} &= e^{-r\Delta t}\big[p\,V_{i+1,j+1} + (1-p)\,V_{i+1,j}\big]\\
V_{i,j}^{\text{Am}} &= \max\!\big(\text{exercise value}_{i,j},\; V_{i,j}\big)
\end{aligned}`,
  explanation: String.raw`The binomial model splits the option's life into $n$ steps. At each step the underlying moves up by a factor $u$ or down by $d$. Payoffs are computed at the terminal nodes and then discounted backward through the tree using the **risk-neutral** probability $p$.

For an **American** option, each node is checked to see whether exercising immediately is worth more than continuing to hold. That makes it possible to value early exercise, which matters for puts and for calls on assets that pay income. As $n$ grows, the European price converges to the Black–Scholes value. The table lists the terminal nodes with their risk-neutral probabilities.`,
  inputs: [
    { key: "S", label: "Underlying price (S)", default: 100, step: 1, min: 0 },
    { key: "K", label: "Strike price (K)", default: 100, step: 1, min: 0 },
    { key: "r", label: "Risk-free rate (r, continuous)", default: 5, step: 0.1, suffix: "%" },
    { key: "sigma", label: "Volatility (σ)", default: 20, step: 0.5, suffix: "%", min: 0 },
    { key: "T", label: "Time to expiry (years)", default: 1, step: 0.05, min: 0 },
    { key: "q", label: "Dividend yield (q)", default: 0, step: 0.1, suffix: "%" },
    { key: "steps", label: "Number of steps (n)", type: "integer", default: 50, step: 1, min: 1, max: 2000 },
    { key: "type", label: "Option type", type: "select", default: "put", options: [
      { value: "call", label: "Call" },
      { value: "put", label: "Put" },
    ] },
    { key: "style", label: "Exercise style", type: "select", default: "american", options: [
      { value: "european", label: "European" },
      { value: "american", label: "American" },
    ] },
  ],
  compute: safeCompute((v) => {
    const S = num(v, "S", "S");
    const K = num(v, "K", "K");
    const rr = pct(v, "r", "r");
    const sigma = pct(v, "sigma", "Volatility");
    const T = num(v, "T", "T");
    const q = pct(v, "q", "q");
    const n = int(v, "steps", "Number of steps", 1, 2000);
    check(S > 0 && K > 0, "Underlying and strike prices must be positive.");
    check(sigma > 0 && T > 0, "Volatility and time to expiry must be positive.");
    const type = (str(v, "type", "call") === "put" ? "put" : "call") as OptionType;
    const american = str(v, "style", "european") === "american";
    const res = binomialOption(S, K, rr, sigma, T, n, type, american, q);
    check(res !== null, "The risk-neutral probability lies outside [0, 1]. Increase the number of steps or check the rate and volatility.");
    const euro = american ? binomialOption(S, K, rr, sigma, T, n, type, false, q) : res;
    const bsm = blackScholes(S, K, rr, sigma, T, q);
    const bsmPrice = type === "call" ? bsm.call : bsm.put;
    const outputs: CalcOutput[] = [
      { label: `${american ? "American" : "European"} ${type} price`, value: res.price, format: "currency", decimals: 4, highlight: true },
      { label: "Black–Scholes European price", value: bsmPrice, format: "currency", decimals: 4 },
      { label: "Tree European − BSM", value: (euro?.price ?? NaN) - bsmPrice, format: "number", decimals: 6 },
      { label: "Up factor (u)", value: res.u, format: "number", decimals: 6 },
      { label: "Down factor (d)", value: res.d, format: "number", decimals: 6 },
      { label: "Risk-neutral probability (p)", value: res.p, format: "number", decimals: 6 },
      { label: "Hedge ratio (delta) at t = 0", value: res.delta, format: "number", decimals: 4 },
    ];
    if (american && euro) outputs.splice(1, 0, { label: "Early-exercise premium", value: res.price - euro.price, format: "currency", decimals: 4 });
    const maxRows = 201;
    return {
      outputs,
      table: {
        title: `Terminal nodes (${n + 1})${n + 1 > maxRows ? ` — first ${maxRows} shown` : ""}`,
        columns: ["Up moves", "Underlying price", "Payoff", "Risk-neutral probability"],
        rows: res.terminal.slice(0, maxRows).map((t) => [t.upMoves, r(t.price, 4), r(t.payoff, 4), r(t.probability, 8)]),
      },
    };
  }),
  courses: [COURSES.cfa2, COURSES.frm1, COURSES.frm2],
};

export const putCallParityCalc: CalculatorDef = {
  slug: "put-call-parity",
  title: "Put–Call Parity Checker",
  category: "Derivatives",
  description: "Check European call and put quotes against put–call parity and identify the arbitrage trade.",
  formula: String.raw`\begin{aligned}
C + K e^{-rT} &= P + S e^{-qT}\\
\text{Violation} &= \big(C + K e^{-rT}\big) - \big(P + S e^{-qT}\big)
\end{aligned}`,
  explanation: String.raw`A **fiduciary call** (a call plus a bond paying $K$ at expiry) and a **protective put** (a put plus the underlying) have the same payoff, $\max(S_T, K)$, for European options with the same strike and expiry. They must therefore cost the same today.

If the two sides differ, buy the cheap side and sell the expensive one. You lock in the difference today with no risk at expiry. Transaction costs, bid–ask spreads and borrowing limits mean small violations are usually not exploitable, so set a tolerance. The calculator also shows the call and put prices that parity implies.`,
  inputs: [
    { key: "C", label: "Call price (C)", default: 10.45, step: 0.05, min: 0 },
    { key: "P", label: "Put price (P)", default: 5.57, step: 0.05, min: 0 },
    { key: "S", label: "Underlying price (S)", default: 100, step: 1, min: 0 },
    { key: "K", label: "Strike price (K)", default: 100, step: 1, min: 0 },
    { key: "r", label: "Risk-free rate (continuous)", default: 5, step: 0.1, suffix: "%" },
    { key: "T", label: "Time to expiry (years)", default: 1, step: 0.05, min: 0 },
    { key: "q", label: "Dividend yield (continuous)", default: 0, step: 0.1, suffix: "%" },
    { key: "tol", label: "Tolerance (transaction costs)", default: 0.01, step: 0.01, min: 0 },
  ],
  compute: safeCompute((v) => {
    const C = num(v, "C", "Call");
    const P = num(v, "P", "Put");
    const S = num(v, "S", "S");
    const K = num(v, "K", "K");
    const T = num(v, "T", "T");
    const tol = num(v, "tol", "Tolerance");
    check(C >= 0 && P >= 0, "Option prices cannot be negative.");
    check(S > 0 && K > 0, "Underlying and strike must be positive.");
    check(T >= 0 && tol >= 0, "Time and tolerance cannot be negative.");
    const res = putCallParity(C, P, S, K, pct(v, "r", "r"), T, pct(v, "q", "q"), tol);
    return {
      outputs: [
        { label: "Fiduciary call C + PV(K)", value: res.fiduciaryCall, format: "currency", decimals: 4 },
        { label: "Protective put P + S·exp(−qT)", value: res.protectivePut, format: "currency", decimals: 4 },
        { label: "Parity violation", value: res.difference, format: "currency", decimals: 4, highlight: true },
        { label: "Arbitrage?", value: res.arbitrage ? "Yes" : "No", format: "text", highlight: true },
        { label: "Call price implied by parity", value: res.impliedCall, format: "currency", decimals: 4 },
        { label: "Put price implied by parity", value: res.impliedPut, format: "currency", decimals: 4 },
      ],
      notes: [res.strategy],
    };
  }),
  courses: [COURSES.cfa1, COURSES.cfa2, COURSES.frm1],
};

export const cipCalc: CalculatorDef = {
  slug: "covered-interest-parity",
  title: "Covered Interest Rate Parity",
  category: "Derivatives",
  description: "No-arbitrage FX forward rate from the spot rate and the two currencies' interest rates.",
  formula: String.raw`\begin{aligned}
F_{p/b} &= S_{p/b}\,\frac{1 + r_p\frac{d}{B}}{1 + r_b\frac{d}{B}} &&\text{(money-market, simple)}\\
F_{p/b} &= S_{p/b}\left(\frac{1+r_p}{1+r_b}\right)^{d/B} &&\text{(annual compounding)}\\
F_{p/b} &= S_{p/b}\,e^{(r_p - r_b)\,d/B} &&\text{(continuous)}
\end{aligned}`,
  explanation: String.raw`Quote the exchange rate as units of the **price** currency per one unit of the **base** currency, for example USD per EUR. There are two ways to turn one unit of base currency into a known amount of price currency at a future date. You can invest it at the base-currency rate and sell the proceeds forward, or convert it at spot and invest at the price-currency rate. Both must give the same amount, and that condition fixes the forward rate.

The currency with the **higher** interest rate trades at a forward **discount**. Forward points are the difference between forward and spot, multiplied by 10,000. Money-market (simple) rates suit maturities under a year; the compounded conventions suit longer horizons.`,
  inputs: [
    { key: "S", label: "Spot rate (price per 1 base)", default: 1.1, step: 0.0001, min: 0 },
    { key: "rp", label: "Price-currency interest rate (r_p)", default: 5, step: 0.05, suffix: "%" },
    { key: "rb", label: "Base-currency interest rate (r_b)", default: 3, step: 0.05, suffix: "%" },
    { key: "days", label: "Days to maturity (d)", type: "integer", default: 180, step: 1, min: 0 },
    { key: "basis", label: "Day-count basis (B)", type: "select", default: "360", options: [
      { value: "360", label: "360" },
      { value: "365", label: "365" },
    ] },
    { key: "conv", label: "Rate convention", type: "select", default: "simple", options: [
      { value: "simple", label: "Simple (money market)" },
      { value: "annual", label: "Annual compounding" },
      { value: "continuous", label: "Continuous compounding" },
    ] },
  ],
  compute: safeCompute((v) => {
    const S = num(v, "S", "Spot");
    const days = num(v, "days", "Days");
    const B = num(v, "basis", "Basis");
    check(S > 0, "Spot rate must be positive.");
    check(days >= 0 && B > 0, "Days must be non-negative and the basis positive.");
    const raw = str(v, "conv", "simple");
    const conv = (raw === "annual" || raw === "continuous" ? raw : "simple") as ParityConvention;
    const rp = pct(v, "rp", "r_p");
    const rb = pct(v, "rb", "r_b");
    const t = days / B;
    if (conv === "simple") check(1 + rb * t > 0, "The base-currency growth factor must be positive.");
    if (conv === "annual") check(rp > -1 && rb > -1, "Rates must exceed −100%.");
    const F = cipForward(S, rp, rb, days, B, conv);
    const prem = t > 0 ? (F / S - 1) / t : 0;
    return {
      outputs: [
        { label: "Forward rate (price per 1 base)", value: F, format: "number", decimals: 6, highlight: true },
        { label: "Forward points (×10,000)", value: (F - S) * 10000, format: "number", decimals: 2 },
        { label: "Forward premium/discount of base (annualised, simple)", value: prem, format: "percent", decimals: 4 },
        { label: "Base currency trades at a forward", value: F > S ? "Premium" : F < S ? "Discount" : "Par", format: "text" },
      ],
    };
  }),
  courses: [COURSES.cfa1, COURSES.cfa2, COURSES.frm1],
};
