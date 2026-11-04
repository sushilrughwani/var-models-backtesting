import { Suspense } from "react";
import type { Metadata } from "next";
import { getCourseSummaries } from "@/lib/data";
import { Container } from "@/components/ui/Section";
import { CourseCatalog } from "@/components/course/CourseCatalog";

export const metadata: Metadata = { title: "Courses", description: "CFA®, FRM® and finance skills courses." };

export default async function CoursesPage() {
  const courses = await getCourseSummaries();
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Course catalog</h1>
      <p className="mt-2 max-w-2xl text-muted">Professional exam preparation and practical finance skills. Every course includes free preview lessons.</p>
      <div className="mt-8">
        <Suspense>
          <CourseCatalog courses={courses} />
        </Suspense>
      </div>
    </Container>
  );
}
