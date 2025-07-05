import Link from "next/link";
import Header from "./_components/Header";
import HeroSection from "./_components/HeroSection";
import Footer from "./_components/Footer";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  currency: string;
}

const HomePage = async () => {
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/products`,
  //   {
  //     cache: "no-store",
  //   }
  // );

  // const products: Product[] = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <HeroSection />

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Welcome to Oyun Uhaanii Academy
          </h2>
          <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto">
            Discover the rich traditions of Mongolian games and skills. Learn
            from expert instructors and connect with a community passionate
            about preserving our cultural heritage.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Traditional Games
            </h3>
            <p className="text-gray-600">
              Learn ancient Mongolian games that have been passed down through
              generations.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Cultural Skills
            </h3>
            <p className="text-gray-600">
              Master traditional crafts and skills that are part of our
              heritage.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Community
            </h3>
            <p className="text-gray-600">
              Join a community of learners and instructors passionate about
              Mongolian culture.
            </p>
          </div>
        </section>

        <section className="text-center">
          <Link
            href="/courses"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore Courses
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
