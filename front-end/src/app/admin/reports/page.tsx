"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Download,
  ArrowLeft,
  Users,
  BookOpen,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import { fetchBffJsonAdmin } from "@/lib/adminFetchBff";
import AdminLoadErrorBanner from "../_components/AdminLoadErrorBanner";

const AdminReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedReport, setSelectedReport] = useState("overview");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalProducts: 0,
    totalTournaments: 0,
    totalNews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const data = await fetchBffJsonAdmin<{
          totalUsers: number;
          totalCourses: number;
          totalProducts: number;
          totalTournaments: number;
          totalNews: number;
        }>("/api/admin/stats");
        setStats(data);
      } catch (err: unknown) {
        setLoadError(
          err instanceof Error ? err.message : "Статистик ачаалж чадсангүй"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-8">Уншиж байна...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/admin" className="mr-4">
                <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-gray-900" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Тайлан</h1>
                <p className="text-gray-600">
                  Статистик, тайлан, дүн шинжилгээ
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">7 хоног</option>
                <option value="month">Сар</option>
                <option value="quarter">Улирлын</option>
                <option value="year">Жил</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Тайлан татах
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminLoadErrorBanner message={loadError} />
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-500">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Нийт хэрэглэгч
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalUsers?.toLocaleString?.() ?? ""}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-500">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Нийт сургалт
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalCourses ?? ""}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-500">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Нийт бүтээгдэхүүн
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalProducts ?? ""}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-500">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Нийт тэмцээн
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalTournaments ?? ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Сүүлийн үйл ажиллагаа
            </h3>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-600">
              Бодит үйл ажиллагааны түүхийг{" "}
              <Link href="/admin" className="text-blue-600 underline">
                Хянах самбар
              </Link>{" "}
              хуудаснаас харна уу. Энд жагсаасан жишээ өгөгдлийг хассан.
            </p>
          </div>
        </div>

        {/* Detailed Reports */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Хэрэглэгчийн тайлан
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">
                  Идэвхтэй хэрэглэгч
                </span>
                <span className="text-sm font-medium">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Шинэ бүртгэл</span>
                <span className="text-sm font-medium text-green-600">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Дундаж идэвх</span>
                <span className="text-sm font-medium">-</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Сургалтын тайлан
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Дууссан сургалт</span>
                <span className="text-sm font-medium">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Дундаж үнэлгээ</span>
                <span className="text-sm font-medium">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Төлбөр төлөлт</span>
                <span className="text-sm font-medium text-green-600">-</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportsPage;
