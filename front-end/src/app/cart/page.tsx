"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [purchasing, setPurchasing] = useState(false);

  // Helper to load cart from localStorage
  const loadCart = () => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      setCart(storedCart ? JSON.parse(storedCart) : []);
    }
  };

  useEffect(() => {
    loadCart();
    // Listen for cartUpdated and storage events
    const handleCartUpdated = loadCart;
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "cart") loadCart();
    };
    window.addEventListener("cartUpdated", handleCartUpdated);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Buy handler
  const handleBuy = async () => {
    setPurchasing(true);
    setPurchaseError(null);
    try {
      // Simulate backend call for each item (replace with real API if needed)
      await Promise.all(
        cart.map((item) =>
          api.products.update(item.id, {
            stock: Math.max(0, item.stock - item.quantity),
          })
        )
      );
      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
      window.dispatchEvent(new Event("cartUpdated"));
      setPurchaseSuccess(true);
      setTimeout(() => setPurchaseSuccess(false), 3000);
    } catch (err: any) {
      setPurchaseError("Худалдан авалт амжилтгүй. Дахин оролдоно уу.");
    } finally {
      setPurchasing(false);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Миний сагс</h1>
      {purchaseSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Худалдан авалт амжилттай!
        </div>
      )}
      {purchaseError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {purchaseError}
        </div>
      )}
      {cart.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          <div className="text-5xl mb-4">🛒</div>
          <div>Таны сагс хоосон байна.</div>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white rounded shadow p-4"
            >
              <img
                src={item.imageUrl || "/placeholder.png"}
                alt={item.title}
                className="w-20 h-20 object-cover rounded mr-4 border"
              />
              <div className="flex-1">
                <div className="font-semibold">{item.title}</div>
                <div className="text-gray-500">
                  ₮{item.price?.toLocaleString()}
                </div>
                <div className="flex items-center mt-2">
                  <button
                    className="px-2 py-1 border rounded-l bg-gray-100"
                    onClick={() =>
                      updateQuantity(item.id, (item.quantity || 1) - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity || 1}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                    className="w-12 text-center border-t border-b"
                  />
                  <button
                    className="px-2 py-1 border rounded-r bg-gray-100"
                    onClick={() =>
                      updateQuantity(item.id, (item.quantity || 1) + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="ml-4 text-red-500 hover:text-red-700"
                onClick={() => removeItem(item.id)}
                title="Устгах"
              >
                ✕
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-8">
            <div className="text-xl font-bold">
              Нийт: ₮{total.toLocaleString()}
            </div>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 disabled:opacity-50"
              onClick={handleBuy}
              disabled={purchasing || cart.length === 0}
            >
              {purchasing ? "Төлбөр төлж байна..." : "Buy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
