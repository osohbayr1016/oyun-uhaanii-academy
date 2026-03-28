import type { Prisma } from "@prisma/client";
import { app } from "../src/index";
import { signUserToken } from "../src/utils/jwt";
import { getPrisma } from "../src/utils/prisma";
import { createAdminUserWithToken } from "./helpers";

const prisma = getPrisma();

let adminToken: string;

const startDate = new Date();
const endDate = new Date(Date.now() + 86400000);

const baseTournament: Prisma.TournamentCreateInput = {
  title: "Test Tournament",
  description: "A test tournament",
  imageUrl: "https://example.com/image.jpg",
  startDate,
  endDate,
  location: "Test City",
  maxParticipants: 16,
  entryFee: 1000,
  currency: "MNT",
  category: "Chess",
  status: "upcoming",
  rules: "Standard rules",
  prizes: "Trophy" as Prisma.InputJsonValue,
};

describe("Tournament Controller", () => {
  beforeAll(async () => {
    const { token } = await createAdminUserWithToken(
      prisma,
      process.env.JWT_SECRET as string
    );
    adminToken = token;
  });

  beforeEach(async () => {
    await prisma.tournamentParticipant.deleteMany();
    await prisma.tournament.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a new tournament", async () => {
    const res = await app.request("http://localhost/api/tournaments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        ...baseTournament,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        prizes: "Trophy",
      }),
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as { id: string; title: string };
    expect(body).toHaveProperty("id");
    expect(body.title).toBe(baseTournament.title);
  });

  it("should get all tournaments", async () => {
    await prisma.tournament.create({
      data: {
        title: baseTournament.title!,
        description: baseTournament.description!,
        imageUrl: baseTournament.imageUrl!,
        startDate: baseTournament.startDate as Date,
        endDate: baseTournament.endDate as Date,
        location: baseTournament.location as string,
        maxParticipants: baseTournament.maxParticipants as number,
        entryFee: baseTournament.entryFee as number,
        currency: baseTournament.currency!,
        category: baseTournament.category!,
        status: baseTournament.status!,
        rules: baseTournament.rules as string,
        prizes: baseTournament.prizes as Prisma.InputJsonValue,
      },
    });
    const res = await app.request("http://localhost/api/tournaments");
    expect(res.status).toBe(200);
    const body = (await res.json()) as unknown[];
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  it("should get a tournament by id", async () => {
    const created = await prisma.tournament.create({
      data: {
        title: baseTournament.title!,
        description: baseTournament.description!,
        imageUrl: baseTournament.imageUrl!,
        startDate: baseTournament.startDate as Date,
        endDate: baseTournament.endDate as Date,
        location: baseTournament.location as string,
        maxParticipants: baseTournament.maxParticipants as number,
        entryFee: baseTournament.entryFee as number,
        currency: baseTournament.currency!,
        category: baseTournament.category!,
        status: baseTournament.status!,
        rules: baseTournament.rules as string,
        prizes: baseTournament.prizes as Prisma.InputJsonValue,
      },
    });
    const res = await app.request(
      `http://localhost/api/tournaments/${created.id}`
    );
    expect(res.status).toBe(200);
    const body = (await res.json()) as { id: string };
    expect(body).toHaveProperty("id", created.id);
  });

  it("should update a tournament", async () => {
    const created = await prisma.tournament.create({
      data: {
        title: baseTournament.title!,
        description: baseTournament.description!,
        imageUrl: baseTournament.imageUrl!,
        startDate: baseTournament.startDate as Date,
        endDate: baseTournament.endDate as Date,
        location: baseTournament.location as string,
        maxParticipants: baseTournament.maxParticipants as number,
        entryFee: baseTournament.entryFee as number,
        currency: baseTournament.currency!,
        category: baseTournament.category!,
        status: baseTournament.status!,
        rules: baseTournament.rules as string,
        prizes: baseTournament.prizes as Prisma.InputJsonValue,
      },
    });
    const res = await app.request(
      `http://localhost/api/tournaments/${created.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ title: "Updated Title" }),
      }
    );
    expect(res.status).toBe(200);
    const body = (await res.json()) as { title: string };
    expect(body.title).toBe("Updated Title");
  });

  it("should delete a tournament", async () => {
    const created = await prisma.tournament.create({
      data: {
        title: baseTournament.title!,
        description: baseTournament.description!,
        imageUrl: baseTournament.imageUrl!,
        startDate: baseTournament.startDate as Date,
        endDate: baseTournament.endDate as Date,
        location: baseTournament.location as string,
        maxParticipants: baseTournament.maxParticipants as number,
        entryFee: baseTournament.entryFee as number,
        currency: baseTournament.currency!,
        category: baseTournament.category!,
        status: baseTournament.status!,
        rules: baseTournament.rules as string,
        prizes: baseTournament.prizes as Prisma.InputJsonValue,
      },
    });
    const del = await app.request(
      `http://localhost/api/tournaments/${created.id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      }
    );
    expect(del.status).toBe(200);
    const found = await prisma.tournament.findUnique({
      where: { id: created.id },
    });
    expect(found).toBeNull();
  });

  it("should register a participant", async () => {
    const created = await prisma.tournament.create({
      data: {
        title: baseTournament.title!,
        description: baseTournament.description!,
        imageUrl: baseTournament.imageUrl!,
        startDate: baseTournament.startDate as Date,
        endDate: baseTournament.endDate as Date,
        location: baseTournament.location as string,
        maxParticipants: baseTournament.maxParticipants as number,
        entryFee: baseTournament.entryFee as number,
        currency: baseTournament.currency!,
        category: baseTournament.category!,
        status: baseTournament.status!,
        rules: baseTournament.rules as string,
        prizes: baseTournament.prizes as Prisma.InputJsonValue,
      },
    });
    const user = await prisma.user.create({
      data: {
        name: "Participant",
        email: `participant${Date.now()}@test.com`,
        password: "password123",
        role: "user",
      },
    });
    const userToken = await signUserToken(
      user.id,
      process.env.JWT_SECRET as string
    );
    const res = await app.request(
      `http://localhost/api/tournaments/${created.id}/participants`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ userId: user.id }),
      }
    );
    expect(res.status).toBe(201);
    const body = (await res.json()) as { id: string; user: { id: string } };
    expect(body).toHaveProperty("id");
    expect(body.user.id).toBe(user.id);
  });
});
