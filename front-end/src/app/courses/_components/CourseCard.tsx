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
          <h3 className="text-[40px] font-black text-gray-900 mb-2 leading-tight">
            {course.title}
          </h3>
          <p className="text-base text-gray-700 mb-6">{course.description}</p>
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
