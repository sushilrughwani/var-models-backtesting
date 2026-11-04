import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Section";
import { ContactForm } from "@/components/marketing/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const c = siteConfig.contact;
  return (
    <Container className="max-w-5xl py-14">
      <h1 className="text-4xl font-extrabold tracking-tight">Contact us</h1>
      <p className="mt-3 text-lg text-muted">Questions about a course, payments or your account? We usually reply {c.responseTime}.</p>
      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_320px]">
        <ContactForm />
        <ul className="space-y-4 text-sm">
          <li className="flex gap-3"><Mail className="h-5 w-5 text-primary" /><a href={`mailto:${c.email}`} className="hover:underline">{c.email}</a></li>
          <li className="flex gap-3"><Mail className="h-5 w-5 text-primary" /><span>Support: <a href={`mailto:${c.supportEmail}`} className="hover:underline">{c.supportEmail}</a></span></li>
          <li className="flex gap-3"><Phone className="h-5 w-5 text-primary" />{c.phone}</li>
          <li className="flex gap-3"><MapPin className="h-5 w-5 text-primary" />{c.address}</li>
          <li className="flex gap-3"><Clock className="h-5 w-5 text-primary" />Response time: {c.responseTime}</li>
        </ul>
      </div>
    </Container>
  );
}
