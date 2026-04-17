import {
  Task,
  TaskAttribute,
  TaskCreationAttributes,
  Comment,
  User,
  CommentCreationAttributes,
} from "../models";
import { ApiError } from "../utils/ApiError";

export const getTasks = async () => {
  const tasks = await Task.findAll();
  return tasks;
};

export const createTask = async (data: TaskCreationAttributes) => {
  const task = await Task.create(data);
  return task;
};

export const getTaskByProjectId = async (project_id: number) => {
  const tasks = await Task.findAll({ where: { project_id } });
  return tasks;
};

export const getSingleTask = async (id: number) => {
  const task = await Task.findByPk(id);
  return task;
};

export const updateTask = async (id: number, data: Partial<TaskAttribute>) => {
  const task = await Task.findByPk(id);
  if (!task) throw new ApiError("Task not found", 404);

  const updatedTask = await task.update(data);
  return updatedTask;
};

export const deleteTask = async (id: number) => {
  const task = await Task.findByPk(id);
  if (!task) throw new ApiError("Task not found", 404);

  await task.destroy();
  return { message: "Task deleted successfully" };
};

// task and comment logic
export const getComments = async (id: number) => {
  const task = await Task.findByPk(id, {
    include: [
      { model: Comment },
      {
        model: User,
        as: "assignedUser",
        attributes: ["id", "full_name", "email"],
      },
    ],
  });
  return task;
};

export const addComment = async (
  task_id: number,
  user_id: number,
  content: string,
) => {
  const task = await Task.findByPk(task_id);
  if (!task) throw new ApiError("Task not found", 404);

  const comment = await Comment.create({ content, task_id, user_id });
  return comment;
};
