import { getPrisma } from "../utils/prisma";
import type { PublicCtx } from "../types/context";

export const getAllTextContents = async (c: PublicCtx) => {
  try {
    const contents = await getPrisma().textContent.findMany();
    return c.json(contents);
  } catch {
    return c.json({ error: "Failed to fetch text contents" }, 500);
  }
};

export const getTextContentByKey = async (c: PublicCtx) => {
  const key = c.req.param("key");
  try {
    const content = await getPrisma().textContent.findUnique({ where: { key } });
    if (!content) return c.json({ error: "Not found" }, 404);
    return c.json(content);
  } catch {
    return c.json({ error: "Failed to fetch text content" }, 500);
  }
};

export const createTextContent = async (c: PublicCtx) => {
  const body = await c.req.json<{ key?: string; value?: string }>();
  const { key, value } = body;
  try {
    const content = await getPrisma().textContent.create({ data: { key: key!, value: value! } });
    return c.json(content, 201);
  } catch {
    return c.json({ error: "Failed to create text content" }, 500);
  }
};

export const updateTextContent = async (c: PublicCtx) => {
  const key = c.req.param("key");
  const body = await c.req.json<{ value?: string }>();
  const { value } = body;
  try {
    const content = await getPrisma().textContent.update({
      where: { key },
      data: { value: value! },
    });
    return c.json(content);
  } catch {
    return c.json({ error: "Failed to update text content" }, 500);
  }
};

export const deleteTextContent = async (c: PublicCtx) => {
  const key = c.req.param("key");
  try {
    await getPrisma().textContent.delete({ where: { key } });
    return new Response(null, { status: 204 });
  } catch {
    return c.json({ error: "Failed to delete text content" }, 500);
  }
};
