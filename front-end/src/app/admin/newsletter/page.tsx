"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { fetchBffJsonAdmin } from "@/lib/adminFetchBff";
import AdminLoadErrorBanner from "../_components/AdminLoadErrorBanner";

interface NewsletterSubscriber {
  id: string;
  email: string;
  isActive: boolean;
  subscribedAt: string;
  lastEmailSent?: string;
}

interface NewsletterStats {
  totalSubscribers: number;
  totalUnsubscribed: number;
  thisWeekSubscribers: number;
}

export default function NewsletterAdminPage() {
  const { user, isAdmin } = useAuth();
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [stats, setStats] = useState<NewsletterStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailForm, setEmailForm] = useState({
    subject: "",
    content: "",
  });

  useEffect(() => {
    fetchSubscribers();
    fetchStats();
  }, []);

  const fetchSubscribers = async () => {
    setLoadError(null);
    try {
      const data = await fetchBffJsonAdmin<NewsletterSubscriber[]>(
        "/api/admin/newsletter/subscribers"
      );
      setSubscribers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      setSubscribers([]);
      setLoadError(
        error instanceof Error ? error.message : "Жагсаалт ачаалж чадсангүй"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await fetchBffJsonAdmin<NewsletterStats>(
        "/api/admin/newsletter/stats"
      );
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const sendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingEmail(true);

    try {
      const response = await fetch("/api/admin/newsletter/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(emailForm),
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          `Имэйл илгээлт амжилттай! Амжилттай: ${data.successCount}, Алдаа: ${data.errorCount}`
        );
        setEmailForm({ subject: "", content: "" });
      } else {
        alert(data.message || "Алдаа гарлаа");
      }
    } catch (error) {
      alert("Серверийн алдаа");
    } finally {
      setSendingEmail(false);
    }
  };

  if (!user || !isAdmin()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Хандах эрх байхгүй
          </h1>
          <p className="text-gray-600">
            Энэ хуудсанд хандахын тулд админ эрх шаардлагатай.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdminLoadErrorBanner message={loadError} />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Мэдээний жагсаалт удирдлага
          </h1>
          <p className="mt-2 text-gray-600">
            Бүртгэлтэй хэрэглэгчдийн жагсаалт болон имэйл илгээлт
          </p>
        </div>

        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Нийт бүртгэлтэй
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                {stats.totalSubscribers}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Энэ долоо хоногт
              </h3>
              <p className="text-3xl font-bold text-green-600">
                {stats.thisWeekSubscribers}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">Хасагдсан</h3>
              <p className="text-3xl font-bold text-red-600">
                {stats.totalUnsubscribed}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Send Newsletter Form */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Имэйл илгээх
              </h2>
            </div>
            <div className="p-6">
              <form onSubmit={sendNewsletter} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Гарчиг
                  </label>
                  <input
                    type="text"
                    value={emailForm.subject}
                    onChange={(e) =>
                      setEmailForm({ ...emailForm, subject: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Агуулга
                  </label>
                  <textarea
                    value={emailForm.content}
                    onChange={(e) =>
                      setEmailForm({ ...emailForm, content: e.target.value })
                    }
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={sendingEmail}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sendingEmail ? "Илгээж байна..." : "Имэйл илгээх"}
                </button>
              </form>
            </div>
          </div>

          {/* Subscribers List */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Бүртгэлтэй хэрэглэгчид
              </h2>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Уншиж байна...</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {subscribers.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      Бүртгэлтэй хэрэглэгч байхгүй
                    </p>
                  ) : (
                    subscribers.map((subscriber) => (
                      <div
                        key={subscriber.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {subscriber.email}
                          </p>
                          <p className="text-sm text-gray-500">
                            Бүртгүүлсэн:{" "}
                            {new Date(
                              subscriber.subscribedAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              subscriber.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {subscriber.isActive ? "Идэвхтэй" : "Идэвхгүй"}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
