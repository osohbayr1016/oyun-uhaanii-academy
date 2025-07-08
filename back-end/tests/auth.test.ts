import request from "supertest";
import { app } from "../src/index";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Auth Controller", () => {
  beforeAll(async () => {
    // Clean up database before all tests
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("POST /api/auth/register", () => {
    beforeEach(async () => {
      // Clean up users before each test in this suite
      await prisma.user.deleteMany();
    });

    it("should register a new user successfully", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      };

      const response = await request(app)
        .post("/api/auth/register")
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty("token");
      expect(response.body.user).toHaveProperty("id");
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.name).toBe(userData.name);
      expect(response.body.user).not.toHaveProperty("password");
    });

    it("should return 400 for invalid email", async () => {
      const userData = {
        name: "Test User",
        email: "invalid-email",
        password: "password123",
      };

      await request(app).post("/api/auth/register").send(userData).expect(400);
    });

    it("should return 400 for duplicate email", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      };

      // First registration
      await request(app).post("/api/auth/register").send(userData).expect(201);

      // Second registration with same email
      await request(app).post("/api/auth/register").send(userData).expect(400);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login successfully with valid credentials", async () => {
      const loginData = {
        email: "test@example.com",
        password: "password123",
      };

      const response = await request(app)
        .post("/api/auth/login")
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty("token");
      expect(response.body.user).toHaveProperty("id");
      expect(response.body.user.email).toBe(loginData.email);
    });

    it("should return 401 for invalid credentials", async () => {
      const loginData = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      await request(app).post("/api/auth/login").send(loginData).expect(401);
    });

    it("should return 404 for non-existent user", async () => {
      const loginData = {
        email: "nonexistent@example.com",
        password: "password123",
      };

      await request(app).post("/api/auth/login").send(loginData).expect(404);
    });
  });
});
