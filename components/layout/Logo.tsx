import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/** Original generated logo: initials in a gradient tile + brand name. Replace with a real logo SVG later. */
export function Logo({ href = "/", className, compact = false }: { href?: string; className?: string; compact?: boolean }) {
  return (
    <Link href={href} className={cn("flex items-center gap-2.5 font-bold tracking-tight", className)} aria-label={`${siteConfig.brand.name} home`}>
      <span
        aria-hidden
        className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold text-white shadow-sm"
        style={{ background: "linear-gradient(135deg, var(--c-primary), var(--c-accent))" }}
      >
        {siteConfig.brand.logoInitials}
      </span>
      {!compact && <span className="text-lg">{siteConfig.brand.name}</span>}
    </Link>
  );
}
