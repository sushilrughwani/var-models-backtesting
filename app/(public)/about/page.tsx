import type { Metadata } from "next";
import { BookOpenCheck, Brain, ShieldCheck, Target } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "About" };

const values = [
  { icon: Brain, title: "Intuition before formulas", body: "Every topic starts with why it works, so formulas become logical rather than memorised." },
  { icon: Target, title: "Exam-focused practice", body: "Questions are written to test the reasoning the exams reward, with explanations for every option." },
  { icon: ShieldCheck, title: "Accuracy first", body: "Every numeric answer and calculator is checked by code before it reaches you." },
  { icon: BookOpenCheck, title: "Honest marketing", body: "No inflated pass rates or invented statistics — just clear teaching and useful tools." },
];

export default function AboutPage() {
  const { instructor, brand } = siteConfig;
  return (
    <Container className="max-w-5xl py-14">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">About {brand.name}</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Finance education that actually makes sense</h1>
      <p className="mt-4 max-w-3xl text-lg text-muted">{brand.description}</p>
      <section className="mt-12 grid items-start gap-10 md:grid-cols-[220px_1fr]">
        <div className="flex h-56 w-full items-center justify-center rounded-3xl text-6xl font-extrabold text-white shadow-lg" style={{ background: "linear-gradient(135deg, var(--c-primary), var(--c-accent))" }} role="img" aria-label="Instructor photo placeholder">
          {instructor.initials}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{instructor.name}</h2>
          <p className="text-muted">{instructor.title} · {instructor.credentials}</p>
          <div className="mt-4 space-y-4">
            {instructor.longBio.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>
      <section className="mt-16">
        <h2 className="text-2xl font-bold">How we teach</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-surface p-6">
              <v.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-semibold">{v.title}</h3>
              <p className="mt-1 text-sm text-muted">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="mt-12 flex flex-wrap gap-3">
        <ButtonLink href="/courses">Explore courses</ButtonLink>
        <ButtonLink href="/contact" variant="outline">Get in touch</ButtonLink>
      </div>
    </Container>
  );
}
