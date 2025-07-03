"use client";

import { useEffect, useState } from "react";
import ProductList from "./_components/ProductList";
import ProductDetailPage from "./_components/ProductDetailPage";

const ProductsPage = (): any => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div>
      <ProductList title="all products" />
    </div>
  );
};

export default ProductsPage;
