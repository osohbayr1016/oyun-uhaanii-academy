import React from "react";
import CourseCard from "./_components/CourseCard";

const sampleCourses = [
  {
    title: "Ой тогтоолт",
    description: "",
    image: "/courses/python-kids.jpg",
    href: "/courses/rubikcube",
  },
  {
    title: "Түргэн бодолт",
    description: "",
    image: "/courses/art-class.jpg",
    href: "/courses/memory",
  },
  {
    title: "Memory and Math skills",
    description: "Гарын доорх материалаар бүтээл хийх сургалт.",
    image: "/courses/art-class.jpg",
    href: "/courses/memory",
  },
  {
    title: "Mind Games",
    description: "7-12 насны хүүхдүүдэд зориулсан Python хичээл.",
    image: "/courses/python-kids.jpg",
    href: "/courses/rubikcube",
  },
  {
    title: "Хуруундай",
    description: "Гарын доорх материалаар бүтээл хийх сургалт.",
    image: "/courses/art-class.jpg",
    href: "/courses/memory",
  },
  {
    title: "Рубик шоо",
    description: "Гарын доорх материалаар бүтээл хийх сургалт.",
    image: "/courses/art-class.jpg",
    href: "/courses/memory",
  },
  {
    title: "Хүрд",
    description: "7-12 насны хүүхдүүдэд зориулсан Python хичээл.",
    image: "/courses/python-kids.jpg",
    href: "/courses/rubikcube",
  },
  {
    title: "Хурдан уншлага",
    description: "Гарын доорх материалаар бүтээл хийх сургалт.",
    image: "/courses/art-class.jpg",
    href: "/courses/memory",
  },
  {
    title: "Англи үг",
    description: "Гарын доорх материалаар бүтээл хийх сургалт.",
    image: "/courses/art-class.jpg",
    href: "/courses/memory",
  },
  {
    title: "Ки мастер",
    description: "Гарын доорх материалаар бүтээл хийх сургалт.",
    image: "/courses/art-class.jpg",
    href: "/courses/memory",
  },
];

const CoursesPage = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-gray-900">
          Сургалтын төрлүүд
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {sampleCourses.map((course, idx) => (
            <CourseCard key={idx} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesPage;
