import request from "supertest";
import { app, prisma } from "../src/index";

describe("Courses Controller", () => {
  beforeAll(async () => {
    // Clean up database before tests
    await prisma.course.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET /api/courses", () => {
    it("should return empty array when no courses exist", async () => {
      const response = await request(app).get("/api/courses").expect(200);

      expect(response.body).toEqual([]);
    });

    it("should return all courses", async () => {
      // Create a test course
      const testCourse = await prisma.course.create({
        data: {
          title: "Test Course",
          description: "Test Description",
          instructor: "Test Instructor",
          duration: 10,
          level: "Beginner",
          price: 50000,
          currency: "MNT",
          imageUrl: "https://example.com/course.jpg",
          category: "Programming",
          isActive: true,
          content: "Test Content",
        },
      });

      const response = await request(app).get("/api/courses").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0].title).toBe(testCourse.title);
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

      const response = await request(app)
        .post("/api/courses")
        .send(courseData)
        .expect(201);

      expect(response.body).toHaveProperty("id");
      expect(response.body.title).toBe(courseData.title);
      expect(response.body.instructor).toBe(courseData.instructor);
      expect(response.body.price).toBe(courseData.price);
    });

    it("should return 400 for invalid course data", async () => {
      const invalidCourseData = {
        title: "", // Invalid: empty title
        price: -1000, // Invalid: negative price
      };

      await request(app)
        .post("/api/courses")
        .send(invalidCourseData)
        .expect(400);
    });
  });

  describe("GET /api/courses/:id", () => {
    it("should return a specific course", async () => {
      // Create a test course
      const testCourse = await prisma.course.create({
        data: {
          title: "Specific Course",
          description: "Specific Description",
          instructor: "Specific Instructor",
          duration: 15,
          level: "Advanced",
          price: 100000,
          currency: "MNT",
          imageUrl: "https://example.com/specific-course.jpg",
          category: "Advanced Gaming",
          isActive: true,
          content: "Specific Content",
        },
      });

      const response = await request(app)
        .get(`/api/courses/${testCourse.id}`)
        .expect(200);

      expect(response.body.id).toBe(testCourse.id);
      expect(response.body.title).toBe(testCourse.title);
    });

    it("should return 404 for non-existent course", async () => {
      const nonExistentId = "non-existent-id";

      await request(app).get(`/api/courses/${nonExistentId}`).expect(404);
    });
  });
});
