import { bookingFactoryService } from "../../factories/serviceDependenciest";
import { PrimitiveBlockedDate } from "../../interfaces/blockedDate";
import { NewBooking } from "../../interfaces/booking";
import { compose } from "../middleware/compose.middleware";
import { validateTokenMiddleware, validateTravelerRoleMiddleware } from "../middleware/user.middleware";

export const bookingResolver = {
  Mutation: {
    createBlockedDate: compose(
      validateTokenMiddleware,
      validateTravelerRoleMiddleware
    )(async (_: any, args: NewBooking, context: any) => {
      const { user } = context.req.body;
      return await bookingFactoryService.createBooking(args)
    }),
  },
};