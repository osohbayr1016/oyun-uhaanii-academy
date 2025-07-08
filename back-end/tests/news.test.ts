import request from "supertest";
import { app, prisma } from "../src/index";
import { generateToken } from "../src/utils/jwt";

let testUser: any;
let testToken: string;
let testNews: any;

beforeAll(async () => {
  // Clean up and create a test user
  await prisma.news.deleteMany();
  await prisma.user.deleteMany();
  testUser = await prisma.user.create({
    data: {
      name: "News Tester",
      email: "news@test.com",
      password: "hashedpassword",
      role: "admin",
    },
  });
  // Generate a real JWT for the test user
  testToken = generateToken(testUser.id);
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("News Controller", () => {
  it("should return empty array when no news exists", async () => {
    const response = await request(app)
      .get("/api/news")
      .set("Authorization", `Bearer ${testToken}`)
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should create a news article", async () => {
    const newsData = {
      title: "Test News",
      content: "Test Content",
      imageUrl: "https://example.com/news.jpg",
    };
    const response = await request(app)
      .post("/api/news")
      .set("Authorization", `Bearer ${testToken}`)
      .send(newsData)
      .expect(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe(newsData.title);
    testNews = response.body;
  });

  it("should get all news articles", async () => {
    const response = await request(app)
      .get("/api/news")
      .set("Authorization", `Bearer ${testToken}`)
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get a news article by id", async () => {
    const response = await request(app)
      .get(`/api/news/${testNews.id}`)
      .set("Authorization", `Bearer ${testToken}`)
      .expect(200);
    expect(response.body.id).toBe(testNews.id);
  });

  it("should update a news article", async () => {
    const updateData = { title: "Updated News" };
    const response = await request(app)
      .put(`/api/news/${testNews.id}`)
      .set("Authorization", `Bearer ${testToken}`)
      .send(updateData)
      .expect(200);
    expect(response.body.title).toBe(updateData.title);
  });

  it("should delete a news article", async () => {
    await request(app)
      .delete(`/api/news/${testNews.id}`)
      .set("Authorization", `Bearer ${testToken}`)
      .expect(200);
    // Verify deletion
    await request(app)
      .get(`/api/news/${testNews.id}`)
      .set("Authorization", `Bearer ${testToken}`)
      .expect(404);
  });
});
