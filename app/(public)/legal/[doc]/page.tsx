import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { legalDocs } from "@/content/site/legal";
import { Container, Callout } from "@/components/ui/Section";
import { Markdown } from "@/components/content/Markdown";

export function generateStaticParams() {
  return Object.keys(legalDocs).map((doc) => ({ doc }));
}

export async function generateMetadata({ params }: { params: Promise<{ doc: string }> }): Promise<Metadata> {
  const { doc } = await params;
  return { title: legalDocs[doc]?.title ?? "Legal" };
}

export default async function LegalPage({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params;
  const d = legalDocs[doc];
  if (!d) notFound();
  return (
    <Container className="max-w-3xl py-14">
      <Callout tone="danger" title="TEMPLATE - have a lawyer review before launch">
        This page is a generic template, not legal advice. Placeholders in [brackets] must be completed and the text adapted to your business and jurisdiction.
      </Callout>
      <h1 className="mt-8 text-4xl font-extrabold tracking-tight">{d.title}</h1>
      <p className="mt-2 text-sm text-muted">Last updated: {siteConfig.legal.lastUpdated} · {siteConfig.brand.name}</p>
      <Markdown className="mt-8">{d.markdown.replaceAll("[BRAND NAME]", siteConfig.brand.name).replaceAll("[contact email placeholder]", siteConfig.contact.email).replaceAll("[support email placeholder]", siteConfig.contact.supportEmail)}</Markdown>
    </Container>
  );
}
