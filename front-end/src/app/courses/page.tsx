import CoursesClient from "./CoursesClient";
import { serverFetchJson } from "@/lib/api";

export const revalidate = 300;

export default async function CoursesPage() {
  const [courses, categories, levels] = await Promise.all([
    serverFetchJson<any[]>("/api/courses", { revalidateSeconds: 300 }),
    serverFetchJson<any[]>("/api/course-filters/categories", {
      revalidateSeconds: 600,
    }),
    serverFetchJson<any[]>("/api/course-filters/levels", {
      revalidateSeconds: 600,
    }),
  ]);

  return (
    <CoursesClient
      courses={courses}
      categories={["all", ...categories.map((c: any) => c.name)]}
      levels={["all", ...levels.map((l: any) => l.name)]}
    />
  );
}
