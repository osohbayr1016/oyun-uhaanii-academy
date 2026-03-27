import CoursesClient, { type Course } from "./CoursesClient";
import { serverFetchJson } from "@/lib/api";

export const revalidate = 300;

type FilterRow = { name: string };

export default async function CoursesPage() {
  let courses: Course[] = [];
  let categories: FilterRow[] = [];
  let levels: FilterRow[] = [];

  try {
    const result = await Promise.all([
      serverFetchJson<Course[]>("/api/courses", { revalidateSeconds: 300 }),
      serverFetchJson<FilterRow[]>("/api/course-filters/categories", {
        revalidateSeconds: 600,
      }),
      serverFetchJson<FilterRow[]>("/api/course-filters/levels", {
        revalidateSeconds: 600,
      }),
    ]);
    courses = result[0];
    categories = result[1];
    levels = result[2];
  } catch (err) {
    console.error("[courses] prerender fetch failed:", err);
  }

  return (
    <CoursesClient
      courses={courses}
      categories={["all", ...categories.map((c) => c.name)]}
      levels={["all", ...levels.map((l) => l.name)]}
    />
  );
}
