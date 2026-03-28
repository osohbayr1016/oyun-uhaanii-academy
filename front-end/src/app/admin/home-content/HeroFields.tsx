"use client";

import type { HomeContent } from "./types";

export default function HeroFields({
  content,
  onChange,
}: {
  content: HomeContent;
  onChange: (key: keyof HomeContent, value: string) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Hero хэсэг</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Үндсэн гарчиг
          </label>
          <input
            type="text"
            value={content.hero_title || ""}
            onChange={(e) => onChange("hero_title", e.target.value)}
            placeholder="МОНГОЛЫН ОЮУН УХААНЫ АКАДЕМИ"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Дэд гарчиг
          </label>
          <textarea
            rows={3}
            value={content.hero_subtitle || ""}
            onChange={(e) => onChange("hero_subtitle", e.target.value)}
            placeholder="Оюуны өндөр чадамжтай дэлхийн иргэнийг бүтээлцэнэ..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
