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

const ProductListPage = async () => {
  let products: Product[] = []; // Initialize to an empty array

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
      {
        cache: "no-store", // Important for dynamic data in Next.js 13+ App Router
        // or revalidate: 60, // if you want to revalidate every 60 seconds
      }
    );

    if (!res.ok) {
      // If the response is not OK (e.g., 4xx or 5xx status)
      const errorText = await res.text(); // Read the response as text, not JSON
      // console.error(`API Error: ${res.status} - ${errorText}`);
      // You might want to throw an error, set an error state, or display a message
      throw new Error(`Failed to fetch products: ${res.status} ${errorText}`);
    }

    products = await res.json(); // This will only be reached if res.ok is true
  } catch (error) {
    // console.error("Failed to load products:", error);
    // You can set an error message in state here to display to the user
    // e.g., setError('Could not load products. Please try again later.');
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
