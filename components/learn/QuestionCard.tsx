"use client";

import { CheckCircle2, Flag, XCircle } from "lucide-react";
import type { OptionLetter, Question } from "@/lib/data/types";
import { MathText } from "@/components/content/MathText";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export const LETTERS: OptionLetter[] = ["A", "B", "C", "D"];

/**
 * Renders one MCQ. When `revealed` is true the correct answer, the chosen answer and the
 * rationale for every option are shown (instant feedback / review mode).
 */
export function QuestionCard({
  q,
  index,
  total,
  selected,
  onSelect,
  revealed,
  flagged,
  onToggleFlag,
  topicTitle,
}: {
  q: Question;
  index?: number;
  total?: number;
  selected?: string;
  onSelect?: (letter: OptionLetter) => void;
  revealed: boolean;
  flagged?: boolean;
  onToggleFlag?: () => void;
  topicTitle?: string;
}) {
  const correct = selected === q.answer;
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {index !== undefined && <span className="font-semibold text-muted">Question {index + 1}{total ? ` of ${total}` : ""}</span>}
          {topicTitle && <Badge>{topicTitle}</Badge>}
          <Badge tone={q.difficulty === "hard" ? "danger" : q.difficulty === "medium" ? "warning" : "success"}>{q.difficulty}</Badge>
        </div>
        {onToggleFlag && (
          <button type="button" onClick={onToggleFlag} aria-pressed={flagged} className={cn("inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium", flagged ? "bg-highlight/15 text-highlight" : "text-muted hover:bg-surface-muted")}>
            <Flag className="h-3.5 w-3.5" /> {flagged ? "Flagged" : "Flag"}
          </button>
        )}
      </div>
      <div className="text-base leading-relaxed">
        <MathText text={q.stem} />
      </div>
      <fieldset className="mt-4 space-y-2">
        <legend className="sr-only">Answer options</legend>
        {q.options.map((opt, i) => {
          const L = LETTERS[i];
          const isSel = selected === L;
          const isAns = q.answer === L;
          return (
            <label
              key={L}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm transition-colors",
                !revealed && (isSel ? "border-primary bg-primary/5" : "border-border hover:bg-surface-muted"),
                revealed && isAns && "border-success bg-success/10",
                revealed && isSel && !isAns && "border-danger bg-danger/10",
                revealed && !isAns && !isSel && "border-border opacity-80",
                revealed && "cursor-default",
              )}
            >
              <input
                type="radio"
                name={`q-${q.id}`}
                className="sr-only"
                checked={isSel}
                disabled={revealed}
                onChange={() => onSelect?.(L)}
              />
              <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold", isSel ? "border-primary bg-primary text-primary-foreground" : "border-border")}>{L}</span>
              <span className="flex-1 pt-0.5"><MathText text={opt} /></span>
              {revealed && isAns && <CheckCircle2 className="h-5 w-5 shrink-0 text-success" aria-label="Correct answer" />}
              {revealed && isSel && !isAns && <XCircle className="h-5 w-5 shrink-0 text-danger" aria-label="Your answer" />}
            </label>
          );
        })}
      </fieldset>
      {revealed && (
        <div className="mt-4 rounded-xl border border-border bg-background p-4 text-sm" aria-live="polite">
          {selected ? (
            <p className={cn("font-semibold", correct ? "text-success" : "text-danger")}>{correct ? "Correct!" : `Incorrect — the answer is ${q.answer}.`}</p>
          ) : (
            <p className="font-semibold text-muted">Not answered — the answer is {q.answer}.</p>
          )}
          <p className="mt-2"><MathText text={q.explanation} /></p>
          <ul className="mt-3 space-y-1.5">
            {q.options.map((_, i) => {
              const L = LETTERS[i];
              const r = q.rationale[L];
              if (!r) return null;
              return (
                <li key={L} className="flex gap-2">
                  <span className={cn("font-bold", L === q.answer ? "text-success" : "text-muted")}>{L}.</span>
                  <span className="text-muted"><MathText text={r} /></span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
