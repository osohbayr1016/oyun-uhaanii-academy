"use client";

import React, { useEffect, useState } from "react";

type CourseType = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const AdminCourses = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    // Fetch from backend (replace with your API)
    fetch("/api/admin/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Сургалтын жагсаалт</h1>
      <a
        href="/admin/courses/new"
        className="mb-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ➕ Шинэ хичээл нэмэх
      </a>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border p-4 rounded-xl bg-white shadow-sm"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-40 w-full object-cover rounded-md"
            />
            <h3 className="mt-2 text-lg font-semibold">{course.title}</h3>
            <p className="text-sm text-gray-600">{course.description}</p>
            <div className="mt-4 flex gap-2">
              <button className="text-blue-600 hover:underline">Засах</button>
              <button className="text-red-600 hover:underline">Устгах</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;
