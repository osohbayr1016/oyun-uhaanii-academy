import {
  Brain,
  Crown,
  Earth,
  Medal,
  Star,
  Trophy,
} from "lucide-react";
import type { HomeContent, HomeStats } from "../homePageData";

function fmt(n: number) {
  return n.toLocaleString("mn-MN");
}

const DEFAULT_TITLES = [
  "Сургалт",
  "Тэмцээнүүд",
  "Идэвхтэй бүртгэл",
  "Багш, удирдлага",
  "Бүтээгдэхүүн",
  "Ажилласан жил",
] as const;

const CARD_STYLES = [
  { wrap: "bg-blue-100", icon: "text-blue-600" },
  { wrap: "bg-green-100", icon: "text-green-600" },
  { wrap: "bg-purple-100", icon: "text-purple-600" },
  { wrap: "bg-yellow-100", icon: "text-yellow-500" },
  { wrap: "bg-pink-100", icon: "text-pink-500" },
  { wrap: "bg-indigo-100", icon: "text-indigo-500" },
];

const ICONS = [Earth, Brain, Medal, Trophy, Crown, Star];

function nz(n: number) {
  return Math.max(0, Number.isFinite(n) ? n : 0);
}

export default function OfficerBranchSection({
  homeContent,
  stats,
}: {
  homeContent: HomeContent;
  stats: HomeStats;
}) {
  const values = [
    nz(stats.courses),
    nz(stats.tournaments),
    nz(stats.enrollments),
    nz(stats.teachers),
    nz(stats.products),
    nz(stats.years),
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {homeContent.features_title || "ОФИЦЕР САЛБАРЫН АМЖИЛТ"}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {homeContent.features_subtitle ||
              "Салбарын үзүүлэлтүүдийг системийн өгөгдлөөс автоматаар тоолно."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {ICONS.map((Icon, i) => {
            const key = `feature_${i + 1}_title` as keyof HomeContent;
            const title =
              (homeContent[key] as string | undefined) || DEFAULT_TITLES[i];
            const style = CARD_STYLES[i];
            return (
              <div
                key={i}
                className="card-responsive text-center bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-all border border-gray-100"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${style.wrap}`}
                >
                  <Icon className={`w-8 h-8 ${style.icon}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-[30px] tabular-nums font-semibold text-[#550080]">
                  {fmt(values[i])}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
