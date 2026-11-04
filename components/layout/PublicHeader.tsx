"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { RoleSwitcher } from "./RoleSwitcher";
import { buttonClass } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/courses", label: "Courses" },
  { href: "/pricing", label: "Pricing" },
  { href: "/resources", label: "Free Resources" },
  { href: "/calculators", label: "Calculators" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function PublicHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="no-print sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium hover:bg-surface-muted",
                pathname.startsWith(n.href) ? "text-primary" : "text-muted hover:text-foreground",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <RoleSwitcher />
          <Link href="/courses" className={buttonClass("primary", "sm", "hidden md:inline-flex")}>
            Start learning
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t border-border bg-surface px-4 py-3 lg:hidden">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 font-medium hover:bg-surface-muted">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
