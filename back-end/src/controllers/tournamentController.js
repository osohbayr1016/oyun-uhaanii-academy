"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateParticipantStatus = exports.registerParticipant = exports.deleteTournament = exports.updateTournament = exports.createTournament = exports.getTournamentById = exports.getAllTournaments = void 0;
const prisma_1 = require("../../utils/prisma");
const getAllTournaments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tournaments = yield prisma_1.prisma.tournament.findMany({
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
    }
    catch (error) {
        console.error("Get all tournaments error:", error);
        res.status(500).json({ message: "Failed to fetch tournaments" });
    }
});
exports.getAllTournaments = getAllTournaments;
const getTournamentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tournament = yield prisma_1.prisma.tournament.findUnique({
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
    }
    catch (error) {
        console.error("Get tournament by ID error:", error);
        res.status(500).json({ message: "Failed to fetch tournament" });
    }
});
exports.getTournamentById = getTournamentById;
const createTournament = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Backend: Received tournament data:", req.body);
        const { title, description, imageUrl, startDate, endDate, location, maxParticipants, entryFee, currency, category, status, rules, prizes, } = req.body;
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
        const tournament = yield prisma_1.prisma.tournament.create({
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
    }
    catch (error) {
        console.error("Backend: Create tournament error:", error);
        res.status(500).json({
            message: "Failed to create tournament",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.createTournament = createTournament;
const updateTournament = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const tournament = yield prisma_1.prisma.tournament.update({
            where: { id },
            data: updateData,
        });
        res.json(tournament);
    }
    catch (error) {
        console.error("Update tournament error:", error);
        res.status(500).json({ message: "Failed to update tournament" });
    }
});
exports.updateTournament = updateTournament;
const deleteTournament = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma_1.prisma.tournament.delete({
            where: { id },
        });
        res.json({ message: "Tournament deleted successfully" });
    }
    catch (error) {
        console.error("Delete tournament error:", error);
        res.status(500).json({ message: "Failed to delete tournament" });
    }
});
exports.deleteTournament = deleteTournament;
const registerParticipant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tournamentId } = req.params;
        const { userId } = req.body;
        const participant = yield prisma_1.prisma.tournamentParticipant.create({
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
    }
    catch (error) {
        console.error("Register participant error:", error);
        res.status(500).json({ message: "Failed to register participant" });
    }
});
exports.registerParticipant = registerParticipant;
const updateParticipantStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tournamentId, userId } = req.params;
        const { status } = req.body;
        const participant = yield prisma_1.prisma.tournamentParticipant.update({
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
    }
    catch (error) {
        console.error("Update participant status error:", error);
        res.status(500).json({ message: "Failed to update participant status" });
    }
});
exports.updateParticipantStatus = updateParticipantStatus;
