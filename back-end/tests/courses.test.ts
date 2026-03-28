import { app } from "../src/index";
import { getPrisma } from "../src/utils/prisma";
import { createAdminUserWithToken } from "./helpers";

const prisma = getPrisma();

let adminToken: string;

describe("Courses Controller", () => {
  beforeAll(async () => {
    await prisma.course.deleteMany();
    const { token } = await createAdminUserWithToken(
      prisma,
      process.env.JWT_SECRET as string
    );
    adminToken = token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET /api/courses", () => {
    it("should return empty array when no courses exist", async () => {
      const response = await app.request("http://localhost/api/courses");
      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body).toEqual([]);
    });

    it("should return all courses", async () => {
      const testCourse = await prisma.course.create({
        data: {
          title: "Test Course",
          description: "Test Description",
          instructor: "Test Instructor",
          duration: 10,
          level: "Beginner",
          levels: [],
          price: 50000,
          currency: "MNT",
          imageUrl: "https://example.com/course.jpg",
          category: "Programming",
          isActive: true,
          content: "Test Content",
        },
      });

      const response = await app.request("http://localhost/api/courses");
      expect(response.status).toBe(200);
      const body = (await response.json()) as Array<{ id: string; title: string }>;
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);
      expect(body[0]).toHaveProperty("id");
      expect(body[0].title).toBe(testCourse.title);
    });
  });

  describe("POST /api/courses", () => {
    it("should create a new course successfully", async () => {
      const courseData = {
        title: "New Course",
        description: "New Description",
        instructor: "New Instructor",
        duration: 20,
        level: "Intermediate",
        price: 75000,
        currency: "MNT",
        imageUrl: "https://example.com/new-course.jpg",
        category: "Gaming",
        isActive: true,
        content: "New Content",
      };

      const response = await app.request("http://localhost/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(courseData),
      });

      expect(response.status).toBe(201);
      const body = (await response.json()) as typeof courseData & { id: string };
      expect(body).toHaveProperty("id");
      expect(body.title).toBe(courseData.title);
      expect(body.instructor).toBe(courseData.instructor);
      expect(body.price).toBe(courseData.price);
    });

    it("should return 400 for invalid course data", async () => {
      const invalidCourseData = {
        title: "",
        price: -1000,
      };

      const response = await app.request("http://localhost/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(invalidCourseData),
      });
      expect(response.status).toBe(400);
    });
  });

  describe("GET /api/courses/:id", () => {
    it("should return a specific course", async () => {
      const testCourse = await prisma.course.create({
        data: {
          title: "Specific Course",
          description: "Specific Description",
          instructor: "Specific Instructor",
          duration: 15,
          level: "Advanced",
          levels: [],
          price: 100000,
          currency: "MNT",
          imageUrl: "https://example.com/specific-course.jpg",
          category: "Advanced Gaming",
          isActive: true,
          content: "Specific Content",
        },
      });

      const response = await app.request(
        `http://localhost/api/courses/${testCourse.id}`
      );
      expect(response.status).toBe(200);
      const body = (await response.json()) as { id: string; title: string };
      expect(body.id).toBe(testCourse.id);
      expect(body.title).toBe(testCourse.title);
    });

    it("should return 404 for non-existent course", async () => {
      const response = await app.request(
        "http://localhost/api/courses/non-existent-id"
      );
      expect(response.status).toBe(404);
    });
  });
});
