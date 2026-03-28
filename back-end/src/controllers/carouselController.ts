import { getPrisma } from "../utils/prisma";
import type { PublicCtx } from "../types/context";

export const getCarouselImages = async (c: PublicCtx) => {
  try {
    const images = await getPrisma().carouselImage.findMany({
      orderBy: { createdAt: "asc" },
    });
    return c.json(images);
  } catch (error) {
    console.error("Get carousel images error:", error);
    return c.json([]);
  }
};

export const addCarouselImage = async (c: PublicCtx) => {
  try {
    const body = await c.req.json<{ imageUrl?: string }>();
    const { imageUrl } = body;
    if (!imageUrl || !imageUrl.trim()) {
      return c.json({ message: "Image URL is required" }, 400);
    }
    const image = await getPrisma().carouselImage.create({
      data: { imageUrl: imageUrl.trim() },
    });
    return c.json(image, 201);
  } catch {
    return c.json({ message: "Failed to add carousel image" }, 500);
  }
};

export const deleteCarouselImage = async (c: PublicCtx) => {
  try {
    const id = c.req.param("id");

    const existingImage = await getPrisma().carouselImage.findUnique({
      where: { id },
    });

    if (!existingImage) {
      return c.json({ message: "Carousel image not found" }, 404);
    }

    await getPrisma().carouselImage.delete({ where: { id } });
    return c.json({ message: "Carousel image deleted successfully" });
  } catch (error) {
    console.error("Error deleting carousel image:", error);
    return c.json({ message: "Failed to delete carousel image" }, 500);
  }
};
