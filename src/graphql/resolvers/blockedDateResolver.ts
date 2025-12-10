import { blockedDateFactoryService } from "../../factories/serviceDependenciest";
import { PrimitiveBlockedDate } from "../../interfaces/blockedDate";
import { compose } from "../middleware/compose.middleware";
import {
  validatePropietaryRoleMiddleware,
  validateTokenMiddleware,
} from "../middleware/user.middleware";

export const blockedDateResolver = {
  Mutation: {
    createBlockedDate: compose(
      validateTokenMiddleware,
      validatePropietaryRoleMiddleware
    )(async (_: any, args: PrimitiveBlockedDate, context: any) => {
      const { user } = context.req.body;
      return await blockedDateFactoryService.create(user.id, args)
    }),
  },
  Query: {
    getAllBlockedDates: compose(
      validateTokenMiddleware,
      validatePropietaryRoleMiddleware
    )(async (_: any, _args: any, context: any) => {
      const { user } = context.req.body;
      return await blockedDateFactoryService.getAllBlockedDates(user.id)
    })
  }
};
