import { DataTypes, Model } from "sequelize";
import { sequelizeClient } from "../config/database";
import { PropertyType } from "../interfaces/property";
import { User } from "./user";

export class Property extends Model {}

Property.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
    },
    ownerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pricePerNight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    propertyType: {
      type: DataTypes.ENUM(PropertyType.APARTMENT, PropertyType.FARM, PropertyType.HOUSE),
      allowNull: false,
    },
    maxNumberOfGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 999
      }

    },
  },
  {
    sequelize: sequelizeClient,
    modelName: "Property",
    timestamps: true,
    indexes: [
      {
        fields: ['ownerId', 'propertyType', 'maxNumberOfguests' ]
      }
    ]
  }
);