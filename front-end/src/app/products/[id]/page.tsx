"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

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
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [wishlistMessage, setWishlistMessage] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, []);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    }
  }, []);

  // Sync wishlist to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

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
      <div className="bg-gray-50 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-gray-50 flex items-center justify-center min-h-screen">
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

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleAddToCartAndGo = () => {
    console.log("Cart before add:", cart);
    const newCart = [...cart];
    const existing = newCart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + quantity;
    } else {
      newCart.push({ ...product, quantity });
    }
    console.log("Cart after add:", newCart);
    setCart(newCart); // update local state for instant UI
    localStorage.setItem("cart", JSON.stringify(newCart));
    console.log("Cart written to localStorage:", localStorage.getItem("cart"));
    window.dispatchEvent(new Event("cartUpdated"));
    setTimeout(() => {
      router.push("/cart");
    }, 50);
  };

  return (
    <div className="bg-gray-50">
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
                {/* Quantity Selector */}
                {product.stock > 0 && (
                  <div className="flex items-center mb-4 gap-2">
                    <span className="font-medium">Тоо:</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => {
                        let val = parseInt(e.target.value, 10);
                        if (isNaN(val) || val < 1) val = 1;
                        if (val > product.stock) val = product.stock;
                        setQuantity(val);
                      }}
                      className="w-16 text-center border rounded px-2 py-1"
                    />
                    <button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() =>
                        setQuantity((q) => Math.min(product.stock, q + 1))
                      }
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                )}
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
                  onClick={() => {
                    if (!auth.isAuthenticated()) {
                      setShowLoginPrompt(true);
                      return;
                    }
                    // Add to cart logic
                    const existing = cart.find(
                      (item) => item.id === product.id
                    );
                    let newCart;
                    if (existing) {
                      newCart = cart.map((item) =>
                        item.id === product.id
                          ? { ...item, quantity: item.quantity + quantity }
                          : item
                      );
                    } else {
                      newCart = [
                        ...cart,
                        {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          currency: product.currency,
                          imageUrl: product.imageUrl,
                          quantity,
                          stock: product.stock,
                        },
                      ];
                    }
                    setCart(newCart);
                    window.dispatchEvent(new Event("cartUpdated"));
                    setAddedToCart(true);
                    setTimeout(() => setAddedToCart(false), 1500);
                  }}
                >
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
                <button
                  className={`flex-1 border border-gray-300 py-3 px-6 rounded-md font-medium hover:bg-gray-50 ${
                    isInWishlist
                      ? "bg-yellow-100 text-yellow-700 border-yellow-400"
                      : "text-gray-700"
                  }`}
                  onClick={() => {
                    if (!auth.isAuthenticated()) {
                      setShowLoginPrompt(true);
                      return;
                    }
                    if (isInWishlist) {
                      setWishlist(
                        wishlist.filter((item) => item.id !== product.id)
                      );
                      window.dispatchEvent(new Event("wishlistUpdated"));
                      setWishlistMessage("Wishlist-с хасагдлаа");
                    } else {
                      setWishlist([
                        ...wishlist,
                        {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          currency: product.currency,
                          imageUrl: product.imageUrl,
                        },
                      ]);
                      window.dispatchEvent(new Event("wishlistUpdated"));
                      setWishlistMessage("Wishlist-д нэмэгдлээ");
                    }
                    setTimeout(() => setWishlistMessage(null), 1500);
                  }}
                >
                  {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>
              </div>
              {/* Show added to cart message */}
              {addedToCart && (
                <div className="mt-4 text-green-600 font-semibold">
                  Сагсанд нэмэгдлээ!
                </div>
              )}
              {/* Login Prompt Modal */}
              {showLoginPrompt && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
                    <h2 className="text-xl font-bold mb-4">
                      Нэвтрэх шаардлагатай
                    </h2>
                    <p className="mb-6">
                      Үйлдэл хийхийн тулд эхлээд нэвтэрнэ үү.
                    </p>
                    <button
                      className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 mr-2"
                      onClick={() => router.push("/login")}
                    >
                      Нэвтрэх
                    </button>
                    <button
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-300"
                      onClick={() => setShowLoginPrompt(false)}
                    >
                      Болих
                    </button>
                  </div>
                </div>
              )}
              {/* Wishlist message */}
              {wishlistMessage && (
                <div className="mt-4 text-yellow-600 font-semibold">
                  {wishlistMessage}
                </div>
              )}

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
    </div>
  );
}
