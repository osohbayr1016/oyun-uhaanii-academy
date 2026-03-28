/** First run of digits in a string, e.g. "10+" → 10, "3 000" → 3000 */
export function parseStoredNumber(raw: string | undefined | null): number | undefined {
  if (raw == null || typeof raw !== "string") return undefined;
  const t = raw.trim();
  if (!t) return undefined;
  const digits = t.replace(/[^\d]/g, "");
  if (!digits) return undefined;
  const n = parseInt(digits, 10);
  return Number.isFinite(n) ? n : undefined;
}

/** Legacy feature_*_description: only treat as number if short (not full sentences). */
export function parseLegacyFeatureDescription(
  raw: string | undefined | null
): number | undefined {
  if (raw == null || typeof raw !== "string") return undefined;
  const t = raw.trim();
  if (!t || t.length > 24) return undefined;
  return parseStoredNumber(t);
}
