import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/data";
import { Container, EmptyState } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Blog", description: "Study strategy and exam preparation articles." };

export default async function BlogIndex() {
  const posts = await getBlogPosts();
  return (
    <Container className="py-14">
      <h1 className="text-4xl font-extrabold tracking-tight">Blog</h1>
      <p className="mt-2 max-w-2xl text-muted">Study strategy, exam preparation and topic guides.</p>
      {posts.length === 0 ? (
        <div className="mt-10"><EmptyState title="Articles coming soon" /></div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex flex-wrap gap-2">{p.tags.slice(0, 3).map((t) => <Badge key={t}>{t}</Badge>)}</div>
              <h2 className="mt-3 text-lg font-semibold group-hover:text-primary">{p.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted">{p.excerpt}</p>
              <p className="mt-4 text-xs text-muted">{p.date} · {p.readingMinutes} min read</p>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
