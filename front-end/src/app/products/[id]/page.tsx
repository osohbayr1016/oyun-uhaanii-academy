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
  stockStatusText?: string; // Added for custom text
  heroImage?: string; // Added for hero image
  youtubeUrl?: string; // Added for YouTube video URL
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
  const [showVideo, setShowVideo] = useState(false);

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
    let didCancel = false;
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        if (!didCancel) setProduct(data);
      } catch (err) {
        if (!didCancel)
          setError(
            err instanceof Error ? err.message : "Failed to fetch product"
          );
      } finally {
        if (!didCancel) setLoading(false);
      }
    };
    if (params.id) {
      fetchProduct();
    }
    return () => {
      didCancel = true;
    };
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
                src={product.imageUrl || "/academy.png"}
                alt={product.name}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes("data:image/svg+xml")) {
                    target.onerror = null;
                    target.src =
                      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="24">No Image</text></svg>';
                  }
                }}
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
                      {product.stockStatusText || "Бэлэн байгаа"}
                    </span>
                  ) : (
                    <span className="ml-4 font-medium text-red-600">
                      {product.stockStatusText || "Дууссан"}
                    </span>
                  )}
                </div>
                {/* Quantity Selector REMOVED */}
              </div>

              {/* Product Information */}
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Ангилал</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>

                {product.materials && product.materials.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Материал
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
                    <h3 className="text-sm font-medium text-gray-900">Жин</h3>
                    <p className="text-sm text-gray-600">{product.weight} кг</p>
                  </div>
                )}

                {product.dimensions &&
                  Object.keys(product.dimensions).length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Хэмжээ
                      </h3>
                      <p className="text-sm text-gray-600">
                        {Object.entries(product.dimensions)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(", ")}
                      </p>
                    </div>
                  )}
              </div>

              {/* Action Buttons REMOVED */}

              {/* Back to Products */}
              <div className="mt-6">
                <Link
                  href="/products"
                  className="text-blue-600 hover:text-blue-700 font-medium"
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
