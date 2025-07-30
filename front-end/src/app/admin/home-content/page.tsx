"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Home } from "lucide-react";

interface HomeContent {
  hero_title?: string;
  hero_subtitle?: string;
  hero_stats_courses?: string;
  hero_stats_students?: string;
  hero_stats_teachers?: string;
  hero_stats_years?: string;
  features_title?: string;
  features_subtitle?: string;
  feature_1_title?: string;
  feature_1_description?: string;
  feature_2_title?: string;
  feature_2_description?: string;
  feature_3_title?: string;
  feature_3_description?: string;
  feature_4_title?: string;
  feature_4_description?: string;
  feature_5_title?: string;
  feature_5_description?: string;
  feature_6_title?: string;
  feature_6_description?: string;
}

const AdminHomeContentPage = () => {
  const [content, setContent] = useState<HomeContent>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchHomeContent();
  }, []);

  const fetchHomeContent = async () => {
    try {
      const response = await fetch("/api/home-content");
      if (!response.ok) {
        throw new Error("Failed to fetch home content");
      }
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error("Error fetching home content:", error);
      setMessage({ type: "error", text: "Failed to load home content" });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key: keyof HomeContent, value: string) => {
    setContent(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/home-content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error("Failed to update home content");
      }

      setMessage({ type: "success", text: "Home content updated successfully!" });
    } catch (error) {
      console.error("Error updating home content:", error);
      setMessage({ type: "error", text: "Failed to update home content" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading home content...</p>
        </div>
      </div>
    );
  }

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
                <h1 className="text-2xl font-bold text-gray-900">
                  Нүүр хуудасны агуулга
                </h1>
                <p className="text-gray-600">
                  Нүүр хуудасны текст болон тоонуудыг засах
                </p>
              </div>
            </div>
            <Link
              href="/"
              target="_blank"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Нүүр хуудас харах
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === "success" 
              ? "bg-green-100 text-green-800 border border-green-200" 
              : "bg-red-100 text-red-800 border border-red-200"
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Hero хэсэг
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Үндсэн гарчиг
                </label>
                <input
                  type="text"
                  value={content.hero_title || ""}
                  onChange={(e) => handleInputChange("hero_title", e.target.value)}
                  placeholder="МОНГОЛЫН ОЮУН УХААНЫ АКАДЕМИ"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Нүүр хуудасны үндсэн гарчиг
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дэд гарчиг
                </label>
                <textarea
                  rows={3}
                  value={content.hero_subtitle || ""}
                  onChange={(e) => handleInputChange("hero_subtitle", e.target.value)}
                  placeholder="Оюуны өндөр чадамжтай дэлхийн иргэнийг бүтээлцэнэ..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Hero хэсгийн дэд гарчиг эсвэл тайлбар
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Статистик тоонууд
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Сургалтын тоо
                </label>
                <input
                  type="text"
                  value={content.hero_stats_courses || ""}
                  onChange={(e) => handleInputChange("hero_stats_courses", e.target.value)}
                  placeholder="10+"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Жишээ: 10+, 50+, 100+
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Сурагчдын тоо
                </label>
                <input
                  type="text"
                  value={content.hero_stats_students || ""}
                  onChange={(e) => handleInputChange("hero_stats_students", e.target.value)}
                  placeholder="3000+"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Жишээ: 3000+, 5000+, 10000+
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Багш нарын тоо
                </label>
                <input
                  type="text"
                  value={content.hero_stats_teachers || ""}
                  onChange={(e) => handleInputChange("hero_stats_teachers", e.target.value)}
                  placeholder="10+"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Жишээ: 10+, 20+, 50+
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Жилийн тоо
                </label>
                <input
                  type="text"
                  value={content.hero_stats_years || ""}
                  onChange={(e) => handleInputChange("hero_stats_years", e.target.value)}
                  placeholder="5+"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Жишээ: 5+, 10+, 15+
                </p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Онцлогууд хэсэг
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Үндсэн гарчиг
                </label>
                <input
                  type="text"
                  value={content.features_title || ""}
                  onChange={(e) => handleInputChange("features_title", e.target.value)}
                  placeholder="БИДНИЙ ОНЦЛОГУУД"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Онцлогууд хэсгийн үндсэн гарчиг
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дэд гарчиг
                </label>
                <textarea
                  rows={3}
                  value={content.features_subtitle || ""}
                  onChange={(e) => handleInputChange("features_subtitle", e.target.value)}
                  placeholder="Эелдэг найрсаг багш хамт олон, тохилог тухтай орчин, олон жилийн туршлага, хамгийн олон гишүүд болон, Монголын оюун ухааны академийн шилдэг салбар юм."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Онцлогууд хэсгийн дэд гарчиг эсвэл тайлбар
                </p>
              </div>
            </div>
          </div>

          {/* Individual Features */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Онцлогуудын жагсаалт
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Feature 1 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Онцлог 1</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Гарчиг
                    </label>
                    <input
                      type="text"
                      value={content.feature_1_title || ""}
                      onChange={(e) => handleInputChange("feature_1_title", e.target.value)}
                      placeholder="Сургалт"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Тайлбар
                    </label>
                    <textarea
                      rows={2}
                      value={content.feature_1_description || ""}
                      onChange={(e) => handleInputChange("feature_1_description", e.target.value)}
                      placeholder="Монгол улсын хэмжээний тэмцээнүүдийн олон жилийн туршлага"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Онцлог 2</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Гарчиг
                    </label>
                    <input
                      type="text"
                      value={content.feature_2_title || ""}
                      onChange={(e) => handleInputChange("feature_2_title", e.target.value)}
                      placeholder="Тэмцээнүүд"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Тайлбар
                    </label>
                    <textarea
                      rows={2}
                      value={content.feature_2_description || ""}
                      onChange={(e) => handleInputChange("feature_2_description", e.target.value)}
                      placeholder="Тогтмол клубын аварга болон улсын аварга мөн цаашлаад дэлхийн аваргад оролцох боломж"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Онцлог 3</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Гарчиг
                    </label>
                    <input
                      type="text"
                      value={content.feature_3_title || ""}
                      onChange={(e) => handleInputChange("feature_3_title", e.target.value)}
                      placeholder="Хөгжил"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Тайлбар
                    </label>
                    <textarea
                      rows={2}
                      value={content.feature_3_description || ""}
                      onChange={(e) => handleInputChange("feature_3_description", e.target.value)}
                      placeholder="Хөгжин дэвших чин хүсэл эрмэлзэл бүхий найрсаг дотно хамт олон"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Онцлог 4</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Гарчиг
                    </label>
                    <input
                      type="text"
                      value={content.feature_4_title || ""}
                      onChange={(e) => handleInputChange("feature_4_title", e.target.value)}
                      placeholder="Найрсаг багш хамт олон"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Тайлбар
                    </label>
                    <textarea
                      rows={2}
                      value={content.feature_4_description || ""}
                      onChange={(e) => handleInputChange("feature_4_description", e.target.value)}
                      placeholder="Элдэв найрсаг багш хамт олон"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Онцлог 5</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Гарчиг
                    </label>
                    <input
                      type="text"
                      value={content.feature_5_title || ""}
                      onChange={(e) => handleInputChange("feature_5_title", e.target.value)}
                      placeholder="Тухтай тайван суралцах орчин"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Тайлбар
                    </label>
                    <textarea
                      rows={2}
                      value={content.feature_5_description || ""}
                      onChange={(e) => handleInputChange("feature_5_description", e.target.value)}
                      placeholder="Цэвэр, тухтай, тайван суралцах орчин таныг хүлээж байна."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Онцлог 6</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Гарчиг
                    </label>
                    <input
                      type="text"
                      value={content.feature_6_title || ""}
                      onChange={(e) => handleInputChange("feature_6_title", e.target.value)}
                      placeholder="Олон жилийн туршлага"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Тайлбар
                    </label>
                    <textarea
                      rows={2}
                      value={content.feature_6_description || ""}
                      onChange={(e) => handleInputChange("feature_6_description", e.target.value)}
                      placeholder="Тохилог тухтай орчин, олон жилийн туршлага"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Хадгалж байна..." : "Хадгалах"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminHomeContentPage; 