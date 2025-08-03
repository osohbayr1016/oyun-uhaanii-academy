import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Get all news articles
export const getAllNews = async (req: Request, res: Response) => {
  try {
    const news = await prisma.news.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    res.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    if (process.env.NODE_ENV === "development") {
      res
        .status(500)
        .json({
          message: "Server error",
          error: error instanceof Error ? error.stack : error,
        });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

// Get single news article by ID
export const getNewsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const news = await prisma.news.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!news) {
      return res.status(404).json({ message: "News article not found" });
    }

    res.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new news article
export const createNews = async (req: Request, res: Response) => {
  try {
    const { title, content, imageUrl, videoUrl } = req.body;
    const authorId = req.user?.userId; // From auth middleware

    if (!authorId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const news = await prisma.news.create({
      data: {
        title,
        content,
        imageUrl,
        videoUrl,
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json(news);
  } catch (error) {
    console.error("Error creating news:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update news article
export const updateNews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, imageUrl, videoUrl } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if news exists and user is author or admin
    const existingNews = await prisma.news.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!existingNews) {
      return res.status(404).json({ message: "News article not found" });
    }

    // Check if user is author or admin
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (existingNews.authorId !== userId && user?.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        title,
        content,
        imageUrl,
        videoUrl,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(updatedNews);
  } catch (error) {
    console.error("Error updating news:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete news article
export const deleteNews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if news exists and user is author or admin
    const existingNews = await prisma.news.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!existingNews) {
      return res.status(404).json({ message: "News article not found" });
    }

    // Check if user is author or admin
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (existingNews.authorId !== userId && user?.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    await prisma.news.delete({
      where: { id },
    });

    res.json({ message: "News article deleted successfully" });
  } catch (error) {
    console.error("Error deleting news:", error);
    res.status(500).json({ message: "Server error" });
  }
};
