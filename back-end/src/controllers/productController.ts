import { getPrisma } from "../utils/prisma";
import type { PublicCtx } from "../types/context";

export const getAllProducts = async (c: PublicCtx) => {
  try {
    const products = await getPrisma().product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return c.json(products);
  } catch (error) {
    console.error("Get all products error:", error);
    return c.json([]);
  }
};

export const getProductById = async (c: PublicCtx) => {
  try {
    const id = c.req.param("id");
    const product = await getPrisma().product.findUnique({
      where: { id },
    });

    if (!product) {
      return c.json({ message: "Product not found" }, 404);
    }

    return c.json(product);
  } catch (error) {
    console.error("Get product by ID error:", error);
    return c.json({ message: "Failed to fetch product" }, 500);
  }
};

export const createProduct = async (c: PublicCtx) => {
  try {
    const body = await c.req.json<Record<string, unknown>>();
    console.log("Backend: Received product data:", body);

    const {
      name,
      price,
      currency,
      imageUrl,
      description,
      category,
      stock,
      materials,
      dimensions,
      stockStatusText,
    } = body;

    if (!name || !String(name).trim()) {
      return c.json({ message: "Product name is required" }, 400);
    }

    if (!price || isNaN(parseFloat(String(price)))) {
      return c.json({ message: "Valid price is required" }, 400);
    }

    if (!description || !String(description).trim()) {
      return c.json({ message: "Product description is required" }, 400);
    }

    if (!category || !String(category).trim()) {
      return c.json({ message: "Product category is required" }, 400);
    }

    const productData = {
      name: String(name).trim(),
      price: parseFloat(String(price)),
      currency: (currency as string) || "MNT",
      imageUrl: (imageUrl as string) || "",
      description: String(description).trim(),
      category: String(category).trim(),
      stock: parseInt(String(stock), 10) || 0,
      materials: (materials as string[]) || [],
      dimensions: (dimensions as object) || {},
      stockStatusText: (stockStatusText as string | null) || null,
    };

    const product = await getPrisma().product.create({
      data: productData,
    });

    return c.json(product, 201);
  } catch (error) {
    console.error("Backend: Create product error:", error);
    return c.json(
      {
        message: "Failed to create product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
};

export const updateProduct = async (c: PublicCtx) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json<Record<string, unknown>>();
    const {
      name,
      price,
      currency,
      imageUrl,
      description,
      category,
      stock,
      materials,
      dimensions,
      stockStatusText,
    } = body;

    const existingProduct = await getPrisma().product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return c.json({ message: "Product not found" }, 404);
    }

    const product = await getPrisma().product.update({
      where: { id },
      data: {
        name: name ? String(name).trim() : undefined,
        price: price ? parseFloat(String(price)) : undefined,
        currency: currency as string | undefined,
        imageUrl: imageUrl as string | undefined,
        description: description ? String(description).trim() : undefined,
        category: category ? String(category).trim() : undefined,
        stock: stock ? parseInt(String(stock), 10) : undefined,
        materials: materials as string[] | undefined,
        dimensions: dimensions as object | undefined,
        stockStatusText: stockStatusText || null,
      },
    });

    return c.json(product);
  } catch (error) {
    console.error("Backend: Update product error:", error);
    return c.json(
      {
        message: "Failed to update product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
};

export const deleteProduct = async (c: PublicCtx) => {
  try {
    const id = c.req.param("id");
    await getPrisma().product.delete({
      where: { id },
    });

    return c.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    return c.json({ message: "Failed to delete product" }, 500);
  }
};
