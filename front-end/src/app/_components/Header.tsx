"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // For icons

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Нүүр", href: "/" },
    { name: "Сургалтууд", href: "/courses" },
    { name: "Бүтээгдэхүүн", href: "/products" },
    { name: "Тэмцээнүүд", href: "/tournaments" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-gray-900">
          <img src="/about3.png" alt="image" width={150} height={150} />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="/login"
            className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
          >
            Нэвтрэх / Бүртгүүлэх
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                {link.name}
              </a>
            ))}
            {/* <a
              href="/login"
              className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium text-center hover:bg-blue-700 transition"
            >
              Нэвтрэх / Бүртгүүлэх
            </a> */}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
