"use client";

import { useMemo, useState } from "react";
import CourseCard from "./_components/CourseCard";

type Course = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  currency: string;
  duration: string;
  level: string;
  levels: string[];
  category: string;
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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const filteredCourses = useMemo(() => {
    return (courses || []).filter((course) => {
      const categoryMatch =
        selectedCategory === "all" || course.category === selectedCategory;
      const levelMatch =
        selectedLevels.length === 0 ||
        selectedLevels.some(
          (selectedLevel) =>
            (course.levels && course.levels.includes(selectedLevel)) ||
            course.level === selectedLevel
        );
      return categoryMatch && levelMatch;
    });
  }, [courses, selectedCategory, selectedLevels]);

  return (
    <div className="bg-gray-50">
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <section className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            СУРГАЛТУУД
          </h1>
        </section>

        <section className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Шүүлтүүр
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ангилал
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {(categories || []).map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "Бүгд" : category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Нас
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {(levels || [])
                    .filter((level) => level !== "all")
                    .map((level) => (
                      <label key={level} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedLevels.includes(level)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedLevels([...selectedLevels, level]);
                            } else {
                              setSelectedLevels(
                                selectedLevels.filter((l) => l !== level)
                              );
                            }
                          }}
                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">{level}</span>
                      </label>
                    ))}
                  {selectedLevels.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedLevels([])}
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      Бүх түвшинг цуцлах
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

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
