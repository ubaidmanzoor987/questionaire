import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { IUsers } from "@interfaces/users.interface";
import { UUIDV4 } from "sequelize";

export type UserCreationAttributes = Optional<IUsers, "id" | "email" | "name">;

export class UserModel
  extends Model<IUsers, UserCreationAttributes>
  implements IUsers
{
  public id: string;
  public email: string;
  public name: string;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      name: {
        allowNull: true,
        type: DataTypes.STRING(100),
      },
    },
    {
      tableName: "users",
      timestamps: true,
      sequelize,
    }
  );

  return UserModel;
}
