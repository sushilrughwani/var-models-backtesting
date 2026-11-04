import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Calculator, FileText, PlayCircle, Sigma } from "lucide-react";
import { getCourses, getFormulaGroups } from "@/lib/data";
import { slugify } from "@/lib/slug";
import { Container } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Free Resources", description: "Free formula sheets, calculators, preview lessons and articles." };

export default async function ResourcesPage() {
  const [groups, courses] = await Promise.all([getFormulaGroups(), getCourses()]);
  const previews = courses.flatMap((c) => c.modules.flatMap((m) => m.lessons.filter((l) => l.freePreview).map((l) => ({ course: c, lesson: l })))).slice(0, 12);
  const cards = [
    { href: "/resources/formula-sheets", icon: Sigma, title: "Printable formula sheets", body: `${groups.length} topic sheets with every key formula and variable definition.` },
    { href: "/calculators", icon: Calculator, title: "30 finance calculators", body: "TVM, bonds, options, VaR and more, each with the formula and a short explanation." },
    { href: "/blog", icon: FileText, title: "Study guides and articles", body: "How to plan, practise and revise effectively for professional exams." },
    { href: "/courses", icon: PlayCircle, title: "Free preview lessons", body: "Watch selected lessons from every course without signing up." },
  ];
  return (
    <Container className="py-14">
      <h1 className="text-4xl font-extrabold tracking-tight">Free resources</h1>
      <p className="mt-2 max-w-2xl text-muted">Useful whether or not you enroll. Everything here is free.</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="group flex gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm hover:border-primary/50">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><c.icon className="h-6 w-6" /></span>
            <span><span className="block text-lg font-semibold group-hover:text-primary">{c.title}</span><span className="mt-1 block text-sm text-muted">{c.body}</span></span>
          </Link>
        ))}
      </div>
      <h2 className="mt-14 text-2xl font-bold">Formula sheets by topic</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {groups.map((g) => (
          <Link key={g} href={`/resources/formula-sheets/${slugify(g)}`} className="rounded-full border border-border bg-surface px-4 py-2 text-sm hover:border-primary hover:text-primary">{g}</Link>
        ))}
      </div>
      <h2 className="mt-14 text-2xl font-bold">Free preview lessons</h2>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {previews.map(({ course, lesson }) => (
          <li key={`${course.slug}/${lesson.slug}`}>
            <Link href={`/courses/${course.slug}/preview/${lesson.slug}`} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 text-sm hover:border-primary/50">
              <BookOpen className="h-4 w-4 text-primary" />
              <span><span className="font-medium">{lesson.title}</span><span className="block text-xs text-muted">{course.shortTitle} · {lesson.duration} min</span></span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
