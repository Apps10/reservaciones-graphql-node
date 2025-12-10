import { DataTypes, Model } from "sequelize";
import { sequelizeClient } from "../config/database";
import { UserRole } from "../interfaces/user";

export class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
     role: {
      type: DataTypes.ENUM(UserRole.PROPIETARIO, UserRole.VIAJERO),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeClient,
    modelName: "User",
    timestamps: true,
  }
);