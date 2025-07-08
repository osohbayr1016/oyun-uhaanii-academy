import request from "supertest";
import { app } from "../src/index";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../src/utils/jwt";

const prisma = new PrismaClient();

describe("Admin Controller", () => {
  let adminToken: string;

  beforeEach(async () => {
    // Clean up database before each test
    await prisma.activity.deleteMany();
    await prisma.tournamentParticipant.deleteMany();
    await prisma.tournament.deleteMany();
    await prisma.news.deleteMany();
    await prisma.course.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    // Create admin user and generate token
    const adminUser = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@example.com",
        password: "password123",
        role: "admin",
      },
    });
    adminToken = generateToken(adminUser.id);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should get admin stats", async () => {
    // Create test data
    await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "user",
      },
    });

    await prisma.course.create({
      data: {
        title: "Test Course",
        description: "Test Description",
        content: "Test Content",
        imageUrl: "https://example.com/image.jpg",
        price: 1000,
        currency: "MNT",
        duration: 10,
        level: "beginner",
        category: "Test",
        instructor: "Test Instructor",
      },
    });

    await prisma.product.create({
      data: {
        name: "Test Product",
        description: "Test Description",
        price: 1000,
        currency: "MNT",
        imageUrl: "https://example.com/image.jpg",
        category: "Test",
      },
    });

    await prisma.tournament.create({
      data: {
        title: "Test Tournament",
        description: "Test Description",
        imageUrl: "https://example.com/image.jpg",
        startDate: new Date(),
        endDate: new Date(Date.now() + 86400000),
        category: "Test",
      },
    });

    await prisma.news.create({
      data: {
        title: "Test News",
        content: "Test Content",
        imageUrl: "https://example.com/image.jpg",
        authorId: (await prisma.user.findFirst())!.id,
      },
    });

    const res = await request(app)
      .get("/api/admin/stats")
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200);
    expect(res.body).toHaveProperty("totalUsers", 2); // admin + test user
    expect(res.body).toHaveProperty("totalCourses", 1);
    expect(res.body).toHaveProperty("totalProducts", 1);
    expect(res.body).toHaveProperty("totalTournaments", 1);
    expect(res.body).toHaveProperty("totalNews", 1);
  });

  it("should get all users", async () => {
    // Create test users
    await prisma.user.createMany({
      data: [
        {
          name: "User 1",
          email: "user1@example.com",
          password: "password123",
          role: "user",
        },
        {
          name: "User 2",
          email: "user2@example.com",
          password: "password123",
          role: "admin",
        },
      ],
    });

    const res = await request(app)
      .get("/api/admin/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(3); // admin + 2 test users
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("email");
    expect(res.body[0]).toHaveProperty("role");
    expect(res.body[0]).not.toHaveProperty("password");
  });

  it("should get recent activities", async () => {
    // Create test activity
    const user = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "user",
      },
    });

    await prisma.activity.create({
      data: {
        userId: user.id,
        action: "login",
        type: "user",
        message: "User logged in",
      },
    });

    const res = await request(app)
      .get("/api/admin/activities")
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("action", "login");
    expect(res.body[0]).toHaveProperty("message", "User logged in");
  });
});
