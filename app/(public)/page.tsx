import {
  ArrowRight,
  Calculator,
  CalendarDays,
  CheckCircle2,
  FileText,
  Layers,
  ListChecks,
  PlayCircle,
  Quote,
  Sigma,
  Timer,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { getCourseSummaries } from "@/lib/data";
import { Container, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { CourseCard } from "@/components/course/CourseCard";
import { HeroArt } from "@/components/marketing/HeroArt";
import { features, homeFaq, howItWorks, sampleTestimonials } from "@/content/site/marketing";

const iconMap = { PlayCircle, FileText, ListChecks, Timer, Layers, Calculator, Sigma, CalendarDays };

export default async function HomePage() {
  const courses = await getCourseSummaries();
  const exams = [
    { title: "CFA® Program", body: "Level I, II and III preparation built around clear intuition and heavy practice.", href: "/courses?category=cfa" },
    { title: "FRM® Program", body: "Part I and II risk management with the maths explained step by step.", href: "/courses?category=frm" },
    { title: "Finance Skills", body: "Excel, financial modeling and Python — the tools you use on the job.", href: "/courses?category=skills" },
  ];
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden />
        <Container className="relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <Badge tone="primary">CFA® · FRM® · Excel · Modeling · Python</Badge>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Understand finance deeply.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Pass with confidence.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">{siteConfig.brand.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/courses" size="lg">
                Explore courses <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/resources" size="lg" variant="outline">
                Free resources
              </ButtonLink>
            </div>
            <ul className="mt-8 grid gap-2 text-sm text-muted sm:grid-cols-2">
              {["Free preview lessons", "Original exam-style questions", "Answers verified by code", "Works on any device"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <HeroArt className="mx-auto w-full max-w-lg" />
        </Container>
      </section>

      {/* Exams */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="What you can study" title="Exams and skills we teach" description="Professional exam preparation and practical skills, taught by one instructor with one consistent method." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {exams.map((e) => (
              <a key={e.title} href={e.href} className="group rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:border-primary/40">
                <h3 className="text-lg font-semibold group-hover:text-primary">{e.title}</h3>
                <p className="mt-2 text-sm text-muted">{e.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  View courses <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {courses.slice(0, 8).map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-surface py-20">
        <Container>
          <SectionHeading eyebrow="How it works" title="A study system, not just videos" />
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {howItWorks.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl border border-border bg-background p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">{i + 1}</span>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Features */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Platform" title="Everything you need in one place" description="Tools designed around how people actually learn: retrieval practice, spaced repetition and deliberate feedback." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = iconMap[f.icon as keyof typeof iconMap] ?? FileText;
              return (
                <div key={f.title} className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted">{f.body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Instructor */}
      <section className="border-y border-border bg-surface py-20">
        <Container className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
          <div
            className="mx-auto flex h-48 w-48 items-center justify-center rounded-3xl text-5xl font-extrabold text-white shadow-lg"
            style={{ background: "linear-gradient(135deg, var(--c-primary), var(--c-accent))" }}
            aria-label="Instructor photo placeholder"
            role="img"
          >
            {siteConfig.instructor.initials}
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Meet your instructor</p>
            <h2 className="mt-2 text-3xl font-bold">{siteConfig.instructor.name}</h2>
            <p className="mt-1 text-muted">{siteConfig.instructor.credentials}</p>
            <p className="mt-4 max-w-2xl text-lg">{siteConfig.instructor.shortBio}</p>
            <ButtonLink href="/about" variant="outline" className="mt-6">
              More about the instructor
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Student stories" title="What learners say" description="These are sample placeholders. Replace them with real, consented testimonials before launch." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {sampleTestimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-dashed border-warning/50 bg-surface p-6">
                <Badge tone="warning">Sample testimonial - replace before launch</Badge>
                <Quote className="mt-4 h-6 w-6 text-muted" aria-hidden />
                <blockquote className="mt-2 text-sm">{t.quote}</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="block text-muted">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-surface py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
          <Accordion className="mt-10" items={homeFaq.map((f, i) => ({ id: `faq-${i}`, title: f.q, content: <p className="text-muted">{f.a}</p> }))} />
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20">
        <Container>
          <div className="rounded-3xl px-6 py-14 text-center text-white shadow-xl sm:px-12" style={{ background: "linear-gradient(135deg, var(--c-primary), var(--c-accent))" }}>
            <h2 className="text-3xl font-bold sm:text-4xl">Start with a free lesson today</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">Open any course and watch the free preview lessons — no sign-up required.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/courses" size="lg" className="bg-white !text-slate-900 hover:bg-white/90">
                Browse courses
              </ButtonLink>
              <ButtonLink href="/pricing" size="lg" variant="ghost" className="!text-white hover:bg-white/10">
                See pricing
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
