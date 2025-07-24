import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

// Get all club content
export const getAllClubContent = async (req: Request, res: Response) => {
  try {
    const content = await prisma.clubContent.findMany({
      orderBy: { order: "asc" },
    });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch club content" });
  }
};

// Get club content by section
export const getClubContentBySection = async (req: Request, res: Response) => {
  const { section } = req.params;
  try {
    const content = await prisma.clubContent.findMany({
      where: { section },
      orderBy: { order: "asc" },
    });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch club content by section" });
  }
};

// Get club content by key
export const getClubContentByKey = async (req: Request, res: Response) => {
  const { key } = req.params;
  try {
    const content = await prisma.clubContent.findUnique({ where: { key } });
    if (!content) return res.status(404).json({ error: "Not found" });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch club content by key" });
  }
};

// Create new club content
export const createClubContent = async (req: Request, res: Response) => {
  const { key, value, type, section, order } = req.body;
  try {
    const content = await prisma.clubContent.create({
      data: { key, value, type, section, order },
    });
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ error: "Failed to create club content" });
  }
};

// Update club content by key
export const updateClubContent = async (req: Request, res: Response) => {
  const { key } = req.params;
  const { value, type, section, order } = req.body;
  try {
    const content = await prisma.clubContent.update({
      where: { key },
      data: { value, type, section, order },
    });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Failed to update club content" });
  }
};

// Delete club content by key
export const deleteClubContent = async (req: Request, res: Response) => {
  const { key } = req.params;
  try {
    await prisma.clubContent.delete({ where: { key } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete club content" });
  }
};
