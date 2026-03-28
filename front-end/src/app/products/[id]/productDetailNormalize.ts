/** Next.js `useParams().id` may be string or string[] in edge cases */
export function getProductIdFromParams(
  id: string | string[] | undefined
): string | undefined {
  if (id == null) return undefined;
  if (typeof id === "string") return id;
  if (Array.isArray(id) && id[0]) return id[0];
  return undefined;
}

function num(v: unknown, fallback = 0): number {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function normalizeMaterials(m: unknown): string[] {
  if (Array.isArray(m)) return m.map((x) => String(x)).filter(Boolean);
  if (typeof m === "string" && m.trim())
    return m.split(/[,;]/).map((s) => s.trim()).filter(Boolean);
  return [];
}

/** Safe display for Prisma Json dimensions */
export function formatDimensionsForDisplay(d: unknown): string {
  if (d == null) return "";
  if (typeof d === "object" && d !== null && !Array.isArray(d)) {
    return Object.entries(d as Record<string, unknown>)
      .map(([k, v]) => `${k}: ${v == null ? "" : String(v)}`)
      .join(", ");
  }
  if (Array.isArray(d)) return d.map((x) => String(x)).join(", ");
  return String(d);
}

export interface NormalizedProduct {
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
  stockStatusText?: string;
  heroImage?: string;
  youtubeUrl?: string;
}

/**
 * Coerce backend/BFF JSON so detail UI never throws on odd rows or legacy data.
 */
export function normalizeProductDetail(raw: unknown): NormalizedProduct | null {
  if (raw == null || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if ("error" in r && typeof r.error === "string" && !("name" in r)) {
    return null;
  }
  const name = str(r.name);
  if (!name.trim()) return null;
  const price = num(r.price, NaN);
  if (!Number.isFinite(price)) return null;

  return {
    id: str(r.id) || "unknown",
    name,
    description: str(r.description),
    price,
    currency: str(r.currency, "MNT") || "MNT",
    imageUrl: str(r.imageUrl),
    category: str(r.category),
    stock: Math.max(0, Math.floor(num(r.stock, 0))),
    materials: normalizeMaterials(r.materials),
    dimensions: r.dimensions,
    weight: (() => {
      if (r.weight == null || r.weight === "") return undefined;
      const w = num(r.weight, NaN);
      return Number.isFinite(w) ? w : undefined;
    })(),
    isActive: typeof r.isActive === "boolean" ? r.isActive : true,
    createdAt: str(r.createdAt),
    updatedAt: str(r.updatedAt),
    stockStatusText: r.stockStatusText == null ? undefined : str(r.stockStatusText),
    heroImage: r.heroImage == null ? undefined : str(r.heroImage),
    youtubeUrl: r.youtubeUrl == null ? undefined : str(r.youtubeUrl),
  };
}
