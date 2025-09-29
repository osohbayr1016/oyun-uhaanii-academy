"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ROUTES_TO_PREFETCH: string[] = [
  "/courses",
  "/products",
  "/news",
  "/tournaments",
];

function runWhenIdle(callback: () => void) {
  if (typeof (window as any).requestIdleCallback === "function") {
    (window as any).requestIdleCallback(callback, { timeout: 3000 });
  } else {
    setTimeout(callback, 1500);
  }
}

export default function RoutePrefetcher(): null {
  const router = useRouter();

  useEffect(() => {
    // Skip on slow connections or data-saver
    const nav = navigator as any;
    const saveData = nav?.connection?.saveData === true;
    const isLowBandwidth = (nav?.connection?.effectiveType || "").includes(
      "2g"
    );
    if (saveData || isLowBandwidth) return;

    runWhenIdle(() => {
      // Stagger prefetches to avoid burst
      ROUTES_TO_PREFETCH.forEach((route, index) => {
        setTimeout(() => {
          try {
            router.prefetch(route);
          } catch {}
        }, 400 * index);
      });
    });
  }, [router]);

  return null;
}
