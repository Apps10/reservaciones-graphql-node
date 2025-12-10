import { start } from "repl";
import {
  BookingGenericException,
  BookingNotFoundException,
  BookingReservationDateIsNotAvailableDaException,
} from "../exceptions/Booking.exception";
import {
  BookingRepository,
  BookingStatus,
  NewBooking,
  PrimitiveBooking,
  UpdateBooking,
} from "../interfaces/booking";
import { BlockedDateService } from "./BlockedDateService";
import { PropertyService } from "./PropertyService";
import { calculateTotalCost } from "../utils/bookingHerlper";

export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly BlockedDateService: BlockedDateService,
    private readonly propertyService: PropertyService
  ) {}

  async getAllBookings(ownerId: string) {
    return await this.bookingRepository.findAllBookingsByPropertyId(ownerId);
  }

  async findById(bookingId: string) {
    const booking = await this.bookingRepository.findById(bookingId);
    if (!booking) throw new BookingNotFoundException();
    return booking;
  }

  async createBooking({
    endDate,
    propertyId,
    qtyGuest,
    startDate,
    visitorId,
  }: NewBooking) {
    //verificar que no haya una reserva confirmada en esas fechas,
    //verificar que no haya fechas bloqueadas en ese rango de fechas
    //
    const property = await this.propertyService.findById(propertyId);
    this.propertyService.verifyMaxNumberOfGuest(qtyGuest, property);

    const existABooking =
      await this.bookingRepository.findBookingConfirmedBetweenDates(
        propertyId,
        startDate,
        endDate
      );
    if (existABooking.length !== 0)
      throw new BookingReservationDateIsNotAvailableDaException();

    const existABlockedDate =
      await this.BlockedDateService.findBlockedDatesBetweenDates(
        propertyId,
        startDate,
        endDate
      );
    if (existABlockedDate.length !== 0)
      throw new BookingReservationDateIsNotAvailableDaException();

    const totalPrice = calculateTotalCost(startDate, endDate, property);
    return await this.bookingRepository.create({
      endDate,
      status: BookingStatus.PENDING,
      propertyId,
      qtyGuest,
      startDate,
      visitorId,
      totalPrice,
    });
  }

  async updateBookingStatus(
    ownerId: string,
    bookingId: string,
    status: BookingStatus
  ) {
    const booking = await this.findById(bookingId);
    const property = await this.propertyService.findById(booking.propertyId);
    if (booking.status === BookingStatus.CONFIRMED)
      throw new BookingGenericException(
        "You cannot change the booking status once it has been confirmed."
      );
    this.propertyService.verifyIfIsTheOwnerProperty(ownerId, property);

    await this.bookingRepository.update(bookingId, { status });
    return {
      ...booking,
      status,
    };
  }

  async findBookingConfirmBetweenDate(propertyId: string, startDate: string, endDate: string): Promise<PrimitiveBooking[]> {
    return await this.bookingRepository.findBookingConfirmedBetweenDates(propertyId, startDate, endDate)
  }
}
