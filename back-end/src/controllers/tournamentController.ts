import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllTournaments = async (req: Request, res: Response) => {
  try {
    const tournaments = await prisma.tournament.findMany({
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
    res.json(tournaments);
  } catch (error) {
    console.error("Get all tournaments error:", error);
    if (process.env.NODE_ENV === "development") {
      res
        .status(500)
        .json({
          message: "Failed to fetch tournaments",
          error: error instanceof Error ? error.stack : error,
        });
    } else {
      res.status(500).json({ message: "Failed to fetch tournaments" });
    }
  }
};

export const getTournamentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tournament = await prisma.tournament.findUnique({
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
      return res.status(404).json({ message: "Tournament not found" });
    }

    res.json(tournament);
  } catch (error) {
    console.error("Get tournament by ID error:", error);
    res.status(500).json({ message: "Failed to fetch tournament" });
  }
};

export const createTournament = async (req: Request, res: Response) => {
  try {
    console.log("Backend: Received tournament data:", req.body);

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
    } = req.body;

    // Validate required fields
    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Tournament title is required",
      });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({
        message: "Tournament description is required",
      });
    }

    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "Start date and end date are required",
      });
    }

    if (!category || !category.trim()) {
      return res.status(400).json({
        message: "Tournament category is required",
      });
    }

    const tournamentData = {
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl || "",
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      location: location || null,
      maxParticipants: maxParticipants ? parseInt(maxParticipants) : null,
      entryFee: entryFee ? parseFloat(entryFee) : null,
      currency: currency || "MNT",
      category: category.trim(),
      status: status || "upcoming",
      rules: rules || null,
      prizes: prizes || null,
    };

    console.log("Backend: Creating tournament with data:", tournamentData);

    const tournament = await prisma.tournament.create({
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

    console.log("Backend: Tournament created successfully:", tournament);
    res.status(201).json(tournament);
  } catch (error) {
    console.error("Backend: Create tournament error:", error);
    res.status(500).json({
      message: "Failed to create tournament",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateTournament = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Convert date strings to Date objects if they exist
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate);
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate);
    }

    const tournament = await prisma.tournament.update({
      where: { id },
      data: updateData,
    });

    res.json(tournament);
  } catch (error) {
    console.error("Update tournament error:", error);
    res.status(500).json({ message: "Failed to update tournament" });
  }
};

export const deleteTournament = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.tournament.delete({
      where: { id },
    });

    res.json({ message: "Tournament deleted successfully" });
  } catch (error) {
    console.error("Delete tournament error:", error);
    res.status(500).json({ message: "Failed to delete tournament" });
  }
};

export const registerParticipant = async (req: Request, res: Response) => {
  try {
    const { tournamentId } = req.params;
    const { userId } = req.body;

    const participant = await prisma.tournamentParticipant.create({
      data: {
        tournamentId,
        userId,
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

    res.status(201).json(participant);
  } catch (error) {
    console.error("Register participant error:", error);
    res.status(500).json({ message: "Failed to register participant" });
  }
};

export const updateParticipantStatus = async (req: Request, res: Response) => {
  try {
    const { tournamentId, userId } = req.params;
    const { status } = req.body;

    const participant = await prisma.tournamentParticipant.update({
      where: {
        tournamentId_userId: {
          tournamentId,
          userId,
        },
      },
      data: { status },
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

    res.json(participant);
  } catch (error) {
    console.error("Update participant status error:", error);
    res.status(500).json({ message: "Failed to update participant status" });
  }
};
