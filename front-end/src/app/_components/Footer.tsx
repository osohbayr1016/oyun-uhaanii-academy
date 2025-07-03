import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t border-gray-200 py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            <img src="/about3.png" alt="icon" width={150} height={150} />
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Хүүхдүүдэд зориулсан сургалт, бүтээлч контент, хэрэгсэл. Ирээдүйг
            хамтдаа бүтээе.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Цэс</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Нүүр
              </a>
            </li>
            <li>
              <a href="/courses" className="hover:underline">
                Сургалтууд
              </a>
            </li>
            <li>
              <a href="/merch" className="hover:underline">
                Бүтээгдэхүүн
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Холбоо барих
              </a>
            </li>
          </ul>
        </div>

        {/* Contact + Socials */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Холбоо барих
          </h3>
          <p className="text-sm">📞 +976 9999 0000</p>
          <p className="text-sm">✉️ contact@edukids.mn</p>

          <div className="mt-4 flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 border-t border-gray-300 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Монголын оюун ухааны академи.
      </div>
    </footer>
  );
};

export default Footer;
