"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Course } from "./CoursesClient";

export function useHydrateCoursesData(
  courses: Course[],
  categories: string[],
  levels: string[]
) {
  const pathname = usePathname();
  const [coursesState, setCourses] = useState(courses);
  const [categoriesState, setCategories] = useState(categories);
  const [levelsState, setLevels] = useState(levels);
  const [hydrating, setHydrating] = useState(false);
  const [refetchKey, setRefetchKey] = useState(0);

  useEffect(() => {
    setCourses(courses);
    setCategories(categories);
    setLevels(levels);
  }, [courses, categories, levels]);

  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setRefetchKey((k) => k + 1);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  useEffect(() => {
    if (pathname !== "/courses") return;
    if (courses.length > 0) return;

    let cancelled = false;
    (async () => {
      setHydrating(true);
      try {
        const [c, catRows, levRows] = await Promise.all([
          fetch("/api/courses", { cache: "no-store" }).then((r) =>
            r.ok ? r.json() : []
          ),
          fetch("/api/course-filters/categories", { cache: "no-store" }).then(
            (r) => (r.ok ? r.json() : [])
          ),
          fetch("/api/course-filters/levels", { cache: "no-store" }).then((r) =>
            r.ok ? r.json() : []
          ),
        ]);
        if (cancelled) return;
        const catArr = Array.isArray(catRows) ? catRows : [];
        const levArr = Array.isArray(levRows) ? levRows : [];
        setCourses(Array.isArray(c) ? c : []);
        setCategories([
          "all",
          ...catArr.map((x: { name: string }) => x.name),
        ]);
        setLevels(["all", ...levArr.map((x: { name: string }) => x.name)]);
      } finally {
        if (!cancelled) setHydrating(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [courses.length, pathname, refetchKey]);

  return {
    courses: coursesState,
    categories: categoriesState,
    levels: levelsState,
    hydrating,
  };
}
