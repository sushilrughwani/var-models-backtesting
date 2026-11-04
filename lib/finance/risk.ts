/**
 * Market risk: parametric, historical and portfolio VaR, expected shortfall, EWMA and GARCH(1,1)
 * volatility. VaR and ES are reported as positive loss amounts.
 */
import { normInv, normPdf } from "./stats";

export interface ParametricVarResult {
  z: number;
  /** σ·√h */
  scaledSigma: number;
  /** μ·h (zero if the mean is excluded) */
  scaledMean: number;
  /** VaR as a fraction of portfolio value. */
  varPct: number;
  /** VaR in currency. */
  var: number;
}

/**
 * Normal (delta-normal) VaR over h days from daily μ and σ:
 *   VaR = V·(z_c·σ·√h − μ·h)   (or V·z_c·σ·√h when the mean is ignored).
 */
export function parametricVar(value: number, muDaily: number, sigmaDaily: number, confidence: number, horizon: number, includeMean: boolean): ParametricVarResult {
  const z = normInv(confidence);
  const scaledSigma = sigmaDaily * Math.sqrt(horizon);
  const scaledMean = includeMean ? muDaily * horizon : 0;
  const varPct = z * scaledSigma - scaledMean;
  return { z, scaledSigma, scaledMean, varPct, var: value * varPct };
}

/**
 * Normal expected shortfall: ES = V·(σ√h·φ(z_c)/(1 − c) − μh).
 */
export function parametricES(value: number, muDaily: number, sigmaDaily: number, confidence: number, horizon: number, includeMean: boolean): { esPct: number; es: number } {
  const z = normInv(confidence);
  const esPct = (sigmaDaily * Math.sqrt(horizon) * normPdf(z)) / (1 - confidence) - (includeMean ? muDaily * horizon : 0);
  return { esPct, es: value * esPct };
}

/** Number of tail observations used by the historical method: k = max(1, ceil(n(1 − c) − 1e−9)). */
export function tailCount(n: number, confidence: number): number {
  return Math.max(1, Math.ceil(n * (1 - confidence) - 1e-9));
}

export interface HistoricalRiskResult {
  n: number;
  /** Tail size k: VaR is the k-th worst return; ES averages the k worst returns. */
  k: number;
  /** VaR as a positive fraction (one day, or scaled by √h). */
  varPct: number;
  esPct: number;
  var: number;
  es: number;
  /** The k worst returns, worst first. */
  tail: number[];
  /** √h scaling factor applied. */
  scale: number;
}

/**
 * Historical simulation VaR and ES from a series of returns (fractions).
 * Convention: sort returns ascending; with k = ⌈n(1 − c)⌉ the VaR is −(k-th worst return) and the ES is
 * −(average of the k worst returns). For n = 500 and c = 99% this is the 5th worst loss, as in Hull.
 * Multi-day figures use the square-root-of-time rule.
 */
export function historicalVarES(returns: readonly number[], confidence: number, value = 1, horizon = 1): HistoricalRiskResult {
  const n = returns.length;
  const sorted = [...returns].sort((a, b) => a - b);
  const k = Math.min(n, tailCount(n, confidence));
  const tail = sorted.slice(0, k);
  const scale = Math.sqrt(horizon);
  const varPct = -sorted[k - 1] * scale;
  const esPct = (-tail.reduce((a, b) => a + b, 0) / k) * scale;
  return { n, k, varPct, esPct, var: value * varPct, es: value * esPct, tail, scale };
}

export interface PortfolioVarResult {
  portfolioSigma: number;
  var1: number;
  var2: number;
  undiversifiedVar: number;
  portfolioVar: number;
  diversificationBenefit: number;
  /** Component VaRs (sum to portfolio VaR). */
  component1: number;
  component2: number;
}

/**
 * Two-asset delta-normal VaR. With position values V₁, V₂ and daily vols σ₁, σ₂:
 *   σ_P = √(V₁²σ₁² + V₂²σ₂² + 2ρV₁V₂σ₁σ₂),  VaR_P = z·σ_P·√h,
 * equivalently VaR_P = √(VaR₁² + VaR₂² + 2ρ·VaR₁·VaR₂).
 */
export function twoAssetVar(v1: number, v2: number, s1: number, s2: number, rho: number, confidence: number, horizon: number): PortfolioVarResult {
  const z = normInv(confidence);
  const sq = Math.sqrt(horizon);
  const varP = v1 * v1 * s1 * s1 + v2 * v2 * s2 * s2 + 2 * rho * v1 * v2 * s1 * s2;
  const sigmaP = Math.sqrt(varP);
  const var1 = z * Math.abs(v1) * s1 * sq;
  const var2 = z * Math.abs(v2) * s2 * sq;
  const portfolioVar = z * sigmaP * sq;
  const c1 = (z * sq * (v1 * v1 * s1 * s1 + rho * v1 * v2 * s1 * s2)) / sigmaP;
  const c2 = (z * sq * (v2 * v2 * s2 * s2 + rho * v1 * v2 * s1 * s2)) / sigmaP;
  return { portfolioSigma: sigmaP, var1, var2, undiversifiedVar: var1 + var2, portfolioVar, diversificationBenefit: var1 + var2 - portfolioVar, component1: c1, component2: c2 };
}

export interface EwmaResult {
  /** variance[t] is the variance estimate for day t+1 (made after observing return t). variance[0] is the seed. */
  rows: { t: number; ret: number; varianceBefore: number; volBefore: number }[];
  /** Variance forecast for the day after the last return. */
  forecastVariance: number;
  forecastVol: number;
}

/**
 * RiskMetrics EWMA: σ²ₙ = λσ²ₙ₋₁ + (1 − λ)u²ₙ₋₁.
 * The recursion is seeded with σ² = u₁² ("first") or the sample variance about zero of the whole
 * series ("sample", mean of u²). Row t shows the variance estimate in force before return t is observed.
 */
export function ewmaVolatility(returns: readonly number[], lambda: number, seed: "first" | "sample" = "first"): EwmaResult {
  let v = seed === "first" ? returns[0] * returns[0] : returns.reduce((a, r) => a + r * r, 0) / returns.length;
  const rows: EwmaResult["rows"] = [];
  returns.forEach((u, i) => {
    rows.push({ t: i + 1, ret: u, varianceBefore: v, volBefore: Math.sqrt(v) });
    v = lambda * v + (1 - lambda) * u * u;
  });
  return { rows, forecastVariance: v, forecastVol: Math.sqrt(v) };
}

export interface GarchForecast {
  persistence: number;
  longRunVariance: number;
  longRunVol: number;
  /** E[σ²] for day n + t, t = 1…horizon. */
  path: { t: number; variance: number; vol: number }[];
  /** Expected variance on day n + horizon. */
  forecastVariance: number;
  /** Sum of the expected daily variances over the horizon (h-day variance). */
  cumulativeVariance: number;
  /** Decay rate a = ln(1/(α + β)). */
  decay: number;
  /** Half-life of a volatility shock in days, ln 2 / a. */
  halfLife: number;
}

/**
 * GARCH(1,1) σ²ₙ = ω + αu²ₙ₋₁ + βσ²ₙ₋₁. Long-run variance V_L = ω/(1 − α − β) and
 *   E[σ²ₙ₊ₜ] = V_L + (α + β)ᵗ(σ²ₙ − V_L)
 * where σ²ₙ is the current (day-n) variance estimate. Requires α + β < 1.
 */
export function garchForecast(omega: number, alpha: number, beta: number, currentVariance: number, horizon: number): GarchForecast {
  const ab = alpha + beta;
  const VL = omega / (1 - ab);
  const path: GarchForecast["path"] = [];
  let cum = 0;
  for (let t = 1; t <= horizon; t++) {
    const v = VL + Math.pow(ab, t) * (currentVariance - VL);
    cum += v;
    path.push({ t, variance: v, vol: Math.sqrt(v) });
  }
  const decay = Math.log(1 / ab);
  return {
    persistence: ab,
    longRunVariance: VL,
    longRunVol: Math.sqrt(VL),
    path,
    forecastVariance: path.length ? path[path.length - 1].variance : currentVariance,
    cumulativeVariance: cum,
    decay,
    halfLife: Math.log(2) / decay,
  };
}
