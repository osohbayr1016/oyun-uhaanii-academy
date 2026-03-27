import { getPrisma } from "../../utils/prisma";
import { defaultClubCreateData } from "./clubDefaultCreateData";
import type { AppCtx } from "../../types/context";

export const uploadClubImage = async (c: AppCtx) => {
  try {
    const body = await c.req.json<{
      imageUrl?: string;
      imageType?: string;
    }>();
    const { imageUrl, imageType } = body;

    if (!imageUrl || !imageType) {
      return c.json(
        {
          success: false,
          message: "imageUrl and imageType are required",
        },
        400
      );
    }

    if (!["heroBackgroundImage", "clubLogo"].includes(imageType)) {
      return c.json(
        {
          success: false,
          message:
            "imageType must be either 'heroBackgroundImage' or 'clubLogo'",
        },
        400
      );
    }

    const key = imageType as "heroBackgroundImage" | "clubLogo";
    const otherKey = key === "heroBackgroundImage" ? "clubLogo" : "heroBackgroundImage";

    let clubContent = await getPrisma().club.findFirst();

    if (!clubContent) {
      clubContent = await getPrisma().club.create({
        data: {
          ...defaultClubCreateData,
          [key]: imageUrl,
          [otherKey]:
            key === "heroBackgroundImage" ? "/logosalbariin.png" : "/about3.png",
        },
      });
    } else {
      clubContent = await getPrisma().club.update({
        where: { id: clubContent.id },
        data: {
          [key]: imageUrl,
        },
      });
    }

    return c.json({
      success: true,
      message: `${imageType} uploaded successfully`,
      data: clubContent,
    });
  } catch (error) {
    console.error("Error uploading club image:", error);
    return c.json(
      {
        success: false,
        message: "Failed to upload club image",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
};
