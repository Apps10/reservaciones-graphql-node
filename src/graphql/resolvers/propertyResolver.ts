import { propertyFactoryService } from "../../factories/serviceDependenciest";
import { PrimitiveProperty } from "../../interfaces/property";
import { compose } from "../middleware/compose.middleware";
import {
  validatePropietaryRoleMiddleware,
  validateTokenMiddleware,
} from "../middleware/user.middleware";


export const propertyResolvers = {
  Query: {
    myProperties: validateTokenMiddleware(
      async (_: any, _args: any, context: any) => {
        const { user } = context.req.body;
        return await propertyFactoryService.findAllMyProperties(user.id);
      }
    ),
    property: validateTokenMiddleware(
      async (_: any, { id }: { id: string }, context: any) => {
        return await propertyFactoryService.findById(id);
      }
    ),
  },
  Mutation: {
    createProperty: compose(
      validateTokenMiddleware,
      validatePropietaryRoleMiddleware
    )(
      async (
        _: any,
        createPropertyDto: Omit<PrimitiveProperty, "ownerId">,
        context: any
      ) => {
        const { user } = context.req.body;
        return await propertyFactoryService.save(user, { ...createPropertyDto });
      }
    ),
    updateProperty: compose(
      validateTokenMiddleware,
      validatePropietaryRoleMiddleware
    )(
      async (
        _: any,
        {
          propertyId,
          id,
          ...rest
        }: Partial<PrimitiveProperty> & { propertyId: string },
        context: any
      ) => {
        const { user } = context.req.body
        return await propertyFactoryService.update(user.id, propertyId, { ...rest })
      }
    ),
    deleteProperty: compose(
      validateTokenMiddleware,
      validatePropietaryRoleMiddleware
    )(
      async (
        _: any,
        {
          propertyId,
          id,
        }: Partial<PrimitiveProperty> & { propertyId: string },
        context: any
      ) => {
        const { user } = context.req.body
        return await propertyFactoryService.delete(user.id, propertyId)
      }
    ),
  },
};
