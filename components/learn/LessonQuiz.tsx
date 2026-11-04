"use client";

import { useState } from "react";
import { RotateCcw, Trophy } from "lucide-react";
import type { OptionLetter, Question } from "@/lib/data/types";
import { recordAttempts } from "@/lib/learning/state";
import { KEYS, storage } from "@/lib/storage";
import { Button } from "@/components/ui/Button";
import { QuestionCard } from "./QuestionCard";
import { useQuizResults } from "./useLearner";

/** End-of-lesson quiz with instant feedback after each answer. */
export function LessonQuiz({ courseSlug, lessonSlug, questions }: { courseSlug: string; lessonSlug: string; questions: Question[] }) {
  const [answers, setAnswers] = useState<Record<string, OptionLetter>>({});
  const [results] = useQuizResults();
  const key = `${courseSlug}/${lessonSlug}`;
  const prev = results[key];
  const answered = Object.keys(answers).length;
  const score = questions.filter((q) => answers[q.id] === q.answer).length;
  const done = answered === questions.length && questions.length > 0;

  const select = (q: Question, L: OptionLetter) => {
    if (answers[q.id]) return;
    const next = { ...answers, [q.id]: L };
    setAnswers(next);
    recordAttempts([{ qid: q.id, course: q.course, topic: q.topic, correct: L === q.answer, at: new Date().toISOString(), mode: "quiz", difficulty: q.difficulty }]);
    if (Object.keys(next).length === questions.length) {
      const s = questions.filter((x) => next[x.id] === x.answer).length;
      const all = storage.get<Record<string, { score: number; total: number; at: string }>>(KEYS.quizResults, {});
      storage.set(KEYS.quizResults, { ...all, [key]: { score: s, total: questions.length, at: new Date().toISOString() } });
    }
  };

  if (!questions.length) return <p className="text-sm text-muted">The quiz for this lesson is coming soon.</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
        <span>{questions.length} questions · instant feedback</span>
        {prev && <span>Last score: {prev.score}/{prev.total}</span>}
      </div>
      {questions.map((q, i) => (
        <QuestionCard key={q.id} q={q} index={i} total={questions.length} selected={answers[q.id]} revealed={!!answers[q.id]} onSelect={(L) => select(q, L)} />
      ))}
      {done && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-5">
          <p className="flex items-center gap-2 font-semibold"><Trophy className="h-5 w-5 text-highlight" /> You scored {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)</p>
          <Button variant="outline" onClick={() => setAnswers({})}><RotateCcw className="h-4 w-4" /> Retake quiz</Button>
        </div>
      )}
    </div>
  );
}
