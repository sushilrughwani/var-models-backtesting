"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Form";
import { useToast } from "@/components/ui/Toast";

/** MOCK contact form. INTEGRATION: POST to /api/contact, which validates, rate-limits and emails support. */
export function ContactForm() {
  const { toast, mockEmail } = useToast();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const errs: Record<string, string> = {};
    if (!String(f.get("name")).trim()) errs.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(f.get("email")))) errs.email = "Please enter a valid email.";
    if (String(f.get("message")).trim().length < 10) errs.message = "Please write at least 10 characters.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSent(true);
    toast({ title: "Message sent (mock)", description: "We will reply soon.", tone: "success" });
    mockEmail(String(f.get("email")), "We received your message");
    e.currentTarget.reset();
  };
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-2xl border border-border bg-surface p-6">
      {sent && <p className="rounded-lg bg-success/10 p-3 text-sm text-success" role="status">Thanks! Your message was recorded (demo — nothing was actually sent).</p>}
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
        {errors.name && <p id="name-err" className="mt-1 text-sm text-danger">{errors.name}</p>}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
        {errors.email && <p id="email-err" className="mt-1 text-sm text-danger">{errors.email}</p>}
      </div>
      <div>
        <Label htmlFor="topic">Topic</Label>
        <Select id="topic" name="topic" defaultValue="general">
          <option value="general">General question</option>
          <option value="courses">Choosing a course</option>
          <option value="billing">Payments and refunds</option>
          <option value="technical">Technical problem</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={5} aria-invalid={!!errors.message} aria-describedby={errors.message ? "msg-err" : undefined} />
        {errors.message && <p id="msg-err" className="mt-1 text-sm text-danger">{errors.message}</p>}
      </div>
      <Button type="submit">Send message</Button>
    </form>
  );
}
