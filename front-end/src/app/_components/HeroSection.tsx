"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth";

export default function HeroSection() {
  const { user, isAuthenticated, isAdmin, loading } = useAuth();

  // Safe function calls with fallbacks
  const isUserAuthenticated =
    typeof isAuthenticated === "function" ? isAuthenticated() : false;
  const isUserAdmin = typeof isAdmin === "function" ? isAdmin() : false;

  // Don't render auth-dependent content while loading
  if (loading) {
    return (
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-8"></div>
              <div className="h-12 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              МОНГОЛЫН ОЮУН{" "}
              <span className="text-blue-600">УХААНЫ АКАДЕМИ</span>
            </h1>
            <div className="text-lg sm:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              <p>Сэтгэхүйн хурдыг танд эзэмшүүлж </p>
              <p>Оюуны хүрдийг дэлхийд таниулна</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8 sm:pt-12">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  10+
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  Сургалт
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  700+
                </div>
                <div className="text-sm sm:text-base text-gray-600">Сурагч</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  10+
                </div>
                <div className="text-sm sm:text-base text-gray-600">Багш</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  5+
                </div>
                <div className="text-sm sm:text-base text-gray-600">Жил</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative mx-auto max-w-md lg:max-w-lg">
              <Image
                src="/academy.png"
                alt="Mongolian Traditional Games"
                width={400}
                height={200}
                className="mx-auto w-auto h-40 sm:h-56 md:h-64 lg:h-72 object-contain rounded-2xl shadow-2xl"
                priority
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-red-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-200/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-r from-indigo-200/20 to-transparent pointer-events-none"></div>
    </section>
  );
}
