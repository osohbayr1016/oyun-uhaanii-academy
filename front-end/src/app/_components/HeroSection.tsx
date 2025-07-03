import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full bg-white text-black py-20 px-6 md:px-12">
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
          <div className="flex gap-4">
            <a
              href="/courses"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl text-base font-medium hover:bg-blue-700 transition"
            >
              Сургалтуудыг үзэх
            </a>
            <a
              href="/merch"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl text-base font-medium hover:bg-blue-50 transition"
            >
              Бүтээгдэхүүн үзэх
            </a>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="w-full">
          <img
            src="/hero-kids-learning.png"
            alt="Learning kids illustration"
            className="w-full h-auto object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
