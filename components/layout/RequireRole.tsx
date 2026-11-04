"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { canAccess, mockAuth, useSession } from "@/lib/auth";
import { useHydrated } from "@/lib/storage/useStored";
import { Button, buttonClass } from "@/components/ui/Button";

/**
 * Client-side route guard (MOCK).
 * INTEGRATION: enforce access on the server too — Next.js middleware/proxy that checks the session
 * cookie, plus role checks in every server component, route handler and API endpoint.
 */
export function RequireRole({ area, children }: { area: "student" | "instructor"; children: ReactNode }) {
  const session = useSession();
  const hydrated = useHydrated();
  const pathname = usePathname();
  if (!hydrated) {
    return <div className="flex h-64 items-center justify-center text-sm text-muted" aria-busy="true">Loading…</div>;
  }
  if (canAccess(session.role, area)) return <>{children}</>;
  return (
    <div className="mx-auto mt-10 max-w-md rounded-2xl border border-border bg-surface p-8 text-center">
      <Lock className="mx-auto h-10 w-10 text-muted" />
      <h1 className="mt-4 text-xl font-bold">{area === "instructor" ? "Instructor access only" : "Please log in"}</h1>
      <p className="mt-2 text-sm text-muted">
        {area === "instructor" ? "This area is for the course instructor." : "Log in to access your learning dashboard."} Authentication is mocked — use the demo role switcher.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Button onClick={() => mockAuth.signIn(area)}>Continue as demo {area}</Button>
        <Link href={`/login?next=${encodeURIComponent(pathname)}`} className={buttonClass("outline")}>Login page</Link>
      </div>
    </div>
  );
}
