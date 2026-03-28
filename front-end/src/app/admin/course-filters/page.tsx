"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Tag,
  Layers,
} from "lucide-react";
import { fetchBffJson } from "@/lib/fetchBffWithRetry";
import AdminLoadErrorBanner from "../_components/AdminLoadErrorBanner";

interface Category {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Level {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const AdminCourseFiltersPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingLevel, setEditingLevel] = useState<Level | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [levelName, setLevelName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const [catData, levData] = await Promise.all([
          fetchBffJson<Category[]>("/api/course-filters/categories"),
          fetchBffJson<Level[]>("/api/course-filters/levels"),
        ]);
        if (!cancelled) {
          setCategories(Array.isArray(catData) ? catData : []);
          setLevels(Array.isArray(levData) ? levData : []);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setLoadError(
            e instanceof Error ? e.message : "Ангилал/түвшин ачаалж чадсангүй"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await fetchBffJson<Category[]>(
        "/api/course-filters/categories"
      );
      setCategories(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchLevels = async () => {
    try {
      const data = await fetchBffJson<Level[]>("/api/course-filters/levels");
      setLevels(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const url = editingCategory 
        ? `/api/course-filters/categories/${editingCategory.id}`
        : "/api/course-filters/categories";
      
      const method = editingCategory ? "PUT" : "POST";
      const body = editingCategory 
        ? JSON.stringify({ name: categoryName, isActive: true })
        : JSON.stringify({ name: categoryName });

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body,
      });

      if (response.ok) {
        setShowCategoryModal(false);
        setCategoryName("");
        setEditingCategory(null);
        fetchCategories();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save category");
      }
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLevelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const url = editingLevel 
        ? `/api/course-filters/levels/${editingLevel.id}`
        : "/api/course-filters/levels";
      
      const method = editingLevel ? "PUT" : "POST";
      const body = editingLevel 
        ? JSON.stringify({ name: levelName, isActive: true })
        : JSON.stringify({ name: levelName });

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body,
      });

      if (response.ok) {
        setShowLevelModal(false);
        setLevelName("");
        setEditingLevel(null);
        fetchLevels();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save level");
      }
    } catch (error) {
      console.error("Error saving level:", error);
      alert("Failed to save level");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setShowCategoryModal(true);
  };

  const handleEditLevel = (level: Level) => {
    setEditingLevel(level);
    setLevelName(level.name);
    setShowLevelModal(true);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/course-filters/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (response.ok) {
        fetchCategories();
      } else {
        alert("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category");
    }
  };

  const handleDeleteLevel = async (levelId: string) => {
    if (!confirm("Are you sure you want to delete this level?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/course-filters/levels/${levelId}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (response.ok) {
        fetchLevels();
      } else {
        alert("Failed to delete level");
      }
    } catch (error) {
      console.error("Error deleting level:", error);
      alert("Failed to delete level");
    }
  };

  const openCategoryModal = () => {
    setEditingCategory(null);
    setCategoryName("");
    setShowCategoryModal(true);
  };

  const openLevelModal = () => {
    setEditingLevel(null);
    setLevelName("");
    setShowLevelModal(true);
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
                <h1 className="text-2xl font-bold text-gray-900">Сургалтын шүүлтүүрүүд</h1>
                <p className="text-gray-600">
                  Сургалтын ангилал болон түвшинүүдийг удирдах
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminLoadErrorBanner message={loadError} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Categories Section */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Tag className="h-5 w-5 text-blue-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Ангилалууд</h2>
                </div>
                <button
                  onClick={openCategoryModal}
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Нэмэх
                </button>
              </div>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-gray-900">{category.name}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {categories.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      Ангилал байхгүй байна
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Levels Section */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Layers className="h-5 w-5 text-green-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Түвшинүүд</h2>
                </div>
                <button
                  onClick={openLevelModal}
                  className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Нэмэх
                </button>
              </div>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  {levels.map((level) => (
                    <div
                      key={level.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-gray-900">{level.name}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditLevel(level)}
                          className="text-green-600 hover:text-green-900 p-1"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLevel(level.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {levels.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      Түвшин байхгүй байна
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingCategory ? "Ангилал засах" : "Ангилал нэмэх"}
              </h3>
              <form onSubmit={handleCategorySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ангилалын нэр
                  </label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Цуцлах
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {submitting ? "Хадгалж байна..." : "Хадгалах"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Level Modal */}
      {showLevelModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingLevel ? "Түвшин засах" : "Түвшин нэмэх"}
              </h3>
              <form onSubmit={handleLevelSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Түвшний нэр
                  </label>
                  <input
                    type="text"
                    value={levelName}
                    onChange={(e) => setLevelName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowLevelModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Цуцлах
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {submitting ? "Хадгалж байна..." : "Хадгалах"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourseFiltersPage; 