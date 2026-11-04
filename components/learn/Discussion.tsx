"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import type { DiscussionThread } from "@/lib/data/types";
import { useSession } from "@/lib/auth";
import { useStored } from "@/lib/storage/useStored";
import { KEYS } from "@/lib/storage";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Form";
import { useToast } from "@/components/ui/Toast";

interface LocalPost { id: string; lessonKey: string; title: string; body: string; author: string; createdAt: string }

/**
 * Lesson Q&A UI with SAMPLE threads.
 * INTEGRATION: load threads from and post to a discussion API (DB tables: threads, replies),
 * notify the instructor of new questions, add moderation and rate limiting. Premium-only posting.
 */
export function Discussion({ lessonKey, threads }: { lessonKey: string; threads: DiscussionThread[] }) {
  const session = useSession();
  const { toast } = useToast();
  const [posts, setPosts] = useStored<LocalPost[]>(KEYS.discussions, []);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const mine = posts.filter((p) => p.lessonKey === lessonKey);
  const submit = () => {
    if (!title.trim() || !body.trim()) return;
    setPosts((p) => [...p, { id: `${Date.now()}`, lessonKey, title, body, author: session.name, createdAt: new Date().toISOString() }]);
    setTitle("");
    setBody("");
    toast({ title: "Question posted (saved locally)", description: "In production the instructor would be notified.", tone: "success" });
  };
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-surface p-4">
        <p className="mb-2 text-sm font-semibold">Ask a question about this lesson</p>
        <Input aria-label="Question title" placeholder="Short title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea aria-label="Question details" className="mt-2" rows={3} placeholder="Describe what you are stuck on…" value={body} onChange={(e) => setBody(e.target.value)} />
        <Button className="mt-2" size="sm" onClick={submit} disabled={!title.trim() || !body.trim()}>Post question</Button>
      </div>
      {[...mine.map((p) => ({ id: p.id, title: p.title, body: p.body, author: p.author, role: "student" as const, createdAt: p.createdAt, replies: [], sample: false })), ...threads].map((t) => (
        <article key={t.id} className="rounded-xl border border-border bg-surface p-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <MessageSquare className="h-3.5 w-3.5" /> <span className="font-semibold text-foreground">{t.author}</span>
            <span>{new Date(t.createdAt).toLocaleDateString()}</span>
            {t.sample ? <Badge tone="warning">Sample thread</Badge> : <Badge tone="primary">Your question</Badge>}
          </div>
          <h4 className="mt-2 font-semibold">{t.title}</h4>
          <p className="mt-1 text-sm text-muted">{t.body}</p>
          {t.replies.map((r) => (
            <div key={r.id} className="mt-3 rounded-lg border-l-4 border-primary bg-primary/5 p-3 text-sm">
              <p className="text-xs font-semibold">{r.author} {r.role === "instructor" && <Badge tone="primary" className="ml-1">Instructor</Badge>}</p>
              <p className="mt-1">{r.body}</p>
            </div>
          ))}
        </article>
      ))}
    </div>
  );
}
