"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  category: string;
  stock: number;
  materials: string[];
  dimensions?: any;
  weight?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const CATEGORIES = [
  "Кимастер",
  "Рубик шоо",
  "Спорт өрөлт",
  "Ном сурах бичиг",
  "Бэкгамон",
  "Бусад",
];

export default function ProductsClient({ products }: { products: Product[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000000,
  });

  const filteredProducts = useMemo(() => {
    let filtered = products || [];
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    filtered = filtered.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );
    return filtered;
  }, [products, selectedCategory, priceRange]);

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

  const getStatusBadge = (product: Product) => {
    if (product.stock === 0) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>
          Дууссан
        </span>
      );
    } else if (product.stock < 10) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
          <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5"></span>
          Бага нөөц
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
          Бэлэн байгаа
        </span>
      );
    }
  };

  return (
    <div className="bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts
              .filter(
                (product) => product.imageUrl && product.imageUrl.trim() !== ""
              )
              .map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover aspect-video"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">
                        {product.price.toLocaleString()} {product.currency}
                      </span>
                      {getStatusBadge(product)}
                    </div>
                    {product.category && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
          </section>
        )}
      </main>
    </div>
  );
}
