import request from "supertest";
import { app, prisma } from "../src/index";

describe("Products Controller", () => {
  beforeAll(async () => {
    // Clean up database before tests
    await prisma.product.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET /api/products", () => {
    it("should return empty array when no products exist", async () => {
      const response = await request(app).get("/api/products").expect(200);

      expect(response.body).toEqual([]);
    });

    it("should return all products", async () => {
      // Create a test product
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

      const response = await request(app).get("/api/products").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0].name).toBe(testProduct.name);
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

      const response = await request(app)
        .post("/api/products")
        .send(productData)
        .expect(201);

      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe(productData.name);
      expect(response.body.price).toBe(productData.price);
      expect(response.body.materials).toEqual(productData.materials);
    });

    it("should return 400 for invalid product data", async () => {
      const invalidProductData = {
        name: "", // Invalid: empty name
        price: -100, // Invalid: negative price
      };

      await request(app)
        .post("/api/products")
        .send(invalidProductData)
        .expect(400);
    });
  });

  describe("GET /api/products/:id", () => {
    it("should return a specific product", async () => {
      // Create a test product
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

      const response = await request(app)
        .get(`/api/products/${testProduct.id}`)
        .expect(200);

      expect(response.body.id).toBe(testProduct.id);
      expect(response.body.name).toBe(testProduct.name);
    });

    it("should return 404 for non-existent product", async () => {
      const nonExistentId = "non-existent-id";

      await request(app).get(`/api/products/${nonExistentId}`).expect(404);
    });
  });

  describe("PUT /api/products/:id", () => {
    it("should update a product successfully", async () => {
      // Create a test product
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

      const response = await request(app)
        .put(`/api/products/${testProduct.id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.name).toBe(updateData.name);
      expect(response.body.price).toBe(updateData.price);
      expect(response.body.stock).toBe(updateData.stock);
    });
  });

  describe("DELETE /api/products/:id", () => {
    it("should delete a product successfully", async () => {
      // Create a test product
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

      await request(app).delete(`/api/products/${testProduct.id}`).expect(200);

      // Verify product is deleted
      await request(app).get(`/api/products/${testProduct.id}`).expect(404);
    });
  });
});
