"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Settings,
  Save,
  ArrowLeft,
  Globe,
  Mail,
  Shield,
  Database,
  Bell,
  Palette,
  Users,
} from "lucide-react";

const AdminSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    siteName: "Оюун Ухааны Академи",
    siteDescription: "Монголын соёл, түүх, уран зохиолын сургалт",
    contactEmail: "contact@oyun-uhaanii.mn",
    contactPhone: "+976 9999 0000",
    address: "Улаанбаатар хот, Сүхбаатар дүүрэг",
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    maxFileSize: 5,
    allowedFileTypes: "jpg,jpeg,png,pdf,doc,docx",
    emailNotifications: true,
    smsNotifications: false,
    theme: "light",
    language: "mn",
    timezone: "Asia/Ulaanbaatar",
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    alert(
      "Тохиргоог серверт хадгалах боломж одоогоор байхгүй. Удахгүй нэмэгдэнэ."
    );
  };

  const tabs = [
    { id: "general", name: "Ерөнхий", icon: Settings },
    { id: "contact", name: "Холбоо барих", icon: Mail },
    { id: "security", name: "Аюулгүй байдал", icon: Shield },
    { id: "notifications", name: "Мэдэгдэл", icon: Bell },
    { id: "appearance", name: "Харагдах байдал", icon: Palette },
  ];

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
                <h1 className="text-2xl font-bold text-gray-900">Тохиргоо</h1>
                <p className="text-gray-600">Системийн тохиргоо, тохируулга</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Хадгалах
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "general" && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Ерөнхий тохиргоо
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Сайтын нэр
                    </label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) =>
                        handleSettingChange("siteName", e.target.value)
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Тайлбар
                    </label>
                    <input
                      type="text"
                      value={settings.siteDescription}
                      onChange={(e) =>
                        handleSettingChange("siteDescription", e.target.value)
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Хэл
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) =>
                        handleSettingChange("language", e.target.value)
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="mn">Монгол</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Цагийн бүс
                    </label>
                    <select
                      value={settings.timezone}
                      onChange={(e) =>
                        handleSettingChange("timezone", e.target.value)
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Asia/Ulaanbaatar">
                        Улаанбаатар (UTC+8)
                      </option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        Засвар горим
                      </h4>
                      <p className="text-sm text-gray-500">
                        Сайтыг засвар горимд оруулах
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleSettingChange(
                          "maintenanceMode",
                          !settings.maintenanceMode
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.maintenanceMode ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.maintenanceMode
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        Бүртгэл зөвшөөрөх
                      </h4>
                      <p className="text-sm text-gray-500">
                        Шинэ хэрэглэгчдийн бүртгэлийг зөвшөөрөх
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleSettingChange(
                          "allowRegistration",
                          !settings.allowRegistration
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.allowRegistration
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.allowRegistration
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Холбоо барих
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      И-мэйл
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) =>
                        handleSettingChange("contactEmail", e.target.value)
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Утас
                    </label>
                    <input
                      type="tel"
                      value={settings.contactPhone}
                      onChange={(e) =>
                        handleSettingChange("contactPhone", e.target.value)
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Хаяг
                    </label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) =>
                        handleSettingChange("address", e.target.value)
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Аюулгүй байдал
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        И-мэйл баталгаажуулалт
                      </h4>
                      <p className="text-sm text-gray-500">
                        Хэрэглэгчдийн и-мэйл хаягийг баталгаажуулах
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleSettingChange(
                          "requireEmailVerification",
                          !settings.requireEmailVerification
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.requireEmailVerification
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.requireEmailVerification
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Файлын хамгийн их хэмжээ (MB)
                    </label>
                    <input
                      type="number"
                      value={settings.maxFileSize}
                      onChange={(e) =>
                        handleSettingChange(
                          "maxFileSize",
                          parseInt(e.target.value)
                        )
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Зөвшөөрөгдсөн файлын төрлүүд
                    </label>
                    <input
                      type="text"
                      value={settings.allowedFileTypes}
                      onChange={(e) =>
                        handleSettingChange("allowedFileTypes", e.target.value)
                      }
                      placeholder="jpg,jpeg,png,pdf,doc,docx"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Мэдэгдэл</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        И-мэйл мэдэгдэл
                      </h4>
                      <p className="text-sm text-gray-500">
                        И-мэйлээр мэдэгдэл илгээх
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleSettingChange(
                          "emailNotifications",
                          !settings.emailNotifications
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.emailNotifications
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.emailNotifications
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        SMS мэдэгдэл
                      </h4>
                      <p className="text-sm text-gray-500">
                        SMS-ээр мэдэгдэл илгээх
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleSettingChange(
                          "smsNotifications",
                          !settings.smsNotifications
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.smsNotifications
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.smsNotifications
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Харагдах байдал
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Загвар
                    </label>
                    <select
                      value={settings.theme}
                      onChange={(e) =>
                        handleSettingChange("theme", e.target.value)
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="light">Гэрэлт</option>
                      <option value="dark">Харанхуй</option>
                      <option value="auto">Автомат</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
