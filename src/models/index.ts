import User from "./User.model";
import Team from "./Teams.model";
import Project from "./Projects.model";
import Task from "./Tasks.model";
import Comment from "./Comments.model";
import TeamMember from "./Team_members.model";

// Project - Task
Project.hasMany(Task, { foreignKey: "project_id" });
Task.belongsTo(Project, { foreignKey: "project_id" });

// Task - Comment
Task.hasMany(Comment, { foreignKey: "task_id" });
Comment.belongsTo(Task, { foreignKey: "task_id" });

// Task - User (assigned)
Task.belongsTo(User, { foreignKey: "assigned_to", as: "assignedUser" });
User.hasMany(Task, { foreignKey: "assigned_to" });

// Team - Project
Team.hasMany(Project, { foreignKey: "team_id" });
Project.belongsTo(Team, { foreignKey: "team_id" });

// User - Team (N:M via TeamMember)
User.belongsToMany(Team, { through: TeamMember, foreignKey: "user_id" });
Team.belongsToMany(User, { through: TeamMember, foreignKey: "team_id" });

export { User, Team, Project, Task, Comment, TeamMember };
export * from "./User.model";
export * from "./Teams.model";
export * from "./Projects.model";
export * from "./Tasks.model";
export * from "./Comments.model";
export * from "./Team_members.model";
