/**
 * Option-free fixed-coupon bonds on a coupon date: price, yield to maturity, duration and convexity.
 * Yields are nominal annual rates compounded `freq` times a year (bond-equivalent basis for freq = 2).
 */
import { solveRoot } from "./solver";

/** Number of coupon periods (years × freq rounded to the nearest whole period, at least 1). */
export function bondPeriods(years: number, freq: number): number {
  return Math.max(1, Math.round(years * freq));
}

/** Cash flows per period: coupon each period, plus face value at maturity. */
export function bondCashFlows(face: number, couponRate: number, years: number, freq: number): number[] {
  const n = bondPeriods(years, freq);
  const c = (face * couponRate) / freq;
  return Array.from({ length: n }, (_, i) => (i === n - 1 ? c + face : c));
}

/** Bond price = Σ CFₜ/(1 + y/m)ᵗ. */
export function bondPrice(face: number, couponRate: number, ytm: number, years: number, freq: number): number {
  const cfs = bondCashFlows(face, couponRate, years, freq);
  const y = ytm / freq;
  return cfs.reduce((s, cf, i) => s + cf / Math.pow(1 + y, i + 1), 0);
}

/** Yield to maturity from price (Newton + bisection). Returns null if no yield exists. */
export function bondYtm(price: number, face: number, couponRate: number, years: number, freq: number): number | null {
  if (!(price > 0)) return null;
  const f = (y: number) => bondPrice(face, couponRate, y, years, freq) - price;
  return solveRoot(f, { guess: couponRate || 0.05, lo: -0.99 * freq, hi: 10, tol: 1e-11 * Math.max(1, price) });
}

export interface DurationResult {
  price: number;
  /** Macaulay duration in years. */
  macaulay: number;
  /** Modified duration = Macaulay/(1 + y/m). */
  modified: number;
  /** Annualised convexity (years²). */
  convexity: number;
  /** Money duration = ModD × price. */
  moneyDuration: number;
  /** Price value of a basis point. */
  pvbp: number;
}

/** Macaulay duration, modified duration and convexity from closed-form sums. */
export function bondDuration(face: number, couponRate: number, ytm: number, years: number, freq: number): DurationResult {
  const cfs = bondCashFlows(face, couponRate, years, freq);
  const y = ytm / freq;
  let price = 0;
  let wt = 0;
  let conv = 0;
  cfs.forEach((cf, i) => {
    const t = i + 1;
    const pv = cf / Math.pow(1 + y, t);
    price += pv;
    wt += t * pv;
    conv += (t * (t + 1) * cf) / Math.pow(1 + y, t + 2);
  });
  const macaulay = wt / price / freq;
  const modified = macaulay / (1 + y);
  const convexity = conv / price / (freq * freq);
  return { price, macaulay, modified, convexity, moneyDuration: modified * price, pvbp: modified * price * 1e-4 };
}

/** Percentage price change approximation ΔP/P ≈ −ModD·Δy + ½·Convexity·(Δy)². */
export function priceChangeApprox(modified: number, convexity: number, dy: number): { durationEffect: number; convexityEffect: number; total: number } {
  const durationEffect = -modified * dy;
  const convexityEffect = 0.5 * convexity * dy * dy;
  return { durationEffect, convexityEffect, total: durationEffect + convexityEffect };
}
