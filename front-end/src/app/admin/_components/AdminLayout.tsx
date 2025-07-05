"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Users,
  BookOpen,
  ShoppingBag,
  Trophy,
  Settings,
  BarChart3,
  Menu,
  X,
  LogOut,
  User,
  FileText,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navigation = [
    {
      name: "Хянах самбар",
      href: "/admin",
      icon: BarChart3,
      current: pathname === "/admin",
    },
    {
      name: "Хэрэглэгчид",
      href: "/admin/users",
      icon: Users,
      current: pathname === "/admin/users",
    },
    {
      name: "Сургалтууд",
      href: "/admin/courses",
      icon: BookOpen,
      current: pathname === "/admin/courses",
    },
    {
      name: "Бүтээгдэхүүн",
      href: "/admin/products",
      icon: ShoppingBag,
      current: pathname === "/admin/products",
    },
    {
      name: "Тэмцээн",
      href: "/admin/tournaments",
      icon: Trophy,
      current: pathname === "/admin/tournaments",
    },
    {
      name: "Мэдээ",
      href: "/admin/news",
      icon: FileText,
      current: pathname === "/admin/news",
    },
    {
      name: "Тохиргоо",
      href: "/admin/settings",
      icon: Settings,
      current: pathname === "/admin/settings",
    },
    {
      name: "Тайлан",
      href: "/admin/reports",
      icon: BarChart3,
      current: pathname === "/admin/reports",
    },
  ];

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile sidebar */}
        <div
          className={`fixed inset-0 z-50 lg:hidden ${
            sidebarOpen ? "block" : "hidden"
          }`}
        >
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
              <h1 className="text-lg font-semibold text-gray-900">
                Админ удирдлага
              </h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    item.current
                      ? "bg-blue-100 text-blue-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.name || "Админ"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.email || "admin@example.com"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-3 flex w-full items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Гарах
              </button>
            </div>
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
            <div className="flex h-16 items-center px-4 border-b border-gray-200">
              <h1 className="text-lg font-semibold text-gray-900">
                Админ удирдлага
              </h1>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    item.current
                      ? "bg-blue-100 text-blue-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.name || "Админ"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.email || "admin@example.com"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-3 flex w-full items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Гарах
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          {/* Top bar */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex flex-1"></div>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
                <div className="flex items-center gap-x-4">
                  <span className="text-sm text-gray-500">
                    Админ: {user?.name || "Б. Батбаяр"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
