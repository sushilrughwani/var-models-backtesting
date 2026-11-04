/**
 * Validates lesson notes, teaching kits, quizzes coverage, flashcards and blog posts.
 *
 *   npx tsx scripts/validate-content.ts                    # everything
 *   npx tsx scripts/validate-content.ts <course> [lesson…] # one course (optionally specific lessons)
 *   npx tsx scripts/validate-content.ts --flashcards        # flashcards only
 */
import fs from "node:fs";
import path from "node:path";
import { countWords, h2Headings, hasControlChars, katexErrors, parseFrontmatter } from "./lib/checks";

const ROOT = path.resolve(__dirname, "..");
const C = path.join(ROOT, "content");

const NOTE_HEADINGS = ["Learning goals", "Explanation", "Worked example", "Common exam traps", "Key takeaways"];
const KIT_HEADINGS = [
  "Lecture outline",
  "Slides",
  "Whiteboard examples",
  "Questions to ask students",
  "Analogies",
  "Recording tips",
];

let errors = 0;
let warnings = 0;
const err = (where: string, msg: string) => {
  errors++;
  console.log(`✗ ${where}: ${msg}`);
};
const warn = (where: string, msg: string) => {
  warnings++;
  console.log(`! ${where}: ${msg}`);
};

function checkHeadings(where: string, body: string, expected: string[]) {
  const hs = h2Headings(body);
  let idx = -1;
  for (const h of expected) {
    const i = hs.findIndex((x) => x.toLowerCase() === h.toLowerCase());
    if (i === -1) err(where, `missing "## ${h}"`);
    else if (i < idx) err(where, `"## ${h}" is out of order`);
    else idx = i;
  }
}

function checkNotes(course: string, lesson: { slug: string; title: string }) {
  const f = path.join(C, "courses", course, "lessons", `${lesson.slug}.md`);
  const where = path.relative(ROOT, f);
  if (!fs.existsSync(f)) return err(where, "missing");
  const { data, body } = parseFrontmatter(fs.readFileSync(f, "utf8"));
  if (!data.title) err(where, "frontmatter title missing");
  checkHeadings(where, body, NOTE_HEADINGS);
  const words = countWords(body);
  if (words < 500) err(where, `only ${words} words (target 600-900)`);
  else if (words < 580 || words > 1200) warn(where, `${words} words (target 600-900)`);
  for (const e of katexErrors(body)) err(where, e);
}

function checkKit(course: string, lesson: { slug: string }) {
  const f = path.join(C, "courses", course, "kits", `${lesson.slug}.md`);
  const where = path.relative(ROOT, f);
  if (!fs.existsSync(f)) return err(where, "missing");
  const { data, body } = parseFrontmatter(fs.readFileSync(f, "utf8"));
  if (!data.duration || !/^\d+$/.test(data.duration)) err(where, "frontmatter duration (integer minutes) missing");
  checkHeadings(where, body, KIT_HEADINGS);
  const slides = (body.match(/^###\s+Slide\s+\d+/gim) || []).length;
  if (slides < 8 || slides > 15) err(where, `${slides} slides (need 8-15 "### Slide N: ..." headings)`);
  const stamps = (body.match(/^\s*-\s*\d{1,2}:\d{2}/gm) || []).length;
  if (stamps < 5) err(where, `only ${stamps} timestamped outline items (need 6-10 like "- 03:00 - ...")`);
  for (const e of katexErrors(body)) err(where, e);
}

function checkQuiz(course: string, lesson: { slug: string }) {
  const f = path.join(C, "courses", course, "quizzes", `${lesson.slug}.json`);
  const where = path.relative(ROOT, f);
  if (!fs.existsSync(f)) return err(where, "missing");
  try {
    const arr = JSON.parse(fs.readFileSync(f, "utf8"));
    if (!Array.isArray(arr) || arr.length < 3 || arr.length > 5) err(where, `quiz must have 3-5 questions`);
  } catch (e) {
    err(where, `invalid JSON: ${(e as Error).message}`);
  }
}

function checkCourse(slug: string, only?: string[]) {
  const course = JSON.parse(fs.readFileSync(path.join(C, "courses", slug, "course.json"), "utf8"));
  const slugs = new Set<string>();
  let n = 0;
  for (const m of course.modules) {
    for (const l of m.lessons) {
      if (slugs.has(l.slug)) err(`${slug}/course.json`, `duplicate lesson slug ${l.slug}`);
      slugs.add(l.slug);
      if (only && only.length && !only.includes(l.slug)) continue;
      const hasAny = ["lessons", "kits", "quizzes"].some((d) =>
        fs.existsSync(path.join(C, "courses", slug, d, `${l.slug}.${d === "quizzes" ? "json" : "md"}`)),
      );
      if (course.status !== "full" && !hasAny) continue;
      n++;
      checkNotes(slug, l);
      checkKit(slug, l);
      checkQuiz(slug, l);
    }
  }
  // Orphan files
  for (const d of ["lessons", "kits", "quizzes"]) {
    const dir = path.join(C, "courses", slug, d);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      const s = f.replace(/\.(md|json)$/, "");
      if (!slugs.has(s)) err(`content/courses/${slug}/${d}/${f}`, "orphan file (slug not in course.json)");
    }
  }
  console.log(`  ${slug}: ${n} lessons checked`);
}

function checkFlashcards() {
  const dir = path.join(C, "flashcards");
  if (!fs.existsSync(dir)) return;
  const ids = new Set<string>();
  let total = 0;
  for (const course of fs.readdirSync(dir)) {
    const cfile = path.join(C, "courses", course, "course.json");
    const topics = fs.existsSync(cfile)
      ? new Set((JSON.parse(fs.readFileSync(cfile, "utf8")).modules as { slug: string }[]).map((m) => m.slug))
      : null;
    for (const f of fs.readdirSync(path.join(dir, course))) {
      const where = `content/flashcards/${course}/${f}`;
      let arr: Record<string, string>[];
      try {
        arr = JSON.parse(fs.readFileSync(path.join(dir, course, f), "utf8"));
      } catch (e) {
        err(where, `invalid JSON ${(e as Error).message}`);
        continue;
      }
      for (const c of arr) {
        total++;
        if (!c.id || !c.front || !c.back || !c.course || !c.topic) err(where, `card ${c.id} missing fields`);
        if (ids.has(c.id)) err(where, `duplicate id ${c.id}`);
        ids.add(c.id);
        if (c.course !== course) err(where, `card ${c.id} course mismatch`);
        if (topics && !topics.has(c.topic)) err(where, `card ${c.id} topic ${c.topic} not a module of ${course}`);
        for (const s of [c.front, c.back]) {
          if (hasControlChars(s ?? "")) err(where, `card ${c.id} has control characters (unescaped backslash?)`);
          for (const e of katexErrors(s ?? "")) err(where, `card ${c.id}: ${e}`);
        }
      }
    }
  }
  console.log(`  flashcards: ${total} cards checked`);
}

function checkBlog() {
  const dir = path.join(C, "blog");
  if (!fs.existsSync(dir)) return;
  let n = 0;
  for (const f of fs.readdirSync(dir)) {
    const where = `content/blog/${f}`;
    const { data, body } = parseFrontmatter(fs.readFileSync(path.join(dir, f), "utf8"));
    n++;
    for (const k of ["title", "excerpt", "date"]) if (!data[k]) err(where, `frontmatter ${k} missing`);
    const w = countWords(body);
    if (w < 700) err(where, `only ${w} words`);
    for (const e of katexErrors(body)) err(where, e);
  }
  console.log(`  blog: ${n} posts checked`);
}

function main() {
  const args = process.argv.slice(2);
  console.log("Validating content…");
  if (args[0] === "--flashcards") checkFlashcards();
  else if (args[0] === "--blog") checkBlog();
  else if (args.length) checkCourse(args[0], args.slice(1));
  else {
    for (const c of fs.readdirSync(path.join(C, "courses"))) {
      if (fs.existsSync(path.join(C, "courses", c, "course.json"))) checkCourse(c);
    }
    checkFlashcards();
    checkBlog();
  }
  console.log(`\n${errors} error(s), ${warnings} warning(s).`);
  if (errors) process.exit(1);
}

main();
