import React from "react";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 text-black py-20 px-6 md:px-12 mt-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left side - Text */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Монголын оюун ухааны академи <br className="hidden md:block" />
            <span className="text-blue-600">Офицер салбар</span>
          </h1>
          <p className="text-lg text-gray-600">
            Боловсрол, бүтээлч байдал, хөгжил дэвшлийг дэмжсэн сургалтууд болон
            бүтээгдэхүүнүүдийг нэг дороос.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/courses"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl text-base font-medium hover:bg-blue-700 transition-colors duration-200 text-center"
            >
              Сургалтуудыг үзэх
            </Link>
            <Link
              href="/products"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl text-base font-medium hover:bg-blue-50 transition-colors duration-200 text-center"
            >
              Бүтээгдэхүүн үзэх
            </Link>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-md">
            <Image
              src="/xyno.jpg"
              alt="Learning kids illustration"
              width={400}
              height={400}
              className="w-full h-auto object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
