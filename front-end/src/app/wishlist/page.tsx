"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const removeItem = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-pink-600">
          💖 Миний wishlist
        </h1>
        {wishlist.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            <div className="text-6xl mb-4">😢</div>
            <div className="text-lg font-medium mb-2">
              Wishlist-д бараа алга
            </div>
            <div className="text-sm">
              Та бүтээгдэхүүн дээр wishlist-д нэмэх товч дарна уу.
            </div>
            <Link
              href="/products"
              className="mt-4 inline-block text-blue-600 hover:underline font-medium"
            >
              Дэлгүүр хэсэх
            </Link>
          </div>
        ) : (
          <div>
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between mb-6 border-b pb-4 gap-4"
              >
                <div className="flex-1 flex items-center gap-4">
                  <img
                    src={item.imageUrl || "/placeholder-product.jpg"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div>
                    <div className="font-semibold text-lg">{item.name}</div>
                    <div className="text-gray-500 text-sm">
                      Үнэ: {item.price} {item.currency}
                    </div>
                  </div>
                </div>
                <button
                  className="ml-4 text-red-500 hover:underline"
                  onClick={() => removeItem(item.id)}
                >
                  Хасах
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
