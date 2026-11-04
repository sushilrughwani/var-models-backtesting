import { describe, expect, it } from "vitest";
import { ewmaVolatility, garchForecast, historicalVarES, parametricES, parametricVar, twoAssetVar } from "../risk";
import { SAMPLE_DAILY_RETURNS } from "../data/sampleReturns";
import { generateSampleReturns } from "../data/generateSampleReturns";
import { getCalculator, defaultValues } from "@/lib/calculators/registry";
import type { CalcResult } from "@/lib/calculators/types";

const out = (res: CalcResult, label: string) => res.outputs.find((o) => o.label.startsWith(label))?.value as number;

describe("parametric VaR and ES", () => {
  it("99% 10-day VaR, with and without mean", () => {
    expect(parametricVar(1e6, 0.0005, 0.012, 0.99, 10, false).var).toBeCloseTo(88278.69494231464, 5);
    expect(parametricVar(1e6, 0.0005, 0.012, 0.99, 10, true).var).toBeCloseTo(83278.69494231464, 5);
    expect(parametricVar(1, 0, 1, 0.95, 1, false).z).toBeCloseTo(1.6448536269514715, 11);
  });
  it("normal ES", () => {
    expect(parametricES(1e6, 0, 0.012, 0.975, 1, true).es).toBeCloseTo(28053.63350641701, 5);
    expect(parametricES(1e6, 0.001, 0.02, 0.99, 5, true).es).toBeCloseTo(114192.00342584659, 5);
    // ES 97.5% ≈ VaR 99% under normality
    const es = parametricES(1, 0, 1, 0.975, 1, false).esPct;
    expect(es / parametricVar(1, 0, 1, 0.99, 1, false).varPct).toBeCloseTo(1.0047, 3);
  });
  it("calculator", () => {
    const c = getCalculator("parametric-var")!;
    expect(out(c.compute(defaultValues(c)), "99.00% 10-day VaR")).toBeCloseTo(88278.69494231464, 4);
    expect(c.compute({ ...defaultValues(c), conf: 100 }).error).toBeTruthy();
  });
});

describe("historical VaR / ES on the built-in sample", () => {
  it("sample dataset is frozen and reproducible", () => {
    expect(SAMPLE_DAILY_RETURNS).toHaveLength(250);
    expect(generateSampleReturns()).toEqual([...SAMPLE_DAILY_RETURNS]);
  });
  it("values computed independently with numpy", () => {
    const r95 = historicalVarES(SAMPLE_DAILY_RETURNS, 0.95, 1);
    expect(r95.k).toBe(13);
    expect(r95.varPct).toBeCloseTo(0.020481, 12);
    expect(r95.esPct).toBeCloseTo(0.025038153846153845, 12);
    const r99 = historicalVarES(SAMPLE_DAILY_RETURNS, 0.99, 1);
    expect(r99.k).toBe(3);
    expect(r99.varPct).toBeCloseTo(0.026892, 12);
    expect(r99.esPct).toBeCloseTo(0.031842, 12);
    const r975 = historicalVarES(SAMPLE_DAILY_RETURNS, 0.975, 1e6);
    expect(r975.var).toBeCloseTo(24818, 6);
    expect(r975.es).toBeCloseTo(28127.571428571428, 6);
  });
  it("Hull convention: 500 obs at 99% uses the 5th worst", () => {
    const xs = Array.from({ length: 500 }, (_, i) => (i - 250) / 10000);
    const r = historicalVarES(xs, 0.99);
    expect(r.k).toBe(5);
    expect(r.varPct).toBeCloseTo(0.0246, 12);
  });
  it("square-root-of-time scaling", () => {
    const one = historicalVarES(SAMPLE_DAILY_RETURNS, 0.95, 1, 1);
    const ten = historicalVarES(SAMPLE_DAILY_RETURNS, 0.95, 1, 10);
    expect(ten.varPct).toBeCloseTo(one.varPct * Math.sqrt(10), 12);
  });
  it("calculators with sample and custom data", () => {
    const h = getCalculator("historical-var")!;
    expect(out(h.compute(defaultValues(h)), "95.00% 1-day historical VaR")).toBeCloseTo(20481, 6);
    const custom = h.compute({ ...defaultValues(h), source: "custom", conf: 90 });
    expect(out(custom, "VaR as %")).toBeCloseTo(0.026, 12);
    expect(h.compute({ ...defaultValues(h), source: "custom", returns: "1, 2" }).error).toBeTruthy();
    const e = getCalculator("expected-shortfall")!;
    expect(out(e.compute(defaultValues(e)), "97.50% 1-day ES (historical)")).toBeCloseTo(28127.571428571428, 6);
    expect(out(e.compute({ ...defaultValues(e), source: "custom", conf: 90 }), "ES as %")).toBeCloseTo(0.029, 12);
    expect(out(e.compute({ ...defaultValues(e), method: "normal" }), "97.50% 1-day ES (normal)")).toBeCloseTo(28053.63350641701, 5);
  });
});

describe("two-asset portfolio VaR", () => {
  it("diversified and undiversified VaR; components add up", () => {
    const r = twoAssetVar(6e5, 4e5, 0.015, 0.01, 0.3, 0.99, 10);
    expect(r.portfolioVar).toBeCloseTo(80115.58397234864, 5);
    expect(r.undiversifiedVar).toBeCloseTo(95635.2528541742, 5);
    expect(r.component1 + r.component2).toBeCloseTo(r.portfolioVar, 8);
    expect(Math.sqrt(r.var1 ** 2 + r.var2 ** 2 + 2 * 0.3 * r.var1 * r.var2)).toBeCloseTo(r.portfolioVar, 8);
    const c = getCalculator("portfolio-var")!;
    expect(out(c.compute(defaultValues(c)), "Portfolio (diversified) VaR")).toBeCloseTo(80115.58397234864, 5);
  });
});

describe("EWMA", () => {
  it("Hull-style one-step update", () => {
    // σ²_{n-1} = 0.0001 (1%), u = 2%, λ = 0.9 -> σ_n = 1.1402%
    const r = ewmaVolatility([0.01, 0.02], 0.9);
    expect(r.forecastVol).toBeCloseTo(Math.sqrt(0.9 * (0.9 * 0.0001 + 0.1 * 0.0001) + 0.1 * 0.0004), 14);
    expect(Math.sqrt(0.9 * 0.0001 + 0.1 * 0.0004)).toBeCloseTo(0.01140175425099138, 14);
  });
  it("matches numpy recursion for both seeds", () => {
    const c = getCalculator("ewma-volatility")!;
    expect(out(c.compute(defaultValues(c)), "EWMA daily volatility")).toBeCloseTo(0.012067767409464783, 13);
    expect(out(c.compute({ ...defaultValues(c), seed: "sample" }), "EWMA daily volatility")).toBeCloseTo(0.013386964094218938, 13);
    expect(c.compute({ ...defaultValues(c), lambda: 1 }).error).toBeTruthy();
  });
});

describe("GARCH(1,1)", () => {
  it("long-run variance and t-day forecast (Hull parameters)", () => {
    const g = garchForecast(0.000002, 0.13, 0.86, 0.0003, 10);
    expect(g.longRunVariance).toBeCloseTo(0.0002, 14);
    expect(g.forecastVariance).toBeCloseTo(0.0002904382075008804, 14);
  });
  it("calculator", () => {
    const c = getCalculator("garch-forecast")!;
    const res = c.compute(defaultValues(c));
    expect(out(res, "Long-run daily volatility")).toBeCloseTo(0.014142135623730944, 13);
    expect(out(res, "Expected daily volatility on day n+10")).toBeCloseTo(0.01583178436565168, 13);
    expect(out(res, "10-day volatility")).toBeCloseTo(0.05030015682034389, 13);
    expect(c.compute({ ...defaultValues(c), alpha: 0.2, beta: 0.85 }).error).toMatch(/below 1/);
  });
});
