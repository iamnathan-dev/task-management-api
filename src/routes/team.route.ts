import { Router } from "express";
import {
  getAllTeams,
  createTeam,
  getSingleTeam,
  getTeamMembers,
} from "../controllers/team.controller";

const teamRoutes = Router();

teamRoutes.get("/", getAllTeams);
teamRoutes.post("/", createTeam);
teamRoutes.get("/:id", getSingleTeam);
teamRoutes.get("/:id/members", getTeamMembers);

export default teamRoutes;
