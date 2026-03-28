import type { Metadata } from "next";
import Link from "next/link";
import { getNewsArticle } from "@/lib/newsArticleFetch";
import { buildNewsArticleMetadata } from "./buildNewsMetadata";
import NewsArticleContent from "./NewsArticleContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = await getNewsArticle(id);
  return buildNewsArticleMetadata(id, article);
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getNewsArticle(id);

  if (!article) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Алдаа гарлаа
            </h1>
            <p className="text-gray-600">Мэдээ олдсонгүй эсвэл ачаалахад алдаа гарлаа.</p>
            <p className="text-gray-500 text-sm mt-2">
              Хуудсыг дахин ачаална уу.
            </p>
            <Link
              href="/news"
              className="mt-4 inline-block bg-[#550080] text-white px-6 py-2 rounded-lg hover:bg-[#550080] transition-colors"
            >
              Мэдээний жагсаалт руу буцах
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <NewsArticleContent article={article} id={id} />;
}
