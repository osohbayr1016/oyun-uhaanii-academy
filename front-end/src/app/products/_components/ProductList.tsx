import React from "react";
import ProductCard from "./ProductCart";

// Define the type for a single product (re-used from ProductCard)
interface Product {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  currency?: string;
}

// Dummy data for products - replace with your actual data source (API call, etc.)
const dummyProducts: Product[] = [
  {
    id: "p1",
    imageUrl: "https://via.placeholder.com/200x200?text=Product+1",
    name: "Чипчиг",
    price: 48000,
  },
  {
    id: "p2",
    imageUrl: "https://via.placeholder.com/200x200?text=Product+2",
    name: "Memo monster",
    price: 25000,
  },
  {
    id: "p3",
    imageUrl: "https://via.placeholder.com/200x200?text=Product+3",
    name: "Хугацаа хэмжигч цаг /QT timer/",
    price: 35500,
  },
  {
    id: "p4",
    imageUrl: "https://via.placeholder.com/200x200?text=Product+4",
    name: "Шооны дээгүүр /GS/",
    price: 40000,
  },
  {
    id: "p5",
    imageUrl: "https://via.placeholder.com/200x200?text=Product+5",
    name: "Дэлхийн Спорт Хурдлуулсан Хөлбөмбөг",
    price: 95000,
  },
  {
    id: "p6",
    imageUrl: "https://via.placeholder.com/200x200?text=Product+6",
    name: "Дэлхийн Спорт Хурдлуулсан Хөлбөмбөг",
    price: 90000,
  },
  {
    id: "p7",
    imageUrl: "https://via.placeholder.com/200x200?text=Product+7",
    name: "Top",
    price: 1000,
  },
  {
    id: "p8",
    imageUrl: "https://via.placeholder.com/200x200?text=Product+8",
    name: "Сурах ийм гоё-амьдраг дасгал",
    price: 9400,
  },
  // Add more products as needed
];

interface ProductListProps {
  title: string; // The title for the section, e.g., "Сүүлд нэмэгдсэн"
  products?: Product[]; // Optional: if you want to pass products from parent
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  products = dummyProducts,
}) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
