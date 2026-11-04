/** Term-structure and money-market rate calculations: forward rates, FRAs and covered interest parity. */

export type Compounding = "annual" | "continuous";

/**
 * Implied forward rate between years a and b (a < b) from spot rates s_a and s_b.
 *   annual:     (1 + f)^{b−a} = (1 + s_b)^b/(1 + s_a)^a
 *   continuous: f = (s_b·b − s_a·a)/(b − a)
 * With a = 0 the forward rate is just s_b.
 */
export function forwardRate(sa: number, a: number, sb: number, b: number, comp: Compounding = "annual"): number {
  if (comp === "continuous") return (sb * b - sa * a) / (b - a);
  return Math.pow(Math.pow(1 + sb, b) / Math.pow(1 + sa, a), 1 / (b - a)) - 1;
}

/** One-period forward rates f(t−1, t) for t = 1…n from spot rates for maturities 1…n years. */
export function oneYearForwards(spots: readonly number[], comp: Compounding = "annual"): number[] {
  return spots.map((s, i) => (i === 0 ? s : forwardRate(spots[i - 1], i, s, i + 1, comp)));
}

/** Discount factor for a spot rate and maturity. */
export function discountFactor(spot: number, t: number, comp: Compounding = "annual"): number {
  return comp === "continuous" ? Math.exp(-spot * t) : Math.pow(1 + spot, -t);
}

export interface FraResult {
  /** Fair (implied) forward rate for the FRA period, simple interest. */
  forwardRate: number;
  /** Value to the long (pay fixed / receive floating) at the valuation date. */
  valueLong: number;
  /** Settlement amount at t₁ if the reference rate turned out equal to the forward rate. */
  periodFraction: number;
}

/**
 * Value of a t₁×t₂ FRA (money-market simple rates, actual/basis day count).
 * L₁, L₂ are the current spot rates to the FRA start and end (days d₁ < d₂). The implied forward is
 *   F = [(1 + L₂·d₂/B)/(1 + L₁·d₁/B) − 1]·B/(d₂ − d₁),
 * and the value to the long (paying the contract rate K) is
 *   V = N·(F − K)·((d₂ − d₁)/B)/(1 + L₂·d₂/B).
 */
export function fraValue(notional: number, contractRate: number, l1: number, d1: number, l2: number, d2: number, basis = 360): FraResult {
  const tau = (d2 - d1) / basis;
  const F = ((1 + (l2 * d2) / basis) / (1 + (l1 * d1) / basis) - 1) / tau;
  const valueLong = (notional * (F - contractRate) * tau) / (1 + (l2 * d2) / basis);
  return { forwardRate: F, valueLong, periodFraction: tau };
}

export type ParityConvention = "simple" | "annual" | "continuous";

/**
 * Covered interest rate parity forward rate. Spot S is quoted as price currency per unit of base
 * currency; r_p and r_b are the price- and base-currency interest rates.
 *   simple:     F = S·(1 + r_p·d/B)/(1 + r_b·d/B)
 *   annual:     F = S·[(1 + r_p)/(1 + r_b)]^{d/B}
 *   continuous: F = S·e^{(r_p − r_b)·d/B}
 */
export function cipForward(spot: number, rPrice: number, rBase: number, days: number, basis = 360, conv: ParityConvention = "simple"): number {
  const t = days / basis;
  if (conv === "continuous") return spot * Math.exp((rPrice - rBase) * t);
  if (conv === "annual") return spot * Math.pow((1 + rPrice) / (1 + rBase), t);
  return (spot * (1 + rPrice * t)) / (1 + rBase * t);
}
