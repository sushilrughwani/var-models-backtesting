"use client";

import Link from "next/link";
import { useEnrollments } from "@/lib/payments";
import { useHydrated } from "@/lib/storage/useStored";
import { buttonClass } from "@/components/ui/Button";

/** Shows "Continue learning" when enrolled, otherwise the enroll CTA. */
export function EnrollCta({ courseSlug, firstLesson, plan = "selfStudy", label = "Enroll now", className }: { courseSlug: string; firstLesson?: string; plan?: "selfStudy" | "premium"; label?: string; className?: string }) {
  const enrollments = useEnrollments();
  const hydrated = useHydrated();
  if (hydrated && enrollments[courseSlug]) {
    return (
      <Link href={firstLesson ? `/learn/courses/${courseSlug}/${firstLesson}` : "/learn"} className={buttonClass("accent", "lg", className)}>
        Continue learning
      </Link>
    );
  }
  return (
    <Link href={`/checkout?course=${courseSlug}&plan=${plan}`} className={buttonClass("primary", "lg", className)}>
      {label}
    </Link>
  );
}
