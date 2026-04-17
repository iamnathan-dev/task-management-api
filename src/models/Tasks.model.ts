import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.config";

interface TaskAttribute {
  id: number;
  title: string;
  description: string;
  project_id: number;
  assigned_to: number;
  status: "todo" | "in_progress" | "done";
}

interface TaskCreationAttributes extends Optional<TaskAttribute, "id"> {}

class Task
  extends Model<TaskAttribute, TaskCreationAttributes>
  implements TaskAttribute
{
  public id!: number;
  public title!: string;
  public description!: string;
  public project_id!: number;
  public assigned_to!: number;
  public status!: "todo" | "in_progress" | "done";
}

Task.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    project_id: { type: DataTypes.INTEGER, allowNull: false },
    assigned_to: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: "todo" },
  },
  {
    sequelize,
    tableName: "tasks",
    timestamps: true,
  },
);

export default Task;
