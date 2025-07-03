"use client";

import React from "react";
import Link from "next/link";

const AdminDashboard = () => {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Админ Хянах Самбар</h1>

      <ul className="space-y-4">
        <li>
          <Link href="/admin/courses" className="text-blue-600 hover:underline">
            📚 Сургалтуудыг удирдах
          </Link>
        </li>
        <li>
          <Link
            href="/admin/products"
            className="text-blue-600 hover:underline"
          >
            🛒 Бүтээгдэхүүнүүдийг удирдах
          </Link>
        </li>
      </ul>
    </main>
  );
};

export default AdminDashboard;
