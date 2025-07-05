"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "../../_components/Header";
import Footer from "../../_components/Footer";

interface Product {
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
}

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch product"
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The product you're looking for doesn't exist."}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              <img
                src={product.imageUrl || "/placeholder-product.jpg"}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center mb-4">
                  <span className="text-3xl font-bold text-blue-600">
                    {product.price.toLocaleString()} {product.currency}
                  </span>
                  {product.stock > 0 ? (
                    <span className="ml-4 text-green-600 font-medium">
                      In Stock ({product.stock})
                    </span>
                  ) : (
                    <span className="ml-4 text-red-600 font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Product Information */}
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Category
                  </h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>

                {product.materials && product.materials.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Materials
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {product.materials.map((material, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.weight && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Weight
                    </h3>
                    <p className="text-sm text-gray-600">{product.weight} kg</p>
                  </div>
                )}

                {product.dimensions &&
                  Object.keys(product.dimensions).length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Dimensions
                      </h3>
                      <p className="text-sm text-gray-600">
                        {Object.entries(product.dimensions)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(", ")}
                      </p>
                    </div>
                  )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  disabled={product.stock === 0}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-md font-medium hover:bg-gray-50">
                  Add to Wishlist
                </button>
              </div>

              {/* Back to Products */}
              <div className="mt-6">
                <Link
                  href="/products"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  ← Back to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
