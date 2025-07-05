"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  ArrowLeft,
  Eye,
  Package,
  DollarSign,
  Tag,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  category: string;
  stock: number;
  materials: string[];
  dimensions?: any;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  currency: string;
  imageUrl: string;
  category: string;
  stock: string;
  materials: string;
}

const AdminProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    currency: "MNT",
    imageUrl: "",
    category: "Ном",
    stock: "",
    materials: "",
  });
  const [editFormData, setEditFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    currency: "MNT",
    imageUrl: "",
    category: "",
    stock: "",
    materials: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.name.trim()) {
      alert("Product name is required");
      return;
    }

    if (!formData.price || isNaN(parseFloat(formData.price))) {
      alert("Valid price is required");
      return;
    }

    if (!formData.description.trim()) {
      alert("Product description is required");
      return;
    }

    if (!formData.category.trim()) {
      alert("Product category is required");
      return;
    }

    setSubmitting(true);

    try {
      const productData = {
        ...formData,
        materials: formData.materials
          ? formData.materials.split(",").map((m) => m.trim())
          : [],
      };

      console.log("Sending product data:", productData);

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        throw new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const newProduct = await response.json();
      console.log("Created product:", newProduct);
      setProducts((prev) => [newProduct, ...prev]);
      setShowAddModal(false);
      setFormData({
        name: "",
        description: "",
        price: "",
        currency: "MNT",
        imageUrl: "",
        category: "Ном",
        stock: "",
        materials: "",
      });
    } catch (error) {
      console.error("Error creating product:", error);
      alert(
        `Failed to create product: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setSubmitting(true);

    try {
      const response = await fetch(`/api/products/${selectedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...editFormData,
          materials: editFormData.materials
            ? editFormData.materials.split(",").map((m) => m.trim())
            : [],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await response.json();
      setProducts((prev) =>
        prev.map((product) =>
          product.id === selectedProduct.id ? updatedProduct : product
        )
      );
      setShowEditModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts((prev) => prev.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Ном":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Ном
          </span>
        );
      case "Атлас":
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Атлас
          </span>
        );
      case "Хэрэгсэл":
        return (
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Хэрэгсэл
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {category}
          </span>
        );
    }
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return (
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Нөөц дууссан
        </span>
      );
    } else if (stock < 10) {
      return (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Бага нөөц
        </span>
      );
    } else {
      return (
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Нөөцтэй
        </span>
      );
    }
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
                <h1 className="text-2xl font-bold text-gray-900">
                  Бүтээгдэхүүн
                </h1>
                <p className="text-gray-600">
                  Бүтээгдэхүүний жагсаалт, нэмэх, засах
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Бүтээгдэхүүн нэмэх
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Бүтээгдэхүүн хайх..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Бүх ангилал</option>
                <option value="Ном">Ном</option>
                <option value="Атлас">Атлас</option>
                <option value="Хэрэгсэл">Хэрэгсэл</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <ShoppingBag className="h-16 w-16 text-purple-600" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  {getCategoryBadge(product.category)}
                  {getStockBadge(product.stock)}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {product.price.toLocaleString()} {product.currency}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Package className="w-4 h-4 mr-2" />
                    Нөөц: {product.stock}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Tag className="w-4 h-4 mr-2" />
                    {product.category}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowEditModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 p-2"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900 p-2">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-400">
                    {mounted &&
                      new Date(product.createdAt).toLocaleDateString("mn-MN")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Бүтээгдэхүүн нэмэх
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Нэр
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Тайлбар
                  </label>
                  <textarea
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Үнэ
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Нөөц
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ангилал
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Ном">Ном</option>
                    <option value="Атлас">Атлас</option>
                    <option value="Хэрэгсэл">Хэрэгсэл</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Зургийн URL
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Материал
                  </label>
                  <input
                    type="text"
                    name="materials"
                    value={formData.materials}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Цуцлах
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Нэмэх
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Бүтээгдэхүүн засах
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Нэр
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={(e) =>
                      setEditFormData((f) => ({ ...f, name: e.target.value }))
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Тайлбар
                  </label>
                  <textarea
                    rows={3}
                    name="description"
                    value={editFormData.description}
                    onChange={(e) =>
                      setEditFormData((f) => ({
                        ...f,
                        description: e.target.value,
                      }))
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Үнэ
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={editFormData.price}
                      onChange={(e) =>
                        setEditFormData((f) => ({
                          ...f,
                          price: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Нөөц
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={editFormData.stock}
                      onChange={(e) =>
                        setEditFormData((f) => ({
                          ...f,
                          stock: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ангилал
                  </label>
                  <select
                    name="category"
                    value={editFormData.category}
                    onChange={(e) =>
                      setEditFormData((f) => ({
                        ...f,
                        category: e.target.value,
                      }))
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Ном">Ном</option>
                    <option value="Атлас">Атлас</option>
                    <option value="Хэрэгсэл">Хэрэгсэл</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Зургийн URL
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={editFormData.imageUrl}
                    onChange={(e) =>
                      setEditFormData((f) => ({
                        ...f,
                        imageUrl: e.target.value,
                      }))
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Материал
                  </label>
                  <input
                    type="text"
                    name="materials"
                    value={editFormData.materials}
                    onChange={(e) =>
                      setEditFormData((f) => ({
                        ...f,
                        materials: e.target.value,
                      }))
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Цуцлах
                  </button>
                  <button
                    type="submit"
                    onClick={handleEdit}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Хадгалах
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

export default AdminProductsPage;
