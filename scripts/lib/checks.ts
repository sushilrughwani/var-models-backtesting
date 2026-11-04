/**
 * Shared validation helpers used by scripts/verify-questions.ts and scripts/validate-content.ts.
 */
import katex from "katex";

export const LETTERS = ["A", "B", "C", "D"] as const;

/** Strings parsed from JSON must not contain control characters (a sign of "\frac" -> form feed bugs). */
export function hasControlChars(s: string): boolean {
  // eslint-disable-next-line no-control-regex
  return /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(s);
}

/** Remove fenced code blocks and inline code so math checks ignore code. */
export function stripCode(md: string): string {
  return md.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
}

export interface MathSpan {
  tex: string;
  display: boolean;
}

/** Extract $$...$$ and $...$ math spans (ignoring escaped \$). */
export function extractMath(text: string): { spans: MathSpan[]; unbalanced: string[] } {
  const spans: MathSpan[] = [];
  const unbalanced: string[] = [];
  const src = stripCode(text);
  // Display math first
  let rest = src.replace(/\$\$([\s\S]+?)\$\$/g, (_m, tex: string) => {
    spans.push({ tex, display: true });
    return " ";
  });
  rest = rest.replace(/\\\$/g, " ");
  // Check per paragraph for balanced single dollars
  for (const para of rest.split(/\n\s*\n/)) {
    const count = (para.match(/\$/g) || []).length;
    if (count % 2 === 1) unbalanced.push(para.trim().slice(0, 120));
    para.replace(/\$([^$\n]+?)\$/g, (_m, tex: string) => {
      spans.push({ tex, display: false });
      return " ";
    });
  }
  return { spans, unbalanced };
}

export function katexErrors(text: string): string[] {
  const errors: string[] = [];
  const { spans, unbalanced } = extractMath(text);
  for (const u of unbalanced) errors.push(`Unbalanced $ (write currency as USD 100 or \\$100): "${u}"`);
  for (const s of spans) {
    try {
      katex.renderToString(s.tex, { throwOnError: true, displayMode: s.display, strict: "ignore" });
    } catch (e) {
      errors.push(`KaTeX error in "${s.tex.slice(0, 80)}": ${(e as Error).message.split("\n")[0]}`);
    }
  }
  return errors;
}

/** First number appearing in a string, commas removed. Handles leading minus/plus. */
export function firstNumber(s: string): number | null {
  const m = s.replace(/(\d),(\d)/g, "$1$2").match(/[-−+]?\d*\.?\d+(?:e[-+]?\d+)?/i);
  if (!m) return null;
  return Number(m[0].replace("−", "-"));
}

export function defaultTolerance(ans: number): number {
  return Math.max(0.01, Math.abs(ans) * 0.005);
}

export function runVerify(code: string): number {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const fn = new Function(code) as () => unknown;
  const v = fn();
  if (typeof v !== "number" || !Number.isFinite(v)) throw new Error(`verify returned ${String(v)}`);
  return v;
}

export function expectedOptionCount(course: string): number {
  if (course.startsWith("cfa-")) return 3;
  return 4;
}

export function countWords(md: string): number {
  const noMath = stripCode(md).replace(/\$\$[\s\S]*?\$\$/g, " ").replace(/\$[^$\n]*\$/g, " x ");
  return noMath.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
}

export function parseFrontmatter(md: string): { data: Record<string, string>; body: string } {
  const m = md.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: md };
  const data: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*?)\s*(#.*)?$/);
    if (kv) data[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
  }
  return { data, body: m[2] };
}

export function h2Headings(body: string): string[] {
  return stripCode(body)
    .split("\n")
    .filter((l) => /^##\s+/.test(l))
    .map((l) => l.replace(/^##\s+/, "").trim());
}
