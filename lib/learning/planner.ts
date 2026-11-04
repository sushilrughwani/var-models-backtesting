/**
 * Study planner: turns a course curriculum, an exam date and weekly hours into a week-by-week plan.
 */
import { addDays, diffDays } from "./dates";

export interface PlannerLesson {
  slug: string;
  title: string;
  moduleTitle: string;
  duration: number; // video minutes
}

export interface PlanWeek {
  week: number;
  start: string;
  end: string;
  kind: "learn" | "revision";
  lessons: PlannerLesson[];
  /** Planned study hours for the week. */
  hours: number;
  focus: string;
}

export interface Plan {
  weeks: PlanWeek[];
  totalStudyHours: number;
  availableHours: number;
  /** Multiplier applied to video minutes to include reading, notes and practice. */
  studyMultiplier: number;
  feasible: boolean;
  message: string;
}

/** Each minute of video needs roughly this many minutes of total study (video + notes + practice). */
export const STUDY_MULTIPLIER = 4;

export function buildPlan(opts: {
  lessons: PlannerLesson[];
  startDate: string; // YYYY-MM-DD
  examDate: string;
  hoursPerWeek: number;
  multiplier?: number;
}): Plan {
  const multiplier = opts.multiplier ?? STUDY_MULTIPLIER;
  const days = diffDays(opts.examDate, opts.startDate);
  const totalWeeks = Math.max(1, Math.ceil(days / 7));
  const hpw = Math.max(1, opts.hoursPerWeek);
  const lessonHours = opts.lessons.map((l) => (l.duration * multiplier) / 60);
  const totalStudyHours = lessonHours.reduce((a, b) => a + b, 0);
  if (days <= 0) {
    return {
      weeks: [],
      totalStudyHours,
      availableHours: 0,
      studyMultiplier: multiplier,
      feasible: false,
      message: "The exam date must be after the start date.",
    };
  }
  // Reserve ~15% of the weeks (1-4 weeks) for revision and mock exams.
  const revisionWeeks = totalWeeks >= 4 ? Math.min(4, Math.max(1, Math.round(totalWeeks * 0.15))) : 0;
  const learnWeeks = totalWeeks - revisionWeeks;
  const learnCapacity = learnWeeks * hpw;
  const feasible = learnCapacity >= totalStudyHours;
  // If not feasible, spread lessons evenly over the learning weeks (compressed plan).
  const perWeekTarget = feasible ? hpw : totalStudyHours / Math.max(1, learnWeeks);

  const weeks: PlanWeek[] = [];
  let i = 0;
  for (let w = 0; w < learnWeeks; w++) {
    const start = addDays(opts.startDate, w * 7);
    const end = addDays(start, 6);
    const items: PlannerLesson[] = [];
    let hours = 0;
    while (i < opts.lessons.length && (items.length === 0 || hours + lessonHours[i] <= perWeekTarget + 1e-9)) {
      items.push(opts.lessons[i]);
      hours += lessonHours[i];
      i++;
    }
    // Last learning week takes any remainder.
    if (w === learnWeeks - 1) {
      while (i < opts.lessons.length) {
        items.push(opts.lessons[i]);
        hours += lessonHours[i];
        i++;
      }
    }
    const modules = [...new Set(items.map((l) => l.moduleTitle))];
    weeks.push({
      week: w + 1,
      start,
      end,
      kind: "learn",
      lessons: items,
      hours: Math.round(hours * 10) / 10,
      focus: items.length ? modules.join(" + ") : "Catch-up and question bank practice",
    });
  }
  for (let r = 0; r < revisionWeeks; r++) {
    const w = learnWeeks + r;
    const start = addDays(opts.startDate, w * 7);
    weeks.push({
      week: w + 1,
      start,
      end: addDays(start, 6),
      kind: "revision",
      lessons: [],
      hours: hpw,
      focus:
        r === revisionWeeks - 1
          ? "Final review: formula sheet, flashcards, weak topics, light practice"
          : `Revision + full mock exam ${r + 1}, then review every incorrect answer`,
    });
  }
  return {
    weeks,
    totalStudyHours: Math.round(totalStudyHours),
    availableHours: totalWeeks * hpw,
    studyMultiplier: multiplier,
    feasible,
    message: feasible
      ? `Plan fits: about ${Math.round(totalStudyHours)} hours of lessons across ${learnWeeks} learning weeks, plus ${revisionWeeks} revision week(s).`
      : `Tight schedule: the lessons need about ${Math.round(totalStudyHours)} hours but ${learnWeeks} learning weeks × ${hpw} h = ${learnCapacity} h. The plan below is compressed — consider increasing weekly hours to about ${Math.ceil(totalStudyHours / Math.max(1, learnWeeks))} h.`,
  };
}
