import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse, getCourses, getLesson } from "@/lib/data";
import { Container, Callout } from "@/components/ui/Section";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { Markdown } from "@/components/content/Markdown";
import { ButtonLink } from "@/components/ui/Button";
import { EnrollCta } from "@/components/course/EnrollButtons";

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.flatMap((c) => c.modules.flatMap((m) => m.lessons.filter((l) => l.freePreview).map((l) => ({ slug: c.slug, lesson: l.slug }))));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lesson: string }> }): Promise<Metadata> {
  const { slug, lesson } = await params;
  const l = await getLesson(slug, lesson);
  return l ? { title: `Free preview: ${l.title}` } : {};
}

export default async function PreviewPage({ params }: { params: Promise<{ slug: string; lesson: string }> }) {
  const { slug, lesson: lessonSlug } = await params;
  const [course, lesson] = await Promise.all([getCourse(slug), getLesson(slug, lessonSlug)]);
  // INTEGRATION: the server must refuse non-preview lessons here (it does: 404) and in the API.
  if (!course || !lesson || !lesson.freePreview) notFound();
  return (
    <Container className="max-w-4xl py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/courses" className="hover:text-foreground">Courses</Link> /{" "}
        <Link href={`/courses/${slug}`} className="hover:text-foreground">{course.shortTitle}</Link> / Free preview
      </nav>
      <p className="mt-4 text-sm font-semibold text-primary">{lesson.moduleTitle}</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">{lesson.title}</h1>
      <p className="mt-2 text-muted">{lesson.summary}</p>
      <div className="mt-6">
        <VideoPlayer title={lesson.title} duration={lesson.duration} provider={lesson.video?.provider} videoId={lesson.video?.videoId} />
      </div>
      {lesson.notes ? (
        <article className="mt-8 rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <Markdown>{lesson.notes}</Markdown>
          {lesson.takeaways.length > 0 && (
            <div className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-5">
              <h2 className="font-semibold">Key takeaways</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {lesson.takeaways.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          )}
        </article>
      ) : (
        <Callout className="mt-8" title="Notes coming soon">Lesson notes for this preview are being prepared.</Callout>
      )}
      <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-8 text-center">
        <h2 className="text-xl font-bold">Liked this lesson?</h2>
        <p className="text-muted">Enroll to unlock all {course.modules.reduce((s, m) => s + m.lessons.length, 0)} lessons, quizzes, the question bank and mock exams.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <EnrollCta courseSlug={slug} />
          <ButtonLink href={`/courses/${slug}`} variant="outline" size="lg">Course details</ButtonLink>
        </div>
      </div>
    </Container>
  );
}
