import { PrimitiveProperty } from "./property";

export interface PrimitiveBlockedDate {
  id: string;
  ownerId: string;
  propertyId: string;
  dateBlocked: string;
}

export interface NewBlockedDate {
  ownerId: string;
  propertyId: string;
  dateBlocked: string;
}

export interface GetAllBlockedDatesResult
  extends Omit<PrimitiveBlockedDate, "propertyId"> {
  property: PrimitiveProperty;
}

export interface BlockedDateRepository {
  create(blockedDate: NewBlockedDate): Promise<PrimitiveBlockedDate>;
  getAllBlockedDates(ownerId: string): Promise<PrimitiveBlockedDate[]>;
  findBlockedDatesBetweenDates(
    propertyId: string,
    startDate: string,
    endDate: string
  ): Promise<PrimitiveBlockedDate[]>;
}
