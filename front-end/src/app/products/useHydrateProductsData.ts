"use client";

import { useEffect, useRef, useState } from "react";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  category: string;
  stock: number;
  materials: string[];
  dimensions?: unknown;
  weight?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export function useHydrateProductsData(initial: Product[]) {
  const [products, setProducts] = useState(initial);
  const [hydrating, setHydrating] = useState(false);
  const hydrateAttempted = useRef(false);

  useEffect(() => {
    setProducts(initial);
  }, [initial]);

  useEffect(() => {
    if (products.length > 0) return;
    if (hydrateAttempted.current) return;
    hydrateAttempted.current = true;
    let cancelled = false;
    (async () => {
      setHydrating(true);
      try {
        const r = await fetch("/api/products", { cache: "no-store" });
        const data = r.ok ? await r.json() : [];
        if (!cancelled) setProducts(Array.isArray(data) ? data : []);
      } finally {
        if (!cancelled) setHydrating(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [products.length]);

  return { products, hydrating };
}
