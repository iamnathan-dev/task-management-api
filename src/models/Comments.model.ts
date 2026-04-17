import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.config";

interface CommentAttribute {
  id: number;
  task_id: number;
  user_id: number;
  content: string;
}

interface CommentCreationAttributes extends Optional<CommentAttribute, "id"> {}

class Comment
  extends Model<CommentAttribute, CommentCreationAttributes>
  implements CommentAttribute
{
  public id!: number;
  public task_id!: number;
  public user_id!: number;
  public content!: string;
}

Comment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    task_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "comments",
    timestamps: true,
  },
);

export default Comment;
