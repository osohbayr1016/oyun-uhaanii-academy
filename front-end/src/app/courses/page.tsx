import CoursesClient, { type Course } from "./CoursesClient";
import { serverFetchJson } from "@/lib/api";

export const dynamic = "force-dynamic";

type FilterRow = { name: string };

const noStore = {
  cache: "no-store" as const,
};

export default async function CoursesPage() {
  const [courses, categories, levels] = await Promise.all([
    serverFetchJson<Course[]>("/api/courses", {
      ...noStore,
      fallbackOnError: [],
    }),
    serverFetchJson<FilterRow[]>("/api/course-filters/categories", {
      ...noStore,
      fallbackOnError: [],
    }),
    serverFetchJson<FilterRow[]>("/api/course-filters/levels", {
      ...noStore,
      fallbackOnError: [],
    }),
  ]);

  return (
    <CoursesClient
      courses={courses}
      categories={["all", ...categories.map((c) => c.name)]}
      levels={["all", ...levels.map((l) => l.name)]}
    />
  );
}
