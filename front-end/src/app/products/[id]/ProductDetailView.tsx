"use client";

import Link from "next/link";
import {
  formatDimensionsForDisplay,
  type NormalizedProduct,
} from "./productDetailNormalize";

const NO_IMAGE_SVG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="24">No Image</text></svg>';

export default function ProductDetailView({
  product,
}: {
  product: NormalizedProduct;
}) {
  const dimText = formatDimensionsForDisplay(product.dimensions);

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={product.imageUrl?.trim() ? product.imageUrl : NO_IMAGE_SVG}
                alt={product.name}
                className="h-96 w-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes("data:image/svg+xml")) {
                    target.onerror = null;
                    target.src = NO_IMAGE_SVG;
                  }
                }}
              />
            </div>

            <div className="p-8 md:w-1/2">
              <div className="mb-6">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <p className="mb-4 text-lg text-gray-600">{product.description}</p>
                <div className="mb-4 flex items-center">
                  <span className="text-3xl font-bold text-blue-600">
                    {product.price.toLocaleString()} {product.currency}
                  </span>
                  {product.stock > 0 ? (
                    <span className="ml-4 font-medium text-green-600">
                      {product.stockStatusText || "Бэлэн байгаа"}
                    </span>
                  ) : (
                    <span className="ml-4 font-medium text-red-600">
                      {product.stockStatusText || "Дууссан"}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-8 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Ангилал</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>

                {product.materials.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Материал
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {product.materials.map((material, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.weight != null && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Жин</h3>
                    <p className="text-sm text-gray-600">{product.weight} кг</p>
                  </div>
                )}

                {dimText.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Хэмжээ
                    </h3>
                    <p className="text-sm text-gray-600">{dimText}</p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <Link
                  href="/products"
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  ← Бүтээгдэхүүнүүд рүү буцах
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
