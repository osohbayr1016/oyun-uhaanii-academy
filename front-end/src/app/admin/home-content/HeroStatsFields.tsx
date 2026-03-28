"use client";

import type { HomeContent } from "./types";

const FIELDS: { key: keyof HomeContent; label: string; placeholder: string }[] = [
  { key: "hero_stats_courses", label: "Сургалтын тоо", placeholder: "10+" },
  { key: "hero_stats_students", label: "Сурагчдын тоо", placeholder: "3000+" },
  { key: "hero_stats_teachers", label: "Багш нарын тоо", placeholder: "10+" },
  { key: "hero_stats_years", label: "Жилийн тоо", placeholder: "5+" },
];

export default function HeroStatsFields({
  content,
  onChange,
}: {
  content: HomeContent;
  onChange: (key: keyof HomeContent, value: string) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Статистик тоонууд
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FIELDS.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {label}
            </label>
            <input
              type="text"
              value={(content[key] as string) || ""}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
