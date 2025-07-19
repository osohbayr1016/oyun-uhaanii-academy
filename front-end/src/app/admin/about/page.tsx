"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import {
  Save,
  RefreshCw,
  FileText,
  Image as ImageIcon,
  Users,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

interface AboutContent {
  [key: string]: {
    id: string;
    title?: string;
    content?: string;
    imageUrl?: string;
    teamMemberName?: string;
    teamMemberRole?: string;
    teamMemberImage?: string;
    contactAddress?: string;
    contactPhone?: string;
    contactEmail?: string;
    contactHours?: string;
  };
}

const AdminAboutPage = () => {
  const { isAuthenticated, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState<AboutContent>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check authentication and admin status
    if (!authLoading) {
      if (!isAuthenticated()) {
        router.push("/login");
        return;
      }
      if (!isAdmin()) {
        router.push("/");
        return;
      }
    }

    fetchContent();
  }, [authLoading, isAuthenticated, isAdmin, router]);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/about");
      if (!response.ok) {
        throw new Error("Failed to fetch about page content");
      }
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error("Error fetching about page content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token");
      }

      // Save each section
      const promises = Object.entries(content).map(([section, data]) =>
        fetch("/api/about", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            section,
            ...data,
          }),
        })
      );

      await Promise.all(promises);
      alert("Амжилттай хадгалагдлаа!");
    } catch (error) {
      console.error("Error saving content:", error);
      alert(
        `Алдаа гарлаа: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSeedContent = async () => {
    if (
      !confirm(
        "Энэ нь одоогийн контентийг устгаж, анхны контентээр солино. Үргэлжлүүлэх үү?"
      )
    ) {
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token");
      }

      const response = await fetch("/api/about/seed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to seed content");
      }

      await fetchContent();
      alert("Анхны контент амжилттай сэргээгдлээ!");
    } catch (error) {
      console.error("Error seeding content:", error);
      alert(
        `Алдаа гарлаа: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ачаалж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            About хуудасны контент удирдлага
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Хадгалж байна..." : "Хадгалах"}
            </button>
            <button
              onClick={handleSeedContent}
              disabled={saving}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Анхны контент сэргээх
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Hero хэсэг
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Гарчиг
                </label>
                <input
                  type="text"
                  value={content.hero?.title || ""}
                  onChange={(e) =>
                    handleInputChange("hero", "title", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Агуулга
                </label>
                <textarea
                  rows={4}
                  value={content.hero?.content || ""}
                  onChange={(e) =>
                    handleInputChange("hero", "content", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Зургийн URL
                </label>
                <input
                  type="url"
                  value={content.hero?.imageUrl || ""}
                  onChange={(e) =>
                    handleInputChange("hero", "imageUrl", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Goals Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Зорилго
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Гарчиг
                </label>
                <input
                  type="text"
                  value={content.goals?.title || ""}
                  onChange={(e) =>
                    handleInputChange("goals", "title", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Агуулга
                </label>
                <textarea
                  rows={4}
                  value={content.goals?.content || ""}
                  onChange={(e) =>
                    handleInputChange("goals", "content", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Зургийн URL
                </label>
                <input
                  type="url"
                  value={content.goals?.imageUrl || ""}
                  onChange={(e) =>
                    handleInputChange("goals", "imageUrl", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Үнэт зүйлс
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Гарчиг
                </label>
                <input
                  type="text"
                  value={content.values?.title || ""}
                  onChange={(e) =>
                    handleInputChange("values", "title", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Агуулга
                </label>
                <textarea
                  rows={4}
                  value={content.values?.content || ""}
                  onChange={(e) =>
                    handleInputChange("values", "content", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Зургийн URL
                </label>
                <input
                  type="url"
                  value={content.values?.imageUrl || ""}
                  onChange={(e) =>
                    handleInputChange("values", "imageUrl", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Түүх
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Гарчиг
                </label>
                <input
                  type="text"
                  value={content.history?.title || ""}
                  onChange={(e) =>
                    handleInputChange("history", "title", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Агуулга
                </label>
                <textarea
                  rows={4}
                  value={content.history?.content || ""}
                  onChange={(e) =>
                    handleInputChange("history", "content", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Зургийн URL
                </label>
                <input
                  type="url"
                  value={content.history?.imageUrl || ""}
                  onChange={(e) =>
                    handleInputChange("history", "imageUrl", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Холбоо барих мэдээлэл
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Хаяг
                </label>
                <input
                  type="text"
                  value={content.contact?.contactAddress || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "contact",
                      "contactAddress",
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Утас
                </label>
                <input
                  type="tel"
                  value={content.contact?.contactPhone || ""}
                  onChange={(e) =>
                    handleInputChange("contact", "contactPhone", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  И-мэйл
                </label>
                <input
                  type="email"
                  value={content.contact?.contactEmail || ""}
                  onChange={(e) =>
                    handleInputChange("contact", "contactEmail", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Цагийн хуваарь
                </label>
                <input
                  type="text"
                  value={content.contact?.contactHours || ""}
                  onChange={(e) =>
                    handleInputChange("contact", "contactHours", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAboutPage;
