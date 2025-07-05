import { Request, Response } from "express";
import { Product } from "@prisma/client";
import { prisma } from "../../utils/prisma";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(products);
  } catch (error) {
    console.error("Get all products error:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Get product by ID error:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    console.log("Backend: Received product data:", req.body);

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
    } = req.body;

    // Validate required fields
    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Product name is required",
      });
    }

    if (!price || isNaN(parseFloat(price))) {
      return res.status(400).json({
        message: "Valid price is required",
      });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({
        message: "Product description is required",
      });
    }

    if (!category || !category.trim()) {
      return res.status(400).json({
        message: "Product category is required",
      });
    }

    const productData = {
      name: name.trim(),
      price: parseFloat(price),
      currency: currency || "MNT",
      imageUrl: imageUrl || "",
      description: description.trim(),
      category: category.trim(),
      stock: parseInt(stock) || 0,
      materials: materials || [],
      dimensions: dimensions || {},
    };

    console.log("Backend: Creating product with data:", productData);

    const product = await prisma.product.create({
      data: productData,
    });

    console.log("Backend: Product created successfully:", product);
    res.status(201).json(product);
  } catch (error) {
    console.error("Backend: Create product error:", error);
    res.status(500).json({
      message: "Failed to create product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    res.json(product);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id },
    });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};
