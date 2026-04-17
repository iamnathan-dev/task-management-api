import Task, {
  TaskAttribute,
  TaskCreationAttributes,
} from "../models/Tasks.model";
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
