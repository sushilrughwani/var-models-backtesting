/**
 * Verifies every question (question bank + end-of-lesson quizzes).
 *
 *   npx tsx scripts/verify-questions.ts                # all questions
 *   npx tsx scripts/verify-questions.ts <file|dir>...  # specific files
 *
 * Checks: schema, option count per course, rationale for every option, no control characters,
 * valid KaTeX, unique ids, and for numeric questions: runs `verify`, compares with `numericAnswer`
 * and with the first number in the correct option's text.
 */
import fs from "node:fs";
import path from "node:path";
import {
  LETTERS,
  defaultTolerance,
  expectedOptionCount,
  firstNumber,
  hasControlChars,
  katexErrors,
  runVerify,
} from "./lib/checks";

type Q = Record<string, unknown> & {
  id: string;
  course: string;
  topic: string;
  options: string[];
  answer: string;
  rationale: Record<string, string>;
  kind: string;
  verify?: string;
  numericAnswer?: number;
  tolerance?: number;
};

const ROOT = path.resolve(__dirname, "..");

function walk(p: string, out: string[]) {
  if (!fs.existsSync(p)) return;
  const st = fs.statSync(p);
  if (st.isDirectory()) for (const f of fs.readdirSync(p)) walk(path.join(p, f), out);
  else if (p.endsWith(".json")) out.push(p);
}

function defaultFiles(): string[] {
  const out: string[] = [];
  walk(path.join(ROOT, "content/questions"), out);
  const coursesDir = path.join(ROOT, "content/courses");
  if (fs.existsSync(coursesDir))
    for (const c of fs.readdirSync(coursesDir)) walk(path.join(coursesDir, c, "quizzes"), out);
  return out;
}

function topicsFor(course: string): Set<string> | null {
  const f = path.join(ROOT, "content/courses", course, "course.json");
  if (!fs.existsSync(f)) return null;
  const c = JSON.parse(fs.readFileSync(f, "utf8"));
  return new Set((c.modules as { slug: string }[]).map((m) => m.slug));
}

function allStrings(v: unknown, out: string[] = []): string[] {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => allStrings(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => allStrings(x, out));
  return out;
}

export function checkQuestion(q: Q, topicCache: Map<string, Set<string> | null>): string[] {
  const errs: string[] = [];
  const req = ["id", "course", "topic", "difficulty", "kind", "stem", "options", "answer", "explanation", "rationale"];
  for (const k of req) if (q[k] === undefined || q[k] === "") errs.push(`missing field "${k}"`);
  if (errs.length) return errs;
  if (!["easy", "medium", "hard"].includes(q.difficulty as string)) errs.push(`bad difficulty "${q.difficulty}"`);
  if (!["numeric", "conceptual"].includes(q.kind)) errs.push(`bad kind "${q.kind}"`);
  if (!topicCache.has(q.course)) topicCache.set(q.course, topicsFor(q.course));
  const topics = topicCache.get(q.course);
  if (!topics) errs.push(`unknown course "${q.course}"`);
  else if (!topics.has(q.topic)) errs.push(`topic "${q.topic}" is not a module slug of ${q.course}`);
  const n = expectedOptionCount(q.course);
  if (!Array.isArray(q.options) || q.options.length !== n) errs.push(`expected ${n} options, got ${q.options?.length}`);
  const letters = LETTERS.slice(0, q.options.length);
  if (!letters.includes(q.answer as (typeof LETTERS)[number])) errs.push(`answer "${q.answer}" out of range`);
  for (const L of letters) if (!q.rationale?.[L]) errs.push(`missing rationale for option ${L}`);
  q.options.forEach((o, i) => {
    if (/^\s*\(?[A-Da-d][.):]\s/.test(o)) errs.push(`option ${letters[i]} starts with a letter label`);
  });
  if (new Set(q.options.map((o) => o.trim())).size !== q.options.length) errs.push("duplicate option text");
  for (const s of allStrings(q)) {
    if (hasControlChars(s)) errs.push(`control character in string (unescaped LaTeX backslash?): "${s.slice(0, 60)}"`);
  }
  for (const s of [q.stem as string, q.explanation as string, ...q.options, ...Object.values(q.rationale || {})]) {
    for (const e of katexErrors(s)) errs.push(e);
  }
  if (q.kind === "numeric") {
    if (!q.verify) errs.push("numeric question without verify");
    if (typeof q.numericAnswer !== "number") errs.push("numeric question without numericAnswer");
    if (q.verify && typeof q.numericAnswer === "number") {
      const tol = q.tolerance ?? defaultTolerance(q.numericAnswer);
      try {
        const v = runVerify(q.verify);
        if (Math.abs(v - q.numericAnswer) > tol + 1e-12)
          errs.push(`verify() = ${v} but numericAnswer = ${q.numericAnswer} (tol ${tol})`);
      } catch (e) {
        errs.push(`verify threw: ${(e as Error).message}`);
      }
      const idx = LETTERS.indexOf(q.answer as (typeof LETTERS)[number]);
      const opt = q.options[idx];
      const num = opt !== undefined ? firstNumber(opt) : null;
      if (num === null) errs.push(`correct option "${opt}" contains no number`);
      else if (Math.abs(num - q.numericAnswer) > tol + 1e-9)
        errs.push(`correct option shows ${num} but numericAnswer = ${q.numericAnswer}`);
    }
  }
  return errs;
}

function main() {
  const args = process.argv.slice(2);
  const files: string[] = [];
  if (args.length) args.forEach((a) => walk(path.resolve(a), files));
  else files.push(...defaultFiles());

  const ids = new Map<string, string>();
  const topicCache = new Map<string, Set<string> | null>();
  let total = 0,
    numeric = 0,
    failed = 0;
  const answerDist: Record<string, number> = {};
  for (const f of files) {
    const rel = path.relative(ROOT, f);
    let arr: Q[];
    try {
      arr = JSON.parse(fs.readFileSync(f, "utf8"));
    } catch (e) {
      console.log(`✗ ${rel}: invalid JSON - ${(e as Error).message}`);
      failed++;
      continue;
    }
    if (!Array.isArray(arr)) {
      console.log(`✗ ${rel}: top level must be an array`);
      failed++;
      continue;
    }
    for (const q of arr) {
      total++;
      if (q.kind === "numeric") numeric++;
      answerDist[q.answer] = (answerDist[q.answer] || 0) + 1;
      const errs = checkQuestion(q, topicCache);
      if (q.id) {
        if (ids.has(q.id)) errs.push(`duplicate id (also in ${ids.get(q.id)})`);
        ids.set(q.id, rel);
      }
      if (rel.includes("/quizzes/")) {
        const lessonSlug = path.basename(f, ".json");
        if (q.lesson !== lessonSlug) errs.push(`quiz question must have "lesson": "${lessonSlug}"`);
      }
      if (errs.length) {
        failed++;
        console.log(`✗ ${rel} [${q.id ?? "?"}]`);
        for (const e of errs) console.log(`    - ${e}`);
      }
    }
  }
  console.log(
    `\n${total} questions checked (${numeric} numeric, verified by code) in ${files.length} files. Answer spread: ${JSON.stringify(answerDist)}`,
  );
  if (failed) {
    console.log(`✗ ${failed} problem(s) found.`);
    process.exit(1);
  }
  console.log("✓ All questions valid and all numeric answers verified.");
}

if (require.main === module) main();
