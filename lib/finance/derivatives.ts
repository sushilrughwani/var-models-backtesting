/** Forward/futures pricing with cost of carry, and put–call parity. */

export type CarryCompounding = "continuous" | "discrete";

export interface ForwardInputs {
  spot: number;
  /** Risk-free rate (annual). */
  r: number;
  /** Time to delivery in years. */
  T: number;
  /** Income (dividend/convenience/foreign-rate) yield. */
  q?: number;
  /** Storage cost yield. */
  u?: number;
  /** Present value of discrete cash income over the life (e.g. coupons, dividends). */
  pvIncome?: number;
  /** Present value of discrete storage costs over the life. */
  pvStorage?: number;
  compounding?: CarryCompounding;
}

/**
 * No-arbitrage forward price with cost of carry.
 *   continuous: F = (S − PV(I) + PV(U))·e^{(r + u − q)T}
 *   discrete:   F = (S − PV(I) + PV(U))·[(1 + r)(1 + u)/(1 + q)]^T
 * (With q = u = 0 the discrete form is the familiar F = (S − PV(I) + PV(U))(1 + r)^T.)
 */
export function forwardPrice(p: ForwardInputs): number {
  const q = p.q ?? 0;
  const u = p.u ?? 0;
  const base = p.spot - (p.pvIncome ?? 0) + (p.pvStorage ?? 0);
  if ((p.compounding ?? "continuous") === "continuous") return base * Math.exp((p.r + u - q) * p.T);
  return base * Math.pow(((1 + p.r) * (1 + u)) / (1 + q), p.T);
}

export interface ParityResult {
  /** C + PV(K) */
  fiduciaryCall: number;
  /** P + S·e^{−qT} */
  protectivePut: number;
  /** fiduciaryCall − protectivePut; positive means the call side is rich. */
  difference: number;
  /** Call price implied by the other three inputs. */
  impliedCall: number;
  /** Put price implied by the other three inputs. */
  impliedPut: number;
  arbitrage: boolean;
  strategy: string;
}

/**
 * European put–call parity with continuous rates and dividend yield: C + K·e^{−rT} = P + S·e^{−qT}.
 * A violation larger than `tolerance` is an arbitrage: sell the rich side and buy the cheap side.
 */
export function putCallParity(C: number, P: number, S: number, K: number, r: number, T: number, q = 0, tolerance = 0.01): ParityResult {
  const pvK = K * Math.exp(-r * T);
  const pvS = S * Math.exp(-q * T);
  const fiduciaryCall = C + pvK;
  const protectivePut = P + pvS;
  const difference = fiduciaryCall - protectivePut;
  const arbitrage = Math.abs(difference) > tolerance;
  let strategy = "No arbitrage: parity holds within tolerance.";
  if (arbitrage && difference > 0) {
    strategy = "Call side is overpriced: sell the call, buy the put, buy the stock (exp(−qT) units) and borrow PV(K). Lock in the difference today.";
  } else if (arbitrage) {
    strategy = "Put side is overpriced: sell the put, short the stock (exp(−qT) units), buy the call and lend PV(K). Lock in the difference today.";
  }
  return { fiduciaryCall, protectivePut, difference, impliedCall: P + pvS - pvK, impliedPut: C + pvK - pvS, arbitrage, strategy };
}
