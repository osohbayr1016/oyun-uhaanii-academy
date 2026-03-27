import { app } from "../src/index";
import { getPrisma } from "../src/utils/prisma";

const prisma = getPrisma();

describe("Products Controller", () => {
  beforeAll(async () => {
    await prisma.product.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET /api/products", () => {
    it("should return empty array when no products exist", async () => {
      const response = await app.request("http://localhost/api/products");
      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body).toEqual([]);
    });

    it("should return all products", async () => {
      const testProduct = await prisma.product.create({
        data: {
          name: "Test Product",
          description: "Test Description",
          price: 1000,
          currency: "MNT",
          imageUrl: "https://example.com/image.jpg",
          category: "Test Category",
          stock: 10,
          materials: ["test"],
          dimensions: {},
        },
      });

      const response = await app.request("http://localhost/api/products");
      expect(response.status).toBe(200);
      const body = (await response.json()) as Array<{ id: string; name: string }>;
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);
      expect(body[0]).toHaveProperty("id");
      expect(body[0].name).toBe(testProduct.name);
    });
  });

  describe("POST /api/products", () => {
    it("should create a new product successfully", async () => {
      const productData = {
        name: "New Product",
        description: "New Description",
        price: 2000,
        currency: "MNT",
        imageUrl: "https://example.com/new-image.jpg",
        category: "New Category",
        stock: 20,
        materials: ["material1", "material2"],
        dimensions: { width: 10, height: 10 },
      };

      const response = await app.request("http://localhost/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      expect(response.status).toBe(201);
      const body = (await response.json()) as typeof productData & { id: string };
      expect(body).toHaveProperty("id");
      expect(body.name).toBe(productData.name);
      expect(body.price).toBe(productData.price);
      expect(body.materials).toEqual(productData.materials);
    });

    it("should return 400 for invalid product data", async () => {
      const invalidProductData = {
        name: "",
        price: -100,
      };

      const response = await app.request("http://localhost/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invalidProductData),
      });
      expect(response.status).toBe(400);
    });
  });

  describe("GET /api/products/:id", () => {
    it("should return a specific product", async () => {
      const testProduct = await prisma.product.create({
        data: {
          name: "Specific Product",
          description: "Specific Description",
          price: 1500,
          currency: "MNT",
          imageUrl: "https://example.com/specific.jpg",
          category: "Specific Category",
          stock: 15,
          materials: ["specific"],
          dimensions: {},
        },
      });

      const response = await app.request(
        `http://localhost/api/products/${testProduct.id}`
      );
      expect(response.status).toBe(200);
      const body = (await response.json()) as { id: string; name: string };
      expect(body.id).toBe(testProduct.id);
      expect(body.name).toBe(testProduct.name);
    });

    it("should return 404 for non-existent product", async () => {
      const response = await app.request(
        "http://localhost/api/products/non-existent-id"
      );
      expect(response.status).toBe(404);
    });
  });

  describe("PUT /api/products/:id", () => {
    it("should update a product successfully", async () => {
      const testProduct = await prisma.product.create({
        data: {
          name: "Original Name",
          description: "Original Description",
          price: 1000,
          currency: "MNT",
          imageUrl: "https://example.com/original.jpg",
          category: "Original Category",
          stock: 10,
          materials: ["original"],
          dimensions: {},
        },
      });

      const updateData = {
        name: "Updated Name",
        price: 2000,
        stock: 20,
      };

      const response = await app.request(
        `http://localhost/api/products/${testProduct.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        }
      );

      expect(response.status).toBe(200);
      const body = (await response.json()) as typeof updateData;
      expect(body.name).toBe(updateData.name);
      expect(body.price).toBe(updateData.price);
      expect(body.stock).toBe(updateData.stock);
    });
  });

  describe("DELETE /api/products/:id", () => {
    it("should delete a product successfully", async () => {
      const testProduct = await prisma.product.create({
        data: {
          name: "To Delete",
          description: "To Delete Description",
          price: 1000,
          currency: "MNT",
          imageUrl: "https://example.com/delete.jpg",
          category: "Delete Category",
          stock: 10,
          materials: ["delete"],
          dimensions: {},
        },
      });

      const del = await app.request(
        `http://localhost/api/products/${testProduct.id}`,
        { method: "DELETE" }
      );
      expect(del.status).toBe(200);

      const get = await app.request(
        `http://localhost/api/products/${testProduct.id}`
      );
      expect(get.status).toBe(404);
    });
  });
});
