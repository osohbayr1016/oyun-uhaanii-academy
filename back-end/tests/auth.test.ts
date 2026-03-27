import { app } from "../src/index";
import { getPrisma } from "../src/utils/prisma";

const prisma = getPrisma();

describe("Auth Controller", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("POST /api/auth/register", () => {
    beforeEach(async () => {
      await prisma.user.deleteMany();
    });

    it("should register a new user successfully", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      };

      const res = await app.request("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      expect(res.status).toBe(201);
      const body = (await res.json()) as {
        token?: string;
        user?: { id: string; email: string; name: string; password?: string };
      };
      expect(body).toHaveProperty("token");
      expect(body.user).toHaveProperty("id");
      expect(body.user?.email).toBe(userData.email);
      expect(body.user?.name).toBe(userData.name);
      expect(body.user).not.toHaveProperty("password");
    });

    it("should return 400 for invalid email", async () => {
      const userData = {
        name: "Test User",
        email: "invalid-email",
        password: "password123",
      };

      const res = await app.request("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      expect(res.status).toBe(400);
    });

    it("should return 400 for duplicate email", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      };

      const first = await app.request("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      expect(first.status).toBe(201);

      const second = await app.request("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      expect(second.status).toBe(400);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login successfully with valid credentials", async () => {
      const loginData = {
        email: "test@example.com",
        password: "password123",
      };

      const res = await app.request("http://localhost/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      expect(res.status).toBe(200);
      const body = (await res.json()) as {
        token?: string;
        user?: { id: string; email: string };
      };
      expect(body).toHaveProperty("token");
      expect(body.user).toHaveProperty("id");
      expect(body.user?.email).toBe(loginData.email);
    });

    it("should return 401 for invalid credentials", async () => {
      const loginData = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      const res = await app.request("http://localhost/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      expect(res.status).toBe(401);
    });

    it("should return 404 for non-existent user", async () => {
      const loginData = {
        email: "nonexistent@example.com",
        password: "password123",
      };

      const res = await app.request("http://localhost/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      expect(res.status).toBe(404);
    });
  });
});
