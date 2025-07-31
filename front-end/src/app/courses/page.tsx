"use client";

import { useState, useEffect } from "react";
import CourseCard from "./_components/CourseCard";
import axios from "axios";

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  currency: string;
  duration: string;
  level: string;
  category: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  useEffect(() => {
    fetchCourses();
    fetchCategories();
    fetchLevels();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/api/courses");
      setCourses(response.data);
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/course-filters/categories");
      const categoryNames = response.data.map((cat: any) => cat.name);
      setCategories(["all", ...categoryNames]);
    } catch (err: any) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchLevels = async () => {
    try {
      const response = await axios.get("/api/course-filters/levels");
      const levelNames = response.data.map((level: any) => level.name);
      setLevels(["all", ...levelNames]);
    } catch (err: any) {
      console.error("Error fetching levels:", err);
    }
  };

  // Example POST request using Axios
  const postCourse = async (newCourse: Omit<Course, "id">) => {
    try {
      const response = await axios.post("/api/courses", newCourse);
      // Optionally update state or refetch courses
      return response.data;
    } catch (err: any) {
      // Handle error
      throw err;
    }
  };

  const [categories, setCategories] = useState<string[]>(["all"]);
  const [levels, setLevels] = useState<string[]>(["all"]);

  const filteredCourses = courses.filter((course) => {
    const categoryMatch =
      selectedCategory === "all" || course.category === selectedCategory;
    const levelMatch =
      selectedLevel === "all" || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">уншиж байна...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Алдаа гарлаа: {error}</p>
          <button
            onClick={fetchCourses}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Дахин оролдох
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <section className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            СУРГАЛТУУД
          </h1>
        </section>

        {/* Filter Controls */}
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
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "Бүгд" : category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Түвшин
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level === "all" ? "Бүгд" : level}
                    </option>
                  ))}
                </select>
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
