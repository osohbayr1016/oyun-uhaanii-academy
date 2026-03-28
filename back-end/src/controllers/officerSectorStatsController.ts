import type { AppCtx } from "../types/context";
import { updateOfficerSectorStatsFromRequest } from "../services/officerSectorStatsService";

export const putOfficerSectorStats = async (c: AppCtx) => {
  try {
    const body = await c.req.json<Record<string, unknown>>();
    const stats = await updateOfficerSectorStatsFromRequest(body);
    return c.json(stats);
  } catch (error) {
    console.error("Put officer sector stats error:", error);
    return c.json({ message: "Failed to update officer sector stats" }, 500);
  }
};
