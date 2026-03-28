import type { OfficerSectorStatsValues, OfficerStatKey } from "./types";

export const STAT_KEYS: OfficerStatKey[] = [
  "courses",
  "tournaments",
  "enrollments",
  "teachers",
  "products",
  "years",
];

export function parseDraftToNum(raw: string): number {
  if (raw.trim() === "") return 0;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

export function valuesToDrafts(
  v: OfficerSectorStatsValues
): Record<OfficerStatKey, string> {
  return Object.fromEntries(
    STAT_KEYS.map((k) => [k, String(v[k])])
  ) as Record<OfficerStatKey, string>;
}
