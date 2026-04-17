import { Team, TeamMember } from "../models";
import { ApiError } from "../utils/ApiError";

export const getAllTeams = async () => {
  const teams = await Team.findAll();
  return teams;
};

export const createTeam = async (name: string) => {
  if (!name) throw new ApiError("Team name is required", 400);

  const existingTeam = await Team.findOne({ where: { name } });
  if (existingTeam) throw new ApiError("Team already exists", 409);

  const newTeam = await Team.create({ name });
  return newTeam;
};

export const getSingleTeam = async (id: number) => {
  const team = await Team.findByPk(id);

  if (!team) throw new ApiError("Team not found", 404);
  return team;
};

export const getTeamMembers = async (id: number) => {
  const teamMembers = await TeamMember.findAll({ where: { team_id: id } });

  if (!teamMembers) throw new ApiError("Team members not found", 404);
  return teamMembers;
};
