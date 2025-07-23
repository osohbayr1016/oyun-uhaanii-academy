"use client";

import Link from "next/link";
import HeroSection from "./_components/HeroSection";
import { Book, Trophy, Users, Lightbulb, Users2, Globe } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function HomePage() {
  const [carouselImages, setCarouselImages] = useState<
    { id: string; imageUrl: string }[]
  >([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // Remove slideDirection, next, isSliding

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const res = await fetch("/api/carousel");
      const data = await res.json();
      setCarouselImages(data);
      setLoading(false);
      setCurrent(0);
    };
    fetchImages();
  }, []);

  const maxIndex = Math.max(0, carouselImages.length - 1);

  const handleSlide = (nextIdx: number) => {
    if (nextIdx === current) return;
    setCurrent(nextIdx);
  };

  const prevBtn = () => {
    const nextIdx = current === 0 ? carouselImages.length - 1 : current - 1;
    handleSlide(nextIdx);
  };
  const nextBtn = () => {
    const nextIdx = current === carouselImages.length - 1 ? 0 : current + 1;
    handleSlide(nextIdx);
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!carouselImages.length) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const nextIdx = current === carouselImages.length - 1 ? 0 : current + 1;
      handleSlide(nextIdx);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselImages.length, current]);

  // Dots: one for each image
  const dotCount = carouselImages.length;

  return (
    <div>
      <HeroSection />

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              БИДНИЙ ОНЦЛОГУУД
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Эелдэг найрсаг багш хамт олон, тохилог тухтай орчин, олон жилийн
              туршлага, хамгийн олон гишүүд болон, Монголын оюун ухааны
              академийн шилдэг салбар юм.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {/* Feature 1 */}
            <div className="card-responsive text-center bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Book className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Сургалт</h3>
              <p className="text-gray-700">
                Монгол улсын хэмжээний тэмцээнүүдийн олон жилийн туршлага
              </p>
            </div>
            {/* Feature 2 */}
            <div className="card-responsive text-center bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Тэмцээнүүд
              </h3>
              <p className="text-gray-700">
                Тогтмол клубын аварга болон улсын аварга мөн цаашлаад дэлхийн
                аваргад оролцох боломж
              </p>
            </div>
            {/* Feature 3 */}
            <div className="card-responsive text-center bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Хөгжил</h3>
              <p className="text-gray-700">
                Хөгжин дэвших чин хүсэл эрмэлзэл бүхий найрсаг дотно хамт олон
              </p>
            </div>
            {/* Feature 4 - from main text */}
            <div className="card-responsive text-center bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Найрсаг багш хамт олон
              </h3>
              <p className="text-gray-700">Элдэв найрсаг багш хамт олон</p>
            </div>
            {/* Feature 5 - from main text */}
            <div className="card-responsive text-center bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Users2 className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Тухтай тайван суралцах орчин
              </h3>
              <p className="text-gray-700">
                Цэвэр, тухтай, тайван суралцах орчин таныг хүлээж байна.
              </p>
            </div>
            {/* Feature 6 - from main text */}
            <div className="card-responsive text-center bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Олон жилийн туршлага
              </h3>
              <p className="text-gray-700">
                Тохилог тухтай орчин, олон жилийн туршлага
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
              {loading ? (
                <div className="h-64 flex items-center justify-center text-gray-400 text-xl">
                  Уншиж байна...
                </div>
              ) : carouselImages.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-gray-400 text-xl">
                  Зураг байхгүй байна
                </div>
              ) : (
                <>
                  <button
                    onClick={prevBtn}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-200"
                    aria-label="Өмнөх"
                  >
                    <span className="text-2xl">&#60;</span>
                  </button>
                  <div className="overflow-hidden w-full flex items-center justify-center h-80">
                    {carouselImages.length > 0 && (
                      <div className="relative w-full h-80">
                        <div
                          className="flex h-80 transition-transform duration-700 ease-in-out"
                          style={{
                            width: `${carouselImages.length * 100}%`,
                            transform: `translateX(-${
                              current * (100 / carouselImages.length)
                            }%)`,
                          }}
                        >
                          {carouselImages.map((img, idx) => (
                            <div
                              key={img.id}
                              className="w-full h-80 flex-shrink-0 flex-grow-0 flex items-center justify-center"
                              style={{
                                width: `${100 / carouselImages.length}%`,
                              }}
                            >
                              <div
                                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center justify-center max-w-lg w-full h-80 border mx-auto aspect-[16/9]"
                                style={{ aspectRatio: "16/9" }}
                              >
                                <img
                                  src={img.imageUrl}
                                  alt={`Carousel ${idx + 1}`}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={nextBtn}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-200"
                    aria-label="Дараах"
                  >
                    <span className="text-2xl">&#62;</span>
                  </button>
                  {/* Dots */}
                  <div className="flex justify-center mt-4 gap-2">
                    {carouselImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSlide(idx)}
                        className={`w-3 h-3 rounded-full ${
                          idx === current ? "bg-yellow-400" : "bg-gray-300"
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
