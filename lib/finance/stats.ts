/**
 * Statistical primitives: descriptive statistics, the normal distribution (accurate CDF, PDF and
 * inverse), log-gamma, the regularized incomplete beta function and Student's t distribution.
 *
 * All functions are pure and free of dependencies.
 */

const SQRT2 = Math.SQRT2;
const SQRT_PI = Math.sqrt(Math.PI);

/** Arithmetic mean. Returns NaN for an empty array. */
export function mean(xs: readonly number[]): number {
  if (xs.length === 0) return NaN;
  let s = 0;
  for (const x of xs) s += x;
  return s / xs.length;
}

/**
 * Variance. `sample = true` (default) divides by n − 1, otherwise by n.
 * Returns NaN when there are too few observations.
 */
export function variance(xs: readonly number[], sample = true): number {
  const n = xs.length;
  if (n === 0 || (sample && n < 2)) return NaN;
  const m = mean(xs);
  let s = 0;
  for (const x of xs) s += (x - m) * (x - m);
  return s / (sample ? n - 1 : n);
}

/** Standard deviation (sample by default). */
export function stdev(xs: readonly number[], sample = true): number {
  return Math.sqrt(variance(xs, sample));
}

/** Covariance of two equal-length series (sample by default). */
export function covariance(xs: readonly number[], ys: readonly number[], sample = true): number {
  const n = xs.length;
  if (n !== ys.length || n === 0 || (sample && n < 2)) return NaN;
  const mx = mean(xs);
  const my = mean(ys);
  let s = 0;
  for (let i = 0; i < n; i++) s += (xs[i] - mx) * (ys[i] - my);
  return s / (sample ? n - 1 : n);
}

/**
 * Error function erf(x).
 *
 * For |x| < 2.5 uses the everywhere-positive series
 *   erf(x) = (2/√π) e^{−x²} Σ_{n≥0} 2ⁿ x^{2n+1} / (1·3·5···(2n+1)),
 * which has no cancellation. For larger |x| it uses 1 − erfc(x) with the continued fraction.
 * Accuracy is close to double precision (≈1e−15 absolute).
 */
export function erf(x: number): number {
  if (Number.isNaN(x)) return NaN;
  const ax = Math.abs(x);
  if (ax >= 2.5) {
    const r = 1 - erfcContinuedFraction(ax);
    return x < 0 ? -r : r;
  }
  let term = ax;
  let sum = ax;
  const x2 = ax * ax;
  for (let n = 1; n < 200; n++) {
    term *= (2 * x2) / (2 * n + 1);
    sum += term;
    if (term < 1e-17 * sum) break;
  }
  const r = (2 / SQRT_PI) * Math.exp(-x2) * sum;
  return x < 0 ? -r : r;
}

/** Complementary error function erfc(x) = 1 − erf(x), accurate in both tails. */
export function erfc(x: number): number {
  if (Number.isNaN(x)) return NaN;
  if (x >= 2.5) return erfcContinuedFraction(x);
  if (x <= -2.5) return 2 - erfcContinuedFraction(-x);
  return 1 - erf(x);
}

/**
 * erfc(x) for x > 0 via the continued fraction
 *   erfc(x) = e^{−x²}/√π · 1/(x + (1/2)/(x + 1/(x + (3/2)/(x + 2/(x + ...)))))
 * evaluated with the modified Lentz algorithm.
 */
function erfcContinuedFraction(x: number): number {
  if (x > 27) return 0;
  const tiny = 1e-300;
  let f = x;
  let C = x;
  let D = 0;
  for (let k = 1; k < 500; k++) {
    const a = k / 2;
    D = x + a * D;
    if (Math.abs(D) < tiny) D = tiny;
    C = x + a / C;
    if (Math.abs(C) < tiny) C = tiny;
    D = 1 / D;
    const delta = C * D;
    f *= delta;
    if (Math.abs(delta - 1) < 1e-16) break;
  }
  return Math.exp(-x * x) / (SQRT_PI * f);
}

/** Standard normal probability density φ(x). */
export function normPdf(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

/** Standard normal cumulative distribution Φ(x) = ½ erfc(−x/√2). Accurate to ≈1e−15. */
export function normCdf(x: number): number {
  return 0.5 * erfc(-x / SQRT2);
}

/**
 * Inverse standard normal CDF Φ⁻¹(p) for 0 < p < 1.
 * Starts from the Abramowitz & Stegun 26.2.23 rational approximation and polishes with Halley
 * iterations against the accurate normCdf, giving ≈1e−14 accuracy.
 */
export function normInv(p: number): number {
  if (!(p > 0 && p < 1)) {
    if (p === 0) return -Infinity;
    if (p === 1) return Infinity;
    return NaN;
  }
  const q = p < 0.5 ? p : 1 - p;
  const t = Math.sqrt(-2 * Math.log(q));
  let x = t - (2.515517 + 0.802853 * t + 0.010328 * t * t) / (1 + 1.432788 * t + 0.189269 * t * t + 0.001308 * t * t * t);
  if (p < 0.5) x = -x;
  for (let i = 0; i < 6; i++) {
    const e = normCdf(x) - p;
    const u = e / normPdf(x);
    const dx = u / (1 + (x * u) / 2);
    x -= dx;
    if (Math.abs(dx) < 1e-15 * Math.max(1, Math.abs(x))) break;
  }
  return x;
}

/** Natural log of the gamma function for x > 0 (Lanczos approximation, g = 7, ≈1e−15 relative). */
export function lnGamma(x: number): number {
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
    12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (x < 0.5) {
    // Reflection formula.
    return Math.log(Math.PI / Math.abs(Math.sin(Math.PI * x))) - lnGamma(1 - x);
  }
  const z = x - 1;
  let a = c[0];
  const t = z + 7.5;
  for (let i = 1; i < 9; i++) a += c[i] / (z + i);
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(a);
}

/** Continued fraction for the incomplete beta function (Lentz's method). */
function betaContinuedFraction(a: number, b: number, x: number): number {
  const tiny = 1e-300;
  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;
  let c = 1;
  let d = 1 - (qab * x) / qap;
  if (Math.abs(d) < tiny) d = tiny;
  d = 1 / d;
  let h = d;
  for (let m = 1; m <= 1000; m++) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < tiny) d = tiny;
    c = 1 + aa / c;
    if (Math.abs(c) < tiny) c = tiny;
    d = 1 / d;
    h *= d * c;
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < tiny) d = tiny;
    c = 1 + aa / c;
    if (Math.abs(c) < tiny) c = tiny;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < 1e-16) break;
  }
  return h;
}

/** Regularized incomplete beta function I_x(a, b) for a, b > 0 and 0 ≤ x ≤ 1. */
export function regIncBeta(x: number, a: number, b: number): number {
  if (!(a > 0 && b > 0) || x < 0 || x > 1 || Number.isNaN(x)) return NaN;
  if (x === 0) return 0;
  if (x === 1) return 1;
  const lnFront = lnGamma(a + b) - lnGamma(a) - lnGamma(b) + a * Math.log(x) + b * Math.log(1 - x);
  const front = Math.exp(lnFront);
  if (x < (a + 1) / (a + b + 2)) return (front * betaContinuedFraction(a, b, x)) / a;
  return 1 - (front * betaContinuedFraction(b, a, 1 - x)) / b;
}

/** Student's t cumulative distribution with ν > 0 degrees of freedom. */
export function tCdf(t: number, df: number): number {
  if (!(df > 0) || Number.isNaN(t)) return NaN;
  if (t === Infinity) return 1;
  if (t === -Infinity) return 0;
  const x = df / (df + t * t);
  const tail = 0.5 * regIncBeta(x, df / 2, 0.5);
  return t > 0 ? 1 - tail : tail;
}

/** Student's t probability density. */
export function tPdf(t: number, df: number): number {
  const lnC = lnGamma((df + 1) / 2) - lnGamma(df / 2) - 0.5 * Math.log(df * Math.PI);
  return Math.exp(lnC - ((df + 1) / 2) * Math.log(1 + (t * t) / df));
}

/** Inverse Student's t CDF, found by safeguarded Newton iteration on tCdf. */
export function tInv(p: number, df: number): number {
  if (!(p > 0 && p < 1) || !(df > 0)) return NaN;
  if (p === 0.5) return 0;
  // Bracket then bisect/Newton.
  let lo = -1;
  let hi = 1;
  while (tCdf(lo, df) > p) lo *= 2;
  while (tCdf(hi, df) < p) hi *= 2;
  let x = normInv(p);
  if (!(x > lo && x < hi)) x = (lo + hi) / 2;
  for (let i = 0; i < 200; i++) {
    const f = tCdf(x, df) - p;
    if (Math.abs(f) < 1e-15) break;
    if (f > 0) hi = x;
    else lo = x;
    let next = x - f / tPdf(x, df);
    if (!(next > lo && next < hi)) next = (lo + hi) / 2;
    if (Math.abs(next - x) < 1e-14 * Math.max(1, Math.abs(x))) {
      x = next;
      break;
    }
    x = next;
  }
  return x;
}

/** Sample quantile with linear interpolation (type 7, same as Excel PERCENTILE.INC / numpy default). */
export function quantile(xs: readonly number[], p: number): number {
  if (xs.length === 0) return NaN;
  const s = [...xs].sort((a, b) => a - b);
  const h = (s.length - 1) * p;
  const lo = Math.floor(h);
  const hi = Math.ceil(h);
  return s[lo] + (h - lo) * (s[hi] - s[lo]);
}
