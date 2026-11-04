/** Two-asset portfolio mathematics and the CAPM. */

export interface TwoAssetPortfolio {
  expectedReturn: number;
  variance: number;
  stdDev: number;
  covariance: number;
  /** Weight in asset 1 of the global minimum-variance portfolio. */
  minVarianceWeight1: number;
  minVarianceReturn: number;
  minVarianceStdDev: number;
}

/**
 * Expected return and risk of a two-asset portfolio.
 * E(Rp) = w₁E(R₁) + w₂E(R₂), σp² = w₁²σ₁² + w₂²σ₂² + 2w₁w₂ρσ₁σ₂, with w₂ = 1 − w₁.
 */
export function twoAssetPortfolio(w1: number, r1: number, r2: number, s1: number, s2: number, rho: number): TwoAssetPortfolio {
  const w2 = 1 - w1;
  const cov = rho * s1 * s2;
  const variance = w1 * w1 * s1 * s1 + w2 * w2 * s2 * s2 + 2 * w1 * w2 * cov;
  const den = s1 * s1 + s2 * s2 - 2 * cov;
  const wmin = den === 0 ? NaN : (s2 * s2 - cov) / den;
  const vmin = wmin * wmin * s1 * s1 + (1 - wmin) * (1 - wmin) * s2 * s2 + 2 * wmin * (1 - wmin) * cov;
  return {
    expectedReturn: w1 * r1 + w2 * r2,
    variance,
    stdDev: Math.sqrt(Math.max(variance, 0)),
    covariance: cov,
    minVarianceWeight1: wmin,
    minVarianceReturn: wmin * r1 + (1 - wmin) * r2,
    minVarianceStdDev: Math.sqrt(Math.max(vmin, 0)),
  };
}

/** CAPM required return E(R) = R_f + β[E(R_m) − R_f]. */
export function capmRequiredReturn(rf: number, beta: number, marketReturn: number): number {
  return rf + beta * (marketReturn - rf);
}
