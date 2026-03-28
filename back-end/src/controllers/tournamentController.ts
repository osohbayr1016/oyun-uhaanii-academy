import type { Prisma } from "@prisma/client";
import { getPrisma } from "../utils/prisma";
import { isAdminRole } from "../middleware/authMiddleware";
import type { AppCtx, PublicCtx } from "../types/context";

export const getAllTournaments = async (c: PublicCtx) => {
  try {
    const tournaments = await getPrisma().tournament.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        matches: true,
      },
    });
    return c.json(tournaments);
  } catch (error) {
    console.error("Get all tournaments error:", error);
    if (process.env.NODE_ENV === "development") {
      return c.json(
        {
          message: "Failed to fetch tournaments",
          error: error instanceof Error ? error.stack : error,
        },
        500
      );
    }
    return c.json({ message: "Failed to fetch tournaments" }, 500);
  }
};

export const getTournamentById = async (c: PublicCtx) => {
  try {
    const id = c.req.param("id");
    const tournament = await getPrisma().tournament.findUnique({
      where: { id },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        matches: {
          include: {
            player1: {
              select: {
                id: true,
                name: true,
              },
            },
            player2: {
              select: {
                id: true,
                name: true,
              },
            },
            winner: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!tournament) {
      return c.json({ message: "Tournament not found" }, 404);
    }

    return c.json(tournament);
  } catch (error) {
    console.error("Get tournament by ID error:", error);
    return c.json({ message: "Failed to fetch tournament" }, 500);
  }
};

export const createTournament = async (c: PublicCtx) => {
  try {
    const body = await c.req.json<Record<string, unknown>>();
    const {
      title,
      description,
      imageUrl,
      startDate,
      endDate,
      location,
      maxParticipants,
      entryFee,
      currency,
      category,
      status,
      rules,
      prizes,
      enrollLink,
    } = body;

    if (!title || !String(title).trim()) {
      return c.json({ message: "Tournament title is required" }, 400);
    }

    if (!description || !String(description).trim()) {
      return c.json({ message: "Tournament description is required" }, 400);
    }

    if (!startDate || !endDate) {
      return c.json({ message: "Start date and end date are required" }, 400);
    }

    if (!category || !String(category).trim()) {
      return c.json({ message: "Tournament category is required" }, 400);
    }

    const tournamentData = {
      title: String(title).trim(),
      description: String(description).trim(),
      imageUrl: (imageUrl as string) || "",
      startDate: new Date(String(startDate)),
      endDate: new Date(String(endDate)),
      location: (location as string) || null,
      maxParticipants: maxParticipants ? parseInt(String(maxParticipants), 10) : null,
      entryFee: entryFee ? parseFloat(String(entryFee)) : null,
      currency: (currency as string) || "MNT",
      category: String(category).trim(),
      status: (status as string) || "upcoming",
      rules: rules != null ? String(rules) : null,
      prizes:
        prizes !== undefined && prizes !== null
          ? (prizes as Prisma.InputJsonValue)
          : undefined,
      enrollLink: (enrollLink as string) || null,
    };

    const tournament = await getPrisma().tournament.create({
      data: tournamentData,
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        matches: true,
      },
    });

    return c.json(tournament, 201);
  } catch (error) {
    console.error("Backend: Create tournament error:", error);
    return c.json(
      {
        message: "Failed to create tournament",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
};

export const updateTournament = async (c: PublicCtx) => {
  try {
    const id = c.req.param("id");
    const updateData = { ...(await c.req.json<Record<string, unknown>>()) };

    delete updateData.prize1;
    delete updateData.prize2;
    delete updateData.prize3;

    if (updateData.startDate) {
      updateData.startDate = new Date(String(updateData.startDate));
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(String(updateData.endDate));
    }

    const tournament = await getPrisma().tournament.update({
      where: { id },
      data: updateData,
    });

    return c.json(tournament);
  } catch (error) {
    console.error("Update tournament error:", error);
    return c.json({ message: "Failed to update tournament" }, 500);
  }
};

export const deleteTournament = async (c: PublicCtx) => {
  try {
    const id = c.req.param("id");
    await getPrisma().tournament.delete({
      where: { id },
    });

    return c.json({ message: "Tournament deleted successfully" });
  } catch (error) {
    console.error("Delete tournament error:", error);
    return c.json({ message: "Failed to delete tournament" }, 500);
  }
};

export const registerParticipant = async (c: AppCtx) => {
  try {
    const jwtUser = c.get("user");
    if (!jwtUser) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const tournamentId = c.req.param("tournamentId")!;
    const body = await c.req.json<{ userId?: string }>();
    const { userId } = body;
    if (!userId) {
      return c.json({ message: "userId is required" }, 400);
    }

    if (userId !== jwtUser.userId) {
      const requester = await getPrisma().user.findUnique({
        where: { id: jwtUser.userId },
        select: { role: true },
      });
      if (!requester || !isAdminRole(requester.role)) {
        return c.json({ message: "Forbidden" }, 403);
      }
    }

    const participant = await getPrisma().tournamentParticipant.create({
      data: {
        tournamentId,
        userId: userId!,
        status: "registered",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return c.json(participant, 201);
  } catch (error) {
    console.error("Register participant error:", error);
    return c.json({ message: "Failed to register participant" }, 500);
  }
};

export const updateParticipantStatus = async (c: AppCtx) => {
  try {
    const tournamentId = c.req.param("tournamentId")!;
    const userId = c.req.param("userId")!;
    const body = await c.req.json<{ status?: string }>();
    const { status } = body;

    const participant = await getPrisma().tournamentParticipant.update({
      where: {
        tournamentId_userId: {
          tournamentId,
          userId,
        },
      },
      data: { status: status! },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return c.json(participant);
  } catch (error) {
    console.error("Update participant status error:", error);
    return c.json({ message: "Failed to update participant status" }, 500);
  }
};
