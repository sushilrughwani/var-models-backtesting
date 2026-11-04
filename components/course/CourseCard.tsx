import Link from "next/link";
import { BarChart3, BookOpen, Clock, Code2, FileSpreadsheet, Landmark, ShieldCheck, TrendingUp } from "lucide-react";
import type { CourseSummary } from "@/lib/data/types";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { PriceTag } from "./PriceTag";

export function courseIcon(slug: string) {
  if (slug.startsWith("cfa")) return Landmark;
  if (slug.startsWith("frm")) return ShieldCheck;
  if (slug.includes("excel")) return FileSpreadsheet;
  if (slug.includes("python")) return Code2;
  if (slug.includes("model")) return BarChart3;
  return TrendingUp;
}

export function CourseArt({ course, className }: { course: Pick<CourseSummary, "slug" | "accent" | "shortTitle">; className?: string }) {
  const Icon = courseIcon(course.slug);
  return (
    <div
      className={`relative overflow-hidden ${className ?? "h-36"}`}
      style={{ background: `linear-gradient(135deg, ${course.accent}, color-mix(in srgb, ${course.accent} 55%, #0f172a))` }}
      aria-hidden
    >
      <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 200 100" preserveAspectRatio="none">
        <path d="M0 80 L30 65 L60 70 L90 45 L120 52 L150 30 L200 20" fill="none" stroke="#fff" strokeWidth="2" />
        <path d="M0 95 L40 85 L80 88 L120 70 L160 72 L200 55" fill="none" stroke="#fff" strokeWidth="1" />
      </svg>
      <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-lg font-bold drop-shadow">{course.shortTitle}</span>
      </div>
    </div>
  );
}

export function CourseCard({ course }: { course: CourseSummary }) {
  const pricing = siteConfig.coursePricing[course.slug];
  const hours = Math.round(course.totalMinutes / 60);
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <CourseArt course={course} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="primary">{course.category === "skills" ? "Skills" : course.category.toUpperCase()}</Badge>
          <Badge>{course.level}</Badge>
          {course.status === "skeleton" && <Badge tone="warning">Lessons releasing soon</Badge>}
        </div>
        <h3 className="mt-3 text-lg font-semibold group-hover:text-primary">{course.title}</h3>
        <p className="mt-1 line-clamp-3 flex-1 text-sm text-muted">{course.shortDescription}</p>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" /> {course.lessonCount} lessons
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> ~{hours} h video
          </span>
        </div>
        {pricing && (
          <div className="mt-4 border-t border-border pt-4 text-sm">
            From <PriceTag price={pricing.selfStudy} listPrice={pricing.listPrice} />
          </div>
        )}
      </div>
    </Link>
  );
}
