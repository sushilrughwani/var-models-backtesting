"use client";

import { useEffect } from "react";
import { Bookmark, BookmarkCheck, CheckCircle2, Circle } from "lucide-react";
import { KEYS, storage } from "@/lib/storage";
import { recordActivity, setLastLesson, setLessonComplete, type Bookmark as BM } from "@/lib/learning/state";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useBookmarks, useProgress } from "./useLearner";

export function LessonActions({ course, courseTitle, lesson, title }: { course: string; courseTitle: string; lesson: string; title: string }) {
  const [progress] = useProgress();
  const [bookmarks] = useBookmarks();
  const { toast } = useToast();
  const done = !!progress[course]?.[lesson];
  const marked = bookmarks.some((b) => b.course === course && b.lesson === lesson);
  useEffect(() => {
    setLastLesson(course, lesson, title);
    recordActivity();
  }, [course, lesson, title]);
  const toggleBookmark = () => {
    const all = storage.get<BM[]>(KEYS.bookmarks, []);
    if (marked) storage.set(KEYS.bookmarks, all.filter((b) => !(b.course === course && b.lesson === lesson)));
    else storage.set(KEYS.bookmarks, [...all, { course, lesson, title, courseTitle, at: new Date().toISOString() }]);
    toast({ title: marked ? "Bookmark removed" : "Lesson bookmarked", tone: "info" });
  };
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant={done ? "accent" : "primary"} onClick={() => { setLessonComplete(course, lesson, !done); if (!done) toast({ title: "Lesson completed", description: "Nice work — keep the streak going.", tone: "success" }); }}>
        {done ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />} {done ? "Completed" : "Mark complete"}
      </Button>
      <Button variant="outline" onClick={toggleBookmark} aria-pressed={marked}>
        {marked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />} {marked ? "Bookmarked" : "Bookmark"}
      </Button>
    </div>
  );
}
