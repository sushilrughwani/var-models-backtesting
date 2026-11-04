"use client";

import { useState } from "react";
import { Bell, Check } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Checkbox, FieldHint, Input, Label, Select, Textarea } from "@/components/ui/Form";
import { Tabs } from "@/components/ui/Tabs";
import { Accordion } from "@/components/ui/Accordion";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";
import { Progress } from "@/components/ui/Progress";
import { Callout, EmptyState, Stat } from "@/components/ui/Section";
import { MathText } from "@/components/content/MathText";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export function StyleguideDemo() {
  const [open, setOpen] = useState(false);
  const { toast, mockEmail } = useToast();
  return (
    <div className="grid gap-6">
      <Block title="Colours (from config/site.ts)">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {Object.keys(siteConfig.palette.light).map((k) => (
            <div key={k} className="text-xs">
              <div className="h-12 rounded-lg border border-border" style={{ background: `var(--c-${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)})` }} />
              <p className="mt-1 font-mono">{k}</p>
            </div>
          ))}
        </div>
      </Block>
      <Block title="Typography">
        <div className="space-y-2">
          <p className="text-5xl font-extrabold tracking-tight">Display 5xl</p>
          <h1 className="text-4xl font-bold">Heading 1 — 4xl</h1>
          <h2 className="text-3xl font-bold">Heading 2 — 3xl</h2>
          <h3 className="text-2xl font-semibold">Heading 3 — 2xl</h3>
          <h4 className="text-lg font-semibold">Heading 4 — lg</h4>
          <p>Body text — base. The quick brown fox values a bond at par.</p>
          <p className="text-sm text-muted">Muted small text — sm.</p>
          <p className="font-mono text-sm">Monospace =PMT(B2/12, B3*12, -B1)</p>
          <p>
            Math: <MathText text={"$PV = \\dfrac{FV}{(1+r)^n}$ and display $$\\sigma_p^2 = w_1^2\\sigma_1^2 + w_2^2\\sigma_2^2 + 2w_1w_2\\rho\\sigma_1\\sigma_2$$"} />
          </p>
        </div>
      </Block>
      <Block title="Buttons">
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button disabled>Disabled</Button>
          <Button size="sm">Small</Button>
          <Button size="lg"><Check className="h-4 w-4" /> Large with icon</Button>
        </div>
      </Block>
      <Block title="Badges">
        <div className="flex flex-wrap gap-2">
          {(["neutral", "primary", "accent", "success", "warning", "danger", "highlight"] as BadgeTone[]).map((t) => <Badge key={t} tone={t}>{t}</Badge>)}
        </div>
      </Block>
      <Block title="Form inputs">
        <div className="grid gap-4 md:grid-cols-2">
          <div><Label htmlFor="sg-in">Text input</Label><Input id="sg-in" placeholder="Placeholder" /><FieldHint>Helper text</FieldHint></div>
          <div><Label htmlFor="sg-sel">Select</Label><Select id="sg-sel"><option>Option A</option><option>Option B</option></Select></div>
          <div className="md:col-span-2"><Label htmlFor="sg-ta">Textarea</Label><Textarea id="sg-ta" placeholder="Write here…" /></div>
          <Checkbox label="Checkbox" defaultChecked />
        </div>
      </Block>
      <Block title="Cards, stats, progress">
        <div className="grid gap-4 md:grid-cols-3">
          <Card><CardHeader><CardTitle>Card title</CardTitle><CardDescription>Card description</CardDescription></CardHeader><CardBody>Card body content.</CardBody></Card>
          <Stat label="Study streak" value="12 days" sub="Longest: 21 days" />
          <div className="space-y-3 rounded-xl border border-border p-4"><p className="text-sm">Course progress 64%</p><Progress value={64} /></div>
        </div>
      </Block>
      <Block title="Tabs">
        <Tabs items={[{ id: "a", label: "Notes", content: <p>Notes panel</p> }, { id: "b", label: "Quiz", content: <p>Quiz panel</p> }, { id: "c", label: "Discussion", content: <p>Discussion panel</p> }]} />
      </Block>
      <Block title="Accordion">
        <Accordion items={[{ id: "1", title: "What is duration?", content: <p className="text-sm text-muted">A measure of a bond&apos;s price sensitivity to yield changes.</p> }, { id: "2", title: "What is convexity?", content: <p className="text-sm text-muted">The curvature of the price-yield relationship.</p> }]} />
      </Block>
      <Block title="Modal and toasts">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setOpen(true)}>Open modal</Button>
          <Button variant="outline" onClick={() => toast({ title: "Saved", description: "Your changes were saved.", tone: "success" })}>Success toast</Button>
          <Button variant="outline" onClick={() => toast({ title: "Heads up", description: "Something needs attention.", tone: "warning" })}>Warning toast</Button>
          <Button variant="outline" onClick={() => mockEmail("student@example.com", "Welcome to the course")}><Bell className="h-4 w-4" /> Mock email</Button>
        </div>
        <Modal open={open} onClose={() => setOpen(false)} title="Example modal" footer={<><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Confirm</Button></>}>
          <p>Modals use the native dialog element, so focus trapping and Escape work out of the box.</p>
        </Modal>
      </Block>
      <Block title="Table">
        <Table>
          <THead><TR><TH>Topic</TH><TH>Attempted</TH><TH>Accuracy</TH></TR></THead>
          <TBody>
            <TR><TD>Fixed Income</TD><TD>42</TD><TD>71%</TD></TR>
            <TR><TD>Derivatives</TD><TD>18</TD><TD>56%</TD></TR>
          </TBody>
        </Table>
      </Block>
      <Block title="Callouts and empty state">
        <div className="grid gap-3">
          <Callout title="Info">Informational message.</Callout>
          <Callout tone="success" title="Success">It worked.</Callout>
          <Callout tone="warning" title="Warning">Be careful.</Callout>
          <Callout tone="danger" title="Danger">Something went wrong.</Callout>
          <EmptyState title="Nothing here yet">Empty states guide the next action.</EmptyState>
        </div>
      </Block>
    </div>
  );
}
