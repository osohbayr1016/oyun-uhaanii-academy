"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

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
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between  h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <Image
              src="/about3.png"
              alt="Oyun Uhaanii Academy"
              width={120}
              height={40}
              className="w-24 h-8 sm:w-28 sm:h-9 md:w-36 md:h-12 lg:w-40 lg:h-14"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            {user && user.role && user.role.toLowerCase() === "admin" && (
              <Link
                href="/admin"
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors duration-200"
                style={{ marginLeft: "1rem" }}
              >
                Go to Admin Page
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
      </div>

      {/* Click outside to close profile dropdown */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-40" onClick={closeProfile} />
      )}
    </header>
  );
};

export default Header;
