import { DomainCustomException } from "./domain-custom-exception";

export const BlockedDatesNotFoundException = DomainCustomException('BlockedDatesNotFoundException', 400, "BlockedDates Not Found");
export const BlockedDatesGenericException = DomainCustomException('BookingGenericException', 400, "Property generic Exception");
export const BlockedDateIsNotAvailableException = DomainCustomException('BlockedDateIsNotAvailableException', 400, "The blockedDate is not available");
