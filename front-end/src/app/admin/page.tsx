"use client";

import { useState } from "react";
import Link from "next/link";
import AdminLayout from "./_components/AdminLayout";
import {
  Users,
  BookOpen,
  ShoppingBag,
  Trophy,
  Settings,
  BarChart3,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Нийт хэрэглэгч",
      value: "1,234",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Нийт сургалт",
      value: "45",
      icon: BookOpen,
      color: "bg-green-500",
    },
    {
      title: "Нийт бүтээгдэхүүн",
      value: "89",
      icon: ShoppingBag,
      color: "bg-purple-500",
    },
    {
      title: "Идэвхтэй тэмцээн",
      value: "12",
      icon: Trophy,
      color: "bg-orange-500",
    },
  ];

  const recentActivities = [
    {
      action: "Шинэ хэрэглэгч бүртгэгдлээ",
      user: "Б. Батбаяр",
      time: "2 минутын өмнө",
    },
    { action: "Сургалт нэмэгдлээ", user: "Д. Сүхбат", time: "15 минутын өмнө" },
    {
      action: "Бүтээгдэхүүн шинэчлэгдлээ",
      user: "Л. Мөнхбат",
      time: "1 цагийн өмнө",
    },
    { action: "Тэмцээн үүсгэгдлээ", user: "Б. Батбаяр", time: "2 цагийн өмнө" },
  ];

  const adminSections = [
    {
      title: "Хэрэглэгчид",
      description: "Хэрэглэгчдийн жагсаалт, эрх удирдлага",
      icon: Users,
      href: "/admin/users",
      color: "bg-blue-500",
    },
    {
      title: "Сургалтууд",
      description: "Сургалтын жагсаалт, нэмэх, засах",
      icon: BookOpen,
      href: "/admin/courses",
      color: "bg-green-500",
    },
    {
      title: "Бүтээгдэхүүн",
      description: "Бүтээгдэхүүний жагсаалт, нэмэх, засах",
      icon: ShoppingBag,
      href: "/admin/products",
      color: "bg-purple-500",
    },
    {
      title: "Тэмцээн",
      description: "Тэмцээний жагсаалт, нэмэх, засах",
      icon: Trophy,
      href: "/admin/tournaments",
      color: "bg-orange-500",
    },
    {
      title: "Тохиргоо",
      description: "Системийн тохиргоо, тохируулга",
      icon: Settings,
      href: "/admin/settings",
      color: "bg-gray-500",
    },
    {
      title: "Тайлан",
      description: "Статистик, тайлан, дүн шинжилгээ",
      icon: BarChart3,
      href: "/admin/reports",
      color: "bg-red-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section, index) => (
            <Link
              key={index}
              href={section.href}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${section.color}`}>
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900">
                  {section.title}
                </h3>
              </div>
              <p className="text-gray-600">{section.description}</p>
            </Link>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow">
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
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">{activity.user}</p>
                  </div>
                  <span className="text-sm text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
