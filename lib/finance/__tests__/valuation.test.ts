import { describe, expect, it } from "vitest";
import { wacc } from "../corporate";
import { fcffDcf, gordonGrowth, gordonImpliedReturn } from "../valuation";
import { getCalculator, defaultValues } from "@/lib/calculators/registry";
import type { CalcResult } from "@/lib/calculators/types";

const out = (res: CalcResult, label: string) => res.outputs.find((o) => o.label.startsWith(label))?.value as number;

describe("WACC", () => {
  it("debt and equity", () => {
    expect(wacc(600, 400, 0, 0.1, 0.06, 0.07, 0.25).wacc).toBeCloseTo(0.078, 14);
  });
  it("with preferred stock", () => {
    expect(wacc(500, 300, 200, 0.12, 0.07, 0.09, 0.3).wacc).toBeCloseTo(0.0927, 14);
  });
  it("calculator", () => {
    const c = getCalculator("wacc")!;
    expect(out(c.compute(defaultValues(c)), "WACC")).toBeCloseTo(0.078, 14);
    expect(c.compute({ ...defaultValues(c), E: 0, D: 0, P: 0 }).error).toBeTruthy();
  });
});

describe("FCFF DCF", () => {
  it("EV, equity and per share", () => {
    const r = fcffDcf([100, 110, 120, 130, 140], 0.09, 0.025, 500, 100, 50);
    expect(r.terminalValue).toBeCloseTo(2207.6923076923076, 9);
    expect(r.enterpriseValue).toBeCloseTo(1894.9241297116027, 9);
    expect(r.equityValue).toBeCloseTo(1494.9241297116027, 9);
    expect(r.valuePerShare).toBeCloseTo(29.898482594232053, 10);
  });
  it("calculator rejects g >= WACC", () => {
    const c = getCalculator("fcff-dcf")!;
    expect(out(c.compute(defaultValues(c)), "Value per share")).toBeCloseTo(29.898482594232053, 9);
    expect(c.compute({ ...defaultValues(c), g: 9 }).error).toMatch(/exceed/);
  });
});

describe("Gordon growth", () => {
  it("value and implied return", () => {
    expect(gordonGrowth(2, 0.04, 0.09).value).toBeCloseTo(41.6, 12);
    expect(gordonImpliedReturn(2, 0.04, 40)).toBeCloseTo(0.092, 14);
    const c = getCalculator("gordon-growth")!;
    const res = c.compute(defaultValues(c));
    expect(out(res, "Intrinsic value")).toBeCloseTo(41.6, 12);
    expect(c.compute({ ...defaultValues(c), r: 3 }).error).toBeTruthy();
  });
});

describe("DuPont", () => {
  it("3-step and 5-step agree", () => {
    const c = getCalculator("dupont")!;
    const res = c.compute(defaultValues(c));
    // 120/1500 × 1500/1000 × 1000/400 = 0.30; 0.75 × 0.8 × 0.13333 × 1.5 × 2.5 = 0.30
    expect(out(res, "Return on equity")).toBeCloseTo(0.3, 14);
    expect(out(res, "ROE (5-step")).toBeCloseTo(0.3, 14);
    expect(out(res, "Tax burden")).toBeCloseTo(0.75, 14);
    expect(out(res, "Interest burden")).toBeCloseTo(0.8, 14);
    expect(out(res, "Return on assets")).toBeCloseTo(0.12, 14);
    expect(c.compute({ ...defaultValues(c), equity: 0 }).error).toBeTruthy();
  });
});
