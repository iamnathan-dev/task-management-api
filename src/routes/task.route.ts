import { Router } from "express";
import {
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
  createTask,
  addComment,
  getComments,
} from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.get("/", getAllTask);
taskRoutes.post("/", createTask);
taskRoutes.get("/:id", getSingleTask);
taskRoutes.put("/:id", updateTask);
taskRoutes.delete("/:id", deleteTask);

// task comments
taskRoutes.post("/:id/comments", addComment);
taskRoutes.get("/:id/comments", getComments);

export default taskRoutes;
