export interface Attempt {
  qid: string;
  course: string;
  topic: string;
  correct: boolean;
  at: string; // ISO timestamp
  mode: "practice" | "timed" | "quiz" | "mock";
  timeMs?: number;
  difficulty?: string;
}

export interface TopicStat {
  course: string;
  topic: string;
  attempted: number;
  correct: number;
  accuracy: number; // 0..1
}

/** Accuracy per topic, using each question's most recent attempt only. */
export function topicStats(attempts: Attempt[], latestOnly = true): TopicStat[] {
  const list = latestOnly ? latestAttempts(attempts) : attempts;
  const map = new Map<string, TopicStat>();
  for (const a of list) {
    const k = `${a.course}|${a.topic}`;
    const s = map.get(k) ?? { course: a.course, topic: a.topic, attempted: 0, correct: 0, accuracy: 0 };
    s.attempted++;
    if (a.correct) s.correct++;
    map.set(k, s);
  }
  return [...map.values()].map((s) => ({ ...s, accuracy: s.attempted ? s.correct / s.attempted : 0 }));
}

export function latestAttempts(attempts: Attempt[]): Attempt[] {
  const m = new Map<string, Attempt>();
  for (const a of attempts) {
    const prev = m.get(a.qid);
    if (!prev || prev.at <= a.at) m.set(a.qid, a);
  }
  return [...m.values()];
}

/** Topics below `threshold` accuracy with at least `minAttempts`, weakest first. */
export function weakTopics(attempts: Attempt[], threshold = 0.65, minAttempts = 3): TopicStat[] {
  return topicStats(attempts)
    .filter((s) => s.attempted >= minAttempts && s.accuracy < threshold)
    .sort((a, b) => a.accuracy - b.accuracy);
}

/** Question ids whose latest attempt was incorrect. */
export function incorrectIds(attempts: Attempt[]): string[] {
  return latestAttempts(attempts)
    .filter((a) => !a.correct)
    .map((a) => a.qid);
}
