"use client";

import { useMemo, useState } from "react";
import ProductsList from "./ProductsList";
import { useHydrateProductsData, type Product } from "./useHydrateProductsData";

const CATEGORIES = [
  "Кимастер",
  "Рубик шоо",
  "Спорт өрөлт",
  "Ном сурах бичиг",
  "Бэкгамон",
  "Бусад",
];

export default function ProductsClient({ products }: { products: Product[] }) {
  const { products: list, hydrating } = useHydrateProductsData(products);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000000,
  });

  const filteredProducts = useMemo(() => {
    let filtered = list || [];
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    filtered = filtered.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );
    return filtered;
  }, [list, selectedCategory, priceRange]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  const handlePriceRangeChange = (type: "min" | "max", value: string) => {
    const numValue =
      value === "" ? (type === "min" ? 0 : 1000000) : parseInt(value);
    setPriceRange((prev) => ({ ...prev, [type]: numValue }));
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange({ min: 0, max: 1000000 });
  };

  return (
    <div className="bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {hydrating && list.length === 0 && (
          <p className="text-center text-gray-600 py-4">Ачаалж байна…</p>
        )}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            СУРГАЛТЫН ХЭРЭГЛЭГДЭХҮҮН
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Та эдгээр бүтээгдэхүүнүүдийг зөвхөн салбар дээрээс авах боломжтой.
          </p>
        </section>

        <section className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Шүүлтүүр
              </h3>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Ангилал:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategoryChange(category)}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        selectedCategory === category
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Үнийн хязгаар:
                </h4>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Min:</label>
                    <input
                      type="number"
                      value={priceRange.min === 0 ? "" : priceRange.min}
                      onChange={(e) =>
                        handlePriceRangeChange("min", e.target.value)
                      }
                      className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Max:</label>
                    <input
                      type="number"
                      value={priceRange.max === 1000000 ? "" : priceRange.max}
                      onChange={(e) =>
                        handlePriceRangeChange("max", e.target.value)
                      }
                      className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1000000"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <button
                type="button"
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Шүүлтүүр цэвэрлэх
              </button>
              <p className="text-sm text-gray-600">
                {filteredProducts.length} бүтээгдэхүүн олдлоо
              </p>
            </div>
          </div>
        </section>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Products Available
            </h2>
            <p className="text-gray-600">
              Check back later for new products or contact us for custom
              solutions.
            </p>
          </div>
        ) : (
          <ProductsList products={filteredProducts} />
        )}
      </main>
    </div>
  );
}
