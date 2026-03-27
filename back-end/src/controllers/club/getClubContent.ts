import { getPrisma } from "../../utils/prisma";
import { defaultClubCreateData } from "./clubDefaultCreateData";
import type { PublicCtx } from "../../types/context";

export const getClubContent = async (c: PublicCtx) => {
  try {
    let clubContent = await getPrisma().club.findFirst();

    if (!clubContent) {
      clubContent = await getPrisma().club.create({
        data: defaultClubCreateData,
      });
    }

    return c.json({
      success: true,
      data: clubContent,
    });
  } catch (error) {
    console.error("Error fetching club content:", error);
    return c.json(
      {
        success: false,
        message: "Failed to fetch club content",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
};
