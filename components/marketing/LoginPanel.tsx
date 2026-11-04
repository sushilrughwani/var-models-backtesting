"use client";

import { GraduationCap, Presentation } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { mockAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/Toast";
import { Callout } from "@/components/ui/Section";

/** MOCK login screen. INTEGRATION: replace with the real auth provider's sign-in form. */
export function LoginPanel() {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();
  const next = params.get("next");
  const go = (role: "student" | "instructor") => {
    mockAuth.signIn(role);
    toast({ title: `Signed in as ${role} (demo)`, tone: "success" });
    const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : null;
    router.push(safeNext ?? (role === "instructor" ? "/instructor" : "/learn"));
  };
  return (
    <div className="space-y-4">
      <Callout tone="warning" title="Demo login">Authentication is mocked. Pick a role to explore the platform. No password is needed.</Callout>
      {[
        { role: "student" as const, icon: GraduationCap, title: "Continue as Student", body: "Dashboard, course player, question bank, flashcards, mocks and planner." },
        { role: "instructor" as const, icon: Presentation, title: "Continue as Instructor", body: "Course builder, question manager, teaching kits, students, coupons and pricing." },
      ].map((o) => (
        <button key={o.role} type="button" onClick={() => go(o.role)} className="flex w-full items-start gap-4 rounded-2xl border border-border bg-surface p-5 text-left hover:border-primary">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><o.icon className="h-5 w-5" /></span>
          <span><span className="block font-semibold">{o.title}</span><span className="mt-1 block text-sm text-muted">{o.body}</span></span>
        </button>
      ))}
    </div>
  );
}
