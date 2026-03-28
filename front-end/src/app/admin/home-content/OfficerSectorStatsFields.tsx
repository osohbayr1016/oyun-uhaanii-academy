"use client";

export type OfficerSectorStatsValues = {
  courses: number;
  tournaments: number;
  enrollments: number;
  teachers: number;
  products: number;
  years: number;
};

const FIELDS: { key: keyof OfficerSectorStatsValues; label: string }[] = [
  { key: "courses", label: "Сургалт" },
  { key: "tournaments", label: "Тэмцээн" },
  { key: "enrollments", label: "Бүртгэл" },
  { key: "teachers", label: "Багш/удирдлага" },
  { key: "products", label: "Бүтээгдэхүүн" },
  { key: "years", label: "Ажилласан жил" },
];

export default function OfficerSectorStatsFields({
  value,
  onChange,
}: {
  value: OfficerSectorStatsValues;
  onChange: (next: OfficerSectorStatsValues) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        ОФИЦЕР САЛБАРЫН АМЖИЛТ — тоонууд
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Эдгээр тоонууд өгөгдлийн санд тусдаа хүснэгтэд хадгалагдаж, нүүр хуудсанд
        харагдана. Хамгийн багадаа 1 (0 боломжгүй).
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FIELDS.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              type="number"
              min={1}
              step={1}
              value={value[key]}
              onChange={(e) => {
                const n = parseInt(e.target.value, 10);
                onChange({
                  ...value,
                  [key]: Number.isFinite(n) ? Math.max(1, n) : 1,
                });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
