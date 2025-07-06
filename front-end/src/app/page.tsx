import Link from "next/link";
import HeroSection from "./_components/HeroSection";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  currency: string;
}

const HomePage = () => {
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/products`,
  //   {
  //     cache: "no-store",
  //   }
  // );

  // const products: Product[] = await res.json();

  return (
    <>
      <HeroSection />

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Бидний онцлогууд
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Монголын уугуул тоглоом, урлаг, соёлыг орчин үеийн аргаар судлан,
              дамжуулж, хадгалж үлдэхэд хувь нэмрээ оруулъя.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {/* Feature 1 */}
            <div className="card-responsive text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Сургалтын курс
              </h3>
              <p className="text-gray-600">
                Монголын уугуул тоглоом, урлаг, соёлын талаарх дэлгэрэнгүй
                сургалтууд.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-responsive text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Тэмцээнүүд
              </h3>
              <p className="text-gray-600">
                Жил бүр зохион байгуулагддаг тоглоомын тэмцээнүүд болон арга
                хэмжээнүүд.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-responsive text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Бүтээгдэхүүнүүд
              </h3>
              <p className="text-gray-600">
                Монголын уугуул тоглоомын хэрэгслүүд болон сургалтын материал.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Бидэнтэй нэгдээрэй
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Монголын уугуул тоглоом, урлаг, соёлыг судлан, дамжуулж, хадгалж
            үлдэхэд хувь нэмрээ оруулъя.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Курсуудаас эхлэх
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium text-white border-2 border-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Холбоо барих
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
