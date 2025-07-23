"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Trophy,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  ArrowLeft,
  Clock,
  Award,
} from "lucide-react";
import Image from "next/image";

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
    player1: {
      id: string;
      name: string;
    };
    player2: {
      id: string;
      name: string;
    };
    winner?: {
      id: string;
      name: string;
    };
  }>;
}

const TournamentDetailPage = () => {
  const params = useParams();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (params.id) {
      fetchTournament();
    }
  }, [params.id]);

  const fetchTournament = async () => {
    try {
      const response = await fetch(`/api/tournaments/${params.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch tournament");
      }
      const data = await response.json();
      setTournament(data);
    } catch (error) {
      console.error("Error fetching tournament:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            Удахгүй эхлэх
          </span>
        );
      case "active":
        return (
          <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
            Идэвхтэй
          </span>
        );
      case "completed":
        return (
          <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
            Дууссан
          </span>
        );
      case "cancelled":
        return (
          <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
            Цуцлагдсан
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
            {status}
          </span>
        );
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Шатар":
        return (
          <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
            Шатар
          </span>
        );
      case "Го":
        return (
          <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
            Го
          </span>
        );
      case "Покер":
        return (
          <span className="bg-pink-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
            Покер
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
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

  const formatDateTime = (dateString: string) => {
    if (!mounted) return "";
    return new Date(dateString).toLocaleString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Тэмцээний мэдээллийг ачаалж байна...
          </p>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Trophy className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Тэмцээн олдсонгүй
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Хүссэн тэмцээн байхгүй байна.
          </p>
          <Link
            href="/tournaments"
            className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Тэмцээнүүд рүү буцах
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Link href="/tournaments" className="mr-4">
              <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-gray-900" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {tournament.title}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                {getCategoryBadge(tournament.category)}
                {getStatusBadge(tournament.status)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tournament Image */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center relative">
                {tournament.imageUrl && tournament.imageUrl.trim() !== "" ? (
                  <Image
                    src={tournament.imageUrl}
                    alt={tournament.title}
                    fill
                    className="object-cover"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                ) : (
                  <Trophy className="h-24 w-24 text-yellow-600" />
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Тайлбар
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {tournament.description}
              </p>
            </div>

            {/* Rules */}
            {tournament.rules && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Дүрэм
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {tournament.rules}
                  </p>
                </div>
              </div>
            )}

            {/* Matches */}
            {tournament.matches && tournament.matches.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Тоглолтууд
                </h2>
                <div className="space-y-4">
                  {tournament.matches.map((match) => (
                    <div
                      key={match.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="font-medium text-gray-900">
                              {match.player1.name}
                            </p>
                          </div>
                          <div className="text-gray-500">VS</div>
                          <div className="text-center">
                            <p className="font-medium text-gray-900">
                              {match.player2.name}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {match.score && (
                            <p className="text-sm text-gray-600">
                              {match.score}
                            </p>
                          )}
                          {match.winner && (
                            <p className="text-sm text-green-600 font-medium">
                              Ялагч: {match.winner.name}
                            </p>
                          )}
                          <p className="text-xs text-gray-400">
                            {match.status === "completed"
                              ? "Дууссан"
                              : match.status === "in_progress"
                              ? "Тоглолтод"
                              : "Хуваарь"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tournament Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Тэмцээний мэдээлэл
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-medium">
                      Эхлэх: {formatDate(tournament.startDate)}
                    </p>
                    <p className="font-medium">
                      Дуусах: {formatDate(tournament.endDate)}
                    </p>
                  </div>
                </div>
                {tournament.location && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3" />
                    <span>{tournament.location}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-3" />
                  <span>{tournament.participants?.length || 0} оролцогч</span>
                </div>
                {tournament.entryFee && (
                  <div className="flex items-center text-gray-600">
                    <Trophy className="w-5 h-5 mr-3 text-yellow-600" />
                    <span>
                      {tournament.entryFee} {tournament.currency}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Prizes */}
            {tournament.prizes && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Шагнал
                </h3>
                <div className="space-y-3">
                  {Object.entries(tournament.prizes).map(([place, amount]) => (
                    <div
                      key={place}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-2 text-yellow-600" />
                        <span className="font-medium">{place}</span>
                      </div>
                      <span className="text-green-600 font-semibold">
                        {String(amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Үйл ажиллагаа
              </h3>
              <div className="space-y-3">
                {tournament.status === "upcoming" && tournament.enrollLink && (
                  <a
                    href={tournament.enrollLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Бүртгүүлэх
                  </a>
                )}
                {tournament.status === "upcoming" && !tournament.enrollLink && (
                  <button
                    disabled
                    className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg cursor-not-allowed"
                  >
                    Бүртгүүлэх (Google Form линк байхгүй)
                  </button>
                )}
                {tournament.status === "active" && <></>}
                <Link
                  href="/tournaments"
                  className="block w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Бүх тэмцээнүүд
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetailPage;
