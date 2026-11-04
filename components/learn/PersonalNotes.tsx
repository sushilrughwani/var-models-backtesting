"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { KEYS, storage } from "@/lib/storage";
import { Textarea } from "@/components/ui/Form";
import { useNotesMap } from "./useLearner";

/** Personal notes per lesson, auto-saved locally. INTEGRATION: sync to the backend. */
export function PersonalNotes({ noteKey }: { noteKey: string }) {
  const [notes] = useNotesMap();
  const stored = notes[noteKey] ?? "";
  const [text, setText] = useState(stored);
  const [saved, setSaved] = useState(true);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setText(stored);
  }, [stored]);
  useEffect(() => {
    if (saved) return;
    const t = setTimeout(() => {
      const all = storage.get<Record<string, string>>(KEYS.notes, {});
      if (text.trim()) all[noteKey] = text;
      else delete all[noteKey];
      storage.set(KEYS.notes, all);
      setSaved(true);
    }, 600);
    return () => clearTimeout(t);
  }, [text, saved, noteKey]);
  return (
    <div>
      <label htmlFor={`notes-${noteKey}`} className="sr-only">Your notes for this lesson</label>
      <Textarea id={`notes-${noteKey}`} rows={8} value={text} onChange={(e) => { setText(e.target.value); setSaved(false); }} placeholder="Write your own summary, mnemonics or questions for this lesson…" />
      <p className="mt-1 flex items-center gap-1 text-xs text-muted" aria-live="polite"><Save className="h-3 w-3" /> {saved ? "Saved on this device" : "Saving…"}</p>
    </div>
  );
}
