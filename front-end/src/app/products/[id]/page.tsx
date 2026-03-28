"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchBffJson } from "@/lib/fetchBffWithRetry";
import PublicLoadErrorBanner from "@/components/PublicLoadErrorBanner";
import ProductDetailView from "./ProductDetailView";
import {
  getProductIdFromParams,
  normalizeProductDetail,
  type NormalizedProduct,
} from "./productDetailNormalize";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = getProductIdFromParams(params.id);

  const [product, setProduct] = useState<NormalizedProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadProduct = useCallback(async () => {
    if (!productId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError(null);
    try {
      const raw = await fetchBffJson<unknown>(`/api/products/${productId}`);
      const normalized = normalizeProductDetail(raw);
      if (!normalized) {
        setProduct(null);
        setLoadError("Бүтээгдэхүүний мэдээлэл буруу эсвэл олдсонгүй.");
        return;
      }
      setProduct(normalized);
    } catch (err) {
      setProduct(null);
      setLoadError(
        err instanceof Error ? err.message : "Бүтээгдэхүүн ачаалагдсангүй."
      );
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-32 w-32 animate-spin rounded-full border-b-2 border-blue-600" />
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md text-center">
          <PublicLoadErrorBanner message={loadError} onRetry={loadProduct} />
          <Link
            href="/products"
            className="mt-6 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Бүтээгдэхүүнүүд рүү буцах
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Product Not Found
          </h1>
          <p className="mb-6 text-gray-600">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetailView product={product} />;
}
