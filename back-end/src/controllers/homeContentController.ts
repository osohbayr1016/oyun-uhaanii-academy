import { getPrisma } from "../utils/prisma";
import type { PublicCtx } from "../types/context";

const homeContentKeys = [
  "hero_title",
  "hero_subtitle",
  "hero_stats_courses",
  "hero_stats_students",
  "hero_stats_teachers",
  "hero_stats_years",
  "features_title",
  "features_subtitle",
  "feature_1_title",
  "feature_1_description",
  "feature_2_title",
  "feature_2_description",
  "feature_3_title",
  "feature_3_description",
  "feature_4_title",
  "feature_4_description",
  "feature_5_title",
  "feature_5_description",
  "feature_6_title",
  "feature_6_description",
];

export const getHomeContent = async (c: PublicCtx) => {
  try {
    const content = await getPrisma().textContent.findMany({
      where: {
        key: {
          in: homeContentKeys,
        },
      },
    });

    const contentObject = content.reduce(
      (acc, item) => {
        acc[item.key] = item.value;
        return acc;
      },
      {} as Record<string, string>
    );

    return c.json(contentObject);
  } catch (error) {
    console.error("Get home content error:", error);
    return c.json({ message: "Failed to fetch home content" }, 500);
  }
};

export const createHomeContent = async (c: PublicCtx) => {
  try {
    const body = await c.req.json<{ key?: string; value?: string }>();
    const { key, value } = body;

    if (!key || !value) {
      return c.json({ message: "Key and value are required" }, 400);
    }

    const content = await getPrisma().textContent.create({
      data: {
        key,
        value,
      },
    });

    return c.json(content, 201);
  } catch (error) {
    console.error("Create home content error:", error);
    return c.json({ message: "Failed to create home content" }, 500);
  }
};

export const updateHomeContent = async (c: PublicCtx) => {
  try {
    const updates = await c.req.json<Record<string, unknown>>();

    if (!updates || typeof updates !== "object") {
      return c.json({ message: "Updates object is required" }, 400);
    }

    const results = [];

    for (const [key, value] of Object.entries(updates)) {
      try {
        const content = await getPrisma().textContent.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        });
        results.push(content);
      } catch (error) {
        console.error(`Error updating ${key}:`, error);
        results.push({ key, error: "Failed to update" });
      }
    }

    return c.json(results);
  } catch (error) {
    console.error("Update home content error:", error);
    return c.json({ message: "Failed to update home content" }, 500);
  }
};
