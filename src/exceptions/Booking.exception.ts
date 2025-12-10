import { DomainCustomException } from "./domain-custom-exception";

export const BookingNotFoundException = DomainCustomException('BookingNotFoundException', 400, "Booking Not Found");
export const BookingIsNotYoursException = DomainCustomException('BookingIsNotYoursException', 400, "The Booking Is Not Yours, Please Contact With Support");
export const BookingGenericException = DomainCustomException('BookingGenericException', 400, "Property generic Exception");
export const BookingReservationDateIsNotAvailableDaException = DomainCustomException('BookingReservationDateIsNotAvailableDaException', 400, "The reservation date is not available");
