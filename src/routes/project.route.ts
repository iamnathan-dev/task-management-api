import { Router } from "express";
import {
  getAllProjects,
  createProject,
  getSingleProject,
} from "../controllers/poject.controller";

const projectRoutes = Router();

projectRoutes.get("/", getAllProjects);
projectRoutes.post("/", createProject);
projectRoutes.get("/:id", getSingleProject);

export default projectRoutes;
