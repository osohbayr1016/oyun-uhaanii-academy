"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tournamentController_1 = require("../controllers/tournamentController");
const router = (0, express_1.Router)();
// Tournament CRUD routes
router.get("/", tournamentController_1.getAllTournaments);
router.get("/:id", tournamentController_1.getTournamentById);
router.post("/", tournamentController_1.createTournament); // Temporarily removed authMiddleware for testing
router.put("/:id", tournamentController_1.updateTournament); // Temporarily removed authMiddleware for testing
router.delete("/:id", tournamentController_1.deleteTournament); // Temporarily removed authMiddleware for testing
// Participant routes
router.post("/:tournamentId/participants", tournamentController_1.registerParticipant);
router.put("/:tournamentId/participants/:userId", tournamentController_1.updateParticipantStatus);
exports.default = router;
