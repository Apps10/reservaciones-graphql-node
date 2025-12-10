import { DataTypes, Model } from "sequelize";
import { sequelizeClient } from "../config/database";

export class BlockedDate extends Model {}

BlockedDate.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    propertyId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateBlocked: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  },
  {
    sequelize: sequelizeClient,
    modelName: "BlockedDate",
    timestamps: true,
    indexes: [
      {
        fields: ['propertyId', "dateBlocked", 'ownerId']
      }
    ]
  }
);