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
import type { AppEnv } from "../hono/appEnv";

const r = new Hono<AppEnv>();
r.get("/", getAllTournaments);
r.get("/:id", getTournamentById);
r.post("/", createTournament);
r.put("/:id", updateTournament);
r.delete("/:id", deleteTournament);
r.post("/:tournamentId/participants", registerParticipant);
r.put("/:tournamentId/participants/:userId", updateParticipantStatus);

export default r;
