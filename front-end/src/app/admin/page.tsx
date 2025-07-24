"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/admin/stats", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/admin/activities", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("Failed to fetch activities");
        const data = await res.json();
        setActivities(data);
      } catch (err: any) {
        // Optionally handle error
      }
    };
    fetchStats();
    fetchActivities();
  }, []);

  const statCards = [
    {
      title: "Нийт хэрэглэгч",
      value: stats?.totalUsers ?? "-",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Нийт сургалт",
      value: stats?.totalCourses ?? "-",
      icon: BookOpen,
      color: "bg-green-500",
    },
    {
      title: "Нийт бүтээгдэхүүн",
      value: stats?.totalProducts ?? "-",
      icon: ShoppingBag,
      color: "bg-purple-500",
    },
    {
      title: "Нийт тэмцээн",
      value: stats?.totalTournaments ?? "-",
      icon: Trophy,
      color: "bg-orange-500",
    },
    {
      title: "Нийт мэдээ",
      value: stats?.totalNews ?? "-",
      icon: BarChart3,
      color: "bg-red-500",
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
    {
      title: "Клубийн мэдээлэл",
      description: "Клубийн мэдээлэл засах",
      icon: Settings,
      href: "/admin/club-info",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-4 text-center py-8">Уншиж байна...</div>
        ) : error ? (
          <div className="col-span-4 text-center text-red-500">{error}</div>
        ) : (
          statCards.map((stat, index) => (
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
          ))
        )}
      </div>

      {/* Admin Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section, index) => (
          <Link
            key={index}
            href={section.href}
            className={`bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-200 border ${
              section.color || ""
            } relative`}
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
            {activities.length === 0 ? (
              <div className="text-gray-400 text-center">
                Одоогоор үйл ажиллагаа алга
              </div>
            ) : (
              activities.map((activity, index) => (
                <div
                  key={activity.id || index}
                  className="flex items-center justify-between py-2"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.message}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.userName || "Систем"}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(activity.createdAt).toLocaleString("mn-MN", {
                      hour12: false,
                    })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
