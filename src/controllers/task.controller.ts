import { Request, Response } from "express";
import * as TaskService from "../services/task.service";

export const getAllTask = async (req: Request, res: Response) => {
  try {
    const { project_id } = req.query;

    if (project_id) {
      const tasks = await TaskService.getTaskByProjectId(Number(project_id));
      const count = tasks.length;
      return res.status(200).json({ success: true, count, data: tasks });
    }

    const tasks = await TaskService.getTasks();
    const count = tasks.length;
    res.status(200).json({ success: true, count, data: tasks });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: error.message });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, project_id, assigned_to, status } = req.body;
    const task = await TaskService.createTask({
      title,
      description,
      project_id,
      assigned_to,
      status,
    });
    res.status(200).json({ success: true, data: task });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: error.message });
  }
};

export const getSingleTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await TaskService.getSingleTask(Number(id));
    res.status(200).json({ success: true, data: task });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, project_id, assigned_to, status } = req.body;
    const updatedTask = await TaskService.updateTask(Number(id), {
      title,
      description,
      project_id,
      assigned_to,
      status,
    });
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTask = await TaskService.deleteTask(Number(id));
    res.status(200).json({ success: true, data: deletedTask });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: error.message });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content, user_id } = req.body;
    const comment = await TaskService.addComment(
      Number(id),
      Number(user_id),
      content,
    );
    res.status(200).json({ success: true, data: comment });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: error.message });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comments = await TaskService.getComments(Number(id));
    res.status(200).json({ success: true, data: comments });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: error.message });
  }
};
