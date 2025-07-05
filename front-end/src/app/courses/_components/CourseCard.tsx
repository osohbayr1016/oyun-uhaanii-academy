import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: number;
  currency: string;
  imageUrl: string;
  instructor: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={course.imageUrl}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {course.title}
          </h3>
          <p className="text-gray-600 text-sm">{course.description}</p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>👨‍🏫 {course.instructor}</span>
          <span>⏱️ {course.duration}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {course.level}
          </span>
          <span className="text-lg font-bold text-gray-900">
            {course.price.toLocaleString()} {course.currency}
          </span>
        </div>

        <Link
          href={`/courses/${course.id}`}
          className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Сургалтад бүртгүүлэх
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
