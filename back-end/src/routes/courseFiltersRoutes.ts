import { Hono } from "hono";
import { getPrisma } from "../utils/prisma";
import authenticateToken from "../middleware/authMiddleware";
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();

r.get("/categories", async (c) => {
  try {
    const categories = await getPrisma().courseCategory.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
    return c.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return c.json([]);
  }
});

r.get("/levels", async (c) => {
  try {
    const levels = await getPrisma().courseLevel.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
    return c.json(levels);
  } catch (error) {
    console.error("Error fetching levels:", error);
    return c.json([]);
  }
});

r.post("/categories", authenticateToken, async (c) => {
  try {
    const body = await c.req.json<{ name?: string }>();
    const { name } = body;
    if (!name) {
      return c.json({ error: "Category name is required" }, 400);
    }
    const category = await getPrisma().courseCategory.create({
      data: { name },
    });
    return c.json(category, 201);
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err.code === "P2002") {
      return c.json({ error: "Category with this name already exists" }, 400);
    }
    console.error("Error creating category:", error);
    return c.json({ error: "Failed to create category" }, 500);
  }
});

r.post("/levels", authenticateToken, async (c) => {
  try {
    const body = await c.req.json<{ name?: string }>();
    const { name } = body;
    if (!name) {
      return c.json({ error: "Level name is required" }, 400);
    }
    const level = await getPrisma().courseLevel.create({
      data: { name },
    });
    return c.json(level, 201);
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err.code === "P2002") {
      return c.json({ error: "Level with this name already exists" }, 400);
    }
    console.error("Error creating level:", error);
    return c.json({ error: "Failed to create level" }, 500);
  }
});

r.put("/categories/:id", authenticateToken, async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json<{ name?: string; isActive?: boolean }>();
    const { name, isActive } = body;
    const category = await getPrisma().courseCategory.update({
      where: { id },
      data: { name, isActive },
    });
    return c.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    return c.json({ error: "Failed to update category" }, 500);
  }
});

r.put("/levels/:id", authenticateToken, async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json<{ name?: string; isActive?: boolean }>();
    const { name, isActive } = body;
    const level = await getPrisma().courseLevel.update({
      where: { id },
      data: { name, isActive },
    });
    return c.json(level);
  } catch (error) {
    console.error("Error updating level:", error);
    return c.json({ error: "Failed to update level" }, 500);
  }
});

r.delete("/categories/:id", authenticateToken, async (c) => {
  try {
    const id = c.req.param("id");
    await getPrisma().courseCategory.update({
      where: { id },
      data: { isActive: false },
    });
    return c.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return c.json({ error: "Failed to delete category" }, 500);
  }
});

r.delete("/levels/:id", authenticateToken, async (c) => {
  try {
    const id = c.req.param("id");
    await getPrisma().courseLevel.update({
      where: { id },
      data: { isActive: false },
    });
    return c.json({ message: "Level deleted successfully" });
  } catch (error) {
    console.error("Error deleting level:", error);
    return c.json({ error: "Failed to delete level" }, 500);
  }
});

export default r;
