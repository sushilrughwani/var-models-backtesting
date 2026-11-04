/**
 * Domain types shared by the data layer, UI and scripts.
 * These map 1:1 onto the proposed database schema in HANDOVER.md.
 */

export type CourseCategory = "cfa" | "frm" | "skills";
export type CourseStatus = "full" | "skeleton";
export type Difficulty = "easy" | "medium" | "hard";
export type OptionLetter = "A" | "B" | "C" | "D";

export interface LessonMeta {
  slug: string;
  title: string;
  /** One-line description shown in the curriculum. */
  summary: string;
  /** Estimated lecture video length in minutes. */
  duration: number;
  /** Free preview lessons are visible to everyone. */
  freePreview?: boolean;
  /** Video source; empty until the lecture is recorded. */
  video?: { provider: VideoProvider; videoId: string } | null;
  /** Downloadable resources (placeholders until files exist). */
  resources?: { title: string; type: "pdf" | "xlsx" | "py" | "ipynb" | "csv" | "link"; href?: string }[];
  published?: boolean;
}

export interface ModuleMeta {
  /** Also the topic key used by questions, flashcards and analytics. */
  slug: string;
  title: string;
  description: string;
  lessons: LessonMeta[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Course {
  slug: string;
  title: string;
  shortTitle: string;
  category: CourseCategory;
  /** e.g. "Level I", "Part I", "Beginner" */
  level: string;
  status: CourseStatus;
  shortDescription: string;
  description: string;
  whoFor: string[];
  outcomes: string[];
  faq: FaqItem[];
  /** Hex or CSS gradient stops used for the course card artwork. */
  accent: string;
  modules: ModuleMeta[];
  published?: boolean;
}

export interface CourseSummary {
  slug: string;
  title: string;
  shortTitle: string;
  category: CourseCategory;
  level: string;
  status: CourseStatus;
  shortDescription: string;
  accent: string;
  moduleCount: number;
  lessonCount: number;
  totalMinutes: number;
}

export interface Lesson extends LessonMeta {
  courseSlug: string;
  moduleSlug: string;
  moduleTitle: string;
  /** Markdown (with $...$ / $$...$$ KaTeX) of the student notes, without frontmatter. */
  notes: string | null;
  /** Bullet list extracted from the "Key takeaways" section. */
  takeaways: string[];
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

export interface TeachingKit {
  courseSlug: string;
  lessonSlug: string;
  lessonTitle: string;
  moduleTitle: string;
  /** Estimated lecture duration in minutes. */
  duration: number;
  markdown: string;
  slideCount: number;
}

export interface Question {
  id: string;
  course: string;
  /** Module slug of the course. */
  topic: string;
  difficulty: Difficulty;
  kind: "conceptual" | "numeric";
  stem: string;
  options: string[];
  answer: OptionLetter;
  /** Short overall explanation of the correct answer. */
  explanation: string;
  /** Why each option is right or wrong, keyed by letter. */
  rationale: Partial<Record<OptionLetter, string>>;
  /** JS function body returning the numeric answer. Required when kind === "numeric". */
  verify?: string;
  numericAnswer?: number;
  /** Absolute tolerance for verification (default: 0.5% relative or 0.01 absolute). */
  tolerance?: number;
  tags?: string[];
  /** If set, the question is part of an end-of-lesson quiz. */
  lesson?: string;
}

export interface Flashcard {
  id: string;
  course: string;
  topic: string;
  front: string;
  back: string;
  tags?: string[];
}

export interface FlashcardDeck {
  id: string; // `${course}:${topic}`
  course: string;
  topic: string;
  title: string;
  cardCount: number;
}

export interface MockExamSection {
  title: string;
  durationMinutes: number;
  questionIds: string[];
}

export interface MockExam {
  id: string;
  course: string;
  title: string;
  description: string;
  sections: MockExamSection[];
}

export interface Formula {
  id: string;
  name: string;
  /** Topic group, e.g. "Time Value of Money". */
  group: string;
  courses: string[];
  latex: string;
  variables: { symbol: string; meaning: string }[];
  intuition: string;
  /** Calculator slug, if one exists. */
  calculator?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  tags: string[];
  markdown: string;
}

export type VideoProvider = "youtube" | "vimeo" | "bunny" | "mux" | "cloudflare" | "none";

export interface DiscussionThread {
  id: string;
  lessonSlug?: string;
  author: string;
  role: "student" | "instructor";
  title: string;
  body: string;
  createdAt: string;
  replies: { id: string; author: string; role: "student" | "instructor"; body: string; createdAt: string }[];
  sample: true;
}

/** Compact course structure passed to client components (no notes). */
export interface CourseOutline {
  slug: string;
  title: string;
  shortTitle: string;
  accent: string;
  category: CourseCategory;
  status: CourseStatus;
  modules: { slug: string; title: string; lessons: { slug: string; title: string; duration: number; freePreview?: boolean }[] }[];
}
