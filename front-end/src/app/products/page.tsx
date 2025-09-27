import ProductsClient from "./ProductsClient";
import { serverFetchJson } from "@/lib/api";

export const revalidate = 300;

export default async function ProductsPage() {
  const products = await serverFetchJson<any[]>("/api/products", {
    revalidateSeconds: 300,
  });
  return <ProductsClient products={products} />;
}
