"use client";

import { useMemo, useState } from "react";
import CourseCard from "./_components/CourseCard";
import CoursesFilters from "./CoursesFilters";
import { useHydrateCoursesData } from "./useHydrateCoursesData";

export type Course = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  currency: string;
  duration: string;
  level: string;
  levels: string[];
  category?: string | null;
};

export default function CoursesClient({
  courses,
  categories,
  levels,
}: {
  courses: Course[];
  categories: string[];
  levels: string[];
}) {
  const {
    courses: list,
    categories: catList,
    levels: levList,
    hydrating,
  } = useHydrateCoursesData(courses, categories, levels);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const filteredCourses = useMemo(() => {
    return (list || []).filter((course) => {
      const categoryMatch =
        selectedCategory === "all" ||
        (course.category != null && course.category === selectedCategory);
      const levelsList = course.levels ?? [];
      const levelMatch =
        selectedLevels.length === 0 ||
        selectedLevels.some(
          (selectedLevel) =>
            levelsList.includes(selectedLevel) ||
            course.level === selectedLevel
        );
      return categoryMatch && levelMatch;
    });
  }, [list, selectedCategory, selectedLevels]);

  return (
    <div className="bg-gray-50">
      <main className="container mx-auto px-4 py-8 sm:py-12">
        {hydrating && list.length === 0 && (
          <p className="text-center text-gray-600 py-4">Ачаалж байна…</p>
        )}
        <section className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            СУРГАЛТУУД
          </h1>
        </section>

        <CoursesFilters
          categories={catList}
          levels={levList}
          selectedCategory={selectedCategory}
          selectedLevels={selectedLevels}
          onCategoryChange={setSelectedCategory}
          onToggleLevel={(level, checked) => {
            if (checked) setSelectedLevels((s) => [...s, level]);
            else setSelectedLevels((s) => s.filter((l) => l !== level));
          }}
          onClearLevels={() => setSelectedLevels([])}
        />

        <section className="flex flex-col gap-6 sm:gap-8">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Курс олдсонгүй
              </h3>
              <p className="text-gray-600">
                Сонгосон шүүлтүүрт тохирох курс байхгүй байна. Шүүлтүүрээ
                өөрчилж үзнэ үү.
              </p>
            </div>
          ) : (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          )}
        </section>
      </main>
    </div>
  );
}
