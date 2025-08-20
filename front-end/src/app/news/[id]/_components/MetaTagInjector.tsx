"use client";

import { useEffect } from "react";

interface MetaTagInjectorProps {
  articleTitle: string;
  articleContent: string;
  articleImageUrl?: string;
  articleId: string;
  publishedAt: string;
  authorName: string;
}

export default function MetaTagInjector({
  articleTitle,
  articleContent,
  articleImageUrl,
  articleId,
  publishedAt,
  authorName,
}: MetaTagInjectorProps) {
  useEffect(() => {
    // Create truncated description
    const truncatedContent =
      articleContent.length > 160
        ? articleContent.substring(0, 160) + "..."
        : articleContent;

    // Default image URL
    const defaultImageUrl =
      "https://scontent.fuln6-1.fna.fbcdn.net/v/t39.30808-6/240166477_106215305118707_761541575639148196_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Eviigojk9mMQ7kNvwGggj25&_nc_oc=Adl3gC2Oianbracsc-XdQ4xWC_HbGbgv26V8xK6YfgW3QN-ddv4PAH4arZ5SN4ehtms&_nc_zt=23&_nc_ht=scontent.fuln6-1.fna&_nc_gid=xhiNGhOURyL7o_dizmqAHw&oh=00_AfSdrcNuAcFymmSizhmY1LA1oLq_zop_tF7rk02Kg8_Hkg&oe=688F607A";

    // Meta tags to inject
    const metaTags = [
      { property: "og:title", content: articleTitle },
      { property: "og:description", content: truncatedContent },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content: `https://academyofficer.mn/news/${articleId}`,
      },
      { property: "og:image", content: articleImageUrl || defaultImageUrl },
      { property: "og:site_name", content: "Academy Officer" },
      { property: "og:locale", content: "mn_MN" },
      { property: "article:published_time", content: publishedAt },
      { property: "article:author", content: authorName },
      { property: "article:section", content: "Мэдээ" },
      {
        property: "article:tag",
        content: "мэдээ,academy officer,монгол,оюун ухаан",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: articleTitle },
      { name: "twitter:description", content: truncatedContent },
      { name: "twitter:image", content: articleImageUrl || defaultImageUrl },
    ];

    // Inject meta tags
    metaTags.forEach((tag) => {
      let meta =
        document.querySelector(`meta[property="${tag.property}"]`) ||
        document.querySelector(`meta[name="${tag.name}"]`);

      if (!meta) {
        meta = document.createElement("meta");
        if (tag.property) {
          meta.setAttribute("property", tag.property);
        }
        if (tag.name) {
          meta.setAttribute("name", tag.name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", tag.content);
    });

    // Cleanup function
    return () => {
      // Remove injected meta tags when component unmounts
      metaTags.forEach((tag) => {
        const meta =
          document.querySelector(`meta[property="${tag.property}"]`) ||
          document.querySelector(`meta[name="${tag.name}"]`);
        if (meta && meta.getAttribute("data-injected") === "true") {
          meta.remove();
        }
      });
    };
  }, [
    articleTitle,
    articleContent,
    articleImageUrl,
    articleId,
    publishedAt,
    authorName,
  ]);

  return null; // This component doesn't render anything
}
