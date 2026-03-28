import type { OfficerSectorStatsValues } from "./OfficerSectorStatsFields";

const defaults: OfficerSectorStatsValues = {
  courses: 1,
  tournaments: 1,
  enrollments: 1,
  teachers: 1,
  products: 1,
  years: 1,
};

export function parseOfficerStatsPayload(
  s: unknown
): OfficerSectorStatsValues {
  if (!s || typeof s !== "object" || "message" in s) return { ...defaults };
  const raw = s as Record<string, unknown>;
  const num = (k: string) => {
    const v = raw[k];
    if (typeof v === "number" && Number.isFinite(v)) return Math.max(1, v);
    if (typeof v === "string") {
      const n = parseInt(v.replace(/\D/g, ""), 10);
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
}
