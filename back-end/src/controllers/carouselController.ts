import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCarouselImages = async (req: Request, res: Response) => {
  try {
    const images = await prisma.carouselImage.findMany({
      orderBy: { createdAt: "asc" },
    });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch carousel images" });
  }
};

export const addCarouselImage = async (req: Request, res: Response) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl || !imageUrl.trim()) {
      return res.status(400).json({ message: "Image URL is required" });
    }
    const image = await prisma.carouselImage.create({
      data: { imageUrl: imageUrl.trim() },
    });
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ message: "Failed to add carousel image" });
  }
};

export const deleteCarouselImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if the image exists before trying to delete it
    const existingImage = await prisma.carouselImage.findUnique({
      where: { id },
    });

    if (!existingImage) {
      return res.status(404).json({ message: "Carousel image not found" });
    }

    // Delete the image
    await prisma.carouselImage.delete({ where: { id } });
    res.json({ message: "Carousel image deleted successfully" });
  } catch (error) {
    console.error("Error deleting carousel image:", error);
    res.status(500).json({ message: "Failed to delete carousel image" });
  }
};
