import { describe, expect, it } from "vitest";
import { capmRequiredReturn, twoAssetPortfolio } from "../portfolio";
import { downsideDeviation, informationRatio, jensensAlpha, seriesPerformance, sharpeRatio, sortinoRatio, treynorRatio } from "../performance";
import { getCalculator, defaultValues } from "@/lib/calculators/registry";
import type { CalcResult } from "@/lib/calculators/types";

const out = (res: CalcResult, label: string) => res.outputs.find((o) => o.label.startsWith(label))?.value;

describe("two-asset portfolio", () => {
  it("return, risk and minimum-variance weight", () => {
    const p = twoAssetPortfolio(0.6, 0.1, 0.06, 0.2, 0.1, 0.3);
    expect(p.expectedReturn).toBeCloseTo(0.084, 14);
    expect(p.stdDev).toBeCloseTo(0.13740451229854136, 13);
    expect(p.minVarianceWeight1).toBeCloseTo(0.10526315789473688, 13);
  });
  it("perfect negative correlation gives a zero-risk mix", () => {
    const p = twoAssetPortfolio(1 / 3, 0.1, 0.06, 0.2, 0.1, -1);
    expect(p.stdDev).toBeCloseTo(0, 10);
  });
  it("calculator", () => {
    const c = getCalculator("two-asset-portfolio")!;
    const res = c.compute(defaultValues(c));
    expect(out(res, "Portfolio standard deviation") as number).toBeCloseTo(0.13740451229854136, 12);
    expect(res.chart!.data).toHaveLength(21);
    expect(c.compute({ ...defaultValues(c), rho: 1.5 }).error).toBeTruthy();
  });
});

describe("performance measures", () => {
  it("scalar ratios (textbook style)", () => {
    expect(sharpeRatio(0.12, 0.03, 0.18)).toBeCloseTo(0.5, 14);
    expect(treynorRatio(0.12, 0.03, 1.2)).toBeCloseTo(0.075, 14);
    expect(jensensAlpha(0.12, 0.03, 1.2, 0.1)).toBeCloseTo(0.006, 14);
  });
  it("Sortino and downside deviation", () => {
    const rs = [0.05, -0.02, 0.03, -0.04, 0.01];
    // Shortfalls vs 0: -0.02, -0.04 -> DD = sqrt((0.0004 + 0.0016)/5)
    expect(downsideDeviation(rs, 0)).toBeCloseTo(Math.sqrt(0.002 / 5), 14);
    expect(sortinoRatio(rs, 0)).toBeCloseTo(0.006 / Math.sqrt(0.0004), 12);
  });
  it("series measures match numpy", () => {
    const p = [2.1, -1.3, 3.4, 0.8, -2.2, 1.9, 2.7, -0.5, 1.2, 3.1, -1.8, 2.4].map((x) => x / 100);
    const b = [1.8, -1.0, 2.9, 0.5, -2.5, 1.6, 2.2, -0.9, 1.0, 2.6, -1.5, 2.0].map((x) => x / 100);
    const s = seriesPerformance(p, b, 0.0025, 0);
    expect(s.beta).toBeCloseTo(1.0973262032085564, 12);
    expect(s.sharpe).toBeCloseTo(0.3720466907363599, 12);
    expect(s.treynor).toBeCloseTo(0.006682910981156593, 12);
    expect(s.downsideDeviation).toBeCloseTo(0.009137833441248534, 12);
    expect(s.sortino).toBeCloseTo(1.0761121218236793, 12);
    expect(s.jensensAlpha).toBeCloseTo(0.0021210338680926893, 12);
    expect(s.informationRatio).toBeCloseTo(0.9297802597230292, 12);
    expect(informationRatio(p, b)).toBeCloseTo(0.9297802597230292, 12);
  });
  it("calculator validates series lengths", () => {
    const c = getCalculator("risk-adjusted-performance")!;
    const res = c.compute(defaultValues(c));
    expect(out(res, "Sharpe") as number).toBeCloseTo(0.3720466907363599, 12);
    expect(out(res, "Information ratio") as number).toBeCloseTo(0.9297802597230292, 12);
    expect(c.compute({ ...defaultValues(c), benchmark: "1, 2, 3" }).error).toMatch(/same number/);
  });
});

describe("CAPM", () => {
  it("required return and alpha", () => {
    expect(capmRequiredReturn(0.03, 1.2, 0.08)).toBeCloseTo(0.09, 14);
    const c = getCalculator("capm")!;
    const res = c.compute(defaultValues(c));
    expect(out(res, "Required return") as number).toBeCloseTo(0.09, 14);
    expect(out(res, "Alpha") as number).toBeCloseTo(0.01, 14);
    expect(out(res, "Verdict")).toMatch(/Undervalued/);
  });
});
