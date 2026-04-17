import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.config";

interface TeamMemberAttribute {
  id: number;
  user_id: number;
  team_id: number;
  role: string;
}

interface TeamMemberCreationAttributes extends Optional<
  TeamMemberAttribute,
  "id"
> {}

class TeamMember
  extends Model<TeamMemberAttribute, TeamMemberCreationAttributes>
  implements TeamMemberAttribute
{
  public id!: number;
  public user_id!: number;
  public team_id!: number;
  public role!: string;
}

TeamMember.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    team_id: { type: DataTypes.INTEGER, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "team_members",
    timestamps: true,
  },
);

export default TeamMember;
