import { Hono } from "hono";
import {
  getAllTournaments,
  getTournamentById,
  createTournament,
  updateTournament,
  deleteTournament,
  registerParticipant,
  updateParticipantStatus,
} from "../controllers/tournamentController";
import authenticateToken, {
  requireAdmin,
} from "../middleware/authMiddleware";
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();
r.get("/", getAllTournaments);
r.get("/:id", getTournamentById);
r.post("/", authenticateToken, requireAdmin, createTournament);
r.put("/:id", authenticateToken, requireAdmin, updateTournament);
r.delete("/:id", authenticateToken, requireAdmin, deleteTournament);
r.post("/:tournamentId/participants", authenticateToken, registerParticipant);
r.put(
  "/:tournamentId/participants/:userId",
  authenticateToken,
  requireAdmin,
  updateParticipantStatus
);

export default r;
