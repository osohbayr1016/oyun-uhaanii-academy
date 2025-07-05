"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  ArrowLeft,
  Eye,
  Calendar,
  MapPin,
  Users,
  Award,
} from "lucide-react";

const AdminTournamentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<any>(null);

  const tournaments = [
    {
      id: "1",
      title: "Монголын түүхэн олимпиад",
      description:
        "Монголын түүхэн дэх чухал үйл явдлуудын талаарх мэдлэгийн тэмцээн",
      date: "2024-12-15",
      location: "Улаанбаатар",
      participants: 150,
      maxParticipants: 200,
      prize: "1,000,000 ₮",
      status: "registration_open",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Уран зохиолын уншлага",
      description: "Монголын сонгодог уран зохиолын уншлагын тэмцээн",
      date: "2024-11-20",
      location: "Улаанбаатар",
      participants: 80,
      maxParticipants: 100,
      prize: "500,000 ₮",
      status: "registration_open",
      createdAt: "2024-02-20",
    },
    {
      id: "3",
      title: "Географийн мэдлэгийн тэмцээн",
      description: "Монгол улсын байгаль, газар зүйн мэдлэгийн тэмцээн",
      date: "2024-10-30",
      location: "Улаанбаатар",
      participants: 120,
      maxParticipants: 150,
      prize: "750,000 ₮",
      status: "completed",
      createdAt: "2024-03-10",
    },
    {
      id: "4",
      title: "Математикийн олимпиад",
      description: "7-12 насны хүүхдүүдэд зориулсан математикийн тэмцээн",
      date: "2025-01-15",
      location: "Улаанбаатар",
      participants: 45,
      maxParticipants: 80,
      prize: "800,000 ₮",
      status: "draft",
      createdAt: "2024-04-05",
    },
  ];

  const filteredTournaments = tournaments.filter((tournament) => {
    const matchesSearch =
      tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tournament.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || tournament.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "registration_open":
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Бүртгэл идэвхтэй
          </span>
        );
      case "registration_closed":
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Бүртгэл хаагдсан
          </span>
        );
      case "completed":
        return (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Дууссан
          </span>
        );
      case "draft":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Ноорог
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Тодорхойгүй
          </span>
        );
    }
  };

  const getParticipantProgress = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${
            percentage >= 90
              ? "bg-red-500"
              : percentage >= 70
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    );
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
                <h1 className="text-2xl font-bold text-gray-900">Тэмцээн</h1>
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
                <option value="registration_open">Бүртгэл идэвхтэй</option>
                <option value="registration_closed">Бүртгэл хаагдсан</option>
                <option value="completed">Дууссан</option>
                <option value="draft">Ноорог</option>
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
              <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                <Trophy className="h-16 w-16 text-orange-600" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
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
                    {new Date(tournament.date).toLocaleDateString("mn-MN")}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    {tournament.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Award className="w-4 h-4 mr-2" />
                    {tournament.prize}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>
                        Оролцогч: {tournament.participants}/
                        {tournament.maxParticipants}
                      </span>
                    </div>
                    {getParticipantProgress(
                      tournament.participants,
                      tournament.maxParticipants
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedTournament(tournament);
                        setShowEditModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 p-2"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900 p-2">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900 p-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(tournament.createdAt).toLocaleDateString("mn-MN")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Tournament Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Тэмцээн нэмэх
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Гарчиг
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Тайлбар
                  </label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Огноо
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Байршил
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Хамгийн их оролцогч
                    </label>
                    <input
                      type="number"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Шагнал
                    </label>
                    <input
                      type="text"
                      placeholder="1,000,000 ₮"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Төлөв
                  </label>
                  <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="draft">Ноорог</option>
                    <option value="registration_open">Бүртгэл идэвхтэй</option>
                    <option value="registration_closed">
                      Бүртгэл хаагдсан
                    </option>
                    <option value="completed">Дууссан</option>
                  </select>
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

      {/* Edit Tournament Modal */}
      {showEditModal && selectedTournament && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Тэмцээн засах
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Гарчиг
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedTournament.title}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Тайлбар
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={selectedTournament.description}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Огноо
                    </label>
                    <input
                      type="date"
                      defaultValue={selectedTournament.date}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Байршил
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedTournament.location}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Хамгийн их оролцогч
                    </label>
                    <input
                      type="number"
                      defaultValue={selectedTournament.maxParticipants}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Шагнал
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedTournament.prize}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Төлөв
                  </label>
                  <select
                    defaultValue={selectedTournament.status}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="draft">Ноорог</option>
                    <option value="registration_open">Бүртгэл идэвхтэй</option>
                    <option value="registration_closed">
                      Бүртгэл хаагдсан
                    </option>
                    <option value="completed">Дууссан</option>
                  </select>
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

export default AdminTournamentsPage;
