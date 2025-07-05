"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publishedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

export default function AdminNewsPage() {
  const { user } = useAuth();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (user?.role !== "admin") {
      window.location.href = "/login";
      return;
    }
    fetchNews();
  }, [user]);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/news`
      );
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const url = editingNews
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/news/${editingNews.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/news`;

      const response = await fetch(url, {
        method: editingNews ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save news");

      await fetchNews();
      resetForm();
    } catch (error) {
      console.error("Error saving news:", error);
      alert("Мэдээ хадгалахад алдаа гарлаа");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Энэ мэдээг устгахдаа итгэлтэй байна уу?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/news/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete news");

      await fetchNews();
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Мэдээ устгахад алдаа гарлаа");
    }
  };

  const handleEdit = (article: NewsArticle) => {
    setEditingNews(article);
    setFormData({
      title: article.title,
      content: article.content,
      imageUrl: article.imageUrl || "",
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", imageUrl: "" });
    setEditingNews(null);
    setShowForm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Ачаалж байна...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Мэдээ удирдлага</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Шинэ мэдээ
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">
                {editingNews ? "Мэдээ засах" : "Шинэ мэдээ"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Гарчиг
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Зураг URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Агуулга
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingNews ? "Хадгалах" : "Нэмэх"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Цуцлах
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* News List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Мэдээний жагсаалт</h2>

            {news.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Одоогоор мэдээ байхгүй байна</p>
              </div>
            ) : (
              <div className="space-y-4">
                {news.map((article) => (
                  <div
                    key={article.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {article.content}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 gap-4">
                          <span>👤 {article.author.name}</span>
                          <span>📅 {formatDate(article.publishedAt)}</span>
                          {article.imageUrl && <span>🖼️ Зурагтай</span>}
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(article)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Засах"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Устгах"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
