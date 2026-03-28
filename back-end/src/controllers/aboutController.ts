import type { Prisma } from "@prisma/client";
import { getPrisma } from "../utils/prisma";
import type { PublicCtx } from "../types/context";
import { aboutPageSeedRows } from "./aboutSeedData";

export const getAboutPageContent = async (c: PublicCtx) => {
  try {
    const content = await getPrisma().aboutPageContent.findMany({
      orderBy: { createdAt: "asc" },
    });

    const formattedContent: Record<string, unknown> = {};
    content.forEach((item) => {
      if (item.section === "team") {
        formattedContent[item.section] = {
          id: item.id,
          teamMembers: item.teamMembers || [],
        };
      } else {
        formattedContent[item.section] = {
          id: item.id,
          title: item.title,
          content: item.content,
          imageUrl: item.imageUrl,
          teamMemberName: item.teamMemberName,
          teamMemberRole: item.teamMemberRole,
          teamMemberImage: item.teamMemberImage,
          contactAddress: item.contactAddress,
          contactPhone: item.contactPhone,
          contactEmail: item.contactEmail,
          contactHours: item.contactHours,
        };
      }
    });

    return c.json(formattedContent);
  } catch (error) {
    console.error("Get about page content error:", error);
    return c.json({});
  }
};

export const updateAboutPageContent = async (c: PublicCtx) => {
  try {
    const body = await c.req.json<Record<string, unknown>>();
    const {
      section,
      title,
      content,
      imageUrl,
      teamMembers,
      teamMemberName,
      teamMemberRole,
      teamMemberImage,
      contactAddress,
      contactPhone,
      contactEmail,
      contactHours,
    } = body;

    if (!section) {
      return c.json({ message: "Section is required" }, 400);
    }

    const existingContent = await getPrisma().aboutPageContent.findUnique({
      where: { section: String(section) },
    });

    let result;
    if (existingContent) {
      const teamUpdate: Prisma.AboutPageContentUpdateInput = {
        teamMembers: teamMembers as Prisma.InputJsonValue,
      };
      const restUpdate: Prisma.AboutPageContentUpdateInput = {
        title: title as string | undefined,
        content: content as string | undefined,
        imageUrl: imageUrl as string | undefined,
        teamMemberName: teamMemberName as string | undefined,
        teamMemberRole: teamMemberRole as string | undefined,
        teamMemberImage: teamMemberImage as string | undefined,
        contactAddress: contactAddress as string | undefined,
        contactPhone: contactPhone as string | undefined,
        contactEmail: contactEmail as string | undefined,
        contactHours: contactHours as string | undefined,
      };
      result = await getPrisma().aboutPageContent.update({
        where: { section: String(section) },
        data: section === "team" ? teamUpdate : restUpdate,
      });
    } else {
      const teamCreate: Prisma.AboutPageContentCreateInput = {
        section: String(section),
        teamMembers: teamMembers as Prisma.InputJsonValue,
      };
      const restCreate: Prisma.AboutPageContentCreateInput = {
        section: String(section),
        title: title as string | undefined,
        content: content as string | undefined,
        imageUrl: imageUrl as string | undefined,
        teamMemberName: teamMemberName as string | undefined,
        teamMemberRole: teamMemberRole as string | undefined,
        teamMemberImage: teamMemberImage as string | undefined,
        contactAddress: contactAddress as string | undefined,
        contactPhone: contactPhone as string | undefined,
        contactEmail: contactEmail as string | undefined,
        contactHours: contactHours as string | undefined,
      };
      result = await getPrisma().aboutPageContent.create({
        data: section === "team" ? teamCreate : restCreate,
      });
    }

    return c.json(result);
  } catch (error) {
    console.error("Update about page content error:", error);
    return c.json({ message: "Failed to update about page content" }, 500);
  }
};

export const deleteAboutPageContent = async (c: PublicCtx) => {
  try {
    const section = c.req.param("section");

    await getPrisma().aboutPageContent.delete({
      where: { section },
    });

    return c.json({ message: "About page content deleted successfully" });
  } catch (error) {
    console.error("Delete about page content error:", error);
    return c.json({ message: "Failed to delete about page content" }, 500);
  }
};

export const seedAboutPageContent = async (c: PublicCtx) => {
  try {
    await getPrisma().aboutPageContent.deleteMany();

    const results = await Promise.all(
      aboutPageSeedRows.map((row) =>
        getPrisma().aboutPageContent.create({
          data: row,
        })
      )
    );

    return c.json({ message: "About page content seeded successfully", results });
  } catch (error) {
    console.error("Seed about page content error:", error);
    return c.json({ message: "Failed to seed about page content" }, 500);
  }
};
