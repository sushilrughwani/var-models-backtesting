"use client";

/**
 * Toast notifications. Also used as the MOCK email/notification channel.
 * INTEGRATION: transactional emails (welcome, receipt, reminders) should be sent server-side via an
 * email provider (e.g. Resend, Amazon SES, Postmark) — the toast only simulates them.
 */
import { CheckCircle2, Info, Mail, TriangleAlert, X } from "lucide-react";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ToastTone = "success" | "info" | "warning" | "error" | "email";
interface ToastItem {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
}

interface ToastApi {
  toast: (t: { title: string; description?: string; tone?: ToastTone }) => void;
  /** Simulates sending an email; shows it on screen instead. */
  mockEmail: (to: string, subject: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const dismiss = useCallback((id: number) => setItems((xs) => xs.filter((x) => x.id !== id)), []);
  const toast = useCallback<ToastApi["toast"]>(
    ({ title, description, tone = "info" }) => {
      const id = Date.now() + Math.random();
      setItems((xs) => [...xs.slice(-3), { id, title, description, tone }]);
      setTimeout(() => dismiss(id), 5000);
    },
    [dismiss],
  );
  const mockEmail = useCallback<ToastApi["mockEmail"]>(
    (to, subject) => {
      // INTEGRATION: send the email server-side.
      toast({ title: `Email sent (mock) to ${to || "you"}`, description: subject, tone: "email" });
    },
    [toast],
  );
  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-success" />,
    info: <Info className="h-5 w-5 text-primary" />,
    warning: <TriangleAlert className="h-5 w-5 text-warning" />,
    error: <TriangleAlert className="h-5 w-5 text-danger" />,
    email: <Mail className="h-5 w-5 text-accent" />,
  };
  return (
    <ToastContext.Provider value={{ toast, mockEmail }}>
      {children}
      <div aria-live="polite" className="no-print pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:items-end">
        {items.map((t) => (
          <div
            key={t.id}
            role="status"
            className={cn(
              "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border border-border bg-surface p-4 shadow-lg",
            )}
          >
            {icons[t.tone]}
            <div className="flex-1">
              <p className="text-sm font-semibold">{t.title}</p>
              {t.description && <p className="mt-0.5 text-sm text-muted">{t.description}</p>}
            </div>
            <button type="button" onClick={() => dismiss(t.id)} aria-label="Dismiss" className="text-muted hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) return { toast: () => {}, mockEmail: () => {} };
  return ctx;
}
