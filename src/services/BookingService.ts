import { BookingNotFoundException } from "../exceptions/Booking.exception";
import { BookingRepository, NewBooking, UpdateBooking } from "../interfaces/booking";
import { PropertyService } from "./PropertyService";

export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly propertyService: PropertyService,
  ) {}

  async getAllBookings(ownerId: string) {
    return await this.bookingRepository.findAllBookingsByPropertyId(ownerId)
  }
  
  async findById(bookingId: string) {
    const booking = await this.bookingRepository.findById(bookingId)
    if(!booking) throw new BookingNotFoundException()
    return booking
  }

  async createBooking(newBooking: NewBooking){
    return await this.bookingRepository.create(newBooking)
  }

  async updateBookingStatus(ownerId: string, bookingId: string, dto: UpdateBooking){
    const booking = await this.findById(bookingId)
    const property = await this.propertyService.findById(booking.propertyId)

    this.propertyService.verifyIfIsTheOwnerProperty(ownerId, property)

    await this.bookingRepository.update(bookingId, { status: dto.status })
    return {
      ...booking,
      ...dto
    }
  }
}
