/**
 * Deterministic generator for the built-in sample return dataset. The dataset in sampleReturns.ts was
 * produced by `generateSampleReturns()` with the default arguments and rounded to 6 decimals; a unit
 * test checks that the two stay in sync.
 *
 * Model: daily return = μ + σₜ·z, z ~ N(0,1) from a mulberry32 PRNG via Box–Muller, where σₜ is the
 * base volatility on calm days and 2.5× the base volatility on roughly 1 day in 12 ("stress" days).
 * This mixture gives the fat tails typical of equity index returns. The data are synthetic.
 */

/** mulberry32: small, fast 32-bit seeded PRNG returning floats in [0, 1). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateSampleReturns(n = 250, seed = 20240601, mu = 0.0004, sigma = 0.01): number[] {
  const rand = mulberry32(seed);
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const u1 = Math.max(rand(), 1e-12);
    const u2 = rand();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const stress = rand() < 1 / 12;
    const r = mu + (stress ? 2.5 * sigma : sigma) * z;
    out.push(Math.round(r * 1e6) / 1e6);
  }
  return out;
}
