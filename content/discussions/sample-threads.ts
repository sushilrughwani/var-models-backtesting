import type { DiscussionThread } from "@/lib/data/types";

/**
 * SAMPLE discussion threads shown on every lesson so the Q&A UI can be reviewed.
 * They are clearly labelled as samples in the UI.
 * INTEGRATION: replace with real threads loaded from the discussion backend.
 */
export function sampleThreads(courseSlug: string, lessonSlug: string): DiscussionThread[] {
  return [
    {
      id: `${courseSlug}-${lessonSlug}-t1`,
      lessonSlug,
      author: "Sample Student A",
      role: "student",
      title: "Is there a quick way to check my answer on the calculator?",
      body: "In the worked example I got a slightly different number in the last decimal. Is that a rounding issue or did I set something up wrong?",
      createdAt: "2026-10-12T09:30:00Z",
      replies: [
        {
          id: "r1",
          author: "[INSTRUCTOR NAME]",
          role: "instructor",
          body: "Good question. Small differences in the last decimal are almost always rounding of intermediate steps. Keep full precision in the calculator memory until the final step and you will match exactly.",
          createdAt: "2026-10-12T14:05:00Z",
        },
      ],
      sample: true,
    },
    {
      id: `${courseSlug}-${lessonSlug}-t2`,
      lessonSlug,
      author: "Sample Student B",
      role: "student",
      title: "How often does this concept appear in the exam?",
      body: "Should I spend extra time on this lesson, or is a basic understanding enough?",
      createdAt: "2026-10-15T18:10:00Z",
      replies: [],
      sample: true,
    },
  ];
}
