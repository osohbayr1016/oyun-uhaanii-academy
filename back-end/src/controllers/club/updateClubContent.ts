import type { Prisma } from "@prisma/client";
import { getPrisma } from "../../utils/prisma";
import type { AppCtx } from "../../types/context";
import { defaultClubCreateData } from "./clubDefaultCreateData";
import { clubUpdateBodyHasField } from "./clubUpdateHelpers";

function pickDefined<T extends Record<string, unknown>>(o: T): Partial<T> {
  const x: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(o)) {
    if (v !== undefined && v !== null && v !== "") x[k] = v;
  }
  return x as Partial<T>;
}

export const updateClubContent = async (c: AppCtx) => {
  try {
    const body = await c.req.json<Record<string, unknown>>();

    if (!clubUpdateBodyHasField(body)) {
      return c.json(
        {
          success: false,
          message: "At least one field is required for update",
        },
        400
      );
    }

    let clubContent = await getPrisma().club.findFirst();

    if (!clubContent) {
      const createData = {
        ...defaultClubCreateData,
        ...pickDefined(body),
      } as Prisma.ClubCreateInput;
      clubContent = await getPrisma().club.create({
        data: createData,
      });
    } else {
      const data: Prisma.ClubUpdateInput = {};
      const b = body;
      if (b.heroBackgroundImage) data.heroBackgroundImage = String(b.heroBackgroundImage);
      if (b.clubLogo) data.clubLogo = String(b.clubLogo);
      if (b.motto) data.motto = String(b.motto);
      if (b.mission) data.mission = String(b.mission);
      if (b.athletesCount) data.athletesCount = String(b.athletesCount);
      if (b.typesCount) data.typesCount = String(b.typesCount);
      if (b.coachesCount) data.coachesCount = String(b.coachesCount);
      if (b.tournamentTitle) data.tournamentTitle = String(b.tournamentTitle);
      if (b.tournamentDescription)
        data.tournamentDescription = String(b.tournamentDescription);
      if (b.tournamentName) data.tournamentName = String(b.tournamentName);
      if (b.tournamentFrequency)
        data.tournamentFrequency = String(b.tournamentFrequency);
      if (b.tournamentParticipants)
        data.tournamentParticipants = String(b.tournamentParticipants);
      if (b.tournamentDetails) data.tournamentDetails = String(b.tournamentDetails);
      if (b.tournamentButtonText)
        data.tournamentButtonText = String(b.tournamentButtonText);
      if (b.introductionTitle) data.introductionTitle = String(b.introductionTitle);
      if (b.introductionContent)
        data.introductionContent = String(b.introductionContent);
      if (b.introductionImage) data.introductionImage = String(b.introductionImage);
      if (b.activitiesTitle) data.activitiesTitle = String(b.activitiesTitle);
      if (b.activities) data.activities = b.activities as Prisma.InputJsonValue;
      if (b.typesTitle) data.typesTitle = String(b.typesTitle);
      if (b.types) data.types = b.types as Prisma.InputJsonValue;
      if (b.membershipTitle) data.membershipTitle = String(b.membershipTitle);
      if (b.membershipDescription)
        data.membershipDescription = String(b.membershipDescription);
      if (b.membershipRequirements)
        data.membershipRequirements = b.membershipRequirements as Prisma.InputJsonValue;
      if (b.registerButtonText)
        data.registerButtonText = String(b.registerButtonText);
      if (b.googleFormLink) data.googleFormLink = String(b.googleFormLink);
      if (b.internationalAwardsTitle)
        data.internationalAwardsTitle = String(b.internationalAwardsTitle);
      if (b.internationalAwards)
        data.internationalAwards = b.internationalAwards as Prisma.InputJsonValue;
      if (b.domesticAwardsTitle)
        data.domesticAwardsTitle = String(b.domesticAwardsTitle);
      if (b.domesticAwards)
        data.domesticAwards = b.domesticAwards as Prisma.InputJsonValue;

      clubContent = await getPrisma().club.update({
        where: { id: clubContent.id },
        data,
      });
    }

    return c.json({
      success: true,
      message: "Club content updated successfully",
      data: clubContent,
    });
  } catch (error) {
    console.error("Error updating club content:", error);
    return c.json(
      {
        success: false,
        message: "Failed to update club content",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
};
