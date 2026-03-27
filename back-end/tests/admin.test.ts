import { app } from "../src/index";
import { getPrisma } from "../src/utils/prisma";
import { signUserToken } from "../src/utils/jwt";

const prisma = getPrisma();

describe("Admin Controller", () => {
  let adminToken: string;

  beforeEach(async () => {
    await prisma.activity.deleteMany();
    await prisma.tournamentParticipant.deleteMany();
    await prisma.tournament.deleteMany();
    await prisma.news.deleteMany();
    await prisma.course.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    const adminUser = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@example.com",
        password: "password123",
        role: "admin",
      },
    });
    adminToken = await signUserToken(
      adminUser.id,
      process.env.JWT_SECRET as string
    );
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should get admin stats", async () => {
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
        levels: [],
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

    const res = await app.request("http://localhost/api/admin/stats", {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as Record<string, number>;
    expect(body).toHaveProperty("totalUsers", 2);
    expect(body).toHaveProperty("totalCourses", 1);
    expect(body).toHaveProperty("totalProducts", 1);
    expect(body).toHaveProperty("totalTournaments", 1);
    expect(body).toHaveProperty("totalNews", 1);
  });

  it("should get all users", async () => {
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

    const res = await app.request("http://localhost/api/admin/users", {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as Array<{ id: string; password?: string }>;
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(3);
    expect(body[0]).toHaveProperty("id");
    expect(body[0]).toHaveProperty("name");
    expect(body[0]).toHaveProperty("email");
    expect(body[0]).toHaveProperty("role");
    expect(body[0]).not.toHaveProperty("password");
  });

  it("should get recent activities", async () => {
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

    const res = await app.request("http://localhost/api/admin/activities", {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as Array<{ id: string; action: string }>;
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(1);
    expect(body[0]).toHaveProperty("id");
    expect(body[0]).toHaveProperty("action", "login");
    expect(body[0]).toHaveProperty("message", "User logged in");
  });
});
