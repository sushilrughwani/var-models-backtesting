"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { useEnrollments } from "@/lib/payments";
import { useSession } from "@/lib/auth";
import { buttonClass } from "@/components/ui/Button";

/**
 * Paywall for paid lessons (MOCK, client-side only).
 * INTEGRATION: the server must not send paid lesson content to users without an active enrollment.
 * Check the enrollment in the server component / API before rendering notes, quizzes and video tokens.
 */
export function LessonGate({ course, free, children }: { course: string; free?: boolean; children: ReactNode }) {
  const enrollments = useEnrollments();
  const session = useSession();
  const enrolled = !!enrollments[course] || session.role === "instructor";
  if (free || enrolled) return <>{children}</>;
  return (
    <div className="rounded-2xl border border-border bg-surface p-8 text-center">
      <Lock className="mx-auto h-10 w-10 text-muted" />
      <h2 className="mt-3 text-xl font-bold">This lesson is part of the full course</h2>
      <p className="mt-2 text-sm text-muted">Enroll to unlock every lesson, quiz, the question bank and mock exams.</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <Link href={`/checkout?course=${course}&plan=selfStudy`} className={buttonClass("primary")}>Enroll now</Link>
        <Link href={`/courses/${course}`} className={buttonClass("outline")}>See course details</Link>
      </div>
    </div>
  );
}
