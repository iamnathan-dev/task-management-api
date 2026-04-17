import { Request, Response } from "express";
import * as ProjectService from "../services/project.service";

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { team_id } = req.query;

    if (team_id) {
      const projects = await ProjectService.getProjectByTeamId(Number(team_id));
      const count = projects.length;
      return res.status(200).json({ success: true, count, data: projects });
    }

    const projects = await ProjectService.getAllProjects();
    const count = projects.length;
    res.status(200).json({ success: true, count, data: projects });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: error.message });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, team_id } = req.body;
    const project = await ProjectService.createProject(name, team_id);
    res.status(201).json({ success: true, data: project });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: error.message });
  }
};

export const getSingleProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await ProjectService.getSingleProject(Number(id));
    res.status(200).json({ success: true, data: project });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ success: false, message: error.message });
  }
};
