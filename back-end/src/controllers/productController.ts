import { Product } from "@prisma/client";
import { prisma } from "../../utils/prisma";

export const getAllProducts = async (): Promise<Product[]> => {
  return await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getProductById = async (id: string): Promise<Product | null> => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

export const createProduct = async (data: {
  name: string;
  price: number;
  currency: string;
  imageUrl: string;
  description: string;
  category: string;
  stock: number;
  materials: string[];
  dimensions: { width: string; height: string; depth: string };
}): Promise<Product> => {
  return await prisma.product.create({
    data: {
      ...data,
      dimensions: data.dimensions, // stored as JSON
    },
  });
};

export const updateProduct = async (
  id: string,
  data: Partial<Product>
): Promise<Product> => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string): Promise<Product> => {
  return await prisma.product.delete({
    where: { id },
  });
};
