import { describe, expect, it } from "vitest";
import katex from "katex";
import { calculators, defaultValues, getCalculator } from "@/lib/calculators/registry";
import { CALCULATOR_SLUGS } from "@/lib/calculators/types";

describe("calculator registry", () => {
  it("has exactly the 30 slugs in order", () => {
    expect(calculators).toHaveLength(30);
    expect(calculators.map((c) => c.slug)).toEqual([...CALCULATOR_SLUGS]);
    expect(new Set(calculators.map((c) => c.slug)).size).toBe(30);
    expect(getCalculator("black-scholes")?.title).toMatch(/Black/);
    expect(getCalculator("nope")).toBeUndefined();
    expect(getCalculator("toString")).toBeUndefined();
  });

  for (const c of calculators) {
    describe(c.slug, () => {
      it("default inputs compute without error and give finite numbers", () => {
        const res = c.compute(defaultValues(c));
        expect(res.error).toBeUndefined();
        expect(res.outputs.length).toBeGreaterThan(0);
        for (const o of res.outputs) {
          if (typeof o.value === "number") expect(Number.isFinite(o.value), `${o.label}`).toBe(true);
        }
        if (res.table) for (const row of res.table.rows) expect(row).toHaveLength(res.table.columns.length);
      });
      it("formula is valid KaTeX and metadata is complete", () => {
        expect(() => katex.renderToString(c.formula, { throwOnError: true, displayMode: true })).not.toThrow();
        expect(c.title.length).toBeGreaterThan(0);
        expect(c.description.length).toBeGreaterThan(0);
        expect(c.explanation.length).toBeGreaterThan(50);
        expect(c.courses.length).toBeGreaterThan(0);
        expect(new Set(c.inputs.map((i) => i.key)).size).toBe(c.inputs.length);
        for (const i of c.inputs) if (i.type === "select") expect(i.options!.some((o) => o.value === String(i.default))).toBe(true);
      });
      it("explanation math segments are valid KaTeX (no stray $)", () => {
        const dollars = (c.explanation.match(/\$/g) ?? []).length;
        expect(dollars % 2).toBe(0);
        const segs = c.explanation.match(/\$([^$]+)\$/g) ?? [];
        for (const s of segs) expect(() => katex.renderToString(s.slice(1, -1), { throwOnError: true })).not.toThrow();
      });
      it("garbage input returns an error instead of throwing", () => {
        const bad = Object.fromEntries(c.inputs.map((i) => [i.key, i.type === "select" ? String(i.default) : "x"]));
        const res = c.compute(bad);
        expect(res.error).toBeTruthy();
      });
    });
  }
});
