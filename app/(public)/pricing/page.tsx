import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getCourseSummaries } from "@/lib/data";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { PriceTag } from "@/components/course/PriceTag";
import { CurrencyToggle } from "@/components/layout/CurrencyToggle";
import { buttonClass } from "@/components/ui/Button";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";

export const metadata: Metadata = { title: "Pricing", description: "Self-Study, Premium and Bundle plans." };

const faq = [
  { q: "What is the difference between Self-Study and Premium?", a: "Self-Study includes every lecture, note, quiz, question-bank item, flashcard and tool. Premium adds instructor Q&A on every lesson, monthly live doubt-clearing, full mock exams with topic reports and a completion certificate." },
  { q: "Can I upgrade later?", a: "Yes. Upgrade from Self-Study to Premium at any time and pay only the difference (handled by support until self-serve upgrades launch)." },
  { q: "Which currency am I charged in?", a: siteConfig.currency.note },
  { q: "Do you offer refunds?", a: "Yes, within the conditions described on the Refund Policy page." },
];

export default async function PricingPage() {
  const courses = (await getCourseSummaries()).filter((c) => siteConfig.coursePricing[c.slug]);
  return (
    <Container className="py-14">
      <SectionHeading eyebrow="Pricing" title="Simple plans for every goal" description="Pay once per course. No subscriptions. Every course has free preview lessons." />
      <div className="mt-6 flex justify-center"><CurrencyToggle /></div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <PlanCard title="Self-Study" subtitle="Learn at your own pace" features={siteConfig.planFeatures.selfStudy} href="/courses" cta="Choose a course" />
        <PlanCard title="Premium" subtitle="Self-Study + instructor support" features={siteConfig.planFeatures.premium} href="/courses" cta="Choose a course" highlight />
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold">Bundles</h2>
          <p className="text-sm text-muted">Best value for full programmes</p>
          <ul className="mt-5 space-y-4">
            {siteConfig.bundles.map((b) => (
              <li key={b.id} className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold">{b.name}</p>
                  {b.highlight && <Badge tone="primary">Best value</Badge>}
                </div>
                <p className="mt-1 text-xs text-muted">{b.description}</p>
                <PriceTag price={b.price} listPrice={b.listPrice} className="mt-2 block text-xl" />
                <Link href={`/checkout?bundle=${b.id}`} className={buttonClass("primary", "sm", "mt-3 w-full")}>Get bundle</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="mt-16 text-2xl font-bold">Prices by course</h2>
      <div className="mt-4">
        <Table>
          <THead><TR><TH>Course</TH><TH>Self-Study</TH><TH>Premium</TH><TH>Access</TH><TH><span className="sr-only">Actions</span></TH></TR></THead>
          <TBody>
            {courses.map((c) => {
              const p = siteConfig.coursePricing[c.slug];
              return (
                <TR key={c.slug}>
                  <TD><Link href={`/courses/${c.slug}`} className="font-medium hover:text-primary">{c.title}</Link></TD>
                  <TD><PriceTag price={p.selfStudy} /></TD>
                  <TD><PriceTag price={p.premium} /></TD>
                  <TD className="text-muted">{p.accessMonths} months</TD>
                  <TD><Link href={`/checkout?course=${c.slug}&plan=selfStudy`} className="text-sm font-semibold text-primary hover:underline">Enroll</Link></TD>
                </TR>
              );
            })}
          </TBody>
        </Table>
      </div>
      <p className="mt-3 text-xs text-muted">{siteConfig.currency.note}</p>

      <div className="mx-auto mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold">Pricing FAQ</h2>
        <Accordion className="mt-4" items={faq.map((f, i) => ({ id: `p${i}`, title: f.q, content: <p className="text-sm text-muted">{f.a}</p> }))} />
      </div>
    </Container>
  );
}

function PlanCard({ title, subtitle, features, href, cta, highlight }: { title: string; subtitle: string; features: readonly string[]; href: string; cta: string; highlight?: boolean }) {
  return (
    <div className={`flex flex-col rounded-2xl border bg-surface p-6 ${highlight ? "border-primary shadow-lg" : "border-border"}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        {highlight && <Badge tone="primary">Most popular choice</Badge>}
      </div>
      <p className="text-sm text-muted">{subtitle}</p>
      <ul className="mt-5 flex-1 space-y-2 text-sm">
        {features.map((f) => (
          <li key={f} className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-success" /> {f}</li>
        ))}
      </ul>
      <Link href={href} className={buttonClass(highlight ? "primary" : "outline", "md", "mt-6")}>{cta}</Link>
    </div>
  );
}
