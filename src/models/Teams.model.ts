import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.config";

interface TeamAttribute {
  id: number;
  name: string;
}

interface TeamCreationAttributes extends Optional<TeamAttribute, "id"> {}

class Team
  extends Model<TeamAttribute, TeamCreationAttributes>
  implements TeamAttribute
{
  public id!: number;
  public name!: string;
}

Team.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "teams",
    timestamps: true,
  },
);

export default Team;
