"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  currency: string;
}

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed: ${res.status} ${text}`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Failed to load products.");
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="border rounded-lg shadow hover:shadow-xl transition">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-60 object-contain p-4 bg-gray-100"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-orange-600 font-bold">
                  {product.price.toLocaleString()} {product.currency}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
