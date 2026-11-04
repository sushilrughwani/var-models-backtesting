/**
 * Time value of money, discounted cash flows and loan amortization.
 *
 * Sign convention (as on financial calculators and in Excel): cash received is positive, cash paid is
 * negative, and the five TVM variables satisfy
 *
 *   PV·(1+r)ⁿ + PMT·(1+r·type)·[(1+r)ⁿ − 1]/r + FV = 0
 *
 * where r is the rate per period, n the number of periods and type = 0 (payments at the end of each
 * period, ordinary annuity) or 1 (payments at the beginning, annuity due).
 */
import { findBrackets, bisect, solveRoot } from "./solver";

export type PaymentTiming = 0 | 1;

/** Future-value annuity factor [(1+r)ⁿ − 1]/r, with the r → 0 limit n. */
function fvAnnuityFactor(r: number, n: number): number {
  if (Math.abs(r) < 1e-12) return n;
  return (Math.pow(1 + r, n) - 1) / r;
}

/** Residual of the TVM equation; zero when the five variables are consistent. */
export function tvmResidual(rate: number, n: number, pv: number, pmt: number, fv: number, type: PaymentTiming = 0): number {
  return pv * Math.pow(1 + rate, n) + pmt * (1 + rate * type) * fvAnnuityFactor(rate, n) + fv;
}

/** Solve for FV. */
export function tvmFV(rate: number, n: number, pv: number, pmt: number, type: PaymentTiming = 0): number {
  return -(pv * Math.pow(1 + rate, n) + pmt * (1 + rate * type) * fvAnnuityFactor(rate, n));
}

/** Solve for PV. */
export function tvmPV(rate: number, n: number, pmt: number, fv: number, type: PaymentTiming = 0): number {
  return -(fv + pmt * (1 + rate * type) * fvAnnuityFactor(rate, n)) / Math.pow(1 + rate, n);
}

/** Solve for PMT. */
export function tvmPMT(rate: number, n: number, pv: number, fv: number, type: PaymentTiming = 0): number {
  return -(pv * Math.pow(1 + rate, n) + fv) / ((1 + rate * type) * fvAnnuityFactor(rate, n));
}

/** Solve for the number of periods. Returns null when no (positive, finite) solution exists. */
export function tvmN(rate: number, pv: number, pmt: number, fv: number, type: PaymentTiming = 0): number | null {
  if (Math.abs(rate) < 1e-12) {
    if (pmt === 0) return null;
    const n = -(pv + fv) / pmt;
    return n > 0 && Number.isFinite(n) ? n : null;
  }
  const a = pmt * (1 + rate * type);
  const num = a - fv * rate;
  const den = a + pv * rate;
  if (den === 0 || num / den <= 0) return null;
  const n = Math.log(num / den) / Math.log(1 + rate);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Solve for the rate per period with Newton + bisection fallback. Returns null if none exists. */
export function tvmRate(n: number, pv: number, pmt: number, fv: number, type: PaymentTiming = 0, guess = 0.05): number | null {
  if (!(n > 0)) return null;
  const f = (r: number) => tvmResidual(r, n, pv, pmt, fv, type);
  const r = solveRoot(f, { guess, lo: -0.9999, hi: 100, tol: 1e-10 * Math.max(1, Math.abs(pv), Math.abs(pmt), Math.abs(fv)) });
  if (r === null) return null;
  return Math.abs(f(r)) < 1e-6 * Math.max(1, Math.abs(pv), Math.abs(pmt), Math.abs(fv)) ? r : null;
}

/** Net present value of cash flows CF₀, CF₁, …, CFₙ (CF₀ at time 0, undiscounted). */
export function npv(rate: number, cashFlows: readonly number[]): number {
  let s = 0;
  for (let t = 0; t < cashFlows.length; t++) s += cashFlows[t] / Math.pow(1 + rate, t);
  return s;
}

export interface IrrResult {
  /** The IRR closest to `guess`, or null if no IRR exists. */
  irr: number | null;
  /** All IRRs found on the search grid (more than one when cash-flow signs change several times). */
  all: number[];
  /** Number of sign changes in the cash-flow sequence (Descartes' bound on the number of IRRs). */
  signChanges: number;
}

/**
 * Internal rate of return: the rate(s) r > −100% with NPV(r) = 0. Scans a grid from −99.99% to
 * 1000% for sign changes of NPV and bisects each bracket, so it never diverges and reports
 * multiple IRRs. Returns irr = null when no sign change exists.
 */
export function irr(cashFlows: readonly number[], guess = 0.1): IrrResult {
  const nonZero = cashFlows.filter((c) => c !== 0);
  let signChanges = 0;
  for (let i = 1; i < nonZero.length; i++) if (Math.sign(nonZero[i]) !== Math.sign(nonZero[i - 1])) signChanges++;
  if (signChanges === 0) return { irr: null, all: [], signChanges };
  const f = (r: number) => npv(r, cashFlows);
  const brackets = findBrackets(f, -0.9999, 10, 4000);
  const all: number[] = [];
  for (const [a, b] of brackets) {
    const r = a === b ? a : bisect(f, a, b, 1e-15);
    if (r !== null && !all.some((x) => Math.abs(x - r) < 1e-9)) all.push(r);
  }
  all.sort((a, b) => a - b);
  if (all.length === 0) return { irr: null, all, signChanges };
  const best = all.reduce((p, c) => (Math.abs(c - guess) < Math.abs(p - guess) ? c : p));
  return { irr: best, all, signChanges };
}

/** Profitability index = PV of future cash flows / |CF₀|. */
export function profitabilityIndex(rate: number, cashFlows: readonly number[]): number {
  if (cashFlows.length === 0 || cashFlows[0] === 0) return NaN;
  return npv(rate, [0, ...cashFlows.slice(1)]) / Math.abs(cashFlows[0]);
}

/** Discounted payback period in periods (with linear interpolation), or null if never paid back. */
export function discountedPayback(rate: number, cashFlows: readonly number[]): number | null {
  let cum = 0;
  for (let t = 0; t < cashFlows.length; t++) {
    const pv = cashFlows[t] / Math.pow(1 + rate, t);
    const prev = cum;
    cum += pv;
    if (t > 0 && prev < 0 && cum >= 0) return t - 1 + -prev / pv;
  }
  return null;
}

export interface AmortizationRow {
  period: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

export interface AmortizationResult {
  payment: number;
  totalPaid: number;
  totalInterest: number;
  schedule: AmortizationRow[];
}

/**
 * Level-payment loan amortization.
 * @param principal amount borrowed
 * @param annualRate nominal annual rate (fraction), compounded `perYear` times a year
 * @param years term in years
 * @param perYear payments per year
 */
export function amortize(principal: number, annualRate: number, years: number, perYear: number): AmortizationResult {
  const n = Math.round(years * perYear);
  const r = annualRate / perYear;
  const payment = Math.abs(r) < 1e-12 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
  const schedule: AmortizationRow[] = [];
  let balance = principal;
  let totalInterest = 0;
  for (let k = 1; k <= n; k++) {
    const interest = balance * r;
    let principalPart = payment - interest;
    let pay = payment;
    if (k === n) {
      // Final payment clears any rounding residue.
      principalPart = balance;
      pay = balance + interest;
    }
    balance -= principalPart;
    if (Math.abs(balance) < 1e-9 * Math.max(1, principal)) balance = 0;
    totalInterest += interest;
    schedule.push({ period: k, payment: pay, interest, principal: principalPart, balance });
  }
  return { payment, totalPaid: payment * n, totalInterest, schedule };
}
