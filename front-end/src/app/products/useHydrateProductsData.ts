"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const [products, setProducts] = useState(initial);
  const [hydrating, setHydrating] = useState(false);
  const [refetchKey, setRefetchKey] = useState(0);

  useEffect(() => {
    setProducts(initial);
  }, [initial]);

  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setRefetchKey((k) => k + 1);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  useEffect(() => {
    if (pathname !== "/products") return;
    if (initial.length > 0) return;

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
  }, [initial.length, pathname, refetchKey]);

  return { products, hydrating };
}
