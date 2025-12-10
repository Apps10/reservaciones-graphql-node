import { bookingFactoryService } from "../../factories/serviceDependenciest";
import { BookingStatus, NewBooking } from "../../interfaces/booking";
import { Booking } from "../../models/booking";
import { compose } from "../middleware/compose.middleware";
import { validatePropietaryRoleMiddleware, validateTokenMiddleware, validateTravelerRoleMiddleware } from "../middleware/user.middleware";

export const bookingResolver = {
  Mutation: {
    createBooking: compose(
      validateTokenMiddleware,
      validateTravelerRoleMiddleware
    )(async (_: any, args: NewBooking, context: any) => {
      const { user } = context.req.body;
      return await bookingFactoryService.createBooking({...args, visitorId: user.id})
    }),
    updateBookingStatus:  compose(
      validateTokenMiddleware,
      validatePropietaryRoleMiddleware
    )(async (_: any, {bookingId, newStatus}: {bookingId: string, newStatus: BookingStatus}, context: any) => {
      const { user } = context.req.body;
      return await bookingFactoryService.updateBookingStatus(user.id, bookingId, newStatus)
    })
  },
};