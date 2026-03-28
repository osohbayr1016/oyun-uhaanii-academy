import type { PublicCtx } from "../types/context";
import { getPublicOfficerStats } from "../services/officerSectorStatsService";

export const getHomeStats = async (c: PublicCtx) => {
  try {
    const stats = await getPublicOfficerStats();
    return c.json(stats);
  } catch (error) {
    console.error("Get home stats error:", error);
    return c.json({ message: "Failed to fetch home stats" }, 500);
  }
};
