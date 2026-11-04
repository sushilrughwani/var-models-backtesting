import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, CheckCircle2, Clock, Eye, Layers, PlayCircle, Target, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getCourse, getCourses, getPreviewLesson } from "@/lib/data";
import { Container } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { CourseArt } from "@/components/course/CourseCard";
import { PriceTag } from "@/components/course/PriceTag";
import { EnrollCta } from "@/components/course/EnrollButtons";
import { CurrencyToggle } from "@/components/layout/CurrencyToggle";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { Markdown } from "@/components/content/Markdown";

export async function generateStaticParams() {
  return (await getCourses()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCourse(slug);
  return c ? { title: c.title, description: c.shortDescription } : {};
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) notFound();
  const preview = await getPreviewLesson(slug);
  const pricing = siteConfig.coursePricing[slug];
  const lessons = course.modules.flatMap((m) => m.lessons);
  const minutes = lessons.reduce((s, l) => s + l.duration, 0);
  const firstLesson = lessons[0]?.slug;
  const previewExcerpt = preview?.notes ? preview.notes.split(/\n## /)[0].slice(0, 1400) : null;

  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_380px]">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <Link href="/courses" className="hover:text-foreground">
                Courses
              </Link>{" "}
              / <span>{course.shortTitle}</span>
            </nav>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="primary">{course.category === "skills" ? "Skills" : course.category.toUpperCase()}</Badge>
              <Badge>{course.level}</Badge>
              {course.status === "skeleton" && <Badge tone="warning">Curriculum published · lessons releasing progressively</Badge>}
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{course.title}</h1>
            <p className="mt-4 text-lg text-muted">{course.description}</p>
            <div className="mt-6 flex flex-wrap gap-5 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5"><Layers className="h-4 w-4" /> {course.modules.length} modules</span>
              <span className="inline-flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {lessons.length} lessons</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> ~{Math.round(minutes / 60)} hours of video</span>
              <span className="inline-flex items-center gap-1.5"><Eye className="h-4 w-4" /> {lessons.filter((l) => l.freePreview).length} free previews</span>
            </div>
          </div>
          <aside className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm lg:sticky lg:top-20 lg:self-start">
            <CourseArt course={course} className="h-40" />
            <div className="p-6">
              {pricing && (
                <>
                  <p className="text-sm text-muted">Self-Study from</p>
                  <PriceTag price={pricing.selfStudy} listPrice={pricing.listPrice} className="text-3xl" />
                  <p className="mt-1 text-xs text-muted">{pricing.accessMonths} months access</p>
                </>
              )}
              <div className="mt-5 grid gap-2">
                <EnrollCta courseSlug={slug} firstLesson={firstLesson} className="w-full" />
                {preview && (
                  <ButtonLink href={`/courses/${slug}/preview/${preview.slug}`} variant="outline" className="w-full">
                    <PlayCircle className="h-4 w-4" /> Watch free preview
                  </ButtonLink>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span>Display currency</span>
                <CurrencyToggle />
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <Container className="grid gap-12 py-12 lg:grid-cols-[1fr_380px]">
        <div className="space-y-12">
          <section aria-labelledby="who">
            <h2 id="who" className="flex items-center gap-2 text-2xl font-bold"><Users className="h-6 w-6 text-primary" /> Who this course is for</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {course.whoFor.map((w) => (
                <li key={w} className="flex gap-2 rounded-xl border border-border bg-surface p-4 text-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-success" /> {w}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="outcomes">
            <h2 id="outcomes" className="flex items-center gap-2 text-2xl font-bold"><Target className="h-6 w-6 text-primary" /> What you will be able to do</h2>
            <ul className="mt-4 space-y-2">
              {course.outcomes.map((o) => (
                <li key={o} className="flex gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {o}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="curriculum">
            <h2 id="curriculum" className="text-2xl font-bold">Curriculum</h2>
            <p className="mt-1 text-sm text-muted">
              {course.modules.length} modules · {lessons.length} lessons · ~{Math.round(minutes / 60)} hours
            </p>
            <Accordion
              className="mt-4"
              defaultOpen={[course.modules[0]?.slug]}
              items={course.modules.map((m, mi) => ({
                id: m.slug,
                title: `${mi + 1}. ${m.title}`,
                meta: <span className="hidden sm:inline">{m.lessons.length} lessons</span>,
                content: (
                  <div>
                    <p className="mb-3 text-sm text-muted">{m.description}</p>
                    <ol className="divide-y divide-border rounded-lg border border-border">
                      {m.lessons.map((l, li) => (
                        <li key={l.slug} className="flex items-start justify-between gap-4 p-3 text-sm">
                          <div>
                            <p className="font-medium">
                              {mi + 1}.{li + 1} {l.title}
                            </p>
                            <p className="mt-0.5 text-muted">{l.summary}</p>
                          </div>
                          <div className="flex shrink-0 items-center gap-2 text-xs text-muted">
                            {l.freePreview && (
                              <Link href={`/courses/${slug}/preview/${l.slug}`} className="font-semibold text-primary hover:underline">
                                Preview
                              </Link>
                            )}
                            <span>{l.duration} min</span>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                ),
              }))}
            />
          </section>

          {preview && (
            <section aria-labelledby="preview">
              <h2 id="preview" className="text-2xl font-bold">Free preview lesson</h2>
              <p className="mt-1 text-sm text-muted">{preview.title}</p>
              <div className="mt-4">
                <VideoPlayer title={preview.title} duration={preview.duration} />
              </div>
              {previewExcerpt && (
                <div className="relative mt-6 max-h-96 overflow-hidden rounded-2xl border border-border bg-surface p-6">
                  <Markdown>{previewExcerpt}</Markdown>
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" />
                </div>
              )}
              <ButtonLink href={`/courses/${slug}/preview/${preview.slug}`} variant="outline" className="mt-4">
                Open the full preview lesson
              </ButtonLink>
            </section>
          )}

          <section aria-labelledby="instructor">
            <h2 id="instructor" className="text-2xl font-bold">Your instructor</h2>
            <div className="mt-4 flex gap-5 rounded-2xl border border-border bg-surface p-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white" style={{ background: "linear-gradient(135deg, var(--c-primary), var(--c-accent))" }} aria-hidden>
                {siteConfig.instructor.initials}
              </div>
              <div>
                <p className="font-semibold">{siteConfig.instructor.name}</p>
                <p className="text-sm text-muted">{siteConfig.instructor.credentials}</p>
                <p className="mt-2 text-sm">{siteConfig.instructor.shortBio}</p>
              </div>
            </div>
          </section>

          {pricing && (
            <section aria-labelledby="pricing">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 id="pricing" className="text-2xl font-bold">Choose your plan</h2>
                <CurrencyToggle />
              </div>
              <div className="mt-4 grid gap-5 md:grid-cols-2">
                {(["selfStudy", "premium"] as const).map((plan) => (
                  <div key={plan} className={`rounded-2xl border bg-surface p-6 ${plan === "premium" ? "border-primary shadow-md" : "border-border"}`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{plan === "premium" ? "Premium" : "Self-Study"}</h3>
                      {plan === "premium" && <Badge tone="primary">Most complete</Badge>}
                    </div>
                    <PriceTag price={pricing[plan]} className="mt-3 block text-3xl" />
                    <p className="text-xs text-muted">{pricing.accessMonths} months access</p>
                    <ul className="mt-4 space-y-2 text-sm">
                      {siteConfig.planFeatures[plan].map((f) => (
                        <li key={f} className="flex gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-success" /> {f}
                        </li>
                      ))}
                    </ul>
                    <EnrollCta courseSlug={slug} firstLesson={firstLesson} plan={plan} label={`Choose ${plan === "premium" ? "Premium" : "Self-Study"}`} className="mt-6 w-full" />
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted">{siteConfig.currency.note}</p>
            </section>
          )}

          <section aria-labelledby="faq">
            <h2 id="faq" className="text-2xl font-bold">Course FAQ</h2>
            <Accordion className="mt-4" items={course.faq.map((f, i) => ({ id: `f${i}`, title: f.q, content: <p className="text-sm text-muted">{f.a}</p> }))} />
          </section>
        </div>
        <div className="hidden lg:block" />
      </Container>
    </>
  );
}
