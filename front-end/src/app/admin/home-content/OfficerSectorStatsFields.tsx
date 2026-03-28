"use client";

export type OfficerSectorStatsValues = {
  courses: number;
  tournaments: number;
  enrollments: number;
  teachers: number;
  products: number;
  years: number;
};

type StatKey = keyof OfficerSectorStatsValues;
export type LabelKey = `feature_${1 | 2 | 3 | 4 | 5 | 6}_title`;
export type OfficerCardLabels = Partial<Record<LabelKey, string>>;

const STAT_KEYS: StatKey[] = [
  "courses",
  "tournaments",
  "enrollments",
  "teachers",
  "products",
  "years",
];
const LABEL_KEYS: LabelKey[] = [
  "feature_1_title",
  "feature_2_title",
  "feature_3_title",
  "feature_4_title",
  "feature_5_title",
  "feature_6_title",
];
const DEFAULT_LABELS = [
  "Сургалт",
  "Тэмцээнүүд",
  "Идэвхтэй бүртгэл",
  "Багш, удирдлага",
  "Бүтээгдэхүүн",
  "Ажилласан жил",
];

export default function OfficerSectorStatsFields({
  values,
  labels,
  onValueChange,
  onLabelChange,
}: {
  values: OfficerSectorStatsValues;
  labels: OfficerCardLabels;
  onValueChange: (next: OfficerSectorStatsValues) => void;
  onLabelChange: (key: LabelKey, value: string) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        ОФИЦЕР САЛБАРЫН АМЖИЛТ — карт засах
      </h2>
      <p className="text-sm text-gray-500 mb-5">
        Картын гарчиг болон тоог хамт засна. Тоон оролтод сум харагдахгүй.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STAT_KEYS.map((key, i) => (
          <div
            key={key}
            className="border border-gray-200 rounded-lg p-4 space-y-3"
          >
            <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
              Карт {i + 1}
            </p>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Гарчиг
              </label>
              <input
                type="text"
                value={labels[LABEL_KEYS[i]] ?? ""}
                onChange={(e) => onLabelChange(LABEL_KEYS[i], e.target.value)}
                placeholder={DEFAULT_LABELS[i]}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Тоо
              </label>
              <input
                type="number"
                min={0}
                step={1}
                value={values[key]}
                onChange={(e) => {
                  const n = parseInt(e.target.value, 10);
                  onValueChange({
                    ...values,
                    [key]: Number.isFinite(n) ? Math.max(0, n) : 0,
                  });
                }}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
