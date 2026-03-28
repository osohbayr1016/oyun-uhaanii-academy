import Link from "next/link";
import type { Product } from "./useHydrateProductsData";

function getStatusBadge(product: Product) {
  if (product.stock === 0) {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>
        Дууссан
      </span>
    );
  }
  if (product.stock < 10) {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5"></span>
        Бага нөөц
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
      Бэлэн байгаа
    </span>
  );
}

export default function ProductsList({ products }: { products: Product[] }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products
        .filter((product) => product.imageUrl && product.imageUrl.trim() !== "")
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
  );
}
