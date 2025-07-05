"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Download,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  ShoppingBag,
  Trophy,
  Calendar,
  DollarSign,
  Eye,
} from "lucide-react";

const AdminReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedReport, setSelectedReport] = useState("overview");

  const stats = {
    totalUsers: 1234,
    totalCourses: 45,
    totalProducts: 89,
    totalTournaments: 12,
    activeUsers: 856,
    completedCourses: 234,
    totalRevenue: 15000000,
    monthlyGrowth: 12.5,
  };

  const monthlyData = [
    { month: "1-р сар", users: 120, courses: 5, revenue: 1200000 },
    { month: "2-р сар", users: 180, courses: 8, revenue: 1500000 },
    { month: "3-р сар", users: 220, courses: 12, revenue: 1800000 },
    { month: "4-р сар", users: 280, courses: 15, revenue: 2200000 },
    { month: "5-р сар", users: 320, courses: 18, revenue: 2500000 },
    { month: "6-р сар", users: 380, courses: 22, revenue: 2800000 },
  ];

  const topCourses = [
    { name: "Монголын түүх", students: 156, revenue: 2340000 },
    { name: "Уран зохиол", students: 134, revenue: 2010000 },
    { name: "География", students: 98, revenue: 1470000 },
    { name: "Математик", students: 87, revenue: 1305000 },
    { name: "Физик", students: 76, revenue: 1140000 },
  ];

  const recentActivities = [
    {
      action: "Шинэ хэрэглэгч бүртгэгдлээ",
      time: "2 минутын өмнө",
      type: "user",
    },
    { action: "Сургалт нэмэгдлээ", time: "15 минутын өмнө", type: "course" },
    { action: "Бүтээгдэхүүн захиалга", time: "1 цагийн өмнө", type: "product" },
    { action: "Тэмцээн үүсгэгдлээ", time: "2 цагийн өмнө", type: "tournament" },
    { action: "Төлбөр төлөгдлөө", time: "3 цагийн өмнө", type: "payment" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <Users className="w-4 h-4 text-blue-500" />;
      case "course":
        return <BookOpen className="w-4 h-4 text-green-500" />;
      case "product":
        return <ShoppingBag className="w-4 h-4 text-purple-500" />;
      case "tournament":
        return <Trophy className="w-4 h-4 text-orange-500" />;
      case "payment":
        return <DollarSign className="w-4 h-4 text-green-600" />;
      default:
        return <Eye className="w-4 h-4 text-gray-500" />;
    }
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    );
  };

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
                  {stats.totalUsers.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  {getGrowthIcon(stats.monthlyGrowth)}
                  <span className="text-sm text-green-600 ml-1">
                    +{stats.monthlyGrowth}%
                  </span>
                </div>
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
                  {stats.totalCourses}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+8.2%</span>
                </div>
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
                  {stats.totalProducts}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+5.7%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-orange-500">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Нийт орлого</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {(stats.totalRevenue / 1000000).toFixed(1)}M ₮
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+15.3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Monthly Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Сарын статистик
              </h3>
              <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                <option>Хэрэглэгч</option>
                <option>Сургалт</option>
                <option>Орлого</option>
              </select>
            </div>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {data.month}
                  </span>
                  <div className="flex items-center space-x-6">
                    <span className="text-sm text-gray-600">
                      {data.users} хэрэглэгч
                    </span>
                    <span className="text-sm text-gray-600">
                      {data.courses} сургалт
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {(data.revenue / 1000000).toFixed(1)}M ₮
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Courses */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Топ сургалтууд
            </h3>
            <div className="space-y-4">
              {topCourses.map((course, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {course.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {course.students} сурагч
                    </p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {(course.revenue / 1000000).toFixed(1)}M ₮
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Сүүлийн үйл ажиллагаа
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center">
                    {getActivityIcon(activity.type)}
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                <span className="text-sm font-medium">{stats.activeUsers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Шинэ бүртгэл</span>
                <span className="text-sm font-medium text-green-600">
                  +{stats.monthlyGrowth}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Дундаж идэвх</span>
                <span className="text-sm font-medium">68%</span>
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
                <span className="text-sm font-medium">
                  {stats.completedCourses}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Дундаж үнэлгээ</span>
                <span className="text-sm font-medium">4.8/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Төлбөр төлөлт</span>
                <span className="text-sm font-medium text-green-600">95%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportsPage;
