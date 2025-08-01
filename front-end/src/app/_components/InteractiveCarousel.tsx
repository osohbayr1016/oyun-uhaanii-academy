"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface CarouselImage {
  id: string;
  imageUrl: string;
}

interface InteractiveCarouselProps {
  images: CarouselImage[];
}

export default function InteractiveCarousel({
  images,
}: InteractiveCarouselProps) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSlide = (nextIdx: number) => {
    if (nextIdx === current) return;
    setCurrent(nextIdx);
  };

  const prevBtn = () => {
    const nextIdx = current === 0 ? images.length - 1 : current - 1;
    handleSlide(nextIdx);
  };

  const nextBtn = () => {
    const nextIdx = current === images.length - 1 ? 0 : current + 1;
    handleSlide(nextIdx);
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!images.length) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const nextIdx = current === images.length - 1 ? 0 : current + 1;
      handleSlide(nextIdx);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images.length, current]);

  if (images.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400 text-xl">
        Зураг байхгүй байна
      </div>
    );
  }

  return (
    <>
      <button
        onClick={prevBtn}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-200 transition-colors"
        aria-label="Өмнөх"
      >
        <span className="text-2xl">&#60;</span>
      </button>

      <div className="overflow-hidden w-full flex items-center justify-center h-80">
        <div className="relative w-full h-80">
          <div
            className="flex h-80 transition-transform duration-700 ease-in-out"
            style={{
              width: `${images.length * 100}%`,
              transform: `translateX(-${current * (100 / images.length)}%)`,
            }}
          >
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="w-full h-80 flex-shrink-0 flex-grow-0 flex items-center justify-center"
                style={{
                  width: `${100 / images.length}%`,
                }}
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center justify-center max-w-lg w-full h-80 border mx-auto">
                  <Image
                    src={img.imageUrl}
                    alt={`Carousel ${idx + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/default-carousel.png";
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={nextBtn}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-200 transition-colors"
        aria-label="Дараах"
      >
        <span className="text-2xl">&#62;</span>
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleSlide(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === current
                ? "bg-yellow-400"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </>
  );
}
