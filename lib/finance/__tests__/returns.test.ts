import { describe, expect, it } from "vitest";
import { annualizeReturn, arithmeticMeanReturn, geometricMeanReturn, holdingPeriodReturn } from "../returns";
import { getCalculator, defaultValues } from "@/lib/calculators/registry";
import type { CalcResult } from "@/lib/calculators/types";

const out = (res: CalcResult, label: string) => res.outputs.find((o) => o.label.startsWith(label))?.value as number;

describe("returns", () => {
  it("HPR and annualised", () => {
    expect(holdingPeriodReturn(100, 112, 3)).toBeCloseTo(0.15, 14);
    expect(annualizeReturn(0.15, 2)).toBeCloseTo(0.07238052947636087, 13);
    // Short period annualisation: 2% over a quarter.
    expect(annualizeReturn(0.02, 0.25)).toBeCloseTo(Math.pow(1.02, 4) - 1, 13);
  });
  it("arithmetic vs geometric", () => {
    const rs = [0.1, -0.05, 0.2, 0.08, -0.12];
    expect(arithmeticMeanReturn(rs)).toBeCloseTo(0.042, 14);
    expect(geometricMeanReturn(rs)).toBeCloseTo(0.03571625622071761, 13);
    expect(geometricMeanReturn([0.5, -0.5])).toBeCloseTo(Math.sqrt(0.75) - 1, 13);
    expect(Number.isNaN(geometricMeanReturn([0.1, -1]))).toBe(true);
  });
  it("calculators", () => {
    const h = getCalculator("holding-period-return")!;
    const r1 = h.compute(defaultValues(h));
    expect(out(r1, "Holding period return")).toBeCloseTo(0.15, 12);
    expect(out(r1, "Annualised return")).toBeCloseTo(0.07238052947636087, 12);
    expect(out(r1, "Continuously compounded HPR")).toBeCloseTo(0.13976194237515863, 12);
    expect(h.compute({ ...defaultValues(h), begin: 0 }).error).toBeTruthy();
    const m = getCalculator("arithmetic-geometric-mean")!;
    const r2 = m.compute(defaultValues(m));
    expect(out(r2, "Arithmetic mean")).toBeCloseTo(0.042, 12);
    expect(out(r2, "Geometric mean")).toBeCloseTo(0.03571625622071761, 12);
    expect(m.compute({ returns: "10, -100" }).error).toBeTruthy();
  });
});
