import type { Metadata } from "next";
import type { NewsArticle } from "@/lib/newsArticleTypes";

const DEFAULT_OG =
  "https://scontent.fuln6-1.fna.fbcdn.net/v/t39.30808-6/240166477_106215305118707_761541575639148196_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Eviigojk9mMQ7kNvwGggj25&_nc_oc=Adl3gC2Oianbracsc-XdQ4xWC_HbGbgv26V8xK6YfgW3QN-ddv4PAH4arZ5SN4ehtms&_nc_zt=23&_nc_ht=scontent.fuln6-1.fna&_nc_gid=xhiNGhOURyL7o_dizmqAHw&oh=00_AfSdrcNuAcFymmSizhmY1LA1oLq_zop_tF7rk02Kg8_Hkg&oe=688F607A";

export function buildNewsArticleMetadata(
  id: string,
  article: NewsArticle | null
): Metadata {
  if (!article) {
    return {
      title: "Мэдээ олдсонгүй - Academy Officer",
      description: "Хүссэн мэдээ олдсонгүй",
    };
  }

  const truncatedContent =
    article.content.length > 160
      ? article.content.substring(0, 160) + "..."
      : article.content;

  return {
    title: `${article.title} - Academy Officer`,
    description: truncatedContent,
    keywords: ["мэдээ", "academy officer", "монгол", "оюун ухаан"],
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: truncatedContent,
      type: "article",
      url: `https://academyofficer.mn/news/${id}`,
      siteName: "Academy Officer",
      locale: "mn_MN",
      publishedTime: article.publishedAt,
      modifiedTime: article.publishedAt,
      authors: [article.author.name],
      images: article.imageUrl
        ? [
            {
              url: article.imageUrl,
              width: 1200,
              height: 630,
              alt: article.title,
              type: "image/jpeg",
            },
          ]
        : [
            {
              url: DEFAULT_OG,
              width: 1200,
              height: 630,
              alt: "Academy Officer",
              type: "image/png",
            },
          ],
    },
    other: {
      "article:published_time": article.publishedAt,
      "article:modified_time": article.publishedAt,
      "article:author": article.author.name,
      "article:section": "Мэдээ",
      "article:tag": "мэдээ,academy officer,монгол,оюун ухаан",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: truncatedContent,
      images: article.imageUrl ? [article.imageUrl] : [DEFAULT_OG],
    },
    alternates: {
      canonical: `https://academyofficer.mn/news/${id}`,
    },
  };
}
