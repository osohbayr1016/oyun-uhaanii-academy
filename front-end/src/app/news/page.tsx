"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Newsletter subscription state
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [subscribeMessage, setSubscribeMessage] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/news");
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await response.json();
      setNews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setSubscribeStatus("error");
      setSubscribeMessage("Имэйл хаяг оруулна уу");
      return;
    }

    setSubscribeStatus("loading");
    setSubscribeMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribeStatus("success");
        setSubscribeMessage(data.message);
        setEmail("");
      } else {
        setSubscribeStatus("error");
        setSubscribeMessage(data.message || "Алдаа гарлаа");
      }
    } catch (error) {
      setSubscribeStatus("error");
      setSubscribeMessage("Серверийн алдаа");
    }
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
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">уншиж байна...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Алдаа гарлаа
            </h1>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={fetchNews}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Дахин оролдох
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            МЭДЭЭ, МЭДЭЭЛЭЛ
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Монголын оюун ухааны академийн хамгийн сүүлийн үеийн мэдээ,
            мэдээлэл, арга хэмжээний талаарх мэдээллүүд.
          </p>
        </div>

        {/* News Grid */}
        {news.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📰</div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              Одоогоор мэдээ байхгүй байна
            </h2>
            <p className="text-gray-500">Удахгүй шинэ мэдээ нэмэгдэх болно.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {article.imageUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>👤 {article.author.name}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.content}
                  </p>
                  <Link
                    href={`/news/${article.id}`}
                    className="inline-flex items-center text-[#550080] hover:text-[#550080] font-medium transition-colors"
                  >
                    Дэлгэрэнгүй унших
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Мэдээний жагсаалтад бүртгүүлэх
          </h2>
          <p className="text-gray-600 mb-6">
            Шинэ мэдээ, арга хэмжээний мэдээллийг имэйлээр хүлээн аваарай.
          </p>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Имэйл хаягаа оруулна уу"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={subscribeStatus === "loading"}
              />
              <button
                type="submit"
                disabled={subscribeStatus === "loading"}
                className="bg-[#550080] text-white px-6 py-3 rounded-r-lg hover:bg-[#550080] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscribeStatus === "loading" ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Илгээж байна...
                  </div>
                ) : (
                  "Бүртгүүлэх"
                )}
              </button>
            </div>
            {subscribeMessage && (
              <p
                className={`mt-3 text-sm ${
                  subscribeStatus === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {subscribeMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
