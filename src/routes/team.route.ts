import { Router } from "express";
import {
  getAllTeams,
  createTeam,
  getSingleTeam,
} from "../controllers/team/team.controller";

const teamRoutes = Router();

teamRoutes.get("/", getAllTeams);
teamRoutes.post("/", createTeam);
teamRoutes.get("/:id", getSingleTeam);

export default teamRoutes;
