import { describe, expect, it } from "vitest";
import { forwardPrice, putCallParity } from "../derivatives";
import { cipForward, fraValue } from "../rates";
import { binomialOption, blackScholes } from "../options";
import { getCalculator, defaultValues } from "@/lib/calculators/registry";
import type { CalcResult } from "@/lib/calculators/types";

const out = (res: CalcResult, label: string) => res.outputs.find((o) => o.label.startsWith(label))?.value;

describe("forward pricing (cost of carry)", () => {
  it("continuous with income yield", () => {
    expect(forwardPrice({ spot: 100, r: 0.05, T: 1, q: 0.02 })).toBeCloseTo(103.0454533953517, 11);
  });
  it("discrete with PV of income", () => {
    expect(forwardPrice({ spot: 100, r: 0.05, T: 0.5, pvIncome: 3, compounding: "discrete" })).toBeCloseTo(99.39542242980811, 11);
  });
  it("continuous storage yield and PV storage", () => {
    expect(forwardPrice({ spot: 50, r: 0.04, T: 2, u: 0.01, pvStorage: 1 })).toBeCloseTo(56.363716821858034, 11);
  });
  it("calculator flags cash-and-carry", () => {
    const c = getCalculator("forward-pricing-cost-of-carry")!;
    const res = c.compute(defaultValues(c));
    expect(out(res, "No-arbitrage") as number).toBeCloseTo(103.0454533953517, 10);
    expect(res.notes!.join(" ")).toMatch(/cash-and-carry/);
    const low = c.compute({ ...defaultValues(c), market: 102 });
    expect(low.notes!.join(" ")).toMatch(/reverse/);
  });
});

describe("FRA", () => {
  it("implied rate and value", () => {
    const r = fraValue(1e7, 0.03, 0.028, 90, 0.032, 270, 360);
    expect(r.forwardRate).toBeCloseTo(0.033763654419066924, 13);
    expect(r.valueLong).toBeCloseTo(18377.218843100218, 6);
  });
  it("calculator short position has opposite sign", () => {
    const c = getCalculator("fra-valuation")!;
    const res = c.compute({ ...defaultValues(c), position: "short" });
    expect(out(res, "Value to the short") as number).toBeCloseTo(-18377.218843100218, 6);
    expect(c.compute({ ...defaultValues(c), d2: 30 }).error).toBeTruthy();
  });
});

describe("Black–Scholes–Merton", () => {
  it("S=K=100, r=5%, σ=20%, T=1 -> call 10.4506, put 5.5735", () => {
    const r = blackScholes(100, 100, 0.05, 0.2, 1);
    expect(r.call).toBeCloseTo(10.450583572185565, 10);
    expect(r.put).toBeCloseTo(5.573526022256971, 10);
    expect(r.d1).toBeCloseTo(0.35, 14);
    expect(r.d2).toBeCloseTo(0.15, 14);
  });
  it("with dividend yield", () => {
    const r = blackScholes(100, 95, 0.04, 0.25, 0.5, 0.02);
    expect(r.call).toBeCloseTo(10.11034933502075, 10);
    expect(r.put).toBeCloseTo(4.224239924245701, 10);
    // put-call parity with dividends
    expect(r.call - r.put).toBeCloseTo(100 * Math.exp(-0.01) - 95 * Math.exp(-0.02), 12);
  });
  it("Greeks match finite differences", () => {
    const r = blackScholes(100, 100, 0.05, 0.2, 1);
    expect(r.callGreeks.delta).toBeCloseTo(0.6368306511816968, 8);
    expect(r.putGreeks.delta).toBeCloseTo(-0.36316934885149976, 8);
    expect(r.callGreeks.gamma).toBeCloseTo(0.018762001730010525, 6);
    expect(r.callGreeks.vega).toBeCloseTo(37.52403438721075, 5);
    expect(r.callGreeks.theta).toBeCloseTo(-6.414027551358004, 5);
    expect(r.putGreeks.theta).toBeCloseTo(-1.6578804288513993, 5);
    expect(r.callGreeks.rho).toBeCloseTo(53.23248077413467, 5);
    expect(r.putGreeks.rho).toBeCloseTo(-41.89046183441292, 5);
  });
  it("calculator", () => {
    const c = getCalculator("black-scholes")!;
    const res = c.compute(defaultValues(c));
    expect(out(res, "Call price") as number).toBeCloseTo(10.4506, 4);
    expect(out(res, "Put price") as number).toBeCloseTo(5.5735, 4);
    expect(c.compute({ ...defaultValues(c), sigma: 0 }).error).toBeTruthy();
  });
});

describe("CRR binomial", () => {
  it("2-step European and American put (S=50, K=52, r=5%, σ=30%, T=2)", () => {
    expect(binomialOption(50, 52, 0.05, 0.3, 2, 2, "put", false)!.price).toBeCloseTo(6.245708445206439, 12);
    expect(binomialOption(50, 52, 0.05, 0.3, 2, 2, "put", true)!.price).toBeCloseTo(7.428401902704835, 12);
  });
  it("American put (50 steps) and American call with dividend yield (100 steps)", () => {
    expect(binomialOption(100, 100, 0.05, 0.2, 1, 50, "put", true)!.price).toBeCloseTo(6.073727985724901, 10);
    expect(binomialOption(100, 100, 0.05, 0.2, 1, 100, "call", true, 0.04)!.price).toBeCloseTo(8.099140067931959, 10);
  });
  it("European tree converges to BSM", () => {
    const bs = blackScholes(100, 100, 0.05, 0.2, 1);
    expect(Math.abs(binomialOption(100, 100, 0.05, 0.2, 1, 1000, "call", false)!.price - bs.call)).toBeLessThan(0.003);
    expect(Math.abs(binomialOption(100, 100, 0.05, 0.2, 1, 1000, "put", false)!.price - bs.put)).toBeLessThan(0.003);
  });
  it("American call on non-dividend stock equals European", () => {
    const a = binomialOption(100, 90, 0.05, 0.25, 1, 200, "call", true)!.price;
    const e = binomialOption(100, 90, 0.05, 0.25, 1, 200, "call", false)!.price;
    expect(a).toBeCloseTo(e, 10);
  });
  it("terminal probabilities sum to 1", () => {
    const r = binomialOption(100, 100, 0.05, 0.2, 1, 30, "call", false)!;
    expect(r.terminal.reduce((s, t) => s + t.probability, 0)).toBeCloseTo(1, 12);
  });
  it("calculator", () => {
    const c = getCalculator("binomial-option")!;
    const res = c.compute(defaultValues(c));
    expect(out(res, "American put price") as number).toBeCloseTo(6.073727985724901, 9);
    expect(res.table!.rows).toHaveLength(51);
    expect(c.compute({ ...defaultValues(c), steps: 0 }).error).toBeTruthy();
  });
});

describe("put–call parity", () => {
  it("BSM prices satisfy parity", () => {
    const b = blackScholes(100, 100, 0.05, 0.2, 1);
    const r = putCallParity(b.call, b.put, 100, 100, 0.05, 1);
    expect(r.difference).toBeCloseTo(0, 12);
    expect(r.arbitrage).toBe(false);
  });
  it("detects an overpriced call and an overpriced put", () => {
    const hi = putCallParity(11.5, 5.5735, 100, 100, 0.05, 1);
    expect(hi.arbitrage).toBe(true);
    expect(hi.difference).toBeCloseTo(11.5 + 100 * Math.exp(-0.05) - 105.5735, 12);
    expect(hi.strategy).toMatch(/sell the call/);
    const lo = putCallParity(10.45, 6.5, 100, 100, 0.05, 1);
    expect(lo.strategy).toMatch(/sell the put/);
    expect(lo.impliedPut).toBeCloseTo(10.45 + 100 * Math.exp(-0.05) - 100, 12);
  });
  it("calculator", () => {
    const c = getCalculator("put-call-parity")!;
    const res = c.compute(defaultValues(c));
    expect(out(res, "Parity violation") as number).toBeCloseTo(10.45 + 100 * Math.exp(-0.05) - 105.57, 12);
    expect(out(res, "Arbitrage?")).toBe("No");
  });
});

describe("covered interest parity", () => {
  it("simple, annual and continuous conventions", () => {
    expect(cipForward(1.1, 0.05, 0.03, 180, 360, "simple")).toBeCloseTo((1.1 * 1.025) / 1.015, 14);
    expect(cipForward(1.1, 0.05, 0.03, 730, 365, "annual")).toBeCloseTo(1.1 * Math.pow(1.05 / 1.03, 2), 14);
    expect(cipForward(1.1, 0.05, 0.03, 365, 365, "continuous")).toBeCloseTo(1.1 * Math.exp(0.02), 14);
  });
  it("calculator", () => {
    const c = getCalculator("covered-interest-parity")!;
    const res = c.compute(defaultValues(c));
    expect(out(res, "Forward rate") as number).toBeCloseTo(1.1108374384236455, 12);
    expect(out(res, "Forward points") as number).toBeCloseTo(108.37438423645374, 8);
    expect(out(res, "Base currency")).toBe("Premium");
    const r2 = c.compute({ ...defaultValues(c), basis: "365" });
    expect(out(r2, "Forward rate") as number).toBeCloseTo((1.1 * (1 + 0.05 * 180 / 365)) / (1 + 0.03 * 180 / 365), 12);
  });
});
