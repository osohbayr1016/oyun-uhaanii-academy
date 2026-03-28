"use client";

type Props = {
  categories: string[];
  levels: string[];
  selectedCategory: string;
  selectedLevels: string[];
  onCategoryChange: (v: string) => void;
  onToggleLevel: (level: string, checked: boolean) => void;
  onClearLevels: () => void;
};

export default function CoursesFilters({
  categories,
  levels,
  selectedCategory,
  selectedLevels,
  onCategoryChange,
  onToggleLevel,
  onClearLevels,
}: Props) {
  return (
    <section className="mb-8">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Шүүлтүүр</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ангилал
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {(categories || []).map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "Бүгд" : category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Нас
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {(levels || [])
                .filter((level) => level !== "all")
                .map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedLevels.includes(level)}
                      onChange={(e) => onToggleLevel(level, e.target.checked)}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{level}</span>
                  </label>
                ))}
              {selectedLevels.length > 0 && (
                <button
                  type="button"
                  onClick={onClearLevels}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Бүх түвшинг цуцлах
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
