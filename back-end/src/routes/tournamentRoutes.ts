import { Router } from "express";
import {
  getAllTournaments,
  getTournamentById,
  createTournament,
  updateTournament,
  deleteTournament,
  registerParticipant,
  updateParticipantStatus,
} from "../controllers/tournamentController";

const router = Router();

// Tournament CRUD routes
router.get("/", getAllTournaments);
router.get("/:id", getTournamentById);
router.post("/", createTournament); // Temporarily removed authMiddleware for testing
router.put("/:id", updateTournament); // Temporarily removed authMiddleware for testing
router.delete("/:id", deleteTournament); // Temporarily removed authMiddleware for testing

// Participant routes
router.post("/:tournamentId/participants", registerParticipant);
router.put("/:tournamentId/participants/:userId", updateParticipantStatus);

export default router;
