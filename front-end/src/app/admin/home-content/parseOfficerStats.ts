import type { OfficerSectorStatsValues } from "./OfficerSectorStatsFields";

const defaults: OfficerSectorStatsValues = {
  courses: 0,
  tournaments: 0,
  enrollments: 0,
  teachers: 0,
  products: 0,
  years: 0,
};

export function parseOfficerStatsPayload(s: unknown): OfficerSectorStatsValues {
  if (!s || typeof s !== "object" || "message" in s) return { ...defaults };
  const raw = s as Record<string, unknown>;
  const num = (k: string): number => {
    const v = raw[k];
    if (typeof v === "number" && Number.isFinite(v)) return Math.max(0, v);
    if (typeof v === "string") {
      const n = parseInt(v.replace(/\D/g, ""), 10);
      return Number.isFinite(n) ? Math.max(0, n) : 0;
    }
    return 0;
  };
  return {
    courses: num("courses"),
    tournaments: num("tournaments"),
    enrollments: num("enrollments"),
    teachers: num("teachers"),
    products: num("products"),
    years: num("years"),
  };
}
