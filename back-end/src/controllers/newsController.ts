import { getPrisma } from "../utils/prisma";
import type { AppCtx } from "../types/context";
import type { PublicCtx } from "../types/context";

export const getAllNews = async (c: PublicCtx) => {
  try {
    const news = await getPrisma().news.findMany({
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

    return c.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    if (process.env.NODE_ENV === "development") {
      return c.json(
        {
          message: "Server error",
          error: error instanceof Error ? error.stack : error,
        },
        500
      );
    }
    return c.json({ message: "Server error" }, 500);
  }
};

export const getNewsById = async (c: PublicCtx) => {
  try {
    const id = c.req.param("id");

    const news = await getPrisma().news.findUnique({
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
      return c.json({ message: "News article not found" }, 404);
    }

    return c.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    return c.json({ message: "Server error" }, 500);
  }
};

export const createNews = async (c: AppCtx) => {
  try {
    const body = await c.req.json<{
      title?: string;
      content?: string;
      imageUrl?: string;
      videoUrl?: string;
    }>();
    const { title, content, imageUrl, videoUrl } = body;
    const authorId = c.get("user")?.userId;

    if (!authorId) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const news = await getPrisma().news.create({
      data: {
        title: title!,
        content: content!,
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

    return c.json(news, 201);
  } catch (error) {
    console.error("Error creating news:", error);
    return c.json({ message: "Server error" }, 500);
  }
};

export const updateNews = async (c: AppCtx) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json<{
      title?: string;
      content?: string;
      imageUrl?: string;
      videoUrl?: string;
    }>();
    const { title, content, imageUrl, videoUrl } = body;
    const userId = c.get("user")?.userId;

    if (!userId) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const existingNews = await getPrisma().news.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!existingNews) {
      return c.json({ message: "News article not found" }, 404);
    }

    const user = await getPrisma().user.findUnique({ where: { id: userId } });
    if (existingNews.authorId !== userId && user?.role !== "admin") {
      return c.json({ message: "Forbidden" }, 403);
    }

    const updatedNews = await getPrisma().news.update({
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

    return c.json(updatedNews);
  } catch (error) {
    console.error("Error updating news:", error);
    return c.json({ message: "Server error" }, 500);
  }
};

export const deleteNews = async (c: AppCtx) => {
  try {
    const id = c.req.param("id");
    const userId = c.get("user")?.userId;

    if (!userId) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const existingNews = await getPrisma().news.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!existingNews) {
      return c.json({ message: "News article not found" }, 404);
    }

    const user = await getPrisma().user.findUnique({ where: { id: userId } });
    if (existingNews.authorId !== userId && user?.role !== "admin") {
      return c.json({ message: "Forbidden" }, 403);
    }

    await getPrisma().news.delete({
      where: { id },
    });

    return c.json({ message: "News article deleted successfully" });
  } catch (error) {
    console.error("Error deleting news:", error);
    return c.json({ message: "Server error" }, 500);
  }
};
