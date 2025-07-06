"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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

export default function NewsArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchArticle(params.id as string);
    }
  }, [params.id]);

  const fetchArticle = async (id: string) => {
    try {
      const response = await fetch(`/api/news/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch article");
      }
      const data = await response.json();
      setArticle(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Мэдээлэл ачаалж байна...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Алдаа гарлаа
            </h1>
            <p className="text-gray-600">{error || "Мэдээ олдсонгүй"}</p>
            <Link
              href="/news"
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Мэдээний жагсаалт руу буцах
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Нүүр
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link
                href="/news"
                className="hover:text-blue-600 transition-colors"
              >
                Мэдээ
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-800 font-medium truncate">
              {article.title}
            </li>
          </ol>
        </nav>

        {/* Article Content */}
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {article.imageUrl && (
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Article Meta */}
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>👤 {article.author.name}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(article.publishedAt)}</span>
            </div>

            {/* Article Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {article.title}
            </h1>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="whitespace-pre-wrap">{article.content}</p>
            </div>

            {/* Back to News Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                href="/news"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <svg
                  className="mr-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Мэдээний жагсаалт руу буцах
              </Link>
            </div>
          </div>
        </article>

        {/* Related Articles Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Бусад мэдээ</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* This would be populated with related articles */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-gray-400 text-4xl mb-4">📰</div>
              <p className="text-gray-600">
                Удахгүй бусад мэдээ нэмэгдэх болно.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
