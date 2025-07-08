import request from "supertest";
import { app } from "../src/index";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const baseTournament = {
  title: "Test Tournament",
  description: "A test tournament",
  imageUrl: "https://example.com/image.jpg",
  startDate: new Date().toISOString(),
  endDate: new Date(Date.now() + 86400000).toISOString(),
  location: "Test City",
  maxParticipants: 16,
  entryFee: 1000,
  currency: "MNT",
  category: "Chess",
  status: "upcoming",
  rules: "Standard rules",
  prizes: "Trophy",
};

describe("Tournament Controller", () => {
  let tournamentId: string;

  beforeEach(async () => {
    await prisma.tournamentParticipant.deleteMany();
    await prisma.tournament.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a new tournament", async () => {
    const res = await request(app)
      .post("/api/tournaments")
      .send(baseTournament)
      .expect(201);
    expect(res.body).toHaveProperty("id");
    tournamentId = res.body.id;
    expect(res.body.title).toBe(baseTournament.title);
  });

  it("should get all tournaments", async () => {
    await prisma.tournament.create({ data: { ...baseTournament } });
    const res = await request(app).get("/api/tournaments").expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get a tournament by id", async () => {
    const created = await prisma.tournament.create({
      data: { ...baseTournament },
    });
    const res = await request(app)
      .get(`/api/tournaments/${created.id}`)
      .expect(200);
    expect(res.body).toHaveProperty("id", created.id);
  });

  it("should update a tournament", async () => {
    const created = await prisma.tournament.create({
      data: { ...baseTournament },
    });
    const res = await request(app)
      .put(`/api/tournaments/${created.id}`)
      .send({ title: "Updated Title" })
      .expect(200);
    expect(res.body.title).toBe("Updated Title");
  });

  it("should delete a tournament", async () => {
    const created = await prisma.tournament.create({
      data: { ...baseTournament },
    });
    await request(app).delete(`/api/tournaments/${created.id}`).expect(200);
    const found = await prisma.tournament.findUnique({
      where: { id: created.id },
    });
    expect(found).toBeNull();
  });

  it("should register a participant", async () => {
    const created = await prisma.tournament.create({
      data: { ...baseTournament },
    });
    const user = await prisma.user.create({
      data: {
        name: "Participant",
        email: `participant${Date.now()}@test.com`,
        password: "password123",
        role: "user",
      },
    });
    const res = await request(app)
      .post(`/api/tournaments/${created.id}/participants`)
      .send({ userId: user.id })
      .expect(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.user.id).toBe(user.id);
  });
});
