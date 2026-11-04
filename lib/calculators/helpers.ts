/** Small helpers shared by the calculator definitions: input reading, validation and error handling. */
import { parseSeries, type CalcResult, type CalcValues, type CalcOutput } from "./types";

/** Error thrown by validation helpers; converted to `CalcResult.error` by `safeCompute`. */
export class InputError extends Error {}

/** Read a finite number. Throws InputError with the field label if missing or not finite. */
export function num(values: CalcValues, key: string, label = key): number {
  const raw = values[key];
  const x = typeof raw === "number" ? raw : raw === undefined || String(raw).trim() === "" ? NaN : Number(raw);
  if (!Number.isFinite(x)) throw new InputError(`${label} must be a number.`);
  return x;
}

/** Read a percentage input (entered as 5 for 5%) and return it as a fraction. */
export function pct(values: CalcValues, key: string, label = key): number {
  return num(values, key, label) / 100;
}

/** Read an integer input (rounded) and check it lies in [min, max]. */
export function int(values: CalcValues, key: string, label: string, min: number, max: number): number {
  const x = Math.round(num(values, key, label));
  if (x < min || x > max) throw new InputError(`${label} must be a whole number between ${min} and ${max}.`);
  return x;
}

/** Read a select/string input. */
export function str(values: CalcValues, key: string, fallback = ""): string {
  const raw = values[key];
  return raw === undefined ? fallback : String(raw);
}

/** Read a series input; percent = true divides each value by 100. */
export function series(values: CalcValues, key: string, label: string, minLength: number, percent = true): number[] {
  const raw = values[key];
  const xs = parseSeries(raw === undefined ? "" : raw);
  if (xs.length < minLength) throw new InputError(`${label} needs at least ${minLength} numeric value${minLength === 1 ? "" : "s"}.`);
  return percent ? xs.map((x) => x / 100) : xs;
}

/** Throw an InputError unless `cond` holds. */
export function check(cond: boolean, message: string): asserts cond {
  if (!cond) throw new InputError(message);
}

/** Wrap a compute function so invalid inputs or non-finite results produce `error` instead of throwing. */
export function safeCompute(fn: (values: CalcValues) => CalcResult): (values: CalcValues) => CalcResult {
  return (values) => {
    try {
      const res = fn(values);
      const bad = res.outputs.find((o: CalcOutput) => typeof o.value === "number" && !Number.isFinite(o.value));
      if (!res.error && bad) return { outputs: [], error: `Could not compute "${bad.label}" for these inputs (result is not finite).` };
      return res;
    } catch (e) {
      if (e instanceof InputError) return { outputs: [], error: e.message };
      return { outputs: [], error: "These inputs could not be evaluated. Please check them." };
    }
  };
}

/** Round for table display. */
export function r(x: number, d = 4): number {
  return Number.isFinite(x) ? Number(x.toFixed(d)) : x;
}

/** Format a fraction as a percent string for tables. */
export function p(x: number, d = 2): string {
  return `${(x * 100).toFixed(d)}%`;
}

/** Common course slug groups. */
export const COURSES = {
  cfa1: "cfa-level-1",
  cfa2: "cfa-level-2",
  cfa3: "cfa-level-3",
  frm1: "frm-part-1",
  frm2: "frm-part-2",
  fm: "financial-modeling",
  excel: "excel-for-finance",
  py: "python-for-finance",
} as const;
