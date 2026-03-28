import type { AppCtx } from "../types/context";
import { updateOfficerSectorStatsFromRequest } from "../services/officerSectorStatsService";

export const putOfficerSectorStats = async (c: AppCtx) => {
  try {
    const body = await c.req.json<Record<string, unknown>>();
    const stats = await updateOfficerSectorStatsFromRequest(body);
    return c.json(stats);
  } catch (error) {
    console.error("Put officer sector stats error:", error);
    const msg =
      error instanceof Error ? error.message : "Failed to update officer sector stats";
    const code =
      error && typeof error === "object" && "code" in error
        ? String((error as { code?: string }).code)
        : "";
    return c.json(
      {
        message: "Failed to update officer sector stats",
        detail: process.env.NODE_ENV === "development" ? msg : undefined,
        code: code || undefined,
      },
      500
    );
  }
};
