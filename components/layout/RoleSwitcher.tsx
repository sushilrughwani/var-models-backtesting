"use client";

import { ChevronDown, GraduationCap, LogOut, Presentation, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mockAuth, useSession, type Role } from "@/lib/auth";
import { useHydrated } from "@/lib/storage/useStored";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";

const roleMeta: Record<Role, { label: string; icon: typeof User }> = {
  guest: { label: "Guest", icon: User },
  student: { label: "Student", icon: GraduationCap },
  instructor: { label: "Instructor", icon: Presentation },
};

/** MOCK login: switch between Guest / Student / Instructor. INTEGRATION: replace with real sign-in UI. */
export function RoleSwitcher({ align = "right" }: { align?: "left" | "right" }) {
  const session = useSession();
  const hydrated = useHydrated();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const role = hydrated ? session.role : "guest";
  const Icon = roleMeta[role].icon;
  const switchTo = (r: Role) => {
    setOpen(false);
    if (r === "guest") {
      mockAuth.signOut();
      toast({ title: "Signed out", tone: "info" });
      router.push("/");
    } else {
      mockAuth.signIn(r);
      toast({ title: `Signed in as ${roleMeta[r].label} (demo)`, tone: "success" });
      router.push(r === "instructor" ? "/instructor" : "/learn");
    }
  };
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm font-medium hover:bg-surface-muted"
      >
        <Icon className="h-4 w-4" aria-hidden />
        <span className="hidden sm:inline">{role === "guest" ? "Log in" : session.name}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted" aria-hidden />
      </button>
      {open && (
        <div
          role="menu"
          className={cn(
            "absolute z-50 mt-2 w-64 rounded-xl border border-border bg-surface p-2 shadow-xl",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          <p className="px-2 pb-2 pt-1 text-xs text-muted">Demo login — pick a role (mock auth)</p>
          {(["guest", "student", "instructor"] as Role[]).map((r) => {
            const I = roleMeta[r].icon;
            return (
              <button
                key={r}
                role="menuitemradio"
                aria-checked={role === r}
                type="button"
                onClick={() => switchTo(r)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm hover:bg-surface-muted",
                  role === r && "bg-primary/10 text-primary",
                )}
              >
                {r === "guest" ? <LogOut className="h-4 w-4" /> : <I className="h-4 w-4" />}
                {r === "guest" ? "Guest (signed out)" : roleMeta[r].label}
              </button>
            );
          })}
          {role !== "guest" && (
            <div className="mt-2 border-t border-border pt-2">
              <Link href={role === "instructor" ? "/instructor" : "/learn"} className="block rounded-lg px-2 py-2 text-sm hover:bg-surface-muted" onClick={() => setOpen(false)}>
                Go to {role === "instructor" ? "instructor panel" : "dashboard"}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
