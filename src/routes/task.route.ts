import { Router } from "express";
import {
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
  createTask,
} from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.get("/", getAllTask);
taskRoutes.post("/", createTask);
taskRoutes.get("/:id", getSingleTask);
taskRoutes.put("/:id", updateTask);
taskRoutes.delete("/:id", deleteTask);

export default taskRoutes;
