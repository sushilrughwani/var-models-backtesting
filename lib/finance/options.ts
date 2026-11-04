/** Option pricing: Black–Scholes–Merton (with continuous dividend yield) and the CRR binomial tree. */
import { normCdf, normPdf } from "./stats";

export type OptionType = "call" | "put";

export interface Greeks {
  delta: number;
  gamma: number;
  /** Sensitivity to a 1.00 (100 percentage-point) change in volatility. Divide by 100 for per 1%. */
  vega: number;
  /** Time decay per year (∂V/∂t, usually negative). Divide by 365 for per calendar day. */
  theta: number;
  /** Sensitivity to a 1.00 change in r. Divide by 100 for per 1%. */
  rho: number;
}

export interface BsmResult {
  d1: number;
  d2: number;
  call: number;
  put: number;
  callGreeks: Greeks;
  putGreeks: Greeks;
}

/**
 * Black–Scholes–Merton prices and Greeks for European options on an asset with continuous yield q.
 *   d₁ = [ln(S/K) + (r − q + σ²/2)T]/(σ√T),  d₂ = d₁ − σ√T
 *   C = S e^{−qT} N(d₁) − K e^{−rT} N(d₂),   P = K e^{−rT} N(−d₂) − S e^{−qT} N(−d₁)
 */
export function blackScholes(S: number, K: number, r: number, sigma: number, T: number, q = 0): BsmResult {
  const sqT = Math.sqrt(T);
  const d1 = (Math.log(S / K) + (r - q + 0.5 * sigma * sigma) * T) / (sigma * sqT);
  const d2 = d1 - sigma * sqT;
  const eq = Math.exp(-q * T);
  const er = Math.exp(-r * T);
  const Nd1 = normCdf(d1);
  const Nd2 = normCdf(d2);
  const Nmd1 = normCdf(-d1);
  const Nmd2 = normCdf(-d2);
  const pdf = normPdf(d1);
  const call = S * eq * Nd1 - K * er * Nd2;
  const put = K * er * Nmd2 - S * eq * Nmd1;
  const gamma = (eq * pdf) / (S * sigma * sqT);
  const vega = S * eq * pdf * sqT;
  const common = -(S * eq * pdf * sigma) / (2 * sqT);
  return {
    d1,
    d2,
    call,
    put,
    callGreeks: {
      delta: eq * Nd1,
      gamma,
      vega,
      theta: common - r * K * er * Nd2 + q * S * eq * Nd1,
      rho: K * T * er * Nd2,
    },
    putGreeks: {
      delta: -eq * Nmd1,
      gamma,
      vega,
      theta: common + r * K * er * Nmd2 - q * S * eq * Nmd1,
      rho: -K * T * er * Nmd2,
    },
  };
}

export interface BinomialResult {
  price: number;
  u: number;
  d: number;
  /** Risk-neutral probability of an up move. */
  p: number;
  dt: number;
  /** Delta at the first node (V_u − V_d)/(S_u − S_d). */
  delta: number;
  /** Terminal nodes from highest to lowest asset price. */
  terminal: { upMoves: number; price: number; payoff: number; probability: number }[];
  /** Number of nodes where early exercise was optimal (American only). */
  earlyExerciseNodes: number;
}

/**
 * Cox–Ross–Rubinstein n-step binomial tree: u = e^{σ√Δt}, d = 1/u, p = (e^{(r−q)Δt} − d)/(u − d).
 * Supports European and American exercise. Returns null if the parameters admit arbitrage (p ∉ [0,1]).
 */
export function binomialOption(S: number, K: number, r: number, sigma: number, T: number, steps: number, type: OptionType, american: boolean, q = 0): BinomialResult | null {
  const n = Math.max(1, Math.floor(steps));
  const dt = T / n;
  const u = Math.exp(sigma * Math.sqrt(dt));
  const d = 1 / u;
  const p = (Math.exp((r - q) * dt) - d) / (u - d);
  if (!(p >= 0 && p <= 1)) return null;
  const disc = Math.exp(-r * dt);
  const payoff = (s: number) => (type === "call" ? Math.max(s - K, 0) : Math.max(K - s, 0));
  // Terminal values, index j = number of up moves.
  const v: number[] = new Array(n + 1);
  const terminal: BinomialResult["terminal"] = [];
  // log of binomial coefficients for probabilities.
  let logC = 0;
  const logs: number[] = [];
  for (let j = 0; j <= n; j++) {
    if (j > 0) logC += Math.log((n - j + 1) / j);
    logs.push(logC);
  }
  for (let j = 0; j <= n; j++) {
    const s = S * Math.pow(u, j) * Math.pow(d, n - j);
    v[j] = payoff(s);
    const prob = Math.exp(logs[j] + (j > 0 ? j * Math.log(p) : 0) + (n - j > 0 ? (n - j) * Math.log(1 - p) : 0));
    terminal.push({ upMoves: j, price: s, payoff: v[j], probability: prob });
  }
  terminal.reverse();
  let early = 0;
  let level1: number[] = [];
  for (let i = n - 1; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      let val = disc * (p * v[j + 1] + (1 - p) * v[j]);
      if (american) {
        const ex = payoff(S * Math.pow(u, j) * Math.pow(d, i - j));
        if (ex > val + 1e-12) {
          val = ex;
          early++;
        }
      }
      v[j] = val;
    }
    if (i === 1) level1 = [v[0], v[1]];
  }
  const delta = n >= 1 && level1.length === 2 ? (level1[1] - level1[0]) / (S * u - S * d) : NaN;
  return { price: v[0], u, d, p, dt, delta: n === 1 ? (payoff(S * u) - payoff(S * d)) / (S * u - S * d) : delta, terminal, earlyExerciseNodes: early };
}
