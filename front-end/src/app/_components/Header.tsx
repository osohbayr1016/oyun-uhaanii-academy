"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useEffect, useState, useRef } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"cart" | "wishlist">("cart");
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const drawerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) setCart(JSON.parse(storedCart));
    }
    const handleCartUpdated = () => {
      setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    };
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "cart") {
        setCart(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };
    window.addEventListener("cartUpdated", handleCartUpdated);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [cart, wishlist]);

  // Close drawer on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setDrawerOpen(false);
      }
    }
    if (drawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [drawerOpen]);

  const updateCartQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };
  const removeCartItem = (id: string) =>
    setCart((prev) => prev.filter((item) => item.id !== id));
  const removeWishlistItem = (id: string) =>
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeProfile();
    router.push("/");
  };

  const navLinks = [
    { name: "Нүүр", href: "/" },
    { name: "Сургалтууд", href: "/courses" },
    { name: "Бүтээгдэхүүн", href: "/products" },
    { name: "Тэмцээнүүд", href: "/tournaments" },
    { name: "Мэдээ", href: "/news" },
    { name: "Бидний тухай", href: "/about" },
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Home button for admin pages */}
        {pathname.startsWith("/admin") && (
          <Link
            href="/"
            className="hidden lg:inline-flex items-center px-3 py-2 mr-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-medium transition-colors"
            style={{ marginRight: "1rem" }}
          >
            🏠 Home
          </Link>
        )}
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2"
          onClick={closeMenu}
        >
          <Image
            src="https://i.imgur.com/FQu6uqC.png"
            alt="Oyun Uhaanii Academy"
            width={120}
            height={40}
            className="max-h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-[17px] font-extrabold transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {user && user.role && user.role.toLowerCase() === "admin" && (
            <Link
              href="/admin"
              className="ml-4 px-4 py-2 bg-[#550080] text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors duration-200"
              style={{ marginLeft: "1rem" }}
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Desktop User Section */}
        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-gray-100"
              >
                <User size={16} />
                <span>{user.name}</span>
                <ChevronDown size={14} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-gray-500">{user.email}</div>
                  </div>
                  {user.role && user.role.toLowerCase() === "admin" && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={closeProfile}
                    >
                      Админ удирдлага
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <LogOut size={14} />
                      <span>Гарах</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Нэвтрэх
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Бүртгүүлэх
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden">
          {/* Home button for admin pages (mobile) */}
          {pathname.startsWith("/admin") && (
            <Link
              href="/"
              className="block px-3 py-2 mb-2 text-base font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
              onClick={closeMenu}
            >
              🏠 Home
            </Link>
          )}
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <div className="flex items-center gap-2 text-gray-700 py-2">
                  <User size={16} />
                  <span className="font-medium">{user.name}</span>
                </div>
                {user.role && user.role.toLowerCase() === "admin" && (
                  <Link
                    href="/admin"
                    className="block px-3 py-2 text-base font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    Админ удирдлага
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <LogOut size={16} />
                    <span>Гарах</span>
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={closeMenu}
                >
                  Нэвтрэх
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 text-base font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
                  onClick={closeMenu}
                >
                  Бүртгүүлэх
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          drawerOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ background: drawerOpen ? "rgba(0,0,0,0.3)" : "transparent" }}
      >
        <div
          ref={drawerRef}
          className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-t-lg font-semibold ${
                  activeTab === "cart"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setActiveTab("cart")}
              >
                🛒 Сагс
              </button>
              <button
                className={`px-4 py-2 rounded-t-lg font-semibold ${
                  activeTab === "wishlist"
                    ? "bg-pink-100 text-pink-600"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setActiveTab("wishlist")}
              >
                💖 Wishlist
              </button>
            </div>
            <button
              className="p-2 hover:bg-gray-200 rounded-full"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close"
            >
              <span className="text-2xl">×</span>
            </button>
          </div>
          <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
            {activeTab === "cart" ? (
              cart.length === 0 ? (
                <div className="text-center text-gray-500 py-16">
                  <div className="text-6xl mb-4">🛍️</div>
                  <div className="text-lg font-medium mb-2">
                    Сагсанд бараа алга
                  </div>
                  <div className="text-sm">
                    Та бүтээгдэхүүн нэмэхийн тулд дэлгүүр хэснэ үү.
                  </div>
                </div>
              ) : (
                <div>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between mb-6 border-b pb-4 gap-4"
                    >
                      <div className="flex-1 flex items-center gap-4">
                        <img
                          src={item.imageUrl || "/placeholder-product.jpg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-gray-500 text-sm">
                            Үнэ: {item.price} {item.currency}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => {
                            let val = parseInt(e.target.value, 10);
                            if (isNaN(val) || val < 1) val = 1;
                            updateCartQuantity(item.id, val);
                          }}
                          className="w-10 text-center border rounded px-2 py-1"
                        />
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <div className="w-20 text-right">
                        {item.price * item.quantity} {item.currency}
                      </div>
                      <button
                        className="ml-2 text-red-500 hover:underline"
                        onClick={() => removeCartItem(item.id)}
                      >
                        Устгах
                      </button>
                    </div>
                  ))}
                  <div className="text-right font-bold text-lg mt-6 mb-2">
                    Нийт: {cartTotal}₮
                  </div>
                  <a
                    href="/cart"
                    className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 mt-4 transition-all"
                  >
                    Сагс руу очих
                  </a>
                </div>
              )
            ) : wishlist.length === 0 ? (
              <div className="text-center text-gray-500 py-16">
                <div className="text-6xl mb-4">😢</div>
                <div className="text-lg font-medium mb-2">
                  Wishlist-д бараа алга
                </div>
                <div className="text-sm">
                  Та бүтээгдэхүүн дээр wishlist-д нэмэх товч дарна уу.
                </div>
              </div>
            ) : (
              <div>
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between mb-6 border-b pb-4 gap-4"
                  >
                    <div className="flex-1 flex items-center gap-4">
                      <img
                        src={item.imageUrl || "/placeholder-product.jpg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-gray-500 text-sm">
                          Үнэ: {item.price} {item.currency}
                        </div>
                      </div>
                    </div>
                    <button
                      className="ml-2 text-red-500 hover:underline"
                      onClick={() => removeWishlistItem(item.id)}
                    >
                      Хасах
                    </button>
                  </div>
                ))}
                <a
                  href="/wishlist"
                  className="block w-full text-center bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 mt-4 transition-all"
                >
                  Wishlist руу очих
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close profile dropdown */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-40" onClick={closeProfile} />
      )}
    </header>
  );
};

export default Header;
