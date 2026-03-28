import type { AppCtx } from "../types/context";
import { updateOfficerSectorStatsFromRequest } from "../services/officerSectorStatsService";

export const putOfficerSectorStats = async (c: AppCtx) => {
  try {
    const raw = await c.req.text();
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return c.json({ message: "Invalid JSON body" }, 400);
    }
    const stats = await updateOfficerSectorStatsFromRequest(body);
    return c.json(stats);
  } catch (error) {
    const msg =
      error instanceof Error ? error.message : String(error ?? "unknown");
    console.error("Put officer sector stats error:", msg, error);
    return c.json(
      { message: "Failed to update officer sector stats", detail: msg },
      500
    );
  }
};
