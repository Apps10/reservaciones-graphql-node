import { BlockedDateSequelizeRepository } from "../repositories/blockedDateSequelize.repository";
import { BookingSequelizeRepository } from "../repositories/bookingSequelize.repository";
import { PropertySequelizeRepository } from "../repositories/propertySequelize.repository";
import { UserSequelizeRepository } from "../repositories/userSequelize.repository";
import { BlockedDateService } from "../services/BlockedDateService";
import { BookingService } from "../services/BookingService";
import { PropertyService } from "../services/PropertyService";
import { UserService } from "../services/UserService";

export const propertyFactoryService = new PropertyService(
  new PropertySequelizeRepository()
);
export const blockedDateFactoryService = new BlockedDateService(
  new BlockedDateSequelizeRepository(),
  propertyFactoryService
);
export const userFactoryService = new UserService(
  new UserSequelizeRepository()
);
export const bookingFactoryService = new BookingService(
  new BookingSequelizeRepository(),
  propertyFactoryService
);
