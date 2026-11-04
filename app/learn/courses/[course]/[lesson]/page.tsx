import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, Download, FileText, Lightbulb } from "lucide-react";
import { getCourse, getCourses, getDiscussionThreads, getLesson, getLessonQuiz, toOutline } from "@/lib/data";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { Markdown } from "@/components/content/Markdown";
import { LessonSidebar } from "@/components/learn/LessonSidebar";
import { LessonActions } from "@/components/learn/LessonActions";
import { LessonGate } from "@/components/learn/LessonGate";
import { LessonQuiz } from "@/components/learn/LessonQuiz";
import { PersonalNotes } from "@/components/learn/PersonalNotes";
import { Discussion } from "@/components/learn/Discussion";
import { Callout } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { buttonClass } from "@/components/ui/Button";

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.flatMap((c) => c.modules.flatMap((m) => m.lessons.map((l) => ({ course: c.slug, lesson: l.slug }))));
}

export async function generateMetadata({ params }: { params: Promise<{ course: string; lesson: string }> }): Promise<Metadata> {
  const { course, lesson } = await params;
  const l = await getLesson(course, lesson);
  return { title: l?.title ?? "Lesson" };
}

const defaultResources = (course: string) =>
  course.includes("excel") || course.includes("model")
    ? [{ title: "Lesson workbook (.xlsx)", type: "xlsx" }, { title: "Lesson slides (PDF)", type: "pdf" }]
    : course.includes("python")
      ? [{ title: "Lesson notebook (.ipynb)", type: "ipynb" }, { title: "Lesson slides (PDF)", type: "pdf" }]
      : [{ title: "Lesson slides (PDF)", type: "pdf" }, { title: "Practice worksheet (PDF)", type: "pdf" }];

export default async function LessonPage({ params }: { params: Promise<{ course: string; lesson: string }> }) {
  const { course: courseSlug, lesson: lessonSlug } = await params;
  const [course, lesson] = await Promise.all([getCourse(courseSlug), getLesson(courseSlug, lessonSlug)]);
  if (!course || !lesson) notFound();
  const [quiz, threads] = await Promise.all([getLessonQuiz(courseSlug, lessonSlug), getDiscussionThreads(courseSlug, lessonSlug)]);
  const resources = lesson.resources?.length ? lesson.resources : defaultResources(courseSlug);
  const lessonKey = `${courseSlug}/${lessonSlug}`;

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
      <div className="order-2 xl:order-1">
        <div className="xl:sticky xl:top-20"><LessonSidebar outline={toOutline(course)} current={lessonSlug} /></div>
      </div>
      <div className="order-1 min-w-0 xl:order-2">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/learn/courses" className="hover:text-foreground">My courses</Link> / <Link href={`/learn/courses/${courseSlug}`} className="hover:text-foreground">{course.shortTitle}</Link> / <span>{lesson.moduleTitle}</span>
        </nav>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{lesson.title}</h1>
          {lesson.freePreview && <Badge tone="accent">Free preview</Badge>}
        </div>
        <p className="mt-1 text-muted">{lesson.summary}</p>

        <LessonGate course={courseSlug} free={lesson.freePreview}>
          <div className="mt-5">
            <VideoPlayer title={lesson.title} duration={lesson.duration} provider={lesson.video?.provider} videoId={lesson.video?.videoId} />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <LessonActions course={courseSlug} courseTitle={course.shortTitle} lesson={lessonSlug} title={lesson.title} />
            <div className="flex gap-2">
              {lesson.prev && <Link href={`/learn/courses/${courseSlug}/${lesson.prev.slug}`} className={buttonClass("outline", "md")}><ChevronLeft className="h-4 w-4" /> Previous</Link>}
              {lesson.next && <Link href={`/learn/courses/${courseSlug}/${lesson.next.slug}`} className={buttonClass("outline", "md")}>Next <ChevronRight className="h-4 w-4" /></Link>}
            </div>
          </div>

          <section aria-labelledby="notes-h" className="mt-8">
            <h2 id="notes-h" className="mb-3 flex items-center gap-2 text-xl font-bold"><FileText className="h-5 w-5 text-primary" /> Lesson notes</h2>
            {lesson.notes ? (
              <article className="rounded-2xl border border-border bg-surface p-5 sm:p-8"><Markdown>{lesson.notes}</Markdown></article>
            ) : (
              <Callout title="Notes coming soon">This lesson is part of a course whose lessons are being released progressively. The lecture outline is shown in the curriculum.</Callout>
            )}
          </section>

          {lesson.takeaways.length > 0 && (
            <section aria-labelledby="kt-h" className="mt-6 rounded-2xl border border-accent/30 bg-accent/5 p-5">
              <h2 id="kt-h" className="flex items-center gap-2 font-bold"><Lightbulb className="h-5 w-5 text-accent" /> Key takeaways</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm">{lesson.takeaways.map((t) => <li key={t}><Markdown className="prose-sm [&_p]:m-0">{t}</Markdown></li>)}</ul>
            </section>
          )}

          <section aria-labelledby="res-h" className="mt-6">
            <h2 id="res-h" className="mb-3 text-lg font-bold">Resources</h2>
            {/* INTEGRATION: serve downloads through signed, expiring URLs for enrolled students only. */}
            <ul className="grid gap-2 sm:grid-cols-2">
              {resources.map((r) => (
                <li key={r.title} className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-border bg-surface p-3 text-sm">
                  <span className="flex items-center gap-2"><Download className="h-4 w-4 text-muted" /> {r.title}</span>
                  <Badge>Coming soon</Badge>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="quiz-h" className="mt-10">
            <h2 id="quiz-h" className="mb-3 text-xl font-bold">End-of-lesson quiz</h2>
            <LessonQuiz courseSlug={courseSlug} lessonSlug={lessonSlug} questions={quiz} />
          </section>

          <section aria-labelledby="pn-h" className="mt-10">
            <h2 id="pn-h" className="mb-3 text-xl font-bold">My notes</h2>
            <PersonalNotes noteKey={lessonKey} />
          </section>

          <section aria-labelledby="qa-h" className="mt-10">
            <h2 id="qa-h" className="mb-3 text-xl font-bold">Questions &amp; discussion</h2>
            <Discussion lessonKey={lessonKey} threads={threads} />
          </section>

          <div className="mt-10 flex justify-between gap-3 border-t border-border pt-6">
            {lesson.prev ? <Link href={`/learn/courses/${courseSlug}/${lesson.prev.slug}`} className="text-sm font-medium text-primary hover:underline">← {lesson.prev.title}</Link> : <span />}
            {lesson.next && <Link href={`/learn/courses/${courseSlug}/${lesson.next.slug}`} className="text-right text-sm font-medium text-primary hover:underline">{lesson.next.title} →</Link>}
          </div>
        </LessonGate>
      </div>
    </div>
  );
}
