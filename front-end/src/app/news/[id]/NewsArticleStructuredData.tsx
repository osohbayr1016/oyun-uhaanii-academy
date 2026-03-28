import Script from "next/script";
import type { NewsArticle } from "@/lib/newsArticleTypes";

const DEFAULT_IMG =
  "https://scontent.fuln6-1.fna.fbcdn.net/v/t39.30808-6/240166477_106215305118707_761541575639148196_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Eviigojk9mMQ7kNvwGggj25&_nc_oc=Adl3gC2Oianbracsc-XdQ4xWC_HbGbgv26V8xK6YfgW3QN-ddv4PAH4arZ5SN4ehtms&_nc_zt=23&_nc_ht=scontent.fuln6-1.fna&_nc_gid=xhiNGhOURyL7o_dizmqAHw&oh=00_AfSdrcNuAcFymmSizhmY1LA1oLq_zop_tF7rk02Kg8_Hkg&oe=688F607A";

export default function NewsArticleStructuredData({
  article,
  id,
}: {
  article: NewsArticle;
  id: string;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description:
      article.content.length > 160
        ? article.content.substring(0, 160) + "..."
        : article.content,
    image: article.imageUrl || DEFAULT_IMG,
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Academy Officer",
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_IMG,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://academyofficer.mn/news/${id}`,
    },
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
