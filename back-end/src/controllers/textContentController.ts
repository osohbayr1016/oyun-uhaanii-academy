import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

// Get all text contents
export const getAllTextContents = async (req: Request, res: Response) => {
  try {
    const contents = await prisma.textContent.findMany();
    res.json(contents);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch text contents" });
  }
};

// Get text content by key
export const getTextContentByKey = async (req: Request, res: Response) => {
  const { key } = req.params;
  try {
    const content = await prisma.textContent.findUnique({ where: { key } });
    if (!content) return res.status(404).json({ error: "Not found" });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch text content" });
  }
};

// Create new text content
export const createTextContent = async (req: Request, res: Response) => {
  const { key, value } = req.body;
  try {
    const content = await prisma.textContent.create({ data: { key, value } });
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ error: "Failed to create text content" });
  }
};

// Update text content by key
export const updateTextContent = async (req: Request, res: Response) => {
  const { key } = req.params;
  const { value } = req.body;
  try {
    const content = await prisma.textContent.update({
      where: { key },
      data: { value },
    });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Failed to update text content" });
  }
};

// Delete text content by key
export const deleteTextContent = async (req: Request, res: Response) => {
  const { key } = req.params;
  try {
    await prisma.textContent.delete({ where: { key } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete text content" });
  }
};
