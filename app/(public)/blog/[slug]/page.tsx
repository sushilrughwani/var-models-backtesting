import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getBlogPost, getBlogPosts } from "@/lib/data";
import { Container } from "@/components/ui/Section";
import { Markdown } from "@/components/content/Markdown";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

export async function generateStaticParams() {
  return (await getBlogPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getBlogPost(slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const others = (await getBlogPosts()).filter((p) => p.slug !== slug).slice(0, 3);
  return (
    <Container className="max-w-3xl py-14">
      <Link href="/blog" className="text-sm text-muted hover:text-foreground">← All articles</Link>
      <div className="mt-6 flex flex-wrap gap-2">{post.tags.map((t) => <Badge key={t}>{t}</Badge>)}</div>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight">{post.title}</h1>
      <p className="mt-3 text-sm text-muted">By {siteConfig.instructor.name} · {post.date} · {post.readingMinutes} min read</p>
      <Markdown className="mt-10">{post.markdown}</Markdown>
      <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
        <p className="font-semibold">Ready to put this into practice?</p>
        <p className="mt-1 text-sm text-muted">Try a free preview lesson or build your study plan.</p>
        <ButtonLink href="/courses" className="mt-4">Explore courses</ButtonLink>
      </div>
      {others.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold">More articles</h2>
          <ul className="mt-4 space-y-3">
            {others.map((o) => <li key={o.slug}><Link href={`/blog/${o.slug}`} className="font-medium text-primary hover:underline">{o.title}</Link></li>)}
          </ul>
        </div>
      )}
    </Container>
  );
}
