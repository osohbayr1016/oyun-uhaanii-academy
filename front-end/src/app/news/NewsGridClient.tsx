"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type NewsArticle = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  publishedAt: string;
  author: { id: string; name: string; email: string };
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function fetchNewsList(signal: AbortSignal): Promise<NewsArticle[]> {
  const r = await fetch("/api/news", { cache: "no-store", signal });
  if (!r.ok) return [];
  const data = await r.json();
  return Array.isArray(data) ? data : [];
}

export default function NewsGridClient({ news: initial }: { news: NewsArticle[] }) {
  const [news, setNews] = useState(initial);
  const [hydrating, setHydrating] = useState(() => initial.length === 0);

  useEffect(() => {
    if (initial.length > 0) {
      setNews(initial);
      setHydrating(false);
    }
  }, [initial]);

  useEffect(() => {
    if (initial.length > 0) return;

    const ac = new AbortController();
    let cancelled = false;

    (async () => {
      setHydrating(true);
      for (let attempt = 1; attempt <= 3; attempt++) {
        if (cancelled) return;
        try {
          const list = await fetchNewsList(ac.signal);
          if (!cancelled) setNews(list);
          break;
        } catch (e) {
          if (e instanceof Error && e.name === "AbortError") return;
          if (attempt < 3) {
            await new Promise((r) => setTimeout(r, 250 * attempt));
          }
        }
      }
      if (!cancelled) setHydrating(false);
    })();

    return () => {
      cancelled = true;
      ac.abort();
    };
  }, [initial.length]);

  if (hydrating && news.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">Ачаалж байна…</div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📰</div>
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">
          Одоогоор мэдээ байхгүй байна
        </h2>
        <p className="text-gray-500">Удахгүй шинэ мэдээ нэмэгдэх болно.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
          {article.videoUrl && !article.imageUrl && (
            <div className="relative h-48 w-full">
              <video
                src={article.videoUrl}
                className="w-full h-full object-cover"
                controls
                preload="metadata"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <span>👤 {article.author?.name ?? "—"}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{article.content}</p>
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
  );
}
