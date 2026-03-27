import { app } from "../src/index";
import { getPrisma } from "../src/utils/prisma";
import { signUserToken } from "../src/utils/jwt";

const prisma = getPrisma();

let testUser: { id: string };
let testToken: string;
let testNews: { id: string };

beforeAll(async () => {
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
  testToken = await signUserToken(testUser.id, process.env.JWT_SECRET as string);
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("News Controller", () => {
  it("should return empty array when no news exists", async () => {
    const response = await app.request("http://localhost/api/news", {
      headers: { Authorization: `Bearer ${testToken}` },
    });
    expect(response.status).toBe(200);
    const body = (await response.json()) as unknown[];
    expect(Array.isArray(body)).toBe(true);
  });

  it("should create a news article", async () => {
    const newsData = {
      title: "Test News",
      content: "Test Content",
      imageUrl: "https://example.com/news.jpg",
    };
    const response = await app.request("http://localhost/api/news", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${testToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newsData),
    });
    expect(response.status).toBe(201);
    const body = (await response.json()) as typeof newsData & { id: string };
    expect(body).toHaveProperty("id");
    expect(body.title).toBe(newsData.title);
    testNews = body;
  });

  it("should get all news articles", async () => {
    const response = await app.request("http://localhost/api/news", {
      headers: { Authorization: `Bearer ${testToken}` },
    });
    expect(response.status).toBe(200);
    const body = (await response.json()) as unknown[];
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  it("should get a news article by id", async () => {
    const response = await app.request(
      `http://localhost/api/news/${testNews.id}`,
      {
        headers: { Authorization: `Bearer ${testToken}` },
      }
    );
    expect(response.status).toBe(200);
    const body = (await response.json()) as { id: string };
    expect(body.id).toBe(testNews.id);
  });

  it("should update a news article", async () => {
    const updateData = { title: "Updated News" };
    const response = await app.request(
      `http://localhost/api/news/${testNews.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${testToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    );
    expect(response.status).toBe(200);
    const body = (await response.json()) as { title: string };
    expect(body.title).toBe(updateData.title);
  });

  it("should delete a news article", async () => {
    const del = await app.request(
      `http://localhost/api/news/${testNews.id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${testToken}` },
      }
    );
    expect(del.status).toBe(200);

    const get = await app.request(
      `http://localhost/api/news/${testNews.id}`,
      {
        headers: { Authorization: `Bearer ${testToken}` },
      }
    );
    expect(get.status).toBe(404);
  });
});
