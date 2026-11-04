/**
 * Robust one-dimensional root finding: Newton's method with a numerical derivative, falling back to
 * bracketing + bisection (with secant acceleration) when Newton fails or leaves the domain.
 */

export interface SolveOptions {
  /** Initial guess for Newton's method. */
  guess?: number;
  /** Lower end of the search domain. */
  lo?: number;
  /** Upper end of the search domain. */
  hi?: number;
  /** Absolute tolerance on f(x). */
  tol?: number;
  maxIter?: number;
}

/** Bisection on a bracket [a, b] where f(a) and f(b) have opposite signs. */
export function bisect(f: (x: number) => number, a: number, b: number, tol = 1e-12, maxIter = 300): number | null {
  let fa = f(a);
  const fb = f(b);
  if (!Number.isFinite(fa) || !Number.isFinite(fb)) return null;
  if (fa === 0) return a;
  if (fb === 0) return b;
  if (fa * fb > 0) return null;
  let lo = a;
  let hi = b;
  for (let i = 0; i < maxIter; i++) {
    const mid = 0.5 * (lo + hi);
    const fm = f(mid);
    if (fm === 0 || Math.abs(hi - lo) < tol * Math.max(1, Math.abs(mid))) return mid;
    if (fa * fm < 0) hi = mid;
    else {
      lo = mid;
      fa = fm;
    }
  }
  return 0.5 * (lo + hi);
}

/**
 * Find all sign-change brackets of f on a grid between lo and hi. The grid is denser near zero,
 * which suits interest rates.
 */
export function findBrackets(f: (x: number) => number, lo: number, hi: number, steps = 2000): [number, number][] {
  const out: [number, number][] = [];
  const pts: number[] = [];
  // Non-uniform grid: fine between −0.5 and 1, coarser outside.
  const add = (a: number, b: number, n: number) => {
    for (let i = 0; i < n; i++) pts.push(a + ((b - a) * i) / n);
  };
  const m1 = Math.max(lo, -0.5);
  const m2 = Math.min(hi, 1);
  if (lo < m1) add(lo, m1, Math.floor(steps / 4));
  if (m1 < m2) add(m1, m2, steps);
  if (m2 < hi) add(m2, hi, Math.floor(steps / 2));
  pts.push(hi);
  let px = pts[0];
  let pf = f(px);
  for (let i = 1; i < pts.length; i++) {
    const x = pts[i];
    const fx = f(x);
    if (Number.isFinite(pf) && Number.isFinite(fx)) {
      if (pf === 0) out.push([px, px]);
      else if (pf * fx < 0) out.push([px, x]);
    }
    px = x;
    pf = fx;
  }
  if (Number.isFinite(pf) && pf === 0) out.push([px, px]);
  return out;
}

/**
 * Solve f(x) = 0. Tries Newton from `guess`; if that fails to converge inside [lo, hi], scans for a
 * sign change and bisects. Returns null if no root can be found.
 */
export function solveRoot(f: (x: number) => number, opts: SolveOptions = {}): number | null {
  const lo = opts.lo ?? -0.9999;
  const hi = opts.hi ?? 10;
  const tol = opts.tol ?? 1e-10;
  const maxIter = opts.maxIter ?? 100;
  let x = opts.guess ?? 0.1;
  for (let i = 0; i < maxIter; i++) {
    const fx = f(x);
    if (!Number.isFinite(fx)) break;
    if (Math.abs(fx) < tol) return x;
    const h = 1e-7 * Math.max(1, Math.abs(x));
    const d = (f(x + h) - f(x - h)) / (2 * h);
    if (!Number.isFinite(d) || d === 0) break;
    const nx = x - fx / d;
    if (!(nx > lo && nx < hi)) break;
    if (Math.abs(nx - x) < 1e-14 * Math.max(1, Math.abs(x))) {
      if (Math.abs(f(nx)) < Math.max(tol, 1e-8)) return nx;
      break;
    }
    x = nx;
  }
  const brackets = findBrackets(f, lo, hi);
  if (brackets.length === 0) return null;
  // Prefer the bracket closest to the guess.
  const g = opts.guess ?? 0.1;
  brackets.sort((a, b) => Math.abs((a[0] + a[1]) / 2 - g) - Math.abs((b[0] + b[1]) / 2 - g));
  const [a, b] = brackets[0];
  return a === b ? a : bisect(f, a, b, 1e-15);
}
