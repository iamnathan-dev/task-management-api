import { Project } from "../models";
import { ApiError } from "../utils/ApiError";

export const getAllProjects = async () => {
  const projects = await Project.findAll();
  return projects;
};

export const createProject = async (name: string, team_id: number) => {
  if (!name || !team_id)
    throw new ApiError("Project name and team ID are required", 400);

  const existingProject = await Project.findOne({ where: { name } });
  if (existingProject) throw new ApiError("Project already exists", 409);

  const newProject = await Project.create({ name, team_id });
  return newProject;
};

export const getProjectByTeamId = async (team_id: number) => {
  const projects = await Project.findAll({ where: { team_id } });

  if (!projects) throw new ApiError("Projects not found", 404);
  return projects;
};

export const getSingleProject = async (id: number) => {
  const project = await Project.findByPk(id);

  if (!project) throw new ApiError("Project not found", 404);
  return project;
};
