"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<FullProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // --- IMPORTANT: Replace with your actual API endpoint ---
        // Example: /api/products/product-id-123
        const response = await fetch(`/api/products/${productId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.statusText}`);
        }

        const data: FullProduct = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
        console.error("Failed to fetch product details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100">
        <p className="text-xl text-red-700">Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Product not found.</p>
      </div>
    );
  }

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

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-gray-700 mb-6">
            {product.category && (
              <div>
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </div>
            )}
            {product.stock !== undefined && (
              <div>
                <span className="font-semibold">In Stock:</span>{" "}
                {product.stock > 0 ? product.stock : "Out of Stock"}
              </div>
            )}
            {product.materials && product.materials.length > 0 && (
              <div>
                <span className="font-semibold">Materials:</span>{" "}
                {product.materials.join(", ")}
              </div>
            )}
            {product.dimensions && (
              <div>
                <span className="font-semibold">Dimensions:</span>{" "}
                {product.dimensions.width}x{product.dimensions.height}x
                {product.dimensions.depth}
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
};

export default ProductDetailPage;
