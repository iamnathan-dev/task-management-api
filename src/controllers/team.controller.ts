import { Request, Response } from "express";
import * as TeamService from "../services/team.service";

export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const teams = await TeamService.getAllTeams();
    const count = teams.length;

    res.status(200).json({ count, teams });
  } catch (error: any) {
    const status = error.statusCode || 400;
    res.status(status).json({ error: error.message });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const team = await TeamService.createTeam(name);

    res.status(201).json({ message: "Team created successfully", team });
  } catch (error: any) {
    const status = error.statusCode || 400;
    res.status(status).json({ error: error.message });
  }
};

export const getSingleTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await TeamService.getSingleTeam(Number(id));

    res.status(200).json({ team });
  } catch (error: any) {
    const status = error.statusCode || 400;
    res.status(status).json({ error: error.message });
  }
};

export const getTeamMembers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const teamMembers = await TeamService.getTeamMembers(Number(id));

    res.status(200).json({ teamMembers });
  } catch (error: any) {
    const status = error.statusCode || 400;
    res.status(status).json({ error: error.message });
  }
};
