import { PrimitiveProperty } from "../../interfaces/property";
import { PropertySequelizeRepository } from "../../repositories/propertySequelize.repository";
import { PropertyService } from "../../services/PropertyService";
import { compose } from "../middleware/compose.middleware";
import {
  validatePropietaryRoleMiddleware,
  validateTokenMiddleware,
} from "../middleware/user.middleware";

const propertyService = new PropertyService(new PropertySequelizeRepository());

export const propertyResolvers = {
  Query: {
    myProperties: validateTokenMiddleware(
      async (_: any, _args: any, context: any) => {
        const { user } = context.req.body;
        return await propertyService.findAllMyProperties(user.id);
      }
    ),
    property: validateTokenMiddleware(
      async (_: any, { id }: { id: string }, context: any) => {
        return (await propertyService.findById(id))?.toJSON();
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
        return await propertyService.save(user, { ...createPropertyDto });
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
        return await propertyService.update(user.id, propertyId, { ...rest })
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
          ...rest
        }: Partial<PrimitiveProperty> & { propertyId: string },
        context: any
      ) => {
        const { user } = context.req.body
        return await propertyService.delete(user.id, propertyId)
      }
    ),
  },
};
