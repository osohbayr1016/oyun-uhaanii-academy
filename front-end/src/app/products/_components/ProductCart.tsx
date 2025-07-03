import React from "react";
import Link from "next/link";

interface Product {
  id: string; // Unique identifier for the product
  imageUrl: string;
  name: string;
  price: number;
  currency?: string;
  // You might add more basic info here if needed for display on the card
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    // Wrap the entire card in a Link component
    <Link href={`/products/${product.id}`} className="block">
      {" "}
      {/* Use 'block' to make the whole card clickable */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-full max-w-full object-contain p-4"
          />
        </div>
        <div className="p-4 flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate w-full">
            {product.name}
          </h3>
          <p className="text-xl font-bold text-orange-500">
            {product.price.toLocaleString()} {product.currency || "₮"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
