import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";

const cols = [
  {
    title: "Courses",
    links: [
      { href: "/courses/cfa-level-1", label: "CFA® Level I" },
      { href: "/courses/frm-part-1", label: "FRM® Part I" },
      { href: "/courses/excel-for-finance", label: "Excel for Finance" },
      { href: "/courses/financial-modeling", label: "Financial Modeling" },
      { href: "/courses/python-for-finance", label: "Python for Finance" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/resources", label: "Free Resources" },
      { href: "/resources/formula-sheets", label: "Formula Sheets" },
      { href: "/calculators", label: "Calculators" },
      { href: "/blog", label: "Blog" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/refund", label: "Refund Policy" },
    ],
  },
];

export function PublicFooter() {
  const { social } = siteConfig;
  return (
    <footer className="no-print mt-20 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted">{siteConfig.brand.tagline}</p>
            <p className="mt-4 text-sm text-muted">
              <a className="hover:text-foreground" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted">
              {Object.entries(social).map(([k, v]) => (
                <a key={k} href={v} className="capitalize hover:text-foreground" rel="noopener noreferrer" target="_blank">
                  {k === "x" ? "X" : k}
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h2 className="text-sm font-semibold">{c.title}</h2>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-muted hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-border pt-6 text-xs leading-relaxed text-muted">
          <p>{siteConfig.legal.trademarkDisclaimer}</p>
          <p className="mt-2">
            © {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
