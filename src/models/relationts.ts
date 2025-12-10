import { Property } from "./property";
import { BlockedDate } from "./blockedDate";
import { User } from "./user";
import { Booking } from "./booking";

export function setupRelations() {
  User.hasMany(Property, {
    foreignKey: "ownerId",
    sourceKey: "id",
  });

  Property.belongsTo(User, {
    foreignKey: "ownerId",
    targetKey: "id",
  });

  Property.hasMany(BlockedDate, {
    foreignKey: "propertyId",
    sourceKey: "id",
  });

  BlockedDate.belongsTo(Property, {
    foreignKey: "propertyId",
    targetKey: "id",
  });

  Property.hasMany(Booking, {
    foreignKey: "propertyId",
    sourceKey: "id",
  });

  Booking.belongsTo(Property, {
    foreignKey: "propertyId",
    targetKey: "id",
  });

  User.hasMany(Booking, {
    foreignKey: "visitorId",
    sourceKey: "id",
  });

  Booking.belongsTo(User, {
    foreignKey: "visitorId",
    targetKey: "id",
  });


  User.hasMany(BlockedDate, {
    foreignKey: "ownerId",
    sourceKey: "id",
  });

  BlockedDate.belongsTo(User, {
    foreignKey: "ownerId",
    targetKey: "id",
  });
}