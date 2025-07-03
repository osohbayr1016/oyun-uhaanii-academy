import Header from "@/app/_components/Header";
import React from "react";

type CourseCardProps = {
  title: string;
  description: string;
  image: string;
  href: string;
};

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  image,
  href,
}) => {
  return (
    <a
      href={href}
      className="group block rounded-xl border border-gray-200 hover:shadow-xl transition overflow-hidden bg-white"
    >
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="p-5 space-y-2">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition">
          {title}
        </h3>
        <p className="text-sm text-gray-600">{description}</p>
        <span className="text-blue-600 text-sm font-medium hover:underline">
          Дэлгэрэнгүй
        </span>
      </div>
    </a>
  );
};

export default CourseCard;
