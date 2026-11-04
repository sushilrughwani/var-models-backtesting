/**
 * Data repository — the ONLY entry point UI code uses to read content.
 *
 * Every function is async so the local file-based implementation can be swapped for a database
 * (or a headless CMS) without changing any page or component.
 * INTEGRATION: point these functions at the real database implementation.
 */
import "server-only";
import * as local from "./local";

export type * from "./types";

export const getCourses = async () => local.getCourses();
export const getCourseSummaries = async () => local.getCourseSummaries();
export const getCourse = async (slug: string) => local.getCourse(slug);
export const getLesson = async (courseSlug: string, lessonSlug: string) => local.getLesson(courseSlug, lessonSlug);
export const getPreviewLesson = async (courseSlug: string) => local.getPreviewLesson(courseSlug);
export const hasLessonNotes = async (courseSlug: string, lessonSlug: string) =>
  local.hasLessonNotes(courseSlug, lessonSlug);
export const getLessonQuiz = async (courseSlug: string, lessonSlug: string) =>
  local.getLessonQuiz(courseSlug, lessonSlug);
export const getTeachingKit = async (courseSlug: string, lessonSlug: string) =>
  local.getTeachingKit(courseSlug, lessonSlug);
export const listTeachingKits = async (courseSlug: string) => local.listTeachingKits(courseSlug);
export const getQuestions = async (filter?: { course?: string; topic?: string; difficulty?: string }) =>
  local.getQuestions(filter);
export const getQuestionsByIds = async (ids: string[]) => local.getQuestionsByIds(ids);
export const getMockExams = async (course?: string) => local.getMockExams(course);
export const getMockExam = async (id: string) => local.getMockExam(id);
export const getFlashcards = async (filter?: { course?: string; topic?: string }) => local.getFlashcards(filter);
export const getFlashcardDecks = async () => local.getFlashcardDecks();
export const getFormulas = async () => local.getFormulas();
export const getFormulaGroups = async () => local.getFormulaGroups();
export const getBlogPosts = async () => local.getBlogPosts();
export const getBlogPost = async (slug: string) => local.getBlogPost(slug);
export const getDiscussionThreads = async (courseSlug: string, lessonSlug: string) =>
  local.getDiscussionThreads(courseSlug, lessonSlug);

import type { Course, CourseOutline } from "./types";
export function toOutline(c: Course): CourseOutline {
  return {
    slug: c.slug,
    title: c.title,
    shortTitle: c.shortTitle,
    accent: c.accent,
    category: c.category,
    status: c.status,
    modules: c.modules.map((m) => ({
      slug: m.slug,
      title: m.title,
      lessons: m.lessons.map((l) => ({ slug: l.slug, title: l.title, duration: l.duration, freePreview: l.freePreview })),
    })),
  };
}
export const getCourseOutlines = async () => local.getCourses().map(toOutline);
