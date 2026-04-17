import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.config";

interface ProjectAttribute {
  id: number;
  name: string;
  team_id: number;
}

interface ProjectCreationAttributes extends Optional<ProjectAttribute, "id"> {}

class Project
  extends Model<ProjectAttribute, ProjectCreationAttributes>
  implements ProjectAttribute
{
  public id!: number;
  public name!: string;
  public team_id!: number;
}

Project.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    team_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: "projects",
    timestamps: true,
  },
);

export default Project;
