import { serverFetchJson } from "@/lib/api";
import NewsGridClient from "./NewsGridClient";
import NewsletterSignupClient from "./NewsletterSignupClient";

export const revalidate = 300;

export default async function NewsPage() {
  const news = await serverFetchJson<any[]>("/api/news", {
    revalidateSeconds: 300,
  });

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            МЭДЭЭ, МЭДЭЭЛЭЛ
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Монголын оюун ухааны академийн хамгийн сүүлийн үеийн мэдээ,
            мэдээлэл, арга хэмжээний талаарх мэдээллүүд.
          </p>
        </div>

        <NewsGridClient news={news} />

        <div className="mt-12 sm:mt-16">
          <NewsletterSignupClient />
        </div>
      </div>
    </div>
  );
}
