import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Course {
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
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="w-full bg-white rounded-xl shadow-md flex flex-col md:flex-row overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative w-full md:w-1/3 aspect-video">
        <Image
          src={
            course.imageUrl && course.imageUrl.trim() !== ""
              ? course.imageUrl
              : "/default-course.png"
          }
          alt={course.title}
          fill
          // width={200}
          // height={200}
          className="object-cover bg-gray-100"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/default-course.png";
          }}
        />
      </div>
      <div className="flex-1 flex flex-col justify-between p-6">
        <div>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-2 leading-tight">
            {course.title}
          </h3>
          <p className="text-base text-gray-700 mb-4">{course.description}</p>
          {course.levels && course.levels.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {course.levels.map((level, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium"
                  >
                    {level}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <Link
            href={`/courses/${course.id}`}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Дэлгэрэнгүй
          </Link>
        </div>
      </div>
    </div>
  );
}
