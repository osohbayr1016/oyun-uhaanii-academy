"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type ClubContentItem = {
  id: string;
  key: string;
  value: string;
  type: string;
  section: string;
  order?: number;
  label?: string;
  description?: string;
  link?: string;
};

const fetchClubContent = async (): Promise<ClubContentItem[]> => {
  // TODO: Replace this with your actual token retrieval logic
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const res = await fetch("/api/club-content", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Failed to fetch club content");
  return res.json();
};

const getSection = (
  data: ClubContentItem[],
  section: string
): ClubContentItem[] =>
  data
    .filter((item: ClubContentItem) => item.section === section)
    .sort(
      (a: ClubContentItem, b: ClubContentItem) =>
        (a.order ?? 0) - (b.order ?? 0)
    );

const getValue = (data: ClubContentItem[], key: string): string => {
  const found = data.find((item: ClubContentItem) => item.key === key);
  return found ? found.value : "";
};

export default function ClubPage() {
  const [data, setData] = useState<ClubContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchClubContent()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="py-32 text-center text-lg">Уншиж байна...</div>;
  if (error)
    return <div className="py-32 text-center text-red-500">Алдаа: {error}</div>;

  // Hero section values
  const heroTitle = getValue(data, "hero_title");
  const heroMotto = getValue(data, "hero_motto");
  const heroMission = getValue(data, "hero_mission");
  const heroLogo = getValue(data, "hero_logo");
  const heroBg = getValue(data, "hero_bg_image");
  const statAthletes = getValue(data, "hero_stat_athletes");
  const statTypes = getValue(data, "hero_stat_types");
  const statCoaches = getValue(data, "hero_stat_coaches");

  // Requirements
  const requirements = getSection(data, "requirements");
  // Activities
  const activities = getSection(data, "activities");
  // Types
  const types = getSection(data, "types");
  // Awards
  const awardsIntl = getSection(data, "awards_international");
  const awardsDom = getSection(data, "awards_domestic");
  // Tournaments
  const tournaments = getSection(data, "tournaments");
  const tournamentsSection = getValue(data, "tournaments_section_title");
  const tournamentsDesc = getValue(data, "tournaments_section_desc");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative w-full min-h-[520px] flex items-center justify-center z-10 overflow-hidden pt-8">
        {/* Background image and overlay */}
        {heroBg && (
          <div className="absolute inset-0 w-full h-full z-0">
            <img
              src={heroBg}
              alt="Club Hero Background"
              className="w-full h-full object-cover object-center opacity-40"
              style={{ pointerEvents: "none", userSelect: "none" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-transparent" />
          </div>
        )}
        <div className="relative z-10 w-full container mx-auto px-4 py-16 sm:py-20 flex flex-col items-center text-center space-y-6">
          {heroLogo && (
            <Image
              src={heroLogo}
              alt="Клуб лого"
              width={120}
              height={120}
              className="mx-auto mb-4 rounded-full bg-white/80 p-2 border-2 border-[#550080]"
            />
          )}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight drop-shadow">
            {heroTitle}
          </h1>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-4">
            <div>
              <h3 className="text-xl font-bold text-[#550080] mb-2">
                Клубын уриа
              </h3>
              <p className="text-gray-700 text-lg">{heroMotto}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#550080] mb-2">
                Клубын зорилго
              </h3>
              <p className="text-gray-700 text-lg">{heroMission}</p>
            </div>
          </div>
          <div className="flex gap-8 justify-center mt-6">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-[#550080]">
                {statAthletes}
              </span>
              <span className="text-gray-600">Тамирчид</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-[#550080]">
                {statTypes}
              </span>
              <span className="text-gray-600">Төрөл</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-[#550080]">
                {statCoaches}
              </span>
              <span className="text-gray-600">Дасгалжуулагч</span>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Requirements Section */}
      <section className="container mx-auto px-4 pb-8">
        <div className="bg-gradient-to-r from-[#550080]/90 to-blue-500/80 rounded-xl shadow-lg p-8 flex flex-col items-center text-white border-2 border-[#550080]">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center drop-shadow">
            КЛУБИЙН ГИШҮҮН БОЛОХ ШААРДЛАГА
          </h2>
          <ul className="space-y-3 w-full max-w-lg">
            {requirements.map((req: ClubContentItem) => (
              <li key={req.key} className="flex items-center gap-3 text-lg">
                <span className="inline-block w-6 h-6 bg-white/30 rounded-full items-center justify-center border border-white mr-2">
                  ✔️
                </span>
                {req.value}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Awards Section */}
      <section className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* International Awards */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#550080] mb-4 text-center md:text-left">
              Олон улсын шагналууд
            </h2>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {awardsIntl.map((award: ClubContentItem) => (
                <div
                  key={award.key}
                  className="min-w-[220px] bg-white rounded-xl shadow p-4 flex-shrink-0 flex flex-col items-center"
                >
                  {award.type === "image" && award.value && (
                    <img
                      src={award.value}
                      alt={award.key}
                      className="w-16 h-16 object-cover rounded-full mb-2"
                    />
                  )}
                  <div className="font-bold text-[#550080] mb-1">
                    {award.label || award.key}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {award.description || award.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Domestic Awards */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#550080] mb-4 text-center md:text-left">
              Дотоодын шагналууд
            </h2>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {awardsDom.map((award: ClubContentItem) => (
                <div
                  key={award.key}
                  className="min-w-[220px] bg-white rounded-xl shadow p-4 flex-shrink-0 flex flex-col items-center"
                >
                  {award.type === "image" && award.value && (
                    <img
                      src={award.value}
                      alt={award.key}
                      className="w-16 h-16 object-cover rounded-full mb-2"
                    />
                  )}
                  <div className="font-bold text-[#550080] mb-1">
                    {award.label || award.key}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {award.description || award.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regular Tournaments Section */}
      <section className="container mx-auto px-4 pb-8 mt-20">
        <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#550080] mb-4 text-center">
            {tournamentsSection}
          </h2>
          <p className="text-gray-700 text-lg mb-6 text-center max-w-2xl">
            {tournamentsDesc}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {tournaments.map((t: ClubContentItem) => (
              <div
                key={t.key}
                className="bg-blue-50 rounded-lg p-6 flex flex-col items-center shadow"
              >
                <div className="font-bold text-[#550080] text-lg mb-2">
                  {t.label || t.key}
                </div>
                <div className="text-gray-700 mb-1">{t.value}</div>
                {t.link && (
                  <a
                    href={t.link}
                    className="text-blue-600 hover:underline mt-2"
                  >
                    Дэлгэрэнгүй
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
          КЛУБЫН ҮЙЛ АЖИЛЛАГАА
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((activity: ClubContentItem) => (
            <div
              key={activity.key}
              className="bg-white rounded-xl shadow p-6 text-center"
            >
              {activity.type === "image" && activity.value && (
                <img
                  src={activity.value}
                  alt={activity.label || activity.key}
                  className="w-24 h-24 object-cover rounded-full border-4 border-[#550080] bg-gray-100 mb-4 mx-auto"
                />
              )}
              <h3 className="text-xl font-semibold text-[#550080] mb-2">
                {activity.label || activity.key}
              </h3>
              <p className="text-gray-600">
                {activity.description || activity.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Club Types Section */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#550080] mb-8 text-center">
          КЛУБИЙН ТӨРЛҮҮД
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {types.map((type: ClubContentItem) => (
            <div
              key={type.key}
              className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center"
            >
              {type.type === "image" && type.value && (
                <img
                  src={type.value}
                  alt={type.label || type.key}
                  className="w-16 h-16 mb-3"
                />
              )}
              <div className="font-semibold text-[#550080] text-lg mb-1">
                {type.label || type.key}
              </div>
              <div className="text-gray-600 text-sm">
                {type.description || type.value}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
