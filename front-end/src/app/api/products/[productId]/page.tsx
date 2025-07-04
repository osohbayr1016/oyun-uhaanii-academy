import { notFound } from "next/navigation";

interface FullProduct {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  category: string;
  stock: number;
  materials?: string[];
  dimensions?: { width: string; height: string; depth: string };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.productId}`
  );
  if (!res.ok) return notFound();

  const product: FullProduct = await res.json();

  return (
    <div className="container mx-auto p-4 py-8 bg-white shadow-lg rounded-lg my-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-[500px] w-full object-contain"
          />
        </div>
        <div className="p-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-2xl font-bold text-orange-600 mb-4">
            {product.price.toLocaleString()} {product.currency}
          </p>
          <p className="mb-6 text-gray-700">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 text-gray-700 mb-6">
            <div>
              <strong>Category:</strong> {product.category}
            </div>
            <div>
              <strong>Stock:</strong>{" "}
              {product.stock > 0 ? product.stock : "Out of Stock"}
            </div>
            {product.materials && (
              <div>
                <strong>Materials:</strong> {product.materials.join(", ")}
              </div>
            )}
            {product.dimensions && (
              <div>
                <strong>Dimensions:</strong> {product.dimensions.width}x
                {product.dimensions.height}x{product.dimensions.depth}
              </div>
            )}
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
