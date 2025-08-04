"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import {
  Trophy,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Eye,
} from "lucide-react";

interface Tournament {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  location?: string;
  maxParticipants?: number;
  entryFee?: number;
  currency: string;
  category: string;
  status: string;
  rules?: string;
  prizes?: any;
  enrollLink?: string;
  createdAt: string;
  updatedAt: string;
  participants?: Array<{
    id: string;
    status: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }>;
  matches?: Array<{
    id: string;
    status: string;
    score?: string;
    matchDate?: string;
  }>;
}

interface TournamentFormData {
  title: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  location: string;
  maxParticipants: string;
  entryFee: string;
  currency: string;
  category: string;
  status: string;
  rules: string;
  prize1: string;
  prize2: string;
  prize3: string;
  enrollLink: string;
}

const AdminTournamentsPage = () => {
  const { isAuthenticated, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTournament, setSelectedTournament] =
    useState<Tournament | null>(null);
  const [mounted, setMounted] = useState(false);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<TournamentFormData>({
    title: "",
    description: "",
    imageUrl: "",
    startDate: "",
    endDate: "",
    location: "",
    maxParticipants: "",
    entryFee: "",
    currency: "MNT",
    category: "",
    status: "upcoming",
    rules: "",
    prize1: "",
    prize2: "",
    prize3: "",
    enrollLink: "",
  });
  const [editFormData, setEditFormData] = useState<TournamentFormData>({
    title: "",
    description: "",
    imageUrl: "",
    startDate: "",
    endDate: "",
    location: "",
    maxParticipants: "",
    entryFee: "",
    currency: "MNT",
    category: "",
    status: "upcoming",
    rules: "",
    prize1: "",
    prize2: "",
    prize3: "",
    enrollLink: "",
  });
  const [submitting, setSubmitting] = useState(false);

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

    fetchTournaments();
  }, [authLoading, isAuthenticated, isAdmin, router]);

  const fetchTournaments = async () => {
    try {
      const response = await fetch("/api/tournaments");
      if (!response.ok) {
        throw new Error("Failed to fetch tournaments");
      }
      const data = await response.json();
      setTournaments(data);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
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
    if (!formData.title.trim()) {
      alert("Tournament title is required");
      return;
    }

    if (!formData.description.trim()) {
      alert("Tournament description is required");
      return;
    }

    if (!formData.startDate) {
      alert("Start date is required");
      return;
    }

    if (!formData.endDate) {
      alert("End date is required");
      return;
    }

    if (!formData.category.trim()) {
      alert("Tournament category is required");
      return;
    }

    setSubmitting(true);

    try {
      const tournamentData = {
        ...formData,
        prizes: {
          "1-р байр": formData.prize1,
          "2-р байр": formData.prize2,
          "3-р байр": formData.prize3,
        },
      };

      console.log("Sending tournament data:", tournamentData);

      const response = await fetch("/api/tournaments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tournamentData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        throw new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const newTournament = await response.json();
      console.log("Created tournament:", newTournament);
      setTournaments((prev) => [newTournament, ...prev]);
      setShowAddModal(false);
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        startDate: "",
        endDate: "",
        location: "",
        maxParticipants: "",
        entryFee: "",
        currency: "MNT",
        category: "",
        status: "upcoming",
        rules: "",
        prize1: "",
        prize2: "",
        prize3: "",
        enrollLink: "",
      });
    } catch (error) {
      console.error("Error creating tournament:", error);
      alert(
        `Failed to create tournament: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTournament) return;

    setSubmitting(true);

    try {
      const tournamentData = {
        ...editFormData,
        maxParticipants: editFormData.maxParticipants
          ? parseInt(editFormData.maxParticipants)
          : null,
        entryFee: editFormData.entryFee
          ? parseFloat(editFormData.entryFee)
          : null,
        prizes: {
          "1-р байр": editFormData.prize1,
          "2-р байр": editFormData.prize2,
          "3-р байр": editFormData.prize3,
        },
      };

      const response = await fetch(
        `/api/tournaments/${selectedTournament.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tournamentData),
        }
      );

      if (!response.ok) {
        let errorMsg = "Failed to update tournament";
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorData.message || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }

      const updatedTournament = await response.json();
      setTournaments((prev) =>
        prev.map((tournament) =>
          tournament.id === selectedTournament.id
            ? updatedTournament
            : tournament
        )
      );
      setShowEditModal(false);
      setSelectedTournament(null);
    } catch (error) {
      console.error("Error updating tournament:", error);
      alert(
        error instanceof Error ? error.message : "Failed to update tournament"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (tournamentId: string) => {
    if (!confirm("Are you sure you want to delete this tournament?")) return;

    try {
      const response = await fetch(`/api/tournaments/${tournamentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete tournament");
      }

      setTournaments((prev) =>
        prev.filter((tournament) => tournament.id !== tournamentId)
      );
    } catch (error) {
      console.error("Error deleting tournament:", error);
      alert("Failed to delete tournament");
    }
  };

  const filteredTournaments = tournaments.filter((tournament) => {
    const matchesSearch =
      tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tournament.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || tournament.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || tournament.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Удахгүй эхлэх
          </span>
        );
      case "active":
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Идэвхтэй
          </span>
        );
      case "completed":
        return (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Дууссан
          </span>
        );
      case "cancelled":
        return (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Цуцлагдсан
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {status}
          </span>
        );
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Рубикийн шоо":
        return (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Рубикийн шоо
          </span>
        );
      case "Хуруундай":
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Хуруундай
          </span>
        );
      case "Спорт өрөлт":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Спорт өрөлт
          </span>
        );
      case "Түргэн бодолт":
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Түргэн бодолт
          </span>
        );
      case "Хурдан уншлага":
        return (
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Хурдан уншлага
          </span>
        );
      case "Ой тогтоолт":
        return (
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Ой тогтоолт
          </span>
        );
      case "Шатар":
        return (
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Шатар
          </span>
        );
      case "Го":
        return (
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Го
          </span>
        );
      case "Покер":
        return (
          <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Покер
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

  const formatDate = (dateString: string) => {
    if (!mounted) return "";
    return new Date(dateString).toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Show loading while checking authentication
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {authLoading
              ? "Нэвтрэх эрхийг шалгаж байна..."
              : "Тэмцээнуудыг ачаалж байна..."}
          </p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated or not admin
  if (!isAuthenticated() || !isAdmin()) {
    return null; // Will redirect in useEffect
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
                <h1 className="text-2xl font-bold text-gray-900">Тэмцээнүүд</h1>
                <p className="text-gray-600">
                  Тэмцээний жагсаалт, нэмэх, засах
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Тэмцээн нэмэх
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
                  placeholder="Тэмцээн хайх..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Бүх төлөв</option>
                <option value="upcoming">Удахгүй эхлэх</option>
                <option value="active">Идэвхтэй</option>
                <option value="completed">Дууссан</option>
                <option value="cancelled">Цуцлагдсан</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Бүх ангилал</option>
                <option value="Рубикийн шоо">Рубикийн шоо</option>
                <option value="Хуруундай">Хуруундай</option>
                <option value="Спорт өрөлт">Спорт өрөлт</option>
                <option value="Түргэн бодолт">Түргэн бодолт</option>
                <option value="Хурдан уншлага">Хурдан уншлага</option>
                <option value="Ой тогтоолт">Ой тогтоолт</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="h-48 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                <Trophy className="h-16 w-16 text-yellow-600" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  {getCategoryBadge(tournament.category)}
                  {getStatusBadge(tournament.status)}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tournament.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {tournament.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {formatDate(tournament.startDate)} -{" "}
                      {formatDate(tournament.endDate)}
                    </span>
                  </div>
                  {tournament.location && (
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{tournament.location}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>
                      {tournament.participants?.length || 0}
                      {tournament.maxParticipants &&
                        ` / ${tournament.maxParticipants}`}{" "}
                      оролцогч
                    </span>
                  </div>
                  {tournament.entryFee && (
                    <div className="flex items-center text-sm text-gray-500">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>
                        {tournament.entryFee} {tournament.currency}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedTournament(tournament);
                        setEditFormData({
                          title: tournament.title,
                          description: tournament.description,
                          imageUrl: tournament.imageUrl,
                          startDate: tournament.startDate.split("T")[0],
                          endDate: tournament.endDate.split("T")[0],
                          location: tournament.location || "",
                          maxParticipants:
                            tournament.maxParticipants?.toString() || "",
                          entryFee: tournament.entryFee?.toString() || "",
                          currency: tournament.currency,
                          category: tournament.category,
                          status: tournament.status,
                          rules: tournament.rules || "",
                          prize1: tournament.prizes?.["1-р байр"] || "",
                          prize2: tournament.prizes?.["2-р байр"] || "",
                          prize3: tournament.prizes?.["3-р байр"] || "",
                          enrollLink: tournament.enrollLink || "",
                        });
                        setShowEditModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(tournament.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <Link
                    href={`/tournaments/${tournament.id}`}
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Харах
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTournaments.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Тэмцээн олдсонгүй
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Одоогоор тэмцээн байхгүй байна.
            </p>
          </div>
        )}
      </div>

      {/* Add Tournament Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Тэмцээн нэмэх
              </h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Гарчиг
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
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
                      Эхлэх огноо
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Дуусах огноо
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Байршил
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Хамгийн их оролцогч
                    </label>
                    <input
                      type="number"
                      name="maxParticipants"
                      value={formData.maxParticipants}
                      onChange={handleInputChange}
                      min="1"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Оролцооны хураамж
                    </label>
                    <input
                      type="number"
                      name="entryFee"
                      value={formData.entryFee}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
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
                    <option value="">Ангилал сонгоно уу</option>
                    <option value="Рубикийн шоо">Рубикийн шоо</option>
                    <option value="Хуруундай">Хуруундай</option>
                    <option value="Спорт өрөлт">Спорт өрөлт</option>
                    <option value="Түргэн бодолт">Түргэн бодолт</option>
                    <option value="Хурдан уншлага">Хурдан уншлага</option>
                    <option value="Ой тогтоолт">Ой тогтоолт</option>
                    <option value="Шатар">Шатар</option>
                    <option value="Го">Го</option>
                    <option value="Покер">Покер</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Төлөв
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="upcoming">Удахгүй эхлэх</option>
                    <option value="active">Идэвхтэй</option>
                    <option value="completed">Дууссан</option>
                    <option value="cancelled">Цуцлагдсан</option>
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
                    Дүрэм
                  </label>
                  <textarea
                    rows={3}
                    name="rules"
                    value={formData.rules}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    1-р байр
                  </label>
                  <input
                    type="text"
                    name="prize1"
                    value={formData.prize1}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    2-р байр
                  </label>
                  <input
                    type="text"
                    name="prize2"
                    value={formData.prize2}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    3-р байр
                  </label>
                  <input
                    type="text"
                    name="prize3"
                    value={formData.prize3}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Google Form линк
                  </label>
                  <input
                    type="url"
                    name="enrollLink"
                    value={formData.enrollLink}
                    onChange={handleInputChange}
                    placeholder="Бүртгүүлэх Google Form линк"
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
                    disabled={submitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {submitting ? "Нэмж байна..." : "Нэмэх"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tournament Modal */}
      {showEditModal && selectedTournament && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Тэмцээн засах
              </h3>
              <form className="space-y-4" onSubmit={handleEdit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Гарчиг
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={(e) =>
                      setEditFormData((f) => ({ ...f, title: e.target.value }))
                    }
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
                    value={editFormData.description}
                    onChange={(e) =>
                      setEditFormData((f) => ({
                        ...f,
                        description: e.target.value,
                      }))
                    }
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Эхлэх огноо
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={editFormData.startDate}
                      onChange={(e) =>
                        setEditFormData((f) => ({
                          ...f,
                          startDate: e.target.value,
                        }))
                      }
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Дуусах огноо
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={editFormData.endDate}
                      onChange={(e) =>
                        setEditFormData((f) => ({
                          ...f,
                          endDate: e.target.value,
                        }))
                      }
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Байршил
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={editFormData.location}
                    onChange={(e) =>
                      setEditFormData((f) => ({
                        ...f,
                        location: e.target.value,
                      }))
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Хамгийн их оролцогч
                    </label>
                    <input
                      type="number"
                      name="maxParticipants"
                      value={editFormData.maxParticipants}
                      onChange={(e) =>
                        setEditFormData((f) => ({
                          ...f,
                          maxParticipants: e.target.value,
                        }))
                      }
                      min="1"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Оролцооны хураамж
                    </label>
                    <input
                      type="number"
                      name="entryFee"
                      value={editFormData.entryFee}
                      onChange={(e) =>
                        setEditFormData((f) => ({
                          ...f,
                          entryFee: e.target.value,
                        }))
                      }
                      min="0"
                      step="0.01"
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
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Ангилал сонгоно уу</option>
                    <option value="Рубикийн шоо">Рубикийн шоо</option>
                    <option value="Хуруундай">Хуруундай</option>
                    <option value="Спорт өрөлт">Спорт өрөлт</option>
                    <option value="Түргэн бодолт">Түргэн бодолт</option>
                    <option value="Хурдан уншлага">Хурдан уншлага</option>
                    <option value="Ой тогтоолт">Ой тогтоолт</option>
                    <option value="Шатар">Шатар</option>
                    <option value="Го">Го</option>
                    <option value="Покер">Покер</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Төлөв
                  </label>
                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={(e) =>
                      setEditFormData((f) => ({ ...f, status: e.target.value }))
                    }
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="upcoming">Удахгүй эхлэх</option>
                    <option value="active">Идэвхтэй</option>
                    <option value="completed">Дууссан</option>
                    <option value="cancelled">Цуцлагдсан</option>
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
                    Дүрэм
                  </label>
                  <textarea
                    rows={3}
                    name="rules"
                    value={editFormData.rules}
                    onChange={(e) =>
                      setEditFormData((f) => ({ ...f, rules: e.target.value }))
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    1-р байр
                  </label>
                  <input
                    type="text"
                    name="prize1"
                    value={editFormData.prize1}
                    onChange={(e) =>
                      setEditFormData((f) => ({ ...f, prize1: e.target.value }))
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    2-р байр
                  </label>
                  <input
                    type="text"
                    name="prize2"
                    value={editFormData.prize2}
                    onChange={(e) =>
                      setEditFormData((f) => ({ ...f, prize2: e.target.value }))
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    3-р байр
                  </label>
                  <input
                    type="text"
                    name="prize3"
                    value={editFormData.prize3}
                    onChange={(e) =>
                      setEditFormData((f) => ({ ...f, prize3: e.target.value }))
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Google Form линк
                  </label>
                  <input
                    type="url"
                    name="enrollLink"
                    value={editFormData.enrollLink}
                    onChange={(e) =>
                      setEditFormData((f) => ({
                        ...f,
                        enrollLink: e.target.value,
                      }))
                    }
                    placeholder="Бүртгүүлэх Google Form линк"
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
    </div>
  );
};

export default AdminTournamentsPage;
