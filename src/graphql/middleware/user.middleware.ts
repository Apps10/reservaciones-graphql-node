import { z } from "zod";
import { PayloadJWT, PrimitiveUser, UserRole } from "../../interfaces/user";
import { ZodValidateSchema } from "../../utils/zodValidationSchema";
import { UserService } from "../../services/UserService";
import { UserSequelizeRepository } from "../../repositories/userSequelize.repository";
import { Property } from "../../models/property";
import { PropertyGenericException } from "../../exceptions/Property.exception";

export const validateRegisterMiddleware = (resolver: Function) => {
  return async (_parent: any, args: PrimitiveUser, context: any, info: any) => {
    const schema = z.object({
      name: z.string().min(3).max(20).nonempty(),
      lastName: z.string().min(3).max(30).nonempty(),
      email: z.string().email().min(8).max(30).nonempty(),
      password: z.string().min(8).max(20).nonempty(),
    });

    ZodValidateSchema(schema, args);

    return resolver(_parent, args, context, info);
  };
};

export const validateLoginMiddleware = (resolver: Function) => {
  return async (
    _parent: any,
    args: { email: string; password: string },
    context: any,
    info: any
  ) => {
    const schema = z.object({
      email: z.string().email().nonempty(),
      password: z.string().nonempty(),
    });

    ZodValidateSchema(schema, args);

    return resolver(_parent, args, context, info);
  };
};


export const validateTokenMiddleware = (resolver: Function) => {
  return async (
    _parent: any,
    args: { email: string; password: string },
    context: any,
    info: any
  ) => {
    const { authorization } = context.req.headers
    const token = authorization.split(' ')[1] || "non-token"
    const userService = new UserService(new UserSequelizeRepository())
    
    const payload = await userService.verifyToken(token) as PayloadJWT
    context.req.body.user = payload

    return resolver(_parent, args, context, info);
  };
};

export const validatePropietaryRoleMiddleware = (resolver: Function) => {
  return async (
    _parent: any,
    _args: any,
    context: any,
    _info: any
  ) => {
    const { user } = context.req.body
    if(user.role !== UserRole.PROPIETARIO){
      throw new PropertyGenericException(
        "the property only can be managed by role propietary"
      );
    }

    return resolver(_parent, _args, context, _info);
  };
};