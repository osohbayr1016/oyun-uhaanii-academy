import { getPrisma } from "../utils/prisma";
import { parseStoredNumber } from "../utils/officerStatsMerge";
import {
  computeAggregates,
  type StatFields,
} from "./officerSectorStatsCompute";

const SINGLETON_ID = 1;

const TEXT_OVERRIDE_KEYS = [
  "officer_stat_courses",
  "officer_stat_tournaments",
  "officer_stat_enrollments",
  "officer_stat_teachers",
  "officer_stat_products",
  "officer_stat_years",
] as const;

async function migrateFromTextContent(): Promise<Partial<StatFields>> {
  const prisma = getPrisma();
  const rows = await prisma.textContent.findMany({
    where: { key: { in: [...TEXT_OVERRIDE_KEYS] } },
  });
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  const keyMap: [typeof TEXT_OVERRIDE_KEYS[number], keyof StatFields][] = [
    ["officer_stat_courses", "courses"],
    ["officer_stat_tournaments", "tournaments"],
    ["officer_stat_enrollments", "enrollments"],
    ["officer_stat_teachers", "teachers"],
    ["officer_stat_products", "products"],
    ["officer_stat_years", "years"],
  ];
  const out: Partial<StatFields> = {};
  for (const [textKey, field] of keyMap) {
    const n = parseStoredNumber(map[textKey]);
    if (n !== undefined) out[field] = n;
  }
  return out;
}

function clampMinOne(n: number): number {
  return Math.max(1, Math.floor(n));
}

function normalizeRowData(data: StatFields): StatFields {
  return {
    courses: clampMinOne(data.courses),
    tournaments: clampMinOne(data.tournaments),
    enrollments: clampMinOne(data.enrollments),
    teachers: clampMinOne(data.teachers),
    products: clampMinOne(data.products),
    years: clampMinOne(data.years),
  };
}

export async function ensureOfficerSectorStatsRow() {
  const prisma = getPrisma();
  const existing = await prisma.officerSectorStats.findUnique({
    where: { id: SINGLETON_ID },
  });
  if (existing) {
    const n = normalizeRowData({
      courses: existing.courses,
      tournaments: existing.tournaments,
      enrollments: existing.enrollments,
      teachers: existing.teachers,
      products: existing.products,
      years: existing.years,
    });
    const dirty =
      existing.courses !== n.courses ||
      existing.tournaments !== n.tournaments ||
      existing.enrollments !== n.enrollments ||
      existing.teachers !== n.teachers ||
      existing.products !== n.products ||
      existing.years !== n.years;
    if (dirty) {
      return prisma.officerSectorStats.update({
        where: { id: SINGLETON_ID },
        data: n,
      });
    }
    return existing;
  }

  const computed = await computeAggregates();
  const fromText = await migrateFromTextContent();
  const merged = normalizeRowData({
    courses: fromText.courses ?? computed.courses,
    tournaments: fromText.tournaments ?? computed.tournaments,
    enrollments: fromText.enrollments ?? computed.enrollments,
    teachers: fromText.teachers ?? computed.teachers,
    products: fromText.products ?? computed.products,
    years: fromText.years ?? computed.years,
  });

  return prisma.officerSectorStats.create({
    data: { id: SINGLETON_ID, ...merged },
  });
}

export async function getPublicOfficerStats(): Promise<StatFields> {
  const row = await ensureOfficerSectorStatsRow();
  return normalizeRowData({
    courses: row.courses,
    tournaments: row.tournaments,
    enrollments: row.enrollments,
    teachers: row.teachers,
    products: row.products,
    years: row.years,
  });
}

export async function updateOfficerSectorStatsFromRequest(
  body: Record<string, unknown>
): Promise<StatFields> {
  const prisma = getPrisma();
  const clamp = (v: unknown): number => {
    const n = typeof v === "number" ? v : parseInt(String(v ?? ""), 10);
    if (!Number.isFinite(n)) return 1;
    return clampMinOne(n);
  };

  await ensureOfficerSectorStatsRow();
  const updated = await prisma.officerSectorStats.update({
    where: { id: SINGLETON_ID },
    data: {
      courses: clamp(body.courses),
      tournaments: clamp(body.tournaments),
      enrollments: clamp(body.enrollments),
      teachers: clamp(body.teachers),
      products: clamp(body.products),
      years: clamp(body.years),
    },
  });
  return normalizeRowData({
    courses: updated.courses,
    tournaments: updated.tournaments,
    enrollments: updated.enrollments,
    teachers: updated.teachers,
    products: updated.products,
    years: updated.years,
  });
}
