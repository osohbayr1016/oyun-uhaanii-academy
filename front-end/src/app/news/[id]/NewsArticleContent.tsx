import Link from "next/link";
import Image from "next/image";
import type { NewsArticle } from "@/lib/newsArticleTypes";
import SocialSharing from "./_components/SocialSharing";
import MetaTagInjector from "./_components/MetaTagInjector";
import NewsArticleStructuredData from "./NewsArticleStructuredData";
import RelatedNewsPlaceholder from "./RelatedNewsPlaceholder";
import { formatNewsDate, getYouTubeEmbedUrl } from "./newsArticleUtils";

export default function NewsArticleContent({
  article,
  id,
}: {
  article: NewsArticle;
  id: string;
}) {
  return (
    <>
      <NewsArticleStructuredData article={article} id={id} />

      <MetaTagInjector
        articleTitle={article.title}
        articleContent={article.content}
        articleImageUrl={article.imageUrl}
        articleId={id}
        publishedAt={article.publishedAt}
        authorName={article.author.name}
      />

      <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-12">
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#550080] transition-colors"
                >
                  Нүүр
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-[#550080] transition-colors"
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

            {article.videoUrl && !article.imageUrl && (
              <div className="relative h-64 md:h-96 w-full">
                <video
                  src={article.videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                />
              </div>
            )}

            <div className="p-6 md:p-8">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>👤 {article.author.name}</span>
                <span className="mx-2">•</span>
                <span>{formatNewsDate(article.publishedAt)}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                {article.title}
              </h1>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="whitespace-pre-wrap">{article.content}</p>
              </div>

              {article.videoUrl && article.imageUrl && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Видео
                  </h2>
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <iframe
                      src={getYouTubeEmbedUrl(article.videoUrl)}
                      title={article.title}
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      frameBorder={0}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <SocialSharing articleTitle={article.title} articleId={id} />

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
            </div>
          </article>

          <RelatedNewsPlaceholder />
        </div>
      </div>
    </>
  );
}
