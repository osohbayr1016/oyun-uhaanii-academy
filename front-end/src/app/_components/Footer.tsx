import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="md:col-span-2">
          <div className="flex items-center mb-4">
            <Image
              src="/about3.png"
              alt="Oyun Uhaanii Academy"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <p className="text-sm text-gray-400 max-w-md">
            Хүүхдүүдэд зориулсан сургалт, бүтээлч контент, хэрэгсэл. Ирээдүйг
            хамтдаа бүтээе.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Цэс</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Нүүр
              </Link>
            </li>
            <li>
              <Link
                href="/courses"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Сургалтууд
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Бүтээгдэхүүн
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Бидний тухай
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact + Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Холбоо барих
          </h3>
          <div className="space-y-2 text-sm">
            <p>📞 +976 9999 0000</p>
            <p>✉️ contact@oyun-uhaanii.mn</p>
          </div>

          <div className="mt-4 flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors duration-200"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Монголын оюун ухааны академи. Бүх эрх
        хуулиар хамгаалагдсан.
      </div>
    </footer>
  );
};

export default Footer;
