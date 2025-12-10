import { Op } from "sequelize";
import { BookingRepository, BookingStatus, PrimitiveBooking, UpdateBooking } from "../interfaces/booking";
import { Booking } from "../models/booking";

export class BookingSequelizeRepository implements BookingRepository {
  async findAllBookingsByPropertyId(propertyId: string): Promise<PrimitiveBooking[]> {
    const bookings = await Booking.findAll({
      where: {
        propertyId
      }
    })
    return bookings.map(p=> p.toJSON() as PrimitiveBooking)
  }

  async findById(bookingId: string) {
    const booking = await Booking.findByPk(bookingId)
    if(!booking) return null
    return booking.toJSON() as PrimitiveBooking
  }

  async update(bookingId: string, payload: UpdateBooking) {
    const [affectedCount] = await Booking.update(payload, {
        where: {
          id: bookingId,
      },
    });
    return affectedCount
  }

  async create(booking: PrimitiveBooking): Promise<PrimitiveBooking> {
    return (await Booking.create({...booking})).toJSON()
  }

  async findBookingConfirmedBetweenDates(propertyId: string, startDate: string, endDate: string): Promise<PrimitiveBooking[]> {
    const bookings = await Booking.findAll({
      where: {
        propertyId,
        startDate: {
          [Op.lte]: endDate,
        },
        endDate: {
          [Op.gte]: startDate,
        },
        status: {
          [Op.eq]: BookingStatus.CONFIRMED
        }
      }
    }); 
    return bookings.map(b=>b.toJSON())
  }
}