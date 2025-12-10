import { DataTypes, Model } from "sequelize";
import { sequelizeClient } from "../config/database";
import { BookingStatus } from "../interfaces/booking";

export class Booking extends Model {}

Booking.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    visitorId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    propertyId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    qtyGuest: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(BookingStatus.CONFIRMED, BookingStatus.PENDING),
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
  },
  {
    sequelize: sequelizeClient,
    modelName: "Booking",
    timestamps: true,
    indexes: [
      {
        fields: ['propertyId', 'visitorId', 'startDate', 'endDate', 'status']
      }
    ]
  }
);