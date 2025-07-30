import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/home-content
export const getHomeContent = async (req: Request, res: Response) => {
  try {
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
    "feature_6_description"
  ];

    const content = await prisma.textContent.findMany({
      where: {
        key: {
          in: homeContentKeys
        }
      }
    });

    // Convert array to object for easier frontend usage
    const contentObject = content.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);

    res.json(contentObject);
  } catch (error) {
    console.error("Get home content error:", error);
    res.status(500).json({ message: "Failed to fetch home content" });
  }
};

// POST /api/home-content
export const createHomeContent = async (req: Request, res: Response) => {
  try {
    const { key, value } = req.body;

    if (!key || !value) {
      return res.status(400).json({
        message: "Key and value are required",
      });
    }

    const content = await prisma.textContent.create({
      data: {
        key,
        value,
      },
    });

    res.status(201).json(content);
  } catch (error) {
    console.error("Create home content error:", error);
    res.status(500).json({ message: "Failed to create home content" });
  }
};

// PUT /api/home-content
export const updateHomeContent = async (req: Request, res: Response) => {
  try {
    const updates = req.body;

    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({
        message: "Updates object is required",
      });
    }

    const results = [];

    for (const [key, value] of Object.entries(updates)) {
      try {
        const content = await prisma.textContent.upsert({
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

    res.json(results);
  } catch (error) {
    console.error("Update home content error:", error);
    res.status(500).json({ message: "Failed to update home content" });
  }
}; 