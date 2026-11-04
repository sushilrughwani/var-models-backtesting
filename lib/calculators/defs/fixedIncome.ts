/** Calculators: bond pricing, duration/convexity and forward rates. */
import type { CalculatorDef, CalcValues } from "../types";
import { COURSES, check, num, pct, r, safeCompute, series, str } from "../helpers";
import { bondCashFlows, bondDuration, bondPeriods, bondPrice, bondYtm, priceChangeApprox } from "@/lib/finance/bonds";
import { discountFactor, forwardRate, oneYearForwards, type Compounding } from "@/lib/finance/rates";

const FREQ_OPTIONS = [
  { value: "1", label: "Annual (1)" },
  { value: "2", label: "Semi-annual (2)" },
  { value: "4", label: "Quarterly (4)" },
  { value: "12", label: "Monthly (12)" },
];

function readBond(v: CalcValues) {
  const face = num(v, "face", "Face value");
  const coupon = pct(v, "coupon", "Coupon rate");
  const years = num(v, "years", "Years to maturity");
  const freq = num(v, "freq", "Coupon frequency");
  check(face > 0, "Face value must be positive.");
  check(coupon >= 0, "Coupon rate cannot be negative.");
  check(years > 0, "Years to maturity must be positive.");
  check([1, 2, 4, 12].includes(freq), "Coupon frequency must be 1, 2, 4 or 12.");
  check(bondPeriods(years, freq) <= 1200, "At most 1,200 coupon periods are supported.");
  return { face, coupon, years, freq };
}

export const bondPriceYtmCalc: CalculatorDef = {
  slug: "bond-price-ytm",
  title: "Bond Price & Yield to Maturity",
  category: "Fixed Income",
  description: "Price a fixed-coupon bond from its yield, or solve for the yield to maturity from its price.",
  formula: String.raw`\begin{aligned}
P &= \sum_{t=1}^{n}\frac{C}{(1+y/m)^t} + \frac{F}{(1+y/m)^n},\qquad C = \frac{c\,F}{m},\; n = mT\\
&\text{YTM: the } y \text{ that solves the equation for the observed } P
\end{aligned}`,
  explanation: String.raw`A bond's price is the present value of its coupons and its face value, all discounted at a single yield. The yield to maturity is the internal rate of return of buying at the market price and holding to maturity. It is quoted as an annual rate compounded $m$ times a year, so semi-annual yields are on a bond-equivalent basis.

The bond trades at a **premium** when its coupon rate is above the YTM and at a **discount** when it is below. Price and yield move in opposite directions. The calculation assumes valuation on a coupon date, so there is no accrued interest. The YTM is solved numerically.`,
  inputs: [
    { key: "mode", label: "Calculate", type: "select", default: "price", options: [
      { value: "price", label: "Price from yield" },
      { value: "ytm", label: "Yield from price" },
    ] },
    { key: "face", label: "Face (par) value", default: 1000, step: 100, min: 0 },
    { key: "coupon", label: "Annual coupon rate", default: 5, step: 0.125, suffix: "%" },
    { key: "years", label: "Years to maturity", default: 10, step: 0.5, min: 0 },
    { key: "freq", label: "Coupons per year", type: "select", default: "2", options: FREQ_OPTIONS },
    { key: "ytm", label: "Yield to maturity (for price mode)", default: 6, step: 0.05, suffix: "%" },
    { key: "price", label: "Market price (for yield mode)", default: 925.61, step: 1, min: 0 },
  ],
  compute: safeCompute((v) => {
    const b = readBond(v);
    const mode = str(v, "mode", "price");
    let price: number;
    let y: number;
    if (mode === "ytm") {
      price = num(v, "price", "Price");
      check(price > 0, "Price must be positive.");
      const res = bondYtm(price, b.face, b.coupon, b.years, b.freq);
      check(res !== null, "No yield to maturity reproduces this price.");
      y = res;
    } else {
      y = pct(v, "ytm", "Yield");
      check(y / b.freq > -1, "The periodic yield must be greater than −100%.");
      price = bondPrice(b.face, b.coupon, y, b.years, b.freq);
    }
    const cfs = bondCashFlows(b.face, b.coupon, b.years, b.freq);
    const rows = cfs.map((cf, i) => {
      const df = 1 / Math.pow(1 + y / b.freq, i + 1);
      return [i + 1, r((i + 1) / b.freq, 4), r(cf, 2), r(df, 6), r(cf * df, 4)];
    });
    const effective = Math.pow(1 + y / b.freq, b.freq) - 1;
    return {
      outputs: [
        { label: "Price", value: price, format: "currency", decimals: 4, highlight: mode !== "ytm" },
        { label: "Yield to maturity", value: y, format: "percent", decimals: 4, highlight: mode === "ytm" },
        { label: "Price (% of par)", value: price / b.face, format: "percent", decimals: 4 },
        { label: "Current yield", value: (b.coupon * b.face) / price, format: "percent", decimals: 4 },
        { label: "Effective annual yield", value: effective, format: "percent", decimals: 4 },
        { label: "Trades at", value: Math.abs(price - b.face) < 1e-8 * b.face ? "Par" : price > b.face ? "Premium" : "Discount", format: "text" },
      ],
      table: { title: "Cash flows", columns: ["Period", "Time (years)", "Cash flow", "Discount factor", "PV"], rows },
    };
  }),
  courses: [COURSES.cfa1, COURSES.frm1],
};

export const durationCalc: CalculatorDef = {
  slug: "duration-convexity",
  title: "Duration & Convexity",
  category: "Fixed Income",
  description: "Macaulay and modified duration, convexity and the estimated price change for a yield shift.",
  formula: String.raw`\begin{aligned}
D_{Mac} &= \frac{1}{m}\sum_{t=1}^{n}\frac{t\cdot PV(CF_t)}{P},\qquad D_{Mod} = \frac{D_{Mac}}{1+y/m}\\
\text{Conv} &= \frac{1}{P\,m^2}\sum_{t=1}^{n}\frac{t(t+1)\,CF_t}{(1+y/m)^{t+2}}\\
\frac{\Delta P}{P} &\approx -D_{Mod}\,\Delta y + \tfrac{1}{2}\,\text{Conv}\,(\Delta y)^2
\end{aligned}`,
  explanation: String.raw`**Macaulay duration** is the average time, in years, at which the bond's cash flows arrive, with each time weighted by the share of price that cash flow represents. **Modified duration** turns it into a sensitivity: the approximate percentage price change for a one-unit change in yield. **Convexity** captures the curvature that duration misses. For an option-free bond it is always positive, so the duration estimate understates gains and overstates losses.

The calculator reprices the bond at the shifted yield and compares the exact change with the duration-only estimate and the duration-plus-convexity estimate. PVBP is the price change for a 1 basis point move in yield.`,
  inputs: [
    { key: "face", label: "Face (par) value", default: 100, step: 10, min: 0 },
    { key: "coupon", label: "Annual coupon rate", default: 6, step: 0.125, suffix: "%" },
    { key: "years", label: "Years to maturity", default: 5, step: 0.5, min: 0 },
    { key: "freq", label: "Coupons per year", type: "select", default: "2", options: FREQ_OPTIONS },
    { key: "ytm", label: "Yield to maturity", default: 5, step: 0.05, suffix: "%" },
    { key: "dy", label: "Yield change (Δy)", default: 100, step: 5, suffix: "bp" },
  ],
  compute: safeCompute((v) => {
    const b = readBond(v);
    const y = pct(v, "ytm", "Yield");
    const dy = num(v, "dy", "Yield change") / 10000;
    check(y / b.freq > -1 && (y + dy) / b.freq > -1, "Yields must stay above −100% per period.");
    const d = bondDuration(b.face, b.coupon, y, b.years, b.freq);
    const est = priceChangeApprox(d.modified, d.convexity, dy);
    const newPrice = bondPrice(b.face, b.coupon, y + dy, b.years, b.freq);
    const actual = newPrice / d.price - 1;
    return {
      outputs: [
        { label: "Price", value: d.price, format: "currency", decimals: 4 },
        { label: "Macaulay duration (years)", value: d.macaulay, format: "number", decimals: 4, highlight: true },
        { label: "Modified duration", value: d.modified, format: "number", decimals: 4, highlight: true },
        { label: "Convexity", value: d.convexity, format: "number", decimals: 4, highlight: true },
        { label: "Money duration", value: d.moneyDuration, format: "currency", decimals: 4 },
        { label: "PVBP (per 1 bp)", value: d.pvbp, format: "currency", decimals: 6 },
        { label: "Duration effect", value: est.durationEffect, format: "percent", decimals: 4 },
        { label: "Convexity effect", value: est.convexityEffect, format: "percent", decimals: 4 },
        { label: "Estimated % price change", value: est.total, format: "percent", decimals: 4, highlight: true },
        { label: "Actual % price change (full repricing)", value: actual, format: "percent", decimals: 4 },
        { label: "New price", value: newPrice, format: "currency", decimals: 4 },
      ],
    };
  }),
  courses: [COURSES.cfa1, COURSES.frm1, COURSES.frm2],
};

export const forwardRatesCalc: CalculatorDef = {
  slug: "forward-rates",
  title: "Forward Rates from Spot Rates",
  category: "Fixed Income",
  description: "Implied one-year forward rates and any forward rate between two maturities from a spot curve.",
  formula: String.raw`\begin{aligned}
(1+f_{a,b})^{\,b-a} &= \frac{(1+s_b)^b}{(1+s_a)^a} \quad\text{(annual compounding)}\\
f_{a,b} &= \frac{s_b\,b - s_a\,a}{b-a} \quad\text{(continuous compounding)}
\end{aligned}`,
  explanation: String.raw`A forward rate is the rate you can lock in today for borrowing or lending between two future dates. No-arbitrage pins it down. Investing for $b$ years at the $b$-year spot rate must give the same result as investing for $a$ years at the $a$-year spot rate and then rolling over at the forward rate $f_{a,b}$.

Enter spot rates for maturities 1, 2, 3, … years. The table shows each one-year forward rate $f_{t-1,t}$. When the spot curve slopes upward, the forward rates lie above the spot rates.`,
  inputs: [
    { key: "spots", label: "Spot rates for years 1, 2, 3, … (%)", type: "series", default: "3, 3.5, 4, 4.3, 4.5" },
    { key: "comp", label: "Compounding", type: "select", default: "annual", options: [
      { value: "annual", label: "Annual" },
      { value: "continuous", label: "Continuous" },
    ] },
    { key: "a", label: "Forward start (year a)", type: "integer", default: 2, step: 1, min: 0 },
    { key: "b", label: "Forward end (year b)", type: "integer", default: 5, step: 1, min: 1 },
  ],
  compute: safeCompute((v) => {
    const spots = series(v, "spots", "Spot rates", 1);
    const comp = (str(v, "comp", "annual") === "continuous" ? "continuous" : "annual") as Compounding;
    if (comp === "annual") check(spots.every((s) => s > -1), "Spot rates must be greater than −100%.");
    const a = Math.round(num(v, "a", "Start year"));
    const b = Math.round(num(v, "b", "End year"));
    check(a >= 0 && b > a, "Require 0 ≤ a < b.");
    check(b <= spots.length, `Year b must be at most ${spots.length} (the number of spot rates entered).`);
    const fwds = oneYearForwards(spots, comp);
    const sa = a === 0 ? 0 : spots[a - 1];
    const fab = forwardRate(sa, a, spots[b - 1], b, comp);
    return {
      outputs: [
        { label: `Forward rate f(${a},${b})`, value: fab, format: "percent", decimals: 4, highlight: true },
        { label: `Spot rate s(${b})`, value: spots[b - 1], format: "percent", decimals: 4 },
        { label: `Discount factor to year ${b}`, value: discountFactor(spots[b - 1], b, comp), format: "number", decimals: 6 },
      ],
      table: {
        title: "Spot curve and one-year forwards",
        columns: ["Year", "Spot rate", "Discount factor", "1-year forward f(t−1, t)"],
        rows: spots.map((s, i) => [i + 1, `${(s * 100).toFixed(4)}%`, r(discountFactor(s, i + 1, comp), 6), `${(fwds[i] * 100).toFixed(4)}%`]),
      },
      chart: { type: "line", title: "Spot vs forward curve (%)", xKey: "Year", yKeys: ["Spot", "Forward"], data: spots.map((s, i) => ({ Year: i + 1, Spot: r(s * 100, 4), Forward: r(fwds[i] * 100, 4) })) },
    };
  }),
  courses: [COURSES.cfa1, COURSES.cfa2, COURSES.frm1],
};
