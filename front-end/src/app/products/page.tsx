import ProductsClient from "./ProductsClient";
import { serverFetchJson } from "@/lib/api";
import type { Product } from "./useHydrateProductsData";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await serverFetchJson<Product[]>("/api/products", {
    cache: "no-store",
    fallbackOnError: [],
  });
  return <ProductsClient products={products} />;
}
