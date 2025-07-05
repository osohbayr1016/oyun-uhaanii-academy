"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/about3.png"
            alt="Oyun Uhaanii Academy"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <User size={16} />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Админ
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
              >
                <LogOut size={16} />
                <span className="text-sm">Гарах</span>
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Нэвтрэх
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Бүртгүүлэх
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
              {user ? (
                <>
                  <div className="flex items-center gap-2 text-gray-700 py-2">
                    <User size={16} />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Админ
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
                  >
                    <LogOut size={16} />
                    <span>Гарах</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Нэвтрэх
                  </Link>
                  <Link
                    href="/register"
                    className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium text-center hover:bg-blue-700 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Бүртгүүлэх
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
