import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import SocialSharing from "./_components/SocialSharing";

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  publishedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

// Generate dynamic metadata for the news article
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    const response = await fetch(`${backendUrl}/api/news/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        title: "Мэдээ олдсонгүй - Academy Officer",
        description: "Хүссэн мэдээ олдсонгүй",
      };
    }

    const article: NewsArticle = await response.json();

    // Create a truncated description for meta tags
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
                url: "https://scontent.fuln6-1.fna.fbcdn.net/v/t39.30808-6/240166477_106215305118707_761541575639148196_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Eviigojk9mMQ7kNvwGggj25&_nc_oc=Adl3gC2Oianbracsc-XdQ4xWC_HbGbgv26V8xK6YfgW3QN-ddv4PAH4arZ5SN4ehtms&_nc_zt=23&_nc_ht=scontent.fuln6-1.fna&_nc_gid=xhiNGhOURyL7o_dizmqAHw&oh=00_AfSdrcNuAcFymmSizhmY1LA1oLq_zop_tF7rk02Kg8_Hkg&oe=688F607A",
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
        images: article.imageUrl
          ? [article.imageUrl]
          : [
              "https://scontent.fuln6-1.fna.fbcdn.net/v/t39.30808-6/240166477_106215305118707_761541575639148196_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Eviigojk9mMQ7kNvwGggj25&_nc_oc=Adl3gC2Oianbracsc-XdQ4xWC_HbGbgv26V8xK6YfgW3QN-ddv4PAH4arZ5SN4ehtms&_nc_zt=23&_nc_ht=scontent.fuln6-1.fna&_nc_gid=xhiNGhOURyL7o_dizmqAHw&oh=00_AfSdrcNuAcFymmSizhmY1LA1oLq_zop_tF7rk02Kg8_Hkg&oe=688F607A",
            ],
      },
      alternates: {
        canonical: `https://academyofficer.mn/news/${id}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Мэдээ - Academy Officer",
      description: "Монголын оюун ухааны академийн мэдээ",
    };
  }
}

// Fetch article data on the server side
async function getArticle(id: string): Promise<NewsArticle | null> {
  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    const response = await fetch(`${backendUrl}/api/news/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticle(id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getYouTubeEmbedUrl = (videoUrl: string) => {
    if (!videoUrl) return "";

    // Handle different YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
    ];

    const match = videoUrl.match(patterns[0]);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }

    return videoUrl; // Return original URL if no video ID found
  };

  if (!article) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Алдаа гарлаа
            </h1>
            <p className="text-gray-600">Мэдээ олдсонгүй</p>
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

  // Generate structured data for the article
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description:
      article.content.length > 160
        ? article.content.substring(0, 160) + "..."
        : article.content,
    image:
      article.imageUrl ||
      "https://scontent.fuln6-1.fna.fbcdn.net/v/t39.30808-6/240166477_106215305118707_761541575639148196_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Eviigojk9mMQ7kNvwGggj25&_nc_oc=Adl3gC2Oianbracsc-XdQ4xWC_HbGbgv26V8xK6YfgW3QN-ddv4PAH4arZ5SN4ehtms&_nc_zt=23&_nc_ht=scontent.fuln6-1.fna&_nc_gid=xhiNGhOURyL7o_dizmqAHw&oh=00_AfSdrcNuAcFymmSizhmY1LA1oLq_zop_tF7rk02Kg8_Hkg&oe=688F607A",
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Academy Officer",
      logo: {
        "@type": "ImageObject",
        url: "https://scontent.fuln6-1.fna.fbcdn.net/v/t39.30808-6/240166477_106215305118707_761541575639148196_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Eviigojk9mMQ7kNvwGggj25&_nc_oc=Adl3gC2Oianbracsc-XdQ4xWC_HbGbgv26V8xK6YfgW3QN-ddv4PAH4arZ5SN4ehtms&_nc_zt=23&_nc_ht=scontent.fuln6-1.fna&_nc_gid=xhiNGhOURyL7o_dizmqAHw&oh=00_AfSdrcNuAcFymmSizhmY1LA1oLq_zop_tF7rk02Kg8_Hkg&oe=688F607A",
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
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Additional meta tags for Facebook */}
      <Script
        id="facebook-meta-tags"
        dangerouslySetInnerHTML={{
          __html: `
            // Force Facebook to refresh cache
            if (typeof window !== 'undefined') {
              // Add meta tags dynamically
              const metaTags = [
                { property: 'og:title', content: '${article.title.replace(
                  /'/g,
                  "\\'"
                )}' },
                { property: 'og:description', content: '${(article.content
                  .length > 160
                  ? article.content.substring(0, 160) + "..."
                  : article.content
                ).replace(/'/g, "\\'")}' },
                { property: 'og:type', content: 'article' },
                { property: 'og:url', content: 'https://academyofficer.mn/news/${id}' },
                { property: 'og:image', content: '${
                  article.imageUrl ||
                  "https://scontent.fuln6-1.fna.fbcdn.net/v/t39.30808-6/240166477_106215305118707_761541575639148196_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Eviigojk9mMQ7kNvwGggj25&_nc_oc=Adl3gC2Oianbracsc-XdQ4xWC_HbGbgv26V8xK6YfgW3QN-ddv4PAH4arZ5SN4ehtms&_nc_zt=23&_nc_ht=scontent.fuln6-1.fna&_nc_gid=xhiNGhOURyL7o_dizmqAHw&oh=00_AfSdrcNuAcFymmSizhmY1LA1oLq_zop_tF7rk02Kg8_Hkg&oe=688F607A"
                }' },
                { property: 'og:site_name', content: 'Academy Officer' },
                { property: 'og:locale', content: 'mn_MN' },
                { property: 'article:published_time', content: '${
                  article.publishedAt
                }' },
                { property: 'article:author', content: '${article.author.name.replace(
                  /'/g,
                  "\\'"
                )}' },
                { property: 'article:section', content: 'Мэдээ' },
                { property: 'article:tag', content: 'мэдээ,academy officer,монгол,оюун ухаан' },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: '${article.title.replace(
                  /'/g,
                  "\\'"
                )}' },
                { name: 'twitter:description', content: '${(article.content
                  .length > 160
                  ? article.content.substring(0, 160) + "..."
                  : article.content
                ).replace(/'/g, "\\'")}' },
                { name: 'twitter:image', content: '${
                  article.imageUrl ||
                  "https://scontent.fuln6-1.fna.fbcdn.net/v/t39.30808-6/240166477_106215305118707_761541575639148196_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Eviigojk9mMQ7kNvwGggj25&_nc_oc=Adl3gC2Oianbracsc-XdQ4xWC_HbGbgv26V8xK6YfgW3QN-ddv4PAH4arZ5SN4ehtms&_nc_zt=23&_nc_ht=scontent.fuln6-1.fna&_nc_gid=xhiNGhOURyL7o_dizmqAHw&oh=00_AfSdrcNuAcFymmSizhmY1LA1oLq_zop_tF7rk02Kg8_Hkg&oe=688F607A"
                }' }
              ];
              
              metaTags.forEach(tag => {
                let meta = document.querySelector(\`meta[property="\${tag.property}"]\`) || document.querySelector(\`meta[name="\${tag.name}"]\`);
                if (!meta) {
                  meta = document.createElement('meta');
                  if (tag.property) {
                    meta.setAttribute('property', tag.property);
                  }
                  if (tag.name) {
                    meta.setAttribute('name', tag.name);
                  }
                  document.head.appendChild(meta);
                }
                meta.setAttribute('content', tag.content);
              });
            }
          `,
        }}
      />

      <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
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

              {/* Video Section */}
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
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Social Sharing */}
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

          {/* Related Articles Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Бусад мэдээ
            </h2>
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
    </>
  );
}
