"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  BarChart3,
  Bookmark,
  BookOpen,
  Calculator,
  CalendarDays,
  ClipboardList,
  FileQuestion,
  GraduationCap,
  Layers,
  LayoutDashboard,
  Megaphone,
  Menu,
  Presentation,
  Settings,
  Sigma,
  Tag,
  Timer,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { RoleSwitcher } from "./RoleSwitcher";
import { RequireRole } from "./RequireRole";
import { cn } from "@/lib/cn";

export interface NavItem {
  href: string;
  label: string;
  icon: typeof BookOpen;
  exact?: boolean;
}

export const studentNav: NavItem[] = [
  { href: "/learn", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/learn/courses", label: "My courses", icon: BookOpen },
  { href: "/learn/qbank", label: "Question bank", icon: FileQuestion },
  { href: "/learn/mocks", label: "Mock exams", icon: Timer },
  { href: "/learn/flashcards", label: "Flashcards", icon: Layers },
  { href: "/learn/formulas", label: "Formula library", icon: Sigma },
  { href: "/learn/calculators", label: "Calculators", icon: Calculator },
  { href: "/learn/planner", label: "Study planner", icon: CalendarDays },
  { href: "/learn/bookmarks", label: "Bookmarks & notes", icon: Bookmark },
  { href: "/learn/profile", label: "Profile & settings", icon: Settings },
];

export const instructorNav: NavItem[] = [
  { href: "/instructor", label: "Overview", icon: BarChart3, exact: true },
  { href: "/instructor/courses", label: "Course builder", icon: BookOpen },
  { href: "/instructor/questions", label: "Question bank", icon: ClipboardList },
  { href: "/instructor/kits", label: "Teaching kits", icon: Presentation },
  { href: "/instructor/students", label: "Students", icon: Users },
  { href: "/instructor/coupons", label: "Coupons", icon: Tag },
  { href: "/instructor/announcements", label: "Announcements", icon: Megaphone },
  { href: "/instructor/pricing", label: "Pricing", icon: Wallet },
  { href: "/learn", label: "Student view", icon: GraduationCap },
];

export function AppShell({ area, children }: { area: "student" | "instructor"; children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const nav = area === "student" ? studentNav : instructorNav;
  const isActive = (n: NavItem) => (n.exact ? pathname === n.href : pathname === n.href || pathname.startsWith(`${n.href}/`));
  const navList = (
    <nav aria-label={area === "student" ? "Student" : "Instructor"} className="space-y-1">
      {nav.map((n) => (
        <Link
          key={n.href}
          href={n.href}
          onClick={() => setOpen(false)}
          aria-current={isActive(n) ? "page" : undefined}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
            isActive(n) ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface-muted hover:text-foreground",
          )}
        >
          <n.icon className="h-4 w-4" aria-hidden /> {n.label}
        </Link>
      ))}
    </nav>
  );
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="no-print hidden border-r border-border bg-surface lg:block">
        <div className="sticky top-0 flex h-screen flex-col p-4">
          <Logo href="/" />
          <p className="mt-1 pl-12 text-xs font-medium uppercase tracking-wider text-muted">{area === "student" ? "Learning" : "Instructor"}</p>
          <div className="mt-6 flex-1 overflow-y-auto">{navList}</div>
          <div className="border-t border-border pt-3 text-xs text-muted">
            <Link href="/" className="hover:text-foreground">← Back to website</Link>
          </div>
        </div>
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 overflow-y-auto bg-surface p-4 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <Logo href="/" />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close navigation" className="rounded-lg p-2"><X className="h-5 w-5" /></button>
            </div>
            {navList}
          </div>
        </div>
      )}
      <div className="flex min-w-0 flex-col">
        <header className="no-print sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-border bg-background/85 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-2">
            <button type="button" className="rounded-lg p-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu className="h-5 w-5" /></button>
            <span className="lg:hidden"><Logo href="/" compact /></span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <RoleSwitcher />
          </div>
        </header>
        <main id="main" className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <RequireRole area={area}>{children}</RequireRole>
        </main>
      </div>
    </div>
  );
}
