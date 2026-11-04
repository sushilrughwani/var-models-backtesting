/** Risk-adjusted performance measures. */
import { covariance, mean, stdev, variance } from "./stats";

/** Sharpe ratio (R_p − R_f)/σ_p. */
export function sharpeRatio(rp: number, rf: number, sigma: number): number {
  return (rp - rf) / sigma;
}

/** Treynor ratio (R_p − R_f)/β_p. */
export function treynorRatio(rp: number, rf: number, beta: number): number {
  return (rp - rf) / beta;
}

/** Jensen's alpha α = R_p − [R_f + β(R_m − R_f)]. */
export function jensensAlpha(rp: number, rf: number, beta: number, rm: number): number {
  return rp - (rf + beta * (rm - rf));
}

/** M² (Modigliani–Modigliani) measure R_f + (R_p − R_f)σ_m/σ_p. */
export function m2Measure(rp: number, rf: number, sigmaP: number, sigmaM: number): number {
  return rf + ((rp - rf) * sigmaM) / sigmaP;
}

/**
 * Downside deviation (target semideviation) relative to a minimum acceptable return:
 *   DD = √( Σ min(Rᵢ − MAR, 0)² / n ).
 * All n observations are in the denominator (the usual Sortino convention).
 */
export function downsideDeviation(returns: readonly number[], mar: number): number {
  if (returns.length === 0) return NaN;
  let s = 0;
  for (const r of returns) {
    const d = Math.min(r - mar, 0);
    s += d * d;
  }
  return Math.sqrt(s / returns.length);
}

/** Sortino ratio (mean(R) − MAR)/DD. */
export function sortinoRatio(returns: readonly number[], mar: number): number {
  return (mean(returns) - mar) / downsideDeviation(returns, mar);
}

/** Information ratio mean(Rp − Rb)/σ(Rp − Rb) using the sample standard deviation of active returns. */
export function informationRatio(portfolio: readonly number[], benchmark: readonly number[]): number {
  const active = portfolio.map((r, i) => r - benchmark[i]);
  return mean(active) / stdev(active);
}

export interface SeriesPerformance {
  n: number;
  meanReturn: number;
  stdDev: number;
  benchmarkMean: number;
  beta: number;
  sharpe: number;
  treynor: number;
  sortino: number;
  downsideDeviation: number;
  jensensAlpha: number;
  trackingError: number;
  informationRatio: number;
}

/**
 * All the classic per-period measures from a portfolio return series and an equal-length benchmark
 * series. Uses sample (n − 1) statistics; β = Cov(Rp, Rb)/Var(Rb).
 */
export function seriesPerformance(portfolio: readonly number[], benchmark: readonly number[], rf: number, mar: number): SeriesPerformance {
  const n = portfolio.length;
  const mp = mean(portfolio);
  const mb = mean(benchmark);
  const sp = stdev(portfolio);
  const beta = covariance(portfolio, benchmark) / variance(benchmark);
  const active = portfolio.map((r, i) => r - benchmark[i]);
  const te = stdev(active);
  const dd = downsideDeviation(portfolio, mar);
  return {
    n,
    meanReturn: mp,
    stdDev: sp,
    benchmarkMean: mb,
    beta,
    sharpe: sharpeRatio(mp, rf, sp),
    treynor: treynorRatio(mp, rf, beta),
    sortino: (mp - mar) / dd,
    downsideDeviation: dd,
    jensensAlpha: jensensAlpha(mp, rf, beta, mb),
    trackingError: te,
    informationRatio: mean(active) / te,
  };
}
