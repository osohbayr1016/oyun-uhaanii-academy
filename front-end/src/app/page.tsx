import Link from "next/link";
import Image from "next/image";
import HeroSection from "./_components/HeroSection";
import InteractiveCarousel from "./_components/InteractiveCarousel";
import { Brain, Crown, Earth, Medal, Star, Trophy } from "lucide-react";

interface HomeContent {
  features_title?: string;
  features_subtitle?: string;
  feature_1_title?: string;
  feature_1_description?: string;
  feature_2_title?: string;
  feature_2_description?: string;
  feature_3_title?: string;
  feature_3_description?: string;
  feature_4_title?: string;
  feature_4_description?: string;
  feature_5_title?: string;
  feature_5_description?: string;
  feature_6_title?: string;
  feature_6_description?: string;
}

interface CarouselImage {
  id: string;
  imageUrl: string;
}

// Server-side data fetching
async function getHomeContent(): Promise<HomeContent> {
  try {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    const response = await fetch(`${API_BASE_URL}/api/home-content`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error("Failed to fetch home content:", response.status);
      return {};
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching home content:", error);
    return {};
  }
}

async function getCarouselImages(): Promise<CarouselImage[]> {
  try {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    const response = await fetch(`${API_BASE_URL}/api/carousel`, {
      cache: "no-store", // No caching to ensure fresh data
    });

    if (!response.ok) {
      console.error("Failed to fetch carousel images:", response.status);
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching carousel images:", error);
    return [];
  }
}

export default async function HomePage() {
  // Fetch data server-side
  const [homeContent, carouselImages] = await Promise.all([
    getHomeContent(),
    getCarouselImages(),
  ]);

  return (
    <div>
      <HeroSection />

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {homeContent.features_title || "БИДНИЙ ОНЦЛОГУУД"}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {homeContent.features_subtitle ||
                "Эелдэг найрсаг багш хамт олон, тохилог тухтай орчин, олон жилийн туршлага, хамгийн олон гишүүд болон, Монголын оюун ухааны академийн шилдэг салбар юм."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {/* Feature 1 */}
            <div className="card-responsive text-center bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Earth className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {homeContent.feature_1_title || "Сургалт"}
              </h3>
              <p className="text-black text-[30px]">
                {homeContent.feature_1_description ||
                  "Монгол улсын хэмжээний тэмцээнүүдийн олон жилийн туршлага"}
              </p>
            </div>
            {/* Feature 2 */}
            <div className="card-responsive text-center bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {homeContent.feature_2_title || "Тэмцээнүүд"}
              </h3>
              <p className="text-black text-[30px]">
                {homeContent.feature_2_description ||
                  "Тогтмол клубын аварга болон улсын аварга мөн цаашлаад дэлхийн аваргад оролцох боломж"}
              </p>
            </div>
            {/* Feature 3 */}
            <div className="card-responsive text-center bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Medal className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {homeContent.feature_3_title || "Хөгжил"}
              </h3>
              <p className="text-black text-[30px]">
                {homeContent.feature_3_description ||
                  "Хөгжин дэвших чин хүсэл эрмэлзэл бүхий найрсаг дотно хамт олон"}
              </p>
            </div>
            {/* Feature 4 */}
            <div className="card-responsive text-center bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {homeContent.feature_4_title || "Найрсаг багш хамт олон"}
              </h3>
              <p className="text-black text-[30px]">
                {homeContent.feature_4_description ||
                  "Элдэв найрсаг багш хамт олон"}
              </p>
            </div>
            {/* Feature 5 */}
            <div className="card-responsive text-center bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Crown className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {homeContent.feature_5_title || "Тухтай тайван суралцах орчин"}
              </h3>
              <p className="text-black text-[30px]">
                {homeContent.feature_5_description ||
                  "Цэвэр, тухтай, тайван суралцах орчин таныг хүлээж байна."}
              </p>
            </div>
            {/* Feature 6 */}
            <div className="card-responsive text-center bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {homeContent.feature_6_title || "Олон жилийн туршлага"}
              </h3>
              <p className="text-black text-[30px]">
                {homeContent.feature_6_description ||
                  "Тохилог тухтай орчин, олон жилийн туршлага"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-7xl mx-auto">
              <InteractiveCarousel images={carouselImages} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
