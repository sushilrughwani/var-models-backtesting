/**
 * Local (file-system) implementation of the data repository.
 * Reads everything from /content at build/request time on the server.
 *
 * INTEGRATION: replace this module with a database-backed implementation (e.g. Prisma/Drizzle on
 * PostgreSQL) that exposes the same functions. UI code only imports from "@/lib/data".
 */
import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  BlogPost,
  Course,
  CourseSummary,
  DiscussionThread,
  Flashcard,
  FlashcardDeck,
  Formula,
  Lesson,
  MockExam,
  Question,
  TeachingKit,
} from "./types";
import { formulas as formulaData, formulaGroups as formulaGroupData } from "@/content/formulas";
import { sampleThreads } from "@/content/discussions/sample-threads";

const CONTENT = path.join(process.cwd(), "content");

const cache = new Map<string, unknown>();
function memo<T>(key: string, fn: () => T): T {
  if (process.env.NODE_ENV === "production" && cache.has(key)) return cache.get(key) as T;
  const v = fn();
  cache.set(key, v);
  return v;
}

function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

function listDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
}

/** Fixed display order of courses. */
const COURSE_ORDER = [
  "cfa-level-1",
  "cfa-level-2",
  "cfa-level-3",
  "frm-part-1",
  "frm-part-2",
  "excel-for-finance",
  "financial-modeling",
  "python-for-finance",
];

export function getCourses(): Course[] {
  return memo("courses", () => {
    const slugs = listDir(path.join(CONTENT, "courses")).filter((s) =>
      fs.existsSync(path.join(CONTENT, "courses", s, "course.json")),
    );
    slugs.sort((a, b) => {
      const ia = COURSE_ORDER.indexOf(a);
      const ib = COURSE_ORDER.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
    return slugs.map((s) => readJson<Course>(path.join(CONTENT, "courses", s, "course.json"), null as never));
  });
}

export function summarize(c: Course): CourseSummary {
  const lessons = c.modules.flatMap((m) => m.lessons);
  return {
    slug: c.slug,
    title: c.title,
    shortTitle: c.shortTitle,
    category: c.category,
    level: c.level,
    status: c.status,
    shortDescription: c.shortDescription,
    accent: c.accent,
    moduleCount: c.modules.length,
    lessonCount: lessons.length,
    totalMinutes: lessons.reduce((s, l) => s + l.duration, 0),
  };
}

export function getCourseSummaries(): CourseSummary[] {
  return getCourses().map(summarize);
}

export function getCourse(slug: string): Course | null {
  return getCourses().find((c) => c.slug === slug) ?? null;
}

function extractTakeaways(md: string): string[] {
  const m = md.match(/##\s+Key takeaways\s*\n([\s\S]*?)(\n##\s|$)/i);
  if (!m) return [];
  return m[1]
    .split("\n")
    .filter((l) => /^\s*[-*]\s+/.test(l))
    .map((l) => l.replace(/^\s*[-*]\s+/, "").trim());
}

export function hasLessonNotes(courseSlug: string, lessonSlug: string): boolean {
  return fs.existsSync(path.join(CONTENT, "courses", courseSlug, "lessons", `${lessonSlug}.md`));
}

export function getLesson(courseSlug: string, lessonSlug: string): Lesson | null {
  const course = getCourse(courseSlug);
  if (!course) return null;
  const flat = course.modules.flatMap((m) => m.lessons.map((l) => ({ ...l, module: m })));
  const i = flat.findIndex((l) => l.slug === lessonSlug);
  if (i === -1) return null;
  const meta = flat[i];
  const file = path.join(CONTENT, "courses", courseSlug, "lessons", `${lessonSlug}.md`);
  let notes: string | null = null;
  let takeaways: string[] = [];
  if (fs.existsSync(file)) {
    const parsed = matter(fs.readFileSync(file, "utf8"));
    // Key takeaways are shown in their own card, so remove them from the notes body.
    notes = parsed.content.replace(/##\s+Key takeaways\s*\n[\s\S]*?(?=\n##\s|$)/i, "").trim();
    takeaways = extractTakeaways(parsed.content);
  }
  const { module, ...lessonMeta } = meta;
  return {
    ...lessonMeta,
    courseSlug,
    moduleSlug: module.slug,
    moduleTitle: module.title,
    notes,
    takeaways,
    prev: i > 0 ? { slug: flat[i - 1].slug, title: flat[i - 1].title } : null,
    next: i < flat.length - 1 ? { slug: flat[i + 1].slug, title: flat[i + 1].title } : null,
  };
}

/** First free-preview lesson of a course (falls back to the first lesson). */
export function getPreviewLesson(courseSlug: string): Lesson | null {
  const course = getCourse(courseSlug);
  if (!course) return null;
  const all = course.modules.flatMap((m) => m.lessons);
  const preview = all.find((l) => l.freePreview && hasLessonNotes(courseSlug, l.slug)) ?? all.find((l) => l.freePreview);
  return preview ? getLesson(courseSlug, preview.slug) : null;
}

/** INTEGRATION: teaching kits are instructor-only. Enforce this server-side (role check) before returning. */
export function getTeachingKit(courseSlug: string, lessonSlug: string): TeachingKit | null {
  const lesson = getLesson(courseSlug, lessonSlug);
  if (!lesson) return null;
  const file = path.join(CONTENT, "courses", courseSlug, "kits", `${lessonSlug}.md`);
  if (!fs.existsSync(file)) return null;
  const parsed = matter(fs.readFileSync(file, "utf8"));
  return {
    courseSlug,
    lessonSlug,
    lessonTitle: lesson.title,
    moduleTitle: lesson.moduleTitle,
    duration: Number(parsed.data.duration) || lesson.duration,
    markdown: parsed.content.trim(),
    slideCount: (parsed.content.match(/^###\s+Slide\s+\d+/gim) || []).length,
  };
}

export function listTeachingKits(courseSlug: string): { lessonSlug: string; hasKit: boolean }[] {
  const course = getCourse(courseSlug);
  if (!course) return [];
  return course.modules.flatMap((m) =>
    m.lessons.map((l) => ({
      lessonSlug: l.slug,
      hasKit: fs.existsSync(path.join(CONTENT, "courses", courseSlug, "kits", `${l.slug}.md`)),
    })),
  );
}

export function getLessonQuiz(courseSlug: string, lessonSlug: string): Question[] {
  return readJson<Question[]>(path.join(CONTENT, "courses", courseSlug, "quizzes", `${lessonSlug}.json`), []);
}

/** Question bank (excludes end-of-lesson quizzes). */
export function getQuestions(filter?: { course?: string; topic?: string; difficulty?: string }): Question[] {
  const all = memo("questions", () => {
    const out: Question[] = [];
    const root = path.join(CONTENT, "questions");
    for (const course of listDir(root)) {
      for (const f of listDir(path.join(root, course)).filter((x) => x.endsWith(".json")).sort()) {
        out.push(...readJson<Question[]>(path.join(root, course, f), []));
      }
    }
    return out;
  });
  return all.filter(
    (q) =>
      (!filter?.course || q.course === filter.course) &&
      (!filter?.topic || q.topic === filter.topic) &&
      (!filter?.difficulty || q.difficulty === filter.difficulty),
  );
}

export function getQuestionsByIds(ids: string[]): Question[] {
  const byId = new Map(getQuestions().map((q) => [q.id, q]));
  return ids.map((id) => byId.get(id)).filter((q): q is Question => Boolean(q));
}

export function getMockExams(course?: string): MockExam[] {
  return memo("mocks", () =>
    listDir(path.join(CONTENT, "mocks"))
      .filter((f) => f.endsWith(".json"))
      .sort()
      .map((f) => readJson<MockExam>(path.join(CONTENT, "mocks", f), null as never)),
  ).filter((m) => !course || m.course === course);
}

export function getMockExam(id: string): MockExam | null {
  return getMockExams().find((m) => m.id === id) ?? null;
}

export function getFlashcards(filter?: { course?: string; topic?: string }): Flashcard[] {
  const all = memo("flashcards", () => {
    const out: Flashcard[] = [];
    const root = path.join(CONTENT, "flashcards");
    for (const course of listDir(root)) {
      for (const f of listDir(path.join(root, course)).filter((x) => x.endsWith(".json")).sort()) {
        out.push(...readJson<Flashcard[]>(path.join(root, course, f), []));
      }
    }
    return out;
  });
  return all.filter((c) => (!filter?.course || c.course === filter.course) && (!filter?.topic || c.topic === filter.topic));
}

export function getFlashcardDecks(): FlashcardDeck[] {
  const cards = getFlashcards();
  const decks = new Map<string, FlashcardDeck>();
  for (const c of cards) {
    const id = `${c.course}:${c.topic}`;
    const d = decks.get(id);
    if (d) d.cardCount++;
    else {
      const course = getCourse(c.course);
      const title = course?.modules.find((m) => m.slug === c.topic)?.title ?? c.topic;
      decks.set(id, { id, course: c.course, topic: c.topic, title, cardCount: 1 });
    }
  }
  return [...decks.values()];
}

export function getFormulas(): Formula[] {
  return formulaData;
}

export function getFormulaGroups(): string[] {
  return formulaGroupData;
}

export function getBlogPosts(): BlogPost[] {
  return memo("blog", () =>
    listDir(path.join(CONTENT, "blog"))
      .filter((f) => f.endsWith(".md"))
      .map((f) => {
        const parsed = matter(fs.readFileSync(path.join(CONTENT, "blog", f), "utf8"));
        const words = parsed.content.split(/\s+/).length;
        const d = parsed.data as Record<string, unknown>;
        return {
          slug: f.replace(/\.md$/, ""),
          title: String(d.title ?? f),
          excerpt: String(d.excerpt ?? ""),
          date: d.date instanceof Date ? d.date.toISOString().slice(0, 10) : String(d.date ?? ""),
          tags: (d.tags as string[]) ?? [],
          readingMinutes: Math.max(1, Math.round(words / 220)),
          markdown: parsed.content,
        };
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1)),
  );
}

export function getBlogPost(slug: string): BlogPost | null {
  return getBlogPosts().find((p) => p.slug === slug) ?? null;
}

/** INTEGRATION: replace sample threads with a real discussion backend (DB table + moderation). */
export function getDiscussionThreads(courseSlug: string, lessonSlug: string): DiscussionThread[] {
  return sampleThreads(courseSlug, lessonSlug);
}
