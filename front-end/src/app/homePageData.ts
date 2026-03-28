import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { getApiBaseUrl } from "@/lib/env";

export interface HomeContent {
  features_title?: string;
  features_subtitle?: string;
  feature_1_title?: string;
  feature_1_description?: string;
  feature_2_title?: string;
  feature_2_description?: string;
  feature_3_title?: string;
  feature_3_description?: string;
  feature_4_title?: string;
  feature_4_description?: string;
  feature_5_title?: string;
  feature_5_description?: string;
  feature_6_title?: string;
  feature_6_description?: string;
}

export interface CarouselImage {
  id: string;
  imageUrl: string;
}

export interface HomeStats {
  courses: number;
  tournaments: number;
  enrollments: number;
  teachers: number;
  products: number;
  years: number;
}

const DEFAULT_HOME_STATS: HomeStats = {
  courses: 1,
  tournaments: 1,
  enrollments: 1,
  teachers: 1,
  products: 1,
  years: 1,
};

export async function getHomeContent(): Promise<HomeContent> {
  try {
    const API_BASE_URL = getApiBaseUrl();
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/api/home-content`,
      {
        cache: "no-store",
        timeoutMs: 6000,
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch home content:", response.status);
      return {};
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching home content:", error);
    return {};
  }
}

export async function getHomeStats(): Promise<HomeStats> {
  try {
    const API_BASE_URL = getApiBaseUrl();
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/api/home-content/stats`,
      {
        cache: "no-store",
        timeoutMs: 12_000,
      }
    );
    if (!response.ok) {
      console.error("Failed to fetch home stats:", response.status);
      return { ...DEFAULT_HOME_STATS };
    }
    const data = await response.json();
    if (!data || typeof data !== "object" || "message" in data) {
      return { ...DEFAULT_HOME_STATS };
    }
    const raw = data as Record<string, unknown>;
    const num = (key: string): number => {
      const v = raw[key];
      if (typeof v === "number" && Number.isFinite(v)) return Math.max(1, v);
      if (typeof v === "string") {
        const n = parseInt(v.replace(/[^\d]/g, ""), 10);
        return Number.isFinite(n) ? Math.max(1, n) : 1;
      }
      return 1;
    };
    return {
      courses: num("courses"),
      tournaments: num("tournaments"),
      enrollments: num("enrollments"),
      teachers: num("teachers"),
      products: num("products"),
      years: num("years"),
    };
  } catch (error) {
    console.error("Error fetching home stats:", error);
    return { ...DEFAULT_HOME_STATS };
  }
}

export async function getCarouselImages(): Promise<CarouselImage[]> {
  try {
    const API_BASE_URL = getApiBaseUrl();
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/carousel`, {
      cache: "no-store",
      timeoutMs: 6000,
    });

    if (!response.ok) {
      console.error("Failed to fetch carousel images:", response.status);
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching carousel images:", error);
    return [];
  }
}
