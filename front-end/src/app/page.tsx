import Link from "next/link";
import Header from "./_components/Header";
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
    <div>
      <Header />

      <Footer />
    </div>
  );
};

export default HomePage;
