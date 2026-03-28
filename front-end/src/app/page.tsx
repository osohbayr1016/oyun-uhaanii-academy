import HeroSection from "./_components/HeroSection";
import InteractiveCarousel from "./_components/InteractiveCarousel";
import OfficerBranchSection from "./_components/OfficerBranchSection";
import {
  getCarouselImages,
  getHomeContent,
  getHomeStats,
} from "./homePageData";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [homeContent, carouselImages, stats] = await Promise.all([
    getHomeContent(),
    getCarouselImages(),
    getHomeStats(),
  ]);

  return (
    <div>
      <HeroSection />

      <OfficerBranchSection homeContent={homeContent} stats={stats} />

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
